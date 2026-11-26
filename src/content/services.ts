/**
 * The price list. These are the only prices on the site: the services page,
 * the homepage, the contact form, the examples and the schema all read them
 * from here.
 */

export type Price =
  | {
      amount: number
      /** "from" prices are a starting point; the exact figure follows the first call. */
      from: boolean
      unit?: 'per post' | 'per month' | 'one-off' | 'per round' | 'per page' | 'per hour'
    }
  | { label: string }

export type Service = {
  id: string
  name: string
  /**
   * Earlier names still used in links, e.g. /contact?service=Logo%20Design.
   * The Dutch names the site used before it went English stay here so old links keep working.
   */
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
    line: 'Business sites, portfolios and restaurant sites.',
    discipline: true,
    services: [
      {
        id: 'one-page',
        name: 'One-page website',
        aliases: ['Business Card Site'],
        summary: 'One page with who you are, what you do and how customers reach you.',
        price: { amount: 295, from: true },
        includes: ['WhatsApp button', 'Contact form'],
        example: 'business-card-site',
      },
      {
        id: 'service-website',
        name: 'Service website',
        aliases: ['Service Website', 'Servicewebsite'],
        summary: 'Separate pages for your services, about and contact.',
        price: { amount: 595, from: true },
        includes: ['Home, services, about and contact', 'Contact form'],
        example: 'service-website',
      },
      {
        id: 'portfolio-website',
        name: 'Portfolio website',
        aliases: ['Portfolio Website', 'Portfoliowebsite'],
        summary: 'A gallery for your work, with a page for every project.',
        price: { amount: 495, from: true },
        includes: ['Up to 20 projects', 'Project pages', 'About and contact'],
        example: 'portfolio-website',
      },
      {
        id: 'restaurant-website',
        name: 'Restaurant website',
        aliases: ['Restaurant/Menu Site', 'Restaurantwebsite'],
        summary: 'Menu, opening hours and location, with a link to book a table.',
        price: { amount: 495, from: true },
        includes: ['Digital menu up to 50 dishes', 'Opening hours and map', 'Booking link'],
        example: 'restaurant-menu-site',
      },
    ],
    terms:
      `Changes after launch (text, images, small layout tweaks) are billed at $${standardHourlyRate} per hour.`,
  },
  {
    id: 'website-subscriptions',
    index: '',
    title: 'Website subscriptions',
    line: 'A website with ongoing maintenance and room for changes every month.',
    discipline: false,
    services: [
      {
        id: 'subscription-landing-page',
        name: 'Landing Page',
        summary: 'A single page for a freelancer or small business.',
        price: { amount: 50, from: false, unit: 'per month' },
        includes: ['Design and build', 'Mobile-friendly', 'Contact details and links', 'Maintenance and bug fixes', '1 small change per month'],
      },
      {
        id: 'subscription-starter',
        name: 'Starter plan',
        aliases: ['Starter abonnement'],
        summary: 'A professional website that we keep maintaining.',
        price: { amount: 80, from: false, unit: 'per month' },
        includes: ['Design and build', 'Mobile-friendly', 'Maintenance and bug fixes', 'Technical support', '1 change or feature per month'],
      },
      {
        id: 'subscription-growth',
        name: 'Growth plan',
        aliases: ['Growth abonnement'],
        summary: 'More room to develop your website every month.',
        price: { amount: 130, from: false, unit: 'per month' },
        includes: ['Everything in Starter', '3 changes or features per month', 'Priority for changes and technical support'],
      },
      {
        id: 'subscription-premium',
        name: 'Premium plan',
        aliases: ['Premium abonnement'],
        summary: 'For a website that regularly needs new features.',
        price: { amount: 200, from: false, unit: 'per month' },
        includes: ['Everything in Growth', '5 changes or features per month', 'Highest priority for changes', 'Advanced features within the agreed scope', 'Priority technical support'],
      },
    ],
    terms: 'All amounts in USD. These are rolling monthly subscriptions; the website is built as part of the plan. A new section, product or layout change counts as one change. Unused changes do not roll over. Bug fixes for existing features do not count. Every change gets a clear scope up front; large or complex requests may need a separate quote. Domain purchase and renewal are billed separately.',
  },
  {
    id: 'e-commerce',
    index: '02',
    title: 'Webshops',
    line: 'Sell online with a cart, checkout and payment by bank transfer.',
    discipline: true,
    services: [
      {
        id: 'starter-webshop',
        name: 'Starter webshop',
        aliases: ['Starter Webshop'],
        summary: 'A first online store for a compact range of products.',
        price: { amount: 950, from: true },
        includes: ['Up to 25 products', 'Cart and checkout', 'Payment by bank transfer', 'Walkthrough of product management'],
        example: 'starter-webshop',
      },
      {
        id: 'large-webshop',
        name: 'Larger webshop',
        aliases: ['Grotere Webshop', 'Grotere webshop'],
        summary: 'A catalogue with categories, filters, search and customer accounts.',
        price: { amount: 1350, from: true },
        includes: ['Up to 100 products', 'Categories, filters and search', 'Customer accounts and order status', 'Bank transfer or your own payment flow'],
        example: 'larger-webshop',
      },
    ],
    terms:
      `More products: $5 per product up to 250. Beyond that we quote a custom price. Changes after launch: $${standardHourlyRate} per hour.`,
  },
  {
    id: 'graphic-design',
    index: '03',
    title: 'Graphic design',
    line: 'Logos, social posts and print.',
    discipline: true,
    services: [
      {
        id: 'logo',
        name: 'Logo design',
        aliases: ['Logo Design', 'Logo-ontwerp'],
        summary: 'One logo concept, worked out into every file you need.',
        price: { amount: 195, from: true },
        includes: ['Two revision rounds', 'PNG and JPG, transparent and on white', 'Other formats on request'],
        example: 'logo-branding',
      },
      {
        id: 'social-post',
        name: 'Social media post',
        aliases: ['Social Media Post Design'],
        summary: 'One design for Instagram or Facebook.',
        price: { amount: 25, from: false, unit: 'per post' },
        includes: ['1080×1080 or 1080×1350', 'One revision round'],
      },
      {
        id: 'flyer',
        name: 'Flyer or poster',
        aliases: ['Flyer/Poster Design', 'Flyer of poster'],
        summary: 'Print-ready design in A4 or A5, or a custom size.',
        price: { amount: 75, from: true },
        includes: ['Two revision rounds', 'Print-ready PDF'],
      },
    ],
  },
  {
    id: 'ux-ui',
    index: '04',
    title: 'UX/UI',
    line: 'For an existing site or app that needs to work better.',
    discipline: true,
    services: [
      {
        id: 'ux-audit',
        name: 'UX audit and advice',
        aliases: ['UX Audit & Advies', 'UX-audit en advies'],
        summary: 'We go through your site or app and deliver a report with priorities.',
        price: { amount: 225, from: true },
        includes: ['Report as a PDF', 'Priority list', 'Follow-up call'],
        example: 'ux-ui-design',
      },
      {
        id: 'ui-redesign',
        name: 'UI redesign',
        aliases: ['UI Design (Re-design)', 'UI-redesign'],
        summary: 'New screens in Figma or Adobe XD, ready to be built.',
        price: { amount: 450, from: true },
        includes: ['Up to 3 pages or screens', 'Two revision rounds', 'Handover document', 'Build priced separately'],
        example: 'ux-ui-design',
      },
    ],
  },
  {
    id: 'seo',
    index: '05',
    title: 'SEO',
    line: 'So Google understands your site and shows it.',
    discipline: true,
    services: [
      {
        id: 'seo-setup',
        name: 'SEO setup',
        aliases: ['Basic SEO Setup', 'SEO-basis'],
        summary: 'The technical basics for search engines, sorted in one go.',
        price: { amount: 195, from: true },
        includes: ['Meta tags', 'Sitemap and robots.txt', 'Google Search Console', 'Short report'],
        example: 'seo',
      },
      {
        id: 'seo-monthly',
        name: 'Monthly SEO',
        aliases: ['Maandelijkse SEO Support', 'SEO per maand'],
        summary: 'Keyword tracking, technical checks and a monthly report.',
        price: { amount: 225, from: false, unit: 'per month' },
        includes: ['Monthly report', 'Keyword tracking', 'Content suggestions', 'Minimum 3 months'],
        example: 'seo',
      },
    ],
  },
  {
    id: 'hosting',
    index: '06',
    title: 'Hosting',
    line: 'Keeping your site online, with SSL and daily backups.',
    discipline: true,
    services: [
      {
        id: 'hosting-setup',
        name: 'Hosting setup',
        aliases: ['Hosting Setup', 'Hosting inrichten'],
        summary: 'Account, domain connection, SSL and putting your site live.',
        price: { amount: 45, from: false, unit: 'one-off' },
        includes: ['Hosting account', 'Domain connection', 'SSL', 'Go-live'],
        example: 'hosting',
      },
      {
        id: 'hosting-basic',
        name: 'Basic hosting',
        aliases: ['Basic Hosting'],
        summary: 'Hosting for a standard business website.',
        price: { amount: 20, from: false, unit: 'per month' },
        includes: ['10 GB storage', '100 GB bandwidth', 'SSL and daily backups', 'Uptime monitoring'],
        example: 'hosting',
      },
      {
        id: 'hosting-business',
        name: 'Business hosting',
        aliases: ['Business Hosting'],
        summary: 'More space, a CDN and priority support.',
        price: { amount: 30, from: false, unit: 'per month' },
        includes: ['50 GB storage', 'Unlimited bandwidth', 'SSL and CDN', 'Priority support', 'Uptime monitoring'],
        example: 'hosting',
      },
    ],
    terms:
      'The domain is not included. You register it yourself, or we do it at cost plus $10.',
  },
  {
    id: 'service-sla',
    index: '07',
    title: 'Service and SLA',
    line: 'What happens after launch, and how fast.',
    discipline: true,
    services: [
      {
        id: 'service-basis',
        name: 'Basic service',
        aliases: ['Service Basis', 'Service basis'],
        summary: 'Standard with every launch, with no monthly fee.',
        price: { label: 'Included' },
        includes: [
          'Reply within 24 hours on working days',
          'Free bug fixes in the first 14 days',
          'Reachable on WhatsApp and email',
          `Later work at $${standardHourlyRate} per hour`,
        ],
      },
      {
        id: 'sla-silver',
        name: 'SLA Silver',
        aliases: ['SLA Zilver'],
        summary: 'Faster replies and a monthly check-up.',
        price: { amount: 75, from: false, unit: 'per month' },
        includes: [
          'Reply within 8 working hours',
          'Outages picked up within 1 working day',
          'Monthly check of backups and updates',
          '1 hour of change work per month',
          `Later work at $${standardHourlyRate} per hour`,
        ],
      },
      {
        id: 'sla-gold',
        name: 'SLA Gold',
        aliases: ['SLA Goud'],
        summary: 'For sites where an outage costs revenue straight away.',
        price: { amount: 150, from: false, unit: 'per month' },
        includes: [
          'Reply within 4 working hours',
          'Outages picked up within 4 hours, evenings included',
          'Weekly check of backups and updates',
          '3 hours of change work per month',
          `Later work at $${standardHourlyRate} per hour`,
          'Quarterly report on speed and search visibility',
        ],
      },
    ],
    terms:
      'Working hours are Monday to Friday, 08:00 to 17:00. An SLA runs monthly, for at least three months, and can always be upgraded. An SLA buys response time and maintenance; UX Kukru buys hours. The two can be combined.',
  },
  {
    id: 'extras',
    index: '08',
    title: 'Extras',
    line: 'Separate items at a fixed price. We always tell you up front.',
    discipline: false,
    services: [
      {
        id: 'rush',
        name: 'Rush delivery',
        aliases: ['Spoedoplevering'],
        summary: 'Priority in the schedule, delivery within 24 to 48 hours when it fits.',
        price: { label: '+40% on the price' },
        includes: ['Subject to availability', 'Confirmed up front, never afterwards'],
      },
      {
        id: 'extra-revision',
        name: 'Extra revision round',
        aliases: ['Extra revisieronde'],
        summary: 'On top of the rounds already included, for design or copy.',
        price: { amount: 65, from: false, unit: 'per round' },
        includes: ['Small one-off corrections stay free'],
      },
      {
        id: 'content-entry',
        name: 'Content entry',
        aliases: ['Contentinvoer'],
        summary: 'We put your text and photos into the site.',
        price: { amount: 20, from: false, unit: 'per page' },
        includes: ['Image cropping and optimisation'],
      },
      {
        id: 'training',
        name: 'Training and handover',
        aliases: ['Training en overdracht'],
        summary: 'You learn to update text, prices and photos yourself.',
        price: { amount: 75, from: false, unit: 'per hour' },
        includes: ['On site in Paramaribo or online', 'Short guide afterwards'],
      },
      {
        id: 'extra-language',
        name: 'Extra language',
        aliases: ['Extra taal'],
        summary: 'A second language next to English, with a language switcher in the menu.',
        price: { amount: 175, from: true },
        includes: ['Translation supplied by you, or by us at extra cost'],
      },
    ],
  },
  {
    id: 'ux-kukru',
    index: '09',
    title: 'UX Kukru',
    line: 'Design and development hours every month, coordinated by NextX.',
    discipline: true,
    services: [
      {
        id: 'kukru-starter',
        name: 'Starter',
        aliases: ['Starter Support'],
        summary: 'Updates, small fixes and content changes.',
        price: { amount: 350, from: false, unit: 'per month' },
        includes: ['10 hours per month', 'Technical advice', 'Email reply within 48 hours'],
        example: 'ux-kukru',
      },
      {
        id: 'kukru-business',
        name: 'Business',
        aliases: ['Business Support'],
        summary: 'New features, design updates and integrations.',
        price: { amount: 650, from: false, unit: 'per month' },
        includes: ['20 hours per month', 'Strategic advice', 'Chat reply within 24 hours'],
        example: 'ux-kukru',
      },
      {
        id: 'kukru-partner',
        name: 'Partner',
        aliases: ['Partner Support'],
        summary: 'One dedicated contact for larger, more complex projects.',
        price: { amount: 1100, from: false, unit: 'per month' },
        includes: ['40 hours per month', 'Priority on complex projects', 'Direct contact within 12 hours'],
        example: 'ux-kukru',
      },
    ],
    terms: `Extra hours: $${standardHourlyRate} per hour. Every package runs for at least 3 months.`,
  },
  {
    id: 'creative-production',
    index: '10',
    title: 'Custom',
    line: 'Software, brand identity, photography and marketing, quoted per project.',
    discipline: false,
    services: [
      { id: 'web-software', name: 'Custom software', aliases: ['Software op maat', 'Web & Software op maat', 'Web & Software', 'software'], summary: 'Web applications, dashboards, internal systems and integrations.', price: { label: 'On request' }, includes: ['Scope and schedule agreed together', 'Quote before we start'] },
      { id: 'photography-media', name: 'Photography & Media', aliases: ['Fotografie & Media'], summary: 'Commercial photography, portraits, events and video production.', price: { label: 'On request' }, includes: ['Brief and visual direction agreed together', 'Production and delivery as agreed'] },
      { id: 'branding-design', name: 'Graphic Design & Branding', aliases: ['Branding & Design', 'Grafisch ontwerp & Branding'], summary: 'Visual identities and design for a recognisable brand.', price: { label: 'On request' }, includes: ['Scope and applications agreed together', 'Quote before we start'] },
      { id: 'marketing', name: 'Marketing', summary: 'Content, campaigns and brand communication.', price: { label: 'On request' }, includes: ['Goals and channels set together', 'Content and schedule as agreed'] },
    ],
  },
]

/** Applies to every website and webshop, so it is said once instead of per service. */
export const includedEverywhere = [
  'Custom design in your brand style',
  'Works on phone, tablet and desktop',
  'SSL and go-live on your domain',
  'Your text and images added',
  'Small revisions during the project',
  'Walkthrough of how to manage it at launch',
]

export const allServices = serviceCategories.flatMap((category) =>
  category.services.map((service) => ({ ...service, category }))
)

/** Name that stands on its own outside its category, e.g. in the contact form. */
export function serviceLabel(service: Service, category: ServiceCategory) {
  return category.id === 'ux-kukru' ? `UX Kukru ${service.name}` : service.name
}

/**
 * Resolves a ?service= value (or the older ?dienst=): a service id, its current
 * name, or a name it was known by before. Returns undefined for anything that
 * is not a real service.
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
  return `${price.from ? 'from ' : ''}$${formatAmount(price.amount)}${unit}`
}

/** Lowest entry price in a category, for compact overviews. */
export function startingPrice(category: ServiceCategory) {
  const priced = category.services.flatMap((s) => ('amount' in s.price ? [s.price] : []))
  return priced.reduce((low, p) => (p.amount < low.amount ? p : low))
}

/** Cheapest website: the entry price quoted when someone asks "what does a site cost". */
export const websiteFrom = startingPrice(serviceCategories[0])
