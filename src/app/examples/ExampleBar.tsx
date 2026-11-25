'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { findExample } from '@/content/examples'
import { WantThis } from '@/components/concepts/WantThis'

/**
 * Shared frame for the fictional client sites. The right side turns interest
 * into a conversation: one tap opens WhatsApp with this concept named.
 */
export function ExampleBar() {
  const slug = usePathname().split('/')[2] ?? ''
  const example = findExample(slug)

  return (
    <div
      className="demo-chrome sticky top-0 z-[60] border-b border-white/10 bg-[#11110f]/95 text-[#f4f1ea] backdrop-blur"
      style={{ fontFamily: 'var(--font-archivo), system-ui, sans-serif', letterSpacing: 'normal' }}
    >
      <div className="flex min-h-14 items-center justify-between gap-3 px-3 sm:px-6">
        <Link
          href="/examples"
          className="inline-flex min-h-9 items-center gap-2 rounded-full border border-white/15 px-3.5 text-[0.72rem] font-semibold tracking-[0.08em] uppercase transition-colors hover:bg-white/10"
        >
          <span aria-hidden="true">←</span> <span className="hidden xs:inline">Concepten</span><span className="xs:hidden">Terug</span>
        </Link>
        <p className="hidden truncate text-[0.68rem] tracking-[0.16em] text-white/55 uppercase md:block">
          Conceptdemo door NextX · fictief merk
        </p>
        {example ? (
          <WantThis example={example} className="!min-h-9 shrink-0" label="Ik wil een website zoals deze" shortLabel="Ik wil dit" />
        ) : (
          <Link href="/contact" className="btn btn-sm btn-primary !min-h-9 shrink-0">Eigen versie bespreken</Link>
        )}
      </div>
    </div>
  )
}
