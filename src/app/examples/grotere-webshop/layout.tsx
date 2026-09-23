import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'TechMart SUR - Electronics Commerce Demo',
  description: 'Conceptdemo van een elektronicacatalogus met zoeken, filters, productdetails en cart.',
  openGraph: {
    title: 'TechMart SUR - Electronics Commerce Demo - NextX Agency',
    description: 'Functionele commerce-richting voor een fictieve elektronicawinkel.',
    url: '/examples/grotere-webshop',
  },
  alternates: { canonical: '/examples/grotere-webshop' },
  robots: { index: false, follow: true },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
