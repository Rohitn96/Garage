# Revamp Motors — pre-launch site

Single-page teaser for a garage opening in Vantaa. Dry run: **every price is invented**
and the business is not trading.

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # static export -> ./out
npm run typecheck    # tsc --noEmit
npm run deploy       # build + push to Cloudflare Workers
```

## Deploying to Cloudflare

`next build` writes a static site to `out/`, and [wrangler.jsonc](wrangler.jsonc)
serves that directory as an assets-only Worker. In the Cloudflare dashboard the build
settings must be:

| Setting | Value |
|---|---|
| Build command | `npm run build` |
| Deploy command | `npx wrangler deploy` |
| Root directory | `/` |

The Worker `name` in `wrangler.jsonc` must match the existing project (`garage`),
otherwise a second Worker is created.

## Stack

Next.js 15 (App Router) · TypeScript · Tailwind · React Three Fiber · Framer Motion ·
React Hook Form + Zod.

Framer Motion is the **only** animation driver — no GSAP. The pinned car section uses
`useScroll` on a tall track with a `sticky` stage, which does the same job as
ScrollTrigger's pinning without a second animation system.

## The car

Procedurally built from boxes and cylinders in [components/car/carParts.ts](components/car/carParts.ts) —
no external model, nothing to license. Each part declares the service region it belongs
to and the direction it travels when the view explodes.

Three renderings of the same content, chosen at runtime by
[lib/useMotionPreference.ts](lib/useMotionPreference.ts):

| Visitor | What they get |
|---|---|
| Desktop, motion OK | WebGL scene, scroll-scrubbed explode, service names projected from each part |
| Phone, motion OK | The same WebGL scene, framed for portrait, names as a block at the foot of the stage |
| `prefers-reduced-motion: reduce`, or <4 cores | No pinning, no scrubbing — static SVG diagram and the full catalogue as a plain grid |

Phones get the real 3D. The flat diagram was a poor substitute for the thing that
makes the page worth visiting, and this scene (~34 primitives, no textures, no
post-processing) fits a modern phone's budget once DPR is capped at 1.5.

The WebGL path is a progressive enhancement: the server always renders the lightweight
diagram, and three.js is `dynamic(..., { ssr: false })` so it stays out of the initial
bundle (First Load JS is ~190 kB).

## Pricing content

All services live in [data/services.ts](data/services.ts), typed and grouped by car
region. Fixed-price jobs carry `priceFrom`; anything vehicle-dependent sets
`quoteOnly: true` and renders as "Quote on inspection".

`PRICE_DISCLAIMER` is rendered next to the prices in every mode — persistently on
desktop, in the card on mobile, and in the static catalogue.

Because the animated callouts only exist once a visitor has scrolled to the right
offset, the full catalogue is **also** rendered `sr-only` in document order, and the
animated stage is `aria-hidden`. Screen readers, crawlers and no-JS visitors get
everything; nothing is announced twice.

### Prices are anchored to parts, and nothing nests a scrollbar

There is exactly one scrollable element in this section: the page. Prices for the
focused region render as a compact callout pinned to that region's part with a short
pointer line — inside the canvas via drei's `<Html>` for the WebGL path (nested in the
part's mesh, so it tracks the explode for free), and under the diagram via
`DiagramStage` for the flat one. Both use the same `Callout`, which has no
max-height and no overflow by design.

At 375px the card stays centred and the *connector* moves to the part instead; a card
nudged toward its part runs straight off a phone viewport.

Track length is viewport-dependent: `h-[470vh] md:h-[720vh]` — roughly 4.7 screens on
a phone against 7.2 on desktop. The scroll fractions are proportional, so the region
timing holds at either height.

## Contact form

Validated with a Zod schema in [lib/bookingSchema.ts](lib/bookingSchema.ts).
Registration numbers are deliberately loose — Finnish plates come in several formats,
and rejecting a real plate is worse than accepting a typo.

The site is a **static export**, so there is no server route. On submit the payload is
`console.log`ged and the success state shown. To send it somewhere real, set
`NEXT_PUBLIC_BOOKING_ENDPOINT` to a form service or Worker URL and the same payload is
POSTed there instead — no other change needed.

## Design

Light editorial / Swiss: warm paper ground (`#F4F2EC`), near-black ink, one deep
pine accent (`#1B5E43`) chosen with an eventual EV positioning in mind. Instrument
Serif for display, IBM Plex Sans for text, IBM Plex Mono for labels and numbers.

Strict grid, hairline rules, numbered sections, no cards, no pill buttons, no
gradients. The car became a dark object on a pale studio backdrop, which reads
like product photography rather than a dark-mode hero.

There is no hero background image.

## Prices

Not rendered anywhere. `priceFrom` / `quoteOnly` stay in
[data/services.ts](data/services.ts) as the catalogue's eventual source of truth,
but the site shows service names only — in the scroll labels, the `sr-only`
catalogue and the reduced-motion list alike, so no audience sees figures another
does not.

**If you turn prices back on, put a visible "indicative only" disclaimer next to
them before any placeholder figure reaches a screen.** That is why the disclaimer
existed and why it was removed with them.

## Known placeholders

- Address, phone and email are `[TBA]` in the footer.
- Warranty terms in the trust section are marked `[Placeholder]`.
- The page is `noindex` while pre-launch — remove `robots` in
  [app/layout.tsx](app/layout.tsx) before going live.
- Two alternative taglines are listed in a comment at the top of
  [components/Hero.tsx](components/Hero.tsx).

## Note on TypeScript

Pinned to `typescript@5`. TypeScript 7 (the native port) installs by default from
`typescript@latest` and Next 15.5 cannot read `tsconfig.json` through its API — the
`@/*` path alias silently stops resolving and `next-env.d.ts` is never generated.
