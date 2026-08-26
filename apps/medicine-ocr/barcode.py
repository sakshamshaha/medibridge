import zxingcpp
import cv2
import numpy as np
import logging

logger = logging.getLogger(__name__)

def read_barcode(image: np.ndarray) -> str:
    """
    Scans the image for barcodes using ZXing-C++.
    Supports EAN, UPC, DataMatrix, Code128, etc.
    """
    try:
        # zxing-cpp read_barcodes can take opencv numpy arrays directly
        results = zxingcpp.read_barcodes(image)
        if not results:
            return None
        
        # We just return the text payload of the first found barcode
        # A more advanced version might return format, position, and filter by DataMatrix
        return results[0].text
    except Exception as e:
        logger.error(f"Barcode decoding failed: {e}")
        return None
