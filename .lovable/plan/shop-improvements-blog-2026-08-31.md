# Shop improvements + Blog

## 1. Shop: fully clickable product tiles

Each product card in the Shop grid becomes one clickable surface that opens that product's detail page (`/product/<handle>`), which already exists with the full long description, highlights, features and gallery.

- Card image, title and copy are wrapped in a single link to the detail page.
- The **Buy Now** and **Contact Us** buttons stay as they are and keep their own actions (clicking them does not trigger the card link).
- Keyboard focus ring and hover lift on the whole card so it reads as clickable.
- The detail page gets a stronger price + Buy Now block at the top so the flow Shop -> detail -> checkout is complete.

## 2. Product images: consistent left-facing orientation

- For the AEDs, use the "open with pads visible" photos as the main Shop image (i3 and both i5 models), keeping the other shots in the detail-page gallery.
- Review every product's main image and mirror the ones facing right so the whole grid faces left. Mirrored copies are generated as new image files; originals stay untouched.

## 3. Rounded prices

Displayed "From" prices become:

| Product | Old | New |
| --- | --- | --- |
| Amoul i3 AED 4G | EUR 1,299 | EUR 1,300 |
| Amoul i5 AED 4G View | EUR 1,399 | EUR 1,400 |
| Amoul i5 AED 4G View CPR | EUR 1,649 | EUR 1,650 |
| Chest-eR CPR Feedback | EUR 349 | EUR 350 |
| Heated Outdoor Cabinet | EUR 399 | EUR 400 |

The matching checkout prices are updated to the same amounts so the site and the payment page agree. Other products keep their current prices.

## 4. Blog with admin editor

New public blog plus a self-serve editor behind the existing admin login.

- `/blog` — list of published articles (title, date, cover image, excerpt), newest first.
- `/blog/:slug` — article page with SEO title/description, Article JSON-LD, and a back link.
- `/admin/blog` — protected list of all posts with New / Edit / Publish / Unpublish / Delete.
- `/admin/blog/:id` — editor: title, auto slug (editable), excerpt, cover image URL, body, publish toggle. Body is written in markdown and rendered on the public page.
- "Blog" is added to the site header nav and footer links, and blog URLs are added to the sitemap.

### Technical notes

- New `blog_posts` table: `id`, `slug` (unique), `title`, `excerpt`, `cover_image_url`, `content`, `published`, `published_at`, `author_name`, `created_at`, `updated_at`, with grants + RLS: public/anon read only where `published = true`; full write restricted to `admin` via the existing `has_role()` function.
- Storage bucket for cover uploads is not included in this pass — cover images are set by URL (existing CDN assets or a pasted link). Can be added later if you want in-editor uploads.
- Markdown rendering via a small markdown library, sanitised before render.
- Product data changes are in `src/data/products.ts`; card link work in `src/pages/ProductsPage.tsx` and `src/pages/ProductDetailPage.tsx`.
