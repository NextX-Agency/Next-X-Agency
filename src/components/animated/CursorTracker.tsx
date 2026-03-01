'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * CursorTracker — custom cursor dot + ring that follow the mouse
 * Desktop only. Disable on touch/mobile automatically.
 * Add `data-cursor-hover` to any element to enlarge the ring.
 */
export function CursorTracker() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const pos = useRef({ x: 0, y: 0 })
  const ringPos = useRef({ x: 0, y: 0 })
  const rafRef = useRef<number>(0)

  useEffect(() => {
    // Only on pointer (non-touch) devices
    if (typeof window === 'undefined') return
    const isTouchDevice = window.matchMedia('(hover: none)').matches
    if (isTouchDevice) return

    document.documentElement.classList.add('custom-cursor-active')

    function onMove(e: MouseEvent) {
      pos.current = { x: e.clientX, y: e.clientY }
      if (!visible) setVisible(true)
    }

    function onLeave() { setVisible(false) }
    function onEnter() { setVisible(true) }

    function animate() {
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x - 4}px, ${pos.current.y - 4}px)`
      }
      // Ring lags behind (lerp)
      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.14
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.14
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringPos.current.x - 18}px, ${ringPos.current.y - 18}px)`
      }
      rafRef.current = requestAnimationFrame(animate)
    }

    function handleHoverEnter(e: MouseEvent) {
      const target = e.target as Element
      if (target.closest('[data-cursor-hover]')) {
        ringRef.current?.classList.add('hovering')
      }
    }
    function handleHoverLeave(e: MouseEvent) {
      const target = e.target as Element
      if (target.closest('[data-cursor-hover]')) {
        ringRef.current?.classList.remove('hovering')
      }
    }

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)
    document.addEventListener('mouseover', handleHoverEnter)
    document.addEventListener('mouseout', handleHoverLeave)
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
      document.removeEventListener('mouseover', handleHoverEnter)
      document.removeEventListener('mouseout', handleHoverLeave)
      cancelAnimationFrame(rafRef.current)
      document.documentElement.classList.remove('custom-cursor-active')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <div
        ref={dotRef}
        className="cursor-dot"
        style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.2s ease' }}
        aria-hidden="true"
      />
      <div
        ref={ringRef}
        className="cursor-ring"
        style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.2s ease' }}
        aria-hidden="true"
      />
    </>
  )
}
