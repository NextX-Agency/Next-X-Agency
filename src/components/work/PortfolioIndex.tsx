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
        <div role="group" aria-label="Filter werk op discipline" className="wrap flex flex-wrap gap-x-6 gap-y-3 py-8">
          {[{ id: 'all' as const, name: 'Alles' }, ...available].map((d) => (
            <button
              key={d.id}
              type="button"
              aria-pressed={filter === d.id}
              onClick={() => setFilter(d.id)}
              className={cn('min-h-11 px-4 text-[0.9375rem] font-semibold transition-colors', filter === d.id ? 'bg-fg text-bg' : 'bg-bg-2 hover:bg-fg hover:text-bg')}
            >
              {d.name}
            </button>
          ))}
        </div>
      )}

      <div aria-live="polite">
        {visible.map((project, i) => (
          <ProjectShowcase key={project.slug} project={project} flip={i % 2 === 1} headingLevel="h2" priority={i === 0} />
        ))}
      </div>
    </>
  )
}
