import type { Metadata } from 'next'
import { Suspense } from 'react'
import { mailHref, site, whatsappHref } from '@/content/site'
import { ContactForm } from '@/components/ContactForm'
import { ArrowOut } from '@/components/Arrow'
import { LocalTime } from '@/components/LocalTime'

export const metadata: Metadata = {
  title: 'Contact',
  description: `Start een project met NextX. Stuur een bericht of WhatsApp ${site.phone.display}. We reageren binnen ${site.responseTime} op werkdagen.`,
  alternates: { canonical: '/contact' },
  openGraph: { title: 'Contact — NextX Agency', url: '/contact' },
}

const next = [
  { title: 'Antwoord', text: `U krijgt binnen ${site.responseTime} op werkdagen een reactie.` },
  { title: 'Gesprek', text: 'We bespreken doel, scope en budget, via WhatsApp, telefoon of op locatie.' },
  { title: 'Voorstel', text: 'U ontvangt scope, prijs en planning voordat er iets start.' },
]

export default function ContactPage() {
  return (
    <>
      <header data-theme="dark">
        <div className="wrap grid-12 items-end gap-y-12 pb-14 pt-[calc(var(--nav-h)+4rem)] md:pb-20 md:pt-[calc(var(--nav-h)+6rem)]">
          <div className="col-span-4 md:col-span-7">
            <p className="meta mb-6 text-accent">Contact</p>
            <h1 className="t-h1 max-w-[11ch]">Vertel wat u wilt maken<span className="text-accent">.</span></h1>
            <p className="t-lead mt-7 max-w-[40ch]">Een merk, een website of software op maat. Een paar zinnen is genoeg; u krijgt binnen <span className="whitespace-nowrap">{site.responseTime}</span> antwoord op werkdagen.</p>
          </div>
          <div className="col-span-4 md:col-span-4 md:col-start-9">
            <p className="meta mb-3">Liever direct</p>
            <div className="border-t border-line-strong">
              <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between gap-4 border-b border-line py-5"><span><span className="t-h3 block">WhatsApp</span><span className="t-small">{site.phone.display}</span></span><span className="nx-arrow-box"><ArrowOut /></span></a>
              <a href={mailHref} className="group flex items-center justify-between gap-4 border-b border-line py-5"><span className="min-w-0"><span className="t-h3 block">E-mail</span><span className="t-small break-all">{site.email}</span></span><span className="nx-arrow-box"><ArrowOut /></span></a>
            </div>
            <p className="meta mt-5 leading-relaxed">{site.location.city}, {site.location.country} · nu <LocalTime /></p>
          </div>
        </div>
      </header>

      <div className="wrap grid-12 gap-y-16 py-[var(--section)]">
        <section aria-labelledby="form-title" className="col-span-4 md:col-span-7">
          <h2 id="form-title" className="t-h2 mb-10">Stuur een bericht</h2>
          <Suspense><ContactForm /></Suspense>
        </section>
        <aside aria-labelledby="next-title" className="col-span-4 md:col-span-4 md:col-start-9">
          <h2 id="next-title" className="meta mb-3">Wat er daarna gebeurt</h2>
          <ol className="border-t border-line-strong">
            {next.map((step, i) => (
              <li key={step.title} className="grid grid-cols-[2.5rem_1fr] gap-x-3 border-b border-line py-5">
                <span className="num pt-1 text-[0.72rem] text-accent-text">{String(i + 1).padStart(2, '0')}</span>
                <span><span className="t-h3 block">{step.title}</span><span className="t-small mt-1 block">{step.text}</span></span>
              </li>
            ))}
          </ol>
        </aside>
      </div>
    </>
  )
}
