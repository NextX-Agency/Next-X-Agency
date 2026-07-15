'use client'

import { useState, useMemo, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, X, Plus, Minus, Trash2, Search, Heart, Star, ChevronRight, Truck, RefreshCw, Shield, CreditCard, Home as HomeIcon, Eye, Tag } from 'lucide-react'
import { toast } from 'sonner'
import FloatingWhatsApp from '../_components/FloatingWhatsApp'
import DemoFeatures from '../_components/DemoFeatures'
import TestimonialsSlider from '../_components/TestimonialsSlider'

/* ─── Logo ─── */
function BloomLogo({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="24" r="22" fill="#ec4899" opacity="0.1" />
      <circle cx="24" cy="20" r="4" fill="#ec4899" />
      {[0, 60, 120, 180, 240, 300].map((angle, i) => (
        <circle key={i} cx={24 + 8 * Math.cos((angle * Math.PI) / 180)} cy={20 + 8 * Math.sin((angle * Math.PI) / 180)} r="4" fill="#ec4899" opacity={0.6 + i * 0.05} />
      ))}
      <path d="M24 28L24 42" stroke="#16a34a" strokeWidth="3" strokeLinecap="round" />
      <path d="M24 34C20 30 18 32 16 34" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

type Product = {
  id: number; name: string; price: number; salePrice?: number; img: string; category: string; rating: number; reviews: number; badge?: string; outOfStock?: boolean; sizes?: string[]
}
type CartItem = Product & { qty: number; size?: string }

const products: Product[] = [
  { id: 1, name: 'Zijden Wrap Blouse', price: 189, img: 'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=400&h=500&fit=crop&q=80', category: 'Tops', rating: 4.8, reviews: 24, badge: 'Bestseller', sizes: ['XS','S','M','L'] },
  { id: 2, name: 'High-Waist Linnen Broek', price: 145, img: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=500&fit=crop&q=80', category: 'Broeken', rating: 4.6, reviews: 18, sizes: ['S','M','L','XL'] },
  { id: 3, name: 'Bloemen Midi Rok', price: 125, img: 'https://images.unsplash.com/photo-1583496661160-fb5886a0uj5a?w=400&h=500&fit=crop&q=80', category: 'Rokken', rating: 4.9, reviews: 31, badge: 'Nieuw', sizes: ['XS','S','M'] },
  { id: 4, name: 'Katoenen Zomerjurk', price: 165, salePrice: 129, img: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&h=500&fit=crop&q=80', category: 'Jurken', rating: 4.7, reviews: 42, badge: '-22%', sizes: ['S','M','L'] },
  { id: 5, name: 'Oversized Blazer', price: 225, img: 'https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=400&h=500&fit=crop&q=80', category: 'Tops', rating: 4.5, reviews: 15, sizes: ['S','M','L','XL'] },
  { id: 6, name: 'Gestreepte Maxi Rok', price: 110, img: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=400&h=500&fit=crop&q=80', category: 'Rokken', rating: 4.4, reviews: 9, outOfStock: true, sizes: ['M','L'] },
  { id: 7, name: 'Satijnen Cami Top', price: 89, salePrice: 69, img: 'https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?w=400&h=500&fit=crop&q=80', category: 'Tops', rating: 4.6, reviews: 27, badge: '-22%', sizes: ['XS','S','M','L'] },
  { id: 8, name: 'Wide Leg Jeans', price: 135, img: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&h=500&fit=crop&q=80', category: 'Broeken', rating: 4.8, reviews: 36, sizes: ['S','M','L'] },
  { id: 9, name: 'Bohemian Maxi Jurk', price: 195, img: 'https://images.unsplash.com/photo-1596783074918-c84cb06531ca?w=400&h=500&fit=crop&q=80', category: 'Jurken', rating: 4.9, reviews: 53, badge: 'Populair', sizes: ['XS','S','M','L','XL'] },
  { id: 10, name: 'Crop Cardigan', price: 98, img: 'https://images.unsplash.com/photo-1434389677669-e08b4cda3a26?w=400&h=500&fit=crop&q=80', category: 'Tops', rating: 4.3, reviews: 12, outOfStock: true, sizes: ['S','M'] },
  { id: 11, name: 'Plissé Palazzo Broek', price: 155, img: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&h=500&fit=crop&q=80', category: 'Broeken', rating: 4.7, reviews: 21, badge: 'Nieuw', sizes: ['S','M','L'] },
  { id: 12, name: 'Wrap Midi Jurk', price: 175, salePrice: 139, img: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=500&fit=crop&q=80', category: 'Jurken', rating: 4.8, reviews: 38, badge: '-20%', sizes: ['XS','S','M','L'] },
]

const categories = ['Alle', 'Tops', 'Jurken', 'Rokken', 'Broeken']

const paymentMethods = [
  { id: 'ideal', name: 'iDEAL', icon: '🏦' },
  { id: 'card', name: 'Creditcard', icon: '💳' },
  { id: 'cash', name: 'Bij bezorging', icon: '💵' },
]

const shopTestimonials = [
  { name: 'Reshma Khedoe', role: 'Terugkerende klant', text: 'De kwaliteit is echt top! Mijn zijden blouse voelt luxe aan en de maat viel perfect. Snel geleverd ook.', rating: 5, avatar: 'RK', date: '1 week geleden' },
  { name: 'Lisa Boldewijn', role: 'Eerste aankoop', text: 'Leuke selectie en mooie verpakking. De jurk was iets groter dan verwacht, maar de retour ging heel soepel.', rating: 4, avatar: 'LB', date: '3 weken geleden' },
  { name: 'Ashley Tjin', role: 'VIP klant', text: 'Al 2 jaar vaste klant. De collectie wordt steeds beter. De bohemian maxi jurk is mijn favoriet ooit!', rating: 5, avatar: 'AT', date: '5 dagen geleden' },
  { name: 'Priya Soedamah', role: 'Google review', text: 'Fijn dat ze nu ook bezorgen in Nickerie. De wide leg jeans is precies zoals op de foto. Aanrader!', rating: 5, avatar: 'PS', date: '2 weken geleden' },
]

/* ─── Sale countdown ─── */
function SaleCountdown() {
  const [time, setTime] = useState({ h: 5, m: 42, s: 18 })
  useEffect(() => {
    const iv = setInterval(() => {
      setTime(t => {
        let s = t.s - 1, m = t.m, h = t.h
        if (s < 0) { s = 59; m-- }
        if (m < 0) { m = 59; h-- }
        if (h < 0) { h = 0; m = 0; s = 0 }
        return { h, m, s }
      })
    }, 1000)
    return () => clearInterval(iv)
  }, [])
  const pad = (n: number) => String(n).padStart(2, '0')
  return (
    <div className="flex items-center gap-1.5">
      {[time.h, time.m, time.s].map((v, i) => (
        <span key={i} className="inline-block bg-white/20 backdrop-blur text-white font-mono font-bold text-sm px-2 py-1 rounded">
          {pad(v)}
        </span>
      ))}
    </div>
  )
}

export default function BloomBoutiquePage() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [cartOpen, setCartOpen] = useState(false)
  const [filter, setFilter] = useState('Alle')
  const [search, setSearch] = useState('')
  const [wishlist, setWishlist] = useState<number[]>([])
  const [checkoutStep, setCheckoutStep] = useState(0) // 0=shop 1=shipping 2=payment 3=review 4=confirmed
  const [quickView, setQuickView] = useState<Product | null>(null)

  const filtered = useMemo(() => {
    let list = filter === 'Alle' ? products : products.filter(p => p.category === filter)
    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(p => p.name.toLowerCase().includes(q))
    }
    return list
  }, [filter, search])

  const getPrice = (p: Product) => p.salePrice ?? p.price
  const cartTotal = cart.reduce((s, i) => s + getPrice(i) * i.qty, 0)
  const cartCount = cart.reduce((s, i) => s + i.qty, 0)

  const addToCart = (product: Product) => {
    if (product.outOfStock) { toast.error('Dit product is momenteel uitverkocht'); return }
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id)
      if (existing) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i)
      return [...prev, { ...product, qty: 1 }]
    })
    toast.success(`${product.name} toegevoegd`, { description: 'Bekijk uw winkelwagen →' })
  }

  const updateQty = (id: number, delta: number) => {
    setCart(prev => prev.map(i => i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i))
  }

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(i => i.id !== id))
    toast.info('Product verwijderd uit winkelwagen')
  }

  const toggleWish = (id: number) => {
    setWishlist(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
  }

  const handleCheckout = () => {
    if (cart.length === 0) return toast.error('Uw winkelwagen is leeg')
    setCheckoutStep(1)
    setCartOpen(false)
  }

  /* ─── Checkout form ─── */
  const [cForm, setCForm] = useState({ naam: '', email: '', adres: '', stad: '', telefoon: '', postcode: '' })
  const [paymentMethod, setPaymentMethod] = useState('')

  const handleCheckoutNext = () => {
    if (checkoutStep === 1) {
      if (!cForm.naam.trim() || !cForm.email.includes('@') || !cForm.adres.trim() || !cForm.stad.trim()) {
        toast.error('Vul alle verplichte velden in'); return
      }
      setCheckoutStep(2)
    } else if (checkoutStep === 2) {
      if (!paymentMethod) { toast.error('Kies een betaalmethode'); return }
      setCheckoutStep(3)
    } else if (checkoutStep === 3) {
      setCheckoutStep(4)
      toast.success('Bestelling geplaatst! 🎉', { description: `Bedankt ${cForm.naam}! Verwachte levering: 2-4 werkdagen.` })
    }
  }

  // 4-step checkout
  if (checkoutStep >= 1) {
    return (
      <div className="min-h-screen bg-pink-50/50">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <button onClick={() => setCheckoutStep(cs => cs > 1 && cs < 4 ? cs - 1 : 0)} className="text-sm text-pink-600 font-bold mb-6 hover:underline">
            {checkoutStep === 1 ? '← Terug naar winkel' : checkoutStep < 4 ? '← Vorige stap' : ''}
          </button>

          {/* Step indicators */}
          <div className="flex mb-8 gap-1">
            {['Bezorging', 'Betaling', 'Overzicht', 'Bevestiging'].map((label, i) => (
              <div key={label} className="flex-1">
                <div className={`h-1.5 rounded-full transition-colors ${i + 1 <= checkoutStep ? 'bg-pink-500' : 'bg-pink-200'}`} />
                <p className={`text-[10px] font-bold mt-1 ${i + 1 <= checkoutStep ? 'text-pink-600' : 'text-slate-400'}`}>{label}</p>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-5 gap-8">
            <div className="md:col-span-3">
              <AnimatePresence mode="wait">
                {/* Step 1: Shipping */}
                {checkoutStep === 1 && (
                  <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                    className="bg-white rounded-2xl p-6 border border-pink-100 space-y-4">
                    <h3 className="text-lg font-bold text-slate-900" style={{ fontFamily: 'var(--font-heading)' }}>Bezorggegevens</h3>
                    {[
                      { id: 'naam', label: 'Volledige naam', type: 'text', ph: 'Uw naam' },
                      { id: 'email', label: 'E-mail', type: 'email', ph: 'uw@email.com' },
                      { id: 'telefoon', label: 'Telefoon', type: 'tel', ph: '+597 ...' },
                      { id: 'adres', label: 'Adres', type: 'text', ph: 'Straatnaam + nummer' },
                      { id: 'stad', label: 'Stad', type: 'text', ph: 'Paramaribo' },
                    ].map(f => (
                      <div key={f.id}>
                        <label className="text-sm font-bold text-slate-700 block mb-1">{f.label}</label>
                        <input type={f.type} placeholder={f.ph}
                          value={cForm[f.id as keyof typeof cForm]}
                          onChange={e => setCForm(prev => ({ ...prev, [f.id]: e.target.value }))}
                          className="w-full px-4 py-2.5 rounded-xl border border-pink-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-pink-400" />
                      </div>
                    ))}
                    <button type="button" onClick={handleCheckoutNext} className="w-full py-3 bg-pink-600 text-white font-bold rounded-xl hover:bg-pink-700 transition-colors" style={{ fontFamily: 'var(--font-heading)' }}>
                      Naar betaling →
                    </button>
                  </motion.div>
                )}

                {/* Step 2: Payment */}
                {checkoutStep === 2 && (
                  <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                    className="bg-white rounded-2xl p-6 border border-pink-100 space-y-4">
                    <h3 className="text-lg font-bold text-slate-900" style={{ fontFamily: 'var(--font-heading)' }}>Betaalmethode</h3>
                    <div className="space-y-2">
                      {paymentMethods.map(pm => (
                        <button key={pm.id} type="button" onClick={() => setPaymentMethod(pm.id)}
                          className={`w-full flex items-center gap-4 px-4 py-4 rounded-xl border-2 transition-all ${paymentMethod === pm.id ? 'border-pink-500 bg-pink-50' : 'border-pink-100 hover:border-pink-200'}`}>
                          <span className="text-2xl">{pm.icon}</span>
                          <span className="font-bold text-slate-900">{pm.name}</span>
                          {paymentMethod === pm.id && <span className="ml-auto w-5 h-5 rounded-full bg-pink-500 flex items-center justify-center"><svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg></span>}
                        </button>
                      ))}
                    </div>
                    <button type="button" onClick={handleCheckoutNext} className="w-full py-3 bg-pink-600 text-white font-bold rounded-xl hover:bg-pink-700 transition-colors" style={{ fontFamily: 'var(--font-heading)' }}>
                      Overzicht bekijken →
                    </button>
                  </motion.div>
                )}

                {/* Step 3: Review */}
                {checkoutStep === 3 && (
                  <motion.div key="s3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                    className="bg-white rounded-2xl p-6 border border-pink-100 space-y-4">
                    <h3 className="text-lg font-bold text-slate-900" style={{ fontFamily: 'var(--font-heading)' }}>Overzicht bestelling</h3>
                    <div className="bg-pink-50 rounded-xl p-4 text-sm space-y-2">
                      <div className="flex justify-between"><span className="text-slate-500">Ontvanger</span><span className="font-bold">{cForm.naam}</span></div>
                      <div className="flex justify-between"><span className="text-slate-500">Adres</span><span className="font-bold">{cForm.adres}, {cForm.stad}</span></div>
                      <div className="flex justify-between"><span className="text-slate-500">Betaling</span><span className="font-bold">{paymentMethods.find(p => p.id === paymentMethod)?.name}</span></div>
                    </div>
                    <div className="space-y-3">
                      {cart.map(i => (
                        <div key={i.id} className="flex items-center gap-3">
                          <img src={i.img} alt={i.name} className="w-12 h-12 rounded-lg object-cover" />
                          <div className="flex-1 min-w-0"><p className="text-sm font-medium truncate">{i.name}</p><p className="text-xs text-slate-500">{i.qty}×</p></div>
                          <p className="text-sm font-bold">SRD {(getPrice(i) * i.qty).toLocaleString()}</p>
                        </div>
                      ))}
                    </div>
                    <button type="button" onClick={handleCheckoutNext} className="w-full py-3 bg-pink-600 text-white font-bold rounded-xl hover:bg-pink-700 transition-colors" style={{ fontFamily: 'var(--font-heading)' }}>
                      Bestelling plaatsen · SRD {cartTotal.toLocaleString()}
                    </button>
                  </motion.div>
                )}

                {/* Step 4: Confirmation */}
                {checkoutStep === 4 && (
                  <motion.div key="s4" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                    className="bg-white rounded-2xl p-8 border border-pink-100 text-center">
                    <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2" style={{ fontFamily: 'var(--font-heading)' }}>Bestelling geplaatst!</h3>
                    <p className="text-sm text-slate-500 mb-4">Ordernummer: <span className="font-mono font-bold text-pink-600">BB-2025-{String(Math.floor(1000 + Math.random() * 9000))}</span></p>
                    <div className="bg-pink-50 rounded-xl p-4 text-sm text-left space-y-2 mb-6">
                      <div className="flex justify-between"><span className="text-slate-500">Artikelen</span><span className="font-bold">{cartCount}</span></div>
                      <div className="flex justify-between"><span className="text-slate-500">Totaal</span><span className="font-bold text-pink-600">SRD {cartTotal.toLocaleString()}</span></div>
                      <div className="flex justify-between"><span className="text-slate-500">Bezorging</span><span className="font-bold text-green-600">Gratis</span></div>
                      <div className="flex justify-between"><span className="text-slate-500">Levering</span><span className="font-bold">2-4 werkdagen</span></div>
                    </div>
                    <p className="text-xs text-slate-400 mb-6">Bevestigingsmail is verzonden naar {cForm.email}</p>
                    <button onClick={() => { setCheckoutStep(0); setCart([]) }} className="px-6 py-2.5 bg-pink-600 text-white font-bold rounded-xl hover:bg-pink-700 transition-colors text-sm" style={{ fontFamily: 'var(--font-heading)' }}>
                      Verder winkelen
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Order summary sidebar */}
            {checkoutStep < 4 && (
              <div className="md:col-span-2 bg-white rounded-2xl p-6 border border-pink-100 h-fit">
                <h3 className="font-bold text-slate-900 mb-4" style={{ fontFamily: 'var(--font-heading)' }}>Winkelwagen ({cartCount})</h3>
                <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                  {cart.map(i => (
                    <div key={i.id} className="flex items-center gap-3">
                      <img src={i.img} alt={i.name} className="w-12 h-12 rounded-lg object-cover" />
                      <div className="flex-1 min-w-0"><p className="text-sm font-medium truncate">{i.name}</p><p className="text-xs text-slate-500">{i.qty}× SRD {getPrice(i)}</p></div>
                      <p className="text-sm font-bold">SRD {(getPrice(i) * i.qty).toLocaleString()}</p>
                    </div>
                  ))}
                </div>
                <div className="border-t border-pink-100 pt-3 space-y-2">
                  <div className="flex justify-between text-sm"><span className="text-slate-500">Subtotaal</span><span className="font-bold">SRD {cartTotal.toLocaleString()}</span></div>
                  <div className="flex justify-between text-sm"><span className="text-slate-500">Bezorging</span><span className="font-bold text-green-600">Gratis</span></div>
                  <div className="flex justify-between text-base border-t border-pink-100 pt-2"><span className="font-bold text-slate-900">Totaal</span><span className="font-bold text-pink-600">SRD {cartTotal.toLocaleString()}</span></div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  const [activeNav, setActiveNav] = useState('home')

  return (
    <div className="min-h-screen bg-white pb-16 md:pb-0">
      {/* ═══ HEADER ═══ */}
      <header className="sticky top-10 z-30 bg-white/90 backdrop-blur border-b border-pink-100">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BloomLogo size={32} />
            <span className="text-lg font-bold text-slate-900" style={{ fontFamily: 'var(--font-heading)' }}>Bloom Boutique</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input type="text" placeholder="Zoeken..." value={search} onChange={e => setSearch(e.target.value)}
                className="pl-9 pr-4 py-2 rounded-full bg-pink-50 border border-pink-200 text-sm w-48 focus:outline-none focus:ring-2 focus:ring-pink-400" />
            </div>
            <button onClick={() => setCartOpen(true)} className="relative p-2 rounded-full hover:bg-pink-50 transition-colors" aria-label="Winkelwagen">
              <ShoppingBag className="w-5 h-5 text-slate-900" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-pink-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">{cartCount}</span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* ═══ HERO ═══ */}
      <section id="home" className="relative bg-gradient-to-br from-pink-50 via-white to-rose-50 py-16 lg:py-24 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-8 items-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-pink-500 mb-3 block">Zomer Collectie 2025</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[0.95] mb-5" style={{ fontFamily: 'var(--font-heading)' }}>
              Stijl die bij <span className="text-pink-600">jou</span> past
            </h1>
            <p className="text-slate-600 max-w-md mb-6 leading-relaxed">Ontdek onze curated collectie van elegante, comfortabele mode. Handgeselecteerd met oog voor kwaliteit en duurzaamheid.</p>
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <a href="#shop" className="inline-flex items-center gap-2 px-6 py-3 bg-pink-600 text-white font-bold rounded-xl hover:bg-pink-700 transition-colors" style={{ fontFamily: 'var(--font-heading)' }}>
                Shop nu <ChevronRight className="w-4 h-4" />
              </a>
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <div className="flex -space-x-2">
                  {['👩🏾', '👩🏽', '👨🏻', '👩🏿'].map((e, i) => <span key={i} className="w-7 h-7 rounded-full bg-pink-100 border-2 border-white flex items-center justify-center text-sm">{e}</span>)}
                </div>
                <span className="font-bold text-slate-700">2.400+</span> tevreden klanten
              </div>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.2 }} className="relative">
            <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&h=500&fit=crop&q=80" alt="Bloom Boutique fashion" className="rounded-2xl shadow-xl w-full object-cover aspect-[6/5]" />
            <div className="absolute -bottom-4 left-4 right-4 bg-white/90 backdrop-blur rounded-xl px-4 py-3 shadow-lg border border-pink-100">
              <SaleCountdown />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ FEATURES BAR ═══ */}
      <section className="border-y border-pink-100 bg-pink-50/50">
        <div className="max-w-6xl mx-auto px-6 py-5 flex flex-wrap justify-center gap-8 text-sm text-slate-600">
          {[{ icon: Truck, text: 'Gratis bezorging vanaf SRD 200' }, { icon: RefreshCw, text: '14 dagen retourbeleid' }, { icon: Shield, text: 'Veilig betalen' }, { icon: CreditCard, text: 'iDEAL · Creditcard · Contant' }].map(f => (
            <div key={f.text} className="flex items-center gap-2"><f.icon className="w-4 h-4 text-pink-500" /> {f.text}</div>
          ))}
        </div>
      </section>

      {/* ═══ SHOP ═══ */}
      <section className="py-16 lg:py-24" id="shop">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
            <div>
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-pink-500 mb-3 block">Collectie</span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>Onze producten</h2>
              <p className="text-sm text-slate-500 mt-1">{filtered.length} artikel{filtered.length !== 1 ? 'en' : ''}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button key={cat} onClick={() => setFilter(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${filter === cat ? 'bg-pink-600 text-white' : 'bg-pink-50 text-slate-600 hover:bg-pink-100 border border-pink-200'}`}>
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile search */}
          <div className="sm:hidden mb-6 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input type="text" placeholder="Zoek producten..." value={search} onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-pink-50 border border-pink-200 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400" />
          </div>

          {/* Grid */}
          <motion.div layout className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map(p => (
                <motion.div key={p.id} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                  className="group bg-white rounded-2xl border border-pink-100 overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <img src={p.img} alt={p.name} className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ${p.outOfStock ? 'grayscale opacity-60' : ''}`} loading="lazy" />
                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                      {p.badge && <span className={`px-2.5 py-1 text-white text-[10px] font-bold rounded-full ${p.salePrice ? 'bg-red-500' : 'bg-pink-600'}`}>{p.badge}</span>}
                      {p.outOfStock && <span className="px-2.5 py-1 bg-slate-800 text-white text-[10px] font-bold rounded-full">Uitverkocht</span>}
                    </div>
                    <div className="absolute top-3 right-3 flex flex-col gap-1.5">
                      <button onClick={() => toggleWish(p.id)} className="w-8 h-8 rounded-full bg-white/80 flex items-center justify-center hover:bg-white transition-colors" aria-label="Wishlist">
                        <Heart className={`w-4 h-4 ${wishlist.includes(p.id) ? 'fill-pink-500 text-pink-500' : 'text-slate-400'}`} />
                      </button>
                      <button onClick={() => setQuickView(p)} className="w-8 h-8 rounded-full bg-white/80 flex items-center justify-center hover:bg-white transition-colors" aria-label="Quick view">
                        <Eye className="w-4 h-4 text-slate-400" />
                      </button>
                    </div>
                    {!p.outOfStock && (
                      <button onClick={() => addToCart(p)}
                        className="absolute bottom-3 left-3 right-3 py-2.5 bg-slate-900 text-white text-sm font-bold rounded-xl opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-slate-800" style={{ fontFamily: 'var(--font-heading)' }}>
                        <ShoppingBag className="w-4 h-4 inline mr-1" /> Toevoegen
                      </button>
                    )}
                  </div>
                  <div className="p-4">
                    <p className="text-xs text-pink-500 font-medium mb-1">{p.category}</p>
                    <h3 className="font-bold text-slate-900 text-sm mb-1 leading-tight" style={{ fontFamily: 'var(--font-heading)' }}>{p.name}</h3>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center gap-0.5">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <span className="text-xs text-slate-600">{p.rating}</span>
                      </div>
                      <span className="text-xs text-slate-400">({p.reviews})</span>
                    </div>
                    {p.salePrice ? (
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-red-600">SRD {p.salePrice}</span>
                        <span className="text-sm text-slate-400 line-through">SRD {p.price}</span>
                      </div>
                    ) : (
                      <p className={`font-bold ${p.outOfStock ? 'text-slate-400' : 'text-pink-600'}`}>SRD {p.price}</p>
                    )}
                    {p.sizes && <div className="flex gap-1 mt-2">{p.sizes.map(s => <span key={s} className="text-[10px] px-1.5 py-0.5 rounded bg-pink-50 text-slate-500 border border-pink-100">{s}</span>)}</div>}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filtered.length === 0 && (
            <div className="text-center py-16 text-slate-500">
              <Search className="w-10 h-10 mx-auto mb-3 text-slate-300" />
              <p className="text-lg font-bold">Geen producten gevonden</p>
              <p className="text-sm mt-1">Probeer een andere zoekterm of categorie</p>
            </div>
          )}
        </div>
      </section>

      {/* ═══ QUICK VIEW MODAL ═══ */}
      <AnimatePresence>
        {quickView && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 z-50" onClick={() => setQuickView(null)} />
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 30 }}
              className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-lg bg-white rounded-2xl z-50 overflow-hidden shadow-2xl">
              <button onClick={() => setQuickView(null)} className="absolute top-3 right-3 z-10 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center" aria-label="Sluiten"><X className="w-4 h-4" /></button>
              <img src={quickView.img} alt={quickView.name} className="w-full aspect-[4/3] object-cover" />
              <div className="p-6">
                <p className="text-xs text-pink-500 font-medium mb-1">{quickView.category}</p>
                <h3 className="text-xl font-bold text-slate-900 mb-2" style={{ fontFamily: 'var(--font-heading)' }}>{quickView.name}</h3>
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex items-center gap-1"><Star className="w-4 h-4 fill-amber-400 text-amber-400" /><span className="text-sm font-bold">{quickView.rating}</span><span className="text-sm text-slate-400">({quickView.reviews} reviews)</span></div>
                </div>
                {quickView.salePrice ? (
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl font-bold text-red-600">SRD {quickView.salePrice}</span>
                    <span className="text-lg text-slate-400 line-through">SRD {quickView.price}</span>
                    <span className="px-2 py-0.5 bg-red-100 text-red-600 text-xs font-bold rounded-full"><Tag className="w-3 h-3 inline" /> Korting</span>
                  </div>
                ) : (
                  <p className="text-2xl font-bold text-pink-600 mb-4">SRD {quickView.price}</p>
                )}
                {quickView.sizes && (
                  <div className="mb-4"><p className="text-sm font-bold text-slate-700 mb-2">Beschikbare maten</p><div className="flex flex-wrap gap-2">{quickView.sizes.map(s => <span key={s} className="px-3 py-1.5 rounded-lg border border-pink-200 text-sm font-medium hover:border-pink-400 cursor-pointer">{s}</span>)}</div></div>
                )}
                <button onClick={() => { addToCart(quickView); setQuickView(null) }} disabled={quickView.outOfStock}
                  className={`w-full py-3 font-bold rounded-xl transition-colors ${quickView.outOfStock ? 'bg-slate-200 text-slate-400 cursor-not-allowed' : 'bg-pink-600 text-white hover:bg-pink-700'}`} style={{ fontFamily: 'var(--font-heading)' }}>
                  {quickView.outOfStock ? 'Uitverkocht' : 'Toevoegen aan winkelwagen'}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ═══ TESTIMONIALS ═══ */}
      <section id="reviews" className="py-16 lg:py-24 bg-pink-50/50">
        <div className="max-w-6xl mx-auto px-6">
          <TestimonialsSlider testimonials={shopTestimonials} accentColor="#ec4899" title="Wat klanten zeggen" subtitle="Reviews van echte shoppers" />
        </div>
      </section>

      {/* ═══ CART DRAWER ═══ */}
      <AnimatePresence>
        {cartOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/40 z-50" onClick={() => setCartOpen(false)} />
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white z-50 shadow-2xl flex flex-col">
              <div className="flex items-center justify-between p-6 border-b border-pink-100">
                <h2 className="text-xl font-bold text-slate-900" style={{ fontFamily: 'var(--font-heading)' }}>Winkelwagen ({cartCount})</h2>
                <button onClick={() => setCartOpen(false)} className="p-2 rounded-full hover:bg-pink-50" aria-label="Sluiten"><X className="w-5 h-5" /></button>
              </div>
              <div className="flex-1 overflow-auto p-6 space-y-4">
                {cart.length === 0 && <p className="text-center text-slate-400 py-12">Uw winkelwagen is leeg</p>}
                {cart.map(item => (
                  <div key={item.id} className="flex gap-4 bg-pink-50/50 rounded-xl p-3">
                    <img src={item.img} alt={item.name} className="w-20 h-20 rounded-xl object-cover" />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-sm text-slate-900 truncate">{item.name}</h4>
                      {item.salePrice ? (
                        <div className="flex items-center gap-2 mt-1"><span className="text-sm text-red-600 font-bold">SRD {item.salePrice}</span><span className="text-xs text-slate-400 line-through">SRD {item.price}</span></div>
                      ) : (
                        <p className="text-sm text-pink-600 font-bold mt-1">SRD {item.price}</p>
                      )}
                      <div className="flex items-center gap-2 mt-2">
                        <button onClick={() => updateQty(item.id, -1)} className="w-7 h-7 rounded-full bg-white border border-pink-200 flex items-center justify-center hover:bg-pink-50" aria-label="Minder"><Minus className="w-3 h-3" /></button>
                        <span className="text-sm font-bold w-6 text-center">{item.qty}</span>
                        <button onClick={() => updateQty(item.id, 1)} className="w-7 h-7 rounded-full bg-white border border-pink-200 flex items-center justify-center hover:bg-pink-50" aria-label="Meer"><Plus className="w-3 h-3" /></button>
                        <button onClick={() => removeFromCart(item.id)} className="ml-auto p-1.5 rounded-full text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors" aria-label="Verwijderen"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {cart.length > 0 && (
                <div className="p-6 border-t border-pink-100">
                  {cartTotal >= 200 && <p className="text-xs text-green-600 font-bold mb-2 flex items-center gap-1"><Truck className="w-3 h-3" /> Gratis bezorging!</p>}
                  <div className="flex justify-between mb-4"><span className="text-slate-600">Totaal</span><span className="text-xl font-bold text-slate-900">SRD {cartTotal.toLocaleString()}</span></div>
                  <button onClick={handleCheckout} className="w-full py-3 bg-pink-600 text-white font-bold rounded-xl hover:bg-pink-700 transition-colors" style={{ fontFamily: 'var(--font-heading)' }}>
                    Naar checkout <ChevronRight className="w-4 h-4 inline" />
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ═══ FOOTER ═══ */}
      <footer className="bg-slate-900 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
            <div>
              <div className="flex items-center gap-2 mb-3"><BloomLogo size={28} /><span className="font-bold text-white" style={{ fontFamily: 'var(--font-heading)' }}>Bloom Boutique</span></div>
              <p className="text-sm text-slate-400 leading-relaxed mb-4">Curated fashion met liefde geselecteerd. Kwaliteit en stijl in elk stuk.</p>
              <div className="flex gap-3">
                {['Instagram', 'Facebook', 'TikTok'].map(s => <span key={s} className="text-xs px-3 py-1.5 rounded-full bg-slate-800 text-slate-400 hover:bg-pink-600 hover:text-white transition-colors cursor-pointer">{s}</span>)}
              </div>
            </div>
            <div>
              <h4 className="font-bold text-white text-sm mb-3" style={{ fontFamily: 'var(--font-heading)' }}>Categorieën</h4>
              <div className="space-y-2">{categories.slice(1).map(c => <button key={c} onClick={() => { setFilter(c); document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' }) }} className="block text-sm text-slate-400 hover:text-pink-400 transition-colors">{c}</button>)}</div>
            </div>
            <div>
              <h4 className="font-bold text-white text-sm mb-3" style={{ fontFamily: 'var(--font-heading)' }}>Klantenservice</h4>
              <div className="space-y-2 text-sm text-slate-400">
                <p>Bezorging & Retour</p><p>Maattabel</p><p>Veelgestelde vragen</p><p>Contact</p><p>Privacy- & cookiebeleid</p>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-white text-sm mb-3" style={{ fontFamily: 'var(--font-heading)' }}>Betaalmethoden</h4>
              <div className="flex flex-wrap gap-2 mb-4">
                {paymentMethods.map(pm => <span key={pm.id} className="text-xs px-3 py-1.5 rounded-full bg-slate-800 text-slate-300">{pm.icon} {pm.name}</span>)}
              </div>
              <h4 className="font-bold text-white text-sm mb-2" style={{ fontFamily: 'var(--font-heading)' }}>Adres</h4>
              <p className="text-sm text-slate-400">Domineestraat 18<br/>Paramaribo, Suriname</p>
              <p className="text-sm text-slate-400 mt-2">KvK: 34567890</p>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row justify-between items-center gap-2 text-sm text-slate-500">
            <span>© 2025 Bloom Boutique. Paramaribo, Suriname.</span>
            <span>Alle prijzen zijn inclusief BTW</span>
          </div>
        </div>
      </footer>

      {/* ═══ MOBILE BOTTOM NAV ═══ */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur border-t border-pink-100 z-40 flex justify-around py-2">
        {[
          { id: 'home', label: 'Home', icon: HomeIcon },
          { id: 'shop', label: 'Shop', icon: ShoppingBag },
          { id: 'reviews', label: 'Reviews', icon: Star },
          { id: 'cart', label: 'Wagen', icon: ShoppingBag },
        ].map(n => (
          <button key={n.id} onClick={() => { setActiveNav(n.id); if (n.id === 'cart') setCartOpen(true); else document.getElementById(n.id)?.scrollIntoView({ behavior: 'smooth' }) }}
            className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-lg transition-colors ${activeNav === n.id ? 'text-pink-600' : 'text-slate-400'}`}>
            <n.icon className="w-5 h-5" />
            <span className="text-[10px] font-bold">{n.label}</span>
            {n.id === 'cart' && cartCount > 0 && <span className="absolute -top-1 right-1/2 translate-x-4 w-4 h-4 bg-pink-600 text-white text-[9px] font-bold rounded-full flex items-center justify-center">{cartCount}</span>}
          </button>
        ))}
      </nav>

      <DemoFeatures features={['Werkende winkelwagen met sale-prijzen', '4-stappen checkout met bevestiging', 'Quick-view product modal', 'Uitverkocht-status & wishlist', 'Categorie filter + zoekbalk', 'Sale countdown timer', 'Klant testimonials slider', 'Mobile bottom navigation', 'WhatsApp integratie']} />
      <FloatingWhatsApp phone="5974567890" company="Bloom Boutique" message="Hoi! Ik heb een vraag over een product." />
    </div>
  )
}
