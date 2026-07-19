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
      'Moderne webshop met productoverzicht, winkelwagen en een soepele checkout ervaring — volledig op maat gebouwd voor de Surinaamse markt.',
    tags: ['E-Commerce', 'Webshop', 'Next.js'],
    accent: 'from-primary/30 via-orange-500/10',
    href: 'https://www.shop-nextx.com/',
  },
  {
    index: '02',
    title: 'Indef Design',
    category: 'Portfolio Website',
    description:
      'Strak creatief portfolio voor een design studio — modern, snel en volledig responsive met een unieke visuele stijl.',
    tags: ['Portfolio', 'Web Design', 'Branding'],
    accent: 'from-primary/20 via-orange-400/10',
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
            className="flex items-baseline justify-between border-t-2 border-foreground pt-4 mb-10"
          >
            <span className="text-xs font-bold tracking-[0.18em] uppercase text-foreground">
              Ons Werk
            </span>
            <span className="text-xs font-medium text-muted-foreground tabular-nums">03</span>
          </motion.div>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <div className="overflow-hidden">
                <motion.h2
                  variants={clipRevealUp}
                  className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-foreground leading-[0.95]"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  Recente
                </motion.h2>
              </div>
              <div className="overflow-hidden">
                <motion.h2
                  variants={clipRevealUp}
                  className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-primary leading-[0.95]"
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
              className="group relative flex flex-col bg-card border border-foreground/15 hover:border-primary transition-colors duration-300 overflow-hidden cursor-pointer"
            >
              {/* Clickable overlay */}
              <Link
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 z-30"
                aria-label={`View ${project.title}`}
              />

              {/* Browser mockup */}
              <div className="relative bg-background-elevated overflow-hidden" style={{ height: '280px' }}>
                {/* Chrome bar */}
                <div className="flex items-center gap-1.5 px-3 py-2.5 bg-[#1a1a1a] border-b border-white/5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
                  <div className="ml-2 flex-1 rounded-md bg-white/5 h-5 flex items-center px-2.5 gap-1.5">
                    <svg className="w-2.5 h-2.5 text-emerald-400/70 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <span className="text-[9px] text-neutral-400 font-mono truncate">{project.href.replace('https://', '').replace('www.', '')}</span>
                  </div>
                </div>

                {/* Live website preview via iframe - Desktop view */}
                <div className="absolute top-11 left-0 w-full overflow-hidden" style={{ height: 'calc(100% - 44px)' }}>
                  <iframe
                    src={project.href}
                    title={project.title}
                    className="bg-white pointer-events-none origin-top-left"
                    style={{
                      border: 'none',
                      height: '1080px',
                      width: '1920px',
                      transform: 'scale(0.33)',
                      transformOrigin: 'top left',
                    }}
                  />
                </div>

                {/* Hover overlay — dims preview and raises CTA pill */}
                <div className="absolute top-11 left-0 right-0 bottom-0 z-20 flex items-center justify-center bg-black/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white text-xs font-bold tracking-widest uppercase translate-y-3 group-hover:translate-y-0 transition-transform duration-300" style={{ fontFamily: 'var(--font-heading)' }}>
                    Bekijk live
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M7 7h10v10" />
                    </svg>
                  </span>
                </div>

                {/* Large ghost index */}
                <span
                  className="absolute bottom-1 right-3 text-7xl sm:text-6xl font-black text-white/5 leading-none select-none pointer-events-none z-10"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {project.index}
                </span>

                {/* Live project pill */}
                <span className="absolute top-12 right-3 inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-[9px] font-bold tracking-widest uppercase z-10 pointer-events-none">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Live
                </span>


                {/* Gradient overlay for richer visual on mobile */}
                <div className="absolute inset-0 bg-linear-to-t from-background/70 via-transparent to-transparent sm:hidden pointer-events-none z-10" />
              </div>

              {/* Card content */}
              <div className="flex flex-col flex-1 px-6 py-5">
                {/* Category caption */}
                <span className="self-start text-[10px] font-bold tracking-widest uppercase text-primary mb-3">
                  {project.category}
                </span>

                <h3
                  className="text-lg font-black text-foreground tracking-tight mb-2 group-hover:text-primary transition-colors duration-200"
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
                      className="px-2.5 py-0.5 border border-border text-muted-foreground text-[11px] font-medium"
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
                  Bekijk live
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
