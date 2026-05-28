import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors'
import { createClient } from 'npm:@supabase/supabase-js@2'
import { z } from 'npm:zod@3'

const GATEWAY_URL = 'https://connector-gateway.lovable.dev/resend'
const NOTIFY_TO = 'info@smartdefibs.ie'
const FROM_ADDR = 'Smart Defibs Website <onboarding@resend.dev>'

const ALLOWED_SECTORS = ['schools', 'nursing', 'workplace', 'community', 'other'] as const

const QuotePayloadSchema = z.object({
  name: z.string().trim().min(1).max(200),
  organisation: z.string().trim().min(1).max(200),
  sector: z.enum(ALLOWED_SECTORS),
  email: z.string().trim().email().max(320),
  phone: z.string().trim().min(1).max(30),
  message: z.string().trim().max(2000).optional().nullable(),
})

const BodySchema = z.union([
  z.object({ quoteId: z.string().uuid() }),
  QuotePayloadSchema,
])

const RowSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).max(200),
  organisation: z.string().min(1).max(200),
  sector: z.enum(ALLOWED_SECTORS),
  email: z.string().email().max(320),
  phone: z.string().min(1).max(30),
  message: z.string().max(2000).nullable().optional(),
})

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

const errorResponse = (status: number, message = 'Internal server error') =>
  new Response(JSON.stringify({ error: message }), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  try {
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY')
    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
    const SUPABASE_URL = Deno.env.get('SUPABASE_URL')
    const SERVICE_ROLE = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
    if (!LOVABLE_API_KEY || !RESEND_API_KEY || !SUPABASE_URL || !SERVICE_ROLE) {
      console.error('Missing required environment variables')
      return errorResponse(500)
    }

    const raw = await req.json().catch(() => null)
    const parsed = BodySchema.safeParse(raw)
    if (!parsed.success) {
      return errorResponse(400, 'Invalid request')
    }

    const admin = createClient(SUPABASE_URL, SERVICE_ROLE)
    const rowResult = 'quoteId' in parsed.data
      ? await admin
          .from('quote_requests')
          .select('id, name, organisation, sector, email, phone, message')
          .eq('id', parsed.data.quoteId)
          .maybeSingle()
      : await admin
          .from('quote_requests')
          .insert({
            name: parsed.data.name,
            organisation: parsed.data.organisation,
            sector: parsed.data.sector,
            email: parsed.data.email,
            phone: parsed.data.phone,
            message: parsed.data.message || null,
          })
          .select('id, name, organisation, sector, email, phone, message')
          .single()

    if (rowResult.error) {
      console.error('DB quote request error', rowResult.error)
      return errorResponse(500)
    }
    if (!rowResult.data) {
      return errorResponse(404, 'Not found')
    }

    const validated = RowSchema.safeParse(rowResult.data)
    if (!validated.success) {
      console.error('Stored row failed validation', validated.error.flatten())
      return errorResponse(500)
    }
    const { id, name, organisation, sector, email, phone, message } = validated.data

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
        <p style="margin-top:24px;font-size:12px;color:#999;">Quote ID: ${esc(id)}</p>
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
      return errorResponse(502, 'Email send failed')
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (err) {
    console.error('send-quote-notification error', err)
    return errorResponse(500)
  }
})
