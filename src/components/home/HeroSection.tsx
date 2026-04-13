'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { AtlasFigure } from '@/components/atlas/AtlasFigure'
import { Button } from '@/components/ui/Button'
import { HorizontalRule } from '@/components/ui/HorizontalRule'
import { SectionMarker } from '@/components/ui/SectionMarker'
import { fadeUpVariants, staggerContainerVariants, EASE_ATLAS } from '@/lib/animations'

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-16">
      {/* Striped logo — large background watermark */}
      <div className="absolute inset-0 flex items-center justify-start pl-16 pointer-events-none select-none" aria-hidden="true">
        <Image
          src="/images/logos/atlas-striped.png"
          alt=""
          width={600}
          height={200}
          className="opacity-20 object-contain"
          quality={100}
        />
      </div>
      <div className="max-w-[1440px] mx-auto px-16 max-lg:px-6 w-full">
        <div className="grid grid-cols-12 gap-8 items-center min-h-[calc(100vh-4rem)]">

          {/* Left: Text content */}
          <motion.div
            className="col-span-12 lg:col-span-7 flex flex-col justify-center py-20 lg:py-0"
            variants={staggerContainerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={fadeUpVariants}>
              <SectionMarker number="01" label="WEB DESIGN & SEO" className="mb-10" />
            </motion.div>

            <motion.div variants={fadeUpVariants}>
              <HorizontalRule weight="hairline" className="mb-10" />
            </motion.div>

            <motion.h1
              className="font-bold uppercase leading-none tracking-tight mb-8"
              style={{
                fontSize: 'clamp(2.5rem, 6vw, 6rem)',
                color: 'var(--atlas-black)',
              }}
              variants={fadeUpVariants}
            >
              WE DON&apos;T BUILD
              <br />
              WEBSITES.
              <br />
              WE BUILD
              <br />
              REVENUE.
            </motion.h1>

            <motion.div variants={fadeUpVariants}>
              <HorizontalRule weight="hairline" className="mb-8" />
            </motion.div>

            <motion.p
              className="text-base font-mono leading-relaxed max-w-lg mb-12"
              style={{ color: 'var(--atlas-gray-500)' }}
              variants={fadeUpVariants}
            >
              Two things separate businesses that grow from businesses that don&apos;t: a website
              that converts and search rankings that compound. We deliver both.
            </motion.p>

            <motion.div className="flex flex-wrap gap-4" variants={fadeUpVariants}>
              <Button href="/contact">BOOK YOUR FREE STRATEGY CALL</Button>
              <Button variant="ghost" href="/services">VIEW SERVICES</Button>
            </motion.div>

            {/* Circle badge seal */}
            <motion.div
              className="mt-16 flex items-center gap-6"
              variants={fadeUpVariants}
            >
              <Image
                src="/images/logos/atlas-circle.png"
                alt="ATLAS"
                width={88}
                height={88}
                className="is-circle"
              />
              <div>
                <p className="text-xs font-mono uppercase tracking-widest" style={{ color: 'var(--atlas-gray-500)' }}>
                  ATLAS AGENCY
                </p>
                <p className="text-xs font-mono mt-1" style={{ color: 'var(--atlas-gray-300)' }}>
                  WEB DESIGN · SEO · RESULTS
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Atlas figure */}
          <motion.div
            className="hidden lg:flex col-span-5 items-center justify-center"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: EASE_ATLAS, delay: 0.3 }}
          >
            <AtlasFigure
              variant="full"
              size="xl"
              interactive
              className="opacity-90"
            />
          </motion.div>
        </div>
      </div>

      {/* Bottom border */}
      <HorizontalRule weight="thick" className="mt-auto" />
    </section>
  )
}
