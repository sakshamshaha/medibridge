# eforma — Antigravity Build Prompt

## Which model to use (Antigravity's model picker)

You listed: Gemini 3.7 Flash, 3.6 Flash, 3.1 Pro. All three are real options in Antigravity's reasoning-model picker. Use them for *different phases*, not one model for everything:

- **Gemini 3.1 Pro (High)** — use for the **first pass**: turning the architecture doc into a folder/module plan, schema design, and the first scaffold of each module. Pro reasons better over the multi-module, multi-role spec (customer + retailer + shared data model) and is less likely to drop a requirement like the prescription-gate logic.
- **Gemini 3.6 / 3.7 Flash** — use for **fast iteration** once scaffolding exists: building individual pages/components, styling, small bug fixes, repetitive CRUD screens. Cheaper and faster for well-scoped, already-understood tasks.
- Practical flow: **Pro for planning + hard modules (expenses engine, reorder formula, prescription gating) → Flash for UI pages and repetitive CRUD.**

---

## Prompt to paste into Antigravity (Agent Manager)

```
You are building "eforma," a two-portal pharma platform (Customer portal + Retailer portal).
Read and follow the attached architecture document (eforma-architecture.md) as the source of truth
for features, data model, and page structure. Do not invent features beyond it — ask before assuming.

Build order (do these as separate agent tasks, in this sequence):

1. SCAFFOLD
   - Next.js frontend + NestJS (or Django) backend, PostgreSQL, monorepo structure.
   - Auth with roles: customer, retailer, admin.
   - Set up the core entities from section 5 of the architecture doc as DB models/migrations.

2. CUSTOMER PORTAL
   a. Global layout: top-right location switcher, persistent search bar, nav for
      Buy Medicines / Hospital Inquiry / Doctor Inquiry.
   b. Hospital Inquiry search: search by disease/procedure, results grouped by
      procedure type (e.g. PCNL / RIRS / URS for kidney stones), showing every
      hospital that covers each procedure type even if a given hospital doesn't
      offer all of them.
   c. Hospital/Procedure detail page with sections in this exact order: Doctor,
      Hospital Info, Licenses, Photos (interior + exterior), Directions (map),
      Expenses Breakdown (room tiers + itemized consumables), Insurance Accepted.
   d. Doctor Inquiry: standalone doctor search/profile + appointment booking.
   e. Buy Medicines: prescription upload → OCR extraction → matched medicine cart
      → order routed to a retailer.

3. RETAILER PORTAL
   a. Medicine scanner that generates a bill on scan.
   b. Stock management dashboard.
   c. AI sales monitor (basic trend dashboard is fine for v1).
   d. Prescription-gated medicines: block checkout on restricted items until a
      prescribing doctor's name is entered; store that name on the bill.
   e. Reorder formula: flag reorder when stock < (avg_daily_sales * 2 - current_stock).
   f. Expiry checker: banner on login/Stock Management listing near-expiry items.
   g. Demand Node: simple recurring checklist of daily-needed medicines.

4. POLISH
   - Responsive layout, loading/error states, empty states for zero search results.
   - Basic tests for the reorder formula and prescription-gating logic (these are
     the two features most likely to have edge-case bugs).

After each numbered section, stop and summarize what was built + any assumptions
made, before continuing to the next section.
```

---

## Tips for running this in Antigravity
- Attach `eforma-architecture.md` to the task/workspace context so the agent can cite it instead of guessing.
- Run section 1 (scaffold) and review the schema before letting the agent continue — cheap to fix now, expensive later.
- Keep the "stop and summarize after each section" instruction — with a spec this large, unattended multi-section runs are where scope drifts.
