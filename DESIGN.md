# NextX design

## Direction

NextX is a creative and digital studio in Paramaribo. The site should make the work visible immediately and explain how to engage the studio without asking visitors to decode a long catalogue.

The October 2026 redesign uses the supplied NextX logo as its starting point. The cleaned vector mark is in `public/logo-agency-white-v2.svg` and `public/logo-agency-black-v2.svg`; the square app icon is `public/nextx-icon-v2.svg`. Use these assets on new NextX pages.

The visual language is near-black, warm paper and logo orange (`#ED5F0F`), oversized Archivo, IBM Plex Mono for small factual labels, circuit traces, and large views of working concept demos. Use editorial image compositions rather than generic card towers, ornamental counters or stock team photography. Respect reduced motion and keep all text readable without JavaScript.

The homepage hero uses the interactive Paramaribo globe from the original NextX design. The Concept Lab follows immediately below, where fictional status is visible beside each demo preview. Motion is a short entrance sequence and reveal of concept cards as they enter view. The headline and calls to action remain readable without JavaScript; the globe draws once under reduced motion.

## Content hierarchy

The main paths on `/services` are:

- A monthly website subscription: Landing Page, Starter, Growth and Premium. The website is built in the subscription and maintenance, bug fixes and a defined monthly change allowance are included. The exact plans and rules live in `src/content/services.ts`.
- A one-time website or webshop with an agreed scope and starting price.
- Creative production: custom software, photography and media, branding and design, and marketing, scoped and quoted per project.

Supporting offers such as SEO, hosting, SLA, UX Kukru and extra work remain accessible below those paths. `src/content/services.ts` is the single source for prices and inclusions, and the contact form uses the same catalogue. Do not invent outcomes, clients, testimonials or team structure. NextX is the single point of contact and may coordinate independent specialists for a project.

## Work and prototypes

NextX is a new studio and does not claim an established portfolio. The `/portfolio` landing page leads with the Concept Lab: curated, interactive prototypes for fictional businesses. The fictional status must be visible next to each preview and each demo. Existing real work remains accessible at its original URL but is secondary to the demonstrations. When a concept image is used to show visual direction, describe it as a concept, not a delivered client project.

## Motion and performance

Static content renders first. Image compositions may use short entrance and hover motion, with a reduced-motion fallback. Keep art-directed images responsive, supply meaningful alt text where images carry information, and avoid loading off-screen media eagerly. The globe and signal canvas remain available only where they serve the visual story.
