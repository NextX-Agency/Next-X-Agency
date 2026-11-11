import Image from 'next/image'
import Link from 'next/link'
import type { Project } from '@/content/projects'
import { Arrow, ArrowOut } from '@/components/Arrow'
import { Reveal } from '@/components/Reveal'
import { BrowserFrame, PhoneFrame } from './DeviceFrames'
import { cn } from '@/lib/utils'

/** Eigen product, or the client relation, for the small caption beside a title. */
export function projectRelation(project: Project) {
  return project.relation ?? (project.origin === 'studio' ? 'Eigen product' : 'Klantproject')
}

/**
 * A real project as a stage: the live site in a browser frame, its phone view
 * beside it, and the facts on the grid beneath. Alternate projects mirror the
 * composition. Projects without a phone screenshot show the browser alone.
 */
export function ProjectShowcase({
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
    <article className={cn('nx-work', flip && 'nx-work-flip')} aria-labelledby={`${project.slug}-title`}>
      <Reveal>
        <Link href={href} className="nx-work-stage" tabIndex={-1} aria-hidden="true">
          <BrowserFrame label={project.host} className="nx-work-browser">
            <Image
              src={project.cover.src}
              alt=""
              fill
              priority={priority}
              sizes="(min-width: 90rem) 60rem, (min-width: 48rem) 68vw, 80vw"
              className="object-cover object-top"
            />
          </BrowserFrame>
          {project.mobile && (
            <PhoneFrame className="nx-work-phone">
              <Image
                src={project.mobile.src}
                alt=""
                fill
                sizes="(min-width: 90rem) 13rem, (min-width: 48rem) 15vw, 25vw"
                className="object-cover object-top"
              />
            </PhoneFrame>
          )}
          <span className="nx-label">
            {projectRelation(project)}
            {project.url && ' · live'}
          </span>
        </Link>
      </Reveal>

      <div className="grid-12 mt-6 gap-y-4 md:mt-8">
        <p className="meta col-span-4 flex gap-x-4 md:col-span-2 md:flex-col md:gap-y-2">
          <span className="text-accent-text">{project.index}</span>
          <span>{project.type}</span>
        </p>
        <Heading id={`${project.slug}-title`} className="t-h2 col-span-4 md:col-span-5">
          <Link href={href} className="link-line">
            {project.name}
          </Link>
        </Heading>
        <div className="col-span-4 md:col-span-4 md:col-start-9">
          <p className="t-body max-w-[42ch]">{project.summary}</p>
          <div className="mt-5 flex flex-wrap gap-x-7 gap-y-2">
            <Link href={href} className="link-arrow link-line py-1" aria-label={`Bekijk het project ${project.name}`}>
              Bekijk project
              <Arrow />
            </Link>
            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="link-arrow py-1 text-fg-2 transition-colors hover:text-fg"
                aria-label={`${project.host ?? project.name}, opent in een nieuw tabblad`}
              >
                {project.host ?? 'Live'}
                <ArrowOut />
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}
