import Image from 'next/image'
import type { Project } from '@/content/projects'

/** Covers preserve the featured media; a phone preview is a separate optional asset. */
export function ProjectCover({
  project,
  priority = false,
}: {
  project: Project
  priority?: boolean
}) {
  return (
    <Image
      src={project.cover.src}
      alt={project.cover.alt}
      fill
      priority={priority}
      sizes="(min-width: 1440px) 900px, (min-width: 768px) 65vw, 100vw"
      className="object-contain"
    />
  )
}
