import type { Lang } from "@/site.config";
import type { Seo, TitledItem } from "./types";

/** Home page copy. FINNISH NEEDS HUMAN REVIEW. */

type HomeCopy = {
  seo: Seo;
  hero: { label: string; h1: string; lead: string; facts: string[] };
  scan: { title: string; caption: string; states: { scan: string; ok: string; queued: string } };
  offer: { label: string; title: string; body: string; points: string[]; more: string };
  diagnosisFirst: { label: string; title: string; body: string };
  weekend: { label: string; title: string; body: string; steps: TitledItem[]; more: string };
  models: { label: string; title: string; lead: string };
  systems: { label: string; title: string; lead: string };
  steps: { label: string; title: string; items: TitledItem[] };
  trust: { label: string; title: string; items: TitledItem[] };
  other: { label: string; title: string; ev: string; other: string };
  faq: { label: string; title: string; all: string };
  cta: { title: string; body: string };
};

export const HOME: Record<Lang, HomeCopy> = {
  fi: {
    seo: {
      title: "Revamp Motors · Tesla- ja sähköautohuolto Helsingissä",
      description:
        "Riippumaton Tesla- ja sähköautokorjaamo Tattarisuolla, Helsingissä. Vianhaku, akku ja 12 V, jarrut, alusta, ilmajousitus ja renkaat. Arvio ennen töitä.",
    },
    hero: {
      label: "Tesla ja sähköautot · Tattarisuo, Helsinki",
      // The soft hyphen lets the long compound break on narrow phones.
      h1: "Tesla- ja sähkö­autohuolto Helsingissä",
      lead: "Riippumaton korjaamo, joka on erikoistunut Teslaan ja sähköautoihin. Vianhaku ensin, kirjallinen arvio ennen töitä, ja sinä päätät mitä tehdään.",
      facts: ["Arkisin ajanvarauksella", "Viikonloppuisin täydet työpäivät", "Arvio ennen töitä"],
    },
    scan: {
      title: "Vianhaun järjestys",
      caption: "Järjestelmät, jotka käymme läpi vianhaussa. Havainnekuva, ei auton dataa.",
      states: { scan: "Tarkistus", ok: "Valmis", queued: "Jonossa" },
    },
    offer: {
      label: "Avajaistarjous · 31.12.2026 asti",
      title: "Ilmainen diagnostiikka Teslalle",
      body: "Tuo Tesla vianhakuun maksutta. Jos löydämme jotain, saat arvion ja päätät itse, korjataanko. Ei sitoumusta.",
      points: ["Koskee Model S, 3, X ja Y -autoja", "Löydökset ja arvio kirjallisena", "Voit hakea auton ilman korjausta"],
      more: "Tarjouksen ehdot",
    },
    diagnosisFirst: {
      label: "Vianhaku ensin",
      title: "Ensin syy, sitten korjaus",
      body: "Jokainen työ alkaa vianhausta. Saat löydökset ja arvion, ja päätät itse, mitä tehdään. Mitään ei vaihdeta arvaamalla.",
    },
    weekend: {
      label: "Viikonloppuhuolto",
      title: "Kiireinen viikko? Jätä auto meille ja pidä viikonloppu vapaana.",
      body: "Arkisin työskentelemme vain ajanvarauksella, mutta viikonloppuisin teemme täysiä työpäiviä. Tuo auto sovittuna aikana, me hoidamme vianhaun ja hyväksytyt työt, ja saat auton takaisin valmiina.",
      steps: [
        { title: "Varaa viikonloppu", body: "Kerro mitä autolle pitää tehdä. Sovimme luovutus- ja noutoajan." },
        { title: "Tuo auto", body: "Jätä auto ja avainkortti meille. Kerromme löydökset ennen kuin teemme mitään ylimääräistä." },
        { title: "Hae valmiina", body: "Käymme tehdyt työt läpi, kun haet auton." },
      ],
      more: "Näin viikonloppuhuolto toimii",
    },
    models: {
      label: "Mallit",
      title: "Valitse mallisi",
      lead: "Jokaisella mallilla on omat tyypilliset huoltokohteensa. Katso, mitä tarkistamme juuri sinun autostasi.",
    },
    systems: {
      label: "Järjestelmät",
      title: "Auto avattuna, järjestelmä kerrallaan",
      lead: "Seitsemän järjestelmää, joihin Tesla-työmme jakautuu. Valitse järjestelmä, niin näet oireet, tarkistukset ja sen, milloin kannattaa varata aika.",
    },
    steps: {
      label: "Näin se toimii",
      title: "Neljä vaihetta, ei yllätyksiä",
      items: [
        { title: "Kerro oireet", body: "Lomakkeella, puhelimella tai WhatsAppilla. Kuva varoituksesta auttaa." },
        { title: "Vianhaku", body: "Luemme vikakoodit, mittaamme ja tarkistamme auton nostimella." },
        { title: "Arvio ja päätös", body: "Saat löydökset ja arvion. Työ alkaa vasta, kun olet hyväksynyt sen." },
        { title: "Korjaus ja luovutus", body: "Teemme sovitun työn ja käymme sen kanssasi läpi. Vanhat osat näytetään." },
      ],
    },
    trust: {
      label: "Miten toimimme",
      title: "Suoraan, tarkasti ja ilman yllätyksiä",
      items: [
        { title: "Riippumaton korjaamo", body: "Rekisteröity yritys, Y-tunnus 3651428-1. Emme ole sidoksissa Tesla, Inc:iin." },
        { title: "Arvio ennen töitä", body: "Mitään ei tehdä ilman hyväksyntääsi. Jos löydämme muuta, soitamme ensin." },
        { title: "Vanhat osat näytetään", body: "Näet, mitä vaihdettiin ja miksi." },
        { title: "Suurjännite turvallisesti", body: "Suurjännitejärjestelmä tehdään jännitteettömäksi ennen töitä, ja työn tekee siihen koulutettu henkilö." },
      ],
    },
    other: {
      label: "Muut autot",
      title: "Myös muut sähköautot ja perushuolto",
      ev: "Polestar, Volkswagen ID, Kia, Hyundai, BMW i ja muut sähköautot.",
      other: "Bensa- ja dieselautojen perushuolto ajanvarauksella.",
    },
    faq: { label: "Kysymykset", title: "Usein kysyttyä", all: "Kaikki kysymykset" },
    cta: {
      title: "Kerro, mitä autosi tekee",
      body: "Vastaamme 12 tunnin kuluessa, usein jo 3 tunnissa. Aika vahvistetaan vastauksessamme.",
    },
  },
  en: {
    seo: {
      title: "Revamp Motors · Tesla and EV service in Helsinki",
      description:
        "Independent Tesla and EV specialist garage in Tattarisuo, Helsinki. Diagnostics, battery and 12 V, brakes, suspension, air suspension and tyres. Estimate before work.",
    },
    hero: {
      label: "Tesla and EV · Tattarisuo, Helsinki",
      h1: "Tesla and EV service in Helsinki",
      lead: "An independent garage that specialises in Tesla and electric cars. Diagnosis first, a written estimate before any work, and you decide what gets done.",
      facts: ["Weekdays by appointment", "Full working days at weekends", "Estimate before work"],
    },
    scan: {
      title: "Diagnostic sequence",
      caption: "The systems we go through in a diagnosis. An illustration, not data from a car.",
      states: { scan: "Checking", ok: "Done", queued: "Queued" },
    },
    offer: {
      label: "Launch offer · until 31.12.2026",
      title: "Free diagnosis for Tesla",
      body: "Bring your Tesla in for a free diagnosis. If we find something, you get an estimate and decide whether to go ahead. No obligation.",
      points: ["For Model S, 3, X and Y", "Findings and estimate in writing", "Collect the car without any repair"],
      more: "Offer terms",
    },
    diagnosisFirst: {
      label: "Diagnosis first",
      title: "The cause first, then the repair",
      body: "Every job starts with a diagnosis. You get the findings and an estimate, and you decide what is done. Nothing is replaced on a guess.",
    },
    weekend: {
      label: "Weekend service",
      title: "Busy week? Leave the car with us and take the weekend off.",
      body: "On weekdays we work by appointment only, but at weekends we work full days. Drop the car off at the agreed time, we handle the diagnosis and the work you approve, and you get it back finished.",
      steps: [
        { title: "Book the weekend", body: "Tell us what the car needs. We agree drop-off and collection times." },
        { title: "Drop it off", body: "Leave the car and the key card with us. We tell you what we find before doing anything extra." },
        { title: "Collect it finished", body: "We go through the work with you when you pick it up." },
      ],
      more: "How weekend service works",
    },
    models: {
      label: "Models",
      title: "Choose your model",
      lead: "Each model has its own typical service items. See what we check on your car.",
    },
    systems: {
      label: "Systems",
      title: "The car, opened up system by system",
      lead: "The seven systems our Tesla work is organised around. Pick one to see the symptoms, what we check and when to book.",
    },
    steps: {
      label: "How it works",
      title: "Four steps, no surprises",
      items: [
        { title: "Tell us the symptoms", body: "By form, phone or WhatsApp. A photo of the warning helps." },
        { title: "Diagnosis", body: "We read fault codes, take measurements and inspect the car on the lift." },
        { title: "Estimate and decision", body: "You get the findings and an estimate. Work starts only once you approve it." },
        { title: "Repair and handover", body: "We do the agreed work and go through it with you. You see the old parts." },
      ],
    },
    trust: {
      label: "How we work",
      title: "Direct, precise and no surprises",
      items: [
        { title: "Independent garage", body: "A registered company, business ID 3651428-1. Not affiliated with Tesla, Inc." },
        { title: "Estimate before work", body: "Nothing is done without your approval. If we find something else, we call first." },
        { title: "Old parts shown", body: "You see what was replaced and why." },
        { title: "High voltage, safely", body: "The high-voltage system is de-energised before work, and the work is done by someone trained for it." },
      ],
    },
    other: {
      label: "Other cars",
      title: "Other EVs and basic servicing too",
      ev: "Polestar, Volkswagen ID, Kia, Hyundai, BMW i and other electric cars.",
      other: "Basic servicing for petrol and diesel cars, by appointment.",
    },
    faq: { label: "Questions", title: "Frequently asked", all: "All questions" },
    cta: {
      title: "Tell us what your car is doing",
      body: "We reply within 3 to 12 hours. Your slot is confirmed in our reply.",
    },
  },
};
