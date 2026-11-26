import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Hosting Panel - Infrastructure UI Demo',
  description: 'Concept demo of a calm hosting panel for sites, domains, backups and logs.',
  openGraph: {
    title: 'Hosting Panel - Infrastructure UI Demo - NextX Agency',
    description: 'Operational interface for a fictional hosting environment.',
    url: '/examples/hosting',
  },
  alternates: { canonical: '/examples/hosting' },
  robots: { index: false, follow: true },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
