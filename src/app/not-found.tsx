import Link from 'next/link'
import type { Metadata } from 'next'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Pagina niet gevonden',
  description:
    'Deze pagina bestaat niet of is verplaatst. Bekijk onze diensten, ons werk of neem direct contact op.',
  robots: { index: false, follow: true },
}

const routes = [
  { href: '/services', label: 'Diensten', hint: 'Wat wij maken en wat het kost' },
  { href: '/portfolio', label: 'Werk', hint: 'Recente projecten' },
  { href: '/about', label: 'Over ons', hint: 'Wie er achter NextX zit' },
  { href: '/contact', label: 'Contact', hint: 'Reactie binnen 24 uur' },
]

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main id="main" className="surface-glow relative overflow-hidden">
        <div
          className="bg-grid-pattern absolute inset-0 pointer-events-none [mask-image:radial-gradient(46rem_30rem_at_50%_0%,#000,transparent_76%)]"
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-6xl mx-auto px-6 pt-32 pb-28 lg:pt-40 lg:pb-36">
          <div className="flex items-baseline justify-between border-t-2 border-foreground pt-4 mb-14">
            <span className="text-xs font-bold tracking-[0.18em] uppercase text-foreground">
              Fout 404
            </span>
            <span className="text-xs font-medium text-muted-foreground">
              Paramaribo, Suriname
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-14 lg:gap-20 items-start">
            <div>
              <p
                className="text-primary font-bold leading-none tracking-tighter tabular-nums select-none mb-8"
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(5rem, 14vw, 11rem)',
                }}
                aria-hidden="true"
              >
                404
              </p>

              <h1
                className="font-bold text-foreground tracking-tight leading-[1.02] mb-6"
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(2rem, 4.5vw, 3.25rem)',
                }}
              >
                Deze pagina bestaat niet.
              </h1>

              <p className="text-muted-foreground text-[15px] md:text-base leading-relaxed max-w-md mb-10">
                De link is verouderd of er staat een typefout in het adres. Hieronder
                staan de pagina&apos;s waar u waarschijnlijk naar op zoek was.
              </p>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <Link
                  href="/"
                  className="inline-flex items-center justify-center gap-3 bg-foreground hover:bg-primary text-white font-bold px-8 py-4 text-base transition-colors duration-300"
                >
                  Terug naar home
                  <span aria-hidden="true">→</span>
                </Link>
                <a
                  href="https://wa.me/5978318508"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-foreground font-semibold text-base border-b-2 border-primary pb-0.5 hover:text-primary transition-colors duration-300"
                >
                  Meld een kapotte link
                </a>
              </div>
            </div>

            {/* Route index — a way out, not a dead end */}
            <nav aria-label="Suggesties" className="lg:pt-6">
              <ul className="border-t border-foreground/15">
                {routes.map((route, i) => (
                  <li key={route.href}>
                    <Link
                      href={route.href}
                      className="group flex items-center gap-4 py-5 border-b border-border transition-colors duration-300 hover:bg-card"
                    >
                      <span className="text-[11px] font-bold tabular-nums text-muted-foreground tracking-wider w-6 shrink-0 group-hover:text-primary transition-colors duration-300">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="flex-1 min-w-0">
                        <span
                          className="block text-[15px] font-bold text-foreground tracking-tight group-hover:text-primary transition-colors duration-300"
                          style={{ fontFamily: 'var(--font-heading)' }}
                        >
                          {route.label}
                        </span>
                        <span className="block text-sm text-muted-foreground leading-snug mt-0.5">
                          {route.hint}
                        </span>
                      </span>
                      <span
                        className="text-muted-foreground shrink-0 group-hover:text-primary group-hover:translate-x-1 transition-all duration-300"
                        aria-hidden="true"
                      >
                        →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
