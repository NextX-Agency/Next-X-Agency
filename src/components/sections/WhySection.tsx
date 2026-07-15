'use client'

import { motion } from 'framer-motion'
import { fadeInUp, staggerContainerSlow } from '@/lib/animationUtils'

const features = [
  {
    number: '01',
    title: 'Snel Geleverd',
    description: 'Geoptimaliseerde workflows zorgen voor snelle oplevering zonder kwaliteitsverlies.',
    breakdown: [
      'Oplevering binnen 48–72 uur',
      'Vaste afgesproken deadline',
      'Directe communicatie via WhatsApp',
      'Geen eindeloze wachttijden',
    ],
  },
  {
    number: '02',
    title: 'Smart Budget',
    description: 'Slimme technologie-integratie zorgt voor premium output tegen competitieve tarieven.',
    breakdown: [
      'Transparante, vaste prijzen',
      'Geen verborgen kosten',
      'Flexibele betaalmogelijkheden',
      'Gratis eerste adviesgesprek',
    ],
  },
  {
    number: '03',
    title: 'Custom Design',
    description: 'Elk project wordt volledig gepersonaliseerd naar uw merkidentiteit en doelgroep.',
    breakdown: [
      '100% uniek ontwerp — geen templates',
      'Afgestemd op uw merk en doelgroep',
      'Meerdere revisierondes inbegrepen',
      'Responsive op alle apparaten',
    ],
  },
  {
    number: '04',
    title: 'Lokaal Netwerk',
    description: 'Geworteld in Paramaribo met een globaal perspectief en sterke lokale connecties.',
    breakdown: [
      'Persoonlijk contact met de oprichter',
      'Kennis van de Surinaamse markt',
      'Snelle lokale support',
      'Netwerk van lokale partners',
    ],
  },
] as const

function WhySectionFn() {
  return (
    <section className="py-28 lg:py-40 bg-background overflow-hidden" id="why">
      <div className="max-w-6xl mx-auto px-6">

        {/* Section header — editorial, left-aligned, no pill */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          className="mb-20"
        >
          <motion.p
            variants={fadeInUp}
            className="text-[11px] font-bold tracking-[0.22em] uppercase text-neutral-500 mb-6"
          >
            — Waarom NextX
          </motion.p>
          <motion.h2
            variants={fadeInUp}
            className="text-4xl md:text-5xl lg:text-[3.75rem] font-bold text-white tracking-tight leading-[1.05]"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Vier redenen om<br />
            voor ons te kiezen.
          </motion.h2>
        </motion.div>

        {/* Feature grid — thin dividers between cells, no floating cards */}
        <motion.div
          variants={staggerContainerSlow}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/6"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={fadeInUp}
              className="group flex flex-col gap-5 p-8 lg:p-10 bg-background hover:bg-card transition-colors duration-300"
            >
              {/* Number + title row */}
              <div className="flex items-start justify-between gap-4">
                <h3
                  className="text-xl font-bold text-white tracking-tight group-hover:text-primary transition-colors duration-300"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {feature.title}
                </h3>
                <span
                  className="text-xs font-black text-neutral-700 tabular-nums shrink-0 mt-0.5"
                  style={{ fontFamily: 'var(--font-heading)' }}
                  aria-hidden="true"
                >
                  {feature.number}
                </span>
              </div>

              <p className="text-neutral-400 text-sm leading-relaxed">
                {feature.description}
              </p>

              {/* Expanding accent line on hover */}
              <div className="w-8 h-px bg-primary/50 group-hover:w-16 group-hover:bg-primary transition-all duration-500" />

              {/* Breakdown list */}
              <ul className="space-y-2.5">
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
