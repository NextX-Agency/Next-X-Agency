'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { AnimatedSVGPath } from '@/components/animated/AnimatedSVGPath'

const services = [
  'Website Design',
  'Logo & Branding',
  'Webshops',
  'UX / UI',
  'SEO',
]

// The NextX logo on a flat, framed panel with a solid orange offset block —
// print-inspired, no glows or floating decoration.
function BrandMark() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full max-w-105 mx-auto"
      aria-hidden="true"
    >
      <div className="absolute -bottom-3 -right-3 w-full h-full bg-primary" />
      <div className="relative bg-white border border-foreground/15 px-10 py-14 flex items-center justify-center">
        <Image
          src="/logo-light.png"
          alt=""
          width={420}
          height={210}
          className="w-full h-auto object-contain"
          priority
        />
      </div>
    </motion.div>
  )
}

function HeroSectionFn() {
  return (
    <header className="relative flex flex-col min-h-[90vh] justify-center pt-32 pb-0 bg-background">
      <div className="relative max-w-6xl mx-auto px-6 w-full">
        {/* Meta row above the headline */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex items-baseline justify-between border-t-2 border-foreground pt-4 mb-12"
        >
          <span className="text-xs font-bold tracking-[0.18em] uppercase text-foreground">
            NextX Agency
          </span>
          <span className="text-xs font-medium text-muted-foreground">
            Digitaal bureau — Paramaribo, Suriname
          </span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-14 lg:gap-10 items-center">
          {/* ── Left: text ── */}
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mb-8"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              <span
                className="block font-bold text-foreground leading-[0.98] tracking-tighter"
                style={{ fontSize: 'clamp(2.8rem, 6.5vw, 5.5rem)' }}
              >
                Websites die
              </span>
              <span
                className="block font-bold text-foreground leading-[0.98] tracking-tighter"
                style={{ fontSize: 'clamp(2.8rem, 6.5vw, 5.5rem)' }}
              >
                voor u{' '}
                <span className="relative inline-block align-baseline">
                  <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.65, delay: 0.5 }}
                    className="inline-block text-primary"
                  >
                    werken.
                  </motion.span>
                  <svg
                    className="absolute left-0 overflow-visible pointer-events-none"
                    style={{ bottom: '-0.12em', width: '100%', height: '0.22em' }}
                    viewBox="0 0 200 14"
                    fill="none"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                  >
                    <AnimatedSVGPath
                      d="M2 9 Q50 3 100 9 Q150 15 198 9"
                      stroke="#f97316"
                      strokeWidth="4"
                      strokeLinecap="round"
                      opacity={0.85}
                      delay={0.9}
                      duration={0.8}
                    />
                  </svg>
                </span>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-base md:text-lg text-muted-foreground max-w-md mb-10 leading-relaxed"
            >
              Wij ontwerpen en bouwen elke website zelf, op maat van uw bedrijf.
              Doordacht design, eerlijke prijzen en persoonlijk contact — vanuit Paramaribo.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-6"
            >
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-3 bg-foreground hover:bg-primary text-white font-bold px-8 py-4 text-base transition-colors duration-300"
              >
                Start een project
                <span aria-hidden="true">→</span>
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 text-foreground font-semibold text-base border-b-2 border-primary pb-0.5 hover:text-primary transition-colors duration-300"
              >
                Bekijk diensten
              </Link>
            </motion.div>
          </div>

          {/* ── Right: brand mark ── */}
          <div className="flex items-center justify-center pb-4 lg:pb-0">
            <BrandMark />
          </div>
        </div>
      </div>

      {/* Static services index — replaces the marquee */}
      <div className="w-full border-t border-foreground/15 mt-16">
        <div className="max-w-6xl mx-auto px-6 py-5 flex flex-wrap items-baseline gap-x-3 gap-y-2">
          {services.map((item, i) => (
            <span key={item} className="flex items-baseline gap-3">
              <span className="text-sm font-semibold text-foreground">{item}</span>
              {i < services.length - 1 && (
                <span className="text-primary font-bold" aria-hidden="true">/</span>
              )}
            </span>
          ))}
          <span className="ml-auto text-xs font-medium text-muted-foreground hidden md:inline">
            Alles onder één dak
          </span>
        </div>
      </div>
    </header>
  )
}

export { HeroSectionFn as HeroSection }
