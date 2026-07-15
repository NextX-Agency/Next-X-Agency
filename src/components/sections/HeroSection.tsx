'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { AnimatedSVGPath } from '@/components/animated/AnimatedSVGPath'

const marqueeItems = [
  'Website Design',
  'Logo & Branding',
  'SEO Optimalisatie',
  'Webshop',
  'UX / UI Design',
  'E-Commerce',
  'Social Media',
  'Responsive Design',
]

function HeroSectionFn() {
  return (
    <header className="relative flex flex-col min-h-[90vh] justify-center pt-28 pb-0 overflow-hidden bg-background">
      {/* Ambient glow from top-center */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-225 h-125 pointer-events-none z-0"
        style={{ background: 'radial-gradient(ellipse at top, rgba(249,115,22,0.07) 0%, transparent 65%)' }}
        aria-hidden="true"
      />
      {/* Top decorative gradient line */}
      <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-primary/40 to-transparent" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 w-full text-center">
        {/* Overline */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex items-center justify-center gap-4 mb-8"
        >
          <div className="h-px w-8 bg-primary/60" />
          <span className="text-[11px] font-bold tracking-[0.22em] uppercase text-neutral-500">
            Digitale Bureau · Suriname
          </span>
          <div className="h-px w-8 bg-primary/60" />
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mb-8"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          <span
            className="block font-bold text-white leading-[0.95] tracking-tighter"
            style={{ fontSize: 'clamp(2.8rem, 7vw, 6rem)' }}
          >
            Uw digitale succes
          </span>
          <span
            className="block font-bold text-white leading-[0.95] tracking-tighter"
            style={{ fontSize: 'clamp(2.8rem, 7vw, 6rem)' }}
          >
            begint{' '}
            <span className="relative inline-block align-baseline" style={{ fontSize: '1.18em' }}>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.5 }}
                className="inline-block text-primary font-black"
              >
                hier.
              </motion.span>
              <svg
                className="absolute left-0 overflow-visible pointer-events-none"
                style={{ bottom: '-0.1em', width: '100%', height: '0.22em' }}
                viewBox="0 0 200 14"
                fill="none"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <AnimatedSVGPath
                  d="M2 9 Q50 3 100 9 Q150 15 198 9"
                  stroke="#f97316"
                  strokeWidth="4"
                  strokeLinecap="round"
                  opacity={0.85}
                  delay={0.9}
                  duration={0.8}
                />
              </svg>
            </span>
          </span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-base md:text-lg text-neutral-400 max-w-xl mx-auto mb-10 leading-relaxed"
        >
          NextX Agency helpt Surinaamse bedrijven professioneel online te groeien —
          snel, betaalbaar en volledig op maat.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14"
        >
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white font-bold px-8 py-4 rounded-full text-base transition-all duration-300 hover:scale-[1.04] shadow-lg shadow-primary/25"
          >
            Start Project
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-neutral-400 hover:text-white font-semibold text-base transition-colors duration-300"
          >
            Bekijk diensten
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </motion.div>

        {/* Stat chips */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="flex flex-wrap items-center justify-center gap-3"
        >
          {[
            { stat: '48u', label: 'Oplevering' },
            { stat: '100%', label: 'Op maat' },
            { stat: 'Lokaal', label: 'Paramaribo' },
          ].map(({ stat, label }) => (
            <div key={stat} className="stat-chip">
              <span className="stat-number">{stat}</span>
              <span className="text-neutral-600">·</span>
              <span className="text-neutral-400">{label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Services marquee */}
      <div className="marquee-hover-pause relative z-10 w-full overflow-hidden border-t border-white/6 bg-background-elevated/70 backdrop-blur-sm mt-16">
        <div className="marquee-track flex whitespace-nowrap py-4 select-none" aria-hidden="true">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-5 px-7 text-[11px] font-bold tracking-[0.2em] uppercase text-neutral-500"
            >
              {item}
              <span className="text-primary opacity-60 font-light text-base leading-none">×</span>
            </span>
          ))}
        </div>
      </div>
    </header>
  )
}

export { HeroSectionFn as HeroSection }
