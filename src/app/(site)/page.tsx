import Link from 'next/link'
import { Hero } from '@/components/home/Hero'
import { HeroMotion } from '@/components/home/HeroMotion'
import { Software } from '@/components/home/Software'
import { Process } from '@/components/home/Process'
import { Subscriptions } from '@/components/home/Subscriptions'
import { ConceptBrowser } from '@/components/concepts/ConceptBrowser'
import { SpecialtyTiles } from '@/components/SpecialtyTiles'
import { ProjectMini, ProjectShowcase } from '@/components/work/ProjectShowcase'
import { Arrow } from '@/components/Arrow'
import { Reveal } from '@/components/Reveal'
import { featuredProjects, projects } from '@/content/projects'
import { examples } from '@/content/examples'

const moreProjects = projects.filter((project) => !project.featured).slice(0, 1)

export default function HomePage() {
  return (
    <>
      <HeroMotion />
      <Hero />

      <section aria-labelledby="work-title">
        <h2 id="work-title" className="sr-only">Our work</h2>
        {featuredProjects.map((project, i) => (
          <ProjectShowcase key={project.slug} project={project} flip={i % 2 === 1} priority={i === 0} />
        ))}
        <div className="wrap grid gap-3 py-3 md:grid-cols-2">
          {moreProjects.map((project) => <ProjectMini key={project.slug} project={project} />)}
          <Link href="/portfolio" className="nx-action min-h-[14rem]" style={{ '--card': 'var(--orange)', '--card-fg': 'var(--ink)' } as React.CSSProperties}>
            <strong>All our work</strong>
            <Arrow className="mb-2 h-4 w-7" />
          </Link>
        </div>
      </section>

      <section className="pb-[var(--section)] pt-16 md:pt-28" aria-labelledby="specialties-title">
        <div className="wrap">
          <Reveal>
            <h2 id="specialties-title" className="t-h1 mb-10 max-w-[14ch] md:mb-14">Three things we do well<span className="text-accent">.</span></h2>
          </Reveal>
          <SpecialtyTiles />
        </div>
      </section>

      <Software />

      <section className="section" aria-labelledby="concept-title">
        <div className="wrap mb-10 flex flex-wrap items-end justify-between gap-x-10 gap-y-5 md:mb-14">
          <div>
            <h2 id="concept-title" className="t-h1">Concept Lab</h2>
            <p className="t-lead mt-4 max-w-[34ch]">Working demos for made-up brands. See a style that fits? Tap <b className="font-semibold text-fg">I want this</b>.</p>
          </div>
          <Link href="/examples" className="btn btn-quiet">All {examples.length} concepts <Arrow /></Link>
        </div>
        <div className="wrap">
          <ConceptBrowser items={examples} limit={6} />
        </div>
      </section>

      <Subscriptions />
      <Process />
    </>
  )
}
