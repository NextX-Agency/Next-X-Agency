import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { HeroSection } from '@/components/sections/HeroSection'
import { ServicesSection } from '@/components/sections/ServicesSection'
import { PortfolioSection } from '@/components/sections/PortfolioSection'
import { ProcessSection } from '@/components/sections/ProcessSection'
import { WhySection } from '@/components/sections/WhySection'
import { CTABanner } from '@/components/sections/CTABanner'

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id="main">
        <HeroSection />
        <ServicesSection />
        <ProcessSection />
        <PortfolioSection />
        <WhySection />
        <CTABanner />
      </main>
      <Footer />
    </>
  )
}
