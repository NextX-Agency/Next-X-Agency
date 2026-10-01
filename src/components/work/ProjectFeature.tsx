import Link from 'next/link'
import type { Project } from '@/content/projects'
import { ArrowOut } from '@/components/Arrow'
import { ProjectCover } from './ProjectCover'
import { cn } from '@/lib/utils'

export function ProjectFeature({
  project,
  flip = false,
  headingLevel = 'h3',
  priority = false,
}: {
  project: Project
  flip?: boolean
  headingLevel?: 'h2' | 'h3'
  priority?: boolean
}) {
  const Heading = headingLevel
  const href = `/portfolio/${project.slug}`
  return (
    <article
      className={cn('project-feature', flip && 'project-feature-offset')}
      data-presentation={project.presentation}
    >
      <Link
        href={href}
        className="project-feature-image group"
        style={{
          aspectRatio: `${project.cover.width} / ${project.cover.height}`,
        }}
        aria-label={`Bekijk ${project.name}`}
      >
        <ProjectCover project={project} priority={priority} />
        <span className="project-image-link" aria-hidden="true">
          <ArrowOut />
        </span>
      </Link>
      <div className="project-feature-caption">
        <p className="meta project-index">
          {project.index} /{' '}
          {project.origin === 'studio' ? 'Eigen product' : 'Klantwerk'}
        </p>
        <div>
          <Heading className="t-h2">
            <Link href={href} className="link-line">
              {project.name}
            </Link>
          </Heading>
          <p className="meta mt-4">
            {project.type} / {project.stack ?? project.presentation}
          </p>
        </div>
        <p className="t-body">{project.summary}</p>
        <Link href={href} className="link-arrow link-line project-case-link">
          Ontdek het project <ArrowOut />
        </Link>
      </div>
    </article>
  )
}
