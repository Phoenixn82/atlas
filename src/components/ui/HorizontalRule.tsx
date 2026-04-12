'use client'

import { motion } from 'framer-motion'
import { lineDrawVariants } from '@/lib/animations'

type HRWeight = 'hairline' | 'thin' | 'medium' | 'thick' | 'heavy'

const heightMap: Record<HRWeight, string> = {
  hairline: 'h-[1px]',
  thin: 'h-[2px]',
  medium: 'h-[3px]',
  thick: 'h-[4px]',
  heavy: 'h-[6px]',
}

interface HorizontalRuleProps {
  weight?: HRWeight
  animate?: boolean
  color?: 'black' | 'red'
  className?: string
}

export function HorizontalRule({
  weight = 'thin',
  animate = false,
  color = 'black',
  className = '',
}: HorizontalRuleProps) {
  // Use inline styles with CSS variables to avoid Tailwind v4 class generation issues
  const colorStyle = color === 'red'
    ? { backgroundColor: 'var(--atlas-red)' }
    : { backgroundColor: 'var(--atlas-black)' }

  const heightClass = heightMap[weight]
  const baseClass = `w-full ${heightClass} ${className}`

  if (animate) {
    return (
      <motion.div
        className={baseClass}
        style={colorStyle}
        variants={lineDrawVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
      />
    )
  }

  return <div className={baseClass} style={colorStyle} />
}
