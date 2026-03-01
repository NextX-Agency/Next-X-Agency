import type { Metadata } from 'next'
import './globals.css'
import { CursorTracker } from '@/components/animated/CursorTracker'

export const metadata: Metadata = {
  title: 'NextX Agency — Complete Digital Solutions for Modern Businesses',
  description:
    'NextX Agency helpt Surinaamse bedrijven professioneel online te groeien — snel, betaalbaar en volledig op maat. Web design, e-commerce, grafisch ontwerp en meer.',
  keywords: [
    'NextX Agency',
    'web design Suriname',
    'digital agency Paramaribo',
    'website laten maken',
    'e-commerce Suriname',
    'grafisch ontwerp',
  ],
  openGraph: {
    title: 'NextX Agency — Complete Digital Solutions',
    description:
      'Professionele digitale oplossingen voor Surinaamse bedrijven. Snel, betaalbaar en volledig op maat.',
    type: 'website',
    locale: 'nl_SR',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="nl" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800;900&family=IBM+Plex+Mono:wght@400;500;600&family=Architects+Daughter&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-background text-foreground antialiased">
        <CursorTracker />
        {children}
      </body>
    </html>
  )
}
