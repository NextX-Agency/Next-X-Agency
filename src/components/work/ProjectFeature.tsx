import Image from 'next/image'
import Link from 'next/link'
import type { Project } from '@/content/projects'
import { Arrow } from '@/components/Arrow'
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
    >
      <Link
        href={href}
        className="project-feature-image group"
        style={
          project.presentation === 'website' ||
          project.presentation === 'software'
            ? undefined
            : {
                aspectRatio: `${project.cover.width} / ${project.cover.height}`,
              }
        }
        aria-label={`Bekijk ${project.name}`}
      >
        <ProjectCover project={project} priority={priority} />
        {project.mobile && (
          <div className="project-phone">
            <Image
              src={project.mobile.src}
              alt=""
              fill
              sizes="(min-width: 768px) 14vw, 25vw"
              className="object-cover object-top"
            />
          </div>
        )}
      </Link>
      <div className="project-feature-caption">
        <div>
          <p className="meta mb-2">
            {project.type}
            {project.origin === 'studio' ? ' / Eigen product' : ''}
          </p>
          <Heading className="t-h2">
            <Link href={href} className="link-line">
              {project.name}
            </Link>
          </Heading>
        </div>
        <div>
          <p className="t-body max-w-[38ch]">{project.summary}</p>
          <Link href={href} className="link-arrow link-line mt-4">
            Bekijk project <Arrow />
          </Link>
        </div>
      </div>
    </article>
  )
}
