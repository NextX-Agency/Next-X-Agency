import Link from 'next/link'
import { ArrowOut } from '@/components/Arrow'
import { site } from '@/content/site'

export function Studio() {
  return (
    <section className="studio-section" aria-labelledby="studio-title">
      <div className="wrap studio-layout">
        <div className="studio-location">
          <p className="meta">02 / De studio</p>
          <p className="studio-city">
            Para
            <br />
            maribo<span aria-hidden="true">↗</span>
          </p>
          <p className="meta">{site.location.coordinates}</p>
        </div>
        <div className="studio-copy">
          <h2 id="studio-title" className="t-h2">
            Veel expertise.
            <br />
            Eén aanspreekpunt.
          </h2>
          <p className="t-lead mt-7">
            Een project vraagt soms om een developer, soms om een fotograaf,
            soms om allebei. NextX stemt het werk op elkaar af en houdt de lijn
            met u kort.
          </p>
          <Link href="/about" className="link-arrow link-line mt-8">
            Zo werkt onze studio <ArrowOut />
          </Link>
        </div>
      </div>
    </section>
  )
}
