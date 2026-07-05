DROP POLICY IF EXISTS "Anyone can submit a quote request" ON public.quote_requests;

CREATE POLICY "No public insert of quote requests"
ON public.quote_requests
FOR INSERT
TO anon, authenticated
WITH CHECK (false);