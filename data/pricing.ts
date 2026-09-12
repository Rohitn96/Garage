import type { Localized } from "@/lib/i18n";

/**
 * The site's price list. Rendered only by components/Pricing.tsx.
 *
 * Deliberately SHORT and generic. A detailed, grouped, per-job table was tried
 * and pulled: before the shop has traded a day, a long price list is a long list
 * of numbers nobody has tested, and every one of them is a promise. Five
 * headline figures answer the question a visitor actually has — roughly what
 * does this cost — without committing the business to forty prices it may want
 * to change in month one.
 *
 * The detailed version goes back in when there are real rates behind it.
 *
 * ⚠️ These five are still INDICATIVE and carried over from the original site.
 * The disclaimer renders directly beneath them and must stay there.
 */

export type PriceRow = {
  id: string;
  service: Localized;
  /** Pre-formatted: ranges and per-hour rates are not single numbers. */
  price: string;
};

const L = (en: string, fi: string): Localized => ({ en, fi });

export const PRICES: PriceRow[] = [
  {
    id: "inspection",
    service: L("Comprehensive vehicle inspection", "Auton kuntotarkastus"),
    price: "120 €",
  },
  {
    id: "tesla-packages",
    service: L("Tesla service packages", "Teslan huoltopaketit"),
    price: "290–330 €",
  },
  {
    id: "routine",
    service: L(
      "Filter change, oil change, tyre work",
      "Suodattimet, öljynvaihto, rengastyöt",
    ),
    price: "80 €",
  },
  {
    id: "ac",
    service: L("AC service", "Ilmastoinnin huolto"),
    price: "150–200 €",
  },
  {
    id: "labour",
    service: L("Hourly labour rate", "Tuntiveloitus"),
    price: "80 € / hr",
  },
];
