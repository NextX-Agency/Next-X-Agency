'use client'

import Image from 'next/image'
import { useMemo, useState } from 'react'
import { DemoOutro } from '../_components/DemoOutro'

type Product = { name: string; category: string; price: number; spec: string; stock: string; image: string }

const products: Product[] = [
  { name: 'Orion 14 laptop', category: 'Laptops', price: 4299, spec: '14 inch / 16GB / 512GB SSD', stock: 'Op voorraad', image: '/demo-assets/tech-orion.jpg' },
  { name: 'AeroPad 11', category: 'Tablets', price: 1899, spec: '11 inch / 128GB / WiFi', stock: 'Op bestelling', image: '/demo-assets/tech-aeropad.jpg' },
  { name: 'Norda ANC headphones', category: 'Audio', price: 899, spec: 'Active noise cancelling / 32 uur', stock: 'Op voorraad', image: '/demo-assets/tech-headphones.jpg' },
  { name: 'Vector 27 display', category: 'Displays', price: 1699, spec: '27 inch / 4K / USB-C', stock: 'Op voorraad', image: '/demo-assets/tech-display.jpg' },
  { name: 'Core wireless set', category: 'Accessoires', price: 349, spec: 'Toetsenbord + muis / USB-C', stock: 'Op voorraad', image: '/demo-assets/tech-keyboard.jpg' },
  { name: 'Pulse game controller', category: 'Gaming', price: 499, spec: 'Draadloos / haptic feedback', stock: 'Op voorraad', image: '/demo-assets/tech-controller.jpg' },
]

const categories = ['Alle', 'Laptops', 'Tablets', 'Audio', 'Displays', 'Accessoires', 'Gaming']

export default function TechMartPage() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('Alle')
  const [sort, setSort] = useState('relevant')
  const [selected, setSelected] = useState<Product | null>(null)
  const [cart, setCart] = useState<Product[]>([])
  const [cartOpen, setCartOpen] = useState(false)
  const [confirmation, setConfirmation] = useState(false)

  const list = useMemo(() => {
    const result = products.filter(item => (category === 'Alle' || item.category === category) && `${item.name} ${item.spec}`.toLowerCase().includes(search.toLowerCase()))
    return [...result].sort((a, b) => sort === 'low' ? a.price - b.price : sort === 'high' ? b.price - a.price : a.name.localeCompare(b.name))
  }, [category, search, sort])

  const addToCart = (product: Product) => setCart(items => items.some(item => item.name === product.name) ? items : [...items, product])
  const total = cart.reduce((sum, item) => sum + item.price, 0)

  return <div className="min-h-screen bg-[#f7f8fa] text-[#17202b]" style={{ fontFamily: 'var(--font-demo-product)' }}>
    <header className="border-b border-[#17202b]/15 bg-white">
      <div className="mx-auto flex max-w-[90rem] items-center gap-5 px-4 py-4 md:px-8">
        <a href="#catalogus" className="text-xl font-bold tracking-[-0.06em]">TECH<span className="text-[#2364d2]">MART</span> <small className="text-[0.58rem] font-normal tracking-[0.18em] text-[#667486]">SUR</small></a>
        <div className="hidden flex-1 md:block"><input aria-label="Zoek in assortiment" value={search} onChange={event => setSearch(event.target.value)} className="w-full border border-[#17202b]/20 bg-[#f7f8fa] px-4 py-2.5 text-sm" placeholder="Zoek op product of specificatie" /></div>
        <button type="button" onClick={() => setCartOpen(true)} className="ml-auto min-h-11 border-l border-[#17202b]/15 pl-4 text-sm font-semibold">Cart ({cart.length})</button>
      </div>
      <div className="border-t border-[#17202b]/10 px-4 py-2 md:hidden"><input aria-label="Zoek producten" value={search} onChange={event => setSearch(event.target.value)} className="w-full border border-[#17202b]/20 bg-[#f7f8fa] px-3 py-2 text-sm" placeholder="Zoek producten" /></div>
    </header>

    <main id="catalogus" className="mx-auto max-w-[90rem] px-4 py-8 md:px-8 md:py-12">
      <section className="grid gap-6 border-b border-[#17202b]/15 pb-8 md:grid-cols-[1fr_auto] md:items-end"><div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#2364d2]">Elektronica voor thuis en werk</p><h1 className="mt-3 max-w-2xl text-5xl font-semibold leading-[0.95] tracking-[-0.06em] md:text-7xl">Vergelijk op wat telt.</h1></div><p className="max-w-xs text-sm leading-6 text-[#667486]">Fictief assortiment met echte productlogica. Zoek, filter en bekijk specificaties.</p></section>
      <section className="grid gap-8 py-8 lg:grid-cols-[13rem_1fr]"><aside><p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#667486]">Categorie</p><nav className="mt-4 flex gap-2 overflow-x-auto pb-1 lg:grid lg:gap-1 lg:overflow-visible">{categories.map(item => <button key={item} type="button" onClick={() => setCategory(item)} className={`min-h-11 shrink-0 border-b-2 px-3 py-2 text-left text-sm lg:border-b-0 lg:border-l-2 ${category === item ? 'border-[#2364d2] bg-[#eaf0fc] font-semibold text-[#2364d2]' : 'border-transparent text-[#667486]'}`}>{item}</button>)}</nav></aside>
        <div><div className="mb-5 flex flex-wrap items-center justify-between gap-3 border-y border-[#17202b]/15 py-3 text-sm"><span className="text-[#667486]">{list.length} producten</span><label className="flex min-h-11 items-center gap-2">Sorteer<select value={sort} onChange={event => setSort(event.target.value)} className="border border-[#17202b]/20 bg-white px-2 py-1.5 text-sm"><option value="relevant">Naam</option><option value="low">Prijs laag-hoog</option><option value="high">Prijs hoog-laag</option></select></label></div>
          <div className="grid gap-x-5 gap-y-8 sm:grid-cols-2 xl:grid-cols-3">{list.map(product => <article key={product.name} className="group"><button type="button" onClick={() => setSelected(product)} className="block w-full text-left"><div className="relative aspect-square overflow-hidden bg-white"><Image src={product.image} alt={product.name} fill sizes="(min-width: 1280px) 30vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition duration-500 group-hover:scale-[1.025]" /></div><div className="mt-3"><div className="flex items-baseline justify-between gap-3"><h2 className="font-semibold">{product.name}</h2><span className="font-semibold">SRD {product.price}</span></div><p className="mt-1 text-xs text-[#667486]">{product.spec}</p><p className={`mt-3 text-xs ${product.stock === 'Op voorraad' ? 'text-[#2e7d5b]' : 'text-[#667486]'}`}>{product.stock}</p></div></button><button type="button" onClick={() => addToCart(product)} className="mt-3 min-h-11 border border-[#17202b]/25 px-3 py-2 text-xs font-semibold">{cart.some(item => item.name === product.name) ? 'In cart' : 'Add to cart'}</button></article>)}</div>
          {list.length === 0 && <div className="border border-dashed border-[#17202b]/25 p-10 text-center text-[#667486]">Geen producten gevonden. Pas je zoekterm of categorie aan.</div>}
        </div>
      </section>
    </main>

    <footer className="border-t border-[#17202b]/15 bg-white px-4 py-7 md:px-8"><div className="mx-auto flex max-w-[90rem] flex-wrap justify-between gap-4 text-sm"><span className="font-semibold">TechMart SUR</span><span className="text-[#667486]">Betaling en levering zijn gesimuleerd in deze demo.</span></div></footer>

    {selected && <div className="fixed inset-0 z-[70] overflow-y-auto bg-[#17202b]/65 p-4 md:p-10" role="dialog" aria-modal="true" aria-label={selected.name}><div className="mx-auto max-w-4xl bg-white p-5 md:p-8"><div className="grid gap-8 md:grid-cols-2"><div className="relative aspect-square bg-[#f7f8fa]"><Image src={selected.image} alt={selected.name} fill sizes="50vw" className="object-cover" /></div><div className="self-center"><p className="text-xs uppercase tracking-[0.18em] text-[#2364d2]">{selected.category}</p><h2 className="mt-3 text-4xl font-semibold tracking-[-0.06em]">{selected.name}</h2><p className="mt-4 text-xl font-semibold">SRD {selected.price}</p><p className="mt-4 text-sm leading-6 text-[#667486]">{selected.spec}</p><p className="mt-3 text-sm text-[#2e7d5b]">{selected.stock}</p><button type="button" onClick={() => { addToCart(selected); setSelected(null) }} className="mt-8 bg-[#2364d2] px-5 py-3 text-sm font-semibold text-white">Add to cart</button><button type="button" onClick={() => setSelected(null)} className="ml-4 text-sm underline">Sluiten</button></div></div></div></div>}

    {cartOpen && <div className="fixed inset-0 z-[75] bg-[#17202b]/45 p-4 md:p-10" role="dialog" aria-modal="true" aria-label="TechMart winkelwagen"><div className="ml-auto min-h-full w-full max-w-md bg-white p-6 md:p-8"><div className="flex items-center justify-between"><h2 className="text-2xl font-semibold tracking-[-0.05em]">Cart</h2><button type="button" onClick={() => setCartOpen(false)} className="text-sm underline">Sluiten</button></div>{cart.length === 0 ? <p className="mt-10 text-sm text-[#667486]">Je cart is nog leeg.</p> : <><div className="mt-8 divide-y divide-[#17202b]/15">{cart.map(item => <div key={item.name} className="flex justify-between gap-4 py-4 text-sm"><span>{item.name}<small className="mt-1 block text-xs text-[#667486]">{item.spec}</small></span><strong>SRD {item.price}</strong></div>)}</div><div className="mt-6 flex justify-between border-t border-[#17202b]/15 pt-5 font-semibold"><span>Totaal</span><span>SRD {total}</span></div><button type="button" onClick={() => { setConfirmation(true); setCartOpen(false) }} className="mt-7 w-full bg-[#2364d2] px-5 py-3 text-sm font-semibold text-white">Demo-checkout</button></>}</div></div>}
    {confirmation && <div className="fixed inset-0 z-[80] grid place-items-center bg-[#17202b]/55 p-5" role="dialog" aria-modal="true" aria-label="Demo checkout"><div className="w-full max-w-sm bg-white p-7"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#2364d2]">Simulatie</p><h2 className="mt-3 text-2xl font-semibold">Checkout staat klaar.</h2><p className="mt-3 text-sm leading-6 text-[#667486]">Er wordt niets betaald of verstuurd. Dit is alleen de interactie van de demo.</p><button type="button" onClick={() => setConfirmation(false)} className="mt-7 bg-[#17202b] px-5 py-3 text-sm font-semibold text-white">Sluiten</button></div></div>}
    <DemoOutro />
  </div>
}
