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
    business: 'KaderBouw NV',
    group: 'Websites',
    serviceId: 'one-page',
    summary: 'Projectgerichte bouwsite met projectfilter en offerteformulier.',
    image: '/examples/business-card-site.jpg',
  },
  {
    slug: 'service-website',
    business: 'DentaCare Paramaribo',
    group: 'Websites',
    serviceId: 'service-website',
    summary: 'Rustige tandartspraktijk met behandelingen en afspraakflow.',
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
    summary: 'Surinaamse menukaart met open-status en reserveren.',
    image: '/demo-assets/warung-roti-table.webp',
  },
  {
    slug: 'starter-webshop',
    business: 'Bloom Boutique',
    group: 'Webshops',
    serviceId: 'starter-webshop',
    summary: 'Tropical contemporary shop met collectie, bag en demo-checkout.',
    image: '/demo-assets/bloom-collection.webp',
  },
  {
    slug: 'grotere-webshop',
    business: 'TechMart SUR',
    group: 'Webshops',
    serviceId: 'large-webshop',
    summary: 'Dichte elektronicacatalogus met zoeken, filters en cart.',
    image: '/examples/grotere-webshop.jpg',
  },
  {
    slug: 'logo-branding',
    business: 'Savana Coffee',
    group: 'Ontwerp',
    serviceId: 'logo',
    summary: 'Redactionele brand world voor een fictief koffiemerk.',
    image: '/demo-assets/savana-packaging.webp',
  },
  {
    slug: 'ux-ui-design',
    business: 'ShopPlaza',
    group: 'Ontwerp',
    serviceId: 'ux-audit',
    summary: 'Conceptcase met voor/na, ontwerpkeuzes en mobile check.',
    image: '/examples/ux-ui-design.jpg',
  },
  {
    slug: 'seo',
    business: 'SEO-dashboard',
    group: 'Tools en support',
    serviceId: 'seo-monthly',
    summary: 'Taakgerichte werkruimte voor zoektermen en SEO-acties.',
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
