import type { Metadata } from 'next'
import Image from 'next/image'
import { Suspense } from 'react'
import { mailHref, site, whatsappHref } from '@/content/site'
import { ContactForm } from '@/components/ContactForm'
import { ArrowOut } from '@/components/Arrow'
import { LocalTime } from '@/components/LocalTime'

export const metadata: Metadata = {
  title: 'Contact',
  description: `Start een project met NextX. Stuur een bericht of WhatsApp ${site.phone.display}. We reageren binnen ${site.responseTime}.`,
  alternates: { canonical: '/contact' },
  openGraph: { title: 'Contact — NextX Agency', url: '/contact' },
}

export default function ContactPage() {
  return (
    <>
      <header data-theme="dark" className="overflow-hidden">
        <div className="wrap grid-12 items-center gap-y-10 pb-16 pt-[calc(var(--nav-h)+4rem)] md:min-h-[39rem] md:pb-20 md:pt-[calc(var(--nav-h)+6rem)]">
          <div className="col-span-4 md:col-span-7">
            <p className="meta mb-6 text-accent">Vertel ons wat u voor ogen hebt</p>
            <h1 className="t-h1 max-w-[11ch]">Laten we iets sterks maken.</h1>
            <p className="t-lead mt-8 max-w-[38ch]">Een nieuwe website, fotografie, een merk of een campagne? Vertel kort wat u nodig hebt. U krijgt binnen <span className="whitespace-nowrap">{site.responseTime}</span> antwoord op werkdagen.</p>
          </div>
          <div className="col-span-4 md:col-span-5 md:col-start-8">
            <div className="relative aspect-[16/10] overflow-hidden border-[8px] border-paper/90 md:rotate-[5deg]"><Image src="/demo-previews/starter-webshop.webp" alt="Bloom Boutique, een webshopconcept voor een fictief merk" fill priority sizes="(min-width: 768px) 38vw, 100vw" className="object-cover object-top" /></div>
            <p className="meta mt-5 text-right">Werkende conceptdemo · fictief merk</p>
          </div>
        </div>
      </header>

      <div className="wrap grid-12 gap-y-16 py-[var(--section)]">
        <section aria-label="Contactformulier" className="col-span-4 md:col-span-7">
          <h2 className="t-h2 mb-10">Vertel ons het plan.</h2>
          <Suspense><ContactForm /></Suspense>
        </section>
        <aside aria-label="Direct contact" className="col-span-4 md:col-span-4 md:col-start-9">
          <div className="border-t border-line-strong pt-6">
            <p className="meta mb-3">Liever direct</p>
            <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between gap-4 border-b border-line py-5"><span><span className="t-h3 block">WhatsApp</span><span className="t-small">{site.phone.display}</span></span><ArrowOut className="size-4" /></a>
            <a href={mailHref} className="group flex items-center justify-between gap-4 border-b border-line py-5"><span className="min-w-0"><span className="t-h3 block">E-mail</span><span className="t-small break-all">{site.email}</span></span><ArrowOut className="size-4" /></a>
            <p className="meta mt-6 leading-relaxed">{site.location.city}, {site.location.country}<br />Nu <LocalTime /></p>
          </div>
        </aside>
      </div>
    </>
  )
}
