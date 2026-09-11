import type { Localized } from "@/lib/i18n";

/**
 * The site's ONE price list. Rendered only by components/Pricing.tsx.
 *
 * ⚠️ PLACEHOLDER FIGURES. The five rows that existed before this file — vehicle
 * inspection 120 €, Tesla service packages 290–330 €, filters/oil/tyres 80 €,
 * AC service 150–200 €, labour 80 €/hr — are carried over as given. Everything
 * else is INVENTED to make the table complete and must be replaced with real
 * rates before launch.
 *
 * Previously prices lived in two places with different shapes: fields on
 * data/services.ts that were never rendered, and a hardcoded array inside the
 * trust section. A visitor could not reconcile the two. There is now one table,
 * in one section, and the 3D explorer names services without ever pricing them.
 */

export type PriceRow = {
  id: string;
  service: Localized;
  /** Pre-formatted, because ranges and per-unit rates are not single numbers. */
  price: Localized | null;
  /** Shown when `price` is null: the job has to be seen before it is priced. */
  note?: Localized;
};

export type PriceTable = {
  id: "tesla" | "general";
  groups: Array<{ title: Localized; rows: PriceRow[] }>;
};

const L = (en: string, fi: string): Localized => ({ en, fi });
/** Most prices are identical in both languages; this keeps the table readable. */
const P = (value: string): Localized => ({ en: value, fi: value });

export const PRICE_TABLES: PriceTable[] = [
  {
    id: "tesla",
    groups: [
      {
        title: L("Inspection & diagnostics", "Tarkastus ja vianhaku"),
        rows: [
          {
            id: "t-health",
            service: L("HV battery health report", "Ajoakun kuntoraportti"),
            price: P("149 €"),
          },
          {
            id: "t-inspection",
            service: L("Full vehicle inspection", "Auton kuntotarkastus"),
            price: P("120 €"),
          },
          {
            id: "t-diag",
            service: L("Fault diagnosis, first hour", "Vianhaku, ensimmäinen tunti"),
            price: P("80 €"),
          },
          {
            id: "t-drive",
            service: L("Drive unit diagnostics", "Voimalinjan vianhaku"),
            price: null,
            note: L("Quoted after inspection", "Hinta tarkastuksen jälkeen"),
          },
        ],
      },
      {
        title: L("Service packages", "Huoltopaketit"),
        rows: [
          {
            id: "t-package",
            service: L("Tesla annual service", "Teslan vuosihuolto"),
            price: P("290–330 €"),
          },
          {
            id: "t-caliper",
            service: L("Caliper strip, clean & lubricate", "Jarrusatuloiden puhdistus ja voitelu"),
            price: P("180 €"),
          },
          {
            id: "t-fluid",
            service: L("Brake fluid change", "Jarrunesteen vaihto"),
            price: P("99 €"),
          },
          {
            id: "t-coolant",
            service: L("Coolant service", "Jäähdytysnesteen huolto"),
            price: P("190 €"),
          },
        ],
      },
      {
        title: L("Common repairs", "Yleisimmät korjaukset"),
        rows: [
          {
            id: "t-lv",
            service: L("12 V battery replacement", "12 V:n apuakun vaihto"),
            price: P("240 €"),
          },
          {
            id: "t-discs",
            service: L("Discs & pads, per axle", "Levyt ja palat, akselia kohden"),
            price: P("380 €"),
          },
          {
            id: "t-arms",
            service: L("Control arms, per corner", "Tukivarret, kulmaa kohden"),
            price: P("290 €"),
          },
          {
            id: "t-align",
            service: L("Four-wheel alignment", "Nelipyöräsuuntaus"),
            price: P("120 €"),
          },
          {
            id: "t-ac",
            service: L("AC service & desiccant", "Ilmastointihuolto ja kuivain"),
            price: P("150–200 €"),
          },
          {
            id: "t-heatpump",
            service: L("Heat pump diagnostics", "Lämpöpumpun vianhaku"),
            price: null,
            note: L("Quoted after inspection", "Hinta tarkastuksen jälkeen"),
          },
        ],
      },
    ],
  },
  {
    id: "general",
    groups: [
      {
        title: L("Routine servicing", "Perushuollot"),
        rows: [
          {
            id: "g-service",
            service: L("Filters, oil change, tyre work", "Suodattimet, öljynvaihto, rengastyöt"),
            price: P("80 €"),
          },
          {
            id: "g-inspection",
            service: L("Full vehicle inspection", "Auton kuntotarkastus"),
            price: P("120 €"),
          },
          {
            id: "g-prepurchase",
            service: L("Pre-purchase inspection", "Ostotarkastus"),
            price: P("119 €"),
          },
          {
            id: "g-diag",
            service: L("Diagnostics, fault codes read", "Vianhaku, vikakoodien luku"),
            price: P("69 €"),
          },
        ],
      },
      {
        title: L("Brakes, tyres & chassis", "Jarrut, renkaat ja alusta"),
        rows: [
          {
            id: "g-pads",
            service: L("Brake pads, per axle", "Jarrupalat, akselia kohden"),
            price: P("150 €"),
          },
          {
            id: "g-discs",
            service: L("Discs & pads, per axle", "Levyt ja palat, akselia kohden"),
            price: P("280 €"),
          },
          {
            id: "g-fluid",
            service: L("Brake fluid change", "Jarrunesteen vaihto"),
            price: P("99 €"),
          },
          {
            id: "g-tyres",
            service: L("Seasonal tyre change, set of four", "Kausivaihto, 4 rengasta"),
            price: P("60 €"),
          },
          {
            id: "g-storage",
            service: L("Tyre storage, per season", "Rengashotelli, kausi"),
            price: P("39 €"),
          },
          {
            id: "g-align",
            service: L("Wheel alignment", "Pyöränsuuntaus"),
            price: P("90 €"),
          },
        ],
      },
      {
        title: L("Engine & bodywork", "Moottori ja korjaukset"),
        rows: [
          {
            id: "g-timing",
            service: L("Timing belt or chain", "Jakohihna tai -ketju"),
            price: P("450 €"),
          },
          {
            id: "g-ac",
            service: L("AC service", "Ilmastoinnin huolto"),
            price: P("150–200 €"),
          },
          {
            id: "g-exhaust",
            service: L("Exhaust repair", "Pakoputken korjaus"),
            price: P("90 €"),
          },
          {
            id: "g-lights",
            service: L("Headlight & bulb service", "Valojen ja polttimoiden huolto"),
            price: P("35 €"),
          },
          {
            id: "g-inspectionfix",
            service: L("Inspection-failure repairs", "Katsastuskorjaukset"),
            price: null,
            note: L("Bring the failure sheet", "Tuo hylkäyslappu"),
          },
          {
            id: "g-engine",
            service: L("Engine & suspension repair", "Moottorin ja jousituksen korjaus"),
            price: null,
            note: L("Quoted after inspection", "Hinta tarkastuksen jälkeen"),
          },
        ],
      },
    ],
  },
];
