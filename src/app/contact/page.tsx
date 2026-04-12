import type { Metadata } from 'next'
import { HorizontalRule } from '@/components/ui/HorizontalRule'
import { SectionReveal } from '@/components/ui/SectionReveal'
import { ContactForm } from '@/components/contact/ContactForm'
import { ContactInfo } from '@/components/contact/ContactInfo'

export const metadata: Metadata = {
  title: 'Contact',
  description: "Book a free strategy call or send us a message. Let's talk about what you need.",
}

export default function ContactPage() {
  return (
    <div className="pt-16">
      <div className="max-w-[1440px] mx-auto px-16 max-lg:px-6 py-24">
        <SectionReveal>
          <h1
            className="font-bold uppercase tracking-tight leading-none"
            style={{ fontSize: 'clamp(3rem, 8vw, 7rem)', color: 'var(--atlas-black)' }}
          >
            CONTACT
          </h1>
        </SectionReveal>
        <HorizontalRule weight="thick" animate className="mt-8 mb-20" />

        <div className="grid grid-cols-12 gap-16 max-lg:gap-20">
          {/* Left: Form */}
          <SectionReveal className="col-span-12 lg:col-span-6">
            <p className="text-xs font-mono uppercase tracking-widest mb-10" style={{ color: 'var(--atlas-gray-500)' }}>
              Send a message
            </p>
            <ContactForm />
          </SectionReveal>

          {/* Vertical divider */}
          <div className="hidden lg:block col-span-1">
            <div className="h-full w-[1px] mx-auto" style={{ backgroundColor: 'var(--atlas-gray-300)' }} />
          </div>

          {/* Right: Info */}
          <SectionReveal className="col-span-12 lg:col-span-5" delay={0.1}>
            <ContactInfo />
          </SectionReveal>
        </div>
      </div>
    </div>
  )
}
