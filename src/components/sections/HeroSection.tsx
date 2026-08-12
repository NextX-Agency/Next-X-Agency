'use client'

import { useEffect, useState, useSyncExternalStore } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useReducedMotion, type Variants } from 'framer-motion'
import { AnimatedSVGPath } from '@/components/animated/AnimatedSVGPath'
import { Magnetic } from '@/components/interactive/Magnetic'

const services = [
  'Websites',
  'Merkidentiteit',
  'Webshops',
  'UX / UI',
  'SEO',
  'Hosting',
]

// The promise rotates; the sentence around it does not.
const promises = ['werken', 'verkopen', 'opvallen', 'groeien'] as const

// Line-by-line mask reveal — the type is wiped up from behind a clip,
// not faded in. Reads as printing rather than as a slide transition.
const wipeUp: Variants = {
  hidden: { y: '108%' },
  visible: (i: number) => ({
    y: '0%',
    transition: {
      duration: 0.9,
      delay: 0.15 + i * 0.09,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
}

/** Local time in Paramaribo, read as an external source so the server render
 *  and the first client render agree on a placeholder. */
const clock = {
  subscribe(onChange: () => void) {
    const id = setInterval(onChange, 20_000)
    return () => clearInterval(id)
  },
  getSnapshot() {
    return new Intl.DateTimeFormat('nl-NL', {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'America/Paramaribo',
    }).format(new Date())
  },
  getServerSnapshot() {
    return '--:--'
  },
}

function LocalClock() {
  const time = useSyncExternalStore(
    clock.subscribe,
    clock.getSnapshot,
    clock.getServerSnapshot
  )

  return <span className="mono-num tabular-nums">{time}</span>
}

/** Rotating promise word. All variants are stacked in one grid cell so the
 *  measure never shifts and the underline keeps a constant width. */
function RotatingPromise() {
  const reduced = useReducedMotion()
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (reduced) return
    const id = setInterval(() => setIndex((i) => (i + 1) % promises.length), 2600)
    return () => clearInterval(id)
  }, [reduced])

  return (
    <span className="relative inline-block align-baseline">
      <span className="grid overflow-hidden pb-[0.08em]">
        {promises.map((word, i) => (
          <motion.span
            key={word}
            className="col-start-1 row-start-1 inline-block text-primary text-left"
            aria-hidden={i === index ? undefined : true}
            initial={false}
            animate={
              reduced
                ? { y: '0%', opacity: i === 0 ? 1 : 0 }
                : {
                    y: i === index ? '0%' : '-110%',
                    opacity: i === index ? 1 : 0,
                  }
            }
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          >
            {word}.
          </motion.span>
        ))}
      </span>

      <svg
        className="absolute left-0 overflow-visible pointer-events-none"
        style={{ bottom: '-0.06em', width: '100%', height: '0.22em' }}
        viewBox="0 0 200 14"
        fill="none"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <AnimatedSVGPath
          d="M2 9 Q50 3 100 9 Q150 15 198 9"
          stroke="#c45a2b"
          strokeWidth="4"
          strokeLinecap="round"
          opacity={0.85}
          delay={0.9}
          duration={0.8}
        />
      </svg>
    </span>
  )
}

// The NextX mark on a flat, framed panel with a solid terracotta offset block
// and drafting crop marks. The panel carries the terms a prospect actually
// wants first, so it earns its half of the hero.
function BrandPanel() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full max-w-[29rem] mx-auto"
    >
      <div
        className="absolute -bottom-3 -right-3 w-full h-full bg-primary/90"
        aria-hidden="true"
      />

      <div className="crop-marks relative bg-card border border-foreground/15 p-7 sm:p-9">
        {/* Sheet header, as on a spec drawing */}
        <div className="flex items-center justify-between border-b border-border pb-4 mb-7">
          <span className="meta-sm text-muted-foreground">Fig. 01 — Merkblad</span>
          <span className="meta-sm text-muted-foreground">Rev. 2026</span>
        </div>

        <Image
          src="/logo-light.png"
          alt="NextX Agency"
          width={420}
          height={210}
          className="w-full h-auto object-contain"
          priority
        />

        {/* Availability — the first thing a prospect wants to know */}
        <div className="mt-8 flex items-center gap-2.5 border-t border-border pt-5">
          <span className="relative flex w-2 h-2 shrink-0" aria-hidden="true">
            <span className="absolute inline-flex w-full h-full rounded-full bg-primary opacity-60 motion-safe:animate-ping" />
            <span className="relative inline-flex w-2 h-2 rounded-full bg-primary" />
          </span>
          <span className="meta-sm text-foreground">
            Beschikbaar voor nieuwe projecten
          </span>
        </div>

        {/* Terms, stated up front */}
        <dl className="mt-5 space-y-3">
          {[
            ['Eerste gesprek', 'Gratis'],
            ['Oplevering', '48–72 uur'],
            ['Prijs', 'Vooraf vast'],
            ['Templates', 'Geen'],
          ].map(([term, value]) => (
            <div
              key={term}
              className="flex items-baseline gap-3 text-[13px]"
            >
              <dt className="text-muted-foreground shrink-0">{term}</dt>
              <span
                className="flex-1 border-b border-dashed border-border translate-y-[-3px]"
                aria-hidden="true"
              />
              <dd className="mono-num font-semibold text-foreground shrink-0">
                {value}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-7 grid grid-cols-3 border-t border-border pt-4 meta-sm text-muted-foreground">
          <span>Strategie</span>
          <span className="text-center">Ontwerp</span>
          <span className="text-right">Bouw</span>
        </div>
      </div>
    </motion.div>
  )
}

function HeroSectionFn() {
  return (
    <header className="surface-glow relative flex flex-col min-h-[calc(100dvh-4.25rem)] justify-center pt-20 pb-0 bg-background overflow-hidden">
      {/* Drafting grid, masked so it never competes with the headline */}
      <div
        className="bg-grid-pattern absolute inset-0 pointer-events-none [mask-image:radial-gradient(58rem_38rem_at_70%_18%,#000,transparent_78%)]"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full">
        {/* Sheet register above the headline */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="register mb-14"
        >
          <span className="meta text-foreground">NextX Agency</span>
          <span className="meta text-muted-foreground hidden sm:inline">
            5°52′N 55°10′W
          </span>
          <span className="meta text-muted-foreground flex items-center gap-2">
            Paramaribo <LocalClock />
          </span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-14 lg:gap-12 items-center">
          {/* ── Left: text ── */}
          <div className="relative">
            {/* Margin note in the gutter */}
            <span
              className="margin-note absolute -left-9 top-1 hidden xl:block"
              aria-hidden="true"
            >
              Sinds 2024 — Suriname
            </span>

            <h1
              className="mb-9"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              <span className="sr-only">
                Websites die voor u werken, verkopen, opvallen en groeien.
              </span>

              {['Websites die', 'voor u'].map((line, i) => (
                // overflow-hidden clips to the padding box, so the extra
                // bottom padding keeps the underline stroke inside the mask.
                <span
                  key={line}
                  className="block overflow-hidden pb-[0.22em] -mb-[0.22em]"
                >
                  <motion.span
                    custom={i}
                    variants={wipeUp}
                    initial="hidden"
                    animate="visible"
                    className="block font-bold text-foreground leading-[0.96] tracking-tighter"
                    style={{ fontSize: 'clamp(2.8rem, 6.6vw, 5.6rem)' }}
                    aria-hidden="true"
                  >
                    {line}
                    {i === 1 && <span className="inline-block w-[0.28em]" />}
                    {i === 1 && <RotatingPromise />}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-base md:text-lg text-muted-foreground max-w-md mb-10 leading-relaxed"
            >
              Een heldere website begint bij een goed begrip van uw bedrijf. Wij
              ontwerpen en bouwen digitaal werk dat past bij uw merk, klanten en
              ambities — vanuit Paramaribo.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-6"
            >
              <Magnetic>
                <Link
                  href="/contact"
                  className="group inline-flex items-center justify-center gap-3 bg-foreground hover:bg-primary text-white font-bold px-8 py-4 text-base transition-colors duration-300 active:translate-y-px"
                >
                  Plan een gesprek
                  <span
                    className="inline-block transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden="true"
                  >
                    →
                  </span>
                </Link>
              </Magnetic>
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 text-foreground font-semibold text-base border-b-2 border-primary pb-0.5 hover:text-primary transition-colors duration-300"
              >
                Bekijk ons werk
              </Link>
            </motion.div>
          </div>

          {/* ── Right: brand sheet ── */}
          <div className="flex items-center justify-center pb-4 lg:pb-0">
            <BrandPanel />
          </div>
        </div>
      </div>

      {/* Discipline ticker — continuous, pauses on hover, still on reduced motion */}
      <div className="relative z-10 w-full border-t border-foreground/15 mt-16 bg-background/70 backdrop-blur-[2px]">
        <div className="marquee py-4" aria-hidden="true">
          <div className="marquee-track">
            {[0, 1].map((copy) => (
              <div key={copy} className="marquee-group">
                {services.map((item) => (
                  <span key={`${copy}-${item}`} className="marquee-item">
                    <span className="text-sm font-semibold text-foreground">
                      {item}
                    </span>
                    <span className="text-primary" aria-hidden="true">
                      ✳
                    </span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
        {/* Same content, available to assistive tech without the animation */}
        <span className="sr-only">
          Diensten: {services.join(', ')}. Paramaribo, Suriname.
        </span>
      </div>
    </header>
  )
}

export { HeroSectionFn as HeroSection }
