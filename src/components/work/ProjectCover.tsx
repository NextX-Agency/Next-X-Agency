import Image from 'next/image'
import type { Project } from '@/content/projects'

/**
 * The cover image for a project. Phones get the site's own phone screenshot,
 * larger screens the desktop one, so each visitor sees the work as it looks
 * on the device in their hand.
 */
export function ProjectCover({ project, priority = false }: { project: Project; priority?: boolean }) {
  return (
    <>
      <Image
        src={project.mobile.src}
        alt=""
        fill
        priority={priority}
        sizes="100vw"
        className="object-cover object-top sm:hidden"
      />
      <Image
        src={project.cover.src}
        alt=""
        fill
        priority={priority}
        sizes="(min-width: 90rem) 84rem, 100vw"
        className="hidden object-cover object-top sm:block"
      />
    </>
  )
}
