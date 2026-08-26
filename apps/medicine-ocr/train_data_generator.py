"""
train_data_generator.py
-----------------------
Reads all 100 medicines from the SQLite database and generates a synthetic
OCR training dataset in PaddleOCR fine-tuning format.

Output structure:
  training_data/
    images/           <- synthetic text-on-white images (requires Pillow)
    train_list.txt    <- <image_path>\t<label>
    val_list.txt      <- <image_path>\t<label>
    labels.txt        <- all unique text labels (ground truths)

Usage:
  python train_data_generator.py [--db PATH_TO_DB]
"""

import argparse
import os
import sqlite3
import random
import json
import re
from typing import List, Dict

try:
    from PIL import Image, ImageDraw, ImageFont
    PILLOW_AVAILABLE = True
except ImportError:
    PILLOW_AVAILABLE = False
    print("[WARN] Pillow not installed. Image generation skipped. "
          "Install with: pip install Pillow")

# ─── Configuration ────────────────────────────────────────────────────────────
DEFAULT_DB_PATH = os.path.join(
    os.path.dirname(__file__), "..", "..", "packages", "database", "prisma", "dev.db"
)
OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "training_data")
IMAGE_DIR = os.path.join(OUTPUT_DIR, "images")
TRAIN_LIST = os.path.join(OUTPUT_DIR, "train_list.txt")
VAL_LIST = os.path.join(OUTPUT_DIR, "val_list.txt")
LABELS_FILE = os.path.join(OUTPUT_DIR, "labels.txt")

# Ratio of data kept for validation
VAL_RATIO = 0.15

# Text variation functions to simulate blister pack OCR noise
VARIATIONS = [
    lambda t: t.upper(),
    lambda t: t.lower(),
    lambda t: t.title(),
    lambda t: t.replace(" ", ""),
    lambda t: re.sub(r'\b(\d+)(mg|mcg|g|ml|iu|%)\b', r'\1 \2', t, flags=re.IGNORECASE),
    lambda t: t,  # original
]

# ─── Database ─────────────────────────────────────────────────────────────────

def load_medicines(db_path: str) -> List[Dict]:
    """Load all medicines from the SQLite database."""
    if not os.path.exists(db_path):
        raise FileNotFoundError(f"Database not found: {db_path}")
    conn = sqlite3.connect(db_path)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    try:
        cursor.execute(
            "SELECT id, name, genericName, strength, dosageForm, manufacturer FROM Medicine"
        )
        rows = cursor.fetchall()
        return [dict(row) for row in rows]
    except sqlite3.OperationalError as e:
        print(f"[ERROR] DB query failed: {e}")
        return []
    finally:
        conn.close()


# ─── Text Sample Generation ───────────────────────────────────────────────────

def generate_text_samples(medicine: Dict) -> List[str]:
    """
    Generate multiple text string variants for a single medicine.
    These represent what might appear on a blister pack.
    """
    name = medicine.get("name") or ""
    generic = medicine.get("genericName") or ""
    strength = medicine.get("strength") or ""
    form = medicine.get("dosageForm") or ""
    mfr = medicine.get("manufacturer") or ""

    # Build candidate text strings
    base_strings = [
        name,
        generic,
        f"{generic} {strength}",
        f"{name} {form}",
        mfr,
        strength,
    ]
    base_strings = [s.strip() for s in base_strings if s.strip() and len(s.strip()) >= 3]

    samples = set()
    for base in base_strings:
        for variant_fn in VARIATIONS:
            try:
                v = variant_fn(base).strip()
                if v and len(v) >= 3:
                    samples.add(v)
            except Exception:
                pass

    return list(samples)


# ─── Image Generation ─────────────────────────────────────────────────────────

def generate_image(text: str, image_path: str, font_size: int = 32):
    """Create a simple white background image with black text."""
    if not PILLOW_AVAILABLE:
        return False

    try:
        # Try to load a monospace/sans font, fall back to default
        try:
            font = ImageFont.truetype("arial.ttf", font_size)
        except (IOError, OSError):
            try:
                font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", font_size)
            except (IOError, OSError):
                font = ImageFont.load_default()

        # Measure text size
        dummy = Image.new("RGB", (1, 1))
        draw = ImageDraw.Draw(dummy)
        bbox = draw.textbbox((0, 0), text, font=font)
        w = bbox[2] - bbox[0] + 40
        h = bbox[3] - bbox[1] + 20

        # Create image
        img = Image.new("RGB", (max(w, 200), max(h, 60)), color=(255, 255, 255))
        draw = ImageDraw.Draw(img)

        # Add slight noise to simulate real conditions
        noise_level = random.randint(0, 2)
        if noise_level > 0:
            import random as rnd
            for _ in range(noise_level * 50):
                x = rnd.randint(0, img.width - 1)
                y = rnd.randint(0, img.height - 1)
                c = rnd.randint(200, 240)
                img.putpixel((x, y), (c, c, c))

        draw.text((20, 10), text, fill=(0, 0, 0), font=font)
        img.save(image_path)
        return True
    except Exception as e:
        print(f"[WARN] Could not generate image for '{text}': {e}")
        return False


# --- Main ---------------------------------------------------------------------

def main():
    parser = argparse.ArgumentParser(description="Generate OCR training data for medicines")
    parser.add_argument(
        "--db",
        default=DEFAULT_DB_PATH,
        help="Path to the SQLite database (dev.db)",
    )
    parser.add_argument(
        "--no-images",
        action="store_true",
        help="Skip image generation (only generate label files)",
    )
    args = parser.parse_args()

    db_path = os.path.abspath(args.db)
    print(f"\n[*] Loading medicines from: {db_path}")

    medicines = load_medicines(db_path)
    if not medicines:
        print("[ERROR] No medicines found in database. Run the seed script first.")
        return

    print(f"[OK] Loaded {len(medicines)} medicines.\n")

    # Create output directories
    os.makedirs(IMAGE_DIR, exist_ok=True)

    all_samples = []  # List of (image_path, label)
    all_labels = set()

    print("[*] Generating text samples...")
    for med in medicines:
        text_variants = generate_text_samples(med)
        for i, text in enumerate(text_variants):
            img_name = f"med_{med['id'][:8]}_{i:03d}.png"
            img_path = os.path.join(IMAGE_DIR, img_name)
            all_samples.append((img_path, text))
            all_labels.add(text)

    print(f"   Generated {len(all_samples)} text samples from {len(medicines)} medicines.\n")

    # Generate images
    if not args.no_images and PILLOW_AVAILABLE:
        print("[*] Generating synthetic images...")
        success = 0
        for img_path, text in all_samples:
            if generate_image(text, img_path):
                success += 1
        print(f"   Created {success}/{len(all_samples)} images.\n")
    else:
        if args.no_images:
            print("[-] Skipping image generation (--no-images flag).\n")
        else:
            print("[-] Skipping image generation (Pillow not available).\n")
        # Create placeholder images (1x1 white pixel) so list files are valid
        for img_path, _ in all_samples:
            if not os.path.exists(img_path):
                with open(img_path, 'wb') as f:
                    # Minimal valid PNG (1x1 white)
                    f.write(b'\x89PNG\r\n\x1a\n\x00\x00\x00\rIHDR\x00\x00\x00\x01'
                            b'\x00\x00\x00\x01\x08\x02\x00\x00\x00\x90wS\xde\x00'
                            b'\x00\x00\x0cIDATx\x9cc\xf8\x0f\x00\x00\x01\x01\x00'
                            b'\x05\x18\xd8N\x00\x00\x00\x00IEND\xaeB`\x82')

    # Shuffle and split into train / val
    random.shuffle(all_samples)
    split_idx = int(len(all_samples) * (1 - VAL_RATIO))
    train_samples = all_samples[:split_idx]
    val_samples = all_samples[split_idx:]

    # Write list files (PaddleOCR format: <image_path>\t<label>)
    print("[*] Writing list files...")
    with open(TRAIN_LIST, "w", encoding="utf-8") as f:
        for img_path, label in train_samples:
            rel_path = os.path.relpath(img_path, OUTPUT_DIR)
            f.write(f"{rel_path}\t{label}\n")

    with open(VAL_LIST, "w", encoding="utf-8") as f:
        for img_path, label in val_samples:
            rel_path = os.path.relpath(img_path, OUTPUT_DIR)
            f.write(f"{rel_path}\t{label}\n")

    # Write labels dictionary
    with open(LABELS_FILE, "w", encoding="utf-8") as f:
        for label in sorted(all_labels):
            f.write(f"{label}\n")

    # Write metadata JSON
    metadata = {
        "total_medicines": len(medicines),
        "total_samples": len(all_samples),
        "train_samples": len(train_samples),
        "val_samples": len(val_samples),
        "unique_labels": len(all_labels),
        "output_dir": OUTPUT_DIR,
        "format": "PaddleOCR",
        "note": (
            "Training corpus for medicine OCR. Each sample is a text variation "
            "of a medicine name/generic/strength/manufacturer as it might appear on a blister pack."
        ),
    }
    meta_path = os.path.join(OUTPUT_DIR, "metadata.json")
    with open(meta_path, "w", encoding="utf-8") as f:
        json.dump(metadata, f, indent=2)

    print(f"\n{'='*60}")
    print(f"[OK] Training data generation complete!")
    print(f"{'='*60}")
    print(f"   Medicines:        {len(medicines)}")
    print(f"   Total samples:    {len(all_samples)}")
    print(f"   Train set:        {len(train_samples)}")
    print(f"   Val set:          {len(val_samples)}")
    print(f"   Unique labels:    {len(all_labels)}")
    print(f"   Output dir:       {OUTPUT_DIR}")
    print(f"\n   Files created:")
    print(f"     • {TRAIN_LIST}")
    print(f"     • {VAL_LIST}")
    print(f"     • {LABELS_FILE}")
    print(f"     • {meta_path}")
    print(f"\n   To fine-tune PaddleOCR, use train_list.txt and val_list.txt")
    print(f"   with the PaddleOCR recognition training pipeline.\n")


if __name__ == "__main__":
    main()
