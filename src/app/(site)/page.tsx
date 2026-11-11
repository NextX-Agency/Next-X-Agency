import Link from 'next/link'
import { Hero } from '@/components/home/Hero'
import { HeroMotion } from '@/components/home/HeroMotion'
import { Software } from '@/components/home/Software'
import { Process } from '@/components/home/Process'
import { Subscriptions } from '@/components/home/Subscriptions'
import { ConceptStrip } from '@/components/ConceptStrip'
import { SpecialtyTiles } from '@/components/SpecialtyTiles'
import { ProjectShowcase } from '@/components/work/ProjectShowcase'
import { Arrow } from '@/components/Arrow'
import { Reveal } from '@/components/Reveal'
import { featuredProjects } from '@/content/projects'

export default function HomePage() {
  return (
    <>
      <HeroMotion />
      <Hero />

      <section aria-labelledby="work-title">
        <h2 id="work-title" className="sr-only">Ons werk</h2>
        {featuredProjects.map((project, i) => (
          <ProjectShowcase key={project.slug} project={project} flip={i % 2 === 1} priority={i === 0} />
        ))}
        <div className="wrap flex justify-center py-10 md:py-14">
          <Link href="/portfolio" className="btn btn-quiet">Al ons werk <Arrow /></Link>
        </div>
      </section>

      <section className="pb-[var(--section)] pt-6 md:pt-10" aria-labelledby="specialties-title">
        <div className="wrap">
          <Reveal>
            <h2 id="specialties-title" className="t-h1 mb-10 max-w-[14ch] md:mb-14">Drie dingen doen we goed<span className="text-accent">.</span></h2>
          </Reveal>
          <SpecialtyTiles />
        </div>
      </section>

      <Software />

      <section className="section" aria-labelledby="concept-title">
        <div className="wrap mb-10 flex flex-wrap items-end justify-between gap-x-10 gap-y-5 md:mb-14">
          <div>
            <h2 id="concept-title" className="t-h1">Conceptlab</h2>
            <p className="t-lead mt-4 max-w-[30ch]">Werkende demo’s voor verzonnen merken. Geen klanten, wel ideeën.</p>
          </div>
          <Link href="/examples" className="btn btn-quiet">Alle concepten <Arrow /></Link>
        </div>
        <ConceptStrip />
      </section>

      <Subscriptions />
      <Process />
    </>
  )
}
