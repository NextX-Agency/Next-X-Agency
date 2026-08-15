'use client'

import { motion } from 'framer-motion'
import { fadeInUp, staggerContainerSlow } from '@/lib/animationUtils'
import { CONTACT } from '@/lib/contact'

const features = [
  {
    number: '01',
    title: 'Snel geleverd',
    description: 'Korte lijnen en een helder proces: u weet vooraf wanneer uw site live gaat, en die afspraak halen we.',
    breakdown: [
      `Oplevering binnen ${CONTACT.deliveryTime}`,
      'De opleverdatum staat in de offerte',
      `Vragen gaan via WhatsApp ${CONTACT.phoneDisplay}`,
      `Antwoord ${CONTACT.responseTime}`,
    ],
  },
  {
    number: '02',
    title: 'Eerlijke prijzen',
    description: 'U ziet vooraf precies wat het kost en wat u daarvoor krijgt. Geen kleine lettertjes, geen verrassingen achteraf.',
    breakdown: [
      'Vaste prijs per dienst, vooraf bekend',
      'Hosting en domein staan apart op de offerte',
      'Werk na oplevering: $15 per uur',
      'Het eerste gesprek is gratis',
    ],
  },
  {
    number: '03',
    title: 'Eigen ontwerp',
    description: 'Wij ontwerpen vanaf een leeg canvas rond uw merk en uw klanten — geen kant-en-klare thema’s of generatoren.',
    breakdown: [
      'Geen thema uit een winkel',
      'Afgestemd op uw merk en doelgroep',
      'Revisierondes tijdens het project inbegrepen',
      'Leesbaar op telefoon, tablet en desktop',
    ],
  },
  {
    number: '04',
    title: 'Lokaal geworteld',
    description: 'Wij zitten zelf in Paramaribo. U spreekt geen callcenter en geen buitenlands bureau, maar de mensen die uw site hebben gebouwd.',
    breakdown: [
      'Persoonlijk contact met de oprichter',
      'Afspraken op locatie zijn mogelijk',
      'Support in het Nederlands en Sranan',
      'Ook maanden later nog bereikbaar',
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
            Vier redenen om<br />
            voor ons te kiezen.
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
