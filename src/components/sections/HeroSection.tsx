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

// Bold brand-mark — a solid gradient card carrying the NextX "X" wordmark,
// echoing the logo directly instead of an abstract decorative pattern.
function BrandMark() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full max-w-105 aspect-square mx-auto"
      aria-hidden="true"
    >
      <div
        className="relative w-full h-full rounded-[2.5rem] shadow-2xl shadow-primary/25 overflow-hidden flex items-center justify-center"
        style={{ background: 'linear-gradient(145deg, #fb923c 0%, #f97316 45%, #c2410c 100%)' }}
      >
        {/* subtle sheen */}
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(circle at 30% 20%, rgba(255,255,255,0.25) 0%, transparent 55%)' }}
        />
        <svg viewBox="0 0 200 200" className="w-2/3 h-2/3 relative" fill="none">
          <path
            d="M50 40 L150 160 M150 40 L50 160"
            stroke="#ffffff"
            strokeWidth="20"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Floating accent dots for subtle life */}
      <motion.span
        className="absolute -top-3 -left-3 w-3 h-3 rounded-full bg-primary"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.span
        className="absolute -bottom-3 -right-3 w-4 h-4 rounded-full bg-primary/60"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
      />
    </motion.div>
  )
}

function HeroSectionFn() {
  return (
    <header className="relative flex flex-col min-h-[90vh] justify-center pt-28 pb-0 overflow-hidden bg-background">
      {/* Ambient glow from top-center — subtle wash, not a spotlight */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-225 h-125 pointer-events-none z-0"
        style={{ background: 'radial-gradient(ellipse at top, rgba(249,115,22,0.08) 0%, transparent 65%)' }}
        aria-hidden="true"
      />
      {/* Focused glow behind the brand mark card */}
      <div
        className="absolute top-1/2 right-[8%] -translate-y-1/2 w-100 h-100 pointer-events-none z-0"
        style={{ background: 'radial-gradient(circle, rgba(249,115,22,0.14) 0%, transparent 70%)' }}
        aria-hidden="true"
      />
      {/* Top decorative gradient line */}
      <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-primary/40 to-transparent" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-8 items-center">

          {/* ── Left: text ── */}
          <div className="text-center lg:text-left">
            {/* Overline */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex items-center justify-center lg:justify-start gap-4 mb-8"
            >
              <div className="h-px w-8 bg-primary/60" />
              <span className="text-[11px] font-bold tracking-[0.22em] uppercase text-muted-foreground">
                Digitale Bureau · Suriname
              </span>
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
                className="block font-bold text-foreground leading-[0.95] tracking-tighter"
                style={{ fontSize: 'clamp(2.8rem, 6vw, 5.25rem)' }}
              >
                Uw digitale succes
              </span>
              <span
                className="block font-bold text-foreground leading-[0.95] tracking-tighter"
                style={{ fontSize: 'clamp(2.8rem, 6vw, 5.25rem)' }}
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
              className="text-base md:text-lg text-muted-foreground max-w-md mx-auto lg:mx-0 mb-10 leading-relaxed"
            >
              NextX Agency helpt Surinaamse bedrijven professioneel online te groeien —
              snel, betaalbaar en volledig op maat.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4"
            >
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white font-bold px-8 py-4 rounded-full text-base transition-all duration-300 hover:scale-[1.04] shadow-lg shadow-primary/20"
              >
                Start Project
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground font-semibold text-base transition-colors duration-300"
              >
                Bekijk diensten
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </motion.div>
          </div>

          {/* ── Right: abstract brand mark ── */}
          <div className="flex items-center justify-center pb-4 lg:pb-0">
            <BrandMark />
          </div>

        </div>
      </div>

      {/* Services marquee */}
      <div className="marquee-hover-pause relative z-10 w-full overflow-hidden border-t border-border bg-background-elevated/70 backdrop-blur-sm mt-14">
        <div className="marquee-track flex whitespace-nowrap py-4 select-none" aria-hidden="true">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-5 px-7 text-[11px] font-bold tracking-[0.2em] uppercase text-muted-foreground"
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
