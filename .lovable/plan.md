# Live payments check: catalogue is not ready for live selling

## What I verified

Go-live is fully complete (account claimed, form submitted, app installed, live keys
provisioned, readiness check passed).

But the **live catalogue does not match the site**, and live checkout would fail today.

Checkout looks prices up by their human-readable ID (e.g. `aed_i3_4g_price`,
`indoor_package_monthly`). In the test environment all 13 of those exist with the
correct identifiers. In the live environment **none** of them exist — the live
account only contains hand-created products with no matching identifiers. Result:
every live "Buy now" / plan checkout would error with "Price not found".

Second issue: the live account contains an older, hand-made set of products with
different amounts and some duplicates/strays:

| Item | Site / test | Live (hand-made) |
| --- | --- | --- |
| Amoul i3 AED 4G | €1,299 | €1,250 |
| Amoul i5 AED 4G View | €1,399 | €1,350 |
| Amoul i5 View CPR | €1,649 | €1,600 |
| Indoor AED Cabinet | €40 | €60 |
| Outdoor cabinet, Chest-eR, battery, pads, kit | match | match |
| Indoor plan monthly | €39 | €39 (duplicate product) |
| Outdoor plan monthly | €49 | €49 + a stray €25.50 price |
| Yearly plans | €429 / €539 | present, duplicate products |
| "Remote Monitoring" €50 | not on site | stray one-off product |

## Plan

1. **Publish the project.** Publishing is what copies the managed test catalogue
   (with the identifiers checkout relies on) into live. This is the single action
   that unblocks live selling.
2. **Re-check live afterwards** and confirm all 13 identifiers now exist in live
   with the correct amounts.
3. **Tidy the live account** so buyers and your reports aren't confused by two
   copies of everything: archive the hand-made duplicate products and prices
   (duplicate Indoor/Outdoor package products, the €25.50 outdoor monthly price,
   the inactive €19.50 price, "Remote Monitoring", and the older AED/cabinet
   entries superseded by the synced ones). Nothing is deleted — archiving keeps
   past order history intact.
4. **Confirm live pricing intent.** The synced live prices will be the site prices
   (€1,299 / €1,399 / €1,649 / €40). If you actually want the lower live figures
   (€1,250 / €1,350 / €1,600) or the €60 indoor cabinet, tell me and I'll change
   the site and catalogue together so they always agree.
5. **Live smoke test.** After publish, run one small real purchase (the €5 response
   kit) on the live site, confirm the order lands in Admin → Orders and the
   confirmation emails fire, then refund it in the dashboard.

## Technical notes

- `create-checkout` resolves prices via `stripe.prices.list({ lookup_keys: [...] })`.
  Only publish-synced (managed) prices carry those lookup keys — hand-created
  dashboard products never will, which is why manual live products can't be used
  by the site.
- Live prices carry tax code `txcd_32060001` on plans and `txcd_99999999` on
  goods today; the synced set will carry the codes set at creation time. Tax is
  calculated at checkout (`automatic_tax`), with filing/remittance on you.
- No app code changes are required for step 1–3; steps 4 and 5 may touch
  `src/data/products.ts` and `src/pages/PricingPage.tsx` only if you change prices.
