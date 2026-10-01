import Image from 'next/image'
import Link from 'next/link'
import { Arrow, ArrowOut } from '@/components/Arrow'
import { disciplines } from '@/content/disciplines'

export function Hero() {
  return (
    <section className="hero wrap" aria-labelledby="hero-title">
      <div className="hero-intro">
        <p className="meta text-fg">NextX / Creatieve & digitale studio</p>
        <p className="meta">Paramaribo, Suriname</p>
      </div>
      <div className="hero-composition">
        <div className="hero-brand" data-theme="dark">
          <div className="hero-brand-top">
            <span className="meta">Ontwerp × Technologie</span>
            <span aria-hidden="true">↗</span>
          </div>
          <Image
            src="/logo-agency-white.svg"
            alt="NextX Agency"
            width={1200}
            height={519}
            priority
            sizes="(min-width: 1440px) 620px, (min-width: 768px) 48vw, 90vw"
            className="hero-brand-logo"
          />
          <div className="hero-brand-bottom">
            <span className="meta">Een idee. Alle verbindingen.</span>
            <span className="meta">SR / 05.852° N</span>
          </div>
        </div>
        <div className="hero-copy">
          <h1 id="hero-title">
            Ideeën <br />
            krijgen <br />
            <span>vorm.</span>
          </h1>
          <p className="hero-description">
            Van merk en beeld tot website en software. NextX brengt ontwerp,
            techniek en de juiste specialisten bij elkaar.
          </p>
          <Link href="/contact" className="link-arrow hero-contact">
            Vertel ons uw idee <ArrowOut />
          </Link>
        </div>
      </div>
      <div className="hero-index">
        <div className="hero-disciplines">
          {disciplines.map((discipline) => (
            <Link key={discipline.id} href={`/services#${discipline.id}`}>
              {discipline.name}
            </Link>
          ))}
        </div>
        <a href="#work" className="link-arrow">
          Het werk <Arrow />
        </a>
      </div>
    </section>
  )
}
