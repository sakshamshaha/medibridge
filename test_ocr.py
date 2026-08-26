import os
import cv2
import numpy as np

os.environ["FLAGS_enable_pir_api"] = "0"
from paddleocr import PaddleOCR

print("Initializing PaddleOCR...")
ocr = PaddleOCR(enable_mkldnn=False, use_textline_orientation=True, lang='en')

# Load the real image the user uploaded
img_path = r"C:\Users\Yash Sharma\.gemini\antigravity-ide\brain\21a1477d-e31b-428c-b4b5-672b3c834de8\.user_uploaded\media_1787740129244.png"
print(f"Loading {img_path}")
img = cv2.imread(img_path)
if img is None:
    print("Failed to load image!")
else:
    print("Running ocr.predict()...")
    try:
        res_predict = ocr.predict(img)
        print("predict() type:", type(res_predict))
        import json
        with open('ocr_result.json', 'w', encoding='utf-8') as f:
            # We might have numpy types or objects. Let's cast it to str first if json.dump fails, but dict should be fine if lists.
            # However, numpy float32 might cause TypeError.
            # Let's just write the string representation to a file
            f.write(str(res_predict))
        print("predict() value written to ocr_result.json")
    except Exception as e:
        print("predict() error:", e)

    print("\nRunning ocr.ocr()...")
    try:
        res_ocr = ocr.ocr(img, cls=True)
        print("ocr() type:", type(res_ocr))
        print("ocr() value:", res_ocr)
    except Exception as e:
        print("ocr() error:", e)
