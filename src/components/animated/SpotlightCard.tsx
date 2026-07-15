'use client'

import { useRef, useState, useEffect, useCallback, MouseEvent, TouchEvent, ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface SpotlightCardProps {
  children: ReactNode
  className?: string
  /** Spotlight color (rgba or hex) */
  spotColor?: string
}

/**
 * SpotlightCard — card with a radial spotlight that follows the cursor.
 * On touch devices, spotlight appears on tap and fades out on release.
 */
export function SpotlightCard({
  children,
  className,
  spotColor = 'rgba(249,112,21,0.08)',
}: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isTouch, setIsTouch] = useState(false)
  const [spotlightActive, setSpotlightActive] = useState(false)

  useEffect(() => {
    setIsTouch(window.matchMedia('(hover: none)').matches)
  }, [])

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    if (isTouch || !cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    cardRef.current.style.setProperty('--spotlight-x', `${x}px`)
    cardRef.current.style.setProperty('--spotlight-y', `${y}px`)
  }

  function handleMouseLeave() {
    if (isTouch || !cardRef.current) return
    cardRef.current.style.setProperty('--spotlight-x', '-999px')
    cardRef.current.style.setProperty('--spotlight-y', '-999px')
  }

  const handleTouchStart = useCallback((e: TouchEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const touch = e.touches[0]
    const rect = cardRef.current.getBoundingClientRect()
    cardRef.current.style.setProperty('--spotlight-x', `${touch.clientX - rect.left}px`)
    cardRef.current.style.setProperty('--spotlight-y', `${touch.clientY - rect.top}px`)
    setSpotlightActive(true)
  }, [])

  const handleTouchEnd = useCallback(() => {
    setSpotlightActive(false)
    // Let the CSS transition fade it out, then reset position
    setTimeout(() => {
      if (cardRef.current) {
        cardRef.current.style.setProperty('--spotlight-x', '-999px')
        cardRef.current.style.setProperty('--spotlight-y', '-999px')
      }
    }, 400)
  }, [])

  return (
    <div
      ref={cardRef}
      className={cn('relative overflow-hidden group card-shine glow-border', className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      data-cursor-hover
      style={{
        '--spotlight-x': '-999px',
        '--spotlight-y': '-999px',
      } as React.CSSProperties}
    >
      {/* Spotlight layer */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background: `radial-gradient(350px circle at var(--spotlight-x) var(--spotlight-y), ${spotColor}, transparent 80%)`,
          opacity: isTouch ? (spotlightActive ? 1 : 0) : 1,
          transition: 'opacity 0.4s ease',
        }}
      />
      {children}
    </div>
  )
}
