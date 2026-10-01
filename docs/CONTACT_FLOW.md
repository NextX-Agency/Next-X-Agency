# Contact flow

The API validates the same fields and limits as the form. It rejects malformed or oversized JSON, unknown services, filled bot fields, invalid phone/email values and cross-origin browser submissions. Optional budget bands accommodate small tasks through projects above $10,000; these are inquiry ranges, not service prices.

Email configuration uses `RESEND_API_KEY`, `RESEND_FROM_EMAIL` and `CONTACT_TO_EMAIL`. A missing API key returns HTTP 503 with direct-contact guidance. Sender and recipient retain their established defaults. No credentials belong in source control.

The server reports success only after Resend returns an agency notification ID. Customer confirmation acceptance is reported separately. Neither response proves final mailbox delivery. Rejected confirmations do not discard an accepted inquiry or prompt a duplicate submission. Provider errors and missing configuration are logged without payloads, email addresses, credentials or provider response bodies.

The form locks submission and fields while sending, keeps the inquiry after failure, and preserves a request ID and submission timestamp on retries. Resend idempotency keys distinguish notification and confirmation; provider idempotency protects retries within its retention window. This is not a permanent submission database.

## Rate limiting on Vercel

Five attempts per address are allowed in ten minutes. Configure both `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` for an atomic shared Redis counter across Vercel instances. IP addresses are hashed before use as Redis keys and expire after the window. A configured limiter failure blocks email submission rather than bypassing the limit.

Without Redis configuration, a bounded in-memory limiter provides per-instance protection only. It resets on cold starts and does not guarantee a global production limit. Production now also has the published Vercel Firewall “Contact requests” rule: exact `/api/contact`, five requests per IP per600-second fixed window, HTTP429. This applies before serverless processing; Vercel counters are regional rather than globally shared. Use Redis for a stricter shared counter. The honeypot and provider idempotency remain available independently.

The address comes from Vercel's forwarded header (or the host proxy's forwarded header elsewhere). Other hosting environments must ensure their proxy overwrites these headers.

## Verification

Contact route/unit checks use mocked Resend responses. Browser checks intercept `/api/contact`, so they send no email. Coverage includes configuration absence, notification rejection, confirmation rejection, malformed data, lengths, bot fields, rate limits, retries, duplicate submission, accurate success text, retained input and WhatsApp fallback. Production credentials and real mailbox delivery require separate controlled verification.
