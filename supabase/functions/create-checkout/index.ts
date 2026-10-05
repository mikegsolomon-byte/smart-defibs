import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors'
import { z } from 'npm:zod@3'
import { type StripeEnv, createStripeClient } from "../_shared/stripe.ts";

const BodySchema = z.object({
  priceId: z.string().regex(/^[a-zA-Z0-9_-]+$/),
  quantity: z.number().int().min(1).max(10).optional(),
  customerEmail: z.string().email().max(320).optional(),
  returnUrl: z.string().url().max(500),
  environment: z.enum(['sandbox', 'live']),
});

// Countries we ship physical AED units to.
const SHIPPING_COUNTRIES = ['IE', 'GB'] as const;

// Seller-confirmed VAT: explicit inclusive rates avoid Stripe Automatic Tax's
// incorrect live 0% result and retain the exact advertised totals.
const VAT_RATE_IDS: Record<StripeEnv, string> = {
  live: 'txr_1UN6aAHn0ZUQXKf50tYhhVsw',
  sandbox: 'txr_1UN6aA8j8jt0xFf3ljGrBYwA',
};

async function resolveOrCreateCustomer(
  stripe: ReturnType<typeof createStripeClient>,
  email: string,
): Promise<string> {
  const existing = await stripe.customers.list({ email, limit: 1 });
  if (existing.data.length) return existing.data[0].id;
  const created = await stripe.customers.create({ email });
  return created.id;
}

async function createCheckoutSession(options: {
  priceId: string;
  quantity: number;
  customerEmail?: string;
  returnUrl: string;
  environment: StripeEnv;
}) {
  const stripe = createStripeClient(options.environment);
  const vatRateId = VAT_RATE_IDS[options.environment];
  const vatRate = await stripe.taxRates.retrieve(vatRateId);
  if (!vatRate.active || !vatRate.inclusive || vatRate.percentage !== 23) {
    throw new Error('Checkout requires an active 23% inclusive VAT rate');
  }

  const prices = await stripe.prices.list({ lookup_keys: [options.priceId] });
  if (!prices.data.length) throw new Error("Price not found");
  const stripePrice = prices.data[0];
  if (stripePrice.tax_behavior !== "inclusive") {
    throw new Error("Checkout price must include VAT; check the Stripe catalogue tax settings");
  }
  const isRecurring = stripePrice.type === "recurring";

  const productId = typeof stripePrice.product === "string"
    ? stripePrice.product
    : stripePrice.product.id;
  const product = await stripe.products.retrieve(productId);

  const metadata = {
    product_id: product.metadata?.lovable_external_id || productId,
    price_id: options.priceId,
    product_name: product.name,
    quantity: String(isRecurring ? 1 : options.quantity),
    environment: options.environment,
  };

  // Subscription plans are managed monthly/annual packages: no shipping
  // collection at checkout (installation address is arranged afterwards),
  // and quantity is always 1.
  if (isRecurring) {
    if (!options.customerEmail) throw new Error("Email required for plan checkout");
    const customerId = await resolveOrCreateCustomer(stripe, options.customerEmail);

    const session = await stripe.checkout.sessions.create({
      line_items: [{ price: stripePrice.id, quantity: 1, tax_rates: [vatRateId] }],
      mode: "subscription",
      ui_mode: "embedded_page",
      return_url: options.returnUrl,
      customer: customerId,
      customer_update: { address: "auto", name: "auto" },
      billing_address_collection: "required",
      phone_number_collection: { enabled: true },
      metadata: { ...metadata, managed_payments: "false" },
      subscription_data: {
        default_tax_rates: [vatRateId],
        metadata: { ...metadata, customer_email: options.customerEmail },
      },
    });
    return session.client_secret;
  }

  const session = await stripe.checkout.sessions.create({
    line_items: [{ price: stripePrice.id, quantity: options.quantity, tax_rates: [vatRateId] }],
    mode: "payment",
    ui_mode: "embedded_page",
    return_url: options.returnUrl,
    shipping_address_collection: { allowed_countries: SHIPPING_COUNTRIES as unknown as string[] },
    phone_number_collection: { enabled: true },
    ...(options.customerEmail && { customer_email: options.customerEmail }),
    payment_intent_data: { description: product.name },
    metadata: { ...metadata, managed_payments: "false" },
  });

  return session.client_secret;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  try {
    const parsed = BodySchema.safeParse(await req.json().catch(() => null));
    if (!parsed.success) {
      return new Response(JSON.stringify({ error: 'Invalid request' }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const clientSecret = await createCheckoutSession({
      priceId: parsed.data.priceId,
      quantity: parsed.data.quantity ?? 1,
      customerEmail: parsed.data.customerEmail,
      returnUrl: parsed.data.returnUrl,
      environment: parsed.data.environment,
    });

    return new Response(JSON.stringify({ clientSecret }), {
      status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('create-checkout error', err);
    return new Response(JSON.stringify({ error: 'Failed to create checkout session' }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
