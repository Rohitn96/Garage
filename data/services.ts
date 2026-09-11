import type { Localized } from "@/lib/i18n";

/**
 * The catalogue behind the 3D explorer on the home page.
 *
 * NO PRICES LIVE HERE. The explorer names what we do and nothing else; every
 * figure on the site is in data/pricing.ts and rendered only by the pricing
 * section. Previously this file carried `priceFrom`/`quoteOnly` fields that
 * were never rendered while a second, differently-shaped price list was
 * hardcoded elsewhere — one catalogue, one price list, no contradiction.
 *
 * Regions are EV-first because the model in the scene is an EV: a battery
 * skateboard, two drive units and no engine. Combustion work is not hidden —
 * it has its own door on the home page and its own half of the price list —
 * but the centrepiece states the specialism rather than contradicting it.
 */

/** Which system separates out of the car when this group is selected. */
export type CarRegionId =
  | "battery"
  | "drive"
  | "brakes"
  | "suspension"
  | "climate"
  | "wheels";

export type ServiceItem = {
  id: string;
  name: Localized;
  /** One line, customer-facing. Says what they get, not how we do it. */
  blurb: Localized;
};

export type ServiceGroup = {
  id: CarRegionId;
  /** Two-digit index is rendered from the array position, not stored. */
  title: Localized;
  standfirst: Localized;
  items: ServiceItem[];
};

export const SERVICE_GROUPS: ServiceGroup[] = [
  {
    id: "battery",
    title: { en: "Battery & charging", fi: "Akku ja lataus" },
    standfirst: {
      en: "The high-voltage pack under the floor, and the small 12 V battery that strands more cars than it does.",
      fi: "Lattian alla oleva ajoakku ja pieni 12 V:n akku, joka jättää useamman auton tielle kuin ajoakku.",
    },
    items: [
      {
        id: "hv-health",
        name: { en: "Battery health report", fi: "Akun kuntoraportti" },
        blurb: {
          en: "Capacity and degradation measured and written up, not guessed at.",
          fi: "Kapasiteetti ja kuluma mitataan ja kirjataan, ei arvata.",
        },
      },
      {
        id: "lv-battery",
        name: { en: "12 V battery replacement", fi: "12 V:n apuakun vaihto" },
        blurb: {
          en: "The most common reason an EV will not wake up. Same-day fix.",
          fi: "Yleisin syy siihen ettei sähköauto herää. Korjaus samana päivänä.",
        },
      },
      {
        id: "charging",
        name: { en: "Charge port & onboard charger", fi: "Latausportti ja laturi" },
        blurb: {
          en: "Latch, heater and contact faults — including cables that stick in frost.",
          fi: "Salpa-, lämmitin- ja kontaktiviat — myös pakkasessa kiinni jäävät kaapelit.",
        },
      },
      {
        id: "coolant",
        name: { en: "Battery cooling service", fi: "Akun jäähdytyksen huolto" },
        blurb: {
          en: "Coolant, pumps and the loop that keeps the pack in its window.",
          fi: "Neste, pumput ja piiri joka pitää akun oikeassa lämpötilassa.",
        },
      },
    ],
  },
  {
    id: "drive",
    title: { en: "Drive units", fi: "Voimalinja" },
    standfirst: {
      en: "Motors, reduction gears and inverters — front, rear or both.",
      fi: "Moottorit, alennusvaihteet ja invertterit — edessä, takana tai molemmissa.",
    },
    items: [
      {
        id: "drive-diag",
        name: { en: "Drive unit diagnostics", fi: "Voimalinjan vianhaku" },
        blurb: {
          en: "Whine, shudder or a power limit traced to the unit that is causing it.",
          fi: "Vinkuna, tärinä tai tehorajoitus jäljitetään sen aiheuttavaan yksikköön.",
        },
      },
      {
        id: "gearbox",
        name: { en: "Reduction gear & axles", fi: "Alennusvaihde ja vetoakselit" },
        blurb: {
          en: "Fluid, seals and half-shafts, including the clunk on hard take-off.",
          fi: "Öljy, tiivisteet ja vetoakselit — myös kolahdus kovassa lähdössä.",
        },
      },
      {
        id: "hv-cable",
        name: { en: "HV cabling & connectors", fi: "Suurjännitekaapelit ja liittimet" },
        blurb: {
          en: "Isolation faults found properly. Certified high-voltage work.",
          fi: "Eristysviat löydetään kunnolla. Sertifioitu suurjännitetyö.",
        },
      },
      {
        id: "engine-too",
        name: { en: "Petrol & diesel engines", fi: "Bensa- ja dieselmoottorit" },
        blurb: {
          en: "Servicing, timing belts and engine repair — we did not stop doing these.",
          fi: "Huollot, jakohihnat ja moottorikorjaukset — emme lopettaneet näitä.",
        },
      },
    ],
  },
  {
    id: "brakes",
    title: { en: "Brakes & regen", fi: "Jarrut ja regen" },
    standfirst: {
      en: "Regen does most of the stopping, so the friction brakes corrode instead of wearing out.",
      fi: "Regen hoitaa suurimman osan jarrutuksesta, joten kitkajarrut ruostuvat sen sijaan että kuluisivat.",
    },
    items: [
      {
        id: "caliper",
        name: { en: "Caliper clean & lubricate", fi: "Satuloiden puhdistus ja voitelu" },
        blurb: {
          en: "The most useful annual job on any EV driven through a Finnish winter.",
          fi: "Hyödyllisin vuosihuolto sähköautolle, joka ajaa Suomen talven läpi.",
        },
      },
      {
        id: "discs-pads",
        name: { en: "Discs & pads", fi: "Levyt ja palat" },
        blurb: {
          en: "Replaced per axle, with the old parts shown to you before anything goes on.",
          fi: "Vaihdetaan akselikohtaisesti, vanhat osat näytetään ennen asennusta.",
        },
      },
      {
        id: "brake-fluid",
        name: { en: "Brake fluid change", fi: "Jarrunesteen vaihto" },
        blurb: {
          en: "Every two years regardless of wear. Moisture does not care how you drive.",
          fi: "Kahden vuoden välein kulumasta riippumatta. Kosteus ei välitä ajotyylistä.",
        },
      },
    ],
  },
  {
    id: "suspension",
    title: { en: "Suspension & steering", fi: "Alusta ja ohjaus" },
    standfirst: {
      en: "Heavy cars, bad winter roads. Control arms and bushings are the usual answer.",
      fi: "Painavia autoja, huonoja talviteitä. Tukivarret ja holkit ovat tavallinen vastaus.",
    },
    items: [
      {
        id: "arms",
        name: { en: "Control arms & bushings", fi: "Tukivarret ja holkit" },
        blurb: {
          en: "That knock over expansion joints, sorted one corner at a time.",
          fi: "Se kolahdus saumakohdissa, korjattuna kulma kerrallaan.",
        },
      },
      {
        id: "air-susp",
        name: { en: "Air suspension diagnostics", fi: "Ilmajousituksen vianhaku" },
        blurb: {
          en: "Compressor, struts and height sensors on cars that sit down overnight.",
          fi: "Kompressori, jouset ja korkeusanturit autoissa jotka laskeutuvat yöllä.",
        },
      },
      {
        id: "chassis",
        name: { en: "Underbody & corrosion check", fi: "Pohjan ja ruosteen tarkastus" },
        blurb: {
          en: "On the lift after salt season, with photos of anything we find.",
          fi: "Nosturilla suolakauden jälkeen, kuvat kaikesta löydetystä.",
        },
      },
    ],
  },
  {
    id: "climate",
    title: { en: "Heat pump & climate", fi: "Lämpöpumppu ja ilmastointi" },
    standfirst: {
      en: "In this climate the heat pump is a range component, not a comfort feature.",
      fi: "Näissä oloissa lämpöpumppu on toimintamatkan osa, ei mukavuusvaruste.",
    },
    items: [
      {
        id: "heat-pump",
        name: { en: "Heat pump diagnostics", fi: "Lämpöpumpun vianhaku" },
        blurb: {
          en: "Poor heat or a sudden winter range drop traced to valve, sensor or refrigerant.",
          fi: "Heikko lämpö tai äkillinen talvimatkan lasku jäljitetään venttiiliin tai anturiin.",
        },
      },
      {
        id: "ac",
        name: { en: "AC service & recharge", fi: "Ilmastoinnin huolto ja täyttö" },
        blurb: {
          en: "Evacuated, recharged and pressure-tested, desiccant renewed.",
          fi: "Tyhjennys, täyttö ja painekoe, kuivain uusitaan.",
        },
      },
      {
        id: "filters",
        name: { en: "Cabin filters", fi: "Raitisilmasuodattimet" },
        blurb: {
          en: "Both filters plus the evaporator clean that stops the damp smell.",
          fi: "Molemmat suodattimet ja höyrystimen puhdistus, joka poistaa kostean hajun.",
        },
      },
    ],
  },
  {
    id: "wheels",
    title: { en: "Wheels & tyres", fi: "Renkaat ja vanteet" },
    standfirst: {
      en: "Instant torque and two tonnes eat tyres. Rotation on schedule is cheaper than a new set.",
      fi: "Välitön vääntö ja kaksi tonnia syövät renkaita. Säännöllinen kierto on halvempi kuin uusi sarja.",
    },
    items: [
      {
        id: "seasonal",
        name: { en: "Seasonal changeover", fi: "Kausivaihto" },
        blurb: {
          en: "Summer to winter and back, balanced and torqued to spec.",
          fi: "Kesästä talveen ja takaisin, tasapainotettuna ja momenttiin kiristettynä.",
        },
      },
      {
        id: "alignment",
        name: { en: "Four-wheel alignment", fi: "Nelipyöräsuuntaus" },
        blurb: {
          en: "After suspension work, and after the first pothole season.",
          fi: "Alustatöiden jälkeen ja ensimmäisen kuoppakauden jälkeen.",
        },
      },
      {
        id: "rotation",
        name: { en: "Rotation & wear check", fi: "Rengaskierto ja kulumatarkastus" },
        blurb: {
          en: "We will tell you honestly when a set has one season left, not three.",
          fi: "Kerromme rehellisesti kun sarjassa on yksi kausi jäljellä, ei kolme.",
        },
      },
      {
        id: "storage",
        name: { en: "Tyre storage", fi: "Rengashotelli" },
        blurb: {
          en: "Your off-season set kept indoors, cleaned and ready for the swap.",
          fi: "Kauden ulkopuolinen sarja sisällä, pestynä ja vaihtovalmiina.",
        },
      },
    ],
  },
];
