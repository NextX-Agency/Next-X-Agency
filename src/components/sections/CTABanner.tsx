'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { fadeInUp, staggerContainer, scaleIn } from '@/lib/animationUtils'

function CTABannerFn() {
  return (
    <section className="bg-[#FF6B00] py-16 lg:py-20 relative overflow-hidden">
      {/* Decorative SVG background shapes */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        aria-hidden="true"
        viewBox="0 0 1200 300"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Large orbit ring — top left */}
        <motion.circle
          cx="0" cy="60" r="200"
          fill="none" stroke="rgba(0,0,0,0.07)" strokeWidth="1.5"
          initial={{ scale: 0.6, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          style={{ transformOrigin: '0px 60px' }}
        />
        <motion.circle
          cx="0" cy="60" r="300"
          fill="none" stroke="rgba(0,0,0,0.04)" strokeWidth="1"
          initial={{ scale: 0.6, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: 'easeOut', delay: 0.1 }}
          style={{ transformOrigin: '0px 60px' }}
        />
        {/* Large orbit ring — bottom right */}
        <motion.circle
          cx="1200" cy="240" r="220"
          fill="none" stroke="rgba(0,0,0,0.07)" strokeWidth="1.5"
          initial={{ scale: 0.6, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: 'easeOut', delay: 0.15 }}
          style={{ transformOrigin: '1200px 240px' }}
        />
        {/* Diagonal accent lines */}
        <motion.line
          x1="80" y1="0" x2="0" y2="80"
          stroke="rgba(0,0,0,0.12)" strokeWidth="1"
          initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        />
        <motion.line
          x1="1120" y1="300" x2="1200" y2="220"
          stroke="rgba(0,0,0,0.12)" strokeWidth="1"
          initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        />
        {/* Center cross-hair accent */}
        <motion.line
          x1="570" y1="140" x2="630" y2="140"
          stroke="rgba(0,0,0,0.15)" strokeWidth="1"
          initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
        />
        <motion.line
          x1="600" y1="110" x2="600" y2="170"
          stroke="rgba(0,0,0,0.15)" strokeWidth="1"
          initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
        />
      </svg>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          <motion.h2 variants={fadeInUp} className="text-headline text-[#0a0a0a] mb-4">
            Klaar om uw bedrijf online te laten groeien?
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-body-lg text-[#0a0a0a]/70 max-w-2xl mx-auto mb-10">
            Stuur ons een bericht en ontvang binnen 24-48 uur een vrijblijvende
            quote.
          </motion.p>

          <motion.div
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15 } } }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <motion.div variants={scaleIn}>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/contact"
                  className="inline-block bg-[#0a0a0a] text-white hover:bg-[#1a1a1a] font-bold uppercase tracking-[0.12em] text-xs px-8 py-4 transition-colors duration-150 min-h-[44px]"
                  style={{ borderRadius: '2px' }}
                >
                  Stuur een aanvraag
                </Link>
              </motion.div>
            </motion.div>
            <motion.div variants={scaleIn}>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                <a
                  href="https://wa.me/5978318508"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-white text-[#0a0a0a] hover:bg-white/90 font-bold uppercase tracking-[0.12em] text-xs px-8 py-4 transition-colors duration-150 min-h-[44px]"
                  style={{ borderRadius: '2px' }}
                >
                  WhatsApp ons
                </a>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export { CTABannerFn as CTABanner }
