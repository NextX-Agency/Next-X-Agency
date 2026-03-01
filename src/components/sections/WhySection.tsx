'use client'

import { motion } from 'framer-motion'
import {
  fadeInUp,
  staggerContainer,
  staggerContainerSlow,
  cardFlipIn,
  blurFadeIn,
} from '@/lib/animationUtils'
import { SpotlightCard } from '@/components/animated/SpotlightCard'

const features = [
  {
    label: 'SPEED_V1.0',
    title: 'Snel Geleverd',
    lines: [
      '> Executing optimized workflows...',
      '> Delivery time: Minimal.',
      '> Quality loss: 0%.',
    ],
    icon: (
      <svg className="w-full h-full text-primary" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="#f97015" strokeOpacity="0.2" strokeWidth="4" />
      </svg>
    ),
  },
  {
    label: 'COST_EFFICIENCY',
    title: 'Smart Budget',
    lines: [
      '> Smart Tech Integration.',
      '> Premium output.',
      '> Rate: Competitive.',
    ],
    icon: (
      <svg className="w-full h-full text-primary" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" aria-hidden="true">
        <rect height="16" rx="2" width="20" x="2" y="4" />
        <line x1="12" x2="12" y1="2" y2="4" />
        <line x1="12" x2="12" y1="20" y2="22" />
        <path d="M8 12h.01M16 12h.01" strokeWidth="3" />
      </svg>
    ),
  },
  {
    label: 'DESIGN_CORE',
    title: 'Custom Design',
    lines: [
      '> Data-driven aesthetics.',
      '> Brand Identity Match: 100%.',
      '> Target: Locked.',
    ],
    icon: (
      <svg className="w-full h-full text-primary" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <path d="M14.31 8l5.74 9.94M9.69 8h11.48M7.38 12l5.74-9.94M9.69 16L3.95 6.06M14.31 16H2.83M16.62 12l-5.74 9.94" />
      </svg>
    ),
  },
  {
    label: 'NET_LOCAL',
    title: 'Lokaal Netwerk',
    lines: [
      '> Root: Paramaribo/SR.',
      '> Perspective: Global.',
      '> Connectivity: High.',
    ],
    icon: (
      <svg className="w-full h-full text-primary" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="10" r="3" />
        <path d="M12 13a7 7 0 0 0-7 7h14a7 7 0 0 0-7-7z" />
        <path d="M5 5a10 10 0 0 1 14 0" />
      </svg>
    ),
  },
] as const

function WhySectionFn() {
  return (
    <section className="py-24 relative bg-[#0B1120] overflow-hidden" id="why">
      {/* Grid background */}
      <div className="absolute inset-0 bg-grid-slate opacity-50 pointer-events-none" />

      {/* Thin construction lines */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        <span className="absolute top-24 left-10 font-mono text-[10px] text-primary/40 hidden lg:block select-none">GRID_REF_X45</span>
        <div className="absolute bottom-20 right-0 w-2/3 h-px bg-gradient-to-l from-transparent via-primary/20 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-24 relative"
        >
          <span
            className="absolute -top-8 left-1/2 -translate-x-1/2 -rotate-6 text-primary text-xl select-none hidden md:block"
            style={{ fontFamily: "'Architects Daughter', cursive" }}
          >
            Why choose us?
          </span>
          <motion.div variants={fadeInUp} className="inline-block border-2 border-gray-800 bg-black px-4 py-1 relative">
            <span className="font-mono text-white text-sm tracking-widest uppercase">AGENCY_MODULE</span>
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary" />
            <span className="absolute -bottom-1 -left-1 w-2 h-2 bg-primary" />
          </motion.div>
          <motion.h2 variants={blurFadeIn} className="mt-6 text-4xl md:text-5xl font-bold text-white tracking-tight font-mono">
            LOGIC_FLOW: <span className="gradient-text-animated">NextX</span>
          </motion.h2>
        </motion.div>

        {/* Cards grid */}
        <motion.div
          variants={staggerContainerSlow}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative"
        >
          {/* Animated SVG connectors between cards (desktop) */}
          <svg
            className="hidden lg:block absolute top-1/2 left-0 w-full h-24 -translate-y-1/2 pointer-events-none z-0"
            style={{ overflow: 'visible' }}
            aria-hidden="true"
          >
            <motion.path
              d="M260 40 C 290 40, 310 40, 340 40"
              fill="none" stroke="#f97015" strokeDasharray="5,5" strokeWidth="2"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3, ease: 'easeInOut' }}
            />
            <motion.circle
              cx="300" cy="40" r="4" fill="#0B1120" stroke="#f97015" strokeWidth="2"
              initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.9 }}
              style={{ transformOrigin: '300px 40px' }}
            />
            <motion.path
              d="M570 40 C 600 40, 620 40, 650 40"
              fill="none" stroke="#f97015" strokeDasharray="5,5" strokeWidth="2"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.55, ease: 'easeInOut' }}
            />
            <motion.circle
              cx="610" cy="40" r="4" fill="#0B1120" stroke="#f97015" strokeWidth="2"
              initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 1.1 }}
              style={{ transformOrigin: '610px 40px' }}
            />
            <motion.path
              d="M880 40 C 910 40, 930 40, 960 40"
              fill="none" stroke="#f97015" strokeDasharray="5,5" strokeWidth="2"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.8, ease: 'easeInOut' }}
            />
            <motion.circle
              cx="920" cy="40" r="4" fill="#0B1120" stroke="#f97015" strokeWidth="2"
              initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 1.35 }}
              style={{ transformOrigin: '920px 40px' }}
            />
          </svg>

          {features.map((feature) => (
            <motion.div
              key={feature.label}
              variants={cardFlipIn}
              className="z-10"
            >
              <SpotlightCard className="h-full sketch-card p-6 hover-lift transition-all duration-300">
                {/* Technical label tab */}
                <div className="absolute -top-3 left-4 bg-[#0B1120] px-2 technical-label border border-primary/30">
                  {feature.label}
                </div>

                {/* Icon — float + glow on hover */}
                <motion.div
                  className="w-12 h-12 mb-4 icon-glow"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
                >
                  {feature.icon}
                </motion.div>

                <h3 className="text-lg font-bold text-white mb-3 font-mono uppercase tracking-wider group-hover:text-primary transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-xs leading-relaxed font-mono">
                  {feature.lines.map((line) => (
                    <span key={line} className="block">{line}</span>
                  ))}
                </p>

                {/* Neon corner accents */}
                <span className="absolute bottom-2 right-2 w-4 h-4 border-r border-b border-primary/50 transition-all duration-300 group-hover:border-primary" />
                <span className="absolute top-2 left-2 w-3 h-3 border-l border-t border-primary/30 transition-all duration-300 group-hover:border-primary/70" />
              </SpotlightCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export { WhySectionFn as WhySection }