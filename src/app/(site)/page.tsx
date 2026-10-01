import Link from 'next/link'
import { projects } from '@/content/projects'
import { Hero } from '@/components/home/Hero'
import { Capabilities } from '@/components/home/Capabilities'
import { Process } from '@/components/home/Process'
import { Studio } from '@/components/home/Studio'
import { ProjectFeature } from '@/components/work/ProjectFeature'
import { Arrow } from '@/components/Arrow'

export default function HomePage() {
  return (
    <>
      <Hero />

      <section
        id="work"
        className="section work-section"
        aria-labelledby="work-title"
      >
        <div className="wrap">
          <div className="work-heading">
            <p className="meta">01 / In de praktijk</p>
            <h2 id="work-title" className="t-h2">
              Werk met een
              <br />
              eigen karakter.
            </h2>
            <Link href="/portfolio" className="link-arrow link-line py-1">
              Alle projecten
              <Arrow />
            </Link>
          </div>
          <div className="selected-work">
            {projects.map((project, i) => (
              <ProjectFeature
                key={project.slug}
                project={project}
                flip={i % 2 === 1}
              />
            ))}
          </div>
        </div>
      </section>

      <Capabilities />
      <Studio />
      <Process />
    </>
  )
}
