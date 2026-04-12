'use client'

import { motion } from 'framer-motion'
import { fadeUpVariants } from '@/lib/animations'

interface SectionRevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

export function SectionReveal({ children, className = '', delay = 0 }: SectionRevealProps) {
  return (
    <motion.div
      className={className}
      variants={fadeUpVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      transition={delay > 0 ? { delay } : undefined}
    >
      {children}
    </motion.div>
  )
}
