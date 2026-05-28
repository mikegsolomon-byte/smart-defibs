## GDPR Compliance: Privacy Page + Form Consent

### 1. New `/privacy` page (`src/pages/PrivacyPage.tsx`)

A clean, readable Privacy Policy page using the existing site layout (SiteHeader, SiteFooter, SEO component, container + prose styling to match the rest of the site).

Content sections, tailored to Smart Defibs LTD:

- **Who we are** — Smart Defibs LTD, Unit 18 The Cube FlexiSpace, Roscommon; contact `info@smartdefibs.ie`, +353 89 499 2903. Data controller statement.
- **What we collect** — Quote form fields (name, organisation, sector, email, phone, optional message). No tracking cookies at present.
- **Why we collect it (legal basis)** — Legitimate interest + pre-contractual steps (Art. 6(1)(b) and 6(1)(f) GDPR) to respond to quote requests.
- **How long we keep it** — State a retention period (suggest: quote requests kept for 24 months after last contact, then deleted). User will need to confirm the number.
- **Who we share it with (sub-processors)** — Lovable Cloud (hosting + database, EU region), Resend (transactional email delivery for the notification to `info@smartdefibs.ie`). No marketing, no third-party advertising.
- **International transfers** — Note if Resend processes data outside the EEA and that Standard Contractual Clauses apply.
- **Your rights** — Access, rectification, erasure, restriction, objection, portability, complaint to the Irish Data Protection Commission (with link `https://www.dataprotection.ie`).
- **Cookies** — Statement that the site currently uses only strictly necessary cookies (session/security) and does not use analytics or marketing trackers. A banner will be added if that changes.
- **Security** — HTTPS, access controls, Row-Level Security on stored data.
- **Contact for privacy requests** — `info@smartdefibs.ie`.
- **Last updated** date.

Add the route to `src/App.tsx`:
```
<Route path="/privacy" element={<PageTransition><PrivacyPage /></PageTransition>} />
```

### 2. Footer link to Privacy

In `src/components/SiteFooter.tsx`, add a small "Privacy Policy" link in the bottom bar alongside the copyright / HelloWebby credit. Same muted styling, opens in same tab, routes to `/privacy`.

### 3. Consent line under the Quote form

In `src/pages/QuotePage.tsx`, directly above (or below) the Submit button, add a small muted line:

> "By submitting this form you agree to our [Privacy Policy](/privacy). We'll only use your details to respond to your enquiry."

Styled with `text-xs text-muted-foreground`, link styled with `underline hover:text-primary`. No checkbox required — legitimate interest + clear notice is sufficient under Irish DPC guidance for B2B quote enquiries.

### Out of scope (for a later request)
- Cookie banner / Consent Management Platform (only needed when analytics or marketing tags are added).
- Automated data-retention deletion job for `quote_requests` (can be added as a scheduled edge function later).
- Terms of Service / Cookie Policy pages.

### One thing to confirm before I build
**Retention period for quote requests** — is 24 months after last contact OK, or do you prefer something else (e.g. 12 months, 36 months)? I'll plug your answer into the Privacy Policy text.
