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
    type: 'Dealerwebsite',
    discipline: 'web',
    presentation: 'website',
    status: 'published',
    origin: 'client',
    featured: true,
    tagline: 'Een autodealer met de hele voorraad online.',
    tone: { bg: '#1146c2', fg: '#ffffff', dark: true },
    contribution: 'Ontwerp en ontwikkeling van de website.',
    client: 'Bhaggoes Car Palace',
    summary:
      'Website voor een autodealer in Suriname, met een doorzoekbare voorraad en een directe lijn naar WhatsApp.',
    intro:
      'Bhaggoes Car Palace verkoopt auto’s vanaf twee locaties in Suriname. De website zet de voorraad centraal: bezoekers zoeken op merk, model, prijs en bouwjaar, bekijken per auto de foto’s en prijzen, en stellen hun vraag direct via WhatsApp.',
    url: 'https://www.bhaggoescarpalace.com/',
    host: 'bhaggoescarpalace.com',
    stack: 'Next.js',
    features: [
      'Voorraad zoeken en filteren op merk, model, prijs, bouwjaar, carrosserie, brandstof en transmissie',
      'Een pagina per auto met fotogalerij, specificaties en prijzen',
      'Auto’s bewaren als favoriet, op het eigen apparaat',
      'Financiering en inruil uitgelegd op een eigen pagina',
      'WhatsApp, telefoon en route naar beide locaties',
    ],
    cover: {
      src: '/work/bhaggoes-home.jpg',
      alt: 'Startpagina van Bhaggoes Car Palace met zoekbalk voor de voorraad',
      ...desktopHd,
    },
    gallery: [
      {
        src: '/work/bhaggoes-inventory.jpg',
        alt: 'Voorraadoverzicht van Bhaggoes Car Palace met filters',
        caption: 'De voorraad, met filters op merk, prijs, bouwjaar en meer',
        ...desktopHd,
      },
      {
        src: '/work/bhaggoes-car.jpg',
        alt: 'Detailpagina van een auto met fotogalerij, prijzen en WhatsApp-knop',
        caption: 'Een pagina per auto, met galerij, prijzen en direct contact',
        ...desktopHd,
      },
      {
        src: '/work/bhaggoes-financing.jpg',
        alt: 'Financieringspagina van Bhaggoes Car Palace',
        caption: 'Financiering en inruil op een eigen pagina',
        ...desktopHd,
      },
    ],
    mobile: {
      src: '/work/bhaggoes-mobile.jpg',
      alt: 'Bhaggoes Car Palace op een telefoon',
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
    tagline: 'Onze eigen webshop. Bestellen gaat via WhatsApp.',
    tone: { bg: '#e4dfd5', fg: '#0e0d0c', dark: false },
    contribution: 'Ontwerp en ontwikkeling van onze eigen webshop.',
    relation: 'Eigen product',
    summary:
      'Onze eigen webshop voor in-ear monitors en audio-accessoires. De winkelwagen stuurt de bestelling door naar WhatsApp.',
    intro:
      'Shop NextX is ons eigen product: een webshop voor in-ear monitors, earbuds en accessoires in Paramaribo. In 2026 kreeg de winkel een nieuwe voorkant in de huisstijl van NextX, met grote productfoto’s en categorieën in kleur. Bezoekers stellen een winkelwagen samen, kiezen een afhaaldatum en sturen de bestelling met één knop via WhatsApp. Een bestelling is pas definitief nadat prijs en voorraad zijn bevestigd.',
    url: 'https://www.shop-nextx.com/',
    host: 'shop-nextx.com',
    stack: 'Next.js',
    year: 2026,
    features: [
      'Catalogus met categorieën, prijsfilter en sortering',
      'Zoeken op product of merk',
      'Prijzen in SRD met een richtbedrag in USD',
      'Voorraad per product; uitverkochte artikelen zijn gemarkeerd en weg te filteren',
      'Winkelwagen die op het apparaat bewaard blijft',
      'Bestelling met afhaallocatie en datum, verstuurd via WhatsApp',
      'Per product een offerte aanvragen',
    ],
    cover: {
      src: '/work/shop-nextx-home.jpg',
      alt: 'Startpagina van Shop NextX met drie uitgelichte audioproducten in een oranje kader',
      ...desktopHd,
    },
    gallery: [
      {
        src: '/work/shop-nextx-categories.jpg',
        alt: 'Drie categorietegels op de startpagina van Shop NextX, in oranje, zwart en zand',
        caption: 'Categorieën in kleur, met aantal producten en vanafprijs',
        ...desktopHd,
      },
      {
        src: '/work/shop-nextx-catalogue.jpg',
        alt: 'Productoverzicht van Shop NextX met prijsfilter en sortering',
        caption: 'De catalogus, met prijsfilter, sortering en voorraadstatus',
        ...desktopHd,
      },
      {
        src: '/work/shop-nextx-product.jpg',
        alt: 'Productpagina van een in-ear monitor met prijs in SRD en USD',
        caption: 'Productpagina met prijs in SRD en een richtbedrag in USD',
        ...desktopHd,
      },
      {
        src: '/work/shop-nextx-cart.jpg',
        alt: 'Winkelwagen van Shop NextX met afhaallocatie, afhaaldatum en verzendknop naar WhatsApp',
        caption: 'De winkelwagen zet de bestelling klaar voor WhatsApp',
        ...desktopHd,
      },
    ],
    mobile: {
      src: '/work/shop-nextx-mobile.jpg',
      alt: 'Shop NextX op een telefoon',
      ...phoneHd,
    },
  },
  {
    slug: 'indef-design',
    index: '03',
    name: 'Indef Design',
    type: 'Bedrijfswebsite',
    discipline: 'web',
    presentation: 'website',
    status: 'published',
    origin: 'client',
    tagline: 'Architectuur en bouw, rustig gepresenteerd.',
    tone: { bg: '#131c2b', fg: '#f3efe6', dark: true },
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
export const featuredProjects = projects.filter((project) => project.featured)

export function findProject(slug: string) {
  return projects.find((project) => project.slug === slug)
}
