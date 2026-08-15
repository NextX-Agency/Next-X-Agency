'use client'

import { useRef } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from 'framer-motion'
import { CONTACT } from '@/lib/contact'
import { startingPrice } from '@/lib/services'

const steps = [
  {
    number: '01',
    title: 'Gesprek',
    timing: 'Dag 1',
    description:
      'We nemen uw bedrijf door: wie uw klanten zijn, wat de site moet opleveren en waar het nu misgaat. Daarna weet u de prijs en de opleverdatum.',
    detail: `Gratis en vrijblijvend — via WhatsApp ${CONTACT.phoneDisplay} of op locatie in ${CONTACT.city}.`,
  },
  {
    number: '02',
    title: 'Ontwerp',
    timing: 'Dag 1–2',
    description:
      'U ziet het ontwerp voordat er één regel code geschreven is. Geen thema uit een winkel — een opzet die om uw merk heen is gebouwd.',
    detail: 'Revisierondes tijdens het ontwerp zitten bij de prijs in.',
  },
  {
    number: '03',
    title: 'Bouw',
    timing: 'Dag 2–3',
    description:
      'Het goedgekeurde ontwerp wordt gebouwd: snel, leesbaar op elke telefoon, en met de technische SEO-basis meteen op orde.',
    detail: 'U kunt gedurende de bouw meekijken op een testlink.',
  },
  {
    number: '04',
    title: 'Live',
    timing: 'Dag 3',
    description:
      'We zetten de site live op uw eigen domein en lopen samen door hoe u zelf tekst en foto’s aanpast. Daarna blijven we bereikbaar.',
    detail: 'Domein, hosting en e-mail worden voor u ingericht.',
  },
] as const

function Step({
  step,
  index,
  progress,
  total,
  reduced,
}: {
  step: (typeof steps)[number]
  index: number
  progress: MotionValue<number>
  total: number
  reduced: boolean | null
}) {
  // Each step lights up as the scrubbed line passes its own dot.
  const point = index / total
  const activeRange: [number, number] = [point - 0.04, point + 0.06]

  const dotScale = useTransform(progress, activeRange, [1, 1.55])
  const dotColor = useTransform(progress, activeRange, [
    'rgba(32, 27, 23, 0.18)',
    '#c45a2b',
  ])
  const bodyOpacity = useTransform(progress, activeRange, [0.45, 1])

  return (
    <div className="relative grid grid-cols-[auto_1fr] gap-x-6 sm:gap-x-9 pb-16 last:pb-0">
      {/* Dot on the spine */}
      <div className="relative flex justify-center w-4 pt-2">
        <motion.span
          className="block w-2.5 h-2.5 rounded-full ring-4 ring-background"
          style={
            reduced
              ? { backgroundColor: '#c45a2b' }
              : { backgroundColor: dotColor, scale: dotScale }
          }
          aria-hidden="true"
        />
      </div>

      <motion.div style={reduced ? undefined : { opacity: bodyOpacity }}>
        <div className="flex items-baseline gap-4 mb-3">
          <span className="meta text-primary">{step.number}</span>
          <h3
            className="text-2xl md:text-[1.75rem] font-bold text-foreground tracking-tight leading-none"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {step.title}
          </h3>
          <span className="ml-auto meta-sm text-muted-foreground shrink-0">
            {step.timing}
          </span>
        </div>

        <p className="text-[15px] text-muted-foreground leading-relaxed max-w-[60ch]">
          {step.description}
        </p>

        <p className="mt-3 flex items-start gap-2.5 text-[13px] text-foreground/70">
          <span
            className="w-3 h-px bg-primary shrink-0 mt-2"
            aria-hidden="true"
          />
          {step.detail}
        </p>
      </motion.div>
    </div>
  )
}

function ProcessSectionFn() {
  const trackRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  // Scrub the spine against this block's travel through the viewport.
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start 72%', 'end 65%'],
  })

  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section
      className="relative py-28 lg:py-40 bg-background overflow-hidden"
      id="process"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-14 lg:gap-20">
          {/* ── Left: sticky editorial header ── */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="register mb-10">
                <span className="meta text-foreground">Werkwijze</span>
                <span className="meta text-muted-foreground">§ 02</span>
              </div>

              <h2
                className="text-4xl md:text-5xl font-bold text-foreground tracking-tight leading-[1.02] mb-6"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Van gesprek tot
                <br />
                live in <span className="text-primary">drie dagen.</span>
              </h2>

              <p className="text-muted-foreground text-[15px] leading-relaxed max-w-sm mb-10">
                Geen offertetraject van drie weken en geen verrassingen halverwege.
                U weet na het eerste gesprek wat het kost en wanneer het af is.
              </p>

              {/* Hard numbers instead of adjectives */}
              <dl className="grid grid-cols-2 gap-x-6 gap-y-7 border-t border-border pt-8 max-w-sm">
                <div>
                  <dt className="meta-sm text-muted-foreground mb-2">
                    Oplevering
                  </dt>
                  <dd className="mono-num text-2xl font-semibold text-foreground tracking-tight">
                    {CONTACT.deliveryHours}
                    <span className="text-base text-muted-foreground ml-1">uur</span>
                  </dd>
                </div>
                <div>
                  <dt className="meta-sm text-muted-foreground mb-2">
                    Reactietijd
                  </dt>
                  <dd className="mono-num text-2xl font-semibold text-foreground tracking-tight">
                    &lt;24<span className="text-base text-muted-foreground ml-1">uur</span>
                  </dd>
                </div>
                <div>
                  <dt className="meta-sm text-muted-foreground mb-2">
                    Vanaf
                  </dt>
                  <dd className="mono-num text-2xl font-semibold text-foreground tracking-tight">
                    {startingPrice}
                  </dd>
                </div>
                <div>
                  <dt className="meta-sm text-muted-foreground mb-2">
                    Templates
                  </dt>
                  <dd className="mono-num text-2xl font-semibold text-foreground tracking-tight">
                    0
                  </dd>
                </div>
              </dl>
            </motion.div>
          </div>

          {/* ── Right: scrubbed timeline ── */}
          <div ref={trackRef} className="relative pt-1">
            {/* Spine track */}
            <div
              className="absolute left-2 top-3 bottom-0 w-px bg-foreground/12"
              aria-hidden="true"
            />
            {/* Spine fill — scrubs with scroll */}
            <motion.div
              className="absolute left-2 top-3 bottom-0 w-px bg-primary origin-top"
              style={{ scaleY: reduced ? 1 : lineScale }}
              aria-hidden="true"
            />

            <ol className="relative">
              {steps.map((step, i) => (
                <li key={step.number}>
                  <Step
                    step={step}
                    index={i}
                    total={steps.length - 1}
                    progress={scrollYProgress}
                    reduced={reduced}
                  />
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}

export { ProcessSectionFn as ProcessSection }
