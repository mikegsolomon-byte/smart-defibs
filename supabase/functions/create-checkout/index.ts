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

async function createCheckoutSession(options: {
  priceId: string;
  quantity: number;
  customerEmail?: string;
  returnUrl: string;
  environment: StripeEnv;
}) {
  const stripe = createStripeClient(options.environment);

  const prices = await stripe.prices.list({ lookup_keys: [options.priceId] });
  if (!prices.data.length) throw new Error("Price not found");
  const stripePrice = prices.data[0];

  const productId = typeof stripePrice.product === "string"
    ? stripePrice.product
    : stripePrice.product.id;
  const product = await stripe.products.retrieve(productId);
  const productDescription = product.name;

  const session = await stripe.checkout.sessions.create({
    line_items: [{ price: stripePrice.id, quantity: options.quantity }],
    mode: "payment",
    ui_mode: "embedded_page",
    return_url: options.returnUrl,
    shipping_address_collection: { allowed_countries: SHIPPING_COUNTRIES as unknown as string[] },
    phone_number_collection: { enabled: true },
    ...(options.customerEmail && { customer_email: options.customerEmail }),
    payment_intent_data: { description: productDescription },
    metadata: {
      product_id: product.metadata?.lovable_external_id || productId,
      price_id: options.priceId,
      product_name: product.name,
      quantity: String(options.quantity),
      environment: options.environment,
    },
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
