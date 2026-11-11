'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { examples } from '@/content/examples'

/**
 * Every concept demo in one moving strip. It pauses on hover, on keyboard
 * focus and with the button; under reduced motion it becomes a plain
 * horizontal scroller.
 */
export function ConceptStrip() {
  const [paused, setPaused] = useState(false)
  const items = (copy: boolean) =>
    examples.map((example) => (
      <Link
        key={`${copy}-${example.slug}`}
        href={`/examples/${example.slug}`}
        className="nx-marquee-item"
        aria-label={`Open de conceptdemo ${example.business}`}
        aria-hidden={copy || undefined}
        tabIndex={copy ? -1 : undefined}
      >
        <span className="nx-marquee-media">
          <Image src={example.image} alt="" fill sizes="(min-width: 48rem) 31vw, 17rem" className="object-cover object-top" />
          <span className="nx-label">Fictief merk</span>
        </span>
        <span className="mt-3 block text-[0.9375rem] font-semibold">{example.business}</span>
      </Link>
    ))

  return (
    <div>
      <div className="nx-marquee" data-paused={paused}>
        <div className="nx-marquee-track">
          {items(false)}
          {items(true)}
        </div>
      </div>
      <div className="wrap mt-6 flex justify-end motion-reduce:hidden">
        <button type="button" className="min-h-11 text-[0.875rem] font-semibold text-fg-2 transition-colors hover:text-fg" aria-pressed={paused} onClick={() => setPaused(!paused)}>
          {paused ? 'Speel af' : 'Pauzeer'}
        </button>
      </div>
    </div>
  )
}
