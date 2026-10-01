import { describe, it, expect, vi, beforeEach } from 'vitest'
import { NextRequest } from 'next/server'

// ── Mock Resend ──────────────────────────────────────────────────────────────
const mockSend = vi
  .fn()
  .mockResolvedValue({ data: { id: 'mock-email-id' }, error: null })
vi.mock('resend', () => ({
  Resend: vi.fn().mockImplementation(() => ({
    emails: { send: mockSend },
  })),
}))

const mockRateLimit = vi
  .fn()
  .mockResolvedValue({ allowed: true, retryAfter: 600 })
vi.mock('@/lib/contact-rate-limit', () => ({
  checkContactRateLimit: mockRateLimit,
}))

// Import AFTER mocking
const { POST } = await import('@/app/api/contact/route')

// ── Helpers ──────────────────────────────────────────────────────────────────
function makeRequest(body: unknown) {
  return new NextRequest('http://localhost:3000/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
}

const validPayload = {
  name: 'Test User',
  email: 'test@example.com',
  phone: '+597 123456',
  service_type: 'Service Website',
  budget: '$150 – $300',
  message: 'Dit is een testbericht via de contactpagina.',
}

// ── Tests ────────────────────────────────────────────────────────────────────
describe('POST /api/contact', () => {
  beforeEach(() => {
    mockSend.mockReset()
    mockSend.mockResolvedValue({ data: { id: 'mock-email-id' }, error: null })
    mockRateLimit.mockReset()
    mockRateLimit.mockResolvedValue({ allowed: true, retryAfter: 600 })
    // Set env vars for the test environment
    process.env.RESEND_API_KEY = 're_test_key'
    process.env.RESEND_FROM_EMAIL = 'noreply@nextxagency.com'
    process.env.CONTACT_TO_EMAIL = 'agencynextx@gmail.com'
  })

  // ── Validation ─────────────────────────────────────────────────────────────
  it('returns 400 when name is missing', async () => {
    const res = await POST(makeRequest({ ...validPayload, name: '' }))
    expect(res.status).toBe(400)
    const json = await res.json()
    expect(json.error).toBeTruthy()
  })

  it('returns 400 when email is missing', async () => {
    const res = await POST(makeRequest({ ...validPayload, email: '' }))
    expect(res.status).toBe(400)
  })

  it('returns 400 when service_type is missing', async () => {
    const res = await POST(makeRequest({ ...validPayload, service_type: '' }))
    expect(res.status).toBe(400)
  })

  it('returns 400 when message is missing', async () => {
    const res = await POST(makeRequest({ ...validPayload, message: '' }))
    expect(res.status).toBe(400)
  })

  it('returns 400 for invalid email format', async () => {
    const res = await POST(
      makeRequest({ ...validPayload, email: 'not-an-email' }),
    )
    expect(res.status).toBe(400)
    const json = await res.json()
    expect(json.error).toMatch(/e-mailadres/i)
  })

  // ── Happy path ─────────────────────────────────────────────────────────────
  it.each([
    null,
    [],
    { ...validPayload, name: 123 },
    { ...validPayload, phone: {} },
    { ...validPayload, name: '  ' },
    { ...validPayload, message: 'short' },
  ])('rejects invalid payloads before sending mail: %j', async (payload) => {
    const res = await POST(makeRequest(payload))
    expect(res.status).toBe(400)
    expect(mockSend).not.toHaveBeenCalled()
  })

  it('does not report success when Resend returns an error object', async () => {
    mockSend.mockResolvedValueOnce({
      data: null,
      error: { message: 'Delivery rejected' },
    })
    expect((await POST(makeRequest(validPayload))).status).toBe(500)
    expect(mockSend).toHaveBeenCalledTimes(1)
  })

  it('accepts an inquiry for each expanded discipline', async () => {
    for (const service_type of [
      'Web & Software',
      'Fotografie & Media',
      'Branding & Design',
      'Marketing',
    ]) {
      expect(
        (await POST(makeRequest({ ...validPayload, service_type }))).status,
      ).toBe(200)
    }
  })

  it('returns 200 and success:true for valid payload', async () => {
    const res = await POST(makeRequest(validPayload))
    expect(res.status).toBe(200)
    const json = await res.json()
    expect(json.success).toBe(true)
    expect(json.message).toBeTruthy()
    expect(json.notificationAccepted).toBe(true)
    expect(json.confirmationAccepted).toBe(true)
  })

  it('sends two emails: agency notification and client confirmation', async () => {
    await POST(makeRequest(validPayload))
    expect(mockSend).toHaveBeenCalledTimes(2)

    // First call: agency notification
    const agencyCall = mockSend.mock.calls[0][0]
    expect(agencyCall.from).toBe('noreply@nextxagency.com')
    expect(agencyCall.to).toBe('agencynextx@gmail.com')
    expect(agencyCall.replyTo).toBe(validPayload.email)

    // Second call: client confirmation
    const clientCall = mockSend.mock.calls[1][0]
    expect(clientCall.to).toBe(validPayload.email)
  })

  it('agency email subject contains service_type and name', async () => {
    await POST(makeRequest(validPayload))
    const call = mockSend.mock.calls[0][0]
    expect(call.subject).toContain(validPayload.service_type)
    expect(call.subject).toContain(validPayload.name)
  })

  it('agency email HTML contains all form fields', async () => {
    await POST(makeRequest(validPayload))
    const { html } = mockSend.mock.calls[0][0]
    expect(html).toContain(validPayload.name)
    expect(html).toContain(validPayload.email)
    expect(html).toContain(validPayload.phone)
    expect(html).toContain(validPayload.service_type)
    expect(html).toContain(validPayload.budget)
    expect(html).toContain(validPayload.message)
  })

  it('optional phone and budget are omitted from HTML when not provided', async () => {
    const payload = {
      name: validPayload.name,
      email: validPayload.email,
      service_type: validPayload.service_type,
      message: validPayload.message,
    }
    await POST(makeRequest(payload))
    const { html } = mockSend.mock.calls[0][0]
    expect(html).not.toContain('+597')
    expect(html).not.toContain('$150')
  })

  it('still returns 200 when client confirmation email fails', async () => {
    // First call (agency) succeeds, second call (confirmation) fails
    mockSend
      .mockResolvedValueOnce({ data: { id: 'agency-email-id' }, error: null })
      .mockRejectedValueOnce(new Error('Confirmation send failed'))
    const res = await POST(makeRequest(validPayload))
    expect(res.status).toBe(200)
    const json = await res.json()
    expect(json.success).toBe(true)
  })

  // ── Edge case ──────────────────────────────────────────────────────────────
  it('returns 500 when Resend throws', async () => {
    mockSend.mockRejectedValueOnce(new Error('Resend network error'))
    const res = await POST(makeRequest(validPayload))
    expect(res.status).toBe(500)
    const json = await res.json()
    expect(json.error).toBeTruthy()
  })
  it.each(['name', 'email', 'phone', 'service_type', 'budget', 'message'])(
    'rejects excessive %s lengths',
    async (field) => {
      expect(
        (
          await POST(
            makeRequest({ ...validPayload, [field]: 'a'.repeat(5001) }),
          )
        ).status,
      ).toBe(400)
      expect(mockSend).not.toHaveBeenCalled()
    },
  )

  it('rejects malformed JSON without contacting the provider', async () => {
    const request = new NextRequest('http://localhost:3000/api/contact', {
      method: 'POST',
      body: '{',
    })
    expect((await POST(request)).status).toBe(400)
    expect(mockSend).not.toHaveBeenCalled()
  })

  it('rejects an oversized request', async () => {
    expect(
      (await POST(makeRequest({ ...validPayload, message: 'a'.repeat(25000) })))
        .status,
    ).toBe(413)
    expect(mockSend).not.toHaveBeenCalled()
  })

  it('rejects the bot field and unknown services', async () => {
    expect(
      (await POST(makeRequest({ ...validPayload, website: 'spam' }))).status,
    ).toBe(400)
    expect(
      (
        await POST(
          makeRequest({ ...validPayload, service_type: 'Unknown service' }),
        )
      ).status,
    ).toBe(400)
    expect(mockSend).not.toHaveBeenCalled()
  })

  it('returns a useful unavailable response when configuration is missing', async () => {
    delete process.env.RESEND_API_KEY
    const res = await POST(makeRequest(validPayload))
    expect(res.status).toBe(503)
    expect((await res.json()).error).toContain('WhatsApp')
    expect(mockSend).not.toHaveBeenCalled()
  })

  it('limits repeated requests without sending emails', async () => {
    mockRateLimit.mockResolvedValue({ allowed: false, retryAfter: 123 })
    const res = await POST(makeRequest(validPayload))
    expect(res.status).toBe(429)
    expect(res.headers.get('Retry-After')).toBe('123')
    expect(mockSend).not.toHaveBeenCalled()
  })

  it('keeps provider idempotency keys and content stable for retries', async () => {
    const payload = {
      ...validPayload,
      request_id: 'browser-request-123456',
      submitted_at: Date.now(),
    }
    await POST(makeRequest(payload))
    await POST(makeRequest(payload))
    expect(mockSend.mock.calls[0][1]).toEqual(mockSend.mock.calls[2][1])
    expect(mockSend.mock.calls[0][0]).toEqual(mockSend.mock.calls[2][0])
    expect(mockSend.mock.calls[0][1]).not.toEqual(mockSend.mock.calls[1][1])
  })

  it('does not infer provider acceptance without an email id', async () => {
    mockSend.mockResolvedValueOnce({ data: null, error: null })
    expect((await POST(makeRequest(validPayload))).status).toBe(500)
  })

  it('reports provider rejection of confirmation accurately', async () => {
    mockSend
      .mockResolvedValueOnce({ data: { id: 'agency-id' }, error: null })
      .mockResolvedValueOnce({ data: null, error: { message: 'Rejected' } })
    const res = await POST(makeRequest(validPayload))
    expect(res.status).toBe(200)
    expect((await res.json()).confirmationAccepted).toBe(false)
  })

  it('uses current approved branding in both email templates', async () => {
    await POST(makeRequest(validPayload))
    for (const call of mockSend.mock.calls) {
      expect(call[0].html).toContain(
        'https://www.nextxagency.com/logo-agency-black.png',
      )
      expect(call[0].html).not.toContain('logo-light.png')
    }
  })
})
