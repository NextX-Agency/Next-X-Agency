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
        price: 'Vanaf $55',
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
        price: '$10 per post',
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
        price: 'Vanaf $25',
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
        price: 'Vanaf $150',
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
        price: 'Vanaf $250',
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
        price: 'Vanaf $220',
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
        price: 'Vanaf $260',
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
    note: 'Na oplevering: bug fixes, content wijzigingen en revisies worden gefactureerd tegen $15/uur. Denk aan tekst updates, afbeeldingen en kleine layout aanpassingen.',
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
        price: 'Vanaf $350',
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
        price: 'Vanaf $550',
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
    note: 'Extra producten boven limiet: $3 per product (tot 250 producten). Meer dan 250 producten = custom pricing. Na oplevering: bug fixes & aanpassingen worden gefactureerd tegen $15/uur.',
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
        price: 'Vanaf $100',
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
        price: 'Vanaf $180',
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
        price: 'Vanaf $75',
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
        price: '$60/maand',
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
        price: '$35 eenmalig',
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
    note: 'Domein registratie niet inbegrepen — klant registreert eigen domein of wij verzorgen dit tegen kostprijs + $5 service fee.',
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
        price: '$150/maand',
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
        price: '$280/maand',
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
        price: '$480/maand',
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
    note: 'Extra uren boven pakket limiet: $18/uur. Alle pakketten vereisen minimaal 3 maanden commitment.',
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
