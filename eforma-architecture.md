# eforma — Architecture Document

A pharma platform with two user-facing sides: **Customer** and **Retailer**.

---

## 1. Product Summary

eforma solves two real-life problems at once:

- **For customers:** finding the right hospital/doctor for a specific procedure, understanding the real cost of a surgery *before* committing to it, and ordering medicines against a prescription — all in one place.
- **For retailers (pharmacies):** running the daily pharmacy business — billing, stock, expiry, restocking, and prescription compliance — with less manual effort and fewer stockouts/expiries.

Two portals, one backend, shared identity/auth and shared medicine/hospital data layer.

---

## 2. High-Level Tech Stack (suggested)

| Layer | Choice | Why |
|---|---|---|
| Frontend | React (Next.js) | SSR for SEO on hospital/doctor pages, fast client nav |
| Mobile (retailer scanner) | React Native / PWA camera API | Barcode/medicine scanning on phone |
| Backend | Node.js (NestJS) or Django | Clear module boundaries per feature below |
| DB | PostgreSQL | Relational data (hospitals, doctors, stock, bills) fits well |
| Search | Elasticsearch / Postgres full-text | Disease → hospital/procedure search |
| File/Photo storage | S3-compatible bucket | Hospital interior/exterior photos |
| Location | Google Maps Platform (Places, Directions) | "Change location," directions to hospital |
| AI/OCR | Vision OCR (e.g. Google Vision / Tesseract) + LLM | Reading doctor prescriptions, AI sales analysis |
| Auth | JWT + role-based (customer / retailer / admin) | Two portals, shared login system |
| Notifications | Push/email/SMS service | Expiry alerts, demand-list reminders |

---

## 3. Customer Side

### 3.1 Global elements
- Top-right **location switcher** (city/area) — filters hospital search by proximity.
- Persistent search bar and bottom/side nav: **Buy Medicines**, **Hospital Inquiry**, **Doctor Inquiry**.

### 3.2 Feature: Buy Medicines
- Upload/scan prescription (photo) → OCR + pharmacist verification → cart of matched medicines.
- Order routed to a nearby verified retailer for fulfillment.

### 3.3 Feature: Hospital Inquiry (core differentiator)
**Search page**
- Search bar at top: search by disease/procedure/hospital name (e.g. "kidney stone").
- Results grouped by **procedure type** relevant to that disease, e.g. for kidney stones:
  - Hospitals offering **PCNL**
  - Hospitals offering **RIRS**
  - Hospitals offering **URS**
- If a hospital lacks one procedure (e.g. no URS), the results still show *other* hospitals that do offer it, so the customer always sees full coverage across all procedure types for that disease.

**Procedure/Hospital detail page** (e.g. "PCNL at [Hospital]")
Sections, in order:
1. **Doctor** — photo, qualifications, years of experience.
2. **Hospital info** — type (private/govt), patients treated so far (e.g. "250+", "150+"), general reputation stats.
3. **Licenses** — e.g. blood bank license, and other regulatory licenses held.
4. **Photos** — interior + exterior. Backend-uploaded photos as primary source; optionally pull additional public photos via the Google Places Photos API as a fallback/supplement.
5. **Directions** — embedded map + "Get Directions" (Google Maps Directions API).
6. **Expenses breakdown** — approximate, clearly labeled as estimates:
   - Room tiers: General (₹/day), Semi-Private (₹/day), Private (₹/day)
   - Itemized consumables: e.g. cannula, specific injections, other surgery-specific materials, each with an approx unit cost
   - Purpose: give the patient a realistic checklist of *what* is used and *roughly* what it costs, without promising exact billing.
7. **Insurance accepted** — list of accepted providers/schemes (e.g. PMJAY/Ayushman Bharat, private insurers, bank-linked health insurance).

### 3.4 Feature: Doctor Inquiry
- Search doctors directly (by name/specialty), independent of the hospital-first flow — same profile structure as the doctor block above (photo, qualifications, experience), plus which hospitals/procedures they're linked to and appointment booking.

---

## 4. Retailer Side

Daily-operations toolkit for a pharmacy.

| # | Feature | What it does |
|---|---|---|
| 1 | **Medicine scanner → billing** | Scan medicine (barcode/AI image match) to add to bill; auto-generates the final bill. |
| 2 | **Stock management** | Live inventory: on-hand qty, reorder state, per-item history. |
| 3 | **AI sales monitor / analysis** | Trends on what's selling, slow movers, revenue patterns — surfaced as dashboards. |
| 4 | **Prescription-gated medicines** | Certain medicines (e.g. Schedule H / "ultrasound"-class drugs in your example) can't be billed without a prescribing doctor's name attached to that sale. |
| 5 | **Prescribing doctor on every bill** | Every bill that includes a restricted medicine stores and prints the prescribing doctor's name. |
| 6 | **Reorder formula** | Suggested reorder qty = **(Average Daily Sales × 2) − Current Stock**. Flags item once stock falls under this threshold. |
| 7 | **Expiry checker/notifier** | On stock upload, expiry dates are tracked; on login → Stock Management, a banner lists items nearing/at expiry ("Medicine X expiring on [date]"). |
| 8 | **Demand Node** | A simple recurring checklist: daily/frequently-needed medicines the retailer checks off as "needed" — acts as a running restock to-do list, separate from the automatic reorder formula. |

### 4.1 Retailer data flow (short version)
Scan → match to catalog SKU → check prescription requirement → (if restricted) capture doctor name → add to bill → deduct stock → re-check against reorder formula → flag on Demand Node/Stock dashboard if low → expiry checker runs on a schedule against the same stock table.

---

## 5. Core Data Model (entities)

- **User** (customer | retailer | admin, role-based)
- **Hospital** (name, type, location, licenses[], patients_treated, photos[])
- **Procedure** (name e.g. PCNL/URS/RIRS, disease_tags[], hospital_id, expense_breakdown[])
- **Doctor** (name, photo, qualifications[], experience_years, hospital_ids[])
- **InsuranceProvider** (hospital_id, provider_name)
- **Medicine** (name, schedule_class, requires_prescription: bool)
- **RetailerStock** (medicine_id, retailer_id, qty, expiry_date, avg_daily_sales)
- **Bill** (retailer_id, items[], prescribing_doctor_name?, total)
- **DemandNodeItem** (retailer_id, medicine_id, checked: bool)
- **Prescription** (customer_id, image_url, ocr_result, status)

---

## 6. Open Product Questions (worth deciding before build)

- Who verifies/uploads hospital expense estimates and licenses — admin-curated, or hospital self-serve with review?
- Prescription OCR: fully automated matching, or human pharmacist review step before order confirmation?
- Google Places Photos usage has attribution/quota/licensing rules — confirm this before relying on it as a photo source.
