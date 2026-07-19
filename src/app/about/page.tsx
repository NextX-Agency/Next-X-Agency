'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { SectionLabel } from '@/components/SectionLabel'
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
  fadeInDown,
  slideInLeft,
  slideInRight,
  scaleIn,
  staggerContainer,
  staggerContainerSlow,
  cardFlipIn,
} from '@/lib/animationUtils'

const values = [
  { icon: Zap, title: 'Snel Geleverd', description: 'Een strak proces en korte lijnen, dus geen maanden wachten op uw website.' },
  { icon: DollarSign, title: 'Betaalbaar', description: 'Vaste prijzen die passen bij Surinaamse ondernemers, zonder in te leveren op kwaliteit.' },
  { icon: Palette, title: 'Eigen Ontwerp', description: 'Elk ontwerp begint bij uw merk en uw klanten, niet bij een kant-en-klaar thema.' },
  { icon: Heart, title: 'Gratis Revisierondes', description: 'Kleine aanpassingen na oplevering horen er gewoon bij.' },
  { icon: Shield, title: 'Transparant', description: 'Geen verborgen kosten, altijd vooraf gecommuniceerd.' },
  { icon: MapPin, title: 'Uitbreidbaar', description: 'Uw website groeit mee: maatwerk en uitbreidingen zijn altijd mogelijk.' },
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
        {/* Hero */}
        <section className="relative py-24 lg:py-36 overflow-hidden">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="relative max-w-6xl mx-auto px-6 text-center"
          >
            <motion.div variants={scaleIn}>
              <SectionLabel center>Over Ons</SectionLabel>
            </motion.div>
            <motion.h1 variants={fadeInUp} className="text-5xl md:text-6xl font-bold text-foreground tracking-tight max-w-4xl mx-auto mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
              Wij zijn NextX Agency
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Een digitaal bureau uit Paramaribo dat websites en merken ontwerpt
              met aandacht — voor bedrijven die serieus genomen willen worden
              online.
            </motion.p>
          </motion.div>
        </section>

        {/* Mission & Vision */}
        <section className="py-24 lg:py-32 relative">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <motion.div
                variants={slideInLeft}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.4 }}
                className="card-glow bg-card border border-border rounded-3xl p-8 lg:p-10 relative overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-lg hover:border-primary/20"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                  <Target size={28} className="text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                  Onze <span className="text-primary">Missie</span>
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Bedrijven niet alleen online brengen, maar hen structureel
                  laten groeien door professionele digitale oplossingen
                  toegankelijk te maken voor startups en groeiende ondernemingen.
                </p>
              </motion.div>

              <motion.div
                variants={slideInRight}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.4 }}
                className="card-glow bg-card border border-border rounded-3xl p-8 lg:p-10 relative overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-lg hover:border-primary/20"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                  <Eye size={28} className="text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                  Onze <span className="text-primary">Visie</span>
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  De vaste digitale partner zijn voor Surinaamse ondernemers:
                  een bureau dat meedenkt over uw bedrijf, ontwerpt met smaak en
                  levert zonder de hoge kosten van traditionele agencies.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* About text */}
        <section className="py-24 lg:py-32 bg-background-elevated relative">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center"
            >
              {/* Brand mark */}
              <motion.div variants={slideInLeft} className="lg:col-span-2">
                <div className="rounded-3xl bg-white border border-border shadow-lg shadow-black/10 px-10 py-24 flex items-center justify-center">
                  <Image
                    src="/logo-light.png"
                    alt="NextX Agency logo"
                    width={420}
                    height={210}
                    className="w-full h-auto object-contain"
                  />
                </div>
              </motion.div>

              {/* Text */}
              <div className="lg:col-span-3">
                <motion.h2 variants={fadeInDown} className="text-3xl md:text-4xl font-bold text-foreground mb-6 tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
                  Wie zijn wij?
                </motion.h2>
                <motion.p variants={fadeInUp} className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  NextX Agency is een digitaal bureau in Paramaribo, Suriname.
                  Wij geloven niet in websites van de lopende band: elk project
                  begint met een gesprek over uw bedrijf, uw klanten en wat uw
                  website moet bereiken. Pas daarna gaan we ontwerpen — en dat
                  doen we zelf, met oog voor detail, tot het klopt.
                </motion.p>
                <motion.p variants={fadeInUp} className="text-lg text-muted-foreground leading-relaxed">
                  Als lokale Surinaamse startup begrijpen wij de unieke uitdagingen
                  en kansen van de Surinaamse markt en bieden wij internationale
                  kwaliteit tegen lokaal toegankelijke prijzen.
                </motion.p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-24 lg:py-32 relative">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
              className="text-center mb-16"
            >
              <motion.h2 variants={fadeInDown} className="text-3xl md:text-4xl font-bold text-foreground tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
                Onze Kernwaarden
              </motion.h2>
              <motion.p variants={fadeInUp} className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                Deze waarden staan centraal in alles wat wij doen.
              </motion.p>
            </motion.div>

            <motion.div
              variants={staggerContainerSlow}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {values.map((value) => (
                <motion.div
                  key={value.title}
                  variants={cardFlipIn}
                  className="card-glow bg-card border border-border rounded-3xl p-8 relative overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-lg hover:border-primary/20 group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 group-hover:bg-primary flex items-center justify-center mb-4 transition-colors duration-300">
                    <value.icon size={24} className="text-primary group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{value.title}</h3>
                  <p className="text-muted-foreground text-sm">{value.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Expertise */}
        <section className="py-24 lg:py-32 bg-background-elevated relative">
          <div className="max-w-6xl mx-auto px-6 relative z-10">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
              className="text-center mb-12"
            >
              <motion.h2 variants={fadeInDown} className="text-3xl md:text-4xl font-bold text-foreground tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
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
                  className="px-4 py-2 rounded-full border border-primary/25 bg-primary/10 text-primary text-sm font-medium cursor-default transition-all hover:scale-105 hover:-translate-y-1"
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
