# Adding genuine portfolio work

Add a record to `src/content/projects.ts` in `projectCatalog`. Keep `status: 'draft'` until the client or rights holder has approved publication. Drafts are filtered by `publishedProjects` and remain excluded from overview pages, static routes and the sitemap.

Use an existing discipline ID and the appropriate presentation: `website`, `software`, `photography`, `branding`, `marketing` or `video`. Only disciplines with published work appear in the portfolio filter. Do not create placeholder published projects to fill empty categories.

Store approved media under `public/work/`. Supply accurate intrinsic `width` and `height`, useful Dutch `alt` descriptions and, when appropriate, a short caption. Galleries preserve source proportions and support keyboard-operated full-screen viewing. Video records should have a poster, descriptive title and caption track for speech; verify playback and accessibility before publishing.

Keep `summary`, `intro`, `contribution` and any `features` factual. Use `origin: 'studio'` for NextX's own products and `origin: 'client'` for commissioned work. Include public client names, URLs and credits only when approved. Contributor names are optional and must remain private unless disclosure is explicitly authorized. Never infer outcomes, testimonials or campaign metrics.

After adding a project, run `pnpm exec tsc --noEmit`, `pnpm test`, `pnpm build` and relevant Playwright portfolio checks. Inspect the overview and case study at 390px and 1440px; confirm image crops, filter behavior, gallery keyboard navigation, video captions and absence of draft URLs in `/sitemap.xml`.
