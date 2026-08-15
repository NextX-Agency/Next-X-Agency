import type { Metadata } from 'next'
import Link from 'next/link'
import { Toaster } from 'sonner'
import { CONTACT, whatsappHref } from '@/lib/contact'

export const metadata: Metadata = {
  title: 'Voorbeelden',
  description:
    'Interactieve demo voorbeelden van alle NextX Agency diensten — websites, webshops, logo design, UX/UI, SEO dashboards, hosting panels en meer.',
  openGraph: {
    title: 'Voorbeelden — NextX Agency',
    description:
      'Bekijk interactieve demo\'s van onze diensten. Websites, webshops, branding en meer.',
    url: '/examples',
  },
  alternates: {
    canonical: '/examples',
  },
}

export default function ExamplesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Toaster position="bottom-right" richColors closeButton />

      {/* Demo bar — states what this is, and always offers a way back. */}
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

      {children}

      {/* Closing band — every demo ends at the real agency, not in the dark. */}
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
    </>
  )
}
