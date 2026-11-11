import Image from 'next/image'
import Link from 'next/link'
import { Arrow } from '@/components/Arrow'
import { examples, featuredExamples } from '@/content/examples'

/** Experiments, kept visibly apart from real work: every card says the brand is fictional. */
export function ConceptLab() {
  return (
    <section className="section nx-concept-showcase" aria-labelledby="concept-title">
      <div className="wrap">
        <div className="grid-12 items-end gap-y-6">
          <div className="col-span-4 md:col-span-8">
            <p className="meta mb-5 text-accent-text">Conceptlab · experimenten</p>
            <h2 id="concept-title" className="t-h2 max-w-[18ch]">Ideeën die u kunt uitproberen.</h2>
          </div>
          <div className="col-span-4 md:col-span-4">
            <p className="t-body max-w-[38ch]">Naast echt werk bouwen we werkende demo’s om stijlen en interacties te testen. De merken zijn verzonnen; het zijn geen klanten.</p>
            <Link href="/examples" className="link-arrow link-line mt-5 py-1">Alle {examples.length} concepten <Arrow /></Link>
          </div>
        </div>
        <ul className="nx-concept-grid mt-12 md:mt-16">
          {featuredExamples.map((concept) => (
            <li key={concept.slug} data-nx-motion="card">
              <Link href={`/examples/${concept.slug}`} className="group block" aria-label={`Open de conceptdemo ${concept.business}`}>
                <span className="nx-concept-media">
                  <Image src={concept.image} alt="" fill sizes="(min-width: 48rem) 32vw, 100vw" className="object-cover object-top" />
                  <span className="nx-label">Conceptdemo · fictief merk</span>
                </span>
                <span className="mt-4 flex items-start justify-between gap-4 border-t border-line-strong pt-4">
                  <span>
                    <span className="t-h3 block">{concept.business}</span>
                    <span className="t-small mt-1 block max-w-[36ch]">{concept.summary}</span>
                  </span>
                  <Arrow className="mt-2" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
