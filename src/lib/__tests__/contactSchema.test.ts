import { contactSchema } from '../contactSchema'

const valid = {
  name: 'Jane Smith',
  email: 'jane@example.com',
  company: 'ACME',
  service: 'web-design' as const,
  message: 'This is a long enough message for the test.',
}

describe('contactSchema', () => {
  it('accepts valid data', () => {
    expect(contactSchema.safeParse(valid).success).toBe(true)
  })

  it('accepts valid data without company', () => {
    const { company, ...noCompany } = valid
    expect(contactSchema.safeParse(noCompany).success).toBe(true)
  })

  it('rejects name shorter than 2 chars', () => {
    expect(contactSchema.safeParse({ ...valid, name: 'J' }).success).toBe(false)
  })

  it('rejects invalid email', () => {
    expect(contactSchema.safeParse({ ...valid, email: 'not-an-email' }).success).toBe(false)
  })

  it('rejects message shorter than 10 chars', () => {
    expect(contactSchema.safeParse({ ...valid, message: 'Short' }).success).toBe(false)
  })

  it('rejects invalid service enum', () => {
    expect(contactSchema.safeParse({ ...valid, service: 'invalid' }).success).toBe(false)
  })

  it('accepts all four service values', () => {
    for (const service of ['web-design', 'seo', 'bundle', 'not-sure'] as const) {
      expect(contactSchema.safeParse({ ...valid, service }).success).toBe(true)
    }
  })
})
