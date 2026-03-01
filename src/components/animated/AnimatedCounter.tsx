'use client'

import { useEffect, useRef } from 'react'
import { useInView } from 'framer-motion'
import gsap from 'gsap'

interface AnimatedCounterProps {
  from?: number
  to: number
  prefix?: string
  suffix?: string
  duration?: number
  className?: string
}

/**
 * GSAP-powered number counter that triggers once the element enters the viewport.
 */
export function AnimatedCounter({
  from = 0,
  to,
  prefix = '',
  suffix = '',
  duration = 1.6,
  className,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!isInView || hasAnimated.current || !ref.current) return
    hasAnimated.current = true

    const obj = { val: from }
    gsap.to(obj, {
      val: to,
      duration,
      ease: 'power2.out',
      onUpdate: () => {
        if (ref.current) {
          ref.current.textContent = `${prefix}${Math.round(obj.val)}${suffix}`
        }
      },
    })
  }, [isInView, from, to, duration, prefix, suffix])

  return (
    <span ref={ref} className={className}>
      {prefix}
      {from}
      {suffix}
    </span>
  )
}
