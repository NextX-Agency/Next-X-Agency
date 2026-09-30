export const disciplines = [
  {
    id: 'web-software',
    name: 'Web & Software',
    short: 'Websites, webshops en systemen.',
    description:
      'Van een heldere website tot een applicatie op maat. We ontwerpen de interface en bouwen de techniek erachter.',
    services: [
      'Websites & e-commerce',
      'Webapplicaties & bedrijfssystemen',
      'UI/UX & technische integraties',
    ],
  },
  {
    id: 'photography-media',
    name: 'Fotografie & Media',
    short: 'Beeld dat uw verhaal vertelt.',
    description:
      'Producten, mensen en momenten in beeld. We stemmen de fotografie of videoproductie af op uw merk en het gebruik van het materiaal.',
    services: [
      'Commerciële & productfotografie',
      'Portretten & evenementen',
      'Video & promotionele media',
    ],
  },
  {
    id: 'branding-design',
    name: 'Branding & Design',
    short: 'Een herkenbaar merk, in elk detail.',
    description:
      'Een visuele identiteit die doorwerkt in uw communicatie. Van logo en typografie tot social media, campagnes en drukwerk.',
    services: [
      'Visuele identiteit & merkontwikkeling',
      'Grafisch ontwerp & drukwerk',
      'Social media & campagnebeelden',
    ],
  },
  {
    id: 'marketing',
    name: 'Marketing',
    short: 'Een duidelijk verhaal voor uw publiek.',
    description:
      'Content en campagnes met een gerichte boodschap. We bepalen samen wat u wilt vertellen, aan wie en via welke kanalen.',
    services: [
      'Contentcreatie',
      'Digitale & social media marketing',
      'Campagnes & merkcommunicatie',
    ],
  },
] as const

export type Discipline = (typeof disciplines)[number]['id']
