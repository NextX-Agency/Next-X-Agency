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
    description: 'One-page digitale identiteit voor een bouwbedrijf met counter-animaties en contactformulier.',
    img: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=340&fit=crop',
  },
  {
    slug: 'service-website',
    title: 'DentaCare Paramaribo',
    category: 'Website',
    description: 'Multi-page website voor een tandartspraktijk met scroll-spy, team en afsprakensysteem.',
    img: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600&h=340&fit=crop',
  },
  {
    slug: 'portfolio-website',
    title: 'Studio Vibe',
    category: 'Website',
    description: 'Creatief portfolio met filter-tabs, lightbox galerij en animaties.',
    img: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=600&h=340&fit=crop',
  },
  {
    slug: 'restaurant-menu-site',
    title: 'Warung Indah',
    category: 'Website',
    description: 'Surinaamse restaurant met volledig digitaal menu, reserveringsformulier en openingstijden.',
    img: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&h=340&fit=crop',
  },
  {
    slug: 'starter-webshop',
    title: 'Bloom Boutique',
    category: 'E-Commerce',
    description: 'Fashion webshop met werkende winkelwagen, checkout-flow en wishlist.',
    img: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=340&fit=crop',
  },
  {
    slug: 'grotere-webshop',
    title: 'TechMart SUR',
    category: 'E-Commerce',
    description: 'Electronica webshop met filters, zoekfunctie, product-modals en cart-drawer.',
    img: 'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=600&h=340&fit=crop',
  },
  {
    slug: 'logo-branding',
    title: 'Savana Coffee',
    category: 'Design',
    description: 'Compleet brandbook met animated SVG logo, kleurenpalet, typografie en mock-ups.',
    img: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&h=340&fit=crop',
  },
  {
    slug: 'ux-ui-design',
    title: 'ShopPlaza Redesign',
    category: 'Design',
    description: 'UX case study met before/after slider, metrics, bevindingen en design-proces.',
    img: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=600&h=340&fit=crop',
  },
  {
    slug: 'seo',
    title: 'SEO Dashboard',
    category: 'Marketing',
    description: 'Live dashboard met Recharts grafieken, sorteerbare keyword-tabel en periodefilters.',
    img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=340&fit=crop',
  },
  {
    slug: 'hosting',
    title: 'Hosting Panel',
    category: 'Infrastructuur',
    description: 'Control panel met resource meters, uptime grafieken, backup beheer en server restart.',
    img: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=340&fit=crop',
  },
  {
    slug: 'ux-kukru',
    title: 'Kukru UX/UI',
    category: 'Outsourcing',
    description: 'Community platform case study met FAQ, team, pricing pakketten en contactformulier.',
    img: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=340&fit=crop',
  },
]

export default function ExamplesHub() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-12">
        <div className="flex items-baseline justify-between border-t-2 border-foreground pt-4 mb-8">
          <span className="text-xs font-bold tracking-[0.18em] uppercase text-foreground">Voorbeelden</span>
          <span className="text-xs font-medium text-muted-foreground">Interactieve demo&apos;s</span>
        </div>
        <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
          Bekijk wat wij bouwen
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          Interactieve demo&apos;s van al onze diensten. Klik op een kaart om het voorbeeld te bekijken.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {examples.map((ex) => (
          <Link
            key={ex.slug}
            href={`/examples/${ex.slug}`}
            className="group relative overflow-hidden border border-foreground/15 bg-card transition-colors hover:border-primary"
          >
            <div className="relative h-40 w-full overflow-hidden">
              <Image src={ex.img} alt={ex.title} fill className="object-cover" />
              <span className="absolute top-3 left-3 inline-block bg-foreground px-2.5 py-0.5 text-[10px] font-bold text-white uppercase tracking-wide">
                {ex.category}
              </span>
            </div>
            <div className="p-5">
              <h2 className="font-heading text-lg font-semibold tracking-tight group-hover:text-primary transition-colors">
                {ex.title}
              </h2>
              <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
                {ex.description}
              </p>
              <div className="mt-3 flex items-center gap-1 text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                Bekijk demo
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
