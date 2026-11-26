import type { Metadata } from 'next'
import Link from 'next/link'
import { navigation } from '@/content/site'
import { SiteHeader } from '@/components/SiteHeader'
import { SiteFooter } from '@/components/SiteFooter'
import { Arrow } from '@/components/Arrow'

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false, follow: true },
}

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main id="main" data-theme="dark" className="flex min-h-[80svh] flex-col justify-end">
        <div className="wrap grid-12 gap-y-12 pb-16 pt-[calc(var(--nav-h)+5rem)] md:pb-24">
          <div className="col-span-4 md:col-span-7">
            <h1 className="t-display max-w-[10ch]">This page does not exist<span className="text-accent">.</span></h1>
            <p className="t-body mt-6 max-w-[38ch]">The link is out of date or the address has a typo.</p>
          </div>
          <nav aria-label="Go to" className="col-span-4 self-end md:col-span-4 md:col-start-9">
            <ul>
              {[{ href: '/', label: 'Home' }, ...navigation].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="group flex items-center justify-between py-2.5">
                    <span className="t-h3">{item.label}</span>
                    <Arrow />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
