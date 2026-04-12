interface AtlasSphereProps {
  size?: number
  strokeWidth?: number
  className?: string
  interactive?: boolean
}

export function AtlasSphere({
  size = 200,
  strokeWidth = 2,
  className = '',
  interactive = false,
}: AtlasSphereProps) {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      width={size}
      height={size}
      className={`${interactive ? 'hover:text-atlas-red transition-interactive' : ''} ${className}`}
      aria-hidden="true"
    >
      <circle cx="100" cy="100" r="90" />
      <ellipse cx="100" cy="100" rx="90" ry="28" />
      <line x1="10" y1="100" x2="190" y2="100" />
      <line x1="100" y1="10" x2="100" y2="190" />
    </svg>
  )
}
