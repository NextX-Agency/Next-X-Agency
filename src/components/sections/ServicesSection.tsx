'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  fadeInUp,
  slideInLeft,
  staggerContainerFast,
  staggerContainerSlow,
  cardFlipIn,
  drawPathFast,
} from '@/lib/animationUtils'

// ── Inline line-art icons ─────────────────────────────────────────────────────

const IconBusinessCard = () => (
  <svg className="w-full h-full" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.4" viewBox="0 0 64 64" aria-hidden="true">
    <rect x="6" y="18" width="52" height="28" rx="2" />
    <line x1="6" y1="27" x2="58" y2="27" stroke="#f97015" strokeWidth="0.8" />
    <rect x="12" y="33" width="16" height="2" rx="1" fill="#f97015" opacity="0.7" />
    <rect x="12" y="38" width="10" height="1.5" rx="0.75" fill="currentColor" opacity="0.35" />
    <circle cx="47" cy="36" r="6" stroke="#f97015" strokeWidth="1" />
    <path d="M47 33 L47 39 M44 36 L50 36" stroke="#f97015" strokeWidth="0.8" />
  </svg>
)

const IconServiceWebsite = () => (
  <svg className="w-full h-full" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.4" viewBox="0 0 64 64" aria-hidden="true">
    <rect x="8" y="12" width="48" height="36" rx="2" />
    <line x1="8" y1="22" x2="56" y2="22" stroke="#f97015" strokeWidth="0.8" />
    <circle cx="14" cy="17" r="1.5" fill="#f97015" />
    <circle cx="20" cy="17" r="1.5" fill="currentColor" opacity="0.4" />
    <circle cx="26" cy="17" r="1.5" fill="currentColor" opacity="0.25" />
    <rect x="14" y="28" width="36" height="3" rx="1" fill="currentColor" opacity="0.2" />
    <rect x="14" y="34" width="22" height="2" rx="1" fill="currentColor" opacity="0.15" />
    <rect x="14" y="39" width="16" height="2" rx="1" fill="currentColor" opacity="0.1" />
    <path d="M22 56 L42 56" stroke="#f97015" strokeWidth="1" />
  </svg>
)

const IconWebshop = () => (
  <svg className="w-full h-full" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.4" viewBox="0 0 64 64" aria-hidden="true">
    <path d="M10 14 L14 14 L19 38 L50 38" />
    <path d="M14 14 L18 30 L50 30 L53 14 Z" />
    <circle cx="24" cy="44" r="3" stroke="#f97015" strokeWidth="1.2" />
    <circle cx="44" cy="44" r="3" stroke="#f97015" strokeWidth="1.2" />
    <path d="M27 20 L37 20 M32 15 L32 25" stroke="#f97015" strokeWidth="1" />
  </svg>
)

const IconLogoBranding = () => (
  <svg className="w-full h-full" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.4" viewBox="0 0 64 64" aria-hidden="true">
    <path d="M32 10 L52 52 L12 52 Z" />
    <circle cx="32" cy="38" r="9" stroke="#f97015" strokeWidth="1" strokeDasharray="3 2" />
    <line x1="32" y1="10" x2="32" y2="52" stroke="#f97015" strokeWidth="0.7" opacity="0.4" />
    <line x1="12" y1="52" x2="52" y2="52" stroke="#f97015" strokeWidth="0.7" opacity="0.4" />
    <path d="M42 26 L54 14" stroke="#f97015" strokeWidth="0.8" opacity="0.6" />
    <circle cx="42" cy="26" r="1.5" fill="#f97015" />
  </svg>
)

const IconUxUi = () => (
  <svg className="w-full h-full" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.4" viewBox="0 0 64 64" aria-hidden="true">
    <rect x="6" y="10" width="52" height="36" rx="2" />
    <line x1="6" y1="20" x2="58" y2="20" stroke="#f97015" strokeWidth="0.8" />
    <circle cx="12" cy="15" r="1.5" fill="#f97015" />
    <circle cx="18" cy="15" r="1.5" fill="currentColor" opacity="0.4" />
    <rect x="12" y="27" width="12" height="12" rx="1" stroke="#f97015" strokeWidth="1" strokeDasharray="2 1.5" />
    <rect x="30" y="27" width="22" height="5" rx="1" fill="currentColor" opacity="0.15" />
    <rect x="30" y="35" width="14" height="4" rx="1" fill="currentColor" opacity="0.1" />
  </svg>
)

const IconUxKukru = () => (
  <svg className="w-full h-full" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.4" viewBox="0 0 64 64" aria-hidden="true">
    <circle cx="32" cy="22" r="10" />
    <path d="M14 54 C14 40 50 40 50 54" />
    <circle cx="14" cy="26" r="6" stroke="#f97015" strokeWidth="1" strokeDasharray="2.5 1.5" />
    <circle cx="50" cy="26" r="6" stroke="#f97015" strokeWidth="1" strokeDasharray="2.5 1.5" />
    <path d="M8 48 C8 40 20 38 20 48" stroke="#f97015" strokeWidth="0.8" opacity="0.6" />
    <path d="M44 48 C44 38 56 40 56 48" stroke="#f97015" strokeWidth="0.8" opacity="0.6" />
  </svg>
)

const IconSeo = () => (
  <svg className="w-full h-full" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.4" viewBox="0 0 64 64" aria-hidden="true">
    <circle cx="28" cy="28" r="16" />
    <path d="M39 39 L54 54" strokeWidth="2.5" />
    <path d="M20 28 Q28 18 36 28" fill="none" stroke="#f97015" strokeWidth="1.5" />
    <line x1="20" y1="33" x2="36" y2="33" stroke="#f97015" strokeWidth="0.8" />
    <line x1="20" y1="37" x2="36" y2="37" stroke="#f97015" strokeWidth="0.8" />
    <line x1="22" y1="41" x2="34" y2="41" stroke="#f97015" strokeWidth="0.8" opacity="0.6" />
  </svg>
)

// ── Category data ─────────────────────────────────────────────────────────────

const categories = [
  {
    id: 'build',
    code: 'CAT_01',
    tag: 'WEB & PLATFORM',
    title: 'Build',
    subtitle: 'Van snelle landingspagina tot volledig e-commerce platform — schaalbaar en direct klaar voor gebruik.',
    services: [
      {
        label: 'MOD_01',
        tag: 'IDENTITY',
        name: 'Business Card Site',
        description: 'Krachtige one-page digitale identiteit. Professioneel, snel en direct inzetbaar.',
        priceRaw: '$100',
        href: '/services#websites',
        recommended: false,
        features: [] as string[],
        Icon: IconBusinessCard,
      },
      {
        label: 'MOD_02',
        tag: 'PLATFORM',
        name: 'Service Website',
        description: 'Responsive multi-page platform. Schaalbare architectuur met geavanceerde functionaliteiten.',
        priceRaw: '$120',
        href: '/services#websites',
        recommended: true,
        features: ["5 geoptimaliseerde pagina's", 'Lead Forms integratie', 'SEO_Protocol_Init'],
        Icon: IconServiceWebsite,
      },
      {
        label: 'MOD_04',
        tag: 'E-COMMERCE',
        name: 'Starter Webshop',
        description: 'Max 25 producten. Winkelwagen, checkout en betaalgateway. Volledig klaar voor gebruik.',
        priceRaw: '$280',
        href: '/services#e-commerce',
        recommended: false,
        features: [] as string[],
        Icon: IconWebshop,
      },
    ],
  },
  {
    id: 'design',
    code: 'CAT_02',
    tag: 'VISUEEL & UX',
    title: 'Design',
    subtitle: 'Merkidentiteit, interface en gebruikerservaring die onderscheidt en converteert.',
    services: [
      {
        label: 'MOD_03',
        tag: 'VISUALS',
        name: 'Logo & Branding',
        description: 'Vector-gebaseerd conceptontwerp. Scherpe merkidentiteit geoptimaliseerd voor elk formaat.',
        priceRaw: '$20',
        href: '/services#graphic-design',
        recommended: false,
        features: [] as string[],
        Icon: IconLogoBranding,
      },
      {
        label: 'MOD_05',
        tag: 'UX-UI',
        name: 'UX/UI Design',
        description: 'UX audits, UI redesigns en gebruiksvriendelijke Figma mockups. Implementatie apart geprijsd.',
        priceRaw: '$50',
        href: '/services#ux-ui',
        recommended: false,
        features: [] as string[],
        Icon: IconUxUi,
      },
      {
        label: 'MOD_07',
        tag: 'OUTSOURCE',
        name: 'UX Kukru',
        description: 'Dedicated specialist ondersteund door ons volledige team. Starter, Business of Partner pakket.',
        priceRaw: '$90',
        href: '/services#ux-kukru',
        recommended: false,
        features: [] as string[],
        Icon: IconUxKukru,
      },
    ],
  },
  {
    id: 'marketing',
    code: 'CAT_03',
    tag: 'ZICHTBAARHEID',
    title: 'Marketing',
    subtitle: 'Vergroot je online bereik met structureel SEO en gerichte zoekwoordstrategie.',
    services: [
      {
        label: 'MOD_06',
        tag: 'SEO',
        name: 'SEO & Zichtbaarheid',
        description: 'Basis SEO setup, Google Search Console, sitemap en maandelijkse keyword monitoring.',
        priceRaw: '$30',
        href: '/services#seo',
        recommended: false,
        features: ['Google Search Console', 'XML Sitemap setup', 'Keyword monitoring'] as string[],
        Icon: IconSeo,
      },
    ],
  },
] as const

// ── Types ─────────────────────────────────────────────────────────────────────

type ServiceItem = {
  label: string
  tag: string
  name: string
  description: string
  priceRaw: string
  href: string
  recommended: boolean
  features: readonly string[]
  Icon: React.ComponentType
}

type Category = (typeof categories)[number]

// ── Animated divider line ─────────────────────────────────────────────────────

function CategoryDivider() {
  return (
    <div className="relative flex-1 h-px overflow-visible">
      <svg className="absolute inset-0 w-full h-8 -top-3.5" fill="none" viewBox="0 0 800 8" preserveAspectRatio="none" aria-hidden="true">
        <motion.line
          x1="0" y1="4" x2="800" y2="4"
          stroke="#f97015"
          strokeWidth="0.8"
          strokeDasharray="6 3"
          variants={drawPathFast}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 1 }}
        />
      </svg>
    </div>
  )
}

// ── Service card ──────────────────────────────────────────────────────────────

function ServiceCard({ service }: { service: ServiceItem }) {
  const { label, tag, name, description, priceRaw, href, recommended, features, Icon } = service
  return (
    <motion.div
      variants={cardFlipIn}
      whileHover={{ y: -6, transition: { duration: 0.2, ease: 'easeOut' } }}
      className="h-full"
    >
      <Link
        href={href}
        className="group flex flex-col h-full bg-[#0B1120] border border-white/5 hover:border-primary/25 transition-colors duration-300 p-6 relative overflow-hidden"
      >
        {/* Hover glow */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 15% 15%, rgba(249,112,21,0.07) 0%, transparent 65%)' }}
        />

        {/* Recommended badge */}
        {recommended && (
          <motion.span
            className="absolute top-4 right-4 bg-primary text-black px-2 py-0.5 font-mono text-[9px] font-bold tracking-widest uppercase z-10"
            initial={{ opacity: 0, y: -6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.35 }}
          >
            AANBEVOLEN
          </motion.span>
        )}

        {/* Icon */}
        <div className="mb-5 flex-shrink-0">
          <div className="relative w-14 h-14 border border-white/8 bg-white/[0.02] flex items-center justify-center text-[#94a3b8] group-hover:text-primary group-hover:border-primary/30 transition-colors duration-300">
            <div className="w-9 h-9">
              <Icon />
            </div>
            <span className="absolute -bottom-px -right-px w-2.5 h-2.5 border-r border-b border-primary/50" />
            <span className="absolute -top-px -left-px w-2.5 h-2.5 border-l border-t border-primary/50" />
          </div>
        </div>

        {/* Tags */}
        <div className="flex items-center gap-2 mb-3 relative z-10">
          <span className="font-mono text-[9px] text-primary tracking-widest border border-primary/20 px-1.5 py-0.5 bg-primary/5">
            {label}
          </span>
          <span className="font-mono text-[9px] text-gray-600 tracking-widest uppercase">
            // {tag}
          </span>
        </div>

        {/* Name + description */}
        <h3 className={`text-base font-bold font-mono uppercase tracking-wider mb-2 transition-colors duration-200 relative z-10 ${recommended ? 'text-primary' : 'text-white group-hover:text-primary'}`}>
          {name}
        </h3>
        <p className="text-gray-400 text-sm leading-relaxed mb-4 flex-grow relative z-10">
          {description}
        </p>

        {/* Features */}
        {features.length > 0 && (
          <ul className="mb-4 space-y-1 font-mono text-xs relative z-10">
            {features.map((f) => (
              <li key={f} className="flex items-center text-gray-300">
                <span className="text-primary mr-2 font-bold leading-none">&rsaquo;</span>
                {f}
              </li>
            ))}
          </ul>
        )}

        {/* Price + CTA */}
        <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-auto relative z-10">
          <div>
            <span className="font-mono text-[9px] text-gray-600 uppercase tracking-widest block">EST_COST</span>
            <span className={`font-mono font-bold text-lg ${recommended ? 'text-primary' : 'text-white'}`}>
              {priceRaw}<span className="text-primary text-xs">.00</span>
            </span>
          </div>
          <motion.div
            className="w-7 h-7 border border-primary/40 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black group-hover:border-primary transition-colors duration-200"
            whileHover={{ rotate: 45, scale: 1.1 }}
            transition={{ duration: 0.18 }}
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </motion.div>
        </div>
      </Link>
    </motion.div>
  )
}

// ── Category block ────────────────────────────────────────────────────────────

function CategoryBlock({ cat }: { cat: Category }) {
  const isWideCard = cat.services.length === 1
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={staggerContainerSlow}
      className="mb-20 last:mb-0"
    >
      {/* Category header */}
      <motion.div variants={fadeInUp} className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <span className="font-mono text-[10px] text-primary border border-primary/30 px-2 py-0.5 bg-primary/5 tracking-widest flex-shrink-0">
            {cat.code}
          </span>
          <span className="font-mono text-[10px] text-gray-600 tracking-widest uppercase flex-shrink-0">
            {cat.tag}
          </span>
          <CategoryDivider />
        </div>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-2">
          <h3 className="text-2xl md:text-3xl font-bold text-white font-mono uppercase tracking-tight">
            {cat.title}
          </h3>
          <p className="text-gray-500 text-sm font-mono max-w-sm md:text-right leading-relaxed">
            {cat.subtitle}
          </p>
        </div>
      </motion.div>

      {/* Services */}
      <div className={isWideCard ? 'max-w-sm' : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5'}>
        {cat.services.map((svc) => (
          <ServiceCard key={svc.name} service={svc as ServiceItem} />
        ))}
      </div>
    </motion.div>
  )
}

// ── Main section ──────────────────────────────────────────────────────────────

function ServicesSectionFn() {
  return (
    <section className="py-24 bg-[#050911] relative overflow-hidden" id="services">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B1120] via-[#0F172A] to-[#050911] pointer-events-none" />
      {/* Blueprint grid */}
      <div className="absolute inset-0 bg-blueprint-grid opacity-40 pointer-events-none" />
      {/* Decorative annotation */}
      <span
        className="absolute top-1/4 left-10 -rotate-90 origin-left hidden lg:block text-xl opacity-20 select-none"
        style={{ fontFamily: "'Architects Daughter', cursive", color: '#94a3b8' }}
      >
        services_v4
      </span>
      {/* Right edge gradient */}
      <div className="absolute right-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-primary/20 to-transparent hidden lg:block pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ── Section header ──────────────────────────────────────────── */}
        <motion.div
          variants={staggerContainerFast}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6"
        >
          <motion.div variants={slideInLeft} className="max-w-xl">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="text-primary font-bold tracking-widest uppercase text-[10px] border border-primary px-2 py-0.5 bg-black/40 font-mono">
                Services_Module
              </span>
              <div className="h-px w-16 bg-primary/40" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white font-mono">
              Schaalbare{' '}
              <span className="relative inline-block text-primary">
                Oplossingen
                <svg className="absolute w-full h-2 -bottom-1 left-0 text-primary opacity-50 pointer-events-none" fill="none" viewBox="0 0 120 8" preserveAspectRatio="none" aria-hidden="true">
                  <motion.path
                    d="M0 6 C 30 2, 90 2, 120 6"
                    stroke="currentColor" strokeWidth="1.5" fill="none"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.5, ease: 'easeInOut' }}
                  />
                </svg>
              </span>
            </h2>
            <p className="mt-4 text-gray-500 text-sm font-mono">
              &gt; 3 categories &mdash; 7 modules &mdash; one scalable stack
            </p>
          </motion.div>
          <motion.div variants={fadeInUp}>
            <Link
              href="/portfolio"
              className="inline-flex items-center text-primary font-semibold hover:text-white transition-colors font-mono border-b border-primary pb-1 tracking-wider whitespace-nowrap text-sm"
            >
              [ VIEW_PORTFOLIO ]
            </Link>
          </motion.div>
        </motion.div>

        {/* ── Categories ──────────────────────────────────────────────── */}
        {categories.map((cat) => (
          <CategoryBlock key={cat.id} cat={cat} />
        ))}
      </div>
    </section>
  )
}

export { ServicesSectionFn as ServicesSection }
