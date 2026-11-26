import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'UX Kukru - Monthly Support Demo',
  description: 'Concept demo of a monthly capacity planner for design, website and support.',
  openGraph: {
    title: 'UX Kukru - Monthly Support Demo - NextX Agency',
    description: 'Workspace for requests, hours and monthly planning.',
    url: '/examples/ux-kukru',
  },
  alternates: { canonical: '/examples/ux-kukru' },
  robots: { index: false, follow: true },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
