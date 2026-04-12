'use client'

import { motion } from 'framer-motion'

type CircleSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
type CircleVariant = 'filled' | 'outlined'

const sizeMap: Record<CircleSize, string> = {
  xs: 'w-2 h-2',
  sm: 'w-4 h-4',
  md: 'w-8 h-8',
  lg: 'w-24 h-24',
  xl: 'w-48 h-48',
}

interface CircleProps {
  size?: CircleSize
  variant?: CircleVariant
  interactive?: boolean
  className?: string
  color?: 'black' | 'red'
}

export function Circle({
  size = 'sm',
  variant = 'filled',
  interactive = false,
  className = '',
  color = 'black',
}: CircleProps) {
  const colorValue = color === 'red' ? 'var(--atlas-red)' : 'var(--atlas-black)'

  const style =
    variant === 'filled'
      ? { backgroundColor: colorValue, borderRadius: '50%' }
      : { border: `2px solid ${colorValue}`, borderRadius: '50%', backgroundColor: 'transparent' }

  const base = `is-circle ${sizeMap[size]} ${className}`

  if (interactive) {
    return (
      <motion.div
        className={base}
        style={style}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.15 }}
      />
    )
  }
  return <div className={base} style={style} />
}
