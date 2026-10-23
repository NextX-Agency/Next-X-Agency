import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { formatPrice, includedEverywhere, serviceCategories, websiteFrom, type Service } from '@/content/services'
import { findExample } from '@/content/examples'
import { disciplines } from '@/content/disciplines'
import { Arrow } from '@/components/Arrow'

export const metadata: Metadata = {
  title: 'Diensten en prijzen',
  description:
    'Web en software, fotografie en media, branding en design, marketing. Bekijk de disciplines en pakketten van NextX. Websites met een vanafprijs, ander werk op offerte.',
  alternates: { canonical: '/services' },
  openGraph: { title: 'Diensten en prijzen — NextX Agency', url: '/services' },
}

/** Fixed-price packages; the per-discipline "op aanvraag" entries are shown as disciplines above. */
const packages = serviceCategories.filter((category) => !['creative-production', 'website-subscriptions'].includes(category.id))
const subscriptions = serviceCategories.find((category) => category.id === 'website-subscriptions')!
const disciplineImages: Record<string, string> = {
  'web-software': '/work/shop-nextx-entry.jpg',
  'photography-media': '/demo-assets/savana-packaging.webp',
  'branding-design': '/demo-assets/savana-menu.jpg',
  marketing: '/demo-assets/portfolio-savana.jpg',
}

function ServiceRow({ service }: { service: Service }) {
  const example = service.example ? findExample(service.example) : undefined
  return (
    <li className="border-b border-line">
      <details className="svc group/row">
        <summary className="grid grid-cols-[minmax(0,1fr)_auto_auto] items-baseline gap-x-6 gap-y-1 py-5 lg:grid-cols-[minmax(0,15rem)_1fr_auto_auto] lg:py-6">
          <span className="t-h3 transition-colors group-hover/row:text-accent-text lg:col-start-1 lg:row-start-1">{service.name}</span>
          <span className="t-small col-span-3 row-start-2 max-w-[48ch] lg:col-span-1 lg:col-start-2 lg:row-start-1">
            {service.summary}
          </span>
          <span className="num col-start-2 row-start-1 whitespace-nowrap text-[0.9375rem] lg:col-start-3 lg:row-start-1">
            {formatPrice(service.price)}
          </span>
          <span className="plus col-start-3 row-start-1 block self-center text-fg-3 lg:col-start-4" aria-hidden="true" />
        </summary>
        <div className="grid gap-6 pb-7 lg:grid-cols-[minmax(0,15rem)_1fr] lg:gap-x-6">
          <p className="meta lg:pt-1">Inbegrepen</p>
          <div>
            <ul className="grid gap-x-8 gap-y-2 sm:grid-cols-2">
              {service.includes.map((item) => (
                <li key={item} className="flex gap-3 text-[0.9375rem]">
                  <span className="mt-[0.6em] h-px w-3 shrink-0 bg-accent" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap gap-x-7 gap-y-3 text-[0.9375rem]">
              <Link href={`/contact?dienst=${service.id}`} className="link-arrow link-line">
                Aanvragen
                <Arrow />
              </Link>
              {example && (
                <Link href={`/examples/${example.slug}`} className="link-arrow link-line text-fg-2">
                  Bekijk voorbeeld
                </Link>
              )}
            </div>
          </div>
        </div>
      </details>
    </li>
  )
}

export default function ServicesPage() {
  return (
    <>
      <header className="wrap pb-16 pt-[calc(var(--nav-h)+4rem)] md:pb-24 md:pt-[calc(var(--nav-h)+7rem)]">
        <p className="meta mb-6">Diensten</p>
        <h1 className="t-h1 max-w-[12ch]">Wat we maken en wat het kost</h1>
        <p className="t-lead mt-8 max-w-[44ch]">
          Kies een website-abonnement met onderhoud en maandelijkse wijzigingen, of start met een eenmalig project. Voor software, fotografie, video, design en marketing maken we een offerte op maat.
        </p>
      </header>

      {/* The four disciplines, each with its own route to an inquiry */}
      <div className="wrap pb-[var(--section)]">
        {disciplines.map((discipline) => (
          <section
            key={discipline.id}
            id={discipline.id}
            aria-labelledby={`${discipline.id}-title`}
            className="grid-12 gap-y-6 border-t border-line-strong pb-14 pt-5 last:border-b last:border-b-line md:pb-20"
          >
            <span className="col-span-4 mt-4 h-px w-8 bg-accent md:col-span-1 md:mt-5" aria-hidden="true" />
            <div className="col-span-4 md:col-span-5">
              <h2 id={`${discipline.id}-title`} className="t-h2">
                {discipline.name}
              </h2>
              <p className="t-body mt-5 max-w-[42ch]">{discipline.description}</p>
            </div>
            <div className="col-span-4 md:col-span-5 md:col-start-8 md:pt-3">
              <div className="relative mb-7 aspect-[8/3] overflow-hidden bg-bg-2" aria-hidden="true">
                <Image src={disciplineImages[discipline.id]} alt="" fill sizes="(min-width: 768px) 40vw, 100vw" className="object-cover" />
              </div>
              <ul className="grid gap-2">
                {discipline.services.map((service) => (
                  <li key={service} className="flex gap-3 text-[0.9375rem]">
                    <span className="mt-[0.6em] h-px w-3 shrink-0 bg-accent" aria-hidden="true" />
                    {service}
                  </li>
                ))}
              </ul>
              <div className="mt-7 flex flex-wrap items-baseline gap-x-7 gap-y-3 text-[0.9375rem]">
                <Link href={`/contact?dienst=${discipline.id}`} className="link-arrow link-line">
                  Bespreek uw project
                  <Arrow />
                </Link>
                {discipline.id === 'web-software' ? (
                  <a href="#websites" className="meta link-line hover:text-fg">
                    Eenmalig {formatPrice(websiteFrom)}
                  </a>
                ) : (
                  <span className="meta">Op aanvraag</span>
                )}
              </div>
            </div>
          </section>
        ))}
      </div>

      <section id="website-subscriptions" aria-labelledby="subscriptions-title" className="scroll-mt-24 bg-bg-2 py-[var(--section)]">
        <div className="wrap">
          <div className="grid-12 items-end gap-y-10">
            <div className="col-span-4 md:col-span-6">
              <p className="meta mb-5 text-accent-text">Doorlopend samenwerken</p>
              <h2 id="subscriptions-title" className="t-h2 max-w-[13ch]">Een website die meegroeit</h2>
              <p className="t-body mt-5 max-w-[48ch]">
                We bouwen uw website als onderdeel van het abonnement en houden hem daarna bij. Kies hoeveel ruimte u elke maand nodig hebt voor nieuwe inhoud en functies.
              </p>
            </div>
            <div className="col-span-4 md:col-span-5 md:col-start-8">
              <div className="relative aspect-[8/5] overflow-hidden bg-bg">
                <Image src="/demo-previews/service-website.webp" alt="Voorbeeld van een website met een heldere indeling voor diensten en contact" fill sizes="(min-width: 768px) 40vw, 100vw" loading="eager" className="object-cover" />
              </div>
              <p className="meta mt-3">Voorbeeld van een servicewebsite</p>
            </div>
          </div>

          <div className="mt-16 border-t border-line-strong md:mt-24">
            {subscriptions.services.map((plan) => (
              <article key={plan.id} className="grid-12 gap-y-4 border-b border-line py-7 md:items-start md:py-9">
                <div className="col-span-4 md:col-span-4">
                  <h3 className="t-h3">{plan.name}</h3>
                  <p className="t-small mt-2 max-w-[32ch]">{plan.summary}</p>
                </div>
                <div className="col-span-4 md:col-span-5">
                  <ul className="grid gap-2">
                    {plan.includes.map((item) => (
                      <li key={item} className="flex gap-3 text-[0.9375rem]">
                        <span className="mt-[0.6em] h-px w-3 shrink-0 bg-accent" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="col-span-4 flex items-center justify-between gap-5 md:col-span-3 md:flex-col md:items-end">
                  <span className="num whitespace-nowrap text-lg">{formatPrice(plan.price)}</span>
                  <Link href={`/contact?dienst=${plan.id}`} className="link-arrow link-line whitespace-nowrap">
                    Bespreek dit plan <Arrow />
                  </Link>
                </div>
              </article>
            ))}
          </div>
          <p className="t-small mt-7 max-w-[90ch]">{subscriptions.terms}</p>
        </div>
      </section>

      <section data-theme="dark" aria-labelledby="packages-title">
        <div className="wrap grid-12 gap-y-6 py-16 md:py-24">
          <p className="meta col-span-4 md:col-span-3">Vaste pakketten</p>
          <div className="col-span-4 md:col-span-7 md:col-start-6">
            <h2 id="packages-title" className="t-h2">
              Pakketten en prijzen
            </h2>
            <p className="t-body mt-5 max-w-[46ch]">
              Voor websites, webshops en afgebakend ontwerpwerk. Na het eerste gesprek weet u de exacte prijs; pas daarna beginnen we. Alle bedragen in USD.
            </p>
          </div>
        </div>
      </section>

      <div className="wrap grid-12 gap-y-10 py-[var(--section)]">
        <nav aria-label="Categorieën" className="col-span-4 md:col-span-12 lg:col-span-3">
          <ol className="flex flex-wrap gap-x-5 gap-y-2 border-t border-line-strong pt-4 lg:sticky lg:top-24 lg:block lg:space-y-2">
            {packages.map((category) => (
              <li key={category.id}>
                <a href={`#${category.id}`} className="group flex items-baseline gap-3 text-[0.9375rem]">
                  <span className="link-line">{category.title}</span>
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="col-span-4 md:col-span-12 lg:col-span-9">
          {packages.map((category) => (
            <section key={category.id} id={category.id} aria-labelledby={`${category.id}-title`} className="mb-20 last:mb-0 md:mb-28">
              <div className="flex items-baseline gap-4 border-t border-line-strong pt-4">
                <span className="h-px w-8 shrink-0 bg-accent" aria-hidden="true" />
                <h3 id={`${category.id}-title`} className="t-h2">
                  {category.title}
                </h3>
              </div>
              <p className="t-body mt-4 max-w-[46ch]">{category.line}</p>

              <ul className="mt-8 border-t border-line">
                {category.services.map((service) => (
                  <ServiceRow key={service.id} service={service} />
                ))}
              </ul>

              {category.terms && (
                <p className="t-small mt-5 max-w-[62ch]">
                  <span className="meta mr-3 text-fg">Let op</span>
                  {category.terms}
                </p>
              )}
            </section>
          ))}

          <section aria-labelledby="included-title" className="mt-24 bg-bg-2 p-6 md:mt-32 md:p-10">
            <h3 id="included-title" className="t-h3">
              Bij elke website en webshop
            </h3>
            <ul className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {includedEverywhere.map((item) => (
                <li key={item} className="flex gap-3 text-[0.9375rem]">
                  <span className="mt-[0.6em] h-px w-3 shrink-0 bg-accent" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </>
  )
}
