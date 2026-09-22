/**
 * Interactive concepts under /examples. The businesses are made up; the
 * interfaces are working prototypes of what a package delivers. They are
 * labelled as such everywhere so they are never mistaken for client work.
 */

export type ExampleGroup = 'Websites' | 'Webshops' | 'Ontwerp' | 'Tools en support'

export type Example = {
  slug: string
  /** The fictional business the concept is built for. */
  business: string
  group: ExampleGroup
  /** Service from the price list this example demonstrates. */
  serviceId: string
  summary: string
  image: string
}

export const examples: Example[] = [
  {
    slug: 'business-card-site',
    business: 'KaderBouw',
    group: 'Websites',
    serviceId: 'one-page',
    summary: 'Bouwbedrijf op één pagina, met projectfilter en offerteformulier.',
    image: '/examples/business-card-site.jpg',
  },
  {
    slug: 'service-website',
    business: 'DentaCare',
    group: 'Websites',
    serviceId: 'service-website',
    summary: 'Tandartspraktijk met behandelingen, team en afspraak maken.',
    image: '/examples/service-website.jpg',
  },
  {
    slug: 'portfolio-website',
    business: 'Studio Vibe',
    group: 'Websites',
    serviceId: 'portfolio-website',
    summary: 'Portfolio voor een creatieve studio.',
    image: '/examples/portfolio-website.jpg',
  },
  {
    slug: 'restaurant-menu-site',
    business: 'Warung Indah',
    group: 'Websites',
    serviceId: 'restaurant-website',
    summary: 'Menukaart met dagspecials, allergenen en reserveren.',
    image: '/examples/restaurant-menu-site.jpg',
  },
  {
    slug: 'starter-webshop',
    business: 'Bloom Boutique',
    group: 'Webshops',
    serviceId: 'starter-webshop',
    summary: 'Kleine kledingshop met filters, winkelwagen en checkout.',
    image: '/examples/starter-webshop.jpg',
  },
  {
    slug: 'grotere-webshop',
    business: 'TechMart',
    group: 'Webshops',
    serviceId: 'large-webshop',
    summary: 'Elektronicacatalogus met zoeken, filters en productpagina’s.',
    image: '/examples/grotere-webshop.jpg',
  },
  {
    slug: 'logo-branding',
    business: 'Savana Coffee',
    group: 'Ontwerp',
    serviceId: 'logo',
    summary: 'Logo, kleuren, typografie en toepassingen voor een koffiemerk.',
    image: '/examples/logo-branding.jpg',
  },
  {
    slug: 'ux-ui-design',
    business: 'ShopPlaza',
    group: 'Ontwerp',
    serviceId: 'ux-audit',
    summary: 'UX-audit met bevindingen en schermen voor en na.',
    image: '/examples/ux-ui-design.jpg',
  },
  {
    slug: 'seo',
    business: 'SEO-dashboard',
    group: 'Tools en support',
    serviceId: 'seo-monthly',
    summary: 'Zoektermen, trends en acties in één overzicht.',
    image: '/examples/seo.jpg',
  },
  {
    slug: 'hosting',
    business: 'Hostingpaneel',
    group: 'Tools en support',
    serviceId: 'hosting-basic',
    summary: 'Status, verbruik en back-ups van een website.',
    image: '/examples/hosting.jpg',
  },
  {
    slug: 'ux-kukru',
    business: 'UX Kukru',
    group: 'Tools en support',
    serviceId: 'kukru-business',
    summary: 'Hoe een maandpakket met vaste uren werkt.',
    image: '/examples/ux-kukru.jpg',
  },
]

export const exampleGroups: ExampleGroup[] = ['Websites', 'Webshops', 'Ontwerp', 'Tools en support']

export function findExample(slug: string) {
  return examples.find((example) => example.slug === slug)
}
