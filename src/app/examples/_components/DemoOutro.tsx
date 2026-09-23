import Link from 'next/link'

export function DemoOutro() {
  return (
    <aside className="demo-outro" aria-label="Over deze conceptdemo">
      <p>
        Conceptdemo door NextX. Bedrijf, inhoud en beeld zijn fictief en tonen hoe een passende digitale ervaring kan werken.
      </p>
      <div className="flex flex-wrap gap-3">
        <Link href="/examples" className="demo-outro-link">Bekijk voorbeelden</Link>
        <Link href="/contact" className="demo-outro-link">Eigen versie bespreken</Link>
      </div>
    </aside>
  )
}
