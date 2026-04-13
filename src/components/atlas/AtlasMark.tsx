interface AtlasMarkProps {
  className?: string
  interactive?: boolean
}

export function AtlasMark({ className = '', interactive = false }: AtlasMarkProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-label="ATLAS home"
      className={`${interactive ? 'hover:text-atlas-red transition-interactive' : ''} ${className}`}
    >
      {/* Outer badge circle */}
      <circle cx="32" cy="32" r="30" />

      {/* Horizontal divider */}
      <line x1="4" y1="32" x2="60" y2="32" />

      {/* ATLAS wordmark — upper half */}
      <text
        x="32"
        y="26"
        textAnchor="middle"
        fontFamily="'IBM Plex Mono', monospace"
        fontSize="9"
        fontWeight="700"
        fill="currentColor"
        stroke="none"
        letterSpacing="3"
      >
        ATLAS
      </text>

      {/* Sphere — lower half */}
      <circle cx="32" cy="46" r="9" />

      {/* Orbital ellipse across sphere */}
      <ellipse cx="32" cy="46" rx="16" ry="5" />

      {/* Accent stars */}
      <circle cx="11" cy="20" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="53" cy="20" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="32" cy="8"  r="1"   fill="currentColor" stroke="none" />
    </svg>
  )
}
