import Image from 'next/image'
import Link from 'next/link'
import { Arrow, ArrowOut } from '@/components/Arrow'
import { mailHref, navigation, site, whatsappHref } from '@/content/site'

export function SiteFooter() {
  return (
    <footer data-theme="dark" className="site-footer">
      <div className="wrap">
        <section className="footer-inquiry" aria-labelledby="footer-cta-title">
          <h2 id="footer-cta-title">
            Uw volgende stap
            <br />
            <span className="text-accent">begint hier.</span>
          </h2>
          <div>
            <p className="t-lead max-w-[29ch]">
              Een concreet plan of een eerste idee. Vertel ons waar u aan denkt.
            </p>
            <a href={mailHref} className="footer-direct link-line">{site.email}</a>
            <Link href="/contact" className="btn btn-primary mt-7">
              Bespreek uw project <Arrow />
            </Link>
          </div>
        </section>
        <div className="footer-details">
          <Link
            href="/"
            className="footer-logo"
            aria-label="NextX Agency, naar de homepage"
          >
            <Image
              src="/logo-agency-white.svg"
              alt=""
              width={1200}
              height={519}
              loading="eager"
              sizes="180px"
            />
          </Link>
          <div>
            <a href={mailHref} className="link-line">
              {site.email}
            </a>
            <br />
            <a
              href={whatsappHref()}
              target="_blank"
              rel="noopener noreferrer"
              className="link-arrow mt-2"
            >
              WhatsApp {site.phone.display} <ArrowOut />
            </a>
            <p className="t-small mt-3">
              {site.location.city}, {site.location.country}
            </p>
          </div>
          <nav aria-label="Footer">
            {navigation.map((item) => (
              <Link key={item.href} href={item.href} className="link-line">
                {item.label}
              </Link>
            ))}
            <Link href="/examples" className="link-line">
              Voorbeelden
            </Link>
          </nav>
        </div>
        <div className="footer-bottom">
          <p className="meta">
            © {new Date().getFullYear()} {site.name}
          </p>
          <a
            href={site.sisterSite.href}
            target="_blank"
            rel="noopener noreferrer"
            className="meta link-line"
          >
            Eigen product: Shop NextX ↗
          </a>
        </div>
      </div>
    </footer>
  )
}
