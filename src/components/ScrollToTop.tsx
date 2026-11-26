'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from 'framer-motion'

/**
 * A round "back to top" button that appears once the reader is well into the
 * page. The ring around it fills with scroll progress.
 */
export function ScrollToTop() {
  const [shown, setShown] = useState(false)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 26, restDelta: 0.001 })

  useEffect(() => {
    const read = () => setShown(window.scrollY > window.innerHeight * 0.9)
    read()
    window.addEventListener('scroll', read, { passive: true })
    return () => window.removeEventListener('scroll', read)
  }, [])

  return (
    <AnimatePresence>
      {shown && (
        <motion.button
          type="button"
          className="nx-to-top"
          aria-label="Back to top"
          onClick={() => window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' })}
          initial={{ opacity: 0, y: 16, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.8 }}
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.92 }}
          transition={{ type: 'spring', stiffness: 380, damping: 28 }}
        >
          <svg className="nx-to-top-ring" viewBox="0 0 48 48" aria-hidden="true">
            <circle cx="24" cy="24" r="22" className="nx-to-top-track" />
            <motion.circle cx="24" cy="24" r="22" className="nx-to-top-progress" style={{ pathLength: progress }} />
          </svg>
          <svg className="nx-to-top-arrow" width="14" height="16" viewBox="0 0 14 16" fill="none" aria-hidden="true">
            <path d="M7 15V2M1.5 7 7 1.5 12.5 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  )
}
