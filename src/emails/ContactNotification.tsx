import * as React from 'react'
import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Row,
  Column,
  Text,
  Img,
  Link,
  Button,
  Hr,
  Preview,
  Font,
} from '@react-email/components'

export interface ContactNotificationProps {
  name: string
  email: string
  phone?: string
  service_type: string
  budget?: string
  message: string
  receivedAt?: string
}

export function ContactNotification({
  name,
  email,
  phone,
  service_type,
  budget,
  message,
  receivedAt,
}: ContactNotificationProps) {
  const replySubject = `Re: ${service_type} aanvraag van ${name}`
  const replyBody = `Beste ${name},%0A%0ABedankt voor uw interesse in onze ${service_type} dienst.%0A%0AGroeten,%0ANextX Agency`
  const mailtoHref = `mailto:${email}?subject=${encodeURIComponent(replySubject)}&body=${replyBody}`

  return (
    <Html lang="nl">
      <Head>
        <Font
          fontFamily="Inter"
          fallbackFontFamily="Helvetica"
          webFont={{
            url: 'https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiJ-Ek-_EeA.woff2',
            format: 'woff2',
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      <Preview>
        {name} â€” {service_type}{budget ? ` Â· ${budget}` : ''} Â· Beantwoord direct via deze mail
      </Preview>

      <Body style={s.body}>
        <Container style={s.container}>

          {/* â”€â”€ Logo â”€â”€ */}
          <Section style={s.logoRow}>
            <Img
              src="https://nextxagency.com/logo-light.png"
              alt="NextX Agency"
              width="120"
              height="48"
              style={s.logo}
            />
          </Section>

          {/* â”€â”€ Card â”€â”€ */}
          <Section style={s.card}>

            {/* Service + meta */}
            <Row style={s.metaRow}>
              <Column>
                <Text style={s.metaLabel}>Dienst</Text>
                <Text style={s.metaValue}>{service_type}</Text>
              </Column>
              {budget ? (
                <Column style={s.metaRightCol}>
                  <Text style={s.metaLabel}>Budget</Text>
                  <Text style={s.metaValue}>{budget}</Text>
                </Column>
              ) : null}
            </Row>

            <Hr style={s.divider} />

            {/* Client details */}
            <Text style={s.sectionLabel}>Van</Text>

            <Row style={s.fieldRow}>
              <Column style={s.fieldLabelCol}><Text style={s.fieldLabel}>Naam</Text></Column>
              <Column><Text style={s.fieldValue}>{name}</Text></Column>
            </Row>
            <Hr style={s.rowDivider} />
            <Row style={s.fieldRow}>
              <Column style={s.fieldLabelCol}><Text style={s.fieldLabel}>E-mail</Text></Column>
              <Column><Link href={`mailto:${email}`} style={s.fieldLink}>{email}</Link></Column>
            </Row>
            {phone ? (
              <>
                <Hr style={s.rowDivider} />
                <Row style={s.fieldRow}>
                  <Column style={s.fieldLabelCol}><Text style={s.fieldLabel}>Telefoon</Text></Column>
                  <Column><Link href={`tel:${phone.replace(/\s/g, '')}`} style={s.fieldLink}>{phone}</Link></Column>
                </Row>
              </>
            ) : null}

            <Hr style={s.divider} />

            {/* Message */}
            <Text style={s.sectionLabel}>Bericht</Text>
            <Text style={s.messageText}>{message}</Text>

            <Hr style={s.divider} />

            {/* Reply CTA */}
            <Section style={s.ctaWrap}>
              <Button href={mailtoHref} style={s.ctaBtn}>
                Beantwoorden
              </Button>
            </Section>

          </Section>

          {/* â”€â”€ Footer â”€â”€ */}
          <Text style={s.footerText}>
            Ontvangen via{' '}
            <Link href="https://nextxagency.com/contact" style={s.footerLink}>nextxagency.com/contact</Link>
            {receivedAt ? ` Â· ${receivedAt}` : ''}
          </Text>

        </Container>
      </Body>
    </Html>
  )
}

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

const s = {
  body: {
    backgroundColor: '#f8fafc',
    fontFamily: '"Inter", Helvetica, Arial, sans-serif',
    margin: '0',
    padding: '0',
  },
  container: {
    maxWidth: '560px',
    margin: '0 auto',
    padding: '40px 16px 48px',
  },

  /* Logo */
  logoRow: {
    paddingBottom: '24px',
  },
  logo: {
    display: 'block',
    objectFit: 'contain' as const,
  },

  /* Main card */
  card: {
    backgroundColor: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '12px',
    padding: '32px',
    marginBottom: '20px',
  },

  /* Service / budget meta */
  metaRow: {
    marginBottom: '4px',
  },
  metaRightCol: {
    textAlign: 'right' as const,
    verticalAlign: 'top' as const,
  },
  metaLabel: {
    color: '#94a3b8',
    fontSize: '11px',
    fontWeight: '600' as const,
    letterSpacing: '0.08em',
    textTransform: 'uppercase' as const,
    margin: '0 0 4px',
  },
  metaValue: {
    color: '#0f172a',
    fontSize: '20px',
    fontWeight: '700' as const,
    letterSpacing: '-0.01em',
    margin: '0',
    lineHeight: '1.2',
  },

  /* Section label */
  sectionLabel: {
    color: '#94a3b8',
    fontSize: '11px',
    fontWeight: '600' as const,
    letterSpacing: '0.08em',
    textTransform: 'uppercase' as const,
    margin: '0 0 12px',
  },

  /* Field rows */
  fieldRow: {
    margin: '0',
  },
  fieldLabelCol: {
    width: '80px',
    verticalAlign: 'middle' as const,
    paddingTop: '11px',
    paddingBottom: '11px',
  },
  fieldLabel: {
    color: '#94a3b8',
    fontSize: '13px',
    margin: '0',
  },
  fieldValue: {
    color: '#0f172a',
    fontSize: '14px',
    fontWeight: '600' as const,
    margin: '0',
    paddingTop: '11px',
    paddingBottom: '11px',
  },
  fieldLink: {
    color: '#f97316',
    fontSize: '14px',
    fontWeight: '600' as const,
    textDecoration: 'none',
    display: 'block',
    paddingTop: '11px',
    paddingBottom: '11px',
  },

  /* Dividers */
  divider: {
    borderColor: '#e2e8f0',
    margin: '20px 0',
  },
  rowDivider: {
    borderColor: '#f1f5f9',
    margin: '0',
  },

  /* Message */
  messageText: {
    color: '#334155',
    fontSize: '15px',
    lineHeight: '1.7',
    margin: '0',
    whiteSpace: 'pre-wrap' as const,
  },

  /* CTA */
  ctaWrap: {
    paddingTop: '4px',
  },
  ctaBtn: {
    backgroundColor: '#f97316',
    color: '#ffffff',
    padding: '12px 24px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600' as const,
    textDecoration: 'none',
    display: 'inline-block',
  },

  /* Footer */
  footerText: {
    color: '#94a3b8',
    fontSize: '12px',
    textAlign: 'center' as const,
    margin: '0',
    lineHeight: '1.6',
  },
  footerLink: {
    color: '#94a3b8',
    textDecoration: 'underline',
  },
} as const
