import type { Metadata } from 'next'
import Link from 'next/link'
import { Arrow } from '@/components/Arrow'
import { ConceptStrip } from '@/components/ConceptStrip'
import { PortfolioIndex } from '@/components/work/PortfolioIndex'
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
        <div className="wrap pb-14 pt-[calc(var(--nav-h)+4rem)] md:pb-20 md:pt-[calc(var(--nav-h)+7rem)]">
          <h1 className="t-display max-w-[10ch]">Gemaakt en in gebruik<span className="text-accent">.</span></h1>
        </div>
      </header>

      <PortfolioIndex projects={projects} />

      <section data-theme="dark" className="section" aria-labelledby="concepts-title">
        <div className="wrap mb-10 flex flex-wrap items-end justify-between gap-x-10 gap-y-5 md:mb-14">
          <div>
            <h2 id="concepts-title" className="t-h1">Conceptlab</h2>
            <p className="t-lead mt-4 max-w-[30ch]">Werkende demo’s voor verzonnen merken. Geen klanten, wel ideeën.</p>
          </div>
          <Link href="/examples" className="btn btn-quiet">Alle concepten <Arrow /></Link>
        </div>
        <ConceptStrip />
      </section>
    </>
  )
}
