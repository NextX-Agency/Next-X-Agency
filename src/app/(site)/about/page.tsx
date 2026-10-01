import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Arrow } from '@/components/Arrow'
import '../../studio-services.css'

export const metadata: Metadata = {
  title: 'Studio',
  description:
    'NextX is een creatieve en digitale studio in Paramaribo. Eén aanspreekpunt voor web, software, fotografie, design en marketing, met de juiste specialisten per project.',
  alternates: { canonical: '/about' },
  openGraph: { title: 'Studio · NextX Agency', url: '/about' },
}

const agreements = [
  {
    title: 'Eén aanspreekpunt',
    text: 'U bespreekt uw project met NextX. Wij houden de richting, planning en uitvoering bij elkaar — ook wanneer verschillende specialisten aan het werk zijn.',
  },
  {
    title: 'Duidelijkheid vooraf',
    text: 'We leggen de scope, kosten en planning vast voordat de productie begint. Als de vraag verandert, bespreken we eerst wat dat betekent voor het werk.',
  },
  {
    title: 'Samen aanscherpen',
    text: 'U kijkt mee op afgesproken momenten. Uw feedback helpt ons keuzes te toetsen en het werk aan te scherpen vóór de oplevering.',
  },
]

export default function AboutPage() {
  return (
    <div className="studio-page">
      <header className="wrap studio-opening">
        <div className="studio-opening-label meta">
          <span>De studio</span>
          <span>Paramaribo, Suriname</span>
        </div>
        <div className="studio-opening-grid">
          <div>
            <h1>
              Technisch van huis uit.
              <br />
              <span>Creatief in uitvoering.</span>
            </h1>
            <p className="t-lead">
              Een creatieve en digitale studio die de juiste expertise bij uw
              project brengt.
            </p>
          </div>
          <figure className="studio-signature">
            <Image
              src="/logo-agency-black.svg"
              alt="NextX Agency"
              width={1200}
              height={519}
              sizes="(min-width: 1024px) 35vw, 70vw"
              priority
            />
            <figcaption className="meta">
              Ontwerp · Techniek · Productie
            </figcaption>
          </figure>
        </div>
      </header>
      <section className="wrap studio-story" aria-labelledby="studio-origin">
        <p className="meta">Onze basis</p>
        <div>
          <h2 id="studio-origin">
            Begonnen met web.
            <br />
            Verder met uw merk.
          </h2>
          <div className="studio-story-columns">
            <p className="t-body">
              NextX begon met websites en webshops. Die technische basis blijft:
              we begrijpen hoe een ontwerp moet werken, van de eerste interface
              tot de techniek erachter.
            </p>
            <p className="t-body">
              Vanuit Paramaribo bouwen we verder aan een studio voor fotografie,
              media, branding en marketing. Zo kunnen beeld, identiteit en
              digitale middelen op elkaar aansluiten.
            </p>
          </div>
          <Link href="/services" className="link-arrow link-line">
            Bekijk onze disciplines <Arrow />
          </Link>
        </div>
      </section>
      <section
        className="wrap studio-collaboration"
        aria-labelledby="studio-people"
      >
        <div className="studio-collaboration-heading">
          <p className="meta">Hoe we samenwerken</p>
          <h2 id="studio-people">
            De juiste mensen.
            <br />
            <span>Eén heldere lijn.</span>
          </h2>
        </div>
        <div className="studio-collaboration-copy">
          <p className="t-lead">
            U werkt met NextX. Wij brengen de passende specialisten bij elkaar.
          </p>
          <p className="t-body">
            Afhankelijk van de opdracht werken we met onafhankelijke
            ontwikkelaars, ontwerpers, fotografen en andere specialisten. NextX
            bepaalt samen met u de richting en coördineert de uitvoering.
          </p>
          <p className="t-body">
            Dat geeft ruimte voor de expertise die het werk vraagt, met één
            aanspreekpunt voor uw vragen, feedback en afspraken.
          </p>
        </div>
      </section>
      <section
        className="wrap studio-agreements"
        aria-labelledby="studio-agreements-title"
      >
        <div className="studio-agreements-intro">
          <p className="meta">In de praktijk</p>
          <h2 id="studio-agreements-title">
            Zo houden we
            <br />
            het helder.
          </h2>
        </div>
        <ol>
          {agreements.map((agreement, index) => (
            <li key={agreement.title}>
              <span className="meta">0{index + 1}</span>
              <div>
                <h3 className="t-h3">{agreement.title}</h3>
                <p className="t-body">{agreement.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>
      <aside
        className="wrap studio-own-work"
        aria-labelledby="studio-own-title"
      >
        <p className="meta">Ook aan de eigen kant</p>
        <div>
          <h2 id="studio-own-title" className="t-h3">
            Shop NextX
          </h2>
          <p className="t-body">
            Met Shop NextX verkopen we zelf audio en horloges. Onze eigen
            webshop is ook onderdeel van het portfolio.
          </p>
        </div>
        <Link href="/portfolio/shop-nextx" className="link-arrow link-line">
          Bekijk het project <Arrow />
        </Link>
      </aside>
    </div>
  )
}
