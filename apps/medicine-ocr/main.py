import uuid
import os
import sys
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional

from preprocess import decode_image, get_image_variants, calculate_quality
from ocr_engine import get_ocr_engine
from barcode import read_barcode
from search import search_candidates
from scorer import score_evidence

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
    img = decode_image(image_bytes)
    
    if img is None:
        raise HTTPException(status_code=400, detail="Could not parse image.")

    quality = calculate_quality(img)
    warnings = []
    if quality['sharpness'] < 50.0:
        warnings.append("Image appears blurry.")

    # Barcode Scan (Parallelizable in real world)
    barcode_payload = read_barcode(img)

    variants = get_image_variants(img)
    engine = get_ocr_engine()
    all_extracted_text = []
    
    for idx, var_img in enumerate(variants):
        lines = engine.run_ocr(var_img)
        for line in lines:
            if line not in all_extracted_text:
                all_extracted_text.append(line)
                
    # Candidate Search
    # Path to Prisma SQLite DB from apps/medicine-ocr
    db_path = os.path.join(os.path.dirname(__file__), "..", "..", "packages", "database", "prisma", "dev.db")
    candidate = search_candidates(all_extracted_text, db_path)
    
    # Scoring
    # Mocking ocr_confidence to 0.85 for now since we aren't returning line-level confidences
    status, final_score, candidate_similarity = score_evidence(0.85, candidate, barcode_payload)
    
    med_info = MedicineInfo(
        name=candidate.get("name") if candidate else None,
        generic_name=None,
        strength=candidate.get("strength") if candidate else None,
        dosage_form=None,
        manufacturer=candidate.get("manufacturer") if candidate else None
    )
    
    return OCRResponse(
        status=status,
        medicine=med_info,
        evidence=Evidence(
            ocr=all_extracted_text,
            barcode=barcode_payload,
            ocr_confidence=0.85,
            candidate_similarity=candidate_similarity / 100.0,
            model_agreement=1.0
        ),
        warnings=warnings,
        request_id=request_id
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
