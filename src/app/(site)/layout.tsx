import { MotionConfig } from 'framer-motion'
import { SiteHeader } from '@/components/SiteHeader'
import { SiteFooter } from '@/components/SiteFooter'

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <SiteHeader />
      <main id="main">{children}</main>
      <SiteFooter />
    </MotionConfig>
  )
}
