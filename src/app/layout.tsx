import type { Metadata, Viewport } from 'next'
import { Archivo, IBM_Plex_Mono, Inter, Lora, Oswald, Playfair_Display } from 'next/font/google'
import './globals.css'
import { site } from '@/content/site'
import { formatPrice, serviceCategories } from '@/content/services'

// One family for everything. The width axis lets display type go wide and
// heavy like the wordmark, while running text stays at normal width.
const archivo = Archivo({
  subsets: ['latin'],
  axes: ['wdth'],
  variable: '--font-archivo',
  display: 'swap',
})

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-plex-mono',
  display: 'swap',
})

// Faces for the prototypes under /examples, so each made-up business reads as
// its own brand. preload is off: they cost nothing on the NextX pages.
const oswald = Oswald({
  subsets: ['latin'],
  variable: '--font-demo-industrial',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  preload: false,
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-demo-editorial',
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
  preload: false,
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-demo-product',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  preload: false,
})

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-demo-warm',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  preload: false,
})

const description =
  'NextX is a design studio and software builder from Paramaribo, Suriname. Graphic design and branding, websites and webshops, and custom software, from one studio.'

const socialImage = {
  url: '/og/nextx-social-v8.png',
  width: 1200,
  height: 630,
  alt: 'NextX Agency: design, websites and software from Paramaribo, Suriname',
}

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: 'NextX Agency · Design, websites and software from Suriname',
    template: '%s — NextX Agency',
  },
  description,
  applicationName: site.name,
  authors: [{ name: site.name }],
  creator: site.name,
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: { url: '/apple-touch-icon-v3.png', sizes: '180x180', type: 'image/png' },
  },
  openGraph: {
    title: 'NextX Agency · Design, websites and software from Suriname',
    description,
    url: site.url,
    siteName: site.name,
    type: 'website',
    locale: 'en_US',
    images: [socialImage],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NextX Agency',
    description,
    images: [socialImage.url],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  alternates: { canonical: '/' },
}

export const viewport: Viewport = {
  themeColor: '#0e0d0c',
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: site.name,
  description,
  url: site.url,
  logo: `${site.url}/logo-agency-white-v2.svg`,
  image: `${site.url}${socialImage.url}`,
  email: site.email,
  telephone: site.phone.e164,
  address: {
    '@type': 'PostalAddress',
    addressLocality: site.location.city,
    addressCountry: site.location.countryCode,
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: site.location.lat,
    longitude: site.location.lng,
  },
  areaServed: { '@type': 'Country', name: site.location.country },
  knowsAbout: ['Graphic design', 'Branding', 'Web design', 'Web development', 'E-commerce', 'Custom software'],
  sameAs: [site.sisterSite.href],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Services',
    itemListElement: serviceCategories.map((category) => ({
      '@type': 'OfferCatalog',
      name: category.title,
      itemListElement: category.services.map((service) => ({
        '@type': 'Offer',
        ...(typeof service.price === 'object' && 'amount' in service.price
          ? {
              price: service.price.amount,
              priceCurrency: 'USD',
              priceSpecification: {
                '@type': 'PriceSpecification',
                price: service.price.amount,
                priceCurrency: 'USD',
                ...(service.price.unit ? { unitText: service.price.unit } : {}),
              },
            }
          : {}),
        itemOffered: {
          '@type': 'Service',
          name: service.name,
          description: `${service.summary} (${formatPrice(service.price)})`,
        },
      })),
    })),
  },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${plexMono.variable} ${oswald.variable} ${playfair.variable} ${inter.variable} ${lora.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  )
}
