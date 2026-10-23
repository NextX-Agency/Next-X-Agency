'use client'

import Image from 'next/image'
import { useState } from 'react'
import { DemoOutro } from '../_components/DemoOutro'
import styles from './warung.module.css'

const dishes = [
  { name: 'Roti kip', type: 'Roti', description: 'Kerriekip, aardappel, kousenband en fris zuur.', price: 68 },
  { name: 'Roti vegetarisch', type: 'Roti', description: 'Kerrie-aardappel, kousenband, ei en groente.', price: 55 },
  { name: 'Nasi kip', type: 'Rijst & bami', description: 'Gebakken rijst, gekruide kip, groente en ei.', price: 62 },
  { name: 'Moksi alesi', type: 'Rijst & bami', description: 'Rijst met kip, zoutvlees, groente en zuur.', price: 72 },
  { name: 'Bami met kip', type: 'Rijst & bami', description: 'Gebakken bami met kip en verse groente.', price: 64 },
  { name: 'Gebakken vis', type: 'Vis', description: 'Krokante vis met friet en komkommer.', price: 78 },
  { name: 'Gemberbier', type: 'Dranken', description: 'Fris, pittig en koud geserveerd.', price: 18 },
  { name: 'Markoesa', type: 'Dranken', description: 'Een glas tropische verfrissing.', price: 16 },
]
const categories = ['Alles', 'Roti', 'Rijst & bami', 'Vis', 'Dranken']

export default function WarungIndahPage() {
  const [category, setCategory] = useState('Alles')
  const [sent, setSent] = useState(false)
  const [reservation, setReservation] = useState({ date: '', time: '', guests: '', name: '' })
  const shown = category === 'Alles' ? dishes : dishes.filter(dish => dish.type === category)
  return <div className={styles.site}>
    <div className={styles.concept}>FICTIEF RESTAURANTCONCEPT <span>✳</span> ONTWERP DOOR NEXTX AGENCY</div>
    <header className={styles.header}><a className={styles.logo} href="#top">warung<span>indah</span><b>✳</b></a><nav aria-label="Hoofdnavigatie"><a href="#verhaal">Ons verhaal</a><a href="#menu">Menukaart</a><a href="#bezoek">Bezoek ons</a></nav><a className={styles.headerLink} href="#reserveren">Reserveer een tafel ↗</a></header>
    <main id="top">
      <section className={styles.hero}><Image src="/demo-assets/warung-roti-table.webp" alt="Roti met kip, aardappel en groenten op een warme houten tafel" fill priority sizes="100vw" className={styles.heroImage}/><div className={styles.heroShade}/><div className={styles.heroKicker}>SURINAAMSE KEUKEN <span>·</span> PARAMARIBO</div><div className={styles.heroContent}><p className={styles.eyebrow}>DE SMAAK VAN SAMEN</p><h1>Kom binnen.<br/><em>Schuif aan.</em></h1><p>Van de eerste hap roti tot het laatste gesprek aan tafel. Bij Indah is er altijd plek voor je.</p><div className={styles.heroActions}><a href="#menu" className={styles.button}>Ontdek onze kaart <span>↗</span></a><a href="#reserveren" className={styles.underLink}>Reserveer een tafel →</a></div></div><a className={styles.scroll} href="#verhaal">SCROLL OM TE ONTDEKKEN ↓</a></section>
      <section id="verhaal" className={styles.intro}><div className={styles.sectionLine}><span>HET GEVOEL</span><span>Een plek om thuis te komen</span></div><div className={styles.introGrid}><div className={styles.flower}>✳</div><h2>Een volle tafel.<br/>Een warm <em>welkom.</em></h2><div className={styles.introCopy}><p>De beste momenten beginnen met iets lekkers op tafel. Onze keuken brengt vertrouwde Surinaamse smaken samen met de rust om er echt van te genieten.</p><a href="#menu">Proef het zelf ↗</a></div></div></section>
      <div className={styles.ribbon} aria-hidden="true">ROTI ✳ NASI ✳ BAMI ✳ SAMEN ETEN ✳ ROTI ✳ NASI ✳</div>
      <section id="menu" className={styles.menu}><div className={styles.menuHeading}><div><p className={styles.eyebrow}>DE MENUKAART</p><h2>Waar heb jij<br/><em>trek in?</em></h2></div><p>Van een snelle lunch tot lang tafelen: kies iets waar je blij van wordt.</p></div><div className={styles.menuGrid}><div className={styles.foodImage}><Image src="/demo-assets/warung-roti-table.webp" alt="Roti kip met kousenband en komkommer" fill sizes="(min-width:900px) 40vw, 100vw" className={styles.foodPhoto}/><div><span>UIT ONZE KEUKEN</span><strong>Roti kip</strong></div></div><div><div className={styles.tabs} role="tablist" aria-label="Menucategorieën">{categories.map(item=><button type="button" role="tab" aria-selected={category===item} className={category===item?styles.selected:''} key={item} onClick={()=>setCategory(item)}>{item}</button>)}</div><div role="tabpanel">{shown.map(dish=><article className={styles.dish} key={dish.name}><div><h3>{dish.name}</h3><p>{dish.description}</p></div><strong>SRD {dish.price}</strong></article>)}</div><p className={styles.note}>Voorbeeldmenu voor een fictief restaurant. Gerechten en prijzen zijn illustratief.</p></div></div></section>
      <section id="bezoek" className={styles.visit}><div><p className={styles.eyebrow}>KOM LANGS</p><h2>Goed gezelschap<br/>begint <em>hier.</em></h2></div><div className={styles.visitDetails}><div><span>VIND ONS</span><strong>Paramaribo, Suriname</strong><p>Voorbeeldlocatie voor dit concept.</p></div><div><span>OPENINGSTIJDEN</span><strong>Maandag – zaterdag</strong><p>11:30 – 21:00 · illustratieve tijden</p></div><a href="#reserveren">Tafel reserveren ↗</a></div></section>
      <section id="reserveren" className={styles.booking}><div><p className={styles.eyebrow}>RESERVEER</p><h2>Er staat een plek<br/><em>voor je klaar.</em></h2><p>Een paar gegevens tonen hoe eenvoudig een reservering op een restaurantsite kan zijn.</p><small>DEMOFLOW · ER WORDT NIETS VERSTUURD</small></div>{sent?<div className={styles.confirm} role="status"><span>✳</span><h3>Je aanvraag is klaar.</h3><p>{reservation.name}, je koos {reservation.date} om {reservation.time} voor {reservation.guests} personen. Dit is een demo; er is geen reservering geplaatst.</p><button type="button" onClick={()=>setSent(false)}>Nog een keer proberen ↗</button></div>:<form className={styles.form} onSubmit={event=>{event.preventDefault();setSent(true)}}><div><label>Datum<input required type="date" min={new Date().toISOString().split('T')[0]} value={reservation.date} onChange={event=>setReservation({...reservation,date:event.target.value})}/></label><label>Tijd<select required value={reservation.time} onChange={event=>setReservation({...reservation,time:event.target.value})}><option value="">Kies een tijd</option><option>18:00</option><option>19:30</option><option>20:00</option></select></label></div><div><label>Personen<select required value={reservation.guests} onChange={event=>setReservation({...reservation,guests:event.target.value})}><option value="">Kies aantal</option><option>2</option><option>3</option><option>4</option><option>5+</option></select></label><label>Naam<input required placeholder="Jouw naam" autoComplete="name" value={reservation.name} onChange={event=>setReservation({...reservation,name:event.target.value})}/></label></div><button type="submit">Bekijk je aanvraag ↗</button></form>}</section>
    </main><footer className={styles.footer}><a className={styles.logo} href="#top">warung<span>indah</span><b>✳</b></a><span>Een fictief restaurantconcept, ontworpen door NextX Agency.</span><a href="#top">Terug naar boven ↑</a></footer><DemoOutro/>
  </div>
}
