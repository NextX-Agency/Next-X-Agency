'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  fadeInUp,
  staggerContainerFast,
  clipRevealUp,
} from '@/lib/animationUtils'

const featured = [
  {
    index: '01',
    title: 'Shop NextX',
    category: 'E-Commerce',
    description:
      'Webshop met productoverzicht, winkelwagen en een korte checkout voor de Surinaamse markt.',
    tags: ['E-Commerce', 'Webshop', 'Next.js'],
    href: 'https://www.shop-nextx.com/',
  },
  {
    index: '02',
    title: 'Indef Design',
    category: 'Portfolio Website',
    description:
      'Portfolio voor een designstudio waarin projecten en contact rustig naast elkaar staan.',
    tags: ['Portfolio', 'Web Design', 'Branding'],
    href: 'https://www.indefdesign.com/',
  },
] as const

export function PortfolioSection() {
  return (
    <section className="py-28 lg:py-40 bg-background">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          variants={staggerContainerFast}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="mb-20"
        >
          <motion.div
            variants={fadeInUp}
            className="register mb-10"
          >
            <span className="meta text-foreground">Ons werk</span>
            <span className="meta text-muted-foreground">§ 03</span>
          </motion.div>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <div className="overflow-hidden">
                <motion.h2
                  variants={clipRevealUp}
                  className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[0.95]"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  Recente
                </motion.h2>
              </div>
              <div className="overflow-hidden">
                <motion.h2
                  variants={clipRevealUp}
                  className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-primary leading-[0.95]"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  Projecten.
                </motion.h2>
              </div>
            </div>

            <motion.p
              variants={fadeInUp}
              className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-sm"
            >
              Van webshops tot restaurant sites — elk project gebouwd met zorg,
              snelheid en resultaat.
            </motion.p>
          </div>
        </motion.div>

        {/* Project cards grid */}
        <motion.div
          variants={staggerContainerFast}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8"
        >
          {featured.map((project) => (
            <motion.div
              key={project.title}
              variants={fadeInUp}
              onPointerMove={(event) => {
                const box = event.currentTarget.getBoundingClientRect()
                event.currentTarget.style.setProperty(
                  '--mx',
                  `${event.clientX - box.left}px`
                )
                event.currentTarget.style.setProperty(
                  '--my',
                  `${event.clientY - box.top}px`
                )
              }}
              className="crop-marks spotlight group relative flex flex-col bg-card border border-foreground/15 hover:border-primary transition-colors duration-300 cursor-pointer"
            >
              {/* Clickable overlay */}
              <Link
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 z-30"
                aria-label={`Bekijk ${project.title}`}
              />

              {/* Browser mockup */}
              <div className="relative bg-background-elevated overflow-hidden" style={{ height: '280px' }}>
                {/* Chrome bar — warm ink, stays inside the palette */}
                <div className="relative z-20 flex items-center gap-1.5 px-3 py-2.5 bg-ink border-b border-white/10">
                  <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                  <span className="w-2.5 h-2.5 rounded-full bg-white/14" />
                  <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
                  <div className="ml-2 flex-1 rounded-md bg-white/8 h-5 flex items-center px-2.5 gap-1.5">
                    <svg className="w-2.5 h-2.5 text-primary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <span className="text-[9px] text-white/55 font-mono tracking-tight truncate">{project.href.replace('https://', '').replace('www.', '')}</span>
                  </div>
                  {/* Live marker — terracotta, not a stray emerald */}
                  <span className="inline-flex items-center gap-1.5 pl-2 text-[9px] font-bold tracking-[0.14em] uppercase text-white/70 shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" aria-hidden="true" />
                    Live
                  </span>
                </div>

                {/* Fallback beneath the frame: if the site blocks embedding
                    (X-Frame-Options / CSP) the iframe paints nothing, so this
                    stays visible instead of a blank white rectangle. */}
                <div className="absolute top-11 left-0 right-0 bottom-0 flex flex-col items-center justify-center gap-3 bg-background-elevated px-6 text-center">
                  <span
                    className="text-3xl font-bold text-foreground/22 tracking-tight"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {project.title}
                  </span>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground/70">
                    {project.category}
                  </span>
                </div>

                {/* Live website preview via iframe — desktop viewport, scaled down */}
                <div className="absolute top-11 left-0 w-full overflow-hidden" style={{ height: 'calc(100% - 44px)' }}>
                  <iframe
                    src={project.href}
                    title={`Voorbeeld van ${project.title}`}
                    loading="lazy"
                    sandbox="allow-scripts allow-same-origin"
                    tabIndex={-1}
                    aria-hidden="true"
                    className="pointer-events-none origin-top-left"
                    style={{
                      border: 'none',
                      height: '1080px',
                      width: '1920px',
                      transform: 'scale(0.33)',
                      transformOrigin: 'top left',
                    }}
                  />
                </div>

                {/* Hover overlay — warm ink veil, raises the CTA pill */}
                <div className="absolute top-11 left-0 right-0 bottom-0 z-20 flex items-center justify-center bg-ink/70 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white text-xs font-bold tracking-widest uppercase translate-y-3 group-hover:translate-y-0 transition-transform duration-300" style={{ fontFamily: 'var(--font-heading)' }}>
                    Bekijk live
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M7 7h10v10" />
                    </svg>
                  </span>
                </div>

                {/* Large ghost index */}
                <span
                  className="absolute bottom-1 right-3 text-7xl sm:text-6xl font-bold text-foreground/[0.07] leading-none select-none pointer-events-none z-10"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {project.index}
                </span>
              </div>

              {/* Card content */}
              <div className="flex flex-col flex-1 px-6 py-5">
                {/* Figure caption, as under a plate in a printed document */}
                <span className="flex items-baseline gap-2.5 mb-3">
                  <span className="meta-sm text-primary">
                    Fig. {project.index}
                  </span>
                  <span className="meta-sm text-muted-foreground">
                    {project.category}
                  </span>
                </span>

                <h3
                  className="text-lg font-bold text-foreground tracking-tight mb-2 group-hover:text-primary transition-colors duration-200"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {project.title}
                </h3>

                <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-4">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="meta-sm px-2.5 py-1.5 border border-border text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Hover accent line */}
              <div className="h-px mx-6 bg-border group-hover:bg-primary/30 transition-colors duration-300" />
              <div className="px-6 py-4">
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault()
                    window.open(project.href, '_blank')
                  }}
                  className="relative z-40 text-xs font-bold text-muted-foreground group-hover:text-primary transition-colors duration-200 tracking-wide uppercase flex items-center gap-1.5"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  Bekijk project
                  <span className="group-hover:translate-x-0.5 transition-transform duration-200">
                    →
                  </span>
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer CTA */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-16 flex flex-col sm:flex-row items-center justify-between gap-6 pt-10 border-t border-border"
        >
          <p className="text-muted-foreground text-sm">
            Bekijk alle{' '}
            <span className="text-foreground font-bold">projecten</span> in ons
            portfolio.
          </p>
          <Link
            href="/portfolio"
            className="group inline-flex items-center gap-2 px-6 py-3 bg-foreground text-white text-sm font-bold tracking-wide hover:bg-primary transition-colors duration-200"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Bekijk alle projecten
            <span className="group-hover:translate-x-0.5 transition-transform duration-200">→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
