import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Alle Voorbeelden',
  description:
    'Bekijk alle demo voorbeelden van NextX Agency — websites, webshops, logo branding, UX/UI design, SEO en hosting. Interactieve previews van onze diensten.',
}

const examples = [
  {
    slug: 'business-card-site',
    title: 'KaderBouw NV',
    category: 'Website',
    description: 'Een directe bedrijfswebsite met projecten, werkwijze en een kort offerteformulier.',
    img: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=340&fit=crop',
  },
  {
    slug: 'service-website',
    title: 'DentaCare Paramaribo',
    category: 'Website',
    description: 'Een zorgvuldige service-site met teaminformatie, afspraakflow en duidelijke contactmomenten.',
    img: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600&h=340&fit=crop',
  },
  {
    slug: 'portfolio-website',
    title: 'Studio Vibe',
    category: 'Website',
    description: 'Een portfolio waarin werk, context en contact de hoofdrol krijgen.',
    img: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=600&h=340&fit=crop',
  },
  {
    slug: 'restaurant-menu-site',
    title: 'Warung Indah',
    category: 'Website',
    description: 'Een digitaal menu met dagspecials, allergeneninformatie en reserveren zonder omwegen.',
    img: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&h=340&fit=crop',
  },
  {
    slug: 'starter-webshop',
    title: 'Bloom Boutique',
    category: 'E-Commerce',
    description: 'Een compacte shop met productfilters, winkelwagen en een korte checkout.',
    img: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=340&fit=crop',
  },
  {
    slug: 'grotere-webshop',
    title: 'TechMart SUR',
    category: 'E-Commerce',
    description: 'Een grotere catalogus met zoeken, filters, productdetails en een winkelwagen.',
    img: 'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=600&h=340&fit=crop',
  },
  {
    slug: 'logo-branding',
    title: 'Savana Coffee',
    category: 'Design',
    description: 'Een merkpresentatie met logo, kleurensysteem, typografie en toepassingen.',
    img: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&h=340&fit=crop',
  },
  {
    slug: 'ux-ui-design',
    title: 'ShopPlaza Redesign',
    category: 'Design',
    description: 'Een UX-case met bevindingen, voor-en-na schermen en een navolgbaar proces.',
    img: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=600&h=340&fit=crop',
  },
  {
    slug: 'seo',
    title: 'SEO Dashboard',
    category: 'Marketing',
    description: 'Een SEO-omgeving met zoektermen, trends en acties op één overzichtelijke plek.',
    img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=340&fit=crop',
  },
  {
    slug: 'hosting',
    title: 'Hosting Panel',
    category: 'Infrastructuur',
    description: 'Een hostingpaneel voor status, verbruik, back-ups en dagelijkse serveracties.',
    img: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=340&fit=crop',
  },
  {
    slug: 'ux-kukru',
    title: 'Kukru UX/UI',
    category: 'Outsourcing',
    description: 'Een community-case met team, proces, pakketten en een laagdrempelig contactpunt.',
    img: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=340&fit=crop',
  },
]

export default function ExamplesHub() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-12">
        <div className="flex items-baseline justify-between border-t-2 border-foreground pt-4 mb-8">
          <span className="text-xs font-bold tracking-[0.18em] uppercase text-foreground">Voorbeelden</span>
          <span className="text-xs font-medium text-muted-foreground">Cases en prototypes</span>
        </div>
        <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
          Werk dat u kunt bekijken
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          Een selectie van interfaces en flows. Elk voorbeeld laat zien hoe we een
          vraag vertalen naar iets dat prettig werkt.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-px border-l border-t border-border bg-border md:grid-cols-12">
        {examples.map((ex, index) => (
          <Link
            key={ex.slug}
            href={`/examples/${ex.slug}`}
            className={`group relative overflow-hidden bg-card transition-colors hover:bg-card-hover ${index % 4 === 0 ? 'md:col-span-7' : index % 4 === 1 ? 'md:col-span-5' : 'md:col-span-4'}`}
          >
            <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-border">
              <Image src={ex.img} alt={ex.title} fill className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
              <span className="absolute top-3 left-3 inline-block bg-foreground px-2.5 py-0.5 text-[10px] font-bold text-white uppercase tracking-wide">
                {ex.category}
              </span>
            </div>
            <div className="flex min-h-40 flex-col p-5 sm:p-6">
              <h2 className="font-heading text-lg font-semibold tracking-tight group-hover:text-primary transition-colors">
                {ex.title}
              </h2>
              <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
                {ex.description}
              </p>
              <div className="mt-auto flex items-center gap-1 pt-6 text-sm font-bold text-primary">
                Bekijk voorbeeld
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  )
}
