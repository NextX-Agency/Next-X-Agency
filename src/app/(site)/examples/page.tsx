import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { exampleGroups, examples } from '@/content/examples'
import { findService, formatPrice } from '@/content/services'
import { Arrow } from '@/components/Arrow'

export const metadata: Metadata = {
  title: 'Voorbeelden',
  description:
    'Interactieve voorbeelden van websites, webshops, merkontwerp en tools. Concepten voor verzonnen bedrijven, gebouwd door NextX.',
  alternates: { canonical: '/examples' },
  openGraph: { title: 'Voorbeelden — NextX Agency', url: '/examples' },
}

export default function ExamplesPage() {
  return (
    <div data-theme="dark" className="min-h-screen pb-[var(--section)]">
      <header className="wrap grid-12 gap-y-8 pb-16 pt-[calc(var(--nav-h)+4rem)] md:pb-24 md:pt-[calc(var(--nav-h)+7rem)]">
        <h1 className="t-display col-span-4 md:col-span-7">Voorbeelden</h1>
        <div className="col-span-4 self-end md:col-span-4 md:col-start-9">
          <p className="t-body">
            Werkende concepten voor verzonnen bedrijven. Ze laten zien wat een pakket oplevert. Klantwerk staat bij{' '}
            <Link href="/portfolio" className="text-fg underline decoration-line-strong underline-offset-4 hover:decoration-accent">
              Werk
            </Link>
            .
          </p>
        </div>
      </header>

      <div className="wrap grid gap-20 md:gap-28">
        {exampleGroups.map((group) => {
          const items = examples.filter((example) => example.group === group)
          return (
            <section key={group} aria-labelledby={`group-${group}`}>
              <div className="mb-8 flex items-baseline justify-between border-t border-line-strong pt-4">
                <h2 id={`group-${group}`} className="t-h3">
                  {group}
                </h2>
                <span className="meta">{String(items.length).padStart(2, '0')}</span>
              </div>
              <ul className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
                {items.map((example) => {
                  const service = findService(example.serviceId)
                  return (
                    <li key={example.slug} className={items.length === 2 ? 'lg:col-span-2' : undefined}>
                      <Link href={`/examples/${example.slug}`} className="group block">
                        <div className="frame aspect-[16/10]">
                          <Image
                            src={example.image}
                            alt=""
                            fill
                            sizes="(min-width: 64rem) 50vw, (min-width: 40rem) 50vw, 100vw"
                            priority={example.slug === examples[0].slug}
                            className="object-cover object-top"
                          />
                        </div>
                        <div className="mt-4 flex items-baseline justify-between gap-4">
                          <h3 className="font-semibold">{example.business}</h3>
                          {service && <span className="meta whitespace-nowrap">{formatPrice(service.price)}</span>}
                        </div>
                        <p className="t-small mt-1">{example.summary}</p>
                        <span className="link-arrow mt-3 text-[0.9375rem] text-fg">
                          Bekijk voorbeeld
                          <Arrow />
                        </span>
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
