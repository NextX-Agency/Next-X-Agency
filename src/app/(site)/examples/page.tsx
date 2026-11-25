import type { Metadata } from 'next'
import Link from 'next/link'
import { examples } from '@/content/examples'
import { whatsappHref } from '@/content/site'
import { Arrow } from '@/components/Arrow'
import { ConceptBrowser } from '@/components/concepts/ConceptBrowser'
import { WhatsAppIcon } from '@/components/concepts/WantThis'

export const metadata: Metadata = {
  title: 'Conceptlab',
  description:
    'Verken interactieve conceptdemo’s van NextX Agency per categorie: e-commerce, websites, SaaS-dashboards en branding. Alle merken zijn fictief.',
  alternates: { canonical: '/examples' },
  openGraph: { title: 'Conceptlab — NextX Agency', url: '/examples' },
}

export default function ExamplesPage() {
  return (
    <div data-theme="dark" className="min-h-screen pb-[var(--section)]">
      <header className="wrap pb-14 pt-[calc(var(--nav-h)+4rem)] md:pb-20 md:pt-[calc(var(--nav-h)+7rem)]">
        <h1 className="t-display">Conceptlab<span className="text-accent">.</span></h1>
        <div className="mt-8 flex flex-wrap items-end justify-between gap-6">
          <p className="t-lead max-w-[34ch] text-fg">
            Werkende demo’s voor verzonnen merken, per categorie. Zie je iets dat past? Tik op <b className="font-semibold">Ik wil dit</b> en stuur het via WhatsApp.
          </p>
          <Link href="/portfolio" className="btn btn-quiet">Naar het echte werk <Arrow /></Link>
        </div>
      </header>

      <div className="wrap">
        <ConceptBrowser items={examples} priorityFirst />

        <aside className="nx-cta-card mt-20 md:mt-28" aria-labelledby="custom-title">
          <h2 id="custom-title" className="t-h2 max-w-[18ch]">Niets dat precies past? We ontwerpen het met je.</h2>
          <a
            href={whatsappHref('Hoi NextX! Ik heb een idee voor een website of app en wil graag sparren.')}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp"
          >
            <WhatsAppIcon />
            Stuur je idee via WhatsApp
          </a>
        </aside>
      </div>
    </div>
  )
}
