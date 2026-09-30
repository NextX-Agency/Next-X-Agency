export const steps = [
  {
    title: 'Brief',
    text: 'We bespreken het doel, het publiek en wat er nodig is. Scope, budget en planning leggen we samen vast.',
  },
  {
    title: 'Richting',
    text: 'We kiezen een aanpak en werken de eerste ideeën uit. U kijkt mee en geeft feedback.',
  },
  {
    title: 'Productie',
    text: 'De afgesproken richting wordt ontwerp, code, beeld of content. NextX houdt het overzicht.',
  },
  {
    title: 'Oplevering',
    text: 'We controleren het werk en leveren de bestanden of het product op. Met uitleg en afspraken voor het vervolg.',
  },
]

export function Process() {
  return (
    <section className="section process" aria-labelledby="process-title">
      <div className="wrap">
        <div className="process-heading">
          <h2 id="process-title" className="t-h2">
            Van vraag
            <br />
            naar resultaat.
          </h2>
          <p className="t-body max-w-[32ch]">
            Duidelijke stappen, ruimte voor feedback. De planning volgt uit uw
            project.
          </p>
        </div>
        <ol className="process-steps">
          {steps.map((step, i) => (
            <li key={step.title}>
              <span className="meta">0{i + 1}</span>
              <h3 className="t-h3">{step.title}</h3>
              <p className="t-small">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
