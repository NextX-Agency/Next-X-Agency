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

// Abstract brand-mark composition — echoes the circuit/dot motifs
// from the NextX logo (circles, squares, connector lines) around a
// large stylized X silhouette. Purely decorative, no fake UI/content.
function BrandMark() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full max-w-105 aspect-square mx-auto"
      aria-hidden="true"
    >
      <svg viewBox="0 0 420 420" fill="none" className="w-full h-full">
        {/* Faint concentric rings */}
        <circle cx="210" cy="210" r="190" stroke="#f97316" strokeWidth="1" opacity="0.08" />
        <circle cx="210" cy="210" r="145" stroke="#f97316" strokeWidth="1" opacity="0.1" />

        {/* Large stylized X silhouette, offset & low opacity */}
        <path
          d="M120 110 L210 210 L120 310 M170 210 L235 210 M300 110 L210 210 L300 310"
          stroke="#f97316"
          strokeWidth="10"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.13"
        />

        {/* Circuit connector lines */}
        <path d="M60 90 L120 90 L150 120" stroke="#f97316" strokeWidth="1.5" opacity="0.5" fill="none" />
        <path d="M360 300 L305 300 L280 275" stroke="#f97316" strokeWidth="1.5" opacity="0.5" fill="none" />
        <path d="M70 320 L110 320 L110 280" stroke="#f97316" strokeWidth="1.5" opacity="0.4" fill="none" />

        {/* Hollow circles */}
        <circle cx="60" cy="90" r="5" stroke="#f97316" strokeWidth="1.75" />
        <circle cx="360" cy="300" r="5" stroke="#f97316" strokeWidth="1.75" />
        <circle cx="330" cy="70" r="4" stroke="#f97316" strokeWidth="1.5" opacity="0.7" />
        <circle cx="70" cy="320" r="4" stroke="#f97316" strokeWidth="1.5" opacity="0.7" />

        {/* Filled dots */}
        <circle cx="150" cy="120" r="3.5" fill="#f97316" opacity="0.85" />
        <circle cx="280" cy="275" r="3.5" fill="#f97316" opacity="0.85" />
        <circle cx="345" cy="150" r="3" fill="#f97316" opacity="0.6" />
        <circle cx="85" cy="250" r="3" fill="#f97316" opacity="0.6" />

        {/* Squares — hollow and filled */}
        <rect x="320" y="200" width="12" height="12" stroke="#f97316" strokeWidth="1.75" opacity="0.75" />
        <rect x="90" y="150" width="8" height="8" fill="#f97316" opacity="0.7" transform="rotate(12 94 154)" />
      </svg>

      {/* Floating micro-dots for subtle life */}
      <motion.span
        className="absolute top-[18%] left-[12%] w-1.5 h-1.5 rounded-full bg-primary/70"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.span
        className="absolute bottom-[22%] right-[16%] w-2 h-2 rounded-full bg-primary/50"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
      />
    </motion.div>
  )
}

function HeroSectionFn() {
  return (
    <header className="relative flex flex-col min-h-[90vh] justify-center pt-28 pb-0 overflow-hidden bg-background">
      {/* Ambient glow from top-center */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-225 h-125 pointer-events-none z-0"
        style={{ background: 'radial-gradient(ellipse at top, rgba(249,115,22,0.10) 0%, transparent 65%)' }}
        aria-hidden="true"
      />
      {/* Secondary soft glow, lower left — adds depth without clutter */}
      <div
        className="absolute bottom-0 -left-20 w-100 h-100 pointer-events-none z-0"
        style={{ background: 'radial-gradient(circle, rgba(249,115,22,0.06) 0%, transparent 70%)' }}
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
