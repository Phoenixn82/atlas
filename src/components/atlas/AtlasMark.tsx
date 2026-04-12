interface AtlasMarkProps {
  className?: string
  interactive?: boolean
}

export function AtlasMark({ className = '', interactive = false }: AtlasMarkProps) {
  return (
    <svg
      viewBox="0 0 24 40"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-label="ATLAS home"
      className={`${interactive ? 'hover:text-atlas-red transition-interactive' : ''} ${className}`}
    >
      {/* Sphere */}
      <circle cx="12" cy="8" r="6" />
      {/* Head — peeking below sphere */}
      <circle cx="12" cy="18" r="2" />
      {/* Arms reaching up to sphere */}
      <path d="M4 24 L12 16 L20 24" />
      {/* Torso */}
      <line x1="12" y1="20" x2="12" y2="30" />
      {/* Legs */}
      <path d="M12 30 L7 39 M12 30 L17 39" />
    </svg>
  )
}
