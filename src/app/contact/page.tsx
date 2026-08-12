'use client'

import { motion } from 'framer-motion'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { ContactForm } from '@/components/ContactForm'
import { SectionLabel } from '@/components/SectionLabel'
import { Mail, Phone, MapPin, Clock, ArrowRight } from 'lucide-react'
import {
  fadeInUp,
  blurFadeIn,
  slideInLeft,
  slideInRight,
  scaleIn,
  staggerContainer,
} from '@/lib/animationUtils'

const contactItems = [
  { icon: Mail, label: 'Email', value: 'agencynextx@gmail.com', href: 'mailto:agencynextx@gmail.com', isExternal: false },
  { icon: Phone, label: 'WhatsApp', value: '+597 831-8508', href: 'https://wa.me/5978318508', isExternal: true },
  { icon: MapPin, label: 'Locatie', value: 'Paramaribo, Suriname', href: null, isExternal: false },
  { icon: Clock, label: 'Reactietijd', value: 'Binnen 24-48 uur', href: null, isExternal: false },
] as const

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* ── Hero ── */}
        <section className="relative pt-36 pb-16 lg:pt-44 lg:pb-20 overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-px bg-foreground/10" />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="relative max-w-6xl mx-auto px-6 text-center z-10"
          >
            <motion.div variants={scaleIn}>
              <SectionLabel center>Neem Contact Op</SectionLabel>
            </motion.div>

            <motion.h1
              variants={blurFadeIn}
              className="font-bold tracking-tight max-w-4xl mx-auto mb-6 text-foreground"
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(2.6rem, 7vw, 5.5rem)',
                lineHeight: '1.05',
                letterSpacing: '-0.025em',
              }}
            >
              Laten we{' '}
              <span className="text-primary">samenwerken</span>
            </motion.h1>

            <motion.p variants={fadeInUp} className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
              Beschrijf uw project. Wij reageren binnen 24–48 uur met een helder
              voorstel. Liever direct? Stuur ons een WhatsApp bericht.
            </motion.p>
          </motion.div>
        </section>

        {/* Edge separator */}
        <div className="h-px bg-foreground/10" />

        {/* ── Main content ── */}
        <section className="py-16 lg:py-24 relative bg-background-elevated">

          <div className="max-w-6xl mx-auto px-6 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-10 lg:gap-14 items-start">

              {/* ── Form column ── */}
              <motion.div
                variants={slideInLeft}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-9 h-9 bg-primary flex items-center justify-center shrink-0">
                    <Mail size={17} className="text-white" />
                  </div>
                  <h2
                    className="text-2xl font-bold text-foreground"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    Stuur ons een bericht
                  </h2>
                </div>
                <ContactForm />
              </motion.div>

              {/* ── Info column ── */}
              <motion.div
                variants={slideInRight}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                className="lg:sticky lg:top-28"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-9 h-9 bg-primary flex items-center justify-center shrink-0">
                    <Phone size={17} className="text-white" />
                  </div>
                  <h2
                    className="text-2xl font-bold text-foreground"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    Direct contact
                  </h2>
                </div>

                {/* Light contact card */}
                <div className="overflow-hidden mb-4 bg-card border border-foreground/15">
                  <div className="p-5 space-y-2">
                    {contactItems.map(({ icon: Icon, label, value, href, isExternal }, i) => (
                      <motion.div
                        key={label}
                        initial={{ opacity: 0, x: 16 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.08, duration: 0.4 }}
                      >
                        {href ? (
                          <a
                            href={href}
                            {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                            className="flex items-center gap-4 p-4 border border-border hover:border-primary transition-colors duration-300 group"
                          >
                            <div className="w-10 h-10 border border-foreground/15 flex items-center justify-center shrink-0 group-hover:border-primary transition-colors duration-300">
                              <Icon size={18} className="text-primary" />
                            </div>
                            <div className="min-w-0">
                              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.15em] mb-0.5">{label}</p>
                              <p className="text-foreground font-semibold text-sm group-hover:text-primary transition-colors truncate">{value}</p>
                            </div>
                            <ArrowRight size={14} className="text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all duration-300 ml-auto shrink-0" />
                          </a>
                        ) : (
                          <div className="flex items-center gap-4 p-4 border border-border">
                            <div className="w-10 h-10 border border-foreground/15 flex items-center justify-center shrink-0">
                              <Icon size={18} className="text-primary" />
                            </div>
                            <div className="min-w-0">
                              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.15em] mb-0.5">{label}</p>
                              <p className="text-foreground font-semibold text-sm">{value}</p>
                            </div>
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* WhatsApp CTA — solid orange */}
                <motion.a
                  href="https://wa.me/5978318508"
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.45 }}
                  className="group flex items-center justify-between w-full p-6 bg-primary transition-colors duration-300 hover:bg-primary-hover"
                >
                  <div>
                    <p className="text-white font-bold text-base mb-0.5" style={{ fontFamily: 'var(--font-heading)' }}>
                      Liever direct chatten?
                    </p>
                    <p className="text-white/70 text-sm">We reageren binnen 1 uur</p>
                  </div>
                  <div className="w-11 h-11 bg-white/20 flex items-center justify-center shrink-0 group-hover:bg-white/30 transition-colors duration-300">
                    <ArrowRight size={18} className="text-white" />
                  </div>
                </motion.a>
              </motion.div>

            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
