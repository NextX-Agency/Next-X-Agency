import type { Metadata } from 'next'
import {
  Manrope,
  Space_Grotesk,
  IBM_Plex_Mono,
  Oswald,
  Playfair_Display,
  Inter,
  Lora,
} from 'next/font/google'
import './globals.css'
import { ScrollProgress } from '@/components/interactive/ScrollProgress'
import { CONTACT } from '@/lib/contact'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
})

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

// Metadata face. Every label, index, coordinate and timing is set in mono —
// it is what makes the page read as a drafting document rather than a deck.
const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  variable: '--font-plex-mono',
  display: 'swap',
  weight: ['400', '500', '600'],
})

/* ── Faces for the prototypes under /examples ──────────────────────────────
   Every demo used to be set in the NextX heading face, which is why eleven
   different businesses all read as the same studio. Each prototype now picks
   one of these instead. preload is off so they cost nothing on the pages that
   never use them. */

const oswald = Oswald({
  subsets: ['latin'],
  variable: '--font-demo-industrial',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
  preload: false,
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-demo-editorial',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
  preload: false,
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-demo-product',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
  preload: false,
})

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-demo-warm',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
  preload: false,
})

const SITE_URL = CONTACT.siteUrl

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'NextX Agency — Webdesign & Branding op maat in Suriname',
    template: '%s | NextX Agency',
  },
  description:
    'NextX Agency ontwerpt en bouwt websites, webshops en merken op maat voor Surinaamse bedrijven. Doordacht design, vaste prijzen en persoonlijk contact vanuit Paramaribo.',
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
    title: 'NextX Agency — Webdesign & Branding op maat',
    description:
      'Websites, webshops en merken op maat voor Surinaamse bedrijven. Doordacht design tegen vaste prijzen.',
    url: SITE_URL,
    siteName: 'NextX Agency',
    type: 'website',
    locale: 'nl_SR',
    images: [{ url: '/facebook-banner.png', width: 1200, height: 630, alt: 'NextX Agency' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NextX Agency — Webdesign & Branding op maat',
    description:
      'Websites, webshops en merken op maat voor Surinaamse bedrijven. Doordacht design tegen vaste prijzen.',
    images: ['/facebook-banner.png'],
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
    email: CONTACT.email,
    telephone: CONTACT.phoneE164,
    address: {
      '@type': 'PostalAddress',
      addressLocality: CONTACT.city,
      addressCountry: 'SR',
    },
    areaServed: {
      '@type': 'Country',
      name: 'Suriname',
    },
    priceRange: '$$',
    sameAs: [CONTACT.shopUrl],
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
    <html
      lang="nl"
      className={`scroll-smooth ${spaceGrotesk.variable} ${manrope.variable} ${plexMono.variable} ${oswald.variable} ${playfair.variable} ${inter.variable} ${lora.variable}`}
    >
      <body className="bg-background text-foreground antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a href="#main" className="skip-link">
          Direct naar de inhoud
        </a>
        <ScrollProgress />
        {children}
        <div className="grain-overlay" aria-hidden="true" />
      </body>
    </html>
  )
}
