'use client'

import { motion } from 'framer-motion'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { CTABanner } from '@/components/sections/CTABanner'
import {
  fadeInUp,
  fadeInDown,
  scaleIn,
  staggerContainer,
  staggerContainerFast,
  cardFlipIn,
} from '@/lib/animationUtils'

// Per-project SVG illustration colours & shapes
const projectVisuals = [
  { bg: 'from-[#FF6B00]/10 to-[#1a1a1a]', accent: '#FF6B00', shape: 'arc' },
  { bg: 'from-[#0ea5e9]/8 to-[#1a1a1a]',  accent: '#0ea5e9', shape: 'grid' },
  { bg: 'from-[#a855f7]/8 to-[#1a1a1a]',  accent: '#a855f7', shape: 'wave' },
  { bg: 'from-[#22c55e]/8 to-[#1a1a1a]',  accent: '#22c55e', shape: 'diamond' },
  { bg: 'from-[#f59e0b]/8 to-[#1a1a1a]',  accent: '#f59e0b', shape: 'circles' },
  { bg: 'from-[#ec4899]/8 to-[#1a1a1a]',  accent: '#ec4899', shape: 'cross' },
] as const

const projects = [
  {
    title: 'Tjin Catering',
    category: 'Restaurant Website',
    description:
      'Complete restaurant website met digitaal menu, openingstijden en reserveringslink.',
    tags: ['Web Design', 'Restaurant'],
  },
  {
    title: 'RP Trading',
    category: 'E-Commerce',
    description:
      'Webshop met productcatalogus, winkelwagen en Stripe betalingsintegratie.',
    tags: ['E-Commerce', 'Webshop'],
  },
  {
    title: 'Suri Style Boutique',
    category: 'E-Commerce',
    description:
      'Mode webshop met klantaccounts, wishlist en order tracking systeem.',
    tags: ['E-Commerce', 'Fashion'],
  },
  {
    title: 'Green Garden Landscaping',
    category: 'Service Website',
    description:
      'Multi-page service website met portfolio galerij en contactformulier.',
    tags: ['Web Design', 'Services'],
  },
  {
    title: 'Studio Kroon',
    category: 'Portfolio Website',
    description:
      'Fotografen portfolio met galerij, project detail pagina\'s en over mij sectie.',
    tags: ['Portfolio', 'Fotografie'],
  },
  {
    title: 'FreshBite Delivery',
    category: 'Brand Identity',
    description:
      'Complete visuele identiteit — logo, social media templates en flyer designs.',
    tags: ['Graphic Design', 'Branding'],
  },
] as const

export default function PortfolioPage() {
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
          {/* Left-side mirrored decoration */}
          <svg className="absolute left-0 top-0 w-[340px] h-[340px] opacity-8 pointer-events-none" aria-hidden="true" viewBox="0 0 420 420">
            <motion.circle cx="0" cy="210" r="180" fill="none" stroke="#FF6B00" strokeWidth="0.6"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
              transition={{ duration: 2.5, ease: 'easeInOut', delay: 0.3 }} />
            <motion.circle cx="0" cy="210" r="120" fill="none" stroke="#FF6B00" strokeWidth="0.4"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
              transition={{ duration: 2, delay: 0.8, ease: 'easeInOut' }} />
            <motion.line x1="0" y1="70" x2="180" y2="210" stroke="#FF6B00" strokeWidth="0.4"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
              transition={{ duration: 1.2, delay: 1.5 }} />
            <motion.line x1="0" y1="350" x2="180" y2="210" stroke="#FF6B00" strokeWidth="0.4"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
              transition={{ duration: 1.2, delay: 1.7 }} />
          </svg>
          {/* Animated geometric SVG decoration */}
          <svg className="absolute right-0 top-0 w-[420px] h-[420px] opacity-10 pointer-events-none" aria-hidden="true" viewBox="0 0 420 420">
            <motion.circle cx="210" cy="210" r="180" fill="none" stroke="#FF6B00" strokeWidth="0.8"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
              transition={{ duration: 2.5, ease: 'easeInOut' }} />
            <motion.circle cx="210" cy="210" r="120" fill="none" stroke="#FF6B00" strokeWidth="0.5"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
              transition={{ duration: 2, delay: 0.5, ease: 'easeInOut' }} />
            <motion.line x1="30" y1="210" x2="390" y2="210" stroke="#FF6B00" strokeWidth="0.5"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
              transition={{ duration: 1.2, delay: 1.2 }} />
            <motion.line x1="210" y1="30" x2="210" y2="390" stroke="#FF6B00" strokeWidth="0.5"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
              transition={{ duration: 1.2, delay: 1.4 }} />
            {[0, 60, 120, 180, 240, 300].map((deg, i) => {
              const rad = (deg * Math.PI) / 180
              return (
                <motion.circle key={i}
                  cx={210 + 180 * Math.cos(rad)} cy={210 + 180 * Math.sin(rad)} r="4"
                  fill="#FF6B00"
                  initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3 + i * 0.15, type: 'spring', stiffness: 300 }} />
              )
            })}
          </svg>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          >
            <motion.div variants={scaleIn} className="inline-flex badge bg-primary-muted text-primary border border-primary/30 mb-8">
              Ons Werk
            </motion.div>
            <motion.h1 variants={fadeInUp} className="text-display text-foreground max-w-4xl mx-auto mb-6">
              Portfolio
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-body-lg text-muted-foreground max-w-2xl mx-auto">
              Een selectie van recente projecten. Elk project begint als template
              en wordt volledig gepersonaliseerd naar de wensen van de klant.
            </motion.p>
          </motion.div>
        </section>

        {/* ── Projects grid ─────────────────────────────────── */}
        <section className="py-16 lg:py-24 relative overflow-hidden">
          {/* Gallery frame corners drawing on scroll */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true" viewBox="0 0 1200 900" preserveAspectRatio="none">
            {/* Top-left corner frame */}
            <motion.path d="M40 120 L40 40 L160 40" fill="none" stroke="#FF6B00" strokeWidth="1"
              initial={{ pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 0.12 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 1, ease: 'easeInOut' }} />
            {/* Top-right corner frame */}
            <motion.path d="M1040 40 L1160 40 L1160 120" fill="none" stroke="#FF6B00" strokeWidth="1"
              initial={{ pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 0.12 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 1, ease: 'easeInOut', delay: 0.15 }} />
            {/* Bottom-left corner frame */}
            <motion.path d="M40 780 L40 860 L160 860" fill="none" stroke="#FF6B00" strokeWidth="1"
              initial={{ pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 0.12 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 1, ease: 'easeInOut', delay: 0.3 }} />
            {/* Bottom-right corner frame */}
            <motion.path d="M1040 860 L1160 860 L1160 780" fill="none" stroke="#FF6B00" strokeWidth="1"
              initial={{ pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 0.12 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 1, ease: 'easeInOut', delay: 0.45 }} />
          </svg>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              variants={staggerContainerFast}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.05 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {projects.map((project, index) => {
                const vis = projectVisuals[index % projectVisuals.length]
                return (
                  <motion.div
                    key={project.title}
                    variants={cardFlipIn}
                    className="bg-card border border-border rounded-xl overflow-hidden shadow-sm group"
                    whileHover={{ y: -10, scale: 1.01, transition: { duration: 0.25, ease: 'easeOut' } }}
                  >
                    {/* Illustrated preview area */}
                    <div className={`aspect-[16/9] bg-gradient-to-br ${vis.bg} relative overflow-hidden flex items-center justify-center`}>
                    {/* SVG illustration per project type — draws in on scroll */}
                      <svg className="absolute inset-0 w-full h-full opacity-30" aria-hidden="true" viewBox="0 0 320 180" preserveAspectRatio="xMidYMid meet">
                        {vis.shape === 'arc' && (
                          <>
                            <motion.circle cx="160" cy="180" r="120" fill="none" stroke={vis.accent} strokeWidth="1"
                              initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
                              transition={{ duration: 1.4, ease: 'easeInOut', delay: index * 0.05 }} />
                            <motion.circle cx="160" cy="180" r="80" fill="none" stroke={vis.accent} strokeWidth="0.7"
                              initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
                              transition={{ duration: 1.1, ease: 'easeInOut', delay: 0.25 + index * 0.05 }} />
                            <motion.line x1="0" y1="100" x2="320" y2="100" stroke={vis.accent} strokeWidth="0.5"
                              initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
                              transition={{ duration: 0.7, delay: 0.5 + index * 0.05 }} />
                            <motion.circle cx="160" cy="100" r="5" fill={vis.accent}
                              initial={{ scale: 0, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }}
                              transition={{ delay: 0.8, type: 'spring', stiffness: 300 }} />
                          </>
                        )}
                        {vis.shape === 'grid' && (
                          <>
                            {[0,1,2,3,4].map(i => (
                              <motion.line key={`v${i}`} x1={64*i} y1="0" x2={64*i} y2="180" stroke={vis.accent} strokeWidth="0.5"
                                initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: i * 0.08 }} />
                            ))}
                            {[0,1,2,3].map(i => (
                              <motion.line key={`h${i}`} x1="0" y1={45*i} x2="320" y2={45*i} stroke={vis.accent} strokeWidth="0.5"
                                initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.4 + i * 0.08 }} />
                            ))}
                            <motion.circle cx="160" cy="90" r="28" fill="none" stroke={vis.accent} strokeWidth="1.5"
                              initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
                              transition={{ duration: 1, delay: 0.8 }} />
                          </>
                        )}
                        {vis.shape === 'wave' && (
                          <>
                            <motion.path d="M0 100 Q80 60 160 100 Q240 140 320 100" fill="none" stroke={vis.accent} strokeWidth="1"
                              initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
                              transition={{ duration: 1.2, ease: 'easeInOut' }} />
                            <motion.path d="M0 120 Q80 80 160 120 Q240 160 320 120" fill="none" stroke={vis.accent} strokeWidth="0.6"
                              initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
                              transition={{ duration: 1.2, ease: 'easeInOut', delay: 0.15 }} />
                            <motion.path d="M0 80 Q80 40 160 80 Q240 120 320 80" fill="none" stroke={vis.accent} strokeWidth="0.6"
                              initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
                              transition={{ duration: 1.2, ease: 'easeInOut', delay: 0.3 }} />
                            <motion.circle cx="160" cy="90" r="8" fill={vis.accent} opacity="0.6"
                              initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }}
                              transition={{ delay: 0.8, type: 'spring', stiffness: 350 }} />
                          </>
                        )}
                        {vis.shape === 'diamond' && (
                          <>
                            <motion.polygon points="160,30 270,90 160,150 50,90" fill="none" stroke={vis.accent} strokeWidth="1"
                              initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
                              transition={{ duration: 1.3, ease: 'easeInOut' }} />
                            <motion.polygon points="160,55 225,90 160,125 95,90" fill="none" stroke={vis.accent} strokeWidth="0.7"
                              initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
                              transition={{ duration: 1.0, ease: 'easeInOut', delay: 0.3 }} />
                            <motion.circle cx="160" cy="90" r="6" fill={vis.accent}
                              initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }}
                              transition={{ delay: 0.8, type: 'spring', stiffness: 300 }} />
                          </>
                        )}
                        {vis.shape === 'circles' && (
                          <>
                            <motion.circle cx="160" cy="90" r="60" fill="none" stroke={vis.accent} strokeWidth="1"
                              initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
                              transition={{ duration: 1.4, ease: 'easeInOut' }} />
                            <motion.circle cx="160" cy="90" r="40" fill="none" stroke={vis.accent} strokeWidth="0.8"
                              initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
                              transition={{ duration: 1.1, ease: 'easeInOut', delay: 0.2 }} />
                            <motion.circle cx="160" cy="90" r="20" fill="none" stroke={vis.accent} strokeWidth="0.6"
                              initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
                              transition={{ duration: 0.8, ease: 'easeInOut', delay: 0.4 }} />
                            <motion.circle cx="160" cy="90" r="4" fill={vis.accent}
                              initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }}
                              transition={{ delay: 0.7, type: 'spring', stiffness: 300 }} />
                            <motion.circle cx="100" cy="90" r="4" fill={vis.accent} opacity="0.5"
                              initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }}
                              transition={{ delay: 0.85, type: 'spring', stiffness: 300 }} />
                            <motion.circle cx="220" cy="90" r="4" fill={vis.accent} opacity="0.5"
                              initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }}
                              transition={{ delay: 1.0, type: 'spring', stiffness: 300 }} />
                          </>
                        )}
                        {vis.shape === 'cross' && (
                          <>
                            <motion.line x1="160" y1="20" x2="160" y2="160" stroke={vis.accent} strokeWidth="1"
                              initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
                              transition={{ duration: 0.8, ease: 'easeInOut' }} />
                            <motion.line x1="80" y1="90" x2="240" y2="90" stroke={vis.accent} strokeWidth="1"
                              initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
                              transition={{ duration: 0.8, ease: 'easeInOut', delay: 0.2 }} />
                            <motion.circle cx="160" cy="90" r="35" fill="none" stroke={vis.accent} strokeWidth="0.8"
                              initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
                              transition={{ duration: 1.1, ease: 'easeInOut', delay: 0.4 }} />
                            <motion.circle cx="160" cy="90" r="6" fill={vis.accent}
                              initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }}
                              transition={{ delay: 0.9, type: 'spring', stiffness: 300 }} />
                          </>
                        )}
                      </svg>

                      {/* Category badge overlay */}
                      <motion.div
                        className="absolute bottom-3 left-3 px-2 py-1 text-[10px] font-bold uppercase tracking-wider rounded"
                        style={{ background: `${vis.accent}22`, color: vis.accent, border: `1px solid ${vis.accent}44` }}
                        initial={{ opacity: 0, y: 6 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                      >
                        {project.category}
                      </motion.div>

                      {/* Hover overlay */}
                      <motion.div
                        className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center"
                      >
                        <motion.div
                          className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-xs font-semibold uppercase tracking-wider border border-white/40 px-4 py-2"
                          style={{ borderRadius: '2px' }}
                        >
                          Bekijk project
                        </motion.div>
                      </motion.div>
                    </div>

                    <div className="p-6">
                      <motion.h3
                        className="text-title text-foreground mt-1 mb-2 group-hover:text-primary transition-colors"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.15 }}
                      >
                        {project.title}
                      </motion.h3>
                      <p className="text-body text-muted-foreground mb-4">{project.description}</p>
                      <motion.div
                        className="flex flex-wrap gap-2"
                        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06 } } }}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                      >
                        {project.tags.map((tag) => (
                          <motion.span
                            key={tag}
                            variants={{ hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1 } }}
                            transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                            className="badge badge-neutral text-xs normal-case tracking-normal"
                          >
                            {tag}
                          </motion.span>
                        ))}
                      </motion.div>
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>
        </section>

        <CTABanner />
      </main>
      <Footer />
    </>
  )
}
