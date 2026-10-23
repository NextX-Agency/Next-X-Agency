import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Arrow } from '@/components/Arrow'
import { examples, featuredExamples } from '@/content/examples'

export const metadata: Metadata = {
  title: 'Concept Lab',
  description:
    'Ontdek werkende website- en webshopconcepten van NextX Agency. Alle getoonde merken zijn fictief en de demo’s tonen wat we voor jouw bedrijf kunnen ontwerpen.',
  alternates: { canonical: '/portfolio' },
  openGraph: { title: 'Concept Lab — NextX Agency', url: '/portfolio' },
}

export default function WorkPage() {
  return (
    <div data-theme="dark" className="min-h-screen">
      <header className="wrap grid-12 items-end gap-y-10 pb-16 pt-[calc(var(--nav-h)+4rem)] md:pb-24 md:pt-[calc(var(--nav-h)+7rem)]">
        <div className="col-span-4 md:col-span-8">
          <p className="meta mb-6 text-accent">Het NextX Concept Lab</p>
          <h1 className="t-display max-w-[12ch]">Zie wat we kunnen maken.</h1>
        </div>
        <div className="col-span-4 md:col-span-4 md:pb-3">
          <p className="t-body max-w-[34ch]">
            We zijn een nieuwe studio. Daarom laten we ons werk zien met interactieve concepten voor fictieve merken. Open een demo, klik rond en ontdek de ideeën achter het ontwerp.
          </p>
          <p className="meta mt-6 border-l-2 border-accent pl-4 text-fg-2">Conceptdemo’s · fictieve merken · geen klantprojecten</p>
        </div>
      </header>

      <section className="wrap border-t border-line-strong pb-20 pt-5 md:pb-28" aria-labelledby="featured-title">
        <div className="mb-9 flex flex-wrap items-baseline justify-between gap-4 md:mb-14">
          <h2 id="featured-title" className="t-h3">Stap binnen in een demo</h2>
          <p className="meta text-fg-2">Websites en webshops die je kunt gebruiken</p>
        </div>

        <div className="grid gap-16 md:gap-24">
          {featuredExamples.map((example, index) => (
            <article key={example.slug} className="grid items-center gap-7 md:grid-cols-12 md:gap-8">
              <Link
                href={`/examples/${example.slug}`}
                className={`group block md:col-span-8 ${index === 1 ? 'md:col-start-5 md:row-start-1' : ''}`}
                aria-label={`Open de conceptdemo ${example.business}`}
              >
                <div className="frame relative aspect-[16/10] overflow-hidden bg-[#262522]">
                  <Image
                    src={example.image}
                    alt={`Preview van de ${example.business} conceptdemo`}
                    fill
                    sizes="(min-width: 64rem) 66vw, 100vw"
                    priority={index === 0}
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.035]"
                  />
                  <span className="absolute bottom-4 left-4 border border-white/30 bg-black/70 px-3 py-2 text-[0.67rem] font-semibold uppercase tracking-[0.12em] text-white backdrop-blur-sm md:bottom-6 md:left-6">
                    Fictief merk · conceptdemo
                  </span>
                </div>
              </Link>
              <div className={`md:col-span-4 ${index === 1 ? 'md:col-start-1 md:row-start-1' : ''}`}>
                <p className="meta mb-3 text-accent">{example.group} / conceptdemo</p>
                <h3 className="t-h2">{example.business}</h3>
                <p className="t-body mt-4 max-w-[37ch]">{example.summary}</p>
                <p className="t-small mt-5 max-w-[36ch] border-t border-line-strong pt-4 text-fg-2">{example.demonstrates}</p>
                <Link href={`/examples/${example.slug}`} className="link-arrow link-line mt-6 py-1">
                  Open de demo <Arrow />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-line-strong bg-[#151515] py-20 md:py-28" aria-labelledby="more-title">
        <div className="wrap grid-12 gap-y-8">
          <div className="col-span-4 md:col-span-7">
            <p className="meta mb-5 text-accent">Meer richtingen</p>
            <h2 id="more-title" className="t-h2">Een goed idee krijgt zijn eigen vorm.</h2>
          </div>
          <div className="col-span-4 md:col-span-4 md:col-start-9 md:pt-5">
            <p className="t-body">Bekijk alle {examples.length} concepten: van een compacte bedrijfssite tot een grotere shop, merkwereld en tools.</p>
            <Link href="/examples" className="link-arrow link-line mt-7 py-1">Bekijk alle concepten <Arrow /></Link>
          </div>
        </div>
      </section>
    </div>
  )
}
