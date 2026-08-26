import logging
from paddleocr import PaddleOCR

logger = logging.getLogger(__name__)

class MedicineOCREngine:
    def __init__(self):
        logger.info("Initializing PP-OCRv6 Engine...")
        # Using English models as baseline. In production, use multilingual if required.
        self.ocr = PaddleOCR(use_angle_cls=True, lang='en')
        logger.info("PP-OCRv6 Engine Initialized.")

    def run_ocr(self, image) -> list:
        """
        Runs the OCR engine on a single OpenCV image.
        Returns a list of strings extracted from the image.
        """
        try:
            result = self.ocr.ocr(image, cls=True)
            text_lines = []
            
            if not result or result[0] is None:
                return []
                
            for line in result[0]:
                if len(line) >= 2:
                    # line format: [[bbox_points], (text, confidence)]
                    text = line[1][0]
                    text_lines.append(text)
                    
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
