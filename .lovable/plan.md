# Smart Defibs — Website Review 2 update

Apply the approved copy from the "Smart Defibs Website Review 2" sheet across the site, and update the product section with new products, specs and prices. Images are excluded — you'll add those afterwards (existing placeholder images stay in place for now).

## 1. Products section (Products tab)

Rebuild `src/data/products.ts` to match the sheet — corrected prices, specs and an expanded catalogue:

| Product | Price |
|---|---|
| Amoul® i3 AED 4G | €1,299 |
| Amoul® i5 View AED 4G | €1,399 |
| Amoul® i5 View CPR AED 4G | €1,649 (new) |
| Chest-eR® CPR Feedback Device | €349 |
| Heated Outdoor AED Cabinet | €399 (new) |
| Indoor AED Cabinet | €40 (new) |
| Amoul® AED Battery | €160 (new) |
| Amoul® Universal Electrode Pads | €65 (new) |
| AED / CPR Response Kit | €5 (new) |

- Each product gets the exact bullet-point spec list from the sheet.
- New products reuse existing/placeholder images until you supply real photos.
- Products intro copy updated to the new version ("Connected AEDs, cabinets and accessories, backed by our AED Readiness Service…").

**Online purchase vs quote:** the 3 current AEDs + Chest-ER are wired to Stripe checkout today. I'll update their Stripe prices to match the sheet and add a Stripe price for the new i5 View CPR. The low-cost accessories (cabinets, battery, pads, kit) will be added as catalogue items with a "Request a Quote" CTA (not individual Stripe checkout) unless you want them individually buyable — see Open questions.

## 2. Main page & global (Sheet1 tab)

- **Phone number** → `090 664 1050` everywhere it appears.
- **Hero**: keep headline direction; update sub-copy to the new version and CTA stays "Contact Us".
- **Navigation rename/reorder**: `AED Readiness Service` (home), Products, Sectors, Training & Awareness, **AED Lifecycle Management** (rename of "Servicing"), Pricing (new), About, Contact.
- **Badges / trust bar**: "Official Irish Importer" → **Exclusive Amoul® Partner**; Amoul logo tag "Celebrating 25 Years"; add "CE Marked"; "Next-Day Delivery" → "Speedy Delivery".
- **Remove** flagged items: the "I'm looking for…" intro block, National Average Response Time stat, poster references, GPS, CPR Machine line.
- **Sector order** → Community, Healthcare Providers, Nursing homes, Workplaces, Schools, Gyms (rename "Nursing" → "Healthcare Providers"/"Nursing homes" per sheet and reorder tabs + home cards).

## 3. Servicing → "AED Lifecycle Management" (AED Readiness Service tab)

Rename the page/route label and rewrite content to the new service description: intro + sections for Defibrillator AED, Remote Monitoring, Notifications, Expiry Date Tracking, Certificate Date Tracking, Monthly Readiness Report, Consumables, Post-Event Support, Environmental Monitoring, closing line "One service. Complete AED readiness management."

## 4. Training & Awareness (Training tab)

Rewrite `TrainingPage` to the new content: **Heart Safe Team Programme** (with the full "Includes" list and benefit paragraphs), **Cardiac First Responder (CFR) Training**, **First Aid Response (FAR)**.

## 5. About (About tab)

Rewrite `AboutPage` to the new copy: intro, founder (Maciej Koczur, NAS Paramedic Supervisor, 20+ yrs), What We Do, Mission, Approach, Heart Safe Programme, Why Smart Defibs, Vision.

## 6. New Pricing page (Pricing tab)

Add `/pricing` route + page with a two-plan comparison table:

- **Clinical**: €1,499 upfront / €34 month — all features except Climate/Motion Monitoring.
- **Clinical Plus**: €1,990 upfront / €39 month — includes Climate/Motion Monitoring.
- Multi-site (3+ units), Training packages, Heart Safe Team programme = **POA**.

## Open questions

1. For the low-cost accessories (cabinets, battery, pads, response kit), do you want them **individually buyable via Stripe**, or **quote/catalogue-only**? (Default: quote-only.)
2. The sheet's AED prices differ from the live ones (e.g. i5 €1,399 vs current €1,895). Confirm I should **update the live Stripe prices** to the sheet values.

## Technical notes

- `products.ts` is the single source for the products + detail pages, so the catalogue change is centralised.
- New Stripe prices created via the payments tool in test; they sync to live on publish.
- Nav changes in `SiteHeader.tsx`; badge/trust changes in `TrustBar.tsx` + `AmoulImporterChip.tsx`; sector reorder in `SectorsPage.tsx` and the home `SectorCards.tsx`.
- New `PricingPage.tsx` + route in `App.tsx`; "Servicing" route/label renamed to AED Lifecycle Management.
