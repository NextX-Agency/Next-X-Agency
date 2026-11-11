import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Arrow } from '@/components/Arrow'
import { specialties, supportingDisciplines } from '@/content/disciplines'
import { softwareKinds } from '@/content/software'
import { SpecialtyTiles } from '@/components/SpecialtyTiles'
import { ProjectMini } from '@/components/work/ProjectShowcase'
import { BrowserFrame } from '@/components/work/DeviceFrames'
import { findExample } from '@/content/examples'
import { featuredProjects } from '@/content/projects'
import {
  formatAmount,
  includedEverywhere,
  serviceCategories,
  type Service,
  type ServiceCategory,
} from '@/content/services'

export const metadata: Metadata = {
  title: 'Diensten en prijzen',
  description: 'Grafisch ontwerp en branding, websites en webshops, en software op maat. Bekijk wat NextX Agency maakt, met pakketten en prijzen in USD.',
  alternates: { canonical: '/services' },
  openGraph: { title: 'Diensten en prijzen — NextX Agency', url: '/services' },
}

const category = (id: string) => serviceCategories.find((item) => item.id === id)!
const subscriptions = category('website-subscriptions')
const graphicDesign = category('graphic-design')
const websites = category('websites')
const webshops = category('e-commerce')
const extraPackages = serviceCategories.filter((item) => !['websites', 'e-commerce', 'website-subscriptions', 'creative-production', 'graphic-design'].includes(item.id))
const [design, web, software] = specialties

/** A service as a filled tile: name and price up front, the details one tap away. */
function PriceTile({ service }: { service: Service }) {
  const example = service.example ? findExample(service.example) : undefined
  const price = service.price
  return (
    <details className="nx-price">
      <summary>
        <span className="t-h3">{service.name}</span>
        <span className="t-small">{service.summary}</span>
        <span className="nx-price-amount">
          {'label' in price ? price.label : (
            <>
              {price.from && <small className="!ml-0 mr-[.35em]">vanaf</small>}${formatAmount(price.amount)}
              {price.unit && <small>{price.unit}</small>}
            </>
          )}
        </span>
        <span className="nx-price-more">Wat u krijgt</span>
      </summary>
      <div className="nx-price-body">
        <ul className="nx-dots">{service.includes.map((item) => <li key={item}>{item}</li>)}</ul>
        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-[0.9375rem]">
          <Link href={`/contact?dienst=${service.id}`} className="btn btn-primary !min-h-11" aria-label={`${service.name} aanvragen`}>Aanvragen <Arrow /></Link>
          {example && <Link href={`/examples/${example.slug}`} className="link-arrow link-line py-1">Demo · fictief merk</Link>}
        </div>
      </div>
    </details>
  )
}

function PriceGroup({ group, columns = 3, titled = true }: { group: ServiceCategory; columns?: 3 | 4; titled?: boolean }) {
  return (
    <section id={group.id} aria-labelledby={`${group.id}-title`} className="scroll-mt-28">
      <h3 id={`${group.id}-title`} className={titled ? 't-h2 mb-8' : 'sr-only'}>{group.title}</h3>
      <div className={`nx-prices nx-prices-${columns}`}>{group.services.map((service) => <PriceTile key={service.id} service={service} />)}</div>
      {group.terms && (
        <details className="nx-fine mt-5">
          <summary>Voorwaarden</summary>
          <p className="t-small mt-3 max-w-[80ch]">{group.terms}</p>
        </details>
      )}
    </section>
  )
}

export default function ServicesPage() {
  return (
    <>
      <header data-theme="dark">
        <div className="wrap pb-12 pt-[calc(var(--nav-h)+4rem)] md:pb-16 md:pt-[calc(var(--nav-h)+6rem)]">
          <h1 className="nx-services-hero-title">Wat wilt u <em>laten maken?</em></h1>
          <div className="mt-12 md:mt-16"><SpecialtyTiles base="" /></div>
        </div>
      </header>

      {/* Design */}
      <section id={design.id} className="section scroll-mt-20" aria-labelledby="design-title">
        <div className="wrap">
          <h2 id="design-title" className="nx-section-word">{design.word}<span className="text-accent">.</span></h2>
          <p className="t-lead mt-6 max-w-[30ch] text-fg">{design.description}</p>
          <div className="mt-12 md:mt-16"><PriceGroup group={graphicDesign} titled={false} /></div>
          <Link href={`/contact?dienst=${design.id}`} className="nx-action mt-3" style={{ '--card': 'var(--orange)', '--card-fg': 'var(--ink)' } as React.CSSProperties}>
            <span><strong>Complete merkidentiteit</strong><span className="mt-2 block font-medium">Logo, kleur en typografie als één geheel. Op offerte.</span></span>
            <Arrow className="mb-2 h-4 w-7" />
          </Link>
        </div>
      </section>

      {/* Websites */}
      <section id={web.id} className="scroll-mt-20 bg-bg-2 py-[var(--section)]" style={{ '--card': 'var(--paper)' } as React.CSSProperties} aria-labelledby="web-title">
        <div className="wrap">
          <div className="grid-12 items-end gap-y-10">
            <div className="col-span-4 md:col-span-6">
              <h2 id="web-title" className="nx-section-word">{web.word}<span className="text-accent">.</span></h2>
              <p className="t-lead mt-6 max-w-[30ch] text-fg">{web.description}</p>
            </div>
            <div className="col-span-4 md:col-span-6">
              <BrowserFrame label="bhaggoescarpalace.com">
                <Image src="/work/bhaggoes-home.jpg" alt="De website van Bhaggoes Car Palace, een klantproject van NextX" fill sizes="(min-width: 48rem) 46vw, 100vw" className="object-cover object-top" />
              </BrowserFrame>
            </div>
          </div>

          <div className="mt-16 grid gap-16 md:mt-24 md:gap-24">
            <div>
              <PriceGroup group={subscriptions} columns={4} />
            </div>
            <div id="eenmalige-projecten" className="scroll-mt-28"><PriceGroup group={websites} columns={4} /></div>
            <PriceGroup group={webshops} />
            <div>
              <h3 className="t-h2 mb-8">Altijd inbegrepen</h3>
              <ul className="nx-dots sm:grid-cols-2 lg:grid-cols-3">{includedEverywhere.map((item) => <li key={item}>{item}</li>)}</ul>
            </div>
          </div>
        </div>
      </section>

      {/* Software */}
      <section id={software.id} data-theme="dark" className="section scroll-mt-20" aria-labelledby="software-title">
        <div className="wrap">
          <h2 id="software-title" className="nx-section-word">{software.word}<span className="text-accent">.</span></h2>
          <p className="t-lead mt-6 max-w-[30ch] text-fg">{software.description}</p>
          <p className="nx-bigwords mt-14 !justify-start md:mt-20">
            {softwareKinds.map((kind) => <span key={kind}>{kind}</span>)}
          </p>
          <div className="mt-14 grid gap-3 md:mt-20 md:grid-cols-2">
            {featuredProjects.map((project) => <ProjectMini key={project.slug} project={project} />)}
          </div>
          <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Link href={`/contact?dienst=${software.id}`} className="btn btn-primary">Bespreek uw software <Arrow /></Link>
            <p className="t-body">Op offerte. De prijs ligt vast voordat we beginnen.</p>
          </div>
        </div>
      </section>

      {/* Supporting */}
      <section id="creatieve-productie" className="section scroll-mt-20" aria-labelledby="supporting-title">
        <div className="wrap">
          <h2 id="supporting-title" className="t-h1 mb-10 md:mb-14">Ook mogelijk<span className="text-accent">.</span></h2>
          <div className="grid gap-3 md:grid-cols-2">
            {supportingDisciplines.map((discipline) => (
              <Link id={discipline.id} key={discipline.id} href={`/contact?dienst=${discipline.id}`} className="nx-action scroll-mt-28" aria-label={`${discipline.name} aanvragen`}>
                <span><strong>{discipline.word}</strong><span className="mt-2 block max-w-[34ch] text-fg-2">{discipline.description}</span></span>
                <Arrow className="mb-2 h-4 w-7" />
              </Link>
            ))}
          </div>

          <h2 className="t-h2 mb-8 mt-20 md:mt-28">Aanvullend</h2>
          <div className="grid gap-3">
            {extraPackages.map((group) => (
              <details id={group.id} key={group.id} className="nx-price scroll-mt-28">
                <summary className="!flex items-center justify-between gap-5">
                  <span><span className="t-h3 block">{group.title}</span><span className="t-small mt-1 block">{group.line}</span></span>
                  <span className="nx-price-more !mt-0" aria-hidden="true" />
                </summary>
                <div className="nx-price-body" style={{ '--card': 'var(--paper)' } as React.CSSProperties}>
                  <div className="nx-prices nx-prices-3">{group.services.map((service) => <PriceTile key={service.id} service={service} />)}</div>
                  {group.terms && <p className="t-small mt-5 max-w-[80ch]">{group.terms}</p>}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
