import type { Lang } from "@/site.config";
import type { QA, Seo } from "./types";

/**
 * The FAQ page. Warranty answers are deliberately careful: they describe the
 * EU rules in general terms, say warranty repairs are Tesla's, and tell the
 * reader to check their own terms. Not legal advice. FINNISH NEEDS HUMAN REVIEW.
 */

type FaqGroup = { title: string; items: QA[] };
type FaqCopy = { seo: Seo; label: string; h1: string; lead: string; groups: FaqGroup[]; previewIds: number[][] };

export const FAQ: Record<Lang, FaqCopy> = {
  fi: {
    seo: {
      title: "Usein kysyttyä: Tesla-huolto, takuu, ajanvaraus ja diagnostiikka",
      description:
        "Vastaukset yleisimpiin kysymyksiin: vaikuttaako riippumaton huolto Teslan takuuseen, miten ajanvaraus toimii, mitä diagnostiikka sisältää ja huollammeko muita autoja.",
    },
    label: "Usein kysyttyä",
    h1: "Usein kysyttyä",
    lead: "Suoria vastauksia kysymyksiin, joita meiltä kysytään eniten. Jos et löydä vastausta, soita tai lähetä viesti.",
    groups: [
      {
        title: "Ajanvaraus ja käynti",
        items: [
          {
            q: "Miten varaan ajan?",
            a: "[Lomakkeella](@contact), soittamalla tai WhatsAppilla. Vastaamme 12 tunnin kuluessa, usein jo 3 tunnissa, ja aika vahvistetaan vastauksessamme.",
          },
          {
            q: "Onko korjaamo auki arkisin?",
            a: "Arkisin työskentelemme vain ajanvarauksella. Viikonloppuisin teemme täysiä työpäiviä, ja kellonajat vahvistetaan varauksen yhteydessä.",
          },
          {
            q: "Mistä löydän korjaamon?",
            a: "Halli 3, Kytkintie 38, 00770 Helsinki, Tattarisuolla. Pihassa on useita halleja, joten etsi hallin numero 3. [Avaa kartalla](https://maps.app.goo.gl/ymn8vnducX7tqAai7).",
          },
          {
            q: "Voinko jättää auton viikonlopuksi?",
            a: "Kyllä. Tuo auto sovittuna aikana, ja saat sen takaisin valmiina. Lue lisää [viikonloppuhuollosta](@weekend).",
          },
          {
            q: "Saanko arvion ennen töitä?",
            a: "Kyllä. Saat arvion ja hyväksyt sen ennen kuin työ alkaa. Jos työn aikana löytyy muuta korjattavaa, soitamme ennen kuin jatkamme.",
          },
        ],
      },
      {
        title: "Tesla ja takuu",
        items: [
          {
            q: "Vaikuttaako riippumaton huolto Teslan takuuseen?",
            a: "EU:n kilpailusäännöt rajoittavat valmistajan oikeutta evätä takuu pelkästään siksi, että määräaikaishuolto on tehty riippumattomassa korjaamossa, kun työ tehdään valmistajan ohjeiden mukaan ja vaatimukset täyttävillä osilla. Takuukorjaukset tekee kuitenkin Tesla, ja virheellisestä työstä aiheutunut vahinko voi jäädä takuun ulkopuolelle. Takuuehdot vaihtelevat, joten tarkista oman autosi ehdot. Tämä ei ole oikeudellinen neuvo.",
          },
          {
            q: "Teettekö takuukorjauksia?",
            a: "Emme. Takuukorjaukset tekee Tesla. Jos vika näyttää kuuluvan takuuseen, kerromme sen ja ohjaamme sinut Teslan huoltoon.",
          },
          {
            q: "Oletteko Teslan valtuuttama huolto?",
            a: "Emme. Olemme riippumaton korjaamo, emmekä ole sidoksissa Tesla, Inc:iin.",
          },
          {
            q: "Mitä osia käytätte?",
            a: "Kerromme arviossa, mitä osia käytämme. Jos vaihtoehtoja on, kerromme niiden erot ja saat valita.",
          },
          {
            q: "Voitteko päivittää Teslan ohjelmiston?",
            a: "Emme muokkaa auton ohjelmistoa. Päivitykset tulevat Teslalta langattomasti. Tarkistamme auton ohjelmistoversion ja kerromme, jos vika näyttää liittyvän ohjelmistoon.",
          },
          {
            q: "Teettekö suurjännitetöitä?",
            a: "Kyllä. Suurjännitejärjestelmä tehdään jännitteettömäksi valmistajan ohjeen mukaan ja jännitteettömyys varmistetaan mittaamalla ennen töitä. Työn tekee siihen koulutettu henkilö.",
          },
        ],
      },
      {
        title: "Diagnostiikka",
        items: [
          {
            q: "Maksaako diagnostiikka?",
            a: "Kerromme diagnostiikan kustannuksen aina etukäteen, eikä mitään veloiteta ilman hyväksyntääsi. Teslan avajaistarjouksen tiedot löytyvät [tarjoussivulta](@offer).",
          },
          {
            q: "Mitä vianhaku sisältää?",
            a: "Kuuntelemme oireet, luemme vikakoodit, mittaamme ja tarkistamme auton tarvittaessa nostimella ja koeajolla. Saat löydökset ja arvion. Lue lisää: [mitä vianhaku oikeasti sisältää](@post-diagnosis).",
          },
          {
            q: "Pitääkö auto korjauttaa teillä diagnostiikan jälkeen?",
            a: "Ei. Saat löydökset ja arvion, ja päätät itse. Voit hakea auton ilman korjausta.",
          },
          {
            q: "Teettekö tarkastuksen käytetyn auton ostajalle?",
            a: "Kyllä. Käymme läpi ajoakun kunnon, alustan, jarrut, renkaat ja vikakoodit ja annamme kirjallisen yhteenvedon. Katso myös [akun kuntoraportti](@battery-report).",
          },
        ],
      },
      {
        title: "Muut autot",
        items: [
          {
            q: "Huollatteko muita sähköautoja?",
            a: "Kyllä. Polestar, Volkswagen ID, Kia, Hyundai, BMW i ja muut. Lue lisää [muiden sähköautojen huollosta](@ev).",
          },
          {
            q: "Huollatteko bensa- ja dieselautoja?",
            a: "Teemme niihin perustöitä ajanvarauksella: öljyt ja suodattimet, jarrut, renkaat ja pienet korjaukset. Katso [muut autot](@other).",
          },
          {
            q: "Säilytättekö renkaita?",
            a: "Kyllä. Rengashotellissa renkaat säilytetään sisätiloissa ja tarkistetaan ennen seuraavaa asennusta.",
          },
        ],
      },
    ],
    previewIds: [
      [1, 0],
      [0, 4],
      [2, 0],
      [0, 3],
      [2, 2],
    ],
  },
  en: {
    seo: {
      title: "FAQ: Tesla servicing, warranty, booking and diagnosis",
      description:
        "Answers to the most common questions: does independent servicing affect your Tesla warranty, how booking works, what a diagnosis includes and whether we service other cars.",
    },
    label: "FAQ",
    h1: "Frequently asked questions",
    lead: "Straight answers to the questions we are asked most. If yours is not here, call or send a message.",
    groups: [
      {
        title: "Booking and visiting",
        items: [
          {
            q: "How do I book?",
            a: "With the [form](@contact), by phone or on WhatsApp. We reply within 3 to 12 hours, and your slot is confirmed in our reply.",
          },
          {
            q: "Are you open on weekdays?",
            a: "On weekdays we work by appointment only. At weekends we work full days, and times are confirmed when you book.",
          },
          {
            q: "How do I find the garage?",
            a: "Hall 3, Kytkintie 38, 00770 Helsinki, in Tattarisuo. There are several halls in the yard, so look for hall number 3. [Open in Maps](https://maps.app.goo.gl/ymn8vnducX7tqAai7).",
          },
          {
            q: "Can I leave the car over the weekend?",
            a: "Yes. Drop it off at the agreed time and get it back finished. Read more about [weekend service](@weekend).",
          },
          {
            q: "Do I get an estimate before any work?",
            a: "Yes. You get an estimate and approve it before work begins. If we find anything else during the job, we call before we continue.",
          },
        ],
      },
      {
        title: "Tesla and warranty",
        items: [
          {
            q: "Does independent servicing affect my Tesla warranty?",
            a: "EU competition rules limit a manufacturer's right to refuse warranty just because routine maintenance was done by an independent garage, provided the work follows the manufacturer's specifications and uses parts of matching quality. Warranty repairs themselves are still done by Tesla, and damage caused by faulty work can fall outside the warranty. Warranty terms vary, so check the terms for your own car. This is not legal advice.",
          },
          {
            q: "Do you do warranty repairs?",
            a: "No. Warranty repairs are done by Tesla. If a fault looks like it is covered, we tell you and send you to Tesla service.",
          },
          {
            q: "Are you an authorised Tesla service centre?",
            a: "No. We are an independent garage and are not affiliated with Tesla, Inc.",
          },
          {
            q: "What parts do you use?",
            a: "The estimate tells you which parts we will use. If there are options, we explain the differences and you choose.",
          },
          {
            q: "Can you update a Tesla's software?",
            a: "We do not modify the car's software. Updates come from Tesla over the air. We check the software version and tell you if a fault looks software related.",
          },
          {
            q: "Do you do high-voltage work?",
            a: "Yes. The high-voltage system is de-energised to the manufacturer's procedure and confirmed dead by measurement before work. The work is done by someone trained for it.",
          },
        ],
      },
      {
        title: "Diagnosis",
        items: [
          {
            q: "Does a diagnosis cost anything?",
            a: "We always tell you the cost of a diagnosis in advance, and nothing is charged without your approval. Details of the Tesla launch offer are on the [offer page](@offer).",
          },
          {
            q: "What does a diagnosis involve?",
            a: "We listen to the symptoms, read the fault codes, take measurements and inspect the car on the lift and on a road test where needed. You get the findings and an estimate. More in [what a diagnosis actually involves](@post-diagnosis).",
          },
          {
            q: "Do I have to have the repair done with you after a diagnosis?",
            a: "No. You get the findings and an estimate, and you decide. You can collect the car without any repair.",
          },
          {
            q: "Do you do pre-purchase inspections?",
            a: "Yes. We go through the battery's condition, suspension, brakes, tyres and fault codes and give you a written summary. See also the [battery health report](@battery-report).",
          },
        ],
      },
      {
        title: "Other cars",
        items: [
          {
            q: "Do you service other electric cars?",
            a: "Yes. Polestar, Volkswagen ID, Kia, Hyundai, BMW i and others. Read more about [servicing other EVs](@ev).",
          },
          {
            q: "Do you service petrol and diesel cars?",
            a: "We do basic work on them by appointment: oil and filters, brakes, tyres and small repairs. See [other vehicles](@other).",
          },
          {
            q: "Do you store tyres?",
            a: "Yes. Tyres in storage are kept indoors and checked before they go back on.",
          },
        ],
      },
    ],
    previewIds: [
      [1, 0],
      [0, 4],
      [2, 0],
      [0, 3],
      [2, 2],
    ],
  },
};

export function faqPreview(lang: Lang): QA[] {
  const f = FAQ[lang];
  return f.previewIds.map(([g, i]) => f.groups[g].items[i]);
}

export function allFaq(lang: Lang): QA[] {
  return FAQ[lang].groups.flatMap((g) => g.items);
}
