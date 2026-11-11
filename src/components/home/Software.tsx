import dynamic from 'next/dynamic'
import Link from 'next/link'
import { Arrow } from '@/components/Arrow'
import { Reveal } from '@/components/Reveal'
import { softwareKinds } from '@/content/software'

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
          <h2 id="software-title" className="t-h1 mx-auto max-w-[12ch]">Software die past bij hoe u werkt<span className="text-accent">.</span></h2>
        </div>
      </div>

      <Reveal className="wrap pb-[var(--section)] text-center">
        <p className="nx-bigwords">
          {softwareKinds.map((kind) => <span key={kind}>{kind}</span>)}
        </p>
        <Link href="/services#software" className="btn btn-primary mt-12">Software op maat <Arrow /></Link>
      </Reveal>
    </section>
  )
}
