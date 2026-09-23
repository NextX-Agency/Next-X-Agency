'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { mailHref, navigation, site, whatsappHref } from '@/content/site'
import { cn } from '@/lib/utils'

type Theme = 'light' | 'dark'

/**
 * Reads the theme of whatever section sits under the bar, so the header
 * inverts over dark sections without each page having to configure it.
 */
function useThemeBelow(ref: React.RefObject<HTMLElement | null>) {
  const [theme, setTheme] = useState<Theme>('light')
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    let frame = 0
    const read = () => {
      frame = 0
      const bar = ref.current
      if (!bar) return
      const y = bar.offsetHeight + 1
      const hit = document
        .elementsFromPoint(window.innerWidth / 2, y)
        .find((el) => !bar.contains(el))
      const section = hit?.closest<HTMLElement>('[data-theme]')
      setTheme(section?.dataset.theme === 'dark' ? 'dark' : 'light')
      setScrolled(window.scrollY > 8)
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(read)
    }
    schedule()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      cancelAnimationFrame(frame)
    }
  }, [ref, pathname])

  return { theme, scrolled }
}

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`)
}

export function SiteHeader() {
  const barRef = useRef<HTMLDivElement>(null)
  const menuButton = useRef<HTMLButtonElement>(null)
  const pathname = usePathname()
  const reduced = useReducedMotion()
  // The menu belongs to the page it was opened on, so navigating closes it.
  const [openOn, setOpenOn] = useState<string | null>(null)
  const open = openOn === pathname
  const setOpen = useCallback(
    (next: boolean) => setOpenOn(next ? pathname : null),
    [pathname]
  )
  const { theme, scrolled } = useThemeBelow(barRef)
  const shownTheme: Theme = open ? 'dark' : theme

  const close = useCallback(() => {
    setOpen(false)
    menuButton.current?.focus()
  }, [setOpen])

  // Escape closes; page scroll is locked while the menu is open.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close()
    document.addEventListener('keydown', onKey)
    const overflow = document.documentElement.style.overflow
    document.documentElement.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.documentElement.style.overflow = overflow
    }
  }, [open, close])

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        ref={barRef}
        data-theme={shownTheme}
        className={cn(
          'relative z-20 transition-[background-color,border-color] duration-300',
          'border-b',
          scrolled && !open ? 'border-line' : 'border-transparent',
          scrolled || open ? '' : '!bg-transparent'
        )}
      >
        <div className="wrap flex h-[var(--nav-h)] items-center justify-between">
          <Link
            href="/"
            className="relative block aspect-[1200/519] w-[70px] shrink-0 overflow-hidden rounded-[2px] bg-accent p-[2px]"
            aria-label="NextX Agency, naar de homepage"
          >
            <Image src="/logo-agency-white.png" alt="" fill priority sizes="70px" className="object-contain" />
          </Link>

          <nav aria-label="Hoofdmenu" className="hidden md:block">
            <ul className="flex items-center gap-9">
              {navigation.map((item) => {
                const active = isActive(pathname, item.href)
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? 'page' : undefined}
                      className="link-line relative py-1 text-[0.9375rem] font-medium"
                    >
                      {active && (
                        <span className="absolute -left-3 top-1/2 size-1.5 -translate-y-1/2 bg-accent" aria-hidden="true" />
                      )}
                      {item.label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          <button
            ref={menuButton}
            type="button"
            className="meta -mr-2 flex h-11 items-center gap-2 px-2 text-fg md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(!open)}
          >
            {open ? 'Sluiten' : 'Menu'}
            <span className="relative block h-2.5 w-4" aria-hidden="true">
              <span className={cn('absolute left-0 h-px w-4 bg-current transition-transform duration-300', open ? 'top-1 rotate-45' : 'top-0')} />
              <span className={cn('absolute left-0 h-px w-4 bg-current transition-transform duration-300', open ? 'top-1 -rotate-45' : 'top-2')} />
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            data-theme="dark"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-0 z-10 flex flex-col pt-[var(--nav-h)] md:hidden"
            initial={reduced ? false : { clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={reduced ? { opacity: 0 } : { clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.45, ease: [0.2, 0.7, 0.1, 1] }}
          >
            <nav aria-label="Mobiel menu" className="wrap flex-1 overflow-y-auto pt-10">
              <ul>
                {[{ href: '/', label: 'Home' }, ...navigation].map((item, i) => (
                  <li key={item.href} className="border-b border-line">
                    <Link
                      href={item.href}
                      aria-current={pathname === item.href ? 'page' : undefined}
                      className="flex items-baseline justify-between py-4"
                      onClick={() => setOpen(false)}
                    >
                      <span className="t-h2">{item.label}</span>
                      <span className="meta">{String(i).padStart(2, '0')}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="wrap grid gap-1 pb-8 pt-6">
              <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" className="t-small text-fg">
                WhatsApp {site.phone.display}
              </a>
              <a href={mailHref} className="t-small text-fg">
                {site.email}
              </a>
              <p className="meta mt-3">
                {site.location.city}, {site.location.countryCode}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
