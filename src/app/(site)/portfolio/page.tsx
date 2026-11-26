import type { Metadata } from 'next'
import Link from 'next/link'
import { Arrow } from '@/components/Arrow'
import { ConceptStrip } from '@/components/ConceptStrip'
import { PortfolioIndex } from '@/components/work/PortfolioIndex'
import { projects } from '@/content/projects'

export const metadata: Metadata = {
  title: 'Work',
  description:
    'Websites and webshops NextX Agency designed and built, including Bhaggoes Car Palace and Shop NextX. Every project is live to see.',
  alternates: { canonical: '/portfolio' },
  openGraph: { title: 'Work — NextX Agency', url: '/portfolio' },
}

export default function WorkPage() {
  return (
    <>
      <header data-theme="dark">
        <div className="wrap pb-14 pt-[calc(var(--nav-h)+4rem)] md:pb-20 md:pt-[calc(var(--nav-h)+7rem)]">
          <h1 className="t-display max-w-[10ch]">Made and in use<span className="text-accent">.</span></h1>
        </div>
      </header>

      <PortfolioIndex projects={projects} />

      <section data-theme="dark" className="section" aria-labelledby="concepts-title">
        <div className="wrap mb-10 flex flex-wrap items-end justify-between gap-x-10 gap-y-5 md:mb-14">
          <div>
            <h2 id="concepts-title" className="t-h1">Concept Lab</h2>
            <p className="t-lead mt-4 max-w-[30ch]">Working demos for made-up brands. No clients, just ideas.</p>
          </div>
          <Link href="/examples" className="btn btn-quiet">All concepts <Arrow /></Link>
        </div>
        <ConceptStrip />
      </section>
    </>
  )
}
