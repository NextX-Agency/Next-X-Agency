'use client'

import { useEffect, useRef } from 'react'

export interface ParticleFieldProps {
  /** Total number of particles */
  count?: number
  /** Whether particles react to mouse proximity */
  interactive?: boolean
  /** Particle color hex (default: orange) */
  color?: string
  className?: string
}

/**
 * ParticleField — canvas-based particle system.
 * Particles float upward and react to mouse on desktop.
 */
export function ParticleField({
  count = 55,
  interactive = true,
  color = '#f97015',
  className = 'absolute inset-0',
}: ParticleFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouse = useRef({ x: -9999, y: -9999 })
  const animRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
    if (!ctx) return

    let W = canvas.offsetWidth
    let H = canvas.offsetHeight
    canvas.width = W
    canvas.height = H

    const hexToRgb = (hex: string) => {
      const r = parseInt(hex.slice(1, 3), 16)
      const g = parseInt(hex.slice(3, 5), 16)
      const b = parseInt(hex.slice(5, 7), 16)
      return `${r},${g},${b}`
    }
    const rgb = hexToRgb(color)

    type Particle = {
      x: number; y: number; vx: number; vy: number
      size: number; opacity: number; life: number; maxLife: number
    }

    const makeParticle = (): Particle => ({
      x: Math.random() * W,
      y: H + Math.random() * 20,
      vx: (Math.random() - 0.5) * 0.5,
      vy: -(0.3 + Math.random() * 0.7),
      size: 1 + Math.random() * 2.5,
      opacity: 0,
      life: 0,
      maxLife: 120 + Math.random() * 180,
    })

    let particles: Particle[] = Array.from({ length: count }, () => {
      const p = makeParticle()
      p.y = Math.random() * H // spread on init
      p.life = Math.random() * p.maxLife
      return p
    })

    const REPEL_RADIUS = 90
    const REPEL_FORCE = 1.8

    function tick() {
      ctx.clearRect(0, 0, W, H)

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        p.life++

        // Fade in / out
        const halfLife = p.maxLife * 0.5
        p.opacity = p.life < halfLife
          ? p.life / halfLife
          : 1 - (p.life - halfLife) / halfLife

        // Mouse repel
        if (interactive) {
          const dx = p.x - mouse.current.x
          const dy = p.y - mouse.current.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < REPEL_RADIUS) {
            const force = (REPEL_RADIUS - dist) / REPEL_RADIUS
            p.vx += (dx / dist) * force * REPEL_FORCE * 0.04
            p.vy += (dy / dist) * force * REPEL_FORCE * 0.04
          }
        }

        p.x += p.vx
        p.y += p.vy

        // Dampen horizontal
        p.vx *= 0.98

        // Draw
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${rgb},${p.opacity * 0.55})`
        ctx.fill()

        // Recycle
        if (p.life >= p.maxLife || p.y < -10) {
          particles[i] = makeParticle()
        }
      }

      // Draw connecting lines between close particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d < 80) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(${rgb},${0.06 * (1 - d / 80)})`
            ctx.lineWidth = 0.5
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }

      animRef.current = requestAnimationFrame(tick)
    }

    // Resize
    const resizeObs = new ResizeObserver(() => {
      W = canvas.offsetWidth
      H = canvas.offsetHeight
      canvas.width = W
      canvas.height = H
    })
    resizeObs.observe(canvas)

    // Mouse track
    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }
    const onLeave = () => { mouse.current = { x: -9999, y: -9999 } }
    canvas.parentElement?.addEventListener('mousemove', onMove)
    canvas.parentElement?.addEventListener('mouseleave', onLeave)

    animRef.current = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(animRef.current)
      resizeObs.disconnect()
      canvas.parentElement?.removeEventListener('mousemove', onMove)
      canvas.parentElement?.removeEventListener('mouseleave', onLeave)
    }
  }, [count, interactive, color])

  return (
    <canvas
      ref={canvasRef}
      className={`${className} pointer-events-none`}
      aria-hidden="true"
      style={{ width: '100%', height: '100%' }}
    />
  )
}
