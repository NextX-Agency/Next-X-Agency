'use client'

import { useEffect } from 'react'
import './hero-motion.css'

/** Progressive enhancement for the homepage. Content remains visible until this mounts. */
export function HeroMotion() {
  useEffect(() => {
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (motionPreference.matches) return

    const root = document.documentElement
    const hero = Array.from(document.querySelectorAll<HTMLElement>('.nx-hero [data-nx-motion]'))
    const showcase = Array.from(document.querySelectorAll<HTMLElement>('.nx-concept-showcase [data-nx-motion]'))
    if (!hero.length && !showcase.length) return

    let frame = 0
    let observer: IntersectionObserver | undefined

    root.classList.add('nx-motion-ready')

    // Let the initial style reach the compositor before revealing the hero.
    frame = window.requestAnimationFrame(() => {
      frame = window.requestAnimationFrame(() => {
        hero.forEach((element) => element.classList.add('nx-motion-visible'))
      })
    })

    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.classList.add('nx-motion-visible')
          observer?.unobserve(entry.target)
        }
      }, { threshold: 0.08, rootMargin: '0px 0px -5% 0px' })
      showcase.forEach((element) => observer?.observe(element))
    } else {
      showcase.forEach((element) => element.classList.add('nx-motion-visible'))
    }

    return () => {
      window.cancelAnimationFrame(frame)
      observer?.disconnect()
      root.classList.remove('nx-motion-ready')
      ;[...hero, ...showcase].forEach((element) => element.classList.remove('nx-motion-visible'))
    }
  }, [])

  return null
}
