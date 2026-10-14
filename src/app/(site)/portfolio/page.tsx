import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { projects } from '@/content/projects'
import { examples } from '@/content/examples'
import { Arrow } from '@/components/Arrow'
import { PortfolioIndex } from '@/components/work/PortfolioIndex'

export const metadata: Metadata = {
  title: 'Werk',
  description:
    'Bekijk het werk van NextX: de eigen webshop Shop NextX en de website voor Indef Design & Construction.',
  alternates: { canonical: '/portfolio' },
  openGraph: { title: 'Werk — NextX Agency', url: '/portfolio' },
}

export default function WorkPage() {
  return (
    <>
      <header className="wrap flex flex-wrap items-end justify-between gap-6 pb-12 pt-[calc(var(--nav-h)+4rem)] md:pb-20 md:pt-[calc(var(--nav-h)+7rem)]">
        <h1 className="t-display">Werk</h1>
        <p className="meta max-w-[28ch] md:text-right">Klantwerk en eigen producten, met de bijdrage van NextX per project.</p>
      </header>

      <PortfolioIndex projects={projects} />

      <section data-theme="dark" className="section" aria-labelledby="lab-title">
        <div className="wrap grid-12 gap-y-10">
          <div className="col-span-4 md:col-span-5">
            <p className="meta mb-5">Voorbeelden</p>
            <h2 id="lab-title" className="t-h2">
              Concepten voor verzonnen bedrijven
            </h2>
            <p className="t-body mt-5 max-w-[40ch]">
              Werkende prototypes die laten zien wat een websitepakket oplevert. De bedrijven bestaan niet en zijn geen klanten; de interfaces werken wel.
            </p>
            <Link href="/examples" className="link-arrow link-line mt-7 py-1">
              Alle {examples.length} voorbeelden
              <Arrow />
            </Link>
          </div>
          <div className="col-span-4 grid grid-cols-2 gap-3 md:col-span-6 md:col-start-7">
            {examples.slice(0, 4).map((example) => (
              <Link key={example.slug} href={`/examples/${example.slug}`} className="group block">
                <div className="frame aspect-[16/10]">
                  <Image src={example.image} alt="" fill sizes="(min-width: 48rem) 25vw, 50vw" className="object-cover object-top" />
                </div>
                <p className="meta mt-2 group-hover:text-fg">{example.business}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
