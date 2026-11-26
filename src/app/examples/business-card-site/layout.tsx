import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'KaderBouw NV - Construction Website Demo',
  description: 'Concept demo of a project-led construction site with a project filter and quote form.',
  openGraph: {
    title: 'KaderBouw NV - Construction Website Demo - NextX Agency',
    description: 'Project-led concept website for a fictional construction company.',
    url: '/examples/business-card-site',
  },
  alternates: { canonical: '/examples/business-card-site' },
  robots: { index: false, follow: true },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
