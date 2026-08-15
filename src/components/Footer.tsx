import { memo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Mail, Phone, MapPin, ExternalLink, ArrowUpRight, ShoppingBag } from 'lucide-react'
import { CONTACT, MAIL_HREF, whatsappHref } from '@/lib/contact'

// Each entry points at a section id that exists on /services.
const serviceLinks = [
  { href: '/services#graphic-design', label: 'Graphic Design' },
  { href: '/services#websites', label: 'Websites' },
  { href: '/services#e-commerce', label: 'E-Commerce' },
  { href: '/services#ux-ui', label: 'UX/UI Design' },
  { href: '/services#seo', label: 'SEO' },
  { href: '/services#hosting', label: 'Hosting' },
  { href: '/services#ux-kukru', label: 'UX Kukru' },
]

const companyLinks = [
  { href: '/about', label: 'Over ons' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/examples', label: 'Voorbeelden' },
  { href: '/contact', label: 'Contact' },
]

function FooterFn() {
  return (
    <footer className="bg-background border-t border-border relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 py-20 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-flex items-center mb-4">
              <Image
                src="/logo-light.png"
                alt="NextX Agency"
                width={140}
                height={56}
                className="h-10 w-auto object-contain"
              />
            </Link>
            <p className="meta text-primary mb-4">
              Digitaal bureau — Paramaribo
            </p>
            <p className="text-muted-foreground text-sm mb-6 max-w-xs leading-relaxed">
              Websites, webshops en merkidentiteiten voor bedrijven die helder
              willen communiceren.
            </p>
            <div className="flex gap-3">
              <a
                href={whatsappHref()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-foreground/15 hover:border-primary flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
                aria-label={`WhatsApp ${CONTACT.phoneDisplay}`}
              >
                <Phone size={16} />
              </a>
              <a
                href={MAIL_HREF}
                className="w-10 h-10 border border-foreground/15 hover:border-primary flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
                aria-label="Email"
              >
                <Mail size={16} />
              </a>
              <a
                href={CONTACT.shopUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-foreground/15 hover:border-primary flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
                aria-label="Shop NextX"
              >
                <ExternalLink size={16} />
              </a>
            </div>
          </div>

          {/* Services column */}
          <div>
            <h4 className="meta text-foreground mb-5">
              Diensten
            </h4>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company column */}
          <div>
            <h4 className="meta text-foreground mb-5">
              Bedrijf
            </h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact column */}
          <div>
            <h4 className="meta text-foreground mb-5">
              Contact
            </h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-muted-foreground text-sm">
                <Mail size={16} className="text-primary shrink-0" />
                <a
                  href={MAIL_HREF}
                  className="hover:text-primary transition-colors"
                >
                  {CONTACT.email}
                </a>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground text-sm">
                <Phone size={16} className="text-primary shrink-0" />
                <a
                  href={whatsappHref()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  {CONTACT.phoneDisplay}
                </a>
              </li>
              <li className="flex items-start gap-2 text-muted-foreground text-sm">
                <MapPin size={16} className="text-primary shrink-0 mt-0.5" />
                <span>{CONTACT.location}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Co-brand band — sister platform */}
        <a
          href={CONTACT.shopUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-foreground/15 hover:border-primary bg-card p-6 sm:p-7 transition-colors duration-300"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 border border-foreground/15 flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:border-primary group-hover:text-white transition-colors duration-300">
              <ShoppingBag size={20} />
            </div>
            <div>
              <p className="flex items-center gap-2 text-foreground font-bold text-base" style={{ fontFamily: 'var(--font-heading)' }}>
                shop-nextx.com
                <span className="meta-sm inline-flex items-center px-2 py-1.5 bg-primary text-white">
                  Eigen product
                </span>
              </p>
              <p className="text-muted-foreground text-sm mt-0.5">
                Onze eigen webshop — gebouwd met dezelfde aandacht voor detail.
              </p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 text-sm font-bold text-primary shrink-0">
            Bezoek de shop
            <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
          </span>
        </a>
      </div>

      {/* Colophon — set as a document footer rather than a legal strip */}
      <div className="border-t border-border relative z-10">
        <div className="max-w-6xl mx-auto px-6 py-7 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <p className="meta-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} NextX Agency — Alle rechten voorbehouden
          </p>
          <p className="meta-sm text-muted-foreground flex flex-wrap items-center gap-x-4 gap-y-2">
            <span>Paramaribo, SR</span>
            <span aria-hidden="true" className="text-primary">
              ✳
            </span>
            <span>{CONTACT.coordinates}</span>
            <span aria-hidden="true" className="text-primary">
              ✳
            </span>
            <span>Ontworpen en gebouwd in huis</span>
          </p>
        </div>
      </div>
    </footer>
  )
}

export const Footer = memo(FooterFn)
