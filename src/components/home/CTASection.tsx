'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { HorizontalRule } from '@/components/ui/HorizontalRule'
import { SectionReveal } from '@/components/ui/SectionReveal'

export function CTASection() {
  return (
    <section>
      <HorizontalRule weight="heavy" />
      <div className="py-40 max-lg:py-24">
        <div className="max-w-[1440px] mx-auto px-16 max-lg:px-6 text-center">
          <SectionReveal>
            <h2
              className="font-bold uppercase tracking-tight leading-none mb-8"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 6rem)', color: 'var(--atlas-black)' }}
            >
              READY TO
              <br />
              LAUNCH?
            </h2>
            <p className="text-base font-mono mb-12 max-w-md mx-auto leading-relaxed" style={{ color: 'var(--atlas-gray-500)' }}>
              Let&apos;s talk about what you need and how we can build something that works.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6">
              <Button href="/contact">BOOK A CALL</Button>
              <Link
                href="/contact"
                className="text-sm font-mono uppercase tracking-widest transition-interactive"
                style={{ color: 'var(--atlas-black)' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--atlas-red)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--atlas-black)' }}
              >
                SEND A MESSAGE →
              </Link>
            </div>
          </SectionReveal>
        </div>
      </div>
      <HorizontalRule weight="heavy" />
    </section>
  )
}
