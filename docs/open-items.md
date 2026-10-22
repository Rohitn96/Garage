# Open items: what the site still needs from you

Run `npm run open-items` for the live list. Everything below that lives in `site.config.ts` is **hidden on the site until you fill it in**, so nothing fake is ever shown.

## 1. Facts to fill in (`site.config.ts`)

| Item | Where | What to send | Effect when filled |
|---|---|---|---|
| Weekend opening hours | `hours.weekend.saturday` / `sunday` | Opening and closing time, 24 h, for example `"09:00"` and `"17:00"` | Hours appear in footer, contact, weekend page and the AutoRepair schema. Until then the site says "Full working days, times confirmed when you book". |
| Weekend appointment rule | `hours.weekendAppointmentRequired` | `true` (appointment only) or `false` (drop-ins welcome) | Replaces "Book ahead and we plan the weekend's work". |
| Free diagnosis scope | `diagnosis.includes`, `diagnosis.excludes`, then `confirmed: true` | Confirm or rewrite the drafted lists (reading fault codes, checking the described fault, visual inspection on the lift, written summary and estimate; excludes dismantling, repairs and parts, software updates) | Included / not included lists appear on the offer page. |
| Offer validity detail | `content/tesla.ts` terms | Does "until 31.12.2026" mean booked by, or carried out by, that date? | Wording currently says "valid until 31.12.2026". |
| Map coordinates | `business.geo` | `lat, lng` of the hall door from the Google Maps pin | Adds `geo` to the structured data. |
| Public profiles | `business.sameAs` | Google Business Profile URL, Facebook, Instagram | Adds `sameAs` to the structured data. |
| Customer reviews | `reviews` | Real reviews, word for word, with permission, with date and source | Reviews section appears on the home page. |
| Certificates | `certificates` | High-voltage safety training, F-gas, other EV training actually held | Certificate list appears on home and about. |
| Team | `team` | Names, roles, optional photo and short bio, with consent | Team section appears on about. |
| Workshop photos | `garagePhotos` | Real photos of Halli 3, WebP, at least 1600 px wide, with alt text | Photo grid appears on about. |
| Battery report sample | `batteryReportSample` | An anonymised real report (PDF or image) plus a preview image | Sample block appears on the battery report page. |
| F-gas certificate | `acLicensed` | Set to `true` once the Tukes refrigerant qualification is held | Climate page and explorer offer AC recharge and refrigerant work. |
| Analytics | `NEXT_PUBLIC_CF_BEACON_TOKEN` (build env) | Cloudflare Web Analytics token | Cookieless analytics beacon is added. |

## 2. Claims to confirm

These are stated on the site. Most were already on the previous site; the ones marked **new** were inferred from it. Please confirm each, or tell me what to change.

- High-voltage work is done on a de-energised system by someone trained for it (from the previous site). Adding the certificate to `certificates` backs this up.
- Pre-purchase inspections with a written summary (**new**, derived from the old "comprehensive vehicle inspection" service).
- Tyre storage: kept indoors and checked before fitting (from the previous site).
- Old parts are shown to the customer (from the previous site). A written summary of work done (**new**).
- Battery health report contents: usable capacity, cell group balance, battery fault codes, 12 V and charging check (**new**, typical scope). Confirm what your equipment actually reports.
- Other vehicles: oil and filters, brakes, tyres, small repairs and inspection preparation; no major engine or gearbox work (**new**, from your brief "basic work only").
- "The estimate tells you which parts we will use" (**new**, FAQ).
- Reply time 3 to 12 hours (from the previous site).
- Official company name. The site shows "Revamp Motors (osakeyhtiö)". If the registered name is "Revamp Motors Oy", say so.
- The workshop video (`public/videos/process.mp4`) appears to be stock footage. Confirm you hold the rights, or send your own clip. The previous hero video (a night street with Cyrillic signage) was removed.

## 3. Reviews by people, not code

- **All Finnish copy needs review by a native speaker**: every page, metadata, form messages, FAQ, the six blog articles and the privacy notice. Files: `content/*.ts`.
- **Privacy notice needs legal review**: retention periods, the legal basis wording, and the transfer basis for Formspree (US) and Gmail. File: `content/pages.ts` (`PRIVACY_PAGE`).
- **Warranty wording** (FAQ, Tesla hub, model pages) describes EU rules in general terms and says it is not legal advice. Worth a read by someone you trust on consumer law.
- Blog publication date is set to 22.10.2026 in `content/blog.ts`. Change it to the actual launch date.

## 4. After 31.12.2026

The offer switches off by itself in visitors' browsers. A rebuild on or after 1.1.2027 (`npm run deploy`) also removes it from the HTML and from the offer page's metadata, which is cleaner for search engines. See README, "Launch offer".
