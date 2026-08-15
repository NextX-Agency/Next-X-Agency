'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { fadeInUp, blurFadeIn, staggerContainer, scaleIn } from '@/lib/animationUtils'
import { CONTACT, TEL_HREF, whatsappHref } from '@/lib/contact'

function CTABannerFn() {
  return (
    <section className="py-28 lg:py-36 relative overflow-hidden bg-primary">
      {/* Break the flat fill: an off-centre warm hotspot plus a darker sink in
          the opposite corner, so the slab has a light direction. */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(46rem 30rem at 22% 8%, rgba(255,214,170,0.30), transparent 60%), radial-gradient(40rem 28rem at 88% 108%, rgba(36,29,24,0.28), transparent 62%)',
        }}
        aria-hidden="true"
      />
      <div
        className="bg-grid-pattern absolute inset-0 opacity-40 pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          <motion.h2 variants={blurFadeIn} className="text-4xl md:text-5xl font-bold text-neutral-950 tracking-tight mb-5" style={{ fontFamily: 'var(--font-heading)' }}>
            Vertel ons wat u nodig heeft.
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-lg text-neutral-950/70 max-w-2xl mx-auto mb-10 leading-relaxed">
            Vertel wat u wilt bouwen. Wij reageren {CONTACT.responseTime} met
            een helder voorstel.
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
                href={whatsappHref('Hallo NextX, ik wil graag een gesprek over een project.')}
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

          {/* The number itself, spelled out — not everyone clicks a button. */}
          <motion.p
            variants={fadeInUp}
            className="mt-8 text-sm text-neutral-950/70"
          >
            Liever bellen?{' '}
            <a
              href={TEL_HREF}
              className="font-bold text-neutral-950 underline underline-offset-4 hover:text-neutral-800 transition-colors"
            >
              {CONTACT.phoneDisplay}
            </a>{' '}
            · {CONTACT.location}
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}

export { CTABannerFn as CTABanner }
