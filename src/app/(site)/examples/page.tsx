import type { Metadata } from 'next'
import Link from 'next/link'
import { examples } from '@/content/examples'
import { whatsappHref } from '@/content/site'
import { Arrow } from '@/components/Arrow'
import { ConceptBrowser } from '@/components/concepts/ConceptBrowser'
import { WhatsAppIcon } from '@/components/concepts/WantThis'

export const metadata: Metadata = {
  title: 'Concept Lab',
  description:
    'Explore interactive concept demos from NextX Agency by category: e-commerce, websites, SaaS dashboards and branding. All brands are fictional.',
  alternates: { canonical: '/examples' },
  openGraph: { title: 'Concept Lab — NextX Agency', url: '/examples' },
}

export default function ExamplesPage() {
  return (
    <div data-theme="dark" className="min-h-screen pb-[var(--section)]">
      <header className="wrap pb-14 pt-[calc(var(--nav-h)+4rem)] md:pb-20 md:pt-[calc(var(--nav-h)+7rem)]">
        <h1 className="t-display">Concept Lab<span className="text-accent">.</span></h1>
        <div className="mt-8 flex flex-wrap items-end justify-between gap-6">
          <p className="t-lead max-w-[34ch] text-fg">
            Working demos for made-up brands, by category. See something that fits? Tap <b className="font-semibold">I want this</b> and send it on WhatsApp.
          </p>
          <Link href="/portfolio" className="btn btn-quiet">See the real work <Arrow /></Link>
        </div>
      </header>

      <div className="wrap">
        <ConceptBrowser items={examples} priorityFirst />

        <aside className="nx-cta-card mt-20 md:mt-28" aria-labelledby="custom-title">
          <h2 id="custom-title" className="t-h2 max-w-[18ch]">Nothing quite right? We will design it with you.</h2>
          <a
            href={whatsappHref('Hi NextX! I have an idea for a website or app and would like to talk it through.')}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp"
          >
            <WhatsAppIcon />
            Message us on WhatsApp
          </a>
        </aside>
      </div>
    </div>
  )
}
