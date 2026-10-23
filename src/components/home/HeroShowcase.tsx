'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { Arrow } from '@/components/Arrow'

const concepts = [
  { label: 'Webshop', name: 'Bloom Boutique', line: 'Een collectie ontdekken, kiezen en afrekenen.', image: '/demo-previews/starter-webshop.webp', slug: 'starter-webshop' },
  { label: 'Servicewebsite', name: 'DentaCare', line: 'Zorg verkennen en een afspraak aanvragen.', image: '/demo-previews/service-website.webp', slug: 'service-website' },
  { label: 'Restaurantwebsite', name: 'Warung Indah', line: 'Het menu ontdekken en een tafel reserveren.', image: '/demo-previews/restaurant-menu-site.webp', slug: 'restaurant-menu-site' },
] as const

export function HeroShowcase() {
  const [active, setActive] = useState(0)
  const concept = concepts[active]

  return (
    <div className="nx-hero-proof" data-nx-motion="visual">
      <Link href={`/examples/${concept.slug}`} className="nx-hero-proof-image group" aria-label={`Open de ${concept.name} conceptdemo`}>
        <Image key={concept.image} src={concept.image} alt={`Schermbeeld van ${concept.name}, een fictief merk`} fill priority={active === 0} unoptimized sizes="(min-width: 768px) 70vw, 100vw" className="object-cover object-top" />
        <span className="nx-hero-proof-image-tag">Werkende conceptdemo · fictief merk</span>
        <span className="nx-hero-proof-open" aria-hidden="true">↗</span>
      </Link>

      <div className="nx-hero-proof-panel">
        <div className="nx-hero-proof-panel-head"><p>Het NextX Concept Lab</p><span aria-hidden="true">↗</span></div>
        <div className="nx-hero-proof-panel-body">
          <p className="nx-hero-proof-eyebrow">Probeer het zelf</p>
          <h2>{concept.name}</h2>
          <p className="nx-hero-proof-line">{concept.line}</p>
          <Link href={`/examples/${concept.slug}`} className="nx-hero-proof-cta">Open de demo <Arrow /></Link>
        </div>
        <div className="nx-hero-proof-tabs" aria-label="Kies een conceptdemo">
          {concepts.map((item, index) => (
            <button type="button" key={item.slug} onClick={() => setActive(index)} aria-pressed={active === index} className="nx-hero-proof-tab">
              <span>{item.label}</span><span aria-hidden="true">↗</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
