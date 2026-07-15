'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { Phone, Mail, MapPin, Clock, Menu, X, Smile, Sparkles, Wrench, Shield, Baby, Building2, Star, ChevronDown, ChevronRight, CalendarDays, Home as HomeIcon, Users, CheckCircle2 } from 'lucide-react'
import { toast } from 'sonner'
import FloatingWhatsApp from '../_components/FloatingWhatsApp'
import DemoFeatures from '../_components/DemoFeatures'
import TestimonialsSlider from '../_components/TestimonialsSlider'

/* ─── SVG Logo ─── */
function DentaCareLogo({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="24" r="22" fill="#0ea5e9" />
      <path d="M24 12c-3 0-5.5 1.5-7 4-1.5 2.5-1.5 5.5 0 9 1.5 3.5 4 7.5 7 11 3-3.5 5.5-7.5 7-11 1.5-3.5 1.5-6.5 0-9-1.5-2.5-4-4-7-4z" fill="white" />
      <path d="M21 22h6M24 19v6" stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

const navLinks = [
  { href: '#home', label: 'Home' },
  { href: '#diensten', label: 'Diensten' },
  { href: '#team', label: 'Team' },
  { href: '#contact', label: 'Contact' },
]

const servicesList = [
  { icon: Smile, title: 'Cosmetische Tandheelkunde', desc: 'Whitening, veneers en esthetische behandelingen voor een stralende glimlach.' },
  { icon: Sparkles, title: 'Professionele Reiniging', desc: 'Dieptereiniging en polijsten door onze ervaren mondhygiënisten.' },
  { icon: Wrench, title: 'Restauratieve Zorg', desc: 'Vullingen, kronen en brugwerk met de nieuwste materialen.' },
  { icon: Shield, title: 'Preventieve Zorg', desc: 'Regelmatige controles en fluoridebehandelingen om problemen te voorkomen.' },
  { icon: Baby, title: 'Kindertandheelkunde', desc: 'Vriendelijke, geduldige zorg speciaal afgestemd op kinderen.' },
  { icon: Building2, title: 'Mondzorg op Locatie', desc: 'Bedrijfsbezoeken voor tandheelkundige screenings en voorlichting.' },
]

const team = [
  { name: 'Dr. Priya Sharma', role: 'Tandarts — Cosmetisch', img: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&q=80', experience: '12 jaar ervaring', specialization: 'Cosmetische tandheelkunde & Veneers', certification: 'ANTP Gecertificeerd' },
  { name: 'Dr. Michael Chen', role: 'Tandarts — Restauratief', img: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&q=80', experience: '9 jaar ervaring', specialization: 'Kronen, brugwerk & implantaten', certification: 'NVOI Specialist' },
  { name: 'Lisa de Vries', role: 'Mondhygiënist', img: 'https://images.unsplash.com/photo-1594824476967-48c8b964ac31?w=400&h=400&fit=crop&q=80', experience: '7 jaar ervaring', specialization: 'Preventieve zorg & Parodontologie', certification: 'NVM Geregistreerd' },
  { name: 'Anand Persaud', role: 'Tandtechnicus', img: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop&q=80', experience: '15 jaar ervaring', specialization: 'Protheses & Digitaal ontwerp', certification: 'VVRT Erkend' },
]

const insurancePartners = ['Fatum', 'Assuria', 'VVVF', 'SZF', 'Zelf betalend']
const insuranceColors: Record<string, string> = { Fatum: '#003d7a', Assuria: '#d4262c', VVVF: '#2e7d32', SZF: '#1565c0', 'Zelf betalend': '#64748b' }

const dentaTestimonials = [
  { name: 'Annesha Moeniralam', role: 'Cosmetische behandeling', text: 'Eindelijk geen angst meer voor de tandarts. Het team van DentaCare maakt je echt op je gemak. Mijn glimlach is nu mijn beste accessoire!', rating: 5, avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=96&h=96&fit=crop&q=80', date: 'Nov 2024' },
  { name: 'Bryan Tjin-A-Ton', role: 'Tanden bleken', text: 'Top resultaat bij mijn tanden bleken. In één sessie al groot verschil. Zeer professioneel en vriendelijk personeel.', rating: 5, avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=96&h=96&fit=crop&q=80', date: 'Jan 2025' },
  { name: 'Sandra de Wit', role: 'Reguliere controle', text: 'Heel vriendelijk personeel en de praktijk is super schoon en modern. Ze nemen de tijd om alles uit te leggen.', rating: 5, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=96&h=96&fit=crop&q=80', date: 'Feb 2025' },
  { name: 'Kiran Mahabier', role: 'Restauratie kroon', text: 'DentaCare is de beste investering voor je glimlach. Dr. Chen heeft fantastisch werk geleverd met mijn kroon. Ziet er heel natuurlijk uit.', rating: 5, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=96&h=96&fit=crop&q=80', date: 'Mrt 2025' },
]

const timeSlots = ['09:00', '09:30', '10:00', '10:30', '11:00', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00']
const unavailableDates = ['2026-03-30', '2026-04-02', '2026-04-05', '2026-04-09']

const faqItems = [
  { q: 'Hoe vaak moet ik naar de tandarts?', a: 'Wij adviseren minimaal twee keer per jaar een controlebezoek. Bij specifieke klachten of behandelingen kan dit vaker nodig zijn.' },
  { q: 'Accepteren jullie verzekeringen?', a: 'Ja, wij werken samen met de meeste lokale zorgverzekeraars. Neem contact op met onze receptie voor specifieke informatie over uw dekking.' },
  { q: 'Wat moet ik meenemen naar mijn eerste afspraak?', a: 'Breng een geldig ID-bewijs, uw verzekeringsgegevens en eventuele eerdere röntgenfoto\'s mee. Vul het intakeformulier van tevoren in via onze website.' },
  { q: 'Bieden jullie noodgevallenzorg?', a: 'Ja. Tijdens kantooruren kunt u direct binnenlopen voor spoedeisende hulp. Buiten kantooruren bereikt u ons via het noodnummer op onze voicemail.' },
]

const openingHours = [
  { day: 'Maandag - Vrijdag', time: '08:00 – 17:00' },
  { day: 'Zaterdag', time: '09:00 – 13:00' },
  { day: 'Zondag', time: 'Gesloten' },
]

export default function DentaCarePage() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)
  const [apptStep, setApptStep] = useState(0)
  const [selectedService, setSelectedService] = useState('')
  const [form, setForm] = useState({ naam: '', email: '', telefoon: '', datum: '', tijd: '', bericht: '' })
  const apptRef = `DC-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 9000 + 1000))}`

  // Scroll spy
  useEffect(() => {
    function onScroll() {
      const sections = ['home', 'diensten', 'team', 'contact']
      for (const id of sections.reverse()) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top < 200) {
          setActiveSection(id)
          break
        }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function handleApptNext() {
    const errs: Record<string, string> = {}
    if (apptStep === 0 && !selectedService) { toast.error('Selecteer een behandeling'); return }
    if (apptStep === 1) {
      if (!form.datum) errs.datum = 'Kies een datum'
      else if (unavailableDates.includes(form.datum)) errs.datum = 'Deze datum is niet beschikbaar'
      if (!form.tijd) errs.tijd = 'Kies een tijdslot'
    }
    if (apptStep === 2) {
      if (!form.naam.trim()) errs.naam = 'Verplicht'
      if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Geldig e-mail vereist'
    }
    if (Object.keys(errs).length > 0) { toast.error('Vul alle verplichte velden in'); return }
    if (apptStep < 3) setApptStep(apptStep + 1)
  }

  return (
    <div className="min-h-screen bg-white" id="home">
      {/* ═══ NAVBAR ═══ */}
      <nav className="sticky top-[49px] z-40 bg-white/95 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
          <a href="#home" className="flex items-center gap-2.5">
            <DentaCareLogo size={34} />
            <span className="text-lg font-bold text-slate-900" style={{ fontFamily: 'var(--font-heading)' }}>DentaCare</span>
          </a>
          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(l => (
              <a key={l.href} href={l.href}
                className={`text-sm font-medium transition-colors ${activeSection === l.href.slice(1) ? 'text-sky-500' : 'text-slate-600 hover:text-slate-900'}`}>
                {l.label}
              </a>
            ))}
            <a href="#contact" className="px-4 py-2 bg-sky-500 text-white text-sm font-bold rounded-lg hover:bg-sky-600 transition-colors">
              Afspraak maken
            </a>
          </div>
          {/* Mobile hamburger */}
          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2" aria-label="Menu">
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        <AnimatePresence>
          {mobileOpen && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="md:hidden overflow-hidden border-t border-slate-100 bg-white">
              <div className="px-6 py-4 space-y-3">
                {navLinks.map(l => (
                  <a key={l.href} href={l.href} onClick={() => setMobileOpen(false)} className="block text-sm font-medium text-slate-700 hover:text-sky-500">{l.label}</a>
                ))}
                <a href="#contact" onClick={() => setMobileOpen(false)} className="block w-full text-center px-4 py-2.5 bg-sky-500 text-white text-sm font-bold rounded-lg">Afspraak maken</a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ═══ HERO ═══ */}
      <section className="relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 py-20 lg:py-28 grid md:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-sky-50 rounded-full text-xs font-bold text-sky-600 mb-6">
              <div className="flex -space-x-2">
                {dentaTestimonials.slice(0, 4).map((t, i) => <img key={i} src={t.avatar} alt="" className="w-6 h-6 rounded-full border-2 border-sky-50 object-cover" />)}
              </div>
              200+ tevreden patiënten
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[0.95] mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
              Uw glimlach,<br /><span className="text-sky-500">onze prioriteit</span>
            </h1>
            <p className="text-lg text-slate-500 max-w-md mb-8 leading-relaxed">
              Moderne tandheelkunde in het hart van Paramaribo. Ervaren specialisten, state-of-the-art apparatuur en een warm welkom voor elk gezinslid.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="#contact" className="inline-flex items-center gap-2 px-6 py-3 bg-sky-500 text-white font-bold rounded-xl hover:bg-sky-600 transition-colors shadow-lg shadow-sky-500/20" style={{ fontFamily: 'var(--font-heading)' }}>
                <CalendarDays className="w-4 h-4" /> Maak afspraak
              </a>
              <a href="tel:+5978001234" className="inline-flex items-center gap-2 px-6 py-3 border-2 border-slate-200 text-slate-700 font-bold rounded-xl hover:border-sky-500 hover:text-sky-600 transition-colors" style={{ fontFamily: 'var(--font-heading)' }}>
                <Phone className="w-4 h-4" /> Bel ons
              </a>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.2 }} className="relative">
            <img src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&h=600&fit=crop&q=80" alt="Moderne tandartspraktijk" className="rounded-2xl shadow-2xl w-full object-cover aspect-[4/3]" />
            <div className="absolute -bottom-4 -left-4 bg-white rounded-xl px-5 py-3 shadow-lg border border-slate-100">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {team.slice(0, 3).map((t, i) => <img key={i} src={t.img} alt={t.name} className="w-8 h-8 rounded-full border-2 border-white object-cover" />)}
                </div>
                <div><p className="text-xs font-bold text-slate-900">4 Specialisten</p><p className="text-[10px] text-slate-500">Altijd beschikbaar</p></div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ DIENSTEN ═══ */}
      <section className="py-20 bg-slate-50" id="diensten">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-sky-500 mb-3 block">Diensten</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>Onze specialisaties</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {servicesList.map((svc, i) => (
              <motion.a key={svc.title} href="#contact" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="group bg-white rounded-2xl p-6 border border-slate-200 hover:border-sky-300 hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-sky-50 flex items-center justify-center mb-4 group-hover:bg-sky-500 transition-colors">
                  <svc.icon className="w-6 h-6 text-sky-500 group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2" style={{ fontFamily: 'var(--font-heading)' }}>{svc.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{svc.desc}</p>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TESTIMONIALS ═══ */}
      <TestimonialsSlider testimonials={dentaTestimonials} accentColor="#0ea5e9" subtitle="Patiëntervaringen" title="Wat onze patiënten zeggen" />

      {/* ═══ INSURANCE PARTNERS ═══ */}
      <section className="py-10 border-y border-slate-100">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-slate-400 text-center mb-6">Wij werken samen met</p>
          <div className="flex flex-wrap justify-center gap-3">
            {insurancePartners.map(p => (
              <span key={p} className="px-4 py-2 rounded-full text-sm font-bold border" style={{ borderColor: insuranceColors[p] + '40', color: insuranceColors[p], backgroundColor: insuranceColors[p] + '08' }}>{p}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TEAM ═══ */}
      <section className="py-20 lg:py-28" id="team">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-sky-500 mb-3 block">Ons team</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>Maak kennis met onze specialisten</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((t, i) => (
              <motion.div key={t.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="group bg-white rounded-2xl overflow-hidden border border-slate-200 hover:shadow-lg transition-all">
                <div className="aspect-square overflow-hidden relative">
                  <img src={t.img} alt={t.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                  {/* Hover overlay with details */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                    <p className="text-xs text-sky-400 font-bold">{t.experience}</p>
                    <p className="text-xs text-slate-300 mt-1">{t.specialization}</p>
                    <span className="inline-flex items-center gap-1 mt-2 px-2 py-0.5 bg-sky-500/20 text-sky-300 text-[10px] font-bold rounded-full w-fit"><CheckCircle2 className="w-3 h-3" />{t.certification}</span>
                  </div>
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-bold text-slate-900" style={{ fontFamily: 'var(--font-heading)' }}>{t.name}</h3>
                  <p className="text-sm text-sky-500 font-medium">{t.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-sky-500 mb-3 block">FAQ</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>Veelgestelde vragen</h2>
          </div>
          <div className="space-y-3">
            {faqItems.map((item, i) => (
              <div key={i} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                <button onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left text-sm font-bold text-slate-900 hover:text-sky-600 transition-colors">
                  {item.q}
                  <motion.div animate={{ rotate: expandedFaq === i ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {expandedFaq === i && (
                    <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
                      <p className="px-5 pb-5 text-sm text-slate-500 leading-relaxed">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CONTACT / APPOINTMENT ═══ */}
      <section className="py-20 lg:py-28" id="contact">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12">
          {/* Left: Info */}
          <div>
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-sky-500 mb-3 block">Afspraak</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-6" style={{ fontFamily: 'var(--font-heading)' }}>Plan uw bezoek</h2>
            <p className="text-slate-500 mb-8 leading-relaxed">Selecteer uw behandeling, kies een datum en tijd, en wij bevestigen uw afspraak binnen 2 uur.</p>
            <div className="space-y-4 mb-8">
              <a href="tel:+5978001234" className="flex items-center gap-4 text-slate-700 hover:text-sky-500 transition-colors group">
                <div className="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center group-hover:bg-sky-500 transition-colors"><Phone className="w-5 h-5 text-sky-500 group-hover:text-white transition-colors" /></div>
                <span className="font-medium">+597 800 1234</span>
              </a>
              <a href="mailto:info@dentacare.sr" className="flex items-center gap-4 text-slate-700 hover:text-sky-500 transition-colors group">
                <div className="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center group-hover:bg-sky-500 transition-colors"><Mail className="w-5 h-5 text-sky-500 group-hover:text-white transition-colors" /></div>
                <span className="font-medium">info@dentacare.sr</span>
              </a>
              <div className="flex items-center gap-4 text-slate-700">
                <div className="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center"><MapPin className="w-5 h-5 text-sky-500" /></div>
                <span className="font-medium">Watermolenstraat 45, Paramaribo</span>
              </div>
            </div>
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
              <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2" style={{ fontFamily: 'var(--font-heading)' }}><Clock className="w-4 h-4 text-sky-500" /> Openingstijden</h3>
              {openingHours.map(h => (
                <div key={h.day} className="flex justify-between text-sm py-1.5 border-b border-slate-100 last:border-0">
                  <span className="text-slate-600">{h.day}</span>
                  <span className={`font-medium ${h.time === 'Gesloten' ? 'text-red-400' : 'text-slate-900'}`}>{h.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Multi-step wizard */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            {/* Step indicators */}
            <div className="flex border-b border-slate-100">
              {['Behandeling', 'Datum & Tijd', 'Gegevens', 'Bevestiging'].map((label, i) => (
                <div key={label} className={`flex-1 py-3 text-center text-xs font-bold transition-colors ${i < apptStep ? 'bg-emerald-50 text-emerald-600' : i === apptStep ? 'bg-sky-50 text-sky-600' : 'text-slate-400'}`}>
                  <span className={`inline-flex items-center justify-center w-5 h-5 rounded-full text-[10px] mr-1 ${i < apptStep ? 'bg-emerald-500 text-white' : i === apptStep ? 'bg-sky-500 text-white' : 'bg-slate-200 text-slate-500'}`}>{i < apptStep ? '✓' : i + 1}</span>
                  <span className="hidden sm:inline">{label}</span>
                </div>
              ))}
            </div>

            <div className="p-6">
              <AnimatePresence mode="wait">
                {/* Step 0: Select service */}
                {apptStep === 0 && (
                  <motion.div key="step0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                    <h3 className="text-lg font-bold text-slate-900 mb-1" style={{ fontFamily: 'var(--font-heading)' }}>Kies uw behandeling</h3>
                    <p className="text-sm text-slate-500 mb-4">Selecteer de gewenste behandeling</p>
                    <div className="grid grid-cols-2 gap-2">
                      {servicesList.map(svc => (
                        <button key={svc.title} type="button" onClick={() => { setSelectedService(svc.title); handleApptNext() }}
                          className={`text-left p-3 rounded-xl border-2 transition-all hover:border-sky-300 ${selectedService === svc.title ? 'border-sky-500 bg-sky-50' : 'border-slate-200'}`}>
                          <svc.icon className="w-5 h-5 text-sky-500 mb-1" />
                          <p className="text-sm font-bold text-slate-900">{svc.title}</p>
                          <p className="text-xs text-slate-400 line-clamp-1">{svc.desc}</p>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Step 1: Date & Time */}
                {apptStep === 1 && (
                  <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                    <h3 className="text-lg font-bold text-slate-900 mb-1" style={{ fontFamily: 'var(--font-heading)' }}>Kies datum & tijd</h3>
                    <p className="text-sm text-slate-500 mb-4">Behandeling: <span className="font-bold text-sky-600">{selectedService}</span></p>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-slate-700 mb-1">Datum</label>
                      <input type="date" value={form.datum} onChange={e => setForm(f => ({ ...f, datum: e.target.value }))}
                        className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:border-sky-500" />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-slate-700 mb-2">Beschikbare tijden</label>
                      <div className="grid grid-cols-4 gap-2">
                        {['08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'].map(t => {
                          const unavailable = ['10:00', '13:30', '15:00'].includes(t)
                          return (
                            <button key={t} type="button" disabled={unavailable}
                              onClick={() => setForm(f => ({ ...f, tijd: t }))}
                              className={`py-2 rounded-lg text-xs font-bold transition-all ${unavailable ? 'bg-slate-100 text-slate-300 cursor-not-allowed line-through' : form.tijd === t ? 'bg-sky-500 text-white' : 'bg-slate-50 text-slate-700 hover:bg-sky-100'}`}>
                              {t}
                            </button>
                          )
                        })}
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <button type="button" onClick={() => setApptStep(0)} className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-bold text-slate-600 hover:bg-slate-50">Terug</button>
                      <button type="button" onClick={handleApptNext} className="flex-1 py-2.5 bg-sky-500 text-white font-bold rounded-xl hover:bg-sky-600 transition-colors text-sm">Volgende</button>
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Personal details */}
                {apptStep === 2 && (
                  <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                    <h3 className="text-lg font-bold text-slate-900 mb-1" style={{ fontFamily: 'var(--font-heading)' }}>Uw gegevens</h3>
                    <p className="text-sm text-slate-500 mb-4">{selectedService} — {form.datum} om {form.tijd}</p>
                    <div className="space-y-3">
                      {[
                        { key: 'naam', label: 'Volledige naam', type: 'text', ph: 'Jan de Vries' },
                        { key: 'email', label: 'E-mailadres', type: 'email', ph: 'jan@email.com' },
                        { key: 'telefoon', label: 'Telefoonnummer', type: 'tel', ph: '+597 000 0000' },
                      ].map(({ key, label, type, ph }) => (
                        <div key={key}>
                          <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
                          <input type={type} value={form[key as keyof typeof form]} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                            className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:border-sky-500" placeholder={ph} />
                        </div>
                      ))}
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Opmerking (optioneel)</label>
                        <textarea value={form.bericht} onChange={e => setForm(f => ({ ...f, bericht: e.target.value }))} rows={2}
                          className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:border-sky-500 resize-none" placeholder="Bijv. allergieën, bijzonderheden..." />
                      </div>
                    </div>
                    <div className="flex gap-3 mt-4">
                      <button type="button" onClick={() => setApptStep(1)} className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-bold text-slate-600 hover:bg-slate-50">Terug</button>
                      <button type="button" onClick={handleApptNext} className="flex-1 py-2.5 bg-sky-500 text-white font-bold rounded-xl hover:bg-sky-600 transition-colors text-sm">Bevestigen</button>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Confirmation */}
                {apptStep === 3 && (
                  <motion.div key="step3" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-4">
                    <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2" style={{ fontFamily: 'var(--font-heading)' }}>Afspraak bevestigd!</h3>
                    <p className="text-sm text-slate-500 mb-4">Referentienummer: <span className="font-mono font-bold text-sky-600">DC-2025-{String(Math.floor(1000 + Math.random() * 9000))}</span></p>
                    <div className="bg-slate-50 rounded-xl p-4 text-left text-sm space-y-2 mb-4">
                      <div className="flex justify-between"><span className="text-slate-500">Behandeling</span><span className="font-bold text-slate-900">{selectedService}</span></div>
                      <div className="flex justify-between"><span className="text-slate-500">Datum</span><span className="font-bold text-slate-900">{form.datum}</span></div>
                      <div className="flex justify-between"><span className="text-slate-500">Tijd</span><span className="font-bold text-slate-900">{form.tijd}</span></div>
                      <div className="flex justify-between"><span className="text-slate-500">Patiënt</span><span className="font-bold text-slate-900">{form.naam}</span></div>
                    </div>
                    <p className="text-xs text-slate-400">U ontvangt een bevestiging per e-mail op {form.email}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="bg-slate-900 py-16 pb-28 md:pb-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-10 mb-10">
            {/* Brand */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-2.5 mb-4">
                <DentaCareLogo size={28} />
                <span className="text-lg font-bold text-white" style={{ fontFamily: 'var(--font-heading)' }}>DentaCare</span>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed mb-4">Uw vertrouwde tandartspraktijk in Paramaribo. Moderne zorg met een persoonlijke aanpak.</p>
              <div className="flex gap-3">
                {[
                  { label: 'Instagram', path: 'M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm4.25 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm5.25-2.25a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z' },
                  { label: 'Facebook', path: 'M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z' },
                  { label: 'WhatsApp', path: 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z' },
                ].map(s => (
                  <a key={s.label} href="#" aria-label={s.label} className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-sky-500 flex items-center justify-center transition-colors">
                    <svg className="w-4 h-4 text-slate-400 hover:text-white" fill="currentColor" viewBox="0 0 24 24"><path d={s.path} /></svg>
                  </a>
                ))}
              </div>
            </div>
            {/* Quick links */}
            <div>
              <h4 className="font-bold text-white mb-4 text-sm" style={{ fontFamily: 'var(--font-heading)' }}>Navigatie</h4>
              <nav className="space-y-2">
                {navLinks.map(l => <a key={l.href} href={l.href} className="block text-sm text-slate-400 hover:text-white transition-colors">{l.label}</a>)}
              </nav>
            </div>
            {/* Contact */}
            <div>
              <h4 className="font-bold text-white mb-4 text-sm" style={{ fontFamily: 'var(--font-heading)' }}>Contact</h4>
              <div className="space-y-2 text-sm text-slate-400">
                <p>Watermolenstraat 45</p>
                <p>Paramaribo, Suriname</p>
                <p className="mt-3">+597 800 1234</p>
                <p>info@dentacare.sr</p>
              </div>
            </div>
            {/* Hours */}
            <div>
              <h4 className="font-bold text-white mb-4 text-sm" style={{ fontFamily: 'var(--font-heading)' }}>Openingstijden</h4>
              <div className="space-y-1.5 text-sm">
                {openingHours.map(h => (
                  <div key={h.day} className="flex justify-between">
                    <span className="text-slate-500">{h.day}</span>
                    <span className={h.time === 'Gesloten' ? 'text-red-400' : 'text-slate-300'}>{h.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-6 flex flex-col md:flex-row justify-between items-center gap-3">
            <p className="text-xs text-slate-500">© 2025 DentaCare Paramaribo. Alle rechten voorbehouden.</p>
            <p className="text-xs text-slate-600">KvK: 98765432 | BIG-registratie</p>
          </div>
        </div>
      </footer>

      {/* ═══ MOBILE BOTTOM NAV ═══ */}
      <nav className="fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur border-t border-slate-200 md:hidden z-50">
        <div className="flex justify-around py-2">
          {[
            { icon: HomeIcon, label: 'Home', href: '#home' },
            { icon: Sparkles, label: 'Diensten', href: '#diensten' },
            { icon: Users, label: 'Team', href: '#team' },
            { icon: CalendarDays, label: 'Afspraak', href: '#contact' },
          ].map(n => (
            <a key={n.label} href={n.href} className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-lg transition-colors ${activeSection === n.href.slice(1) ? 'text-sky-500' : 'text-slate-400'}`}>
              <n.icon className="w-5 h-5" />
              <span className="text-[10px] font-bold">{n.label}</span>
            </a>
          ))}
        </div>
      </nav>

      <DemoFeatures features={['Multi-step afspraakwizard (4 stappen)', 'Scroll-spy navigatie + mobiele bottom nav', 'Verzekeringpartners integratie', 'Team hover details (specialisatie, ervaring)', 'Patiënt testimonials slider', 'FAQ accordion (AnimatePresence)', 'WhatsApp integratie']} />
      <FloatingWhatsApp phone="5978001234" company="DentaCare Paramaribo" message="Hallo, ik wil graag een afspraak maken!" />
    </div>
  )
}

