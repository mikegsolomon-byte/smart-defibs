import { createClient } from "npm:@supabase/supabase-js@2";
import { type StripeEnv, verifyWebhook } from "../_shared/stripe.ts";

const RESEND_GATEWAY_URL = 'https://connector-gateway.lovable.dev/resend';
const NOTIFY_TO = ['info@smartdefibs.ie', 'maciek_koczur@yahoo.com'];
const FROM_ADDR = 'Smart Defibs <onboarding@resend.dev>';

let _supabase: ReturnType<typeof createClient> | null = null;
function getSupabase() {
  if (!_supabase) {
    _supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );
  }
  return _supabase;
}

const esc = (s: string) =>
  String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const fmtAmount = (amount?: number | null, currency?: string | null) => {
  if (amount == null) return '';
  try {
    return new Intl.NumberFormat('en-IE', { style: 'currency', currency: (currency || 'eur').toUpperCase() })
      .format(amount / 100);
  } catch {
    return `${(amount / 100).toFixed(2)} ${(currency || '').toUpperCase()}`;
  }
};

function formatAddress(addr: any): string {
  if (!addr) return '';
  return [addr.line1, addr.line2, addr.city, addr.state, addr.postal_code, addr.country]
    .filter(Boolean).map(esc).join(', ');
}

async function sendEmail(payload: { to: string[]; subject: string; html: string; reply_to?: string }) {
  const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
  const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
  if (!LOVABLE_API_KEY || !RESEND_API_KEY) {
    console.error('Missing email gateway credentials');
    return false;
  }
  const resp = await fetch(`${RESEND_GATEWAY_URL}/emails`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${LOVABLE_API_KEY}`,
      'X-Connection-Api-Key': RESEND_API_KEY,
    },
    body: JSON.stringify({ from: FROM_ADDR, ...payload }),
  });
  if (!resp.ok) {
    console.error('Resend error', resp.status, await resp.text().catch(() => ''));
    return false;
  }
  return true;
}

async function handleCheckoutCompleted(session: any, env: StripeEnv) {
  const meta = session.metadata || {};
  const customer = session.customer_details || {};
  const shipping =
    session.shipping_details ||
    session.collected_information?.shipping_details ||
    null;
  const shippingAddress = shipping?.address || customer.address || null;

  const order = {
    stripe_session_id: session.id as string,
    stripe_payment_intent_id: (session.payment_intent as string) || null,
    product_id: meta.product_id || null,
    price_id: meta.price_id || null,
    product_name: meta.product_name || null,
    quantity: meta.quantity ? Number(meta.quantity) : 1,
    amount: session.amount_total ?? null,
    currency: session.currency || 'eur',
    customer_email: customer.email || session.customer_email || null,
    customer_name: shipping?.name || customer.name || null,
    shipping_address: shippingAddress,
    status: 'paid',
    environment: env,
  };

  const { error } = await getSupabase()
    .from('orders')
    .upsert(order, { onConflict: 'stripe_session_id' });
  if (error) {
    console.error('Failed to record order', error);
  }

  const productLine = `${esc(order.product_name || 'AED product')} × ${order.quantity}`;
  const amountStr = fmtAmount(order.amount, order.currency);
  const addrStr = formatAddress(shippingAddress);

  // Customer confirmation email
  if (order.customer_email) {
    const html = `
      <div style="font-family:Arial,sans-serif;color:#1a1a1a;max-width:600px;margin:0 auto;padding:24px;">
        <h2 style="margin:0 0 12px;color:#1f7a3d;">Thank you for your order</h2>
        <p style="margin:0 0 20px;color:#55575d;">Hi ${esc(order.customer_name || 'there')}, we've received your order and our team will be in touch shortly to arrange delivery.</p>
        <table style="width:100%;border-collapse:collapse;font-size:14px;">
          <tr><td style="padding:8px 12px;background:#f5f5f5;font-weight:bold;width:140px;">Product</td><td style="padding:8px 12px;border-bottom:1px solid #eee;">${productLine}</td></tr>
          <tr><td style="padding:8px 12px;background:#f5f5f5;font-weight:bold;">Total paid</td><td style="padding:8px 12px;border-bottom:1px solid #eee;">${esc(amountStr)}</td></tr>
          ${addrStr ? `<tr><td style="padding:8px 12px;background:#f5f5f5;font-weight:bold;vertical-align:top;">Delivery to</td><td style="padding:8px 12px;border-bottom:1px solid #eee;">${addrStr}</td></tr>` : ''}
        </table>
        <p style="margin-top:24px;font-size:12px;color:#999;">Order reference: ${esc(order.stripe_session_id)}</p>
        <p style="margin-top:8px;font-size:12px;color:#999;">Smart Defibs — info@smartdefibs.ie</p>
      </div>`;
    await sendEmail({
      to: [order.customer_email],
      subject: 'Your Smart Defibs order confirmation',
      html,
    });
  }

  // Team notification email
  const teamHtml = `
    <div style="font-family:Arial,sans-serif;color:#1a1a1a;max-width:600px;margin:0 auto;padding:24px;">
      <h2 style="margin:0 0 12px;color:#1f7a3d;">New order received${env === 'sandbox' ? ' (TEST)' : ''}</h2>
      <table style="width:100%;border-collapse:collapse;font-size:14px;">
        <tr><td style="padding:8px 12px;background:#f5f5f5;font-weight:bold;width:140px;">Product</td><td style="padding:8px 12px;border-bottom:1px solid #eee;">${productLine}</td></tr>
        <tr><td style="padding:8px 12px;background:#f5f5f5;font-weight:bold;">Total paid</td><td style="padding:8px 12px;border-bottom:1px solid #eee;">${esc(amountStr)}</td></tr>
        <tr><td style="padding:8px 12px;background:#f5f5f5;font-weight:bold;">Customer</td><td style="padding:8px 12px;border-bottom:1px solid #eee;">${esc(order.customer_name || '')}</td></tr>
        <tr><td style="padding:8px 12px;background:#f5f5f5;font-weight:bold;">Email</td><td style="padding:8px 12px;border-bottom:1px solid #eee;"><a href="mailto:${esc(order.customer_email || '')}">${esc(order.customer_email || '')}</a></td></tr>
        <tr><td style="padding:8px 12px;background:#f5f5f5;font-weight:bold;">Phone</td><td style="padding:8px 12px;border-bottom:1px solid #eee;">${esc(customer.phone || '')}</td></tr>
        ${addrStr ? `<tr><td style="padding:8px 12px;background:#f5f5f5;font-weight:bold;vertical-align:top;">Ship to</td><td style="padding:8px 12px;border-bottom:1px solid #eee;">${addrStr}</td></tr>` : ''}
      </table>
      <p style="margin-top:24px;font-size:12px;color:#999;">Order reference: ${esc(order.stripe_session_id)}</p>
    </div>`;
  await sendEmail({
    to: [NOTIFY_TO],
    subject: `New order — ${esc(order.product_name || 'AED product')}${env === 'sandbox' ? ' (TEST)' : ''}`,
    html: teamHtml,
    ...(order.customer_email && { reply_to: order.customer_email }),
  });
}

async function updateOrderStatusByPaymentIntent(
  paymentIntentId: string | null,
  status: string,
  env: StripeEnv,
) {
  if (!paymentIntentId) {
    console.log("No payment_intent on event; skipping status update");
    return;
  }
  const { error } = await getSupabase()
    .from("orders")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("stripe_payment_intent_id", paymentIntentId)
    .eq("environment", env);
  if (error) console.error("Failed to update order status", error);
}

async function handleChargeRefunded(charge: any, env: StripeEnv) {
  const fullyRefunded = charge.amount_refunded >= charge.amount;
  await updateOrderStatusByPaymentIntent(
    charge.payment_intent || null,
    fullyRefunded ? "refunded" : "partially_refunded",
    env,
  );
}

async function handleDisputeCreated(dispute: any, env: StripeEnv) {
  await updateOrderStatusByPaymentIntent(dispute.payment_intent || null, "disputed", env);
}

async function handlePaymentFailed(paymentIntent: any, env: StripeEnv) {
  // Failed payments usually have no recorded order (orders are written on
  // checkout completion). This is a no-op update unless a prior order exists.
  await updateOrderStatusByPaymentIntent(paymentIntent.id || null, "failed", env);
}

async function handleWebhook(req: Request, env: StripeEnv) {
  const event = await verifyWebhook(req, env);
  switch (event.type) {
    case "checkout.session.completed":
      await handleCheckoutCompleted(event.data.object, env);
      break;
    case "charge.refunded":
      await handleChargeRefunded(event.data.object, env);
      break;
    case "charge.dispute.created":
      await handleDisputeCreated(event.data.object, env);
      break;
    case "payment_intent.payment_failed":
      await handlePaymentFailed(event.data.object, env);
      break;
    default:
      console.log("Unhandled event:", event.type);
  }
}

Deno.serve(async (req) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }
  const rawEnv = new URL(req.url).searchParams.get("env");
  if (rawEnv !== "sandbox" && rawEnv !== "live") {
    console.error("Webhook received with invalid or missing env query parameter:", rawEnv);
    return new Response(JSON.stringify({ received: true, ignored: "invalid env" }), {
      status: 200, headers: { "Content-Type": "application/json" },
    });
  }
  const env: StripeEnv = rawEnv;
  try {
    await handleWebhook(req, env);
    return new Response(JSON.stringify({ received: true }), {
      status: 200, headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("Webhook error:", e);
    return new Response("Webhook error", { status: 400 });
  }
});
