import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { site } from '@/content/site'
import { Arrow } from '@/components/Arrow'
import { LocalTime } from '@/components/LocalTime'
import { Reveal } from '@/components/Reveal'

export const metadata: Metadata = {
  title: 'Over NextX',
  description:
    'NextX is een digitale studio in Paramaribo. We ontwerpen en bouwen websites, webshops en merkidentiteiten, met vaste afspraken en direct contact.',
  alternates: { canonical: '/about' },
  openGraph: { title: 'Over NextX — NextX Agency', url: '/about' },
}

const principles = [
  {
    title: 'Heldere afspraken',
    text: 'U weet vooraf wat u krijgt, wat het kost en wanneer het klaar is.',
  },
  {
    title: 'Direct contact',
    text: `U spreekt met wie het werk maakt. Via WhatsApp, e-mail of op locatie in ${site.location.city}.`,
  },
  {
    title: 'Zelf ontworpen',
    text: 'We vertrekken niet vanuit een gekocht thema. Elk ontwerp begint leeg.',
  },
]

export default function AboutPage() {
  return (
    <>
      <header className="wrap grid-12 gap-y-10 pb-20 pt-[calc(var(--nav-h)+4rem)] md:pb-32 md:pt-[calc(var(--nav-h)+7rem)]">
        <p className="meta col-span-4 md:col-span-2">Over NextX</p>
        <div className="col-span-4 md:col-span-10">
          <h1 className="t-h1 max-w-[16ch]">Een digitale studio in Paramaribo.</h1>
          <div className="mt-10 grid gap-6 md:mt-14 md:grid-cols-2 md:gap-12">
            <p className="t-lead text-fg">
              We ontwerpen en bouwen websites, webshops en merkidentiteiten, vooral voor Surinaamse ondernemers.
            </p>
            <p className="t-lead">
              Ontwerp en code gebeuren in huis. Wat u in het ontwerp goedkeurt, is wat er live komt.
            </p>
          </div>
        </div>
      </header>

      {/* The mark, set out like a sheet from a brand manual */}
      <Reveal>
        <figure data-theme="dark" className="relative mx-auto max-w-[var(--max)]">
          <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden sm:aspect-[21/9]">
            <Image src="/logo-dark.png" alt="Het NextX-logo" width={950} height={380} className="h-auto w-[min(70vw,34rem)]" />
            <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-center gap-x-8 gap-y-3 p-5 md:p-8">
              <span className="meta flex items-center gap-3">
                <span className="size-3 bg-accent" aria-hidden="true" />
                Oranje #ED5F0F
              </span>
              <span className="meta flex items-center gap-3">
                <span className="size-3 border border-line-strong bg-paper" aria-hidden="true" />
                Papier #F2F0EB
              </span>
            </div>
          </div>
        </figure>
      </Reveal>

      <section className="section" aria-labelledby="principles-title">
        <div className="wrap grid-12 gap-y-10">
          <h2 id="principles-title" className="t-h2 col-span-4 md:col-span-4">
            Hoe we werken
          </h2>
          <ol className="col-span-4 md:col-span-7 md:col-start-6">
            {principles.map((item, i) => (
              <Reveal as="li" key={item.title} delay={i * 0.06} className="grid grid-cols-[2.5rem_1fr] gap-x-4 border-t border-line py-7 first:border-line-strong md:grid-cols-[3.5rem_1fr_1.2fr] md:gap-x-6">
                <span className="meta pt-1.5">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="t-h3">{item.title}</h3>
                <p className="t-body col-start-2 mt-2 md:col-start-3 md:mt-0">{item.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-t border-line" aria-labelledby="own-title">
        <div className="wrap grid-12 gap-y-6 py-16 md:py-24">
          <h2 id="own-title" className="meta col-span-4 md:col-span-3">
            Ook voor onszelf
          </h2>
          <div className="col-span-4 md:col-span-7 md:col-start-6">
            <p className="t-h3 max-w-[30ch] font-[500]">
              Naast klantwerk runnen we Shop NextX, onze eigen webshop voor audio en horloges.
            </p>
            <Link href="/portfolio/shop-nextx" className="link-arrow link-line mt-6 py-1">
              Bekijk Shop NextX
              <Arrow />
            </Link>
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
