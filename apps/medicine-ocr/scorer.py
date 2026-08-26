from typing import Dict, Optional
import logging

logger = logging.getLogger(__name__)

HIGH_THRESHOLD = 85.0
REVIEW_THRESHOLD = 60.0

def score_evidence(ocr_confidence: float, candidate: Optional[Dict], barcode: Optional[str]) -> tuple[str, float]:
    """
    Implements the confidence and evidence engine from the spec:
    score = w_ocr * ocr_conf + w_name * name_sim + w_barcode * barcode_match
    """
    score = 0.0
    
    # 1. OCR Base Confidence (weight: 20%)
    # In a real setup, PP-OCR returns confidence per line. We're using a mock global for Phase 0/1.
    score += (ocr_confidence * 100) * 0.20
    
    # 2. Database Candidate Similarity (weight: 50%)
    sim = 0.0
    if candidate and '_similarity' in candidate:
        sim = candidate['_similarity']
        score += sim * 0.50
        
    # 3. Barcode Evidence (weight: 30% + Bonus)
    if barcode:
        # If barcode decoded successfully, that's huge structural evidence
        score += 30.0
        # If barcode perfectly matches candidate's GTIN/barcode in DB:
        if candidate and candidate.get('barcode_gtin') == barcode:
            score += 20.0 # Barcode bonus!

    logger.info(f"Evidence Scored: {score}")

    if score >= HIGH_THRESHOLD:
        status = "high_confidence"
    elif score >= REVIEW_THRESHOLD:
        status = "needs_confirmation"
    else:
        status = "retake_image"
        
    return status, score, sim
