/**
 * Interactive concepts under /examples. The businesses are made up; the
 * interfaces are working prototypes of what a package delivers. They are
 * labelled as such everywhere so they are never mistaken for client work.
 */

import { site } from './site'

export type ExampleGroup = 'ecommerce' | 'websites' | 'saas' | 'branding'

/** Categories visitors filter by. Labels are what a client would call the work. */
export const exampleCategories: { id: ExampleGroup; label: string; line: string }[] = [
  { id: 'ecommerce', label: 'E-commerce', line: 'Webshops met catalogus, filters en winkelmand.' },
  { id: 'websites', label: 'Websites', line: 'Bedrijfs-, restaurant- en portfoliosites.' },
  { id: 'saas', label: 'SaaS & dashboards', line: 'Werkruimtes, panelen en tools voor dagelijks gebruik.' },
  { id: 'branding', label: 'Branding & UX', line: 'Merkwerelden en ontwerpcases.' },
]

export type Example = {
  slug: string
  /** The fictional business the concept is built for. */
  business: string
  group: ExampleGroup
  /** Short type label shown on cards, e.g. "Webshop". */
  kind: string
  /** Service from the price list this example demonstrates. */
  serviceId: string
  summary: string
  image: string
  /** A concrete interaction visitors can try in this working concept. */
  demonstrates?: string
}

export const examples: Example[] = [
  {
    slug: 'service-website',
    business: 'DentaCare Paramaribo',
    group: 'websites',
    kind: 'Servicewebsite',
    serviceId: 'service-website',
    summary: 'Een zorgsite die helder uitlegt, geruststelt en bezoekers naar een afspraak leidt.',
    image: '/demo-previews/service-website.webp',
    demonstrates: 'Verken behandelingen en probeer de afspraakflow.',
  },
  {
    slug: 'starter-webshop',
    business: 'Bloom Boutique',
    group: 'ecommerce',
    kind: 'Webshop',
    serviceId: 'starter-webshop',
    summary: 'Een expressieve boutique shop, van collectie tot winkelmand.',
    image: '/demo-previews/starter-webshop.webp',
    demonstrates: 'Filter de collectie en voeg een product toe aan de tas.',
  },
  {
    slug: 'restaurant-menu-site',
    business: 'Warung Indah',
    group: 'websites',
    kind: 'Restaurantwebsite',
    serviceId: 'restaurant-website',
    summary: 'Een levendige restaurantsite die smaak, menu en reserveren samenbrengt.',
    image: '/demo-previews/restaurant-menu-site.webp',
    demonstrates: 'Bekijk het menu en doorloop de reserveringsinteractie.',
  },
  {
    slug: 'business-card-site',
    business: 'KaderBouw NV',
    group: 'websites',
    kind: 'Bedrijfswebsite',
    serviceId: 'one-page',
    summary: 'Projectgerichte bouwsite met projectfilter en offerteformulier.',
    image: '/demo-previews/business-card-site.webp',
  },
  {
    slug: 'portfolio-website',
    business: 'Studio Vibe',
    group: 'websites',
    kind: 'Portfoliowebsite',
    serviceId: 'portfolio-website',
    summary: 'Portfolio voor een creatieve studio.',
    image: '/demo-previews/portfolio-website.webp',
  },
  {
    slug: 'grotere-webshop',
    business: 'TechMart SUR',
    group: 'ecommerce',
    kind: 'Grote webshop',
    serviceId: 'large-webshop',
    summary: 'Dichte elektronicacatalogus met zoeken, filters en cart.',
    image: '/demo-previews/grotere-webshop.webp',
  },
  {
    slug: 'logo-branding',
    business: 'Savana Coffee',
    group: 'branding',
    kind: 'Merkidentiteit',
    serviceId: 'logo',
    summary: 'Redactionele brand world voor een fictief koffiemerk.',
    image: '/demo-previews/logo-branding.webp',
  },
  {
    slug: 'ux-ui-design',
    business: 'ShopPlaza',
    group: 'branding',
    kind: 'UX-case',
    serviceId: 'ux-audit',
    summary: 'Conceptcase met voor/na, ontwerpkeuzes en mobile check.',
    image: '/demo-previews/ux-ui-design.webp',
  },
  {
    slug: 'seo',
    business: 'SEO-dashboard',
    group: 'saas',
    kind: 'SEO-dashboard',
    serviceId: 'seo-monthly',
    summary: 'Taakgerichte werkruimte voor zoektermen en SEO-acties.',
    image: '/demo-previews/seo.webp',
  },
  {
    slug: 'hosting',
    business: 'Hostingpaneel',
    group: 'saas',
    kind: 'Beheerpaneel',
    serviceId: 'hosting-basic',
    summary: 'Status, verbruik en back-ups van een website.',
    image: '/demo-previews/hosting.webp',
  },
  {
    slug: 'ux-kukru',
    business: 'UX Kukru',
    group: 'saas',
    kind: 'Abonnementsportaal',
    serviceId: 'kukru-business',
    summary: 'Hoe een maandpakket met vaste uren werkt.',
    image: '/demo-previews/ux-kukru.webp',
  },
]

export function categoryLabel(group: ExampleGroup) {
  return exampleCategories.find((category) => category.id === group)?.label ?? group
}

/** The strongest working concepts lead the public showcase. All brands are fictional. */
export const featuredExamples = ['service-website', 'starter-webshop', 'restaurant-menu-site']
  .map((slug) => examples.find((example) => example.slug === slug))
  .filter((example): example is Example => Boolean(example))

export function findExample(slug: string) {
  return examples.find((example) => example.slug === slug)
}

/** Pre-filled WhatsApp text for "I want a website like this", so the request arrives with context. */
export function wantThisMessage(example: Pick<Example, 'slug' | 'business' | 'kind'>, origin: string = site.url) {
  return `Hoi NextX! Ik wil een ${example.kind.toLowerCase()} zoals het concept "${example.business}". ${origin}/examples/${example.slug}

Mijn bedrijf: 
Wat ik nodig heb: `
}
