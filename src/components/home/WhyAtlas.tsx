import { AtlasMark } from '@/components/atlas/AtlasMark'
import { HorizontalRule } from '@/components/ui/HorizontalRule'
import { SectionMarker } from '@/components/ui/SectionMarker'
import { SectionReveal } from '@/components/ui/SectionReveal'
import { WHY_ATLAS } from '@/lib/constants'

export function WhyAtlas() {
  return (
    <section className="relative py-40 max-lg:py-20 overflow-hidden">
      {/* Ghost watermark badge */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/3 pointer-events-none select-none"
        aria-hidden="true"
        style={{ opacity: 0.04 }}
      >
        <AtlasMark detail="full" className="w-[480px] h-[480px]" />
      </div>
      <div className="relative max-w-[1440px] mx-auto px-16 max-lg:px-6">
        <SectionReveal>
          <SectionMarker number="04" label="WHY US" className="mb-10" />
          <HorizontalRule weight="hairline" animate className="mb-16" />
        </SectionReveal>

        <div className="grid grid-cols-12 gap-8 lg:gap-16">
          {WHY_ATLAS.map((item, i) => (
            <SectionReveal key={item.number} className="col-span-12 sm:col-span-6 lg:col-span-3" delay={i * 0.08}>
              <div className="flex flex-col gap-4">
                <span
                  className="text-7xl font-bold font-mono leading-none select-none"
                  style={{ color: 'var(--atlas-gray-300)' }}
                >
                  {item.number}
                </span>
                <HorizontalRule weight="hairline" />
                <p className="text-base font-bold uppercase tracking-tight">{item.headline}</p>
                <p className="text-sm font-mono leading-relaxed" style={{ color: 'var(--atlas-gray-500)' }}>
                  {item.description}
                </p>
              </div>
            </SectionReveal>
          ))}
        </div>

        <HorizontalRule weight="hairline" animate className="mt-20" />
      </div>
    </section>
  )
}
