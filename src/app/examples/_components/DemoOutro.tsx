import Link from 'next/link'

export function DemoOutro() {
  return (
    <aside className="demo-note" aria-label="Over deze conceptdemo">
      <p>
        Conceptdemo door NextX. Bedrijf, inhoud en beeld zijn fictief.{' '}
        <Link href="/examples" className="demo-note-link">Meer richtingen bekijken</Link>
      </p>
    </aside>
  )
}
