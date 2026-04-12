'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HorizontalRule } from '@/components/ui/HorizontalRule'
import { modalVariants, EASE_ATLAS } from '@/lib/animations'
import type { Project } from '@/lib/constants'

interface CaseStudyModalProps {
  project: Project | null
  onClose: () => void
}

export function CaseStudyModal({ project, onClose }: CaseStudyModalProps) {
  useEffect(() => {
    if (!project) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [project, onClose])

  return (
    <AnimatePresence>
      {project && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-50"
            style={{ backgroundColor: 'rgba(10, 10, 10, 0.6)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            className="fixed inset-y-0 right-0 z-50 w-full max-w-2xl overflow-y-auto"
            style={{ backgroundColor: 'var(--atlas-white)' }}
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="p-12 max-lg:p-8">
              {/* Close */}
              <button
                onClick={onClose}
                className="mb-12 text-xs font-mono uppercase tracking-widest transition-interactive flex items-center gap-3"
                style={{ color: 'var(--atlas-black)' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--atlas-red)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--atlas-black)' }}
                aria-label="Close case study"
              >
                ← CLOSE
              </button>

              {/* Header */}
              <p className="text-xs font-mono uppercase tracking-widest mb-3" style={{ color: 'var(--atlas-gray-500)' }}>
                {project.industry}
              </p>
              <h2 className="font-bold uppercase tracking-tight mb-3" style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', color: 'var(--atlas-black)' }}>
                {project.name}
              </h2>
              <p className="text-base font-mono font-semibold mb-8" style={{ color: 'var(--atlas-red)' }}>
                {project.result}
              </p>

              <HorizontalRule weight="thick" className="mb-12" />

              {/* Metrics */}
              <div className="grid grid-cols-3 gap-4 mb-12">
                {project.metrics.map((m) => (
                  <div key={m.label} className="p-5" style={{ border: '1px solid var(--atlas-black)' }}>
                    <p className="text-2xl font-bold font-mono mb-2" style={{ color: 'var(--atlas-black)' }}>
                      {m.value}
                    </p>
                    <p className="text-xs font-mono uppercase tracking-wider" style={{ color: 'var(--atlas-gray-500)' }}>
                      {m.label}
                    </p>
                  </div>
                ))}
              </div>

              <HorizontalRule weight="hairline" className="mb-10" />

              {/* Challenge */}
              <div className="mb-10">
                <p className="text-xs font-mono uppercase tracking-widest mb-4" style={{ color: 'var(--atlas-gray-500)' }}>
                  The Challenge
                </p>
                <p className="text-base font-mono leading-relaxed" style={{ color: 'var(--atlas-black)' }}>
                  {project.challenge}
                </p>
              </div>

              {/* Solution */}
              <div className="mb-10">
                <p className="text-xs font-mono uppercase tracking-widest mb-4" style={{ color: 'var(--atlas-gray-500)' }}>
                  The Solution
                </p>
                <p className="text-base font-mono leading-relaxed" style={{ color: 'var(--atlas-black)' }}>
                  {project.solution}
                </p>
              </div>

              {/* Image placeholders */}
              <HorizontalRule weight="hairline" className="mb-10" />
              <p className="text-xs font-mono uppercase tracking-widest mb-6" style={{ color: 'var(--atlas-gray-500)' }}>
                Project Visuals
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[1, 2].map((n) => (
                  <div
                    key={n}
                    className="aspect-video flex items-center justify-center"
                    style={{
                      backgroundColor: 'var(--atlas-gray-100)',
                      border: '1px solid var(--atlas-black)',
                    }}
                  >
                    <span className="text-xs font-mono uppercase tracking-widest" style={{ color: 'var(--atlas-gray-300)' }}>
                      Mockup {n}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
