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

export interface ContactConfirmationProps {
  name: string
  email: string
  service_type: string
  budget?: string
  receivedAt?: string
}

export function ContactConfirmation({
  name,
  email,
  service_type,
  budget,
  receivedAt,
}: ContactConfirmationProps) {
  // First name only for a more personal greeting
  const firstName = name.split(' ')[0]

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
        Uw aanvraag is ontvangen â€” we nemen binnen 24 uur contact op.
      </Preview>

      <Body style={s.body}>
        <Container style={s.container}>

          {/* â”€â”€ Logo â”€â”€ */}
          <Section style={s.logoSection}>
            <Img
              src="https://nextxagency.com/logo-light.png"
              alt="NextX Agency"
              width="120"
              height="48"
              style={s.logo}
            />
          </Section>

          {/* â”€â”€ Main card â”€â”€ */}
          <Section style={s.card}>

            {/* Heading */}
            <Text style={s.heading}>Aanvraag ontvangen</Text>
            <Text style={s.subheading}>
              Goedendag {firstName},
            </Text>
            <Text style={s.body2}>
              Bedankt voor uw interesse. We hebben uw aanvraag in goede orde
              ontvangen. Ons team neemt <strong style={s.strong}>binnen 24 uur</strong>{' '}
              contact met u op om de details te bespreken.
            </Text>

            <Hr style={s.divider} />

            {/* Summary table */}
            <Text style={s.tableLabel}>Samenvatting</Text>

            <Row style={s.tableRow}>
              <Column style={s.tableLabelCol}><Text style={s.tableLabelText}>Dienst</Text></Column>
              <Column><Text style={s.tableValueText}>{service_type}</Text></Column>
            </Row>
            {budget ? (
              <>
                <Hr style={s.tableRowDivider} />
                <Row style={s.tableRow}>
                  <Column style={s.tableLabelCol}><Text style={s.tableLabelText}>Budget</Text></Column>
                  <Column><Text style={s.tableValueText}>{budget}</Text></Column>
                </Row>
              </>
            ) : null}
            {receivedAt ? (
              <>
                <Hr style={s.tableRowDivider} />
                <Row style={s.tableRow}>
                  <Column style={s.tableLabelCol}><Text style={s.tableLabelText}>Ingediend</Text></Column>
                  <Column><Text style={s.tableValueText}>{receivedAt}</Text></Column>
                </Row>
              </>
            ) : null}

            <Hr style={s.divider} />

            {/* Process steps */}
            <Text style={s.tableLabel}>Hoe werkt het verder</Text>
            <ProcessStep number="1" text="We nemen binnen 24 uur contact met u op via e-mail of telefoon." />
            <ProcessStep number="2" text="We bespreken uw wensen en stellen een passend voorstel op." />
            <ProcessStep number="3" text="Na uw akkoord starten we direct met het werk." />

            <Hr style={s.divider} />

            <Section style={s.ctaSection}>
              <Button href="https://nextxagency.com" style={s.ctaBtn}>
                Bekijk onze website
              </Button>
            </Section>

          </Section>

          {/* â”€â”€ Contact bar â”€â”€ */}
          <Section style={s.contactBar}>
            <Text style={s.contactBarTitle}>Vragen? Neem direct contact op</Text>
            <Text style={s.contactBarLinks}>
              <Link href="mailto:agencynextx@gmail.com" style={s.contactLink}>
                agencynextx@gmail.com
              </Link>
              {'  Â·  '}
              <Link href="https://wa.me/5978318508" style={s.contactLink}>
                +597 831-8508
              </Link>
            </Text>
          </Section>

          {/* â”€â”€ Footer â”€â”€ */}
          <Text style={s.footerText}>
            Dit bericht werd verzonden naar{' '}
            <Link href={`mailto:${email}`} style={s.footerLink}>{email}</Link>
            {' '}Â· Â© {new Date().getFullYear()} NextX Agency Â· Paramaribo, Suriname
          </Text>

        </Container>
      </Body>
    </Html>
  )
}

function ProcessStep({ number, text }: { number: string; text: string }) {
  return (
    <Row style={stepRow}>
      <Column style={stepNumCol}>
        <Text style={stepNum}>{number}</Text>
      </Column>
      <Column>
        <Text style={stepText}>{text}</Text>
      </Column>
    </Row>
  )
}

const stepRow = { marginBottom: '12px' }
const stepNumCol = { width: '28px', verticalAlign: 'top' as const }
const stepNum = {
  backgroundColor: '#fff7ed',
  border: '1px solid #fed7aa',
  color: '#c45a2b',
  fontSize: '12px',
  fontWeight: '700' as const,
  width: '20px',
  height: '20px',
  lineHeight: '20px',
  textAlign: 'center' as const,
  borderRadius: '50%',
  margin: '1px 0 0',
  padding: '0',
  display: 'block',
}
const stepText = { color: '#475569', fontSize: '14px', lineHeight: '1.6', margin: '0' }

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
  logoSection: {
    paddingBottom: '24px',
    textAlign: 'center' as const,
  },
  logo: {
    display: 'block',
    margin: '0 auto',
    objectFit: 'contain' as const,
  },

  /* Card */
  card: {
    backgroundColor: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '12px',
    padding: '36px 36px 28px',
    marginBottom: '12px',
  },

  heading: {
    color: '#0f172a',
    fontSize: '22px',
    fontWeight: '700' as const,
    letterSpacing: '-0.01em',
    margin: '0 0 6px',
    lineHeight: '1.2',
  },
  subheading: {
    color: '#0f172a',
    fontSize: '15px',
    fontWeight: '600' as const,
    margin: '0 0 10px',
  },
  body2: {
    color: '#475569',
    fontSize: '15px',
    lineHeight: '1.7',
    margin: '0',
  },
  strong: {
    color: '#0f172a',
    fontWeight: '700' as const,
  },

  divider: {
    borderColor: '#e2e8f0',
    margin: '24px 0',
  },

  /* Summary table */
  tableLabel: {
    color: '#94a3b8',
    fontSize: '11px',
    fontWeight: '600' as const,
    letterSpacing: '0.08em',
    textTransform: 'uppercase' as const,
    margin: '0 0 14px',
  },
  tableRow: {
    margin: '0',
  },
  tableLabelCol: {
    width: '80px',
    verticalAlign: 'middle' as const,
    paddingTop: '10px',
    paddingBottom: '10px',
  },
  tableLabelText: {
    color: '#94a3b8',
    fontSize: '13px',
    margin: '0',
  },
  tableValueText: {
    color: '#0f172a',
    fontSize: '14px',
    fontWeight: '600' as const,
    margin: '0',
    paddingTop: '10px',
    paddingBottom: '10px',
  },
  tableRowDivider: {
    borderColor: '#f1f5f9',
    margin: '0',
  },

  /* CTA */
  ctaSection: {
    paddingTop: '4px',
  },
  ctaBtn: {
    backgroundColor: '#c45a2b',
    color: '#ffffff',
    padding: '12px 24px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600' as const,
    textDecoration: 'none',
    display: 'inline-block',
  },

  /* Contact bar */
  contactBar: {
    backgroundColor: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '10px',
    padding: '18px 24px',
    marginBottom: '16px',
    textAlign: 'center' as const,
  },
  contactBarTitle: {
    color: '#0f172a',
    fontSize: '13px',
    fontWeight: '600' as const,
    margin: '0 0 6px',
  },
  contactBarLinks: {
    color: '#64748b',
    fontSize: '13px',
    margin: '0',
  },
  contactLink: {
    color: '#c45a2b',
    textDecoration: 'none',
    fontWeight: '500' as const,
  },

  /* Footer */
  footerText: {
    color: '#94a3b8',
    fontSize: '12px',
    textAlign: 'center' as const,
    margin: '0',
    lineHeight: '1.7',
  },
  footerLink: {
    color: '#94a3b8',
    textDecoration: 'underline',
  },
} as const
