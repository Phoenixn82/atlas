'use client'

import Image from 'next/image'
import Link from 'next/link'
import { AtlasFigure } from '@/components/atlas/AtlasFigure'
import { HorizontalRule } from '@/components/ui/HorizontalRule'
import { NAV_LINKS, SITE_NAME } from '@/lib/constants'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer>
      <HorizontalRule weight="heavy" />
      <div className="max-w-[1440px] mx-auto px-16 max-lg:px-6 py-20">
        <div className="grid grid-cols-12 gap-8">
          {/* Column 1: Brand + logos */}
          <div className="col-span-12 lg:col-span-4 flex flex-col gap-8">
            {/* Boxed logo */}
            <Image
              src="/images/logos/atlas-boxed.png"
              alt="ATLAS"
              width={180}
              height={72}
              className="object-contain object-left"
              quality={100}
            />
            <Image
              src="/images/logos/atlas-mesh.png"
              alt=""
              width={180}
              height={56}
              className="object-contain object-left opacity-30"
              quality={100}
              aria-hidden="true"
            />
            <p
              className="text-sm font-mono leading-relaxed max-w-xs"
              style={{ color: 'var(--atlas-gray-500)' }}
            >
              We carry the weight of your digital presence so you can focus on your business.
            </p>
            <div className="flex justify-start opacity-15">
              <AtlasFigure variant="silhouette" size="sm" />
            </div>
          </div>

          {/* Column 2: Quick links */}
          <div className="col-span-6 lg:col-span-4">
            <p
              className="text-xs font-mono uppercase tracking-widest mb-6"
              style={{ color: 'var(--atlas-gray-500)' }}
            >
              Navigation
            </p>
            <nav className="flex flex-col gap-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-mono uppercase tracking-wider transition-interactive"
                  style={{ color: 'var(--atlas-black)' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--atlas-red)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--atlas-black)' }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Column 3: Contact */}
          <div className="col-span-6 lg:col-span-4">
            <p
              className="text-xs font-mono uppercase tracking-widest mb-6"
              style={{ color: 'var(--atlas-gray-500)' }}
            >
              Contact
            </p>
            <div className="flex flex-col gap-4">
              <a
                href="tel:+15551234567"
                className="text-sm font-mono transition-interactive"
                style={{ color: 'var(--atlas-black)' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--atlas-red)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--atlas-black)' }}
              >
                +1 (555) 123-4567
              </a>
              <a
                href="mailto:hello@atlasagency.com"
                className="text-sm font-mono transition-interactive"
                style={{ color: 'var(--atlas-black)' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--atlas-red)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--atlas-black)' }}
              >
                hello@atlasagency.com
              </a>
              <p
                className="text-xs font-mono uppercase tracking-wider"
                style={{ color: 'var(--atlas-gray-500)' }}
              >
                Mon – Fri, 9AM – 6PM EST
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <HorizontalRule weight="hairline" />
      <div className="max-w-[1440px] mx-auto px-16 max-lg:px-6 py-6 flex items-center justify-between">
        <p
          className="text-xs font-mono uppercase tracking-widest"
          style={{ color: 'var(--atlas-gray-500)' }}
        >
          © {year} {SITE_NAME}. All rights reserved.
        </p>
        {/* Back to top */}
        <a
          href="#top"
          aria-label="Back to top"
          className="is-circle w-10 h-10 flex items-center justify-center transition-interactive"
          style={{ border: '1px solid var(--atlas-black)', color: 'var(--atlas-black)' }}
          onMouseEnter={e => {
            const el = e.currentTarget as HTMLElement
            el.style.borderColor = 'var(--atlas-red)'
            el.style.color = 'var(--atlas-red)'
          }}
          onMouseLeave={e => {
            const el = e.currentTarget as HTMLElement
            el.style.borderColor = 'var(--atlas-black)'
            el.style.color = 'var(--atlas-black)'
          }}
        >
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
            <path d="M8 12 L8 4 M4 7 L8 3 L12 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    </footer>
  )
}
