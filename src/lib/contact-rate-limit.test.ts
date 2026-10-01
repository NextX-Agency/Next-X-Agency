import { beforeEach, describe, expect, it, vi } from 'vitest'
import { checkContactRateLimit } from './contact-rate-limit'

describe('contact rate limiting', () => {
  beforeEach(() => {
    vi.unstubAllEnvs()
    vi.unstubAllGlobals()
    vi.useRealTimers()
  })

  it('allows five submissions per address and permits a new window', async () => {
    vi.stubEnv('UPSTASH_REDIS_REST_URL', '')
    vi.stubEnv('UPSTASH_REDIS_REST_TOKEN', '')
    vi.useFakeTimers()
    for (let i = 0; i < 5; i++) expect((await checkContactRateLimit('local-test')).allowed).toBe(true)
    expect((await checkContactRateLimit('local-test')).allowed).toBe(false)
    expect((await checkContactRateLimit('another-address')).allowed).toBe(true)
    vi.advanceTimersByTime(600001)
    expect((await checkContactRateLimit('local-test')).allowed).toBe(true)
  })

  it('uses an atomic shared counter without storing the raw IP', async () => {
    vi.stubEnv('UPSTASH_REDIS_REST_URL', 'https://redis.example')
    vi.stubEnv('UPSTASH_REDIS_REST_TOKEN', 'test-token')
    const fetcher = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ result: [6, 340] }) })
    vi.stubGlobal('fetch', fetcher)
    expect(await checkContactRateLimit('192.0.2.1')).toEqual({ allowed: false, retryAfter: 340 })
    expect(fetcher.mock.calls[0][1].body).toContain('EVAL')
    expect(fetcher.mock.calls[0][1].body).not.toContain('192.0.2.1')
  })

  it('does not bypass a configured shared limiter on a provider failure', async () => {
    vi.stubEnv('UPSTASH_REDIS_REST_URL', 'https://redis.example')
    vi.stubEnv('UPSTASH_REDIS_REST_TOKEN', 'test-token')
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false }))
    await expect(checkContactRateLimit('192.0.2.2')).rejects.toThrow('unavailable')
  })
})
