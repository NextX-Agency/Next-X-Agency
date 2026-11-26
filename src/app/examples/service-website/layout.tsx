import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'DentaCare Paramaribo - Dental Website Demo',
  description: 'Concept demo of a calm dental practice with treatments, practical information and a booking flow.',
  openGraph: {
    title: 'DentaCare Paramaribo - Dental Website Demo - NextX Agency',
    description: 'Accessible concept website for a fictional dental practice.',
    url: '/examples/service-website',
  },
  alternates: { canonical: '/examples/service-website' },
  robots: { index: false, follow: true },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
