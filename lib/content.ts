import { AC_LICENSED } from "./business";
import type { Localized } from "./i18n";

/**
 * Every visible string on the site, in both languages.
 *
 * ⚠️ THE FINNISH IS UNREVIEWED. It uses the standard trade terms (öljynvaihto,
 * jakohihna, pyöränsuuntaus, rengashotelli, katsastus, lämpöpumppu…) and should
 * be intelligible, but no native speaker has read it. Register in particular —
 * Finnish service copy is blunter than the English here — is worth a pass
 * before this is put in front of customers.
 *
 * Copy is deliberately short. A garage visitor arrives with one of three
 * questions: can you fix my car, what does it cost, how do I reach you. Most
 * of what did not answer one of those was cut.
 */

const L = (en: string, fi: string): Localized => ({ en, fi });

export const CONTENT = {
  nav: {
    tesla: L("Tesla", "Tesla"),
    services: L("Services", "Palvelut"),
    pricing: L("Pricing", "Hinnasto"),
    contact: L("Contact", "Yhteystiedot"),
    book: L("Book", "Varaa"),
    menu: L("Menu", "Valikko"),
    close: L("Close", "Sulje"),
    location: L("Tattarisuo, Helsinki", "Tattarisuo, Helsinki"),
    backHome: L("Revamp Motors, home", "Revamp Motors, etusivu"),
  },

  hero: {
    /**
     * The lead half of the eyebrow only. The location follows it in the markup,
     * as a link to the shop's pin, and the opening date replaces this line
     * while one is set. See components/Hero.tsx.
     */
    eyebrow: L("Independent garage", "Riippumaton autokorjaamo"),
    // Each line has to clear the h1's 16ch measure or the headline runs to
    // three lines — which "Täyden palvelun korjaamo" did in Finnish. The
    // Finnish line makes the same claim in fewer characters; "full service"
    // itself is carried by the metadata and by the statement above the two
    // doors.
    headlineA: L("A full-service garage", "Yksi korjaamo,"),
    headlineAccent: L("for every car.", "kaikki autot."),
    /** The specialism, named beside the headline rather than in place of it. */
    specialty: L("Specialty: Tesla & EV", "Erikoisala: Tesla ja sähköautot"),
    standfirst: L(
      "An independent garage in Tattarisuo, Helsinki, serving the whole capital region. Every make and every fuel: petrol, diesel, hybrid, electric. You get the price before we pick up a tool.",
      "Riippumaton korjaamo Tattarisuolla Helsingissä, koko pääkaupunkiseudun palveluksessa. Kaikki merkit ja käyttövoimat: bensa, diesel, hybridi, sähkö. Saat hinnan ennen kuin tartumme työkaluun.",
    ),
    ctaPrimary: L("Book a slot", "Varaa aika"),
    ctaSecondary: L("Tesla service", "Tesla-huolto"),
    credentials: [
      L("All makes serviced", "Kaikki merkit"),
      L("Tesla & EV specialists", "Tesla- ja sähköauto-osaaminen"),
      L("Price agreed first", "Hinta sovitaan ensin"),
    ],
    scroll: L("Look inside", "Katso sisään"),
  },

  explorer: {
    eyebrow: L("What we work on", "Mitä huollamme"),
    // Make-agnostic on purpose: the systems below — brakes, tyres, chassis —
    // are the same job on any car. The model in the scene happens to be an EV.
    headingA: L("Your car,", "Auto,"),
    headingAccent: L("opened up.", "avattuna."),
    standfirst: L(
      "Keep scrolling. The car comes apart one system at a time, and we tell you what we do inside each.",
      "Jatka vierimistä. Auto purkautuu järjestelmä kerrallaan, ja kerromme mitä teemme kunkin sisällä.",
    ),
    hint: L("Scroll to take it apart", "Vieritä ja pura auto osiin"),
    pricingLink: L("See what it costs", "Katso hinnasto"),
  },

  doors: {
    eyebrow: L("Two ways in", "Kaksi reittiä"),
    headingA: L("Find your", "Löydä"),
    headingAccent: L("side of the shop.", "oma puolesi korjaamosta."),
    /**
     * The positioning, said once in plain words rather than left to be inferred
     * from which card is listed first. Both halves of the shop are real work;
     * the specialism is one of them, not the gate to the other.
     */
    standfirst: L(
      "Revamp Motors is a full-service garage for every make and every fuel: petrol, diesel, hybrid and electric. Tesla and EVs are our specialty, not the only thing we do.",
      "Revamp Motors on täyden palvelun korjaamo kaikille merkeille ja käyttövoimille: bensa, diesel, hybridi ja sähkö. Tesla ja sähköautot ovat erikoisalamme, eivät ainoa työmme.",
    ),
    tesla: {
      kicker: L("Our specialism", "Erikoisalamme"),
      title: L("Tesla & electric", "Tesla ja sähköautot"),
      body: L(
        "Model S, 3, X and Y. Battery and drive unit diagnostics, the brake and suspension work these cars actually need, and the faults most garages hand back.",
        "Model S, 3, X ja Y. Akku- ja voimalinjadiagnostiikka, näiden autojen oikeasti tarvitsemat jarru- ja alustatyöt sekä ne viat, jotka useimmat korjaamot palauttavat asiakkaalle.",
      ),
      cta: L("Tesla servicing", "Tesla-huolto"),
    },
    general: {
      // Not "everything else": that framing read as the leftover after the
      // specialism, which is not what a petrol or diesel owner is being offered.
      kicker: L("Our everyday work", "Jokapäiväinen työmme"),
      title: L("Petrol, diesel, hybrid", "Bensa, diesel, hybridi"),
      // AC drops out of the list until the F-gas certificate is in hand, and
      // comes back with it. See AC_LICENSED in lib/business.ts.
      body: L(
        `Servicing, timing belts, brakes, exhausts, ${AC_LICENSED ? "AC, " : ""}tyres and inspection-failure repairs. Most cars on Finnish roads still run on an engine and we are just as exacting about them.`,
        `Huollot, jakohihnat, jarrut, pakoputkistot, ${AC_LICENSED ? "ilmastointi, " : ""}renkaat ja katsastuskorjaukset. Valtaosa Suomen teillä liikkuvista autoista käy yhä polttomoottorilla, ja teemme ne yhtä tarkasti.`,
      ),
      cta: L("See pricing", "Katso hinnasto"),
    },
  },

  pricing: {
    eyebrow: L("Pricing", "Hinnasto"),
    headingA: L("The number,", "Hinta,"),
    headingAccent: L("before the work.", "ennen työtä."),
    standfirst: L(
      "Indicative prices for the jobs we are asked for most. Your car is inspected and quoted before anything is touched. If we find something else, we stop and ring you.",
      "Ohjehinnat yleisimmin kysytyille töille. Auto tarkastetaan ja hinnoitellaan ennen kuin mihinkään kosketaan. Jos löydämme muuta, pysäytämme työn ja soitamme.",
    ),
    // The tab labels, "from"/"on inspection" markers and the standalone labour
    // rate that used to live here went with the grouped table this section
    // replaced (see components/Pricing.tsx). Every figure now comes from
    // data/pricing.ts, so nothing rendered them and they shipped to the browser
    // in both languages regardless.
    disclaimer: L(
      "Indicative only. Prices are estimates for a typical car and vary with model, parts and condition. Fleet, rideshare and food-delivery vehicles have their own rates. Ask for a quote.",
      "Vain ohjeellinen. Hinnat ovat arvioita tyypilliselle autolle ja vaihtelevat mallin, osien ja kunnon mukaan. Kalusto-, kyytipalvelu- ja ruokalähettiautoilla on omat hintansa. Pyydä tarjous.",
    ),
  },

  why: {
    eyebrow: L("Why us", "Miksi me"),
    headingA: L("Built by mechanics,", "Mekaanikkojen rakentama,"),
    headingAccent: L("tuned for what comes next.", "viritetty tulevaan."),
    standfirst: L(
      "Years in the trade, and real depth in the shift to electric: battery and drivetrain diagnostics, and the software-side quirks general garages have not caught up on.",
      "Vuosia alalla ja aitoa osaamista sähköistymisestä: akku- ja voimalinjadiagnostiikka sekä ne ohjelmisto-oudot, joihin yleiskorjaamot eivät ole ehtineet.",
    ),
    points: [
      {
        title: L("Independent rates", "Riippumattoman hinnat"),
        body: L(
          "No dealer overheads, and the number is agreed with you first.",
          "Ei merkkiliikkeen kuluja, ja summa sovitaan kanssasi etukäteen.",
        ),
      },
      {
        title: L("No surprise work", "Ei yllätystöitä"),
        body: L(
          "If we find something else, the tools go down and the phone comes out.",
          "Jos löydämme muuta, työkalut lasketaan ja tartutaan puhelimeen.",
        ),
      },
      {
        title: L("Fleet and business", "Kalusto ja yritykset"),
        body: L(
          "Invoicing, agreed rates, and servicing scheduled around your hours.",
          "Laskutus, sovitut hinnat ja huollot aikataulunne mukaan.",
        ),
      },
    ],
  },

  process: {
    eyebrow: L("Process", "Näin se toimii"),
    headingA: L("Four steps,", "Neljä vaihetta,"),
    headingAccent: L("no surprises.", "ei yllätyksiä."),
    steps: [
      {
        title: L("Tell us what is wrong", "Kerro mikä on vialla"),
        body: L(
          "A noise, a warning light, a failed inspection, or just a service.",
          "Ääni, merkkivalo, hylätty katsastus tai pelkkä huolto.",
        ),
      },
      {
        title: L("We scope and price it", "Rajaamme ja hinnoittelemme"),
        body: L(
          "We look the car over and come back with what it needs and what it costs.",
          "Katsomme auton läpi ja kerromme mitä se tarvitsee ja mitä se maksaa.",
        ),
      },
      {
        title: L("We do the work", "Teemme työn"),
        body: L(
          "Only what you approved. Anything else, we call first.",
          "Vain sen minkä hyväksyit. Muusta soitamme ensin.",
        ),
      },
      {
        title: L("Collect and pay", "Nouto ja maksu"),
        body: L(
          "We walk you through what we did, and you pay on collection.",
          "Käymme tehdyt työt läpi, ja maksat noudon yhteydessä.",
        ),
      },
    ],
  },

  contact: {
    eyebrow: L("Contact", "Yhteystiedot"),
    headingA: L("Tell us about", "Kerro meille"),
    headingAccent: L("the car.", "autostasi."),
    p1: L(
      "Tell us what the car needs and we will come back with a time and a price. We reply within 3 to 12 hours.",
      "Kerro mitä auto tarvitsee, niin palaamme ajankohdan ja hinnan kanssa. Vastaamme 3–12 tunnin kuluessa.",
    ),
    fields: {
      name: L("Name", "Nimi"),
      vehicle: L("Car", "Auto"),
      email: L("Email", "Sähköposti"),
      phone: L("Mobile number", "Puhelinnumero"),
      message: L("What does it need?", "Mitä se tarvitsee?"),
    },
    placeholders: {
      name: L("Matti Virtanen", "Matti Virtanen"),
      vehicle: L("Tesla Model 3, 2021 or ABC-123", "Tesla Model 3, 2021 tai ABC-123"),
      email: L("matti@example.fi", "matti@example.fi"),
      phone: L("+358 40 123 4567", "+358 40 123 4567"),
      message: L(
        "A sentence or two, and a few times that would suit you.",
        "Pari lausetta ja muutama sinulle sopiva ajankohta.",
      ),
    },
    submit: L("Request a slot →", "Pyydä aikaa →"),
    submitting: L("Sending…", "Lähetetään…"),
    failed: L(
      "That did not go through. Please try again in a moment.",
      "Lähetys ei onnistunut. Yritä hetken kuluttua uudelleen.",
    ),
    notice: L(
      "We hold your details only to arrange this booking. Your slot is confirmed when we reply.",
      "Säilytämme tietosi vain tämän varauksen hoitamiseen. Aika vahvistetaan vastauksessamme.",
    ),
    noticeOffline: L(
      "Delivery is not switched on, so this message is not sent anywhere.",
      "Lähetys ei ole päällä, joten viestiä ei toimiteta mihinkään.",
    ),
    successEyebrow: L("Received", "Vastaanotettu"),
    successHeading: L(
      "Thanks. We will confirm your slot.",
      "Kiitos. Vahvistamme aikasi.",
    ),
    successBody: L(
      "We have your details and will come back with a time. Nothing is charged until the work is agreed.",
      "Tietosi ovat meillä, ja palaamme ajankohdan kanssa. Mitään ei veloiteta ennen kuin työstä on sovittu.",
    ),
  },

  footer: {
    tagline: L(
      "Honest work, fair price, back on the road.",
      "Rehellistä työtä, reilu hinta, takaisin tielle.",
    ),
    address: L("Address", "Osoite"),
    phone: L("Phone", "Puhelin"),
    email: L("Email", "Sähköposti"),
    companyId: L("Company ID", "Y-tunnus"),
    phoneTba: L("[Phone TBA]", "[Puhelin tulossa]"),
    opening: L(
      "Hall 3, Kytkintie 38, Tattarisuo, Helsinki. Taking bookings now.",
      "Halli 3, Kytkintie 38, Tattarisuo, Helsinki. Otamme varauksia vastaan.",
    ),
    /** Used with the opening date, in place of `opening`. See lib/business.ts. */
    bookings: L("Taking bookings now.", "Otamme varauksia vastaan."),
    independent: L(
      "Independent workshop. Not affiliated with, endorsed by, or an authorised agent of Tesla, Inc. Tesla, Model S, Model 3, Model X and Model Y are trademarks of Tesla, Inc.",
      "Riippumaton korjaamo. Ei sidoksissa Tesla, Inc:iin eikä sen valtuuttama edustaja. Tesla, Model S, Model 3, Model X ja Model Y ovat Tesla, Inc:n tavaramerkkejä.",
    ),
  },

  validation: {
    name: L("Please tell us your name.", "Kerro nimesi."),
    vehicle: L(
      "Which car is it? Model or registration is fine.",
      "Mikä auto on kyseessä? Malli tai rekisterinumero riittää.",
    ),
    email: L("Please check your email address.", "Tarkista sähköpostiosoitteesi."),
    phone: L(
      "Please add a mobile number we can reach you on.",
      "Lisää puhelinnumero, josta sinut tavoittaa.",
    ),
    phoneFormat: L(
      "Digits, spaces, + ( ) - and . only.",
      "Vain numerot, välilyönnit sekä merkit + ( ) - ja .",
    ),
    message: L(
      "A sentence or two about the car helps us come back with a useful answer.",
      "Pari lausetta autosta auttaa meitä vastaamaan hyödyllisesti.",
    ),
    tooLong: L("That is longer than we can store.", "Teksti on liian pitkä."),
  },
} as const;
