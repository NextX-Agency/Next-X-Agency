# NextX Agency

Website for NextX, a digital studio in Paramaribo. Next.js (App Router), Tailwind CSS 4, Framer Motion, COBE.

```bash
pnpm dev      # http://localhost:3000
pnpm lint
pnpm test     # contact API tests
pnpm build
```

## Where things live

| What | File |
| --- | --- |
| Contact details, response time, delivery time, navigation | `src/content/site.ts` |
| Services and prices (the only price list) | `src/content/services.ts` |
| Portfolio projects | `src/content/projects.ts` |
| Example prototypes (fictional businesses) | `src/content/examples.ts` |
| Design tokens, type scale, buttons, fields | `src/app/globals.css` |

Pages under `src/app/(site)` share the header and footer. The prototypes under
`src/app/examples/*` are standalone sites with a small NextX bar on top.

Project screenshots in `public/work` and current demo previews in `public/demo-previews`
are captures of the live sites and prototypes.

The contact form posts to `/api/contact`, which sends mail through Resend
(`RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `CONTACT_TO_EMAIL`).
