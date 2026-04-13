interface AtlasMarkProps {
  className?: string
  interactive?: boolean
  detail?: 'minimal' | 'standard' | 'full'
}

export function AtlasMark({
  className = '',
  interactive = false,
  detail = 'standard',
}: AtlasMarkProps) {
  const interactiveClass = interactive
    ? 'hover:text-atlas-red transition-interactive'
    : ''

  if (detail === 'minimal') {
    // Nav-scale — clean, minimal
    return (
      <svg
        viewBox="0 0 64 64"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-label="ATLAS home"
        className={`${interactiveClass} ${className}`}
      >
        <circle cx="32" cy="32" r="30" />
        <line x1="4" y1="32" x2="60" y2="32" />
        <text
          x="32" y="26"
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
        <circle cx="32" cy="46" r="9" />
        <ellipse cx="32" cy="46" rx="16" ry="5" />
        <circle cx="11" cy="20" r="1.5" fill="currentColor" stroke="none" />
        <circle cx="53" cy="20" r="1.5" fill="currentColor" stroke="none" />
        <circle cx="32" cy="8"  r="1"   fill="currentColor" stroke="none" />
      </svg>
    )
  }

  if (detail === 'standard') {
    // Medium placements — double ring, more stars
    return (
      <svg
        viewBox="0 0 64 64"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-label="ATLAS — Web Design & SEO"
        className={`${interactiveClass} ${className}`}
      >
        {/* Outer border ring */}
        <circle cx="32" cy="32" r="30" strokeWidth="2" />
        {/* Inner concentric ring — NASA double-border look */}
        <circle cx="32" cy="32" r="26.5" strokeWidth="0.6" />

        {/* Horizontal divider */}
        <line x1="3.5" y1="32" x2="60.5" y2="32" strokeWidth="1.2" />

        {/* ATLAS wordmark */}
        <text
          x="32" y="27"
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
        <circle cx="32" cy="46" r="9" strokeWidth="1.2" />
        <ellipse cx="32" cy="46" rx="16" ry="5" strokeWidth="1" />
        {/* Sphere center line */}
        <line x1="32" y1="37" x2="32" y2="55" strokeWidth="0.6" />

        {/* Stars / accent dots */}
        <circle cx="11" cy="20" r="1.8" fill="currentColor" stroke="none" />
        <circle cx="53" cy="20" r="1.8" fill="currentColor" stroke="none" />
        <circle cx="32" cy="7.5" r="1.2" fill="currentColor" stroke="none" />
        <circle cx="8"  cy="36" r="0.8" fill="currentColor" stroke="none" />
        <circle cx="56" cy="36" r="0.8" fill="currentColor" stroke="none" />
        {/* Small tick marks on outer ring */}
        <line x1="32" y1="2" x2="32" y2="5" strokeWidth="1" />
        <line x1="32" y1="59" x2="32" y2="62" strokeWidth="1" />
        <line x1="2" y1="32" x2="5" y2="32" strokeWidth="1" />
        <line x1="59" y1="32" x2="62" y2="32" strokeWidth="1" />
      </svg>
    )
  }

  // 'full' — large format, NASA meatball with arc text and full detail
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-label="ATLAS — Web Design & SEO Agency"
      className={`${interactiveClass} ${className}`}
    >
      <defs>
        {/* Arc paths for circular text */}
        <path
          id="atlasUpperArc"
          d="M 18,60 A 42,42 0 0,1 102,60"
        />
        <path
          id="atlasLowerArc"
          d="M 22,60 A 38,38 0 0,0 98,60"
        />
      </defs>

      {/* Outermost border */}
      <circle cx="60" cy="60" r="56" strokeWidth="3" />
      {/* Inner border ring — NASA double-ring */}
      <circle cx="60" cy="60" r="50" strokeWidth="0.8" />
      {/* Second inner ring (tight) */}
      <circle cx="60" cy="60" r="47" strokeWidth="0.4" />

      {/* Cardinal tick marks on outer ring */}
      <line x1="60" y1="4" x2="60" y2="10" strokeWidth="2" />
      <line x1="60" y1="110" x2="60" y2="116" strokeWidth="2" />
      <line x1="4" y1="60" x2="10" y2="60" strokeWidth="2" />
      <line x1="110" y1="60" x2="116" y2="60" strokeWidth="2" />
      {/* Diagonal ticks */}
      <line x1="20" y1="20" x2="24" y2="24" strokeWidth="1" />
      <line x1="96" y1="20" x2="100" y2="24" strokeWidth="1" />
      <line x1="20" y1="96" x2="24" y2="100" strokeWidth="1" />
      <line x1="96" y1="96" x2="100" y2="100" strokeWidth="1" />

      {/* Horizontal divider */}
      <line x1="10" y1="60" x2="110" y2="60" strokeWidth="1.5" />

      {/* — UPPER HALF — */}
      {/* ATLAS wordmark */}
      <text
        x="60" y="50"
        textAnchor="middle"
        fontFamily="'IBM Plex Mono', monospace"
        fontSize="16"
        fontWeight="700"
        fill="currentColor"
        stroke="none"
        letterSpacing="5"
      >
        ATLAS
      </text>

      {/* Circular arc text upper — "WEB DESIGN" */}
      <text
        fontFamily="'IBM Plex Mono', monospace"
        fontSize="5.5"
        fontWeight="400"
        fill="currentColor"
        stroke="none"
        letterSpacing="2"
      >
        <textPath href="#atlasUpperArc" startOffset="50%" textAnchor="middle">
          WEB DESIGN · SEO AGENCY
        </textPath>
      </text>

      {/* Stars — upper half */}
      <circle cx="22" cy="38" r="2.5" fill="currentColor" stroke="none" />
      <circle cx="98" cy="38" r="2.5" fill="currentColor" stroke="none" />
      <circle cx="60" cy="14" r="2" fill="currentColor" stroke="none" />
      <circle cx="38" cy="18" r="1" fill="currentColor" stroke="none" />
      <circle cx="82" cy="18" r="1" fill="currentColor" stroke="none" />
      <circle cx="15" cy="52" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="105" cy="52" r="1.2" fill="currentColor" stroke="none" />

      {/* — LOWER HALF — */}
      {/* Main sphere */}
      <circle cx="60" cy="82" r="17" strokeWidth="1.5" />
      {/* Orbital ring */}
      <ellipse cx="60" cy="82" rx="28" ry="8" strokeWidth="1.2" />
      {/* Sphere latitude lines */}
      <ellipse cx="60" cy="82" rx="17" ry="6" strokeWidth="0.7" />
      <ellipse cx="60" cy="76" rx="13" ry="4" strokeWidth="0.5" />
      {/* Sphere meridian line */}
      <line x1="60" y1="65" x2="60" y2="99" strokeWidth="0.8" />
      {/* Sphere equator */}
      <line x1="43" y1="82" x2="77" y2="82" strokeWidth="0.7" />

      {/* Circular arc text lower — established date */}
      <text
        fontFamily="'IBM Plex Mono', monospace"
        fontSize="5"
        fontWeight="400"
        fill="currentColor"
        stroke="none"
        letterSpacing="2"
      >
        <textPath href="#atlasLowerArc" startOffset="50%" textAnchor="middle">
          EST. MMXXIV
        </textPath>
      </text>
    </svg>
  )
}
