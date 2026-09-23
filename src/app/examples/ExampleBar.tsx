'use client'

import Link from 'next/link'

/**
 * Shared frame for the fictional client sites.
 */
export function ExampleBar() {
  return (
    <div className="demo-chrome sticky top-0 z-[60] border-b border-white/15 bg-[#11110f] text-[#f4f1ea]">
      <div className="flex min-h-11 items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/examples" className="text-[0.72rem] font-semibold tracking-[0.12em] uppercase hover:text-white/70">
          ← Voorbeelden
        </Link>
        <p className="truncate text-[0.68rem] tracking-[0.16em] text-white/55 uppercase">
          Conceptdemo <span className="hidden sm:inline">door NextX Agency</span>
        </p>
        <Link href="/contact" className="shrink-0 text-[0.72rem] font-semibold underline decoration-white/35 underline-offset-4 hover:decoration-white">
          Eigen versie bespreken
        </Link>
      </div>
    </div>
  )
}
