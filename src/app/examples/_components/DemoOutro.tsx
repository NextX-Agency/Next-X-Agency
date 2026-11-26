import Link from 'next/link'

export function DemoOutro() {
  return (
    <aside className="demo-note" aria-label="About this concept demo">
      <p>
        Concept demo by NextX. The business, content and images are fictional.{' '}
        <Link href="/examples" className="demo-note-link">See more directions</Link>
      </p>
    </aside>
  )
}
