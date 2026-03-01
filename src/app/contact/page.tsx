'use client'

import { motion } from 'framer-motion'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { ContactForm } from '@/components/ContactForm'
import { Mail, Phone, MapPin, Clock } from 'lucide-react'
import {
  fadeInUp,
  fadeInDown,
  slideInLeft,
  slideInRight,
  scaleIn,
  staggerContainer,
  staggerContainerFast,
  cardFlipIn,
} from '@/lib/animationUtils'

const contactItems = [
  { icon: Mail, label: 'Email', value: 'lranoesendjojo@gmail.com', href: 'mailto:lranoesendjojo@gmail.com', isExternal: false },
  { icon: Phone, label: 'WhatsApp', value: '+597 831-8508', href: 'https://wa.me/5978318508', isExternal: true },
  { icon: MapPin, label: 'Locatie', value: 'Paramaribo, Suriname', href: null, isExternal: false },
  { icon: Clock, label: 'Reactietijd', value: 'Binnen 24-48 uur', href: null, isExternal: false },
] as const

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* ── Hero ──────────────────────────────────────────── */}
        <section className="relative py-20 lg:py-32 overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(249,112,21,0.12) 0%, transparent 60%)' }}
          />
          {/* Animated signal circles — draw in then pulse forever */}
          <motion.svg className="absolute right-0 top-1/2 -translate-y-1/2 w-[340px] h-[340px] pointer-events-none" aria-hidden="true" viewBox="0 0 340 340"
            initial={{ opacity: 0.08 }}
            animate={{ opacity: [0.08, 0.18, 0.08] }}
            transition={{ duration: 3.5, delay: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <motion.circle cx="340" cy="170" r="220" fill="none" stroke="#FF6B00" strokeWidth="0.8"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
              transition={{ duration: 2.5, ease: 'easeInOut' }} />
            <motion.circle cx="340" cy="170" r="150" fill="none" stroke="#FF6B00" strokeWidth="0.5"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
              transition={{ duration: 2, delay: 0.4, ease: 'easeInOut' }} />
            <motion.circle cx="340" cy="170" r="80" fill="none" stroke="#FF6B00" strokeWidth="0.4"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, delay: 0.8, ease: 'easeInOut' }} />
            {/* Signal spokes */}
            <motion.line x1="340" y1="0" x2="340" y2="340" stroke="#FF6B00" strokeWidth="0.4"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
              transition={{ duration: 1, delay: 1.5, ease: 'easeInOut' }} />
            <motion.line x1="120" y1="170" x2="340" y2="170" stroke="#FF6B00" strokeWidth="0.4"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
              transition={{ duration: 0.8, delay: 1.8, ease: 'easeInOut' }} />
          </motion.svg>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          >
            <motion.div variants={scaleIn} className="inline-flex badge bg-primary-muted text-primary border border-primary/30 mb-8">
              Neem Contact Op
            </motion.div>
            <motion.h1 variants={fadeInUp} className="text-display text-foreground max-w-4xl mx-auto mb-6">
              Laten we samenwerken
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-body-lg text-muted-foreground max-w-2xl mx-auto">
              Beschrijf uw project en wij sturen binnen 24-48 uur een
              vrijblijvende quote. Of stuur direct een WhatsApp bericht.
            </motion.p>
          </motion.div>
        </section>

        {/* ── Contact content ───────────────────────────────── */}
        <section className="py-16 lg:py-24 relative overflow-hidden">
          {/* Decorative left glow */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[200px] h-[400px] bg-primary/3 blur-[80px] pointer-events-none" />          {/* Antenna / signal bar decoration — left side */}
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none hidden xl:block" aria-hidden="true" width="48" height="280" viewBox="0 0 48 280">
            <motion.line x1="24" y1="280" x2="24" y2="0" stroke="#FF6B00" strokeWidth="0.8"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 0.18 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1.8, ease: 'easeInOut' }} />
            {[40, 100, 160, 220].map((y, i) => (
              <motion.line key={i} x1="24" y1={y} x2={i % 2 === 0 ? 44 : 4} y2={y} stroke="#FF6B00" strokeWidth="0.8"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 0.3 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 + i * 0.15 }} />
            ))}
            {[40, 160].map((y, i) => (
              <motion.circle key={i} cx="24" cy={y} r="3" fill="#FF6B00"
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 0.4 }}
                viewport={{ once: true }}
                transition={{ delay: 1.2 + i * 0.2, type: 'spring', stiffness: 300 }} />
            ))}
          </svg>
          {/* Signal bars decoration — above info column */}
          <svg className="absolute right-8 top-8 pointer-events-none" aria-hidden="true" width="60" height="40" viewBox="0 0 60 40">
            {[0,1,2].map(i => (
              <motion.rect key={i} x={i * 22} y={30 - i * 10} width="14" height={10 + i * 10} rx="2"
                fill="none" stroke="#FF6B00" strokeWidth="1"
                initial={{ scaleY: 0, opacity: 0 }}
                whileInView={{ scaleY: 1, opacity: 0.25 }}
                viewport={{ once: true }}
                style={{ transformOrigin: 'bottom' }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.12 }} />
            ))}
          </svg>          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

              {/* ── Form ── */}
              <motion.div
                variants={slideInLeft}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
              >
                <motion.h2 variants={fadeInDown} className="text-headline text-foreground mb-6">
                  Stuur ons een bericht
                </motion.h2>
                {/* Animated top accent */}
                <motion.div
                  className="h-[2px] bg-gradient-to-r from-primary to-transparent mb-6"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  style={{ transformOrigin: 'left' }}
                />
                <ContactForm />
              </motion.div>

              {/* ── Info ── */}
              <motion.div
                variants={slideInRight}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
              >
                <motion.h2 variants={fadeInDown} className="text-headline text-foreground mb-6">
                  Direct contact
                </motion.h2>
                <motion.div
                  className="h-[2px] bg-gradient-to-r from-primary to-transparent mb-8"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  style={{ transformOrigin: 'left' }}
                />

                <motion.div
                  variants={staggerContainerFast}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.1 }}
                  className="space-y-4 mb-10"
                >
                  {contactItems.map(({ icon: Icon, label, value, href, isExternal }) => (
                    <motion.div
                      key={label}
                      variants={cardFlipIn}
                      className="flex items-start gap-4 bg-card border border-border rounded-xl p-4 relative overflow-hidden"
                      whileHover={{ x: 4, transition: { duration: 0.2 } }}
                    >
                      <motion.div
                        className="w-11 h-11 rounded-xl bg-primary-muted flex items-center justify-center shrink-0"
                        initial={{ scale: 0, rotate: -20 }}
                        whileInView={{ scale: 1, rotate: 0 }}
                        viewport={{ once: true }}
                        transition={{ type: 'spring', stiffness: 350, damping: 14, delay: 0.2 }}
                        whileHover={{ scale: 1.12, rotate: 5, transition: { duration: 0.18 } }}
                      >
                        <Icon size={22} className="text-primary" />
                      </motion.div>
                      <div>
                        <p className="font-semibold text-foreground mb-0.5 text-sm">{label}</p>
                        {href ? (
                          <a
                            href={href}
                            {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                            className="text-muted-foreground hover:text-primary transition-colors text-sm"
                          >
                            {value}
                          </a>
                        ) : (
                          <p className="text-muted-foreground text-sm">{value}</p>
                        )}
                      </div>
                      {/* Left accent */}
                      <motion.div
                        className="absolute left-0 top-0 w-[3px] h-full bg-primary/50 rounded-l-xl"
                        initial={{ scaleY: 0 }}
                        whileInView={{ scaleY: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.3 }}
                        style={{ transformOrigin: 'top' }}
                      />
                    </motion.div>
                  ))}
                </motion.div>

                {/* WhatsApp CTA card */}
                <motion.div
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.4 }}
                  className="bg-card border border-border rounded-xl p-6 relative overflow-hidden"
                  whileHover={{ y: -4, transition: { duration: 0.22 } }}
                >
                  {/* Top accent */}
                  <motion.div
                    className="absolute top-0 left-0 h-[3px] bg-gradient-to-r from-primary to-transparent w-full"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    style={{ transformOrigin: 'left' }}
                  />
                  {/* Corner dot pattern */}
                  <svg className="absolute bottom-2 right-2 opacity-10" aria-hidden="true" width="60" height="60" viewBox="0 0 60 60">
                    {[0,1,2].map(r => [0,1,2].map(c => (
                      <circle key={`${r}-${c}`} cx={8+c*22} cy={8+r*22} r="2" fill="#FF6B00" />
                    )))}
                  </svg>
                  <h3 className="text-title text-foreground mb-2">Liever direct chatten?</h3>
                  <p className="text-body text-muted-foreground mb-4">
                    Stuur ons een WhatsApp bericht en wij reageren zo snel mogelijk.
                  </p>
                  <motion.a
                    href="https://wa.me/5978318508"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-white rounded-xl font-semibold px-6 py-3 transition-colors duration-200"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <Phone size={20} />
                    <span>WhatsApp ons</span>
                  </motion.a>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
