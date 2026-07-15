import type { Metadata } from 'next'
import { Space_Grotesk, Inter } from 'next/font/google'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['300', '400', '500', '600'],
})

const SITE_URL = 'https://nextxagency.com'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'NextX Agency — Complete Digital Solutions for Modern Businesses',
    template: '%s | NextX Agency',
  },
  description:
    'NextX Agency helpt Surinaamse bedrijven professioneel online te groeien — snel, betaalbaar en volledig op maat. Web design, e-commerce, grafisch ontwerp en meer.',
  keywords: [
    'NextX Agency',
    'web design Suriname',
    'digital agency Paramaribo',
    'website laten maken',
    'e-commerce Suriname',
    'grafisch ontwerp',
    'SEO Suriname',
    'webshop Suriname',
    'UX UI design',
    'hosting Suriname',
    'logo ontwerp Suriname',
  ],
  authors: [{ name: 'NextX Agency' }],
  creator: 'NextX Agency',
  publisher: 'NextX Agency',
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
  },
  openGraph: {
    title: 'NextX Agency — Complete Digital Solutions',
    description:
      'Professionele digitale oplossingen voor Surinaamse bedrijven. Snel, betaalbaar en volledig op maat.',
    url: SITE_URL,
    siteName: 'NextX Agency',
    type: 'website',
    locale: 'nl_SR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NextX Agency — Complete Digital Solutions',
    description:
      'Professionele digitale oplossingen voor Surinaamse bedrijven. Snel, betaalbaar en volledig op maat.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'NextX Agency',
    description:
      'Professionele digitale oplossingen voor Surinaamse bedrijven. Web design, e-commerce, grafisch ontwerp en meer.',
    url: SITE_URL,
    email: 'lranoesendjojo@gmail.com',
    telephone: '+597-831-8508',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Paramaribo',
      addressCountry: 'SR',
    },
    areaServed: {
      '@type': 'Country',
      name: 'Suriname',
    },
    priceRange: '$$',
    sameAs: [],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Digitale Diensten',
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Web Design & Development' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'E-Commerce Webshops' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Graphic Design & Branding' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'UX/UI Design' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'SEO & Online Marketing' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Web Hosting' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Outsourcing (UX Kukru)' } },
      ],
    },
  }

  return (
    <html lang="nl" className={`scroll-smooth ${spaceGrotesk.variable} ${inter.variable}`}>
      <body className="bg-background text-foreground antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  )
}
