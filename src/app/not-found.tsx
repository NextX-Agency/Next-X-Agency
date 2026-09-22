import type { Metadata } from 'next'
import Link from 'next/link'
import { navigation } from '@/content/site'
import { SiteHeader } from '@/components/SiteHeader'
import { SiteFooter } from '@/components/SiteFooter'
import { Arrow } from '@/components/Arrow'

export const metadata: Metadata = {
  title: 'Pagina niet gevonden',
  robots: { index: false, follow: true },
}

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main id="main" data-theme="dark" className="flex min-h-[80svh] flex-col justify-end">
        <div className="wrap grid-12 gap-y-12 pb-16 pt-[calc(var(--nav-h)+5rem)] md:pb-24">
          <div className="col-span-4 md:col-span-7">
            <p className="meta mb-6">404</p>
            <h1 className="t-h1 max-w-[12ch]">Deze pagina bestaat niet.</h1>
            <p className="t-body mt-6 max-w-[38ch]">De link is verouderd of het adres bevat een typefout.</p>
          </div>
          <nav aria-label="Verder naar" className="col-span-4 self-end md:col-span-4 md:col-start-9">
            <ul className="border-t border-line-strong">
              {[{ href: '/', label: 'Home' }, ...navigation].map((item) => (
                <li key={item.href} className="border-b border-line">
                  <Link href={item.href} className="group flex items-center justify-between py-4">
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
