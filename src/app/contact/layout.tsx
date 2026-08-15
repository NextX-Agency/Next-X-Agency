import type { Metadata } from 'next'
import { CONTACT } from '@/lib/contact'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    `Neem contact op met NextX Agency via ${CONTACT.phoneDisplay} of ${CONTACT.email}. Stuur een bericht of WhatsApp ons voor een helder voorstel — reactie ${CONTACT.responseTime}. ${CONTACT.location}.`,
  openGraph: {
    title: 'Contact — NextX Agency',
    description:
      `Neem contact op voor een helder voorstel. Reactie ${CONTACT.responseTime} — WhatsApp ${CONTACT.phoneDisplay}.`,
    url: '/contact',
  },
  alternates: {
    canonical: '/contact',
  },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children
}
