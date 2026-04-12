import type { Metadata } from 'next'
import { HeroSection } from '@/components/home/HeroSection'
import { ServicesOverview } from '@/components/home/ServicesOverview'
import { PortfolioPreview } from '@/components/home/PortfolioPreview'
import { WhyAtlas } from '@/components/home/WhyAtlas'
import { CTASection } from '@/components/home/CTASection'
import { SITE_DESCRIPTION, SITE_URL } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'ATLAS — Web Design & SEO Agency That Builds Revenue',
  description: SITE_DESCRIPTION,
  alternates: { canonical: SITE_URL },
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesOverview />
      <PortfolioPreview />
      <WhyAtlas />
      <CTASection />
    </>
  )
}
