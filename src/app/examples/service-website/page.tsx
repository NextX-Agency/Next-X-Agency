'use client'

import Image from 'next/image'
import { useState } from 'react'
import { DemoOutro } from '../_components/DemoOutro'
import './style.css'

const care = [
  ['Preventieve zorg', 'Een helder beeld van je mondgezondheid, met advies voor jouw dagelijks leven.'],
  ['Restauratieve zorg', 'Herstel met aandacht voor comfort, functie en een natuurlijk resultaat.'],
  ['Mondhygiëne', 'Professionele reiniging en praktische begeleiding voor een gezonde basis.'],
  ['Esthetische zorg', 'Een open gesprek over mogelijkheden, wensen en wat bij je past.'],
]
const dates = ['Wo 24 sep', 'Do 25 sep', 'Vr 26 sep']
const times = ['09:30', '11:00', '14:30', '16:00']

export default function ServiceWebsitePage() {
  const [treatment, setTreatment] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [submitted, setSubmitted] = useState(false)
  return <div className="forma" id="begin">
    <div className="forma-disclosure">Fictieve praktijk · interactief websiteconcept door NextX</div>
    <header className="forma-header"><a href="#begin" className="forma-logo">denta<span>care.</span><small>PARAMARIBO</small></a><nav aria-label="Praktijknavigatie"><a href="#visie">Onze visie</a><a href="#zorg">Behandelingen</a><a href="#afspraak">Afspraak</a></nav><a className="forma-cta" href="#afspraak">Plan je bezoek ↗</a></header>
    <main>
      <section className="forma-hero"><div className="forma-hero-copy"><p className="forma-overline">✳ &nbsp; Een andere kijk op tandzorg</p><h1>Zorg die<br /><em>goed voelt.</em></h1><p>Een rustig moment voor jezelf. Aandacht voor jouw vragen. En tandzorg die begint met luisteren.</p><a href="#afspraak" className="forma-pill">Maak een afspraak <span>↗</span></a><div className="forma-hero-foot"><span>DENTACARE / PARAMARIBO</span><span>SCROLL OM TE ONTDEKKEN ↓</span></div></div><div className="forma-hero-image"><Image src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1400&h=1700&fit=crop&q=88" alt="Lichte behandelruimte als beeld voor deze fictieve praktijk" fill priority sizes="(min-width:900px) 47vw, 100vw" /><div className="forma-stamp">ruimte voor<br /><i>een glimlach</i><b>✳</b></div></div></section>
      <div className="forma-ticker"><span>TIJD VOOR JOU</span><b>✳</b><span>HELDER ADVIES</span><b>✳</b><span>MET AANDACHT</span><b>✳</b><span>TIJD VOOR JOU</span></div>
      <section className="forma-vision" id="visie"><p className="forma-overline">ONZE VISIE</p><div><h2>Een bezoek aan de tandarts mag <em>anders voelen.</em></h2><div className="forma-vision-detail"><p>We nemen de tijd om te begrijpen wat je nodig hebt. We leggen opties helder uit en maken samen een plan dat bij je past.</p><span>✳</span></div></div></section>
      <section className="forma-care" id="zorg"><div className="forma-care-head"><p className="forma-overline">WAT WE DOEN</p><h2>Zorg met<br /><em>ruimte voor jou.</em></h2><p>Van een eerste kennismaking tot de zorg die daarna past. Open een behandeling om meer te zien.</p></div><div className="forma-care-list">{care.map(([title, description]) => <details key={title}><summary><small>✳</small><strong>{title}</strong><span>↗</span></summary><p>{description}</p></details>)}</div></section>
      <section className="forma-statement"><small>Een praktijk voor mensen.</small><p>Goede zorg begint met <em>vertrouwen.</em></p><span>✳</span></section>
      <section className="forma-appointment" id="afspraak"><div><p className="forma-overline">KOM LANGS</p><h2>De eerste stap<br />is <em>eenvoudig.</em></h2><p>Kies in deze interactieve conceptdemo een behandeling en moment. Dit formulier verstuurt of bewaart geen gegevens.</p><aside><small>FIJN OM TE WETEN</small><p>Je hoeft niet vooraf precies te weten welke behandeling je nodig hebt. Een eerste gesprek helpt om dat samen uit te zoeken.</p></aside></div><div className="forma-booking">{submitted ? <div className="forma-confirmation"><b>✳</b><h3>Je keuze staat klaar.</h3><p>Dit is een demonstratie. Er is geen afspraak gemaakt en er zijn geen gegevens verstuurd.</p><button type="button" onClick={() => { setSubmitted(false); setTreatment(''); setDate(''); setTime('') }}>Begin opnieuw ↗</button></div> : <form onSubmit={event => { event.preventDefault(); setSubmitted(true) }}><small>BOEK EEN MOMENT / DEMO</small><h3>Wanneer zien we je?</h3><fieldset><legend>Waarvoor wil je langskomen?</legend><div className="forma-choices">{care.map(([title]) => <button type="button" aria-pressed={treatment === title} key={title} onClick={() => setTreatment(title)}>{title}</button>)}</div></fieldset><fieldset><legend>Kies een dag</legend><div className="forma-choices forma-dates">{dates.map(item => <button type="button" aria-pressed={date === item} key={item} onClick={() => { setDate(item); setTime('') }}>{item}</button>)}</div></fieldset><fieldset><legend>Kies een tijd</legend><div className="forma-choices forma-times">{times.map(item => <button type="button" aria-pressed={time === item} disabled={!date} key={item} onClick={() => setTime(item)}>{item}</button>)}</div></fieldset><button type="submit" className="forma-submit" disabled={!treatment || !date || !time}>Bekijk je keuze <span>↗</span></button></form>}</div></section>
    </main><footer className="forma-footer"><a href="#begin" className="forma-logo">denta<span>care.</span><small>PARAMARIBO</small></a><p>Een fictieve praktijk, ontworpen als interactief NextX concept.</p><a href="#begin">Terug naar boven ↑</a></footer><DemoOutro />
  </div>
}
