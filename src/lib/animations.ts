import type { Variants } from 'framer-motion'

export const EASE_ATLAS = [0.16, 1, 0.3, 1] as const

export const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE_ATLAS },
  },
}

export const staggerContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
}

export const lineDrawVariants: Variants = {
  hidden: { scaleX: 0, originX: '0%' },
  visible: {
    scaleX: 1,
    transition: { duration: 0.6, ease: EASE_ATLAS },
  },
}

export const clipRevealVariants: Variants = {
  hidden: { clipPath: 'inset(0 0 100% 0)' },
  visible: {
    clipPath: 'inset(0 0 0% 0)',
    transition: { duration: 0.4, ease: EASE_ATLAS },
  },
}

export const modalVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: EASE_ATLAS },
  },
  exit: {
    opacity: 0,
    y: 20,
    transition: { duration: 0.2, ease: 'easeIn' },
  },
}
