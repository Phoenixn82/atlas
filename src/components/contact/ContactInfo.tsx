'use client'

import { HorizontalRule } from '@/components/ui/HorizontalRule'

export function ContactInfo() {
  return (
    <div className="flex flex-col gap-12">
      <div>
        <p className="text-xs font-mono uppercase tracking-widest mb-6" style={{ color: 'var(--atlas-gray-500)' }}>
          Get in touch
        </p>
        <div className="flex flex-col gap-5">
          <a
            href="tel:+15551234567"
            className="font-bold transition-interactive"
            style={{ fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)', color: 'var(--atlas-black)' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--atlas-red)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--atlas-black)' }}
          >
            +1 (555) 123-4567
          </a>
          <a
            href="mailto:hello@atlasagency.com"
            className="font-bold transition-interactive"
            style={{ fontSize: 'clamp(1rem, 2vw, 1.5rem)', color: 'var(--atlas-black)' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--atlas-red)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--atlas-black)' }}
          >
            hello@atlasagency.com
          </a>
        </div>
      </div>

      <HorizontalRule weight="hairline" />

      <div>
        <p className="text-xs font-mono uppercase tracking-widest mb-4" style={{ color: 'var(--atlas-gray-500)' }}>
          Office hours
        </p>
        <p className="text-sm font-mono leading-relaxed" style={{ color: 'var(--atlas-gray-500)' }}>
          Monday – Friday<br />
          9:00 AM – 6:00 PM EST
        </p>
      </div>

      <HorizontalRule weight="hairline" />

      <div>
        <p className="text-xs font-mono uppercase tracking-widest mb-6" style={{ color: 'var(--atlas-gray-500)' }}>
          Prefer to book directly?
        </p>
        <p className="text-sm font-mono leading-relaxed mb-6" style={{ color: 'var(--atlas-gray-500)' }}>
          Skip the back-and-forth. Book a free 30-minute strategy call.
        </p>
        {/* Booking embed placeholder — Cal.com or Calendly to be added */}
        <div
          className="p-8 text-center"
          style={{ border: '1px solid var(--atlas-gray-300)' }}
        >
          <p className="text-xs font-mono uppercase tracking-widest" style={{ color: 'var(--atlas-gray-300)' }}>
            BOOKING CALENDAR
          </p>
          <p className="text-xs font-mono mt-2" style={{ color: 'var(--atlas-gray-300)' }}>
            Cal.com embed — coming soon
          </p>
        </div>
      </div>
    </div>
  )
}
