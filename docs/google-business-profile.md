# Google Business Profile checklist

The map pack listing comes from Google Business Profile, not from the website. The site's structured data is ready to point at the profile once it exists (add its URL to `business.sameAs` in `site.config.ts`).

## Basics

- [ ] Business name: **Revamp Motors** (exactly as on signage; no keywords added to the name, Google suspends for that)
- [ ] Address: Halli 3, Kytkintie 38, 00770 Helsinki. Put "Halli 3" in address line 2.
- [ ] Map pin on the door of Hall 3, not the yard entrance. Copy the pin's coordinates into `business.geo`.
- [ ] Phone: +358 45 865 6683
- [ ] Website: `https://revampmotors.fi/fi/?utm_source=google&utm_medium=organic&utm_campaign=gbp` (Finnish pages; English is at the root)
- [ ] Appointment link: `https://revampmotors.fi/fi/yhteystiedot/?utm_source=google&utm_medium=organic&utm_campaign=gbp-booking#tarkastus`

## Categories

- [ ] Primary: **Auto repair shop** (Autokorjaamo)
- [ ] Secondary: **Electric vehicle repair shop**, **Car service station** (Autohuolto), **Tire shop** (Rengasliike), **Brake shop**

## Hours

- [ ] Monday to Friday: mark as "By appointment" in the description; set hours only if you are reachable by phone in those hours. If not, leave weekdays closed and say "Weekdays by appointment" in the description.
- [ ] Saturday and Sunday: the real working hours (same values as `hours.weekend` in `site.config.ts`)
- [ ] Add special hours for public holidays

## Services (add each, with a one-line description)

Tesla service, Tesla diagnosis, Tesla battery health check, 12 V battery replacement, brake caliper service, brake discs and pads, air suspension repair, control arm replacement, wheel alignment, seasonal tyre change, tyre storage, electric vehicle service, pre-purchase inspection, basic service for petrol and diesel cars.

No prices: the site does not publish any, and the profile should match.

## Description (750 characters max). Draft, needs Finnish review

> Revamp Motors on riippumaton Tesla- ja sähköautokorjaamo Tattarisuolla, Helsingissä. Teemme vianhaun ensin ja annamme arvion ennen töitä: akku ja 12 V:n akku, jarrut, alusta ja ilmajousitus, renkaat ja suuntaus sekä sähköviat. Huollamme myös muita sähköautoja ja teemme polttomoottoriautoihin perustöitä. Arkisin ajanvarauksella, viikonloppuisin täydet työpäivät. Emme ole sidoksissa Tesla, Inc:iin.

## Launch offer post (until 31.12.2026)

- [ ] Create an **Offer** post: "Ilmainen Tesla-tarkastus 31.12.2026 asti", end date 31.12.2026
- [ ] Button: "Learn more" linking to `https://revampmotors.fi/fi/tesla/ilmainen-tarkastus/?utm_source=google&utm_medium=organic&utm_campaign=gbp-offer`
- [ ] English version: `https://revampmotors.fi/tesla/free-inspection/?utm_source=google&utm_medium=organic&utm_campaign=gbp-offer-en`

## Photos (real ones only)

- [ ] Logo (square: use `app/icon.png`) and cover photo
- [ ] Exterior of Hall 3 with the sign visible, so people find the door
- [ ] Interior: lift, workbench, a Tesla on the lift
- [ ] Team at work (with consent)
- [ ] Add 2 to 3 new photos a month; the same photos can go into `garagePhotos` in `site.config.ts`

## Review request flow

1. After handover, send one message (WhatsApp or SMS) the same day: "Kiitos käynnistä. Jos olit tyytyväinen, arvio auttaa meitä paljon: <review link>". Get the short review link from the profile's "Ask for reviews" button.
2. Ask every customer the same way. Do not offer anything in return for a review and do not filter who you ask (both break Google's rules).
3. Reply to every review within a few days, calmly and in the reviewer's language.
4. With the reviewer's permission, copy reviews word for word into `reviews` in `site.config.ts`; the reviews section then appears on the home page.

## UTM convention

`utm_source=google&utm_medium=organic&utm_campaign=<gbp | gbp-booking | gbp-offer | gbp-offer-en | gbp-post-<topic>>`
