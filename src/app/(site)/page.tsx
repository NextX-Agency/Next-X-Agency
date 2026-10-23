import Link from 'next/link'
import Image from 'next/image'
import { Hero } from '@/components/home/Hero'
import { HeroMotion } from '@/components/home/HeroMotion'
import { Capabilities } from '@/components/home/Capabilities'
import { Process } from '@/components/home/Process'
import { Signal } from '@/components/home/Signal'
import { Subscriptions } from '@/components/home/Subscriptions'
import { Arrow } from '@/components/Arrow'

export default function HomePage() {
  return (
    <>
      <HeroMotion />
      <Hero />

      <section className="section nx-concept-showcase" aria-labelledby="work-title">
        <div className="wrap">
          <div className="grid-12 items-end gap-y-6">
            <div className="col-span-4 md:col-span-8">
              <p className="meta mb-5 text-accent-text">Het NextX conceptlab</p>
              <h2 id="work-title" className="t-h2 max-w-[16ch]">Bekijk wat we kunnen bouwen.</h2>
            </div>
            <div className="col-span-4 md:col-span-4">
              <p className="t-body max-w-[38ch]">We zijn een nieuwe studio. Deze werkende demo’s tonen onze ideeën, ontwerpkeuzes en interacties. De merken zijn fictief en geen klanten.</p>
              <Link href="/portfolio" className="link-arrow link-line mt-5 py-1">Verken het conceptlab <Arrow /></Link>
            </div>
          </div>
          <div className="nx-concept-grid mt-12 md:mt-20">
            {[
              { name: 'DentaCare', type: 'Servicewebsite', detail: 'Behandelingen kiezen en een afspraak aanvragen.', image: '/demo-previews/service-website.webp', slug: 'service-website' },
              { name: 'Bloom Boutique', type: 'Webshop', detail: 'Collectie verkennen, favorieten kiezen en afrekenen in een demo.', image: '/demo-previews/starter-webshop.webp', slug: 'starter-webshop' },
              { name: 'Warung Indah', type: 'Restaurantwebsite', detail: 'Menukaart bekijken en een tafel reserveren.', image: '/demo-previews/restaurant-menu-site.webp', slug: 'restaurant-menu-site' },
            ].map((concept) => (
              <article key={concept.slug} className="nx-concept-card" data-nx-motion="card">
                <Link href={`/examples/${concept.slug}`} className="nx-concept-media group" aria-label={`Open de werkende ${concept.name} conceptdemo`}>
                  <Image src={concept.image} alt={`Schermbeeld van de ${concept.name} conceptdemo`} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.025]" />
                  <span className="nx-capability-image-label">Conceptdemo · fictief merk</span>
                </Link>
                <div className="nx-concept-card-info">
                  <div><p className="meta text-accent-text">{concept.type}</p><h3 className="t-h3 mt-2">{concept.name}</h3><p className="t-small mt-2 max-w-[40ch]">{concept.detail}</p></div>
                  <Link href={`/examples/${concept.slug}`} className="nx-capability-arrow" aria-label={`Bekijk ${concept.name}`}><Arrow /></Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Capabilities />
      <Subscriptions />
      <Signal />
      <Process />
    </>
  )
}
