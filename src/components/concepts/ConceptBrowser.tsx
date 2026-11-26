'use client'

import { useId, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { Arrow } from '@/components/Arrow'
import { exampleCategories, type Example, type ExampleGroup } from '@/content/examples'
import { cn } from '@/lib/utils'
import { WantThis } from './WantThis'

const ease = [0.2, 0.7, 0.1, 1] as const

/**
 * The concept lab as one filterable grid. Server-rendered with every concept
 * visible, so the categories only narrow the list once JavaScript runs.
 */
export function ConceptBrowser({
  items,
  limit,
  priorityFirst = false,
}: {
  items: Example[]
  /** Show at most this many per filter (homepage teaser). */
  limit?: number
  priorityFirst?: boolean
}) {
  const [filter, setFilter] = useState<ExampleGroup | 'all'>('all')
  const listId = useId()
  const categories = exampleCategories.filter((category) => items.some((item) => item.group === category.id))
  const filtered = filter === 'all' ? items : items.filter((item) => item.group === filter)
  const visible = limit ? filtered.slice(0, limit) : filtered
  const active = exampleCategories.find((category) => category.id === filter)

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-4">
        <div role="group" aria-label="Filter concepts by category" aria-controls={listId} className="nx-chips">
          {[{ id: 'all' as const, label: 'All' }, ...categories].map((category) => {
            const count = category.id === 'all' ? items.length : items.filter((item) => item.group === category.id).length
            const pressed = filter === category.id
            return (
              <button
                key={category.id}
                type="button"
                aria-pressed={pressed}
                onClick={() => setFilter(category.id)}
                className={cn('nx-chip', pressed && 'is-active')}
              >
                {pressed && (
                  <motion.span layoutId={`${listId}-chip`} className="nx-chip-bg" transition={{ type: 'spring', stiffness: 420, damping: 34 }} />
                )}
                <span className="relative">{category.label}</span>
                <span className="nx-chip-count relative">{count}</span>
              </button>
            )
          })}
        </div>
        <p className="t-small min-h-[1.5em] max-w-[40ch]" aria-live="polite">
          {active?.line}
        </p>
      </div>

      <motion.ul id={listId} layout className="nx-concept-list mt-10 md:mt-14">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((example, index) => (
            <motion.li
              key={example.slug}
              layout
              initial={{ opacity: 0, y: 28, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.2 } }}
              transition={{ duration: 0.55, ease, delay: index * 0.05 }}
              className="nx-concept"
            >
              <Link href={`/examples/${example.slug}`} className="nx-concept-media group" aria-label={`Open de ${example.business} conceptdemo`}>
                <Image
                  src={example.image}
                  alt={`Screenshot of the ${example.business} concept demo`}
                  fill
                  sizes="(min-width: 64rem) 33vw, (min-width: 40rem) 50vw, 100vw"
                  priority={priorityFirst && index === 0}
                  className="object-cover object-top"
                />
                <span className="nx-pill-label">Fictional brand</span>
                <span className="nx-concept-open" aria-hidden="true">
                  <Arrow />
                </span>
              </Link>
              <div className="mt-5 flex items-baseline justify-between gap-4">
                <h3 className="t-h3">
                  <Link href={`/examples/${example.slug}`} className="link-line">{example.business}</Link>
                </h3>
                <span className="shrink-0 text-[0.8125rem] font-semibold text-fg-2">{example.kind}</span>
              </div>
              <p className="t-small mt-2 max-w-[44ch]">{example.summary}</p>
              <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3">
                <WantThis example={example} label="I want this" variant="quiet" />
                <Link href={`/examples/${example.slug}`} className="link-arrow link-line text-[0.9375rem]">Open demo <Arrow /></Link>
              </div>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </div>
  )
}
