import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { exampleGroups, examples, featuredExamples } from '@/content/examples'
import { Arrow } from '@/components/Arrow'

export const metadata: Metadata = {
  title: 'Conceptlab',
  description:
    'Verken interactieve conceptdemo’s van NextX Agency voor fictieve bedrijven: websites, webshops, merkontwerp en digitale tools.',
  alternates: { canonical: '/examples' },
  openGraph: { title: 'Conceptlab — NextX Agency', url: '/examples' },
}

export default function ExamplesPage() {
  return (
    <div data-theme="dark" className="min-h-screen pb-[var(--section)]">
      <header className="wrap pb-14 pt-[calc(var(--nav-h)+4rem)] md:pb-20 md:pt-[calc(var(--nav-h)+7rem)]">
        <h1 className="t-display">Conceptlab<span className="text-accent">.</span></h1>
        <div className="mt-8 flex flex-wrap items-end justify-between gap-6">
          <p className="t-lead max-w-[30ch] text-fg">Werkende demo’s voor verzonnen merken. Geen klanten, wel ideeën.</p>
          <Link href="/portfolio" className="btn btn-quiet">Naar het echte werk <Arrow /></Link>
        </div>
      </header>

      <div className="wrap grid gap-20 md:gap-28">
        {exampleGroups.map((group) => {
          const items = examples.filter((example) => example.group === group)
          return (
            <section key={group} aria-labelledby={`group-${group}`}>
              <h2 id={`group-${group}`} className="t-h1 mb-8 md:mb-10">{group}</h2>
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
                          <span className="nx-label">Fictief merk</span>
                        </div>
                        <div className="mt-4 flex items-baseline justify-between gap-4">
                          <h3 className="text-xl font-semibold">{example.business}</h3>
                        </div>
                        <p className="t-small mt-2 max-w-[50ch]">{example.summary}</p>
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
