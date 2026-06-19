'use client'

import { motion } from 'framer-motion'
import {
  fadeInUp,
  staggerContainer,
  staggerContainerSlow,
  blurFadeIn,
  scaleIn,
} from '@/lib/animationUtils'

const features = [
  {
    title: 'Snel Geleverd',
    description: 'Geoptimaliseerde workflows zorgen voor snelle oplevering zonder kwaliteitsverlies.',
    breakdown: [
      'Oplevering binnen 48–72 uur',
      'Vaste afgesproken deadline',
      'Directe communicatie via WhatsApp',
      'Geen eindeloze wachttijden',
    ],
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
  },
  {
    title: 'Smart Budget',
    description: 'Slimme technologie-integratie zorgt voor premium output tegen competitieve tarieven.',
    breakdown: [
      'Transparante, vaste prijzen',
      'Geen verborgen kosten',
      'Flexibele betaalmogelijkheden',
      'Gratis eerste adviesgesprek',
    ],
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <path d="M16 8h-6a2 2 0 100 4h4a2 2 0 110 4H8" />
        <path d="M12 6v2m0 8v2" />
      </svg>
    ),
  },
  {
    title: 'Custom Design',
    description: 'Elk project wordt volledig gepersonaliseerd naar uw merkidentiteit en doelgroep.',
    breakdown: [
      '100% uniek ontwerp — geen templates',
      'Afgestemd op uw merk en doelgroep',
      'Meerdere revisierondes inbegrepen',
      'Responsive op alle apparaten',
    ],
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    title: 'Lokaal Netwerk',
    description: 'Geworteld in Paramaribo met een globaal perspectief en sterke lokale connecties.',
    breakdown: [
      'Persoonlijk contact met de oprichter',
      'Kennis van de Surinaamse markt',
      'Snelle lokale support',
      'Netwerk van lokale partners',
    ],
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
] as const

function WhySectionFn() {
  return (
    <section className="py-28 lg:py-40 relative bg-background overflow-hidden" id="why">
      {/* Circuit texture — felt, not seen */}
      <div className="absolute inset-0 pointer-events-none bg-circuit" aria-hidden="true" />

      {/* Giant ghost section number */}
      <span className="section-number absolute top-16 right-6 lg:right-16 hidden sm:block" aria-hidden="true">
        01
      </span>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-20"
        >
          <motion.div variants={scaleIn} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/25 bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Waarom NextX
          </motion.div>
          <motion.h2 variants={blurFadeIn} className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-5" style={{ fontFamily: 'var(--font-heading)' }}>
            Waarom bedrijven kiezen{' '}
            <span className="text-primary">voor ons</span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-lg text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            Vier kernpijlers die ons onderscheiden in de Surinaamse digitale markt.
          </motion.p>
        </motion.div>

        {/* 2×2 features grid — full width */}
        <motion.div
          variants={staggerContainerSlow}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={fadeInUp}
              className="card-glow group flex flex-col gap-5 p-7 lg:p-8 rounded-2xl bg-card border border-white/[0.07]"
            >
              {/* Icon + title row */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 border border-primary/20 rounded-xl flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-white group-hover:shadow-lg group-hover:shadow-primary/30 transition-all duration-300">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-1 tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
                    {feature.title}
                  </h3>
                  <p className="text-neutral-400 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
              {/* Breakdown */}
              <ul className="space-y-2.5 border-t border-white/[0.06] pt-5">
                {feature.breakdown.map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-sm text-neutral-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export { WhySectionFn as WhySection }
