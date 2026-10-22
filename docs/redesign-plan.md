# Revamp Motors redesign plan: Tesla and EV specialist

Branch: `redesign/tesla-ev-restructure`. Nothing is pushed to `main` and nothing is deployed.

## 1. Audit of the current site

### Stack

| Area | What exists |
|---|---|
| Framework | Next.js 15 App Router, React 19, TypeScript 5 |
| Output | `output: "export"` static site in `out/`, served by an assets-only Cloudflare Worker (`wrangler.jsonc`). No server, no API routes. |
| Routing | Two root layouts: `app/(fi)` serves Finnish at `/`, `app/(en)/en` serves English at `/en/`. Only two pages exist: home and `/tesla/`. |
| i18n | Every string is a `{ en, fi }` object (`lib/content.ts`, `data/*.ts`), resolved by a React context (`lib/i18n.tsx`). Language is a URL, not stored state. |
| Styling | Tailwind 3 with three hardcoded hex colours, dark only. Fonts via `next/font/google` (Instrument Serif, IBM Plex Sans, IBM Plex Mono). |
| Animation | Framer Motion for reveals; react-three-fiber + drei + three for the scroll-driven exploded car on the home page (loaded after first scroll). CSS `.rise` entrance in the hero. |
| Forms | `components/ContactForm.tsx`: react-hook-form + zod, posts JSON to Formspree (`https://formspree.io/f/maeyoeeq`, overridable by `NEXT_PUBLIC_FORMSPREE_ENDPOINT`). |
| SEO | Per-page metadata built in `components/RootShell.tsx` with hreflang and x-default; `app/sitemap.ts` and `app/robots.ts` from a hardcoded list; one `AutoRepair` JSON-LD block (`components/StructuredData.tsx`); OG cards rendered at build (`lib/ogImage.tsx`). |
| Redirects / headers | `public/_redirects` (old `/fi/` URLs, slashless 301s) and `public/_headers` (noindex on workers.dev and RSC payloads). |
| Analytics | Cloudflare Web Analytics beacon, only when a token is set. |
| Assets | Old stacked logo PNG, two hero/process videos with JPEG posters, icons. |

### Current problems

1. **Positioning.** Every headline says "all makes, every fuel"; Tesla is a side note. That is the opposite of the new strategy.
2. **Pricing everywhere.** `data/pricing.ts`, `components/Pricing.tsx`, home and Tesla page sections, nav and footer `#pricing` links, `priceRange: "€€"` and `currenciesAccepted: "EUR"` in schema, price promises in copy and metadata.
3. **Two pages only.** No page per model, service, offer, FAQ, blog or contact, so there is nothing to rank for "Tesla jarrut", "Tesla ilmajousitus" and similar searches, and nothing to link to from Google Business Profile.
4. **Dark only**, with colours hardcoded into components and the video scrims.
5. **Everything is a client component.** Static copy ships as JS and hydrates for no reason.
6. **Hero video loads eagerly on phones**, the largest single cost on the most common device.
7. **Lint cannot pass:** `npm run lint` runs `next lint` but ESLint is not installed.
8. **Em dashes and en dashes** throughout comments, README and a few strings.
9. **Phone not offered as a call.** The new brief asks for click to call; the old copy deliberately avoided it.
10. **No opening hours, geo or sameAs** in the structured data (correctly, since none were supplied).

## 2. New site map

Finnish at the root, English under `/en/` with translated slugs (English slugs read better in English results and in shared links; a central route registry maps each page to both paths, so the language switch and hreflang stay exact).

| Page | Finnish | English |
|---|---|---|
| Home | `/` | `/en/` |
| Tesla hub | `/tesla/` | `/en/tesla/` |
| Model 3 / Y / S / X | `/tesla/model-3/` ... | `/en/tesla/model-3/` ... |
| Battery and charging, 12 V | `/tesla/akku-ja-lataus/` | `/en/tesla/battery-and-charging/` |
| Powertrain and HV diagnostics | `/tesla/voimalinja-ja-suurjannite/` | `/en/tesla/powertrain-and-high-voltage/` |
| Brakes and regen | `/tesla/jarrut-ja-regenerointi/` | `/en/tesla/brakes-and-regen/` |
| Suspension and air suspension | `/tesla/alusta-ja-ilmajousitus/` | `/en/tesla/suspension-and-air-suspension/` |
| Tyres and alignment | `/tesla/renkaat-ja-suuntaus/` | `/en/tesla/tyres-and-alignment/` |
| Electrical faults and software | `/tesla/sahkoviat-ja-ohjelmisto/` | `/en/tesla/electrical-and-software/` |
| Climate and heat pump | `/tesla/ilmastointi-ja-lampopumppu/` | `/en/tesla/climate-and-heat-pump/` |
| Free diagnosis offer | `/tesla/ilmainen-diagnostiikka/` | `/en/tesla/free-diagnosis/` |
| Battery health report | `/tesla/akun-kuntoraportti/` | `/en/tesla/battery-health-report/` |
| Other EVs | `/sahkoautot/` | `/en/electric-cars/` |
| Other vehicles | `/muut-autot/` | `/en/other-cars/` |
| Weekend service | `/viikonloppuhuolto/` | `/en/weekend-service/` |
| FAQ | `/usein-kysyttya/` | `/en/faq/` |
| Blog index and 6 articles | `/blogi/...` | `/en/blog/...` |
| About | `/meista/` | `/en/about/` |
| Contact | `/yhteystiedot/` | `/en/contact/` |
| Privacy | `/tietosuoja/` | `/en/privacy/` |

## 3. Design direction

"Precision diagnostic workshop." The site should read like a well-made instrument, not a dealer template.

- **Palette:** near-black graphite and cool off-white grounds, one signal orange taken from the new logo (`#EA3404`), one status green used only for diagnostic "OK" states. Every colour is a CSS variable with a dark and a light value; Tailwind reads the variables.
- **Type:** Archivo (expanded width, heavy) for display, echoing the wide, engineered letterforms of the logo; IBM Plex Sans for body; IBM Plex Mono for system labels, states and data.
- **Motif:** a faint blueprint grid, crosshair corner marks, system labels in the form `SYS 03 / JARRUT`, and diagnostic state chips (`OK`, `CHECK`, `SCAN`). Used as structure and wayfinding, never as decoration on top of content.
- **Theme:** light and dark, defaulting to the visitor's OS setting, with a toggle that remembers the choice. Set by an inline script before first paint, so there is no flash.
- **Logo:** the supplied artwork, cropped and keyed to transparency: white and orange for dark mode, grey and orange for light mode, swapped by CSS with no layout shift.
- **Motion:** the exploded car stays on the home page, now as the "systems we work on" overview where each system links to its service page. Reduced motion gets a static, readable grid. Hero video plays only on wide screens with a fast connection and no Save-Data; everyone else gets the poster. Hero text is never animated (it is the LCP element).

### Design tokens

Colour (ground, surface, raised, ink, muted, rule, rule-strong, accent, accent-ink, on-accent, ok), type scale (`--step--1` to `--step-5` with clamp), spacing (4 px base), radius (2 px, 6 px, pill), motion (`--dur-1/2/3`, one ease-out curve).

## 4. Component list

- **Shell:** `RootShell` (theme and offer scripts in head), `Nav`, `MobileActionBar` (call, WhatsApp, CTA; fixed to the bottom on phones with matching body padding), `Footer`, `ThemeToggle`, `LanguageToggle`, `OfferBanner`, `Breadcrumbs`, `Logo`.
- **Offer:** `OfferSwitch` renders a live and an expired variant; the head script hides whichever does not apply, so expiry needs no rebuild. `lib/offer.ts` holds the date logic and is unit tested.
- **Content:** `PageHero`, `SectionHeading`, `SystemLabel`, `StateChip`, `Prose` (renders typed content blocks), `ServiceGrid`, `ModelSelector`, `Steps`, `FaqList` (native details/summary), `CtaPanel`, `RelatedLinks`, `TrustFacts`, `WeekendFeature`.
- **Config gated slots** (render nothing until `site.config.ts` has real data): `Reviews`, `Certificates`, `Team`, `GaragePhotos`, `BatteryReportSample`.
- **Contact:** `ContactPaths` (two paths side by side) and `BookingForm` (path aware, honeypot, timing check, zod validation, success and error states).
- **SEO:** `JsonLd`, `lib/seo.ts` (metadata per route), `lib/schema.ts` (AutoRepair, Service, FAQPage, BreadcrumbList, Offer, BlogPosting).

## 5. Migration and redirect plan

- Delete `data/pricing.ts`, `components/Pricing.tsx`, `TwoDoors`, `Why`, the old Tesla page components, and the `#pricing` links. Remove `priceRange` and `currenciesAccepted` from schema.
- Old anchors cannot be redirected by the server (fragments never reach it). The head script rewrites `#pricing`, `#hinnasto` and `#contact` on arrival to the contact page; `#services` still exists on the home page.
- Keep every existing redirect (`/fi/...`, slashless URLs). A post-build script adds a 301 for the slashless form of every new page, derived from the real build output, and noindex headers for every RSC payload.
- Business facts move from `lib/business.ts` into one `site.config.ts` with TODO markers. `lib/business.ts` is removed.
- `sitemap.xml` is generated from the route registry, so it cannot drift from the pages that exist.

## 6. Risks

| Risk | Mitigation |
|---|---|
| A static site cannot change itself at midnight on 31.12.2026. | Both variants ship; an inline head script picks one before paint using Europe/Helsinki time and removes the Offer JSON-LD. A rebuild after 1.1.2027 makes the HTML itself clean (see deploy notes). |
| Warranty wording could mislead. | Answer states EU rules in general terms, says warranty repairs are Tesla's, and tells the reader to check their own terms. Flagged for review. |
| Climate and heat pump work involves refrigerant, which needs an F-gas qualification the shop does not have yet (`AC_LICENSED = false`). | The page exists but its scope is limited to non-refrigerant diagnosis, and it says so plainly. Flipping the flag adds refrigerant work back. |
| High-voltage competence claim. | Kept only as the current site words it. The certificate list stays hidden until real certificates are entered. Flagged. |
| Finnish copy is machine-authored. | **All Finnish copy needs human review** before launch. Listed in `docs/open-items.md`. |
| Lighthouse targets on mobile with a WebGL scene. | three.js loads only after first scroll, video is off on phones, pages are server components, hero is not animated. |
| OneDrive placeholder files break `.next` on repeat builds. | Delete `.next` and rebuild (documented in README). |

## 7. Finnish copy

**Every Finnish string on the site needs human review by a native speaker**: page copy, metadata, form messages, FAQ, blog articles and the privacy notice. Technical terms used: huolto, vianhaku, diagnostiikka, ajoakku, 12 V:n akku, voimalinja, suurjännite, regeneratiivinen jarrutus, ilmajousitus, pyöränsuuntaus, lämpöpumppu, rengashotelli, katsastus.
