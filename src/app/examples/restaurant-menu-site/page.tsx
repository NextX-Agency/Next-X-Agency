'use client'

import Image from 'next/image'
import { useState } from 'react'
import { DemoOutro } from '../_components/DemoOutro'
import styles from './warung.module.css'

const dishes = [
  { name: 'Roti kip', type: 'Roti', description: 'Curried chicken, potato, yardlong beans and fresh pickle.', price: 68 },
  { name: 'Vegetarian roti', type: 'Roti', description: 'Curried potato, yardlong beans, egg and vegetables.', price: 55 },
  { name: 'Nasi kip', type: 'Rice & bami', description: 'Fried rice, spiced chicken, vegetables and egg.', price: 62 },
  { name: 'Moksi alesi', type: 'Rice & bami', description: 'Rice with chicken, salted meat, vegetables and pickle.', price: 72 },
  { name: 'Bami with chicken', type: 'Rice & bami', description: 'Fried noodles with chicken and fresh vegetables.', price: 64 },
  { name: 'Fried fish', type: 'Fish', description: 'Crispy fish with fries and cucumber.', price: 78 },
  { name: 'Ginger beer', type: 'Drinks', description: 'Fresh, spicy and served cold.', price: 18 },
  { name: 'Markoesa', type: 'Drinks', description: 'A glass of tropical refreshment.', price: 16 },
]
const categories = ['All', 'Roti', 'Rice & bami', 'Fish', 'Drinks']

export default function WarungIndahPage() {
  const [category, setCategory] = useState('All')
  const [sent, setSent] = useState(false)
  const [reservation, setReservation] = useState({ date: '', time: '', guests: '', name: '' })
  const shown = category === 'All' ? dishes : dishes.filter(dish => dish.type === category)
  return <div className={styles.site}>
    <div className={styles.concept}>FICTIONAL RESTAURANT CONCEPT <span>✳</span> DESIGN BY NEXTX AGENCY</div>
    <header className={styles.header}><a className={styles.logo} href="#top">warung<span>indah</span><b>✳</b></a><nav aria-label="Main navigation"><a href="#story">Our story</a><a href="#menu">Menu</a><a href="#visit">Visit us</a></nav><a className={styles.headerLink} href="#book">Book a table ↗</a></header>
    <main id="top">
      <section className={styles.hero}><Image src="/demo-assets/warung-roti-table.webp" alt="Roti with chicken, potato and vegetables on a warm wooden table" fill priority sizes="100vw" className={styles.heroImage}/><div className={styles.heroShade}/><div className={styles.heroKicker}>SURINAMESE KITCHEN <span>·</span> PARAMARIBO</div><div className={styles.heroContent}><p className={styles.eyebrow}>THE TASTE OF TOGETHER</p><h1>Come in.<br/><em>Pull up a chair.</em></h1><p>From the first bite of roti to the last conversation at the table. At Indah there is always room for you.</p><div className={styles.heroActions}><a href="#menu" className={styles.button}>Explore our menu <span>↗</span></a><a href="#book" className={styles.underLink}>Book a table →</a></div></div><a className={styles.scroll} href="#story">SCROLL TO DISCOVER ↓</a></section>
      <section id="story" className={styles.intro}><div className={styles.sectionLine}><span>THE FEELING</span><span>A place to come home to</span></div><div className={styles.introGrid}><div className={styles.flower}>✳</div><h2>A full table.<br/>A warm <em>welcome.</em></h2><div className={styles.introCopy}><p>The best moments start with something good on the table. Our kitchen brings familiar Surinamese flavours together with the calm to really enjoy them.</p><a href="#menu">Taste it yourself ↗</a></div></div></section>
      <div className={styles.ribbon} aria-hidden="true">ROTI ✳ NASI ✳ BAMI ✳ EATING TOGETHER ✳ ROTI ✳ NASI ✳</div>
      <section id="menu" className={styles.menu}><div className={styles.menuHeading}><div><p className={styles.eyebrow}>THE MENU</p><h2>What are you<br/><em>in the mood for?</em></h2></div><p>From a quick lunch to a long dinner: pick something that makes you happy.</p></div><div className={styles.menuGrid}><div className={styles.foodImage}><Image src="/demo-assets/warung-roti-table.webp" alt="Roti kip with yardlong beans and cucumber" fill sizes="(min-width:900px) 40vw, 100vw" className={styles.foodPhoto}/><div><span>FROM OUR KITCHEN</span><strong>Roti kip</strong></div></div><div><div className={styles.tabs} role="tablist" aria-label="Menu categories">{categories.map(item=><button type="button" role="tab" aria-selected={category===item} className={category===item?styles.selected:''} key={item} onClick={()=>setCategory(item)}>{item}</button>)}</div><div role="tabpanel">{shown.map(dish=><article className={styles.dish} key={dish.name}><div><h3>{dish.name}</h3><p>{dish.description}</p></div><strong>SRD {dish.price}</strong></article>)}</div><p className={styles.note}>Sample menu for a fictional restaurant. Dishes and prices are illustrative.</p></div></div></section>
      <section id="visit" className={styles.visit}><div><p className={styles.eyebrow}>COME BY</p><h2>Good company<br/>starts <em>here.</em></h2></div><div className={styles.visitDetails}><div><span>FIND US</span><strong>Paramaribo, Suriname</strong><p>Sample location for this concept.</p></div><div><span>OPENING HOURS</span><strong>Monday – Saturday</strong><p>11:30 – 21:00 · illustrative hours</p></div><a href="#book">Book a table ↗</a></div></section>
      <section id="book" className={styles.booking}><div><p className={styles.eyebrow}>BOOK</p><h2>There is a seat<br/><em>waiting for you.</em></h2><p>A few details show how simple booking on a restaurant site can be.</p><small>DEMO FLOW · NOTHING IS SENT</small></div>{sent?<div className={styles.confirm} role="status"><span>✳</span><h3>Your request is ready.</h3><p>{reservation.name}, you chose {reservation.date} at {reservation.time} for {reservation.guests} people. This is a demo; no booking was made.</p><button type="button" onClick={()=>setSent(false)}>Try again ↗</button></div>:<form className={styles.form} onSubmit={event=>{event.preventDefault();setSent(true)}}><div><label>Date<input required type="date" min={new Date().toISOString().split('T')[0]} value={reservation.date} onChange={event=>setReservation({...reservation,date:event.target.value})}/></label><label>Time<select required value={reservation.time} onChange={event=>setReservation({...reservation,time:event.target.value})}><option value="">Choose a time</option><option>18:00</option><option>19:30</option><option>20:00</option></select></label></div><div><label>Guests<select required value={reservation.guests} onChange={event=>setReservation({...reservation,guests:event.target.value})}><option value="">Choose a number</option><option>2</option><option>3</option><option>4</option><option>5+</option></select></label><label>Name<input required placeholder="Your name" autoComplete="name" value={reservation.name} onChange={event=>setReservation({...reservation,name:event.target.value})}/></label></div><button type="submit">Review your request ↗</button></form>}</section>
    </main><footer className={styles.footer}><a className={styles.logo} href="#top">warung<span>indah</span><b>✳</b></a><span>A fictional restaurant concept, designed by NextX Agency.</span><a href="#top">Back to top ↑</a></footer><DemoOutro/>
  </div>
}
