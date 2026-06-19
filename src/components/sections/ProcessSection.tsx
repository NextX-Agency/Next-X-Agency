'use client'

import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import {
  fadeInUp,
  staggerContainerSlow,
  scaleIn,
  blurFadeIn,
} from '@/lib/animationUtils'

const steps = [
  {
    number: 1,
    icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2',
    title: 'Intake & Briefing',
    description: 'U stuurt uw materialen en wensen. Wij bevestigen schriftelijk met een duidelijke timeline.',
    items: ['Requirements Gathering', 'Brand Voice Definition', 'Project Roadmap Setup'],
  },
  {
    number: 2,
    icon: 'M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4',
    title: 'Design & Development',
    description: 'Wij bouwen en personaliseren uw project. Tussentijdse updates bij grotere projecten.',
    items: ['Frontend Architecture', 'System Integration', 'Performance Tuning'],
  },
  {
    number: 3,
    icon: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z',
    title: 'Review & Revisies',
    description: 'U beoordeelt de eerste versie en geeft feedback. Wij verwerken gratis minor revisions.',
    items: ['Cross-browser QA', 'User Acceptance Testing', 'Security Auditing'],
  },
  {
    number: 4,
    icon: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z',
    title: 'Oplevering',
    description: 'Website live of designs geexporteerd. U ontvangt alle credentials en instructies.',
    items: ['Domain Deployment', 'SEO Configuration', 'CMS Handover'],
  },
  {
    number: 5,
    icon: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9',
    title: 'Post-Launch Support',
    description: '30 dagen gratis minor revisions. Daarna: pay-per-fix of UX Kukru maandpakket.',
    items: ['Bi-weekly Analytics', '24/7 Monitoring', 'Agile Feature Updates'],
  },
] as const

function ProcessSectionFn() {
  const timelineRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 75%', 'end 65%'],
  })
  const lineProgress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })

  return (
    <section className="py-28 lg:py-40 relative overflow-hidden bg-background-elevated">
      {/* Circuit texture — felt, not seen */}
      <div className="absolute inset-0 pointer-events-none bg-circuit" aria-hidden="true" />

      {/* Giant ghost section number */}
      <span className="section-number absolute top-16 right-6 lg:right-16 hidden sm:block" aria-hidden="true">
        04
      </span>

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.18 } } }}
          className="text-center mb-24"
        >
          <motion.div variants={scaleIn} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/25 bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Strategic Workflow
          </motion.div>
          <motion.h2 variants={blurFadeIn} className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-5" style={{ fontFamily: 'var(--font-heading)' }}>
            Project{' '}
            <span className="text-primary">Roadmap</span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-lg text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            Helder vijf-fasen proces — zodat u precies weet wat u kunt verwachten.
          </motion.p>
        </motion.div>

        {/* Timeline */}
        <div className="relative" ref={timelineRef}>
          {/* Track lines (faint) */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/[0.07] -translate-x-1/2 hidden md:block" aria-hidden="true" />
          <div className="absolute left-6 top-0 bottom-0 w-px bg-white/[0.07] md:hidden" aria-hidden="true" />

          {/* Progress lines — draw on scroll */}
          <motion.div
            className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 hidden md:block origin-top bg-linear-to-b from-primary via-primary/70 to-primary/30"
            style={{ scaleY: lineProgress, boxShadow: '0 0 12px rgba(249,115,22,0.35)' }}
            aria-hidden="true"
          />
          <motion.div
            className="absolute left-6 top-0 bottom-0 w-px md:hidden origin-top bg-linear-to-b from-primary via-primary/70 to-primary/30"
            style={{ scaleY: lineProgress, boxShadow: '0 0 12px rgba(249,115,22,0.35)' }}
            aria-hidden="true"
          />

          <motion.div
            variants={staggerContainerSlow}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="space-y-12 md:space-y-28"
          >
            {steps.map((step, index) => {
              const isLeft = index % 2 === 0
              return (
                <motion.div
                  key={step.number}
                  variants={fadeInUp}
                  className="group"
                >
                  {/* ── Mobile layout: left-aligned vertical stack ── */}
                  <div className="flex items-start gap-5 md:hidden">
                    {/* Icon node */}
                    <div className="relative shrink-0 z-10">
                      <div className="node-embossed w-12 h-12 rounded-xl flex items-center justify-center">
                        <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" d={step.icon} />
                        </svg>
                      </div>
                    </div>
                    {/* Content */}
                    <div className="flex-1 pb-2">
                      <span className="text-primary font-bold text-xs tracking-widest uppercase" style={{ fontFamily: 'var(--font-heading)' }}>
                        Fase {String(step.number).padStart(2, '0')}
                      </span>
                      <h3 className="text-xl font-bold mt-1 mb-2 text-white tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
                        {step.title}
                      </h3>
                      <p className="text-neutral-400 text-sm leading-relaxed mb-3">
                        {step.description}
                      </p>
                      <ul className="space-y-2">
                        {step.items.map((item) => (
                          <li key={item} className="flex items-center gap-2.5 text-neutral-300 text-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* ── Desktop layout: zigzag alternating ── */}
                  <div className="hidden md:flex items-center justify-between w-full">
                    {/* Left column */}
                    <div className={`w-[42%] ${isLeft ? 'text-right' : ''}`}>
                      {isLeft ? (
                        <>
                          <span className="text-primary font-bold text-sm tracking-widest uppercase" style={{ fontFamily: 'var(--font-heading)' }}>
                            Fase {String(step.number).padStart(2, '0')}
                          </span>
                          <h3 className="text-2xl font-bold mt-2 text-white tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
                            {step.title}
                          </h3>
                          <p className="text-neutral-400 mt-3 leading-relaxed text-sm">
                            {step.description}
                          </p>
                        </>
                      ) : (
                        <ul className="space-y-3">
                          {step.items.map((item) => (
                            <li key={item} className="flex items-center gap-3 text-neutral-300 font-medium text-sm">
                              <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>

                    {/* Center node */}
                    <div className="relative z-10 flex items-center justify-center">
                      <motion.div
                        className="node-embossed w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110"
                        whileHover={{ scale: 1.1 }}
                      >
                        <svg className="w-7 h-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" d={step.icon} />
                        </svg>
                      </motion.div>
                    </div>

                    {/* Right column */}
                    <div className={`w-[42%] ${!isLeft ? 'text-right' : ''}`}>
                      {isLeft ? (
                        <ul className="space-y-3">
                          {step.items.map((item) => (
                            <li key={item} className="flex items-center gap-3 text-neutral-300 font-medium text-sm">
                              <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <>
                          <span className="text-primary font-bold text-sm tracking-widest uppercase" style={{ fontFamily: 'var(--font-heading)' }}>
                            Fase {String(step.number).padStart(2, '0')}
                          </span>
                          <h3 className="text-2xl font-bold mt-2 text-white tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
                            {step.title}
                          </h3>
                          <p className="text-neutral-400 mt-3 leading-relaxed text-sm">
                            {step.description}
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export { ProcessSectionFn as ProcessSection }
