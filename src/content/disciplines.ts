/**
 * What NextX does. The three core specialties lead every overview; the
 * supporting disciplines stay available for enquiries but never get equal
 * billing. `word` is the one-word name used on tiles and big headings. Ids double as anchors on /services and as ?dienst= values.
 */
export const disciplines = [
  {
    id: 'branding-design',
    index: '01',
    core: true,
    name: 'Grafisch ontwerp & Branding',
    word: 'Design',
    line: 'Logo’s, huisstijlen en drukwerk',
    short: 'Een herkenbaar merk, in elk detail.',
    description: 'Een merk dat u overal herkent, van logo tot social media.',
    services: [
      'Logo en visuele identiteit',
      'Social media- en campagnebeelden',
      'Flyers, posters en drukwerk',
    ],
  },
  {
    id: 'web',
    index: '02',
    core: true,
    name: 'Webdesign & Development',
    word: 'Websites',
    line: 'Bedrijfssites en webshops',
    short: 'Websites en webshops die werken.',
    description: 'Ontworpen en gebouwd door dezelfde studio.',
    services: [
      'Bedrijfswebsites',
      'Webshops en bestellen via WhatsApp',
      'Onderhoud en doorontwikkeling',
    ],
  },
  {
    id: 'software',
    index: '03',
    core: true,
    name: 'Software op maat',
    word: 'Software',
    line: 'Webapps, dashboards en systemen',
    short: 'Systemen rond uw manier van werken.',
    description: 'Voor werk dat niet in een standaardpakket past.',
    services: [
      'Webapplicaties',
      'Dashboards en beheeromgevingen',
      'Interne systemen en koppelingen',
    ],
  },
  {
    id: 'photography-media',
    index: '04',
    core: false,
    name: 'Fotografie & Media',
    word: 'Fotografie',
    line: 'Foto en video bij uw merk',
    short: 'Beeld bij uw merk of website.',
    description: 'Product- en bedrijfsbeeld bij een website, webshop of campagne.',
    services: [
      'Product- en bedrijfsfotografie',
      'Portretten en evenementen',
      'Video en promotionele media',
    ],
  },
  {
    id: 'marketing',
    index: '05',
    core: false,
    name: 'Marketing',
    word: 'Marketing',
    line: 'Content en campagnes',
    short: 'Content en campagnes.',
    description: 'Content en campagnes rond één duidelijke boodschap.',
    services: [
      'Contentcreatie',
      'Social media marketing',
      'Campagnes en merkcommunicatie',
    ],
  },
] as const

export type Discipline = (typeof disciplines)[number]['id']

/** Graphic design, web and software: the identity of the studio. */
export const specialties = disciplines.filter((discipline) => discipline.core)

/** Offered alongside a project, quoted per job. */
export const supportingDisciplines = disciplines.filter((discipline) => !discipline.core)
