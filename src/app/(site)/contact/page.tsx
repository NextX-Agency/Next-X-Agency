import type { Metadata } from 'next'
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
    <div className="wrap pb-[var(--section)] pt-[calc(var(--nav-h)+4rem)] md:pt-[calc(var(--nav-h)+7rem)]">
      <header className="max-w-[44rem]">
        <h1 className="t-display">Start een project.</h1>
        <p className="t-lead mt-8 max-w-[36ch]">
          Vertel kort wat u nodig hebt. U krijgt binnen <span className="whitespace-nowrap">{site.responseTime}</span> antwoord.
        </p>
      </header>

      <div className="grid-12 mt-16 gap-y-16 md:mt-24">
        <section aria-label="Contactformulier" className="col-span-4 md:col-span-7">
          <Suspense>
            <ContactForm />
          </Suspense>
        </section>

        <aside aria-label="Direct contact" className="col-span-4 md:col-span-4 md:col-start-9">
          <div className="border-t border-line-strong pt-6">
            <p className="meta mb-3">Liever direct</p>
            <a
              href={whatsappHref()}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between gap-4 border-b border-line py-5"
            >
              <span>
                <span className="t-h3 block">WhatsApp</span>
                <span className="t-small">{site.phone.display}</span>
              </span>
              <ArrowOut className="size-4" />
            </a>
            <a href={mailHref} className="group flex items-center justify-between gap-4 border-b border-line py-5">
              <span className="min-w-0">
                <span className="t-h3 block">E-mail</span>
                <span className="t-small break-all">{site.email}</span>
              </span>
              <ArrowOut className="size-4" />
            </a>
            <p className="meta mt-6 leading-relaxed">
              {site.location.city}, {site.location.country}
              <br />
              Nu <LocalTime />
            </p>
          </div>
        </aside>
      </div>
    </div>
  )
}
