import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import React from 'react'
import { render } from '@react-email/render'
import { ContactNotification } from '@/emails/ContactNotification'
import { ContactConfirmation } from '@/emails/ContactConfirmation'
import { CONTACT } from '@/lib/contact'
import { contactLimits, validateContact } from '@/lib/contact-validation'
import { checkContactRateLimit } from '@/lib/contact-rate-limit'
import { createHash } from 'node:crypto'

interface ContactFormData {
  name: string
  email: string
  phone?: string
  service_type: string
  budget?: string
  message: string
}

export async function POST(request: NextRequest) {
  try {
    const origin = request.headers.get('origin')
    if (origin && origin !== request.nextUrl.origin) {
      return NextResponse.json(
        { error: 'This request is not allowed.' },
        { status: 403 },
      )
    }
    if (Number(request.headers.get('content-length')) > 24000) {
      return NextResponse.json(
        { error: 'Your message is too large.' },
        { status: 413 },
      )
    }
    const text = await request.text()
    if (new TextEncoder().encode(text).length > 24000) {
      return NextResponse.json(
        { error: 'Your message is too large.' },
        { status: 413 },
      )
    }
    let input: unknown
    try {
      input = JSON.parse(text)
    } catch {
      return NextResponse.json(
        { error: 'Please check the fields you filled in.' },
        { status: 400 },
      )
    }
    if (!input || typeof input !== 'object' || Array.isArray(input)) {
      return NextResponse.json(
        { error: 'Please fill in all required fields.' },
        { status: 400 },
      )
    }
    const raw = input as Record<string, unknown>
    if (
      raw.website ||
      (raw.website !== undefined && typeof raw.website !== 'string')
    ) {
      return NextResponse.json(
        {
          error:
            'This request could not be processed. Please contact us on WhatsApp.',
        },
        { status: 400 },
      )
    }
    const fields = Object.keys(contactLimits) as (keyof typeof contactLimits)[]
    if (
      fields.some(
        (key) => raw[key] !== undefined && typeof raw[key] !== 'string',
      )
    ) {
      return NextResponse.json(
        { error: 'Please check the fields you filled in.' },
        { status: 400 },
      )
    }
    const body = Object.fromEntries(
      fields.map((key) => [
        key,
        typeof raw[key] === 'string' ? raw[key].trim() : '',
      ]),
    ) as unknown as Required<ContactFormData>
    const errors = validateContact(body)
    if (Object.keys(errors).length) {
      return NextResponse.json(
        { error: Object.values(errors)[0], errors },
        { status: 400 },
      )
    }
    // Vercel supplies this header; other hosts use their proxy's forwarded address.
    const ip =
      request.headers.get('x-vercel-forwarded-for')?.split(',')[0].trim() ||
      request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
      'unknown'
    const rate = await checkContactRateLimit(ip)
    if (!rate.allowed) {
      return NextResponse.json(
        {
          error:
            'You have sent several messages. Please wait a moment or use WhatsApp.',
        },
        { status: 429, headers: { 'Retry-After': String(rate.retryAfter) } },
      )
    }
    if (!process.env.RESEND_API_KEY?.trim()) {
      console.error('Contact unavailable: RESEND_API_KEY is missing')
      return NextResponse.json(
        {
          error:
            'The form is temporarily unavailable. Please contact us on WhatsApp or by email.',
        },
        { status: 503 },
      )
    }
    const resend = new Resend(process.env.RESEND_API_KEY)
    // A stable key on retries prevents duplicate notifications at the provider.
    const requestId =
      typeof raw.request_id === 'string' &&
      /^[a-zA-Z0-9-]{16,64}$/.test(raw.request_id)
        ? raw.request_id
        : ''
    const fingerprint = createHash('sha256')
      .update(JSON.stringify(body))
      .digest('hex')
    const idempotencyKey = `contact-${requestId || Math.floor(Date.now() / 600000)}-${fingerprint}`

    const agencyTo = process.env.CONTACT_TO_EMAIL ?? CONTACT.email
    const from = process.env.RESEND_FROM_EMAIL ?? 'noreply@nextxagency.com'
    const submittedAt =
      typeof raw.submitted_at === 'number' &&
      Number.isFinite(raw.submitted_at) &&
      Math.abs(Date.now() - raw.submitted_at) <= 86400000
        ? raw.submitted_at
        : Math.floor(Date.now() / 600000) * 600000
    const receivedAt = new Date(submittedAt).toLocaleString('en-GB', {
      timeZone: 'America/Paramaribo',
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })

    // ── 1. Agency notification ────────────────────────────────────────────────
    const notificationHtml = await render(
      React.createElement(ContactNotification, {
        name: body.name,
        email: body.email,
        phone: body.phone,
        service_type: body.service_type,
        budget: body.budget,
        message: body.message,
        receivedAt,
      }),
    )

    const notification = await resend.emails.send(
      {
        from,
        to: agencyTo,
        replyTo: body.email,
        subject: `New enquiry: ${body.service_type} from ${body.name}`,
        html: notificationHtml,
        text: [
          `New enquiry from nextxagency.com`,
          ``,
          `Name:     ${body.name}`,
          `Email:    ${body.email}`,
          body.phone ? `Phone:    ${body.phone}` : '',
          `Service:  ${body.service_type}`,
          body.budget ? `Budget:   ${body.budget}` : '',
          ``,
          `Message:`,
          body.message,
          ``,
          receivedAt ? `Received: ${receivedAt}` : '',
        ]
          .filter(Boolean)
          .join('\n'),
        headers: {
          'X-Priority': '1',
          'X-MSMail-Priority': 'High',
          Importance: 'High',
        },
        tags: [
          { name: 'category', value: 'contact-notification' },
          {
            name: 'service',
            value: body.service_type
              .replace(/[^a-zA-Z0-9_\-]/g, '-')
              .toLowerCase(),
          },
        ],
      },
      { idempotencyKey: `${idempotencyKey}-agency` },
    )

    if (notification.error || !notification.data?.id)
      throw new Error('Agency notification was not accepted by provider')

    // ── 2. Client confirmation (best-effort) ──────────────────────────────────
    let confirmationAccepted = false
    try {
      const confirmationHtml = await render(
        React.createElement(ContactConfirmation, {
          name: body.name,
          email: body.email,
          service_type: body.service_type,
          budget: body.budget,
          receivedAt,
        }),
      )

      const confirmation = await resend.emails.send(
        {
          from,
          to: body.email,
          subject: `We received your request — NextX Agency`,
          html: confirmationHtml,
          text: [
            `Dear ${body.name},`,
            ``,
            `Thank you for your request! We received the following:`,
            ``,
            `Service:  ${body.service_type}`,
            body.budget ? `Budget:   ${body.budget}` : '',
            ``,
            `We will get in touch ${CONTACT.responseTime}.`,
            ``,
            `Kind regards,`,
            `NextX Agency`,
            `nextxagency.com · ${CONTACT.phoneDisplay}`,
          ]
            .filter(Boolean)
            .join('\n'),
          replyTo: CONTACT.email,
          tags: [{ name: 'category', value: 'contact-confirmation' }],
        },
        { idempotencyKey: `${idempotencyKey}-confirmation` },
      )
      if (confirmation.error || !confirmation.data?.id)
        throw new Error('Confirmation was not accepted by provider')
      confirmationAccepted = true
    } catch (confirmErr) {
      console.error(
        'Contact confirmation was not accepted',
        confirmErr instanceof Error ? confirmErr.name : 'ProviderError',
      )
    }

    return NextResponse.json({
      success: true,
      notificationAccepted: true,
      confirmationAccepted,
      message: `Your request was received. We will get in touch ${CONTACT.responseTime}.`,
    })
  } catch (error) {
    console.error(
      'Contact request failed',
      error instanceof Error ? error.name : 'ProviderError',
    )
    return NextResponse.json(
      {
        error:
          'Sending was not confirmed. Please try again or contact us on WhatsApp.',
      },
      { status: 500 },
    )
  }
}
