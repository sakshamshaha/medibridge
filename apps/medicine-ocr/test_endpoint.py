import os
import cv2
import numpy as np

os.environ["FLAGS_enable_pir_api"] = "0"
import main

img_path = r"C:\Users\Yash Sharma\.gemini\antigravity-ide\brain\21a1477d-e31b-428c-b4b5-672b3c834de8\.user_uploaded\media_1787740129244.png"
img = cv2.imread(img_path)
is_success, buffer = cv2.imencode(".jpg", img)
image_bytes = buffer.tobytes()

print("Calling process_identify_request...")
try:
    res = main.process_identify_request(image_bytes, "test1234")
    print("Success! Status:", res['status'])
    import json
    
    # We must convert Pydantic objects to dicts
    res['medicine'] = res['medicine'].dict() if hasattr(res['medicine'], 'dict') else res['medicine']
    res['evidence'] = res['evidence'].dict() if hasattr(res['evidence'], 'dict') else res['evidence']
    
    # We will remove debug_data to avoid numpy serialization issues for now, since we only want to see evidence.ocr
    res.pop('debug_data', None)
    
    with open('endpoint_result.json', 'w', encoding='utf-8') as f:
        json.dump(res, f, ensure_ascii=False, indent=2)
    print("Saved to endpoint_result.json")
except Exception as e:
    import traceback
    traceback.print_exc()
