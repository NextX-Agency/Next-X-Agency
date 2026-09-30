'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { navigation } from '@/content/site'
import { ArrowOut } from './Arrow'

export function SiteHeader() {
  const pathname = usePathname()
  const [openOn, setOpenOn] = useState<string | null>(null)
  const open = openOn === pathname
  const button = useRef<HTMLButtonElement>(null)
  const header = useRef<HTMLElement>(null)
  useEffect(() => {
    if (!open) return
    const escape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenOn(null)
        button.current?.focus()
      }
    }
    const outside = (e: PointerEvent) => {
      if (!header.current?.contains(e.target as Node)) setOpenOn(null)
    }
    document.addEventListener('keydown', escape)
    document.addEventListener('pointerdown', outside)
    return () => {
      document.removeEventListener('keydown', escape)
      document.removeEventListener('pointerdown', outside)
    }
  }, [open])
  const active = (href: string) =>
    pathname === href || pathname.startsWith(href + '/')
  return (
    <header className="site-header" ref={header}>
      <div className="wrap header-inner">
        <Link
          href="/"
          className="header-logo"
          aria-label="NextX Agency, naar de homepage"
        >
          <Image
            src="/logo-agency-black.svg"
            alt=""
            width={1200}
            height={519}
            priority
            sizes="94px"
          />
        </Link>
        <nav aria-label="Hoofdmenu" className="desktop-nav">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active(item.href) ? 'page' : undefined}
              className="link-line"
            >
              {item.label}
              {item.href === '/contact' && <ArrowOut />}
            </Link>
          ))}
        </nav>
        <button
          ref={button}
          className="menu-button"
          type="button"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpenOn(open ? null : pathname)}
        >
          {open ? 'Sluiten −' : 'Menu +'}
        </button>
      </div>
      {open && (
        <nav
          id="mobile-menu"
          aria-label="Mobiel menu"
          className="mobile-nav"
          onBlur={(e) => {
            if (!header.current?.contains(e.relatedTarget as Node))
              setOpenOn(null)
          }}
        >
          <Link href="/" onClick={() => setOpenOn(null)}>
            Home
          </Link>
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active(item.href) ? 'page' : undefined}
              onClick={() => setOpenOn(null)}
            >
              {item.label}
              <ArrowOut />
            </Link>
          ))}
          <p className="meta">NextX Agency · Paramaribo</p>
        </nav>
      )}
    </header>
  )
}
