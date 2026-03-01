import { memo } from 'react'

const steps = [
  {
    number: 1,
    icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2',
    title: 'Intake & Briefing',
    description: 'U stuurt uw materialen en wensen. Wij bevestigen schriftelijk met een duidelijke timeline.',
    staggerClass: '',
  },
  {
    number: 2,
    icon: 'M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4',
    title: 'Design & Development',
    description: 'Wij bouwen en personaliseren uw project. Tussentijdse updates bij grotere projecten.',
    staggerClass: 'lg:mt-12',
  },
  {
    number: 3,
    icon: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z',
    title: 'Review & Revisies',
    description: 'U beoordeelt de eerste versie en geeft feedback. Wij verwerken gratis minor revisions.',
    staggerClass: '',
  },
  {
    number: 4,
    icon: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z',
    title: 'Oplevering',
    description: 'Website live of designs geëxporteerd. U ontvangt alle credentials en instructies.',
    staggerClass: 'lg:mt-12',
  },
  {
    number: 5,
    icon: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9',
    title: 'Post-Launch Support',
    description: '30 dagen gratis minor revisions. Daarna: pay-per-fix of UX Kukru maandpakket.',
    staggerClass: '',
  },
] as const

function ProcessSectionFn() {
  return (
    <section className="py-24 relative overflow-hidden bg-[#fdfdfd] dark:bg-[#0B1120]">
      {/* Grid paper background */}
      <div className="absolute inset-0 bg-grid-paper opacity-60 pointer-events-none" />

      {/* Scribble corners */}
      <svg className="absolute top-0 left-0 w-36 h-36 text-gray-400 opacity-15 pointer-events-none" viewBox="0 0 200 200" aria-hidden="true">
        <path d="M20,20 Q50,10 80,40 T150,50" fill="none" stroke="currentColor" strokeDasharray="5,5" strokeWidth="2" />
        <circle cx="40" cy="60" fill="none" r="10" stroke="currentColor" strokeWidth="1" />
        <path d="M10,80 L60,120" fill="none" stroke="currentColor" strokeWidth="1" />
        <path d="M15,85 L65,125" fill="none" stroke="currentColor" strokeWidth="1" />
      </svg>
      <svg className="absolute bottom-0 right-0 w-36 h-36 text-primary opacity-15 transform rotate-180 pointer-events-none" viewBox="0 0 200 200" aria-hidden="true">
        <path d="M100,100 C150,150 50,150 100,200" fill="none" stroke="currentColor" strokeWidth="3" />
        <rect fill="none" height="40" stroke="currentColor" strokeWidth="1" width="40" x="120" y="120" />
      </svg>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-24 relative">
          <span className="font-mono text-primary text-lg font-bold tracking-widest uppercase relative inline-block -rotate-2">
            Workflow v2.0
            <svg className="absolute w-full h-full -bottom-1 left-0 text-primary opacity-30" preserveAspectRatio="none" viewBox="0 0 100 20" aria-hidden="true">
              <path d="M0 15 Q 50 20 100 15" fill="none" stroke="currentColor" strokeWidth="2" />
            </svg>
          </span>
          <h2 className="mt-4 text-5xl md:text-7xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Living{' '}
            <span className="text-primary relative inline-block">
              Blueprint
              <svg className="absolute w-[110%] h-[120%] -top-[10%] -left-[5%] text-primary opacity-40 pointer-events-none" preserveAspectRatio="none" viewBox="0 0 200 60" aria-hidden="true">
                <ellipse cx="100" cy="30" fill="none" rx="95" ry="25" stroke="currentColor" strokeDasharray="10 5" strokeWidth="2" transform="rotate(-2 100 30)" />
              </svg>
            </span>
          </h2>
          <p className="mt-6 text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            Helder vijf-fasen proces — zodat u precies weet wat u kunt verwachten.
          </p>
        </div>

        {/* Steps */}
        <div className="relative mt-20">
          {/* Neon connector line (desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full transform -translate-y-1/2 z-0 h-40">
            <svg className="w-full h-full overflow-visible pointer-events-none" preserveAspectRatio="none" viewBox="0 0 1200 150" aria-hidden="true">
              <defs>
                <linearGradient id="neonGradient" x1="0%" x2="100%" y1="0%" y2="0%">
                  <stop offset="0%" stopColor="#f97015" stopOpacity="0" />
                  <stop offset="10%" stopColor="#f97015" />
                  <stop offset="90%" stopColor="#f97015" />
                  <stop offset="100%" stopColor="#f97015" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M50,75 C200,150 300,0 450,75 S 700,150 850,75 S 1100,0 1150,75"
                fill="none"
                stroke="#cbd5e1"
                strokeDasharray="4 4"
                strokeWidth="1"
                className="dark:stroke-slate-700"
              />
              <path
                className="neon-path"
                d="M50,75 C200,150 300,0 450,75 S 700,150 850,75 S 1100,0 1150,75"
                fill="none"
                stroke="url(#neonGradient)"
                strokeLinecap="round"
                strokeWidth="3"
              />
            </svg>
          </div>

          {/* Step cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {steps.map((step, index) => (
              <div key={step.number} className={`relative group ${step.staggerClass}`}>
                <div className="bg-white dark:bg-[#0F172A] p-2 rounded-2xl relative z-10 transition-all hover:-translate-y-3 duration-300">
                  <div className="sketched-border p-6 h-full flex flex-col items-center text-center">
                    {/* Icon with number badge */}
                    <div className="w-16 h-16 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center mb-4 border-2 border-dashed border-primary relative group-hover:scale-110 transition-transform">
                      <svg className="w-7 h-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d={step.icon} />
                      </svg>
                      <span className="absolute -right-2 -top-2 w-6 h-6 bg-gray-900 text-white flex items-center justify-center text-xs font-bold font-mono" style={{ borderRadius: '50%' }}>
                        {step.number}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-gray-900 dark:text-white font-mono mb-2">
                      {step.title}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed font-mono">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Mobile connector */}
                {index < steps.length - 1 && (
                  <div className="lg:hidden w-px h-8 bg-primary/30 mx-auto mt-4" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export const ProcessSection = memo(ProcessSectionFn)