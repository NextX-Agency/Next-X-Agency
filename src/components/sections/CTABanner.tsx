'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { fadeInUp, blurFadeIn, staggerContainer, scaleIn } from '@/lib/animationUtils'

function CTABannerFn() {
  return (
    <section className="py-28 lg:py-36 relative overflow-hidden bg-primary">
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          <motion.h2 variants={blurFadeIn} className="text-4xl md:text-5xl font-bold text-neutral-950 tracking-tight mb-5" style={{ fontFamily: 'var(--font-heading)' }}>
            Een goed gesprek is een beter begin.
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-lg text-neutral-950/70 max-w-2xl mx-auto mb-10 leading-relaxed">
            Vertel wat u wilt bouwen. Wij reageren binnen 24–48 uur met een
            helder voorstel.
          </motion.p>

          <motion.div
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15 } } }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <motion.div variants={scaleIn} className="w-full sm:w-auto">
              <Link
                href="/contact"
                className="button-primary group w-full sm:w-auto bg-neutral-950 hover:bg-neutral-800"
              >
                Plan een gesprek
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
                className="button-secondary group w-full sm:w-auto border-white bg-white text-neutral-950 hover:border-white hover:bg-neutral-100 hover:text-neutral-950"
              >
                Chat via WhatsApp
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
