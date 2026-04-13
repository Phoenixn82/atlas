'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { NAV_LINKS } from '@/lib/constants'
import { clipRevealVariants } from '@/lib/animations'

export function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-150"
        style={{ backgroundColor: 'var(--atlas-white)' }}
      >
        <div className="max-w-[1440px] mx-auto px-16 max-lg:px-6">
          <div className="flex items-stretch justify-between h-16">
            {/* Logo mark */}
            <Link href="/" aria-label="ATLAS — Home" className="flex items-center self-center gap-3">
              <Image
                src="/images/logos/atlas-circle.png"
                alt="ATLAS"
                width={44}
                height={44}
                className="is-circle"
                quality={100}
                priority
              />
              <Image
                src="/images/logos/atlas-boxed.png"
                alt="ATLAS"
                width={120}
                height={44}
                className="object-contain hidden sm:block"
                quality={100}
                priority
              />
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-stretch self-stretch gap-px" aria-label="Main navigation">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-xs font-mono uppercase tracking-widest transition-interactive px-4 flex items-center"
                  style={{
                    color: 'var(--atlas-black)',
                    border: '2px solid transparent',
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement
                    el.style.backgroundColor = 'var(--atlas-red)'
                    el.style.color = 'white'
                    el.style.border = '2px solid var(--atlas-black)'
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement
                    el.style.backgroundColor = 'transparent'
                    el.style.color = 'var(--atlas-black)'
                    el.style.border = '2px solid transparent'
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Mobile hamburger — two lines */}
            <button
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              className="lg:hidden flex flex-col gap-[7px] p-2 self-center"
              onClick={() => setMobileOpen((v) => !v)}
            >
              <span
                className="block w-7 transition-interactive"
                style={{ height: '1.5px', backgroundColor: 'var(--atlas-black)' }}
              />
              <span
                className="block w-7 transition-interactive"
                style={{ height: '1.5px', backgroundColor: 'var(--atlas-black)' }}
              />
            </button>
          </div>
        </div>

        {/* Bottom hairline rule */}
        <div className="h-[2px]" style={{ backgroundColor: 'var(--atlas-black)' }} />
      </header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col justify-center px-8"
            style={{ backgroundColor: 'var(--atlas-white)' }}
            variants={clipRevealVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <nav className="flex flex-col gap-12" aria-label="Mobile navigation">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.3 }}
                >
                  <Link
                    href={link.href}
                    className="text-5xl font-mono font-bold uppercase tracking-tight transition-interactive inline-block px-4 py-1"
                    style={{ color: 'var(--atlas-black)' }}
                    onMouseEnter={e => {
                      const el = e.currentTarget as HTMLElement
                      el.style.backgroundColor = 'var(--atlas-red)'
                      el.style.color = 'white'
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget as HTMLElement
                      el.style.backgroundColor = 'transparent'
                      el.style.color = 'var(--atlas-black)'
                    }}
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
