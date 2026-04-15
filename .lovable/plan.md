

# Design Upgrade Plan — AED Ireland

Aligning the current site with your workspace instructions (Apple/Stripe/Linear-inspired, 8pt spacing, micro-interactions, glassmorphism, dark mode, accessibility).

---

## Current Gaps

1. **No dark mode support** — no toggle, no system preference detection
2. **Spacing is inconsistent** — not strictly 8pt system; padding varies arbitrarily
3. **Header lacks polish** — no sticky blur/glass effect, no smooth transitions, mobile menu is basic
4. **Hero is conventional** — could benefit from split-screen layout, more refined typography hierarchy
5. **Cards lack premium feel** — no hover lift, no subtle shadows/glass, no skeleton loading
6. **No page transitions** — abrupt route changes
7. **No micro-interactions** — buttons lack hover scale, no staggered entrance polish
8. **Testimonials are plain** — no avatar placeholders, no carousel, basic layout
9. **Footer is dense** — needs more breathing room and modern grid
10. **Accessibility gaps** — no focus-visible rings on cards, no reduced-motion fallbacks, touch targets may be small
11. **No loading skeletons** anywhere
12. **Typography could be bolder** — headlines could use tighter tracking, larger sizes

---

## Plan

### 1. Dark Mode Toggle & System Detection
- Add a `ThemeProvider` context with `light`/`dark`/`system` modes using `class` strategy (already configured in Tailwind)
- Add a toggle button in the header (sun/moon icon)
- Persist preference in `localStorage`

### 2. Premium Header Upgrade
- Glassmorphism: `bg-secondary/80 backdrop-blur-xl` with a subtle bottom border
- Smooth show/hide on scroll (hide on scroll-down, reveal on scroll-up)
- Animated mobile menu with slide-down transition (framer-motion)
- Larger touch targets (44px minimum) on mobile nav items

### 3. Hero — Split-Screen / Refined Layout
- Split-screen: text left, floating AED product card/image right on desktop
- Larger, bolder headline with gradient text accent
- Animated badge pill ("Ireland's #1 AED Supplier") with subtle entrance
- Staggered entrance animations for each text element

### 4. Trust Bar — Subtle & Polished
- Add soft dividers between badges
- Subtle scroll animation on mobile (horizontal scroll or marquee)

### 5. Sector Cards — Bento-Inspired
- Bento grid layout: make first card span 2 columns on desktop
- Glassmorphism card backgrounds with subtle border
- Hover: lift (`translateY(-4px)`), shadow increase, subtle icon scale
- `prefers-reduced-motion` fallback to disable animations

### 6. Stats Section — Animated Counters
- Animate numbers counting up when in viewport
- Add subtle gradient background instead of flat color
- Cards with glass effect

### 7. Testimonials — Modern Carousel
- Horizontal scroll/carousel with drag on mobile
- Avatar placeholder circles with initials
- Star ratings or sector badge enhancement
- Quote mark as a large decorative element

### 8. CTA Banner — Refined
- Add subtle gradient overlay or mesh gradient background
- Floating card style with rounded corners and shadow
- Button hover micro-interactions (scale + shadow)

### 9. Footer — Spacious & Modern
- Wider spacing, 8pt grid alignment
- Add social media icon links (placeholder)
- Subtle hover underline animations on links

### 10. Global Enhancements
- **Page transitions**: Wrap routes in `framer-motion` `AnimatePresence` with fade transitions
- **8pt spacing system**: Audit and standardize all padding/margins to multiples of 8px (p-2=8, p-4=16, p-6=24, p-8=32, etc.)
- **Button micro-interactions**: Add `hover:scale-[1.02]` and `active:scale-[0.98]` transitions
- **Focus states**: Add visible focus rings on all interactive elements
- **Reduced motion**: Wrap all framer-motion in `useReducedMotion` checks
- **Loading skeletons**: Add skeleton components for product cards and sector cards
- **Typography refinement**: Increase hero headline size, tighten letter-spacing, bolder weights

### 11. Product & Quote Pages
- Product cards: add hover glass effect, image placeholder area, cleaner price badge
- Quote form: floating label style, better input focus states, progress indicator feel
- Split-screen layout on quote page (form left, trust signals right — already partially done, just polish)

---

## Technical Notes
- All changes use existing stack: React, Tailwind, Framer Motion, shadcn/ui
- Dark mode via Tailwind `class` strategy (already in `tailwind.config.ts`)
- New component: `ThemeProvider.tsx`, `ThemeToggle.tsx`
- Modify: `SiteHeader`, `HeroSection`, `SectorCards`, `StatsSection`, `TestimonialsSection`, `CTABanner`, `SiteFooter`, `App.tsx` (AnimatePresence), `index.css` (spacing utilities)
- ~12 files modified/created

