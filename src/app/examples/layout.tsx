import type { Metadata } from 'next'
import Link from 'next/link'
import { Toaster } from 'sonner'

export const metadata: Metadata = {
  title: 'Voorbeelden',
  description:
    'Interactieve demo voorbeelden van alle NextX Agency diensten — websites, webshops, logo design, UX/UI, SEO dashboards, hosting panels en meer.',
  openGraph: {
    title: 'Voorbeelden — NextX Agency',
    description:
      'Bekijk interactieve demo\'s van onze diensten. Websites, webshops, branding en meer.',
    url: '/examples',
  },
  alternates: {
    canonical: '/examples',
  },
}

export default function ExamplesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Toaster position="bottom-right" richColors closeButton />
      <div className="sticky top-0 z-50 flex items-center justify-between border-b border-border bg-background/95 px-4 py-3 backdrop-blur-md sm:px-6">
        <Link
          href="/examples"
          className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0">
            <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Alle voorbeelden
        </Link>
        <span className="text-xs font-bold tracking-[0.18em] uppercase text-muted-foreground">
          Interactief prototype
        </span>
      </div>
      {children}
    </>
  )
}
