import { memo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Mail, Phone, MapPin, ExternalLink, ArrowUpRight, ShoppingBag } from 'lucide-react'

const serviceLinks = [
  { href: '/services#graphic-design', label: 'Graphic Design' },
  { href: '/services#websites', label: 'Websites' },
  { href: '/services#e-commerce', label: 'E-Commerce' },
  { href: '/services#ux-ui', label: 'UX/UI Design' },
  { href: '/services#seo', label: 'SEO' },
  { href: '/services#hosting', label: 'Hosting' },
]

const companyLinks = [
  { href: '/about', label: 'Over Ons' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/contact', label: 'Contact' },
]

function FooterFn() {
  return (
    <footer className="bg-background border-t border-white/[0.07] relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 py-20 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-flex items-center mb-4">
              <Image
                src="/logo-dark.png"
                alt="NextX Agency"
                width={140}
                height={56}
                className="h-10 w-auto object-contain"
              />
            </Link>
            <p
              className="text-primary text-xs font-black tracking-[0.18em] uppercase mb-3"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Wij bouwen. Jij groeit.
            </p>
            <p className="text-neutral-400 text-sm mb-6 max-w-xs leading-relaxed">
              Complete Digital Solutions for Modern Businesses. Lokaal in
              Paramaribo, Suriname.
            </p>
            <div className="flex gap-3">
              <a
                href="https://wa.me/5978318508"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/5 hover:bg-primary/15 border border-white/10 hover:border-primary/40 flex items-center justify-center text-neutral-400 hover:text-primary transition-all rounded-xl"
                aria-label="WhatsApp"
              >
                <Phone size={16} />
              </a>
              <a
                href="mailto:agencynextx@gmail.com"
                className="w-10 h-10 bg-white/5 hover:bg-primary/15 border border-white/10 hover:border-primary/40 flex items-center justify-center text-neutral-400 hover:text-primary transition-all rounded-xl"
                aria-label="Email"
              >
                <Mail size={16} />
              </a>
              <a
                href="https://www.shop-nextx.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/5 hover:bg-primary/15 border border-white/10 hover:border-primary/40 flex items-center justify-center text-neutral-400 hover:text-primary transition-all rounded-xl"
                aria-label="Shop NextX"
              >
                <ExternalLink size={16} />
              </a>
            </div>
          </div>

          {/* Services column */}
          <div>
            <h4 className="text-xs uppercase tracking-widest font-bold text-white mb-4">
              Diensten
            </h4>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-neutral-400 hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company column */}
          <div>
            <h4 className="text-xs uppercase tracking-widest font-bold text-white mb-4">
              Bedrijf
            </h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-neutral-400 hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact column */}
          <div>
            <h4 className="text-xs uppercase tracking-widest font-bold text-white mb-4">
              Contact
            </h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-neutral-400 text-sm">
                <Mail size={16} className="text-primary shrink-0" />
                <a
                  href="mailto:agencynextx@gmail.com"
                  className="hover:text-primary transition-colors"
                >
                  agencynextx@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2 text-neutral-400 text-sm">
                <Phone size={16} className="text-primary shrink-0" />
                <a
                  href="https://wa.me/5978318508"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  +597 831-8508
                </a>
              </li>
              <li className="flex items-start gap-2 text-neutral-400 text-sm">
                <MapPin size={16} className="text-primary shrink-0 mt-0.5" />
                <span>Paramaribo, Suriname</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Co-brand band — sister platform */}
        <a
          href="https://www.shop-nextx.com"
          target="_blank"
          rel="noopener noreferrer"
          className="card-glow group mt-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl border border-white/[0.07] bg-card p-6 sm:p-7"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/25 flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-white transition-all duration-300">
              <ShoppingBag size={20} />
            </div>
            <div>
              <p className="flex items-center gap-2 text-white font-bold text-base" style={{ fontFamily: 'var(--font-heading)' }}>
                shop-nextx.com
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/10 border border-primary/25 text-primary text-[9px] font-bold tracking-widest uppercase">
                  Sister Platform
                </span>
              </p>
              <p className="text-neutral-400 text-sm mt-0.5">
                Onze eigen webshop — gebouwd met dezelfde technologie die wij voor u inzetten.
              </p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 text-sm font-bold text-primary shrink-0">
            Bezoek de shop
            <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
          </span>
        </a>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5 relative z-10">
        <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-neutral-500">
            &copy; {new Date().getFullYear()} NextX Agency. Alle rechten voorbehouden.
          </p>
          <p className="text-sm text-neutral-500">
            Gemaakt door{' '}
            <span className="text-primary font-medium">NextX</span>
          </p>
        </div>
      </div>
    </footer>
  )
}

export const Footer = memo(FooterFn)
