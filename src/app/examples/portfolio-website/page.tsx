'use client'

import { useState } from 'react'
import DemoImage from '../_components/DemoImage'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ExternalLink, Mail } from 'lucide-react'
import { CONTACT, MAIL_HREF } from '@/lib/contact'

/* ─── SVG Logo ─── */
function StudioVibeLogo({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect width="48" height="48" rx="12" fill="#0f172a" />
      <path d="M13 35L24 13" stroke="#f97015" strokeWidth="4" strokeLinecap="round" />
      <path d="M24 13L35 35" stroke="white" strokeWidth="4" strokeLinecap="round" />
      <circle cx="13" cy="35" r="3" fill="#f97015" />
      <circle cx="35" cy="35" r="3" fill="white" />
    </svg>
  )
}

type Project = {
  id: number; title: string; category: string; year: string; img: string; desc: string
}

const projects: Project[] = [
  { id: 1, title: 'Tropica Branding', category: 'Branding', year: '2024', img: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=500&fit=crop&q=80', desc: 'Complete merkidentiteit voor tropisch foodmerk, inclusief logo, verpakking en social media.' },
  { id: 2, title: 'Fintech Dashboard', category: 'Web', year: '2024', img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop&q=80', desc: 'Responsive webapplicatie voor fintech startup met real-time data visualisatie.' },
  { id: 3, title: 'Savana Packaging', category: 'Print', year: '2024', img: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=600&h=500&fit=crop&q=80', desc: 'Premium verpakkingsontwerp voor koffiemerk met folie-accenten en eco-materialen.' },
  { id: 4, title: 'Bloom Feed Design', category: 'Social', year: '2025', img: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&h=600&fit=crop&q=80', desc: 'Instagram feed design en content strategie voor modeboutique keten.' },
  { id: 5, title: 'Urban Eats Menu', category: 'Print', year: '2024', img: 'https://images.unsplash.com/photo-1586953208270-767889db122f?w=600&h=400&fit=crop&q=80', desc: 'Menu ontwerp voor urban restaurant concept met typografische illustraties.' },
  { id: 6, title: 'TechMart Webshop', category: 'Web', year: '2025', img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop&q=80', desc: 'E-commerce platform met 500+ producten, dynamic filters en checkout flow.' },
  { id: 7, title: 'Natura Cosmetica', category: 'Branding', year: '2023', img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=500&fit=crop&q=80', desc: 'Minimalistische merkidentiteit voor lokaal cosmeticamerk met focus op duurzaamheid.' },
  { id: 8, title: 'Gym Pulse Campaign', category: 'Social', year: '2025', img: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&h=600&fit=crop&q=80', desc: 'Social media campagne met video-content en motion graphics voor fitnessketen.' },
  { id: 9, title: 'Horizons Magazine', category: 'Print', year: '2023', img: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&h=400&fit=crop&q=80', desc: 'Kwartaal lifestyle magazine layout, 48 pagina\'s met editorial fotografie.' },
]

const categories = ['Alle', 'Branding', 'Web', 'Print', 'Social']

export default function StudioVibePage() {
  const [filter, setFilter] = useState('Alle')
  const [selected, setSelected] = useState<Project | null>(null)

  const filtered = filter === 'Alle' ? projects : projects.filter(p => p.category === filter)

  // Designstudio: redactionele schreefletter. Zet de kopletter voor deze
  // hele demo, zodat elk voorbeeld een eigen gezicht heeft in plaats van dat
  // van NextX.
  return (
    <div
      style={{ '--font-heading': 'var(--font-demo-editorial)' } as React.CSSProperties}
      className="min-h-screen bg-white"
    >
      {/* ═══ HERO ═══ */}
      <section className="relative bg-slate-900 py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        </div>
        <div className="relative max-w-6xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="flex items-center gap-3 mb-8">
              <StudioVibeLogo size={44} />
              <span className="text-2xl font-bold text-white" style={{ fontFamily: 'var(--font-heading)' }}>Studio Vibe</span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[0.95] max-w-3xl mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
              Ontwerp voor <span className="text-[#f97015]">Surinaamse</span> merken
            </h1>
            <p className="text-lg text-slate-400 max-w-lg mb-8 leading-relaxed">
              Designstudio in Paramaribo voor branding, websites, drukwerk en social media. Bekijk het werk hieronder en filter op wat u zoekt.
            </p>
            <div className="flex items-center gap-6">
              <a href="#portfolio" className="px-6 py-3 bg-[#f97015] text-white font-bold rounded-none hover:bg-orange-600 transition-colors" style={{ fontFamily: 'var(--font-heading)' }}>
                Bekijk portfolio
              </a>
              <div className="flex items-center gap-4">
                <DemoImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=96&h=96&fit=crop&q=80" alt="Creative Director" width={40} height={40} className="w-10 h-10 rounded-full object-cover border-2 border-[#f97015]" />
                <div>
                  <p className="text-sm font-bold text-white">Ava de Groot</p>
                  <p className="text-xs text-slate-500">Creative Director</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ PORTFOLIO ═══ */}
      <section className="py-20 lg:py-28" id="portfolio">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
            <div>
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#f97015] mb-3 block">Portfolio</span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>Geselecteerd werk</h2>
            </div>
            {/* Filter tabs */}
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button key={cat} onClick={() => setFilter(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${filter === cat ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Grid */}
          <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((p) => (
                <motion.div
                  key={p.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="group relative rounded-none overflow-hidden cursor-pointer aspect-[4/3]"
                  onClick={() => setSelected(p)}
                >
                  <DemoImage src={p.img} alt={p.title} width={800} height={600} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#f97015]">{p.category} · {p.year}</span>
                    <h3 className="text-lg font-bold text-white mt-1" style={{ fontFamily: 'var(--font-heading)' }}>{p.title}</h3>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* ═══ LIGHTBOX ═══ */}
      <AnimatePresence>
        {selected && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelected(null)}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-none max-w-3xl w-full max-h-[90vh] overflow-auto border border-black/10" onClick={e => e.stopPropagation()}>
              <div className="relative">
                <DemoImage src={selected.img} alt={selected.title} width={1200} height={675} className="w-full aspect-video object-cover rounded-t-2xl" />
                <button onClick={() => setSelected(null)} className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 flex items-center justify-center hover:bg-white transition-colors" aria-label="Sluiten">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-3 py-1 bg-[#f97015]/10 text-[#f97015] text-xs font-bold rounded-full">{selected.category}</span>
                  <span className="text-sm text-slate-400">{selected.year}</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3" style={{ fontFamily: 'var(--font-heading)' }}>{selected.title}</h3>
                <p className="text-slate-600 leading-relaxed mb-6">{selected.desc}</p>
                <a href="#contact" onClick={() => setSelected(null)} className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white font-bold rounded-none text-sm hover:bg-slate-800 transition-colors">
                  <ExternalLink className="w-4 h-4" /> Soortgelijk project starten
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══ ABOUT ═══ */}
      <section className="py-20 bg-slate-50" id="about">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#f97015] mb-3 block">Over ons</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-5" style={{ fontFamily: 'var(--font-heading)' }}>
              Vier mensen, <span className="text-[#f97015]">één studio</span>
            </h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              Studio Vibe is een studio van vier designers en developers. Eén aanspreekpunt per project, en de mensen die het ontwerpen bouwen het ook.
            </p>
            <div className="grid grid-cols-3 gap-4">
              {[{ num: '60+', label: 'Projecten' }, { num: '4', label: 'Jaar actief' }, { num: '35+', label: 'Klanten' }].map(s => (
                <div key={s.label} className="bg-white rounded-none p-4 text-center border border-slate-200">
                  <p className="text-2xl font-bold text-slate-900" style={{ fontFamily: 'var(--font-heading)' }}>{s.num}</p>
                  <p className="text-xs text-slate-500 mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <DemoImage src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop&q=80" alt="Studio team aan het werk" width={800} height={600} className="rounded-none border border-black/10 w-full object-cover aspect-[4/3]" />
          </motion.div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="py-20 bg-slate-900" id="contact">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
            Laten we samen iets <span className="text-[#f97015]">moois</span> maken
          </h2>
          <p className="text-slate-400 mb-8 leading-relaxed">Stuur wat u in gedachten heeft, dan komt er een voorstel met prijs en planning terug.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href={MAIL_HREF} className="inline-flex items-center gap-2 px-6 py-3 bg-[#f97015] text-white font-bold rounded-none hover:bg-orange-600 transition-colors" style={{ fontFamily: 'var(--font-heading)' }}>
              <Mail className="w-4 h-4" /> {CONTACT.email}
            </a>
            <a href="/contact" className="inline-flex items-center gap-2 px-6 py-3 border-2 border-white/20 text-white font-bold rounded-none hover:bg-white/10 transition-colors" style={{ fontFamily: 'var(--font-heading)' }}>
              Bespreek uw project
            </a>
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="bg-slate-950 py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <StudioVibeLogo size={24} />
            <span className="text-sm font-bold text-white">Studio Vibe</span>
          </div>
          <p className="text-sm text-slate-500">© {new Date().getFullYear()} Studio Vibe. Paramaribo, Suriname.</p>
        </div>
      </footer>

    </div>
  )
}

