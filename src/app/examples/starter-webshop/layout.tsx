import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Bloom Boutique - Fashion Commerce Demo',
  description: 'Conceptdemo van een tropical contemporary boutique met collectie, bag en demo-checkout.',
  openGraph: {
    title: 'Bloom Boutique - Fashion Commerce Demo - NextX Agency',
    description: 'Editorial commerce-richting voor een fictieve kledingboutique.',
    url: '/examples/starter-webshop',
  },
  alternates: { canonical: '/examples/starter-webshop' },
  robots: { index: false, follow: true },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
