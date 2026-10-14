'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { disciplines, type Discipline } from '@/content/disciplines'
import type { Project } from '@/content/projects'
import { Arrow, ArrowOut } from '@/components/Arrow'
import { Reveal } from '@/components/Reveal'
import { ProjectCover, coverPosition } from './ProjectCover'
import { CoverReveal } from './CoverReveal'
import { projectRelation } from './ProjectFeature'
import { cn } from '@/lib/utils'

/**
 * The portfolio as a run of large compositions: the cover across the full
 * width, the caption on the grid beneath it and two further views offset
 * against each other. A discipline filter appears once work from more than
 * one discipline is published.
 */
export function PortfolioIndex({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<Discipline | 'all'>('all')
  const available = disciplines.filter((d) => projects.some((p) => p.discipline === d.id))
  const visible = filter === 'all' ? projects : projects.filter((p) => p.discipline === filter)

  return (
    <>
      {available.length > 1 && (
        <div role="group" aria-label="Filter werk op discipline" className="wrap -mt-4 mb-16 flex flex-wrap gap-x-6 gap-y-3 md:mb-24">
          {[{ id: 'all' as const, name: 'Alles' }, ...available].map((d) => (
            <button
              key={d.id}
              type="button"
              aria-pressed={filter === d.id}
              onClick={() => setFilter(d.id)}
              className={cn('meta link-line min-h-11 py-1', filter === d.id ? 'text-fg [background-size:100%_1px]' : 'hover:text-fg')}
            >
              {d.name}
            </button>
          ))}
        </div>
      )}

      <div className="wrap grid gap-28 pb-[var(--section)] md:gap-44" aria-live="polite">
        {visible.map((project, i) => (
          <article key={project.slug} aria-labelledby={`${project.slug}-title`}>
            <Link href={`/portfolio/${project.slug}`} className="group block" tabIndex={-1} aria-hidden="true">
              <CoverReveal className="aspect-[4/5] sm:aspect-[4/3] md:aspect-[16/9]">
                <ProjectCover project={project} priority={i === 0} />
              </CoverReveal>
            </Link>

            <div className="grid-12 mt-6 gap-y-5 md:mt-8">
              <p className="meta col-span-4 flex flex-wrap gap-x-3 gap-y-1 md:col-span-2">
                <span className="text-accent-text">{project.index}</span>
                <span>{project.type}</span>
                <span className="md:hidden">{projectRelation(project)}</span>
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
                  {project.url && (
                    <a href={project.url} target="_blank" rel="noopener noreferrer" className="link-arrow text-fg-2 hover:text-fg">
                      {project.host ?? 'Live'}
                      <ArrowOut />
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Two further views, offset against each other */}
            {project.gallery && project.gallery.length > 0 && (
              <div className="grid-12 mt-12 hidden gap-y-6 md:grid">
                {project.gallery.slice(0, 2).map((image, j) => (
                  <Reveal
                    key={image.src}
                    delay={j * 0.08}
                    className={cn(j === 0 ? 'col-span-7' : 'col-span-4 col-start-9 mt-24')}
                  >
                    <div className="frame aspect-[16/10]">
                      <Image src={image.src} alt={image.alt} fill sizes="50vw" className={cn('object-cover', coverPosition(project))} />
                    </div>
                  </Reveal>
                ))}
              </div>
            )}
          </article>
        ))}
      </div>
    </>
  )
}
