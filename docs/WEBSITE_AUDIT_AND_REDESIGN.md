# Website audit and redesign — 1 October 2026

## Verified baseline

The repository and production deployment both started at `2897c346c3c64bfc2e884c22ffc6c6109bdbdcd2`. GitHub confirms the existing remote redirects to NextX-Agency/Next-X-Agency; main was synchronized. The untracked `.claude/` directory belongs to the existing workspace and is excluded from this release.

Verified issues: duplicated hero/selected-work imagery; Studio repeating the homepage's Studio and Process components; eleven noindex fictional demos in the sitemap; fabricated current sitemap modification dates; nested main/id=main on the examples index; legacy email logo; missing input lengths, bot protection, rate limiting and retry idempotency; unconditional customer-confirmation promise. Production Vercel logs showed two POST /api/contact 500 responses with “Missing API key” on the baseline deployment. The signed-in dashboard confirmed no project environment variables.

## Art direction and implementation

Three directions were considered: typography-led editorial, NextX brand/technology, and immersive portfolio. The chosen brand/technology direction uses the approved original circuit logo prominently, paper and ink surfaces, restrained orange, Archivo and IBM Plex Mono. Dutch opening: “Ideeën krijgen vorm.” A distinct brand panel replaces duplicated project screenshots; selected work becomes an alternating image-and-copy sequence preserving source ratios. The homepage studio section and process use concise location and production indexes.

[Studio Dumbar](https://studiodumbar.com/) informed the attention given to the work; [Build in Amsterdam](https://www.buildinamsterdam.com/) informed the relationship between brand and digital production. These are design references, not copied assets or layouts. The judgment that the redesign is stronger is subjective; route, layout and accessibility results below are verified.

Updated homepage, portfolio overview, both genuine case studies, Services, Studio, contact flow, footer and social preview. Case studies foreground the real NextX contribution, separate story/facts and introduce the gallery. Services separates four capabilities from centralized priced packages; no prices or legitimate project records changed. Studio explains origins, technical foundation and private specialist coordination without inventing staff, credentials or achievements. Photography/branding work remains unpublished until real approved media exists.

The portfolio retains draft/published filtering, React Photo Album, Yet Another React Lightbox, attribution fields and six media presentations. See [portfolio authoring](PORTFOLIO_AUTHORING.md). Removed unused globe/COBE, CoverReveal and useMediaQuery; removed the site-wide MotionConfig provider because the main pages use CSS feedback and the gallery handles reduced motion directly. No dependencies added.

## Contact and hosting

Shared validation, limits, honeypot, origin checks, bounded rate limiter and provider idempotency protect inquiries. Inputs and request identity survive retry; duplicate clicks are locked. Success requires a Resend agency notification ID; customer confirmation acceptance is separate from final mailbox delivery. Missing configuration returns useful HTTP 503 guidance and direct contact remains available. Budget ranges are optional inquiry bands, not new service prices.

After the owner signed into the project account, the existing local RESEND_API_KEY, RESEND_FROM_EMAIL and CONTACT_TO_EMAIL were securely saved as Production secrets in Vercel. Values were never printed or committed. A read-only Resend domain query returned HTTP 200 and confirmed the configured sender domain is verified and notification recipient matches the public agency contact.

A Vercel Firewall rule named “Contact requests” was published for exact /api/contact, fixed window of 600 seconds, five requests per IP, HTTP 429 response. This provides hosting-level protection across function instances; Vercel counters are regional, as described in [its documentation](https://vercel.com/docs/vercel-firewall/vercel-waf/rate-limiting). The optional shared Redis limiter remains supported for strict shared limits. See [contact details](CONTACT_FLOW.md). Live send/delivery verification is recorded below after deployment.

## Visual and technical verification

Baseline desktop (1440px) and mobile (390px) screenshots were captured and inspected. Initial implementation captures were reviewed; a second iteration corrected service index alignment, opening/work hierarchy, gallery story organization and social-preview emoji. Final screenshots cover all seven principal routes at desktop/mobile. Browser automation used installed Playwright Chromium because agent-browser was unavailable.

- TypeScript, ESLint and production build passed.
- Vitest: 57/57 passed, including mocked notification/confirmation errors, missing configuration, validation, bot/rate limits and stable idempotency.
- Development Playwright: 29/29 passed. Seven principal routes × eight widths (320,375,390,430,768,1024,1440,1920); fourteen axe scans; keyboard menu/gallery, reduced motion, no-JavaScript hero/navigation, contact mocks, links, images and draft 404.
- Eleven fictional demos audited at 320/1440px and visually reviewed. Corrected Studio Vibe's h1/modal keyboard handling and ShopPlaza's inert comparison controls. No broad demo redesign.
- The initial optimized production suite passed 26/29. Three demos exposed stalled local AVIF/WebP optimizer responses; serving their existing media directly fixed the targeted 3/3 checks. Independent viewport pages retain all image assertions. The rebuilt complete production suite passed29/29 in57.3s; no-JavaScript image checks passed for all three affected demos. Fourteen final main-route desktop/mobile screenshots and320px Services/Studio captures were visually inspected.

Evidence files are ignored under test-results/baseline, initial, initial-pages, final and deployment. [QA details](QA_EVIDENCE.md) records methods and limitations.

## Performance

Lighthouse 13.5 baseline, one run per profile against the original public production:

| Profile | Performance | LCP | CLS | TBT | Total transferred |
| --- | --- | --- | --- | --- | --- |
| Mobile |74 |2.8s |0 |960ms |596KiB |
| Desktop |99 |0.5s |0 |90ms |673KiB |

Baseline mobile main-thread work of 3.9s included 1.78s script evaluation and 1.02s style/layout. Lighthouse estimated 44KiB image sizing savings. The revised build removes duplicate hero imagery, corrects cover sizes and eliminates unnecessary homepage animation/globe code. Measurement also found a 176,607-byte favicon: the same artwork now has a 3,178-byte 64px favicon and 11,492-byte 180px Apple icon; the original remains available for compatibility. Final measured results follow after public production runs. Lighthouse/TBT are lab measurements; no field INP or CrUX results are claimed.

## Release verification

Production email settings and Firewall are configured; the implementation has not yet been pushed at this report's initial commit. Main is the authorized release target. Remote commit SHA, Vercel READY deployment, production route/design/metadata checks and any controlled contact test will be appended after release.

## Limits

No fake projects, contributors, testimonials, results or prices were introduced. No permanent inquiry database was added: provider idempotency follows its retention window. Mailbox receipt cannot be inferred from a successful build, HTTP 200 or provider acceptance. Field Core Web Vitals need representative production traffic. Future contributor media still needs rights and publication approval.
