'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import { usePointerFine } from '@/lib/usePointerFine'

/**
 * Pulls its child a few pixels toward the pointer while the pointer is near,
 * then releases it. Wraps rather than replaces the child's markup, so the
 * underlying link or button keeps its own styles and semantics.
 */
function MagneticFn({
  children,
  strength = 0.28,
  radius = 90,
  className,
}: {
  children: ReactNode
  strength?: number
  radius?: number
  className?: string
}) {
  const wrapRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const wrap = wrapRef.current
    if (!wrap) return

    let frame = 0
    let currentX = 0
    let currentY = 0
    let targetX = 0
    let targetY = 0

    const onMove = (event: PointerEvent) => {
      const box = wrap.getBoundingClientRect()
      const centreX = box.left + box.width / 2
      const centreY = box.top + box.height / 2
      const dx = event.clientX - centreX
      const dy = event.clientY - centreY

      // Only engage inside a ring around the element's own box.
      if (Math.hypot(dx, dy) < Math.max(box.width, box.height) / 2 + radius) {
        targetX = dx * strength
        targetY = dy * strength
      } else {
        targetX = 0
        targetY = 0
      }
    }

    const tick = () => {
      currentX += (targetX - currentX) * 0.16
      currentY += (targetY - currentY) * 0.16
      wrap.style.transform = `translate3d(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px, 0)`
      frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    window.addEventListener('pointermove', onMove, { passive: true })

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', onMove)
    }
  }, [radius, strength])

  return (
    <span ref={wrapRef} className={className} style={{ display: 'inline-block' }}>
      {children}
    </span>
  )
}

export function Magnetic({
  children,
  className,
  ...rest
}: {
  children: ReactNode
  strength?: number
  radius?: number
  className?: string
}) {
  const enabled = usePointerFine()

  if (!enabled) {
    return <span className={className}>{children}</span>
  }

  return (
    <MagneticFn className={className} {...rest}>
      {children}
    </MagneticFn>
  )
}
