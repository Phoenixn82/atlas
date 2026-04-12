'use client'

type FilterTag = 'ALL' | 'WEB DESIGN' | 'SEO' | 'BUNDLES'

interface FilterBarProps {
  active: FilterTag
  onChange: (tag: FilterTag) => void
}

const filters: FilterTag[] = ['ALL', 'WEB DESIGN', 'SEO', 'BUNDLES']

export function FilterBar({ active, onChange }: FilterBarProps) {
  return (
    <div className="flex flex-wrap items-center gap-8 mb-16">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => onChange(filter)}
          className="text-sm font-mono uppercase tracking-widest transition-interactive pb-1"
          style={{
            color: active === filter ? 'var(--atlas-black)' : 'var(--atlas-gray-500)',
            borderBottom: active === filter
              ? '2px solid var(--atlas-black)'
              : '2px solid transparent',
          }}
          onMouseEnter={e => {
            if (active !== filter) {
              (e.currentTarget as HTMLElement).style.color = 'var(--atlas-red)'
            }
          }}
          onMouseLeave={e => {
            if (active !== filter) {
              (e.currentTarget as HTMLElement).style.color = 'var(--atlas-gray-500)'
            }
          }}
        >
          {filter}
        </button>
      ))}
    </div>
  )
}
