/**
 * The price list. These are the only prices on the site: the services page,
 * the homepage, the contact form, the examples and the schema all read them
 * from here.
 */

export type Price =
  | {
      amount: number
      /** "vanaf" prices are a starting point; the exact figure follows the first call. */
      from: boolean
      unit?: 'per post' | 'per maand' | 'eenmalig' | 'per ronde' | 'per pagina' | 'per uur'
    }
  | { label: string }

export type Service = {
  id: string
  name: string
  /** Earlier names still used in links, e.g. /contact?dienst=Logo%20Design. */
  aliases?: string[]
  summary: string
  price: Price
  includes: string[]
  /** Slug of an interactive example under /examples. */
  example?: string
}

export type ServiceCategory = {
  /** Also the anchor on /services, kept stable for existing links. */
  id: string
  index: string
  title: string
  line: string
  services: Service[]
  terms?: string
  /** Listed among the disciplines on the homepage. */
  discipline: boolean
}

/** Standard rate for work that falls outside a fixed package. */
export const standardHourlyRate = 45

export const serviceCategories: ServiceCategory[] = [
  {
    id: 'websites',
    index: '01',
    title: 'Websites',
    line: 'Bedrijfssites, portfolio’s en restaurantsites.',
    discipline: true,
    services: [
      {
        id: 'one-page',
        name: 'One-page website',
        aliases: ['Business Card Site'],
        summary: 'Eén pagina met wie u bent, wat u doet en hoe klanten u bereiken.',
        price: { amount: 295, from: true },
        includes: ['WhatsApp-knop', 'Contactformulier'],
        example: 'business-card-site',
      },
      {
        id: 'service-website',
        name: 'Servicewebsite',
        aliases: ['Service Website'],
        summary: 'Aparte pagina’s voor uw diensten, over ons en contact.',
        price: { amount: 595, from: true },
        includes: ['Home, diensten, over ons en contact', 'Contactformulier'],
        example: 'service-website',
      },
      {
        id: 'portfolio-website',
        name: 'Portfoliowebsite',
        aliases: ['Portfolio Website'],
        summary: 'Een galerij voor uw werk, met een eigen pagina per project.',
        price: { amount: 495, from: true },
        includes: ['Tot 20 projecten', 'Projectpagina’s', 'Over mij/ons en contact'],
        example: 'portfolio-website',
      },
      {
        id: 'restaurant-website',
        name: 'Restaurantwebsite',
        aliases: ['Restaurant/Menu Site'],
        summary: 'Menukaart, openingstijden en locatie, met een link om te reserveren.',
        price: { amount: 495, from: true },
        includes: ['Digitaal menu tot 50 gerechten', 'Openingstijden en kaart', 'Reserveringslink'],
        example: 'restaurant-menu-site',
      },
    ],
    terms:
      `Wijzigingen na oplevering (tekst, beeld, kleine aanpassingen in de layout) rekenen we af tegen $${standardHourlyRate} per uur.`,
  },
  {
    id: 'e-commerce',
    index: '02',
    title: 'Webshops',
    line: 'Online verkopen met winkelwagen, checkout en betaling per overschrijving.',
    discipline: true,
    services: [
      {
        id: 'starter-webshop',
        name: 'Starter webshop',
        aliases: ['Starter Webshop'],
        summary: 'Een eerste online winkel voor een compact assortiment.',
        price: { amount: 895, from: true },
        includes: ['Tot 25 producten', 'Winkelwagen en checkout', 'Betaling per bankoverschrijving', 'Uitleg over productbeheer'],
        example: 'starter-webshop',
      },
      {
        id: 'large-webshop',
        name: 'Grotere webshop',
        aliases: ['Grotere Webshop'],
        summary: 'Een catalogus met categorieën, filters, zoeken en klantaccounts.',
        price: { amount: 1350, from: true },
        includes: ['Tot 100 producten', 'Categorieën, filters en zoeken', 'Klantaccounts en orderstatus', 'Overschrijving of eigen betaalflow'],
        example: 'grotere-webshop',
      },
    ],
    terms:
      `Meer producten: $5 per product tot 250. Daarboven maken we een prijs op maat. Aanpassingen na oplevering: $${standardHourlyRate} per uur.`,
  },
  {
    id: 'graphic-design',
    index: '03',
    title: 'Grafisch ontwerp',
    line: 'Logo’s, posts en drukwerk.',
    discipline: true,
    services: [
      {
        id: 'logo',
        name: 'Logo-ontwerp',
        aliases: ['Logo Design'],
        summary: 'Eén logoconcept, uitgewerkt tot alle bestanden die u nodig hebt.',
        price: { amount: 195, from: true },
        includes: ['Twee revisierondes', 'PNG en JPG, transparant en op wit', 'Andere formaten op aanvraag'],
        example: 'logo-branding',
      },
      {
        id: 'social-post',
        name: 'Social media post',
        aliases: ['Social Media Post Design'],
        summary: 'Een ontwerp voor Instagram of Facebook.',
        price: { amount: 25, from: false, unit: 'per post' },
        includes: ['1080×1080 of 1080×1350', 'Eén revisieronde'],
      },
      {
        id: 'flyer',
        name: 'Flyer of poster',
        aliases: ['Flyer/Poster Design'],
        summary: 'Drukklaar ontwerp in A4 of A5, of een eigen formaat.',
        price: { amount: 75, from: true },
        includes: ['Twee revisierondes', 'Drukklare PDF'],
      },
    ],
  },
  {
    id: 'ux-ui',
    index: '04',
    title: 'UX/UI',
    line: 'Voor een site of app die er al is en beter moet werken.',
    discipline: true,
    services: [
      {
        id: 'ux-audit',
        name: 'UX-audit en advies',
        aliases: ['UX Audit & Advies'],
        summary: 'We lopen uw site of app door en leveren een rapport met prioriteiten.',
        price: { amount: 225, from: true },
        includes: ['Rapport als PDF', 'Prioriteitenlijst', 'Opvolggesprek'],
        example: 'ux-ui-design',
      },
      {
        id: 'ui-redesign',
        name: 'UI-redesign',
        aliases: ['UI Design (Re-design)'],
        summary: 'Nieuwe schermen in Figma of Adobe XD, klaar om te laten bouwen.',
        price: { amount: 450, from: true },
        includes: ['Tot 3 pagina’s of schermen', 'Twee revisierondes', 'Overdrachtsdocument', 'Bouwen wordt apart geprijsd'],
        example: 'ux-ui-design',
      },
    ],
  },
  {
    id: 'seo',
    index: '05',
    title: 'Vindbaarheid',
    line: 'Zodat Google uw site begrijpt en toont.',
    discipline: true,
    services: [
      {
        id: 'seo-setup',
        name: 'SEO-basis',
        aliases: ['Basic SEO Setup'],
        summary: 'De technische basis voor zoekmachines in één keer op orde.',
        price: { amount: 195, from: true },
        includes: ['Meta tags', 'Sitemap en robots.txt', 'Google Search Console', 'Korte rapportage'],
        example: 'seo',
      },
      {
        id: 'seo-monthly',
        name: 'SEO per maand',
        aliases: ['Maandelijkse SEO Support'],
        summary: 'Zoektermen volgen, technische checks en een maandrapport.',
        price: { amount: 225, from: false, unit: 'per maand' },
        includes: ['Maandrapport', 'Zoektermen volgen', 'Contentsuggesties', 'Minimaal 3 maanden'],
        example: 'seo',
      },
    ],
  },
  {
    id: 'hosting',
    index: '06',
    title: 'Hosting',
    line: 'Uw site online houden, met SSL en dagelijkse back-ups.',
    discipline: true,
    services: [
      {
        id: 'hosting-setup',
        name: 'Hosting inrichten',
        aliases: ['Hosting Setup'],
        summary: 'Account, domeinkoppeling, SSL en het live zetten van uw site.',
        price: { amount: 45, from: false, unit: 'eenmalig' },
        includes: ['Hostingaccount', 'Domein koppelen', 'SSL', 'Livegang'],
        example: 'hosting',
      },
      {
        id: 'hosting-basic',
        name: 'Basic hosting',
        aliases: ['Basic Hosting'],
        summary: 'Hosting voor een gewone bedrijfswebsite.',
        price: { amount: 20, from: false, unit: 'per maand' },
        includes: ['10 GB opslag', '100 GB bandbreedte', 'SSL en dagelijkse back-ups', 'Uptime bewaakt'],
        example: 'hosting',
      },
      {
        id: 'hosting-business',
        name: 'Business hosting',
        aliases: ['Business Hosting'],
        summary: 'Meer ruimte, een CDN en voorrang bij support.',
        price: { amount: 30, from: false, unit: 'per maand' },
        includes: ['50 GB opslag', 'Onbeperkte bandbreedte', 'SSL en CDN', 'Voorrang bij support', 'Uptime bewaakt'],
        example: 'hosting',
      },
    ],
    terms:
      'Het domein is niet inbegrepen. U registreert het zelf, of wij doen het tegen kostprijs plus $10.',
  },
  {
    id: 'service-sla',
    index: '07',
    title: 'Service en SLA',
    line: 'Wat er na de oplevering gebeurt, en hoe snel.',
    discipline: true,
    services: [
      {
        id: 'service-basis',
        name: 'Service basis',
        aliases: ['Service Basis'],
        summary: 'Standaard bij elke oplevering, zonder maandkosten.',
        price: { label: 'Inbegrepen' },
        includes: [
          'Reactie binnen 24 uur op werkdagen',
          'Bugfixes gratis in de eerste 14 dagen',
          'Bereikbaar via WhatsApp en e-mail',
          `Later werk tegen $${standardHourlyRate} per uur`,
        ],
      },
      {
        id: 'sla-silver',
        name: 'SLA Zilver',
        summary: 'Kortere reactietijd en een maandelijkse controle.',
        price: { amount: 75, from: false, unit: 'per maand' },
        includes: [
          'Reactie binnen 8 werkuren',
          'Storing opgepakt binnen 1 werkdag',
          'Maandelijkse controle van back-ups en updates',
          '1 uur wijzigingswerk per maand',
          `Later werk tegen $${standardHourlyRate} per uur`,
        ],
      },
      {
        id: 'sla-gold',
        name: 'SLA Goud',
        summary: 'Voor sites waar een storing direct omzet kost.',
        price: { amount: 150, from: false, unit: 'per maand' },
        includes: [
          'Reactie binnen 4 werkuren',
          'Storing opgepakt binnen 4 uur, ook ’s avonds',
          'Wekelijkse controle van back-ups en updates',
          '3 uur wijzigingswerk per maand',
          `Later werk tegen $${standardHourlyRate} per uur`,
          'Kwartaalrapport over snelheid en vindbaarheid',
        ],
      },
    ],
    terms:
      'Werkuren zijn maandag tot en met vrijdag, 08:00 tot 17:00. Een SLA loopt per maand, minimaal drie maanden, en is altijd op te waarderen. Een SLA koopt reactietijd en onderhoud; UX Kukru koopt uren. Ze zijn te combineren.',
  },
  {
    id: 'meerwerk',
    index: '08',
    title: 'Meerwerk',
    line: 'Losse posten met een vast bedrag. We melden het altijd vooraf.',
    discipline: false,
    services: [
      {
        id: 'rush',
        name: 'Spoedoplevering',
        summary: 'Voorrang in de planning, oplevering binnen 24 tot 48 uur als het past.',
        price: { label: '+40% op de prijs' },
        includes: ['Afhankelijk van beschikbaarheid', 'Vooraf bevestigd, nooit achteraf'],
      },
      {
        id: 'extra-revision',
        name: 'Extra revisieronde',
        summary: 'Bovenop de rondes die al inbegrepen zijn, voor ontwerp of tekst.',
        price: { amount: 65, from: false, unit: 'per ronde' },
        includes: ['Losse kleine correcties blijven gratis'],
      },
      {
        id: 'content-entry',
        name: 'Contentinvoer',
        summary: 'Wij zetten uw teksten en foto’s in de site.',
        price: { amount: 20, from: false, unit: 'per pagina' },
        includes: ['Bijsnijden en optimaliseren van beeld'],
      },
      {
        id: 'training',
        name: 'Training en overdracht',
        summary: 'U leert zelf tekst, prijzen en foto’s aanpassen.',
        price: { amount: 75, from: false, unit: 'per uur' },
        includes: ['Op locatie in Paramaribo of online', 'Korte handleiding achteraf'],
      },
      {
        id: 'extra-language',
        name: 'Extra taal',
        summary: 'Een tweede taal naast Nederlands, met een taalwisselaar in het menu.',
        price: { amount: 175, from: true },
        includes: ['Vertaling door u aangeleverd, of tegen meerprijs door ons'],
      },
    ],
  },
  {
    id: 'ux-kukru',
    index: '09',
    title: 'UX Kukru',
    line: 'Uren van het NextX-team per maand, via één vast aanspreekpunt.',
    discipline: true,
    services: [
      {
        id: 'kukru-starter',
        name: 'Starter',
        aliases: ['Starter Support'],
        summary: 'Updates, kleine fixes en contentwijzigingen.',
        price: { amount: 350, from: false, unit: 'per maand' },
        includes: ['10 uur per maand', 'Technisch advies', 'Antwoord per e-mail binnen 48 uur'],
        example: 'ux-kukru',
      },
      {
        id: 'kukru-business',
        name: 'Business',
        aliases: ['Business Support'],
        summary: 'Nieuwe functies, designupdates en koppelingen.',
        price: { amount: 650, from: false, unit: 'per maand' },
        includes: ['20 uur per maand', 'Strategisch advies', 'Antwoord via chat binnen 24 uur'],
        example: 'ux-kukru',
      },
      {
        id: 'kukru-partner',
        name: 'Partner',
        aliases: ['Partner Support'],
        summary: 'Een vast aanspreekpunt voor grotere en complexere projecten.',
        price: { amount: 1100, from: false, unit: 'per maand' },
        includes: ['40 uur per maand', 'Voorrang bij complexe projecten', 'Direct contact binnen 12 uur'],
        example: 'ux-kukru',
      },
    ],
    terms: `Extra uren: $${standardHourlyRate} per uur. Elk pakket loopt minimaal 3 maanden.`,
  },
]

/** Applies to every website and webshop, so it is said once instead of per service. */
export const includedEverywhere = [
  'Eigen ontwerp in uw huisstijl',
  'Werkt op telefoon, tablet en desktop',
  'SSL en livegang op uw domein',
  'Uw teksten en beeld verwerkt',
  'Kleine revisies tijdens het project',
  'Uitleg over beheer bij oplevering',
]

export const allServices = serviceCategories.flatMap((category) =>
  category.services.map((service) => ({ ...service, category }))
)

/** Name that stands on its own outside its category, e.g. in the contact form. */
export function serviceLabel(service: Service, category: ServiceCategory) {
  return category.id === 'ux-kukru' ? `UX Kukru ${service.name}` : service.name
}

/**
 * Resolves a ?dienst= value: a service id, its current name, or a name it was
 * known by before. Returns undefined for anything that is not a real service.
 */
export function findService(value: string | null | undefined) {
  if (!value) return undefined
  const needle = value.trim().toLowerCase()
  return allServices.find(
    (s) =>
      s.id === needle ||
      s.name.toLowerCase() === needle ||
      serviceLabel(s, s.category).toLowerCase() === needle ||
      s.aliases?.some((alias) => alias.toLowerCase() === needle)
  )
}

export function formatAmount(amount: number) {
  return amount.toLocaleString('en-US')
}

export function formatPrice(price: Price) {
  if ('label' in price) return price.label
  const unit = price.unit ? ` ${price.unit}` : ''
  return `${price.from ? 'vanaf ' : ''}$${formatAmount(price.amount)}${unit}`
}

/** Lowest entry price in a category, for compact overviews. */
export function startingPrice(category: ServiceCategory) {
  const priced = category.services.flatMap((s) => ('amount' in s.price ? [s.price] : []))
  return priced.reduce((low, p) => (p.amount < low.amount ? p : low))
}

/** Cheapest website: the entry price quoted when someone asks "what does a site cost". */
export const websiteFrom = startingPrice(serviceCategories[0])
