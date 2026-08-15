'use client'

import { useSyncExternalStore } from 'react'

/**
 * Subscribe to a media query. Returns false during server render and on the
 * first client render, so the markup matches and effects that dim or move
 * content only switch on once the browser has actually measured the viewport.
 */
export function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia(query)
      mq.addEventListener('change', onChange)
      return () => mq.removeEventListener('change', onChange)
    },
    () => window.matchMedia(query).matches,
    () => false
  )
}
