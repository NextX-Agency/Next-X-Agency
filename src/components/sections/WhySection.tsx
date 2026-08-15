'use client'

import { motion } from 'framer-motion'
import { fadeInUp, staggerContainerSlow } from '@/lib/animationUtils'
import { CONTACT } from '@/lib/contact'

// Elke kop noemt het feit zelf. Beeldspraak als "lokaal geworteld" zegt de
// lezer niets en klinkt als reclame; de datum, het bedrag en het adres wel.
const features = [
  {
    number: '01',
    title: `Live in ${CONTACT.deliveryTime}`,
    description: 'Bij het eerste gesprek hoort u wanneer uw site online gaat. Die datum komt in de offerte te staan.',
    breakdown: [
      `Oplevering binnen ${CONTACT.deliveryTime} na akkoord`,
      'De opleverdatum staat zwart op wit',
      `Antwoord op uw vragen ${CONTACT.responseTime}`,
      'U kunt tijdens de bouw meekijken op een testlink',
    ],
  },
  {
    number: '02',
    title: 'Prijs staat vooraf vast',
    description: 'U weet het bedrag voordat wij beginnen. Komt er werk bij, dan prijzen we dat apart en pas na uw akkoord.',
    breakdown: [
      'Vaste prijs per dienst, vooraf bekend',
      'Hosting en domein staan apart op de offerte',
      'Werk na oplevering: $25 per uur',
      'Het eerste gesprek is gratis',
    ],
  },
  {
    number: '03',
    title: 'Geen kant-en-klaar thema',
    description: 'Elk ontwerp begint bij uw bedrijf en uw klanten. Wij kopen geen thema in en gebruiken geen generator.',
    breakdown: [
      'Ontworpen rond uw merk en uw klanten',
      'U ziet het ontwerp voor er code geschreven wordt',
      'Revisierondes tijdens het project inbegrepen',
      'Werkt op telefoon, tablet en desktop',
    ],
  },
  {
    number: '04',
    title: `Wij zitten in ${CONTACT.city}`,
    description: 'U spreekt de mensen die uw site gebouwd hebben. Geen callcenter en geen bureau in een andere tijdzone.',
    breakdown: [
      'Persoonlijk contact met de oprichter',
      `Afspraken op locatie in ${CONTACT.city}`,
      'Webshops met bankoverschrijving voor de lokale markt',
      `Na oplevering bereikbaar via WhatsApp ${CONTACT.phoneDisplay}`,
    ],
  },
]

function WhySectionFn() {
  return (
    <section className="py-28 lg:py-40 bg-background" id="why">
      <div className="max-w-6xl mx-auto px-6">

        {/* Section header — editorial rule with caption */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          className="mb-16"
        >
          <motion.div
            variants={fadeInUp}
            className="register mb-10"
          >
            <span className="meta text-foreground">Waarom NextX</span>
            <span className="meta text-muted-foreground">§ 04</span>
          </motion.div>
          <motion.h2
            variants={fadeInUp}
            className="text-4xl md:text-5xl lg:text-[3.75rem] font-bold text-foreground tracking-tight leading-[1.05]"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Wat u van ons<br />
            mag verwachten.
          </motion.h2>
        </motion.div>

        {/* Feature grid — flat, thin dividers */}
        <motion.div
          variants={staggerContainerSlow}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-foreground/10 border-y border-foreground/10"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={fadeInUp}
              className="flex flex-col gap-5 p-8 lg:p-10 bg-background"
            >
              <div className="flex items-start justify-between gap-4">
                <h3
                  className="text-xl font-bold text-foreground tracking-tight"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {feature.title}
                </h3>
                <span className="meta text-primary shrink-0 mt-1.5" aria-hidden="true">
                  {feature.number}
                </span>
              </div>

              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>

              <ul className="space-y-2.5 mt-auto">
                {feature.breakdown.map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-sm text-foreground/80">
                    <span className="w-2 h-px bg-primary shrink-0" aria-hidden="true" />
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
