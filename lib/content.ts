import type { Localized } from "./i18n";

/**
 * Every visible string on the page, in both languages.
 *
 * ⚠️ THE FINNISH IS UNREVIEWED. It uses the standard trade terms (öljynvaihto,
 * jakohihna, pyöränsuuntaus, rengashotelli, katsastus…) and should be
 * intelligible, but no native speaker has read it. Register in particular —
 * Finnish service copy is usually blunter than the English here — is worth a
 * pass before this is put in front of customers.
 */

const L = (en: string, fi: string): Localized => ({ en, fi });

export const CONTENT = {
  nav: {
    location: L("Vantaa, Finland", "Vantaa, Suomi"),
  },

  hero: {
    eyebrow: L("Opening soon", "Avaamme pian"),
    // Headline is split so the italic accent phrase can be styled separately.
    headlineA: L("Honest work,", "Rehellistä työtä,"),
    headlineB: L("fair price,", "reilu hinta,"),
    headlineAccent: L("back on the road.", "takaisin tielle."),
    standfirst: L(
      "A new independent garage for the Helsinki region, specialised in Tesla and other EVs — and just as at home with the engine cars most of Finland still drives. Every job is inspected, scoped and agreed with you before we start.",
      "Uusi riippumaton autokorjaamo pääkaupunkiseudulle. Erikoisalaamme ovat Teslat ja muut sähköautot — mutta yhtä lailla huollamme polttomoottoriautot, joilla suurin osa suomalaisista yhä ajaa. Jokainen työ tarkastetaan, rajataan ja hyväksytetään kanssasi ennen kuin aloitamme.",
    ),
    ctaPrimary: L("Register your interest", "Jätä yhteydenottopyyntö"),
    ctaSecondary: L("What we do", "Mitä teemme"),
    scroll: L("Scroll", "Vieritä"),
    scrollHint: L("See the workshop", "Katso korjaamo"),
  },

  services: {
    eyebrow: L("Services", "Palvelut"),
    headingA: L("Everything a car needs,", "Kaikki mitä auto tarvitsee,"),
    headingAccent: L("taken apart.", "osiin purettuna."),
    standfirst: L(
      "Servicing, diagnostics and repair across the whole vehicle. Standard jobs carry a fixed price; anything that depends on your particular car gets inspected and quoted before we start.",
      "Huollot, vianhaku ja korjaukset koko autoon. Vakiotöillä on kiinteä hinta; kaikki autokohtainen tarkastetaan ja hinnoitellaan ennen aloitusta.",
    ),
  },

  story: {
    eyebrow: L("Our story", "Tarinamme"),
    headingA: L("Built on experience,", "Kokemuksella rakennettu,"),
    headingAccent: L("tuned for what’s next.", "viritetty tulevaan."),
    p1: L(
      "Revamp Motors is built by mechanics who have spent years in the trade — from routine servicing to the kind of diagnostic work that separates a real fix from a guess.",
      "Revamp Motorsin takana on mekaanikkoja, jotka ovat olleet alalla vuosia — perushuolloista siihen vianhakuun, joka erottaa oikean korjauksen arvauksesta.",
    ),
    p2: L(
      "We have watched the industry shift toward EVs and built genuine depth there. Tesla and other electric vehicles are where a lot of our attention goes — battery and drivetrain diagnostics, and the software-related quirks most general garages have not caught up on yet.",
      "Olemme seuranneet alan siirtymää sähköautoihin ja rakentaneet siihen aitoa osaamista. Teslat ja muut sähköautot vievät suuren osan huomiostamme — akku- ja voimalinjadiagnostiikka sekä ne ohjelmisto-oudot, joihin useimmat yleiskorjaamot eivät ole vielä ehtineet.",
    ),
    p3: L(
      "That said, most cars on Finnish roads still run on an engine, and that is not something we have set aside. Combustion servicing and repair is still the bulk of what keeps the lights on, and we are just as exacting about it.",
      "Silti valtaosa Suomen teillä liikkuvista autoista käy yhä polttomoottorilla, emmekä ole jättäneet sitä sivuun. Polttomoottorihuollot ja -korjaukset ovat edelleen leipätyömme, ja teemme ne yhtä tarkasti.",
    ),
  },

  why: {
    eyebrow: L("Why us", "Miksi me"),
    headingA: L("Fair prices,", "Reilut hinnat,"),
    headingAccent: L("agreed first.", "sovittuna etukäteen."),
    standfirst: L(
      "Independent rates without the dealer overheads — and the number is agreed with you before anything is touched. If we find something else along the way, we stop and ring you first.",
      "Riippumattoman korjaamon hinnat ilman merkkiliikkeen kuluja — ja summa sovitaan kanssasi ennen kuin mihinkään kosketaan. Jos matkan varrella löytyy muuta, pysäytämme työn ja soitamme sinulle ensin.",
    ),
    b2bHeading: L("Fleets and business customers", "Yritys- ja kalustoasiakkaat"),
    b2b: L(
      "We work with businesses as well as private customers — food delivery and rideshare drivers, and companies running a handful of vehicles or a full fleet. Invoicing, agreed rates and servicing scheduled around your operating hours. Get in touch for a fleet quote.",
      "Palvelemme yksityisasiakkaiden lisäksi yrityksiä — ruokalähettejä ja kyytipalvelujen kuljettajia sekä yrityksiä, joilla on muutama auto tai kokonainen kalusto. Laskutus, sovitut hinnat ja huollot aikataulutettuna toimintanne mukaan. Pyydä kalustotarjous.",
    ),
    pricesEyebrow: L("Guide prices", "Ohjehinnat"),
    pricesHeading: L("What the common jobs cost.", "Mitä yleisimmät työt maksavat."),
    priceNote: L(
      "Prices shown are examples and may be adjusted based on your vehicle and the specific work needed. Special rates are available for food delivery and rideshare fleet vehicles — get in touch for a fleet quote.",
      "Hinnat ovat esimerkkejä ja voivat muuttua auton ja tehtävän työn mukaan. Ruokalähetti- ja kyytipalvelukalustolle on omat hintansa — pyydä kalustotarjous.",
    ),
  },

  process: {
    eyebrow: L("Process", "Näin se toimii"),
    headingA: L("Four steps,", "Neljä vaihetta,"),
    headingAccent: L("no surprises.", "ei yllätyksiä."),
    steps: [
      {
        title: L("Tell us what is wrong", "Kerro mikä on vialla"),
        body: L(
          "Describe the noise, the warning light or the inspection failure — or just book a standard service.",
          "Kuvaile ääni, merkkivalo tai katsastuksen hylkäys — tai varaa vain perushuolto.",
        ),
      },
      {
        title: L("We confirm scope and price", "Vahvistamme työn ja hinnan"),
        body: L(
          "We look the car over, then come back to you with what it needs and what it will cost.",
          "Katsomme auton läpi ja kerromme sinulle, mitä se tarvitsee ja mitä se maksaa.",
        ),
      },
      {
        title: L("We do the work", "Teemme työn"),
        body: L(
          "Only what you approved. If something else turns up, we call before going any further.",
          "Vain sen, minkä hyväksyit. Jos muuta ilmenee, soitamme ennen kuin jatkamme.",
        ),
      },
      {
        title: L("Collect and pay", "Nouto ja maksu"),
        body: L(
          "You pick the car up, we walk you through what we did, and you pay on collection.",
          "Haet auton, käymme tehdyt työt läpi kanssasi, ja maksat noudon yhteydessä.",
        ),
      },
    ],
  },

  contact: {
    eyebrow: L("Contact", "Yhteystiedot"),
    headingA: L("Tell us about", "Kerro meille"),
    headingAccent: L("the car.", "autostasi."),
    p1: L(
      "We are not open yet, so nothing is bookable today. Once we are, we will run flexible hours across every day of the week to fit around your schedule — early drop-offs, evenings, whatever works.",
      "Emme ole vielä auki, joten varauksia ei voi vielä tehdä. Kun avaamme, palvelemme joustavasti viikon jokaisena päivänä aikatauluusi sopien — aikaiset jätöt, illat, miten sinulle parhaiten sopii.",
    ),
    p2: L(
      "For now, leave your details below and we will get back to you within 3 to 12 hours.",
      "Jätä toistaiseksi yhteystietosi alle, niin palaamme asiaan 3–12 tunnin kuluessa.",
    ),
    fields: {
      name: L("Name", "Nimi"),
      registration: L("Registration number", "Rekisterinumero"),
      email: L("Email", "Sähköposti"),
      phone: L("Mobile number", "Puhelinnumero"),
      message: L("Message", "Viesti"),
    },
    placeholders: {
      name: L("Matti Virtanen", "Matti Virtanen"),
      registration: L("ABC-123", "ABC-123"),
      email: L("matti@example.fi", "matti@example.fi"),
      phone: L("+358 40 123 4567", "+358 40 123 4567"),
      message: L(
        "Tell us what your car needs, and let us know a few times that would work for you.",
        "Kerro mitä autosi tarvitsee ja ehdota muutamaa sinulle sopivaa ajankohtaa.",
      ),
    },
    submit: L("Send booking request →", "Lähetä yhteydenottopyyntö →"),
    submitting: L("Sending…", "Lähetetään…"),
    failed: L(
      "That did not go through. Please try again in a moment.",
      "Lähetys ei onnistunut. Yritä hetken kuluttua uudelleen.",
    ),
    notice: L(
      "Pre-launch form. We will hold your details only to reply to this enquiry — no booking is confirmed yet.",
      "Ennakkolomake. Säilytämme tietosi vain vastataksemme tähän yhteydenottoon — varausta ei ole vielä vahvistettu.",
    ),
    noticeOffline: L(
      "Pre-launch form. Delivery is not switched on, so this message is not sent anywhere.",
      "Ennakkolomake. Lähetys ei ole päällä, joten viestiä ei toimiteta mihinkään.",
    ),
    successEyebrow: L("Received", "Vastaanotettu"),
    successHeading: L(
      "Thanks — we will be in touch once we are open.",
      "Kiitos — olemme yhteydessä heti kun avaamme.",
    ),
    successBody: L(
      "Nothing is booked yet. We have your details and will contact you directly when we can offer you a time.",
      "Varausta ei ole vielä tehty. Tietosi ovat meillä, ja otamme yhteyttä heti kun voimme tarjota ajan.",
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
    prelaunch: L(
      "Revamp Motors is in pre-launch. Not yet open for bookings.",
      "Revamp Motors ei ole vielä avannut. Varauksia ei oteta vastaan.",
    ),
  },

  validation: {
    name: L("Please tell us your name.", "Kerro nimesi."),
    registration: L(
      "Please add your registration number.",
      "Lisää auton rekisterinumero.",
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
