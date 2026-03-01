'use client'

import { useRef, MouseEvent, ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface SpotlightCardProps {
  children: ReactNode
  className?: string
  /** Spotlight color (rgba or hex) */
  spotColor?: string
}

/**
 * SpotlightCard — card with a radial spotlight that follows the cursor.
 * Creates a subtle glow effect wherever the mouse is hovering.
 */
export function SpotlightCard({
  children,
  className,
  spotColor = 'rgba(249,112,21,0.08)',
}: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    cardRef.current.style.setProperty('--spotlight-x', `${x}px`)
    cardRef.current.style.setProperty('--spotlight-y', `${y}px`)
  }

  function handleMouseLeave() {
    if (!cardRef.current) return
    cardRef.current.style.setProperty('--spotlight-x', '-999px')
    cardRef.current.style.setProperty('--spotlight-y', '-999px')
  }

  return (
    <div
      ref={cardRef}
      className={cn('relative overflow-hidden group card-shine glow-border', className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-cursor-hover
      style={{
        '--spotlight-x': '-999px',
        '--spotlight-y': '-999px',
      } as React.CSSProperties}
    >
      {/* Spotlight layer */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300"
        style={{
          background: `radial-gradient(350px circle at var(--spotlight-x) var(--spotlight-y), ${spotColor}, transparent 80%)`,
        }}
      />
      {children}
    </div>
  )
}
