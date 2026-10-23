import Image from 'next/image'
import Link from 'next/link'
import { disciplines } from '@/content/disciplines'
import { Arrow } from '@/components/Arrow'
import { Reveal } from '@/components/Reveal'

const visuals: Record<string, { src: string; alt: string; note: string }> = {
  'web-software': { src: '/demo-previews/starter-webshop.webp', alt: 'Bloom Boutique: webshopconcept voor een fictief merk', note: 'Werkende conceptdemo · fictief merk' },
  'photography-media': { src: '/demo-assets/savana-packaging.webp', alt: 'Sfeervolle productpresentatie voor het fictieve merk Savana', note: 'Studio concept · fictief merk' },
  'branding-design': { src: '/demo-assets/savana-menu.jpg', alt: 'Ontwerpconcept met typografie voor het fictieve merk Savana', note: 'Studio concept · fictief merk' },
  marketing: { src: '/demo-assets/portfolio-savana.jpg', alt: 'Campagnebeeldconcept voor het fictieve merk Savana', note: 'Studio concept · fictief merk' },
}

export function Capabilities() {
  return (
    <section className="section nx-capabilities" aria-labelledby="capabilities-title">
      <div className="wrap">
        <Reveal className="grid-12 items-end gap-y-6">
          <div className="col-span-4 md:col-span-8">
            <p className="meta mb-5 text-accent-text">Wat NextX maakt</p>
            <h2 id="capabilities-title" className="t-h2 max-w-[18ch]">Van eerste indruk tot complete ervaring.</h2>
          </div>
          <div className="col-span-4 md:col-span-4">
            <p className="t-body max-w-[34ch]">Een website, beeldbank, merkidentiteit of campagne. We brengen de juiste expertise samen rond wat uw bedrijf nodig heeft.</p>
            <Link href="/services" className="link-arrow link-line mt-5">Alle diensten <Arrow /></Link>
          </div>
        </Reveal>

        <div className="nx-capabilities-grid mt-12 md:mt-20">
          {disciplines.map((discipline, i) => {
            const visual = visuals[discipline.id]
            return (
              <Reveal as="section" key={discipline.id} delay={i * .06} className={`nx-capability nx-capability-${i + 1}`}>
                <Link href={`/services#${discipline.id}`} className="nx-capability-image group" aria-label={`Bekijk ${discipline.name}`}>
                  <Image src={visual.src} alt={visual.alt} fill sizes="(min-width: 768px) 60vw, 100vw" className="object-cover transition-transform duration-700 ease-[var(--ease)] group-hover:scale-[1.035]" />
                  <span className="nx-capability-image-label">{visual.note}</span>
                </Link>
                <div className="nx-capability-info">
                  <div>
                    <h3 className="t-h3"><Link href={`/services#${discipline.id}`} className="link-line">{discipline.name}</Link></h3>
                    <p className="t-small mt-2 max-w-[43ch]">{discipline.description}</p>
                  </div>
                  <Link href={`/services#${discipline.id}`} className="nx-capability-arrow" aria-label={`Meer over ${discipline.name}`}><Arrow /></Link>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
