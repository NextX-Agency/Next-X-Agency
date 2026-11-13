'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Arrow, ArrowOut } from '@/components/Arrow'
import { site, whatsappHref } from '@/content/site'

/** The closing call to action. Left out on the contact page, which already is one. */
export function FooterCta() {
  if (usePathname() === '/contact') return null
  return (
    <section className="grid-12 gap-y-10 py-20 md:py-32" aria-labelledby="footer-cta-title">
      <div className="col-span-4 md:col-span-7">
        <h2 id="footer-cta-title" className="t-display max-w-[9ch]">
          Heeft u een idee<span className="text-accent">?</span>
        </h2>
      </div>
      <div className="col-span-4 flex flex-col items-start justify-end gap-5 md:col-span-4 md:col-start-9">
        <p className="t-lead max-w-[24ch]">Antwoord binnen {site.responseTime}, op werkdagen.</p>
        <div className="flex flex-wrap items-center gap-x-7 gap-y-3">
          <Link href="/contact" className="btn btn-primary">
            Start een project
            <Arrow />
          </Link>
          <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" className="link-arrow link-line py-1">
            Of via WhatsApp
            <ArrowOut />
          </a>
        </div>
      </div>
    </section>
  )
}
