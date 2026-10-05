# Keep prices unchanged and include VAT

- Keep all nine product prices and all monthly/yearly plan prices exactly as they are.
- Show “Includes 23% VAT” beside shop and plan prices, promotional price displays, and the embedded payment form.
- Set the current prices in both live and test Stripe to inclusive tax, preserving existing price identifiers and amounts. Keep the existing automatic tax calculation: Irish purchases use 23% VAT inside the price, while overseas purchases follow applicable local tax rules.
- Verify the catalogue amounts, VAT settings, and product/plan checkout totals without charging a card.

## Technical details
Update unspecified Stripe tax behaviour in place where supported; recreate only already-exclusive prices with the same lookup keys if needed. Keep embedded checkout and add a check preventing any exclusive price from adding VAT on top. Do not change past payments or customer subscription charges without identifying any affected subscriptions first.
