import { render } from '@testing-library/react'
import { HorizontalRule } from '../HorizontalRule'

// Mock framer-motion to avoid animation issues in tests
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, className, style, ...props }: any) => (
      <div className={className} style={style}>{children}</div>
    ),
  },
}))

describe('HorizontalRule', () => {
  it('renders without crashing', () => {
    const { container } = render(<HorizontalRule />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it('applies black color by default', () => {
    const { container } = render(<HorizontalRule />)
    const el = container.firstChild as HTMLElement
    expect(el.style.backgroundColor).toBe('var(--atlas-black)')
  })

  it('applies red color when specified', () => {
    const { container } = render(<HorizontalRule color="red" />)
    const el = container.firstChild as HTMLElement
    expect(el.style.backgroundColor).toBe('var(--atlas-red)')
  })

  it('accepts custom className', () => {
    const { container } = render(<HorizontalRule className="my-4" />)
    expect(container.firstChild).toHaveClass('my-4')
  })
})
