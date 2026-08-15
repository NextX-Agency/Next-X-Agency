'use client'

import { useState, FormEvent } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Zap, Shield, BarChart3, MessageSquare, Check, ArrowRight, Phone, Mail, MapPin, Send, Heart, Wrench, Layers } from 'lucide-react'
import { toast } from 'sonner'
import { CONTACT } from '@/lib/contact'

/* ─── Logo ─── */
function KukruLogo({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect width="48" height="48" rx="14" fill="#7c3aed" />
      <path d="M14 16 L24 12 L34 16 L34 28 L24 36 L14 28Z" stroke="white" strokeWidth="2" fill="none" />
      <circle cx="24" cy="22" r="4" fill="white" />
      <path d="M18 30 Q24 26 30 30" stroke="white" strokeWidth="2" fill="none" />
    </svg>
  )
}

/* ─── Data ─── */
const features = [
  { icon: Wrench, title: 'Updates en bugfixes', desc: 'Tekst, prijzen, foto\u2019s en kleine storingen worden binnen uw maanduren opgepakt \u2014 u meldt het, wij regelen het.' },
  { icon: Layers, title: 'Nieuwe pagina\u2019s en functies', desc: 'Een extra dienstenpagina, een formulier of een sectie erbij, gebouwd in dezelfde stijl als de rest van uw site.' },
  { icon: Zap, title: 'Design en UX werk', desc: 'Schermen die niet lekker lopen worden opnieuw ontworpen, inclusief de bijbehorende social media beelden.' },
  { icon: Shield, title: 'Onderhoud en beveiliging', desc: 'Updates, back-upcontrole en SSL blijven op orde, zodat uw site niet stilletjes achterop raakt.' },
  { icon: BarChart3, title: 'Maandelijkse rapportage', desc: 'Aan het eind van de maand ziet u wat er is gedaan, hoeveel uur het kostte en wat er nog openstaat.' },
  { icon: MessageSquare, title: 'E\u00e9n vast aanspreekpunt', desc: 'U legt niets twee keer uit: dezelfde persoon kent uw project en schakelt intern met de rest van het team.' },
]

// What the retainer gives access to, described as disciplines rather than as
// a roster of named people.
const disciplines = [
  { icon: Layers, title: 'Web development', desc: 'Nieuwe pagina\u2019s, functies en integraties op uw bestaande site.' },
  { icon: Zap, title: 'Design en UX', desc: 'Schermen, huisstijl en visuals die bij uw merk blijven passen.' },
  { icon: Shield, title: 'Hosting en onderhoud', desc: 'Domein, SSL, back-ups en updates blijven bewaakt.' },
  { icon: BarChart3, title: 'SEO en analyse', desc: 'Vindbaarheid en cijfers die maandelijks worden nagelopen.' },
]

const faqs = [
  { q: 'Wat gebeurt er met uren die ik niet gebruik?', a: 'Ongebruikte uren vervallen aan het eind van de maand; ze schuiven niet door. Merkt u dat u er structureel onder blijft, dan zetten we u gewoon een pakket lager.' },
  { q: 'Wat als ik meer uren nodig heb dan mijn pakket?', a: 'Extra uren boven de pakketlimiet kosten $25 per uur. We melden het altijd vooraf zodra een aanvraag buiten uw resterende uren valt, zodat u zelf kiest of het deze maand of volgende maand wordt.' },
  { q: 'Hoe snel wordt mijn aanvraag opgepakt?', a: 'Dat hangt van uw pakket af: Starter binnen 48 uur, Business binnen 24 uur en Partner binnen 12 uur. Een storing waardoor uw site plat ligt gaat altijd voor.' },
  { q: 'Moet mijn site door NextX gebouwd zijn?', a: 'Nee. We nemen ook bestaande sites over. We beginnen dan met een korte inventarisatie van de techniek en de hosting, zodat we weten waar we instappen.' },
  { q: 'Zit ik ergens aan vast?', a: 'De pakketten lopen per maand, met een minimum van drie maanden. Daarna is opzeggen mogelijk tegen het eind van elke maand.' },
  { q: 'Hoe lever ik werk aan?', a: 'Via WhatsApp of e-mail, in uw eigen woorden. U hoeft geen ticketsysteem te leren; wij zetten het intern om in taken en houden de urenstand voor u bij.' },
]

// The three packages exactly as they are priced on /services.
const pricing = [
  { name: 'Starter Support', price: '$195', desc: '10 uur per maand voor kleine, doorlopende taken', features: ['10 uur per maand', 'Kleine updates + bug fixes', 'Content wijzigingen', 'Technisch advies', 'Reactie binnen 48 uur'], highlight: false },
  { name: 'Business Support', price: '$360', desc: '20 uur per maand voor doorontwikkeling', features: ['20 uur per maand', 'Nieuwe functies bouwen', 'Design updates + integraties', 'Strategisch advies', 'Reactie binnen 24 uur'], highlight: true },
  { name: 'Partner Support', price: '$620', desc: '40 uur per maand met vaste bezetting', features: ['40 uur per maand', 'Vast aanspreekpunt', 'Voorrang bij complexe projecten', 'Samenwerking met uw team', 'Reactie binnen 12 uur'], highlight: false },
]

const process = [
  { num: '01', title: 'Aanmelden', desc: 'U stuurt uw wens via WhatsApp of e-mail, in gewone taal', color: 'bg-violet-100 text-violet-700' },
  { num: '02', title: 'Inplannen', desc: 'Wij schatten de uren, bevestigen wanneer het af is en zetten het op de planning', color: 'bg-fuchsia-100 text-fuchsia-700' },
  { num: '03', title: 'Uitvoeren', desc: 'Het werk wordt gebouwd, getest en op uw site gezet', color: 'bg-purple-100 text-purple-700' },
  { num: '04', title: 'Rapporteren', desc: 'Aan het eind van de maand ziet u wat er is gedaan en hoeveel uur er over is', color: 'bg-indigo-100 text-indigo-700' },
]

export default function UxKukruPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [formData, setFormData] = useState({ naam: '', email: '', bedrijf: '', bericht: '' })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const e: Record<string, string> = {}
    if (!formData.naam.trim()) e.naam = 'Naam is verplicht'
    if (!formData.email.trim()) e.email = 'Email is verplicht'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) e.email = 'Ongeldig emailadres'
    if (!formData.bericht.trim()) e.bericht = 'Bericht is verplicht'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = (ev: FormEvent) => {
    ev.preventDefault()
    if (!validateForm()) return
    toast.success('Bericht verzonden!', { description: `Demo — in de echte versie komt dit bij u binnen. Reactie ${CONTACT.responseTime}.` })
    setFormData({ naam: '', email: '', bedrijf: '', bericht: '' })
  }

  return (
    <div className="min-h-screen bg-white">
      {/* ═══ NAV ═══ */}
      <nav className="sticky top-10 z-20 bg-white/95 backdrop-blur-sm border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <KukruLogo size={28} />
            <span className="font-bold text-slate-900" style={{ fontFamily: 'var(--font-heading)' }}>Kukru</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm">
            <a href="#features" className="text-slate-600 hover:text-violet-600 transition-colors">Features</a>
            <a href="#process" className="text-slate-600 hover:text-violet-600 transition-colors">Proces</a>
            <a href="#disciplines" className="text-slate-600 hover:text-violet-600 transition-colors">Wat u krijgt</a>
            <a href="#pricing" className="text-slate-600 hover:text-violet-600 transition-colors">Prijzen</a>
            <a href="#faq" className="text-slate-600 hover:text-violet-600 transition-colors">FAQ</a>
          </div>
          <a href="#contact" className="px-4 py-2 bg-violet-600 text-white text-sm font-bold rounded-lg hover:bg-violet-700 transition-colors">
            Contact
          </a>
        </div>
      </nav>

      {/* ═══ HERO ═══ */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-50 via-fuchsia-50 to-white" />
        <div className="absolute top-20 right-10 w-64 h-64 rounded-full bg-violet-200/30 blur-3xl" />
        <div className="absolute bottom-10 left-10 w-48 h-48 rounded-full bg-fuchsia-200/30 blur-3xl" />
        <div className="relative max-w-6xl mx-auto px-4 py-20 md:py-28">
          <div className="max-w-3xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 bg-violet-100 text-violet-700 text-xs font-bold rounded-full mb-6">
              <Layers className="w-3 h-3" /> Voorbeeld · Maandelijkse support
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-5" style={{ fontFamily: 'var(--font-heading)' }}>
              <span className="text-violet-600">UX Kukru</span> — uw digitale team per maand
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="text-lg text-slate-600 mb-8 max-w-xl">
              Geen los uurtarief en geen nieuw project elke keer: een vast aantal uren per maand waarin wij uw website, webshop en visuals onderhouden en verder bouwen.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex flex-wrap gap-4">
              <a href="#features" className="px-6 py-3 bg-violet-600 text-white font-bold rounded-xl hover:bg-violet-700 transition-colors flex items-center gap-2">
                Wat zit erin <ArrowRight className="w-4 h-4" />
              </a>
              <a href="#pricing" className="px-6 py-3 bg-white border-2 border-slate-200 text-slate-900 font-bold rounded-xl hover:border-violet-300 transition-colors">
                Bekijk prijzen
              </a>
            </motion.div>
          </div>
          {/* Hero visual */}
          <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}
            className="hidden lg:block absolute right-8 top-1/2 -translate-y-1/2 w-[380px]">
            {/* Urenstand — het enige cijfer dat een klant maandelijks bijhoudt */}
            <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
                Uw maand — voorbeeld
              </p>
              <p className="mt-4 text-5xl font-bold text-slate-900 tabular-nums" style={{ fontFamily: 'var(--font-heading)' }}>
                12<span className="text-2xl font-normal text-slate-400"> / 20 uur</span>
              </p>
              <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-slate-100">
                <div className="h-full w-[60%] rounded-full bg-violet-600" />
              </div>
              <ul className="mt-6 space-y-3 border-t border-slate-100 pt-5 text-sm">
                {[
                  ['Prijzen webshop bijgewerkt', '2u'],
                  ['Nieuwe dienstenpagina', '6u'],
                  ['Formulier verstuurde niets meer', '1u'],
                  ['3 social media beelden', '3u'],
                ].map(([task, hours]) => (
                  <li key={task} className="flex items-start justify-between gap-4">
                    <span className="text-slate-600">{task}</span>
                    <span className="shrink-0 font-bold text-slate-900 tabular-nums">{hours}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ FEATURES ═══ */}
      <section id="features" className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-3" style={{ fontFamily: 'var(--font-heading)' }}>Wat er in uw uren past</h2>
          <p className="text-slate-500 max-w-lg mx-auto">Alles wat een lopende website vraagt, zonder dat u er per klus een offerte voor hoeft aan te vragen.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              className="bg-slate-50 rounded-2xl p-6 hover:shadow-lg transition-shadow border border-transparent hover:border-violet-100 group">
              <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center mb-4 group-hover:bg-violet-600 transition-colors">
                <f.icon className="w-5 h-5 text-violet-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-bold text-slate-900 mb-2" style={{ fontFamily: 'var(--font-heading)' }}>{f.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══ PROCESS ═══ */}
      <section id="process" className="bg-slate-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-3" style={{ fontFamily: 'var(--font-heading)' }}>Hoe een maand verloopt</h2>
            <p className="text-slate-500 max-w-lg mx-auto">Van uw bericht tot het maandoverzicht — vier stappen, elke maand hetzelfde.</p>
          </div>
          <div className="grid md:grid-cols-4 gap-4">
            {process.map((p, i) => (
              <motion.div key={p.num} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-6 border border-slate-200 text-center">
                <span className={`inline-flex items-center justify-center w-10 h-10 rounded-full text-sm font-bold ${p.color} mb-3`}>{p.num}</span>
                <h3 className="font-bold text-slate-900 mb-2" style={{ fontFamily: 'var(--font-heading)' }}>{p.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ DISCIPLINES ═══ */}
      <section id="disciplines" className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-3" style={{ fontFamily: 'var(--font-heading)' }}>Waar u toegang toe krijgt</h2>
          <p className="text-slate-500 max-w-lg mx-auto">Eén contract, één aanspreekpunt — en daarachter het hele NextX team.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {disciplines.map((d, i) => (
            <motion.div key={d.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="rounded-2xl border border-slate-200 bg-white p-6">
              <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center mb-4">
                <d.icon className="w-5 h-5 text-violet-600" />
              </div>
              <h4 className="font-bold text-slate-900 text-sm mb-2" style={{ fontFamily: 'var(--font-heading)' }}>{d.title}</h4>
              <p className="text-xs text-slate-500 leading-relaxed">{d.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══ PRICING ═══ */}
      <section id="pricing" className="bg-gradient-to-b from-violet-50 to-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-3" style={{ fontFamily: 'var(--font-heading)' }}>Maandpakketten</h2>
            <p className="text-slate-500 max-w-lg mx-auto">Dezelfde prijzen als op onze dienstenpagina. Extra uren $25 per uur, minimaal drie maanden.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {pricing.map((p, i) => (
              <motion.div key={p.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className={`rounded-2xl p-6 border-2 relative ${p.highlight ? 'border-violet-500 bg-white shadow-xl shadow-violet-100' : 'border-slate-200 bg-white'}`}>
                {p.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-violet-600 text-white text-[10px] font-bold rounded-full flex items-center gap-1">
                    <Heart className="w-3 h-3" /> Meest gekozen
                  </div>
                )}
                <h3 className="font-bold text-slate-900 text-lg mb-1" style={{ fontFamily: 'var(--font-heading)' }}>{p.name}</h3>
                <p className="text-xs text-slate-500 mb-3">{p.desc}</p>
                <p className="text-3xl font-bold text-slate-900 mb-5" style={{ fontFamily: 'var(--font-heading)' }}>
                  {p.price}<span className="text-sm font-normal text-slate-400"> / maand</span>
                </p>
                <ul className="space-y-2 mb-6">
                  {p.features.map(f => (
                    <li key={f} className="flex items-center gap-2 text-sm text-slate-600">
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0" /> {f}
                    </li>
                  ))}
                </ul>
                <Link href={`/contact?dienst=${encodeURIComponent(p.name)}`}
                  className={`flex w-full items-center justify-center gap-1.5 py-2.5 text-sm font-bold rounded-xl transition-colors ${p.highlight ? 'bg-violet-600 text-white hover:bg-violet-700' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}>
                  Dit pakket aanvragen <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section id="faq" className="max-w-3xl mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-slate-900 mb-3" style={{ fontFamily: 'var(--font-heading)' }}>Veelgestelde vragen</h2>
        </div>
        <div className="space-y-2">
          {faqs.map((f, i) => (
            <div key={i} className="border border-slate-200 rounded-xl overflow-hidden">
              <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-slate-50 transition-colors">
                <span className="font-bold text-sm text-slate-900">{f.q}</span>
                <motion.div animate={{ rotate: openFaq === i ? 180 : 0 }} transition={{ duration: 0.2 }}>
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                </motion.div>
              </button>
              <AnimatePresence>
                {openFaq === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}>
                    <div className="px-5 pb-4 text-sm text-slate-600 leading-relaxed">{f.a}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ CONTACT ═══ */}
      <section id="contact" className="bg-slate-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-10">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4" style={{ fontFamily: 'var(--font-heading)' }}>Laten we praten</h2>
              <p className="text-slate-500 mb-8">Vertel wat u maandelijks nodig heeft, dan stellen we het passende pakket voor. Reactie {CONTACT.responseTime}.</p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center"><Phone className="w-4 h-4 text-violet-600" /></div>
                  <div><p className="text-xs text-slate-400">Telefoon</p><p className="text-sm font-bold text-slate-900">{CONTACT.phoneDisplay}</p></div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center"><Mail className="w-4 h-4 text-violet-600" /></div>
                  <div><p className="text-xs text-slate-400">Email</p><p className="text-sm font-bold text-slate-900">{CONTACT.email}</p></div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center"><MapPin className="w-4 h-4 text-violet-600" /></div>
                  <div><p className="text-xs text-slate-400">Locatie</p><p className="text-sm font-bold text-slate-900">{CONTACT.location}</p></div>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 border border-slate-200 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Naam *</label>
                <input type="text" value={formData.naam} onChange={e => setFormData(p => ({ ...p, naam: e.target.value }))}
                  className={`w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 ${errors.naam ? 'border-red-300 bg-red-50' : 'border-slate-200'}`}
                  placeholder="Uw volledige naam" />
                {errors.naam && <p className="text-xs text-red-500 mt-1">{errors.naam}</p>}
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Email *</label>
                <input type="email" value={formData.email} onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
                  className={`w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 ${errors.email ? 'border-red-300 bg-red-50' : 'border-slate-200'}`}
                  placeholder="uw@email.com" />
                {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Bedrijf</label>
                <input type="text" value={formData.bedrijf} onChange={e => setFormData(p => ({ ...p, bedrijf: e.target.value }))}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
                  placeholder="Optioneel" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Bericht *</label>
                <textarea rows={4} value={formData.bericht} onChange={e => setFormData(p => ({ ...p, bericht: e.target.value }))}
                  className={`w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 resize-none ${errors.bericht ? 'border-red-300 bg-red-50' : 'border-slate-200'}`}
                  placeholder="Vertel ons over uw project..." />
                {errors.bericht && <p className="text-xs text-red-500 mt-1">{errors.bericht}</p>}
              </div>
              <button type="submit" className="w-full py-3 bg-violet-600 text-white font-bold rounded-xl hover:bg-violet-700 transition-colors flex items-center justify-center gap-2">
                <Send className="w-4 h-4" /> Verstuur bericht
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="bg-slate-900 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <KukruLogo size={24} />
              <span className="font-bold text-white text-sm" style={{ fontFamily: 'var(--font-heading)' }}>Kukru</span>
              <span className="text-xs text-slate-400 ml-2">User Experience & Interface Design</span>
            </div>
            <div className="flex items-center gap-4 text-xs text-slate-500">
              <a href="#features" className="hover:text-white transition-colors">Features</a>
              <a href="#pricing" className="hover:text-white transition-colors">Prijzen</a>
              <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
              <a href="#contact" className="hover:text-white transition-colors">Contact</a>
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-2">
            <p className="text-xs text-slate-600">© {new Date().getFullYear()} Kukru — Dit is een demo door NextX Agency</p>
            <p className="text-xs text-slate-600">Designed & built with <Heart className="w-3 h-3 inline text-violet-500" /> in Paramaribo</p>
          </div>
        </div>
      </footer>

    </div>
  )
}
