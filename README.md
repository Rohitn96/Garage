# Rudra Motors — pre-launch site

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
| Desktop, motion OK, >4 cores | WebGL scene, scroll-scrubbed explode |
| Phone (<768px) or low-core device | Flat SVG exploded diagram, same scroll behaviour |
| `prefers-reduced-motion: reduce` | No pinning, no scrubbing — static diagram and the full catalogue as a plain grid |

The WebGL path is a progressive enhancement: the server always renders the lightweight
diagram, and three.js is `dynamic(..., { ssr: false })` so it stays out of the initial
bundle (First Load JS is ~190 kB).

## Pricing content

All services live in [data/services.ts](data/services.ts), typed and grouped by car
region. Fixed-price jobs carry `priceFrom`; anything vehicle-dependent sets
`quoteOnly: true` and renders as "Quote on inspection".

`PRICE_DISCLAIMER` is rendered next to the prices in every mode — persistently on
desktop, in the card on mobile, and in the static catalogue.

Because the animated cards only exist once a visitor has scrolled to the right offset,
the full catalogue is **also** rendered `sr-only` in document order, and the animated
stage is `aria-hidden`. Screen readers, crawlers and no-JS visitors get everything;
nothing is announced twice.

## Contact form

Validated with a Zod schema in [lib/bookingSchema.ts](lib/bookingSchema.ts).
Registration numbers are deliberately loose — Finnish plates come in several formats,
and rejecting a real plate is worse than accepting a typo.

The site is a **static export**, so there is no server route. On submit the payload is
`console.log`ged and the success state shown. To send it somewhere real, set
`NEXT_PUBLIC_BOOKING_ENDPOINT` to a form service or Worker URL and the same payload is
POSTed there instead — no other change needed.

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
