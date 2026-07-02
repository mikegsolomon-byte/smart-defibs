import * as React from 'npm:react@18.3.1'
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

interface Props {
  name?: string
  organisation?: string
  sector?: string
  email?: string
  phone?: string
  message?: string | null
  quoteId?: string
}

const Email = ({
  name,
  organisation,
  sector,
  email,
  phone,
  message,
  quoteId,
}: Props) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>
      New quote request{organisation ? ` from ${organisation}` : ''}
    </Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={header}>
          <Heading style={h1}>New quote request</Heading>
          <Text style={subtitle}>
            A new enquiry has been submitted via smartdefibs.com.
          </Text>
        </Section>

        <Section style={card}>
          <Row label="Name" value={name} />
          <Row label="Organisation" value={organisation} />
          <Row label="Sector" value={sector} />
          <Row label="Email" value={email} />
          <Row label="Phone" value={phone} />
          {message ? <Row label="Message" value={message} /> : null}
        </Section>

        <Hr style={hr} />
        <Text style={meta}>Quote ID: {quoteId ?? '—'}</Text>
      </Container>
    </Body>
  </Html>
)

const Row = ({ label, value }: { label: string; value?: string | null }) => (
  <table style={rowTable}>
    <tbody>
      <tr>
        <td style={labelCell}>{label}</td>
        <td style={valueCell}>{value ?? '—'}</td>
      </tr>
    </tbody>
  </table>
)

export const template = {
  component: Email,
  subject: (data: Record<string, any>) =>
    `New quote request — ${data?.organisation ?? 'Website'}${data?.sector ? ` (${data.sector})` : ''}`,
  displayName: 'Quote request notification',
  previewData: {
    name: 'Jane Doe',
    organisation: 'Riverside Gym',
    sector: 'gyms',
    email: 'jane@riversidegym.ie',
    phone: '+353 87 123 4567',
    message: 'Looking for two AEDs and a service plan.',
    quoteId: '00000000-0000-0000-0000-000000000000',
  },
} satisfies TemplateEntry

const main = {
  backgroundColor: '#ffffff',
  fontFamily: 'Arial, Helvetica, sans-serif',
}
const container = { maxWidth: '600px', margin: '0 auto', padding: '24px' }
const header = { paddingBottom: '8px' }
const h1 = { color: '#1c5c33', fontSize: '22px', margin: '0 0 8px' }
const subtitle = { color: '#55575d', fontSize: '14px', margin: '0 0 16px' }
const card = {
  border: '1px solid #eaeaea',
  borderRadius: '8px',
  padding: '8px 16px',
}
const rowTable = { width: '100%', borderCollapse: 'collapse' as const }
const labelCell = {
  width: '140px',
  padding: '10px 8px',
  fontWeight: 'bold' as const,
  color: '#1a1a1a',
  fontSize: '14px',
  verticalAlign: 'top' as const,
}
const valueCell = {
  padding: '10px 8px',
  color: '#333',
  fontSize: '14px',
  whiteSpace: 'pre-wrap' as const,
}
const hr = { borderColor: '#eaeaea', margin: '24px 0 12px' }
const meta = { color: '#999', fontSize: '12px', margin: 0 }

export default Email
