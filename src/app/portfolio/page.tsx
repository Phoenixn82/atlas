import Image from 'next/image'
import type { Metadata } from 'next'
import { HorizontalRule } from '@/components/ui/HorizontalRule'
import { SectionReveal } from '@/components/ui/SectionReveal'
import { ProjectGrid } from '@/components/portfolio/ProjectGrid'
import { CTASection } from '@/components/home/CTASection'

export const metadata: Metadata = {
  title: 'Portfolio',
  description:
    'Real results from real clients. Web design and SEO projects with measurable outcomes.',
}

export default function PortfolioPage() {
  return (
    <div className="pt-16">
      <div className="relative max-w-[1440px] mx-auto px-16 max-lg:px-6 py-24 overflow-hidden">
        {/* Outline logo — right bg */}
        <div
          className="absolute right-8 top-1/2 -translate-y-1/2 pointer-events-none select-none hidden lg:block"
          aria-hidden="true"
          style={{ opacity: 0.3 }}
        >
          <Image src="/images/logos/atlas-outline.png" alt="" width={360} height={112} className="object-contain" quality={100} />
        </div>
        <SectionReveal>
          <p
            className="text-xs font-mono uppercase tracking-widest mb-6"
            style={{ color: 'var(--atlas-gray-500)' }}
          >
            RESULTS SPEAK. METRICS DON&apos;T LIE.
          </p>
          <h1
            className="font-bold uppercase tracking-tight leading-none"
            style={{ fontSize: 'clamp(3rem, 8vw, 7rem)', color: 'var(--atlas-black)' }}
          >
            PORTFOLIO
          </h1>
        </SectionReveal>
        <HorizontalRule weight="thick" animate className="mt-8 mb-20" />
        <ProjectGrid />
      </div>
      <CTASection />
    </div>
  )
}
