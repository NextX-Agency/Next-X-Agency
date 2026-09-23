import { site } from '@/content/site'
import { Reveal } from '@/components/Reveal'

const steps = [
  { title: 'Gesprek', day: 'Dag 1', text: 'Doel, inhoud en scope vastleggen.' },
  { title: 'Ontwerp', day: 'Daarna', text: 'Een eerste ontwerp voorleggen en aanscherpen.' },
  { title: 'Bouw', day: 'Na akkoord', text: 'Het goedgekeurde ontwerp bouwen met een testlink.' },
  { title: 'Live', day: 'Oplevering', text: 'Live zetten en uitleg geven over het beheer.' },
]

export function Process() {
  return (
    <section className="section bg-bg-2" aria-labelledby="process-title">
      <div className="wrap">
        <Reveal>
          <h2 id="process-title" className="t-h2">
            Zo werken we
          </h2>
        </Reveal>

        {/* A measured line with a node per step, horizontal from tablet up */}
        <ol className="mt-14 grid gap-10 md:mt-20 md:grid-cols-4 md:gap-6">
          {steps.map((step, i) => (
            <Reveal as="li" key={step.title} delay={i * 0.08} className="relative border-l border-line-strong pl-6 md:border-l-0 md:border-t md:pl-0 md:pt-8">
              <span className="absolute -left-[4px] top-0 size-[7px] bg-accent md:-top-[4px] md:left-0" aria-hidden="true" />
              <p className="meta mb-3">{String(i + 1).padStart(2, '0')}</p>
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="t-h3">{step.title}</h3>
                <span className="meta text-accent-text">{step.day}</span>
              </div>
              <p className="t-small mt-3 max-w-[28ch]">{step.text}</p>
            </Reveal>
          ))}
        </ol>

        <p className="meta mt-16 border-t border-line pt-5 md:mt-24">
          {site.delivery} na akkoord, met één aanspreekpunt.
        </p>
      </div>
    </section>
  )
}
