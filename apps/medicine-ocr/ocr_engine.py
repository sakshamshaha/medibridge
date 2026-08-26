import logging
import os
os.environ["FLAGS_enable_pir_api"] = "0"
from paddleocr import PaddleOCR

logger = logging.getLogger(__name__)

class MedicineOCREngine:
    def __init__(self):
        logger.info("Initializing PP-OCRv6 Engine...")
        # Using English models as baseline. In production, use multilingual if required.
        self.ocr = PaddleOCR(enable_mkldnn=False, use_textline_orientation=True, lang='en')
        logger.info("PP-OCRv6 Engine Initialized.")

    def run_ocr(self, image) -> list:
        """
        Runs the OCR engine on a single OpenCV image.
        Returns a list of strings extracted from the image.
        """
        try:
            result = self.ocr.predict(image)
            text_lines = []
            
            if not result or not result[0]:
                return []
                
            res = result[0]
            if 'rec_texts' in res and 'rec_scores' in res:
                texts = res['rec_texts']
                scores = res['rec_scores']
                
                polys = res.get('dt_polys', [])
                if not polys:
                    polys = res.get('rec_polys', [])
                    
                for i in range(len(texts)):
                    bbox = polys[i] if i < len(polys) else []
                    text_lines.append({"text": texts[i], "confidence": scores[i], "bbox": bbox})
            
            return text_lines
        except Exception as e:
            logger.error(f"OCR Error: {str(e)}")
            return []

# Singleton instance for FastAPI
ocr_engine = None

def get_ocr_engine() -> MedicineOCREngine:
    global ocr_engine
    if ocr_engine is None:
        ocr_engine = MedicineOCREngine()
    return ocr_engine
