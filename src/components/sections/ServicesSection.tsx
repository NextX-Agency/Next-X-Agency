'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  fadeInUp,
  slideInLeft,
  staggerContainerFast,
  blurFadeIn,
} from '@/lib/animationUtils'

// Inline icons (line style, orange accents)
const IconBusinessCard = () => (
  <svg className="w-full h-full" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.4" viewBox="0 0 64 64" aria-hidden="true">
    <rect x="6" y="18" width="52" height="28" rx="4" />
    <line x1="6" y1="27" x2="58" y2="27" stroke="#f97316" strokeWidth="0.8" />
    <rect x="12" y="33" width="16" height="2" rx="1" fill="#f97316" opacity="0.7" />
    <rect x="12" y="38" width="10" height="1.5" rx="0.75" fill="currentColor" opacity="0.35" />
    <circle cx="47" cy="36" r="6" stroke="#f97316" strokeWidth="1" />
  </svg>
)

const IconServiceWebsite = () => (
  <svg className="w-full h-full" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.4" viewBox="0 0 64 64" aria-hidden="true">
    <rect x="8" y="12" width="48" height="36" rx="4" />
    <line x1="8" y1="22" x2="56" y2="22" stroke="#f97316" strokeWidth="0.8" />
    <circle cx="14" cy="17" r="1.5" fill="#f97316" />
    <circle cx="20" cy="17" r="1.5" fill="currentColor" opacity="0.4" />
    <circle cx="26" cy="17" r="1.5" fill="currentColor" opacity="0.25" />
    <rect x="14" y="28" width="36" height="3" rx="1" fill="currentColor" opacity="0.15" />
    <rect x="14" y="34" width="22" height="2" rx="1" fill="currentColor" opacity="0.1" />
    <path d="M22 56 L42 56" stroke="#f97316" strokeWidth="1" />
  </svg>
)

const IconWebshop = () => (
  <svg className="w-full h-full" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.4" viewBox="0 0 64 64" aria-hidden="true">
    <path d="M10 14 L14 14 L19 38 L50 38" />
    <path d="M14 14 L18 30 L50 30 L53 14 Z" />
    <circle cx="24" cy="44" r="3" stroke="#f97316" strokeWidth="1.2" />
    <circle cx="44" cy="44" r="3" stroke="#f97316" strokeWidth="1.2" />
    <path d="M27 20 L37 20 M32 15 L32 25" stroke="#f97316" strokeWidth="1" />
  </svg>
)

const IconLogoBranding = () => (
  <svg className="w-full h-full" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.4" viewBox="0 0 64 64" aria-hidden="true">
    <path d="M32 10 L52 52 L12 52 Z" />
    <circle cx="32" cy="38" r="9" stroke="#f97316" strokeWidth="1" strokeDasharray="3 2" />
    <circle cx="42" cy="26" r="1.5" fill="#f97316" />
  </svg>
)

const IconUxUi = () => (
  <svg className="w-full h-full" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.4" viewBox="0 0 64 64" aria-hidden="true">
    <rect x="6" y="10" width="52" height="36" rx="4" />
    <line x1="6" y1="20" x2="58" y2="20" stroke="#f97316" strokeWidth="0.8" />
    <circle cx="12" cy="15" r="1.5" fill="#f97316" />
    <rect x="12" y="27" width="12" height="12" rx="2" stroke="#f97316" strokeWidth="1" strokeDasharray="2 1.5" />
    <rect x="30" y="27" width="22" height="5" rx="2" fill="currentColor" opacity="0.15" />
    <rect x="30" y="35" width="14" height="4" rx="2" fill="currentColor" opacity="0.1" />
  </svg>
)

const IconSeo = () => (
  <svg className="w-full h-full" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.4" viewBox="0 0 64 64" aria-hidden="true">
    <circle cx="28" cy="28" r="16" />
    <path d="M39 39 L54 54" strokeWidth="2.5" />
    <path d="M20 28 Q28 18 36 28" fill="none" stroke="#f97316" strokeWidth="1.5" />
    <line x1="20" y1="33" x2="36" y2="33" stroke="#f97316" strokeWidth="0.8" />
    <line x1="20" y1="37" x2="36" y2="37" stroke="#f97316" strokeWidth="0.8" />
  </svg>
)

// Category data
const categories = [
  {
    id: 'build',
    tag: 'Web & platform',
    title: 'Bouwen',
    subtitle: 'Van eerste pagina tot complete webshop, met een helder fundament.',
    services: [
      { name: 'Bedrijfswebsite', description: 'Een heldere one-page site om uw bedrijf direct goed neer te zetten.', price: '$150', href: '/examples/business-card-site', recommended: false, Icon: IconBusinessCard },
      { name: 'Service website', description: 'Meerdere pagina’s, duidelijke informatie en ruimte om mee te groeien.', price: '$250', href: '/examples/service-website', recommended: true, features: ['Meerdere pagina’s', 'Contactformulier', 'Basis SEO'], Icon: IconServiceWebsite },
      { name: 'Starter webshop', description: 'Tot 25 producten, inclusief winkelwagen en een korte checkout.', price: '$350', href: '/examples/starter-webshop', recommended: false, Icon: IconWebshop },
    ],
  },
  {
    id: 'design',
    tag: 'Visueel & UX',
    title: 'Ontwerpen',
    subtitle: 'Een merk en interface die begrijpelijk voelen en herkenbaar blijven.',
    services: [
      { name: 'Logo en merkidentiteit', description: 'Een herkenbaar vertrekpunt voor alle uitingen van uw bedrijf.', price: '$55', href: '/examples/logo-branding', recommended: false, Icon: IconLogoBranding },
      { name: 'UX audit en advies', description: 'Concrete verbeterpunten voor uw huidige website of platform.', price: '$100', href: '/examples/ux-ui-design', recommended: false, Icon: IconUxUi },
      { name: 'UI ontwerp', description: 'Nieuwe schermen en componenten die het gebruik eenvoudiger maken.', price: '$180', href: '/examples/ux-ui-design', recommended: false, Icon: IconUxUi },
    ],
  },
  {
    id: 'marketing',
    tag: 'Zichtbaarheid',
    title: 'Vindbaar worden',
    subtitle: 'Een goede technische basis en content die zoekmachines begrijpen.',
    services: [
      { name: 'SEO basisinrichting', description: 'Meta tags, sitemap, Search Console en robots.txt op orde.', price: '$75', href: '/examples/seo', recommended: false, features: ['Meta tags', 'Sitemap', 'Search Console'], Icon: IconSeo },
    ],
  },
] as const

type ServiceItem = (typeof categories)[number]['services'][number]

function ServiceRow({ service, index }: { service: ServiceItem; index: number }) {
  const { name, description, price, href, recommended } = service
  return (
    <Link
      href={href}
      className="group flex items-center gap-4 py-5 px-4 -mx-4 transition-colors duration-300 hover:bg-background border-b border-border last:border-0"
    >
      {/* Row index */}
      <span className="text-[11px] font-black tabular-nums text-muted-foreground tracking-wider w-6 shrink-0 group-hover:text-primary transition-colors duration-300">
        {String(index + 1).padStart(2, '0')}
      </span>

      {/* Name + description */}
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2.5">
          <span
            className="text-[15px] font-bold text-foreground tracking-tight group-hover:text-primary transition-colors duration-300"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {name}
          </span>
          {recommended && (
            <span className="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 bg-primary text-white">
              Aanbevolen
            </span>
          )}
        </div>
        <p className="text-sm text-muted-foreground leading-snug mt-0.5 truncate max-w-xs">
          {description}
        </p>
        {/* Mobile price row */}
        <span
          className="md:hidden inline-block mt-1.5 text-[13px] font-bold text-primary"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          {price}<span className="text-muted-foreground text-xs font-medium ml-0.5">/ start</span>
        </span>
      </div>

      {/* Dotted connector line — hidden on mobile */}
      <div className="hidden md:block flex-1 border-b border-dashed border-border mx-4 group-hover:border-primary/40 transition-colors duration-300" />

      {/* Price — hidden on mobile (shown inline above) */}
      <span
        className="hidden md:inline text-[15px] font-bold text-foreground shrink-0 group-hover:text-primary transition-colors duration-300"
        style={{ fontFamily: 'var(--font-heading)' }}
      >
        {price}
        <span className="text-muted-foreground text-xs font-medium ml-0.5">/ start</span>
      </span>

      {/* Arrow */}
      <span
        className="text-muted-foreground shrink-0 group-hover:text-primary group-hover:translate-x-1 transition-all duration-300"
        aria-hidden="true"
      >
        →
      </span>
    </Link>
  )
}

function CategoryBlock({
  cat,
  catIndex,
}: {
  cat: (typeof categories)[number]
  catIndex: number
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.08 }}
      variants={staggerContainerFast}
      className="mb-20 last:mb-0"
    >
      {/* Category editorial header — number as design element */}
      <motion.div variants={fadeInUp} className="mb-2">
        <div className="flex items-end flex-wrap gap-x-5 gap-y-1 mb-5">
          <span
            className="text-4xl md:text-5xl font-bold leading-none text-primary select-none"
            style={{ fontFamily: 'var(--font-heading)' }}
            aria-hidden="true"
          >
            {String(catIndex + 1).padStart(2, '0')}
          </span>
          <h3
            className="text-2xl md:text-3xl font-bold text-foreground tracking-tight"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {cat.title}
          </h3>
          <span className="text-xs font-bold tracking-[0.16em] uppercase text-muted-foreground pb-1">
            — {cat.tag}
          </span>
        </div>
        <div className="w-full h-px bg-foreground/15" />
        <p className="text-sm text-muted-foreground mt-4 leading-relaxed">{cat.subtitle}</p>
      </motion.div>

      {/* Service rows */}
      <div>
        {cat.services.map((svc, i) => (
          <motion.div key={svc.name} variants={fadeInUp}>
            <ServiceRow service={svc} index={i} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

function ServicesSectionFn() {
  return (
    <section className="py-28 lg:py-40 relative overflow-hidden bg-background-elevated" id="services">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Section header — editorial style */}
        <motion.div
          variants={staggerContainerFast}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-6"
        >
          <motion.div variants={slideInLeft} className="max-w-xl md:min-w-lg">
            <div className="flex items-baseline justify-between border-t-2 border-foreground pt-4 mb-8">
              <span className="text-xs font-bold tracking-[0.18em] uppercase text-foreground">
                Diensten
              </span>
              <span className="text-xs font-medium text-muted-foreground tabular-nums">01</span>
            </div>
            <h2
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Wat wij{' '}
              <span className="text-primary">maken</span>
            </h2>
            <motion.p variants={blurFadeIn} className="mt-5 text-muted-foreground text-lg leading-relaxed">
              Van eerste schets tot livegang, met één team en een duidelijke prijs.
            </motion.p>
          </motion.div>
          <motion.div variants={fadeInUp}>
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-primary-hover transition-colors group"
            >
              Bekijk portfolio
              <svg
                className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.5"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </motion.div>
        </motion.div>

        {/* Categories */}
        {categories.map((cat, i) => (
          <CategoryBlock key={cat.id} cat={cat} catIndex={i} />
        ))}
      </div>
    </section>
  )
}

export { ServicesSectionFn as ServicesSection }
