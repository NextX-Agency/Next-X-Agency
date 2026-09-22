import Image from 'next/image'
import Link from 'next/link'
import { mailHref, navigation, site, whatsappHref } from '@/content/site'
import { ArrowOut } from '@/components/Arrow'

export function SiteFooter() {
  return (
    <footer data-theme="dark" className="border-t border-line">
      <div className="wrap grid-12 gap-y-12 pb-10 pt-16 md:pt-20">
        <div className="col-span-4 md:col-span-4">
          <Link href="/" className="inline-block" aria-label="NextX, naar de homepage">
            <Image src="/logo-dark.png" alt="" width={950} height={380} className="h-10 w-auto" />
          </Link>
        </div>

        <nav aria-label="Footer" className="col-span-4 md:col-span-2 md:col-start-7">
          <p className="meta mb-4">Pagina’s</p>
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

        <div className="col-span-4 md:col-span-4">
          <p className="meta mb-4">Contact</p>
          <ul className="grid gap-2">
            <li>
              <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" className="link-line">
                {site.phone.display}
              </a>
            </li>
            <li>
              <a href={mailHref} className="link-line">
                {site.email}
              </a>
            </li>
            <li className="text-fg-2">
              {site.location.city}, {site.location.country}
            </li>
          </ul>
        </div>

        <div className="col-span-4 flex flex-col gap-4 border-t border-line pt-6 md:col-span-12 md:flex-row md:items-center md:justify-between">
          <p className="meta">© {new Date().getFullYear()} {site.name}</p>
          <a
            href={site.sisterSite.href}
            target="_blank"
            rel="noopener noreferrer"
            className="meta link-arrow font-medium hover:text-fg"
          >
            Ook van ons: {site.sisterSite.label}
            <ArrowOut />
          </a>
        </div>
      </div>
    </footer>
  )
}
