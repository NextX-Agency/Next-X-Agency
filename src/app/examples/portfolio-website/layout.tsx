import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Studio Vibe - Creative Portfolio Demo',
  description: 'Portfolio concept demo for a creative studio, with the work as the first screen.',
  openGraph: {
    title: 'Studio Vibe - Creative Portfolio Demo - NextX Agency',
    description: 'Portfolio direction for a fictional creative studio.',
    url: '/examples/portfolio-website',
  },
  alternates: { canonical: '/examples/portfolio-website' },
  robots: { index: false, follow: true },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
