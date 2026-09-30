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

export const projectCatalog: Project[] = [
  {
    slug: 'shop-nextx',
    index: '01',
    name: 'Shop NextX',
    type: 'Webshop',
    discipline: 'web-software',
    presentation: 'website',
    status: 'published',
    origin: 'studio',
    contribution: 'Ontwerp en ontwikkeling van onze eigen webshop.',
    relation: 'Eigen product',
    summary:
      'Twee winkels onder één merk: audio en horloges, met prijzen in SRD en USD.',
    intro:
      'Onze eigen webshop. De startpagina splitst meteen in twee winkels met elk een eigen sfeer: licht en oranje voor audio, donker en goud voor horloges. Bestellen gaat via de winkelwagen of direct via WhatsApp.',
    url: 'https://www.shop-nextx.com/',
    host: 'shop-nextx.com',
    stack: 'Next.js',
    features: [
      'Keuze tussen de audio- en horlogewinkel op de startpagina',
      'Prijzen omschakelen tussen SRD en USD',
      'Voorraad per product zichtbaar',
      'Filteren op merk, prijs en beschikbaarheid',
      'Bestellen via winkelwagen of WhatsApp',
    ],
    cover: {
      src: '/work/shop-nextx-entry.jpg',
      alt: 'Startpagina van Shop NextX, gesplitst in Audio en Watches',
      ...desktop,
    },
    gallery: [
      {
        src: '/work/shop-nextx-audio.jpg',
        alt: 'De audiowinkel van Shop NextX met categorieën en combo-deals',
        ...desktop,
      },
      {
        src: '/work/shop-nextx-products.jpg',
        alt: 'Productoverzicht met prijzen in SRD en voorraadlabels',
        ...desktop,
      },
      {
        src: '/work/shop-nextx-watches.jpg',
        alt: 'De horlogewinkel met zoekveld, filters en merken',
        ...desktop,
      },
    ],
    mobile: {
      src: '/work/shop-nextx-mobile.jpg',
      alt: 'Shop NextX op een telefoon',
      ...phone,
    },
  },
  {
    slug: 'indef-design',
    index: '02',
    name: 'Indef Design',
    type: 'Website',
    discipline: 'web-software',
    presentation: 'website',
    status: 'published',
    origin: 'client',
    contribution:
      'Websiteontwerp en ontwikkeling voor inDEF Design & Construction.',
    client: 'inDEF Design & Construction',
    summary:
      'Website voor een architectuur- en bouwbedrijf, met specialisaties en projecten.',
    intro:
      'inDEF Design & Construction doet architectuur, bouw, projectmanagement en advies. De site is Engelstalig en rustig opgebouwd: een grote openingsfoto, de vier specialisaties en daarna het werk.',
    url: 'https://www.indefdesign.com/',
    host: 'indefdesign.com',
    stack: 'Next.js',
    features: [
      'Openingsbeeld over de volle breedte',
      'Vier specialisaties op één overzicht',
      'Projecten met eigen beeld en categorie',
      'Aanvraagknop in de navigatie',
    ],
    cover: {
      src: '/work/indef-hero.jpg',
      alt: 'Startpagina van Indef Design met een woning in de avond',
      ...desktop,
    },
    gallery: [
      {
        src: '/work/indef-projects.jpg',
        alt: 'Projectoverzicht op de site van Indef Design',
        ...desktop,
      },
      {
        src: '/work/indef-services.jpg',
        alt: 'Overzicht van de vier specialisaties van Indef Design',
        ...desktop,
      },
    ],
    mobile: {
      src: '/work/indef-mobile.jpg',
      alt: 'Indef Design op een telefoon',
      ...phone,
    },
  },
]

/** Only published work reaches routes, overviews and the sitemap. */
export function publishedProjects(catalog: readonly Project[]) {
  return catalog.filter((project) => project.status === 'published')
}
export const projects = publishedProjects(projectCatalog)

export function findProject(slug: string) {
  return projects.find((project) => project.slug === slug)
}
