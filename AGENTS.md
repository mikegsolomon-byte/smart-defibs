# Payment pricing

- Resolve checkout prices by their existing lookup keys and require inclusive tax behaviour before creating a session; this prevents tax being added to advertised totals while preserving catalogue identity.
- Apply validated explicit inclusive VAT rates to checkout line items and subscription defaults instead of Automatic Tax; the live automatic calculation returns an incorrect zero rate.