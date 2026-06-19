'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { CTABanner } from '@/components/sections/CTABanner'
import {
  fadeInUp,
  blurFadeIn,
  staggerContainerFast,
  clipRevealUp,
} from '@/lib/animationUtils'

const projects = [
  {
    index: '01',
    title: 'Shop NextX',
    category: 'E-Commerce',
    description: 'Moderne webshop met productoverzicht, winkelwagen en een soepele checkout ervaring — volledig op maat gebouwd voor de Surinaamse markt.',
    tags: ['E-Commerce', 'Webshop', 'Next.js'],
    accent: 'from-primary/30 via-orange-500/10',
    url: 'shop-nextx.com',
    href: 'https://www.shop-nextx.com/',
  },
  {
    index: '02',
    title: 'Indef Design',
    category: 'Portfolio Website',
    description: 'Strak creatief portfolio voor een design studio — modern, snel en volledig responsive met een unieke visuele stijl.',
    tags: ['Portfolio', 'Web Design', 'Branding'],
    accent: 'from-primary/20 via-orange-400/10',
    url: 'indefdesign.com',
    href: 'https://www.indefdesign.com/',
  },
] as const

export default function PortfolioPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* ── Hero ── */}
        <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-24 overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-50 pointer-events-none" />
          <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-primary/40 to-transparent" />

          {/* Decorative arc */}
          <div className="absolute -top-40 -right-40 w-[480px] h-[480px] pointer-events-none z-0" aria-hidden="true">
            <svg viewBox="0 0 640 640" fill="none">
              <circle cx="320" cy="320" r="290" stroke="#f97316" strokeWidth="1.5" opacity="0.06" />
              <circle cx="320" cy="320" r="210" stroke="#f97316" strokeWidth="1" opacity="0.035" />
            </svg>
          </div>

          <motion.div
            variants={staggerContainerFast}
            initial="hidden"
            animate="visible"
            className="relative max-w-6xl mx-auto px-6"
          >
            <motion.div
              variants={blurFadeIn}
              className="flex items-center gap-4 mb-10"
            >
              <div className="h-px w-8 bg-primary" style={{ opacity: 0.45 }} />
              <span className="text-[11px] font-bold tracking-[0.22em] uppercase text-neutral-400">
                Ons Werk
              </span>
            </motion.div>

            <div className="overflow-hidden">
              <motion.h1
                variants={clipRevealUp}
                className="text-5xl md:text-7xl font-black tracking-tight text-white leading-[0.95] mb-1"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Recente
              </motion.h1>
            </div>
            <div className="overflow-hidden mb-8">
              <motion.h1
                variants={clipRevealUp}
                className="text-5xl md:text-7xl font-black tracking-tight text-primary leading-[0.95]"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Projecten.
              </motion.h1>
            </div>

            <motion.p variants={fadeInUp} className="text-neutral-400 text-lg max-w-xl leading-relaxed">
              Een selectie van recente projecten. Elk project begint als template
              en wordt volledig gepersonaliseerd naar de wensen van de klant.
            </motion.p>
          </motion.div>
        </section>

        {/* ── Projects grid ── */}
        <section className="py-16 lg:py-24 bg-background">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div
              variants={staggerContainerFast}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.05 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            >
              {projects.map((project) => (
                <motion.article
                  key={project.title}
                  variants={fadeInUp}
                  className="group flex flex-col rounded-2xl bg-card border border-white/[0.07] overflow-hidden hover:border-primary/35 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1 transition-all duration-300 cursor-pointer relative"
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
                        <span className="text-[9px] text-neutral-400 font-mono truncate">{project.url}</span>
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

                    {/* Large ghost index */}
                    <span
                      className="absolute bottom-1 right-3 text-6xl font-black text-white/4 leading-none select-none pointer-events-none z-10"
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      {project.index}
                    </span>

                    {/* Live project pill */}
                    <span className="absolute top-12 right-3 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-[9px] font-bold tracking-widest uppercase z-10 pointer-events-none">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Live
                    </span>

                    {/* Bottom orange glow line */}
                    <div className="h-px bg-linear-to-r from-transparent via-primary/50 to-transparent" />
                  </div>

                  {/* Card body */}
                  <div className="flex flex-col flex-1 p-5 bg-card">
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-primary/8 text-primary text-[10px] font-bold tracking-widest uppercase border border-primary/15">
                        {project.category}
                      </span>
                      <span
                        className="text-xs font-black text-white/15 tracking-widest"
                        style={{ fontFamily: 'var(--font-heading)' }}
                      >
                        {project.index}
                      </span>
                    </div>
                    <h3
                      className="text-lg font-black text-white tracking-tight mb-2 group-hover:text-primary transition-colors duration-200"
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      {project.title}
                    </h3>
                    <p className="text-sm text-neutral-400 leading-relaxed flex-1 mb-4">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-0.5 rounded-md bg-white/5 border border-white/10 text-neutral-400 text-[11px] font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault()
                        window.open(project.href, '_blank')
                      }}
                      className="relative z-40 inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-primary-hover transition-colors duration-200 tracking-wide uppercase"
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      Bekijk live
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </button>
                  </div>

                  {/* Hover accent bottom */}
                  <div className="h-0.5 bg-linear-to-r from-primary/0 via-primary/20 to-primary/0 group-hover:via-primary transition-all duration-300" />
                </motion.article>
              ))}
            </motion.div>
          </div>
        </section>

        <CTABanner />
      </main>
      <Footer />
    </>
  )
}
