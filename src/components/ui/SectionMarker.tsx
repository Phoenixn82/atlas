interface SectionMarkerProps {
  number: string
  label: string
  className?: string
}

export function SectionMarker({ number, label, className = '' }: SectionMarkerProps) {
  return (
    <div
      className={`flex items-center gap-3 text-xs font-mono uppercase tracking-widest ${className}`}
      style={{ color: 'var(--atlas-gray-500)' }}
    >
      <span>{number}</span>
      <span className="w-6 h-[1px]" style={{ backgroundColor: 'var(--atlas-gray-500)' }} />
      <span>{label}</span>
    </div>
  )
}
