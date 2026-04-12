'use client'

import Link from 'next/link'
import { HorizontalRule } from '@/components/ui/HorizontalRule'
import { SectionMarker } from '@/components/ui/SectionMarker'
import { SectionReveal } from '@/components/ui/SectionReveal'
import { AtlasFigure } from '@/components/atlas/AtlasFigure'
import { PORTFOLIO_PROJECTS } from '@/lib/constants'

const preview = PORTFOLIO_PROJECTS.slice(0, 3)

export function PortfolioPreview() {
  return (
    <section className="py-40 max-lg:py-20 relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-16 max-lg:px-6">
        <SectionReveal>
          <SectionMarker number="03" label="SELECTED WORK" className="mb-10" />
          <HorizontalRule weight="hairline" animate className="mb-16" />
        </SectionReveal>

        <div className="grid grid-cols-12 gap-6 mb-12">
          {preview.map((project, i) => (
            <SectionReveal key={project.id} className="col-span-12 lg:col-span-4" delay={i * 0.1}>
              <Link href={`/portfolio#${project.id}`} className="group block">
                {/* Image placeholder */}
                <div
                  className="relative aspect-[4/3] mb-6 overflow-hidden"
                  style={{
                    backgroundColor: 'var(--atlas-gray-100)',
                    border: '2px solid var(--atlas-black)',
                  }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span
                      className="text-xs font-mono uppercase tracking-widest"
                      style={{ color: 'var(--atlas-gray-300)' }}
                    >
                      {project.industry}
                    </span>
                  </div>
                  {/* Red border overlay on hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-interactive"
                    style={{ border: '4px solid var(--atlas-red)' }}
                  />
                </div>
                <p
                  className="text-sm font-mono uppercase tracking-widest mb-2"
                  style={{ color: 'var(--atlas-gray-500)' }}
                >
                  {project.industry}
                </p>
                <p
                  className="text-lg font-bold uppercase tracking-tight transition-interactive group-hover:opacity-70"
                  style={{ color: 'var(--atlas-black)' }}
                >
                  {project.name}
                </p>
                <p
                  className="text-sm font-mono mt-2"
                  style={{ color: 'var(--atlas-gray-500)' }}
                >
                  {project.result}
                </p>
              </Link>
            </SectionReveal>
          ))}
        </div>

        <SectionReveal>
          <Link
            href="/portfolio"
            className="text-sm font-mono uppercase tracking-widest transition-interactive inline-flex items-center gap-3"
            style={{ color: 'var(--atlas-black)' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--atlas-red)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--atlas-black)' }}
          >
            VIEW ALL PROJECTS
            <span className="text-base">→</span>
          </Link>
        </SectionReveal>

        {/* Atlas figure peeking at bottom — decorative */}
        <div
          className="absolute bottom-0 right-16 pointer-events-none hidden lg:block"
          style={{ opacity: 0.06 }}
        >
          <AtlasFigure variant="partial-crop" size="xl" />
        </div>
      </div>

      <HorizontalRule weight="hairline" animate className="mt-16" />
    </section>
  )
}
