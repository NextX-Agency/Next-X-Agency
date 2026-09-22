import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { findProject, projects } from '@/content/projects'
import { Arrow, ArrowOut } from '@/components/Arrow'
import { Reveal } from '@/components/Reveal'
import { cn } from '@/lib/utils'

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = findProject((await params).slug)
  if (!project) return {}
  return {
    title: project.name,
    description: project.summary,
    alternates: { canonical: `/portfolio/${project.slug}` },
    openGraph: {
      title: `${project.name} — NextX Agency`,
      url: `/portfolio/${project.slug}`,
      images: [{ url: project.cover.src, width: project.cover.width, height: project.cover.height }],
    },
  }
}

export default async function ProjectPage({ params }: Props) {
  const project = findProject((await params).slug)
  if (!project) notFound()

  const index = projects.indexOf(project)
  const next = projects[(index + 1) % projects.length]

  const facts = [
    { label: 'Type', value: project.type },
    ...(project.relation ? [{ label: 'Relatie', value: project.relation }] : []),
    { label: 'Gebouwd met', value: project.stack },
  ]

  return (
    <article>
      <header className="wrap pb-12 pt-[calc(var(--nav-h)+3rem)] md:pb-16 md:pt-[calc(var(--nav-h)+5rem)]">
        <nav aria-label="Kruimelpad" className="meta mb-10">
          <Link href="/portfolio" className="link-line hover:text-fg">
            Werk
          </Link>
          <span className="mx-2" aria-hidden="true">/</span>
          <span className="text-accent-text">{project.index}</span>
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
            <div>
              <dt className="meta">Live</dt>
              <dd className="mt-1">
                <a href={project.url} target="_blank" rel="noopener noreferrer" className="link-arrow link-line">
                  {project.host}
                  <ArrowOut />
                </a>
              </dd>
            </div>
          </dl>
        </div>
      </header>

      <div className="wrap">
        <Reveal>
          <div className="frame aspect-[16/10]">
            <Image
              src={project.cover.src}
              alt={project.cover.alt}
              fill
              priority
              sizes="(min-width: 90rem) 84rem, 100vw"
              className="object-cover object-top"
            />
          </div>
        </Reveal>

        <div className="grid-12 gap-y-12 py-20 md:py-32">
          <p className="t-lead col-span-4 text-fg md:col-span-6">{project.intro}</p>

          <div className="col-span-4 md:col-span-5 md:col-start-8">
            <h2 className="meta mb-5">Op de site</h2>
            <ol className="border-t border-line">
              {project.features.map((feature, i) => (
                <li key={feature} className="flex gap-4 border-b border-line py-3 text-[0.9375rem]">
                  <span className="meta pt-0.5">{String(i + 1).padStart(2, '0')}</span>
                  {feature}
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="grid-12 gap-y-10 pb-[var(--section)] md:gap-y-24">
          {project.gallery.map((image, i) => (
            <Reveal
              key={image.src}
              className={cn(
                'col-span-4',
                i === 0 && 'md:col-span-8',
                i > 0 && i % 2 === 1 && 'md:col-span-8 md:col-start-5',
                i > 0 && i % 2 === 0 && 'md:col-span-8 md:col-start-1'
              )}
            >
              <figure>
                <div className="frame aspect-[16/10]">
                  <Image src={image.src} alt={image.alt} fill sizes="(min-width: 48rem) 66vw, 100vw" className="object-cover object-top" />
                </div>
                <figcaption className="meta mt-3">{image.alt}</figcaption>
              </figure>
            </Reveal>
          ))}

          {/* The phone view sits beside the first desktop view */}
          <Reveal delay={0.1} className="col-span-2 row-start-2 md:col-span-3 md:col-start-10 md:row-start-1 md:mt-24">
            <figure>
              <div className="frame aspect-[430/932]">
                <Image src={project.mobile.src} alt={project.mobile.alt} fill sizes="(min-width: 48rem) 20vw, 50vw" className="object-cover object-top" />
              </div>
              <figcaption className="meta mt-3">Mobiel</figcaption>
            </figure>
          </Reveal>
        </div>
      </div>

      <Link href={`/portfolio/${next.slug}`} data-theme="dark" className="group block">
        <div className="wrap flex flex-wrap items-end justify-between gap-6 py-16 md:py-24">
          <div>
            <p className="meta mb-4">Volgend project</p>
            <p className="t-h1 transition-transform duration-500 ease-[var(--ease)] group-hover:translate-x-3">{next.name}</p>
          </div>
          <Arrow className="mb-3 h-5 w-8 text-accent" />
        </div>
      </Link>
    </article>
  )
}
