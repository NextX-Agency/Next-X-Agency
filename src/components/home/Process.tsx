import { site } from '@/content/site'
import { Reveal } from '@/components/Reveal'

const steps = [
  { title: 'Gesprek', text: 'We bespreken wat u nodig hebt. Daarna weet u de prijs en de opleverdatum.' },
  { title: 'Ontwerp', text: 'U ziet het ontwerp en keurt het goed voordat we bouwen.' },
  { title: 'Bouw', text: 'Tijdens de bouw kijkt u mee via een testlink.' },
  { title: 'Live', text: 'De site gaat live op uw domein en u krijgt uitleg over het beheer.' },
]

const facts = [
  { value: site.delivery, label: 'Oplevering van een website' },
  { value: 'Vast', label: 'Prijs, vooraf afgesproken' },
  { value: site.responseTime, label: 'Reactie op uw aanvraag' },
  { value: 'Gratis', label: 'Eerste gesprek' },
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
              <h3 className="t-h3">{step.title}</h3>
              <p className="t-small mt-3 max-w-[30ch]">{step.text}</p>
            </Reveal>
          ))}
        </ol>

        <dl className="mt-20 grid grid-cols-2 gap-x-6 gap-y-10 border-t border-line pt-10 md:mt-28 md:grid-cols-4">
          {facts.map((fact) => (
            <div key={fact.label} className="flex flex-col">
              <dt className="meta order-2 mt-3">{fact.label}</dt>
              <dd className="order-1 text-[1.75rem] font-[650] leading-none tracking-[-0.03em] tabular-nums [font-variation-settings:'wdth'_108] md:text-[2.75rem]">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
