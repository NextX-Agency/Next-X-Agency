'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Toaster } from 'sonner'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { CONTACT, whatsappHref } from '@/lib/contact'

/**
 * Two kinds of page live under /examples.
 *
 * The hub at /examples is an ordinary page of the site, so it keeps the site's
 * own navigation and footer: a visitor who lands there can still reach Werk,
 * Over ons and everything else.
 *
 * The prototypes below it are dressed as somebody else's website, where the
 * site chrome would only confuse. They get a narrow bar naming what the page
 * is with a way back, a closing band that hands the visitor to the real
 * agency, and a plain link row so the rest of the site stays one click away.
 */
export default function ExamplesLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  if (pathname === '/examples') {
    return (
      <>
        <Navbar />
        {children}
        <Footer />
      </>
    )
  }

  return (
    <>
      <Toaster position="bottom-right" richColors closeButton />

      <div className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-sm font-bold tracking-tight text-foreground transition-colors hover:text-primary"
            >
              NextX Agency
            </Link>
            <span className="hidden h-4 w-px bg-border sm:block" aria-hidden="true" />
            <Link
              href="/examples"
              className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0" aria-hidden="true">
                <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Alle voorbeelden
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground sm:inline">
              Voorbeeldpagina
            </span>
            <Link
              href="/services"
              className="hidden text-sm font-medium text-muted-foreground transition-colors hover:text-foreground md:inline"
            >
              Prijzen
            </Link>
            <Link
              href="/contact"
              className="bg-foreground px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-primary"
            >
              Zoiets laten maken
            </Link>
          </div>
        </div>
      </div>

      {/* The prototypes render a plain <div>, so the landmark the skip link
          targets lives here. */}
      <div id="main">{children}</div>

      <section className="border-t border-border bg-background">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-14 sm:px-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-xl">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
              Einde van de demo
            </p>
            <h2 className="mt-3 font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Dit was een voorbeeld. Uw versie bouwen we om uw bedrijf heen.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              De namen, teksten, cijfers en foto&apos;s hierboven zijn ingevuld
              om de opzet te laten zien. Wat er in uw versie komt te staan, wat
              het kost en wanneer het klaar is, bespreken we in een gratis
              gesprek — reactie {CONTACT.responseTime}.
            </p>
          </div>

          <div className="flex shrink-0 flex-col gap-3 sm:flex-row md:flex-col lg:flex-row">
            <Link
              href="/contact"
              className="bg-foreground px-6 py-3 text-center text-sm font-bold text-white transition-colors hover:bg-primary"
            >
              Plan een gesprek
            </Link>
            <a
              href={whatsappHref('Hallo NextX, ik heb een voorbeeld op jullie site bekeken en wil zoiets voor mijn bedrijf.')}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-foreground/20 px-6 py-3 text-center text-sm font-bold text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              WhatsApp {CONTACT.phoneDisplay}
            </a>
          </div>
        </div>
      </section>

      {/* For anyone who reached the bottom of a prototype instead of using the
          bar at the top: the rest of the site, one click away. */}
      <nav aria-label="NextX Agency" className="border-t border-border bg-background-elevated">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-8 gap-y-3 px-4 py-6 sm:px-6">
          <span className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
            NextX Agency
          </span>
          {[
            { href: '/', label: 'Home' },
            { href: '/services', label: 'Diensten' },
            { href: '/portfolio', label: 'Werk' },
            { href: '/examples', label: 'Voorbeelden' },
            { href: '/about', label: 'Over ons' },
            { href: '/contact', label: 'Contact' },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-semibold text-muted-foreground transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </nav>
    </>
  )
}
