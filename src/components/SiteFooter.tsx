import Image from 'next/image'
import Link from 'next/link'
import { ArrowOut } from '@/components/Arrow'
import { FooterCta } from '@/components/FooterCta'
import { mailHref, navigation, site, whatsappHref } from '@/content/site'
import { specialties } from '@/content/disciplines'

export function SiteFooter() {
  return (
    <footer data-theme="dark">
      <div className="wrap">
        <FooterCta />

        <div className="grid-12 gap-y-12 pb-12 pt-16 md:pb-16 md:pt-24">
          <div className="col-span-4 md:col-span-12 lg:col-span-4">
            <Link href="/" className="inline-block" aria-label="NextX, naar de homepage">
              <Image src="/logo-agency-white-v2.svg" alt="" width={620} height={260} className="h-auto w-[11rem]" />
            </Link>
            <p className="t-small mt-5 max-w-[30ch]">Design, websites en software uit {site.location.city}.</p>
          </div>

          <nav aria-label="Footer" className="col-span-2 md:col-span-3 lg:col-span-2 lg:col-start-6">
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

          <nav aria-label="Diensten" className="col-span-2 md:col-span-4 lg:col-span-2">
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

          <div className="col-span-4 md:col-span-5 lg:col-span-3 lg:col-start-10">
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
