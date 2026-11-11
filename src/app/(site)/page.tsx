import Link from 'next/link'
import { Hero } from '@/components/home/Hero'
import { HeroMotion } from '@/components/home/HeroMotion'
import { Specialties } from '@/components/home/Specialties'
import { Software } from '@/components/home/Software'
import { ConceptLab } from '@/components/home/ConceptLab'
import { Process } from '@/components/home/Process'
import { Subscriptions } from '@/components/home/Subscriptions'
import { ProjectShowcase } from '@/components/work/ProjectShowcase'
import { Arrow } from '@/components/Arrow'
import { Reveal } from '@/components/Reveal'
import { featuredProjects, projects } from '@/content/projects'

export default function HomePage() {
  return (
    <>
      <HeroMotion />
      <Hero />

      <section className="section" aria-labelledby="work-title">
        <div className="wrap">
          <Reveal className="grid-12 items-end gap-y-6">
            <div className="col-span-4 md:col-span-8">
              <p className="meta mb-5 text-accent-text">Geselecteerd werk</p>
              <h2 id="work-title" className="t-h2 max-w-[15ch]">Gemaakt, live en in gebruik.</h2>
            </div>
            <div className="col-span-4 md:col-span-4">
              <p className="t-body max-w-[38ch]">Websites en webshops die we hebben ontworpen en gebouwd. Elk project is online te bekijken.</p>
              <Link href="/portfolio" className="link-arrow link-line mt-5 py-1">Al het werk ({projects.length}) <Arrow /></Link>
            </div>
          </Reveal>
          <div className="mt-12 grid gap-20 md:mt-20 md:gap-32">
            {featuredProjects.map((project, i) => (
              <ProjectShowcase key={project.slug} project={project} flip={i % 2 === 1} priority={i === 0} />
            ))}
          </div>
        </div>
      </section>

      <Specialties />
      <Software />
      <ConceptLab />
      <Subscriptions />
      <Process />
    </>
  )
}
