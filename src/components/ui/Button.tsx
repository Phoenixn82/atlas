import Link from 'next/link'

type ButtonVariant = 'primary' | 'ghost'

interface ButtonProps {
  children: React.ReactNode
  variant?: ButtonVariant
  href?: string
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  className?: string
}

export function Button({
  children,
  variant = 'primary',
  href,
  onClick,
  type = 'button',
  disabled = false,
  className = '',
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center px-8 py-4 font-mono text-sm font-semibold uppercase tracking-widest transition-interactive disabled:opacity-50'

  const primaryStyle = {
    backgroundColor: 'var(--atlas-black)',
    color: 'white',
    border: '2px solid var(--atlas-black)',
  }
  const ghostStyle = {
    backgroundColor: 'transparent',
    color: 'var(--atlas-black)',
    border: '2px solid var(--atlas-black)',
  }

  const classes = `${base} group ${className}`

  const style = variant === 'primary' ? primaryStyle : ghostStyle

  if (href) {
    return (
      <Link
        href={href}
        className={classes}
        style={style}
        onMouseEnter={e => {
          const el = e.currentTarget as HTMLElement
          el.style.backgroundColor = 'var(--atlas-red)'
          el.style.borderColor = 'var(--atlas-red)'
          if (variant === 'ghost') el.style.color = 'var(--atlas-red)'
        }}
        onMouseLeave={e => {
          const el = e.currentTarget as HTMLElement
          el.style.backgroundColor = variant === 'primary' ? 'var(--atlas-black)' : 'transparent'
          el.style.borderColor = 'var(--atlas-black)'
          if (variant === 'ghost') el.style.color = 'var(--atlas-black)'
        }}
      >
        {children}
      </Link>
    )
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
      style={style}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLElement
        el.style.backgroundColor = 'var(--atlas-red)'
        el.style.borderColor = 'var(--atlas-red)'
        if (variant === 'ghost') el.style.color = 'var(--atlas-red)'
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLElement
        el.style.backgroundColor = variant === 'primary' ? 'var(--atlas-black)' : 'transparent'
        el.style.borderColor = 'var(--atlas-black)'
        if (variant === 'ghost') el.style.color = 'var(--atlas-black)'
      }}
    >
      {children}
    </button>
  )
}
