import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { exampleGroups, examples, featuredExamples } from '@/content/examples'
import { Arrow } from '@/components/Arrow'

export const metadata: Metadata = {
  title: 'Alle concepten',
  description:
    'Verken interactieve conceptdemo’s van NextX Agency voor fictieve bedrijven: websites, webshops, merkontwerp en digitale tools.',
  alternates: { canonical: '/examples' },
  openGraph: { title: 'Alle concepten — NextX Agency', url: '/examples' },
}

export default function ExamplesPage() {
  return (
    <div data-theme="dark" className="min-h-screen pb-[var(--section)]">
      <header className="wrap grid-12 gap-y-8 pb-16 pt-[calc(var(--nav-h)+4rem)] md:pb-24 md:pt-[calc(var(--nav-h)+7rem)]">
        <div className="col-span-4 md:col-span-8">
          <p className="meta mb-5 text-accent">Het NextX Concept Lab / alle richtingen</p>
          <h1 className="t-display">Probeer het zelf.</h1>
        </div>
        <div className="col-span-4 self-end md:col-span-4">
          <p className="t-body">Dit zijn werkende ontwerpconcepten voor fictieve bedrijven. Elk concept laat een andere dienst, stijl of interactie zien. De merken zijn geen klanten van NextX.</p>
          <Link href="/portfolio" className="link-arrow link-line mt-6 py-1">Bekijk de uitgelichte demo’s <Arrow /></Link>
        </div>
      </header>

      <div className="wrap grid gap-20 md:gap-28">
        {exampleGroups.map((group) => {
          const items = examples.filter((example) => example.group === group)
          return (
            <section key={group} aria-labelledby={`group-${group}`}>
              <div className="mb-8 flex flex-wrap items-baseline justify-between gap-2 border-t border-line-strong pt-4">
                <h2 id={`group-${group}`} className="t-h3">{group}</h2>
                <p className="meta text-fg-2">Fictieve merken · interactieve concepten</p>
              </div>
              <ul className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-12">
                {items.map((example) => {
                  const featured = featuredExamples.some((item) => item.slug === example.slug)
                  return (
                    <li key={example.slug} className={featured ? 'lg:col-span-6' : 'lg:col-span-4'}>
                      <Link href={`/examples/${example.slug}`} className="group block h-full">
                        <div className="frame relative aspect-[16/10] overflow-hidden bg-[#262522]">
                          <Image
                            src={example.image}
                            alt={`Preview van de ${example.business} conceptdemo`}
                            fill
                            sizes="(min-width: 64rem) 50vw, (min-width: 40rem) 50vw, 100vw"
                            priority={example.slug === featuredExamples[0].slug}
                            className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.035]"
                          />
                          <span className="absolute bottom-3 left-3 border border-white/30 bg-black/70 px-2.5 py-1.5 text-[0.6rem] font-semibold uppercase tracking-[0.12em] text-white backdrop-blur-sm">Fictief merk · conceptdemo</span>
                        </div>
                        <div className="mt-4 flex items-baseline justify-between gap-4">
                          <h3 className="text-xl font-semibold">{example.business}</h3>
                          <span className="meta shrink-0 text-fg-2">{group}</span>
                        </div>
                        <p className="t-small mt-2 max-w-[50ch]">{example.summary}</p>
                        {example.demonstrates && <p className="t-small mt-2 max-w-[50ch] text-fg-2">{example.demonstrates}</p>}
                        <span className="link-arrow mt-4 text-[0.9375rem] text-fg">Open de demo <Arrow /></span>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </section>
          )
        })}
      </div>
    </div>
  )
}
