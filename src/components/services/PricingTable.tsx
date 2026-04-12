'use client'

import { Button } from '@/components/ui/Button'
import { Circle } from '@/components/ui/Circle'
import { SectionReveal } from '@/components/ui/SectionReveal'
import { PRICING_TIERS } from '@/lib/constants'

export function PricingTable() {
  return (
    <section id="pricing" className="py-24">
      <SectionReveal>
        <h2
          className="font-bold uppercase tracking-tight mb-16"
          style={{ fontSize: 'clamp(2rem, 4vw, 2.5rem)', color: 'var(--atlas-black)' }}
        >
          PRICING
        </h2>
      </SectionReveal>

      <div className="grid grid-cols-12 gap-6">
        {PRICING_TIERS.map((tier, i) => (
          <SectionReveal key={tier.id} className="col-span-12 lg:col-span-4" delay={i * 0.1}>
            <div
              className="relative flex flex-col h-full p-8 transition-interactive"
              style={{
                border: tier.recommended
                  ? '4px solid var(--atlas-black)'
                  : '2px solid var(--atlas-black)',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.borderColor = 'var(--atlas-red)'
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.borderColor = 'var(--atlas-black)'
              }}
            >
              {/* Recommended badge — THE ONLY RESTING RED ELEMENT */}
              {tier.recommended && (
                <div
                  className="absolute -top-3 left-8 flex items-center gap-2 px-3"
                  style={{ backgroundColor: 'var(--atlas-white)' }}
                >
                  <Circle size="xs" variant="filled" color="red" />
                  <span
                    className="text-xs font-mono uppercase tracking-widest"
                    style={{ color: 'var(--atlas-red)' }}
                  >
                    Recommended
                  </span>
                </div>
              )}

              <p
                className="text-xs font-mono uppercase tracking-widest mb-4"
                style={{ color: 'var(--atlas-gray-500)' }}
              >
                {tier.name}
              </p>

              <div className="mb-8">
                <span
                  className="text-4xl font-bold font-mono"
                  style={{ color: 'var(--atlas-black)' }}
                >
                  {tier.price}
                </span>
                <span
                  className="text-sm font-mono ml-2"
                  style={{ color: 'var(--atlas-gray-500)' }}
                >
                  {tier.period}
                </span>
              </div>

              <ul className="flex flex-col gap-4 mb-10 flex-1">
                {tier.features.map((feature) => (
                  <li key={feature.label} className="flex items-center gap-4">
                    <Circle
                      size="xs"
                      variant={feature.included ? 'filled' : 'outlined'}
                      className="flex-shrink-0"
                    />
                    <span
                      className="text-sm font-mono"
                      style={{
                        color: feature.included
                          ? 'var(--atlas-black)'
                          : 'var(--atlas-gray-300)',
                      }}
                    >
                      {feature.label}
                    </span>
                  </li>
                ))}
              </ul>

              <Button href="/contact" className="w-full justify-center">
                GET STARTED
              </Button>
            </div>
          </SectionReveal>
        ))}
      </div>
    </section>
  )
}
