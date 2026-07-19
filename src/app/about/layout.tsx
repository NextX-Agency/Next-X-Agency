import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Over Ons',
  description:
    'Maak kennis met NextX Agency, een digitaal bureau in Paramaribo, Suriname. Wij ontwerpen websites en merken op maat, met aandacht en vakmanschap.',
  openGraph: {
    title: 'Over Ons — NextX Agency',
    description:
      'Maak kennis met NextX Agency: digitaal bureau in Paramaribo voor webdesign, e-commerce en branding op maat.',
    url: '/about',
  },
  alternates: {
    canonical: '/about',
  },
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children
}
