import type { Metadata } from 'next'
import Link from 'next/link'
import { site } from '@/content/site'
import { projects } from '@/content/projects'
import { Arrow } from '@/components/Arrow'
import { IdentitySheet } from '@/components/IdentitySheet'
import { LocalTime } from '@/components/LocalTime'
import { Reveal } from '@/components/Reveal'
import { SpecialtyTiles } from '@/components/SpecialtyTiles'
import { ProjectMini } from '@/components/work/ProjectShowcase'

export const metadata: Metadata = {
  title: 'Studio',
  description:
    'NextX is a design studio and software builder in Paramaribo. Graphic design, websites and custom software, with one point of contact and clear agreements up front.',
  alternates: { canonical: '/about' },
  openGraph: { title: 'Studio — NextX Agency', url: '/about' },
}

const principles = [
  { title: 'Agreed up front', text: 'What you get, what it costs and when it is ready.' },
  { title: 'One point of contact', text: 'On WhatsApp, by email or in person in Paramaribo.' },
  { title: 'Design and build together', text: 'What you approve is what you get.' },
  { title: 'Only real work', text: 'Experiments live separately in the Concept Lab.' },
]

export default function AboutPage() {
  return (
    <>
      <header data-theme="dark" className="overflow-hidden">
        <div className="wrap grid-12 items-center gap-y-12 pb-16 pt-[calc(var(--nav-h)+4rem)] md:pb-24 md:pt-[calc(var(--nav-h)+7rem)]">
          <div className="col-span-4 md:col-span-7">
            <h1 className="t-display max-w-[9ch]">Built digitally. Thought visually<span className="text-accent">.</span></h1>
            <p className="t-lead mt-8 max-w-[30ch] text-fg">A studio from {site.location.city} that keeps design and software under one roof.</p>
          </div>
          <div className="col-span-4 md:col-span-5 md:col-start-8">
            <div className="aspect-[4/3] md:rotate-[3deg]"><IdentitySheet /></div>
          </div>
        </div>
      </header>

      <section className="section" aria-labelledby="specialties-title">
        <div className="wrap">
          <h2 id="specialties-title" className="t-h1 mb-10 md:mb-14">What we make<span className="text-accent">.</span></h2>
          <SpecialtyTiles />
        </div>
      </section>

      <section className="bg-bg-2 py-[var(--section)]" aria-labelledby="principles-title">
        <div className="wrap">
          <h2 id="principles-title" className="t-h1 mb-10 md:mb-14">How we work<span className="text-accent">.</span></h2>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {principles.map((item, i) => (
              <Reveal as="li" key={item.title} delay={i * 0.06} className="flex flex-col justify-between gap-6 bg-bg p-6 sm:min-h-[13rem] sm:gap-8">
                <span className="size-3 bg-accent" aria-hidden="true" />
                <span>
                  <span className="t-h3 block">{item.title}</span>
                  <span className="t-small mt-2 block">{item.text}</span>
                </span>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="own-title">
        <div className="wrap">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6 md:mb-14">
            <h2 id="own-title" className="t-h1">What is live<span className="text-accent">.</span></h2>
            <Link href="/portfolio" className="btn btn-quiet">All our work <Arrow /></Link>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            {projects.map((project) => <ProjectMini key={project.slug} project={project} />)}
          </div>
        </div>
      </section>

      <section data-theme="dark" aria-labelledby="place-title">
        <div className="wrap flex flex-wrap items-end justify-between gap-10 py-20 md:py-32">
          <div>
            <h2 id="place-title" className="mb-5 text-[0.9375rem] font-semibold text-fg-2">
              {site.location.city}, {site.location.country}
            </h2>
            <p className="t-display">
              Now <span className="text-accent"><LocalTime /></span>
            </p>
          </div>
          <Link href="/contact" className="btn btn-primary">
            Start a project
            <Arrow />
          </Link>
        </div>
      </section>
    </>
  )
}
