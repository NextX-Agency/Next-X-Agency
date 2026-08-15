'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
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
  TrendingUp,
  Shield,
  RefreshCw,
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
  { icon: Zap, title: 'Snel geleverd', description: 'De meeste sites staan binnen 48 tot 72 uur live. U hoort de opleverdatum voordat we beginnen.' },
  { icon: DollarSign, title: 'Vaste prijzen', description: 'U weet het bedrag vooraf. Werk dat er later bij komt, prijzen we apart en met uw akkoord.' },
  { icon: Palette, title: 'Eigen ontwerp', description: 'Elk ontwerp begint bij uw merk en uw klanten, niet bij een kant-en-klaar thema.' },
  { icon: RefreshCw, title: 'Revisies inbegrepen', description: 'Tijdens het project zitten er revisierondes bij de prijs. Wijzigingen ná oplevering gaan tegen $15 per uur.' },
  { icon: Shield, title: 'Geen verborgen kosten', description: 'Hosting, domein en meerwerk staan los op de offerte, zodat u ziet waar het geld heen gaat.' },
  { icon: TrendingUp, title: 'Groeit met u mee', description: 'Een pagina erbij of een webshop eraan vast kan later, zonder de site opnieuw te bouwen.' },
] as const

const expertise = [
  'Logo en huisstijl',
  'Websites en bedrijfspagina’s',
  'Webshops en checkout',
  'UX audits en UI ontwerp',
  'SEO en vindbaarheid',
  'Hosting, domein en onderhoud',
  'Maandelijkse support (UX Kukru)',
] as const

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main id="main">
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
              Een digitaal bureau uit Paramaribo dat websites, webshops en
              merken bouwt voor Surinaamse bedrijven. Sinds 2024.
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
                className="bg-card border border-foreground/15 p-8 lg:p-10"
              >
                <div className="w-14 h-14 border border-foreground/15 flex items-center justify-center mb-6">
                  <Target size={28} className="text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                  Onze <span className="text-primary">missie</span>
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Een Surinaams bedrijf een website geven waar het iets aan
                  heeft: klanten die u kunnen vinden, kunnen bereiken en kunnen
                  betalen. Tegen een bedrag dat een startende ondernemer hier
                  ook echt kan neerleggen.
                </p>
              </motion.div>

              <motion.div
                variants={slideInRight}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.4 }}
                className="bg-card border border-foreground/15 p-8 lg:p-10"
              >
                <div className="w-14 h-14 border border-foreground/15 flex items-center justify-center mb-6">
                  <Eye size={28} className="text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                  Onze <span className="text-primary">visie</span>
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Het bureau zijn waar Surinaamse ondernemers terugkomen als er
                  iets bij moet. Niet één oplevering en daarna stilte, maar
                  iemand die uw site kent en bereikbaar blijft.
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
              <motion.div variants={slideInLeft} className="lg:col-span-2 relative">
                <div className="absolute -bottom-3 -right-3 w-full h-full bg-primary" aria-hidden="true" />
                <div className="relative bg-white border border-foreground/15 px-10 py-24 flex items-center justify-center">
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
                  NextX Agency is een digitaal bureau in Paramaribo. Elk project
                  begint met een gesprek over uw bedrijf, uw klanten en wat de
                  website moet opleveren. Pas daarna gaan we ontwerpen, en dat
                  doen we zelf, tot het klopt.
                </motion.p>
                <motion.p variants={fadeInUp} className="text-lg text-muted-foreground leading-relaxed">
                  We zitten zelf in Paramaribo. Dat betekent dat we weten hoe
                  hier betaald wordt, dat WhatsApp belangrijker is dan een
                  contactformulier, en dat u ons gewoon kunt bellen als er iets
                  mis is met uw site.
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
                Waar wij op afgerekend willen worden
              </motion.h2>
              <motion.p variants={fadeInUp} className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                Zes afspraken die voor elk project gelden, ongeacht de omvang.
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
                  className="bg-card border border-foreground/15 hover:border-primary p-8 transition-colors duration-300 group"
                >
                  <div className="w-12 h-12 border border-foreground/15 group-hover:bg-primary group-hover:border-primary flex items-center justify-center mb-4 transition-colors duration-300">
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
                Wat wij doen
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
                <motion.div
                  key={item}
                  variants={{ hidden: { opacity: 0, scale: 0.7, y: 10 }, visible: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 350, damping: 18 } } }}
                >
                  <Link
                    href="/services"
                    className="block px-4 py-2 border border-foreground/20 text-foreground text-sm font-medium hover:border-primary hover:text-primary transition-colors"
                  >
                    {item}
                  </Link>
                </motion.div>
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
