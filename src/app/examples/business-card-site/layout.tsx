import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'KaderBouw NV - Construction Website Demo',
  description: 'Conceptdemo van een projectgerichte bouwsite met projectfilter en offerteformulier.',
  openGraph: {
    title: 'KaderBouw NV - Construction Website Demo - NextX Agency',
    description: 'Projectgerichte conceptwebsite voor een fictief bouwbedrijf.',
    url: '/examples/business-card-site',
  },
  alternates: { canonical: '/examples/business-card-site' },
  robots: { index: false, follow: true },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
