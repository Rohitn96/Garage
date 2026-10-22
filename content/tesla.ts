import type { Lang } from "@/site.config";
import type { Block, QA, Seo, TitledItem } from "./types";

/** Tesla hub, launch offer and battery report pages. FINNISH NEEDS HUMAN REVIEW. */

type HubCopy = {
  seo: Seo;
  label: string;
  h1: string;
  lead: string;
  modelsTitle: string;
  servicesTitle: string;
  servicesLead: string;
  extrasTitle: string;
  approach: Block[];
  faq: QA[];
  cta: string;
};

export const HUB: Record<Lang, HubCopy> = {
  fi: {
    seo: {
      title: "Tesla-huolto Helsingissä: vianhaku, akku, jarrut ja alusta",
      description:
        "Riippumaton Tesla-huolto Tattarisuolla, Helsingissä. Model 3, Y, S ja X: diagnostiikka, 12 V:n akku, jarrut, ilmajousitus, renkaat ja sähköviat.",
    },
    label: "Tesla · Tattarisuo, Helsinki",
    h1: "Riippumaton Tesla-huolto Helsingissä",
    lead: "Model 3, Model Y, Model S ja Model X. Vianhaku, akku ja lataus, jarrut, alusta ja ilmajousitus, renkaat ja sähköviat. Ensin syy, sitten arvio, ja sinä päätät.",
    modelsTitle: "Valitse malli",
    servicesTitle: "Tesla-palvelut järjestelmittäin",
    servicesLead: "Jokaisella sivulla kerromme oireet, mitä tarkistamme, miten vianhaku etenee ja milloin kannattaa varata aika.",
    extrasTitle: "Lisäksi",
    approach: [
      { h2: "Miten työskentelemme Teslan kanssa" },
      {
        p: "Tesla on tietokone pyörillä, mutta suurin osa sen huolloista on edelleen mekaanisia: jarrut, alusta, renkaat ja 12 V:n akku. Teemme nämä työt valmistajan ohjeiden mukaan. Ilmajousitetut autot nostetaan nostotilassa, sähköisen pysäköintijarrun kanssa noudatetaan oikeaa menettelyä, ja suurjännitejärjestelmä tehdään jännitteettömäksi ennen kuin siihen kosketaan.",
      },
      {
        p: "Ohjelmistopäivitykset tulevat Teslalta langattomasti, emmekä muokkaa auton ohjelmistoa. Jos vika vaatii valmistajan toimenpidettä tai kuuluu todennäköisesti takuuseen, kerromme sen suoraan ja ohjaamme sinut Teslan huoltoon.",
      },
      {
        note: "Revamp Motors on riippumaton korjaamo. Emme ole sidoksissa Tesla, Inc:iin emmekä ole sen valtuuttama huoltoliike.",
      },
    ],
    faq: [
      {
        q: "Vaikuttaako riippumaton huolto Teslan takuuseen?",
        a: "EU:n kilpailusäännöt rajoittavat valmistajan oikeutta evätä takuu pelkästään siksi, että määräaikaishuolto on tehty riippumattomassa korjaamossa, kun työ tehdään valmistajan ohjeiden mukaan ja vaatimukset täyttävillä osilla. Takuukorjaukset tekee kuitenkin Tesla, ja virheellisestä työstä aiheutunut vahinko voi jäädä takuun ulkopuolelle. Tarkista oman autosi takuuehdot.",
      },
      {
        q: "Teettekö takuukorjauksia?",
        a: "Emme. Jos vika näyttää kuuluvan takuuseen, kerromme sen ja ohjaamme sinut Teslan huoltoon.",
      },
      {
        q: "Huollatteko kaikkia Tesla-malleja?",
        a: "Kyllä: Model S, Model 3, Model X ja Model Y, myös vanhemmat yksilöt.",
      },
    ],
    cta: "Varaa Teslallesi aika",
  },
  en: {
    seo: {
      title: "Tesla service in Helsinki: diagnostics, battery, brakes, suspension",
      description:
        "Independent Tesla service in Tattarisuo, Helsinki. Model 3, Y, S and X: diagnostics, 12 V battery, brakes, air suspension, tyres and electrical faults.",
    },
    label: "Tesla · Tattarisuo, Helsinki",
    h1: "Independent Tesla service in Helsinki",
    lead: "Model 3, Model Y, Model S and Model X. Diagnostics, battery and charging, brakes, suspension and air suspension, tyres and electrical faults. The cause first, then an estimate, and you decide.",
    modelsTitle: "Choose a model",
    servicesTitle: "Tesla services by system",
    servicesLead: "Each page covers the symptoms, what we check, how the diagnosis works and when to book.",
    extrasTitle: "Also",
    approach: [
      { h2: "How we work on Teslas" },
      {
        p: "A Tesla is a computer on wheels, but most of its servicing is still mechanical: brakes, suspension, tyres and the 12 V battery. We do this work to the manufacturer's procedures. Cars with air suspension are lifted in jack mode, the electric parking brake gets the correct procedure, and the high-voltage system is de-energised before anyone touches it.",
      },
      {
        p: "Software updates come from Tesla over the air, and we do not modify the car's software. If a fault needs the manufacturer or is likely to be covered by warranty, we say so plainly and send you to Tesla service.",
      },
      {
        note: "Revamp Motors is an independent garage. We are not affiliated with Tesla, Inc. and are not an authorised Tesla service centre.",
      },
    ],
    faq: [
      {
        q: "Does independent servicing affect my Tesla warranty?",
        a: "EU competition rules limit a manufacturer's right to refuse warranty just because routine maintenance was done by an independent garage, provided the work follows the manufacturer's specifications and uses parts of matching quality. Warranty repairs themselves are still done by Tesla, and damage caused by faulty work can fall outside the warranty. Check the warranty terms for your own car.",
      },
      {
        q: "Do you do warranty repairs?",
        a: "No. If a fault looks like it is covered by warranty, we tell you and send you to Tesla service.",
      },
      {
        q: "Do you work on every Tesla model?",
        a: "Yes: Model S, Model 3, Model X and Model Y, including older cars.",
      },
    ],
    cta: "Book your Tesla in",
  },
};

type OfferCopy = {
  seoLive: Seo;
  seoEnded: Seo;
  live: { label: string; h1: string; lead: string };
  ended: { label: string; h1: string; lead: string };
  howTitle: string;
  steps: TitledItem[];
  scopeTitle: string;
  scopeGeneral: Block[];
  includes: string;
  excludes: string;
  scopePending: string;
  termsTitle: string;
  terms: string[];
  endDateLabel: string;
  cta: string;
};

export const OFFER_PAGE: Record<Lang, OfferCopy> = {
  fi: {
    seoLive: {
      title: "Ilmainen Tesla-diagnostiikka Helsingissä 31.12.2026 asti",
      description:
        "Avajaistarjous: ilmainen diagnostiikka Teslalle Tattarisuolla, Helsingissä 31.12.2026 asti. Saat löydökset ja arvion, ja päätät itse. Ei sitoumusta.",
    },
    seoEnded: {
      title: "Tesla-diagnostiikka Helsingissä",
      description:
        "Teslan vianhaku Tattarisuolla, Helsingissä. Saat löydökset ja kirjallisen arvion, ja päätät itse, mitä tehdään.",
    },
    live: {
      label: "Avajaistarjous · voimassa 31.12.2026 asti",
      h1: "Ilmainen diagnostiikka Teslalle",
      lead: "Tuo Tesla vianhakuun maksutta. Jos löydämme jotain, saat arvion ja päätät itse, jatketaanko. Ei sitoumusta.",
    },
    ended: {
      label: "Tesla-diagnostiikka",
      h1: "Teslan diagnostiikka",
      lead: "Avajaistarjous päättyi 31.12.2026. Diagnostiikka toimii edelleen samalla tavalla: saat löydökset ja arvion ennen kuin mitään korjataan, ja päätät itse.",
    },
    howTitle: "Näin se etenee",
    steps: [
      { title: "Varaa aika", body: "Lomakkeella, puhelimella tai WhatsAppilla. Kerro malli, vuosimalli ja oireet." },
      { title: "Tuo auto", body: "Sovittuna aikana, myös viikonloppuisin." },
      { title: "Vianhaku", body: "Luemme vikakoodit, mittaamme ja tarkistamme kuvaamasi vian." },
      { title: "Löydökset ja arvio", body: "Kerromme mitä löytyi. Päätät itse, korjataanko, ja voit hakea auton ilman korjausta." },
    ],
    scopeTitle: "Mitä diagnostiikka sisältää",
    scopeGeneral: [
      {
        p: "Diagnostiikka keskittyy siihen vikaan tai oireeseen, jonka kerrot meille varatessasi. Selvitämme syyn auton omien vikakoodien, mittausten ja tarkastuksen avulla ja kerromme löydökset selkeästi: mikä on vialla, miten varmistimme sen ja mitä korjaus sisältäisi.",
      },
      {
        p: "Jos vian paikantaminen vaatii laajempaa purkamista, kerromme siitä ja sen kustannuksista etukäteen. Mitään ylimääräistä ei tehdä ilman hyväksyntääsi.",
      },
    ],
    includes: "Sisältyy",
    excludes: "Ei sisälly",
    scopePending: "Diagnostiikan tarkka sisältö vahvistetaan varauksen yhteydessä.",
    termsTitle: "Ehdot",
    terms: [
      "Koskee Tesla-merkkisiä autoja: Model S, Model 3, Model X ja Model Y.",
      "Tarjous on voimassa 31.12.2026 asti.",
      "Diagnostiikka on maksuton. Saat löydökset ja arvion, eikä mihinkään tarvitse sitoutua.",
      "Korjaukset ja osat tehdään vain hyväksymäsi arvion mukaan.",
      "Takuuseen todennäköisesti kuuluvista vioista kerromme ja ohjaamme sinut Teslan huoltoon.",
    ],
    endDateLabel: "Voimassa",
    cta: "Varaa ilmainen diagnostiikka",
  },
  en: {
    seoLive: {
      title: "Free Tesla diagnosis in Helsinki until 31.12.2026",
      description:
        "Launch offer: a free diagnosis for Tesla in Tattarisuo, Helsinki until 31 December 2026. You get the findings and an estimate, and you decide. No obligation.",
    },
    seoEnded: {
      title: "Tesla diagnosis in Helsinki",
      description:
        "Tesla fault diagnosis in Tattarisuo, Helsinki. You get the findings and a written estimate, and you decide what is done.",
    },
    live: {
      label: "Launch offer · valid until 31.12.2026",
      h1: "Free diagnosis for Tesla",
      lead: "Bring your Tesla in for a free diagnosis. If we find something, you get an estimate and decide whether to go ahead. No obligation.",
    },
    ended: {
      label: "Tesla diagnosis",
      h1: "Tesla diagnosis",
      lead: "The launch offer ended on 31 December 2026. The diagnosis still works the same way: you get the findings and an estimate before anything is repaired, and you decide.",
    },
    howTitle: "How it works",
    steps: [
      { title: "Book", body: "By form, phone or WhatsApp. Tell us the model, the year and the symptoms." },
      { title: "Drop the car off", body: "At the agreed time, weekends included." },
      { title: "Diagnosis", body: "We read the fault codes, take measurements and check the fault you described." },
      { title: "Findings and estimate", body: "We tell you what we found. You decide whether to repair, and you can collect the car without any repair." },
    ],
    scopeTitle: "What the diagnosis covers",
    scopeGeneral: [
      {
        p: "The diagnosis focuses on the fault or symptom you describe when you book. We find the cause using the car's own fault codes, measurements and an inspection, and we explain the findings clearly: what is wrong, how we confirmed it and what a repair would involve.",
      },
      {
        p: "If finding the fault needs more extensive dismantling, we tell you about it and its cost in advance. Nothing extra is done without your approval.",
      },
    ],
    includes: "Included",
    excludes: "Not included",
    scopePending: "The exact scope of the diagnosis is confirmed when you book.",
    termsTitle: "Terms",
    terms: [
      "For Tesla vehicles: Model S, Model 3, Model X and Model Y.",
      "The offer is valid until 31 December 2026.",
      "The diagnosis is free. You get the findings and an estimate, with no obligation.",
      "Repairs and parts are carried out only to an estimate you have approved.",
      "If a fault is likely to be covered by warranty, we tell you and send you to Tesla service.",
    ],
    endDateLabel: "Valid until",
    cta: "Book a free diagnosis",
  },
};

type ReportCopy = {
  seo: Seo;
  label: string;
  h1: string;
  lead: string;
  coversTitle: string;
  covers: TitledItem[];
  whenTitle: string;
  when: TitledItem[];
  limitsTitle: string;
  limits: Block[];
  sampleTitle: string;
  faq: QA[];
  cta: string;
};

export const REPORT: Record<Lang, ReportCopy> = {
  fi: {
    seo: {
      title: "Teslan akun kuntotesti ja kuntoraportti Helsingissä",
      description:
        "Teslan ajoakun kuntoraportti: kapasiteetti, kennojen tasapaino ja vikakoodit kirjallisena. Hyödyllinen auton ostossa ja myynnissä. Tattarisuo, Helsinki.",
    },
    label: "Tesla · Akun kuntoraportti",
    h1: "Teslan akun kuntoraportti",
    lead: "Kirjallinen arvio ajoakun kunnosta. Hyödyllinen, kun ostat tai myyt Teslaa, kun takuu on päättymässä tai kun toimintamatka on muuttunut. Akkua ei avata, ja kunto arvioidaan auton omista tiedoista ja mittauksista.",
    coversTitle: "Mitä raportissa käydään läpi",
    covers: [
      { title: "Käytettävissä oleva kapasiteetti", body: "Arvio akun nykyisestä kapasiteetista suhteessa uuteen." },
      { title: "Kennoryhmien tasapaino", body: "Suuret jännite-erot kennoryhmien välillä voivat kertoa ongelmasta ennen kuin se näkyy toimintamatkassa." },
      { title: "Vikakoodit ja historia", body: "Akunhallintajärjestelmän tallentamat vikakoodit ja ilmoitukset." },
      { title: "12 V:n akku ja lataus", body: "Pienjänniteakun kunto ja latausjärjestelmän toiminta." },
    ],
    whenTitle: "Milloin raportista on hyötyä",
    when: [
      { title: "Käytetyn Teslan osto", body: "Tiedät ennen kauppaa, missä kunnossa auton kallein osa on." },
      { title: "Myynti", body: "Kirjallinen raportti antaa ostajalle luottamusta." },
      { title: "Takuun päättyminen", body: "Mahdollinen vika kannattaa löytää, kun takuu on vielä voimassa." },
      { title: "Toimintamatkan muutos", body: "Selvitä, onko kyse normaalista ikääntymisestä vai viasta." },
    ],
    limitsTitle: "Mitä raportti ei kerro",
    limits: [
      {
        p: "Raportti kuvaa akun kunnon testihetkellä. Se ei ennusta tulevia vikoja eikä ole takuu. Kapasiteettiarvio perustuu auton järjestelmän tietoihin, ja lämpötila ja varaustila vaikuttavat tulokseen, joten testi tehdään hallitusti.",
      },
      { p: "Jos löydämme merkkejä viasta, kerromme sen ja mitä se tarkoittaa autosi kannalta. Takuuasioissa ohjaamme sinut Teslan huoltoon." },
    ],
    sampleTitle: "Esimerkkiraportti",
    faq: [
      {
        q: "Kuinka paljon Teslan akku heikkenee?",
        a: "Akun kapasiteetti laskee vähitellen iän ja käytön myötä, ja muutos on yleensä suurin ensimmäisinä vuosina. Määrä vaihtelee autokohtaisesti, minkä vuoksi mittaus kertoo enemmän kuin keskiarvo.",
      },
      {
        q: "Pitääkö auton olla ladattu testiin tullessa?",
        a: "Kerromme varauksen yhteydessä, millaisella varaustilalla auto kannattaa tuoda.",
      },
      {
        q: "Avataanko akku testissä?",
        a: "Ei. Kunto arvioidaan auton omista tiedoista ja mittauksista.",
      },
    ],
    cta: "Varaa akun kuntoraportti",
  },
  en: {
    seo: {
      title: "Tesla battery health check and report in Helsinki",
      description:
        "Tesla battery health report: capacity, cell balance and fault codes in writing. Useful when buying or selling. Tattarisuo, Helsinki.",
    },
    label: "Tesla · Battery health report",
    h1: "Tesla battery health report",
    lead: "A written assessment of the high-voltage battery. Useful when you buy or sell a Tesla, when the warranty is about to end, or when range has changed. The pack is not opened; its condition is assessed from the car's own data and measurements.",
    coversTitle: "What the report covers",
    covers: [
      { title: "Usable capacity", body: "An estimate of the battery's current capacity compared with new." },
      { title: "Cell group balance", body: "Large voltage differences between cell groups can point to a problem before it shows in range." },
      { title: "Fault codes and history", body: "Fault codes and alerts stored by the battery management system." },
      { title: "12 V battery and charging", body: "Low-voltage battery condition and charging system operation." },
    ],
    whenTitle: "When the report is useful",
    when: [
      { title: "Buying a used Tesla", body: "Know the condition of the most expensive part before you buy." },
      { title: "Selling", body: "A written report gives the buyer confidence." },
      { title: "Before the warranty ends", body: "Better to find a possible fault while the warranty still applies." },
      { title: "A change in range", body: "Find out whether it is normal ageing or a fault." },
    ],
    limitsTitle: "What the report does not tell you",
    limits: [
      {
        p: "The report describes the battery's condition at the time of the test. It does not predict future faults and it is not a guarantee. The capacity estimate is based on the car's system data, and temperature and state of charge affect the result, so the test is done under controlled conditions.",
      },
      { p: "If we see signs of a fault, we tell you what it means for your car. For warranty matters we send you to Tesla service." },
    ],
    sampleTitle: "Sample report",
    faq: [
      {
        q: "How much does a Tesla battery degrade?",
        a: "Capacity drops gradually with age and use, and the change is usually largest in the first years. It varies from car to car, which is why a measurement tells you more than an average.",
      },
      {
        q: "Does the car need to be charged when I bring it in?",
        a: "We tell you when you book what state of charge to bring the car in at.",
      },
      {
        q: "Is the battery opened for the test?",
        a: "No. Condition is assessed from the car's own data and measurements.",
      },
    ],
    cta: "Book a battery health report",
  },
};
