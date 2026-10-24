import type { Lang } from "@/site.config";
import type { Block, QA, Seo, TitledItem } from "./types";

/**
 * Other EVs, other vehicles, weekend service, about, contact and privacy.
 * The EV page makes only the claims the previous site already made.
 * FINNISH NEEDS HUMAN REVIEW. The privacy notice also needs legal review.
 */

type SimplePage = { seo: Seo; label: string; h1: string; lead: string };

/* --- Other EVs ----------------------------------------------------------- */

export const EV_PAGE: Record<Lang, SimplePage & { brandsTitle: string; brands: string[]; workTitle: string; work: TitledItem[]; body: Block[]; cta: string }> = {
  fi: {
    seo: {
      title: "Sähköauton huolto Helsingissä: Polestar, VW ID, Kia, Hyundai",
      description:
        "Sähköauton huolto ja vianhaku Tattarisuolla, Helsingissä. Polestar, Volkswagen ID, Kia, Hyundai, BMW i ja muut. 12 V:n akku, jarrut, alusta ja renkaat.",
    },
    label: "Muut sähköautot",
    h1: "Muiden sähköautojen huolto Helsingissä",
    lead: "Tesla on erikoisalamme, ja yli 10 vuoden yhteenlaskettu kokemuksemme alalta kattaa myös muut sähköautot. Huollamme Polestarit, Volkswagen ID:t, Kiat, Hyundait, BMW i -mallit ja muut sähköautot.",
    brandsTitle: "Merkit",
    brands: ["Polestar", "Volkswagen ID", "Kia", "Hyundai", "BMW i", "Muut sähköautot"],
    workTitle: "Mitä teemme",
    work: [
      { title: "Akun kunto ja 12 V:n akku", body: "Ajoakun kunnon arviointi ja 12 V:n akun vaihto, joka on yleisin syy siihen, ettei sähköauto herää." },
      { title: "Latausviat", body: "Latausportin, salvan ja liittimien viat, myös pakkasella kiinni jäävät kaapelit." },
      { title: "Jarrut", body: "Satuloiden puhdistus ja voitelu, levyt ja palat. Regeneratiivinen jarrutus ruostuttaa jarruja kaikissa sähköautoissa." },
      { title: "Alusta", body: "Tukivarret, holkit ja iskunvaimentimet painavissa autoissa huonoilla talviteillä." },
      { title: "Renkaat ja suuntaus", body: "Kausivaihdot, nelipyöräsuuntaus ja rengashotelli." },
      { title: "Suurjännitetyöt", body: "Suurjännitekaapelien ja liittimien tarkastus jännitteettömäksi tehdyllä järjestelmällä." },
    ],
    body: [
      { h2: "Merkkihuolto ja riippumaton korjaamo" },
      {
        p: "Merkkikohtaiset ohjelmistopäivitykset ja takuukorjaukset tekee valmistajan valtuuttama huolto. Jos vika näyttää kuuluvan takuuseen, kerromme sen. Muut työt, kuten jarrut, alusta, renkaat ja 12 V:n akku, teemme valmistajan ohjeiden mukaan.",
      },
      { p: "Kerro varatessasi auton merkki, malli ja vuosimalli, niin varmistamme etukäteen, että meillä on työhön tarvittavat tiedot ja osat." },
    ],
    cta: "Pyydä tarjous sähköautollesi",
  },
  en: {
    seo: {
      title: "EV service in Helsinki: Polestar, VW ID, Kia, Hyundai and more",
      description:
        "Electric car servicing and diagnostics in Tattarisuo, Helsinki. Polestar, Volkswagen ID, Kia, Hyundai, BMW i and others. 12 V battery, brakes, suspension, tyres.",
    },
    label: "Other EVs",
    h1: "Servicing for other electric cars in Helsinki",
    lead: "Tesla is our specialism, and our 10+ years of combined industry experience covers other electric cars too. We service Polestar, Volkswagen ID, Kia, Hyundai, BMW i and other EVs.",
    brandsTitle: "Makes",
    brands: ["Polestar", "Volkswagen ID", "Kia", "Hyundai", "BMW i", "Other EVs"],
    workTitle: "What we do",
    work: [
      { title: "Battery condition and 12 V battery", body: "Assessing the high-voltage battery and replacing the 12 V battery, the most common reason an EV will not wake up." },
      { title: "Charging faults", body: "Charge port, latch and contact faults, including cables that stick in frost." },
      { title: "Brakes", body: "Caliper cleaning and lubrication, discs and pads. Regenerative braking makes brakes corrode on every EV." },
      { title: "Suspension", body: "Control arms, bushings and dampers on heavy cars and rough winter roads." },
      { title: "Tyres and alignment", body: "Seasonal changes, four-wheel alignment and tyre storage." },
      { title: "High-voltage work", body: "Inspection of high-voltage cables and connectors on a de-energised system." },
    ],
    body: [
      { h2: "Dealer service and an independent garage" },
      {
        p: "Make-specific software updates and warranty repairs are done by the manufacturer's authorised service. If a fault looks like a warranty matter, we tell you. Other work, such as brakes, suspension, tyres and the 12 V battery, we do to the manufacturer's procedures.",
      },
      { p: "Tell us the make, model and year when you book, and we will make sure in advance that we have the information and parts for the job." },
    ],
    cta: "Request a quote for your EV",
  },
};

/* --- Other vehicles ------------------------------------------------------ */

export const OTHER_PAGE: Record<Lang, SimplePage & { work: string[]; notTitle: string; not: string; cta: string }> = {
  fi: {
    seo: {
      title: "Bensa- ja dieselautojen perushuolto ajanvarauksella",
      description:
        "Polttomoottoriautojen perushuolto Tattarisuolla, Helsingissä: öljyt ja suodattimet, jarrut, renkaat ja pienet korjaukset. Vain ajanvarauksella.",
    },
    label: "Muut autot",
    h1: "Muut autot: perushuolto ajanvarauksella",
    lead: "Keskitymme Teslaan ja sähköautoihin, mutta teemme bensa-, diesel- ja hybridiautoihin perustöitä ajanvarauksella.",
    work: [
      "Öljyn- ja suodattimien vaihto",
      "Jarrut: levyt, palat ja jarruneste",
      "Renkaat, kausivaihto ja rengashotelli",
      "Pienet korjaukset ja katsastukseen valmistautuminen",
    ],
    notTitle: "Mitä emme tee",
    not: "Laajat moottori- ja vaihteistokorjaukset eivät kuulu palveluihimme. Kerromme suoraan, jos työ on parempi tehdä muualla.",
    cta: "Pyydä tarjous",
  },
  en: {
    seo: {
      title: "Basic servicing for petrol and diesel cars, by appointment",
      description:
        "Basic servicing for combustion cars in Tattarisuo, Helsinki: oil and filters, brakes, tyres and small repairs. By appointment only.",
    },
    label: "Other vehicles",
    h1: "Other vehicles: basic servicing by appointment",
    lead: "We focus on Tesla and electric cars, but we do basic work on petrol, diesel and hybrid cars by appointment.",
    work: [
      "Oil and filter changes",
      "Brakes: discs, pads and brake fluid",
      "Tyres, seasonal changes and tyre storage",
      "Small repairs and preparing for the annual inspection",
    ],
    notTitle: "What we do not do",
    not: "Major engine and gearbox repairs are outside what we offer. We will tell you plainly if a job is better done elsewhere.",
    cta: "Request a quote",
  },
};

/* --- Weekend service ----------------------------------------------------- */

export const WEEKEND_PAGE: Record<
  Lang,
  SimplePage & {
    stepsTitle: string;
    steps: TitledItem[];
    suitsTitle: string;
    suits: string[];
    needTitle: string;
    need: string[];
    hoursTitle: string;
    faq: QA[];
    cta: string;
  }
> = {
  fi: {
    seo: {
      title: "Viikonloppuhuolto Helsingissä: Tesla ja sähköautot",
      description:
        "Kiireinen viikko? Jätä Tesla tai sähköauto meille viikonlopuksi ja hae se valmiina. Täydet työpäivät viikonloppuisin Tattarisuolla, Helsingissä.",
    },
    label: "Viikonloppuhuolto",
    h1: "Kiireinen viikko? Jätä auto meille ja pidä viikonloppu vapaana.",
    lead: "Arkisin työskentelemme vain ajanvarauksella, mutta viikonloppuisin teemme täysiä työpäiviä. Tuo auto sovittuna aikana, me hoidamme vianhaun ja hyväksytyt työt, ja saat auton takaisin valmiina. Sinun ei tarvitse ottaa työstä vapaata.",
    stepsTitle: "Näin se toimii",
    steps: [
      { title: "Varaa viikonloppu", body: "Kerro lomakkeella, puhelimella tai WhatsAppilla mitä autolle pitää tehdä. Sovimme luovutus- ja noutoajan." },
      { title: "Tuo auto", body: "Jätä auto ja avainkortti meille sovittuna aikana." },
      { title: "Vianhaku ja hyväksyntä", body: "Jos löydämme jotain sovitun lisäksi, soitamme ja kysymme ennen kuin jatkamme." },
      { title: "Hae valmiina", body: "Käymme tehdyt työt läpi, kun haet auton." },
    ],
    suitsTitle: "Hyvin viikonloppuun sopivia töitä",
    suits: [
      "Kausivaihto, suuntaus ja tasapainotus",
      "Jarrusatuloiden huolto, levyt ja palat",
      "12 V:n akun vaihto",
      "Vianhaku ja diagnostiikka",
      "Alustan äänet ja tukivarsien vaihto, kun osat on tilattu etukäteen",
      "Akun kuntoraportti",
    ],
    needTitle: "Mitä tarvitsemme sinulta",
    need: [
      "Auton malli, vuosimalli ja rekisterinumero",
      "Kuvaus viasta tai tehtävästä työstä, kuva varoituksesta jos sellainen on",
      "Avainkortti, jotta voimme siirtää autoa",
      "Puhelinnumero, josta tavoitamme sinut viikonloppuna",
    ],
    hoursTitle: "Viikonlopun aukiolo",
    faq: [
      {
        q: "Mihin aikaan auton voi tuoda?",
        a: "Sovimme luovutus- ja noutoajan varauksen yhteydessä.",
      },
      {
        q: "Mitä jos työ ei valmistu viikonlopun aikana?",
        a: "Kerromme heti, jos työ vaatii osan, jota ei saada viikonlopun aikana. Silloin sovimme yhdessä, jatketaanko arkena vai haetko auton ja tuot sen myöhemmin.",
      },
      {
        q: "Koskeeko viikonloppuhuolto muitakin kuin Teslaa?",
        a: "Kyllä. Viikonloppuisin huollamme myös muita sähköautoja ja teemme muiden autojen perustöitä.",
      },
      {
        q: "Voinko varata Tesla-tarkastuksen viikonlopuksi?",
        a: "Kyllä. Valitse varauslomakkeella tarkastus ja ajankohdaksi viikonloppu.",
      },
    ],
    cta: "Varaa viikonloppu",
  },
  en: {
    seo: {
      title: "Weekend car service in Helsinki: Tesla and EVs",
      description:
        "Busy week? Leave your Tesla or EV with us for the weekend and collect it finished. Full working days at weekends in Tattarisuo, Helsinki.",
    },
    label: "Weekend service",
    h1: "Busy week? Leave the car with us and take the weekend off.",
    lead: "On weekdays we work by appointment only, but at weekends we work full days. Drop the car off at the agreed time, we handle the diagnosis and the work you approve, and you get it back finished. No need to take time off work.",
    stepsTitle: "How it works",
    steps: [
      { title: "Book the weekend", body: "Tell us by form, phone or WhatsApp what the car needs. We agree drop-off and collection times." },
      { title: "Drop it off", body: "Leave the car and the key card with us at the agreed time." },
      { title: "Diagnosis and approval", body: "If we find anything beyond what was agreed, we call you and ask before we continue." },
      { title: "Collect it finished", body: "We go through the work with you when you pick it up." },
    ],
    suitsTitle: "Jobs that suit a weekend",
    suits: [
      "Seasonal tyre change, alignment and balancing",
      "Caliper service, discs and pads",
      "12 V battery replacement",
      "Fault finding and diagnosis",
      "Suspension noises and control arm replacement, with parts ordered in advance",
      "Battery health report",
    ],
    needTitle: "What we need from you",
    need: [
      "The car's model, year and registration number",
      "A description of the fault or the work, and a photo of any warning",
      "The key card, so we can move the car",
      "A phone number we can reach you on over the weekend",
    ],
    hoursTitle: "Weekend hours",
    faq: [
      {
        q: "What time can I drop the car off?",
        a: "We agree drop-off and collection times when you book.",
      },
      {
        q: "What if the work is not finished over the weekend?",
        a: "We tell you straight away if a job needs a part that cannot be had over the weekend. We then agree together whether to continue on a weekday or whether you collect the car and bring it back later.",
      },
      {
        q: "Is weekend service only for Teslas?",
        a: "No. At weekends we also service other EVs and do basic work on other cars.",
      },
      {
        q: "Can I book a Tesla inspection for the weekend?",
        a: "Yes. Choose inspection on the booking form and the weekend as your preferred timing.",
      },
    ],
    cta: "Book a weekend",
  },
};

/* --- About --------------------------------------------------------------- */

export const ABOUT_PAGE: Record<Lang, SimplePage & { body: Block[]; principlesTitle: string; principles: TitledItem[]; factsTitle: string }> = {
  fi: {
    seo: {
      title: "Meistä: riippumaton Tesla- ja sähköautokorjaamo Tattarisuolla",
      description:
        "Revamp Motors on riippumaton Tesla- ja sähköautokorjaamo Tattarisuolla, Helsingissä. Toimintatapamme, yhteystiedot ja yritystiedot.",
    },
    label: "Meistä",
    h1: "Korjaamo, joka aloittaa vianhausta",
    lead: "Revamp Motors on riippumaton korjaamo Tattarisuolla, Helsingissä, ja tiimillämme on yli 10 vuoden yhteenlaskettu kokemus alalta. Olemme erikoistuneet Teslaan ja sähköautoihin, ja teemme muille autoille perustöitä ajanvarauksella.",
    body: [
      {
        p: "Sähköautot ovat muuttaneet sitä, mitä autolle tehdään. Öljynvaihtoja ja jakohihnoja ei ole, mutta jarrut ruostuvat, 12 V:n akku pysäyttää auton, alusta kuluu painon alla ja moni vika näkyy ensin näytöllä. Näihin töihin tarvitaan oikeat tiedot, oikeat menettelyt ja kärsivällisyyttä etsiä vian todellinen syy.",
      },
      {
        p: "Siksi jokainen työmme alkaa vianhausta. Kerromme mitä löysimme, miten varmistimme sen ja mitä korjaus sisältää. Sinä päätät, mitä tehdään.",
      },
    ],
    principlesTitle: "Toimintatapamme",
    principles: [
      { title: "Yli 10 vuoden kokemus", body: "Tiimillämme on yhteensä yli kymmenen vuoden kokemus autoalalta." },
      { title: "Arvio ennen töitä", body: "Mitään ei tehdä ilman hyväksyntääsi. Jos löydämme muuta, soitamme ensin." },
      { title: "Vanhat osat näytetään", body: "Näet, mitä vaihdettiin ja miksi." },
      { title: "Työt kirjataan", body: "Saat kirjallisen yhteenvedon tehdyistä töistä." },
      { title: "Takuu 1 v tai 10 000 km", body: "Tekemällemme työlle annamme 1 vuoden tai 10 000 kilometrin takuun." },
      { title: "Suoraan sanottuna", body: "Jos työ on parempi tehdä muualla tai kuuluu takuuseen, kerromme sen." },
    ],
    factsTitle: "Yritystiedot",
  },
  en: {
    seo: {
      title: "About: an independent Tesla and EV garage in Tattarisuo",
      description:
        "Revamp Motors is an independent Tesla and EV specialist garage in Tattarisuo, Helsinki. How we work, contact details and company details.",
    },
    label: "About",
    h1: "A garage that starts with a diagnosis",
    lead: "Revamp Motors is an independent garage in Tattarisuo, Helsinki, run by a team with 10+ years of combined industry experience. We specialise in Tesla and electric cars, and do basic work on other cars by appointment.",
    body: [
      {
        p: "Electric cars have changed what a car needs. There are no oil changes or timing belts, but the brakes corrode, the 12 V battery strands the car, the suspension wears under the weight, and many faults show up on the screen first. This work needs the right information, the right procedures and the patience to find the real cause of a fault.",
      },
      {
        p: "That is why every job we do starts with a diagnosis. We tell you what we found, how we confirmed it and what the repair involves. You decide what gets done.",
      },
    ],
    principlesTitle: "How we work",
    principles: [
      { title: "10+ years of experience", body: "Our team has more than a decade of combined experience in the automotive industry." },
      { title: "Estimate before work", body: "Nothing is done without your approval. If we find something else, we call first." },
      { title: "Old parts shown", body: "You see what was replaced and why." },
      { title: "Work recorded", body: "You get a written summary of the work done." },
      { title: "1 year or 10,000 km warranty", body: "Our work comes with a warranty of 1 year or 10,000 km." },
      { title: "Straight answers", body: "If a job is better done elsewhere or is covered by warranty, we tell you." },
    ],
    factsTitle: "Company details",
  },
};

/* --- Contact ------------------------------------------------------------- */

export const CONTACT_PAGE: Record<
  Lang,
  SimplePage & {
    diagnosis: { title: string; titleEnded: string; badge: string; body: string; bodyEnded: string; points: string[]; cta: string; ctaEnded: string };
    quote: { title: string; body: string; points: string[]; cta: string };
    visitTitle: string;
    reachTitle: string;
    reply: string;
  }
> = {
  fi: {
    seo: {
      title: "Yhteystiedot ja ajanvaraus: Halli 3, Kytkintie 38, Helsinki",
      description:
        "Varaa Tesla-tarkastus tai pyydä tarjous. Halli 3, Kytkintie 38, 00770 Helsinki (Tattarisuo). Puhelin ja WhatsApp +358 45 865 6683.",
    },
    label: "Yhteystiedot",
    h1: "Varaa aika tai pyydä tarjous",
    lead: "Valitse alta, kumpaa tarvitset. Vastaamme 12 tunnin kuluessa, usein jo 3 tunnissa, ja aika vahvistetaan vastauksessamme.",
    diagnosis: {
      title: "Varaa Tesla-tarkastus",
      titleEnded: "Varaa tarkastus",
      badge: "Vain Tesla · 31.12.2026 asti",
      body: "Teslan perustarkastus 124,25 € sis. alv (99 € + alv 25,5 %). Jos jotain on korjattava, saat arvion ja päätät itse, jatketaanko.",
      bodyEnded: "Yleistarkastus Teslalle. Jos jotain on korjattava, saat arvion ennen kuin mitään tehdään.",
      points: ["Vain Tesla: Model S, 3, X ja Y", "Yleinen perustarkastus", "Ei sitoumusta jatkotöihin, myös viikonloppuisin"],
      cta: "Valitse tarkastus",
      ctaEnded: "Valitse tarkastus",
    },
    quote: {
      title: "Pyydä tarjous",
      body: "Mikä tahansa auto ja mikä tahansa työ. Kerro mitä tarvitset, niin palaamme arvion ja ajankohdan kanssa.",
      points: ["Tesla, muut sähköautot ja muut autot", "Arvio ennen töitä", "Myös viikonloppuisin"],
      cta: "Valitse tarjouspyyntö",
    },
    visitTitle: "Käyntiosoite",
    reachTitle: "Puhelin ja viestit",
    reply: "Vastaamme 12 tunnin kuluessa, usein jo 3 tunnissa.",
  },
  en: {
    seo: {
      title: "Contact and booking: Hall 3, Kytkintie 38, Helsinki",
      description:
        "Book a Tesla inspection or request a quote. Hall 3, Kytkintie 38, 00770 Helsinki (Tattarisuo). Phone and WhatsApp +358 45 865 6683.",
    },
    label: "Contact",
    h1: "Book a slot or request a quote",
    lead: "Choose what you need below. We reply within 3 to 12 hours, and your slot is confirmed in our reply.",
    diagnosis: {
      title: "Book a Tesla inspection",
      titleEnded: "Book an inspection",
      badge: "Tesla only · until 31.12.2026",
      body: "A basic inspection for Tesla for €124.25 incl. VAT (€99 + 25.5% VAT). If anything needs work, you get an estimate and decide whether to go ahead.",
      bodyEnded: "A general inspection for Tesla. If anything needs work, you get an estimate before anything is done.",
      points: ["Tesla only: Model S, 3, X and Y", "Basic general inspection", "No commitment to further work, weekends too"],
      cta: "Choose inspection",
      ctaEnded: "Choose inspection",
    },
    quote: {
      title: "Request a quote",
      body: "Any car, any job. Tell us what you need and we come back with an estimate and a time.",
      points: ["Tesla, other EVs and other cars", "Estimate before work", "Weekends too"],
      cta: "Choose quote request",
    },
    visitTitle: "Visiting address",
    reachTitle: "Phone and messages",
    reply: "We reply within 3 to 12 hours.",
  },
};

/* --- Privacy ------------------------------------------------------------- */

export const PRIVACY_PAGE: Record<Lang, SimplePage & { body: Block[]; updated: string }> = {
  fi: {
    seo: {
      title: "Tietosuojaseloste",
      description: "Miten Revamp Motors käsittelee yhteydenotto- ja varauslomakkeen tietoja sekä sivuston teknisiä tietoja.",
    },
    label: "Tietosuoja",
    h1: "Tietosuojaseloste",
    lead: "Tämä seloste kertoo, mitä henkilötietoja keräämme sivuston kautta, miksi ja kuinka kauan niitä säilytetään.",
    updated: "Päivitetty 22.10.2026",
    body: [
      { h2: "Rekisterinpitäjä" },
      { p: "Revamp Motors (osakeyhtiö), Y-tunnus 3651428-1, Halli 3, Kytkintie 38, 00770 Helsinki. Sähköposti: [revampmotors1@gmail.com](mailto:revampmotors1@gmail.com)." },
      { h2: "Mitä tietoja keräämme" },
      {
        ul: [
          "Varaus- ja tarjouslomakkeella: nimi, puhelinnumero, sähköpostiosoite, auton tyyppi, vuosimalli, rekisterinumero (vapaaehtoinen), kuvaus tarpeesta ja toivottu ajankohta.",
          "Kun otat yhteyttä puhelimella, WhatsAppilla tai sähköpostilla: viestisi ja yhteystietosi.",
        ],
      },
      { h2: "Miksi käsittelemme tietoja" },
      {
        p: "Käytämme tietoja vain yhteydenottoosi vastaamiseen, ajan varaamiseen, arvion antamiseen ja tilatun työn hoitamiseen. Käsittelyn perusteena on sopimuksen valmistelu ja täytäntöönpano sekä kirjanpitoon liittyvät lakisääteiset velvoitteet.",
      },
      { h2: "Kenelle tiedot luovutetaan" },
      {
        p: "Lomakkeen tiedot välitetään Formspree-palvelun (Formspree, Inc., Yhdysvallat) kautta sähköpostiimme, joka toimii Googlen palvelussa. Tietoja ei myydä eikä luovuteta markkinointiin. Tietoja voidaan siirtää EU:n ulkopuolelle näiden palveluntarjoajien kautta. Siirroissa noudatetaan tietosuoja-asetuksen mukaisia suojatoimia.",
      },
      { h2: "Kuinka kauan tietoja säilytetään" },
      {
        p: "Yhteydenottoja säilytetään niin kauan kuin asian hoitaminen vaatii. Tehtyihin töihin liittyvät tiedot säilytetään kirjanpitolain edellyttämän ajan.",
      },
      { h2: "Sivuston tekniset tiedot" },
      {
        p: "Sivusto käyttää Cloudflare Web Analytics -palvelua, joka ei käytä evästeitä eikä tallenna henkilötietoja. Sivusto tallentaa selaimeesi valitsemasi teeman (vaalea tai tumma). Tieto pysyy laitteellasi.",
      },
      { h2: "Oikeutesi" },
      {
        p: "Sinulla on oikeus tarkastaa tietosi, pyytää niiden oikaisua tai poistamista ja vastustaa käsittelyä. Lähetä pyyntö sähköpostilla. Voit tehdä valituksen tietosuojavaltuutetun toimistoon, jos katsot, että tietojasi käsitellään lainvastaisesti.",
      },
    ],
  },
  en: {
    seo: {
      title: "Privacy notice",
      description: "How Revamp Motors handles contact and booking form data and the site's technical data.",
    },
    label: "Privacy",
    h1: "Privacy notice",
    lead: "This notice explains what personal data we collect through this site, why, and how long we keep it.",
    updated: "Updated 22 October 2026",
    body: [
      { h2: "Controller" },
      { p: "Revamp Motors (osakeyhtiö), business ID 3651428-1, Hall 3, Kytkintie 38, 00770 Helsinki. Email: [revampmotors1@gmail.com](mailto:revampmotors1@gmail.com)." },
      { h2: "What we collect" },
      {
        ul: [
          "Through the booking and quote form: name, phone number, email address, vehicle type, model year, registration number (optional), a description of what you need and your preferred timing.",
          "When you contact us by phone, WhatsApp or email: your message and contact details.",
        ],
      },
      { h2: "Why we process it" },
      {
        p: "We use the data only to answer your enquiry, book a slot, give you an estimate and carry out the work you order. The legal basis is taking steps towards and performing a contract, and statutory accounting obligations.",
      },
      { h2: "Who receives it" },
      {
        p: "Form submissions are passed through Formspree (Formspree, Inc., United States) to our email, which runs on Google's service. Data is not sold or shared for marketing. Data may be transferred outside the EU through these providers. Transfers follow the safeguards required by the GDPR.",
      },
      { h2: "How long we keep it" },
      {
        p: "Enquiries are kept as long as needed to deal with them. Records of work carried out are kept for the period required by the Finnish Accounting Act.",
      },
      { h2: "Technical data" },
      {
        p: "The site uses Cloudflare Web Analytics, which sets no cookies and stores no personal data. The site stores your chosen theme (light or dark) in your browser. It stays on your device.",
      },
      { h2: "Your rights" },
      {
        p: "You have the right to access your data, ask for it to be corrected or erased, and object to its processing. Send your request by email. You can complain to the Office of the Data Protection Ombudsman if you believe your data is being processed unlawfully.",
      },
    ],
  },
};
