'use client'

import { motion } from 'framer-motion'
import { fadeInUp, staggerContainerSlow } from '@/lib/animationUtils'

const features = [
  {
    number: '01',
    title: 'Snel Geleverd',
    description: 'Korte lijnen en een helder proces: u weet vooraf wanneer uw site live gaat, en die afspraak halen we.',
    breakdown: [
      'Oplevering binnen 48–72 uur',
      'Vaste afgesproken deadline',
      'Directe communicatie via WhatsApp',
      'Geen eindeloze wachttijden',
    ],
  },
  {
    number: '02',
    title: 'Eerlijke Prijzen',
    description: 'U ziet vooraf precies wat het kost en wat u daarvoor krijgt. Geen kleine lettertjes, geen verrassingen achteraf.',
    breakdown: [
      'Transparante, vaste prijzen',
      'Geen verborgen kosten',
      'Flexibele betaalmogelijkheden',
      'Gratis eerste adviesgesprek',
    ],
  },
  {
    number: '03',
    title: 'Eigen Ontwerp',
    description: 'Wij ontwerpen vanaf een leeg canvas rond uw merk en uw klanten — geen kant-en-klare thema’s of generatoren.',
    breakdown: [
      '100% uniek ontwerp — geen templates',
      'Afgestemd op uw merk en doelgroep',
      'Meerdere revisierondes inbegrepen',
      'Responsive op alle apparaten',
    ],
  },
  {
    number: '04',
    title: 'Lokaal Geworteld',
    description: 'Wij zitten in Paramaribo, kennen de Surinaamse markt en zijn gewoon bereikbaar — ook na de oplevering.',
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
            className="text-[11px] font-bold tracking-[0.22em] uppercase text-muted-foreground mb-6"
          >
            — Waarom NextX
          </motion.p>
          <motion.h2
            variants={fadeInUp}
            className="text-4xl md:text-5xl lg:text-[3.75rem] font-bold text-foreground tracking-tight leading-[1.05]"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Vier redenen om<br />
            voor ons te kiezen.
          </motion.h2>
        </motion.div>

        {/* Feature grid — thin dividers, framed in a warm tinted card */}
        <motion.div
          variants={staggerContainerSlow}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="relative rounded-3xl border border-primary/15 overflow-hidden"
          style={{ background: 'linear-gradient(135deg, rgba(249,115,22,0.05) 0%, rgba(249,115,22,0.015) 55%, transparent 100%)' }}
        >
          {/* Corner accent glow */}
          <div
            className="absolute -top-24 -right-24 w-72 h-72 rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(249,115,22,0.08) 0%, transparent 70%)' }}
            aria-hidden="true"
          />

          <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-px bg-primary/10">
            {features.map((feature) => (
              <motion.div
                key={feature.title}
                variants={fadeInUp}
                className="group flex flex-col gap-5 p-8 lg:p-10 bg-background/60 hover:bg-background transition-colors duration-300"
              >
                {/* Number + title row */}
                <div className="flex items-start justify-between gap-4">
                  <h3
                    className="text-xl font-bold text-foreground tracking-tight group-hover:text-primary transition-colors duration-300"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {feature.title}
                  </h3>
                  <span
                    className="text-xs font-black text-primary/60 tabular-nums shrink-0 mt-0.5"
                    style={{ fontFamily: 'var(--font-heading)' }}
                    aria-hidden="true"
                  >
                    {feature.number}
                  </span>
                </div>

                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>

                {/* Expanding accent line on hover */}
                <div className="w-8 h-px bg-primary/50 group-hover:w-16 group-hover:bg-primary transition-all duration-500" />

                {/* Breakdown list */}
                <ul className="space-y-2.5">
                  {feature.breakdown.map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-sm text-foreground/80">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  )
}

export { WhySectionFn as WhySection }
