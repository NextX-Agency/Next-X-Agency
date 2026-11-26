import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ShopPlaza Redesign - UX/UI Concept Case',
  description: 'Concept case with a before and after interface, design decisions and a mobile check, without invented research.',
  openGraph: {
    title: 'ShopPlaza Redesign - UX/UI Concept Case - NextX Agency',
    description: 'A demonstration of product and interface decisions for a fictional webshop.',
    url: '/examples/ux-ui-design',
  },
  alternates: { canonical: '/examples/ux-ui-design' },
  robots: { index: false, follow: true },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
