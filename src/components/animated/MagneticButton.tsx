'use client'

import { useRef, MouseEvent, ReactNode } from 'react'
import { motion, useSpring } from 'framer-motion'
import { cn } from '@/lib/utils'

interface MagneticButtonProps {
  children: ReactNode
  className?: string
  strength?: number
  onClick?: () => void
  'data-cursor-hover'?: boolean
}

/**
 * MagneticButton — element that follows the cursor slightly on hover.
 * On touch devices, uses a scale-down press effect instead.
 */
export function MagneticButton({
  children,
  className,
  strength = 0.35,
  onClick,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null)

  const x = useSpring(0, { stiffness: 200, damping: 20, mass: 0.5 })
  const y = useSpring(0, { stiffness: 200, damping: 20, mass: 0.5 })

  function onMouseMove(e: MouseEvent<HTMLDivElement>) {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    x.set((e.clientX - cx) * strength)
    y.set((e.clientY - cy) * strength)
  }

  function onMouseLeave() {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      style={{ x, y, display: 'inline-flex' }}
      className={cn('magnetic-btn select-none', className)}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      data-cursor-hover
    >
      {children}
    </motion.div>
  )
}
