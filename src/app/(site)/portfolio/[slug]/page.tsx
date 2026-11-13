import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { findProject, projects } from '@/content/projects'
import { ArrowOut } from '@/components/Arrow'
import { Parallax } from '@/components/Parallax'
import { ProjectGallery } from '@/components/work/ProjectGallery'
import { ProjectMini, projectRelation, toneStyle, toneTheme } from '@/components/work/ProjectShowcase'
import { BrowserFrame, PhoneFrame } from '@/components/work/DeviceFrames'
import { site } from '@/content/site'

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

  const others = projects.filter((item) => item.slug !== project.slug)
  const screens = project.presentation === 'website' || project.presentation === 'software'

  const facts = [
    projectRelation(project),
    ...(project.client ? [project.client] : []),
    ...(project.stack ? [project.stack] : []),
    ...(project.year ? [String(project.year)] : []),
  ]

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.name,
    description: project.summary,
    url: `${site.url}/portfolio/${project.slug}`,
    image: `${site.url}${project.cover.src}`,
    creator: { '@type': 'Organization', name: site.name, url: site.url },
    ...(project.url ? { sameAs: project.url } : {}),
  }

  // The phone view sits in the hero for screen projects, so the gallery holds the other views.
  const images = [...(project.gallery ?? []), ...(project.mobile && !screens ? [project.mobile] : [])]

  return (
    <article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <header data-theme={toneTheme(project)} className="nx-stage" style={toneStyle(project)}>
        <div className="wrap">
          <div className="nx-stage-head !pt-[calc(var(--nav-h)+3.5rem)] md:!pt-[calc(var(--nav-h)+6rem)]">
            <div>
              <p className="nx-stage-kind">
                <Link href="/portfolio" className="link-line">Werk</Link> / {project.type}
              </p>
              <h1 className="nx-stage-name">{project.name}</h1>
            </div>
            <div>
              <p className="nx-stage-line">{project.tagline}</p>
              {project.url && (
                <div className="nx-stage-actions">
                  <a href={project.url} target="_blank" rel="noopener noreferrer" className="btn nx-stage-btn">
                    Bekijk live
                    <ArrowOut />
                  </a>
                </div>
              )}
            </div>
          </div>
          <div className="nx-stage-devices">
            <Parallax className="nx-stage-browser" distance={50}>
              <BrowserFrame label={project.host}>
                <Image src={project.cover.src} alt={project.cover.alt} fill priority sizes="(min-width: 90rem) 66rem, (min-width: 48rem) 74vw, 88vw" className="object-cover object-top" />
              </BrowserFrame>
            </Parallax>
            {screens && project.mobile && (
              <Parallax className="nx-stage-phone" distance={150}>
                <PhoneFrame>
                  <Image src={project.mobile.src} alt={project.mobile.alt} fill sizes="(min-width: 90rem) 14rem, (min-width: 48rem) 16vw, 27vw" className="object-cover object-top" />
                </PhoneFrame>
              </Parallax>
            )}
          </div>
        </div>
      </header>

      <div className="wrap">
        <div className="grid-12 gap-y-12 py-[var(--section)]">
          <div className="col-span-4 md:col-span-6">
            <p className="text-[1.0625rem] leading-relaxed md:text-[1.375rem] md:leading-snug md:tracking-[-0.015em]">{project.intro}</p>
            <ul className="mt-8 flex flex-wrap gap-2">
              {facts.map((fact) => <li key={fact} className="bg-bg-2 px-3 py-2 text-[0.875rem] font-semibold">{fact}</li>)}
            </ul>
          </div>

          {project.features && project.features.length > 0 && (
            <div className="col-span-4 md:col-span-5 md:col-start-8">
              <h2 className="t-h3 mb-5">{screens ? 'Op de site' : 'In het project'}</h2>
              <ul className="nx-dots">
                {project.features.map((feature) => <li key={feature}>{feature}</li>)}
              </ul>
            </div>
          )}
        </div>

        {project.video && (
          <section className="pb-20 md:pb-32" aria-labelledby="video-title">
            <h2 id="video-title" className="t-h3 mb-5">
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

      {others.length > 0 && (
        <section data-theme="dark" className="section" aria-labelledby="more-title">
          <div className="wrap">
            <h2 id="more-title" className="t-h1 mb-10 md:mb-14">Meer werk<span className="text-accent">.</span></h2>
            <div className="grid gap-3 md:grid-cols-2">
              {others.slice(0, 2).map((item) => <ProjectMini key={item.slug} project={item} />)}
            </div>
          </div>
        </section>
      )}
    </article>
  )
}
