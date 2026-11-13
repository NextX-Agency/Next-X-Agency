# NextX design

## Direction

NextX is a design studio and software builder in Paramaribo. The site says three things, in this order: graphic design and branding, web design and development, custom software. Real, live projects carry the proof; experiments are kept visibly separate.

The cleaned vector mark is in `public/logo-agency-white-v2.svg` and `public/logo-agency-black-v2.svg`; the square app icon is `public/nextx-icon-v2.svg`.

The visual language is near-black, warm paper and logo orange (`#ED5F0F`), oversized Archivo, the logo's circuit traces, and large views of real work in CSS device frames. Structure comes from colour blocks, scale and imagery: no hairline rules between items, no numbered indexes, no mono kicker above every heading. Say it in a headline and one short line; if a section needs a paragraph, it probably needs an image instead. Orange is an accent: one primary button per view, the full stop of a headline, one tile. On paper, small orange text uses `--accent-text` to meet AA contrast.

The homepage hero keeps the interactive globe centred on Paramaribo. The headline names the three specialties ("Design, websites en software."). The headline and calls to action remain readable without JavaScript; the globe draws once under reduced motion.

Recurring pieces: `ProjectShowcase` (a full-width stage in the project's own `tone` colour), `ProjectMini` (the same as a small tile), `SpecialtyTiles` (Design, Websites, Software, each illustrated with real work), `ConceptStrip` (all concept demos in one moving, pausable strip) and price tiles on `/services` (`<details>` blocks: name and price up front, inclusions one tap away).

## Content hierarchy

- `src/content/disciplines.ts` holds the three core specialties (`core: true`) and the supporting disciplines (photography and media, marketing). Only the core three appear in the hero, homepage, footer and at the top of `/services`. Supporting disciplines are listed once on `/services` as "Ook mogelijk" and remain selectable in the contact form.
- `/services` follows the specialties: graphic design (fixed prices plus identity on quote), web (subscription or one-time project, with the full price list), software (what we build, how a project runs, quoted per project), then supporting and additional services. `src/content/services.ts` is the single source for prices and inclusions, and the contact form uses the same catalogue.
- `src/content/software.ts` describes custom software and points to behaviour that can be checked in live projects. Add a line there only when the behaviour is visible on the live site.
- Do not invent outcomes, clients, testimonials, team members or statistics. NextX is the single point of contact and may bring in a specialist for a project.

## Work and Conceptlab

"Werk" (`/portfolio`) shows real projects only: client work and NextX's own products, each live and linked. Each project needs a `tagline` (a few words) and a `tone` (background, text colour and whether it is dark) taken from the project's own brand. Projects marked `featured` lead the homepage.

The Conceptlab (`/examples`) holds interactive prototypes for fictional businesses. Every preview carries the label "Fictief merk" and the section copy states that these are not clients. Concepts never appear inside "Werk", and concept imagery is not used to illustrate services; the specialties are illustrated with the NextX identity sheet and screenshots of live projects.

## Motion and performance

Static content renders first. Motion is limited to one entrance (`Reveal`: a short rise and fade), the hero sequence, device frames and tiles that shift on hover, a slight scroll parallax between browser and phone on project stages (`Parallax`), the concept strip, and the circuit traces behind the software statement. All of it has a reduced-motion fallback. Keep images responsive, supply meaningful alt text where images carry information, and avoid loading off-screen media eagerly.
