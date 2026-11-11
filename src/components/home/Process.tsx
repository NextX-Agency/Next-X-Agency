import { Fragment } from 'react'
import { Arrow } from '@/components/Arrow'
import { Reveal } from '@/components/Reveal'

/** The same four steps for a brand, a website or software. */
const steps = ['Gesprek', 'Richting', 'Productie', 'Oplevering']

export function Process() {
  return (
    <section className="section" aria-labelledby="process-title">
      <Reveal className="wrap">
        <h2 id="process-title" className="mb-8 text-[0.9375rem] font-semibold text-fg-2 md:mb-10">Zo werken we</h2>
        <p className="nx-flow">
          {steps.map((step, i) => (
            <Fragment key={step}>
              {i > 0 && <Arrow />}
              <span>{step}</span>
            </Fragment>
          ))}
        </p>
        <p className="t-lead mt-8 max-w-[32ch] md:mt-10">Scope, prijs en planning liggen vast vóór de start.</p>
      </Reveal>
    </section>
  )
}
