# Revamp Motors

Two-page site for **Revamp Motors** — an independent Tesla / EV specialist that also
does general repair, at Kytkintie 38, 00770 Helsinki (Tattarisuo), **opening the
first week of October**.

⚠️ **Every price on the site is still a placeholder.** See *Prices* below.

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
React Hook Form + Zod. Framer Motion is the **only** animation driver — no GSAP.

## Structure

```
/            Hero → 3D explorer → the fork → pricing → why → process → contact
/tesla/      S3XY picker → filtered services → Finnish winter → FAQ → Tesla prices → contact
/fi/         the same, in Finnish
/fi/tesla/
```

[components/Nav.tsx](components/Nav.tsx) is fixed and shared. Its links are absolute
(`/#pricing`, not `#pricing`) so the same bar works from `/tesla/`, and every one is
run through `useHref()` so it lands in the right language tree.

## Language

**Finnish is a route, not a setting.** English at `/`, Finnish under `/fi/`.

It used to be a `localStorage` flag: English was always what the server rendered, and a
returning Finnish visitor got a one-frame swap after mount. Three consequences, which
are why it was rewritten:

- a Finnish page could not be linked, shared or bookmarked as Finnish
- search engines only ever saw the English copy — a customer searching
  *"Tesla huolto Helsinki"* could not find the site at all
- `<html lang>` was corrected by an effect, after the markup had claimed English

For a garage in Helsinki the Finnish copy is the more commercially important of the
two, so each language now has its own root layout (`app/(en)` and `app/(fi)`), its own
`<html lang>`, its own `<title>`/description, and the two are cross-declared with
`hreflang` in both the page head and the sitemap — that is what stops them competing
with each other in the index.

There is deliberately no `setLang`. The EN/FI control is a pair of links, because
switching language is navigation; a control that changed state without changing the URL
would throw away everything above.

Page bodies live in [components/pages/](components/pages/) and are rendered by all four
routes, so there is one copy of the layout and only the language context and metadata
differ. Every visible string is in [lib/content.ts](lib/content.ts) and
[data/tesla.ts](data/tesla.ts) in both languages — including the skip link and the
metadata, which are the two that usually get missed.

## The car

Procedurally built from boxes and cylinders in
[components/car/carParts.ts](components/car/carParts.ts) — no external model, nothing
to license.

It is an **EV**: a skateboard battery pack spanning the wheelbase, two drive units on
the axles, a frunk lid, a fastback roofline and a full-length glass roof. It replaced a
three-box combustion saloon with an engine block, a timing belt and a muffler, which
meant the centrepiece of a Tesla-first garage's site was an internal combustion sedan.

### Transparent shell

Parts carry `layer: "shell" | "inner"`. The bodywork renders as tinted glass with a
drawn edge (drei `<Edges>`) so the mechanicals inside stay legible without taking the
shell off. Two things make that work, and both are easy to get wrong:

- **`depthWrite={false}`** on the shell. A transparent surface that writes depth
  occludes everything drawn after it regardless of its own opacity — with depth writing
  on, the near side of the body silently swallows half the car.
- **`renderOrder`**. Transparent surfaces composite in draw order, so the shell must be
  drawn after every opaque part or it blends against whatever happened to be behind it
  and parts flicker as the car turns.

`FrontSide`, not `DoubleSide`: with both faces drawn the far wall of the shell blends
over the near one and the body turns milky.

### Geometry

The body is a single extruded **silhouette** — drawn the way you would sketch a car in
side view, wheel arches included — not a pile of primitives. Three passes over the
position buffer then turn that flat slab into a body:

| pass | what it does |
|---|---|
| plan taper | narrows Z toward both bumpers, so the extrusion stops reading end-on as a slab |
| tumblehome | narrows Z toward the roof, giving the cabin its lean and the body its waist |
| shoulder crown | a slight barrel through the middle, so the flank catches a moving highlight |

Tyres are lathes, not cylinders — a cylinder has a hard 90° edge where tread meets
sidewall, and the shoulder radius is exactly where the highlight sits. Rims, the battery
pack, drive units, discs and calipers are each merged into one geometry, so four wheels
are four draw calls rather than forty.

**No drawn edges.** Outlining the shell was tried and abandoned: lofting bends the
extrusion's flat side caps into curved surfaces, so the fan of triangles they were built
from stops being coplanar and every internal seam becomes an "edge". No threshold
separates those seams from real creases, because near the nose the taper makes them just
as steep.

### Interaction

**One continuous scroll.** The track is ~520vh; the car and the service panel are driven
by the same scroll value. Within each system's slice `openness` ramps over the first 40%
and then holds, so the scroll IS the movement — stop halfway and the part sits halfway
out. The whole car also yaws slowly across the entire track, which is what makes six
systems read as one move instead of six events.

Clicking was tried and removed: a click is more effort than a scroll for something you
are reading top to bottom, and it meant the visitor had to decide what to open before
they knew what was inside. The earlier 720vh version failed for the opposite reason —
it was so long that scrolling to read pushed you off the thing you were reading.

Because the visible content is scroll-dependent again, the full catalogue is also
rendered `sr-only` in document order, and the stage is `aria-hidden`. Screen readers,
crawlers and no-JS visitors get everything; nothing is announced twice.

`prefers-reduced-motion` or fewer than 4 cores gets no canvas at all — see
[lib/useMotionPreference.ts](lib/useMotionPreference.ts). The list beside the stage is
the content and is complete on its own, which is why the old static SVG diagram
(`ExplodedDiagram`) could be deleted rather than maintained as a second rendering.

### Performance

- **No shadow maps.** `shadows={false}` on the Canvas; drei `<ContactShadows>` grounds
  the car for a fraction of the cost and reads better on a dark floor.
- **The render loop stops when the section scrolls out of view** (`frameloop="never"`),
  which on a page this long is most of the visit.
- **Procedural environment map.** drei's `preset="warehouse"` fetches an HDR from a CDN
  at runtime; `<Environment>` with `<Lightformer>` children bakes the same thing into a
  128px cube map, rendered once. It matters — every material here is metal, and metal
  with nothing to reflect renders flat grey no matter how many lamps you point at it.
- DPR capped at 1.5 on phones.

## S3XY

[data/tesla.ts](data/tesla.ts) declares which models each service applies to, and the
picker in [components/tesla/ModelPicker.tsx](components/tesla/ModelPicker.tsx) filters
the list to the selected letter — Model 3 and Y get control arms, S and X get air
suspension. The joke is why it is memorable; it earns its place because owners
genuinely identify by letter, so four letters beat a dropdown.

## Prices

**One table, one place**: [data/pricing.ts](data/pricing.ts), rendered only by
[components/Pricing.tsx](components/Pricing.tsx). The 3D explorer names services and
prices none of them.

Previously prices lived in two places with two shapes — unrendered `priceFrom` fields
on the service catalogue, and a hardcoded five-row array inside the trust section — so
the page quoted a Tesla package in one breath and listed twenty unpriced services in
the next.

Deliberately **five rows and generic**. A grouped, tabbed, forty-row table was built
here and pulled: before the shop has traded a day, a long price list is a long list of
numbers nobody has tested, and every row is a promise. The detailed version goes back in
when there are real rates behind it.

⚠️ The five are still indicative. The "indicative only" disclaimer renders directly
under them and must stay there.

## Contact form

Validated with a Zod schema in [lib/bookingSchema.ts](lib/bookingSchema.ts) and posted
to Formspree — the site is a static export, so there is no server route. The endpoint id
is public by design and ships in the HTML of every Formspree form;
`NEXT_PUBLIC_FORMSPREE_ENDPOINT` overrides it for preview builds.

The plate field became a free-text **vehicle** field ("Tesla Model 3, 2021 — or
ABC-123"). Sending a pre-launch visitor off to find their registration is a barrier at
exactly the wrong moment.

Formspree rejects posts with no Origin header; browsers always send one, curl does not,
so test with `-H "Origin: https://revampmotors.fi"` or it will look broken when it is not.

## Hero video

`public/videos/hero.mp4` is the file that ships. The 4K master in the repo root is
gitignored — **editing the master changes nothing until it is re-encoded**, which is how
a new hero sat unused for a while.

```bash
GRADE="eq=saturation=0.30:contrast=1.10:brightness=0.012,colorbalance=rs=-0.03:rm=-0.05:bm=0.06:bh=0.04,gradfun=strength=1.2:radius=16"

ffmpeg -i hero.mp4 -vf "scale=1600:-2:flags=lanczos,$GRADE"   -c:v libx264 -crf 27 -preset slow -pix_fmt yuv420p -movflags +faststart -an   public/videos/hero.mp4

ffmpeg -ss 11 -i hero.mp4 -vframes 1 -vf "scale=1600:-2,$GRADE" -q:v 6   public/videos/hero-poster.jpg
```

Three decisions in that grade, all driven by the footage being a night street in fog:

- **saturation 0.30.** The source is heavily sodium-orange, which fights the mint accent.
  Pulled almost to monochrome it becomes atmosphere instead of a competing colour.
- **CRF 27, not 32.** Dark gradients band badly; `gradfun` debands and the lower CRF
  stops the fog turning into steps. It still lands at ~600 kB for 20s — dark footage
  compresses well.
- **No luma pull.** The old encode darkened the footage because the source was bright.
  This one is already dark, so the scrims in `VideoBackdrop` came down instead
  (opacity 1, and the left scrim from 0.93 to 0.90 falling to 0.05).

## Design

Dark editorial / Swiss: matte black ground (`#0B0B0C`), warm off-white ink, and **one**
accent — electric mint `#35D68A`.

The palette previously ran an orange (`#D97F1F`) on every hairline against that mint and
a green car: three hues competing for the same job. Rules are structure, not decoration,
so they now sit barely above the ground (`#26262A`) and the accent is the only colour on
the site that means anything. In the 3D scene that discipline is load-bearing — every
mechanical part is steel or graphite, so the accent *is* the selection indicator.

Instrument Serif for display, IBM Plex Sans for text, IBM Plex Mono for labels and
numbers. Strict grid, hairline rules, numbered sections, no gradients.

## Business facts

All of it lives in [lib/business.ts](lib/business.ts) — address, email, company ID —
and the footer and the structured data both read from there. One line to change when
the phone number lands.

The company ID resolves against the PRH open-data register to Revamp Motors,
osakeyhtiö, registered 2026-08-31.

`phone` is deliberately `null` rather than a fake number. It is rendered as
`[Phone TBA]` in the footer and **omitted entirely** from the structured data — an
invented number there is worse than none, because Google publishes it.

## Structured data

[components/StructuredData.tsx](components/StructuredData.tsx) emits schema.org
`AutoRepair`: name, address, email, area served, price range, business ID. This is what
puts a one-location garage in the local pack with a map pin instead of a plain blue
link, and it is the highest-leverage SEO change available now that the address is real.

Omitted on purpose, because Google will publish whatever is there: `telephone`,
`openingHoursSpecification` (no hours agreed yet) and `geo` (derived from the postal
address anyway). Nothing in it is Tesla-owned — the footer disclaims affiliation in
words and the metadata must not contradict that.

## Known placeholders

- **Phone is `[Phone TBA]`.** Address, email and company ID are real.
- **No opening hours anywhere.** Add them to `business.ts` and the structured data
  together when they are set.
- Prices — see above.
- The seniority claim in [components/Why.tsx](components/Why.tsx) is unquantified
  because no credentials, dates or headcount have been supplied.
- **"First week of October" is deliberately not a specific date.** If a day is fixed,
  set it in `lib/content.ts` (`hero.eyebrow`, `contact.p1`, `footer.opening`) and
  consider adding `openingHoursSpecification` at the same time.
- `SITE_URL` in [lib/site.ts](lib/site.ts) is `https://revampmotors.fi` — change it if
  the domain differs, since robots.txt, the sitemap and every canonical URL derive from it.

## Indexing

The site was `noindex` through pre-launch. It is now **open to crawlers**:
`robots: { index: true, follow: true }` in `BASE_METADATA`
([components/RootShell.tsx](components/RootShell.tsx)), shared by both root layouts,
plus a generated [robots.txt](app/robots.ts) (`Allow: /`) and
[sitemap.xml](app/sitemap.ts) listing all four URLs.

All four pages are indexable in both languages, with `hreflang` alternates and an
`x-default` pointing at English.

## Note on TypeScript

Pinned to `typescript@5`. TypeScript 7 (the native port) installs by default from
`typescript@latest` and Next 15.5 cannot read `tsconfig.json` through its API — the
`@/*` path alias silently stops resolving and `next-env.d.ts` is never generated.
