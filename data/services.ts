import type { Localized } from "@/lib/i18n";

/**
 * Placeholder service catalogue for the Revamp Motors pre-launch site.
 *
 * Every price here is INVENTED for the dry run, and NONE of it is rendered:
 * the site currently shows service names only. The figures stay because they are
 * the thing this catalogue exists to hold once the business sets real rates.
 *
 * Turning prices on later: render `priceFrom` / `quoteOnly` in the explorer
 * labels or a dedicated price list, and put a visible "indicative only"
 * disclaimer next to them before any placeholder figure reaches a screen.
 */

export type ServiceItem = {
  id: string;
  name: Localized;
  /** One line, customer-facing. Says what they get, not how we do it. */
  blurb: Localized;
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
  title: Localized;
  /** Shown under the heading — orients the customer to the part in view. */
  standfirst: Localized;
  items: ServiceItem[];
};

export const SERVICE_GROUPS: ServiceGroup[] = [
  {
    id: "engine",
    title: { en: "Engine bay", fi: "Moottoritila" },
    standfirst: { en: "Routine servicing and the diagnostics that tell you what a warning light actually means.", fi: "Perushuollot ja vianhaku, joka kertoo mitä merkkivalo oikeasti tarkoittaa." },
    items: [
      {
        id: "oil-change",
        name: { en: "Oil change", fi: "Öljynvaihto" },
        blurb: { en: "Oil and filter replaced, fluid levels topped up and checked.", fi: "Öljy ja suodatin vaihdetaan, nestetasot täytetään ja tarkastetaan." },
        priceFrom: 89,
      },
      {
        id: "engine-diagnostics",
        name: { en: "Engine diagnostics", fi: "Moottorin vianhaku" },
        blurb: { en: "We read the fault codes and tell you what they mean in plain language.", fi: "Luemme vikakoodit ja kerromme selkokielellä, mitä ne tarkoittavat." },
        priceFrom: 69,
      },
      {
        id: "timing-belt",
        name: { en: "Timing belt or chain", fi: "Jakohihna tai -ketju" },
        blurb: { en: "Replacement on schedule, before it becomes the expensive kind of problem.", fi: "Vaihto ajallaan, ennen kuin siitä tulee kallis ongelma." },
        priceFrom: 450,
      },
      {
        id: "engine-repair",
        name: { en: "Engine repair", fi: "Moottorin korjaus" },
        blurb: { en: "Scope and price confirmed after we have the engine in front of us.", fi: "Työn laajuus ja hinta vahvistetaan, kun moottori on edessämme." },
        quoteOnly: true,
      },
    ],
  },
  {
    id: "brakes",
    title: { en: "Brakes", fi: "Jarrut" },
    standfirst: { en: "Priced per axle. We show you the worn parts we take off before anything goes back on.", fi: "Hinta akselia kohden. Näytämme kuluneet osat ennen kuin mitään asennetaan takaisin." },
    items: [
      {
        id: "brake-pads",
        name: { en: "Brake pad replacement", fi: "Jarrupalojen vaihto" },
        blurb: { en: "Pads replaced per axle, with the discs measured while we are in there.", fi: "Palat vaihdetaan akselikohtaisesti ja levyt mitataan samalla." },
        priceFrom: 150,
      },
      {
        id: "brake-discs",
        name: { en: "Brake discs and pads", fi: "Jarrulevyt ja -palat" },
        blurb: { en: "Discs and pads together per axle — the usual fix once discs are past limit.", fi: "Levyt ja palat akselikohtaisesti — tavallinen korjaus, kun levyt ovat kuluneet loppuun." },
        priceFrom: 280,
      },
      {
        id: "brake-fluid",
        name: { en: "Brake fluid change", fi: "Jarrunesteen vaihto" },
        blurb: { en: "Full bleed and fresh fluid. Due every couple of years on most cars.", fi: "Täysi ilmaus ja uusi neste. Useimmissa autoissa parin vuoden välein." },
        priceFrom: 99,
      },
    ],
  },
  {
    id: "wheels",
    title: { en: "Tyres and wheels", fi: "Renkaat ja vanteet" },
    standfirst: { en: "Seasonal changeovers, geometry, and somewhere to keep the set you are not using.", fi: "Kausivaihdot, suuntaukset ja säilytys sille rengassarjalle, joka ei ole käytössä." },
    items: [
      {
        id: "tyre-change",
        name: { en: "Tyre change, set of four", fi: "Renkaiden vaihto, 4 kpl" },
        blurb: { en: "Summer to winter and back again, balanced and torqued to spec.", fi: "Kesästä talveen ja takaisin, tasapainotettuna ja momenttiin kiristettynä." },
        priceFrom: 60,
      },
      {
        id: "wheel-alignment",
        name: { en: "Wheel alignment", fi: "Pyöränsuuntaus" },
        blurb: { en: "Geometry reset so the car tracks straight and the tyres wear evenly.", fi: "Suuntaus kohdalleen, jotta auto kulkee suoraan ja renkaat kuluvat tasaisesti." },
        priceFrom: 90,
      },
      {
        id: "tyre-storage",
        name: { en: "Tyre storage", fi: "Rengashotelli" },
        blurb: { en: "Your off-season set kept indoors, cleaned and ready for the swap.", fi: "Kauden ulkopuolinen rengassarja sisäsäilytyksessä, pestynä ja vaihtovalmiina." },
        priceFrom: 39,
        unit: "season",
      },
    ],
  },
  {
    id: "climate",
    title: { en: "Air conditioning", fi: "Ilmastointi" },
    standfirst: { en: "The system most people only think about on the first warm week of the year.", fi: "Järjestelmä, jota useimmat muistavat vasta vuoden ensimmäisellä lämpimällä viikolla." },
    items: [
      {
        id: "ac-service",
        name: { en: "AC service and refrigerant top-up", fi: "Ilmastoinnin huolto ja täyttö" },
        blurb: { en: "System evacuated, recharged and pressure-tested.", fi: "Järjestelmä tyhjennetään, täytetään ja painekoestetaan." },
        priceFrom: 139,
      },
      {
        id: "ac-leak",
        name: { en: "AC leak diagnostics", fi: "Ilmastoinnin vuodonetsintä" },
        blurb: { en: "We trace where the refrigerant is escaping before selling you a refill.", fi: "Etsimme mistä kylmäaine karkaa ennen kuin myymme sinulle täyttöä." },
        priceFrom: 79,
      },
    ],
  },
  {
    id: "underbody",
    title: { en: "Chassis and underbody", fi: "Alusta ja pohja" },
    standfirst: { en: "Suspension, exhaust and everything that takes the worst of a Finnish winter.", fi: "Jousitus, pakoputkisto ja kaikki se, mikä kärsii Suomen talvesta eniten." },
    items: [
      {
        id: "chassis-inspection",
        name: { en: "Chassis inspection", fi: "Alustan tarkastus" },
        blurb: { en: "On the lift, checking corrosion, mounts, bushings and joints.", fi: "Nosturilla: ruoste, kiinnikkeet, holkit ja nivelet tarkastetaan." },
        priceFrom: 69,
      },
      {
        id: "suspension-repair",
        name: { en: "Suspension repair", fi: "Jousituksen korjaus" },
        blurb: { en: "Shocks, springs, arms and bushings — priced once we know what has gone.", fi: "Iskunvaimentimet, jouset, tukivarret ja holkit — hinta selviää kun vika on tiedossa." },
        quoteOnly: true,
      },
      {
        id: "exhaust-repair",
        name: { en: "Exhaust repair", fi: "Pakoputken korjaus" },
        blurb: { en: "Sections, mounts and joints repaired or replaced.", fi: "Osat, kiinnikkeet ja liitokset korjataan tai vaihdetaan." },
        priceFrom: 90,
      },
    ],
  },
  {
    id: "body",
    title: { en: "Whole car", fi: "Koko auto" },
    standfirst: { en: "Inspections and electrical work that do not belong to any one corner of the car.", fi: "Tarkastukset ja sähkötyöt, jotka eivät kuulu mihinkään yksittäiseen auton osaan." },
    items: [
      {
        id: "pre-purchase",
        name: { en: "Pre-purchase inspection", fi: "Ostotarkastus" },
        blurb: { en: "Before you buy: what it needs now, and what it will need soon.", fi: "Ennen ostoa: mitä auto tarvitsee nyt ja mitä pian." },
        priceFrom: 119,
      },
      {
        id: "general-diagnostics",
        name: { en: "General diagnostics", fi: "Yleisvianhaku" },
        blurb: { en: "Full fault-code scan across the car's systems, with the results explained.", fi: "Kaikkien järjestelmien vikakoodit luetaan ja tulokset selitetään." },
        priceFrom: 49,
      },
      {
        id: "battery-electrical",
        name: { en: "Battery and charging check", fi: "Akun ja latauksen tarkastus" },
        blurb: { en: "Battery health, alternator output and starter draw tested together.", fi: "Akun kunto, laturin tuotto ja käynnistimen virranotto testataan yhdessä." },
        priceFrom: 45,
      },
      {
        id: "lighting",
        name: { en: "Headlight and bulb service", fi: "Valojen ja polttimoiden huolto" },
        blurb: { en: "Bulbs replaced and beam alignment set — a common inspection failure.", fi: "Polttimot vaihdetaan ja valot suunnataan — yleinen katsastuksen hylkäyssyy." },
        priceFrom: 35,
      },
      {
        id: "inspection-failure",
        name: { en: "Inspection-failure repair package", fi: "Katsastuskorjaukset" },
        blurb: { en: "Bring us the failure sheet and we will work through it and re-present the car.", fi: "Tuo hylkäyslappu, niin hoidamme kohdat kuntoon ja viemme auton jälkitarkastukseen." },
        quoteOnly: true,
      },
    ],
  },
];

/**
 * Which part each region's price callout hangs off, and which side the card
 * sits on so it stays inside frame. Consumed by both the 3D scene (anchored to
 * the part's mesh, so it tracks through the explode) and the SVG diagram.
 */
export const REGION_ANCHORS: Record<
  CarRegionId,
  { partId: string; side: "left" | "right" | "top"; svgX: number }
> = {
  engine: { partId: "engine-block", side: "right", svgX: 80 },
  brakes: { partId: "disc-rl", side: "left", svgX: 28 },
  wheels: { partId: "wheel-rl", side: "left", svgX: 30 },
  climate: { partId: "ac-condenser", side: "right", svgX: 76 },
  underbody: { partId: "muffler", side: "left", svgX: 22 },
  body: { partId: "battery", side: "right", svgX: 52 },
};
