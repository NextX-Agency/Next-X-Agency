'use client'

import { useState, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import { BarChart3, ArrowRight, Smartphone, Monitor, Users, Clock, MousePointerClick, TrendingUp, CheckCircle2, XCircle, Lightbulb, Download, ChevronRight } from 'lucide-react'
import { toast } from 'sonner'
import DemoFeatures from '../_components/DemoFeatures'

/* ─── Logo ─── */
function ShopPlazaLogo({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect width="48" height="48" rx="12" fill="#7c3aed" />
      <rect x="10" y="16" width="12" height="18" rx="2" fill="white" opacity="0.4" />
      <rect x="26" y="10" width="12" height="24" rx="2" fill="white" opacity="0.7" />
      <path d="M14 28h4M30 18h4M30 22h4M30 26h4" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

/* ─── Before/After Slider ─── */
function CompareSlider({ before, after }: { before: string; after: string }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState(50)
  const [isDragging, setIsDragging] = useState(false)

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width))
    setPos((x / rect.width) * 100)
  }, [])

  const onMouseDown = () => setIsDragging(true)
  const onMouseUp = () => setIsDragging(false)
  const onMouseMove = (e: React.MouseEvent) => { if (isDragging) handleMove(e.clientX) }
  const onTouchMove = (e: React.TouchEvent) => handleMove(e.touches[0].clientX)

  return (
    <div ref={containerRef} className="relative rounded-2xl overflow-hidden aspect-[16/10] cursor-col-resize select-none border border-violet-200"
      onMouseMove={onMouseMove} onMouseUp={onMouseUp} onMouseLeave={onMouseUp} onTouchMove={onTouchMove}>
      {/* After (full) */}
      <img src={after} alt="Na redesign" className="absolute inset-0 w-full h-full object-cover" />
      {/* Before (clipped) */}
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${pos}%` }}>
        <img src={before} alt="Voor redesign" className="absolute inset-0 w-full h-full object-cover" style={{ minWidth: containerRef.current ? `${containerRef.current.offsetWidth}px` : '100%' }} />
      </div>
      {/* Divider */}
      <div className="absolute top-0 bottom-0" style={{ left: `${pos}%`, transform: 'translateX(-50%)' }}>
        <div className="w-0.5 h-full bg-white shadow-lg" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center cursor-grab active:cursor-grabbing"
          onMouseDown={onMouseDown} onTouchStart={onMouseDown}>
          <ArrowRight className="w-4 h-4 text-violet-600 rotate-180" /><ArrowRight className="w-4 h-4 text-violet-600" />
        </div>
      </div>
      {/* Labels */}
      <span className="absolute top-3 left-3 px-2.5 py-1 bg-red-500/90 text-white text-xs font-bold rounded-full">Voor</span>
      <span className="absolute top-3 right-3 px-2.5 py-1 bg-green-500/90 text-white text-xs font-bold rounded-full">Na</span>
    </div>
  )
}

/* ─── Animated Number ─── */
function AnimNum({ value, suffix = '' }: { value: number; suffix?: string }) {
  return (
    <motion.span initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
      {value}{suffix}
    </motion.span>
  )
}

const metrics = [
  { label: 'Conversie stijging', value: 47, suffix: '%', icon: TrendingUp, color: 'text-green-500' },
  { label: 'Bounce rate daling', value: 32, suffix: '%', icon: MousePointerClick, color: 'text-blue-500' },
  { label: 'Sessieduur', value: 2.8, suffix: 'min', icon: Clock, color: 'text-violet-500' },
  { label: 'Mobiel verkeer', value: 68, suffix: '%', icon: Smartphone, color: 'text-pink-500' },
]

const findings = [
  { type: 'problem', title: 'Geen mobiele navigatie', desc: 'Hamburger menu ontbrak, nav items verdwenen op mobiel.' },
  { type: 'problem', title: 'CTA onzichtbaar', desc: 'Primary button had zelfde kleur als achtergrond, contrast ratio 1.8:1.' },
  { type: 'problem', title: 'Checkout 7 stappen', desc: 'Onnodig complexe checkout flow met 4 extra formuliervelden.' },
  { type: 'problem', title: 'Geen zoekfunctie', desc: 'Bij 200+ producten geen manier om snel te filteren of zoeken.' },
  { type: 'solution', title: 'Responsive mobile-first', desc: 'Volledig responsive nav met sticky header en bottom bar op mobiel.' },
  { type: 'solution', title: 'Duidelijke visuele hiërarchie', desc: 'High-contrast CTA buttons, witruimte, en consistent kleurgebruik.' },
  { type: 'solution', title: '3-stap checkout', desc: 'Gestroomlijnd naar Info → Betaling → Bevestiging met progress bar.' },
  { type: 'solution', title: 'Smart search + filters', desc: 'Autocomplete zoekbalk met real-time filteren op categorie en prijs.' },
]

export default function UxUiDesignPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* ═══ HERO ═══ */}
      <section className="relative bg-gradient-to-br from-violet-600 via-violet-700 to-purple-800 py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        </div>
        <div className="relative max-w-5xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-3 mb-6">
              <ShopPlazaLogo size={44} />
              <div>
                <span className="text-xs font-bold tracking-wider uppercase text-violet-200">UX Case Study</span>
                <h2 className="text-lg font-bold text-white" style={{ fontFamily: 'var(--font-heading)' }}>ShopPlaza</h2>
              </div>
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[0.95] max-w-3xl mb-5" style={{ fontFamily: 'var(--font-heading)' }}>
              Van <span className="text-violet-200 line-through decoration-2">frustratie</span> naar <span className="text-yellow-300">conversie</span>
            </h1>
            <p className="text-violet-100 max-w-lg leading-relaxed mb-8">
              Complete UX/UI redesign van e-commerce platform. Gebruikersonderzoek, wireframes, prototyping en implementatie die resulteerden in 47% meer conversies.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {metrics.map(m => (
                <div key={m.label} className="bg-white/10 backdrop-blur rounded-xl p-4 border border-white/10">
                  <m.icon className={`w-5 h-5 ${m.color} mb-2`} />
                  <p className="text-2xl font-black text-white" style={{ fontFamily: 'var(--font-heading)' }}>
                    <AnimNum value={m.value} suffix={m.suffix} />
                  </p>
                  <p className="text-xs text-violet-200 mt-0.5">{m.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ BEFORE/AFTER ═══ */}
      <section className="py-16 lg:py-24" id="compare">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-10">
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-violet-600 mb-3 block">Voor & Na</span>
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight mb-3" style={{ fontFamily: 'var(--font-heading)' }}>Visueel verschil</h2>
            <p className="text-slate-500 max-w-lg mx-auto">Sleep de slider om het verschil te zien tussen het oude en nieuwe design.</p>
          </div>

          {/* Desktop comparison */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-3"><Monitor className="w-4 h-4 text-violet-500" /><span className="text-sm font-bold text-slate-700">Desktop versie</span></div>
            <CompareSlider
              before="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1000&h=625&fit=crop&q=80&sat=-100"
              after="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1000&h=625&fit=crop&q=80"
            />
          </div>

          {/* Mobile comparison */}
          <div>
            <div className="flex items-center gap-2 mb-3"><Smartphone className="w-4 h-4 text-violet-500" /><span className="text-sm font-bold text-slate-700">Mobiele versie</span></div>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl overflow-hidden border-2 border-red-200 relative">
                <img src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=700&fit=crop&q=80&sat=-100" alt="Mobile voor" className="w-full aspect-[9/16] object-cover opacity-80" />
                <span className="absolute top-3 left-3 px-2.5 py-1 bg-red-500/90 text-white text-[10px] font-bold rounded-full">Voor</span>
              </div>
              <div className="rounded-2xl overflow-hidden border-2 border-green-200 relative">
                <img src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=700&fit=crop&q=80" alt="Mobile na" className="w-full aspect-[9/16] object-cover" />
                <span className="absolute top-3 left-3 px-2.5 py-1 bg-green-500/90 text-white text-[10px] font-bold rounded-full">Na</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ ONDERZOEK ═══ */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-10">
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-violet-600 mb-3 block">Onderzoek</span>
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight mb-3" style={{ fontFamily: 'var(--font-heading)' }}>Bevindingen & Oplossingen</h2>
            <p className="text-slate-500 max-w-lg mx-auto">Gebruikerstests met 15 deelnemers onthulden kritieke UX-problemen.</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {findings.map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                className={`flex gap-3 p-4 rounded-xl border ${f.type === 'problem' ? 'bg-red-50 border-red-100' : 'bg-green-50 border-green-100'}`}>
                {f.type === 'problem' ? <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" /> : <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />}
                <div>
                  <h4 className="font-bold text-sm text-slate-900">{f.title}</h4>
                  <p className="text-xs text-slate-600 mt-0.5">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PROCESS ═══ */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-10">
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-violet-600 mb-3 block">Proces</span>
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>Design workflow</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { step: '01', title: 'Discovery', desc: 'Stakeholder interviews, analytics audit, 15 usability tests', icon: Users },
              { step: '02', title: 'Wireframes', desc: 'Low-fidelity wireframes, user flows, information architecture', icon: BarChart3 },
              { step: '03', title: 'UI Design', desc: 'High-fidelity mockups, design system, component library', icon: Lightbulb },
              { step: '04', title: 'Handoff', desc: 'Figma specs, responsive assets, developer documentation', icon: ChevronRight },
            ].map(s => (
              <motion.div key={s.step} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="bg-white rounded-2xl p-5 border border-slate-200 hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center mb-3">
                  <s.icon className="w-5 h-5 text-violet-600" />
                </div>
                <span className="text-xs font-bold text-violet-400">{s.step}</span>
                <h3 className="font-bold text-slate-900 mt-0.5 mb-1" style={{ fontFamily: 'var(--font-heading)' }}>{s.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="bg-violet-700 py-16">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white tracking-tight mb-4" style={{ fontFamily: 'var(--font-heading)' }}>Uw platform verdient beter UX</h2>
          <p className="text-violet-200 mb-6 leading-relaxed">Laat ons uw product analyseren en een data-driven redesign voorstellen die resultaat oplevert.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <button onClick={() => toast.success('UX Audit rapport wordt gegenereerd...', { description: 'U ontvangt het volledige rapport per e-mail.' })}
              className="px-6 py-3 bg-white text-violet-700 font-bold rounded-xl hover:bg-violet-50 transition-colors text-sm" style={{ fontFamily: 'var(--font-heading)' }}>
              <Download className="w-4 h-4 inline mr-2" /> Download UX Rapport
            </button>
            <a href="#" className="px-6 py-3 border-2 border-white/30 text-white font-bold rounded-xl hover:bg-white/10 transition-colors text-sm" style={{ fontFamily: 'var(--font-heading)' }}>
              Gratis UX Audit aanvragen
            </a>
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="bg-slate-900 py-8">
        <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2"><ShopPlazaLogo size={24} /><span className="text-sm font-bold text-white">ShopPlaza — UX Case Study</span></div>
          <p className="text-sm text-slate-500">Ontworpen door Next‑X Agency · 2025</p>
        </div>
      </footer>

      <DemoFeatures features={['Voor/na slider (useRef + mousemove/touchmove)', 'Geanimeerde metrics tellers', 'Bevindingen (4 problemen + 4 oplossingen)', 'Design procesvisualisatie (4 stappen)', 'Desktop & mobiel vergelijking', 'Download UX Rapport knop + toast']} />
    </div>
  )
}
