'use client'

import { useState } from 'react'
import { disciplines, type Discipline } from '@/content/disciplines'
import type { Project } from '@/content/projects'
import { ProjectShowcase } from './ProjectShowcase'
import { cn } from '@/lib/utils'

/**
 * The portfolio as a run of project stages. A discipline filter appears once
 * work from more than one discipline is published.
 */
export function PortfolioIndex({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<Discipline | 'all'>('all')
  const available = disciplines.filter((d) => projects.some((p) => p.discipline === d.id))
  const visible = filter === 'all' ? projects : projects.filter((p) => p.discipline === filter)

  return (
    <>
      {available.length > 1 && (
        <div role="group" aria-label="Filter werk op discipline" className="mb-12 flex flex-wrap gap-x-6 gap-y-3 md:mb-16">
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

      <div className="grid gap-20 md:gap-32" aria-live="polite">
        {visible.map((project, i) => (
          <ProjectShowcase key={project.slug} project={project} flip={i % 2 === 1} headingLevel="h3" priority={i === 0} />
        ))}
      </div>
    </>
  )
}
