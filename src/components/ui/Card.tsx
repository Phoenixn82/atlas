'use client'

import { motion } from 'framer-motion'

interface CardProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  interactive?: boolean
}

export function Card({ children, className = '', onClick, interactive = false }: CardProps) {
  if (interactive) {
    return (
      <motion.div
        className={`p-8 cursor-pointer ${className}`}
        style={{ border: '2px solid var(--atlas-black)' }}
        whileHover={{ borderColor: 'var(--atlas-red)', y: -4 }}
        transition={{ duration: 0.15 }}
        onClick={onClick}
      >
        {children}
      </motion.div>
    )
  }
  return (
    <div
      className={`p-8 ${className}`}
      style={{ border: '2px solid var(--atlas-black)' }}
      onClick={onClick}
    >
      {children}
    </div>
  )
}
