import uuid
import os
import sys
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional, Dict, Any

from preprocess import decode_image, get_image_variants, calculate_quality
from ocr_engine import get_ocr_engine
from barcode import read_barcode
from search import search_candidates
from scorer import score_evidence
from vl_fallback import fallback_to_vlm

from fastapi.responses import FileResponse

app = FastAPI(title="MediBridge Medicine OCR Service")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/test")
async def test_ui():
    """Serves the test_client.html for easy mobile testing on the local network."""
    return FileResponse(os.path.join(os.path.dirname(__file__), "test_client.html"))

class MedicineInfo(BaseModel):
    name: Optional[str]
    generic_name: Optional[str]
    strength: Optional[str]
    dosage_form: Optional[str]
    manufacturer: Optional[str]

class Evidence(BaseModel):
    ocr: List[str]
    barcode: Optional[str]
    ocr_confidence: float
    candidate_similarity: float
    model_agreement: float

class OCRResponse(BaseModel):
    status: str
    medicine: MedicineInfo
    evidence: Evidence
    warnings: List[str]
    request_id: str

@app.on_event("startup")
async def startup_event():
    # Warm up the OCR model
    get_ocr_engine()

def process_identify_request(image_bytes: bytes, request_id: str) -> Dict[str, Any]:
    img = decode_image(image_bytes)
    
    if img is None:
        raise HTTPException(status_code=400, detail="Could not parse image.")

    quality = calculate_quality(img)
    warnings = []
    
    # In a real app we'd map this 0-100 to a normalized quality score. 
    # Mocking normalized image quality to 0.9 for scoring.
    norm_image_quality = 0.9
    if quality['sharpness'] < 50.0:
        warnings.append("Image appears blurry.")
        norm_image_quality = 0.5

    # Barcode Scan
    barcode_payload = read_barcode(img)

    variants = get_image_variants(img)
    engine = get_ocr_engine()
    all_extracted_results = []
    
    for idx, var_img in enumerate(variants):
        lines = engine.run_ocr(var_img)
        for line in lines:
            if line not in all_extracted_results:
                all_extracted_results.append(line)
                
    # Calculate average OCR confidence
    avg_conf = 0.0
    if all_extracted_results:
        avg_conf = sum(r['confidence'] for r in all_extracted_results) / len(all_extracted_results)
                
    # Candidate Search
    db_path = os.path.join(os.path.dirname(__file__), "..", "..", "packages", "database", "prisma", "dev.db")
    candidate = search_candidates(all_extracted_results, db_path)
    
    # Scoring
    status, final_score, candidate_similarity = score_evidence(
        ocr_confidence=avg_conf, 
        candidate=candidate, 
        barcode=barcode_payload,
        image_quality=norm_image_quality,
        model_agreement=1.0 # Mock model agreement
    )
    
    # VLM Fallback for low confidence
    vlm_result = None
    if status in ["needs_confirmation", "retake_image"]:
        vlm_result = fallback_to_vlm(img, all_extracted_results)
        if vlm_result and vlm_result.get("medicine_name"):
            warnings.append("Used VLM fallback due to low OCR confidence.")
            # If VLM found something, we might upgrade status slightly for this prototype
            if status == "retake_image":
                status = "needs_confirmation"
    
    med_info = MedicineInfo(
        name=candidate.get("name") if candidate else (vlm_result.get("medicine_name") if vlm_result else None),
        generic_name=candidate.get("genericName") if candidate else None,
        strength=candidate.get("strength") if candidate else (vlm_result.get("strength") if vlm_result else None),
        dosage_form=candidate.get("dosageForm") if candidate else None,
        manufacturer=candidate.get("manufacturer") if candidate else (vlm_result.get("manufacturer") if vlm_result else None)
    )
    
    evidence = Evidence(
        ocr=[r['text'] for r in all_extracted_results],
        barcode=barcode_payload,
        ocr_confidence=avg_conf,
        candidate_similarity=candidate_similarity / 100.0,
        model_agreement=1.0
    )
    
    return {
        "status": status,
        "medicine": med_info,
        "evidence": evidence,
        "warnings": warnings,
        "request_id": request_id,
        "debug_data": {
            "quality": quality,
            "ocr_results": all_extracted_results,
            "candidate": candidate,
            "final_score": final_score,
            "vlm_result": vlm_result
        }
    }

@app.post("/api/v1/medicine/identify", response_model=OCRResponse)
async def identify_medicine(
    image: UploadFile = File(...),
    market: str = Form("IN"),
    language_hint: str = Form("en")
):
    request_id = str(uuid.uuid4())
    
    if not image.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File must be an image.")

    image_bytes = await image.read()
    
    result = process_identify_request(image_bytes, request_id)
    
    return OCRResponse(
        status=result["status"],
        medicine=result["medicine"],
        evidence=result["evidence"],
        warnings=result["warnings"],
        request_id=result["request_id"]
    )

@app.post("/api/v1/medicine/identify/debug")
async def identify_medicine_debug(
    image: UploadFile = File(...),
):
    request_id = str(uuid.uuid4())
    
    if not image.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File must be an image.")

    image_bytes = await image.read()
    
    result = process_identify_request(image_bytes, request_id)
    
    return result

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
