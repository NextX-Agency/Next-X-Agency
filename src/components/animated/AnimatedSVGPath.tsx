'use client'

import { motion } from 'framer-motion'

interface AnimatedSVGPathProps extends React.SVGProps<SVGPathElement> {
  duration?: number
  delay?: number
}

/**
 * SVG <path> that draws itself when it enters the viewport (Framer Motion pathLength).
 */
export function AnimatedSVGPath({ duration = 2, delay = 0, ...svgProps }: AnimatedSVGPathProps) {
  return (
    <motion.path
      {...(svgProps as Parameters<typeof motion.path>[0])}
      initial={{ pathLength: 0, opacity: 0 }}
      whileInView={{ pathLength: 1, opacity: svgProps.opacity ?? 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        pathLength: { duration, delay, ease: 'easeInOut' },
        opacity: { duration: 0.35, delay },
      }}
    />
  )
}

interface AnimatedSVGCircleProps extends React.SVGProps<SVGCircleElement> {
  duration?: number
  delay?: number
}

/**
 * SVG <circle> that scales in when it enters the viewport.
 */
export function AnimatedSVGCircle({ duration = 0.6, delay = 0, ...svgProps }: AnimatedSVGCircleProps) {
  return (
    <motion.circle
      {...(svgProps as Parameters<typeof motion.circle>[0])}
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: svgProps.opacity ?? 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration, delay, ease: [0.34, 1.56, 0.64, 1] }}
      style={{ transformOrigin: 'center center' }}
    />
  )
}
