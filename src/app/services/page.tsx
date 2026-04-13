import Image from 'next/image'
import type { Metadata } from 'next'
import { HorizontalRule } from '@/components/ui/HorizontalRule'
import { SectionReveal } from '@/components/ui/SectionReveal'
import { ServiceBlock } from '@/components/services/ServiceBlock'
import { PricingTable } from '@/components/services/PricingTable'
import { CTASection } from '@/components/home/CTASection'
import { SERVICES } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Web design and SEO services built for results. Custom websites, organic search rankings, and bundle packages.',
}

export default function ServicesPage() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <div className="relative max-w-[1440px] mx-auto px-16 max-lg:px-6 py-24 overflow-hidden">
        <SectionReveal>
          <h1
            className="font-bold uppercase tracking-tight leading-none"
            style={{ fontSize: 'clamp(3rem, 8vw, 7rem)', color: 'var(--atlas-black)' }}
          >
            SERVICES
          </h1>
        </SectionReveal>
        {/* Dark logo — top-right watermark */}
        <div
          className="absolute right-16 top-1/2 -translate-y-1/2 pointer-events-none select-none hidden lg:block"
          aria-hidden="true"
          style={{ opacity: 0.12 }}
        >
          <Image
            src="/images/logos/atlas-dark.png"
            alt=""
            width={320}
            height={100}
            className="object-contain"
          />
        </div>
        <HorizontalRule weight="thick" animate className="mt-8" />
      </div>

      {/* Service blocks */}
      <div className="max-w-[1440px] mx-auto px-16 max-lg:px-6">
        {SERVICES.map((service) => (
          <ServiceBlock key={service.id} {...service} />
        ))}
        <PricingTable />
      </div>

      <CTASection />
    </div>
  )
}
