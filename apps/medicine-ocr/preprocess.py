import cv2
import numpy as np
from typing import List, Tuple

def decode_image(image_bytes: bytes) -> np.ndarray:
    """Decodes uploaded bytes to OpenCV image format."""
    nparr = np.frombuffer(image_bytes, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    return img

def get_image_variants(image: np.ndarray) -> List[np.ndarray]:
    """
    Returns the original image and variants optimized for foil/blister OCR.
    1. Original RGB
    2. Grayscale + CLAHE (Contrast Limited Adaptive Histogram Equalization)
    """
    variants = [image]
    
    # Variant 2: Grayscale + CLAHE
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    clahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8,8))
    cl1 = clahe.apply(gray)
    # Convert back to BGR so PaddleOCR can process it as 3-channel
    cl1_bgr = cv2.cvtColor(cl1, cv2.COLOR_GRAY2BGR)
    variants.append(cl1_bgr)
    
    return variants

def calculate_quality(image: np.ndarray) -> dict:
    """Calculates basic image quality metrics."""
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    sharpness = cv2.Laplacian(gray, cv2.CV_64F).var()
    mean_luma = np.mean(gray)
    
    return {
        "sharpness": float(sharpness),
        "brightness": float(mean_luma)
    }
