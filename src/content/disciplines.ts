/**
 * What NextX does. The three core specialties lead every overview; the
 * supporting disciplines stay available for enquiries but never get equal
 * billing. Ids double as anchors on /services and as ?dienst= values.
 */
export const disciplines = [
  {
    id: 'branding-design',
    index: '01',
    core: true,
    name: 'Grafisch ontwerp & Branding',
    short: 'Een herkenbaar merk, in elk detail.',
    description:
      'Een logo, een huisstijl en het ontwerp dat daaruit volgt. We zorgen dat uw bedrijf er op elk kanaal hetzelfde uitziet, van visitekaartje tot social media.',
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
    short: 'Websites en webshops die werken.',
    description:
      'Bedrijfswebsites, webshops en digitale ervaringen op maat. We ontwerpen de pagina’s en bouwen ze zelf, zodat wat u goedkeurt ook is wat online komt.',
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
    short: 'Systemen rond uw manier van werken.',
    description:
      'Webapplicaties, dashboards en interne systemen voor werk dat niet in een standaardpakket past. Gebouwd rond uw proces en gekoppeld aan de tools die u al gebruikt.',
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
    short: 'Beeld bij uw merk of website.',
    description:
      'Product- en bedrijfsfotografie of video bij een website, webshop of campagne. We stemmen het beeld af op waar het gebruikt wordt.',
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
    short: 'Content en campagnes.',
    description:
      'Content en campagnes rond een duidelijke boodschap. We bepalen samen wat u wilt vertellen, aan wie en via welke kanalen.',
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
