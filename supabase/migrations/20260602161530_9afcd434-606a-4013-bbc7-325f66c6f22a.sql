CREATE TABLE public.orders (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  stripe_session_id text UNIQUE,
  stripe_payment_intent_id text,
  product_id text,
  price_id text,
  product_name text,
  quantity integer NOT NULL DEFAULT 1,
  amount integer,
  currency text NOT NULL DEFAULT 'eur',
  customer_email text,
  customer_name text,
  shipping_address jsonb,
  status text NOT NULL DEFAULT 'paid',
  environment text NOT NULL DEFAULT 'sandbox',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT ALL ON public.orders TO service_role;

ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "No public read of orders"
  ON public.orders FOR SELECT
  TO anon, authenticated
  USING (false);

CREATE POLICY "No public insert of orders"
  ON public.orders FOR INSERT
  TO anon, authenticated
  WITH CHECK (false);

CREATE POLICY "No public update of orders"
  ON public.orders FOR UPDATE
  TO anon, authenticated
  USING (false) WITH CHECK (false);

CREATE POLICY "No public delete of orders"
  ON public.orders FOR DELETE
  TO anon, authenticated
  USING (false);

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_orders_updated_at
BEFORE UPDATE ON public.orders
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();