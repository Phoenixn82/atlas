import Image from 'next/image'

type AtlasFigureVariant = 'full' | 'silhouette' | 'sphere-only' | 'partial-crop'
type AtlasFigureSize = 'sm' | 'md' | 'lg' | 'xl'

interface AtlasFigureProps {
  variant?: AtlasFigureVariant
  size?: AtlasFigureSize
  interactive?: boolean
  className?: string
}

const sizeMap: Record<AtlasFigureSize, string> = {
  sm: 'w-24 h-32',
  md: 'w-48 h-64',
  lg: 'w-72 h-[440px]',
  xl: 'w-[420px] h-[560px]',
}

export function AtlasFigure({
  variant = 'full',
  size = 'lg',
  interactive = false,
  className = '',
}: AtlasFigureProps) {
  const sizeClass = sizeMap[size]

  const interactiveStyle = interactive
    ? { transition: 'opacity 150ms ease', cursor: 'default' }
    : {}

  if (variant === 'sphere-only') {
    return (
      <svg
        viewBox="0 0 200 200"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`${sizeClass} ${className}`}
        aria-hidden="true"
      >
        <circle cx="100" cy="100" r="88" strokeWidth="2" />
        <ellipse cx="100" cy="100" rx="88" ry="26" strokeWidth="1.2" />
        <ellipse cx="100" cy="72" rx="70" ry="20" strokeWidth="0.9" />
        <ellipse cx="100" cy="128" rx="70" ry="20" strokeWidth="0.9" />
        <ellipse cx="100" cy="46" rx="45" ry="13" strokeWidth="0.7" />
        <ellipse cx="100" cy="154" rx="45" ry="13" strokeWidth="0.7" />
        <path d="M100 12 C132 30 140 65 138 92 C135 118 124 144 100 188" strokeWidth="1.2" />
        <path d="M100 12 C68 30 60 65 62 92 C65 118 76 144 100 188" strokeWidth="1.2" />
        <path d="M100 12 Q155 100 100 188" strokeWidth="0.9" />
        <path d="M100 12 Q45 100 100 188" strokeWidth="0.9" />
      </svg>
    )
  }

  if (variant === 'silhouette') {
    return (
      <div
        className={`relative ${sizeClass} ${className}`}
        style={interactiveStyle}
        aria-hidden="true"
      >
        <Image
          src="/images/atlas-figure-silhouette.webp"
          alt=""
          fill
          className="object-contain"
          sizes="(max-width: 768px) 50vw, 33vw"
        />
      </div>
    )
  }

  if (variant === 'partial-crop') {
    return (
      <div
        className={`relative overflow-hidden ${sizeClass} ${className}`}
        style={{ ...interactiveStyle, clipPath: 'inset(50% 0 0 0)' }}
        aria-hidden="true"
      >
        <Image
          src="/images/atlas-figure.webp"
          alt=""
          fill
          className="object-contain object-bottom"
          sizes="(max-width: 768px) 80vw, 50vw"
        />
      </div>
    )
  }

  // 'full' — the primary classical engraving
  return (
    <div
      className={`relative ${sizeClass} ${className}`}
      style={interactiveStyle}
      aria-hidden="true"
    >
      <Image
        src="/images/atlas-figure.webp"
        alt=""
        fill
        className="object-contain"
        sizes="(max-width: 768px) 80vw, 50vw"
        priority={size === 'xl' || size === 'lg'}
      />
    </div>
  )
}
