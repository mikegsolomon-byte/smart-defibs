# Fact-check & correct site copy

I cross-checked every quoted figure on the site against OHCAR (HSE), HIQA, HSA, PHECC, ERC and peer-reviewed sources. Several claims are wrong or unsupported and need to be replaced with accurate, defensible wording. Solid claims (10% per minute, paediatric pads 1+, HSA Section 1.10, PHECC CFR, bystander CPR+AED multiplies survival) stay.

## Changes by file

**`src/components/StatsSection.tsx`**
- "~5,000 cardiac arrests outside hospital" → **"~2,900 cardiac arrests attended outside hospital (OHCAR 2024)"**
- "75% survival increase with AED in <5 min" → **"Up to 70% survival when defibrillation occurs within 3–5 minutes"** (ERC 2021)
- "10 min average rural ambulance response" → **"26 min national average response for Cat. 1 (life-threatening) calls, 2022"** (NAS via RTÉ/PQ data)
- "Legal — HSA guidance on workplace AEDs" → keep, reword label to **"HSA guidance recommends AEDs in workplaces"** (Section 1.10 — recommendation, not legal mandate)

**`src/pages/WhyAEDPage.tsx`**
- "~5,000 cardiac arrests… every year" → **"~2,900 out-of-hospital cardiac arrests attended by EMS each year in Ireland (OHCAR 2024)"**
- "rural ambulance response time is 10 minutes" → **"national average response for life-threatening calls exceeds 20 minutes"**
- "survival rates by up to 75%" → **"survival rates of 50–70% in witnessed cases"**
- "HSA provides clear guidance" → keep (verified). Soften "HIQA standards require emergency planning" to **"HIQA standards expect documented emergency response arrangements in care settings"** (avoid citing a specific standard number).

**`src/pages/SectorsPage.tsx`**

*Schools tab*
- "Ambulance ETA in most areas exceeds 8 minutes" → **"national average response for life-threatening calls is 26 minutes (NAS, 2022)"**
- "1 in 100 children have an undiagnosed cardiac condition" → **"1 in 300 teenagers screened in Ireland has a previously undiagnosed cardiac condition (Dillon Quirke Foundation, 2024)"**
- "AED for Schools programme provides grants" FAQ → reword to **"Funding may be available via CLÁR, LEADER, HSE National Lottery Grants or the FAI Heart Care programme. We help identify and apply for the best fit for your school."** (No ROI Dept. of Education AED-for-Schools scheme exists — NI only.)
- Case-study quote referencing "AED for Schools programme made it affordable" → replace with grant-neutral wording.

*Nursing tab*
- "HIQA Standard 2.7 — Emergency Planning" (compliance line + "Why" point) → **"HIQA National Standards for Residential Care — emergency response expectations"** (drop the incorrect 2.7 reference; Standard 2.7 is actually Physical Environment).
- "HIQA Standard 2.7" `Why` card title → **"HIQA emergency expectations"** with desc: *"Inspectors expect documented, practised emergency response — an on-site AED with trained staff is the visible proof."*
- "Cardiac arrest risk in over-65s is up to 7x higher" → **"Median OHCA patient age in Ireland is 68 (OHCAR 2024) — older residents are the highest-risk group."**
- "Rural… often face 10+ minute ambulance response times" → **"often face response times well above the 19-minute HIQA rural target."**

*Workplace tab*
- "10,000+ OHCA per year" → **"~2,900 OHCA attended per year in Ireland (OHCAR 2024) — many occur during working hours."**
- "Defibrillation within 4 minutes can yield survival rates above 70%" → **"In witnessed shockable cases with bystander CPR, defibrillation within 3–5 minutes has produced survival rates above 50%."**
- "2005 Act requires risk-appropriate emergency provision. AEDs are best-practice evidence." → **"The Safety, Health & Welfare at Work Act 2005 requires adequate first-aid and emergency arrangements; HSA guidance (Section 1.10) recommends AEDs wherever an occupational first-aider is in place."**

*Community tab*
- "Rural ambulance response in Ireland averages 18+ minutes" → **"National average response for life-threatening calls was 26 minutes in 2022 (NAS) — rural areas typically exceed this."**
- "Bystander CPR + AED doubles or triples survival" → keep (verified).

## Out of scope
- TrustBar / Footer badges ("PHECC Certified", "CE marked", "HSE/HIQA aligned"): these describe the company's own offering, not factual statistics, and are left unchanged. If you want these reviewed too, say so.
- Testimonial names/quotes are marketing copy, not statistics — left unchanged unless you want them flagged as placeholder.

## Technical notes
All edits are copy-only changes in 3 files: `src/components/StatsSection.tsx`, `src/pages/WhyAEDPage.tsx`, `src/pages/SectorsPage.tsx`. No structural, styling, or data-shape changes. The `AnimatedCounter` value for the OHCA stat changes from `5000` to `2900`; everything else is string edits.
