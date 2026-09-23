import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'SEO Dashboard - Analytics UI Demo',
  description: 'Conceptdemo van een taakgerichte SEO-werkruimte met illustratieve voorbeelddata.',
  openGraph: {
    title: 'SEO Dashboard - Analytics UI Demo - NextX Agency',
    description: 'Data-first interface voor zoektermen, pagina’s en technische acties.',
    url: '/examples/seo',
  },
  alternates: { canonical: '/examples/seo' },
  robots: { index: false, follow: true },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
