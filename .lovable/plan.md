# Fix: Quote form submission fails with RLS error

## The problem

Submitting the quote form returns:
> `new row violates row-level security policy for table "quote_requests"`

## Root cause

The `quote_requests` table has correct RLS policies (anonymous visitors are allowed to insert), **but the table has no `GRANT` privileges at all**. Supabase's Data API requires both:

1. An RLS policy that permits the action ✅ (already in place)
2. A SQL `GRANT` on the table to the role making the request ❌ (missing)

Without the GRANT, PostgREST blocks the request and reports it as an RLS violation — which is why this looks confusing.

## The fix

One small database migration adding the missing grants:

```sql
GRANT INSERT ON public.quote_requests TO anon;
GRANT INSERT, SELECT ON public.quote_requests TO authenticated;
GRANT ALL ON public.quote_requests TO service_role;
```

- `anon` gets INSERT only (so website visitors can submit the form, but cannot read other people's submissions — matching the existing "No public read" policy).
- `service_role` gets full access so the `send-quote-notification` edge function can keep reading rows to send the notification email.

No code changes needed — the frontend form and edge function are already correct.

## Verification after applying

1. Submit a test quote from `/quote` — should show the success state.
2. Confirm the row lands in `quote_requests`.
3. Confirm the notification email arrives at `info@smartdefibs.ie`.
