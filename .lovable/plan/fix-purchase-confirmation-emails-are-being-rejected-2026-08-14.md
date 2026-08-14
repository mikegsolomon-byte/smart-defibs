# Fix: purchase confirmation emails are being rejected

## What I found

Order emails are triggered correctly, but they are **not being delivered**. The payments webhook logs from this morning's test purchase show two rejections (customer email and admin notification):

```text
Resend error 403 — "You can only send testing emails to your own email address
(mikegsolomon@gmail.com). To send emails to other recipients, please verify a
domain ... and change the `from` address"
```

Cause: the payments webhook sends from `onboarding@resend.dev` (Resend's sandbox address), which can only email the account owner. The rest of the site (quote notifications, app emails) already sends from the verified domain `notify.smartdefibs.com`.

The order record itself is written to the database correctly — only the emails fail.

## Fix

Switch the payments webhook to the verified sender domain so both emails go out:

- Send from `Smart Defibs <noreply@notify.smartdefibs.com>` instead of `onboarding@resend.dev`.
- Pass the verified sender domain with the send request, matching how the existing app-email function does it.
- Keep the two existing sends: customer confirmation to the buyer, order notification to `info@smartdefibs.com` and `maciek_koczur@yahoo.com`.
- Redeploy the webhook function.

## Verification

After deploying, make one more €0.50 AED Response Kit test purchase and confirm:
- Buyer receives "Your Smart Defibs order confirmation".
- Both admin addresses receive "New order — …".
- Function logs show no Resend errors.

## Technical notes

- File: `supabase/functions/payments-webhook/index.ts` (`sendEmail` helper, `FROM_ADDR`).
- Reference implementation for the verified-domain send: `supabase/functions/send-transactional-email/index.ts` (`SENDER_DOMAIN` / `FROM_DOMAIN`, `from` + `sender_domain` fields).
- Same fix applies to all webhook emails (order, plan welcome, cancellation, plan change), since they share `sendEmail`.
