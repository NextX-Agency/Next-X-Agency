# NextX design

## Source of truth

The visual identity is the one approved by the owner at commit `1ab0bf5` (23 September 2026, "differentiate NextX demos and refresh previews"). Later redesigns (`2897c34`, `b722cd8`) moved away from it and were reverted visually in October 2026; the pre-restoration state is kept on the branch `backup/pre-restore-a5703a4`.

Do not redesign. Refine within this identity:

- Dark, full-height hero with large three-line Archivo display type, the interactive COBE globe held on Paramaribo and lit in the logo orange, CSS-only entrance so the headline never waits on hydration.
- Header that reads the `data-theme` of the section beneath it and switches between the black and white logo; a small orange square marks the active page; full-screen dark mobile menu.
- Projects as editorial compositions, not cards: a large cover with a scroll-linked opening (`CoverReveal`), a second view in the remaining columns, mirrored on alternate projects.
- A typography-led capabilities index with strong dividers and hover-revealed detail.
- The NextX signal: the logo's circuit traces drawn out to the page edges on canvas, with orange pulses (`Signal`, `SignalField`).
- Tokens: paper `#F2F0EB`, ink `#0E0D0C`, orange `#ED5F0F`; Archivo with its width axis, IBM Plex Mono for metadata. One easing, three speeds.

## Business content

Four disciplines: Web & Software, Fotografie & Media, Branding & Design, Marketing (`src/content/disciplines.ts`). Only web packages carry advertised prices; the other disciplines are "Op aanvraag". NextX is the single point of contact and brings in independent specialists per project; copy never claims that everyone is employed in-house and never names contributors.

## Architecture kept from the later work

Flexible project model with draft/published state, optional gallery, phone view, video and technical facts; lightbox gallery; discipline filter on /portfolio (shown once more than one discipline has published work); hardened contact form and API with rate limiting and WhatsApp fallback; metadata and OG image; unit and Playwright tests.

## Motion and performance

Everything is readable without JavaScript and with reduced motion. The globe and signal canvases only render while on screen; under reduced motion the globe draws once and only redraws while being dragged, and the signal shows a still frame. Phones render the globe at a 1.5x backing store. Art-directed covers use one `<picture>` so only the visible image is downloaded.
