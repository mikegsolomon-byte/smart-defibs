CREATE TABLE public.subscriptions (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  stripe_subscription_id text NOT NULL UNIQUE,
  stripe_customer_id text,
  customer_email text,
  product_id text,
  price_id text,
  plan_name text,
  amount integer,
  currency text NOT NULL DEFAULT 'eur',
  status text NOT NULL DEFAULT 'active',
  current_period_start timestamptz,
  current_period_end timestamptz,
  cancel_at_period_end boolean NOT NULL DEFAULT false,
  environment text NOT NULL DEFAULT 'sandbox',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, UPDATE ON public.subscriptions TO authenticated;
GRANT ALL ON public.subscriptions TO service_role;

ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view subscriptions" ON public.subscriptions
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update subscriptions" ON public.subscriptions
  FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "No public read of subscriptions" ON public.subscriptions
  FOR SELECT TO anon USING (false);
CREATE POLICY "No public insert of subscriptions" ON public.subscriptions
  FOR INSERT TO anon, authenticated WITH CHECK (false);
CREATE POLICY "No public update of subscriptions" ON public.subscriptions
  FOR UPDATE TO anon USING (false) WITH CHECK (false);
CREATE POLICY "No public delete of subscriptions" ON public.subscriptions
  FOR DELETE TO anon, authenticated USING (false);

CREATE INDEX idx_subscriptions_email ON public.subscriptions(customer_email);

CREATE TRIGGER update_subscriptions_updated_at
  BEFORE UPDATE ON public.subscriptions
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();