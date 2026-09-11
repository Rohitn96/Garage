import type { Localized } from "@/lib/i18n";

/**
 * Tesla page content and data.
 *
 * The model picker is the S3XY joke, but it is load-bearing: owners identify by
 * letter, so the four letters are the page's primary filter control rather than
 * a decorative flourish. Every service declares which models it applies to, and
 * picking a letter narrows the list to that car.
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
    note: L("Air suspension, big brakes", "Ilmajousitus, isot jarrut"),
  },
  {
    code: "3",
    name: L("Model 3", "Model 3"),
    note: L("The volume car in Finland", "Suomen yleisin malli"),
  },
  {
    code: "X",
    name: L("Model X", "Model X"),
    note: L("Falcon doors, air suspension", "Falcon-ovet, ilmajousitus"),
  },
  {
    code: "Y",
    name: L("Model Y", "Model Y"),
    note: L("Heaviest on tyres", "Kuluttaa renkaita eniten"),
  },
];

const ALL: TeslaModel[] = ["S", "3", "X", "Y"];

export type TeslaServiceGroupId =
  | "battery"
  | "drive"
  | "brakes"
  | "suspension"
  | "climate"
  | "body";

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

export const TESLA_SERVICES: TeslaServiceGroup[] = [
  {
    id: "battery",
    title: L("Battery & charging", "Akku ja lataus"),
    standfirst: L(
      "High voltage and low voltage. The 12 V is the one that actually strands people.",
      "Korkea- ja matalajännite. Juuri 12 V on se, joka jättää kuskin tien päälle.",
    ),
    items: [
      {
        id: "hv-health",
        name: L("HV battery health report", "Ajoakun kuntoraportti"),
        blurb: L(
          "Capacity, cell balance and degradation, written up so you can show a buyer.",
          "Kapasiteetti, kennotasapaino ja kuluma kirjallisena — voit näyttää sen ostajalle.",
        ),
        models: ALL,
      },
      {
        id: "lv-battery",
        name: L("12 V / low-voltage battery", "12 V:n apuakku"),
        blurb: L(
          "The most common thing that stops a Tesla. Tested and replaced same day.",
          "Yleisin syy siihen, että Tesla ei lähde. Testataan ja vaihdetaan samana päivänä.",
        ),
        models: ALL,
      },
      {
        id: "charge-port",
        name: L("Charge port & onboard charger", "Latausportti ja laturi"),
        blurb: L(
          "Latch, heater and contact faults — the reason a cable will not release in winter.",
          "Salpa-, lämmitin- ja kontaktiviat — syy siihen miksi kaapeli ei irtoa talvella.",
        ),
        models: ALL,
      },
      {
        id: "coolant",
        name: L("Coolant service & Superbottle", "Jäähdytysneste ja Superbottle"),
        blurb: L(
          "Battery and drive unit cooling, including the pump assembly that fails on early cars.",
          "Akun ja voimalinjan jäähdytys, mukaan lukien varhaisten autojen pumppuyksikkö.",
        ),
        models: ["S", "3", "X", "Y"],
      },
    ],
  },
  {
    id: "drive",
    title: L("Drive units & inverters", "Voimalinja ja invertterit"),
    standfirst: L(
      "Motors, reduction gears and the electronics that feed them.",
      "Moottorit, alennusvaihteet ja niitä syöttävä elektroniikka.",
    ),
    items: [
      {
        id: "drive-diag",
        name: L("Drive unit diagnostics", "Voimalinjan vianhaku"),
        blurb: L(
          "Whine, shudder or a power limit — we find which unit and why before quoting.",
          "Vinkuna, tärinä tai tehorajoitus — selvitämme minkä yksikön ja miksi ennen tarjousta.",
        ),
        models: ALL,
      },
      {
        id: "reduction-gear",
        name: L("Reduction gear & axle service", "Alennusvaihde ja vetoakselit"),
        blurb: L(
          "Fluid, seals and half-shafts, including the clunk on hard take-off.",
          "Öljy, tiivisteet ja vetoakselit — myös se kolahdus kovassa lähdössä.",
        ),
        models: ALL,
      },
      {
        id: "hv-cabling",
        name: L("HV cabling & connector inspection", "Suurjännitekaapelit ja liittimet"),
        blurb: L(
          "Isolation faults traced properly instead of guessed at. Certified HV work.",
          "Eristysviat jäljitetään kunnolla eikä arvata. Sertifioitu suurjännitetyö.",
        ),
        models: ALL,
      },
    ],
  },
  {
    id: "brakes",
    title: L("Brakes & regen", "Jarrut ja regen"),
    standfirst: L(
      "Regen means the friction brakes barely get used — which is exactly why they seize here.",
      "Regen tarkoittaa, ettei kitkajarruja juuri käytetä — siksi ne juuri täällä jumittuvat.",
    ),
    items: [
      {
        id: "caliper-service",
        name: L("Caliper strip, clean & lubricate", "Jarrusatuloiden puhdistus ja voitelu"),
        blurb: L(
          "The single most useful annual job on a Finnish Tesla. Stops seized pins and rusted discs.",
          "Suomalaisen Teslan hyödyllisin vuosihuolto. Estää jumittuneet ohjaustapit ja ruostuneet levyt.",
        ),
        models: ALL,
      },
      {
        id: "brake-fluid",
        name: L("Brake fluid change", "Jarrunesteen vaihto"),
        blurb: L(
          "Every two years regardless of pad wear — moisture does not care how little you brake.",
          "Kahden vuoden välein palojen kulumasta riippumatta — kosteus ei välitä jarrutustyylistäsi.",
        ),
        models: ALL,
      },
      {
        id: "discs-pads",
        name: L("Discs & pads", "Levyt ja palat"),
        blurb: L(
          "Replaced per axle when corrosion, not wear, has finished them off.",
          "Vaihdetaan akselikohtaisesti kun ruoste — ei kuluma — on vienyt ne.",
        ),
        models: ALL,
      },
    ],
  },
  {
    id: "suspension",
    title: L("Suspension & steering", "Alusta ja ohjaus"),
    standfirst: L(
      "Heavy cars on bad winter roads. Control arms and bushings are the usual answer.",
      "Painavia autoja huonoilla talviteillä. Tukivarret ja holkit ovat tavallinen vastaus.",
    ),
    items: [
      {
        id: "control-arms",
        name: L("Control arms & bushings", "Tukivarret ja holkit"),
        blurb: L(
          "The knock over expansion joints on a Model 3 or Y, sorted per corner.",
          "Se kolahdus saumakohdissa Model 3:ssa ja Y:ssä, korjattuna kulmittain.",
        ),
        models: ["3", "Y"],
      },
      {
        id: "air-suspension",
        name: L("Air suspension diagnostics", "Ilmajousituksen vianhaku"),
        blurb: L(
          "Compressor, struts and height sensors on cars that sit down overnight.",
          "Kompressori, jouset ja korkeusanturit autoissa, jotka laskeutuvat yön aikana.",
        ),
        models: ["S", "X"],
      },
      {
        id: "alignment",
        name: L("Four-wheel alignment", "Nelipyöräsuuntaus"),
        blurb: L(
          "After any suspension work, and after the first Finnish pothole season.",
          "Alustatöiden jälkeen ja ensimmäisen kuoppakauden jälkeen.",
        ),
        models: ALL,
      },
      {
        id: "tyres",
        name: L("Tyres, rotation & storage", "Renkaat, rengaskierto ja säilytys"),
        blurb: L(
          "Instant torque eats tyres. Rotation on schedule is cheaper than a new set.",
          "Välitön vääntö syö renkaita. Säännöllinen kierto on halvempi kuin uusi sarja.",
        ),
        models: ALL,
      },
    ],
  },
  {
    id: "climate",
    title: L("Heat pump & climate", "Lämpöpumppu ja ilmastointi"),
    standfirst: L(
      "In this climate, the heat pump is a range component, not a comfort feature.",
      "Näissä oloissa lämpöpumppu on toimintamatkan osa, ei mukavuusvaruste.",
    ),
    items: [
      {
        id: "heat-pump",
        name: L("Heat pump & Octovalve diagnostics", "Lämpöpumpun ja Octovalven vianhaku"),
        blurb: L(
          "Poor heat or sudden winter range loss traced to the valve, sensors or refrigerant.",
          "Heikko lämpö tai äkillinen talvimatkan romahdus jäljitetään venttiiliin, antureihin tai kylmäaineeseen.",
        ),
        models: ["3", "Y", "S", "X"],
      },
      {
        id: "ac-service",
        name: L("AC service & desiccant bag", "Ilmastointihuolto ja kuivainpussi"),
        blurb: L(
          "Evacuated, recharged and pressure-tested, with the desiccant renewed.",
          "Tyhjennys, täyttö ja painekoe, kuivain uusittuna.",
        ),
        models: ALL,
      },
      {
        id: "cabin-filter",
        name: L("Cabin filter & HEPA", "Raitisilmasuodatin ja HEPA"),
        blurb: L(
          "Both filters, plus the evaporator clean that stops the damp smell coming back.",
          "Molemmat suodattimet sekä höyrystimen puhdistus, joka estää kostean hajun palaamisen.",
        ),
        models: ALL,
      },
    ],
  },
  {
    id: "body",
    title: L("Body, glass & interior", "Kori, lasit ja sisusta"),
    standfirst: L(
      "The wear items owners live with every day, and the ones winter finds first.",
      "Ne kulutusosat joiden kanssa eletään päivittäin, ja ne jotka talvi löytää ensin.",
    ),
    items: [
      {
        id: "door-handles",
        name: L("Door handles & window regulators", "Ovenkahvat ja ikkunanostimet"),
        blurb: L(
          "Handles that will not present and windows that drop. Common, and fixable.",
          "Kahvat jotka eivät tule ulos ja ikkunat jotka putoavat. Yleistä ja korjattavissa.",
        ),
        models: ALL,
      },
      {
        id: "falcon-doors",
        name: L("Falcon wing door alignment", "Falcon-ovien säätö"),
        blurb: L(
          "Sensors, struts and travel reset when the doors stop clearing properly.",
          "Anturit, iskarit ja liikeradan nollaus kun ovet eivät enää aukea kunnolla.",
        ),
        models: ["X"],
      },
      {
        id: "mcu",
        name: L("MCU, screen & camera faults", "MCU, näyttö ja kameraviat"),
        blurb: L(
          "Dead screens, ghost touches and camera errors diagnosed before you pay for a unit.",
          "Kuolleet näytöt, haamukosketukset ja kameravirheet diagnosoidaan ennen kuin maksat yksiköstä.",
        ),
        models: ALL,
      },
      {
        id: "underbody",
        name: L("Underbody & corrosion inspection", "Pohjan ja ruosteen tarkastus"),
        blurb: L(
          "On the lift after every salt season, with photos of anything we find.",
          "Nosturilla jokaisen suolakauden jälkeen, kuvat kaikesta löydetystä.",
        ),
        models: ALL,
      },
    ],
  },
];

/** Winter is the Tesla owner's real problem here, so it gets its own block. */
export const WINTER_POINTS: Array<{ title: Localized; body: Localized }> = [
  {
    title: L("Seized calipers", "Jumittuneet jarrusatulat"),
    body: L(
      "Regen does most of the braking, so the pads rarely clean the discs. Add road salt and the pins seize. An annual strip and lubricate is the cheapest job on this page.",
      "Regen hoitaa suurimman osan jarrutuksesta, joten palat eivät juuri puhdista levyjä. Lisää tiesuola, ja ohjaustapit jumittuvat. Vuosittainen puhdistus ja voitelu on tämän sivun halvin työ.",
    ),
  },
  {
    title: L("Range, honestly", "Toimintamatka, rehellisesti"),
    body: L(
      "Expect 20–35 % less between December and February. If yours dropped further or suddenly, that is a heat pump or sensor fault and we can find it.",
      "Odota 20–35 % vähemmän joulu–helmikuussa. Jos sinun romahti enemmän tai yhtäkkiä, kyse on lämpöpumpun tai anturin viasta, ja löydämme sen.",
    ),
  },
  {
    title: L("Preconditioning", "Esilämmitys"),
    body: L(
      "Warm the pack before you charge, not just the cabin. We will set the car up with you so a cold Supercharger stop does not take forty minutes.",
      "Lämmitä akku ennen latausta, älä vain matkustamoa. Säädämme auton kanssasi niin ettei kylmä Supercharger-pysähdys kestä neljääkymmentä minuuttia.",
    ),
  },
  {
    title: L("Tyres over everything", "Renkaat ennen kaikkea"),
    body: L(
      "A heavy EV on worn winter tyres is the single biggest risk you can carry. We will tell you honestly when a set has one season left, not three.",
      "Painava sähköauto kuluneilla talvirenkailla on suurin yksittäinen riski. Kerromme rehellisesti kun sarjassa on yksi kausi jäljellä, ei kolme.",
    ),
  },
];

/** The question every owner has, answered where they will actually see it. */
export const TESLA_FAQ: Array<{ q: Localized; a: Localized }> = [
  {
    q: L(
      "Does independent servicing void my Tesla warranty?",
      "Mitätöikö riippumaton huolto Tesla-takuuni?",
    ),
    a: L(
      "No. Under EU block exemption rules your manufacturer warranty stays intact when an independent workshop services the car to specification with parts of matching quality. We document every job so you have the record if it is ever queried.",
      "Ei. EU:n ryhmäpoikkeusasetuksen mukaan valmistajan takuu säilyy, kun riippumaton korjaamo huoltaa auton ohjeiden mukaan vastaavanlaatuisilla osilla. Dokumentoimme jokaisen työn, joten sinulla on tositteet jos asia kyseenalaistetaan.",
    ),
  },
  {
    q: L("Are you certified for high-voltage work?", "Onko teillä suurjännitepätevyys?"),
    a: L(
      "Yes. HV systems are isolated and worked on to the required standard, by people trained for it. If a job genuinely belongs at a Tesla Service Center, we will tell you that instead of taking it on.",
      "Kyllä. Suurjännitejärjestelmät erotetaan ja niitä käsitellään vaaditun standardin mukaan, koulutetun henkilöstön toimesta. Jos työ oikeasti kuuluu Tesla Service Centeriin, sanomme sen emmekä ota sitä vastaan.",
    ),
  },
  {
    q: L("Can you do software or firmware faults?", "Hoidatteko ohjelmisto- ja firmware-vikoja?"),
    a: L(
      "We diagnose them and tell you exactly what is wrong. Firmware itself is Tesla's to push, but a great many faults blamed on software turn out to be a sensor, a connector or the 12 V — and those we fix.",
      "Diagnosoimme ne ja kerromme tarkalleen mikä on vialla. Firmware on Teslan asia, mutta hyvin moni ohjelmiston syyksi luettu vika onkin anturi, liitin tai 12 V — ja ne korjaamme.",
    ),
  },
  {
    q: L("Do you work on other EVs?", "Huollatteko muita sähköautoja?"),
    a: L(
      "Yes — Polestar, Volkswagen ID, Kia, Hyundai, BMW i and the rest. Tesla is where our depth is, but the high-voltage discipline is the same across all of them.",
      "Kyllä — Polestar, Volkswagen ID, Kia, Hyundai, BMW i ja muut. Tesla on syvin osaamisemme, mutta suurjänniteosaaminen on sama kaikissa.",
    ),
  },
];

export const TESLA_COPY = {
  eyebrow: L("Tesla servicing · Helsinki", "Tesla-huolto · Helsinki"),
  headlineA: L("Pick your", "Valitse"),
  headlineAccent: L("letter.", "kirjaimesi."),
  standfirst: L(
    "Independent Tesla servicing in Tattarisuo, Helsinki — at independent prices. Choose your model and we will show you what it actually needs.",
    "Riippumatonta Tesla-huoltoa Tattarisuossa, Helsingissä — riippumattomin hinnoin. Valitse mallisi, niin näytämme mitä se oikeasti tarvitsee.",
  ),
  allModels: L("All models", "Kaikki mallit"),
  showingFor: L("Showing work for", "Näytetään työt mallille"),
  servicesEyebrow: L("Tesla services", "Tesla-palvelut"),
  servicesHeadingA: L("What we do,", "Mitä teemme,"),
  servicesHeadingAccent: L("and why it matters.", "ja miksi sillä on väliä."),
  winterEyebrow: L("Finnish winter", "Suomen talvi"),
  winterHeadingA: L("Four things", "Neljä asiaa"),
  winterHeadingAccent: L("that bite here.", "jotka purevat täällä."),
  winterStandfirst: L(
    "Things a Tesla owner in Finland runs into that an owner in California never will.",
    "Asioita, joihin suomalainen Tesla-omistaja törmää mutta kalifornialainen ei koskaan.",
  ),
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
