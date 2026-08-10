# Enable online sales: 9 products + 2 subscription plans

## Current blocker (verified)

Stripe rejects the project's test key with `api_key_expired`
(`Expired API Key provided: sk_test_…FUjHE2`), so no products or prices can be
created yet. Reconnecting the Stripe connection did not clear it, and the
go-live status check is also failing. This is the expected symptom of a built-in
Stripe sandbox that has not been claimed/activated.

**Step 0 is yours:** open the Payments dashboard and claim/activate the Stripe
account. Once that is done, everything below is code and catalog work I do.

## Catalog to create in Stripe

One-off products (EUR, prices from `src/data/products.ts`):

| Product | Price | Price ID |
| --- | --- | --- |
| Amoul i3 AED 4G | 1299.00 | `aed_i3_4g_price` |
| Amoul i5 AED 4G View | 1399.00 | `aed_i5_view_4g_price` |
| Amoul i5 AED 4G View CPR | 1649.00 | `aed_i5_view_cpr_4g_price` |
| Chest-eR CPR Feedback Device | 349.00 | `chest_er_device_price` |
| Heated Outdoor AED Cabinet | 399.00 | `heated_outdoor_cabinet_price` |
| Indoor AED Cabinet | 40.00 | `indoor_cabinet_price` |
| Amoul AED Battery | 160.00 | `amoul_aed_battery_price` |
| Amoul Universal Electrode Pads | 65.00 | `amoul_electrode_pads_price` |
| AED / CPR Response Kit | 5.00 | `aed_cpr_response_kit_price` |

The two plans from the Plans page, as real subscriptions:

| Plan | Monthly | Yearly | Price IDs |
| --- | --- | --- | --- |
| Indoor Defibrillator Package | 39.00/mo | 429.00/yr | `indoor_package_monthly`, `indoor_package_yearly` |
| Outdoor Defibrillator Package | 49.00/mo | 539.00/yr | `outdoor_package_monthly`, `outdoor_package_yearly` |

Plan quantities are locked to 1. Physical-goods tax code on every item so tax
can be calculated correctly.

## Site changes

**Products page and product detail page**
- Keep the existing "Contact Us" button and add a "Buy now" button beside it, so
  both routes stay available on every product.
- "Buy now" opens the existing quantity + embedded-checkout dialog.
- Every product in `src/data/products.ts` gets its `priceId` filled in
  (five currently have none).

**Plans page**
- Each plan card gets a monthly/yearly toggle and a checkout button, with
  "Contact us" kept as the secondary option for multi-site or bespoke setups.
- Subscription checkout requires the buyer to be signed in so the subscription
  can be tied to an account; unauthenticated visitors are sent to sign-in first
  and returned to the plan they picked.

**Order and subscription records**
- One-off purchases keep writing to the existing `orders` table via the payments
  webhook.
- Add a `subscriptions` table (user, Stripe subscription/customer, price, status,
  period dates, environment) with row-level security so a customer can only read
  their own row, and extend the payments webhook to keep it in sync on
  create/update/cancel.
- Plan purchase notifications go to the same recipients as current order emails.

## Technical notes

- Products and prices are created in the test environment via the payments
  tooling and sync to live when the project is published; human-readable price
  IDs above are stable across test and live.
- `create-checkout` is extended to detect recurring prices and switch the
  session to subscription mode, resolve/create a Stripe customer carrying the
  user id, and skip shipping collection for plan-only sessions.
- `payments-webhook` gains handlers for `customer.subscription.created`,
  `.updated`, and `.deleted`, keyed off the price lookup key.
- Test-mode banner stays in place; sandbox card 4242 4242 4242 4242 can be used
  end to end before publishing.

## Testing

1. Buy a product: pick quantity, pay with the test card, confirm the return page
   and a new row in Admin → Orders.
2. Subscribe to Indoor monthly and Outdoor yearly: confirm each creates an
   active subscription record and a notification email.
3. Confirm "Contact Us" still submits the quote form on both product pages and
   the Plans page.
