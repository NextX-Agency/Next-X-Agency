import Image from 'next/image'
import Link from 'next/link'
import { specialties } from '@/content/disciplines'
import { Arrow } from '@/components/Arrow'
import { IdentitySheet } from '@/components/IdentitySheet'
import { Reveal } from '@/components/Reveal'

/** Each specialty is illustrated with work that exists: our own identity and two live projects. */
const visuals: Record<string, { src: string; alt: string; note: string; position: string } | null> = {
  'branding-design': null,
  web: {
    src: '/work/bhaggoes-home.jpg',
    alt: 'De website van Bhaggoes Car Palace',
    note: 'Bhaggoes Car Palace · klantproject',
    position: 'object-top',
  },
  software: {
    src: '/work/shop-nextx-cart.jpg',
    alt: 'De winkelwagen van Shop NextX met de bestelknop naar WhatsApp',
    note: 'Shop NextX · bestelflow',
    position: 'object-top',
  },
}

export function Specialties() {
  return (
    <section className="section bg-bg-2" aria-labelledby="specialties-title">
      <div className="wrap">
        <Reveal className="grid-12 items-end gap-y-6">
          <div className="col-span-4 md:col-span-8">
            <p className="meta mb-5 text-accent-text">Wat NextX doet</p>
            <h2 id="specialties-title" className="t-h2 max-w-[17ch]">Drie specialismen, één studio.</h2>
          </div>
          <div className="col-span-4 md:col-span-4">
            <p className="t-body max-w-[36ch]">Ontwerp en techniek komen bij ons van dezelfde tafel. Dat scheelt overdrachten, en het resultaat blijft één geheel.</p>
            <Link href="/services" className="link-arrow link-line mt-5 py-1">Diensten en prijzen <Arrow /></Link>
          </div>
        </Reveal>

        <div className="mt-12 md:mt-20">
          {specialties.map((specialty) => {
            const visual = visuals[specialty.id]
            const href = `/services#${specialty.id}`
            return (
              <Reveal as="section" key={specialty.id} className="nx-spec">
                <div className="nx-spec-head">
                  <p className="meta mb-4 text-accent-text">{specialty.index}</p>
                  <h3 className="nx-spec-title"><Link href={href} className="link-line">{specialty.name}</Link></h3>
                </div>
                <div className="nx-spec-body">
                  <p className="t-body max-w-[44ch] text-fg">{specialty.description}</p>
                  <ul className="nx-spec-list">
                    {specialty.services.map((service) => <li key={service}>{service}</li>)}
                  </ul>
                  <Link href={href} className="link-arrow link-line mt-6 py-1 text-[0.9375rem]" aria-label={`Meer over ${specialty.name}`}>Meer over deze dienst <Arrow /></Link>
                </div>
                <Link href={href} className="nx-spec-visual" tabIndex={-1} aria-hidden="true">
                  {visual ? (
                    <>
                      <Image src={visual.src} alt="" fill sizes="(min-width: 48rem) 32vw, 100vw" className={`object-cover ${visual.position}`} />
                      <span className="nx-label">{visual.note}</span>
                    </>
                  ) : (
                    <>
                      <IdentitySheet />
                      <span className="sr-only">De NextX-identiteit</span>
                    </>
                  )}
                </Link>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
