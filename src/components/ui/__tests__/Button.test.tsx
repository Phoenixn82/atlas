import { render, screen } from '@testing-library/react'
import { Button } from '../Button'

describe('Button', () => {
  it('renders label text', () => {
    render(<Button>BOOK A CALL</Button>)
    expect(screen.getByText('BOOK A CALL')).toBeInTheDocument()
  })

  it('renders as a link when href provided', () => {
    render(<Button href="/contact">CONTACT</Button>)
    expect(screen.getByRole('link')).toHaveAttribute('href', '/contact')
  })

  it('renders as button when no href', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('applies primary styles by default', () => {
    const { container } = render(<Button>Primary</Button>)
    const el = container.firstChild as HTMLElement
    expect(el.style.backgroundColor).toBe('var(--atlas-black)')
  })
})
