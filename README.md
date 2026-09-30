# NextX Agency

Creative and digital studio in Paramaribo. Next.js App Router, React, Tailwind CSS, Motion and COBE. The original NextX identity, contact endpoint, package prices and standalone demos remain in use.

```bash
pnpm install
pnpm dev
pnpm lint
pnpm test
pnpm test:e2e
pnpm build
```

Playwright needs Chromium: `pnpm exec playwright install chromium`. Set `TEST_BASE_URL` to test an already running production build. Set `SCREENSHOT_DIR` to save desktop and mobile screenshots outside the default ignored test directory.

## Content

| Content                                      | Source                       |
| -------------------------------------------- | ---------------------------- |
| Contact details and navigation               | `src/content/site.ts`        |
| Four creative disciplines                    | `src/content/disciplines.ts` |
| Services, package prices and enquiry options | `src/content/services.ts`    |
| Portfolio catalogue                          | `src/content/projects.ts`    |
| Clearly fictional example sites              | `src/content/examples.ts`    |
| Shared visual system                         | `src/app/globals.css`        |

Pages under `src/app/(site)` share the header and footer. Demos under `src/app/examples` retain their independent designs. Design decisions are in [DESIGN.md](DESIGN.md).

## Add a portfolio project

1. Put authorized, optimized images in `public/work/<project-slug>/`. Supply actual dimensions, descriptive Dutch alt text, and optional captions or credits. Avoid baking device frames into photography or brand artwork.
2. Add a `Project` entry to `projectCatalog` in `src/content/projects.ts`. Begin with `status: 'draft'`. Supply slug, index, name, type, discipline, presentation, origin, actual contribution, summary, intro and cover. Choose `origin: 'client'` or `'studio'` accurately. Never invent work, results or testimonials.
3. Choose a discipline: `web-software`, `photography-media`, `branding-design` or `marketing`. Choose a presentation: `website`, `software`, `photography`, `branding`, `marketing` or `video`.
4. Add only relevant facts. Client, year, website URL/host, technology stack, features, gallery and mobile screenshot are optional. Photography uses a responsive photo album; other galleries retain image proportions. Video accepts a source, poster, title and optional WebVTT captions; it uses native controls without autoplay. Optional `seo.title` and `seo.description` override detail-page metadata.
5. Review the real media, factual copy and mobile layout, then set `published`. Published projects automatically appear on the homepage, portfolio, detail routes, next-project navigation and sitemap. Drafts are excluded and return 404. Discipline filters appear only when at least two published disciplines have work.

The public catalogue contains two authentic projects: Shop NextX (our own product) and Indef Design. Future photography, branding or marketing work needs real approved assets; the public site contains no placeholder cases.

## Contact and verification

The form posts to `/api/contact` and sends through Resend with the existing `RESEND_API_KEY`, `RESEND_FROM_EMAIL` and `CONTACT_TO_EMAIL` environment variables. Preserve deployment values. Unit tests cover validation, SDK errors and publication rules. Browser tests cover seven principal routes at 320, 375, 390, 430, 768, 1024 and 1440px, image loading, overflow, automated accessibility, keyboard navigation, reduced motion, gallery focus and mocked form success/failure. Browser tests do not send email. Actual delivery depends on production Resend configuration.
