# QA evidence (2026-10-01)

Baseline screenshots in ignored `test-results/baseline` cover homepage, portfolio, services, Studio, contact, both case studies and examples index at 1440px and 390px. Initial local captures were inspected; retained captures were refreshed from unchanged production after Playwright's old output directory cleared them. Playwright now writes artifacts under `test-results/playwright`, preserving screenshots.

Verified fixes:

- Removed eleven noindex fictional demo URLs from sitemap; retained index, public pages and published work.
- Omitted generated current lastModified timestamps because source modification dates were unavailable.
- Replaced examples index nested main/duplicate main ID with a themed div.
- Studio Vibe title is now h1; viewer handles Escape, contains keyboard focus and restores focus.
- ShopPlaza comparison controls now visibly show original/proposed interfaces with keyboard range support and slider space.

The dedicated 15 quality tests passed in 38 seconds on development. All eleven demos were checked at 320/1440px for route, labels, noindex, image loading, section targets and overflow. Demo openings were visually reviewed at 390px in `test-results/demo-review/contact-sheet.jpg`; distinct designs were preserved. Service presets, discipline anchors, noJS hero/inquiry and demo viewer keyboard behavior were verified. Targeted ESLint and TypeScript passed.

Full development suite: 29 tests passed in 2.1 minutes, including seven main routes at all eight requested widths (320,375,390,430,768,1024,1440,1920), axe WCAG checks at390/1440, menu/gallery keyboard behavior, reduced motion, mocked contact flows, links, draft404 and sitemap. Final desktop/mobile screenshots for all seven main routes were reviewed in `test-results/screenshots`.

Lighthouse13.5 baseline production (single lab run/profile):

| Profile | Performance | Accessibility | SEO | LCP | CLS | TBT | Total bytes |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Mobile | 74 | 100 | 100 | 2.8s | 0 | 960ms | 596KiB |
| Desktop | 99 | 100 | 100 | 0.5s | 0 | 90ms | 673KiB |

Evidence JSONs live in `test-results/baseline/lighthouse-mobile.json` and `lighthouse-desktop.json`. Mobile main-thread work3.9s included1.78s script evaluation and1.02s style/layout; estimated image savings44KiB. These are lab measurements, not field Core Web Vitals or measured INP.

Initial final production-build suite (localhost:3001):26/29 passed. Three demos exposed a production optimizer format-negotiation hang: browser Accept=image/avif,image/webp left optimized desktop image requests pending, while default API Accept returned valid JPEG200 for the same source. Reproduced on a fresh page and without JavaScript; assets were present. Scoped unoptimized to KaderBouw, Studio Vibe and Bloom, preserving media/native lazy loading; main-site media remains optimized. Original local totals: Kader708889bytes, StudioVibe903764bytes, Bloom551013bytes; source widths900-1448px, plus existing Kader1600px stock hero. Rebuilt verification pending.

Production case-opening crops in `test-results/final/case-opening-390.png` and `case-opening-1440.png` confirm contribution separation by a rule and spacing. OGv4 returned200 PNG1200x630 and matched hero composition; a blue emoji arrow was reported for replacement before rebuilding.

Idle local final production Lighthouse13.5: mobile93/accessibility100/SEO100/LCP3.1s/CLS0/TBT110ms; desktop100/accessibility100/SEO100/LCP0.6s/CLS0/TBT0ms. Mobile LCP was hero-wordmark SVG. Localhost versus CDN timing prohibits claiming field LCP improvement. Runs during browser tests were replaced with idle measurements.

Measured transferred baseline production to local-final resources: mobile JavaScript177118 to165939bytes(-6.3%), images84783 to42890(-49.4%); desktop JavaScript177054 to165939(-6.3%), images147000 to66648(-54.7%). Approximately177KB favicon was also transferred per profile and reported for optimization. JSONs in `test-results/final/lighthouse-mobile.json` and `lighthouse-desktop.json`. Final rebuilt suite results will follow.

Final rebuilt production verification: targeted affected demos 3/3 passed (8.4s), then complete suite 29/29 passed (57.3s) on localhost:3001. All native-source imagery in the three affected demos also loaded in a separate 1440px browser check with JavaScript disabled. No failing assertion was removed. Latest full-page screenshots of all seven principal routes at1440/390 were inspected after CSS cleanup, along with320px services opening/package index and Studio opening. Hierarchy, image proportions, content wrapping and case contribution spacing are intact. Current OGv4 is visually verified with plain domain text and no emoji; PNG1200x630 returns200. Favicon optimization keeps the same artwork:64px PNG3178bytes and180px Apple icon11492bytes. The earlier local Lighthouse JSON predates favicon optimization; public post-release measurements should be treated as final performance evidence.
