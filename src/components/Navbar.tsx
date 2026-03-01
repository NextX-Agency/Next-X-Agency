'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { fadeInDown, scaleIn, navItemVariant, staggerContainerFast } from '@/lib/animationUtils'
import { MagneticButton } from '@/components/animated/MagneticButton'

const navLinks = [
  { href: '/services', label: 'Services' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/about', label: 'Over' },
  { href: '/contact', label: 'Contact' },
] as const

function NavbarFn() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  return (
    <nav className="sticky top-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-md border-b border-[#FF6B00]/20 relative">
      {/* Subtle bottom glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-primary/40 to-transparent pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo — page-load entrance */}
          <motion.div
            variants={fadeInDown}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5, delay: 0.05 }}
          >
            <Link href="/" className="flex items-center">
              <Image
                src="/logo-dark.png"
                alt="NextX Agency"
                width={140}
                height={56}
                className="h-10 w-auto object-contain"
                priority
              />
            </Link>
          </motion.div>

          {/* Desktop Nav Links — staggered entrance */}
          <motion.div
            variants={staggerContainerFast}
            initial="hidden"
            animate="visible"
            className="hidden lg:flex items-center gap-8"
          >
            {navLinks.map((link) => (
              <motion.div key={link.href} variants={navItemVariant}>
                <Link
                  href={link.href}
                  className={cn(
                    'text-xs font-semibold uppercase tracking-[0.15em] transition-colors relative group',
                    pathname === link.href
                      ? 'text-[#FF6B00]'
                      : 'text-white hover:text-[#FF6B00]'
                  )}
                >
                  {link.label}
                  {/* Animated underline on active */}
                  {pathname === link.href && (
                    <motion.span
                      className="absolute -bottom-1 left-0 h-[2px] bg-[#FF6B00] w-full" style={{ boxShadow: '0 0 8px rgba(249,112,21,0.8)' }}
                      layoutId="nav-active-pill"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* Desktop CTA */}
          <motion.div
            variants={scaleIn}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.45, delay: 0.35 }}
            className="hidden lg:flex items-center gap-4"
          >
            <MagneticButton strength={0.35}>
              <Link
                href="/contact"
                data-cursor-hover
                className="btn-shimmer text-white text-xs font-bold uppercase tracking-[0.12em] px-5 py-2.5 transition-all duration-200 inline-block"
                style={{ borderRadius: '2px' }}
              >
                Aanvraag sturen
              </Link>
            </MagneticButton>
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.button
            className="lg:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Sluit menu' : 'Open menu'}
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileOpen ? (
                <motion.span
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={24} />
                </motion.span>
              ) : (
                <motion.span
                  key="open"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={24} />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu — slide in/out */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="lg:hidden border-t border-[#FF6B00]/20 bg-[#0a0a0a] overflow-hidden"
          >
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } } }}
              className="max-w-7xl mx-auto px-4 py-4 space-y-1"
            >
              {navLinks.map((link) => (
                <motion.div
                  key={link.href}
                  variants={{
                    hidden: { opacity: 0, x: -12 },
                    visible: { opacity: 1, x: 0, transition: { duration: 0.25 } }
                  }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      'block px-4 py-3 text-xs font-semibold uppercase tracking-[0.15em] transition-colors',
                      pathname === link.href
                        ? 'text-[#FF6B00] bg-[#FF6B00]/10'
                        : 'text-white hover:text-[#FF6B00] hover:bg-[#111111]'
                    )}
                    style={{ borderRadius: '2px' }}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 8 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.3, delay: 0.1 } }
                }}
                className="pt-3"
              >
                <Link
                  href="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="block w-full text-center bg-[#FF6B00] hover:bg-[#e86200] text-white font-bold uppercase tracking-[0.12em] px-5 py-3 text-xs transition-colors duration-150"
                  style={{ borderRadius: '2px' }}
                >
                  Aanvraag sturen
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

export { NavbarFn as Navbar }
