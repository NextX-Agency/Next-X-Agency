import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { site } from '@/content/site'
import { Arrow } from '@/components/Arrow'
import { LocalTime } from '@/components/LocalTime'
import { Reveal } from '@/components/Reveal'

export const metadata: Metadata = {
  title: 'Studio',
  description:
    'NextX is een creatieve en digitale studio in Paramaribo. Eén aanspreekpunt voor web, software, fotografie, design en marketing, met de juiste specialisten per project.',
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
    title: 'Eigen ontwerp',
    text: 'We ontwikkelen een richting vanuit uw merk en bespreken ontwerp, beeld en inhoud voordat we iets produceren.',
  },
]

export default function AboutPage() {
  return (
    <>
      <header data-theme="dark" className="overflow-hidden">
        <div className="wrap grid-12 items-center gap-y-10 pb-20 pt-[calc(var(--nav-h)+4rem)] md:min-h-[48rem] md:pb-28 md:pt-[calc(var(--nav-h)+7rem)]">
          <div className="col-span-4 md:col-span-7">
            <p className="meta mb-6 text-accent">De studio · Paramaribo</p>
            <h1 className="t-h1 max-w-[13ch]">Digitaal gebouwd. Visueel gedacht.</h1>
            <p className="t-lead mt-8 max-w-[42ch]">NextX maakt websites, software, fotografie, video, merkidentiteiten en campagnes voor ondernemers die helder en herkenbaar naar buiten willen treden.</p>
            <p className="t-body mt-5 max-w-[52ch]">Per project brengen we de juiste specialisten bij elkaar. NextX houdt de regie en blijft uw aanspreekpunt.</p>
          </div>
          <div className="col-span-4 md:col-span-5 md:col-start-8">
            <div className="relative aspect-[4/5] overflow-hidden border-[8px] border-paper/90 md:rotate-[5deg]">
              <Image src="/demo-assets/savana-menu.jpg" alt="Een tafel met typografisch ontwerp en grafische elementen" fill priority sizes="(min-width: 768px) 38vw, 100vw" className="object-cover" />
            </div>
            <p className="meta mt-5 text-right">Conceptbeeld · Visuele richting</p>
          </div>
        </div>
      </header>

      {/* The mark, set out like a sheet from a brand manual */}
      <Reveal>
        <figure data-theme="dark" className="relative mx-auto max-w-[var(--max)]">
          <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden sm:aspect-[21/9]">
            <Image src="/logo-agency-white-v2.svg" alt="Het vernieuwde NextX Agency-logo" width={620} height={260} className="h-auto w-[min(70vw,34rem)]" />
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
                <span className="mt-3 h-px w-7 bg-accent" aria-hidden="true" />
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
              We bouwen een studio op. Daarom laten we in ons conceptlab zien hoe onze websites eruitzien en werken, met openheid over de fictieve merken.
            </p>
            <Link href="/portfolio" className="link-arrow link-line mt-6 py-1">
              Ontdek de werkende concepten
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
