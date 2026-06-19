'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { fadeInUp, blurFadeIn, staggerContainer, scaleIn } from '@/lib/animationUtils'

function CTABannerFn() {
  return (
    <section className="py-28 lg:py-36 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #FF6B00 0%, #f97316 40%, #ff8c00 70%, #FF6B00 100%)' }}>
      {/* Subtle decorative circles */}
      <div className="absolute -left-32 -top-32 w-96 h-96 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)' }} />
      <div className="absolute -right-32 -bottom-32 w-96 h-96 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(0,0,0,0.12) 0%, transparent 70%)' }} />
      {/* Dot pattern overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.07]" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          <motion.h2 variants={blurFadeIn} className="text-4xl md:text-5xl font-bold text-neutral-950 tracking-tight mb-5" style={{ fontFamily: 'var(--font-heading)' }}>
            Klaar om uw bedrijf online te laten groeien?
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-lg text-neutral-950/70 max-w-2xl mx-auto mb-10 leading-relaxed">
            Stuur ons een bericht en ontvang binnen 24-48 uur een vrijblijvende
            quote.
          </motion.p>

          <motion.div
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15 } } }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <motion.div variants={scaleIn} className="w-full sm:w-auto">
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center gap-2 w-full sm:w-auto text-center bg-neutral-950 text-white font-bold text-sm px-8 py-4 rounded-full transition-all duration-300 hover:bg-neutral-900 hover:shadow-xl hover:shadow-black/25 hover:scale-[1.03] min-h-[44px]"
              >
                Stuur een aanvraag
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </motion.div>
            <motion.div variants={scaleIn} className="w-full sm:w-auto">
              <a
                href="https://wa.me/5978318508"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2 w-full sm:w-auto text-center bg-white text-neutral-950 font-bold text-sm px-8 py-4 rounded-full transition-all duration-300 hover:bg-white/90 hover:shadow-xl hover:scale-[1.03] min-h-[44px]"
              >
                WhatsApp ons
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export { CTABannerFn as CTABanner }
