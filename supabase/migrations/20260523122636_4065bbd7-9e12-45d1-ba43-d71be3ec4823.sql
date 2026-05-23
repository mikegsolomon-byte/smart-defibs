
-- Explicit restrictive policies to prevent any future accidental exposure
-- of quote request submissions (contains names, emails, phone numbers).

-- Deny SELECT to anon and authenticated users (no one reads via PostgREST).
CREATE POLICY "No public read of quote requests"
ON public.quote_requests
FOR SELECT
TO anon, authenticated
USING (false);

-- Deny UPDATE to anon and authenticated users.
CREATE POLICY "No public update of quote requests"
ON public.quote_requests
FOR UPDATE
TO anon, authenticated
USING (false)
WITH CHECK (false);

-- Deny DELETE to anon and authenticated users.
CREATE POLICY "No public delete of quote requests"
ON public.quote_requests
FOR DELETE
TO anon, authenticated
USING (false);
