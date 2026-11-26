import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'TechMart SUR - Electronics Commerce Demo',
  description: 'Concept demo of an electronics catalogue with search, filters, product details and a cart.',
  openGraph: {
    title: 'TechMart SUR - Electronics Commerce Demo - NextX Agency',
    description: 'Functional commerce direction for a fictional electronics store.',
    url: '/examples/larger-webshop',
  },
  alternates: { canonical: '/examples/larger-webshop' },
  robots: { index: false, follow: true },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
