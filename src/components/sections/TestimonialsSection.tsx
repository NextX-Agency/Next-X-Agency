'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  fadeInUp,
  blurFadeIn,
  staggerContainer,
  scaleIn,
} from '@/lib/animationUtils'

function TestimonialsSectionFn() {
  return (
    <section className="py-28 lg:py-40 relative overflow-hidden bg-background-elevated" id="early-adopter">
      {/* Circuit texture — felt, not seen */}
      <div className="absolute inset-0 pointer-events-none bg-circuit" aria-hidden="true" />
      {/* Ambient orange glow */}
      <div
        className="absolute top-1/2 right-0 w-[420px] h-[420px] -translate-y-1/2 translate-x-1/3 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(249,115,22,0.06) 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left — Story + Stats */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div variants={scaleIn} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Early Adopter
            </motion.div>
            <motion.h2 variants={blurFadeIn} className="text-4xl md:text-5xl font-bold text-foreground tracking-tight mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
              Wij bouwen samen{' '}
              <span className="text-primary">met u</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-lg text-muted-foreground leading-relaxed mb-10">
              NextX Agency is een jong en ambitieus bureau. Wij geloven in eerlijkheid: wij zijn net gestart en bouwen ons portfolio op met echte klanten. Dat betekent dat u als vroege klant extra voordelen krijgt — en direct impact heeft op hoe wij groeien.
            </motion.p>

            {/* Stats row */}
            <motion.div variants={fadeInUp} className="grid grid-cols-3 gap-2 sm:gap-4">
              <div className="card-glow text-center p-3 sm:p-5 rounded-2xl border border-border bg-card">
                <p className="text-lg sm:text-2xl font-bold text-primary counter-glow" style={{ fontFamily: 'var(--font-heading)' }}>100%</p>
                <p className="text-[10px] sm:text-xs text-muted-foreground mt-1">Persoonlijke aandacht</p>
              </div>
              <div className="card-glow text-center p-3 sm:p-5 rounded-2xl border border-border bg-card">
                <p className="text-lg sm:text-2xl font-bold text-primary counter-glow" style={{ fontFamily: 'var(--font-heading)' }}>48u</p>
                <p className="text-[10px] sm:text-xs text-muted-foreground mt-1">Reactietijd</p>
              </div>
              <div className="card-glow text-center p-3 sm:p-5 rounded-2xl border border-border bg-card">
                <p className="text-lg sm:text-2xl font-bold text-primary counter-glow" style={{ fontFamily: 'var(--font-heading)' }}>Gratis</p>
                <p className="text-[10px] sm:text-xs text-muted-foreground mt-1">Extra revisieronde</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right — Offer card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="bg-card border border-primary/40 ring-1 ring-primary/20 rounded-3xl p-8 lg:p-10 relative overflow-hidden shadow-[0_0_48px_rgba(249,115,22,0.1)]">
              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-[100px] pointer-events-none" />

              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center shadow-lg shadow-primary/30">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                  </svg>
                </div>
                <div>
                  <p className="text-foreground font-bold text-lg" style={{ fontFamily: 'var(--font-heading)' }}>Early Adopter Aanbod</p>
                  <p className="text-muted-foreground text-sm">Beperkt beschikbaar</p>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-foreground mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                Wees een van onze eerste klanten en profiteer van{' '}
                <span className="text-primary">exclusieve voordelen</span>{' '}
                op uw eerste project.
              </h3>

              <ul className="space-y-3 mb-8">
                {[
                  'Persoonlijke begeleiding door de oprichter',
                  'Gratis extra revisierondes',
                  'Prioriteit bij toekomstige updates',
                  'Uw feedback helpt ons verbeteren',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-muted-foreground text-sm">
                    <svg className="w-5 h-5 text-primary shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>

              <Link
                href="/contact"
                className="group inline-flex items-center justify-center gap-2 w-full bg-primary hover:bg-primary-hover text-white font-bold px-8 py-4 rounded-full text-base transition-all duration-300 hover:scale-[1.02] shadow-lg shadow-primary/25"
              >
                Claim uw plek
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export { TestimonialsSectionFn as TestimonialsSection }
