import type { Metadata } from 'next'
import Link from 'next/link'
import { projects } from '@/content/projects'
import { PortfolioIndex } from '@/components/work/PortfolioIndex'
import { Arrow } from '@/components/Arrow'

export const metadata: Metadata = {
  title: 'Werk',
  description:
    'Bekijk het werk van NextX: de eigen webshop Shop NextX en de website voor Indef Design & Construction.',
  alternates: { canonical: '/portfolio' },
  openGraph: { title: 'Werk · NextX Agency', url: '/portfolio' },
}

export default function WorkPage() {
  return (
    <>
      <header className="wrap page-heading">
        <p className="meta">Portfolio</p>
        <h1>
          Werk dat
          <br />
          <span>voor zich spreekt.</span>
        </h1>
        <p className="t-lead">
          Klantwerk en eigen producten. Een kijkje in wat we ontwerpen en
          bouwen.
        </p>
      </header>
      <div className="wrap pb-[var(--section)]">
        <PortfolioIndex projects={projects} />
      </div>
      <section className="wrap portfolio-lab">
        <h2 className="t-h3">Een idee van de mogelijkheden</h2>
        <p className="t-body">
          Onze interactieve voorbeelden laten zien wat een websitepakket kan
          opleveren. Concepten voor fictieve bedrijven, apart van ons portfolio.
        </p>
        <Link href="/examples" className="link-arrow link-line">
          Verken de voorbeelden <Arrow />
        </Link>
      </section>
    </>
  )
}
