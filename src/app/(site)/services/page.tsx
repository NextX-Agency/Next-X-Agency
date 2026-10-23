import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Arrow } from '@/components/Arrow'
import { disciplines } from '@/content/disciplines'
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
  description: 'Kies een website-abonnement, een eenmalige website of webshop, of vraag creatieve productie aan. Bekijk duidelijke pakketten en prijzen van NextX Agency.',
  alternates: { canonical: '/services' },
  openGraph: { title: 'Diensten en prijzen — NextX Agency', url: '/services' },
}

const subscriptions = serviceCategories.find((category) => category.id === 'website-subscriptions')!
const projectPackages = serviceCategories.filter((category) => ['websites', 'e-commerce'].includes(category.id))
const extraPackages = serviceCategories.filter((category) => !['websites', 'e-commerce', 'website-subscriptions', 'creative-production'].includes(category.id))

const disciplineVisuals: Record<string, { src: string; alt: string }> = {
  'web-software': { src: '/demo-previews/starter-webshop.webp', alt: 'Bloom Boutique, een webshopconcept voor een fictief merk' },
  'photography-media': { src: '/demo-assets/savana-packaging.webp', alt: 'Conceptbeeld van koffie en verpakking' },
  'branding-design': { src: '/demo-assets/savana-menu.jpg', alt: 'Conceptbeeld van grafisch ontwerp op een werktafel' },
  marketing: { src: '/demo-assets/portfolio-savana.jpg', alt: 'Conceptbeeld met koffie in een café' },
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
      <header data-theme="dark" className="nx-services-hero">
        <div className="wrap nx-services-hero-inner">
          <div className="nx-services-hero-copy">
            <p className="meta mb-6 text-accent">Diensten van NextX</p>
            <h1 className="nx-services-hero-title">Wat wilt u <em>laten maken?</em></h1>
            <p className="t-lead mt-7 max-w-[42ch]">Een site die voor u blijft werken, een project met een duidelijke oplevering, of nieuw beeld voor uw merk. Begin bij wat u nodig hebt.</p>
            <div className="mt-9 flex flex-wrap gap-4">
              <a href="#kies-uw-route" className="btn btn-primary">Ontdek de mogelijkheden <Arrow /></a>
              <Link href="/contact" className="btn btn-quiet">Bespreek uw idee</Link>
            </div>
          </div>
          <div className="nx-services-hero-images" aria-hidden="true">
            <div className="nx-services-hero-image nx-services-hero-image-a"><Image src="/demo-previews/starter-webshop.webp" alt="" fill priority sizes="(min-width: 768px) 36vw, 80vw" className="object-cover object-top" /></div>
            <div className="nx-services-hero-image nx-services-hero-image-b"><Image src="/demo-assets/savana-packaging.webp" alt="" fill sizes="(min-width: 768px) 20vw, 48vw" className="object-cover" /></div>
            <span className="nx-services-concept-label">Conceptbeelden · fictieve merken</span>
          </div>
        </div>
      </header>

      <section id="kies-uw-route" className="section scroll-mt-20" aria-labelledby="routes-title">
        <div className="wrap">
          <div className="grid-12 gap-y-5">
            <div className="col-span-4 md:col-span-7"><p className="meta mb-4 text-accent-text">Kies uw route</p><h2 id="routes-title" className="t-h2">Drie manieren om te beginnen.</h2></div>
            <p className="t-body col-span-4 max-w-[35ch] md:col-span-4 md:col-start-9 md:self-end">We maken de keuze eenvoudig. Elk traject begint met een helder gesprek over inhoud, scope en prijs.</p>
          </div>
          <div className="nx-service-routes mt-12 md:mt-16">
            <a href="#website-subscriptions" className="nx-service-route group">
              <span className="nx-service-route-media"><Image src="/demo-previews/service-website.webp" alt="Voorbeeld van een servicewebsite" fill sizes="(min-width: 768px) 220px, 100vw" className="object-cover" /></span>
              <span className="nx-service-route-copy"><span className="meta text-accent-text">Website-abonnement</span><strong>Een website die meegaat.</strong><small>Ontwerp en bouw, onderhoud, bugfixes en wijzigingen per maand.</small></span>
              <span className="nx-service-route-end"><b>{formatPrice(subscriptions.services[0].price)}</b><Arrow /></span>
            </a>
            <a href="#eenmalige-projecten" className="nx-service-route group">
              <span className="nx-service-route-media"><Image src="/demo-previews/starter-webshop.webp" alt="Bloom Boutique conceptwebshop voor een fictief merk" fill sizes="(min-width: 768px) 220px, 100vw" className="object-cover object-top" /></span>
              <span className="nx-service-route-copy"><span className="meta text-accent-text">Eenmalig project</span><strong>Een site of shop met een doel.</strong><small>Een afgesproken scope, een oplevermoment en een prijs vooraf.</small></span>
              <span className="nx-service-route-end"><b>{formatPrice(websiteFrom)}</b><Arrow /></span>
            </a>
            <a href="#creatieve-productie" className="nx-service-route group">
              <span className="nx-service-route-media"><Image src="/demo-assets/savana-packaging.webp" alt="Productpresentatieconcept voor het fictieve merk Savana" fill sizes="(min-width: 768px) 220px, 100vw" className="object-cover" /></span>
              <span className="nx-service-route-copy"><span className="meta text-accent-text">Creatieve productie</span><strong>Beeld en identiteit die passen.</strong><small>Fotografie, video, branding, ontwerp en marketing op maat.</small></span>
              <span className="nx-service-route-end"><b>Op aanvraag</b><Arrow /></span>
            </a>
          </div>
        </div>
      </section>

      <section id="website-subscriptions" aria-labelledby="subscriptions-title" className="scroll-mt-20 bg-bg-2 py-[var(--section)]">
        <div className="wrap">
          <div className="grid-12 items-end gap-y-10">
            <div className="col-span-4 md:col-span-6"><p className="meta mb-5 text-accent-text">Website-abonnementen</p><h2 id="subscriptions-title" className="t-h2 max-w-[13ch]">Uw website blijft in beweging.</h2><p className="t-body mt-5 max-w-[48ch]">We bouwen uw website als onderdeel van het abonnement en houden hem bij. Kies hoeveel ruimte u maandelijks nodig hebt voor nieuwe inhoud en functies.</p></div>
            <div className="col-span-4 md:col-span-5 md:col-start-8"><Link href="/examples/service-website" className="group block"><div className="relative aspect-[8/5] overflow-hidden bg-bg"><Image src="/demo-previews/service-website.webp" alt="DentaCare: werkende servicewebsite voor een fictieve praktijk" fill sizes="(min-width: 768px) 40vw, 100vw" className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.025]" /></div><p className="meta mt-3">Werkende conceptdemo · fictief merk ↗</p></Link></div>
          </div>
          <div className="mt-16 border-t border-line-strong md:mt-24">
            {subscriptions.services.map((plan) => (
              <article key={plan.id} className="nx-plan-row grid-12 gap-y-4 border-b border-line py-7 md:items-start md:py-9">
                <div className="col-span-4 md:col-span-4"><h3 className="t-h3">{plan.name}</h3><p className="t-small mt-2 max-w-[32ch]">{plan.summary}</p></div>
                <div className="col-span-4 md:col-span-5"><ul className="grid gap-2">{plan.includes.map((item) => <li key={item} className="flex gap-3 text-[0.9375rem]"><span className="mt-[0.6em] h-px w-3 shrink-0 bg-accent" aria-hidden="true" />{item}</li>)}</ul></div>
                <div className="col-span-4 flex items-center justify-between gap-5 md:col-span-3 md:flex-col md:items-end"><span className="num whitespace-nowrap text-lg">{formatPrice(plan.price)}</span><Link href={`/contact?dienst=${plan.id}`} className="link-arrow link-line whitespace-nowrap">Bespreek dit plan <Arrow /></Link></div>
              </article>
            ))}
          </div>
          <p className="t-small mt-7 max-w-[90ch]">{subscriptions.terms}</p>
        </div>
      </section>

      <section id="eenmalige-projecten" className="section scroll-mt-20" aria-labelledby="projects-services-title">
        <div className="wrap">
          <div className="grid-12 gap-y-5"><div className="col-span-4 md:col-span-7"><p className="meta mb-5 text-accent-text">Eenmalige projecten</p><h2 id="projects-services-title" className="t-h2 max-w-[16ch]">Duidelijke scope. Een helder resultaat.</h2></div><p className="t-body col-span-4 max-w-[38ch] md:col-span-4 md:col-start-9 md:self-end">De bedragen hieronder zijn vanafprijzen in USD. Na het eerste gesprek leggen we de exacte prijs en planning vast.</p></div>
          <div className="mt-16 grid gap-20 md:mt-24 md:gap-28">{projectPackages.map((category) => <CategoryBlock key={category.id} category={category} />)}</div>
          <section aria-labelledby="included-title" className="mt-20 bg-bg-2 p-6 md:mt-28 md:p-10"><h3 id="included-title" className="t-h3">Bij elke website en webshop</h3><ul className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2">{includedEverywhere.map((item) => <li key={item} className="flex gap-3 text-[0.9375rem]"><span className="mt-[0.6em] h-px w-3 shrink-0 bg-accent" aria-hidden="true" />{item}</li>)}</ul></section>
        </div>
      </section>

      <section id="creatieve-productie" className="section scroll-mt-20 bg-bg-2" aria-labelledby="creative-title">
        <div className="wrap"><p className="meta mb-5 text-accent-text">Meer dan web</p><h2 id="creative-title" className="t-h2 max-w-[17ch]">Het verhaal en het beeld eromheen.</h2><p className="t-body mt-5 max-w-[55ch]">Voor software op maat, fotografie, video, branding en marketing bepalen we de aanpak en prijs per project. NextX coördineert de juiste specialisten en blijft uw aanspreekpunt.</p>
          <div className="nx-creative-grid mt-12 md:mt-20">
            {disciplines.map((discipline) => {
              const visual = disciplineVisuals[discipline.id]
              return <article id={discipline.id} key={discipline.id} className="nx-creative-item scroll-mt-28"><div className="nx-creative-image"><Image src={visual.src} alt={visual.alt} fill sizes="(min-width: 768px) 45vw, 100vw" className="object-cover" /><span className="nx-capability-image-label">Studio concept · fictief merk</span></div><div className="border-t border-line-strong pt-4"><h3 className="t-h3">{discipline.name}</h3><p className="t-small mt-3 max-w-[46ch]">{discipline.description}</p><ul className="mt-5 grid gap-1 text-[0.9375rem]">{discipline.services.map((service) => <li key={service}>↗ {service}</li>)}</ul><Link href={`/contact?dienst=${discipline.id}`} className="link-arrow link-line mt-6">Bespreek uw project <Arrow /></Link></div></article>
            })}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="more-services-title"><div className="wrap"><div className="grid-12 gap-y-8"><div className="col-span-4 md:col-span-4"><p className="meta mb-5 text-accent-text">Aanvullend</p><h2 id="more-services-title" className="t-h2">Ook geregeld.</h2><p className="t-body mt-4 max-w-[32ch]">Van vindbaarheid en hosting tot support en losse uitbreidingen. Bekijk wat bij uw project past.</p></div><div className="col-span-4 md:col-span-8"><div className="border-t border-line-strong">{extraPackages.map((category) => <details id={category.id} key={category.id} className="nx-extra-category scroll-mt-28 border-b border-line"><summary className="flex cursor-pointer items-center justify-between gap-5 py-5"><span className="t-h3">{category.title}</span><span className="plus" aria-hidden="true">+</span></summary><div className="pb-10"><p className="t-body mb-6 max-w-[50ch]">{category.line}</p><ul className="border-t border-line">{category.services.map((service) => <ServiceRow key={service.id} service={service} />)}</ul>{category.terms && <p className="t-small mt-5 max-w-[65ch]">{category.terms}</p>}</div></details>)}</div></div></div></div></section>
    </>
  )
}
