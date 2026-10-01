import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { findProject, projects } from '@/content/projects'
import { disciplines } from '@/content/disciplines'
import { Arrow, ArrowOut } from '@/components/Arrow'
import { ProjectGallery } from '@/components/work/ProjectGallery'

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
    openGraph: {
      title: project.name + ' · NextX Agency',
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
  const facts = [
    {
      label: 'Discipline',
      value: disciplines.find((d) => d.id === project.discipline)?.name,
    },
    { label: 'Project', value: project.type },
    { label: 'Bijdrage', value: project.contribution },
    ...(project.origin === 'studio'
      ? [{ label: 'Oorsprong', value: 'Eigen product' }]
      : []),
    ...(project.client
      ? [{ label: 'Opdrachtgever', value: project.client }]
      : []),
    ...(project.stack ? [{ label: 'Techniek', value: project.stack }] : []),
    ...(project.year ? [{ label: 'Jaar', value: project.year }] : []),
  ]
  const images = [
    ...(project.gallery ?? []),
    ...(project.mobile ? [project.mobile] : []),
  ]
  return (
    <article>
      <header className="wrap project-heading">
        <Link href="/portfolio" className="meta link-line">
          ← Terug naar het werk
        </Link>
        <div className="project-opening">
          <div>
            <p className="meta">
              {project.index} / {project.type} /{' '}
              {project.origin === 'studio' ? 'Eigen product' : 'Klantwerk'}
            </p>
            <h1>{project.name}</h1>
          </div>
          <p className="t-lead">{project.summary}</p>
        </div>
        <div className="project-contribution">
          <p className="meta">Bijdrage van NextX</p>
          <p>{project.contribution}</p>
        </div>
      </header>
      <div className="wrap">
        <Image
          className="project-main-image"
          src={project.cover.src}
          alt={project.cover.alt}
          width={project.cover.width}
          height={project.cover.height}
          priority
          sizes="(min-width: 1440px) 1344px, 100vw"
        />
        <div className="project-story">
          <div>
            <h2 className="t-h2">
              Het idee en
              <br />
              de uitvoering.
            </h2>
            <p className="t-lead mt-6">{project.intro}</p>
            {project.features?.length ? (
              <div className="mt-10">
                <h3 className="meta mb-4">In het product</h3>
                <ul className="project-features">
                  {project.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
          <dl>
            {facts.map((fact) => (
              <div key={fact.label}>
                <dt className="meta">{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
            {project.url && (
              <div>
                <dt className="meta">Bekijk live</dt>
                <dd>
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-arrow link-line"
                  >
                    {project.host ?? 'Open website'} <ArrowOut />
                  </a>
                </dd>
              </div>
            )}
          </dl>
        </div>
        {project.video && (
          <section className="project-video" aria-label={project.video.title}>
            <h2 className="t-h3 mb-5">{project.video.title}</h2>
            <video
              controls
              playsInline
              preload="none"
              poster={project.video.poster.src}
              aria-label={project.video.title}
            >
              {<source src={project.video.src} />}
              {project.video.captions && (
                <track
                  kind="captions"
                  src={project.video.captions}
                  srcLang="nl"
                  label="Nederlands"
                  default
                />
              )}
              Uw browser ondersteunt deze video niet.{' '}
              <a href={project.video.src}>Open de video</a>
            </video>
          </section>
        )}
        {images.length > 0 && (
          <div className="gallery-heading">
            <h2 className="t-h3">Het werk in beeld</h2>
            <p className="meta">
              {project.presentation === 'website' ||
              project.presentation === 'software'
                ? 'Desktop & mobiel'
                : 'Projectbeelden'}{' '}
              / {images.length} beelden
            </p>
          </div>
        )}
        <ProjectGallery
          images={images}
          layout={
            project.presentation === 'photography' ? 'album' : 'editorial'
          }
        />
      </div>
      {next && next.slug !== project.slug && (
        <Link href={`/portfolio/${next.slug}`} className="next-project group">
          <div className="wrap">
            <span className="meta">Volgend project</span>
            <div>
              <p className="t-h1">{next.name}</p>
              <Arrow />
            </div>
          </div>
        </Link>
      )}
    </article>
  )
}
