# Conversion improvements: logo fallback + sticky mobile CTA

Two changes based on the conversion review. Frontend/presentation only — no backend, data, or business-logic changes.

## 1. Amoul partner-badge logo fallback

**Finding:** The Amoul logo appears broken in the Lovable *preview* because the local dev server doesn't proxy CDN asset URLs (`/__l5e/...`) — it serves the HTML fallback instead. On the **published** site the same URL resolves correctly, so real visitors most likely see it fine. Still, a broken image in the top-right trust badge is a credibility risk if the CDN ever hiccups, so we make it self-healing.

**Change — `src/components/AmoulImporterChip.tsx`:**
- Add an `onError` handler to the `<img>` that hides the image and reveals a styled "Amoul" text wordmark fallback (green, bold, matching the badge's brand side) so the badge never renders empty/broken.
- Keeps the existing image as the primary display; fallback only shows if the image fails to load.

No other files need editing — every other page renders the logo through this same component or the same asset import, and the asset pointer itself is valid.

## 2. Sticky mobile call / quote bar

**Goal:** On mobile the phone is a small icon and the primary CTA scrolls out of view. A persistent bottom bar keeps the two key conversion actions always tappable, lifting mobile leads.

**New file — `src/components/MobileCtaBar.tsx`:**
- Fixed bar pinned to the bottom of the viewport, visible on mobile/tablet only (`lg:hidden`).
- Two large, thumb-friendly buttons side by side:
  - **Call** → `tel:0906641050` (secondary/outline style, phone icon).
  - **Get a Quote** → links to the quote route (primary green/yellow style).
- Safe-area padding (`env(safe-area-inset-bottom)`) for notched phones, subtle top border + shadow, uses existing design tokens (no hardcoded colors).
- Entrance handled with a simple slide-up; respects `prefers-reduced-motion`.

**Change — `src/App.tsx`:**
- Render `<MobileCtaBar />` once globally (inside the router, alongside existing global elements) so it appears on every page.
- Add bottom padding to page content on mobile (e.g. a `pb-20 lg:pb-0` wrapper or body utility) so the fixed bar never overlaps footer content or the last CTA.

## Verification
- Rebuild and confirm no type/build errors.
- Playwright screenshots at 390px (bar visible, both buttons tappable, no footer overlap) and 1280px (bar hidden).
- Confirm the Amoul badge still renders the image normally and the text fallback appears only when the image is forced to fail.

## Not included (per your answers)
- No social proof / testimonials.
- No CTA-copy overhaul or sector-link rewrites — can be a follow-up if you want.
