import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Savana Coffee - Brand Identity Demo',
  description: 'Redactionele brand identity conceptdemo met systeem, packaging en merkstem.',
  openGraph: {
    title: 'Savana Coffee - Brand Identity Demo - NextX Agency',
    description: 'Brand world voor een fictief koffiemerk.',
    url: '/examples/logo-branding',
  },
  alternates: { canonical: '/examples/logo-branding' },
  robots: { index: false, follow: true },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
