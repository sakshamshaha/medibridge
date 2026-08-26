from typing import Dict, Optional
import logging

logger = logging.getLogger(__name__)

HIGH_THRESHOLD = 85.0
REVIEW_THRESHOLD = 60.0

def score_evidence(ocr_confidence: float, candidate: Optional[Dict], barcode: Optional[str], image_quality: float = 1.0, model_agreement: float = 1.0) -> tuple[str, float, float]:
    """
    Implements the confidence and evidence engine from the spec:
    score = w_ocr * ocr_conf + w_name * name_sim + w_strength * strength_match + 
            w_mfr * manufacturer_match + w_barcode * barcode_match + 
            w_quality * image_quality + w_agreement * model_agreement
    """
    # Weights summing to 100 max (without bonus)
    w_ocr = 15.0
    w_name = 35.0
    w_strength = 15.0
    w_mfr = 10.0
    w_barcode = 15.0
    w_quality = 5.0
    w_agreement = 5.0
    
    score = 0.0
    
    # 1. OCR Base Confidence
    score += (ocr_confidence * 100.0) * (w_ocr / 100.0)
    
    # 2. Database Candidate Similarities
    sim = 0.0
    if candidate:
        name_sim = candidate.get('_name_sim', 0.0) / 100.0
        strength_sim = candidate.get('_strength_sim', 0.0) / 100.0
        mfr_sim = candidate.get('_mfr_sim', 0.0) / 100.0
        
        score += (name_sim * 100.0) * (w_name / 100.0)
        score += (strength_sim * 100.0) * (w_strength / 100.0)
        score += (mfr_sim * 100.0) * (w_mfr / 100.0)
        sim = candidate.get('_similarity', 0.0)
        
    # 3. Barcode Evidence
    if barcode:
        score += w_barcode
        # If barcode perfectly matches candidate's GTIN in DB:
        if candidate and candidate.get('barcodeGtin') == barcode:
            score += 20.0 # Barcode bonus
            
    # 4. Image Quality & Model Agreement
    score += (image_quality * 100.0) * (w_quality / 100.0)
    score += (model_agreement * 100.0) * (w_agreement / 100.0)

    logger.info(f"Evidence Scored: {score}")

    if score >= HIGH_THRESHOLD:
        status = "high_confidence"
    elif score >= REVIEW_THRESHOLD:
        status = "needs_confirmation"
    else:
        status = "retake_image"
        
    return status, score, sim
