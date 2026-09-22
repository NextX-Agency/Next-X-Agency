'use client'

import { useSyncExternalStore } from 'react'
import { site } from '@/content/site'

const format = new Intl.DateTimeFormat('nl-NL', {
  hour: '2-digit',
  minute: '2-digit',
  timeZone: site.location.timeZone,
})

const clock = {
  subscribe(onChange: () => void) {
    const id = setInterval(onChange, 15_000)
    return () => clearInterval(id)
  },
  getSnapshot: () => format.format(new Date()),
  getServerSnapshot: () => '--:--',
}

/** Current time in Paramaribo. Renders a placeholder on the server. */
export function LocalTime() {
  const time = useSyncExternalStore(clock.subscribe, clock.getSnapshot, clock.getServerSnapshot)
  return <time className="num">{time}</time>
}
