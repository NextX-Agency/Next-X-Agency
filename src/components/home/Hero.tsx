'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'
import { Arrow } from '@/components/Arrow'

const Globe = dynamic(() => import('./Globe').then((module) => module.Globe), { ssr: false })

export function Hero() {
  return (
    <section
      data-theme="dark"
      aria-labelledby="hero-title"
      className="nx-hero relative isolate flex min-h-[max(40rem,100svh)] flex-col overflow-hidden pt-[var(--nav-h)]"
    >
      <div
        className="pointer-events-none absolute -z-10 bottom-[-14vw] right-[-12vw] w-[130vw] sm:bottom-[-18vw] sm:right-[-18vw] sm:w-[96vw] lg:bottom-[-18vw] lg:right-[-14vw] lg:w-[74vw] [&_canvas]:pointer-events-auto"
        data-nx-motion="visual"
      >
        <div
          className="absolute inset-[8%] rounded-full bg-[radial-gradient(closest-side,rgba(237,95,15,0.22),rgba(237,95,15,0.06)_60%,transparent)] blur-2xl"
          aria-hidden="true"
        />
        <Globe />
      </div>

      <div className="wrap flex flex-1 flex-col justify-center pb-[22vh] pt-12 sm:pb-24 lg:pb-16">
        <p className="meta mb-8 text-accent" data-nx-motion="kicker">Creatieve & digitale studio uit Suriname</p>
        <h1 id="hero-title" className="t-display" aria-label="Websites, beeld en merken.">
          <span className="block overflow-hidden pb-[0.06em]" aria-hidden="true"><span className="block" data-nx-motion="line">Websites,</span></span>
          <span className="block overflow-hidden pb-[0.06em]" aria-hidden="true"><span className="block" data-nx-motion="line">beeld</span></span>
          <span className="block overflow-hidden pb-[0.06em]" aria-hidden="true"><span className="block" data-nx-motion="line">en merken<span className="text-accent">.</span></span></span>
        </h1>

        <p className="t-lead mt-8 max-w-[29rem] sm:mt-10" data-nx-motion="copy">
          Vanuit Paramaribo ontwerpen en bouwen we websites en software, maken we foto en video, en geven we merken een herkenbare vorm.
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4" data-nx-motion="action">
          <Link href="/contact" className="btn btn-primary">Start een project <Arrow /></Link>
          <Link href="/portfolio" className="link-arrow link-line py-1">Bekijk werkende concepten <Arrow /></Link>
        </div>
      </div>

      <div className="nx-hero-origin" aria-label="NextX is gevestigd in Paramaribo, Suriname">
        <span>Onze thuisbasis</span>
        <strong>Suriname<span className="text-accent">.</span></strong>
        <small>Paramaribo · 05.852° N, 55.204° W</small>
      </div>
    </section>
  )
}
