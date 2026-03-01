'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { fadeInUp } from '@/lib/animationUtils'

interface ScrollRevealProps {
  children: React.ReactNode
  variants?: Variants
  className?: string
  delay?: number
  amount?: number
  /** If true, wraps in a motion.section instead of motion.div */
  as?: 'div' | 'section' | 'li' | 'article'
}

export function ScrollReveal({
  children,
  variants = fadeInUp,
  className,
  delay = 0,
  amount = 0.15,
  as = 'div',
}: ScrollRevealProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount })

  const MotionTag = motion[as]

  return (
    <MotionTag
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      transition={{ delay }}
      className={className}
    >
      {children}
    </MotionTag>
  )
}

/** Stagger parent — children must use a Framer-motion variant that has "hidden"/"visible" */
export function StaggerReveal({
  children,
  staggerVariants,
  className,
  amount = 0.1,
}: {
  children: React.ReactNode
  staggerVariants: Variants
  className?: string
  amount?: number
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount })

  return (
    <motion.div
      ref={ref}
      variants={staggerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className={className}
    >
      {children}
    </motion.div>
  )
}
