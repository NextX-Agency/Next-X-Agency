import Image from 'next/image'
import Link from 'next/link'
import type { Project } from '@/content/projects'
import { Arrow, ArrowOut } from '@/components/Arrow'
import { Reveal } from '@/components/Reveal'
import { ProjectCover } from './ProjectCover'
import { CoverReveal } from './CoverReveal'
import { cn } from '@/lib/utils'

/**
 * A project as a composition rather than a card: the desktop screenshot runs
 * large across most of the grid, a second view (the phone, or another page)
 * sits small in the remaining columns with the caption beneath it. Alternate
 * projects mirror the layout.
 */
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
  const secondary = flip ? project.gallery[0] : project.mobile

  return (
    <article className="grid-12 gap-y-6 md:items-end">
      <div
        className={cn(
          'col-span-4 md:col-span-8 md:row-span-2',
          flip ? 'md:col-start-5 md:row-start-1' : 'md:col-start-1'
        )}
      >
        <Link href={href} className="group block" tabIndex={-1} aria-hidden="true">
          <CoverReveal className="aspect-[4/5] sm:aspect-[16/10]">
            <ProjectCover project={project} priority={priority} />
          </CoverReveal>
        </Link>
      </div>

      <Reveal
        delay={0.1}
        className={cn(
          'col-span-4 grid grid-cols-[minmax(0,7rem)_1fr] items-end gap-5 md:col-span-3 md:grid-cols-1 md:gap-8 md:row-start-1 md:self-stretch md:content-between',
          flip ? 'md:col-start-1' : 'md:col-start-10'
        )}
      >
        <div
          className={cn(
            'frame hidden xs:block',
            flip ? 'aspect-[16/10] xs:col-span-2 md:col-span-1' : 'aspect-[430/932] w-full max-w-[7rem] md:max-w-[9.5rem]'
          )}
        >
          <Image
            src={secondary.src}
            alt=""
            fill
            sizes="(min-width: 48rem) 20vw, 30vw"
            className="object-cover object-top"
          />
        </div>

        <div className={cn('col-span-2 md:col-span-1', !flip && 'xs:col-span-1 md:col-span-1')}>
          <p className="meta mb-4 flex gap-3">
            <span className="text-accent-text">{project.index}</span>
            <span>{project.type}</span>
            {project.relation && <span>{project.relation}</span>}
          </p>
          <Heading className="t-h3">
            <Link href={href} className="link-line">
              {project.name}
            </Link>
          </Heading>
          <p className="t-small mt-3 max-w-[32ch]">{project.summary}</p>
          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-[0.9375rem]">
            <Link href={href} className="link-arrow">
              Bekijk project
              <Arrow />
            </Link>
            <a href={project.url} target="_blank" rel="noopener noreferrer" className="link-arrow text-fg-2 hover:text-fg">
              {project.host}
              <ArrowOut />
            </a>
          </div>
        </div>
      </Reveal>
    </article>
  )
}
