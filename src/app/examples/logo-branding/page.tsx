'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Palette, Type, Download, Copy, Check, Eye, Layers, Droplets, Sparkles } from 'lucide-react'
import { toast } from 'sonner'
import DemoFeatures from '../_components/DemoFeatures'

/* ─── Animated SVG Logo ─── */
function SavanaLogoFull() {
  return (
    <svg viewBox="0 0 320 80" className="w-full max-w-xs" fill="none">
      <motion.path
        d="M40 65C40 65 15 55 15 38C15 21 28 12 40 12C52 12 65 21 65 38C65 55 40 65 40 65Z"
        stroke="#92400e" strokeWidth="2.5" fill="none"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, ease: 'easeInOut' }}
      />
      <motion.ellipse cx="40" cy="38" rx="9" ry="12" stroke="#92400e" strokeWidth="2" fill="none"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, delay: 0.5 }}
      />
      <motion.path d="M40 26V10" stroke="#92400e" strokeWidth="2" strokeLinecap="round"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6, delay: 1.5 }}
      />
      <motion.text x="85" y="50" style={{ fontFamily: 'var(--font-heading)', fontSize: '32px', fontWeight: 800 }} fill="#1c1917"
        initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 1 }}>
        SAVANA
      </motion.text>
      <motion.text x="85" y="68" style={{ fontFamily: 'var(--font-heading)', fontSize: '11px', fontWeight: 600, letterSpacing: '0.3em' }} fill="#92400e"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 1.5 }}>
        SPECIALTY COFFEE
      </motion.text>
    </svg>
  )
}

function SavanaIconSmall({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="24" r="22" fill="#fef3c7" />
      <path d="M24 40C24 40 10 33 10 22C10 11 18 5 24 5C30 5 38 11 38 22C38 33 24 40 24 40Z" fill="#92400e" />
      <ellipse cx="24" cy="22" rx="5" ry="7" fill="#fef3c7" />
    </svg>
  )
}

const colors = [
  { name: 'Espresso Brown', hex: '#92400e', desc: 'Primaire merkkleur' },
  { name: 'Cream', hex: '#fef3c7', desc: 'Achtergrond / licht accent' },
  { name: 'Dark Roast', hex: '#1c1917', desc: 'Tekst en koppen' },
  { name: 'Warm Sand', hex: '#d6c5a0', desc: 'Secundaire tint' },
  { name: 'Golden Crema', hex: '#f59e0b', desc: 'CTA en accenten' },
  { name: 'Sage Green', hex: '#6b7c5e', desc: 'Eco/duurzaamheid' },
]

const tabs = [
  { id: 'logo', label: 'Logo', icon: Sparkles },
  { id: 'kleuren', label: 'Kleuren', icon: Droplets },
  { id: 'typografie', label: 'Typografie', icon: Type },
  { id: 'toepassingen', label: 'Toepassingen', icon: Layers },
]

const applications = [
  { title: 'Koffiezak', img: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=500&h=350&fit=crop&q=80', desc: 'Premium verpakking met folie-logo, kraft papier, en resealable zip.' },
  { title: 'Koffiebeker', img: 'https://images.unsplash.com/photo-1497515114889-1c154be05ed3?w=500&h=350&fit=crop&q=80', desc: 'Dubbelwandige beker met subtiele tone-on-tone branding.' },
  { title: 'Visitekaartje', img: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=500&h=350&fit=crop&q=80', desc: 'Letterpress op katoenpapier, 600gsm met blind emboss logo.' },
  { title: 'Website', img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=350&fit=crop&q=80', desc: 'Responsive webshop met warm kleurenpalet en storytelling.' },
  { title: 'Social Media', img: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=500&h=350&fit=crop&q=80', desc: 'Instagram templates met consistente grid layouts en story designs.' },
  { title: 'Uithangbord', img: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=500&h=350&fit=crop&q=80', desc: 'Zwart staal met LED-verlicht logo, retro industriële stijl.' },
]

export default function SavanaCoffeePage() {
  const [activeTab, setActiveTab] = useState('logo')
  const [copiedHex, setCopiedHex] = useState<string | null>(null)

  const copyHex = (hex: string) => {
    navigator.clipboard.writeText(hex).then(() => {
      setCopiedHex(hex)
      toast.success(`${hex} gekopieerd!`, { description: 'Kleurcode staat op uw klembord.' })
      setTimeout(() => setCopiedHex(null), 2000)
    })
  }

  return (
    <div className="min-h-screen bg-[#fef9ef]">
      {/* ═══ HERO ═══ */}
      <section className="relative py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23000000\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />
        <div className="relative max-w-5xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
            <span className="text-xs font-bold tracking-[0.25em] uppercase text-amber-700 mb-6 block">Branding Case Study</span>
            <div className="flex justify-center mb-6">
              <SavanaLogoFull />
            </div>
            <p className="text-stone-600 max-w-lg mx-auto leading-relaxed mb-2">
              Complete merkidentiteit voor specialty koffiemerk in Paramaribo. Van logo ontwerp tot verpakking, signage en digitale aanwezigheid.
            </p>
            <div className="flex flex-wrap justify-center gap-3 mt-6 text-xs text-stone-500">
              {['Logo Design', 'Kleurenpalet', 'Typografie', 'Verpakking', 'Stationery', 'Social Media'].map(t => (
                <span key={t} className="px-3 py-1.5 bg-white rounded-full border border-stone-200">{t}</span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ TAB NAVIGATION ═══ */}
      <section className="sticky top-10 z-20 bg-white/80 backdrop-blur border-y border-stone-200">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex gap-1 overflow-x-auto py-2">
            {tabs.map(t => (
              <button key={t.id} onClick={() => setActiveTab(t.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${activeTab === t.id ? 'bg-amber-800 text-white' : 'text-stone-600 hover:bg-stone-100'}`}>
                <t.icon className="w-4 h-4" /> {t.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CONTENT ═══ */}
      <div className="max-w-5xl mx-auto px-6 py-12 lg:py-16">
        {/* LOGO TAB */}
        {activeTab === 'logo' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-12">
            <div>
              <h2 className="text-2xl font-bold text-stone-900 mb-3" style={{ fontFamily: 'var(--font-heading)' }}>Logo Design</h2>
              <p className="text-stone-600 max-w-2xl leading-relaxed">Het Savana logo combineert een gestileerde koffieboon met een bladvorm — symbool voor single-origin koffie en duurzame teelt. De minimalistische lijnvoering geeft een premium, ambachtelijk gevoel.</p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-8 flex items-center justify-center border border-stone-200 aspect-square">
                <SavanaLogoFull />
              </div>
              <div className="bg-stone-900 rounded-2xl p-8 flex items-center justify-center aspect-square">
                <svg viewBox="0 0 320 80" className="w-full max-w-xs" fill="none">
                  <path d="M40 65C40 65 15 55 15 38C15 21 28 12 40 12C52 12 65 21 65 38C65 55 40 65 40 65Z" stroke="#fef3c7" strokeWidth="2.5" />
                  <ellipse cx="40" cy="38" rx="9" ry="12" stroke="#fef3c7" strokeWidth="2" />
                  <path d="M40 26V10" stroke="#fef3c7" strokeWidth="2" strokeLinecap="round" />
                  <text x="85" y="50" style={{ fontFamily: 'var(--font-heading)', fontSize: '32px', fontWeight: 800 }} fill="white">SAVANA</text>
                  <text x="85" y="68" style={{ fontFamily: 'var(--font-heading)', fontSize: '11px', fontWeight: 600, letterSpacing: '0.3em' }} fill="#fef3c7">SPECIALTY COFFEE</text>
                </svg>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-stone-900 mb-4" style={{ fontFamily: 'var(--font-heading)' }}>Logo variaties</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { bg: 'bg-white', label: 'Primair' },
                  { bg: 'bg-stone-900', label: 'Omgekeerd' },
                  { bg: 'bg-amber-800', label: 'Mono' },
                  { bg: 'bg-[#fef3c7]', label: 'Op crème' },
                ].map(v => (
                  <div key={v.label} className={`${v.bg} rounded-xl p-6 flex flex-col items-center justify-center border border-stone-200 aspect-square`}>
                    <SavanaIconSmall size={48} />
                    <span className={`text-xs mt-3 font-medium ${v.bg.includes('900') || v.bg.includes('800') ? 'text-white/70' : 'text-stone-500'}`}>{v.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* KLEUREN TAB */}
        {activeTab === 'kleuren' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-stone-900 mb-3" style={{ fontFamily: 'var(--font-heading)' }}>Kleurenpalet</h2>
              <p className="text-stone-600 max-w-2xl leading-relaxed">Warm, aards en uitnodigend. Het palet is geïnspireerd op de kleuren van vers gebrande koffie, van donkere boon tot gouden crema. Klik op een kleur om de hex-code te kopiëren.</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {colors.map(c => (
                <button key={c.hex} onClick={() => copyHex(c.hex)}
                  className="group bg-white rounded-2xl border border-stone-200 overflow-hidden text-left hover:shadow-lg transition-shadow">
                  <div className="h-28" style={{ backgroundColor: c.hex }} />
                  <div className="p-4 flex items-start justify-between">
                    <div>
                      <p className="font-bold text-stone-900 text-sm">{c.name}</p>
                      <p className="text-xs text-stone-500 mt-0.5">{c.desc}</p>
                      <p className="text-xs font-mono text-stone-400 mt-1">{c.hex}</p>
                    </div>
                    <div className="p-1.5 rounded-lg bg-stone-50 group-hover:bg-stone-100 transition-colors">
                      {copiedHex === c.hex ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-stone-400" />}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* TYPOGRAFIE TAB */}
        {activeTab === 'typografie' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-stone-900 mb-3" style={{ fontFamily: 'var(--font-heading)' }}>Typografie</h2>
              <p className="text-stone-600 max-w-2xl leading-relaxed">Twee typefaces vormen de visuele stem van Savana: een krachtig heading font voor impact en een leesbaar body font voor langere teksten.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-6 border border-stone-200">
                <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">Heading</span>
                <p className="text-5xl font-black text-stone-900 mt-3 mb-4" style={{ fontFamily: 'var(--font-heading)' }}>Space Grotesk</p>
                <p className="text-sm text-stone-500 mb-4">Gebruikt voor koppen, logo, en navigatie elementen.</p>
                <div className="space-y-2 border-t border-stone-100 pt-4">
                  {['Black 900', 'Bold 700', 'Medium 500'].map(w => (
                    <p key={w} className="text-lg text-stone-900" style={{ fontFamily: 'var(--font-heading)', fontWeight: parseInt(w.split(' ')[1]) }}>{w} — Savana Coffee</p>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-stone-200">
                <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">Body</span>
                <p className="text-5xl font-light text-stone-900 mt-3 mb-4" style={{ fontFamily: 'var(--font-sans)' }}>Inter</p>
                <p className="text-sm text-stone-500 mb-4">Gebruikt voor body text, beschrijvingen en UI elementen.</p>
                <div className="space-y-2 border-t border-stone-100 pt-4">
                  {['Regular 400', 'Medium 500', 'SemiBold 600'].map(w => (
                    <p key={w} className="text-lg text-stone-900" style={{ fontFamily: 'var(--font-sans)', fontWeight: parseInt(w.split(' ')[1]) }}>{w} — Specialty Coffee</p>
                  ))}
                </div>
              </div>
            </div>
            {/* Type scale */}
            <div className="bg-white rounded-2xl p-6 border border-stone-200">
              <h3 className="text-sm font-bold text-amber-700 uppercase tracking-wider mb-4">Type Scale</h3>
              <div className="space-y-3">
                {[
                  { size: '48px', label: 'Display', text: 'Savana Coffee' },
                  { size: '32px', label: 'H1', text: 'Specialty blends' },
                  { size: '24px', label: 'H2', text: 'Farm to cup' },
                  { size: '18px', label: 'H3', text: 'Duurzaam geteeld' },
                  { size: '16px', label: 'Body', text: 'Onze koffie wordt met zorg geselecteerd uit de beste single-origin farms.' },
                  { size: '14px', label: 'Small', text: 'Beschikbaar in heel Suriname en de Cariben.' },
                ].map(s => (
                  <div key={s.label} className="flex items-baseline gap-4 border-b border-stone-50 pb-2">
                    <span className="text-[10px] text-stone-400 w-12 flex-shrink-0">{s.label}</span>
                    <span className="text-[10px] text-stone-400 w-10 flex-shrink-0">{s.size}</span>
                    <p className="text-stone-900" style={{ fontSize: s.size, fontFamily: 'var(--font-heading)', lineHeight: 1.2 }}>{s.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* TOEPASSINGEN TAB */}
        {activeTab === 'toepassingen' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-stone-900 mb-3" style={{ fontFamily: 'var(--font-heading)' }}>Toepassingen</h2>
              <p className="text-stone-600 max-w-2xl leading-relaxed">De merkidentiteit toegepast op verschillende touchpoints — van verpakking tot digitaal, allemaal consistent en herkenbaar.</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {applications.map(a => (
                <div key={a.title} className="group bg-white rounded-2xl border border-stone-200 overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative aspect-[3/2] overflow-hidden">
                    <img src={a.img} alt={a.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                      <span className="text-white text-sm font-bold flex items-center gap-1"><Eye className="w-3.5 h-3.5" /> Bekijk</span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-stone-900 text-sm" style={{ fontFamily: 'var(--font-heading)' }}>{a.title}</h3>
                    <p className="text-xs text-stone-500 mt-1 leading-relaxed">{a.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* ═══ CTA ═══ */}
      <section className="bg-amber-800 py-16">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white tracking-tight mb-4" style={{ fontFamily: 'var(--font-heading)' }}>Uw merk verdient dit niveau</h2>
          <p className="text-amber-200 mb-6 leading-relaxed">Van concept tot complete merkidentiteit. Laat ons uw visie tot leven brengen met een branding die resoneert.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <button onClick={() => toast.success('Brandbook download gestart!', { description: 'Het PDF bestand wordt klaargemaakt...' })}
              className="px-6 py-3 bg-white text-amber-900 font-bold rounded-xl hover:bg-amber-50 transition-colors text-sm" style={{ fontFamily: 'var(--font-heading)' }}>
              <Download className="w-4 h-4 inline mr-2" /> Download Brandbook
            </button>
            <a href="#" className="px-6 py-3 border-2 border-white/30 text-white font-bold rounded-xl hover:bg-white/10 transition-colors text-sm" style={{ fontFamily: 'var(--font-heading)' }}>
              <Palette className="w-4 h-4 inline mr-2" /> Start uw project
            </a>
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="bg-stone-900 py-8">
        <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2"><SavanaIconSmall size={24} /><span className="text-sm font-bold text-white">Savana Coffee — Brand Identity</span></div>
          <p className="text-sm text-stone-500">Case study door Next‑X Agency · 2025</p>
        </div>
      </footer>

      <DemoFeatures features={['Geanimeerd SVG logo (Framer Motion path draw)', 'Tab navigatie: logo / kleuren / typografie / toepassingen', 'Kleurpalet met clipboard-kopiëren + toast', 'Typografie specimen met type scale', 'Brand mock-up foto\'s (verpakking, social, signage)', 'Download Brandbook knop']} />
    </div>
  )
}
