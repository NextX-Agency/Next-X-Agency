import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Savana Coffee - Brand Identity Demo',
  description: 'Editorial brand identity concept demo with a system, packaging and brand voice.',
  openGraph: {
    title: 'Savana Coffee - Brand Identity Demo - NextX Agency',
    description: 'Brand world for a fictional coffee brand.',
    url: '/examples/logo-branding',
  },
  alternates: { canonical: '/examples/logo-branding' },
  robots: { index: false, follow: true },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
