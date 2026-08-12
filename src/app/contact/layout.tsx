import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Neem contact op met NextX Agency. Stuur een bericht of WhatsApp ons voor een helder voorstel binnen 24-48 uur. Paramaribo, Suriname.',
  openGraph: {
    title: 'Contact — NextX Agency',
    description:
      'Neem contact op voor een helder voorstel. Reactie binnen 24-48 uur.',
    url: '/contact',
  },
  alternates: {
    canonical: '/contact',
  },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children
}
