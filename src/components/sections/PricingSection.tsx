import { memo } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

const plans = [
  {
    name: 'Starter Support',
    description: 'Foundational Structure',
    price: '$90',
    period: '/maand',
    tagline: 'Perfect voor kleine updates en onderhoud.',
    features: [
      '10 uur per maand',
      'Kleine updates & bug fixes',
      'Content wijzigingen',
      'Technisch advies',
      'Email support (48u response)',
    ],
    highlighted: false,
    cta: 'Initiate',
  },
  {
    name: 'Business Support',
    description: 'Full Scale Development',
    price: '$160',
    period: '/maand',
    tagline: 'Ideaal voor groeiende bedrijven met actieve websites.',
    features: [
      '20 uur per maand',
      'Feature development',
      'Design updates & integraties',
      'Strategisch advies',
      'Slack support (24u response)',
      'Analytics dashboard',
    ],
    highlighted: true,
    badge: 'MEEST GEKOZEN',
    cta: 'Start Construction',
  },
  {
    name: 'Partner Support',
    description: 'Enterprise Solution',
    price: '$260',
    period: '/maand',
    tagline: 'Voor bedrijven die een dedicated digitale partner willen.',
    features: [
      '40 uur per maand',
      'Dedicated specialist',
      'Priority support',
      'Complexe projecten',
      'Team collaboration',
      'Direct contact (12u response)',
    ],
    highlighted: false,
    cta: 'Contact HQ',
  },
] as const

function PricingSectionFn() {
  return (
    <section className="py-24 relative bg-white dark:bg-[#0B1120] border-t border-gray-200 dark:border-gray-800">
      {/* Grid paper background */}
      <div className="absolute inset-0 bg-grid-paper opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center space-x-2 mb-4">
              <span className="w-2 h-2 bg-primary animate-pulse" style={{ borderRadius: 0 }} />
              <span className="text-primary font-mono text-sm uppercase tracking-widest">Pricing Matrix</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white">
              Structurele{' '}
              <span className="text-primary relative">
                Ondersteuning
                <svg className="absolute -bottom-2 left-0 w-full h-3 text-gray-400 dark:text-gray-600 opacity-50" preserveAspectRatio="none" viewBox="0 0 100 5" aria-hidden="true">
                  <path d="M0 2.5 L100 2.5" stroke="currentColor" strokeDasharray="2 2" strokeWidth="1" />
                </svg>
              </span>
            </h2>
            <p className="mt-4 text-lg text-gray-500 dark:text-gray-400 font-mono">
              Transparante tarieven zonder verborgen kosten — via UX Kukru.
            </p>
          </div>
          {/* Blueprint decoration */}
          <div className="hidden md:block w-28 h-28 opacity-40">
            <svg className="w-full h-full text-gray-300 dark:text-gray-600" viewBox="0 0 100 100" aria-hidden="true">
              <rect fill="none" height="60" stroke="currentColor" strokeWidth="1" width="80" x="10" y="10" />
              <line stroke="currentColor" strokeWidth="1" x1="10" x2="90" y1="25" y2="25" />
              <circle cx="20" cy="18" fill="currentColor" r="2" />
              <circle cx="28" cy="18" fill="currentColor" r="2" />
              <rect fill="none" height="25" stroke="currentColor" strokeDasharray="2 2" strokeWidth="1" width="25" x="20" y="35" />
              <rect fill="none" height="25" stroke="currentColor" strokeDasharray="2 2" strokeWidth="1" width="25" x="55" y="35" />
            </svg>
          </div>
        </div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start relative">
          {/* Elevation label (left, desktop) */}
          <div className="absolute -left-12 top-20 h-3/4 border-l border-dashed border-gray-300 dark:border-gray-700 hidden xl:block pointer-events-none">
            <span className="absolute top-1/4 -left-3 text-xs font-mono text-gray-400 -rotate-90">ELEVATION A</span>
          </div>

          {plans.map((plan) => (
            <div
              key={plan.name}
              className={cn(
                'relative group h-full',
                plan.highlighted && 'z-10 lg:-mt-4 lg:mb-4'
              )}
            >
              {/* "Best Build!" annotation — highlighted only, desktop */}
              {plan.highlighted && (
                <div className="absolute -top-12 -right-12 w-28 h-28 pointer-events-none hidden lg:block z-20" aria-hidden="true">
                  <span
                    className="text-primary font-bold text-lg block rotate-12 ml-4"
                    style={{ fontFamily: "'Architects Daughter', cursive" }}
                  >
                    Best Build!
                  </span>
                  <svg className="w-full h-full text-primary" viewBox="0 0 100 100">
                    <path d="M60,20 Q80,50 40,70" fill="none" markerEnd="url(#arrowhead-pricing)" stroke="currentColor" strokeWidth="2" />
                    <defs>
                      <marker id="arrowhead-pricing" markerHeight="7" markerWidth="10" orient="auto" refX="9" refY="3.5">
                        <polygon fill="#f97015" points="0 0, 10 3.5, 0 7" />
                      </marker>
                    </defs>
                  </svg>
                </div>
              )}

              <div
                className={cn(
                  'sketched-border p-8 h-full flex flex-col relative transition-transform duration-300',
                  plan.highlighted
                    ? 'sketched-border-primary shadow-2xl bg-white dark:bg-[#151e32]'
                    : 'hover:scale-[1.02]'
                )}
              >
                {/* Badge — highlighted only */}
                {plan.highlighted && 'badge' in plan && (
                  <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2 z-10">
                    <div className="bg-primary text-white text-xs font-bold px-3 py-1 uppercase tracking-wider transform rotate-3 font-mono border border-white/30 shadow-sm">
                      {plan.badge}
                    </div>
                  </div>
                )}

                {/* Background icon decoration */}
                <div className="absolute top-0 right-0 p-4 opacity-[0.06]">
                  <svg className="w-16 h-16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M3 3h7v7H3V3zm11 0h7v7h-7V3zM3 14h7v7H3v-7zm11 0h7v7h-7v-7z" />
                  </svg>
                </div>

                {/* Name & description */}
                <div className="mb-6 pb-6 border-b-2 border-dashed border-gray-200 dark:border-gray-700">
                  <h3 className={cn('text-2xl font-bold', plan.highlighted ? 'text-primary' : 'text-gray-900 dark:text-white')}>
                    {plan.name}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mt-1 font-mono">{plan.description}</p>
                </div>

                {/* Price */}
                <div className="mb-8 flex items-baseline">
                  <span className={cn('text-5xl font-extrabold', plan.highlighted ? 'text-primary' : 'text-gray-900 dark:text-white')}>
                    {plan.price}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400 ml-2 text-base">{plan.period}</span>
                </div>

                {/* Features */}
                <ul className="space-y-4 flex-1 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <svg className="w-4 h-4 text-primary mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-600 dark:text-gray-300 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link
                  href="/contact"
                  className={cn(
                    'w-full block text-center py-3 font-bold font-mono text-sm uppercase tracking-wider transition-all relative overflow-hidden',
                    plan.highlighted
                      ? 'bg-primary text-white hover:bg-primary/90 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]'
                      : 'border-2 border-gray-800 dark:border-gray-200 text-gray-800 dark:text-gray-200 hover:bg-gray-800 hover:text-white dark:hover:bg-gray-200 dark:hover:text-black'
                  )}
                >
                  {plan.cta}
                </Link>

                {/* Footnote annotation (non-highlighted, desktop) */}
                {!plan.highlighted && (
                  <div className="absolute -bottom-6 -left-4 text-xs text-gray-400 transform -rotate-6 hidden md:block select-none" style={{ fontFamily: "'Architects Daughter', cursive" }}>
                    *Ref: {plan.description}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Extra info */}
        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-12 font-mono">
          Extra uren: <strong className="text-gray-900 dark:text-white">$12/uur</strong> &nbsp;|&nbsp; Minimaal{' '}
          <strong className="text-gray-900 dark:text-white">3 maanden</strong> commitment vereist.
        </p>
      </div>
    </section>
  )
}

export const PricingSection = memo(PricingSectionFn)

