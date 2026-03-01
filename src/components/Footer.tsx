import { memo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Mail, Phone, MapPin, ExternalLink } from 'lucide-react'
import { motion } from 'framer-motion'

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
    <footer className="bg-[#0a0a0a] border-t-2 border-[#FF6B00] relative overflow-hidden">
      {/* Aurora hint */}
      <div className="absolute top-0 left-0 right-0 h-40 opacity-20 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(249,112,21,0.2), transparent 70%)' }} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
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
            <p className="text-[#888888] text-sm mb-6 max-w-xs">
              Complete Digital Solutions for Modern Businesses. Lokaal in
              Paramaribo, Suriname.
            </p>
            <div className="flex gap-3">
              <a
                href="https://wa.me/5978318508"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-[#1a1a1a] hover:bg-[#FF6B00]/20 border border-[#FF6B00]/30 hover:border-[#FF6B00] flex items-center justify-center text-[#888888] hover:text-[#FF6B00] transition-all hover-lift"
                style={{ borderRadius: '2px' }}
                aria-label="WhatsApp"
              >
                <Phone size={16} className="icon-glow-hover" />
              </a>
              <a
                href="mailto:lranoesendjojo@gmail.com"
                className="w-9 h-9 bg-[#1a1a1a] hover:bg-[#FF6B00]/20 border border-[#FF6B00]/30 hover:border-[#FF6B00] flex items-center justify-center text-[#888888] hover:text-[#FF6B00] transition-all hover-lift"
                style={{ borderRadius: '2px' }}
                aria-label="Email"
              >
                <Mail size={16} className="icon-glow-hover" />
              </a>
              <a
                href="https://www.shop-nextx.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-[#1a1a1a] hover:bg-[#FF6B00]/20 border border-[#FF6B00]/30 hover:border-[#FF6B00] flex items-center justify-center text-[#888888] hover:text-[#FF6B00] transition-all hover-lift"
                style={{ borderRadius: '2px' }}
                aria-label="Website"
              >
                <ExternalLink size={16} className="icon-glow-hover" />
              </a>
            </div>
          </div>

          {/* Services column */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-[#FF6B00] mb-4">
              Diensten
            </h4>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[#888888] hover:text-white transition-colors text-sm relative group/link"
                  >
                    {link.label}
                    <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-primary group-hover/link:w-full transition-all duration-300" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company column */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-[#FF6B00] mb-4">
              Bedrijf
            </h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[#888888] hover:text-white transition-colors text-sm relative group/link"
                  >
                    {link.label}
                    <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-primary group-hover/link:w-full transition-all duration-300" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact column */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-[#FF6B00] mb-4">
              Contact
            </h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-[#888888] text-sm">
                <Mail size={16} className="text-[#FF6B00] shrink-0" />
                <a
                  href="mailto:lranoesendjojo@gmail.com"
                  className="hover:text-white transition-colors"
                >
                  lranoesendjojo@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2 text-[#888888] text-sm">
                <Phone size={16} className="text-[#FF6B00] shrink-0" />
                <a
                  href="https://wa.me/5978318508"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  +597 831-8508
                </a>
              </li>
              <li className="flex items-start gap-2 text-[#888888] text-sm">
                <MapPin size={16} className="text-[#FF6B00] shrink-0 mt-0.5" />
                <span>Paramaribo, Suriname</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#222222]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-caption text-[#888888]">
            © {new Date().getFullYear()} NextX Agency. Alle rechten voorbehouden.
          </p>
          <p className="text-caption text-[#888888]">
            Gemaakt door{' '}
<span className="gradient-text-animated font-medium">NextX</span>
          </p>
        </div>
      </div>
    </footer>
  )
}

export const Footer = memo(FooterFn)
