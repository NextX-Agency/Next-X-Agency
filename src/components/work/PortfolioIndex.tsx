'use client'

import { useState } from 'react'
import { disciplines, type Discipline } from '@/content/disciplines'
import type { Project } from '@/content/projects'
import { ProjectFeature } from './ProjectFeature'

export function PortfolioIndex({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<Discipline | 'all'>('all')
  const available = disciplines.filter((d) =>
    projects.some((p) => p.discipline === d.id),
  )
  const visible =
    filter === 'all'
      ? projects
      : projects.filter((p) => p.discipline === filter)
  return (
    <>
      {available.length > 1 && (
        <div
          className="portfolio-filters"
          role="group"
          aria-label="Filter werk op discipline"
        >
          <button
            type="button"
            aria-pressed={filter === 'all'}
            onClick={() => setFilter('all')}
          >
            Alle projecten
          </button>
          {available.map((d) => (
            <button
              key={d.id}
              type="button"
              aria-pressed={filter === d.id}
              onClick={() => setFilter(d.id)}
            >
              {d.name}
            </button>
          ))}
        </div>
      )}
      <div className="selected-work" aria-live="polite">
        {visible.map((project, i) => (
          <ProjectFeature
            key={project.slug}
            project={project}
            flip={i % 2 === 1}
            headingLevel="h2"
            priority={i === 0}
          />
        ))}
      </div>
    </>
  )
}
