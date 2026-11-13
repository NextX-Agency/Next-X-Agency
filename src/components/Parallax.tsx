'use client'

import { useRef, type ReactNode } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'

/**
 * Moves its content a little against the scroll, so layered elements (a
 * browser and a phone) separate in depth as the page passes. `distance` is
 * the total travel in pixels across the viewport. Static under reduced motion.
 */
export function Parallax({ children, className, distance = 80 }: { children: ReactNode; className?: string; distance?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  // Phones get a shorter travel: the same pixels read as far more movement on a small screen.
  const y = useTransform(scrollYProgress, (progress) => (0.5 - progress) * distance * (typeof window !== 'undefined' && window.innerWidth < 768 ? 0.4 : 1))

  if (reduced) return <div ref={ref} className={className}>{children}</div>
  return (
    <motion.div ref={ref} className={className} style={{ y }}>
      {children}
    </motion.div>
  )
}
