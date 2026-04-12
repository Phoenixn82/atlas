import { HorizontalRule } from '@/components/ui/HorizontalRule'
import { Circle } from '@/components/ui/Circle'
import { ProcessFlow } from './ProcessFlow'
import { SectionReveal } from '@/components/ui/SectionReveal'

interface ServiceBlockProps {
  id: string
  label: string
  description: string
  included: readonly string[]
  process: readonly string[]
  timeline: string
}

export function ServiceBlock({
  id,
  label,
  description,
  included,
  process,
  timeline,
}: ServiceBlockProps) {
  return (
    <section id={id} className="py-24">
      <SectionReveal>
        <h2
          className="font-bold uppercase tracking-tight mb-4"
          style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: 'var(--atlas-black)' }}
        >
          {label}
        </h2>
        <p
          className="text-base font-mono leading-relaxed max-w-2xl mb-12"
          style={{ color: 'var(--atlas-gray-500)' }}
        >
          {description}
        </p>
        <HorizontalRule weight="hairline" className="mb-12" />
      </SectionReveal>

      <div className="grid grid-cols-12 gap-16 mb-16">
        <SectionReveal className="col-span-12 lg:col-span-5">
          <p
            className="text-xs font-mono uppercase tracking-widest mb-8"
            style={{ color: 'var(--atlas-gray-500)' }}
          >
            What&apos;s included
          </p>
          <ul className="flex flex-col gap-4">
            {included.map((item) => (
              <li key={item} className="flex items-center gap-4">
                <Circle size="xs" variant="filled" />
                <span className="text-sm font-mono" style={{ color: 'var(--atlas-black)' }}>
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </SectionReveal>

        <SectionReveal className="col-span-12 lg:col-span-6 lg:col-start-7">
          <p
            className="text-xs font-mono uppercase tracking-widest mb-8"
            style={{ color: 'var(--atlas-gray-500)' }}
          >
            The process
          </p>
          <ProcessFlow steps={process} />
          <div
            className="mt-10 pt-8"
            style={{ borderTop: '1px solid var(--atlas-gray-300)' }}
          >
            <p
              className="text-xs font-mono uppercase tracking-widest mb-2"
              style={{ color: 'var(--atlas-gray-500)' }}
            >
              Timeline
            </p>
            <p className="text-sm font-mono" style={{ color: 'var(--atlas-black)' }}>
              {timeline}
            </p>
          </div>
        </SectionReveal>
      </div>

      <HorizontalRule weight="hairline" />
    </section>
  )
}
