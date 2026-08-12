'use client'

import { useEffect, useRef } from 'react'
import { usePointerFine } from '@/lib/usePointerFine'

const INTERACTIVE = 'a, button, [role="button"], input, textarea, select, summary'

/**
 * A drafting crosshair that trails the pointer and locks onto interactive
 * elements. Positions are written straight to the DOM inside a rAF loop —
 * no React state per frame, so it costs one composited transform per tick.
 */
function CursorReticleFn() {
  const rootRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = rootRef.current
    const ring = ringRef.current
    if (!root || !ring) return

    // Target = raw pointer. Current = eased follower.
    let targetX = window.innerWidth / 2
    let targetY = window.innerHeight / 2
    let x = targetX
    let y = targetY
    let locked = false
    let visible = false
    let frame = 0

    const onMove = (event: PointerEvent) => {
      targetX = event.clientX
      targetY = event.clientY

      if (!visible) {
        visible = true
        // Jump on first sight so it does not fly in from the centre.
        x = targetX
        y = targetY
        root.style.opacity = '1'
      }

      const overInteractive = !!(event.target as Element | null)?.closest?.(
        INTERACTIVE
      )
      if (overInteractive !== locked) {
        locked = overInteractive
        ring.style.transform = `translate(-50%, -50%) scale(${locked ? 1.9 : 1})`
        ring.style.borderColor = locked
          ? 'var(--color-primary)'
          : 'rgba(32, 27, 23, 0.35)'
        ring.style.backgroundColor = locked
          ? 'var(--color-primary-muted)'
          : 'transparent'
      }
    }

    const onLeave = () => {
      visible = false
      root.style.opacity = '0'
    }

    const tick = () => {
      // Critically damped-ish follow: fast enough to feel attached, slow
      // enough to read as a separate instrument.
      x += (targetX - x) * 0.22
      y += (targetY - y) * 0.22
      root.style.transform = `translate3d(${x}px, ${y}px, 0)`
      frame = requestAnimationFrame(tick)
    }

    // Hide the native cursor only once the reticle is actually running.
    document.documentElement.classList.add('has-reticle')

    frame = requestAnimationFrame(tick)
    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerleave', onLeave)
    window.addEventListener('blur', onLeave)

    return () => {
      document.documentElement.classList.remove('has-reticle')
      cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerleave', onLeave)
      window.removeEventListener('blur', onLeave)
    }
  }, [])

  return (
    <div
      ref={rootRef}
      className="cursor-reticle"
      style={{ opacity: 0 }}
      aria-hidden="true"
    >
      {/* Crosshair arms */}
      <span className="cursor-reticle__arm cursor-reticle__arm--h" />
      <span className="cursor-reticle__arm cursor-reticle__arm--v" />
      {/* Ring that locks on when over something clickable */}
      <div ref={ringRef} className="cursor-reticle__ring" />
    </div>
  )
}

export function CursorReticle() {
  const enabled = usePointerFine()
  if (!enabled) return null
  return <CursorReticleFn />
}
