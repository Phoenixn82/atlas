'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { AtlasMark } from '@/components/atlas/AtlasMark'
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
          <div className="flex items-center justify-between h-16">
            {/* Logo mark */}
            <Link href="/" aria-label="ATLAS — Home" className="flex items-center text-atlas-black">
              <AtlasMark className="h-9 w-auto" interactive />
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-10" aria-label="Main navigation">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-xs font-mono uppercase tracking-widest relative group transition-interactive"
                  style={{ color: 'var(--atlas-black)' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--atlas-red)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--atlas-black)' }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Mobile hamburger — two lines */}
            <button
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              className="lg:hidden flex flex-col gap-[7px] p-2"
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
        <div className="h-[1px]" style={{ backgroundColor: 'var(--atlas-black)' }} />
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
                    className="text-5xl font-mono font-bold uppercase tracking-tight transition-interactive"
                    style={{ color: 'var(--atlas-black)' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--atlas-red)' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--atlas-black)' }}
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
