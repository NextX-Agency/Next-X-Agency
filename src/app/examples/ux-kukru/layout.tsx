import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'UX Kukru - Monthly Support Demo',
  description: 'Conceptdemo van een maandelijkse capaciteitsplanner voor design, website en support.',
  openGraph: {
    title: 'UX Kukru - Monthly Support Demo - NextX Agency',
    description: 'Werkruimte voor aanvragen, uren en maandplanning.',
    url: '/examples/ux-kukru',
  },
  alternates: { canonical: '/examples/ux-kukru' },
  robots: { index: false, follow: true },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
