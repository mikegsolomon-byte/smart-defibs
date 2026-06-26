import type * as React from 'npm:react@18.3.1'
import { template as quoteNotification } from './quote-notification.tsx'

// A registered email template.
//  - component: the React Email component to render
//  - subject: static string or function of templateData
//  - displayName: human-friendly label (optional)
//  - previewData: sample props for previewing (optional)
//  - to: fixed recipient override (optional). When set, the email always
//    sends to this address regardless of the caller-provided recipientEmail.
export interface TemplateEntry {
  component: (props: any) => React.ReactElement
  subject: string | ((data: Record<string, any>) => string)
  displayName?: string
  previewData?: Record<string, any>
  to?: string
}

export const TEMPLATES: Record<string, TemplateEntry> = {
  'quote-notification': quoteNotification,
}
