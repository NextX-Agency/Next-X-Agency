import Image from 'next/image'
import Link from 'next/link'
import { Arrow, ArrowOut } from '@/components/Arrow'
import { mailHref, navigation, site, whatsappHref } from '@/content/site'
import { specialties } from '@/content/disciplines'

export function SiteFooter() {
  return (
    <footer data-theme="dark">
      <div className="wrap">
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

        <div className="grid-12 gap-y-12 py-12 md:py-16">
          <div className="col-span-4 md:col-span-4">
            <Link href="/" className="inline-block" aria-label="NextX, naar de homepage">
              <Image src="/logo-agency-white-v2.svg" alt="" width={620} height={260} className="h-auto w-[11rem]" />
            </Link>
            <p className="t-small mt-5 max-w-[30ch]">Design, websites en software uit {site.location.city}.</p>
          </div>

          <nav aria-label="Footer" className="col-span-2 md:col-span-2 md:col-start-6">
            <p className="mb-5 text-[0.8125rem] font-semibold text-fg-3">Pagina’s</p>
            <ul className="grid gap-2">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="link-line">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Diensten" className="col-span-2 md:col-span-2">
            <p className="mb-5 text-[0.8125rem] font-semibold text-fg-3">Diensten</p>
            <ul className="grid gap-2">
              {specialties.map((specialty) => (
                <li key={specialty.id}>
                  <Link href={`/services#${specialty.id}`} className="link-line">
                    {specialty.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/services#website-subscriptions" className="link-line">Website-abonnementen</Link>
              </li>
            </ul>
          </nav>

          <div className="col-span-4 md:col-span-3 md:col-start-10">
            <p className="mb-5 text-[0.8125rem] font-semibold text-fg-3">Contact</p>
            <ul className="grid gap-3">
              <li>
                <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" className="link-arrow link-line">
                  WhatsApp {site.phone.display}
                  <ArrowOut />
                </a>
              </li>
              <li>
                <a href={mailHref} className="link-arrow link-line break-all">
                  {site.email}
                  <ArrowOut />
                </a>
              </li>
              <li>
                <a href={site.sisterSite.href} target="_blank" rel="noopener noreferrer" className="link-arrow link-line">
                  {site.sisterSite.label}
                  <ArrowOut />
                </a>
              </li>
              <li className="t-small pt-2">{site.location.city}, {site.location.country}</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-3 py-6 md:flex-row md:items-center md:justify-between">
          <p className="meta">© {new Date().getFullYear()} {site.name}</p>
          <p className="meta">{site.location.coordinates}</p>
        </div>
      </div>
    </footer>
  )
}
