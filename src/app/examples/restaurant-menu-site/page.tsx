'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Clock, MapPin, Phone, Utensils, Leaf, Flame, Fish, IceCreamCone, Star, Users, CalendarDays, ChevronDown, ChevronUp, Home as HomeIcon, Timer, Wheat, Milk, NutOff } from 'lucide-react'
import { toast } from 'sonner'
import FloatingWhatsApp from '../_components/FloatingWhatsApp'
import DemoFeatures from '../_components/DemoFeatures'
import TestimonialsSlider from '../_components/TestimonialsSlider'

/* ─── Logo ─── */
function WarungLogo({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="24" r="22" fill="#15803d" />
      <path d="M24 12C18 18 14 26 24 36C34 26 30 18 24 12Z" fill="white" opacity="0.9" />
      <ellipse cx="24" cy="34" rx="8" ry="3" fill="white" opacity="0.3" />
    </svg>
  )
}

type MenuItem = { name: string; desc: string; price: string; img: string; spicy?: boolean; vegan?: boolean; popular?: boolean; prepTime?: string; allergens?: string[] }

const menuCategories: Record<string, MenuItem[]> = {
  'Hoofdgerechten': [
    { name: 'Nasi Goreng Special', desc: 'Gebakken rijst met kip, garnalen, ei, atjar en sambal.', price: 'SRD 85', img: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&h=300&fit=crop&q=80', spicy: true, popular: true, prepTime: '20 min', allergens: ['gluten', 'ei'] },
    { name: 'Roti Kip Masala', desc: 'Zachte roti met langzaam gegaarde kip in masala saus, kousenband en aardappel.', price: 'SRD 95', img: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=300&fit=crop&q=80', popular: true, prepTime: '25 min', allergens: ['gluten'] },
    { name: 'Bami Goreng', desc: 'Gebakken noedels met groenten, kip en zoete sojasaus.', price: 'SRD 80', img: 'https://images.unsplash.com/photo-1569058242567-93de6f36f8eb?w=400&h=300&fit=crop&q=80', prepTime: '18 min', allergens: ['gluten', 'soja'] },
    { name: 'Moksi Alesi', desc: 'Gemengde rijst met pom, kip, zoutvlees en bakkeljauw.', price: 'SRD 105', img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop&q=80', popular: true, prepTime: '30 min', allergens: ['vis'] },
  ],
  'Vis & Seafood': [
    { name: 'Pom Vis', desc: 'Oven-gebakken pomtayer met verse vis en kruiden.', price: 'SRD 110', img: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop&q=80', prepTime: '35 min', allergens: ['vis'] },
    { name: 'Garnalen Curry', desc: 'Rijke kokos curry met jumbo garnalen en rijst.', price: 'SRD 125', img: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=400&h=300&fit=crop&q=80', spicy: true, prepTime: '25 min', allergens: ['schaaldieren', 'melk'] },
    { name: 'Gegrilde Tilapia', desc: 'Hele tilapia met citroen, knoflook en verse kruiden.', price: 'SRD 115', img: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400&h=300&fit=crop&q=80', prepTime: '30 min', allergens: ['vis'] },
  ],
  'Vegetarisch': [
    { name: 'Roti Daal', desc: 'Roti met daal, aardappel, kousenband en aubergine.', price: 'SRD 70', img: 'https://images.unsplash.com/photo-1606491956689-2ea866880049?w=400&h=300&fit=crop&q=80', vegan: true, prepTime: '20 min', allergens: ['gluten'] },
    { name: 'Bami Veggie', desc: 'Bami goreng met tofu, paksoi en shiitake.', price: 'SRD 75', img: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=400&h=300&fit=crop&q=80', vegan: true, prepTime: '15 min', allergens: ['gluten', 'soja'] },
    { name: 'Groente Tempeh Bowl', desc: 'Rijst met tempeh, atjar, sambal en verse groenten.', price: 'SRD 65', img: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop&q=80', vegan: true, prepTime: '15 min', allergens: ['soja'] },
  ],
  'Dranken': [
    { name: 'Dawet', desc: 'Traditionele kokos ijsdrank met pandan en bruine suiker.', price: 'SRD 25', img: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&h=300&fit=crop&q=80', prepTime: '5 min', allergens: ['melk'] },
    { name: 'Vers Fruit Smoothie', desc: 'Mix van mango, passievrucht en sinaasappel.', price: 'SRD 30', img: 'https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=400&h=300&fit=crop&q=80', vegan: true, prepTime: '5 min' },
    { name: 'Gember Limonade', desc: 'Huisgemaakte gember limo met honing en limoen.', price: 'SRD 20', img: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400&h=300&fit=crop&q=80', prepTime: '3 min' },
    { name: 'IJskoffie', desc: 'Koud gebrouwen koffie met gecondenseerde melk en ijs.', price: 'SRD 28', img: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=300&fit=crop&q=80', prepTime: '5 min', allergens: ['melk'] },
  ],
  'Desserts': [
    { name: 'Fiadu', desc: 'Traditioneel Surinaams koekje met kaas en jam.', price: 'SRD 15', img: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&h=300&fit=crop&q=80', prepTime: '10 min', allergens: ['gluten', 'melk', 'ei'] },
    { name: 'Kokos Taart', desc: 'Huisgemaakte kokos taart met pecannoten.', price: 'SRD 35', img: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop&q=80', popular: true, prepTime: '10 min', allergens: ['noten', 'melk', 'ei'] },
  ],
}

const categoryIcons: Record<string, React.ReactNode> = {
  'Hoofdgerechten': <Utensils className="w-4 h-4" />,
  'Vis & Seafood': <Fish className="w-4 h-4" />,
  'Vegetarisch': <Leaf className="w-4 h-4" />,
  'Dranken': <IceCreamCone className="w-4 h-4" />,
  'Desserts': <Star className="w-4 h-4" />,
}

const allergenIcons: Record<string, { icon: React.ReactNode; color: string }> = {
  'gluten': { icon: <Wheat className="w-3 h-3" />, color: 'bg-amber-50 text-amber-600' },
  'melk': { icon: <Milk className="w-3 h-3" />, color: 'bg-blue-50 text-blue-600' },
  'ei': { icon: <span className="text-[10px]">🥚</span>, color: 'bg-yellow-50 text-yellow-700' },
  'noten': { icon: <NutOff className="w-3 h-3" />, color: 'bg-orange-50 text-orange-600' },
  'vis': { icon: <Fish className="w-3 h-3" />, color: 'bg-cyan-50 text-cyan-600' },
  'schaaldieren': { icon: <span className="text-[10px]">🦐</span>, color: 'bg-pink-50 text-pink-600' },
  'soja': { icon: <span className="text-[10px]">🫘</span>, color: 'bg-emerald-50 text-emerald-600' },
}

const todaysSpecials = [
  { name: 'Pom Vis', originalPrice: 'SRD 110', specialPrice: 'SRD 89', desc: 'Verse vangst van de dag!' },
  { name: 'Kokos Taart', originalPrice: 'SRD 35', specialPrice: 'SRD 25', desc: 'Vers gebakken vandaag' },
]

const atmosphereImages = [
  { src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=400&fit=crop&q=80', alt: 'Restaurant interieur' },
  { src: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=400&fit=crop&q=80', alt: 'Gerecht presentatie' },
  { src: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&h=400&fit=crop&q=80', alt: 'Terras sfeer' },
  { src: 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=600&h=400&fit=crop&q=80', alt: 'Open keuken' },
]

const restaurantTestimonials = [
  { name: 'Priya Kanhai', role: 'Google review', text: 'Beste roti in Paramaribo! De masala saus is ongeëvenaard. We komen hier al 3 jaar elke vrijdag.', rating: 5, avatar: 'PK', date: '2 weken geleden' },
  { name: 'Marco Tjin-A-Djie', role: 'Tripadvisor', text: 'Fantastische sfeer en heerlijk eten. De nasi goreng special is een must-try. Porties zijn royaal.', rating: 5, avatar: 'MT', date: '1 maand geleden' },
  { name: 'Anisha Soekhram', role: 'Google review', text: 'De garnalen curry was uitstekend, heel smaakvol. Bediening kan soms wat langzaam zijn bij drukte.', rating: 4, avatar: 'AS', date: '3 weken geleden' },
  { name: 'Dave Esajas', role: 'Stamgast', text: 'Al 5 jaar vaste klant. De moksi alesi is echt authentiek, net zoals mijn oma het maakte. Top!', rating: 5, avatar: 'DE', date: '1 week geleden' },
]

function isOpen(): boolean {
  const now = new Date()
  const hour = now.getHours()
  const day = now.getDay()
  if (day === 0) return false
  return hour >= 11 && hour < 22
}

export default function WarungIndahPage() {
  const [activeCategory, setActiveCategory] = useState('Hoofdgerechten')
  const [expandedItem, setExpandedItem] = useState<string | null>(null)
  const cats = Object.keys(menuCategories)

  /* ─── Multi-step reservation ─── */
  const [resStep, setResStep] = useState(0)
  const [form, setForm] = useState({ naam: '', email: '', telefoon: '', datum: '', tijd: '', gasten: '2', opmerking: '' })
  const resRef = useRef<HTMLDivElement>(null)

  const handleResNext = () => {
    if (resStep === 0) {
      if (!form.datum || !form.tijd) { toast.error('Kies een datum en tijd'); return }
      setResStep(1)
    } else if (resStep === 1) {
      if (!form.naam.trim() || !form.email.includes('@') || !form.telefoon.trim()) { toast.error('Vul alle velden correct in'); return }
      setResStep(2)
      toast.success('Reservering bevestigd!', { description: `Tafel voor ${form.gasten} op ${form.datum} om ${form.tijd}` })
    }
  }

  const open = isOpen()

  return (
    <div className="min-h-screen bg-stone-50">
      {/* ═══ HERO ═══ */}
      <section className="relative h-[80vh] min-h-[480px] flex items-end" id="home">
        <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1400&h=700&fit=crop&q=80" alt="Warung Indah restaurant interieur" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/40 to-transparent" />
        <div className="relative z-10 max-w-6xl mx-auto px-6 pb-12 w-full">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="flex items-center gap-3 mb-4">
              <WarungLogo size={44} />
              <span className="text-2xl font-bold text-white" style={{ fontFamily: 'var(--font-heading)' }}>Warung Indah</span>
              <span className={`ml-3 px-3 py-1 rounded-full text-xs font-bold ${open ? 'bg-green-500/90 text-white' : 'bg-red-500/90 text-white'}`}>
                {open ? '🟢 Nu open' : '🔴 Gesloten'}
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[0.95] max-w-2xl mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
              Authentieke Surinaamse keuken
            </h1>
            <p className="text-base text-stone-300 max-w-md mb-3">
              De beste roti, nasi en meer. Traditionele recepten met verse lokale ingrediënten, bereid met liefde.
            </p>
            {/* Social proof */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex -space-x-2">
                {['🧔', '👩', '👨', '👩‍🦱'].map((e, i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-stone-700 border-2 border-stone-900 flex items-center justify-center text-sm">{e}</div>
                ))}
              </div>
              <div className="flex items-center gap-1">
                {[1,2,3,4,5].map(i => <svg key={i} className="w-3.5 h-3.5 text-amber-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>)}
                <span className="text-sm text-stone-300 ml-1">4.8 · 340+ reviews</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <a href="#menu" className="px-5 py-3 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition-colors text-sm" style={{ fontFamily: 'var(--font-heading)' }}>
                <Utensils className="w-4 h-4 inline mr-2" />Bekijk menu
              </a>
              <a href="#reserveren" className="px-5 py-3 bg-white/10 backdrop-blur text-white font-bold rounded-xl hover:bg-white/20 transition-colors text-sm border border-white/20" style={{ fontFamily: 'var(--font-heading)' }}>
                <CalendarDays className="w-4 h-4 inline mr-2" />Reserveren
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ INFO BAR ═══ */}
      <section className="bg-green-700 text-white">
        <div className="max-w-6xl mx-auto px-6 py-4 flex flex-wrap items-center justify-between gap-4 text-sm">
          <div className="flex items-center gap-2"><MapPin className="w-4 h-4" /> Waterkant 42, Paramaribo</div>
          <div className="flex items-center gap-2"><Phone className="w-4 h-4" /> +597 455-1234</div>
          <div className="flex items-center gap-2"><Clock className="w-4 h-4" /> Ma-Za 11:00 – 22:00 · Zo gesloten</div>
          <div className="flex items-center gap-2"><Users className="w-4 h-4" /> Dine-in · Afhalen · Bezorging</div>
        </div>
      </section>

      {/* ═══ TODAY'S SPECIALS ═══ */}
      <section className="py-6 bg-amber-50 border-b border-amber-200">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-3">
            <span className="px-3 py-1 bg-amber-500 text-white text-xs font-bold rounded-full animate-pulse">🔥 Vandaag</span>
            <h3 className="text-sm font-bold text-stone-800" style={{ fontFamily: 'var(--font-heading)' }}>Dagspecials</h3>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {todaysSpecials.map(s => (
              <div key={s.name} className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 border border-amber-200 min-w-[260px] flex-shrink-0">
                <div>
                  <p className="font-bold text-stone-900 text-sm">{s.name}</p>
                  <p className="text-xs text-stone-500">{s.desc}</p>
                </div>
                <div className="ml-auto text-right flex-shrink-0">
                  <p className="text-xs text-stone-400 line-through">{s.originalPrice}</p>
                  <p className="text-sm font-black text-green-700">{s.specialPrice}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ MENU ═══ */}
      <section className="py-16 lg:py-24" id="menu">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-10">
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-green-600 mb-3 block">Menu</span>
            <h2 className="text-3xl md:text-4xl font-bold text-stone-900 tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>Ons menu</h2>
            <p className="text-stone-500 mt-2 max-w-lg mx-auto">Alle gerechten worden vers bereid met lokale ingrediënten. Bekijk allergenen per gerecht.</p>
          </div>

          {/* Category tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-10 sticky top-14 z-20 bg-stone-50/90 backdrop-blur py-3 rounded-xl">
            {cats.map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all ${activeCategory === cat ? 'bg-green-600 text-white shadow-lg shadow-green-600/20' : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'}`}>
                {categoryIcons[cat]} {cat}
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${activeCategory === cat ? 'bg-white/20' : 'bg-stone-100'}`}>{menuCategories[cat].length}</span>
              </button>
            ))}
          </div>

          {/* Items */}
          <AnimatePresence mode="wait">
            <motion.div key={activeCategory} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }}
              className="grid sm:grid-cols-2 gap-4">
              {menuCategories[activeCategory].map(item => {
                const isExpanded = expandedItem === item.name
                return (
                  <motion.div key={item.name} layout
                    className="bg-white rounded-2xl overflow-hidden border border-stone-200 hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => setExpandedItem(isExpanded ? null : item.name)}>
                    <div className="flex gap-0">
                      <div className="relative w-28 h-28 sm:w-36 sm:h-36 flex-shrink-0">
                        <img src={item.img} alt={item.name} className="w-full h-full object-cover" loading="lazy" />
                        {item.prepTime && (
                          <span className="absolute bottom-1 left-1 px-1.5 py-0.5 bg-black/60 text-white text-[10px] font-bold rounded flex items-center gap-1">
                            <Timer className="w-2.5 h-2.5" />{item.prepTime}
                          </span>
                        )}
                      </div>
                      <div className="flex-1 p-4 flex flex-col justify-center min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <h3 className="font-bold text-stone-900 text-base" style={{ fontFamily: 'var(--font-heading)' }}>{item.name}</h3>
                              {item.popular && <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-[10px] font-bold rounded-full">Populair</span>}
                              {item.spicy && <Flame className="w-3.5 h-3.5 text-red-500" />}
                              {item.vegan && <Leaf className="w-3.5 h-3.5 text-green-500" />}
                            </div>
                            <p className="text-sm text-stone-500 mt-1 line-clamp-2">{item.desc}</p>
                          </div>
                          <span className="font-bold text-green-700 text-sm whitespace-nowrap">{item.price}</span>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-stone-400">{isExpanded ? 'Minder tonen' : 'Meer info'}</span>
                          {isExpanded ? <ChevronUp className="w-4 h-4 text-stone-400" /> : <ChevronDown className="w-4 h-4 text-stone-400" />}
                        </div>
                      </div>
                    </div>
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                          <div className="px-4 pb-4 pt-2 border-t border-stone-100">
                            <p className="text-sm text-stone-600 mb-3">{item.desc}</p>
                            <div className="flex flex-wrap gap-1.5 mb-2">
                              {item.spicy && <span className="px-2 py-1 bg-red-50 text-red-600 text-xs font-medium rounded">🌶 Pittig</span>}
                              {item.vegan && <span className="px-2 py-1 bg-green-50 text-green-600 text-xs font-medium rounded">🌱 Veganistisch</span>}
                              {item.popular && <span className="px-2 py-1 bg-amber-50 text-amber-600 text-xs font-medium rounded">⭐ Aanrader</span>}
                            </div>
                            {item.allergens && item.allergens.length > 0 && (
                              <div className="mt-2">
                                <p className="text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-1">Allergenen</p>
                                <div className="flex flex-wrap gap-1">
                                  {item.allergens.map(a => {
                                    const info = allergenIcons[a]
                                    return info ? (
                                      <span key={a} className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium ${info.color}`}>
                                        {info.icon} {a}
                                      </span>
                                    ) : null
                                  })}
                                </div>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ═══ ATMOSPHERE GALLERY ═══ */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-8">
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-green-600 mb-3 block">Sfeer</span>
            <h2 className="text-3xl md:text-4xl font-bold text-stone-900 tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>Proef de sfeer</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {atmosphereImages.map((img, i) => (
              <motion.div key={img.alt} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className={`rounded-2xl overflow-hidden ${i === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}>
                <img src={img.src} alt={img.alt} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500 aspect-square" loading="lazy" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TESTIMONIALS ═══ */}
      <TestimonialsSlider testimonials={restaurantTestimonials} accentColor="#15803d" subtitle="Beoordelingen" title="Wat onze gasten zeggen" />

      {/* ═══ RESERVATION ═══ */}
      <section className="py-16 bg-white" id="reserveren" ref={resRef}>
        <div className="max-w-4xl mx-auto px-6 grid md:grid-cols-2 gap-12">
          <div>
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-green-600 mb-3 block">Reserveren</span>
            <h2 className="text-3xl font-bold text-stone-900 tracking-tight mb-4" style={{ fontFamily: 'var(--font-heading)' }}>Reserveer uw tafel</h2>
            <p className="text-stone-600 mb-6 leading-relaxed">Kom genieten van de lekkerste Surinaamse gerechten. Reserveer vooruit en wij zorgen dat uw tafel klaarstaat.</p>
            <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=400&fit=crop&q=80" alt="Restaurant sfeer" className="rounded-2xl w-full aspect-[3/2] object-cover mb-6" loading="lazy" />
            <div className="bg-stone-50 rounded-xl p-4 border border-stone-200">
              <h4 className="text-sm font-bold text-stone-800 mb-2" style={{ fontFamily: 'var(--font-heading)' }}>Praktische info</h4>
              <ul className="text-sm text-stone-600 space-y-1.5">
                <li className="flex items-center gap-2"><Users className="w-4 h-4 text-green-600" /> Max. 8 personen per reservering</li>
                <li className="flex items-center gap-2"><Clock className="w-4 h-4 text-green-600" /> Reserveer min. 2 uur van tevoren</li>
                <li className="flex items-center gap-2"><Phone className="w-4 h-4 text-green-600" /> Groepen 8+: bel +597 455-1234</li>
              </ul>
            </div>
          </div>

          {/* Multi-step reservation wizard */}
          <div className="bg-stone-50 rounded-2xl border border-stone-200 overflow-hidden">
            {/* Step indicators */}
            <div className="flex border-b border-stone-200">
              {['Datum & Gasten', 'Gegevens', 'Bevestiging'].map((label, i) => (
                <div key={label} className={`flex-1 py-3 text-center text-xs font-bold transition-colors ${i < resStep ? 'bg-emerald-50 text-emerald-600' : i === resStep ? 'bg-green-50 text-green-700' : 'text-stone-400'}`}>
                  <span className={`inline-flex items-center justify-center w-5 h-5 rounded-full text-[10px] mr-1 ${i < resStep ? 'bg-emerald-500 text-white' : i === resStep ? 'bg-green-600 text-white' : 'bg-stone-300 text-white'}`}>{i < resStep ? '✓' : i + 1}</span>
                  <span className="hidden sm:inline">{label}</span>
                </div>
              ))}
            </div>

            <div className="p-6">
              <AnimatePresence mode="wait">
                {/* Step 0: Date, time, guests */}
                {resStep === 0 && (
                  <motion.div key="s0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                    <h3 className="text-lg font-bold text-stone-900" style={{ fontFamily: 'var(--font-heading)' }}>Wanneer wilt u komen?</h3>
                    <div>
                      <label className="text-sm font-bold text-stone-700 block mb-1">Aantal gasten</label>
                      <div className="grid grid-cols-4 gap-2">
                        {['1','2','3','4','5','6','7','8'].map(n => (
                          <button key={n} type="button" onClick={() => setForm(f => ({ ...f, gasten: n }))}
                            className={`py-2.5 rounded-xl text-sm font-bold transition-all ${form.gasten === n ? 'bg-green-600 text-white' : 'bg-white border border-stone-200 text-stone-700 hover:border-green-300'}`}>
                            {n}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-bold text-stone-700 block mb-1">Datum</label>
                      <input type="date" value={form.datum} onChange={e => setForm(f => ({ ...f, datum: e.target.value }))}
                        className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
                    </div>
                    <div>
                      <label className="text-sm font-bold text-stone-700 block mb-2">Tijd</label>
                      <div className="grid grid-cols-4 gap-2">
                        {['11:30', '12:00', '12:30', '13:00', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30'].map(t => {
                          const unavailable = ['12:30', '19:00'].includes(t)
                          return (
                            <button key={t} type="button" disabled={unavailable}
                              onClick={() => setForm(f => ({ ...f, tijd: t }))}
                              className={`py-2 rounded-lg text-xs font-bold transition-all ${unavailable ? 'bg-stone-100 text-stone-300 cursor-not-allowed line-through' : form.tijd === t ? 'bg-green-600 text-white' : 'bg-white border border-stone-200 text-stone-700 hover:border-green-300'}`}>
                              {t}
                            </button>
                          )
                        })}
                      </div>
                    </div>
                    <button type="button" onClick={handleResNext} className="w-full py-3 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition-colors text-sm" style={{ fontFamily: 'var(--font-heading)' }}>
                      Volgende
                    </button>
                  </motion.div>
                )}

                {/* Step 1: Contact details */}
                {resStep === 1 && (
                  <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                    <h3 className="text-lg font-bold text-stone-900" style={{ fontFamily: 'var(--font-heading)' }}>Uw gegevens</h3>
                    <p className="text-sm text-stone-500">{form.gasten} {parseInt(form.gasten) === 1 ? 'persoon' : 'personen'} · {form.datum} om {form.tijd}</p>
                    {[
                      { id: 'naam', label: 'Naam', type: 'text', ph: 'Uw volledige naam' },
                      { id: 'email', label: 'E-mail', type: 'email', ph: 'uw@email.com' },
                      { id: 'telefoon', label: 'Telefoon', type: 'tel', ph: '+597 ...' },
                    ].map(f => (
                      <div key={f.id}>
                        <label className="text-sm font-bold text-stone-700 block mb-1">{f.label}</label>
                        <input type={f.type} placeholder={f.ph} value={form[f.id as keyof typeof form]}
                          onChange={e => setForm(prev => ({ ...prev, [f.id]: e.target.value }))}
                          className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
                      </div>
                    ))}
                    <div>
                      <label className="text-sm font-bold text-stone-700 block mb-1">Opmerking (optioneel)</label>
                      <textarea value={form.opmerking} onChange={e => setForm(f => ({ ...f, opmerking: e.target.value }))} rows={2}
                        className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-green-500 resize-none" placeholder="Allergieën, verjaardag, kinderstoel..." />
                    </div>
                    <div className="flex gap-3">
                      <button type="button" onClick={() => setResStep(0)} className="px-4 py-2.5 rounded-xl border border-stone-200 text-sm font-bold text-stone-600 hover:bg-stone-100">Terug</button>
                      <button type="button" onClick={handleResNext} className="flex-1 py-2.5 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition-colors text-sm" style={{ fontFamily: 'var(--font-heading)' }}>Reservering bevestigen</button>
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Confirmation */}
                {resStep === 2 && (
                  <motion.div key="s2" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-4">
                    <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <h3 className="text-xl font-bold text-stone-900 mb-2" style={{ fontFamily: 'var(--font-heading)' }}>Reservering bevestigd!</h3>
                    <p className="text-sm text-stone-500 mb-4">Referentie: <span className="font-mono font-bold text-green-700">WI-2025-{String(Math.floor(1000 + Math.random() * 9000))}</span></p>
                    <div className="bg-white rounded-xl p-4 text-left text-sm space-y-2 border border-stone-200 mb-4">
                      <div className="flex justify-between"><span className="text-stone-500">Gasten</span><span className="font-bold text-stone-900">{form.gasten} {parseInt(form.gasten) === 1 ? 'persoon' : 'personen'}</span></div>
                      <div className="flex justify-between"><span className="text-stone-500">Datum</span><span className="font-bold text-stone-900">{form.datum}</span></div>
                      <div className="flex justify-between"><span className="text-stone-500">Tijd</span><span className="font-bold text-stone-900">{form.tijd}</span></div>
                      <div className="flex justify-between"><span className="text-stone-500">Naam</span><span className="font-bold text-stone-900">{form.naam}</span></div>
                    </div>
                    <p className="text-xs text-stone-400">Bevestiging is verzonden naar {form.email}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ MAP ═══ */}
      <section className="bg-stone-100">
        <div className="max-w-6xl mx-auto px-6 py-12 text-center">
          <h3 className="text-xl font-bold text-stone-900 mb-4" style={{ fontFamily: 'var(--font-heading)' }}>Bezoek ons</h3>
          <div className="rounded-2xl overflow-hidden border border-stone-200 aspect-[21/9]">
            <iframe
              title="Warung Indah locatie"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.234578!2d-55.1701!3d5.8254!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNcKwNDknMzEuNCJOIDU1wrAxMCcxMi40Ilc!5e0!3m2!1sen!2ssr!4v1234567890"
              width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="bg-stone-900 py-14 pb-28 md:pb-14">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-10 mb-10">
            <div>
              <div className="flex items-center gap-2 mb-4"><WarungLogo size={28} /><span className="text-lg font-bold text-white" style={{ fontFamily: 'var(--font-heading)' }}>Warung Indah</span></div>
              <p className="text-sm text-stone-400 leading-relaxed mb-4">Authentieke Surinaamse keuken sinds 2012. Vers bereid, met liefde geserveerd.</p>
              <div className="flex gap-2">
                {[
                  { label: 'Instagram', path: 'M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm4.25 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm5.25-2.25a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z' },
                  { label: 'Facebook', path: 'M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z' },
                ].map(s => (
                  <a key={s.label} href="#" aria-label={s.label} className="w-9 h-9 rounded-lg bg-stone-800 hover:bg-green-600 flex items-center justify-center transition-colors">
                    <svg className="w-4 h-4 text-stone-400" fill="currentColor" viewBox="0 0 24 24"><path d={s.path} /></svg>
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4 text-sm" style={{ fontFamily: 'var(--font-heading)' }}>Menu</h4>
              <nav className="space-y-2">
                {cats.map(c => <a key={c} href="#menu" className="block text-sm text-stone-400 hover:text-white transition-colors">{c}</a>)}
              </nav>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4 text-sm" style={{ fontFamily: 'var(--font-heading)' }}>Contact</h4>
              <div className="space-y-2 text-sm text-stone-400">
                <p>Waterkant 42</p>
                <p>Paramaribo, Suriname</p>
                <p className="mt-3">+597 455-1234</p>
                <p>info@warungindah.sr</p>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4 text-sm" style={{ fontFamily: 'var(--font-heading)' }}>Openingstijden</h4>
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between"><span className="text-stone-500">Ma-Za</span><span className="text-stone-300">11:00 – 22:00</span></div>
                <div className="flex justify-between"><span className="text-stone-500">Zondag</span><span className="text-red-400">Gesloten</span></div>
              </div>
              <div className="mt-4 p-3 bg-stone-800 rounded-lg">
                <p className="text-xs font-bold text-green-400">Bezorging beschikbaar</p>
                <p className="text-[10px] text-stone-500">Binnen Paramaribo · Min. SRD 50</p>
              </div>
            </div>
          </div>
          <div className="border-t border-stone-800 pt-6 flex flex-col md:flex-row justify-between items-center gap-3">
            <p className="text-xs text-stone-500">© 2025 Warung Indah. Alle rechten voorbehouden.</p>
            <p className="text-xs text-stone-600">KvK: 34567890 | Voedselveiligheid gecertificeerd</p>
          </div>
        </div>
      </footer>

      {/* ═══ MOBILE BOTTOM NAV ═══ */}
      <nav className="fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur border-t border-stone-200 md:hidden z-50">
        <div className="flex justify-around py-2">
          {[
            { icon: HomeIcon, label: 'Home', href: '#home' },
            { icon: Utensils, label: 'Menu', href: '#menu' },
            { icon: Star, label: 'Reviews', href: '#' },
            { icon: CalendarDays, label: 'Reserveren', href: '#reserveren' },
          ].map(n => (
            <a key={n.label} href={n.href} className="flex flex-col items-center gap-0.5 px-3 py-1 rounded-lg text-stone-500 hover:text-green-600 transition-colors">
              <n.icon className="w-5 h-5" />
              <span className="text-[10px] font-bold">{n.label}</span>
            </a>
          ))}
        </div>
      </nav>

      <DemoFeatures features={['Dagspecials banner met kortingsprijzen', 'Allergeenpictogrammen per gerecht (7 types)', 'Bereidingstijd per gerecht', 'Multi-step reserveringswizard (3 stappen)', 'Sfeer galerij', 'Gast testimonials met ratings', 'Mobiele bottom navigatie', 'WhatsApp integratie']} />
      <FloatingWhatsApp phone="5974551234" company="Warung Indah" message="Hallo! Ik wil graag bestellen of reserveren." />
    </div>
  )
}
