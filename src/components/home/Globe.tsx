'use client'

import { useEffect, useRef, useState } from 'react'
import { site } from '@/content/site'
import { cn } from '@/lib/utils'

const { lat, lng } = site.location
// COBE angles that put a coordinate at the centre of the visible disc.
const HOME_PHI = Math.PI - ((lng * Math.PI) / 180 - Math.PI / 2)
const HOME_THETA = (lat * Math.PI) / 180 + 0.18

/**
 * The NextX globe. Held on Paramaribo, drifting a few degrees either side;
 * dragging turns it and it eases back home on release. Rendering stops while
 * the globe is off screen, and the library is only loaded when it is needed.
 */
export function Globe({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let globe: { update: (s: Record<string, unknown>) => void; destroy: () => void } | null = null
    let frame = 0
    let visible = false
    let disposed = false
    let width = 0

    // Pointer state: drag offset in radians, with velocity for the release.
    let dragging = false
    let lastX = 0
    let offset = 0
    let velocity = 0
    const start = performance.now()

    // The globe leans a little toward the cursor (fine pointers only).
    const lean = { x: 0, y: 0, tx: 0, ty: 0 }
    const fine = window.matchMedia('(pointer: fine)').matches && !reduced
    const onLook = (e: PointerEvent) => {
      lean.tx = (e.clientX / window.innerWidth - 0.5) * 0.5
      lean.ty = (e.clientY / window.innerHeight - 0.5) * 0.18
    }

    const onDown = (e: PointerEvent) => {
      dragging = true
      lastX = e.clientX
      velocity = 0
      canvas.setPointerCapture(e.pointerId)
      canvas.style.cursor = 'grabbing'
    }
    const onMove = (e: PointerEvent) => {
      if (!dragging) return
      const dx = (e.clientX - lastX) / Math.max(width / 2, 200)
      lastX = e.clientX
      offset += dx * 2.2
      velocity = dx * 2.2
    }
    const onUp = () => {
      dragging = false
      canvas.style.cursor = 'grab'
    }

    const measure = () => {
      width = canvas.offsetWidth
    }

    const tick = (now: number) => {
      frame = 0
      if (!globe || !visible || disposed) return
      if (!dragging) {
        // Carry the flick a little, then spring back to Paramaribo.
        offset += velocity
        velocity *= 0.9
        offset *= 0.96
      }
      const t = (now - start) / 1000
      const drift = reduced ? 0 : Math.sin(t * 0.18) * 0.28
      lean.x += (lean.tx - lean.x) * 0.04
      lean.y += (lean.ty - lean.y) * 0.04
      // Paramaribo breathes: the marker swells and settles every few seconds.
      const pulse = reduced ? 0 : (Math.sin(t * 1.6) + 1) / 2
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      globe.update({
        phi: HOME_PHI + drift + offset + lean.x,
        theta: HOME_THETA + lean.y,
        width: width * dpr,
        height: width * dpr,
        markers: [{ location: [lat, lng], size: 0.028 + pulse * 0.02, id: 'pbm' }],
      })
      frame = requestAnimationFrame(tick)
    }

    const run = () => {
      if (!frame && visible && globe) frame = requestAnimationFrame(tick)
    }

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      run()
    })
    const ro = new ResizeObserver(measure)

    measure()
    import('cobe')
      .then(({ default: createGlobe }) => {
        if (disposed) return
        const dpr = Math.min(window.devicePixelRatio || 1, 2)
        try {
          globe = createGlobe(canvas, {
            devicePixelRatio: dpr,
            width: width * dpr,
            height: width * dpr,
            phi: HOME_PHI,
            theta: HOME_THETA,
            dark: 1,
            diffuse: 1.1,
            mapSamples: 24000,
            mapBrightness: 3.4,
            mapBaseBrightness: 0.02,
            baseColor: [0.24, 0.225, 0.21],
            markerColor: [0.93, 0.37, 0.06],
            glowColor: [0.2, 0.11, 0.06],
            markers: [{ location: [lat, lng], size: 0.032, id: 'pbm' }],
            markerElevation: 0.01,
            opacity: 0.95,
          }) as typeof globe
        } catch {
          return // No WebGL: the globe is decorative, so the page simply goes without.
        }
        setReady(true)
        io.observe(canvas)
        ro.observe(canvas)
        run()
      })
      .catch(() => {})

    if (fine) window.addEventListener('pointermove', onLook, { passive: true })
    canvas.addEventListener('pointerdown', onDown)
    canvas.addEventListener('pointermove', onMove)
    canvas.addEventListener('pointerup', onUp)
    canvas.addEventListener('pointercancel', onUp)

    return () => {
      disposed = true
      cancelAnimationFrame(frame)
      io.disconnect()
      ro.disconnect()
      window.removeEventListener('pointermove', onLook)
      canvas.removeEventListener('pointerdown', onDown)
      canvas.removeEventListener('pointermove', onMove)
      canvas.removeEventListener('pointerup', onUp)
      canvas.removeEventListener('pointercancel', onUp)
      globe?.destroy()
    }
  }, [])

  return (
    <div className={cn('relative aspect-square', className)} aria-hidden="true">
      <canvas
        ref={canvasRef}
        className={cn(
          'size-full cursor-grab touch-pan-y transition-opacity duration-[1600ms] ease-out',
          ready ? 'opacity-100' : 'opacity-0'
        )}
      />
      <div className="globe-label pointer-events-none flex items-end gap-2 pb-3 pl-3">
        <span className="block h-px w-8 bg-accent" />
        <span className="meta whitespace-nowrap text-fg">{site.location.city}</span>
      </div>
    </div>
  )
}
