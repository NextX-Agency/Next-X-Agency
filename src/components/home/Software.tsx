import dynamic from 'next/dynamic'
import Link from 'next/link'
import { Arrow } from '@/components/Arrow'
import { Reveal } from '@/components/Reveal'
import { softwareKinds, softwareProof } from '@/content/software'

const SignalField = dynamic(() => import('./SignalField').then((m) => m.SignalField))

/**
 * Software gets the logo's circuit traces: they run from the statement out to
 * the page edges, the way the lines leave the frame of the mark.
 */
export function Software() {
  return (
    <section data-theme="dark" aria-labelledby="software-title">
      <div className="nx-software-signal">
        <SignalField anchorId="software-core" logoInset={false} />
        <div id="software-core" className="nx-software-core">
          <p className="meta mb-5 text-accent">03 · Software op maat</p>
          <h2 id="software-title" className="t-h2 mx-auto max-w-[15ch]">Software die past bij hoe u werkt.</h2>
        </div>
      </div>

      <div className="wrap pb-[var(--section)]">
        <Reveal className="grid-12 gap-y-6 pb-12 md:pb-16">
          <p className="t-lead col-span-4 text-fg md:col-span-7">
            Niet elk probleem is een website. Soms is het een bestelproces, een voorraadlijst of een planning die nu in WhatsApp en Excel leeft. Daar bouwen we software voor.
          </p>
          <div className="col-span-4 md:col-span-4 md:col-start-9 md:justify-self-end md:self-end">
            <Link href="/services#software" className="btn btn-quiet">Meer over software <Arrow /></Link>
          </div>
        </Reveal>

        <Reveal className="nx-software-grid">
          {softwareKinds.map((kind, i) => (
            <div key={kind.title}>
              <p className="num mb-4">{String(i + 1).padStart(2, '0')}</p>
              <h3 className="t-h3">{kind.title}</h3>
              <p className="t-small mt-3 max-w-[30ch]">{kind.text}</p>
            </div>
          ))}
        </Reveal>

        <Reveal className="mt-14 md:mt-20">
          <p className="meta mb-4">Te zien in ons werk</p>
          <div className="nx-proof">
            {softwareProof.map((item) => (
              <Link key={item.project} href={`/portfolio/${item.project}`} className="group">
                <span className="t-h3">{item.name}</span>
                <span className="t-body max-w-[62ch]">{item.text}</span>
                <span className="nx-arrow-box"><Arrow /></span>
              </Link>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
