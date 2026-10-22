# Revamp Motors

Website for Revamp Motors, an independent Tesla and EV specialist garage in Tattarisuo, Helsinki (Halli 3, Kytkintie 38, 00770). English at the root, Finnish under `/fi/`. Static export served by Cloudflare.

## Commands

| Command | What it does |
|---|---|
| `npm run dev` | Local dev server |
| `npm run build` | Static export to `out/`, then `scripts/postbuild.mjs` writes `_redirects` and `_headers` |
| `npm start` | Serve `out/` locally (compressed, like production) |
| `npm run typecheck` / `npm run lint` | TypeScript and ESLint |
| `npm test` | Unit tests for the offer clock and head script |
| `npm run test:expiry` | Builds with the clock mocked either side of 31.12.2026 and checks every page, then rebuilds normally |
| `npm run wordcount` | Checks every service and model page is 500 to 800 words per language |
| `npm run verify` | Checks the build: links, sitemap, canonical, hreflang symmetry, unique titles, JSON-LD, no pricing language, no em or en dashes |
| `npm run open-items` | Lists every fact the site still needs from the owner |
| `npm run check` | All of the above in order |
| `npm run deploy` | Build, verify, then `wrangler deploy` (production) |

## Where things live

```
site.config.ts        every business fact: address, phone, hours, offer dates, reviews, certificates...
lib/routes.ts         every page with its Finnish and English path (single source for links, hreflang, sitemap)
lib/offer.ts          launch offer clock and the pre-paint head script (theme, offer state, old anchors)
lib/seo.ts            per-page metadata: title, description, canonical, hreflang, Open Graph, Twitter
lib/schema.ts         JSON-LD: AutoRepair, Service, Offer, FAQPage, BreadcrumbList, BlogPosting
content/*.ts          all copy, Finnish and English, as typed objects
components/pages/     page templates; render.tsx maps a route id to a template and its metadata
components/blocks/    shared sections: hero, CTA panel, FAQ, prose, cards, gated slots
app/(en), app/(fi)/fi  two root layouts (one per language) with catch-all routes
app/globals.css       design tokens (colour, type scale, spacing, radius, motion), dark and light
docs/                 redesign plan, open items, Google Business Profile checklist
```

### Editing copy

All text is in `content/`. Long-form pages are lists of blocks (`{ h2 }`, `{ p }`, `{ ul }`, `{ note }`). Link to another page with `[text](@route-id)`, for example `[jarrut](@svc-brakes)`. Route ids are in `lib/routes.ts`; an unknown id fails the build, so a broken internal link cannot ship.

Rules for copy: no em or en dashes (use commas, periods or "to"), no prices, no invented facts or statistics. `npm run verify` enforces the first two.

### Adding a page

1. Add the route to `lib/routes.ts` with both paths.
2. Add its name to `ROUTE_NAMES` in `content/ui.ts`.
3. Add copy and a template, and map it in `components/pages/render.tsx`.

The sitemap, hreflang, breadcrumbs, redirects and headers follow automatically.

## Business facts and placeholders

`site.config.ts` holds every fact the site states, including the confirmed free diagnosis scope (digital analysis report, visual inspection, test drive; Tesla only). Anything still unknown is `null` or an empty list, marked `TODO(owner)`, and the component that would show it renders nothing (reviews, certificates, team, workshop photos, battery report sample, weekend hours). `docs/open-items.md` explains each item.

## Launch offer (free Tesla diagnosis until 31.12.2026)

The offer ends at 1.1.2027 00:00 Helsinki time (`offer.endsAt` in `site.config.ts`). It switches off two ways:

1. **In the browser, with no rebuild.** Every offer element is rendered in a live and an ended variant (`OfferSwitch`). An inline script in `<head>` compares the visitor's clock with the end time before first paint, sets `data-offer` on `<html>`, CSS hides the wrong variant, and the Offer JSON-LD is turned into an inert `text/plain` block. CTAs change from "Free diagnosis" to "Book a diagnosis" / "Request a quote".
2. **At build time.** A build made after the end date contains only the ended variant and no Offer schema, and the offer page's metadata switches to the neutral version.

Do a normal deploy on or after 1.1.2027 so the HTML and metadata are clean for search engines. To preview the ended state, add `?offer-now=2027-01-02` to any URL, or build with `OFFER_NOW=2027-01-02T00:00:00+02:00`.

## Theme

Light and dark, following the operating system on the first visit; the toggle in the nav stores a choice in `localStorage`. Set before first paint by the head script, so there is no flash. All colours are CSS variables in `app/globals.css`; Tailwind reads them.

## Logo and icons

`public/logo/revamp-motors-dark.*` (white letters) and `-light.*` (grey letters) were cropped from the supplied artwork and keyed to transparency. The logo is a CSS background chosen by theme, so only the visible variant downloads. Favicon and app icons are the logo's orange apex on the dark ground.

## Hero video, motion and fonts

- **Hero video:** `public/videos/hero-mobile.mp4` (480x854 portrait, about 1.2 MB) for phones and `hero-desktop.mp4` (1280x720 crop, about 2.3 MB) for wider screens, both encoded from `hero1.mp4` in the project root (not committed). The WebP poster of the first frame is the first paint; the video starts after the page has loaded and the browser is idle, and fades in over the identical frame. Reduced motion, Save-Data and slow connections keep the poster. To re-encode, see the ffmpeg commands in the commit that added them.
- **3D car:** runs on phones and desktops. On a phone the car fills the top of the stage and the system's details sit beneath it; on desktop the details sit in the margin with a leader line. Its code (framer-motion, three.js) loads only when the visitor scrolls within half a screen of it. Reduced motion, Save-Data, slow connections and low-core devices skip it; the service grid below carries the same content.
- **Scroll reveal:** sections fade up as they enter the viewport (`components/Reveal.tsx`). Content is visible without JavaScript and anything already on screen is never hidden.
- Headings are never animated. `prefers-reduced-motion` turns off every animation.
- **Fonts** are self-hosted from `assets/fonts` (Archivo 800, IBM Plex Sans, IBM Plex Mono; all OFL) with `next/font/local`, so builds never depend on reaching Google Fonts.

## Calls to action

"Book a service" is the main action everywhere (nav, mobile bar, hero, page endings). The free Tesla diagnosis is the launch promotion: the top banner, a strip under the hero, the secondary button on Tesla pages, the offer page and the contact page's first path.

## Contact form

`components/BookingForm.tsx` validates with react-hook-form's built-in rules (no schema library) and posts JSON to Formspree (`formEndpoint` in `site.config.ts`, or `NEXT_PUBLIC_FORMSPREE_ENDPOINT`). Two paths: diagnosis (Tesla models only) and quote (any vehicle). Spam protection: a honeypot field (`_gotcha`) and a minimum fill time; bots get a fake success. Formspree rejects requests without an `Origin` header, so test with a browser, not bare curl.

## SEO

- Unique title, description, canonical, Open Graph and Twitter tags per page and language.
- hreflang `en`, `fi` and `x-default` (English) on every page; `npm run verify` checks symmetry.
- `sitemap.xml` and `robots.txt` are generated from `lib/routes.ts`.
- Structured data: AutoRepair on every page; Service on service, model and report pages; FAQPage where FAQs are shown; BreadcrumbList; BlogPosting on articles; Offer (no price, `validThrough` 2026-12-31) on the offer page.
- Old URLs: the previous site had English under `/en/`; `/en/...` now 301s to the same path at the root. `#pricing`, `#hinnasto` and `#contact` anchors are sent to the contact page by the head script (fragments never reach the server). Every page also gets a 301 from its slashless URL.

## Deploying to Cloudflare

`wrangler.jsonc` is an assets-only Worker serving `out/`. `npm run deploy` builds, verifies and deploys. Not fixable from the repo (Cloudflare dashboard): "Always Use HTTPS" with HSTS, and a DNS record for `www`.

## Measured performance

Lighthouse 12, mobile preset, against a local compressed server (lab numbers; check production with PageSpeed Insights after deploy):

| Page | Performance | Accessibility | Best practices | SEO |
|---|---|---|---|---|
| Home (3 runs) | 91 to 94 | 100 | 100 | 100 |
| Tesla hub, model, service, offer, contact, blog, other vehicles | 90 to 95 | 100 | 100 | 100 |

CLS is 0 on the measured pages. Simulated LCP is 2.7 to 3.0 s on the local server, above the 2.5 s target; the remaining time is the throttled download of the HTML, CSS and preloaded fonts. Verify on the production domain.

## Notes

- **Building inside OneDrive:** OneDrive placeholder files break Next's `.next` cache on repeat builds (`EINVAL: invalid argument, readlink`), so `npm run build` deletes `.next` first.
- **TypeScript is pinned to 5.** TypeScript 7 breaks Next 15.5's reading of `tsconfig.json`.
- Finnish copy and the privacy notice need human review before launch. See `docs/open-items.md`.
