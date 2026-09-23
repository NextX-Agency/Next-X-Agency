import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ShopPlaza Redesign - UX/UI Concept Case',
  description: 'Conceptcase met voor/na interface, ontwerpkeuzes en een mobile check zonder verzonnen onderzoek.',
  openGraph: {
    title: 'ShopPlaza Redesign - UX/UI Concept Case - NextX Agency',
    description: 'Demonstratie van product- en interfacebeslissingen voor een fictieve webshop.',
    url: '/examples/ux-ui-design',
  },
  alternates: { canonical: '/examples/ux-ui-design' },
  robots: { index: false, follow: true },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
