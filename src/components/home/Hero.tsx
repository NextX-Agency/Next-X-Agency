import Image from 'next/image'
import Link from 'next/link'
import { Arrow } from '@/components/Arrow'

export function Hero() {
  return (
    <section data-theme="dark" aria-labelledby="hero-title" className="nx-hero">
      <div className="wrap nx-hero-inner">
        <div className="nx-hero-copy">
          <p className="meta nx-hero-kicker">Creatieve & digitale studio · Paramaribo</p>
          <h1 id="hero-title" className="nx-hero-title">
            <span>Websites</span>
            <span>die werken<span className="text-accent">.</span></span>
            <span className="nx-hero-outline">Beeld dat blijft.</span>
          </h1>
          <p className="nx-hero-intro">
            NextX ontwerpt en bouwt websites en software, maakt foto- en videoproducties en geeft merken een herkenbare vorm. Eén aanspreekpunt, van idee tot livegang.
          </p>
          <div className="nx-hero-actions">
            <Link href="/services" className="btn btn-primary">Bekijk de diensten <Arrow /></Link>
            <Link href="/portfolio" className="link-arrow link-line">Bekijk werkende concepten <Arrow /></Link>
          </div>
        </div>

        <div className="nx-hero-stage" aria-label="Werkende NextX conceptdemo’s voor fictieve merken">
          <div className="nx-hero-orbit" aria-hidden="true" />
          <figure className="nx-hero-window nx-hero-window-main">
            <div className="nx-window-bar"><span /><span /><span /><b>BLOOM BOUTIQUE / CONCEPTDEMO</b></div>
            <div className="nx-hero-window-image">
              <Image src="/demo-previews/starter-webshop.webp" alt="Bloom Boutique: webshopconcept voor een fictief merk" fill priority sizes="(min-width: 900px) 48vw, 86vw" className="object-cover object-top" />
            </div>
          </figure>
          <figure className="nx-hero-window nx-hero-window-second">
            <div className="nx-window-bar"><span /><span /><span /><b>DENTACARE / CONCEPTDEMO</b></div>
            <div className="nx-hero-window-image">
              <Image src="/demo-previews/service-website.webp" alt="DentaCare: servicewebsiteconcept voor een fictieve praktijk" fill sizes="(min-width: 900px) 26vw, 54vw" className="object-cover object-top" />
            </div>
          </figure>
          <div className="nx-hero-stamp" aria-hidden="true">NX<span>↗</span></div>
          <span className="nx-hero-concept-label">Werkende demo’s · fictieve merken</span>
        </div>

        <div className="nx-hero-foot">
          <span>Web & software</span><span>Fotografie & media</span><span>Branding & design</span><span>Marketing</span>
        </div>
      </div>
    </section>
  )
}
