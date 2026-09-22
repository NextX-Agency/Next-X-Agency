'use client'

import { useEffect, useRef } from 'react'

type Pt = { x: number; y: number }
type Trace = { pts: Pt[]; len: number; seg: number[]; glow: number }
type Pulse = { trace: Trace; d: number; speed: number }

// Deterministic so the drawing is the same on every visit.
function rng(seed: number) {
  return () => {
    seed = (seed * 16807) % 2147483647
    return (seed - 1) / 2147483646
  }
}

/**
 * Traces in the style of the logo's circuit lines (straight, one 45° bend,
 * a ring at the end) fan out from the wordmark to the page edges. Nodes sit
 * in evenly spaced slots and outer lines bend earlier and further than inner
 * ones, so the diagonals stay parallel and never cross, like a real bus.
 */
type Box = { left: number; right: number; top: number; bottom: number }

function finish(pts: Pt[]): Trace {
  const seg: number[] = []
  let len = 0
  for (let j = 1; j < pts.length; j++) {
    const l = Math.hypot(pts[j].x - pts[j - 1].x, pts[j].y - pts[j - 1].y)
    seg.push(l)
    len += l
  }
  return { pts, len, seg, glow: 0 }
}

function buildTraces(w: number, h: number, box: Box) {
  const rand = rng(11)
  const traces: Trace[] = []
  const small = w < 640
  const gap = 16
  const perSide = small ? 5 : 9
  const pitch = Math.max(9, (box.bottom - box.top) / perSide)
  const spread = small ? 14 : 22

  for (const side of [-1, 1]) {
    const nodeX = side < 0 ? box.left - gap : box.right + gap
    const edgeX = side < 0 ? 0 : w
    for (let j = 0; j < perSide; j++) {
      if (rand() < 0.18) continue
      const d = j - (perSide - 1) / 2
      const nodeY = (box.top + box.bottom) / 2 + d * pitch
      const run = 18 + ((perSide - 1) / 2 - Math.abs(d)) * 12 + rand() * 6
      const bend = d * spread + Math.sign(d || 1) * rand() * 6
      const x1 = nodeX + side * run
      const x2 = x1 + side * Math.abs(bend)
      traces.push(finish([{ x: edgeX, y: nodeY + bend }, { x: x2, y: nodeY + bend }, { x: x1, y: nodeY }, { x: nodeX, y: nodeY }]))
    }
  }

  const perEdge = small ? 3 : 5
  const xPitch = (box.right - box.left) / (perEdge + 1)
  for (const side of [-1, 1]) {
    const nodeY = side < 0 ? box.top - gap : box.bottom + gap
    const edgeY = side < 0 ? 0 : h
    for (let j = 0; j < perEdge; j++) {
      if (rand() < 0.2) continue
      const d = j - (perEdge - 1) / 2
      const nodeX = (box.left + box.right) / 2 + d * xPitch
      const run = 14 + ((perEdge - 1) / 2 - Math.abs(d)) * 10
      const bend = d * (small ? 18 : 34)
      const y1 = nodeY + side * run
      const y2 = y1 + side * Math.abs(bend)
      traces.push(finish([{ x: nodeX + bend, y: edgeY }, { x: nodeX + bend, y: y2 }, { x: nodeX, y: y1 }, { x: nodeX, y: nodeY }]))
    }
  }
  return traces
}

function pointAt(t: Trace, d: number): Pt {
  let rest = d
  for (let j = 0; j < t.seg.length; j++) {
    if (rest <= t.seg[j]) {
      const a = t.pts[j]
      const b = t.pts[j + 1]
      const k = rest / t.seg[j]
      return { x: a.x + (b.x - a.x) * k, y: a.y + (b.y - a.y) * k }
    }
    rest -= t.seg[j]
  }
  return t.pts[t.pts.length - 1]
}

export function SignalField({ anchorId }: { anchorId: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let traces: Trace[] = []
    let pulses: Pulse[] = []
    let w = 0
    let h = 0
    let frame = 0
    let visible = false
    let last = 0
    let nextAmbient = 0
    const pointer = { x: -9999, y: -9999, lastSpawn: 0 }

    const layout = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const rect = canvas.getBoundingClientRect()
      w = rect.width
      h = rect.height
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const anchor = document.getElementById(anchorId)?.getBoundingClientRect()
      // The logo file has transparent margins around its frame (≈6.5% / 10%).
      const ix = anchor ? anchor.width * 0.065 : 0
      const iy = anchor ? anchor.height * 0.1 : 0
      const box = anchor
        ? {
            left: anchor.left - rect.left + ix,
            right: anchor.right - rect.left - ix,
            top: anchor.top - rect.top + iy,
            bottom: anchor.bottom - rect.top - iy,
          }
        : { left: w * 0.35, right: w * 0.65, top: h * 0.42, bottom: h * 0.58 }
      traces = buildTraces(w, h, box)
      // Reduced motion gets a still image: a few traces lit, nothing moving.
      if (reduced) traces.forEach((t, i) => (t.glow = i % 4 === 0 ? 1 : 0))
      pulses = []
      draw(0)
    }

    const spawn = (trace: Trace) => {
      if (pulses.length > 40) return
      pulses.push({ trace, d: 0, speed: 260 + Math.random() * 220 })
    }

    const draw = (dt: number) => {
      ctx.clearRect(0, 0, w, h)

      // Base traces
      for (const t of traces) {
        t.glow = Math.max(0, t.glow - dt * 1.4)
        ctx.lineWidth = 1
        ctx.strokeStyle = `rgba(238, 235, 229, ${0.16 + t.glow * 0.3})`
        ctx.beginPath()
        ctx.moveTo(t.pts[0].x, t.pts[0].y)
        for (let j = 1; j < t.pts.length; j++) ctx.lineTo(t.pts[j].x, t.pts[j].y)
        ctx.stroke()

        const end = t.pts[t.pts.length - 1]
        ctx.beginPath()
        ctx.arc(end.x, end.y, 3.2, 0, Math.PI * 2)
        ctx.lineWidth = 1.4
        ctx.strokeStyle = t.glow > 0.02 ? `rgba(237, 95, 15, ${0.35 + t.glow * 0.65})` : 'rgba(238, 235, 229, 0.28)'
        ctx.stroke()
      }

      // Signals: a short orange segment with a fading tail
      for (const p of pulses) {
        const head = pointAt(p.trace, p.d)
        const tail = pointAt(p.trace, Math.max(0, p.d - 46))
        const grad = ctx.createLinearGradient(tail.x, tail.y, head.x, head.y)
        grad.addColorStop(0, 'rgba(237, 95, 15, 0)')
        grad.addColorStop(1, 'rgba(237, 95, 15, 1)')
        ctx.strokeStyle = grad
        ctx.lineWidth = 1.6
        ctx.beginPath()
        ctx.moveTo(tail.x, tail.y)
        // follow corners between tail and head
        let acc = 0
        for (let j = 0; j < p.trace.seg.length; j++) {
          acc += p.trace.seg[j]
          if (acc > p.d - 46 && acc < p.d) ctx.lineTo(p.trace.pts[j + 1].x, p.trace.pts[j + 1].y)
        }
        ctx.lineTo(head.x, head.y)
        ctx.stroke()
      }
    }

    const tick = (now: number) => {
      frame = 0
      if (!visible) return
      const dt = Math.min(0.05, (now - (last || now)) / 1000)
      last = now

      if (now > nextAmbient && traces.length) {
        spawn(traces[Math.floor(Math.random() * traces.length)])
        nextAmbient = now + 700 + Math.random() * 900
      }

      for (const p of pulses) p.d += p.speed * dt
      pulses = pulses.filter((p) => {
        if (p.d >= p.trace.len) {
          p.trace.glow = 1
          return false
        }
        return true
      })

      draw(dt)
      frame = requestAnimationFrame(tick)
    }

    const start = () => {
      if (!frame && visible && !reduced) {
        last = 0
        frame = requestAnimationFrame(tick)
      }
    }

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      pointer.x = e.clientX - rect.left
      pointer.y = e.clientY - rect.top
      const now = performance.now()
      if (now - pointer.lastSpawn < 90) return
      pointer.lastSpawn = now
      // Wake the trace closest to the pointer
      let best: Trace | null = null
      let bestD = 70
      for (const t of traces) {
        for (let j = 0; j < t.pts.length - 1; j++) {
          const a = t.pts[j]
          const b = t.pts[j + 1]
          const abx = b.x - a.x
          const aby = b.y - a.y
          const k = Math.max(0, Math.min(1, ((pointer.x - a.x) * abx + (pointer.y - a.y) * aby) / (abx * abx + aby * aby || 1)))
          const d = Math.hypot(pointer.x - (a.x + abx * k), pointer.y - (a.y + aby * k))
          if (d < bestD) {
            bestD = d
            best = t
          }
        }
      }
      if (best) spawn(best)
    }

    const onDown = () => {
      for (let i = 0; i < 6; i++) spawn(traces[Math.floor(Math.random() * traces.length)])
    }

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      start()
    })
    const ro = new ResizeObserver(layout)
    io.observe(canvas)
    ro.observe(canvas)
    layout()

    if (!reduced) {
      canvas.addEventListener('pointermove', onMove)
      canvas.addEventListener('pointerdown', onDown)
    }

    return () => {
      cancelAnimationFrame(frame)
      io.disconnect()
      ro.disconnect()
      canvas.removeEventListener('pointermove', onMove)
      canvas.removeEventListener('pointerdown', onDown)
    }
  }, [anchorId])

  return <canvas ref={canvasRef} className="absolute inset-0 size-full touch-pan-y" aria-hidden="true" />
}
