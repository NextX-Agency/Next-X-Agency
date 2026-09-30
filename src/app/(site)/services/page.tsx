import type { Metadata } from 'next'
import Link from 'next/link'
import {
  formatPrice,
  includedEverywhere,
  serviceCategories,
  type Service,
} from '@/content/services'
import { findExample } from '@/content/examples'
import { Arrow } from '@/components/Arrow'
import { disciplines } from '@/content/disciplines'

export const metadata: Metadata = {
  title: 'Diensten',
  description:
    'Web en software, fotografie en media, branding en design, marketing. Bekijk de disciplines en bestaande pakketten van NextX. Projecten op maat met een offerte vooraf.',
  alternates: { canonical: '/services' },
  openGraph: { title: 'Diensten en prijzen — NextX Agency', url: '/services' },
}

function ServiceRow({ service }: { service: Service }) {
  const example = service.example ? findExample(service.example) : undefined
  return (
    <li className="border-b border-line">
      <details className="svc group/row">
        <summary className="grid grid-cols-[minmax(0,1fr)_auto_auto] items-baseline gap-x-6 gap-y-1 py-5 lg:grid-cols-[minmax(0,15rem)_1fr_auto_auto] lg:py-6">
          <span className="t-h3 transition-colors group-hover/row:text-accent-text lg:col-start-1 lg:row-start-1">
            {service.name}
          </span>
          <span className="t-small col-span-3 row-start-2 max-w-[48ch] lg:col-span-1 lg:col-start-2 lg:row-start-1">
            {service.summary}
          </span>
          <span className="num col-start-2 row-start-1 whitespace-nowrap text-[0.9375rem] lg:col-start-3 lg:row-start-1">
            {formatPrice(service.price)}
          </span>
          <span
            className="plus col-start-3 row-start-1 block self-center text-fg-3 lg:col-start-4"
            aria-hidden="true"
          />
        </summary>
        <div className="grid gap-6 pb-7 lg:grid-cols-[minmax(0,15rem)_1fr] lg:gap-x-6">
          <p className="meta lg:pt-1">Inbegrepen</p>
          <div>
            <ul className="grid gap-x-8 gap-y-2 sm:grid-cols-2">
              {service.includes.map((item) => (
                <li key={item} className="flex gap-3 text-[0.9375rem]">
                  <span
                    className="mt-[0.6em] h-px w-3 shrink-0 bg-accent"
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap gap-x-7 gap-y-3 text-[0.9375rem]">
              <Link
                href={`/contact?dienst=${service.id}`}
                className="link-arrow link-line"
              >
                Aanvragen
                <Arrow />
              </Link>
              {example && (
                <Link
                  href={`/examples/${example.slug}`}
                  className="link-arrow link-line text-fg-2"
                >
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
      <header className="wrap page-heading">
        <p className="meta">Diensten</p>
        <h1>
          Van digitaal
          <br />
          <span>tot tastbaar.</span>
        </h1>
        <p className="t-lead">
          Vier disciplines die elkaar versterken. We bepalen samen wat uw
          project nodig heeft.
        </p>
      </header>

      <div className="wrap">
        {disciplines.map((discipline, i) => (
          <section
            id={discipline.id}
            key={discipline.id}
            className="service-discipline"
            aria-labelledby={`${discipline.id}-heading`}
          >
            <div>
              <p className="meta mb-4">0{i + 1}</p>
              <h2 id={`${discipline.id}-heading`}>{discipline.name}</h2>
              <p className="t-body">{discipline.description}</p>
            </div>
            <div>
              <ul>
                {discipline.services.map((service) => (
                  <li key={service}>{service}</li>
                ))}
              </ul>
              <Link
                href={`/contact?dienst=${discipline.id}`}
                className="link-arrow link-line mt-7"
              >
                Bespreek uw project <Arrow />
              </Link>
            </div>
          </section>
        ))}
        <div className="package-heading package-catalog">
          <h2 className="t-h2">
            Pakketten &<br />
            praktische afspraken.
          </h2>
          <p className="t-body max-w-[42ch]">
            Voor afgebakend werk zijn er bestaande pakketten. Voor software,
            fotografie, video en campagnes maken we een offerte op maat. Alle
            bedragen zijn in USD.
          </p>
        </div>
      </div>

      <div className="wrap grid-12 gap-y-10 pb-[var(--section)]">
        <nav
          aria-label="Categorieën"
          className="col-span-4 md:col-span-12 lg:col-span-3"
        >
          <ol className="flex flex-wrap gap-x-5 gap-y-2 border-t border-line-strong pt-4 lg:sticky lg:top-24 lg:block lg:space-y-2">
            {serviceCategories
              .filter((category) => category.id !== 'creative-production')
              .map((category) => (
                <li key={category.id}>
                  <a
                    href={`#${category.id}`}
                    className="group flex items-baseline gap-3 text-[0.9375rem]"
                  >
                    <span className="meta group-hover:text-accent-text">
                      {category.index}
                    </span>
                    <span className="link-line">{category.title}</span>
                  </a>
                </li>
              ))}
          </ol>
        </nav>

        <div className="col-span-4 md:col-span-12 lg:col-span-9">
          {serviceCategories
            .filter((category) => category.id !== 'creative-production')
            .map((category) => (
              <section
                key={category.id}
                id={category.id}
                aria-labelledby={`${category.id}-title`}
                className="package-category"
              >
                <details className="svc" open={category.id === 'websites'}>
                  <summary className="package-summary">
                    <span className="meta">{category.index}</span>
                    <h2 id={`${category.id}-title`} className="t-h3">
                      {category.title}
                    </h2>
                    <span className="plus" aria-hidden="true" />
                  </summary>
                  <div className="pb-8">
                    <p className="t-body mt-4 max-w-[46ch] md:ml-[calc(2ch+1rem)]">
                      {category.line}
                    </p>

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
                  </div>
                </details>
              </section>
            ))}

          <section
            aria-labelledby="included-title"
            className="mt-24 bg-bg-2 p-6 md:mt-32 md:p-10"
          >
            <h2 id="included-title" className="t-h3">
              Bij elke website en webshop
            </h2>
            <ul className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {includedEverywhere.map((item) => (
                <li key={item} className="flex gap-3 text-[0.9375rem]">
                  <span
                    className="mt-[0.6em] h-px w-3 shrink-0 bg-accent"
                    aria-hidden="true"
                  />
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
