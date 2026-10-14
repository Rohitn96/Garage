import { AC_LICENSED } from "@/lib/business";
import type { Localized } from "@/lib/i18n";

/**
 * Tesla page content and data.
 *
 * The model picker is the S3XY joke, but it is load-bearing: owners identify by
 * letter, so the four letters are the page's primary filter control rather than
 * a decorative flourish. Every service declares which models it applies to, and
 * picking a letter narrows the list to that car.
 *
 * KEEP THIS PLAIN. The page was twice this length and read as if it had been
 * lifted from a Tesla forum: Octovalve, Superbottle, HEPA, falcon-wing door
 * travel resets, a paragraph of winter range percentages, block exemption law.
 * It described the marque rather than the shop, none of it was a job a customer
 * would ring up and ask for by name, and no claim in it had been earned yet.
 * What is left is the work itself, in the words an owner would use: a name, one
 * line saying what it is, nothing more. Anything that cannot survive that test
 * does not belong on the page.
 *
 * ⚠️ Finnish is unreviewed — see the note in lib/content.ts.
 */

const L = (en: string, fi: string): Localized => ({ en, fi });

export type TeslaModel = "S" | "3" | "X" | "Y";

/** All four, in the order that spells the thing. */
export const TESLA_MODELS: Array<{
  code: TeslaModel;
  name: Localized;
  note: Localized;
}> = [
  {
    code: "S",
    name: L("Model S", "Model S"),
    note: L("Air suspension", "Ilmajousitus"),
  },
  {
    code: "3",
    name: L("Model 3", "Model 3"),
    note: L("The common one here", "Suomen yleisin"),
  },
  {
    code: "X",
    name: L("Model X", "Model X"),
    note: L("Air suspension", "Ilmajousitus"),
  },
  {
    code: "Y",
    name: L("Model Y", "Model Y"),
    note: L("Hardest on tyres", "Kuluttaa renkaita eniten"),
  },
];

const ALL: TeslaModel[] = ["S", "3", "X", "Y"];

export type TeslaServiceGroupId =
  | "battery"
  | "drive"
  | "brakes"
  | "suspension"
  | "climate";

export type TeslaService = {
  id: string;
  name: Localized;
  blurb: Localized;
  models: TeslaModel[];
};

export type TeslaServiceGroup = {
  id: TeslaServiceGroupId;
  title: Localized;
  standfirst: Localized;
  items: TeslaService[];
};

const ALL_TESLA_SERVICES: TeslaServiceGroup[] = [
  {
    id: "battery",
    title: L("Battery and charging", "Akku ja lataus"),
    standfirst: L(
      "The big battery, and the small one that strands more cars than it does.",
      "Iso akku, ja pieni akku joka jättää useamman auton tielle.",
    ),
    items: [
      {
        id: "hv-health",
        name: L("Battery health check", "Akun kuntotarkastus"),
        blurb: L(
          "Capacity and condition measured and written down.",
          "Kapasiteetti ja kunto mitataan ja kirjataan.",
        ),
        models: ALL,
      },
      {
        id: "lv-battery",
        name: L("12 V battery", "12 V:n akku"),
        blurb: L(
          "The usual reason a Tesla will not start. Replaced same day.",
          "Tavallisin syy siihen ettei Tesla lähde. Vaihto samana päivänä.",
        ),
        models: ALL,
      },
      {
        id: "charging",
        name: L("Charging faults", "Latausviat"),
        blurb: L(
          "Charge port, cable and charger problems, including frozen latches.",
          "Latausportin, kaapelin ja laturin viat, myös jäätyneet salvat.",
        ),
        models: ALL,
      },
    ],
  },
  {
    id: "drive",
    title: L("Motors and drivetrain", "Moottorit ja voimansiirto"),
    standfirst: L(
      "Noise, vibration or lost power, traced to the part causing it.",
      "Ääni, tärinä tai kadonnut teho jäljitetään sen aiheuttajaan.",
    ),
    items: [
      {
        id: "drive-diag",
        name: L("Drive unit diagnostics", "Voimalinjan vianhaku"),
        blurb: L(
          "We find which unit and why before quoting.",
          "Selvitämme minkä yksikön ja miksi ennen tarjousta.",
        ),
        models: ALL,
      },
      {
        id: "gear-axles",
        name: L("Gearbox and driveshafts", "Vaihteisto ja vetoakselit"),
        blurb: L("Oil, seals and shafts.", "Öljy, tiivisteet ja akselit."),
        models: ALL,
      },
      {
        id: "hv-cabling",
        name: L("High-voltage work", "Suurjännitetyöt"),
        blurb: L(
          "Certified work on the orange side of the car.",
          "Sertifioitua työtä auton oranssilla puolella.",
        ),
        models: ALL,
      },
    ],
  },
  {
    id: "brakes",
    title: L("Brakes", "Jarrut"),
    standfirst: L(
      "Regen does most of the braking, so the brakes rust instead of wearing out.",
      "Regen hoitaa suurimman osan jarrutuksesta, joten jarrut ruostuvat kulumisen sijaan.",
    ),
    items: [
      {
        id: "caliper-service",
        name: L("Caliper clean and lubricate", "Jarrusatuloiden puhdistus ja voitelu"),
        blurb: L(
          "The most useful yearly job on a Tesla here.",
          "Hyödyllisin vuosittainen työ Teslalle täällä.",
        ),
        models: ALL,
      },
      {
        id: "brake-fluid",
        name: L("Brake fluid change", "Jarrunesteen vaihto"),
        blurb: L(
          "Every two years, whatever the pads look like.",
          "Kahden vuoden välein, näyttivät palat miltä tahansa.",
        ),
        models: ALL,
      },
      {
        id: "discs-pads",
        name: L("Discs and pads", "Levyt ja palat"),
        blurb: L("Replaced per axle.", "Vaihdetaan akselikohtaisesti."),
        models: ALL,
      },
    ],
  },
  {
    id: "suspension",
    title: L("Suspension, steering and tyres", "Alusta, ohjaus ja renkaat"),
    standfirst: L(
      "Heavy cars on bad winter roads.",
      "Painavia autoja huonoilla talviteillä.",
    ),
    items: [
      {
        id: "control-arms",
        name: L("Control arms and bushings", "Tukivarret ja holkit"),
        blurb: L(
          "The knock over bumps, fixed one corner at a time.",
          "Se kolahdus epätasaisella, korjattuna kulma kerrallaan.",
        ),
        models: ["3", "Y"],
      },
      {
        id: "air-suspension",
        name: L("Air suspension", "Ilmajousitus"),
        blurb: L(
          "Cars that sit down overnight.",
          "Autot jotka laskeutuvat yön aikana.",
        ),
        models: ["S", "X"],
      },
      {
        id: "alignment",
        name: L("Wheel alignment", "Pyöränsuuntaus"),
        blurb: L(
          "After suspension work, and after pothole season.",
          "Alustatöiden ja kuoppakauden jälkeen.",
        ),
        models: ALL,
      },
      {
        id: "tyres",
        name: L("Tyres and seasonal change", "Renkaat ja kausivaihto"),
        blurb: L(
          "Fitting, rotation and storage.",
          "Asennus, kierto ja säilytys.",
        ),
        models: ALL,
      },
    ],
  },
  {
    id: "climate",
    title: L("Heating and air conditioning", "Lämmitys ja ilmastointi"),
    standfirst: L(
      "Heat, cooling, and the pump that does both.",
      "Lämpö, viilennys ja pumppu joka hoitaa molemmat.",
    ),
    items: [
      {
        id: "heat-pump",
        name: L("Heat pump", "Lämpöpumppu"),
        blurb: L(
          "Poor heat, or a sudden drop in winter range.",
          "Heikko lämpö tai äkillinen talvimatkan lasku.",
        ),
        models: ALL,
      },
      {
        id: "ac-service",
        name: L("Air conditioning service", "Ilmastoinnin huolto"),
        blurb: L(
          "Emptied, refilled and pressure tested.",
          "Tyhjennys, täyttö ja painekoe.",
        ),
        models: ALL,
      },
      {
        id: "cabin-filter",
        name: L("Cabin filters", "Raitisilmasuodattimet"),
        blurb: L("Changed, both of them.", "Vaihdetaan, molemmat."),
        models: ALL,
      },
    ],
  },
];

/**
 * The climate group is held back until the F-gas certificate is in hand; see
 * AC_LICENSED in lib/business.ts.
 */
export const TESLA_SERVICES: TeslaServiceGroup[] = ALL_TESLA_SERVICES.filter(
  (group) => AC_LICENSED || group.id !== "climate",
);

/**
 * Three questions, answered in a line each.
 *
 * The warranty one is the only question a Tesla owner always asks an
 * independent shop, so it goes first and is answered without hedging.
 */
export const TESLA_FAQ: Array<{ q: Localized; a: Localized }> = [
  {
    q: L(
      "Does servicing here void my warranty?",
      "Mitätöikö huolto täällä takuuni?",
    ),
    a: L(
      "No. Your manufacturer warranty stays as it is when an independent garage services the car properly and records the work. We record it.",
      "Ei. Valmistajan takuu säilyy, kun riippumaton korjaamo huoltaa auton oikein ja kirjaa työn. Me kirjaamme sen.",
    ),
  },
  {
    q: L(
      "Are you certified for high-voltage work?",
      "Onko teillä suurjännitepätevyys?",
    ),
    a: L(
      "Yes. High-voltage systems are isolated and handled to standard, by people trained for it.",
      "Kyllä. Suurjännitejärjestelmät erotetaan ja käsitellään standardin mukaan, siihen koulutettujen toimesta.",
    ),
  },
  {
    q: L("Do you work on other electric cars?", "Huollatteko muita sähköautoja?"),
    a: L(
      "Yes. Polestar, Volkswagen ID, Kia, Hyundai, BMW i and the rest.",
      "Kyllä. Polestar, Volkswagen ID, Kia, Hyundai, BMW i ja muut.",
    ),
  },
];

export const TESLA_COPY = {
  eyebrow: L("Tesla servicing · Helsinki", "Tesla-huolto · Helsinki"),
  headlineA: L("Pick your", "Valitse"),
  headlineAccent: L("letter.", "kirjaimesi."),
  standfirst: L(
    "Independent Tesla servicing in Tattarisuo, Helsinki. Pick your model to see what we do on it.",
    "Riippumatonta Tesla-huoltoa Tattarisuolla Helsingissä. Valitse mallisi, niin näet mitä teemme sille.",
  ),
  allModels: L("All models", "Kaikki mallit"),
  showingFor: L("Showing work for", "Näytetään työt mallille"),
  servicesEyebrow: L("Tesla services", "Tesla-palvelut"),
  servicesHeadingA: L("What we", "Mitä"),
  servicesHeadingAccent: L("work on.", "huollamme."),
  faqEyebrow: L("Straight answers", "Suoria vastauksia"),
  faqHeadingA: L("The questions", "Kysymykset"),
  faqHeadingAccent: L("everyone asks.", "joita kaikki kysyvät."),
  ctaHeadingA: L("Bring us", "Tuo meille"),
  ctaHeadingAccent: L("the car.", "autosi."),
  ctaBody: L(
    "Tell us the model and what it is doing. We will come back with what it needs and what it costs.",
    "Kerro malli ja mitä auto tekee. Palaamme siihen mitä se tarvitsee ja mitä se maksaa.",
  ),
  ctaButton: L("Book a slot", "Varaa aika"),
  pricingLink: L("Tesla pricing", "Tesla-hinnasto"),
};
