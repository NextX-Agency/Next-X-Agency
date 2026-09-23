import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'DentaCare Paramaribo - Dental Website Demo',
  description: 'Conceptdemo van een rustige tandartspraktijk met behandelingen, praktische info en afspraakflow.',
  openGraph: {
    title: 'DentaCare Paramaribo - Dental Website Demo - NextX Agency',
    description: 'Toegankelijke conceptwebsite voor een fictieve tandartspraktijk.',
    url: '/examples/service-website',
  },
  alternates: { canonical: '/examples/service-website' },
  robots: { index: false, follow: true },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
