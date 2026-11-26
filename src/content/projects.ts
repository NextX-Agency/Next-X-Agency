/**
 * Client and studio-owned work. Only facts that can be checked on the live site
 * belong here: no results, no quotes, no invented scope.
 */

import type { Discipline } from './disciplines'

export type ProjectImage = {
  src: string
  alt: string
  width: number
  height: number
  caption?: string
  credit?: string
}

export type Project = {
  slug: string
  index: string
  name: string
  type: string
  discipline: Discipline
  presentation:
    'website' | 'software' | 'photography' | 'branding' | 'marketing' | 'video'
  status: 'draft' | 'published'
  origin: 'client' | 'studio'
  /** A few words under the name on a project stage. */
  tagline: string
  /** Stage colours taken from the project's own brand. */
  tone: { bg: string; fg: string; dark: boolean }
  /** Shown large on the homepage. Keep to two or three. */
  featured?: boolean
  contribution: string
  /** One line for overviews. */
  summary: string
  /** A short paragraph for the project page. */
  intro: string
  url?: string
  host?: string
  stack?: string
  year?: number
  client?: string
  seo?: { title?: string; description?: string }
  video?: {
    src: string
    poster: ProjectImage
    title: string
    captions?: string
  }
  relation?: string
  /** What a visitor can see and use on the live site. */
  features?: string[]
  cover: ProjectImage
  gallery?: ProjectImage[]
  mobile?: ProjectImage
}

const desktop = { width: 1600, height: 1000 }
const phone = { width: 430, height: 932 }
/** Captures made at 1.5× and 2× for sharp device mockups. */
const desktopHd = { width: 2400, height: 1500 }
const phoneHd = { width: 860, height: 1864 }

export const projectCatalog: Project[] = [
  {
    slug: 'bhaggoes-car-palace',
    index: '01',
    name: 'Bhaggoes Car Palace',
    type: 'Dealer website',
    discipline: 'web',
    presentation: 'website',
    status: 'published',
    origin: 'client',
    featured: true,
    tagline: 'A car dealer with its whole stock online.',
    tone: { bg: '#1146c2', fg: '#ffffff', dark: true },
    contribution: 'Design and development of the website.',
    client: 'Bhaggoes Car Palace',
    summary:
      'Website for a car dealer in Suriname, with searchable stock and a direct line to WhatsApp.',
    intro:
      'Bhaggoes Car Palace sells cars from two locations in Suriname. The website puts the stock first: visitors search by make, model, price and year, see the photos and prices for each car, and ask their question straight on WhatsApp.',
    url: 'https://www.bhaggoescarpalace.com/',
    host: 'bhaggoescarpalace.com',
    stack: 'Next.js',
    features: [
      'Search and filter stock by make, model, price, year, body type, fuel and transmission',
      'A page for every car with photo gallery, specifications and prices',
      'Save cars as favourites, on your own device',
      'Financing and trade-in explained on their own page',
      'WhatsApp, phone and directions to both locations',
    ],
    cover: {
      src: '/work/bhaggoes-home.jpg',
      alt: 'Bhaggoes Car Palace home page with a stock search bar',
      ...desktopHd,
    },
    gallery: [
      {
        src: '/work/bhaggoes-inventory.jpg',
        alt: 'Bhaggoes Car Palace stock overview with filters',
        caption: 'The stock, with filters for make, price, year and more',
        ...desktopHd,
      },
      {
        src: '/work/bhaggoes-car.jpg',
        alt: 'Car detail page with photo gallery, prices and WhatsApp button',
        caption: 'A page for every car, with gallery, prices and direct contact',
        ...desktopHd,
      },
      {
        src: '/work/bhaggoes-financing.jpg',
        alt: 'Bhaggoes Car Palace financing page',
        caption: 'Financing and trade-in on their own page',
        ...desktopHd,
      },
    ],
    mobile: {
      src: '/work/bhaggoes-mobile.jpg',
      alt: 'Bhaggoes Car Palace on a phone',
      ...phoneHd,
    },
  },
  {
    slug: 'shop-nextx',
    index: '02',
    name: 'Shop NextX',
    type: 'Webshop',
    discipline: 'web',
    presentation: 'website',
    status: 'published',
    origin: 'studio',
    featured: true,
    tagline: 'Our own webshop. Orders go through WhatsApp.',
    tone: { bg: '#e4dfd5', fg: '#0e0d0c', dark: false },
    contribution: 'Design and development of our own webshop.',
    relation: 'Our own product',
    summary:
      'Our own webshop for in-ear monitors and audio accessories. The cart sends the order on to WhatsApp.',
    intro:
      'Shop NextX is our own product: a webshop for in-ear monitors, earbuds and accessories in Paramaribo. In 2026 the store got a new front end in the NextX house style, with large product photos and colour-coded categories. Visitors build a cart, pick a pickup date and send the order to WhatsApp with one button. An order is only final once price and stock are confirmed.',
    url: 'https://www.shop-nextx.com/',
    host: 'shop-nextx.com',
    stack: 'Next.js',
    year: 2026,
    features: [
      'Catalogue with categories, price filter and sorting',
      'Search by product or brand',
      'Prices in SRD with an indicative amount in USD',
      'Stock per product; sold-out items are marked and can be filtered out',
      'A cart that stays saved on the device',
      'Orders with pickup location and date, sent through WhatsApp',
      'Request a quote for any product',
    ],
    cover: {
      src: '/work/shop-nextx-home.jpg',
      alt: 'Shop NextX home page with three featured audio products in an orange frame',
      ...desktopHd,
    },
    gallery: [
      {
        src: '/work/shop-nextx-categories.jpg',
        alt: 'Three category tiles on the Shop NextX home page, in orange, black and sand',
        caption: 'Colour-coded categories, with product count and starting price',
        ...desktopHd,
      },
      {
        src: '/work/shop-nextx-catalogue.jpg',
        alt: 'Shop NextX product overview with price filter and sorting',
        caption: 'The catalogue, with price filter, sorting and stock status',
        ...desktopHd,
      },
      {
        src: '/work/shop-nextx-product.jpg',
        alt: 'Product page for an in-ear monitor with price in SRD and USD',
        caption: 'Product page with the price in SRD and an indicative amount in USD',
        ...desktopHd,
      },
      {
        src: '/work/shop-nextx-cart.jpg',
        alt: 'Shop NextX cart with pickup location, pickup date and a send-to-WhatsApp button',
        caption: 'The cart gets the order ready for WhatsApp',
        ...desktopHd,
      },
    ],
    mobile: {
      src: '/work/shop-nextx-mobile.jpg',
      alt: 'Shop NextX on a phone',
      ...phoneHd,
    },
  },
  {
    slug: 'indef-design',
    index: '03',
    name: 'Indef Design',
    type: 'Business website',
    discipline: 'web',
    presentation: 'website',
    status: 'published',
    origin: 'client',
    tagline: 'Architecture and construction, calmly presented.',
    tone: { bg: '#131c2b', fg: '#f3efe6', dark: true },
    contribution:
      'Website design and development for inDEF Design & Construction.',
    client: 'inDEF Design & Construction',
    summary:
      'Website for an architecture and construction firm, with its specialisms and projects.',
    intro:
      'inDEF Design & Construction works in architecture, construction, project management and consulting. The site is built calmly: a large opening photo, the four specialisms and then the work.',
    url: 'https://www.indefdesign.com/',
    host: 'indefdesign.com',
    stack: 'Next.js',
    features: [
      'Full-width opening image',
      'Four specialisms in one overview',
      'Projects with their own image and category',
      'Enquiry button in the navigation',
    ],
    cover: {
      src: '/work/indef-hero.jpg',
      alt: 'Indef Design home page with a house in the evening',
      ...desktop,
    },
    gallery: [
      {
        src: '/work/indef-projects.jpg',
        alt: 'Project overview on the Indef Design site',
        ...desktop,
      },
      {
        src: '/work/indef-services.jpg',
        alt: 'Overview of the four Indef Design specialisms',
        ...desktop,
      },
    ],
    mobile: {
      src: '/work/indef-mobile.jpg',
      alt: 'Indef Design on a phone',
      ...phone,
    },
  },
]

/** Only published work reaches routes, overviews and the sitemap. */
export function publishedProjects(catalog: readonly Project[]) {
  return catalog.filter((project) => project.status === 'published')
}
export const projects = publishedProjects(projectCatalog)
export const featuredProjects = projects.filter((project) => project.featured)

export function findProject(slug: string) {
  return projects.find((project) => project.slug === slug)
}
