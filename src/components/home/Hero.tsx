import Link from 'next/link'
import { Arrow } from '@/components/Arrow'
import { HeroShowcase } from './HeroShowcase'

export function Hero() {
  return (
    <section data-theme="dark" aria-labelledby="hero-title" className="nx-hero">
      <div className="wrap nx-hero-inner">
        <div className="nx-hero-topline" data-nx-motion="kicker">
          <span>NextX Agency</span>
          <span>Creatieve & digitale studio · Paramaribo</span>
        </div>

        <div className="nx-hero-lead">
          <h1 id="hero-title" className="nx-hero-title">
            <span data-nx-motion="line">Maak indruk.</span>
            <span data-nx-motion="line">Vanaf de <em>eerste klik.</em></span>
          </h1>
          <div className="nx-hero-lead-aside" data-nx-motion="copy">
            <p>NextX ontwerpt en bouwt websites, webshops en visuele merken die uw bedrijf helder en herkenbaar presenteren.</p>
            <Link href="/services" className="link-arrow link-line">Ontdek onze diensten <Arrow /></Link>
          </div>
        </div>

        <HeroShowcase />

        <div className="nx-hero-bottomline" data-nx-motion="action">
          <span>Websites & webshops</span>
          <span>Branding & beeld</span>
          <Link href="/contact" className="link-arrow">Bespreek uw idee <Arrow /></Link>
        </div>
      </div>
    </section>
  )
}
