'use client'

import { useSyncExternalStore } from 'react'

const QUERY = '(pointer: fine) and (prefers-reduced-motion: no-preference)'

function subscribe(onChange: () => void) {
  const mq = window.matchMedia(QUERY)
  mq.addEventListener('change', onChange)
  return () => mq.removeEventListener('change', onChange)
}

/**
 * True only for precise pointers (mouse/trackpad) on users who have not asked
 * for reduced motion. Everything cursor-driven is gated behind this so touch
 * devices and motion-sensitive visitors get the plain interface.
 */
export function usePointerFine() {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false
  )
}
