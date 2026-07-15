'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingCart, X, Plus, Minus, Trash2, Search, Star, ChevronRight, SlidersHorizontal, Truck, Shield, Headphones, Monitor, Smartphone, Laptop, Cpu, Camera, Gamepad2, BatteryCharging, Wifi } from 'lucide-react'
import { toast } from 'sonner'
import FloatingWhatsApp from '../_components/FloatingWhatsApp'
import DemoFeatures from '../_components/DemoFeatures'

/* ─── Logo ─── */
function TechMartLogo({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect width="48" height="48" rx="10" fill="#2563eb" />
      <path d="M14 14h20v4H14z" fill="white" />
      <path d="M22 18h4v16h-4z" fill="white" />
      <circle cx="24" cy="38" r="3" fill="#60a5fa" />
    </svg>
  )
}

type Product = {
  id: number; name: string; price: number; originalPrice?: number; img: string; category: string; brand: string; rating: number; reviews: number; badge?: string; specs?: string
}
type CartItem = Product & { qty: number }

const products: Product[] = [
  { id: 1, name: 'MacBook Air M3 15"', price: 5499, originalPrice: 5999, img: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop&q=80', category: 'Laptops', brand: 'Apple', rating: 4.9, reviews: 128, badge: 'Bestseller', specs: 'M3, 16GB RAM, 512GB SSD' },
  { id: 2, name: 'Samsung Galaxy S24 Ultra', price: 4299, img: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&h=400&fit=crop&q=80', category: 'Smartphones', brand: 'Samsung', rating: 4.8, reviews: 95, badge: 'Nieuw', specs: '256GB, Titanium, AI Camera' },
  { id: 3, name: 'Sony WH-1000XM5', price: 1299, originalPrice: 1499, img: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400&h=400&fit=crop&q=80', category: 'Audio', brand: 'Sony', rating: 4.9, reviews: 210, badge: 'Populair', specs: 'ANC, 30hr batterij, LDAC' },
  { id: 4, name: 'iPad Pro 13" M4', price: 4899, img: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop&q=80', category: 'Tablets', brand: 'Apple', rating: 4.8, reviews: 67, specs: 'M4 chip, 256GB, WiFi+5G' },
  { id: 5, name: 'Dell UltraSharp 27" 4K', price: 2199, originalPrice: 2599, img: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=400&fit=crop&q=80', category: 'Monitoren', brand: 'Dell', rating: 4.7, reviews: 43, specs: 'IPS, USB-C, 99% sRGB' },
  { id: 6, name: 'PS5 Slim Digital Edition', price: 1799, img: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=400&fit=crop&q=80', category: 'Gaming', brand: 'Sony', rating: 4.6, reviews: 156, badge: 'Sale', specs: '1TB SSD, DualSense V2' },
  { id: 7, name: 'Canon EOS R6 Mark II', price: 8999, img: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=400&fit=crop&q=80', category: 'Camera', brand: 'Canon', rating: 4.9, reviews: 34, specs: '24.2MP, 4K 60fps, IBIS' },
  { id: 8, name: 'iPhone 15 Pro Max', price: 4999, img: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&h=400&fit=crop&q=80', category: 'Smartphones', brand: 'Apple', rating: 4.8, reviews: 189, badge: 'Bestseller', specs: '256GB, Titanium, A17 Pro' },
  { id: 9, name: 'Logitech MX Master 3S', price: 449, img: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop&q=80', category: 'Accessoires', brand: 'Logitech', rating: 4.7, reviews: 87, specs: 'Ergonomisch, USB-C, Bolt' },
  { id: 10, name: 'Samsung 49" Odyssey G9', price: 4799, originalPrice: 5499, img: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=400&h=400&fit=crop&q=80', category: 'Monitoren', brand: 'Samsung', rating: 4.6, reviews: 52, badge: 'Sale', specs: 'OLED, 240Hz, 1ms, Curved' },
  { id: 11, name: 'AirPods Pro 2 USB-C', price: 999, img: 'https://images.unsplash.com/photo-1588423771073-b8903fdes5e4?w=400&h=400&fit=crop&q=80', category: 'Audio', brand: 'Apple', rating: 4.8, reviews: 245, badge: 'Populair', specs: 'ANC, Adaptive Audio, IP54' },
  { id: 12, name: 'ASUS ROG Strix G16', price: 6299, img: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400&h=400&fit=crop&q=80', category: 'Laptops', brand: 'ASUS', rating: 4.7, reviews: 38, specs: 'RTX 4070, i9, 32GB, 165Hz' },
  { id: 13, name: 'Samsung Galaxy Tab S9 FE', price: 1899, img: 'https://images.unsplash.com/photo-1561154464-82e9aab32f4e?w=400&h=400&fit=crop&q=80', category: 'Tablets', brand: 'Samsung', rating: 4.5, reviews: 29, specs: '10.9", S Pen, 128GB' },
  { id: 14, name: 'Nintendo Switch OLED', price: 1399, img: 'https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=400&h=400&fit=crop&q=80', category: 'Gaming', brand: 'Nintendo', rating: 4.7, reviews: 178, specs: '7" OLED, 64GB, White/Neon' },
  { id: 15, name: 'GoPro HERO12 Black', price: 1699, img: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&h=400&fit=crop&q=80', category: 'Camera', brand: 'GoPro', rating: 4.6, reviews: 64, badge: 'Nieuw', specs: '5.3K, HyperSmooth 6.0' },
  { id: 16, name: 'Anker PowerBank 26800', price: 299, img: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400&h=400&fit=crop&q=80', category: 'Accessoires', brand: 'Anker', rating: 4.5, reviews: 112, specs: '26800mAh, 65W USB-C PD' },
]

const allCategories = ['Alle', ...Array.from(new Set(products.map(p => p.category)))]
const allBrands = ['Alle', ...Array.from(new Set(products.map(p => p.brand)))]
const catIcons: Record<string, React.ReactNode> = { Laptops: <Laptop className="w-3.5 h-3.5" />, Smartphones: <Smartphone className="w-3.5 h-3.5" />, Audio: <Headphones className="w-3.5 h-3.5" />, Monitoren: <Monitor className="w-3.5 h-3.5" />, Gaming: <Gamepad2 className="w-3.5 h-3.5" />, Camera: <Camera className="w-3.5 h-3.5" />, Tablets: <Cpu className="w-3.5 h-3.5" />, Accessoires: <BatteryCharging className="w-3.5 h-3.5" /> }

export default function TechMartPage() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [cartOpen, setCartOpen] = useState(false)
  const [category, setCategory] = useState('Alle')
  const [brand, setBrand] = useState('Alle')
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('popular')
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  const filtered = useMemo(() => {
    let list = [...products]
    if (category !== 'Alle') list = list.filter(p => p.category === category)
    if (brand !== 'Alle') list = list.filter(p => p.brand === brand)
    if (search.trim()) { const q = search.toLowerCase(); list = list.filter(p => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)) }
    if (sort === 'price-low') list.sort((a, b) => a.price - b.price)
    else if (sort === 'price-high') list.sort((a, b) => b.price - a.price)
    else if (sort === 'rating') list.sort((a, b) => b.rating - a.rating)
    return list
  }, [category, brand, search, sort])

  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0)
  const cartCount = cart.reduce((s, i) => s + i.qty, 0)

  const addToCart = (p: Product) => {
    setCart(prev => {
      const ex = prev.find(i => i.id === p.id)
      if (ex) return prev.map(i => i.id === p.id ? { ...i, qty: i.qty + 1 } : i)
      return [...prev, { ...p, qty: 1 }]
    })
    toast.success(`${p.name} toegevoegd`, { description: `SRD ${p.price.toLocaleString()} · ${cartCount + 1} item(s) in wagen` })
  }

  const updateQty = (id: number, d: number) => setCart(prev => prev.map(i => i.id === id ? { ...i, qty: Math.max(1, i.qty + d) } : i))
  const removeFromCart = (id: number) => { setCart(prev => prev.filter(i => i.id !== id)); toast.info('Product verwijderd') }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* ═══ HEADER ═══ */}
      <header className="sticky top-10 z-30 bg-slate-900 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 flex-shrink-0">
            <TechMartLogo size={28} />
            <span className="text-base font-bold hidden sm:block" style={{ fontFamily: 'var(--font-heading)' }}>TechMart SUR</span>
          </div>
          <div className="flex-1 max-w-xl relative hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input type="text" placeholder="Zoek producten, merken..." value={search} onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <button onClick={() => setCartOpen(true)} className="relative p-2 rounded-lg hover:bg-slate-800 transition-colors" aria-label="Cart">
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-blue-500 text-[10px] font-bold rounded-full flex items-center justify-center">{cartCount}</span>}
          </button>
        </div>
      </header>

      {/* ═══ HERO BANNER ═══ */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 py-10 lg:py-14">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1">
            <span className="text-xs font-bold tracking-wider uppercase text-blue-200">Week Deals</span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight mt-2 mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
              De beste tech, <span className="text-yellow-300">beste prijs</span>
            </h1>
            <p className="text-blue-100 max-w-md mb-6">Suriname&apos;s #1 tech webshop. Officiële dealers van Apple, Samsung, Sony en meer. Snelle bezorging in Paramaribo.</p>
            <div className="flex gap-3">
              <a href="#products" className="px-5 py-2.5 bg-white text-blue-700 font-bold rounded-lg text-sm hover:bg-blue-50 transition-colors" style={{ fontFamily: 'var(--font-heading)' }}>
                Shop nu <ChevronRight className="w-4 h-4 inline" />
              </a>
              <a href="#products" onClick={() => setCategory('Gaming')} className="px-5 py-2.5 bg-blue-700 text-white font-bold rounded-lg text-sm hover:bg-blue-600 transition-colors border border-blue-500" style={{ fontFamily: 'var(--font-heading)' }}>
                <Gamepad2 className="w-4 h-4 inline mr-1" /> Gaming Deals
              </a>
            </div>
          </div>
          <img src="https://images.unsplash.com/photo-1468495244123-6c6c332e6c60?w=500&h=350&fit=crop&q=80" alt="Tech products" className="w-full md:w-[360px] rounded-2xl shadow-2xl object-cover aspect-[3/2]" />
        </div>
      </section>

      {/* ═══ TRUST BAR ═══ */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap justify-center gap-6 text-xs text-slate-600">
          {[{ icon: Truck, t: 'Gratis bezorging > SRD 500' }, { icon: Shield, t: '2 jaar garantie' }, { icon: Headphones, t: '24/7 Klantenservice' }, { icon: Wifi, t: 'Na-verkoop support' }].map(f => (
            <div key={f.t} className="flex items-center gap-1.5"><f.icon className="w-3.5 h-3.5 text-blue-500" />{f.t}</div>
          ))}
        </div>
      </div>

      {/* ═══ PRODUCTS ═══ */}
      <section className="py-8 lg:py-12" id="products">
        <div className="max-w-7xl mx-auto px-4">
          {/* Mobile search */}
          <div className="md:hidden mb-4 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input type="text" placeholder="Zoek producten..." value={search} onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-white border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>

          <div className="flex gap-6">
            {/* SIDEBAR FILTERS (desktop) */}
            <aside className="hidden lg:block w-56 flex-shrink-0">
              <div className="bg-white rounded-xl border border-slate-200 p-4 sticky top-28 space-y-5">
                <div>
                  <h3 className="text-xs font-bold uppercase text-slate-500 mb-2">Categorie</h3>
                  <div className="space-y-1">
                    {allCategories.map(c => (
                      <button key={c} onClick={() => setCategory(c)} className={`flex items-center gap-2 w-full text-left px-2 py-1.5 rounded-lg text-sm transition-colors ${category === c ? 'bg-blue-50 text-blue-700 font-bold' : 'text-slate-600 hover:bg-slate-50'}`}>
                        {c !== 'Alle' && catIcons[c]} {c}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase text-slate-500 mb-2">Merk</h3>
                  <div className="space-y-1">
                    {allBrands.map(b => (
                      <button key={b} onClick={() => setBrand(b)} className={`w-full text-left px-2 py-1.5 rounded-lg text-sm transition-colors ${brand === b ? 'bg-blue-50 text-blue-700 font-bold' : 'text-slate-600 hover:bg-slate-50'}`}>{b}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase text-slate-500 mb-2">Sorteren</h3>
                  <select value={sort} onChange={e => setSort(e.target.value)} className="w-full px-2 py-1.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="popular">Populair</option>
                    <option value="price-low">Prijs: laag → hoog</option>
                    <option value="price-high">Prijs: hoog → laag</option>
                    <option value="rating">Beste beoordeling</option>
                  </select>
                </div>
              </div>
            </aside>

            {/* MAIN */}
            <div className="flex-1 min-w-0">
              {/* Mobile filter bar */}
              <div className="lg:hidden flex gap-2 mb-4 overflow-x-auto pb-2">
                <button onClick={() => setFiltersOpen(!filtersOpen)} className="flex items-center gap-1.5 px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium flex-shrink-0">
                  <SlidersHorizontal className="w-3.5 h-3.5" /> Filters
                </button>
                {allCategories.slice(1).map(c => (
                  <button key={c} onClick={() => setCategory(category === c ? 'Alle' : c)}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium flex-shrink-0 ${category === c ? 'bg-blue-600 text-white' : 'bg-white border border-slate-200'}`}>
                    {catIcons[c]} {c}
                  </button>
                ))}
              </div>

              {/* Mobile filter panel */}
              <AnimatePresence>
                {filtersOpen && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="lg:hidden overflow-hidden mb-4">
                    <div className="bg-white rounded-xl border border-slate-200 p-4 flex flex-wrap gap-4">
                      <div className="flex-1 min-w-[140px]">
                        <label className="text-xs font-bold text-slate-500 block mb-1">Merk</label>
                        <select value={brand} onChange={e => setBrand(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm">
                          {allBrands.map(b => <option key={b} value={b}>{b}</option>)}
                        </select>
                      </div>
                      <div className="flex-1 min-w-[140px]">
                        <label className="text-xs font-bold text-slate-500 block mb-1">Sorteren</label>
                        <select value={sort} onChange={e => setSort(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm">
                          <option value="popular">Populair</option>
                          <option value="price-low">Prijs: laag → hoog</option>
                          <option value="price-high">Prijs: hoog → laag</option>
                          <option value="rating">Beste beoordeling</option>
                        </select>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <p className="text-sm text-slate-500 mb-4">{filtered.length} producten gevonden</p>

              {/* GRID */}
              <motion.div layout className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 lg:gap-4">
                <AnimatePresence mode="popLayout">
                  {filtered.map(p => (
                    <motion.div key={p.id} layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                      className="group bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => setSelectedProduct(p)}>
                      <div className="relative aspect-square overflow-hidden bg-slate-100">
                        <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                        {p.badge && <span className={`absolute top-2 left-2 px-2 py-0.5 text-[10px] font-bold rounded-full ${p.badge === 'Sale' ? 'bg-red-500 text-white' : p.badge === 'Nieuw' ? 'bg-green-500 text-white' : 'bg-blue-500 text-white'}`}>{p.badge}</span>}
                      </div>
                      <div className="p-3">
                        <p className="text-[10px] text-slate-400 font-medium uppercase">{p.brand} · {p.category}</p>
                        <h3 className="font-bold text-slate-900 text-sm leading-tight mt-0.5 line-clamp-2" style={{ fontFamily: 'var(--font-heading)' }}>{p.name}</h3>
                        {p.specs && <p className="text-[11px] text-slate-500 mt-1 truncate">{p.specs}</p>}
                        <div className="flex items-center gap-1 mt-1.5">
                          <Star className="w-3 h-3 fill-amber-400 text-amber-400" /><span className="text-xs text-slate-600">{p.rating}</span><span className="text-[10px] text-slate-400">({p.reviews})</span>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="font-bold text-blue-600 text-sm">SRD {p.price.toLocaleString()}</span>
                          {p.originalPrice && <span className="text-xs text-slate-400 line-through">SRD {p.originalPrice.toLocaleString()}</span>}
                        </div>
                        <button onClick={e => { e.stopPropagation(); addToCart(p) }}
                          className="w-full mt-2 py-2 bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-blue-700 transition-colors opacity-0 group-hover:opacity-100" style={{ fontFamily: 'var(--font-heading)' }}>
                          <ShoppingCart className="w-3.5 h-3.5 inline mr-1" /> In wagen
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>

              {filtered.length === 0 && (
                <div className="text-center py-16 text-slate-500">
                  <Search className="w-10 h-10 mx-auto mb-3 text-slate-300" />
                  <p className="font-bold">Geen producten gevonden</p>
                  <p className="text-sm mt-1">Probeer andere filters of zoekterm</p>
                  <button onClick={() => { setCategory('Alle'); setBrand('Alle'); setSearch('') }} className="mt-3 px-4 py-2 bg-blue-600 text-white text-sm font-bold rounded-lg">Reset filters</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ PRODUCT DETAIL MODAL ═══ */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={() => setSelectedProduct(null)}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-auto shadow-2xl" onClick={e => e.stopPropagation()}>
              <div className="grid sm:grid-cols-2 gap-0">
                <div className="relative bg-slate-100">
                  <img src={selectedProduct.img} alt={selectedProduct.name} className="w-full aspect-square object-cover" />
                  <button onClick={() => setSelectedProduct(null)} className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 flex items-center justify-center" aria-label="Sluiten"><X className="w-4 h-4" /></button>
                </div>
                <div className="p-6 flex flex-col">
                  <p className="text-xs text-slate-400 font-medium uppercase">{selectedProduct.brand} · {selectedProduct.category}</p>
                  <h3 className="text-xl font-bold text-slate-900 mt-1 mb-2" style={{ fontFamily: 'var(--font-heading)' }}>{selectedProduct.name}</h3>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className={`w-4 h-4 ${i < Math.floor(selectedProduct.rating) ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}`} />)}</div>
                    <span className="text-sm text-slate-500">{selectedProduct.rating} ({selectedProduct.reviews} reviews)</span>
                  </div>
                  {selectedProduct.specs && <p className="text-sm text-slate-600 bg-slate-50 rounded-lg p-3 mb-4">{selectedProduct.specs}</p>}
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-2xl font-bold text-blue-600">SRD {selectedProduct.price.toLocaleString()}</span>
                    {selectedProduct.originalPrice && <span className="text-lg text-slate-400 line-through">SRD {selectedProduct.originalPrice.toLocaleString()}</span>}
                  </div>
                  <div className="mt-auto space-y-2">
                    <button onClick={() => { addToCart(selectedProduct); setSelectedProduct(null) }} className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors" style={{ fontFamily: 'var(--font-heading)' }}>
                      <ShoppingCart className="w-4 h-4 inline mr-2" /> Toevoegen aan wagen
                    </button>
                    <div className="flex gap-4 text-[11px] text-slate-500 justify-center pt-1">
                      <span><Truck className="w-3 h-3 inline mr-1" />Gratis bezorging</span>
                      <span><Shield className="w-3 h-3 inline mr-1" />2 jaar garantie</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══ CART DRAWER ═══ */}
      <AnimatePresence>
        {cartOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/40 z-50" onClick={() => setCartOpen(false)} />
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white z-50 shadow-2xl flex flex-col">
              <div className="flex items-center justify-between p-5 border-b border-slate-200">
                <h2 className="text-lg font-bold text-slate-900" style={{ fontFamily: 'var(--font-heading)' }}>Winkelwagen ({cartCount})</h2>
                <button onClick={() => setCartOpen(false)} className="p-2 rounded-lg hover:bg-slate-50" aria-label="Sluiten"><X className="w-5 h-5" /></button>
              </div>
              <div className="flex-1 overflow-auto p-5 space-y-3">
                {cart.length === 0 && <p className="text-center text-slate-400 py-12">Uw wagen is leeg</p>}
                {cart.map(i => (
                  <div key={i.id} className="flex gap-3 bg-slate-50 rounded-xl p-3">
                    <img src={i.img} alt={i.name} className="w-16 h-16 rounded-lg object-cover" />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-sm text-slate-900 truncate">{i.name}</h4>
                      <p className="text-sm text-blue-600 font-bold">SRD {i.price.toLocaleString()}</p>
                      <div className="flex items-center gap-2 mt-1.5">
                        <button onClick={() => updateQty(i.id, -1)} className="w-6 h-6 rounded bg-white border border-slate-200 flex items-center justify-center" aria-label="Minder"><Minus className="w-3 h-3" /></button>
                        <span className="text-sm font-bold w-5 text-center">{i.qty}</span>
                        <button onClick={() => updateQty(i.id, 1)} className="w-6 h-6 rounded bg-white border border-slate-200 flex items-center justify-center" aria-label="Meer"><Plus className="w-3 h-3" /></button>
                        <button onClick={() => removeFromCart(i.id)} className="ml-auto p-1 text-slate-400 hover:text-red-500" aria-label="Verwijderen"><Trash2 className="w-3.5 h-3.5" /></button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {cart.length > 0 && (
                <div className="p-5 border-t border-slate-200">
                  <div className="flex justify-between mb-3"><span className="text-slate-600">Totaal</span><span className="text-lg font-bold">SRD {cartTotal.toLocaleString()}</span></div>
                  <button onClick={() => { setCartOpen(false); toast.success('Checkout functionaliteit beschikbaar in productie', { description: 'Demo winkelwagen werkt! In productie koppelen we dit aan een betaalprovider.' }) }}
                    className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors" style={{ fontFamily: 'var(--font-heading)' }}>
                    Afrekenen <ChevronRight className="w-4 h-4 inline" />
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ═══ FOOTER ═══ */}
      <footer className="bg-slate-900 py-8">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2"><TechMartLogo size={24} /><span className="font-bold text-white text-sm">TechMart SUR</span></div>
          <p className="text-sm text-slate-500">© 2025 TechMart Suriname. Alle prijzen in SRD, inclusief BTW.</p>
        </div>
      </footer>

      <DemoFeatures features={['16 producten met filters & zoeken', 'Product detail modal', 'Werkende winkelwagen (useState)', 'Cart drawer (Framer Motion)', 'Mobiel filter panel', 'Deal-badges & kortingsprijzen', 'WhatsApp integratie']} />
      <FloatingWhatsApp phone="5974559876" company="TechMart SUR" message="Hallo! Ik heb een vraag over een product." />
    </div>
  )
}
