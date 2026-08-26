import logging
import json
from typing import Dict, Optional

logger = logging.getLogger(__name__)

def fallback_to_vlm(image, ocr_texts: list) -> Optional[Dict]:
    """
    Mocks the PaddleOCR-VL-1.6 fallback behavior as specified.
    In a real implementation, this would encode the image, send it to the VLM 
    with a structured prompt, and return the JSON.
    """
    logger.warning("Triggering VLM Fallback for low confidence OCR...")
    
    # Mock VLM reasoning
    # We attempt to piece together the OCR text as a structured response
    # to simulate the VLM extracting fields from the text/image.
    
    combined_text = " ".join([r.get('text', '') if isinstance(r, dict) else r for r in ocr_texts]).lower()
    
    mock_result = {
        "medicine_name": None,
        "strength": None,
        "manufacturer": None,
        "batch": None,
        "expiry": None
    }
    
    # Simple simulated logic based on text
    if "risperdal" in combined_text or "risperidone" in combined_text:
        mock_result["medicine_name"] = "Risperdal"
    
    if "2mg" in combined_text or "2 mg" in combined_text:
        mock_result["strength"] = "2 mg"
        
    if "janssen" in combined_text:
        mock_result["manufacturer"] = "Janssen-Cilag"
        
    logger.info(f"VLM Fallback returned: {json.dumps(mock_result)}")
    return mock_result
