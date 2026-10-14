import Link from 'next/link'
import { projects } from '@/content/projects'
import { Hero } from '@/components/home/Hero'
import { Capabilities } from '@/components/home/Capabilities'
import { Process } from '@/components/home/Process'
import { Signal } from '@/components/home/Signal'
import { ProjectFeature } from '@/components/work/ProjectFeature'
import { Arrow } from '@/components/Arrow'

export default function HomePage() {
  return (
    <>
      <Hero />

      <section className="section" aria-labelledby="work-title">
        <div className="wrap">
          <div className="mb-12 flex flex-wrap items-baseline justify-between gap-4 md:mb-16">
            <h2 id="work-title" className="t-h2">
              Recent werk
            </h2>
            <Link href="/portfolio" className="link-arrow link-line py-1">
              Alle projecten
              <Arrow />
            </Link>
          </div>
          <div className="grid gap-24 md:gap-40">
            {projects.map((project, i) => (
              <ProjectFeature key={project.slug} project={project} flip={i % 2 === 1} />
            ))}
          </div>
        </div>
      </section>

      <Capabilities />
      <Signal />
      <Process />
    </>
  )
}
