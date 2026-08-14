import { createClient } from "npm:@supabase/supabase-js@2";
import { type StripeEnv, verifyWebhook } from "../_shared/stripe.ts";

const NOTIFY_TO = ['info@smartdefibs.com', 'maciek_koczur@yahoo.com'];
// Verified sender domain used by the app-email infrastructure.
const SENDER_DOMAIN = 'notify.smartdefibs.com';
const FROM_ADDR = `Smart Defibs <noreply@${SENDER_DOMAIN}>`;

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

const htmlToText = (html: string) =>
  html.replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/(p|div|tr|h[1-6]|li)>/gi, '\n')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/[ \t]+/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim();

// Sends through the project's app-email queue so mail goes out from the
// verified sender domain (notify.smartdefibs.com).
async function sendEmail(payload: {
  to: string[];
  subject: string;
  html: string;
  reply_to?: string;
  label?: string;
  idempotencyKey?: string;
}) {
  const supabase = getSupabase();
  let ok = true;

  for (const recipient of payload.to) {
    const messageId = crypto.randomUUID();
    const label = payload.label || 'payments-webhook';
    const idempotencyKey = payload.idempotencyKey
      ? `${payload.idempotencyKey}-${recipient}`
      : messageId;

    const { error: logError } = await supabase.from('email_send_log').insert({
      message_id: messageId,
      template_name: label,
      recipient_email: recipient,
      status: 'pending',
    });
    if (logError) console.error('Failed to log email', logError);

    const { error } = await supabase.rpc('enqueue_email', {
      queue_name: 'transactional_emails',
      payload: {
        message_id: messageId,
        to: recipient,
        from: FROM_ADDR,
        sender_domain: SENDER_DOMAIN,
        reply_to: payload.reply_to,
        subject: payload.subject,
        html: payload.html,
        text: htmlToText(payload.html),
        purpose: 'transactional',
        label,
        idempotency_key: idempotencyKey,
        queued_at: new Date().toISOString(),
      },
    });
    if (error) {
      console.error('Failed to enqueue email', recipient, error);
      ok = false;
    }
  }

  return ok;
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
    to: NOTIFY_TO,
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

function subscriptionRow(subscription: any, env: StripeEnv) {
  const item = subscription.items?.data?.[0];
  const priceId = item?.price?.lookup_key
    || item?.price?.metadata?.lovable_external_id
    || item?.price?.id
    || null;
  const productId = typeof item?.price?.product === 'string' ? item.price.product : null;
  const periodStart = item?.current_period_start ?? subscription.current_period_start;
  const periodEnd = item?.current_period_end ?? subscription.current_period_end;

  return {
    stripe_subscription_id: subscription.id as string,
    stripe_customer_id: (subscription.customer as string) || null,
    customer_email: subscription.metadata?.customer_email || null,
    product_id: subscription.metadata?.product_id || productId,
    price_id: priceId,
    plan_name: subscription.metadata?.product_name || null,
    amount: item?.price?.unit_amount ?? null,
    currency: item?.price?.currency || 'eur',
    status: subscription.status as string,
    current_period_start: periodStart ? new Date(periodStart * 1000).toISOString() : null,
    current_period_end: periodEnd ? new Date(periodEnd * 1000).toISOString() : null,
    cancel_at_period_end: !!subscription.cancel_at_period_end,
    environment: env,
    updated_at: new Date().toISOString(),
  };
}

const shell = (title: string, bodyHtml: string, footer?: string) => `
  <div style="font-family:Arial,sans-serif;color:#1a1a1a;max-width:600px;margin:0 auto;padding:24px;">
    <h2 style="margin:0 0 12px;color:#1f7a3d;">${title}</h2>
    ${bodyHtml}
    ${footer ? `<p style="margin-top:24px;font-size:12px;color:#999;">${footer}</p>` : ''}
    <p style="margin-top:8px;font-size:12px;color:#999;">Smart Defibs — info@smartdefibs.com</p>
  </div>`;

const kvTable = (rows: [string, string][]) => `
  <table style="width:100%;border-collapse:collapse;font-size:14px;">
    ${rows.filter(([, v]) => v).map(([k, v]) => `<tr><td style="padding:8px 12px;background:#f5f5f5;font-weight:bold;width:150px;">${esc(k)}</td><td style="padding:8px 12px;border-bottom:1px solid #eee;">${v}</td></tr>`).join('')}
  </table>`;

const fmtDate = (iso?: string | null) =>
  iso ? new Date(iso).toLocaleDateString('en-IE', { day: 'numeric', month: 'long', year: 'numeric' }) : '';

// Billing cadence for email copy. Prefers the Stripe price interval, and falls
// back to the length of the recorded billing period (yearly plans span ~365d).
const cadence = (subscription?: any, row?: Record<string, any> | null) => {
  const price = subscription?.items?.data?.[0]?.price?.recurring;
  let interval: string | undefined = price?.interval;
  const count = price?.interval_count ?? 1;
  if (!interval && row?.current_period_start && row?.current_period_end) {
    const days = (new Date(row.current_period_end).getTime() - new Date(row.current_period_start).getTime()) / 86400000;
    interval = days > 45 ? 'year' : 'month';
  }
  const isYear = interval === 'year' || (interval === 'month' && count === 12);
  return {
    per: isYear ? 'per year' : 'per month',
    costLabel: isYear ? 'Yearly cost' : 'Monthly cost',
  };
};


async function getSubscriptionRow(subscriptionId: string, env: StripeEnv) {
  const { data } = await getSupabase()
    .from('subscriptions')
    .select('*')
    .eq('stripe_subscription_id', subscriptionId)
    .eq('environment', env)
    .maybeSingle();
  return data as Record<string, any> | null;
}

async function handleSubscriptionUpserted(subscription: any, env: StripeEnv, isNew: boolean) {
  const previous = isNew ? null : await getSubscriptionRow(subscription.id, env);
  const row = subscriptionRow(subscription, env);
  // Stripe subscription metadata may lack the email for guest checkout; keep
  // whatever the checkout session already recorded.
  if (!row.customer_email && previous?.customer_email) {
    row.customer_email = previous.customer_email;
  }

  const { error } = await getSupabase()
    .from('subscriptions')
    .upsert(row, { onConflict: 'stripe_subscription_id' });
  if (error) console.error('Failed to record subscription', error);

  const planName = row.plan_name || row.price_id || 'Defibrillator package';
  const amountStr = fmtAmount(row.amount, row.currency);
  const { per } = cadence(subscription, row);
  const ref = `Subscription reference: ${esc(row.stripe_subscription_id)}`;

  if (isNew) {
    await sendEmail({
      to: NOTIFY_TO,
      subject: `New plan subscription — ${planName}${env === 'sandbox' ? ' (TEST)' : ''}`,
      html: shell(`New plan subscription${env === 'sandbox' ? ' (TEST)' : ''}`, kvTable([
        ['Plan', esc(planName)],
        ['Billing', `${esc(amountStr)} ${per}`],
        ['Status', esc(row.status)],
        ['Customer', esc(row.customer_email || '')],
        ['Renews', esc(fmtDate(row.current_period_end))],
      ]), ref),
      ...(row.customer_email && { reply_to: row.customer_email }),
    });
    return;
  }

  // Cancellation scheduled — access continues until the paid-through date.
  if (row.cancel_at_period_end && previous && !previous.cancel_at_period_end) {
    const endStr = fmtDate(row.current_period_end);
    if (row.customer_email) {
      await sendEmail({
        to: [row.customer_email],
        subject: 'Your Smart Defibs plan has been cancelled',
        html: shell('Your plan cancellation is confirmed', `
          <p style="margin:0 0 16px;color:#55575d;">We've cancelled your <strong>${esc(planName)}</strong> plan. You'll keep full cover, monitoring and support until <strong>${esc(endStr)}</strong>, and you won't be billed again.</p>
          <p style="margin:0 0 16px;color:#55575d;">If this was a mistake, or you'd like to talk through your options, just reply to this email and we'll sort it out.</p>`, ref),
      });
    }
    await sendEmail({
      to: NOTIFY_TO,
      subject: `Plan cancelled — ${planName}${env === 'sandbox' ? ' (TEST)' : ''}`,
      html: shell('Plan cancellation scheduled', kvTable([
        ['Plan', esc(planName)],
        ['Customer', esc(row.customer_email || '')],
        ['Access until', esc(endStr)],
      ]), ref),
      ...(row.customer_email && { reply_to: row.customer_email }),
    });
    return;
  }

  // Plan upgrade / downgrade — the price on the subscription changed.
  if (previous && previous.price_id && row.price_id && previous.price_id !== row.price_id) {
    const fromName = previous.plan_name || previous.price_id;
    if (row.customer_email) {
      await sendEmail({
        to: [row.customer_email],
        subject: 'Your Smart Defibs plan has been updated',
        html: shell('Your plan has been updated', `
          <p style="margin:0 0 16px;color:#55575d;">Your plan has changed from <strong>${esc(fromName)}</strong> to <strong>${esc(planName)}</strong>. Your new rate is <strong>${esc(amountStr)} ${per}</strong> and takes effect immediately.</p>
          ${kvTable([['New plan', esc(planName)], ['Next renewal', esc(fmtDate(row.current_period_end))]])}`, ref),
      });
    }
    await sendEmail({
      to: NOTIFY_TO,
      subject: `Plan changed — ${fromName} → ${planName}${env === 'sandbox' ? ' (TEST)' : ''}`,
      html: shell('Plan changed', kvTable([
        ['From', esc(String(fromName))],
        ['To', esc(planName)],
        ['Customer', esc(row.customer_email || '')],
        ['New rate', `${esc(amountStr)} ${per}`],
      ]), ref),
      ...(row.customer_email && { reply_to: row.customer_email }),
    });
  }
}

// Sent when the subscription checkout session completes, because that is where
// the customer's email is reliably available for guest checkout.
async function handleSubscriptionCheckout(session: any, env: StripeEnv) {
  const subscriptionId = typeof session.subscription === 'string' ? session.subscription : session.subscription?.id;
  const customer = session.customer_details || {};
  const email = customer.email || session.customer_email || null;
  const meta = session.metadata || {};
  const planName = meta.product_name || 'Defibrillator package';

  if (subscriptionId && email) {
    const { error } = await getSupabase()
      .from('subscriptions')
      .update({ customer_email: email, updated_at: new Date().toISOString() })
      .eq('stripe_subscription_id', subscriptionId)
      .eq('environment', env);
    if (error) console.error('Failed to attach email to subscription', error);
  }

  if (!email) return;
  const stored = subscriptionId ? await getSubscriptionRow(subscriptionId, env) : null;
  const amountStr = fmtAmount(stored?.amount ?? session.amount_total, stored?.currency ?? session.currency);
  const { costLabel } = cadence(null, stored);
  const addrStr = formatAddress(session.shipping_details?.address || customer.address || null);

  await sendEmail({
    to: [email],
    subject: 'Welcome to Smart Defibs — your plan is active',
    html: shell('Welcome to Smart Defibs', `
      <p style="margin:0 0 16px;color:#55575d;">Hi ${esc(customer.name || 'there')}, your <strong>${esc(planName)}</strong> plan is now active. Thank you for choosing Smart Defibs.</p>
      ${kvTable([
        ['Plan', esc(planName)],
        [costLabel, esc(amountStr)],
        ['Renews', esc(fmtDate(stored?.current_period_end))],
        ['Install address', addrStr],
      ])}
      <h3 style="margin:24px 0 8px;font-size:16px;">What's included</h3>
      <ul style="margin:0 0 16px;padding-left:20px;color:#55575d;font-size:14px;line-height:1.6;">
        <li>Your defibrillator, cabinet and all consumables</li>
        <li>Remote monitoring with automatic readiness checks</li>
        <li>Pad and battery replacement as they expire</li>
        <li>Ongoing servicing and technical support</li>
      </ul>
      <h3 style="margin:24px 0 8px;font-size:16px;">What happens next</h3>
      <p style="margin:0 0 16px;color:#55575d;">Our team will contact you within one working day to arrange delivery, installation and any training you need. You can reach us any time at info@smartdefibs.com or 090 664 1050.</p>`,
      subscriptionId ? `Subscription reference: ${esc(subscriptionId)}` : undefined),
  });
}

async function handleSubscriptionDeleted(subscription: any, env: StripeEnv) {
  const previous = await getSubscriptionRow(subscription.id, env);
  const { error } = await getSupabase()
    .from('subscriptions')
    .update({ status: 'canceled', updated_at: new Date().toISOString() })
    .eq('stripe_subscription_id', subscription.id)
    .eq('environment', env);
  if (error) console.error('Failed to cancel subscription', error);

  const planName = previous?.plan_name || previous?.price_id || 'Defibrillator package';
  const email = previous?.customer_email || null;
  const ref = `Subscription reference: ${esc(subscription.id)}`;

  if (email) {
    await sendEmail({
      to: [email],
      subject: 'Your Smart Defibs plan has ended',
      html: shell('Your plan has ended', `
        <p style="margin:0 0 16px;color:#55575d;">Your <strong>${esc(planName)}</strong> plan has now ended and no further payments will be taken.</p>
        <p style="margin:0 0 16px;color:#55575d;">We'll be in touch about collecting the equipment. If you'd like to restart cover at any point, reply to this email or call us on 090 664 1050.</p>`, ref),
    });
  }
  await sendEmail({
    to: NOTIFY_TO,
    subject: `Plan ended — ${planName}${env === 'sandbox' ? ' (TEST)' : ''}`,
    html: shell('Plan ended', kvTable([
      ['Plan', esc(String(planName))],
      ['Customer', esc(email || '')],
      ['Ended', esc(fmtDate(new Date().toISOString()))],
    ]), ref),
    ...(email && { reply_to: email }),
  });
}

async function handleWebhook(req: Request, env: StripeEnv) {
  const event = await verifyWebhook(req, env);
  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object;
      // Subscription rows are written by customer.subscription.*; this branch
      // attaches the customer email and sends the welcome email.
      if (session.mode === "subscription") {
        await handleSubscriptionCheckout(session, env);
        break;
      }
      await handleCheckoutCompleted(session, env);
      break;
    }
    case "customer.subscription.created":
      await handleSubscriptionUpserted(event.data.object, env, true);
      break;
    case "customer.subscription.updated":
      await handleSubscriptionUpserted(event.data.object, env, false);
      break;
    case "customer.subscription.deleted":
      await handleSubscriptionDeleted(event.data.object, env);
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
