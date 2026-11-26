import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'SEO Dashboard - Analytics UI Demo',
  description: 'Concept demo of a task-led SEO workspace with illustrative sample data.',
  openGraph: {
    title: 'SEO Dashboard - Analytics UI Demo - NextX Agency',
    description: 'Data-first interface for keywords, pages and technical actions.',
    url: '/examples/seo',
  },
  alternates: { canonical: '/examples/seo' },
  robots: { index: false, follow: true },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
