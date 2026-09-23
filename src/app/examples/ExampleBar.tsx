'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { findExample } from '@/content/examples'
import { findService, formatPrice } from '@/content/services'
import { Arrow } from '@/components/Arrow'

/**
 * Thin NextX bar above every prototype. It says plainly that the business is
 * made up, names the package it demonstrates, and links to requesting it.
 */
export function ExampleBar() {
  const slug = usePathname().split('/')[2] ?? ''
  const example = findExample(slug)
  const service = example ? findService(example.serviceId) : undefined

  return (
    <div
      data-theme="dark"
      className="sticky top-0 z-[60] border-b border-line font-[family-name:var(--font-archivo)]"
    >
      <div className="flex h-12 items-center justify-between gap-4 px-4 sm:px-6">
        <div className="flex min-w-0 items-center gap-4">
          <Link href="/" className="shrink-0" aria-label="NextX, naar de homepage">
            <Image src="/logo-agency-white.png" alt="" width={1200} height={519} className="h-6 w-auto" />
          </Link>
          <Link href="/examples" className="meta hidden hover:text-fg sm:inline">
            ← Voorbeelden
          </Link>
          <span className="meta truncate text-fg-2">
            <span className="hidden sm:inline">Concept · </span>Fictief bedrijf
          </span>
        </div>
        {service && (
          <Link
            href={`/contact?dienst=${service.id}`}
            className="group flex shrink-0 items-center gap-3 text-sm font-semibold text-[var(--fg)]"
          >
            <span className="hidden md:inline">
              {service.name} <span className="meta ml-1">{formatPrice(service.price)}</span>
            </span>
            <span className="text-accent">Aanvragen</span>
            <Arrow className="text-accent" />
          </Link>
        )}
      </div>
    </div>
  )
}
