# Website review sheet — content updates

All changes below come from the review sheet. They are copy, badge and list changes only — no pricing, checkout or backend work.

## Home page

**Hero**
- Eyebrow: "Smart Defibs Ltd · Est. 2019" (already matches) plus new strapline under the headline: "Every AED ready. Every day. Every time."
- Primary button: "Get Your Defibrillator" becomes "Get a Quote".
- Sub-copy: "…all included, with no upfront cost. We supply it, we monitor it, and keep it ready to save a life, every single day." (drops "large", swaps "install it" for "we monitor it").

**Amoul credential badge**
- Wording: "Exclusive Amoul® Partner" / "Exclusive Partner".
- Amoul 25-years logo rendered larger in the badge.

**Trust bar**
- Badges become: Exclusive Amoul® Partner, CE Marked, PHECC Certified Training, IHF Certified Training, HSA Certified Training, Speedy Delivery.

**The facts**
- Already reads "Every minute without CPR and AED reduces survival chances by 10%" — no change needed.

**Sectors**
- Trim the heading block to a single line: keep "Solutions for every sector" and remove the "Sectors" chip and the "Select your sector…" sub-line. The five sector cards stay.

## Sectors page — bullet edits

CFR Groups
- "Community-grade AED with rugged carry case" → "AED with remote monitoring"
- Remove "Responder bag with rescue essentials"

Healthcare
- "Clinical-grade AED with ECG display" → "…with ECG display and remote monitoring"
- Remove "Full annual service & compliance plan"
- "On-site staff training + online refresher access" → "On-site staff training"
- Remove "HIQA-ready compliance documentation"

Workplace
- "CE-certified AEDs (semi or fully automatic)" → "CE-certified AEDs"
- Remove "HSA-aligned compliance documentation pack"
- "On-site CPR/AED awareness training" → "On-site training"

Schools
- "AED device (semi-automatic, paediatric-capable)" → "AED with Adult and Paediatric Modes and Universal Pads"
- "Signage & emergency action poster" → "Signage"
- "On-site PHECC-aligned staff training (up to 12)" → "On-site PHECC certified staff training"

## Shop

- Section heading "Lifesaving equipment, built to deploy" → "We monitor your AED, so you don't have to."
- Product badges tightened to the sheet's spec:
  - i3 4G: IP55 (plus CE Marked, 4G)
  - i5 4G View: IP55, 7" HD Display
  - i5 4G View CPR: IP55, 7" HD Display, CPR Feedback, Flagship
- Remote monitoring called out on every AED (badge + first highlight) since it is the USP.
- Bottom of the Shop page: remove everything below the product grid — the three trust bullets and the closing CTA banner — so the page ends with the grid and the site footer.

## Training

Replace the 7 course tiles with the full 12 from the sheet:
Cardiac First Response (CFR), Cardiac First Response (CFR-A), First Aid Responder (FAR), Basic Life Support (BLS), Advanced Life Support (ALS), Emergency First Responder (EFR), Sports First Aid, Basic First Aid (FAE), Paediatric First Aid (FAE), Anaphylaxis — EpiPen, People Moving and Handling (PMH), Prevention and Management of Aggression and Violence (PMAV).

Heart Safe Team Programme and Heart Safe Club sections stay as they are.

## Technical notes

Files touched: `src/components/HeroSection.tsx`, `AmoulImporterChip.tsx`, `TrustBar.tsx`, `SectorCards.tsx`, `src/pages/SectorsPage.tsx`, `src/pages/ProductsPage.tsx`, `src/data/products.ts`, `src/pages/TrainingPage.tsx`. New course tiles reuse existing lucide icons; no new dependencies, no data-model or payment changes.
