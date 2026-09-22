'use client'

import Link from 'next/link'
import dynamic from 'next/dynamic'
import { Arrow } from '@/components/Arrow'

const Globe = dynamic(() => import('./Globe').then((m) => m.Globe), { ssr: false })

const lines = ['Websites,', 'webshops', 'en merken.']

// Entrance runs in CSS so the headline never waits on hydration.
const delay = (s: number) => ({ animationDelay: `${s}s` }) as React.CSSProperties

export function Hero() {
  return (
    <section
      data-theme="dark"
      className="relative isolate flex min-h-[max(40rem,100svh)] flex-col overflow-hidden pt-[var(--nav-h)]"
    >
      {/* The globe rises out of the bottom right, lit from below in the brand orange */}
      <div
        className="enter-globe pointer-events-none absolute -z-10 bottom-[-30vw] right-[-12vw] w-[130vw] sm:bottom-[-24vw] sm:right-[-18vw] sm:w-[96vw] lg:bottom-[-26vw] lg:right-[-14vw] lg:w-[74vw] [&_canvas]:pointer-events-auto"
        style={delay(0.2)}
      >
        <div
          className="absolute inset-[8%] rounded-full bg-[radial-gradient(closest-side,rgba(237,95,15,0.22),rgba(237,95,15,0.06)_60%,transparent)] blur-2xl"
          aria-hidden="true"
        />
        <Globe />
      </div>

      <div className="wrap flex flex-1 flex-col justify-center pb-[22vh] pt-12 sm:pb-24 lg:pb-16">
        <h1 className="t-display" aria-label="Websites, webshops en merken.">
          {lines.map((line, i) => (
            <span key={line} className="block overflow-hidden pb-[0.06em]" aria-hidden="true">
              <span className="enter-rise block" style={delay(0.1 + i * 0.09)}>
                {i === lines.length - 1 ? (
                  <>
                    {line.slice(0, -1)}
                    <span className="text-accent">.</span>
                  </>
                ) : (
                  line
                )}
              </span>
            </span>
          ))}
        </h1>

        <p style={delay(0.5)} className="enter-fade t-lead mt-8 max-w-[26rem] sm:mt-10">
          Een digitale studio in Paramaribo. Ontwerp en code komen uit dezelfde hand.
        </p>

        <div style={delay(0.6)} className="enter-fade mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
          <Link href="/contact" className="btn btn-primary">
            Start een project
            <Arrow />
          </Link>
          <Link href="/portfolio" className="link-arrow link-line py-1">
            Bekijk werk
          </Link>
        </div>
      </div>
    </section>
  )
}
