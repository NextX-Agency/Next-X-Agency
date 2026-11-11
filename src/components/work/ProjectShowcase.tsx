import Image from 'next/image'
import Link from 'next/link'
import type { Project } from '@/content/projects'
import { Arrow, ArrowOut } from '@/components/Arrow'
import { Reveal } from '@/components/Reveal'
import { BrowserFrame, PhoneFrame } from './DeviceFrames'
import { cn } from '@/lib/utils'

/** Eigen product, or the client relation, for the small caption above a title. */
export function projectRelation(project: Project) {
  return project.relation ?? (project.origin === 'studio' ? 'Eigen product' : 'Klantproject')
}

export function toneStyle(project: Project) {
  return { '--tone-bg': project.tone.bg, '--tone-fg': project.tone.fg } as React.CSSProperties
}

/** Lets the header and controls switch to light-on-dark over a dark project colour. */
export function toneTheme(project: Project) {
  return project.tone.dark ? 'dark' : 'light'
}

/**
 * One project as a full-width stage in its own brand colour: the name very
 * large, the live site in a browser frame and its phone view beside it.
 * Alternate projects mirror the devices.
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
    <article data-theme={toneTheme(project)} className={cn('nx-stage', flip && 'nx-stage-flip')} style={toneStyle(project)} aria-labelledby={`${project.slug}-title`}>
      <div className="wrap">
        <Reveal className="nx-stage-head">
          <div>
            <p className="nx-stage-kind">{project.type} · {projectRelation(project)}</p>
            <Heading id={`${project.slug}-title`} className="nx-stage-name">
              <Link href={href}>{project.name}</Link>
            </Heading>
          </div>
          <div>
            <p className="nx-stage-line">{project.tagline}</p>
            <div className="nx-stage-actions">
              <Link href={href} className="btn nx-stage-btn" aria-label={`Bekijk het project ${project.name}`}>
                Bekijk project
                <Arrow />
              </Link>
              {project.url && (
                <a href={project.url} target="_blank" rel="noopener noreferrer" className="link-arrow link-line py-1" aria-label={`${project.host ?? project.name}, opent in een nieuw tabblad`}>
                  Live
                  <ArrowOut />
                </a>
              )}
            </div>
          </div>
        </Reveal>

        <Link href={href} className="nx-stage-devices" tabIndex={-1} aria-hidden="true">
          <BrowserFrame label={project.host} className="nx-stage-browser">
            <Image src={project.cover.src} alt="" fill priority={priority} sizes="(min-width: 90rem) 66rem, (min-width: 48rem) 74vw, 88vw" className="object-cover object-top" />
          </BrowserFrame>
          {project.mobile && (
            <PhoneFrame className="nx-stage-phone">
              <Image src={project.mobile.src} alt="" fill sizes="(min-width: 90rem) 14rem, (min-width: 48rem) 16vw, 27vw" className="object-cover object-top" />
            </PhoneFrame>
          )}
        </Link>
      </div>
    </article>
  )
}

/** A project as a small coloured tile, for "next project" rows and overviews. */
export function ProjectMini({ project, className }: { project: Project; className?: string }) {
  return (
    <Link href={`/portfolio/${project.slug}`} data-theme={toneTheme(project)} className={cn('nx-stage-mini', className)} style={toneStyle(project)}>
      <span>
        <span className="mb-2 block text-[0.8125rem] font-semibold opacity-75">{project.type}</span>
        <strong>{project.name}</strong>
      </span>
      <BrowserFrame label={project.host}>
        <Image src={project.cover.src} alt="" fill sizes="(min-width: 48rem) 30vw, 90vw" className="object-cover object-top" />
      </BrowserFrame>
    </Link>
  )
}
