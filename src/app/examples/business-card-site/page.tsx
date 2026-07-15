'use client'

import { useState, useRef, FormEvent, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Phone, Mail, MapPin, Instagram, Facebook, Linkedin, ChevronRight, Hammer, HardHat, Home, PaintBucket, ArrowUp, Shield, Clock, CheckCircle2 } from 'lucide-react'
import { toast } from 'sonner'
import FloatingWhatsApp from '../_components/FloatingWhatsApp'
import DemoFeatures from '../_components/DemoFeatures'
import TestimonialsSlider from '../_components/TestimonialsSlider'

/* ─── SVG Logo ─── */
function KaderBouwLogo({ className = '', size = 40 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <rect x="2" y="2" width="44" height="44" rx="8" fill="#f97015" />
      <path d="M14 36V12h4l10 12-10 12h-4z" fill="white" />
      <rect x="28" y="12" width="6" height="24" rx="1" fill="white" opacity="0.7" />
      <rect x="12" y="10" width="24" height="3" rx="1.5" fill="white" opacity="0.4" />
    </svg>
  )
}

/* ─── Data ─── */
const services = [
  { icon: Home, title: 'Nieuwbouw', desc: 'Complete woningen en bedrijfspanden van ontwerp tot oplevering.' },
  { icon: PaintBucket, title: 'Renovatie', desc: 'Grondige verbouwingen die uw pand transformeren naar modern comfort.' },
  { icon: HardHat, title: 'Dakwerken', desc: 'Professionele dakconstructies, reparaties en isolatie.' },
  { icon: Hammer, title: 'Vloeren & Afwerking', desc: 'Betontegel-, hout- en terrazzovloeren vakkundig gelegd.' },
]

const projects = [
  { img: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=400&fit=crop&q=80', title: 'Villa Zonnebloemstraat', cat: 'Nieuwbouw', location: 'Paramaribo Noord', duration: '6 maanden', value: 'SRD 320.000' },
  { img: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&h=400&fit=crop&q=80', title: 'Appartementencomplex Flora', cat: 'Nieuwbouw', location: 'Rainville', duration: '14 maanden', value: 'SRD 1.200.000' },
  { img: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&h=400&fit=crop&q=80', title: 'Kantoor Renovatie Centrum', cat: 'Renovatie', location: 'Centrum Paramaribo', duration: '3 maanden', value: 'SRD 185.000' },
  { img: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&h=400&fit=crop&q=80', title: 'Schoolgebouw Wanica', cat: 'Dakwerken', location: 'Wanica', duration: '2 maanden', value: 'SRD 95.000' },
  { img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop&q=80', title: 'Winkelcentrum Palm Village', cat: 'Vloeren', location: 'Paramaribo Zuid', duration: '4 maanden', value: 'SRD 210.000' },
  { img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop&q=80', title: 'Kantoorgebouw Hermitage', cat: 'Nieuwbouw', location: 'Hermitage Mall', duration: '10 maanden', value: 'SRD 780.000' },
]

const projectFilters = ['Alle', 'Nieuwbouw', 'Renovatie', 'Dakwerken', 'Vloeren']

const processSteps = [
  { icon: '📋', title: 'Offerte', desc: 'Gratis vrijblijvende offerte op maat', days: '1-2 dagen' },
  { icon: '🔍', title: 'Inspectie', desc: 'Bouwkundige inspectie ter plaatse', days: '3-5 dagen' },
  { icon: '📐', title: 'Planning', desc: 'Gedetailleerd tijdsplan en materialen', days: '1-2 weken' },
  { icon: '🏗️', title: 'Uitvoering', desc: 'Vakkundige realisatie door ons team', days: 'Projectafhankelijk' },
  { icon: '🏠', title: 'Oplevering', desc: 'Eindcontrole en overdracht aan u', days: '1-3 dagen' },
]

const certifications = [
  { label: 'ISO 9001', desc: 'Kwaliteitsmanagement' },
  { label: 'SBNO Gecertificeerd', desc: 'Surinaamse Bouwsector Norm' },
  { label: '15 Jaar Garantie', desc: 'Op constructiewerk' },
  { label: 'Verzekerd Bedrijf', desc: 'Volledig WA verzekerd' },
]

const kaderbouwTestimonials = [
  { name: 'Mohamed Alibaks', role: 'Nieuwbouw woning · Paramaribo Noord', text: 'Op tijd, netjes en kwalitatief. KaderBouw heeft onze droomwoning precies zo gebouwd als we voor ogen hadden. De communicatie was uitstekend.', rating: 5, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=96&h=96&fit=crop&q=80', date: 'Okt 2024' },
  { name: 'Shanti Ramkhelawan', role: 'Renovatie badkamer · Zorg en Hoop', text: 'Vakmanschap dat je ziet en voelt. Onze badkamer is compleet getransformeerd. Het team was altijd op tijd en heeft netjes gewerkt.', rating: 5, avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=96&h=96&fit=crop&q=80', date: 'Dec 2024' },
  { name: 'Ravi Doerga', role: 'Dakwerken · Lelydorp', text: 'KaderBouw deed precies wat ze beloofden. Het dak is perfect geïsoleerd en de lekkage is volledig verholpen. Aanrader!', rating: 5, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=96&h=96&fit=crop&q=80', date: 'Feb 2025' },
  { name: 'Patricia Veira', role: 'Terrazzovloer · Rainville', text: 'Prachtig resultaat — de hele buurt vraagt om hun nummer. De terrazzovloer glimt als nooit tevoren. Heel tevreden over de afwerking.', rating: 5, avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=96&h=96&fit=crop&q=80', date: 'Mrt 2025' },
]

const stats = [
  { value: 150, suffix: '+', label: 'Projecten' },
  { value: 15, suffix: ' jr', label: 'Ervaring' },
  { value: 12, suffix: '', label: 'Teamleden' },
  { value: 98, suffix: '%', label: 'Klanttevredenheid' },
]

/* ─── Animated counter ─── */
function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return
    let frame: number
    let start: number | null = null
    const duration = 1500
    function step(ts: number) {
      if (!start) start = ts
      const progress = Math.min((ts - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * value))
      if (progress < 1) frame = requestAnimationFrame(step)
    }
    frame = requestAnimationFrame(step)
    return () => cancelAnimationFrame(frame)
  }, [inView, value])

  return (
    <span ref={ref} className="text-3xl md:text-4xl font-black text-white tabular-nums" style={{ fontFamily: 'var(--font-heading)' }}>
      {count}{suffix}
    </span>
  )
}

export default function KaderBouwPage() {
  const [form, setForm] = useState({ projectType: '', beschrijving: '', naam: '', email: '', telefoon: '', adres: '' })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [formStep, setFormStep] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const [projectFilter, setProjectFilter] = useState('Alle')

  const filteredProjects = projectFilter === 'Alle' ? projects : projects.filter(p => p.cat === projectFilter)
  const refNumber = `KB-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 900 + 100))}`

  function handleFormNext() {
    const errs: Record<string, string> = {}
    if (formStep === 0) {
      if (!form.projectType) errs.projectType = 'Selecteer een projecttype'
      if (!form.beschrijving.trim()) errs.beschrijving = 'Beschrijf kort uw project'
    } else if (formStep === 1) {
      if (!form.naam.trim()) errs.naam = 'Naam is verplicht'
      if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Geldig e-mailadres vereist'
      if (!form.telefoon.trim()) errs.telefoon = 'Telefoonnummer is verplicht'
    }
    setErrors(errs)
    if (Object.keys(errs).length > 0) { toast.error('Vul alle verplichte velden in'); return }
    if (formStep === 1) {
      setSubmitted(true)
      toast.success('Offerte aanvraag verstuurd!')
      return
    }
    setFormStep(formStep + 1)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* ═══ HERO ═══ */}
      <section className="relative h-[85vh] min-h-[560px] flex items-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&h=1080&fit=crop&q=80"
          alt="Bouwplaats met kraan en steigers"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-transparent" />
        <div className="relative z-10 max-w-6xl mx-auto px-6 w-full">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="flex items-center gap-3 mb-6">
              <KaderBouwLogo size={48} />
              <span className="text-2xl font-bold text-white" style={{ fontFamily: 'var(--font-heading)' }}>KaderBouw NV</span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[0.95] max-w-2xl mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
              Wij bouwen<br /><span className="text-[#f97015]">uw visie</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 max-w-lg mb-8 leading-relaxed">
              15+ jaar bouwervaring in Suriname. Van nieuwbouw tot complete renovaties — vakmanschap dat u kunt vertrouwen.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#contact" className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#f97015] text-white font-bold rounded-xl hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/30" style={{ fontFamily: 'var(--font-heading)' }}>
                Gratis offerte aanvragen <ChevronRight className="w-4 h-4" />
              </a>
              <a href="#projecten" className="inline-flex items-center gap-2 px-6 py-3.5 border-2 border-white/30 text-white font-bold rounded-xl hover:bg-white/10 transition-colors" style={{ fontFamily: 'var(--font-heading)' }}>
                Onze projecten
              </a>
            </div>
            <div className="flex items-center gap-3 mt-6">
              <div className="flex -space-x-2">
                {kaderbouwTestimonials.slice(0, 3).map((t, i) => <img key={i} src={t.avatar} alt={t.name} className="w-8 h-8 rounded-full border-2 border-white object-cover" />)}
              </div>
              <span className="text-sm text-slate-300"><strong className="text-white">98%</strong> klanttevredenheid</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ STATS ═══ */}
      <section className="bg-slate-900 py-16">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <AnimatedNumber value={s.value} suffix={s.suffix} />
              <p className="text-sm text-slate-400 mt-1 font-medium">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ OVER ONS ═══ */}
      <section className="py-20 lg:py-28">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#f97015] mb-3 block">Over ons</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-5" style={{ fontFamily: 'var(--font-heading)' }}>
              Gebouwd op <span className="text-[#f97015]">vakmanschap</span>
            </h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              KaderBouw NV is sinds 2009 een gevestigde naam in de Surinaamse bouwsector. Ons team van ervaren vaklieden en ingenieurs levert projecten op die generaties meegaan.
            </p>
            <p className="text-slate-600 leading-relaxed mb-6">
              Van luxe woningen in Paramaribo tot commerciële panden in Wanica — wij combineren moderne technieken met lokale expertise voor een resultaat dat u trots maakt.
            </p>
            <div className="flex items-center gap-3">
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=96&h=96&fit=crop&q=80" alt="R. Kader" className="w-12 h-12 rounded-full object-cover" />
              <div>
                <p className="font-bold text-slate-900 text-sm">R. Kader</p>
                <p className="text-xs text-slate-500">Oprichter & Directeur</p>
              </div>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="relative">
            <img src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&h=600&fit=crop&q=80" alt="Constructiewerk" className="rounded-2xl shadow-2xl w-full object-cover aspect-[4/3]" />
            <div className="absolute -bottom-6 -left-6 bg-[#f97015] text-white rounded-xl px-5 py-3 shadow-lg">
              <p className="text-2xl font-black" style={{ fontFamily: 'var(--font-heading)' }}>15+</p>
              <p className="text-xs font-medium">Jaar Ervaring</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ DIENSTEN ═══ */}
      <section className="py-20 bg-slate-50" id="diensten">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#f97015] mb-3 block">Onze diensten</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>Wat wij doen</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((svc, i) => (
              <motion.a key={svc.title} href="#contact" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="group bg-white rounded-2xl p-6 border border-slate-200 hover:border-[#f97015]/40 hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-[#f97015]/10 flex items-center justify-center mb-4 group-hover:bg-[#f97015] transition-colors">
                  <svc.icon className="w-6 h-6 text-[#f97015] group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2" style={{ fontFamily: 'var(--font-heading)' }}>{svc.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{svc.desc}</p>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CERTIFICATIONS ═══ */}
      <section className="py-10 border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {certifications.map((c, i) => (
              <motion.div key={c.label} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="flex items-center gap-3 bg-slate-50 rounded-xl px-4 py-3 border border-slate-200">
                <div className="w-10 h-10 rounded-lg bg-[#f97015]/10 flex items-center justify-center flex-shrink-0">
                  <Shield className="w-5 h-5 text-[#f97015]" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">{c.label}</p>
                  <p className="text-[11px] text-slate-500">{c.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PROCESS ═══ */}
      <section className="py-20 lg:py-28" id="werkwijze">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#f97015] mb-3 block">Werkwijze</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>Van offerte tot oplevering</h2>
          </div>
          <div className="relative">
            <div className="hidden md:block absolute top-8 left-[10%] right-[10%] h-0.5 bg-slate-200" />
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              {processSteps.map((step, i) => (
                <motion.div key={step.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="text-center relative">
                  <div className="w-16 h-16 rounded-full bg-white border-2 border-[#f97015] flex items-center justify-center mx-auto mb-3 text-2xl relative z-10 shadow-sm">
                    {step.icon}
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm" style={{ fontFamily: 'var(--font-heading)' }}>{step.title}</h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">{step.desc}</p>
                  <span className="inline-block mt-2 px-2 py-0.5 bg-[#f97015]/10 text-[#f97015] text-[10px] font-bold rounded-full">{step.days}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ PROJECTEN ═══ */}
      <section className="py-20 lg:py-28 bg-slate-50" id="projecten">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#f97015] mb-3 block">Portfolio</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>Recente projecten</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {projectFilters.map(f => (
              <button key={f} onClick={() => setProjectFilter(f)}
                className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${projectFilter === f ? 'bg-[#f97015] text-white shadow-lg shadow-orange-500/20' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'}`}>
                {f}
              </button>
            ))}
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
            {filteredProjects.map((p, i) => (
              <motion.div key={p.title} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ delay: i * 0.08 }}
                className="group relative rounded-2xl overflow-hidden cursor-pointer">
                <div className="aspect-[3/2] overflow-hidden">
                  <img src={p.img} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity" />
                {/* Hover overlay with details */}
                <div className="absolute inset-0 flex flex-col justify-end p-5">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#f97015]">{p.cat}</span>
                  <h3 className="text-lg font-bold text-white mt-1" style={{ fontFamily: 'var(--font-heading)' }}>{p.title}</h3>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-xs text-slate-300">
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{p.location}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{p.duration}</span>
                  </div>
                  <div className="mt-2 overflow-hidden">
                    <motion.div initial={{ y: 20, opacity: 0 }} whileHover={{ y: 0, opacity: 1 }} className="flex items-center justify-between">
                      <span className="text-sm font-bold text-[#f97015]">{p.value}</span>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ═══ TESTIMONIALS ═══ */}
      <TestimonialsSlider testimonials={kaderbouwTestimonials} accentColor="#f97015" subtitle="Klantervaringen" title="Wat onze opdrachtgevers zeggen" />

      {/* ═══ CONTACT ═══ */}
      <section className="py-20" id="contact">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#f97015] mb-3 block">Contact</span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-6" style={{ fontFamily: 'var(--font-heading)' }}>Neem contact op</h2>
              <p className="text-slate-600 mb-8 leading-relaxed">Heeft u een bouwproject in gedachten? Neem vrijblijvend contact op voor een offerte of adviesgesprek.</p>
              <div className="space-y-4">
                <a href="tel:+5978523456" className="flex items-center gap-4 text-slate-700 hover:text-[#f97015] transition-colors group">
                  <div className="w-10 h-10 rounded-xl bg-[#f97015]/10 flex items-center justify-center group-hover:bg-[#f97015] transition-colors"><Phone className="w-5 h-5 text-[#f97015] group-hover:text-white transition-colors" /></div>
                  <span className="font-medium">+597 852 3456</span>
                </a>
                <a href="mailto:info@kaderbouw.sr" className="flex items-center gap-4 text-slate-700 hover:text-[#f97015] transition-colors group">
                  <div className="w-10 h-10 rounded-xl bg-[#f97015]/10 flex items-center justify-center group-hover:bg-[#f97015] transition-colors"><Mail className="w-5 h-5 text-[#f97015] group-hover:text-white transition-colors" /></div>
                  <span className="font-medium">info@kaderbouw.sr</span>
                </a>
                <div className="flex items-center gap-4 text-slate-700">
                  <div className="w-10 h-10 rounded-xl bg-[#f97015]/10 flex items-center justify-center"><MapPin className="w-5 h-5 text-[#f97015]" /></div>
                  <span className="font-medium">Indira Gandhiweg 72, Paramaribo</span>
                </div>
              </div>
              <div className="flex gap-3 mt-8">
                {[{ Icon: Instagram, label: 'Instagram' }, { Icon: Facebook, label: 'Facebook' }, { Icon: Linkedin, label: 'LinkedIn' }].map(({ Icon, label }) => (
                  <a key={label} href="#" aria-label={label} className="w-10 h-10 rounded-full bg-slate-200 hover:bg-[#f97015] flex items-center justify-center text-slate-600 hover:text-white transition-all"><Icon className="w-5 h-5" /></a>
                ))}
              </div>
            </div>
            <div>
              {submitted ? (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-2xl p-8 text-center border border-slate-200">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2" style={{ fontFamily: 'var(--font-heading)' }}>Offerte aanvraag ontvangen!</h3>
                  <p className="text-slate-500 mb-3">Referentienummer: <strong className="text-slate-900">{refNumber}</strong></p>
                  <p className="text-sm text-slate-400">Wij nemen binnen 24 uur contact met u op voor de volgende stappen.</p>
                </motion.div>
              ) : (
                <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                  {/* Stepper */}
                  <div className="flex items-center gap-2 mb-6">
                    {['Project', 'Gegevens'].map((label, i) => (
                      <div key={label} className="flex items-center gap-2 flex-1">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${formStep >= i ? 'bg-[#f97015] text-white' : 'bg-slate-100 text-slate-400'}`}>{i + 1}</div>
                        <span className={`text-sm font-medium ${formStep >= i ? 'text-slate-900' : 'text-slate-400'}`}>{label}</span>
                        {i < 1 && <div className={`flex-1 h-0.5 ${formStep > i ? 'bg-[#f97015]' : 'bg-slate-200'}`} />}
                      </div>
                    ))}
                  </div>

                  <AnimatePresence mode="wait">
                    {formStep === 0 && (
                      <motion.div key="step0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">Type project *</label>
                          <div className="grid grid-cols-2 gap-2">
                            {services.map(s => (
                              <button key={s.title} type="button" onClick={() => setForm(f => ({ ...f, projectType: s.title }))}
                                className={`p-3 rounded-xl border text-left text-sm font-medium transition-all ${form.projectType === s.title ? 'border-[#f97015] bg-[#f97015]/5 text-[#f97015]' : 'border-slate-200 text-slate-700 hover:border-slate-300'}`}>
                                <s.icon className="w-4 h-4 mb-1" />{s.title}
                              </button>
                            ))}
                          </div>
                          {errors.projectType && <p className="text-xs text-red-500 mt-1">{errors.projectType}</p>}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">Beschrijving *</label>
                          <textarea value={form.beschrijving} onChange={e => setForm(f => ({ ...f, beschrijving: e.target.value }))} rows={3}
                            className={`w-full rounded-xl border ${errors.beschrijving ? 'border-red-400' : 'border-slate-200'} px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#f97015]/40 focus:border-[#f97015] resize-none`}
                            placeholder="Beschrijf kort uw bouwproject..." />
                          {errors.beschrijving && <p className="text-xs text-red-500 mt-1">{errors.beschrijving}</p>}
                        </div>
                        <button type="button" onClick={handleFormNext} className="w-full py-3 bg-[#f97015] text-white font-bold rounded-xl hover:bg-orange-600 transition-colors" style={{ fontFamily: 'var(--font-heading)' }}>
                          Volgende stap <ChevronRight className="w-4 h-4 inline" />
                        </button>
                      </motion.div>
                    )}
                    {formStep === 1 && (
                      <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                        {[
                          { key: 'naam', label: 'Naam *', type: 'text', placeholder: 'Uw volledige naam' },
                          { key: 'email', label: 'E-mail *', type: 'email', placeholder: 'uw@email.com' },
                          { key: 'telefoon', label: 'Telefoon *', type: 'tel', placeholder: '+597 000 0000' },
                          { key: 'adres', label: 'Adres project', type: 'text', placeholder: 'Straat en wijk van het project' },
                        ].map(({ key, label, type, placeholder }) => (
                          <div key={key}>
                            <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
                            <input type={type} value={form[key as keyof typeof form]} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                              className={`w-full rounded-xl border ${errors[key] ? 'border-red-400' : 'border-slate-200'} px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#f97015]/40 focus:border-[#f97015]`}
                              placeholder={placeholder} />
                            {errors[key] && <p className="text-xs text-red-500 mt-1">{errors[key]}</p>}
                          </div>
                        ))}
                        <div className="flex gap-3">
                          <button type="button" onClick={() => setFormStep(0)} className="flex-1 py-3 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition-colors text-sm">Vorige</button>
                          <button type="button" onClick={handleFormNext} className="flex-[2] py-3 bg-[#f97015] text-white font-bold rounded-xl hover:bg-orange-600 transition-colors" style={{ fontFamily: 'var(--font-heading)' }}>
                            Offerte aanvragen
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="bg-slate-900 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <KaderBouwLogo size={32} />
                <span className="text-lg font-bold text-white" style={{ fontFamily: 'var(--font-heading)' }}>KaderBouw NV</span>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">15+ jaar bouwervaring in Suriname. Van nieuwbouw tot complete renovaties.</p>
            </div>
            <div>
              <h4 className="font-bold text-white text-sm mb-3" style={{ fontFamily: 'var(--font-heading)' }}>Diensten</h4>
              <div className="space-y-2">{services.map(s => <a key={s.title} href="#diensten" className="block text-sm text-slate-400 hover:text-[#f97015] transition-colors">{s.title}</a>)}</div>
            </div>
            <div>
              <h4 className="font-bold text-white text-sm mb-3" style={{ fontFamily: 'var(--font-heading)' }}>Contact</h4>
              <div className="space-y-2 text-sm text-slate-400">
                <p className="flex items-center gap-2"><Phone className="w-3.5 h-3.5" /> +597 852 3456</p>
                <p className="flex items-center gap-2"><Mail className="w-3.5 h-3.5" /> info@kaderbouw.sr</p>
                <p className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5" /> Anton Dragtenweg 72, Paramaribo</p>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-white text-sm mb-3" style={{ fontFamily: 'var(--font-heading)' }}>Volg ons</h4>
              <div className="flex gap-3 mb-4">
                {[{ Icon: Instagram, label: 'Instagram' }, { Icon: Facebook, label: 'Facebook' }, { Icon: Linkedin, label: 'LinkedIn' }].map(({ Icon, label }) => (
                  <a key={label} href="#" aria-label={label} className="w-10 h-10 rounded-full bg-slate-800 hover:bg-[#f97015] flex items-center justify-center text-slate-400 hover:text-white transition-all"><Icon className="w-4 h-4" /></a>
                ))}
              </div>
              <p className="text-xs text-slate-500">KvK: 2019-04521</p>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-sm text-slate-500">© {new Date().getFullYear()} KaderBouw NV. Alle rechten voorbehouden.</p>
            <div className="flex gap-4 text-xs text-slate-500">
              <span>Privacy</span>
              <span>Voorwaarden</span>
            </div>
          </div>
        </div>
      </footer>

      <DemoFeatures features={['Multi-step offerte formulier (2 stappen)', 'Portfolio filter + verrijkte project details', '5-stappen werkwijze tijdlijn', 'Testimonials slider met beoordelingen', 'Certificeringen & garantie-badges', 'Geanimeerde tellers (useInView)', 'WhatsApp integratie']} />
      <a href="#" className="fixed bottom-20 left-6 z-30 w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center hover:bg-[#f97015] transition-colors shadow-lg" aria-label="Naar boven"><ArrowUp className="w-4 h-4" /></a>
      <FloatingWhatsApp phone="5978523456" company="KaderBouw NV" message="Hallo, ik heb interesse in een bouwproject!" />
    </div>
  )
}

