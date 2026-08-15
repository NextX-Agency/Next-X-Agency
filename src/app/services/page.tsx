'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { SectionLabel } from '@/components/SectionLabel'
import { CTABanner } from '@/components/sections/CTABanner'
import { serviceCategories } from '@/lib/services'
import {
  fadeInUp,
  blurFadeIn,
  staggerContainer,
  staggerContainerFast,
  clipRevealUp,
} from '@/lib/animationUtils'

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main id="main">
        {/* ── Hero ── */}
        <section className="relative pt-36 pb-20 overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-px bg-foreground/10" />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="relative z-10 max-w-6xl mx-auto px-6"
          >
            {/* Overline */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <SectionLabel number="01">Diensten & Prijzen</SectionLabel>
            </motion.div>

            {/* Headline — clip-reveal */}
            <motion.h1
              variants={staggerContainer}
              className="mb-8"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {['Alles wat uw', 'bedrijf digitaal', 'nodig heeft'].map((line, i) => (
                <span key={i} className="block overflow-hidden">
                  <motion.span
                    variants={clipRevealUp}
                    transition={{ delay: i * 0.12 }}
                    className="block font-bold text-foreground leading-[0.92] tracking-tighter"
                    style={{ fontSize: 'clamp(2.6rem, 6vw, 5.5rem)' }}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </motion.h1>

            {/* Subtext */}
            <motion.p
              variants={blurFadeIn}
              className="text-base md:text-lg text-muted-foreground max-w-md leading-relaxed font-medium"
            >
              Van logo en huisstijl tot complete webshop en maandelijkse
              support — alles onder één dak, ontworpen en gebouwd door ons.
            </motion.p>

            {/* Route on to the two things a visitor asks for next */}
            <motion.div
              variants={fadeInUp}
              className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3"
            >
              <Link
                href="/examples"
                className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-primary-hover transition-colors"
              >
                Bekijk werkende voorbeelden →
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-sm font-bold text-foreground border-b-2 border-primary pb-0.5 hover:text-primary transition-colors"
              >
                Vraag een prijs op maat
              </Link>
            </motion.div>
          </motion.div>
        </section>

        {/* ── Service Categories ── */}
        <section className="pb-8">
          <div className="max-w-6xl mx-auto px-6">
            {serviceCategories.map((category, catIndex) => {
              return (
                <motion.div
                  key={category.id}
                  id={category.id}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.07 }}
                  variants={staggerContainerFast}
                  className="mb-20 last:mb-0 pt-16 border-t border-border first:border-0 first:pt-0"
                >
                  {/* Category header */}
                  <motion.div variants={fadeInUp} className="mb-8">
                    <div className="flex items-baseline flex-wrap gap-x-4 gap-y-1 mb-3">
                      <span className="text-[11px] font-bold tracking-[0.28em] uppercase text-primary/70">
                        {String(catIndex + 1).padStart(2, '0')}
                      </span>
                      <h2
                        className="text-2xl md:text-3xl font-bold text-foreground tracking-tight"
                        style={{ fontFamily: 'var(--font-heading)' }}
                      >
                        {category.title}
                      </h2>
                      <span className="text-xs font-bold tracking-[0.16em] uppercase text-primary">
                        — {category.tag}
                      </span>
                    </div>
                    <div className="w-full h-px bg-foreground/15" />
                    <p className="text-sm text-muted-foreground mt-3 max-w-2xl leading-relaxed">
                      {category.description}
                    </p>
                  </motion.div>

                  {/* Service cards grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {category.services.map((service, i) => (
                      <motion.div
                        key={service.name}
                        variants={fadeInUp}
                        className={`relative flex flex-col bg-card border transition-colors duration-300 overflow-hidden
                          ${service.popular
                            ? 'border-primary border-2'
                            : 'border-foreground/15 hover:border-primary'
                          }`}
                      >
                        {/* Card header */}
                        <div className={`px-5 pt-5 pb-4 ${service.popular ? 'bg-primary/5' : 'bg-black/3'}`}>
                          <div className="flex items-start justify-between gap-3 mb-1">
                            {/* Index circle */}
                            <span className={`w-7 h-7 flex items-center justify-center text-[11px] font-bold shrink-0 mt-0.5
                              ${service.popular ? 'bg-primary text-white' : 'bg-black/6 text-muted-foreground'}`}
                            >
                              {String(i + 1).padStart(2, '0')}
                            </span>
                            {/* Price badge */}
                            <span className={`text-sm font-bold tracking-tight whitespace-nowrap
                              ${service.popular ? 'text-primary' : 'text-foreground/80'}`}
                              style={{ fontFamily: 'var(--font-heading)' }}
                            >
                              {service.price}
                            </span>
                          </div>
                          <h3
                            className="text-[15px] font-bold text-foreground tracking-tight leading-snug mt-2"
                            style={{ fontFamily: 'var(--font-heading)' }}
                          >
                            {service.name}
                          </h3>
                          {service.demo && (
                            <span className="inline-flex items-center gap-1.5 mt-2 text-primary text-[10px] font-bold tracking-wider uppercase">
                              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                              Voorbeeld
                            </span>
                          )}
                        </div>

                        {/* Divider */}
                        <div className={`h-px mx-5 ${service.popular ? 'bg-primary/30' : 'bg-black/6'}`} />

                        {/* Feature bullets */}
                        <ul className="flex-1 px-5 py-4 space-y-2.5">
                          {service.items.map((item) => (
                            <li key={item} className="flex items-start gap-2.5 text-sm text-foreground/80">
                              <span className={`w-2 h-px shrink-0 mt-2.5
                                ${service.popular ? 'bg-primary' : 'bg-black/15'}`}
                              />
                              {item}
                            </li>
                          ))}
                        </ul>

                        {/* CTA footer */}
                        <div className="px-5 pb-5 pt-2 space-y-2">
                          <Link
                            href={`/contact?dienst=${encodeURIComponent(service.name)}`}
                            className={`block w-full text-center text-sm font-bold py-2.5 transition-colors duration-300
                              ${service.popular
                                ? 'bg-primary text-white hover:bg-primary-hover'
                                : 'bg-foreground text-white hover:bg-primary'
                              }`}
                            style={{ fontFamily: 'var(--font-heading)' }}
                          >
                            Aanvraag starten →
                          </Link>
                          {service.demo && (
                            <Link
                              href={service.demo}
                              className="flex items-center justify-center gap-1.5 w-full text-center text-xs font-bold py-2 border border-foreground/20 text-foreground hover:border-primary hover:text-primary transition-colors duration-200"
                              style={{ fontFamily: 'var(--font-heading)' }}
                            >
                              <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                              Bekijk voorbeeld
                            </Link>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Note */}
                  {category.note && (
                    <motion.p
                      variants={fadeInUp}
                      className="text-xs text-muted-foreground mt-6 bg-card border-l-2 border-primary px-4 py-3 leading-relaxed"
                    >
                      <strong className="text-foreground font-bold">Let op: </strong>
                      {category.note}
                    </motion.p>
                  )}
                </motion.div>
              )
            })}
          </div>
        </section>

        {/* ── Altijd Inbegrepen — dark band ── */}
        <section className="py-24 lg:py-28 bg-background-elevated relative overflow-hidden mt-20">
          {/* Subtle orange glow */}
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div className="absolute top-0 inset-x-0 h-px bg-foreground/10" />
          </div>

          <div className="max-w-6xl mx-auto px-6 relative z-10">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={staggerContainer}
            >
              {/* Header */}
              <motion.div variants={fadeInUp}>
                <SectionLabel>Standaard</SectionLabel>
              </motion.div>

              <motion.h2
                variants={clipRevealUp}
                className="text-3xl md:text-5xl font-bold text-foreground tracking-tighter mb-4 overflow-hidden"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Altijd inbegrepen
              </motion.h2>
              <motion.p variants={blurFadeIn} className="text-muted-foreground text-base mb-14 max-w-lg leading-relaxed">
                Bij elke service ontvangt u standaard het volgende — zonder extra kosten.
              </motion.p>

              {/* Items grid */}
              <motion.div
                variants={staggerContainerFast}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-5"
              >
                {[
                  'Professional design gepersonaliseerd naar uw huisstijl',
                  'Implementatie van alle aangeleverde content',
                  'Export in de juiste formaten of online publicatie',
                  'Minor revisions volgens revision policy',
                  'Basis instructies voor gebruik & beheer',
                  'Email support tijdens het project',
                ].map((item) => (
                  <motion.div
                    key={item}
                    variants={fadeInUp}
                    className="flex items-start gap-3"
                  >
                    <svg
                      className="w-4 h-4 text-primary mt-0.5 shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="3"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-foreground/80 leading-relaxed">{item}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        <CTABanner />
      </main>
      <Footer />
    </>
  )
}
