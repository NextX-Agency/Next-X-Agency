/**
 * Interactive concepts under /examples. The businesses are made up; the
 * interfaces are working prototypes of what a package delivers. They are
 * labelled as such everywhere so they are never mistaken for client work.
 */

import { site } from './site'

export type ExampleGroup = 'ecommerce' | 'websites' | 'saas' | 'branding'

/** Categories visitors filter by. Labels are what a client would call the work. */
export const exampleCategories: { id: ExampleGroup; label: string; line: string }[] = [
  { id: 'ecommerce', label: 'E-commerce', line: 'Webshops with a catalogue, filters and a cart.' },
  { id: 'websites', label: 'Websites', line: 'Business, restaurant and portfolio sites.' },
  { id: 'saas', label: 'SaaS & dashboards', line: 'Workspaces, panels and tools for daily use.' },
  { id: 'branding', label: 'Branding & UX', line: 'Brand worlds and design cases.' },
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
    kind: 'Service website',
    serviceId: 'service-website',
    summary: 'A healthcare site that explains clearly, reassures and guides visitors to an appointment.',
    image: '/demo-previews/service-website-en.webp',
    demonstrates: 'Explore the treatments and try the booking flow.',
  },
  {
    slug: 'starter-webshop',
    business: 'Bloom Boutique',
    group: 'ecommerce',
    kind: 'Webshop',
    serviceId: 'starter-webshop',
    summary: 'An expressive boutique shop, from collection to cart.',
    image: '/demo-previews/starter-webshop-en.webp',
    demonstrates: 'Filter the collection and add a product to the bag.',
  },
  {
    slug: 'restaurant-menu-site',
    business: 'Warung Indah',
    group: 'websites',
    kind: 'Restaurant website',
    serviceId: 'restaurant-website',
    summary: 'A lively restaurant site that brings flavour, menu and bookings together.',
    image: '/demo-previews/restaurant-menu-site-en.webp',
    demonstrates: 'Browse the menu and walk through the booking flow.',
  },
  {
    slug: 'business-card-site',
    business: 'KaderBouw NV',
    group: 'websites',
    kind: 'Business website',
    serviceId: 'one-page',
    summary: 'Project-led construction site with a project filter and quote form.',
    image: '/demo-previews/business-card-site-en.webp',
  },
  {
    slug: 'portfolio-website',
    business: 'Studio Vibe',
    group: 'websites',
    kind: 'Portfolio website',
    serviceId: 'portfolio-website',
    summary: 'Portfolio for a creative studio.',
    image: '/demo-previews/portfolio-website-en.webp',
  },
  {
    slug: 'larger-webshop',
    business: 'TechMart SUR',
    group: 'ecommerce',
    kind: 'Large webshop',
    serviceId: 'large-webshop',
    summary: 'Dense electronics catalogue with search, filters and a cart.',
    image: '/demo-previews/larger-webshop-en.webp',
  },
  {
    slug: 'logo-branding',
    business: 'Savana Coffee',
    group: 'branding',
    kind: 'Brand identity',
    serviceId: 'logo',
    summary: 'Editorial brand world for a fictional coffee brand.',
    image: '/demo-previews/logo-branding-en.webp',
  },
  {
    slug: 'ux-ui-design',
    business: 'ShopPlaza',
    group: 'branding',
    kind: 'UX case',
    serviceId: 'ux-audit',
    summary: 'Concept case with before and after, design decisions and a mobile check.',
    image: '/demo-previews/ux-ui-design-en.webp',
  },
  {
    slug: 'seo',
    business: 'SEO dashboard',
    group: 'saas',
    kind: 'SEO dashboard',
    serviceId: 'seo-monthly',
    summary: 'Task-led workspace for keywords and SEO actions.',
    image: '/demo-previews/seo-en.webp',
  },
  {
    slug: 'hosting',
    business: 'Hosting panel',
    group: 'saas',
    kind: 'Control panel',
    serviceId: 'hosting-basic',
    summary: 'Status, usage and backups for a website.',
    image: '/demo-previews/hosting-en.webp',
  },
  {
    slug: 'ux-kukru',
    business: 'UX Kukru',
    group: 'saas',
    kind: 'Subscription portal',
    serviceId: 'kukru-business',
    summary: 'How a monthly package with set hours works.',
    image: '/demo-previews/ux-kukru-en.webp',
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
  const article = /^[aeiou]/i.test(example.kind) ? 'an' : 'a'
  return `Hi NextX! I want ${article} ${example.kind.toLowerCase()} like the "${example.business}" concept. ${origin}/examples/${example.slug}

My business: 
What I need: `
}
