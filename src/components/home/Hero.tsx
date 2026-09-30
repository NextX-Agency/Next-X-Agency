import Image from 'next/image'
import Link from 'next/link'
import { Arrow, ArrowOut } from '@/components/Arrow'
import { findProject } from '@/content/projects'

export function Hero() {
  const shop = findProject('shop-nextx')
  const indef = findProject('indef-design')
  return (
    <section className="hero wrap" aria-labelledby="hero-title">
      <div className="hero-intro">
        <p className="meta text-fg">Creatieve & digitale studio</p>
        <p className="meta">Paramaribo, Suriname</p>
      </div>
      <h1 id="hero-title" className="hero-title enter-rise">
        Goed bedacht.
        <br />
        <span>Sterk gemaakt.</span>
      </h1>
      <div className="hero-bottom">
        <p className="hero-description">
          Web, software, fotografie, design en marketing. Met de juiste mensen,
          van eerste idee tot uitvoering.
        </p>
        <div className="hero-actions">
          <Link href="/contact" className="btn btn-primary">
            Start een project <Arrow />
          </Link>
          <Link href="/portfolio" className="link-arrow link-line">
            Bekijk ons werk <Arrow />
          </Link>
        </div>
      </div>
      <div className="hero-work" aria-label="Een kijkje in ons werk">
        {shop && (
          <Link
            href={`/portfolio/${shop.slug}`}
            className="hero-work-main group"
          >
            <div className="hero-image">
              <Image
                src="/work/shop-nextx-audio.jpg"
                alt="De audiowinkel van onze eigen webshop Shop NextX"
                fill
                priority
                sizes="(min-width: 768px) 65vw, 100vw"
                className="object-cover object-top"
              />
            </div>
            <div className="hero-caption">
              <span>Shop NextX</span>
              <span className="meta">
                Eigen product <ArrowOut />
              </span>
            </div>
          </Link>
        )}
        {indef && (
          <Link
            href={`/portfolio/${indef.slug}`}
            className="hero-work-secondary group"
          >
            <div className="hero-image">
              <Image
                src="/work/indef-hero.jpg"
                alt="De website van Indef Design & Construction"
                fill
                sizes="(min-width: 768px) 30vw, 100vw"
                className="object-cover object-top"
              />
            </div>
            <div className="hero-caption">
              <span>Indef Design</span>
              <ArrowOut />
            </div>
          </Link>
        )}
      </div>
    </section>
  )
}
