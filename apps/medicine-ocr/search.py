import sqlite3
from rapidfuzz import process, fuzz
from typing import List, Dict, Optional

class MedicineDatabase:
    def __init__(self, db_path: str):
        self.db_path = db_path
    
    def get_all_medicines(self) -> List[Dict]:
        """Fetches all medicines from the SQLite DB for fuzzy matching."""
        conn = sqlite3.connect(self.db_path)
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()
        
        # Note: Depending on your exact Prisma schema, this query might need adjustment.
        # This assumes a 'Medicine' table exists with 'id', 'name', 'manufacturer', 'strength'
        try:
            cursor.execute("SELECT id, name, manufacturer, strength FROM Medicine")
            rows = cursor.fetchall()
            return [dict(row) for row in rows]
        except sqlite3.OperationalError:
            # Fallback if table doesn't match perfectly during phase 1
            return []
        finally:
            conn.close()

def search_candidates(ocr_texts: List[str], db_path: str) -> Optional[Dict]:
    """
    Takes the raw OCR text lines and fuzzy matches them against the DB.
    Returns the best matching medicine candidate.
    """
    db = MedicineDatabase(db_path)
    medicines = db.get_all_medicines()
    
    if not medicines:
        return None
        
    # Flatten all names to search against
    medicine_names = {med['name']: med for med in medicines if med.get('name')}
    
    best_candidate = None
    highest_score = 0
    
    # Very basic candidate search: find if any OCR line strongly matches a medicine name
    for line in ocr_texts:
        if len(line) < 3:
            continue
            
        # ExtractOne returns (match, score, index)
        result = process.extractOne(
            line, 
            medicine_names.keys(), 
            scorer=fuzz.WRatio
        )
        
        if result:
            match_str, score, _ = result
            if score > highest_score:
                highest_score = score
                best_candidate = medicine_names[match_str]
                # We can store the similarity score inside the dictionary for the scorer phase
                best_candidate['_similarity'] = score
                
    return best_candidate
