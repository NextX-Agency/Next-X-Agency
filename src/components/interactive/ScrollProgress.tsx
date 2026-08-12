'use client'

import { motion, useScroll, useSpring } from 'framer-motion'

/**
 * Reading progress, drawn as a hairline rule under the navigation. Spring
 * damped so it settles rather than snapping with the scroll.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 260,
    damping: 40,
    restDelta: 0.001,
  })

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[2px] bg-primary origin-left z-[60] pointer-events-none"
      aria-hidden="true"
    />
  )
}
