## Scope
A copy-only update to the Smart Defibs Ltd website. No design, layout, colour, font, or image changes. The goal is to lead with the defibrillator product and price, framing monitoring/compliance as an included feature.

## Files to edit
1. `src/components/HeroSection.tsx`
2. `src/pages/PricingPage.tsx`
3. `src/components/SiteHeader.tsx`

## Changes

### 1. Homepage Hero — `src/components/HeroSection.tsx`
- Headline: change from `Every AED ready. Every day. Every time.` to `Get a defibrillator for your premises — from €39 a month.`
- Subheading: change to `Your AED, cabinet, pads and remote monitoring — all included, with no large upfront cost. We supply it, install it, and keep it ready to save a life, every single day.`
- Primary button: change text from `Contact Us` to `Get Your Defibrillator` (keep existing button style and icon)
- Secondary button: change text from `Browse AEDs` to `See Plans & Pricing` (keep existing outline style)

### 2. Plans Page — `src/pages/PricingPage.tsx`
- Top banner headline: change from `Simple, transparent pricing` to `Own a defibrillator, the easy way`
- Top banner subheading: change to `Every plan includes your defibrillator, cabinet, pads and full remote monitoring — one easy monthly payment, no upfront cost, and nothing for you to manage.`
- Indoor card title: change from `Indoor` to `Indoor Defibrillator Package`
- Indoor card description: change to `Your defibrillator, indoor cabinet, pads and consumables — fully supplied and monitored, ready to use in sheltered indoor locations.`
- Outdoor card title: change from `Outdoor` to `Outdoor Defibrillator Package`
- Outdoor card description: change to `Your defibrillator, plus a heated, weatherproof outdoor cabinet with climate monitoring — built for exposed, all-weather locations.`
- On both pricing cards, add a small trust line directly above the `Get Started` button: `Defibrillator, cabinet & pads included in your plan — not a separate purchase.` (preserve existing card layout and spacing)

### 3. Top Navigation — `src/components/SiteHeader.tsx`
- Update the desktop "Get a Quote" CTA button text to `Get Your Defibrillator` (keep existing button styling)
- Update the mobile menu "Get a Quote" CTA button text to `Get Your Defibrillator` (keep existing button styling)

## Not in scope
- CTA banner, footer, other page copy, mobile bottom bar, and any other buttons remain unchanged unless listed above.
- No code logic changes, no new components, no image/style adjustments.

## Verification
- Run a local build/typecheck to confirm no TS errors.
- Spot-check the preview for the three updated sections and the nav CTA.