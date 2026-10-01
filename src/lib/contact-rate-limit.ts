import { createHash } from 'node:crypto'

const WINDOW = 10 * 60
const LIMIT = 5
const local = new Map<string, { count: number; expires: number }>()

/** Distributed when Upstash is configured; the bounded fallback is per server instance. */
export async function checkContactRateLimit(
  ip: string,
): Promise<{ allowed: boolean; retryAfter: number }> {
  const key = `contact:${createHash('sha256').update(ip).digest('hex')}`
  const url = process.env.UPSTASH_REDIS_REST_URL
  const token = process.env.UPSTASH_REDIS_REST_TOKEN
  if (url && token) {
    const response = await fetch(url.replace(/\/$/, ''), {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([
        'EVAL',
        "local n = redis.call('INCR', KEYS[1]); if n == 1 then redis.call('EXPIRE', KEYS[1], ARGV[1]) end; return {n, redis.call('TTL', KEYS[1])}",
        '1',
        key,
        String(WINDOW),
      ]),
      signal: AbortSignal.timeout(3000),
      cache: 'no-store',
    })
    if (!response.ok) throw new Error('Contact rate limit unavailable')
    const data = (await response.json()) as { result?: number[] }
    if (!data.result || data.result.length !== 2)
      throw new Error('Invalid rate limit response')
    return {
      allowed: data.result[0] <= LIMIT,
      retryAfter: Math.max(1, data.result[1]),
    }
  }
  const now = Date.now()
  for (const [entry, value] of local)
    if (value.expires <= now) local.delete(entry)
  if (local.size >= 5000 && !local.has(key))
    local.delete(local.keys().next().value!)
  const value = local.get(key) ?? { count: 0, expires: now + WINDOW * 1000 }
  value.count += 1
  local.set(key, value)
  return {
    allowed: value.count <= LIMIT,
    retryAfter: Math.max(1, Math.ceil((value.expires - now) / 1000)),
  }
}
