'use client'

import { useRef, type ReactNode } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { cn } from '@/lib/utils'

/**
 * A project cover that opens as it scrolls in: the frame widens from a clipped
 * window to full size while the screenshot inside settles from a slight zoom.
 * Tied to scroll position, so it never plays ahead of the reader.
 */
export function CoverReveal({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start 35%'] })
  const inset = useTransform(scrollYProgress, [0, 1], [10, 0])
  const clipPath = useTransform(inset, (v) => `inset(${v}% ${v}% ${v}% ${v}%)`)
  const scale = useTransform(scrollYProgress, [0, 1], [1.14, 1])

  if (reduced) {
    return (
      <div ref={ref} className={cn('frame', className)}>
        {children}
      </div>
    )
  }

  return (
    <motion.div ref={ref} style={{ clipPath }} className={cn('frame', className)}>
      <motion.div style={{ scale }} className="absolute inset-0">
        {children}
      </motion.div>
    </motion.div>
  )
}
