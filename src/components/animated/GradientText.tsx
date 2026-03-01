'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface GradientTextProps {
  children: React.ReactNode
  /** 'shimmer' = moving shine | 'shift' = animated gradient | 'neon' = orange glow | 'static' = plain gradient */
  variant?: 'shimmer' | 'shift' | 'neon' | 'static'
  as?: 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'p'
  className?: string
  /** Animate in from below on mount */
  animate?: boolean
  delay?: number
}

/**
 * GradientText — flexible animated gradient text component.
 */
export function GradientText({
  children,
  variant = 'shift',
  as: Tag = 'span',
  className,
  animate = false,
  delay = 0,
}: GradientTextProps) {
  const variantClass = {
    shimmer: 'shimmer-text',
    shift:   'gradient-text-animated',
    neon:    'neon-text',
    static:  'text-gradient-orange',
  }[variant]

  const baseClass = cn(variantClass, className)

  if (animate) {
    return (
      <motion.span
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
        className={baseClass}
        style={{ display: 'inline-block' }}
      >
        {children}
      </motion.span>
    )
  }

  return <Tag className={baseClass}>{children}</Tag>
}
