import { render, screen } from '@testing-library/react'
import { SectionReveal } from '../SectionReveal'

jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, className, ...props }: any) => (
      <div className={className}>{children}</div>
    ),
  },
}))

describe('SectionReveal', () => {
  it('renders children', () => {
    render(
      <SectionReveal>
        <p>Test content</p>
      </SectionReveal>
    )
    expect(screen.getByText('Test content')).toBeInTheDocument()
  })

  it('applies className to wrapper', () => {
    const { container } = render(
      <SectionReveal className="test-class">
        <span>hi</span>
      </SectionReveal>
    )
    expect(container.firstChild).toHaveClass('test-class')
  })
})
