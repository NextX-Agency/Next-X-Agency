'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  fadeInUp,
  fadeInDown,
  slideInLeft,
  staggerContainer,
  staggerContainerFast,
  cardFlipIn,
  scaleIn,
} from '@/lib/animationUtils'

const services = [
  {
    label: 'MOD_01 // IDENTITY',
    name: 'Business Card Site',
    description: 'Krachtige one-page digitale identiteit. Professioneel, snel en direct inzetbaar.',
    priceRaw: '$100',
    href: '/services#websites',
    recommended: false,
    icon: (
      <svg className="w-full h-full" fill="none" stroke="#94a3b8" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" viewBox="0 0 100 100" aria-hidden="true">
        <path d="M20 30 L80 30 L80 70 L20 70 Z" strokeDasharray="4 2" />
        <path d="M18 28 L82 28 L82 72 L18 72 Z" strokeOpacity="0.3" />
        <line stroke="#f97015" strokeWidth="0.5" x1="20" x2="30" y1="30" y2="20" />
        <line stroke="#f97015" strokeWidth="0.5" x1="80" x2="90" y1="70" y2="80" />
        <rect fill="none" height="10" stroke="#f97015" width="40" x="30" y="40" />
        <path d="M60 45 L90 45 L95 40" fill="none" stroke="#f97015" strokeWidth="0.5" />
        <text fill="#f97015" fontSize="6" fontFamily="monospace" x="90" y="38">HERO_SECTION</text>
        <path d="M25 60 C 30 62, 35 58, 40 60" stroke="#f97015" strokeWidth="2" />
      </svg>
    ),
  },
  {
    label: 'MOD_02 // PLATFORM',
    name: 'Service Website',
    description: 'Responsive multi-page platform. Schaalbare architectuur met geavanceerde functionaliteiten.',
    priceRaw: '$120',
    href: '/services#websites',
    recommended: true,
    features: ['5 geoptimaliseerde pagina\'s', 'Lead Forms integratie', 'SEO_Protocol_Init'],
    icon: (
      <svg className="w-full h-full" fill="none" stroke="#94a3b8" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" viewBox="0 0 100 100" aria-hidden="true">
        <rect height="50" strokeDasharray="2 2" width="40" x="30" y="25" />
        <rect height="50" stroke="#f97015" strokeOpacity="0.5" strokeWidth="0.5" width="40" x="35" y="20" />
        <rect height="50" width="40" x="25" y="30" />
        <circle cx="25" cy="30" fill="#1e293b" r="2" stroke="#f97015" />
        <circle cx="65" cy="80" fill="#1e293b" r="2" stroke="#f97015" />
        <path d="M65 40 L85 40" fill="none" stroke="#f97015" strokeWidth="0.5" />
        <text fill="#f97015" fontSize="5" fontFamily="monospace" x="87" y="42">MULTI_PAGE</text>
        <path d="M20 85 C 30 90, 70 80, 80 85" stroke="#f97015" strokeOpacity="0.5" strokeWidth="1" />
      </svg>
    ),
  },
  {
    label: 'MOD_03 // VISUALS',
    name: 'Logo & Branding',
    description: 'Vector-gebaseerd conceptontwerp. Scherpe merkidentiteit geoptimaliseerd voor elk formaat.',
    priceRaw: '$20',
    href: '/services#graphic-design',
    recommended: false,
    icon: (
      <svg className="w-full h-full" fill="none" stroke="#94a3b8" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" viewBox="0 0 100 100" aria-hidden="true">
        <path d="M50 20 L80 80 L20 80 Z" />
        <circle cx="50" cy="55" r="15" stroke="#f97015" strokeDasharray="2 2" />
        <line stroke="#f97015" strokeOpacity="0.3" strokeWidth="0.5" x1="20" x2="80" y1="55" y2="55" />
        <line stroke="#f97015" strokeOpacity="0.3" strokeWidth="0.5" x1="50" x2="50" y1="20" y2="80" />
        <path d="M65 55 L85 30" fill="none" stroke="#f97015" strokeWidth="0.5" />
        <text fill="#f97015" fontSize="5" fontFamily="monospace" x="80" y="28">GOLDEN_RATIO</text>
      </svg>
    ),
  },
  {
    label: 'MOD_04 // E-COMMERCE',
    name: 'Starter Webshop',
    description: 'Max 25 producten. Winkelwagen, checkout en betaalgateway. Volledig klaar voor gebruik.',
    priceRaw: '$280',
    href: '/services#e-commerce',
    recommended: false,
    icon: (
      <svg className="w-full h-full" fill="none" stroke="#94a3b8" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" viewBox="0 0 100 100" aria-hidden="true">
        <rect height="50" width="60" x="20" y="30" />
        <path d="M20 45 L80 45" stroke="#f97015" strokeWidth="0.5" />
        <rect fill="none" height="12" stroke="#f97015" strokeDasharray="2 2" width="15" x="30" y="52" />
        <rect fill="none" height="12" stroke="#f97015" strokeDasharray="2 2" width="15" x="52" x2="65" y="52" />
        <path d="M30 25 C 35 15, 65 15, 70 25" fill="none" stroke="#f97015" strokeWidth="1.5" />
        <circle cx="35" cy="25" fill="#f97015" r="2" />
        <circle cx="65" cy="25" fill="#f97015" r="2" />
      </svg>
    ),
  },
  {
    label: 'MOD_05 // UX-UI',
    name: 'UX/UI Design',
    description: 'UX audits, UI redesigns en gebruiksvriendelijke Figma mockups. Implementatie apart geprijsd.',
    priceRaw: '$50',
    href: '/services#ux-ui',
    recommended: false,
    icon: (
      <svg className="w-full h-full" fill="none" stroke="#94a3b8" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" viewBox="0 0 100 100" aria-hidden="true">
        <rect height="60" rx="4" width="70" x="15" y="20" />
        <path d="M15 35 L85 35" stroke="#f97015" strokeWidth="0.5" />
        <circle cx="22" cy="28" fill="#f97015" r="2" opacity="0.6" />
        <circle cx="30" cy="28" fill="#f97015" r="2" opacity="0.4" />
        <rect fill="none" height="20" stroke="#f97015" strokeDasharray="2 2" width="30" x="25" y="45" />
        <rect fill="none" height="20" stroke="#f97015" strokeDasharray="2 2" width="15" x="60" y="45" />
        <path d="M25 72 L55 72" stroke="#f97015" strokeWidth="0.5" />
      </svg>
    ),
  },
  {
    label: 'MOD_06 // SEO',
    name: 'SEO & Zichtbaarheid',
    description: 'Basis SEO setup, Google Search Console, sitemap en maandelijkse keyword monitoring.',
    priceRaw: '$30',
    href: '/services#seo',
    recommended: false,
    icon: (
      <svg className="w-full h-full" fill="none" stroke="#94a3b8" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" viewBox="0 0 100 100" aria-hidden="true">
        <circle cx="45" cy="45" r="25" />
        <path d="M63 63 L80 80" strokeWidth="3" />
        <path d="M35 45 Q 45 30, 55 45" fill="none" stroke="#f97015" strokeWidth="1.5" />
        <line stroke="#f97015" strokeWidth="0.5" x1="35" x2="55" y1="50" y2="50" />
        <line stroke="#f97015" strokeWidth="0.5" x1="35" x2="55" y1="55" y2="55" />
        <line stroke="#f97015" strokeWidth="0.5" x1="38" x2="52" y1="60" y2="60" />
      </svg>
    ),
  },
  {
    label: 'MOD_07 // OUTSOURCE',
    name: 'UX Kukru',
    description: 'Dedicated specialist ondersteund door ons volledige team. Starter, Business of Partner pakket.',
    priceRaw: '$90',
    href: '/services#ux-kukru',
    recommended: false,
    icon: (
      <svg className="w-full h-full" fill="none" stroke="#94a3b8" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" viewBox="0 0 100 100" aria-hidden="true">
        <circle cx="50" cy="35" r="15" />
        <path d="M25 80 C 25 60, 75 60, 75 80" />
        <circle cx="25" cy="40" r="8" strokeDasharray="2 2" />
        <circle cx="75" cy="40" r="8" strokeDasharray="2 2" />
        <path d="M15 70 C 15 58, 33 58, 33 70" stroke="#f97015" strokeOpacity="0.5" strokeWidth="0.5" />
        <path d="M67 70 C 67 58, 85 58, 85 70" stroke="#f97015" strokeOpacity="0.5" strokeWidth="0.5" />
      </svg>
    ),
  },
] as const

function ServicesSectionFn() {
  return (
    <section className="py-24 bg-[#050911] relative overflow-hidden" id="services">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B1120] via-[#0F172A] to-[#050911] pointer-events-none" />
      {/* Grid */}
      <div className="absolute inset-0 bg-blueprint-grid pointer-events-none" />
      {/* Decorative right border */}
      <div className="absolute right-0 top-0 h-full w-1/3 border-l border-dashed border-primary/10 hidden lg:block pointer-events-none" />
      {/* Decorative annotation */}
      <span
        className="absolute top-1/4 left-10 -rotate-90 origin-left hidden lg:block text-xl opacity-30 select-none"
        style={{ fontFamily: "'Architects Daughter', cursive", color: '#94a3b8' }}
      >
        concept_phase_v3
      </span>
      {/* Bottom decorative SVG circle */}
      <div className="absolute bottom-10 left-10 opacity-15 pointer-events-none rotate-12" aria-hidden="true">
        <svg className="w-64 h-64 text-primary" fill="none" viewBox="0 0 200 200">
          <path d="M20,100 a80,80 0 1,0 160,0 a80,80 0 1,0 -160,0" stroke="currentColor" strokeDasharray="8 4" strokeWidth="1" />
          <path d="M100,20 L100,180 M20,100 L180,100" stroke="currentColor" strokeWidth="0.5" />
          <text fill="currentColor" fontSize="8" fontFamily="monospace" x="110" y="30">AXIS_Y</text>
          <text fill="currentColor" fontSize="8" fontFamily="monospace" x="170" y="95">AXIS_X</text>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
        >
          <motion.div variants={slideInLeft} className="max-w-2xl">
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="text-primary font-bold tracking-widest uppercase text-xs border border-primary px-2 py-0.5 bg-black/40 font-mono">Services_Module</span>
              <div className="h-px w-20 bg-primary/50" />
            </div>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold text-white font-mono">
              Schaalbare{' '}
              <span className="relative inline-block text-primary">
                Oplossingen
                <svg className="absolute w-full h-full -top-2 -left-2 text-primary opacity-40 pointer-events-none" fill="none" viewBox="0 0 100 20" aria-hidden="true">
                  <motion.path
                    d="M0 20 C 20 5, 80 5, 100 20"
                    stroke="currentColor" strokeWidth="2" fill="none"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.4, ease: 'easeInOut' }}
                  />
                </svg>
              </span>
            </h2>
            <p className="mt-4 text-gray-400 text-base font-mono">
              &gt; Initiating modular services for exponential growth...
            </p>
          </motion.div>
          <motion.div variants={fadeInUp}>
            <Link
              href="/portfolio"
              className="inline-flex items-center text-primary font-semibold hover:text-white transition-colors group font-mono border-b border-primary pb-1 tracking-wider whitespace-nowrap"
            >
              [ VIEW_PORTFOLIO ]
            </Link>
          </motion.div>
        </motion.div>

        {/* Cards grid — staggered entrance */}
        <motion.div
          variants={staggerContainerFast}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10"
        >
          {services.map((service) => (
            <motion.div
              key={service.name}
              variants={cardFlipIn}
              whileHover={{ y: -10, scale: 1.01, transition: { duration: 0.25, ease: 'easeOut' } }}
              className="h-full"
            >
              <Link
                href={service.href}
                className="concept-card rough-border p-6 flex flex-col h-full relative group"
              >
                {/* Technical label */}
                <div className="absolute -top-3 left-4 bg-[#1e293b] px-3 font-mono text-[10px] text-primary border border-primary/30 z-20">
                  {service.label}
                </div>

                {/* Recommended badge — animated */}
                {service.recommended && (
                  <motion.div
                    className="absolute -top-3 right-4 bg-primary text-black px-3 py-0.5 font-mono text-[10px] font-bold z-20"
                    initial={{ opacity: 0, scale: 0.6, rotate: 0 }}
                    whileInView={{ opacity: 1, scale: 1, rotate: 2 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1], delay: 0.4 }}
                    animate={{ rotate: [2, 4, 2], transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' } }}
                  >
                    RECOMMENDED_BUILD
                  </motion.div>
                )}

                {/* Construction lines */}
                <div className="construction-line w-px h-full left-8 top-0" />
                <div className="construction-line h-px w-full top-32 left-0" />

                {/* Brush stroke glow */}
                <div
                  className="absolute -top-10 -left-10 w-40 h-40 rounded-full pointer-events-none"
                  style={{ background: 'radial-gradient(circle, rgba(249,112,21,0.3) 0%, rgba(0,0,0,0) 70%)', filter: 'blur(8px)', opacity: 0.5, zIndex: 0 }}
                />

                {/* SVG Wireframe preview */}
                <div className="h-40 relative overflow-hidden flex items-center justify-center border-b border-white/5 mb-5">
                  <div className="absolute inset-0 bg-radial-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-500 from-primary/10 via-transparent to-transparent" />
                  <motion.div
                    className="relative w-28 h-28"
                    whileHover={{ scale: 1.1, rotate: 2 }}
                    transition={{ duration: 0.3 }}
                  >
                    {service.icon}
                  </motion.div>
                </div>

                {/* Content */}
                <div className="relative z-10 flex flex-col flex-grow">
                  <h3 className={`text-lg font-bold mb-2 font-mono uppercase tracking-widest ${service.recommended ? 'text-primary' : 'text-white'}`}>
                    {service.name}
                  </h3>
                  <p className="text-gray-400 mb-4 flex-grow text-sm leading-relaxed">
                    {service.description}
                  </p>

                  {/* Feature list for recommended */}
                  {'features' in service && (
                    <motion.ul
                      variants={staggerContainerFast}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      className="mb-4 space-y-1.5 font-mono text-xs tracking-wider"
                    >
                      {(service as typeof services[1]).features.map((f) => (
                        <motion.li key={f} variants={fadeInUp} className="flex items-center text-gray-300">
                          <span className="text-primary mr-2 font-bold">&gt;</span> {f}
                        </motion.li>
                      ))}
                    </motion.ul>
                  )}

                  {/* Price footer */}
                  <div className="pt-4 mt-auto border-t border-dashed border-gray-700">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-[9px] text-gray-500 uppercase tracking-widest font-mono block">EST_COST</span>
                        <div className={`text-xl font-bold font-mono ${service.recommended ? 'text-primary' : 'text-white'}`}>
                          {service.priceRaw}<span className={service.recommended ? 'text-white text-sm' : 'text-primary text-sm'}>.00</span>
                        </div>
                      </div>
                      <motion.div
                        className={`w-8 h-8 rounded-full flex items-center justify-center cursor-pointer ${service.recommended ? 'bg-primary text-black hover:bg-white shadow-[0_0_10px_rgba(249,112,21,0.5)]' : 'border border-primary/50 text-primary hover:bg-primary hover:text-white'}`}
                        whileHover={{ scale: 1.2, rotate: 90 }}
                        transition={{ duration: 0.2 }}
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export { ServicesSectionFn as ServicesSection }