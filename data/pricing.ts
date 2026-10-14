import { AC_LICENSED } from "@/lib/business";
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

const ALL_PRICES: PriceRow[] = [
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

/**
 * The figure a row is sorted by: the largest number printed in it.
 *
 * Prices are pre-formatted strings because ranges and per-hour rates are not
 * single numbers, so the order has to be read back out of them rather than
 * stored twice. Reading it means a price can be edited in one place and the
 * list reorders itself; a second `sortBy` field would quietly go stale the
 * first time someone changed a number without noticing it.
 *
 * "290-330 EUR" sorts on 330, "80 EUR / hr" on 80.
 */
const magnitude = (price: string): number => {
  const figures = price.match(/\d+/g);
  return figures ? Math.max(...figures.map(Number)) : 0;
};

/**
 * Dearest first, and the AC row is held back until the F-gas certificate is in
 * hand (see AC_LICENSED in lib/business.ts).
 *
 * The sort is stable, so rows that print the same figure keep the order they
 * are written in above: the hourly rate stays below the fixed-price job it ties
 * with, which is where a rate belongs.
 */
export const PRICES: PriceRow[] = ALL_PRICES.filter(
  (row) => AC_LICENSED || row.id !== "ac",
).sort((a, b) => magnitude(b.price) - magnitude(a.price));
