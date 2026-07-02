import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors'
import { createClient } from 'npm:@supabase/supabase-js@2'
import { z } from 'npm:zod@3'

const SHEETS_GATEWAY_URL = 'https://connector-gateway.lovable.dev/google_sheets/v4'
const SPREADSHEET_ID = '1Up0fTZSNkSTCD8Fn88dZkcvGkJxuHF0N9T556epwhN8'
const SHEET_TAB = 'Leads'

async function appendToSheet(
  row: { id: string; name: string; organisation: string; sector: string; email: string; phone: string; message: string | null | undefined },
) {
  const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY')
  const SHEETS_API_KEY = Deno.env.get('GOOGLE_SHEETS_API_KEY')
  if (!LOVABLE_API_KEY || !SHEETS_API_KEY) {
    console.error('Missing Google Sheets gateway credentials')
    return false
  }
  const values = [[
    new Date().toISOString(),
    row.name,
    row.organisation,
    row.sector,
    row.email,
    row.phone,
    row.message ?? '',
    row.id,
  ]]
  const url = `${SHEETS_GATEWAY_URL}/spreadsheets/${SPREADSHEET_ID}/values/${SHEET_TAB}!A1:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`
  const resp = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${LOVABLE_API_KEY}`,
      'X-Connection-Api-Key': SHEETS_API_KEY,
    },
    body: JSON.stringify({ values }),
  })
  if (!resp.ok) {
    const body = await resp.text().catch(() => '')
    console.error('Google Sheets append error', resp.status, body)
    return false
  }
  return true
}

const ALLOWED_SECTORS = ['schools', 'nursing', 'workplace', 'gyms', 'community', 'other'] as const

// In-memory rate limiter (per edge-function instance). Not a hard guarantee
// since instances are ephemeral, but blocks casual/burst abuse.
const RATE_LIMIT_MAX = 5
const RATE_LIMIT_WINDOW_MS = 60_000
const rateBuckets = new Map<string, number[]>()

function isRateLimited(key: string): boolean {
  const now = Date.now()
  const hits = (rateBuckets.get(key) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS)
  hits.push(now)
  rateBuckets.set(key, hits)
  return hits.length > RATE_LIMIT_MAX
}

const QuotePayloadSchema = z.object({
  name: z.string().trim().min(1).max(200),
  organisation: z.string().trim().min(1).max(200),
  sector: z.enum(ALLOWED_SECTORS),
  email: z.string().trim().email().max(320),
  phone: z.string().trim().min(1).max(30),
  message: z.string().trim().max(2000).optional().nullable(),
  company_website: z.string().max(200).optional().nullable(),
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

const errorResponse = (status: number, message = 'Internal server error') =>
  new Response(JSON.stringify({ error: message }), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  try {
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY')
    const SUPABASE_URL = Deno.env.get('SUPABASE_URL')
    const SERVICE_ROLE = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
    if (!LOVABLE_API_KEY || !SUPABASE_URL || !SERVICE_ROLE) {
      console.error('Missing required environment variables')
      return errorResponse(500)
    }

    const raw = await req.json().catch(() => null)
    const parsed = BodySchema.safeParse(raw)
    if (!parsed.success) {
      return errorResponse(400, 'Invalid request')
    }

    // Honeypot: bots fill hidden fields. Pretend success, store nothing.
    if ('company_website' in parsed.data && parsed.data.company_website) {
      console.warn('Honeypot triggered — dropping submission')
      return new Response(JSON.stringify({ success: true, emailSent: false, sheetAppended: false }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    // Rate limit by client IP (only for new submissions, not quoteId lookups).
    if (!('quoteId' in parsed.data)) {
      const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
      if (isRateLimited(ip)) {
        console.warn('Rate limit exceeded for', ip)
        return errorResponse(429, 'Too many requests. Please try again in a minute.')
      }
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

    const sheetAppended = await appendToSheet({ id, name, organisation, sector, email, phone, message })

    // Send the notification via the app-email system so it goes out from the
    // verified sender domain (notify.smartdefibs.com). Notify the internal team
    // addresses.
    const NOTIFY_RECIPIENTS = ['info@smartdefibs.ie', 'maciek_koczur@yahoo.com']
    let emailSent = false
    for (const recipient of NOTIFY_RECIPIENTS) {
      const { data: emailResult, error: emailError } = await admin.functions.invoke(
        'send-transactional-email',
        {
          body: {
            templateName: 'quote-notification',
            recipientEmail: recipient,
            idempotencyKey: `quote-${id}-${recipient}`,
            templateData: { name, organisation, sector, email, phone, message, quoteId: id },
          },
        },
      )

      if (emailError) {
        console.error('send-transactional-email error', recipient, emailError)
      } else {
        emailSent = true
        console.log('Quote notification queued', recipient, emailResult)
      }
    }

    if (!emailSent) {
      return new Response(JSON.stringify({ success: true, emailSent: false, sheetAppended }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    return new Response(JSON.stringify({ success: true, emailSent: true, sheetAppended }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (err) {
    console.error('send-quote-notification error', err)
    return errorResponse(500)
  }
})
