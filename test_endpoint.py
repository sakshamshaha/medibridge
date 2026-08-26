import os
import sys

# Ensure the correct path
sys.path.append(os.path.join(os.path.dirname(__file__), "apps", "medicine-ocr"))
import apps.medicine_ocr.main as main

import cv2
import numpy as np

img = np.zeros((100,200,3), dtype=np.uint8)
cv2.putText(img, 'Levobex', (10,50), cv2.FONT_HERSHEY_SIMPLEX, 1, (255,255,255), 2)
is_success, buffer = cv2.imencode(".jpg", img)
image_bytes = buffer.tobytes()

print("Calling process_identify_request...")
try:
    res = main.process_identify_request(image_bytes, "test1234")
    print("Success! Status:", res['status'])
except Exception as e:
    import traceback
    traceback.print_exc()
