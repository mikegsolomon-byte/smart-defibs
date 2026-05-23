## Plan: send quote notifications via Resend

The `QuotePage` form already saves to the `quote_requests` table and invokes a `send-quote-notification` Edge Function. We just need to build that function and connect Resend.

### Steps

1. **Connect Resend**
   Trigger the Resend connector flow. You'll be prompted to sign in / authorise Resend and link it to this project. Sign up to Resend using `info@smartdefibs.ie` — that's the only address the shared `onboarding@resend.dev` sender is allowed to email until a domain is verified.

2. **Create Edge Function `send-quote-notification`**
   Server-side function that:
   - Validates the incoming payload (name, organisation, sector, email, phone, message, quoteId) with Zod.
   - Sends an email via the Resend connector gateway:
     - `from`: `Smart Defibs Website <onboarding@resend.dev>`
     - `to`: `info@smartdefibs.ie`
     - `reply_to`: the customer's email
     - `subject`: `New quote request — {organisation} ({sector})`
     - HTML body with all form fields nicely formatted + the quote ID.
   - Returns JSON with success/error and proper CORS headers.

3. **Deploy** the function so the form starts sending immediately.

### What you'll see afterwards

- Every form submission still lands in the `quote_requests` table (already working).
- `info@smartdefibs.ie` will receive a formatted notification email with all the details, sent from `onboarding@resend.dev`. You can reply directly to the customer because their address is set as the reply-to.

### Upgrade path (later, optional)

When you're ready, verify `smartdefibs.ie` inside Resend (or switch to Lovable's built-in email). Only change needed in code is the `from` address — everything else stays the same.

### Note on the existing RLS

The `quote_requests` table currently allows public INSERT but blocks SELECT/UPDATE/DELETE entirely, so submissions are safely write-only from the web app. Reading them happens via the Cloud dashboard. No changes needed here.
