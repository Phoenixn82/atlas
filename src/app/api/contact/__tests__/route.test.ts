/**
 * @jest-environment node
 */
import { POST } from '../route'
import { NextRequest } from 'next/server'

jest.mock('resend', () => ({
  Resend: jest.fn().mockImplementation(() => ({
    emails: {
      send: jest.fn().mockResolvedValue({ data: { id: 'test-id' }, error: null }),
    },
  })),
}))

const makeRequest = (body: unknown) =>
  new NextRequest('http://localhost:3000/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

const validBody = {
  name: 'Jane Smith',
  email: 'jane@example.com',
  company: 'ACME',
  service: 'web-design',
  message: 'This is a test message that is long enough.',
}

describe('POST /api/contact', () => {
  beforeEach(() => {
    process.env.RESEND_API_KEY = 'test-key'
    process.env.CONTACT_EMAIL = 'hello@atlasagency.com'
  })

  it('returns 200 with valid body', async () => {
    const res = await POST(makeRequest(validBody))
    expect(res.status).toBe(200)
    const json = await res.json()
    expect(json.success).toBe(true)
  })

  it('returns 400 with invalid body', async () => {
    const res = await POST(makeRequest({ name: 'J', email: 'bad' }))
    expect(res.status).toBe(400)
    const json = await res.json()
    expect(json.error).toBeDefined()
  })

  it('returns 400 for empty body', async () => {
    const res = await POST(makeRequest({}))
    expect(res.status).toBe(400)
  })
})
