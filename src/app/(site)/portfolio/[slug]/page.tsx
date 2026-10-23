import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { findProject, projects } from '@/content/projects'
import { disciplines } from '@/content/disciplines'
import { Arrow, ArrowOut } from '@/components/Arrow'
import { Reveal } from '@/components/Reveal'
import { ProjectGallery } from '@/components/work/ProjectGallery'
import { coverPosition } from '@/components/work/ProjectCover'
import { projectRelation } from '@/components/work/ProjectFeature'

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = findProject((await params).slug)
  if (!project) return {}
  return {
    title: project.seo?.title ?? project.name,
    description: project.seo?.description ?? project.summary,
    alternates: { canonical: `/portfolio/${project.slug}` },
    robots: { index: false, follow: true },
    openGraph: {
      title: `${project.name} — NextX Agency`,
      description: project.summary,
      url: `/portfolio/${project.slug}`,
      images: [
        {
          url: project.cover.src,
          width: project.cover.width,
          height: project.cover.height,
          alt: project.cover.alt,
        },
      ],
    },
  }
}

export default async function ProjectPage({ params }: Props) {
  const project = findProject((await params).slug)
  if (!project) notFound()

  const next = projects[(projects.indexOf(project) + 1) % projects.length]
  const screens = project.presentation === 'website' || project.presentation === 'software'

  const facts = [
    { label: 'Discipline', value: disciplines.find((d) => d.id === project.discipline)?.name },
    { label: 'Type', value: project.type },
    { label: 'Relatie', value: projectRelation(project) },
    ...(project.client ? [{ label: 'Opdrachtgever', value: project.client }] : []),
    ...(project.stack ? [{ label: 'Gebouwd met', value: project.stack }] : []),
    ...(project.year ? [{ label: 'Jaar', value: String(project.year) }] : []),
  ]

  const images = [...(project.gallery ?? []), ...(project.mobile ? [project.mobile] : [])]

  return (
    <article>
      <header className="wrap pb-12 pt-[calc(var(--nav-h)+3rem)] md:pb-16 md:pt-[calc(var(--nav-h)+5rem)]">
        <nav aria-label="Kruimelpad" className="meta mb-10">
          <Link href="/portfolio" className="link-line hover:text-fg">
            Concept Lab
          </Link>
          <span className="mx-2" aria-hidden="true">/</span>
          <span className="text-accent-text">Eerder werk · {project.type}</span>
        </nav>

        <div className="grid-12 gap-y-8">
          <h1 className="t-display col-span-4 md:col-span-8">{project.name}</h1>
          <dl className="col-span-4 grid grid-cols-2 gap-x-6 gap-y-4 self-end md:col-span-3 md:col-start-10 md:grid-cols-1">
            {facts.map((fact) => (
              <div key={fact.label}>
                <dt className="meta">{fact.label}</dt>
                <dd className="mt-1">{fact.value}</dd>
              </div>
            ))}
            {project.url && (
              <div>
                <dt className="meta">Live</dt>
                <dd className="mt-1">
                  <a href={project.url} target="_blank" rel="noopener noreferrer" className="link-arrow link-line">
                    {project.host ?? 'Open website'}
                    <ArrowOut />
                  </a>
                </dd>
              </div>
            )}
          </dl>
        </div>
      </header>

      <div className="wrap">
        <Reveal>
          <div className="frame aspect-[4/3] sm:aspect-[16/10]">
            <Image
              src={project.cover.src}
              alt={project.cover.alt}
              fill
              priority
              sizes="(min-width: 90rem) 84rem, 100vw"
              className={`object-cover ${coverPosition(project)}`}
            />
          </div>
        </Reveal>

        <div className="grid-12 gap-y-12 py-20 md:py-32">
          <div className="col-span-4 md:col-span-6">
            <p className="t-lead text-fg">{project.intro}</p>
            <p className="t-body mt-8 max-w-[44ch]">
              <span className="meta mr-3 text-fg">Bijdrage NextX</span>
              {project.contribution}
            </p>
          </div>

          {project.features && project.features.length > 0 && (
            <div className="col-span-4 md:col-span-5 md:col-start-8">
              <h2 className="meta mb-5">{screens ? 'Op de site' : 'In het project'}</h2>
              <ul className="border-t border-line">
                {project.features.map((feature) => (
                  <li key={feature} className="flex gap-4 border-b border-line py-3 text-[0.9375rem]">
                    <span className="mt-[.65em] h-px w-4 shrink-0 bg-accent" aria-hidden="true" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {project.video && (
          <section className="pb-20 md:pb-32" aria-labelledby="video-title">
            <h2 id="video-title" className="meta mb-5">
              {project.video.title}
            </h2>
            <div className="project-video frame">
              <video controls playsInline preload="none" poster={project.video.poster.src} aria-labelledby="video-title">
                <source src={project.video.src} />
                {project.video.captions && (
                  <track kind="captions" src={project.video.captions} srcLang="nl" label="Nederlands" default />
                )}
                Uw browser ondersteunt deze video niet. <a href={project.video.src}>Open de video</a>
              </video>
            </div>
          </section>
        )}

        {images.length > 0 && (
          <section className="pb-[var(--section)]" aria-label="Beelden van het project">
            <ProjectGallery images={images} layout={project.presentation === 'photography' ? 'album' : 'editorial'} />
          </section>
        )}
      </div>

      {next && next.slug !== project.slug && (
        <Link href={`/portfolio/${next.slug}`} data-theme="dark" className="group block">
          <div className="wrap flex flex-wrap items-end justify-between gap-6 py-16 md:py-24">
            <div>
              <p className="meta mb-4">Volgend project</p>
              <p className="t-h1 transition-transform duration-500 ease-[var(--ease)] group-hover:translate-x-3">{next.name}</p>
            </div>
            <Arrow className="mb-3 h-5 w-8 text-accent" />
          </div>
        </Link>
      )}
    </article>
  )
}
