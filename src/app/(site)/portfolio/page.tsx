import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { projects } from '@/content/projects'
import { examples } from '@/content/examples'
import { Arrow, ArrowOut } from '@/components/Arrow'
import { Reveal } from '@/components/Reveal'
import { ProjectCover } from '@/components/work/ProjectCover'
import { CoverReveal } from '@/components/work/CoverReveal'
import { ClosingCTA } from '@/components/ClosingCTA'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Werk',
  description:
    'Projecten van NextX: Shop NextX, een webshop voor audio en horloges, en de website van Indef Design & Construction.',
  alternates: { canonical: '/portfolio' },
  openGraph: { title: 'Werk — NextX Agency', url: '/portfolio' },
}

export default function WorkPage() {
  return (
    <>
      <header className="wrap flex flex-wrap items-end justify-between gap-6 pb-12 pt-[calc(var(--nav-h)+4rem)] md:pb-20 md:pt-[calc(var(--nav-h)+7rem)]">
        <h1 className="t-display">Werk</h1>
        <p className="meta max-w-[26ch] md:text-right">Klantwerk en eigen producten. Alles staat live.</p>
      </header>

      <div className="wrap grid gap-28 pb-[var(--section)] md:gap-44">
        {projects.map((project, i) => (
          <article key={project.slug} aria-labelledby={`${project.slug}-title`}>
            <Link href={`/portfolio/${project.slug}`} className="group block" tabIndex={-1} aria-hidden="true">
              <CoverReveal className="aspect-[4/5] sm:aspect-[4/3] md:aspect-[16/9]">
            <ProjectCover project={project} priority={i === 0} />
          </CoverReveal>
            </Link>

            <div className="grid-12 mt-6 gap-y-5 md:mt-8">
              <p className="meta col-span-4 flex gap-3 md:col-span-2">
                <span className="text-accent-text">{project.index}</span>
                <span>{project.type}</span>
              </p>
              <h2 id={`${project.slug}-title`} className="t-h2 col-span-4 md:col-span-5">
                <Link href={`/portfolio/${project.slug}`} className="link-line">
                  {project.name}
                </Link>
              </h2>
              <div className="col-span-4 md:col-span-4 md:col-start-9">
                <p className="t-body max-w-[40ch]">{project.summary}</p>
                <div className="mt-5 flex flex-wrap gap-x-7 gap-y-2">
                  <Link href={`/portfolio/${project.slug}`} className="link-arrow link-line">
                    Bekijk project
                    <Arrow />
                  </Link>
                  <a href={project.url} target="_blank" rel="noopener noreferrer" className="link-arrow text-fg-2 hover:text-fg">
                    {project.host}
                    <ArrowOut />
                  </a>
                </div>
              </div>
            </div>

            {/* Two further views, offset against each other */}
            <div className="grid-12 mt-12 hidden gap-y-6 md:grid">
              {project.gallery.slice(0, 2).map((image, j) => (
                <Reveal
                  key={image.src}
                  delay={j * 0.08}
                  className={cn(j === 0 ? 'col-span-7' : 'col-span-4 col-start-9 mt-24')}
                >
                  <div className="frame aspect-[16/10]">
                    <Image src={image.src} alt={image.alt} fill sizes="50vw" className="object-cover object-top" />
                  </div>
                </Reveal>
              ))}
            </div>
          </article>
        ))}
      </div>

      <section data-theme="dark" className="section" aria-labelledby="lab-title">
        <div className="wrap grid-12 gap-y-10">
          <div className="col-span-4 md:col-span-5">
            <p className="meta mb-5">Voorbeelden</p>
            <h2 id="lab-title" className="t-h2">
              Concepten voor verzonnen bedrijven
            </h2>
            <p className="t-body mt-5 max-w-[40ch]">
              Werkende prototypes die laten zien wat een pakket oplevert. De bedrijven bestaan niet, de interfaces werken wel.
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

      <ClosingCTA />
    </>
  )
}
