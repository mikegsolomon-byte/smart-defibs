import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors'

const GATEWAY_URL = 'https://connector-gateway.lovable.dev/resend'
const NOTIFY_TO = 'info@smartdefibs.ie'
const FROM_ADDR = 'Smart Defibs Website <onboarding@resend.dev>'

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  try {
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY')
    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
    if (!LOVABLE_API_KEY) throw new Error('LOVABLE_API_KEY not configured')
    if (!RESEND_API_KEY) throw new Error('RESEND_API_KEY not configured')

    const body = await req.json().catch(() => ({}))
    const {
      quoteId = '',
      name = '',
      organisation = '',
      sector = '',
      email = '',
      phone = '',
      message = '',
    } = body ?? {}

    if (!name || !organisation || !sector || !email || !phone) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const subject = `New quote request — ${organisation} (${sector})`
    const html = `
      <div style="font-family:Arial,sans-serif;color:#1a1a1a;max-width:600px;margin:0 auto;padding:24px;">
        <h2 style="margin:0 0 16px;color:#d92534;">New quote request</h2>
        <p style="margin:0 0 24px;color:#55575d;">A new enquiry has been submitted via smartdefibs.ie.</p>
        <table style="width:100%;border-collapse:collapse;font-size:14px;">
          <tr><td style="padding:8px 12px;background:#f5f5f5;font-weight:bold;width:140px;">Name</td><td style="padding:8px 12px;border-bottom:1px solid #eee;">${esc(name)}</td></tr>
          <tr><td style="padding:8px 12px;background:#f5f5f5;font-weight:bold;">Organisation</td><td style="padding:8px 12px;border-bottom:1px solid #eee;">${esc(organisation)}</td></tr>
          <tr><td style="padding:8px 12px;background:#f5f5f5;font-weight:bold;">Sector</td><td style="padding:8px 12px;border-bottom:1px solid #eee;">${esc(sector)}</td></tr>
          <tr><td style="padding:8px 12px;background:#f5f5f5;font-weight:bold;">Email</td><td style="padding:8px 12px;border-bottom:1px solid #eee;"><a href="mailto:${esc(email)}">${esc(email)}</a></td></tr>
          <tr><td style="padding:8px 12px;background:#f5f5f5;font-weight:bold;">Phone</td><td style="padding:8px 12px;border-bottom:1px solid #eee;"><a href="tel:${esc(phone)}">${esc(phone)}</a></td></tr>
          ${message ? `<tr><td style="padding:8px 12px;background:#f5f5f5;font-weight:bold;vertical-align:top;">Message</td><td style="padding:8px 12px;border-bottom:1px solid #eee;white-space:pre-wrap;">${esc(message)}</td></tr>` : ''}
        </table>
        <p style="margin-top:24px;font-size:12px;color:#999;">Quote ID: ${esc(quoteId)}</p>
        <p style="margin-top:8px;font-size:12px;color:#999;">Reply to this email to respond directly to the customer.</p>
      </div>
    `

    const resp = await fetch(`${GATEWAY_URL}/emails`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        'X-Connection-Api-Key': RESEND_API_KEY,
      },
      body: JSON.stringify({
        from: FROM_ADDR,
        to: [NOTIFY_TO],
        reply_to: email,
        subject,
        html,
      }),
    })

    const data = await resp.json().catch(() => ({}))
    if (!resp.ok) {
      console.error('Resend error', resp.status, data)
      return new Response(JSON.stringify({ error: 'Email send failed', details: data }), {
        status: 502,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    return new Response(JSON.stringify({ success: true, id: data?.id }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (err) {
    console.error('send-quote-notification error', err)
    return new Response(
      JSON.stringify({ error: err instanceof Error ? err.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    )
  }
})
