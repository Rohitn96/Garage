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

### Interaction

Click a system in the list, or click the part itself in the scene. Only the selected
system separates, so cause and effect stay obvious. Selecting also fades the shell
further back and washes every other part toward the ground colour.

This replaced a **720vh scroll-scrubbed sticky track** — roughly half the page's height
spent naming twenty services that the visitor could neither skim nor dwell on, because
scrolling to read pushed them off the thing they were reading. Deleting it also deleted
the in-canvas floating labels (they fell off narrow viewports) and the `sr-only`
duplicate of the whole catalogue (buttons and a list are accessible by construction).

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

⚠️ **The figures are placeholders.** Five rows carried over from the old trust section
(inspection 120 €, Tesla packages 290–330 €, filters/oil/tyres 80 €, AC 150–200 €,
labour 80 €/hr); everything else is invented to complete the table. Replace before
launch. The "indicative only" disclaimer renders directly under the figures and must
stay there.

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
- **The hero video is a combustion engine bay.** It is the last thing on the site still
  arguing against the positioning; reshoot or recut against an EV.
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
