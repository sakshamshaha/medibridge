import sqlite3
import re
from rapidfuzz import process, fuzz
from typing import List, Dict, Optional

def normalize_text(text: str) -> str:
    """Context-aware text normalization."""
    # Lowercase
    text = text.lower()
    # Normalize units
    text = re.sub(r'\b(mg|g|mcg|ml|%|iu)\b', r' \1 ', text)
    # Remove extra whitespace
    text = re.sub(r'\s+', ' ', text).strip()
    return text

class MedicineDatabase:
    def __init__(self, db_path: str):
        self.db_path = db_path
    
    def get_all_medicines(self) -> List[Dict]:
        conn = sqlite3.connect(self.db_path)
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()
        
        try:
            cursor.execute("SELECT id, name, manufacturer, strength, genericName, barcodeGtin FROM Medicine")
            rows = cursor.fetchall()
            return [dict(row) for row in rows]
        except sqlite3.OperationalError:
            # Fallback for old schema
            try:
                cursor.execute("SELECT id, name FROM Medicine")
                rows = cursor.fetchall()
                return [dict(row) for row in rows]
            except sqlite3.OperationalError:
                return []
        finally:
            conn.close()

def search_candidates(ocr_results: List[Dict], db_path: str) -> Optional[Dict]:
    """
    Takes OCR results [{'text': '', 'confidence': 0.0}]
    Returns the best candidate with similarity scores for fields.
    """
    db = MedicineDatabase(db_path)
    medicines = db.get_all_medicines()
    
    if not medicines:
        return None
        
    best_candidate = None
    highest_score = 0
    
    ocr_texts_normalized = [normalize_text(r['text']) for r in ocr_results if len(r['text']) >= 3]
    raw_texts = " ".join([r['text'] for r in ocr_results])
    norm_texts = " ".join(ocr_texts_normalized)

    for med in medicines:
        score = 0
        name_sim = fuzz.token_set_ratio(str(med.get('name', '')).lower(), norm_texts) if med.get('name') else 0
        strength_sim = fuzz.token_set_ratio(str(med.get('strength', '')).lower(), norm_texts) if med.get('strength') else 0
        mfr_sim = fuzz.token_set_ratio(str(med.get('manufacturer', '')).lower(), norm_texts) if med.get('manufacturer') else 0
        
        # Simple weighted aggregate to find best candidate
        total_sim = name_sim * 0.5 + strength_sim * 0.3 + mfr_sim * 0.2
        
        if total_sim > highest_score:
            highest_score = total_sim
            best_candidate = med
            best_candidate['_name_sim'] = name_sim
            best_candidate['_strength_sim'] = strength_sim
            best_candidate['_mfr_sim'] = mfr_sim
            best_candidate['_similarity'] = total_sim
                
    return best_candidate
