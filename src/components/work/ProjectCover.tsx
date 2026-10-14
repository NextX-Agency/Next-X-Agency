import Image, { getImageProps } from 'next/image'
import type { Project } from '@/content/projects'

/** Screens are anchored to their top edge; photography and other media to the centre. */
export function coverPosition(project: Project) {
  return project.presentation === 'website' || project.presentation === 'software' ? 'object-top' : 'object-center'
}

const desktopSizes = '(min-width: 90rem) 84rem, 100vw'

/**
 * The cover image for a project. When a project has its own phone screenshot,
 * phones get that one and larger screens the desktop cover, so each visitor
 * sees the work as it looks on the device in their hand. Art direction runs
 * through one <picture>, so only the image a visitor sees is downloaded.
 */
export function ProjectCover({ project, priority = false }: { project: Project; priority?: boolean }) {
  const position = coverPosition(project)
  const { cover, mobile } = project

  if (!mobile) {
    return (
      <Image
        src={cover.src}
        alt=""
        fill
        priority={priority}
        sizes={desktopSizes}
        className={`object-cover ${position}`}
      />
    )
  }

  const {
    props: { srcSet: desktopSet },
  } = getImageProps({ src: cover.src, alt: '', width: cover.width, height: cover.height, sizes: desktopSizes })
  const {
    props: { srcSet: phoneSet, ...phone },
  } = getImageProps({ src: mobile.src, alt: '', width: mobile.width, height: mobile.height, sizes: '100vw', priority })

  return (
    <picture>
      <source media="(min-width: 40rem)" srcSet={desktopSet} sizes={desktopSizes} />
      {/* eslint-disable-next-line jsx-a11y/alt-text -- alt comes from getImageProps */}
      <img
        {...phone}
        srcSet={phoneSet}
        className={`absolute inset-0 size-full object-cover object-top ${position === 'object-center' ? 'sm:object-center' : ''}`}
      />
    </picture>
  )
}
