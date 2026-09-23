import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Hosting Panel - Infrastructure UI Demo',
  description: 'Conceptdemo van een rustig hostingpanel voor sites, domeinen, back-ups en logs.',
  openGraph: {
    title: 'Hosting Panel - Infrastructure UI Demo - NextX Agency',
    description: 'Operationele interface voor een fictieve hostingomgeving.',
    url: '/examples/hosting',
  },
  alternates: { canonical: '/examples/hosting' },
  robots: { index: false, follow: true },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
