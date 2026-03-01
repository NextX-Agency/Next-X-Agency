'use client'

import { motion } from 'framer-motion'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { CTABanner } from '@/components/sections/CTABanner'
import {
  Target,
  Eye,
  Zap,
  DollarSign,
  Palette,
  MapPin,
  Shield,
  Heart,
} from 'lucide-react'
import {
  fadeInUp,
  blurFadeIn,
  fadeInDown,
  slideInLeft,
  slideInRight,
  scaleIn,
  staggerContainer,
  staggerContainerSlow,
  cardFlipIn,
} from '@/lib/animationUtils'
import { SpotlightCard } from '@/components/animated/SpotlightCard'

const values = [
  {
    icon: Zap,
    title: 'Snel Geleverd',
    description: 'Template-based aanpak — bouwen niet vanaf nul.',
  },
  {
    icon: DollarSign,
    title: 'Betaalbaar',
    description: 'Startup-prijzen zonder kwaliteitsverlies.',
  },
  {
    icon: Palette,
    title: 'Volledig Gepersonaliseerd',
    description: 'Volledige aanpassing naar klantwensen.',
  },
  {
    icon: Heart,
    title: 'Gratis Revisions',
    description: 'Gratis minor revisions na oplevering.',
  },
  {
    icon: Shield,
    title: 'Transparant',
    description: 'Geen verborgen kosten, altijd vooraf gecommuniceerd.',
  },
  {
    icon: MapPin,
    title: 'Custom-ready',
    description: 'Mogelijkheid voor custom development en uitbreidingen.',
  },
] as const

const expertise = [
  'Graphic Design & Visual Marketing',
  'Web Design & Development',
  'E-commerce Solutions',
  'UX/UI Design & Optimization',
  'SEO & Online Marketing',
  'Web Hosting & Technical Support',
  'Outsourcing & Team Augmentation (UX Kukru)',
] as const

export default function AboutPage() {
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
          {/* Aurora + dots */}
          <div className="aurora-bg absolute inset-0 pointer-events-none opacity-25" />
          <div className="absolute right-0 top-0 w-1/3 h-full bg-dots opacity-15 pointer-events-none" />
          {/* Decorative split circle SVG — draw + subtle loop */}
          <svg className="absolute left-0 top-0 w-[320px] h-[320px] opacity-8 pointer-events-none" aria-hidden="true" viewBox="0 0 320 320">
            <motion.circle cx="0" cy="160" r="200" fill="none" stroke="#FF6B00" strokeWidth="0.8"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
              transition={{ duration: 2.5, ease: 'easeInOut' }} />
            <motion.circle cx="0" cy="160" r="130" fill="none" stroke="#FF6B00" strokeWidth="0.5"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
              transition={{ duration: 2, delay: 0.4, ease: 'easeInOut' }} />
            {/* Organic cross lines */}
            <motion.line x1="0" y1="100" x2="150" y2="160" stroke="#FF6B00" strokeWidth="0.4"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
              transition={{ duration: 1, delay: 1.5 }} />
            <motion.line x1="0" y1="220" x2="150" y2="160" stroke="#FF6B00" strokeWidth="0.4"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
              transition={{ duration: 1, delay: 1.7 }} />
          </svg>
          <motion.svg className="absolute right-0 bottom-0 w-[260px] h-[260px] opacity-8 pointer-events-none" aria-hidden="true" viewBox="0 0 260 260"
            initial={{ opacity: 0.08 }}
            animate={{ opacity: [0.08, 0.15, 0.08] }}
            transition={{ duration: 5, delay: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <motion.circle cx="260" cy="260" r="180" fill="none" stroke="#FF6B00" strokeWidth="0.8"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
              transition={{ duration: 2.5, delay: 0.3, ease: 'easeInOut' }} />
            <motion.circle cx="260" cy="260" r="110" fill="none" stroke="#FF6B00" strokeWidth="0.4"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
              transition={{ duration: 2, delay: 0.9, ease: 'easeInOut' }} />
          </motion.svg>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          >
            <motion.div variants={scaleIn} className="inline-flex badge bg-primary-muted text-primary border border-primary/30 mb-8">
              Over Ons
            </motion.div>
            <motion.h1 variants={fadeInUp} className="text-display text-foreground max-w-4xl mx-auto mb-6">
              Wij zijn NextX Agency
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-body-lg text-muted-foreground max-w-3xl mx-auto">
              Een innovatieve digitale startup gevestigd in Paramaribo, Suriname,
              die bedrijven helpt om professioneel zichtbaar te worden en te
              groeien in de digitale wereld.
            </motion.p>
          </motion.div>
        </section>

        {/* ── Mission & Vision ──────────────────────────────── */}
        <section className="py-16 lg:py-24 relative overflow-hidden">
          {/* Organic flowing S-curve between cards */}
          <svg className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-full max-w-2xl pointer-events-none hidden lg:block" aria-hidden="true" viewBox="0 0 600 100" preserveAspectRatio="xMidYMid meet">
            <motion.path d="M0 50 Q150 10 300 50 Q450 90 600 50" fill="none" stroke="#FF6B00" strokeWidth="0.7"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 0.12 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 2, ease: 'easeInOut', delay: 0.5 }} />
            <motion.path d="M0 50 Q150 25 300 50 Q450 75 600 50" fill="none" stroke="#FF6B00" strokeWidth="0.4"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 0.08 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 2, ease: 'easeInOut', delay: 0.8 }} />
          </svg>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
              {/* Mission */}
              <motion.div
                variants={slideInLeft}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.4 }}
                className="bg-card border border-border rounded-xl p-8 relative overflow-hidden hover-lift"
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
              >
                {/* Corner accent */}
                <span className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary/40 rounded-tl-xl" />
                <motion.div
                  className="w-14 h-14 rounded-xl bg-primary-muted flex items-center justify-center mb-6 icon-glow"
                  initial={{ scale: 0, rotate: -20 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ type: 'spring', stiffness: 300, damping: 18, delay: 0.2 }}
                >
                  <Target size={28} className="text-primary" />
                </motion.div>
                <h2 className="text-headline text-foreground mb-4"><span className="gradient-text-animated">Onze</span> Missie</h2>
                <p className="text-body-lg text-muted-foreground">
                  Bedrijven niet alleen online brengen, maar hen structureel
                  laten groeien door professionele digitale oplossingen
                  toegankelijk te maken voor startups en groeiende ondernemingen.
                </p>
                {/* Animated accent line */}
                <motion.div
                  className="absolute bottom-0 left-0 h-[3px] bg-gradient-to-r from-primary to-transparent"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.3 }}
                  style={{ transformOrigin: 'left', width: '100%' }}
                />
              </motion.div>

              {/* Vision */}
              <motion.div
                variants={slideInRight}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.4 }}
                className="bg-card border border-border rounded-xl p-8 relative overflow-hidden"
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
              >
                <span className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-primary/40 rounded-tr-xl" />
                <motion.div
                  className="w-14 h-14 rounded-xl bg-primary-muted flex items-center justify-center mb-6 icon-glow"
                  initial={{ scale: 0, rotate: -20 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ type: 'spring', stiffness: 300, damping: 18, delay: 0.3 }}
                >
                  <Eye size={28} className="text-primary" />
                </motion.div>
                <h2 className="text-headline text-foreground mb-4"><span className="gradient-text-animated">Onze</span> Visie</h2>
                <p className="text-body-lg text-muted-foreground">
                  De go-to digitale partner zijn voor ondernemers die hun online
                  aanwezigheid willen professionaliseren zonder de hoge kosten
                  van traditionele agencies. Door efficiëntie en kwaliteit te
                  combineren, maken we professionele digitale services
                  toegankelijk.
                </p>
                <motion.div
                  className="absolute bottom-0 right-0 h-[3px] bg-gradient-to-l from-primary to-transparent"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.3 }}
                  style={{ transformOrigin: 'right', width: '100%' }}
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── About text ───────────────────────────────────── */}
        <section className="py-16 lg:py-24 bg-background-elevated relative overflow-hidden">
          {/* Animated dot grid — staggered appear on scroll */}
          <svg className="absolute right-8 top-8 opacity-20 pointer-events-none" aria-hidden="true" width="120" height="120" viewBox="0 0 120 120">
            {[0,1,2,3,4].map(row => [0,1,2,3,4].map(col => (
              <motion.circle key={`${row}-${col}`} cx={12+col*24} cy={12+row*24} r="2" fill="#FF6B00"
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: (row * 5 + col) * 0.04, type: 'spring', stiffness: 300, damping: 14 }} />
            )))
            }
          </svg>
          {/* Organic wave divider left */}
          <svg className="absolute left-0 top-1/2 -translate-y-1/2 pointer-events-none" aria-hidden="true" width="80" height="300" viewBox="0 0 80 300">
            <motion.path d="M80 0 Q20 75 80 150 Q20 225 80 300" fill="none" stroke="#FF6B00" strokeWidth="0.8"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 0.15 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 2, ease: 'easeInOut' }} />
            <motion.path d="M60 0 Q10 75 60 150 Q10 225 60 300" fill="none" stroke="#FF6B00" strokeWidth="0.4"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 0.08 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 2, ease: 'easeInOut', delay: 0.3 }} />
          </svg>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="max-w-3xl mx-auto"
            >
              <motion.h2 variants={fadeInDown} className="text-headline text-foreground mb-6 text-center">
                Wie zijn wij?
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-body-lg text-muted-foreground mb-6">
                NextX Agency is een innovatieve digitale startup gevestigd in
                Paramaribo, Suriname, die bedrijven helpt om professioneel
                zichtbaar te worden en te groeien in de digitale wereld. Wij
                combineren betaalbaarheid met professionaliteit door te werken met
                een slimme template-based aanpak, waarbij we hoogwaardige
                basis-templates volledig personaliseren naar de wensen, stijl en
                &apos;vibe&apos; van elke klant.
              </motion.p>
              <motion.p variants={fadeInUp} className="text-body-lg text-muted-foreground">
                Als lokale Surinaamse startup begrijpen wij de unieke uitdagingen
                en kansen van de Surinaamse markt en bieden wij internationale
                kwaliteit tegen lokaal toegankelijke prijzen.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* ── Core Values ───────────────────────────────────── */}
        <section className="py-16 lg:py-24 relative overflow-hidden">          {/* Connecting arc SVG across the values grid */}
          <svg className="absolute bottom-8 left-1/2 -translate-x-1/2 w-full max-w-5xl pointer-events-none" aria-hidden="true" viewBox="0 0 1000 60" preserveAspectRatio="xMidYMid meet">
            <motion.path d="M50 30 C250 10 350 50 500 30 C650 10 750 50 950 30" fill="none" stroke="#FF6B00" strokeWidth="0.8"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 0.15 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 2.5, ease: 'easeInOut' }} />
            {[50, 500, 950].map((x, i) => (
              <motion.circle key={i} cx={x} cy="30" r="4" fill="#FF6B00"
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 0.3 }}
                viewport={{ once: true }}
                transition={{ delay: 1.5 + i * 0.2, type: 'spring', stiffness: 300 }} />
            ))}
          </svg>          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
              className="text-center mb-12 lg:mb-16"
            >
              <motion.h2 variants={fadeInDown} className="text-headline text-foreground mb-4">
                Onze Kernwaarden
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-body-lg text-muted-foreground max-w-2xl mx-auto">
                Deze waarden staan centraal in alles wat wij doen.
              </motion.p>
            </motion.div>

            <motion.div
              variants={staggerContainerSlow}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {values.map((value, i) => (
                <motion.div
                  key={value.title}
                  variants={cardFlipIn}
                  className="bg-card border border-border rounded-xl p-6 shadow-sm relative overflow-hidden"
                  whileHover={{ y: -8, scale: 1.01, transition: { duration: 0.22, ease: 'easeOut' } }}
                >
                  {/* Bg accent circle */}
                  <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-primary/5 pointer-events-none" />
                  <motion.div
                    className="w-12 h-12 rounded-xl bg-primary-muted flex items-center justify-center mb-4"
                    initial={{ scale: 0, rotate: -20 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ type: 'spring', stiffness: 350, damping: 14, delay: 0.1 + i * 0.07 }}
                    whileHover={{ rotate: 10, scale: 1.15, transition: { duration: 0.2 } }}
                  >
                    <value.icon size={24} className="text-primary" />
                  </motion.div>
                  <motion.h3
                    className="text-title text-foreground mb-2"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.15 + i * 0.07 }}
                  >
                    {value.title}
                  </motion.h3>
                  <p className="text-body text-muted-foreground">{value.description}</p>
                  {/* Bottom accent line */}
                  <motion.div
                    className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-primary/50 to-transparent"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 + i * 0.07 }}
                    style={{ transformOrigin: 'left', width: '60%' }}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── Expertise ─────────────────────────────────────── */}
        <section className="py-16 lg:py-24 bg-background-elevated relative overflow-hidden">
          {/* Decorative SVG \u2014 animated on scroll */}
          <svg className="absolute bottom-0 left-0 opacity-8 pointer-events-none" aria-hidden="true" width="300" height="200" viewBox="0 0 300 200">
            <motion.circle cx="0" cy="200" r="180" fill="none" stroke="#FF6B00" strokeWidth="1"
              initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
              transition={{ duration: 2.2, ease: 'easeInOut' }} />
            <motion.circle cx="0" cy="200" r="120" fill="none" stroke="#FF6B00" strokeWidth="0.6"
              initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
              transition={{ duration: 1.7, ease: 'easeInOut', delay: 0.3 }} />
            <motion.path d="M0 100 Q80 80 120 140 Q160 200 240 180" fill="none" stroke="#FF6B00" strokeWidth="0.5"
              initial={{ pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 0.5 }} viewport={{ once: true }}
              transition={{ duration: 1.5, ease: 'easeInOut', delay: 0.6 }} />
          </svg>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
              className="text-center mb-12"
            >
              <motion.h2 variants={fadeInDown} className="text-headline text-foreground mb-4">
                Onze Expertisegebieden
              </motion.h2>
            </motion.div>
            <motion.div
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } } }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto"
            >
              {expertise.map((item) => (
                <motion.span
                  key={item}
                  variants={{ hidden: { opacity: 0, scale: 0.7, y: 10 }, visible: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 350, damping: 18 } } }}
                  className="badge bg-primary-muted text-primary border border-primary/30 text-sm normal-case tracking-normal cursor-default"
                  whileHover={{ scale: 1.08, y: -3, transition: { duration: 0.18 } }}
                >
                  {item}
                </motion.span>
              ))}
            </motion.div>
          </div>
        </section>

        <CTABanner />
      </main>
      <Footer />
    </>
  )
}
