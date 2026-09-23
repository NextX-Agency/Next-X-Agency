import Image from 'next/image'
import Link from 'next/link'
import { Arrow, ArrowOut } from '@/components/Arrow'
import { mailHref, navigation, site, whatsappHref } from '@/content/site'

export function SiteFooter() {
  return (
    <footer data-theme="dark" className="border-t border-line">
      <div className="wrap">
        <section className="grid-12 gap-y-10 border-b border-line py-16 md:py-24" aria-labelledby="footer-cta-title">
          <div className="col-span-4 md:col-span-7">
            <p className="meta mb-5">Een volgende stap</p>
            <h2 id="footer-cta-title" className="t-h2 max-w-[10ch]">
              Heeft u een idee?
            </h2>
          </div>
          <div className="col-span-4 flex flex-col items-start justify-end gap-5 md:col-span-4 md:col-start-9">
            <Link href="/contact" className="btn btn-primary">
              Start een project
              <Arrow />
            </Link>
            <p className="t-small max-w-[30ch]">Vertel kort wat u wilt maken. We pakken het direct op.</p>
          </div>
        </section>

        <div className="border-b border-line py-12 md:py-16">
          <Link href="/" className="group inline-block" aria-label="NextX, naar de homepage">
            <Image
              src="/logo-agency-white.png"
              alt=""
              width={1200}
              height={519}
              className="h-auto w-[min(60vw,24rem)] transition-transform duration-500 ease-[var(--ease)] group-hover:translate-x-2"
            />
          </Link>
        </div>

        <div className="grid-12 gap-y-12 py-12 md:py-16">
          <nav aria-label="Footer" className="col-span-4 md:col-span-3">
            <p className="meta mb-5">Pagina’s</p>
            <ul className="grid gap-2">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="link-line">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/examples" className="link-line">
                  Voorbeelden
                </Link>
              </li>
            </ul>
          </nav>

          <div className="col-span-4 md:col-span-4 md:col-start-6">
            <p className="meta mb-5">Contact</p>
            <ul className="grid gap-3">
              <li>
                <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" className="link-arrow link-line">
                  WhatsApp
                  <ArrowOut />
                </a>
              </li>
              <li>
                <a href={mailHref} className="link-arrow link-line">
                  {site.email}
                  <ArrowOut />
                </a>
              </li>
              <li className="t-small pt-2">{site.location.city}, {site.location.country}</li>
            </ul>
          </div>

          <div className="col-span-4 md:col-span-3 md:col-start-10">
            <p className="meta mb-5">Eigen product</p>
            <a
              href={site.sisterSite.href}
              target="_blank"
              rel="noopener noreferrer"
              className="link-arrow link-line"
            >
              {site.sisterSite.label}
              <ArrowOut />
            </a>
            <p className="t-small mt-3 max-w-[24ch]">Onze eigen webshop voor audio en horloges.</p>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-line py-6 md:flex-row md:items-center md:justify-between">
          <p className="meta">© {new Date().getFullYear()} {site.name}</p>
          <p className="meta">{site.location.coordinates}</p>
        </div>
      </div>
    </footer>
  )
}
