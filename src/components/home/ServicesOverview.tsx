'use client'

import Link from 'next/link'
import { Card } from '@/components/ui/Card'
import { HorizontalRule } from '@/components/ui/HorizontalRule'
import { SectionMarker } from '@/components/ui/SectionMarker'
import { SectionReveal } from '@/components/ui/SectionReveal'

const services = [
  {
    label: 'WEB DESIGN',
    description: 'Precision-built sites that convert. No templates. No compromise.',
    href: '/services#web-design',
  },
  {
    label: 'SEO',
    description: 'Organic rankings that compound. Traffic you own, not rent.',
    href: '/services#seo',
  },
  {
    label: 'WEB + SEO BUNDLE',
    description: 'The complete system. Built to rank from day one.',
    href: '/services#bundle',
  },
]

export function ServicesOverview() {
  return (
    <section className="py-40 max-lg:py-20">
      <div className="max-w-[1440px] mx-auto px-16 max-lg:px-6">
        <SectionReveal>
          <SectionMarker number="02" label="SERVICES" className="mb-10" />
          <HorizontalRule weight="hairline" animate className="mb-10" />
        </SectionReveal>

        <div className="grid grid-cols-12 gap-8 mb-16">
          <SectionReveal className="col-span-12 lg:col-span-5">
            <h2
              className="font-bold uppercase tracking-tight leading-tight"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--atlas-black)' }}
            >
              WHAT WE
              <br />
              DO BEST
            </h2>
          </SectionReveal>
          <SectionReveal className="col-span-12 lg:col-span-5 lg:col-start-7 flex items-end">
            <p className="text-base font-mono leading-relaxed" style={{ color: 'var(--atlas-gray-500)' }}>
              Every engagement is built around one question: what will move the needle for your
              business?
            </p>
          </SectionReveal>
        </div>

        <div className="grid grid-cols-12 gap-6 mb-12">
          {services.map((service, i) => (
            <SectionReveal key={service.label} className="col-span-12 lg:col-span-4" delay={i * 0.1}>
              <Link href={service.href} className="block h-full">
                <Card interactive className="h-full flex flex-col gap-6 min-h-[200px]">
                  <div className="w-6 h-[2px]" style={{ backgroundColor: 'var(--atlas-black)' }} />
                  <p className="text-lg font-bold uppercase tracking-tight">{service.label}</p>
                  <p className="text-sm font-mono leading-relaxed mt-auto" style={{ color: 'var(--atlas-gray-500)' }}>
                    {service.description}
                  </p>
                </Card>
              </Link>
            </SectionReveal>
          ))}
        </div>

        <SectionReveal>
          <Link
            href="/services"
            className="text-sm font-mono uppercase tracking-widest transition-interactive inline-flex items-center gap-3"
            style={{ color: 'var(--atlas-black)' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--atlas-red)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--atlas-black)' }}
          >
            VIEW ALL SERVICES
            <span className="text-base">→</span>
          </Link>
        </SectionReveal>

        <HorizontalRule weight="hairline" animate className="mt-16" />
      </div>
    </section>
  )
}
