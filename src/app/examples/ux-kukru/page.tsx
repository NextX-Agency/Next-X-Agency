'use client'

import { useState, FormEvent } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Users, Zap, Shield, BarChart3, MessageSquare, Check, ArrowRight, Phone, Mail, MapPin, Send, Heart, Globe, Layers } from 'lucide-react'
import { toast } from 'sonner'

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
  { icon: Users, title: 'Community Management', desc: 'Beheer leden, rollen en groepen vanuit één dashboard. Automatische onboarding flows voor nieuwe gebruikers.' },
  { icon: MessageSquare, title: 'Realtime Discussies', desc: 'Forums, threads en live chat geïntegreerd. Push-notificaties houden uw community betrokken.' },
  { icon: BarChart3, title: 'Analytics Dashboard', desc: 'Inzicht in groei, engagement en content performance. Exporteer rapporten naar PDF of CSV.' },
  { icon: Shield, title: 'Moderatie tools', desc: 'Automatische spamdetectie, rapportage en aanpasbare communityrichtlijnen.' },
  { icon: Zap, title: 'Event Planning', desc: 'Organiseer online en offline events. RSVP tracking, herinneringen en post-event feedback.' },
  { icon: Globe, title: 'Meertalig Platform', desc: 'Ondersteuning voor NL, EN en Sranan Tongo. Automatische vertaling van user-generated content.' },
]

const team = [
  { name: 'Priya Ramkissoon', role: 'UX Lead', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop&crop=face' },
  { name: 'Dwayne Panka', role: 'UI Designer', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face' },
  { name: 'Samira Narsing', role: 'UX Researcher', img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop&crop=face' },
  { name: 'Roy Tjien Fooh', role: 'Frontend Dev', img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&h=300&fit=crop&crop=face' },
]

const faqs = [
  { q: 'Hoe lang duurt het UX design traject?', a: 'Een typisch UX traject duurt 6-8 weken, afhankelijk van de complexiteit. We starten met onderzoek (2 weken), gevolgd door wireframing en prototyping (2-3 weken), gebruikerstesten (1 week) en iteratie (1-2 weken). Bij grotere projecten werken we in sprints.' },
  { q: 'Wat is het verschil tussen UX en UI design?', a: 'UX (User Experience) richt zich op hoe een product werkt — de flow, navigatie en gebruiksvriendelijkheid. UI (User Interface) richt zich op hoe het eruitziet — kleuren, typografie, iconen en visuele consistentie. Bij Kukru doen we beide.' },
  { q: 'Gebruiken jullie een vaste design methode?', a: 'We hanteren de Double Diamond methode: Discover → Define → Develop → Deliver. Elke fase heeft duidelijke deliverables en stakeholder reviews. We combineren dit met Agile principes voor flexibiliteit.' },
  { q: 'Kunnen jullie ook bestaande apps verbeteren?', a: 'Absoluut! We voeren UX audits uit op bestaande applicaties, identificeren knelpunten via heatmaps en user sessions, en leveren een concreet verbeterplan met prioriteiten op basis van impact vs. effort.' },
  { q: 'Wat kost een UX/UI project?', a: 'Projecten starten vanaf SRD 5.000 voor een compact traject (bijv. landing page redesign). Gemiddelde projecten liggen tussen SRD 10.000-25.000. Enterprise trajecten worden op maat geoffreerd. We werken altijd met een vaste prijs, geen verrassingen.' },
  { q: 'Bieden jullie ook training aan?', a: 'Ja, we geven workshops in UX Research, Figma, Design Systems en Usability Testing. Zowel voor teams als individuen. Workshops zijn beschikbaar on-site in Paramaribo of online.' },
]

const pricing = [
  { name: 'Essentials', price: 'SRD 5.000', desc: 'Ideaal voor startups en kleine projecten', features: ['UX Audit rapport', 'Wireframes (5 pagina\'s)', 'Clickable prototype', 'Kleurenpalette + typografie', '2 revisierondes'], highlight: false },
  { name: 'Business', price: 'SRD 15.000', desc: 'Compleet design voor groeiende bedrijven', features: ['Alles van Essentials', 'User Research (interviews)', 'Wireframes (15+ pagina\'s)', 'Hi-fi prototype in Figma', 'Design System basics', 'Gebruikerstest (5 personen)', '4 revisierondes', 'Developer handoff'], highlight: true },
  { name: 'Enterprise', price: 'Op maat', desc: 'Voor complexe platforms en apps', features: ['Alles van Business', 'Uitgebreide UR Sprint', 'Volledige Design System', 'A/B test strategie', 'Accessibility audit (WCAG)', 'Doorlopende UX support', 'Onbeperkte revisies', 'Stakeholder workshops'], highlight: false },
]

const process = [
  { num: '01', title: 'Discover', desc: 'User interviews, stakeholder workshops, concurrentie-analyse en data-review', color: 'bg-violet-100 text-violet-700' },
  { num: '02', title: 'Define', desc: 'Persona\'s, user journeys, information architecture en prioritering', color: 'bg-fuchsia-100 text-fuchsia-700' },
  { num: '03', title: 'Design', desc: 'Wireframes, visueel ontwerp, interactief prototype en design system', color: 'bg-purple-100 text-purple-700' },
  { num: '04', title: 'Validate', desc: 'Usability tests, A/B experimenten, iteratie en developer handoff', color: 'bg-indigo-100 text-indigo-700' },
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
    toast.success('Bericht verzonden!', { description: 'We nemen binnen 24 uur contact op.' })
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
            <a href="#team" className="text-slate-600 hover:text-violet-600 transition-colors">Team</a>
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
              <Layers className="w-3 h-3" /> Case Study · Community Platform
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-5" style={{ fontFamily: 'var(--font-heading)' }}>
              UX/UI Design voor <span className="text-violet-600">Kukru</span> Community
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="text-lg text-slate-600 mb-8 max-w-xl">
              Hoe we een Surinaams community platform ontwierpen van concept tot lancering. User-centered design met echte gebruikers, echte data, echte resultaten.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex flex-wrap gap-4">
              <a href="#features" className="px-6 py-3 bg-violet-600 text-white font-bold rounded-xl hover:bg-violet-700 transition-colors flex items-center gap-2">
                Bekijk case <ArrowRight className="w-4 h-4" />
              </a>
              <a href="#pricing" className="px-6 py-3 bg-white border-2 border-slate-200 text-slate-900 font-bold rounded-xl hover:border-violet-300 transition-colors">
                Bekijk prijzen
              </a>
            </motion.div>
          </div>
          {/* Hero visual */}
          <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}
            className="hidden lg:block absolute right-8 top-1/2 -translate-y-1/2 w-[380px]">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200">
              <Image src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=700&fit=crop" alt="Team collaborating" width={600} height={700} className="w-full" />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                <p className="text-white font-bold text-sm">Design Sprint Week 2</p>
                <p className="text-white/70 text-xs">Wireframe review met stakeholders</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ FEATURES ═══ */}
      <section id="features" className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-3" style={{ fontFamily: 'var(--font-heading)' }}>Platform Features</h2>
          <p className="text-slate-500 max-w-lg mx-auto">Ontworpen na 20+ user interviews en 3 iteratie-rondes. Elke feature is gevalideerd met echte gebruikers.</p>
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
            <h2 className="text-3xl font-bold text-slate-900 mb-3" style={{ fontFamily: 'var(--font-heading)' }}>Ons Proces</h2>
            <p className="text-slate-500 max-w-lg mx-auto">De Double Diamond methode aangepast voor de Surinaamse markt.</p>
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

      {/* ═══ TEAM ═══ */}
      <section id="team" className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-3" style={{ fontFamily: 'var(--font-heading)' }}>Het Team</h2>
          <p className="text-slate-500">De mensen achter het Kukru design traject.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {team.map((t, i) => (
            <motion.div key={t.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="text-center group">
              <div className="relative w-32 h-32 mx-auto mb-4 rounded-2xl overflow-hidden">
                <Image src={t.img} alt={t.name} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
              </div>
              <h4 className="font-bold text-slate-900 text-sm" style={{ fontFamily: 'var(--font-heading)' }}>{t.name}</h4>
              <p className="text-xs text-violet-600">{t.role}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══ PRICING ═══ */}
      <section id="pricing" className="bg-gradient-to-b from-violet-50 to-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-3" style={{ fontFamily: 'var(--font-heading)' }}>UX/UI Pakketten</h2>
            <p className="text-slate-500 max-w-lg mx-auto">Transparante prijzen, geen verrassingen. Elk pakket inclusief Figma bestanden en developer handoff.</p>
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
                  {p.price}{p.price !== 'Op maat' && <span className="text-sm font-normal text-slate-400"> eenmalig</span>}
                </p>
                <ul className="space-y-2 mb-6">
                  {p.features.map(f => (
                    <li key={f} className="flex items-center gap-2 text-sm text-slate-600">
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0" /> {f}
                    </li>
                  ))}
                </ul>
                <button onClick={() => toast.success(`${p.name} pakket aangevraagd!`, { description: 'We sturen binnen 24u een offerte.' })}
                  className={`w-full py-2.5 text-sm font-bold rounded-xl transition-colors ${p.highlight ? 'bg-violet-600 text-white hover:bg-violet-700' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}>
                  {p.price === 'Op maat' ? 'Offerte aanvragen' : 'Selecteer pakket'} <ArrowRight className="w-3.5 h-3.5 inline ml-1" />
                </button>
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
              <p className="text-slate-500 mb-8">Vertel ons over uw project en we nemen binnen 24 uur contact op met een voorstel.</p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center"><Phone className="w-4 h-4 text-violet-600" /></div>
                  <div><p className="text-xs text-slate-400">Telefoon</p><p className="text-sm font-bold text-slate-900">+597 456-7890</p></div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center"><Mail className="w-4 h-4 text-violet-600" /></div>
                  <div><p className="text-xs text-slate-400">Email</p><p className="text-sm font-bold text-slate-900">hello@kukru.sr</p></div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center"><MapPin className="w-4 h-4 text-violet-600" /></div>
                  <div><p className="text-xs text-slate-400">Locatie</p><p className="text-sm font-bold text-slate-900">Domineestraat 12, Paramaribo</p></div>
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
            <p className="text-xs text-slate-600">© 2025 Kukru — Dit is een demo door Next‑X Agency</p>
            <p className="text-xs text-slate-600">Designed & built with <Heart className="w-3 h-3 inline text-violet-500" /> in Paramaribo</p>
          </div>
        </div>
      </footer>

    </div>
  )
}
