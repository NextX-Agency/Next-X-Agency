import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Warung Indah - Restaurant Website Demo',
  description: 'Conceptdemo van een Surinaamse menukaart met open-status en reserveringsflow.',
  openGraph: {
    title: 'Warung Indah - Restaurant Website Demo - NextX Agency',
    description: 'Food-first conceptwebsite voor een fictieve warung in Paramaribo.',
    url: '/examples/restaurant-menu-site',
  },
  alternates: { canonical: '/examples/restaurant-menu-site' },
  robots: { index: false, follow: true },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
