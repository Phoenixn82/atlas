'use client'

type AtlasFigureVariant = 'full' | 'silhouette' | 'sphere-only' | 'partial-crop'
type AtlasFigureSize = 'sm' | 'md' | 'lg' | 'xl'

interface AtlasFigureProps {
  variant?: AtlasFigureVariant
  size?: AtlasFigureSize
  interactive?: boolean
  className?: string
}

const sizeMap: Record<AtlasFigureSize, string> = {
  sm: 'w-24 h-40',
  md: 'w-40 h-64',
  lg: 'w-64 h-[420px]',
  xl: 'w-96 h-[600px]',
}

export function AtlasFigure({
  variant = 'full',
  size = 'lg',
  interactive = false,
  className = '',
}: AtlasFigureProps) {
  const interactiveClass = interactive
    ? 'hover:text-atlas-red transition-interactive cursor-default'
    : ''

  if (variant === 'sphere-only') {
    return (
      <svg
        viewBox="0 0 200 200"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className={`${sizeMap[size]} ${interactiveClass} ${className}`}
        aria-hidden="true"
      >
        <circle cx="100" cy="100" r="90" />
        <ellipse cx="100" cy="100" rx="90" ry="30" />
        <line x1="10" y1="100" x2="190" y2="100" />
        <line x1="100" y1="10" x2="100" y2="190" />
      </svg>
    )
  }

  if (variant === 'silhouette') {
    return (
      <svg
        viewBox="0 0 80 140"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`${sizeMap[size]} ${interactiveClass} ${className}`}
        aria-hidden="true"
      >
        <circle cx="40" cy="22" r="18" />
        <circle cx="40" cy="56" r="7" />
        <path d="M14 76 C14 76 24 62 40 60 C56 62 66 76 66 76" />
        <line x1="40" y1="63" x2="40" y2="100" />
        <path d="M40 100 L24 130 M40 100 L56 130" />
      </svg>
    )
  }

  // 'full' and 'partial-crop' use the same base SVG
  return (
    <svg
      viewBox="0 0 200 320"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`${sizeMap[size]} ${interactiveClass} ${className}`}
      aria-hidden="true"
      style={variant === 'partial-crop' ? { clipPath: 'inset(40% 0 0 0)' } : undefined}
    >
      {/* Sphere at top */}
      <circle cx="100" cy="48" r="44" />
      {/* Latitude lines on sphere */}
      <ellipse cx="100" cy="48" rx="44" ry="14" />
      <line x1="56" y1="48" x2="144" y2="48" />
      {/* Head */}
      <circle cx="100" cy="112" r="12" />
      {/* Neck */}
      <line x1="100" y1="124" x2="100" y2="136" />
      {/* Left arm reaching up */}
      <path d="M100 150 C90 150 68 140 58 96" />
      {/* Right arm reaching up */}
      <path d="M100 150 C110 150 132 140 142 96" />
      {/* Torso */}
      <path d="M88 136 C86 160 85 185 84 210 M112 136 C114 160 115 185 116 210" />
      {/* Waist */}
      <path d="M84 210 C90 215 110 215 116 210" />
      {/* Left leg */}
      <path d="M88 212 C82 240 76 265 70 295" />
      {/* Right leg */}
      <path d="M112 212 C118 240 124 265 130 295" />
      {/* Feet */}
      <path d="M70 295 L58 300 M130 295 L142 300" />
    </svg>
  )
}
