import type { Metadata } from 'next'
import { Suspense } from 'react'
import { mailHref, site, whatsappHref } from '@/content/site'
import { ContactForm } from '@/components/ContactForm'
import { ArrowOut } from '@/components/Arrow'

export const metadata: Metadata = {
  title: 'Contact',
  description: `Start a project with NextX. Send a message or WhatsApp ${site.phone.display}. We reply within ${site.responseTime} on working days.`,
  alternates: { canonical: '/contact' },
  openGraph: { title: 'Contact — NextX Agency', url: '/contact' },
}

export default function ContactPage() {
  return (
    <>
      <header data-theme="dark">
        <div className="wrap pb-12 pt-[calc(var(--nav-h)+4rem)] md:pb-16 md:pt-[calc(var(--nav-h)+6rem)]">
          <h1 className="t-display max-w-[10ch]">Tell us what you want to make<span className="text-accent">.</span></h1>
          <div className="mt-12 grid gap-3 md:mt-16 md:grid-cols-2">
            <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" className="nx-action" style={{ '--card': 'var(--orange)', '--card-fg': 'var(--ink)' } as React.CSSProperties}>
              <span><strong>WhatsApp</strong><span className="mt-2 block font-medium">{site.phone.display}</span></span>
              <ArrowOut className="mb-2 size-5" />
            </a>
            <a href={mailHref} className="nx-action" style={{ '--card': 'var(--paper)', '--card-fg': 'var(--ink)' } as React.CSSProperties}>
              <span className="min-w-0"><strong>Email</strong><span className="mt-2 block break-all font-medium">{site.email}</span></span>
              <ArrowOut className="mb-2 size-5" />
            </a>
          </div>
        </div>
      </header>

      <section aria-labelledby="form-title" className="wrap grid-12 gap-y-10 py-[var(--section)]">
        <div className="col-span-4 md:col-span-4">
          <h2 id="form-title" className="t-h1">Or send a message<span className="text-accent">.</span></h2>
          <p className="t-lead mt-6 max-w-[24ch]">A reply within {site.responseTime}, on working days.</p>
        </div>
        <div className="col-span-4 md:col-span-7 md:col-start-6">
          <Suspense><ContactForm /></Suspense>
        </div>
      </section>
    </>
  )
}
