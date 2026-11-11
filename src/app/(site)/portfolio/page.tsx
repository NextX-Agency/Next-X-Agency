import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Arrow } from '@/components/Arrow'
import { PortfolioIndex } from '@/components/work/PortfolioIndex'
import { examples, featuredExamples } from '@/content/examples'
import { projects } from '@/content/projects'

export const metadata: Metadata = {
  title: 'Werk',
  description:
    'Websites en webshops die NextX Agency heeft ontworpen en gebouwd, waaronder Bhaggoes Car Palace en Shop NextX. Elk project is live te bekijken.',
  alternates: { canonical: '/portfolio' },
  openGraph: { title: 'Werk — NextX Agency', url: '/portfolio' },
}

export default function WorkPage() {
  return (
    <>
      <header data-theme="dark">
        <div className="wrap grid-12 items-end gap-y-8 pb-14 pt-[calc(var(--nav-h)+4rem)] md:pb-20 md:pt-[calc(var(--nav-h)+7rem)]">
          <div className="col-span-4 md:col-span-8">
            <p className="meta mb-6 text-accent">Werk · {projects.length} projecten</p>
            <h1 className="t-display max-w-[11ch]">Gemaakt en in gebruik<span className="text-accent">.</span></h1>
          </div>
          <div className="col-span-4 md:col-span-4 md:pb-3">
            <p className="t-lead max-w-[34ch]">
              Projecten die we hebben ontworpen en gebouwd. Ze staan online; u kunt ze zelf openen en gebruiken.
            </p>
          </div>
        </div>
      </header>

      <section className="section" aria-labelledby="projects-title">
        <div className="wrap">
          <h2 id="projects-title" className="sr-only">Projecten</h2>
          <PortfolioIndex projects={projects} />
        </div>
      </section>

      <section data-theme="dark" className="section" aria-labelledby="concepts-title">
        <div className="wrap">
          <div className="grid-12 items-end gap-y-6">
            <div className="col-span-4 md:col-span-8">
              <p className="meta mb-5 text-accent">Conceptlab · experimenten</p>
              <h2 id="concepts-title" className="t-h2 max-w-[18ch]">Ook nog: ideeën op proef.</h2>
            </div>
            <div className="col-span-4 md:col-span-4">
              <p className="t-body max-w-[38ch]">Werkende demo’s voor verzonnen merken, waarin we stijlen en interacties uitproberen. Dit is geen klantwerk.</p>
              <Link href="/examples" className="link-arrow link-line mt-5 py-1">Alle {examples.length} concepten <Arrow /></Link>
            </div>
          </div>
          <ul className="nx-concept-grid mt-12 md:mt-16">
            {featuredExamples.map((concept) => (
              <li key={concept.slug}>
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
    </>
  )
}
