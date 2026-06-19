'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import {
  fadeInUp,
  staggerContainer,
  staggerContainerFast,
  cardFlipIn,
  blurFadeIn,
} from '@/lib/animationUtils'

const plans = [
  {
    name: 'Starter Support',
    description: 'Foundational Structure',
    tagline: 'Perfect voor kleine updates en onderhoud.',
    features: [
      '10 uur per maand',
      'Kleine updates & bug fixes',
      'Content wijzigingen',
      'Technisch advies',
      'Email support (48u response)',
    ],
    highlighted: false,
    cta: 'Initiate',
  },
  {
    name: 'Business Support',
    description: 'Full Scale Development',
    tagline: 'Ideaal voor groeiende bedrijven met actieve websites.',
    features: [
      '20 uur per maand',
      'Feature development',
      'Design updates & integraties',
      'Strategisch advies',
      'Slack support (24u response)',
    ],
    highlighted: true,
    badge: 'MEEST GEKOZEN',
    cta: 'Start Construction',
  },
  {
    name: 'Partner Support',
    description: 'Enterprise Solution',
    tagline: 'Voor bedrijven die een dedicated digitale partner willen.',
    features: [
      '40 uur per maand',
      'Dedicated specialist',
      'Priority support',
      'Complexe projecten',
      'Team collaboration',
      'Direct contact (12u response)',
    ],
    highlighted: false,
    cta: 'Contact HQ',
  },
] as const

function PricingSectionFn() {
  return (
    <section className="py-28 lg:py-40 relative bg-background overflow-hidden" id="pricing">
      {/* Circuit texture — felt, not seen */}
      <div className="absolute inset-0 pointer-events-none bg-circuit" aria-hidden="true" />

      {/* Giant ghost section number */}
      <span className="section-number absolute top-16 right-6 lg:right-16 hidden sm:block" aria-hidden="true">
        05
      </span>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="flex flex-col md:flex-row items-end justify-between mb-20 gap-6"
        >
          <motion.div variants={blurFadeIn} className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/25 bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Pricing
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
              Structurele{' '}
              <span className="text-primary">Ondersteuning</span>
            </h2>
            <motion.p variants={blurFadeIn} className="mt-5 text-lg text-muted-foreground leading-relaxed">
              Transparante tarieven zonder verborgen kosten — via UX Kukru.
            </motion.p>
          </motion.div>
        </motion.div>

        {/* Pricing cards */}
        <motion.div
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.18, delayChildren: 0.1 } } }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start"
        >
          {plans.map((plan) => (
            <motion.div
              key={plan.name}
              variants={cardFlipIn}
              className={cn(
                'relative group h-full',
                plan.highlighted && 'z-10 lg:-mt-4 lg:mb-4'
              )}
            >
              <div
                className={cn(
                  'card-glow bg-card rounded-3xl p-8 lg:p-10 h-full flex flex-col relative overflow-hidden',
                  plan.highlighted
                    ? 'border border-primary/50 ring-1 ring-primary/30 shadow-[0_0_48px_rgba(249,115,22,0.14)]'
                    : 'border border-border'
                )}
              >
                {/* Badge */}
                {plan.highlighted && 'badge' in plan && (
                  <div className="absolute top-0 right-0 px-4 py-1.5 bg-primary text-white text-[10px] font-black uppercase tracking-widest rounded-bl-2xl shadow-md shadow-primary/30">
                    {plan.badge}
                  </div>
                )}

                {/* Name & description */}
                <div className="mb-6 pb-6 border-b border-border">
                  <h3 className={cn(
                    'text-2xl font-bold tracking-tight',
                    plan.highlighted ? 'text-primary' : 'text-foreground'
                  )} style={{ fontFamily: 'var(--font-heading)' }}>
                    {plan.name}
                  </h3>
                  <p className="text-muted-foreground text-sm mt-1">{plan.description}</p>
                </div>

                {/* Price — op aanvraag */}
                <div className="mb-8">
                  <p
                    className={cn(
                      'text-4xl font-bold tracking-tight leading-none',
                      plan.highlighted ? 'text-primary' : 'text-foreground'
                    )}
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    Op aanvraag
                  </p>
                  <p className="text-muted-foreground text-sm font-medium mt-2">
                    maandpakket — {plan.tagline}
                  </p>
                </div>

                {/* Features */}
                <motion.ul
                  variants={staggerContainerFast}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="space-y-4 flex-1 mb-8"
                >
                  {plan.features.map((feature, i) => (
                    <motion.li
                      key={feature}
                      variants={fadeInUp}
                      custom={i}
                      transition={{ delay: i * 0.06 }}
                      className="flex items-start gap-3"
                    >
                      <svg
                        className="w-5 h-5 text-primary mt-0.5 shrink-0"
                        fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-muted-foreground text-sm">{feature}</span>
                    </motion.li>
                  ))}
                </motion.ul>

                {/* CTA */}
                <Link
                  href="/contact"
                  className={cn(
                    'w-full block text-center py-4 font-bold text-sm rounded-xl transition-all duration-300',
                    plan.highlighted
                      ? 'bg-primary text-white hover:bg-primary-hover shadow-lg shadow-primary/25'
                      : 'border border-border text-foreground hover:bg-primary hover:border-primary hover:text-white hover:shadow-lg hover:shadow-primary/20'
                  )}
                >
                  {plan.cta}
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Extra info */}
        <motion.p
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center text-sm text-muted-foreground mt-14"
        >
          Extra uren: <strong className="text-foreground">$18/uur</strong> | Minimaal{' '}
          <strong className="text-foreground">3 maanden</strong> commitment vereist.
        </motion.p>
      </div>
    </section>
  )
}

export { PricingSectionFn as PricingSection }
