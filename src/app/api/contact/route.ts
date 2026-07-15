import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import React from 'react'
import { render } from '@react-email/render'
import { ContactNotification } from '@/emails/ContactNotification'
import { ContactConfirmation } from '@/emails/ContactConfirmation'

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
    const body = (await request.json()) as ContactFormData

    // Validation
    if (!body.name || !body.email || !body.service_type || !body.message) {
      return NextResponse.json(
        { error: 'Vul alle verplichte velden in.' },
        { status: 400 }
      )
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Voer een geldig e-mailadres in.' },
        { status: 400 }
      )
    }

    // Initialize Resend client (only at runtime, not during build)
    const resend = new Resend(process.env.RESEND_API_KEY)

    const agencyTo = process.env.CONTACT_TO_EMAIL ?? 'agencynextx@gmail.com'
    const from = process.env.RESEND_FROM_EMAIL ?? 'noreply@nextxagency.com'
    const receivedAt = new Date().toLocaleString('nl-NL', {
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
      })
    )

    await resend.emails.send({
      from,
      to: agencyTo,
      replyTo: body.email,
      subject: `Nieuw contactverzoek: ${body.service_type} van ${body.name}`,
      html: notificationHtml,
      text: [
        `Nieuw contactverzoek via nextxagency.com`,
        ``,
        `Naam:     ${body.name}`,
        `E-mail:   ${body.email}`,
        body.phone ? `Telefoon: ${body.phone}` : '',
        `Dienst:   ${body.service_type}`,
        body.budget ? `Budget:   ${body.budget}` : '',
        ``,
        `Bericht:`,
        body.message,
        ``,
        receivedAt ? `Ontvangen: ${receivedAt}` : '',
      ].filter(Boolean).join('\n'),
      headers: {
        'X-Priority': '1',
        'X-MSMail-Priority': 'High',
        'Importance': 'High',
      },
      tags: [
        { name: 'category', value: 'contact-notification' },
        { name: 'service', value: body.service_type.replace(/[^a-zA-Z0-9_\-]/g, '-').toLowerCase() },
      ],
    })

    // ── 2. Client confirmation (best-effort) ──────────────────────────────────
    try {
      const confirmationHtml = await render(
        React.createElement(ContactConfirmation, {
          name: body.name,
          email: body.email,
          service_type: body.service_type,
          budget: body.budget,
          receivedAt,
        })
      )

      await resend.emails.send({
        from,
        to: body.email,
        subject: `Wij hebben uw aanvraag ontvangen — NextX Agency`,
        html: confirmationHtml,
        text: [
          `Beste ${body.name},`,
          ``,
          `Bedankt voor uw aanvraag! We hebben het volgende ontvangen:`,
          ``,
          `Dienst:   ${body.service_type}`,
          body.budget ? `Budget:   ${body.budget}` : '',
          ``,
          `Ons team neemt binnen 24 uur contact met u op.`,
          ``,
          `Met vriendelijke groet,`,
          `NextX Agency`,
          `nextxagency.com · +597 831-8508`,
        ].filter(Boolean).join('\n'),
        tags: [{ name: 'category', value: 'contact-confirmation' }],
      })
    } catch (confirmErr) {
      console.error('Confirmation email failed (non-fatal):', confirmErr)
    }

    return NextResponse.json({
      success: true,
      message: 'Uw bericht is verzonden. Wij nemen binnen 24 uur contact op.',
    })
  } catch (error) {
    console.error('Contact route error:', error)
    return NextResponse.json(
      { error: 'Er is een interne fout opgetreden. Probeer het later opnieuw.' },
      { status: 500 }
    )
  }
}
