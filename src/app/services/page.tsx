'use client'

import { motion } from 'framer-motion'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { CTABanner } from '@/components/sections/CTABanner'
import {
  Brush,
  Globe,
  ShoppingCart,
  Figma,
  Search,
  Server,
  Users,
  Check,
} from 'lucide-react'
import {
  fadeInUp,
  fadeInDown,
  slideInLeft,
  staggerContainer,
  staggerContainerFast,
  staggerContainerSlow,
  cardFlipIn,
  scaleIn,
} from '@/lib/animationUtils'

const serviceCategories = [
  {
    id: 'graphic-design',
    icon: Brush,
    title: 'Graphic Marketing & Visual Design',
    description:
      'Professionele visuele identiteit voor uw merk — van logo tot social media content.',
    services: [
      {
        name: 'Logo Design',
        price: 'Vanaf $20',
        includes:
          '1 logo concept, 2 revisie rondes, export PNG/JPG (transparant + wit). Extra formats op aanvraag.',
      },
      {
        name: 'Social Media Post Design',
        price: '$4 per post',
        includes:
          '1 design per post, 1 revisie ronde, Instagram/Facebook ready formaat (1080×1080 of 1080×1350).',
      },
      {
        name: 'Flyer/Poster Design',
        price: 'Vanaf $8',
        includes:
          '1 design, 2 revisie rondes, print-ready PDF (A4/A5 standaard). Custom formaten mogelijk.',
      },
    ],
  },
  {
    id: 'websites',
    icon: Globe,
    title: 'Websites & Online Presence',
    description:
      'Volledig responsive websites gepersonaliseerd naar uw huisstijl, met SSL en basis SEO inbegrepen.',
    services: [
      {
        name: 'Business Card Site',
        price: 'Vanaf $100',
        includes:
          'One-page design, bedrijfsinfo, WhatsApp knop, contactformulier, responsive design, online publicatie.',
      },
      {
        name: 'Service Website',
        price: 'Vanaf $120',
        includes:
          'Multi-page site (Home, Diensten, Over Ons, Contact), responsive design, contactformulier, online publicatie.',
      },
      {
        name: 'Portfolio Website',
        price: 'Vanaf $130',
        includes:
          'Portfolio galerij (max 20 items), project detail pagina\'s, over mij/ons, contact, responsive design.',
      },
      {
        name: 'Restaurant/Menu Site',
        price: 'Vanaf $130',
        includes:
          'Digitaal menu (max 50 items), openingstijden, locatie/kaart, reserveringslink, responsive design.',
      },
    ],
  },
  {
    id: 'e-commerce',
    icon: ShoppingCart,
    title: 'E-Commerce Webshops',
    description:
      'Complete webshops met winkelwagen, checkout en betalingsgateway integratie.',
    services: [
      {
        name: 'Starter Webshop',
        price: 'Vanaf $280',
        includes:
          'Max 25 producten, winkelwagen, checkout, betalingsgateway (Stripe/PayPal), responsive design, basis productbeheer instructies.',
      },
      {
        name: 'Grotere Webshop',
        price: 'Vanaf $420',
        includes:
          'Max 100 producten, categorieën, filters, zoekfunctie, klantaccounts, order tracking, meerdere betaalmethoden, uitgebreide instructies.',
      },
    ],
    note: 'Extra producten boven limiet: $2 per product (tot 250 producten). Meer dan 250 producten = custom pricing.',
  },
  {
    id: 'ux-ui',
    icon: Figma,
    title: 'UX/UI Design Services',
    description:
      'Verbeter uw gebruikerservaring met professionele UX audits en UI re-designs.',
    services: [
      {
        name: 'UX Audit & Advies',
        price: 'Vanaf $50',
        includes:
          'Analyse van huidige website/app, verbeterpunten rapport (PDF), basis aanbevelingen.',
      },
      {
        name: 'UI Design (Re-design)',
        price: 'Vanaf $90',
        includes:
          'Nieuw design voor max 3 pagina\'s/schermen, Figma/Adobe XD mockups, 2 revisie rondes. Implementatie apart geprijsd.',
      },
    ],
  },
  {
    id: 'seo',
    icon: Search,
    title: 'SEO & Online Zichtbaarheid',
    description:
      'Verbeter uw vindbaarheid in zoekmachines met professionele SEO optimalisatie.',
    services: [
      {
        name: 'Basic SEO Setup',
        price: 'Vanaf $30',
        includes:
          'Meta tags optimalisatie, sitemap, Google Search Console setup, robots.txt configuratie.',
      },
      {
        name: 'Maandelijkse SEO Support',
        price: '$25/maand',
        includes:
          'Maandelijkse performance rapportage, keyword monitoring, content suggesties, technische checks. Min. 3 maanden contract.',
      },
    ],
  },
  {
    id: 'hosting',
    icon: Server,
    title: 'Webhosting & Technische Support',
    description:
      'Betrouwbare hosting met SSL, dagelijkse backups en 99.9% uptime garantie.',
    services: [
      {
        name: 'Hosting Setup (eenmalig)',
        price: '$15',
        includes:
          'Hosting account aanmaken, domein koppeling, SSL installatie, website deployment.',
      },
      {
        name: 'Basic Hosting',
        price: '$4/maand',
        includes:
          '10GB storage, 100GB bandwidth, SSL, dagelijkse backups, 99.9% uptime.',
      },
      {
        name: 'Business Hosting',
        price: '$10/maand',
        includes:
          '50GB storage, onbeperkte bandwidth, SSL, CDN, dagelijkse backups, priority support, 99.9% uptime.',
      },
    ],
    note: 'Domein registratie niet inbegrepen — klant registreert eigen domein of wij verzorgen dit tegen kostprijs + $5 service fee.',
  },
  {
    id: 'ux-kukru',
    icon: Users,
    title: 'UX Kukru — Outsourcing Service',
    description:
      'Toegang tot ons volledige NextX team via één dedicated specialist. Flexibele maandpakketten voor structurele digitale ondersteuning.',
    services: [
      {
        name: 'Starter Support',
        price: '$90/maand',
        includes:
          '10 uur/maand, kleine updates, bug fixes, content wijzigingen, technisch advies, email support (48u response).',
      },
      {
        name: 'Business Support',
        price: '$160/maand',
        includes:
          '20 uur/maand, feature development, design updates, integraties, strategisch advies, Slack support (24u response).',
      },
      {
        name: 'Partner Support',
        price: '$260/maand',
        includes:
          '40 uur/maand, dedicated specialist, priority support, complexe projecten, team collaboration, direct contact (12u response).',
      },
    ],
    note: 'Extra uren boven pakket limiet: $12/uur. Alle pakketten vereisen minimaal 3 maanden commitment.',
  },
]

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* ── Hero ─────────────────────────────────────────── */}
        <section className="relative py-20 lg:py-32 overflow-hidden circuit-bg">
          {/* Animated SVG circuit overlay — draws in then pulses */}
          <motion.svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            aria-hidden="true"
            viewBox="0 0 1200 400"
            preserveAspectRatio="xMidYMid slice"
            initial={{ opacity: 0.2 }}
            animate={{ opacity: [0.2, 0.32, 0.2] }}
            transition={{ duration: 5, delay: 5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <motion.line x1="0" y1="80" x2="400" y2="80" stroke="#FF6B00" strokeWidth="0.8"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
              transition={{ duration: 2, delay: 0.3, ease: 'easeInOut' }} />
            <motion.line x1="400" y1="80" x2="400" y2="200" stroke="#FF6B00" strokeWidth="0.8"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
              transition={{ duration: 1, delay: 2.2, ease: 'easeInOut' }} />
            <motion.line x1="400" y1="200" x2="900" y2="200" stroke="#FF6B00" strokeWidth="0.8"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
              transition={{ duration: 1.8, delay: 3.1, ease: 'easeInOut' }} />
            <motion.line x1="1200" y1="320" x2="800" y2="320" stroke="#FF6B00" strokeWidth="0.8"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
              transition={{ duration: 2, delay: 0.6, ease: 'easeInOut' }} />
            <motion.line x1="800" y1="320" x2="800" y2="150" stroke="#FF6B00" strokeWidth="0.8"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
              transition={{ duration: 1.2, delay: 2.5, ease: 'easeInOut' }} />
            {/* Travelling signal dot along circuit */}
            <motion.circle r="3" fill="#FF6B00"
              animate={{ cx: [0, 400, 400, 900, 900], cy: [80, 80, 200, 200, 200], opacity: [0, 1, 1, 1, 0] }}
              transition={{ duration: 4, delay: 5.5, repeat: Infinity, repeatDelay: 4, ease: 'linear' }} />
            {[
              [400, 80], [400, 200], [900, 200], [800, 320], [800, 150],
            ].map(([cx, cy], i) => (
              <motion.circle key={i} cx={cx} cy={cy} r="4" fill="#FF6B00"
                initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.5 + i * 0.6, type: 'spring', stiffness: 300 }} />
            ))}
          </motion.svg>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          >
            <motion.span variants={fadeInDown} className="section-label">— Ons Aanbod —</motion.span>
            <motion.h1 variants={fadeInUp} className="text-display text-white max-w-4xl mx-auto mb-6">
              Alles wat uw bedrijf digitaal nodig heeft
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-body-lg text-[#888888] max-w-2xl mx-auto">
              Van logo en social media tot complete webshops en maandelijkse
              support. Één partner, complete oplossingen.
            </motion.p>
          </motion.div>
        </section>

        {/* ── Service Categories ───────────────────────────── */}
        {serviceCategories.map((category, index) => (
          <section
            key={category.id}
            id={category.id}
            className={`py-16 lg:py-24 relative overflow-hidden ${index % 2 === 1 ? 'bg-[#111111]' : 'bg-[#0a0a0a]'}`}
          >
            {/* Decorative corner SVG — circuit crosshair drawing on scroll */}
            <svg
              className="absolute top-4 right-4 opacity-8 pointer-events-none"
              aria-hidden="true"
              width="160" height="160" viewBox="0 0 160 160"
            >
              <motion.circle cx="80" cy="80" r="70" fill="none" stroke="#FF6B00" strokeWidth="1"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 1.8, ease: 'easeInOut', delay: index * 0.1 }} />
              <motion.circle cx="80" cy="80" r="48" fill="none" stroke="#FF6B00" strokeWidth="0.6"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 1.4, ease: 'easeInOut', delay: 0.3 + index * 0.1 }} />
              <motion.line x1="10" y1="80" x2="150" y2="80" stroke="#FF6B00" strokeWidth="0.5"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 0.7 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, delay: 0.6 + index * 0.1 }} />
              <motion.line x1="80" y1="10" x2="80" y2="150" stroke="#FF6B00" strokeWidth="0.5"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 0.7 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, delay: 0.75 + index * 0.1 }} />
            </svg>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              {/* Category header */}
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                className="flex items-start gap-4 mb-10"
              >
                <motion.div
                  variants={scaleIn}
                  className="w-14 h-14 bg-[#1a1a1a] border border-[#FF6B00]/30 flex items-center justify-center shrink-0"
                  style={{ borderRadius: '2px' }}
                  whileHover={{ scale: 1.1, borderColor: 'rgba(255,107,0,0.8)', transition: { duration: 0.2 } }}
                >
                  <category.icon size={28} className="text-[#FF6B00]" />
                </motion.div>
                <div>
                  <motion.span variants={fadeInDown} className="section-label">
                    — {category.title.toUpperCase()} —
                  </motion.span>
                  <motion.h2 variants={slideInLeft} className="text-headline text-white mb-2">
                    {category.title}
                  </motion.h2>
                  <motion.p variants={fadeInUp} className="text-body-lg text-[#888888]">
                    {category.description}
                  </motion.p>
                </div>
              </motion.div>

              {/* Service cards */}
              <motion.div
                variants={staggerContainerFast}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {category.services.map((service) => (
                  <motion.div
                    key={service.name}
                    variants={cardFlipIn}
                    className="card-service relative overflow-hidden group"
                    whileHover={{ y: -8, transition: { duration: 0.25, ease: 'easeOut' } }}
                  >
                    {/* Hover glow */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-[#FF6B00]/0 to-[#FF6B00]/0 pointer-events-none"
                      whileHover={{ background: 'linear-gradient(to bottom right, rgba(255,107,0,0.05), rgba(255,107,0,0.02))' }}
                    />
                    {/* Top accent line */}
                    <motion.div
                      className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-[#FF6B00] to-transparent"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.1 }}
                      style={{ transformOrigin: 'left', width: '100%' }}
                    />
                    <div className="flex items-start justify-between mb-3 relative z-10">
                      <h3 className="text-title text-white">{service.name}</h3>
                      <motion.span
                        className="price-badge ml-4"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ type: 'spring', stiffness: 300, damping: 18, delay: 0.2 }}
                      >
                        {service.price}
                      </motion.span>
                    </div>
                    <p className="text-body text-[#888888] relative z-10">{service.includes}</p>
                    {/* Corner accent */}
                    <span className="absolute bottom-2 right-2 w-3 h-3 border-r border-b border-[#FF6B00]/30" />
                  </motion.div>
                ))}
              </motion.div>

              {/* Note */}
              {'note' in category && category.note && (
                <motion.p
                  className="text-caption text-[#888888] mt-6 bg-[#1a1a1a] border-l-2 border-[#FF6B00] p-4"
                  style={{ borderRadius: '2px' }}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <strong className="text-white">Let op:</strong>{' '}
                  {category.note}
                </motion.p>
              )}
            </div>
          </section>
        ))}

        {/* ── Always Included ──────────────────────────────── */}
        <section className="py-16 lg:py-24 bg-[#111111] relative overflow-hidden">
          {/* Decorative SVG left — drawing on scroll */}
          <svg className="absolute left-0 top-1/2 -translate-y-1/2 pointer-events-none" aria-hidden="true" width="200" height="300" viewBox="0 0 200 300">
            <motion.circle cx="0" cy="150" r="120" fill="none" stroke="#FF6B00" strokeWidth="1"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 0.08 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 2, ease: 'easeInOut' }} />
            <motion.circle cx="0" cy="150" r="80" fill="none" stroke="#FF6B00" strokeWidth="0.6"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 0.06 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1.5, ease: 'easeInOut', delay: 0.4 }} />
          </svg>
          {/* Decorative SVG right — drawing on scroll */}
          <svg className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none" aria-hidden="true" width="200" height="300" viewBox="0 0 200 300">
            <motion.circle cx="200" cy="150" r="120" fill="none" stroke="#FF6B00" strokeWidth="1"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 0.08 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 2, ease: 'easeInOut', delay: 0.2 }} />
            <motion.circle cx="200" cy="150" r="80" fill="none" stroke="#FF6B00" strokeWidth="0.6"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 0.06 }}
              viewport={{ once: true, amount: 0.3 }}
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
              <motion.span variants={fadeInDown} className="section-label">— Standaard —</motion.span>
              <motion.h2 variants={fadeInUp} className="text-headline text-white mb-4">
                Altijd inbegrepen
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-body-lg text-[#888888] max-w-2xl mx-auto">
                Bij elke service ontvangt u standaard het volgende — zonder extra kosten.
              </motion.p>
            </motion.div>

            <motion.div
              variants={staggerContainerSlow}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto"
            >
              {[
                'Template-based professional design gepersonaliseerd naar huisstijl',
                'Implementatie van alle aangeleverde content',
                'Export in juiste formaten of online publicatie',
                'Gratis minor revisions volgens revision policy',
                'Basis instructies voor gebruik/beheer',
                'Email support tijdens project',
              ].map((item, i) => (
                <motion.div
                  key={item}
                  variants={fadeInUp}
                  className="flex items-start gap-3 p-3 rounded-lg group"
                  whileHover={{ backgroundColor: 'rgba(255,107,0,0.04)', transition: { duration: 0.2 } }}
                >
                  <motion.div
                    initial={{ scale: 0, rotate: -20 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ type: 'spring', stiffness: 400, damping: 12, delay: i * 0.08 }}
                    className="shrink-0 mt-0.5"
                  >
                    <Check size={16} className="text-[#FF6B00]" />
                  </motion.div>
                  <span className="text-sm text-[#888888]">{item}</span>
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
