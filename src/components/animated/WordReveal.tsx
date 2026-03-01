'use client'

import { useMemo } from 'react'
import { motion, type Variants } from 'framer-motion'
import { cn } from '@/lib/utils'

interface WordRevealProps {
  text: string
  /** 'up' = words fly in from below | 'fade' = fade in | 'blur' = blur+fade */
  variant?: 'up' | 'fade' | 'blur'
  className?: string
  wordClassName?: string
  delay?: number
  stagger?: number
  /** If true, triggers on whileInView. If false, triggers on mount. */
  inView?: boolean
}

const wordVariants = {
  up: {
    hidden: { opacity: 0, y: 32, skewY: 5 },
    visible: { opacity: 1, y: 0, skewY: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
  },
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } },
  },
  blur: {
    hidden: { opacity: 0, filter: 'blur(10px)', y: 12 },
    visible: { opacity: 1, filter: 'blur(0px)', y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
  },
}

/**
 * WordReveal — animates each word individually, creating a flowing text reveal.
 */
export function WordReveal({
  text,
  variant = 'up',
  className,
  wordClassName,
  delay = 0,
  stagger = 0.08,
  inView = true,
}: WordRevealProps) {
  const words = useMemo(() => text.split(' '), [text])

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger, delayChildren: delay },
    },
  }

  const props = inView
    ? { initial: 'hidden', whileInView: 'visible', viewport: { once: true, amount: 0.3 } }
    : { initial: 'hidden', animate: 'visible' }

  return (
    <motion.span
      variants={containerVariants}
      {...props}
      className={cn('inline', className)}
      style={{ overflow: 'hidden', display: 'inline-flex', flexWrap: 'wrap', gap: '0.25em' }}
    >
      {words.map((word, i) => (
        <span key={i} style={{ overflow: 'hidden', display: 'inline-block' }}>
          <motion.span
            variants={wordVariants[variant] as Variants}
            className={cn('inline-block', wordClassName)}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.span>
  )
}
