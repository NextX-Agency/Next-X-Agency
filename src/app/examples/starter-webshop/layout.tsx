import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Bloom Boutique - Fashion Commerce Demo',
  description: 'Concept demo of a tropical contemporary boutique with a collection, bag and demo checkout.',
  openGraph: {
    title: 'Bloom Boutique - Fashion Commerce Demo - NextX Agency',
    description: 'Editorial commerce direction for a fictional clothing boutique.',
    url: '/examples/starter-webshop',
  },
  alternates: { canonical: '/examples/starter-webshop' },
  robots: { index: false, follow: true },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
