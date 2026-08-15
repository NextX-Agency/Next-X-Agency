/**
 * The service catalogue, in one place.
 *
 * /services renders it in full, the contact form builds its dropdown from it,
 * and the "Bestel nu" links pass a service name that the form can match back
 * to an option. Because every surface reads this file, a name can never drift
 * out of sync between the price list and the form.
 */

export interface Service {
  name: string
  price: string
  items: string[]
  /** Highlighted card in its category. */
  popular?: boolean
  /** Demo prototype under /examples, when one exists for this service. */
  demo?: string
}

export interface ServiceCategory {
  /** Anchor id — linked from the footer as /services#<id>. */
  id: string
  tag: string
  title: string
  /** Short label used in the contact form dropdown. */
  shortTitle: string
  description: string
  services: Service[]
  note?: string
}

export const serviceCategories: ServiceCategory[] = [
  {
    id: 'graphic-design',
    tag: 'Visuele Identiteit',
    title: 'Graphic Marketing & Visual Design',
    shortTitle: 'Graphic Design',
    description:
      'Professionele visuele identiteit voor uw merk — van logo tot social media content.',
    services: [
      {
        name: 'Logo Design',
        price: 'Vanaf $85',
        demo: '/examples/logo-branding',
        items: [
          '1 uniek logo concept',
          '2 gratis revisie rondes',
          'PNG + JPG export (transparant & wit)',
          'Alle bestandsformaten inbegrepen',
          'Extra formaten op aanvraag',
        ],
      },
      {
        name: 'Social Media Post Design',
        price: '$15 per post',
        items: [
          '1 design per post',
          '1 revisie ronde inbegrepen',
          'Instagram & Facebook formaat',
          '1080×1080 of 1080×1350',
          'Print-ready bestand',
        ],
      },
      {
        name: 'Flyer/Poster Design',
        price: 'Vanaf $40',
        popular: true,
        items: [
          '1 volledig ontwerp',
          '2 revisie rondes inbegrepen',
          'Print-ready PDF export',
          'A4 / A5 standaard formaat',
          'Custom formaten mogelijk',
        ],
      },
    ],
  },
  {
    id: 'websites',
    tag: 'Web & Aanwezigheid',
    title: 'Websites & Online Presence',
    shortTitle: 'Websites',
    description:
      'Volledig responsive websites gepersonaliseerd naar uw huisstijl, met SSL en basis SEO inbegrepen.',
    services: [
      {
        name: 'Business Card Site',
        price: 'Vanaf $225',
        demo: '/examples/business-card-site',
        items: [
          'One-page gepersonaliseerd design',
          'Bedrijfsinfo + WhatsApp knop',
          'Contactformulier inbegrepen',
          'Responsive op alle apparaten',
          'SSL + online publicatie',
        ],
      },
      {
        name: 'Service Website',
        price: 'Vanaf $395',
        popular: true,
        demo: '/examples/service-website',
        items: [
          'Multi-page (Home, Diensten, Contact)',
          'Responsive design',
          'Contactformulier inbegrepen',
          'Over Ons pagina',
          'SSL + online publicatie',
        ],
      },
      {
        name: 'Portfolio Website',
        price: 'Vanaf $325',
        demo: '/examples/portfolio-website',
        items: [
          'Galerij tot 20 portfolio items',
          'Project detail pagina’s',
          'Over mij/ons + contact',
          'Responsive design',
          'SSL + publicatie',
        ],
      },
      {
        name: 'Restaurant/Menu Site',
        price: 'Vanaf $375',
        demo: '/examples/restaurant-menu-site',
        items: [
          'Digitaal menu (max 50 items)',
          'Openingstijden + locatie/kaart',
          'Reserveringslink inbegrepen',
          'Responsive design',
          'SSL + publicatie',
        ],
      },
    ],
    note: 'Na oplevering: bug fixes, content wijzigingen en revisies worden gefactureerd tegen $25/uur. Denk aan tekst updates, afbeeldingen en kleine layout aanpassingen.',
  },
  {
    id: 'e-commerce',
    tag: 'E-Commerce',
    title: 'E-Commerce Webshops',
    shortTitle: 'Webshop',
    description:
      'Complete webshops met winkelwagen, checkout en bankoverschrijving integratie.',
    services: [
      {
        name: 'Starter Webshop',
        price: 'Vanaf $525',
        demo: '/examples/starter-webshop',
        items: [
          'Max 25 producten',
          'Winkelwagen + checkout',
          'Bankoverschrijving integratie',
          'Responsive design',
          'Productbeheer instructies',
        ],
      },
      {
        name: 'Grotere Webshop',
        price: 'Vanaf $850',
        popular: true,
        demo: '/examples/grotere-webshop',
        items: [
          'Max 100 producten',
          'Categorieën, filters + zoeken',
          'Klantaccounts + order tracking',
          'Bankoverschrijving + custom betaalflow',
          'Uitgebreide beheer instructies',
        ],
      },
    ],
    note: 'Extra producten boven limiet: $4 per product (tot 250 producten). Meer dan 250 producten = custom pricing. Na oplevering: bug fixes & aanpassingen worden gefactureerd tegen $25/uur.',
  },
  {
    id: 'ux-ui',
    tag: 'UX / UI',
    title: 'UX/UI Design Services',
    shortTitle: 'UX/UI Design',
    description:
      'Verbeter uw gebruikerservaring met professionele UX audits en UI re-designs.',
    services: [
      {
        name: 'UX Audit & Advies',
        price: 'Vanaf $150',
        demo: '/examples/ux-ui-design',
        items: [
          'Analyse huidige website/app',
          'Verbeterpunten rapport (PDF)',
          'Prioriteitslijst aanbevelingen',
          'Opvolgingsgesprek inbegrepen',
          'Basis quickfixes advies',
        ],
      },
      {
        name: 'UI Design (Re-design)',
        price: 'Vanaf $275',
        popular: true,
        demo: '/examples/ux-ui-design',
        items: [
          'Nieuw design (max 3 pagina’s)',
          'Figma / Adobe XD mockups',
          '2 revisie rondes inbegrepen',
          'Handoff documentatie',
          'Implementatie apart geprijsd',
        ],
      },
    ],
  },
  {
    id: 'seo',
    tag: 'Zichtbaarheid',
    title: 'SEO & Online Zichtbaarheid',
    shortTitle: 'SEO',
    description:
      'Verbeter uw vindbaarheid in zoekmachines met professionele SEO optimalisatie.',
    services: [
      {
        name: 'Basic SEO Setup',
        price: 'Vanaf $95',
        demo: '/examples/seo',
        items: [
          'Meta tags optimalisatie',
          'Sitemap aanmaken',
          'Google Search Console',
          'Robots.txt configuratie',
          'Basis SEO rapportage',
        ],
      },
      {
        name: 'Maandelijkse SEO Support',
        price: '$85/maand',
        popular: true,
        demo: '/examples/seo',
        items: [
          'Maandelijkse rapportage',
          'Keyword monitoring',
          'Content suggesties',
          'Technische checks',
          'Min. 3 maanden contract',
        ],
      },
    ],
  },
  {
    id: 'hosting',
    tag: 'Infrastructuur',
    title: 'Webhosting & Technische Support',
    shortTitle: 'Hosting',
    description:
      'Betrouwbare hosting met SSL, dagelijkse backups en bewaakte uptime.',
    services: [
      {
        name: 'Hosting Setup',
        price: '$45 eenmalig',
        demo: '/examples/hosting',
        items: [
          'Hosting account aanmaken',
          'Domein koppeling',
          'SSL installatie',
          'Website deployment',
          'Eenmalige installatiekosten',
        ],
      },
      {
        name: 'Basic Hosting',
        price: '$20/maand',
        demo: '/examples/hosting',
        items: [
          '10GB storage',
          '100GB bandwidth',
          'SSL inbegrepen',
          'Dagelijkse backups',
          'Uptime monitoring',
        ],
      },
      {
        name: 'Business Hosting',
        price: '$30/maand',
        popular: true,
        demo: '/examples/hosting',
        items: [
          '50GB storage',
          'Onbeperkte bandwidth',
          'SSL + CDN inbegrepen',
          'Voorrang bij support',
          'Uptime monitoring',
        ],
      },
    ],
    note: 'Domein registratie niet inbegrepen — klant registreert eigen domein of wij verzorgen dit tegen kostprijs + $10 service fee.',
  },
  {
    id: 'service-sla',
    tag: 'Service & SLA',
    title: 'Service en reactietijden (SLA)',
    shortTitle: 'Service & SLA',
    description:
      'Bij elke oplevering hoort service. Wat daar standaard in zit staat hieronder, en wie een kortere reactietijd of vast onderhoud wil, kiest een SLA erbij. UX Kukru koopt uren in, een SLA koopt reactietijd en onderhoud; ze zijn te combineren.',
    services: [
      {
        name: 'Service Basis',
        price: 'Inbegrepen',
        items: [
          'Reactie binnen 24 uur op werkdagen',
          'Bugfixes gratis in de eerste 14 dagen',
          'Bereikbaar via WhatsApp en e-mail',
          'Later werk tegen $25 per uur',
          'Geen maandelijkse kosten',
        ],
      },
      {
        name: 'SLA Zilver',
        price: '$45/maand',
        popular: true,
        items: [
          'Reactie binnen 8 werkuren',
          'Storing opgepakt binnen 1 werkdag',
          'Maandelijkse controle van back-ups en updates',
          '1 uur wijzigingswerk per maand inbegrepen',
          'Later werk tegen $20 per uur',
        ],
      },
      {
        name: 'SLA Goud',
        price: '$95/maand',
        items: [
          'Reactie binnen 4 werkuren',
          'Storing opgepakt binnen 4 uur, ook ’s avonds',
          'Wekelijkse controle van back-ups en updates',
          '3 uur wijzigingswerk per maand inbegrepen',
          'Later werk tegen $18 per uur',
          'Rapportage per kwartaal over snelheid en vindbaarheid',
        ],
      },
    ],
    note: 'Werkuren zijn maandag tot en met vrijdag, 08:00 tot 17:00. Een SLA loopt per maand met een minimum van drie maanden en is op elk moment op te waarderen.',
  },
  {
    id: 'meerwerk',
    tag: 'Opties',
    title: 'Meerwerk en opties',
    shortTitle: 'Meerwerk',
    description:
      'Losse posten die u erbij kunt nemen, elk met een vast bedrag. Wij melden het altijd vooraf wanneer een verzoek hieronder valt, zodat u zelf beslist.',
    services: [
      {
        name: 'Spoedoplevering',
        price: '+40% op de prijs',
        items: [
          'Uw project krijgt voorrang in de planning',
          'Oplevering binnen 24 tot 48 uur',
          'Afhankelijk van beschikbaarheid',
          'Vooraf bevestigd, nooit achteraf',
        ],
      },
      {
        name: 'Extra revisieronde',
        price: '$45 per ronde',
        items: [
          'Boven op de rondes die al inbegrepen zijn',
          'Geldt voor design en voor teksten',
          'Losse kleine correcties blijven gratis',
        ],
      },
      {
        name: 'Contentinvoer',
        price: '$15 per pagina',
        items: [
          'Wij zetten uw teksten en foto’s in de site',
          'Inclusief bijsnijden en optimaliseren van beeld',
          'Handig als u het materiaal wel heeft maar de tijd niet',
        ],
      },
      {
        name: 'Training en overdracht',
        price: '$65 per uur',
        items: [
          'Op locatie in Paramaribo of online',
          'U leert zelf tekst, prijzen en foto’s aanpassen',
          'Korte handleiding op maat achteraf',
        ],
      },
      {
        name: 'Extra taal',
        price: 'Vanaf $120',
        items: [
          'Tweede taal naast Nederlands',
          'Taalwisselaar in het menu',
          'Vertaling aangeleverd door u, of tegen meerprijs door ons',
        ],
      },
    ],
  },
  {
    id: 'ux-kukru',
    tag: 'Outsourcing',
    title: 'UX Kukru — Outsourcing Service',
    shortTitle: 'UX Kukru support',
    description:
      'Toegang tot ons volledige NextX team via één vast aanspreekpunt. Flexibele maandpakketten voor structurele digitale ondersteuning.',
    services: [
      {
        name: 'Starter Support',
        price: '$195/maand',
        demo: '/examples/ux-kukru',
        items: [
          '10 uur/maand',
          'Kleine updates + bug fixes',
          'Content wijzigingen',
          'Technisch advies',
          'E-mail support (48u)',
        ],
      },
      {
        name: 'Business Support',
        price: '$360/maand',
        popular: true,
        demo: '/examples/ux-kukru',
        items: [
          '20 uur/maand',
          'Feature development',
          'Design updates + integraties',
          'Strategisch advies',
          'Support via chat (24u)',
        ],
      },
      {
        name: 'Partner Support',
        price: '$620/maand',
        demo: '/examples/ux-kukru',
        items: [
          '40 uur/maand',
          'Vast aanspreekpunt',
          'Voorrang bij complexe projecten',
          'Samenwerking met uw team',
          'Direct contact (12u)',
        ],
      },
    ],
    note: 'Extra uren boven pakket limiet: $25/uur. Alle pakketten vereisen minimaal 3 maanden commitment.',
  },
]

/** Every service name, grouped by category — the contact form dropdown. */
export const serviceOptionGroups = serviceCategories.map((category) => ({
  label: category.shortTitle,
  options: category.services.map((service) => service.name),
}))

/** Flat list of valid service names, used to validate a ?dienst= value. */
export const serviceNames = serviceCategories.flatMap((category) =>
  category.services.map((service) => service.name)
)

/**
 * The price of one service, by name. The homepage shows a short list of
 * services next to their price; looking it up here keeps that list from
 * quietly drifting away from the price list on /services.
 */
export function priceOf(name: string): string {
  const service = serviceCategories
    .flatMap((category) => category.services)
    .find((entry) => entry.name === name)
  if (!service) throw new Error(`Onbekende dienst: ${name}`)
  return service.price
}

/**
 * Cheapest website we build. The home page shows this next to the delivery
 * window, so it has to be the entry price for a site — not the cheapest thing
 * in the catalogue, which is a flyer.
 */
export const startingPrice: string = (() => {
  const websites = serviceCategories.find((category) => category.id === 'websites')
  if (!websites) throw new Error('Categorie websites ontbreekt')
  const amounts = websites.services
    .map((service) => service.price.match(/^Vanaf \$(\d+)$/)?.[1])
    .filter((amount): amount is string => Boolean(amount))
    .map(Number)
  return `$${Math.min(...amounts)}`
})()

/** Escape hatch for anything the catalogue does not cover. */
export const OTHER_SERVICE = 'Iets anders — leg ik uit in mijn bericht'

/**
 * Resolve a ?dienst= value to a real option. Returns undefined when the value
 * is missing or does not match, so the form falls back to an empty select.
 */
export function matchServiceName(value: string | null): string | undefined {
  if (!value) return undefined
  const needle = value.trim().toLowerCase()
  return serviceNames.find((name) => name.toLowerCase() === needle)
}
