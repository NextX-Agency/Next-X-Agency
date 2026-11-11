import type { Metadata } from 'next'
import Link from 'next/link'
import { site } from '@/content/site'
import { specialties } from '@/content/disciplines'
import { projects } from '@/content/projects'
import { Arrow } from '@/components/Arrow'
import { IdentitySheet } from '@/components/IdentitySheet'
import { LocalTime } from '@/components/LocalTime'
import { Reveal } from '@/components/Reveal'

export const metadata: Metadata = {
  title: 'Studio',
  description:
    'NextX is een ontwerpstudio en softwarebouwer in Paramaribo. Grafisch ontwerp, websites en software op maat, met één aanspreekpunt en afspraken vooraf.',
  alternates: { canonical: '/about' },
  openGraph: { title: 'Studio — NextX Agency', url: '/about' },
}

const principles = [
  {
    title: 'Heldere afspraken',
    text: 'U weet vooraf wat u krijgt, wat het kost en wanneer het klaar is.',
  },
  {
    title: 'Eén aanspreekpunt',
    text: `U bespreekt alles met NextX, via WhatsApp, e-mail of op locatie in ${site.location.city}. Wij stemmen het werk af met wie eraan meewerkt.`,
  },
  {
    title: 'Ontwerp en techniek samen',
    text: 'Wie het ontwerp maakt, weet ook hoe het gebouwd wordt. Zo blijft wat u goedkeurt gelijk aan wat u krijgt.',
  },
  {
    title: 'Eerlijk over wat er is',
    text: 'We tonen alleen werk dat bestaat. Experimenten voor verzonnen merken staan apart in het conceptlab.',
  },
]

export default function AboutPage() {
  return (
    <>
      <header data-theme="dark" className="overflow-hidden">
        <div className="wrap grid-12 items-center gap-y-12 pb-16 pt-[calc(var(--nav-h)+4rem)] md:pb-24 md:pt-[calc(var(--nav-h)+7rem)]">
          <div className="col-span-4 md:col-span-7">
            <p className="meta mb-6 text-accent">De studio · {site.location.city}, {site.location.country}</p>
            <h1 className="t-h1 max-w-[13ch]">Digitaal gebouwd. Visueel gedacht<span className="text-accent">.</span></h1>
            <p className="t-lead mt-8 max-w-[44ch]">NextX is een studio uit Paramaribo die ontwerp en software onder één dak houdt. We maken merken, websites en systemen voor ondernemers die helder en herkenbaar naar buiten willen treden.</p>
          </div>
          <figure className="col-span-4 md:col-span-5 md:col-start-8">
            <div className="aspect-[4/3] border border-line"><IdentitySheet /></div>
            <figcaption className="meta mt-4">De NextX-identiteit: logo, kleur en typografie</figcaption>
          </figure>
        </div>
      </header>

      <section className="section" aria-labelledby="specialties-title">
        <div className="wrap grid-12 gap-y-10">
          <div className="col-span-4 md:col-span-4">
            <p className="meta mb-5 text-accent-text">Wat we doen</p>
            <h2 id="specialties-title" className="t-h2">Drie specialismen.</h2>
            <p className="t-body mt-4 max-w-[32ch]">Per project halen we er waar nodig een specialist bij, bijvoorbeeld voor fotografie. NextX houdt de regie.</p>
          </div>
          <div className="nx-index-list col-span-4 md:col-span-7 md:col-start-6">
            {specialties.map((specialty) => (
              <Link key={specialty.id} href={`/services#${specialty.id}`}>
                <span className="num">{specialty.index}</span>
                <span><strong>{specialty.name}</strong><small>{specialty.short}</small></span>
                <Arrow />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-bg-2" aria-labelledby="principles-title">
        <div className="wrap grid-12 gap-y-10">
          <h2 id="principles-title" className="t-h2 col-span-4 md:col-span-4">
            Hoe we werken
          </h2>
          <ol className="col-span-4 md:col-span-7 md:col-start-6">
            {principles.map((item, i) => (
              <Reveal as="li" key={item.title} delay={i * 0.06} className="grid grid-cols-[2.5rem_1fr] gap-x-4 border-t border-line py-7 first:border-line-strong md:grid-cols-[3.5rem_1fr_1.2fr] md:gap-x-6">
                <span className="num pt-1 text-[0.72rem] text-accent-text" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="t-h3">{item.title}</h3>
                <p className="t-body col-start-2 mt-2 md:col-start-3 md:mt-0">{item.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="own-title">
        <div className="wrap grid-12 gap-y-6 py-16 md:py-24">
          <h2 id="own-title" className="meta col-span-4 md:col-span-4">
            Een jonge studio
          </h2>
          <div className="col-span-4 md:col-span-7 md:col-start-6">
            <p className="t-h3 max-w-[32ch] font-[500]">
              We bouwen NextX stap voor stap op. Wat we laten zien is wat er staat: {projects.length} projecten die online zijn, waaronder onze eigen webshop.
            </p>
            <div className="mt-6 flex flex-wrap gap-x-8 gap-y-2">
              <Link href="/portfolio" className="link-arrow link-line py-1">
                Bekijk het werk
                <Arrow />
              </Link>
              <Link href="/examples" className="link-arrow py-1 text-fg-2 transition-colors hover:text-fg">
                Of het conceptlab
                <Arrow />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section data-theme="dark" aria-labelledby="place-title">
        <div className="wrap grid-12 gap-y-12 py-20 md:py-32">
          <div className="col-span-4 md:col-span-8">
            <h2 id="place-title" className="meta mb-6">
              {site.location.city}, {site.location.country}
            </h2>
            <p className="t-h1">
              Hier is het nu <span className="text-accent"><LocalTime /></span>.
            </p>
          </div>
          <div className="col-span-4 flex flex-col justify-end gap-5 md:col-span-4">
            <p className="t-body">We werken op locatie in Paramaribo of op afstand.</p>
            <Link href="/contact" className="btn btn-primary self-start">
              Start een project
              <Arrow />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
