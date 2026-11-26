import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Warung Indah - Restaurant Website Demo',
  description: 'Concept demo of a Surinamese menu with open status and a booking flow.',
  openGraph: {
    title: 'Warung Indah - Restaurant Website Demo - NextX Agency',
    description: 'Food-first concept website for a fictional warung in Paramaribo.',
    url: '/examples/restaurant-menu-site',
  },
  alternates: { canonical: '/examples/restaurant-menu-site' },
  robots: { index: false, follow: true },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
