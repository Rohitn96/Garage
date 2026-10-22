import type { Lang } from "@/site.config";
import type { IconName } from "@/components/Icons";
import type { Seo, TitledItem } from "./types";

/** Home page copy. FINNISH NEEDS HUMAN REVIEW. */

type HomeCopy = {
  seo: Seo;
  hero: { label: string; h1: string; lead: string; facts: string[]; videoAlt: string };
  offer: { label: string; title: string; body: string; more: string };
  models: { label: string; title: string; lead: string };
  explorer: { label: string; title: string; lead: string; hint: string };
  services: { label: string; title: string; lead: string };
  weekend: { label: string; title: string; body: string; steps: TitledItem[]; more: string };
  why: { label: string; title: string; lead: string; items: Array<TitledItem & { icon: IconName }> };
  steps: { label: string; title: string; items: TitledItem[] };
  other: { label: string; title: string; ev: string; other: string };
  faq: { label: string; title: string; all: string };
  cta: { title: string; body: string };
};

export const HOME: Record<Lang, HomeCopy> = {
  fi: {
    seo: {
      title: "Revamp Motors · Riippumaton Tesla-huolto Helsingissä",
      description:
        "Riippumaton Tesla- ja sähköautokorjaamo Tattarisuolla, Helsingissä. Yli 10 vuoden yhteenlaskettu kokemus alalta. Akku, jarrut, alusta, renkaat ja vianhaku. Arvio ennen töitä.",
    },
    hero: {
      label: "Tesla- ja sähköautoasiantuntijat · Helsinki",
      h1: "Riippumaton Tesla-huolto Helsingissä",
      lead: "Ajoakusta renkaisiin, huolehdimme Teslasi jokaisesta osasta. Teslan omat diagnostiikkaohjelmistot, valmistajan menettelyt jokaisessa työssä ja selkeä arvio ennen kuin työ alkaa.",
      facts: ["Model S, 3, X ja Y", "Alkuperäiset Tesla-osat", "Viikonloppuisin täydet päivät"],
      videoAlt: "Teslan ohjaamo ajon aikana: ohjauspyörä ja keskinäyttö",
    },
    offer: {
      label: "Avajaistarjous",
      title: "Ilmainen Tesla-diagnostiikka 31.12.2026 asti",
      body: "Digitaalinen analyysiraportti, silmämääräinen tarkastus ja koeajo. Ei sitoumusta.",
      more: "Tutustu tarjoukseen",
    },
    models: {
      label: "Teslasi",
      title: "Jokainen malli, jokainen vuosimalli",
      lead: "Model S, 3, X ja Y, myös vanhemmat yksilöt. Katso, mistä huolehdimme juuri sinun autossasi.",
    },
    explorer: {
      label: "Auton sisällä",
      title: "Teslasi, avattuna",
      lead: "Huolehdimme Teslan kaikista osista ajoakusta renkaisiin. Vieritä, niin auto avautuu järjestelmä kerrallaan.",
      hint: "Vieritä, niin auto avautuu",
    },
    services: {
      label: "Palvelut",
      title: "Kaikki mitä Teslasi tarvitsee",
      lead: "Vianhaku, akku ja lataus, jarrut, alusta, renkaat, sähköjärjestelmät ja ilmastointi. Yksi riippumaton korjaamo kaikkeen.",
    },
    weekend: {
      label: "Viikonloppuhuolto",
      title: "Kiireinen viikko? Jätä auto meille ja pidä viikonloppu vapaana.",
      body: "Arkisin työskentelemme ajanvarauksella, viikonloppuisin täysiä työpäiviä. Tuo auto sovittuna aikana, me hoidamme hyväksytyt työt, ja saat auton takaisin valmiina.",
      steps: [
        { title: "Varaa viikonloppu", body: "Kerro mitä autolle tehdään. Sovimme luovutus- ja noutoajan." },
        { title: "Tuo auto", body: "Jätä auto ja avainkortti meille. Kysymme ennen kuin teemme mitään ylimääräistä." },
        { title: "Hae valmiina", body: "Käymme tehdyt työt läpi, kun haet auton." },
      ],
      more: "Näin viikonloppuhuolto toimii",
    },
    why: {
      label: "Miksi me",
      title: "Tesla-osaamista, oikeilla työkaluilla",
      lead: "Riippumaton korjaamo, joka työskentelee Teslan kanssa kuten valmistaja tarkoittaa: oikeilla ohjelmistoilla, oikeilla osilla ja takuulla.",
      items: [
        {
          icon: "experience",
          title: "Yli 10 vuoden kokemus",
          body: "Tiimillämme on yhteensä yli kymmenen vuoden kokemus autoalalta, ja keskitymme nyt Teslaan ja sähköautoihin.",
        },
        {
          icon: "scanner",
          title: "Tesla Toolbox ja Topdon",
          body: "Vianhaussa käytämme Teslan virallista Toolbox-diagnostiikkaohjelmistoa ja Topdonin ammattilaitteita, ja työskentelemme Teslan oman huolto-ohjekirjan mukaan.",
        },
        {
          icon: "parts",
          title: "Alkuperäiset tai perusosat",
          body: "Asennamme alkuperäisiä Tesla-osia tai laadukkaita perusosia. Arviosta näet, mitä käytämme, ja valinta on sinun.",
        },
        {
          icon: "shield",
          title: "Takuu 1 vuosi tai 10 000 km",
          body: "Tekemällemme työlle annamme 1 vuoden tai 10 000 kilometrin takuun.",
        },
        {
          icon: "climate",
          title: "Ilmastointilaitteet Teslalle",
          body: "Käytössämme on nimenomaan Tesla-autoille tarkoitetut ilmastoinnin huoltolaitteet.",
        },
        {
          icon: "workshop",
          title: "Täysin varusteltu korjaamo",
          body: "Nostimet ja kaikki muu, mitä nykyaikainen korjaamo tarvitsee, saman katon alla Tattarisuolla.",
        },
      ],
    },
    steps: {
      label: "Näin se toimii",
      title: "Selkeästi alusta loppuun",
      items: [
        { title: "Kerro tarpeesi", body: "Lomakkeella, puhelimella tai WhatsAppilla. Kuva varoituksesta auttaa." },
        { title: "Tarkastus", body: "Selvitämme syyn huolellisesti ennen kuin ehdotamme mitään." },
        { title: "Arvio ja päätös", body: "Saat arvion. Työ alkaa vasta, kun olet hyväksynyt sen." },
        { title: "Korjaus ja luovutus", body: "Teemme sovitun työn ja käymme sen kanssasi läpi." },
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
      title: "Varaa Teslallesi aika",
      body: "Vastaamme 12 tunnin kuluessa, usein jo 3 tunnissa. Aika vahvistetaan vastauksessamme.",
    },
  },
  en: {
    seo: {
      title: "Revamp Motors · Independent Tesla service in Helsinki",
      description:
        "Independent Tesla and EV specialists in Tattarisuo, Helsinki, with 10+ years of combined industry experience. Battery, brakes, suspension, tyres and diagnostics. Estimate before work.",
    },
    hero: {
      label: "Tesla & EV specialists · Helsinki",
      h1: "Independent Tesla service in Helsinki",
      lead: "From the high-voltage battery to the tyres, we look after every part of your Tesla. Tesla's own diagnostic software, manufacturer procedures on every job, and a clear estimate before any work begins.",
      facts: ["Model S, 3, X and Y", "Genuine Tesla parts", "Full working days at weekends"],
      videoAlt: "Inside a Tesla on the move: the steering wheel and centre touchscreen",
    },
    offer: {
      label: "Launch offer",
      title: "Free Tesla diagnosis until 31.12.2026",
      body: "Digital analysis report, visual inspection and a test drive. No obligation.",
      more: "See the offer",
    },
    models: {
      label: "Your Tesla",
      title: "Every model, every year",
      lead: "Model S, 3, X and Y, including older cars. See what we look after on yours.",
    },
    explorer: {
      label: "Inside the car",
      title: "Your Tesla, opened up",
      lead: "We cover everything on a Tesla, from the high-voltage battery to the tyres. Scroll and the car comes apart, one system at a time.",
      hint: "Scroll to open the car",
    },
    services: {
      label: "Services",
      title: "Everything your Tesla needs",
      lead: "Diagnostics, battery and charging, brakes, suspension, tyres, electrical and climate. One independent workshop for all of it.",
    },
    weekend: {
      label: "Weekend service",
      title: "Busy week? Leave the car with us and take the weekend off.",
      body: "On weekdays we work by appointment, and at weekends we work full days. Drop the car off at the agreed time, we handle the work you approve, and you get it back finished.",
      steps: [
        { title: "Book the weekend", body: "Tell us what the car needs. We agree drop-off and collection times." },
        { title: "Drop it off", body: "Leave the car and the key card with us. We ask before doing anything extra." },
        { title: "Collect it finished", body: "We go through the work with you when you pick it up." },
      ],
      more: "How weekend service works",
    },
    why: {
      label: "Why us",
      title: "Tesla expertise, with the right tools",
      lead: "An independent workshop that works on Teslas the way the manufacturer intends: with the right software, the right parts, and a warranty on our work.",
      items: [
        {
          icon: "experience",
          title: "10+ years of combined experience",
          body: "Our team brings more than a decade of combined experience in the automotive industry, now focused on Tesla and electric vehicles.",
        },
        {
          icon: "scanner",
          title: "Tesla Toolbox and Topdon",
          body: "We diagnose with Tesla Toolbox, Tesla's official diagnostic software, and professional Topdon scan tools, and we work from Tesla's own service manual.",
        },
        {
          icon: "parts",
          title: "Genuine or basic parts",
          body: "We fit genuine Tesla parts as well as quality basic parts. The estimate shows which we will use, and the choice is yours.",
        },
        {
          icon: "shield",
          title: "1 year or 10,000 km warranty",
          body: "Every job we do comes with a warranty of 1 year or 10,000 km on our work.",
        },
        {
          icon: "climate",
          title: "AC equipment made for Tesla",
          body: "Our air conditioning service machines are specified for Tesla vehicles.",
        },
        {
          icon: "workshop",
          title: "A fully equipped workshop",
          body: "Lifts and everything else a modern garage needs, under one roof in Tattarisuo.",
        },
      ],
    },
    steps: {
      label: "How it works",
      title: "Clear from start to finish",
      items: [
        { title: "Tell us what you need", body: "By form, phone or WhatsApp. A photo of any warning helps." },
        { title: "Inspection", body: "We find the cause properly before we suggest anything." },
        { title: "Estimate and decision", body: "You get an estimate. Work starts only once you approve it." },
        { title: "Repair and handover", body: "We do the agreed work and go through it with you." },
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
      title: "Book your Tesla in",
      body: "We reply within 3 to 12 hours. Your slot is confirmed in our reply.",
    },
  },
};
