'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'
import { Arrow } from '@/components/Arrow'
import { specialties } from '@/content/disciplines'

const Globe = dynamic(() => import('./Globe').then((module) => module.Globe), { ssr: false })

export function Hero() {
  return (
    <section
      data-theme="dark"
      aria-labelledby="hero-title"
      className="nx-hero relative isolate flex min-h-[max(42rem,100svh)] flex-col overflow-hidden pt-[var(--nav-h)]"
    >
      <div
        className="pointer-events-none absolute -z-10 bottom-[-52vw] right-[-14vw] w-[128vw] sm:bottom-[-18vw] sm:right-[-18vw] sm:w-[96vw] lg:bottom-[-18vw] lg:right-[-14vw] lg:w-[72vw] [&_canvas]:pointer-events-auto"
        data-nx-motion="visual"
      >
        <div
          className="absolute inset-[8%] rounded-full bg-[radial-gradient(closest-side,rgba(237,95,15,0.2),rgba(237,95,15,0.05)_60%,transparent)] blur-2xl"
          aria-hidden="true"
        />
        <Globe />
      </div>

      <div className="wrap flex flex-1 flex-col justify-center pb-10 pt-10 md:pt-14">
        <p className="meta mb-6 text-accent md:mb-8" data-nx-motion="kicker">Ontwerpstudio & softwarebouwer · Paramaribo</p>
        <h1 id="hero-title" className="t-display nx-hero-title" aria-label="Design, websites en software.">
          <span className="block overflow-hidden pb-[0.08em]" aria-hidden="true"><span className="block" data-nx-motion="line">Design,</span></span>
          <span className="block overflow-hidden pb-[0.08em]" aria-hidden="true"><span className="block" data-nx-motion="line">websites</span></span>
          <span className="block overflow-hidden pb-[0.08em]" aria-hidden="true"><span className="block" data-nx-motion="line">en software<span className="text-accent">.</span></span></span>
        </h1>

        <p className="t-lead mt-7 max-w-[31rem] md:mt-9" data-nx-motion="copy">
          NextX geeft bedrijven een herkenbaar merk, bouwt hun website of webshop en ontwikkelt software op maat. Eén studio voor ontwerp en techniek.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4" data-nx-motion="action">
          <Link href="/contact" className="btn btn-primary">Start een project <Arrow /></Link>
          <Link href="/portfolio" className="link-arrow link-line py-1">Bekijk ons werk <Arrow /></Link>
        </div>
      </div>

      <nav aria-label="Specialismen" className="wrap pb-[50vw] sm:pb-[24vw] md:pb-10" data-nx-motion="rail">
        <div className="nx-hero-rail">
          {specialties.map((specialty) => (
            <Link key={specialty.id} href={`/services#${specialty.id}`}>
              <span className="num">{specialty.index}</span>
              <span>{specialty.name}</span>
              <Arrow />
            </Link>
          ))}
        </div>
      </nav>
    </section>
  )
}
