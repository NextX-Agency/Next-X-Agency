import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Studio Vibe - Creative Portfolio Demo',
  description: 'Portfolio conceptdemo voor een creatieve studio, met werk als eerste scherm.',
  openGraph: {
    title: 'Studio Vibe - Creative Portfolio Demo - NextX Agency',
    description: 'Portfolio-richting voor een fictieve creatieve studio.',
    url: '/examples/portfolio-website',
  },
  alternates: { canonical: '/examples/portfolio-website' },
  robots: { index: false, follow: true },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
