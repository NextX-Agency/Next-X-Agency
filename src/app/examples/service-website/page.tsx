'use client'

import Image from 'next/image'
import { useState } from 'react'
import { DemoOutro } from '../_components/DemoOutro'
import './style.css'

const care = [
  ['Preventive care', 'A clear picture of your oral health, with advice for your everyday life.'],
  ['Restorative care', 'Repair with attention to comfort, function and a natural result.'],
  ['Oral hygiene', 'Professional cleaning and practical guidance for a healthy foundation.'],
  ['Cosmetic care', 'An open conversation about options, wishes and what suits you.'],
]
const dates = ['Wed 24 Sep', 'Thu 25 Sep', 'Fri 26 Sep']
const times = ['09:30', '11:00', '14:30', '16:00']

export default function ServiceWebsitePage() {
  const [treatment, setTreatment] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [submitted, setSubmitted] = useState(false)
  return <div className="forma" id="start">
    <div className="forma-disclosure">Fictional practice · interactive website concept by NextX</div>
    <header className="forma-header"><a href="#start" className="forma-logo">denta<span>care.</span><small>PARAMARIBO</small></a><nav aria-label="Practice navigation"><a href="#vision">Our vision</a><a href="#care">Treatments</a><a href="#appointment">Appointment</a></nav><a className="forma-cta" href="#appointment">Plan your visit ↗</a></header>
    <main>
      <section className="forma-hero"><div className="forma-hero-copy"><p className="forma-overline">✳ &nbsp; A different take on dental care</p><h1>Care that<br /><em>feels right.</em></h1><p>A calm moment for yourself. Attention for your questions. And dental care that starts with listening.</p><a href="#appointment" className="forma-pill">Book an appointment <span>↗</span></a><div className="forma-hero-foot"><span>DENTACARE / PARAMARIBO</span><span>SCROLL TO DISCOVER ↓</span></div></div><div className="forma-hero-image"><Image src="/demo-assets/denta-room.jpg" alt="A bright treatment room, pictured for this fictional practice" fill priority sizes="(min-width:900px) 47vw, 100vw" /><div className="forma-stamp">room for<br /><i>a smile</i><b>✳</b></div></div></section>
      <div className="forma-ticker"><span>TIME FOR YOU</span><b>✳</b><span>CLEAR ADVICE</span><b>✳</b><span>WITH CARE</span><b>✳</b><span>TIME FOR YOU</span></div>
      <section className="forma-vision" id="vision"><p className="forma-overline">OUR VISION</p><div><h2>A visit to the dentist can <em>feel different.</em></h2><div className="forma-vision-detail"><p>We take the time to understand what you need. We explain the options clearly and make a plan together that suits you.</p><span>✳</span></div></div></section>
      <section className="forma-care" id="care"><div className="forma-care-head"><p className="forma-overline">WHAT WE DO</p><h2>Care with<br /><em>room for you.</em></h2><p>From a first introduction to the care that follows. Open a treatment to see more.</p></div><div className="forma-care-list">{care.map(([title, description]) => <details key={title}><summary><small>✳</small><strong>{title}</strong><span>↗</span></summary><p>{description}</p></details>)}</div></section>
      <section className="forma-statement"><small>A practice for people.</small><p>Good care starts with <em>trust.</em></p><span>✳</span></section>
      <section className="forma-appointment" id="appointment"><div><p className="forma-overline">COME BY</p><h2>The first step<br />is <em>simple.</em></h2><p>Pick a treatment and a time in this interactive concept demo. This form does not send or store any data.</p><aside><small>GOOD TO KNOW</small><p>You do not need to know in advance exactly which treatment you need. A first conversation helps work that out together.</p></aside></div><div className="forma-booking">{submitted ? <div className="forma-confirmation"><b>✳</b><h3>Your choice is ready.</h3><p>This is a demonstration. No appointment was made and no data was sent.</p><button type="button" onClick={() => { setSubmitted(false); setTreatment(''); setDate(''); setTime('') }}>Start over ↗</button></div> : <form onSubmit={event => { event.preventDefault(); setSubmitted(true) }}><small>BOOK A TIME / DEMO</small><h3>When will we see you?</h3><fieldset><legend>What would you like to come in for?</legend><div className="forma-choices">{care.map(([title]) => <button type="button" aria-pressed={treatment === title} key={title} onClick={() => setTreatment(title)}>{title}</button>)}</div></fieldset><fieldset><legend>Choose a day</legend><div className="forma-choices forma-dates">{dates.map(item => <button type="button" aria-pressed={date === item} key={item} onClick={() => { setDate(item); setTime('') }}>{item}</button>)}</div></fieldset><fieldset><legend>Choose a time</legend><div className="forma-choices forma-times">{times.map(item => <button type="button" aria-pressed={time === item} disabled={!date} key={item} onClick={() => setTime(item)}>{item}</button>)}</div></fieldset><button type="submit" className="forma-submit" disabled={!treatment || !date || !time}>Review your choice <span>↗</span></button></form>}</div></section>
    </main><footer className="forma-footer"><a href="#start" className="forma-logo">denta<span>care.</span><small>PARAMARIBO</small></a><p>A fictional practice, designed as an interactive NextX concept.</p><a href="#start">Back to top ↑</a></footer><DemoOutro />
  </div>
}
