/**
 * What NextX does. The three core specialties lead every overview; the
 * supporting disciplines stay available for enquiries but never get equal
 * billing. `word` is the one-word name used on tiles and big headings. Ids double as anchors on /services and as ?service= values.
 */
export const disciplines = [
  {
    id: 'branding-design',
    index: '01',
    core: true,
    name: 'Graphic Design & Branding',
    word: 'Design',
    line: 'Logos, brand identities and print',
    short: 'A recognisable brand, in every detail.',
    description: 'A brand people recognise everywhere, from logo to social media.',
    services: [
      'Logo and visual identity',
      'Social media and campaign visuals',
      'Flyers, posters and print',
    ],
  },
  {
    id: 'web',
    index: '02',
    core: true,
    name: 'Webdesign & Development',
    word: 'Websites',
    line: 'Business sites and webshops',
    short: 'Websites and webshops that work.',
    description: 'Designed and built by the same studio.',
    services: [
      'Business websites',
      'Webshops and ordering through WhatsApp',
      'Maintenance and further development',
    ],
  },
  {
    id: 'software',
    index: '03',
    core: true,
    name: 'Custom software',
    word: 'Software',
    line: 'Web apps, dashboards and systems',
    short: 'Systems built around the way you work.',
    description: 'For work that does not fit an off-the-shelf package.',
    services: [
      'Web applications',
      'Dashboards and admin panels',
      'Internal systems and integrations',
    ],
  },
  {
    id: 'photography-media',
    index: '04',
    core: false,
    name: 'Photography & Media',
    word: 'Photography',
    line: 'Photo and video for your brand',
    short: 'Imagery for your brand or website.',
    description: 'Product and company imagery for a website, webshop or campaign.',
    services: [
      'Product and company photography',
      'Portraits and events',
      'Video and promotional media',
    ],
  },
  {
    id: 'marketing',
    index: '05',
    core: false,
    name: 'Marketing',
    word: 'Marketing',
    line: 'Content and campaigns',
    short: 'Content and campaigns.',
    description: 'Content and campaigns built around one clear message.',
    services: [
      'Content creation',
      'Social media marketing',
      'Campaigns and brand communication',
    ],
  },
] as const

export type Discipline = (typeof disciplines)[number]['id']

/** Graphic design, web and software: the identity of the studio. */
export const specialties = disciplines.filter((discipline) => discipline.core)

/** Offered alongside a project, quoted per job. */
export const supportingDisciplines = disciplines.filter((discipline) => !discipline.core)
