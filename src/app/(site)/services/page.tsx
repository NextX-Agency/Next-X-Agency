import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Arrow } from '@/components/Arrow'
import { specialties, supportingDisciplines } from '@/content/disciplines'
import { softwareKinds, softwareProof } from '@/content/software'
import { IdentitySheet } from '@/components/IdentitySheet'
import { BrowserFrame } from '@/components/work/DeviceFrames'
import { findExample } from '@/content/examples'
import {
  formatPrice,
  includedEverywhere,
  serviceCategories,
  websiteFrom,
  type Service,
  type ServiceCategory,
} from '@/content/services'

export const metadata: Metadata = {
  title: 'Diensten en prijzen',
  description: 'Grafisch ontwerp en branding, websites en webshops, en software op maat. Bekijk wat NextX Agency maakt, met pakketten en prijzen in USD.',
  alternates: { canonical: '/services' },
  openGraph: { title: 'Diensten en prijzen — NextX Agency', url: '/services' },
}

const subscriptions = serviceCategories.find((category) => category.id === 'website-subscriptions')!
const graphicDesign = serviceCategories.find((category) => category.id === 'graphic-design')!
const projectPackages = serviceCategories.filter((category) => ['websites', 'e-commerce'].includes(category.id))
const extraPackages = serviceCategories.filter((category) => !['websites', 'e-commerce', 'website-subscriptions', 'creative-production', 'graphic-design'].includes(category.id))
const [design, web, software] = specialties

const softwareSteps = [
  { title: 'Verkennen', text: 'We brengen in kaart hoe het werk nu loopt en waar het vastloopt.' },
  { title: 'Scope en offerte', text: 'U krijgt een afgebakend voorstel met prijs en planning, vóór de start.' },
  { title: 'Bouwen in stappen', text: 'U ziet tussentijds werkende onderdelen en stuurt bij waar nodig.' },
  { title: 'Beheer', text: 'Na oplevering spreken we af wie onderhoud en uitbreidingen doet.' },
]

function Dash({ children }: { children: React.ReactNode }) {
  return <li className="flex gap-3 text-[0.9375rem]"><span className="mt-[0.6em] h-px w-3 shrink-0 bg-accent" aria-hidden="true" />{children}</li>
}

function SpecialtyHeader({ specialty, id, children }: { specialty: (typeof specialties)[number]; id: string; children?: React.ReactNode }) {
  return (
    <div className="grid-12 gap-y-6">
      <div className="col-span-4 md:col-span-7">
        <p className="meta mb-5 text-accent-text">{specialty.index} · Specialisme</p>
        <h2 id={id} className="t-h1 max-w-[12ch]">{specialty.name}</h2>
      </div>
      <div className="col-span-4 md:col-span-4 md:col-start-9 md:self-end">
        <p className="t-body text-fg">{specialty.description}</p>
        {children}
      </div>
    </div>
  )
}

function ServiceRow({ service }: { service: Service }) {
  const example = service.example ? findExample(service.example) : undefined
  return (
    <li className="border-b border-line">
      <details className="svc group/row">
        <summary className="grid grid-cols-[minmax(0,1fr)_auto_auto] items-baseline gap-x-6 gap-y-1 py-5 lg:grid-cols-[minmax(0,15rem)_1fr_auto_auto] lg:py-6">
          <span className="t-h3 transition-colors group-hover/row:text-accent-text lg:col-start-1 lg:row-start-1">{service.name}</span>
          <span className="t-small col-span-3 row-start-2 max-w-[48ch] lg:col-span-1 lg:col-start-2 lg:row-start-1">{service.summary}</span>
          <span className="num col-start-2 row-start-1 whitespace-nowrap text-[0.9375rem] lg:col-start-3 lg:row-start-1">{formatPrice(service.price)}</span>
          <span className="plus col-start-3 row-start-1 block self-center text-fg-3 lg:col-start-4" aria-hidden="true" />
        </summary>
        <div className="grid gap-6 pb-7 lg:grid-cols-[minmax(0,15rem)_1fr] lg:gap-x-6">
          <p className="meta lg:pt-1">Inbegrepen</p>
          <div>
            <ul className="grid gap-x-8 gap-y-2 sm:grid-cols-2">
              {service.includes.map((item) => <li key={item} className="flex gap-3 text-[0.9375rem]"><span className="mt-[0.6em] h-px w-3 shrink-0 bg-accent" aria-hidden="true" />{item}</li>)}
            </ul>
            <div className="mt-6 flex flex-wrap gap-x-7 gap-y-3 text-[0.9375rem]">
              <Link href={`/contact?dienst=${service.id}`} className="link-arrow link-line">Aanvragen <Arrow /></Link>
              {example && <Link href={`/examples/${example.slug}`} className="link-arrow link-line text-fg-2">Bekijk werkende conceptdemo · fictief merk</Link>}
            </div>
          </div>
        </div>
      </details>
    </li>
  )
}

function CategoryBlock({ category }: { category: ServiceCategory }) {
  return (
    <section id={category.id} aria-labelledby={`${category.id}-title`} className="scroll-mt-28">
      <div className="border-t border-line-strong pt-5">
        <h3 id={`${category.id}-title`} className="t-h2">{category.title}</h3>
        <p className="t-body mt-3 max-w-[52ch]">{category.line}</p>
      </div>
      <ul className="mt-8 border-t border-line">{category.services.map((service) => <ServiceRow key={service.id} service={service} />)}</ul>
      {category.terms && <p className="t-small mt-5 max-w-[66ch]"><span className="meta mr-3 text-fg">Goed om te weten</span>{category.terms}</p>}
    </section>
  )
}

export default function ServicesPage() {
  return (
    <>
      <header data-theme="dark">
        <div className="wrap grid-12 items-end gap-y-12 pb-16 pt-[calc(var(--nav-h)+4rem)] md:pb-24 md:pt-[calc(var(--nav-h)+7rem)]">
          <div className="col-span-4 md:col-span-7">
            <p className="meta mb-6 text-accent">Diensten en prijzen</p>
            <h1 className="nx-services-hero-title">Wat wilt u <em>laten maken?</em></h1>
            <p className="t-lead mt-7 max-w-[40ch]">Een merk dat klopt, een website die werkt of software die uw proces overneemt. Kies waar u wilt beginnen; de prijzen staan erbij.</p>
            <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Link href="/contact" className="btn btn-primary">Bespreek uw idee <Arrow /></Link>
              <Link href="/portfolio" className="link-arrow link-line py-1">Bekijk ons werk <Arrow /></Link>
            </div>
          </div>
          <nav aria-label="Specialismen" className="col-span-4 md:col-span-5 md:col-start-8">
            <div className="nx-index-list">
              {specialties.map((specialty) => (
                <a key={specialty.id} href={`#${specialty.id}`}>
                  <span className="num">{specialty.index}</span>
                  <span><strong>{specialty.name}</strong><small>{specialty.short}</small></span>
                  <Arrow className="rotate-90" />
                </a>
              ))}
            </div>
          </nav>
        </div>
      </header>

      {/* 01 — Graphic design & branding */}
      <section id={design.id} className="section scroll-mt-20" aria-labelledby="design-title">
        <div className="wrap">
          <SpecialtyHeader specialty={design} id="design-title" />
          <div className="grid-12 mt-14 gap-y-12 md:mt-20">
            <div className="col-span-4 md:col-span-4">
              <div className="aspect-[16/10]"><IdentitySheet /></div>
              <p className="meta mt-3">Onze eigen identiteit: logo, kleur en typografie</p>
            </div>
            <div id={graphicDesign.id} className="col-span-4 scroll-mt-28 md:col-span-7 md:col-start-6">
              <h3 className="meta mb-4">Vaste prijzen</h3>
              <ul className="border-t border-line-strong">{graphicDesign.services.map((service) => <ServiceRow key={service.id} service={service} />)}</ul>
              <div className="mt-8 flex flex-wrap items-center justify-between gap-5 bg-bg-2 p-6">
                <div>
                  <p className="t-h3">Een complete merkidentiteit</p>
                  <p className="t-small mt-1 max-w-[44ch]">Logo, kleuren, typografie en toepassingen als één geheel. Scope en prijs stemmen we af in een offerte.</p>
                </div>
                <Link href={`/contact?dienst=${design.id}`} className="link-arrow link-line whitespace-nowrap py-1">Vraag een offerte aan <Arrow /></Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 02 — Web */}
      <section id={web.id} className="scroll-mt-20 bg-bg-2 py-[var(--section)]" aria-labelledby="web-title">
        <div className="wrap">
          <SpecialtyHeader specialty={web} id="web-title" />

          <div className="nx-choice mt-14 md:mt-20">
            <a href="#website-subscriptions" className="group">
              <span className="meta text-accent-text">Abonnement · {formatPrice(subscriptions.services[0].price).replace('$', 'vanaf $')}</span>
              <span className="t-h3">Een website die we blijven bijhouden</span>
              <span className="t-small max-w-[44ch]">Ontwerp en bouw zitten in het maandbedrag, samen met onderhoud, bugfixes en een aantal wijzigingen per maand.</span>
              <span className="link-arrow mt-3 text-[0.9375rem]">Vergelijk de abonnementen <Arrow className="rotate-90" /></span>
            </a>
            <a href="#eenmalige-projecten" className="group">
              <span className="meta text-accent-text">Eenmalig · {formatPrice(websiteFrom)}</span>
              <span className="t-h3">Een website of webshop als project</span>
              <span className="t-small max-w-[44ch]">Een afgesproken scope, één oplevermoment en een prijs vooraf. Daarna is de site van u.</span>
              <span className="link-arrow mt-3 text-[0.9375rem]">Bekijk de pakketten <Arrow className="rotate-90" /></span>
            </a>
          </div>

          <section id="website-subscriptions" aria-labelledby="subscriptions-title" className="mt-20 scroll-mt-28 md:mt-28">
            <div className="grid-12 items-end gap-y-8">
              <div className="col-span-4 md:col-span-6"><h3 id="subscriptions-title" className="t-h2 max-w-[13ch]">Website-abonnementen</h3><p className="t-body mt-5 max-w-[48ch]">We bouwen uw website als onderdeel van het abonnement en houden hem bij. Kies hoeveel ruimte u maandelijks nodig hebt voor nieuwe inhoud en functies.</p></div>
              <div className="col-span-4 md:col-span-5 md:col-start-8">
                <Link href="/examples/service-website" className="group block" aria-label="Open de conceptdemo van een servicewebsite">
                  <BrowserFrame label="Conceptdemo · fictief merk" className="!shadow-none">
                    <Image src="/demo-previews/service-website.webp" alt="" fill sizes="(min-width: 768px) 40vw, 100vw" className="object-cover object-top" />
                  </BrowserFrame>
                  <p className="meta mt-3">Zo kan een servicewebsite eruitzien. Open de werkende demo ↗</p>
                </Link>
              </div>
            </div>
            <div className="mt-12 border-t border-line-strong md:mt-16">
              {subscriptions.services.map((plan) => (
                <article key={plan.id} className="nx-plan-row grid-12 gap-y-4 border-b border-line py-7 md:items-start md:py-9">
                  <div className="col-span-4 md:col-span-4"><h4 className="t-h3">{plan.name}</h4><p className="t-small mt-2 max-w-[32ch]">{plan.summary}</p></div>
                  <div className="col-span-4 md:col-span-5"><ul className="grid gap-2">{plan.includes.map((item) => <Dash key={item}>{item}</Dash>)}</ul></div>
                  <div className="col-span-4 flex flex-wrap items-center justify-between gap-x-5 gap-y-2 md:col-span-3 md:flex-col md:items-end"><span className="num whitespace-nowrap text-lg">{formatPrice(plan.price)}</span><Link href={`/contact?dienst=${plan.id}`} className="link-arrow link-line whitespace-nowrap py-1" aria-label={`Bespreek ${plan.name}`}>Bespreek dit plan <Arrow /></Link></div>
                </article>
              ))}
            </div>
            <p className="t-small mt-7 max-w-[90ch]">{subscriptions.terms}</p>
          </section>

          <div id="eenmalige-projecten" className="mt-20 scroll-mt-28 md:mt-28">
            <p className="t-body mb-12 max-w-[60ch] md:mb-16"><span className="meta mr-3 text-fg">Eenmalige projecten</span>De bedragen hieronder zijn vanafprijzen in USD. Na het eerste gesprek leggen we de exacte prijs en planning vast.</p>
            <div className="grid gap-20 md:gap-28">{projectPackages.map((category) => <CategoryBlock key={category.id} category={category} />)}</div>
            <section aria-labelledby="included-title" className="mt-16 bg-bg p-6 md:mt-24 md:p-10"><h3 id="included-title" className="t-h3">Bij elke website en webshop</h3><ul className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2">{includedEverywhere.map((item) => <Dash key={item}>{item}</Dash>)}</ul></section>
          </div>
        </div>
      </section>

      {/* 03 — Software */}
      <section id={software.id} data-theme="dark" className="section scroll-mt-20" aria-labelledby="software-title">
        <div className="wrap">
          <SpecialtyHeader specialty={software} id="software-title">
            <Link href={`/contact?dienst=${software.id}`} className="btn btn-primary mt-7">Bespreek uw software <Arrow /></Link>
          </SpecialtyHeader>

          <h3 className="meta mb-4 mt-14 md:mt-20">Wat we bouwen</h3>
          <div className="nx-software-grid">
            {softwareKinds.map((kind, i) => (
              <div key={kind.title}>
                <p className="num mb-4">{String(i + 1).padStart(2, '0')}</p>
                <h4 className="t-h3">{kind.title}</h4>
                <p className="t-small mt-3 max-w-[30ch]">{kind.text}</p>
              </div>
            ))}
          </div>

          <div className="grid-12 mt-16 gap-y-14 md:mt-24">
            <div className="col-span-4 md:col-span-5">
              <h3 className="meta mb-4">Zo verloopt een softwareproject</h3>
              <ol className="border-t border-line-strong">
                {softwareSteps.map((step, i) => (
                  <li key={step.title} className="grid grid-cols-[2.5rem_1fr] gap-x-3 border-b border-line py-5">
                    <span className="num pt-1 text-[0.72rem] text-accent">{String(i + 1).padStart(2, '0')}</span>
                    <span><span className="t-h3 block">{step.title}</span><span className="t-small mt-1 block max-w-[40ch]">{step.text}</span></span>
                  </li>
                ))}
              </ol>
              <p className="t-small mt-6 max-w-[44ch]"><span className="meta mr-3 text-fg">Prijs</span>Software maken we op offerte. De prijs hangt af van de scope en ligt vast voordat we beginnen.</p>
            </div>
            <div className="col-span-4 md:col-span-6 md:col-start-7">
              <h3 className="meta mb-4">Te zien in ons werk</h3>
              <div className="nx-proof nx-proof-stacked">
                {softwareProof.map((item) => (
                  <Link key={item.project} href={`/portfolio/${item.project}`} className="group">
                    <span><span className="t-h3 block">{item.name}</span><span className="t-body mt-1 block max-w-[48ch]">{item.text}</span></span>
                    <span className="nx-arrow-box"><Arrow /></span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Supporting disciplines */}
      <section id="creatieve-productie" className="section scroll-mt-20" aria-labelledby="supporting-title">
        <div className="wrap grid-12 gap-y-10">
          <div className="col-span-4 md:col-span-4">
            <p className="meta mb-5 text-accent-text">Bij een project</p>
            <h2 id="supporting-title" className="t-h2">Ook mogelijk.</h2>
            <p className="t-body mt-4 max-w-[34ch]">Beeld en campagnes die een merk of website compleet maken. NextX regelt de uitvoering, waar nodig met een specialist, en blijft uw aanspreekpunt.</p>
          </div>
          <div className="col-span-4 grid gap-10 border-t border-line-strong pt-6 sm:grid-cols-2 md:col-span-7 md:col-start-6">
            {supportingDisciplines.map((discipline) => (
              <article id={discipline.id} key={discipline.id} className="scroll-mt-28">
                <h3 className="t-h3">{discipline.name}</h3>
                <p className="t-small mt-3 max-w-[40ch]">{discipline.description}</p>
                <ul className="mt-4 grid gap-2">{discipline.services.map((service) => <Dash key={service}>{service}</Dash>)}</ul>
                <Link href={`/contact?dienst=${discipline.id}`} className="link-arrow link-line mt-5 py-1 text-[0.9375rem]" aria-label={`Vraag ${discipline.name} aan`}>Op aanvraag <Arrow /></Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-bg-2" aria-labelledby="more-services-title"><div className="wrap"><div className="grid-12 gap-y-8"><div className="col-span-4 md:col-span-4"><p className="meta mb-5 text-accent-text">Aanvullend</p><h2 id="more-services-title" className="t-h2">Ook geregeld.</h2><p className="t-body mt-4 max-w-[32ch]">Van vindbaarheid en hosting tot support en losse uitbreidingen. Bekijk wat bij uw project past.</p></div><div className="col-span-4 md:col-span-7 md:col-start-6"><div className="border-t border-line-strong">{extraPackages.map((category) => <details id={category.id} key={category.id} className="nx-extra-category scroll-mt-28 border-b border-line"><summary className="flex cursor-pointer items-center justify-between gap-5 py-5"><span className="t-h3">{category.title}</span><span className="plus" aria-hidden="true">+</span></summary><div className="pb-10"><p className="t-body mb-6 max-w-[50ch]">{category.line}</p><ul className="border-t border-line">{category.services.map((service) => <ServiceRow key={service.id} service={service} />)}</ul>{category.terms && <p className="t-small mt-5 max-w-[65ch]">{category.terms}</p>}</div></details>)}</div></div></div></div></section>
    </>
  )
}
