# Test Stripe payments in preview

No code changes are needed. The preview is running on Stripe's test environment (`pk_test_…`), so these test card numbers can be used safely.

## Stripe test card numbers

| Result | Card number | Expiry | CVC |
|---|---|---|---|
| Successful payment | `4242 4242 4242 4242` | Any future date | Any 3 digits |
| Declined card | `4000 0000 0000 0002` | Any future date | Any 3 digits |
| 3D Secure required | `4000 0025 0000 3155` | Any future date | Any 3 digits |

Use any valid future expiry and any 3-digit CVC. Enter a real-looking Irish/EU address at checkout. No real money is charged while the preview is in test mode.

## What to expect

- After payment, Stripe redirects to `/checkout/return?session_id=...`.
- A successful test purchase creates a row in Admin → Orders.
- The "Test mode" banner at the top of the preview is expected and disappears on the live published site.
