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
      <div className="max-w-[1440px] mx-auto px-16 max-lg:px-6 py-24">
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
