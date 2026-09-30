import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Arrow } from '@/components/Arrow'
import { Process } from '@/components/home/Process'
import { Studio } from '@/components/home/Studio'

export const metadata: Metadata = {
  title: 'Studio',
  description:
    'NextX is een creatieve en digitale studio in Paramaribo. Eén aanspreekpunt voor web, software, fotografie, design en marketing, met de juiste specialisten per project.',
  alternates: { canonical: '/about' },
  openGraph: { title: 'Studio · NextX Agency', url: '/about' },
}

export default function AboutPage() {
  return (
    <>
      <header className="wrap page-heading">
        <p className="meta">De studio</p>
        <h1>
          Een klein begin.
          <br />
          <span>Een brede blik.</span>
        </h1>
        <p className="t-lead">
          NextX Agency. Creatief en technisch werk, gecoördineerd vanuit
          Paramaribo.
        </p>
      </header>
      <section className="wrap about-intro">
        <h2 className="t-h2">
          Goed werk vraagt
          <br />
          de juiste mensen.
        </h2>
        <div>
          <p className="t-lead text-fg">
            We begonnen met websites en webshops. Die technische basis blijft.
            Daarnaast bouwen we aan een studio voor fotografie, media, branding
            en marketing.
          </p>
          <p className="t-body mt-6">
            Voor elk project brengt NextX de passende expertise bij elkaar. We
            werken met onafhankelijke ontwikkelaars, ontwerpers, fotografen en
            andere specialisten. U houdt één aanspreekpunt: NextX.
          </p>
          <p className="t-body mt-6">
            We bespreken de vraag, bepalen de richting en coördineren de
            uitvoering. Zo sluiten het ontwerp, de techniek en de communicatie
            op elkaar aan.
          </p>
        </div>
      </section>
      <figure className="brand-sheet">
        <Image
          src="/logo-agency-black.svg"
          alt="Het oorspronkelijke NextX Agency-logo"
          width={1200}
          height={519}
          sizes="(min-width: 768px) 50vw, 75vw"
        />
        <figcaption className="meta">
          NextX Agency · Creatieve & digitale studio
        </figcaption>
      </figure>
      <section className="wrap about-principles">
        <h2 className="t-h2">
          Zo houden we
          <br />
          het helder.
        </h2>
        <div>
          {[
            {
              title: 'Eén aanspreekpunt',
              text: 'U bespreekt uw project met NextX. Wij houden de richting, planning en uitvoering bij elkaar.',
            },
            {
              title: 'Afspraken vooraf',
              text: 'Scope, kosten en planning spreken we af voordat de productie begint. Meerwerk bespreken we eerst.',
            },
            {
              title: 'Ruimte voor feedback',
              text: 'U kijkt mee op afgesproken momenten. We scherpen het werk samen aan, vóór de oplevering.',
            },
          ].map((item) => (
            <article key={item.title}>
              <h3 className="t-h3">{item.title}</h3>
              <p className="t-body">{item.text}</p>
            </article>
          ))}
        </div>
      </section>
      <Studio inquiry />
      <Process />
      <section className="wrap portfolio-lab">
        <h2 className="t-h3">Ook een eigen product</h2>
        <p className="t-body">
          Met Shop NextX verkopen we zelf audio en horloges. Die webshop is ook
          onderdeel van ons portfolio.
        </p>
        <Link href="/portfolio/shop-nextx" className="link-arrow link-line">
          Bekijk Shop NextX <Arrow />
        </Link>
      </section>
    </>
  )
}
