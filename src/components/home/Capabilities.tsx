import Link from 'next/link'
import { disciplines } from '@/content/disciplines'
import { ArrowOut } from '@/components/Arrow'

export function Capabilities() {
  return (
    <section
      className="section capabilities"
      aria-labelledby="capabilities-title"
    >
      <div className="wrap capabilities-layout">
        <div>
          <h2 id="capabilities-title" className="t-h2">
            Vier disciplines.
            <br />
            Eén geheel.
          </h2>
          <p className="t-body mt-6 max-w-[29ch]">
            Een website, een merk of een campagne. We brengen de juiste
            expertise bij elkaar.
          </p>
        </div>
        <ol className="discipline-list">
          {disciplines.map((item, i) => (
            <li key={item.id}>
              <Link
                href={`/services#${item.id}`}
                className="discipline-link group"
              >
                <span className="meta">0{i + 1}</span>
                <div>
                  <h3>{item.name}</h3>
                  <p>{item.short}</p>
                </div>
                <ArrowOut />
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
