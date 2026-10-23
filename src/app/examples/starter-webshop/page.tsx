'use client'

import Image from 'next/image'
import { useMemo, useState } from 'react'
import { DemoOutro } from '../_components/DemoOutro'
import './style.css'

type Product = { name: string; category: string; price: number; size: string; image: string; note: string }
const products: Product[] = [
  { name: 'Linen overshirt', category: 'Layers', price: 285, size: 'XS–L', image: '/demo-assets/bloom-collection.webp', note: 'Een lichte laag voor dagen die langer duren.' },
  { name: 'Rib tank / sand', category: 'Tops', price: 96, size: 'XS–XL', image: '/demo-assets/bloom-tank.jpg', note: 'Zacht, eenvoudig en gemaakt om vaak te dragen.' },
  { name: 'Soft trouser / olive', category: 'Bottoms', price: 220, size: 'XS–L', image: '/demo-assets/bloom-trouser.jpg', note: 'Een ontspannen silhouet met ruimte om te bewegen.' },
  { name: 'Sundown scarf', category: 'Objects', price: 75, size: 'One size', image: '/demo-assets/bloom-scarf.jpg', note: 'Het kleine detail dat alles samenbrengt.' },
]
const categories = ['All pieces', 'Layers', 'Tops', 'Bottoms', 'Objects']

export default function BloomBoutiquePage() {
  const [category, setCategory] = useState('All pieces')
  const [cart, setCart] = useState<Product[]>([])
  const [selected, setSelected] = useState<Product | null>(null)
  const [cartOpen, setCartOpen] = useState(false)
  const [checkout, setCheckout] = useState(false)
  const shown = useMemo(() => category === 'All pieces' ? products : products.filter(item => item.category === category), [category])
  const add = (product: Product) => setCart(items => items.some(item => item.name === product.name) ? items : [...items, product])
  const total = cart.reduce((sum, item) => sum + item.price, 0)

  return <div className="bloom" id="top">
    <div className="bloom-disclosure">Fictieve collectie · interactief webshopconcept door NextX</div>
    <header className="bloom-header"><a href="#top" className="bloom-logo">bloom<span>®</span></a><nav aria-label="Boutique navigatie"><a href="#collection">Collection</a><a href="#editorial">The edit</a><a href="#about">About</a></nav><button type="button" onClick={() => setCartOpen(true)} className="bloom-bag">Your bag <span>{cart.length}</span></button></header>
    <main>
      <section className="bloom-hero"><div className="bloom-hero-image"><Image unoptimized src="/demo-assets/bloom-collection.webp" alt="Linnen en zachte silhouetten uit de fictieve Bloom collectie" fill priority sizes="(min-width:900px) 57vw, 100vw" /><span className="bloom-vertical">THE WARM WEATHER EDIT</span><div className="bloom-image-label">MADE FOR<br />LIVING IN.</div></div><div className="bloom-hero-copy"><div className="bloom-season"><span>NEW COLLECTION / 2026</span><span>PARAMARIBO, SR</span></div><p className="bloom-overline">TROPICAL CONTEMPORARY</p><h1>Wear the<br /><em>feeling.</em></h1><p className="bloom-intro">Easy shapes. Sun-warmed color. A smaller wardrobe for bigger days.</p><a className="bloom-arrow-link" href="#collection">Explore the collection <span>↗</span></a><div className="bloom-hero-bottom">EVERYDAY PIECES / EXTRAORDINARY LIGHT</div></div></section>
      <div className="bloom-ticker"><span>A LITTLE LESS, A LOT MORE YOU</span><b>✳</b><span>THE ART OF GETTING DRESSED</span><b>✳</b><span>A LITTLE LESS, A LOT MORE YOU</span></div>
      <section className="bloom-intro-section" id="about"><small>THE IDEA</small><h2>For everywhere<br />the day <em>takes you.</em></h2><p>Een conceptcollectie voor het tropische dagelijks leven. Relaxte vormen en rustige kleur, ontworpen om moeiteloos samen te gaan.</p></section>
      <section className="bloom-collection" id="collection"><div className="bloom-section-head"><div><small>THE COLLECTION</small><h2>Considered pieces.<br /><em>Easy living.</em></h2></div><p>Een kleine edit voor warme dagen.<br />Filter, bekijk details en voeg items toe aan je tas.</p></div><div className="bloom-filters" aria-label="Productfilters">{categories.map(item => <button key={item} type="button" aria-pressed={category === item} onClick={() => setCategory(item)}>{item}</button>)}</div><div className="bloom-grid">{shown.map(product => <article key={product.name} className="bloom-product"><button type="button" onClick={() => setSelected(product)} className="bloom-product-image" aria-label={`Bekijk ${product.name}`}><Image unoptimized src={product.image} alt={product.name} fill sizes="(min-width:1100px) 25vw, (min-width:600px) 50vw, 100vw" /><span>VIEW PIECE ↗</span></button><div className="bloom-product-info"><div><small>THE BLOOM EDIT</small><h3>{product.name}</h3><p>{product.category} · {product.size}</p></div><span>SRD {product.price}</span></div><button type="button" className="bloom-add" onClick={() => add(product)}>{cart.some(item => item.name === product.name) ? 'Added to bag ✓' : 'Add to bag ↗'}</button></article>)}</div></section>
      <section className="bloom-editorial" id="editorial"><div className="bloom-editorial-copy"><small>THE EDIT</small><h2>Soft days.<br /><em>Strong point<br />of view.</em></h2><p>Style without the effort. A wardrobe that moves from a slow morning to wherever the evening goes.</p><a href="#collection" className="bloom-arrow-link">Shop the edit <span>↗</span></a></div><div className="bloom-editorial-image"><Image unoptimized src="/demo-assets/bloom-tank.jpg" alt="Zacht kledingdetail uit de Bloom conceptcollectie" fill sizes="(min-width:900px) 50vw, 100vw" /><span>AN EXERCISE IN EASE</span></div></section>
      <section className="bloom-end"><span>Find your kind of easy.</span><a href="#collection">SHOP THE COLLECTION ↗</a></section>
    </main>
    <footer className="bloom-footer"><a href="#top" className="bloom-logo">bloom<span>®</span></a><p>Een fictieve boutique, ontworpen als interactief NextX concept.</p><a href="#top">Back to top ↑</a></footer>
    {(selected || cartOpen || checkout) && <div className="bloom-overlay" role="dialog" aria-modal="true" aria-label={checkout ? 'Demo checkout' : cartOpen ? 'Winkelwagen' : selected?.name}>
      {checkout ? <div className="bloom-dialog bloom-checkout"><button type="button" className="bloom-close" onClick={() => setCheckout(false)}>Sluiten ✕</button><small>DEMO CHECKOUT</small><h2>Your edit is ready.</h2><p>Dit is een conceptdemo. Er wordt niets betaald of verzonden.</p><button type="button" className="bloom-dark-button" onClick={() => setCheckout(false)}>Back to the shop ↗</button></div> : cartOpen ? <div className="bloom-drawer"><div className="bloom-drawer-top"><h2>Your bag <span>({cart.length})</span></h2><button type="button" onClick={() => setCartOpen(false)}>Sluiten ✕</button></div>{cart.length === 0 ? <p className="bloom-empty">Your bag is waiting for something good.</p> : <><div className="bloom-cart-lines">{cart.map(item => <div key={item.name}><div className="bloom-cart-thumb"><Image unoptimized src={item.image} alt="" fill sizes="80px" /></div><p>{item.name}<small>{item.category} · {item.size}</small></p><strong>SRD {item.price}</strong><button type="button" aria-label={`Verwijder ${item.name}`} onClick={() => setCart(items => items.filter(other => other.name !== item.name))}>×</button></div>)}</div><div className="bloom-cart-total"><span>Subtotal</span><strong>SRD {total}</strong></div><p className="bloom-cart-note">Betaling en levering zijn gesimuleerd.</p><button type="button" className="bloom-dark-button" onClick={() => { setCartOpen(false); setCheckout(true) }}>Demo checkout ↗</button></>}</div> : selected && <div className="bloom-dialog bloom-detail"><button type="button" className="bloom-close" onClick={() => setSelected(null)}>Sluiten ✕</button><div className="bloom-detail-image"><Image unoptimized src={selected.image} alt={selected.name} fill sizes="(min-width:700px) 45vw, 90vw" /></div><div className="bloom-detail-copy"><small>THE BLOOM EDIT / {selected.category.toUpperCase()}</small><h2>{selected.name}</h2><p>{selected.note}</p><p>Available sizes: {selected.size}</p><strong>SRD {selected.price}</strong><button type="button" className="bloom-dark-button" onClick={() => { add(selected); setSelected(null) }}>Add to bag ↗</button></div></div>}
    </div>}
    <DemoOutro />
  </div>
}
