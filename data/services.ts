/**
 * Placeholder service catalogue for the Rudra Motors pre-launch site.
 *
 * Every price here is INVENTED for the dry run. Nothing in this file has been
 * confirmed against real supplier or labour costs — see PRICE_DISCLAIMER, which
 * is rendered next to the pricing explorer for exactly this reason.
 *
 * Editing later: change `priceFrom` for fixed-price work, or set `quoteOnly` for
 * anything whose cost depends on the vehicle. The UI derives its label from that.
 */

export type ServiceItem = {
  id: string;
  name: string;
  /** One line, customer-facing. Says what they get, not how we do it. */
  blurb: string;
} & (
  | { quoteOnly?: false; priceFrom: number; unit?: string }
  | { quoteOnly: true; priceFrom?: never; unit?: never }
);

/** Which chunk of the car separates when this group is on screen. */
export type CarRegionId =
  | "engine"
  | "brakes"
  | "wheels"
  | "climate"
  | "underbody"
  | "body";

export type ServiceGroup = {
  id: CarRegionId;
  /** Shown as the card-stack heading. */
  title: string;
  /** Shown under the heading — orients the customer to the part in view. */
  standfirst: string;
  items: ServiceItem[];
};

export const PRICE_DISCLAIMER =
  "Prices shown are indicative examples for illustration only and do not reflect final rates.";

export const SERVICE_GROUPS: ServiceGroup[] = [
  {
    id: "engine",
    title: "Engine bay",
    standfirst:
      "Routine servicing and the diagnostics that tell you what a warning light actually means.",
    items: [
      {
        id: "oil-change",
        name: "Oil change",
        blurb: "Oil and filter replaced, fluid levels topped up and checked.",
        priceFrom: 89,
      },
      {
        id: "engine-diagnostics",
        name: "Engine diagnostics",
        blurb: "We read the fault codes and tell you what they mean in plain language.",
        priceFrom: 69,
      },
      {
        id: "timing-belt",
        name: "Timing belt or chain",
        blurb: "Replacement on schedule, before it becomes the expensive kind of problem.",
        priceFrom: 450,
      },
      {
        id: "engine-repair",
        name: "Engine repair",
        blurb: "Scope and price confirmed after we have the engine in front of us.",
        quoteOnly: true,
      },
    ],
  },
  {
    id: "brakes",
    title: "Brakes",
    standfirst:
      "Priced per axle. We show you the worn parts we take off before anything goes back on.",
    items: [
      {
        id: "brake-pads",
        name: "Brake pad replacement",
        blurb: "Pads replaced per axle, with the discs measured while we are in there.",
        priceFrom: 150,
      },
      {
        id: "brake-discs",
        name: "Brake discs and pads",
        blurb: "Discs and pads together per axle — the usual fix once discs are past limit.",
        priceFrom: 280,
      },
      {
        id: "brake-fluid",
        name: "Brake fluid change",
        blurb: "Full bleed and fresh fluid. Due every couple of years on most cars.",
        priceFrom: 99,
      },
    ],
  },
  {
    id: "wheels",
    title: "Tyres and wheels",
    standfirst:
      "Seasonal changeovers, geometry, and somewhere to keep the set you are not using.",
    items: [
      {
        id: "tyre-change",
        name: "Tyre change, set of four",
        blurb: "Summer to winter and back again, balanced and torqued to spec.",
        priceFrom: 60,
      },
      {
        id: "wheel-alignment",
        name: "Wheel alignment",
        blurb: "Geometry reset so the car tracks straight and the tyres wear evenly.",
        priceFrom: 90,
      },
      {
        id: "tyre-storage",
        name: "Tyre storage",
        blurb: "Your off-season set kept indoors, cleaned and ready for the swap.",
        priceFrom: 39,
        unit: "season",
      },
    ],
  },
  {
    id: "climate",
    title: "Air conditioning",
    standfirst:
      "The system most people only think about on the first warm week of the year.",
    items: [
      {
        id: "ac-service",
        name: "AC service and refrigerant top-up",
        blurb: "System evacuated, recharged and pressure-tested.",
        priceFrom: 139,
      },
      {
        id: "ac-leak",
        name: "AC leak diagnostics",
        blurb: "We trace where the refrigerant is escaping before selling you a refill.",
        priceFrom: 79,
      },
    ],
  },
  {
    id: "underbody",
    title: "Chassis and underbody",
    standfirst:
      "Suspension, exhaust and everything that takes the worst of a Finnish winter.",
    items: [
      {
        id: "chassis-inspection",
        name: "Chassis inspection",
        blurb: "On the lift, checking corrosion, mounts, bushings and joints.",
        priceFrom: 69,
      },
      {
        id: "suspension-repair",
        name: "Suspension repair",
        blurb: "Shocks, springs, arms and bushings — priced once we know what has gone.",
        quoteOnly: true,
      },
      {
        id: "exhaust-repair",
        name: "Exhaust repair",
        blurb: "Sections, mounts and joints repaired or replaced.",
        priceFrom: 90,
      },
    ],
  },
  {
    id: "body",
    title: "Whole car",
    standfirst:
      "Inspections and electrical work that do not belong to any one corner of the car.",
    items: [
      {
        id: "pre-purchase",
        name: "Pre-purchase inspection",
        blurb: "Before you buy: what it needs now, and what it will need soon.",
        priceFrom: 119,
      },
      {
        id: "general-diagnostics",
        name: "General diagnostics",
        blurb: "Full fault-code scan across the car's systems, with the results explained.",
        priceFrom: 49,
      },
      {
        id: "battery-electrical",
        name: "Battery and charging check",
        blurb: "Battery health, alternator output and starter draw tested together.",
        priceFrom: 45,
      },
      {
        id: "lighting",
        name: "Headlight and bulb service",
        blurb: "Bulbs replaced and beam alignment set — a common inspection failure.",
        priceFrom: 35,
      },
      {
        id: "inspection-failure",
        name: "Inspection-failure repair package",
        blurb: "Bring us the failure sheet and we will work through it and re-present the car.",
        quoteOnly: true,
      },
    ],
  },
];

/** Formats a service into the single line the price cards render. */
export function priceLabel(item: ServiceItem): string {
  if (item.quoteOnly) return "Quote on inspection";
  return item.unit ? `from ${item.priceFrom} € / ${item.unit}` : `from ${item.priceFrom} €`;
}
