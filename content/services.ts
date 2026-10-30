import type { Lang } from "@/site.config";
import type { ServiceContent } from "./types";

/**
 * The Tesla service pages, Finnish and English. High-voltage battery and
 * powertrain work is not offered (no SFS 6002 qualification), so there are no
 * pages for it; the 12 V battery lives on the electrical page.
 *
 * Every claim here is either general, verifiable vehicle knowledge or a claim
 * the shop already made on the previous site. No prices, no statistics.
 * FINNISH NEEDS HUMAN REVIEW.
 */

export type ServiceId = "svc-brakes" | "svc-suspension" | "svc-tyres" | "svc-climate" | "svc-electrical";

export const SERVICE_IDS: ServiceId[] = ["svc-brakes", "svc-suspension", "svc-tyres", "svc-climate", "svc-electrical"];

/** Card copy for grids: one line per service. */
export const SERVICE_CARDS: Record<ServiceId, { fi: string; en: string }> = {
  "svc-brakes": {
    fi: "Satuloiden huolto, levyt, palat ja jarruneste.",
    en: "Caliper service, discs, pads and brake fluid.",
  },
  "svc-suspension": {
    fi: "Tukivarret, holkit ja ilmajousituksen vuodot.",
    en: "Control arms, bushings and air suspension leaks.",
  },
  "svc-tyres": {
    fi: "Kausivaihto, suuntaus, tasapainotus ja rengashotelli.",
    en: "Seasonal changes, alignment, balancing and tyre storage.",
  },
  "svc-climate": {
    fi: "Ilmastoinnin huolto, lämpöpumppu, huurtuminen ja suodattimet.",
    en: "AC service, heat pump, fogging and cabin filters.",
  },
  "svc-electrical": {
    fi: "12 V:n akun vaihto, varoitukset, anturit ja kamerat.",
    en: "12 V battery replacement, warnings, sensors and cameras.",
  },
};

/** Climate page only: what refrigerant work is offered, per SITE.acLicensed. */
export const CLIMATE_SCOPE: Record<Lang, { limited: string; full: string }> = {
  fi: {
    limited:
      "Kylmäainepiirin työt, kuten ilmastoinnin tyhjennys, täyttö ja vuototesti, vaativat F-kaasupätevyyden. Pätevyytemme on hakuprosessissa, ja kylmäainetyöt tulevat valikoimaamme pian. Siihen asti teemme ilmastoinnin ja lämpöpumpun vianhaun, anturi- ja nestepiirityöt sekä suodattimet, ja jos vika on kylmäainepiirissä, kerromme sen suoraan.",
    full: "Teemme myös kylmäainepiirin työt, kuten ilmastoinnin tyhjennyksen, täytön ja painekokeen.",
  },
  en: {
    limited:
      "Refrigerant work, such as evacuating, recharging and leak testing the air conditioning, requires an F-gas certification. Ours is in progress, and refrigerant work is coming soon. Until then we diagnose the air conditioning and heat pump, do sensor and coolant circuit work and filters, and if the fault is in the refrigerant circuit, we tell you plainly.",
    full: "We also carry out refrigerant circuit work, including evacuating, recharging and pressure testing the air conditioning.",
  },
};

const FI: Record<ServiceId, ServiceContent> = {
  "svc-brakes": {
    seo: {
      title: "Teslan jarrut ja jarrusatuloiden huolto Helsingissä",
      description:
        "Teslan jarrusatuloiden puhdistus ja voitelu, levyt, palat ja jarruneste. Regeneratiivinen jarrutus ja Suomen suolatiet huomioiden. Tattarisuo, Helsinki.",
    },
    name: "Jarrut ja regenerointi",
    h1: "Teslan jarrut ja regeneratiivinen jarrutus",
    lead: "Regeneratiivinen jarrutus hoitaa suurimman osan hidastuksista, joten kitkajarrut kuluvat vähän mutta ruostuvat ja jumittuvat. Suomen suolatiellä jarrut tarvitsevat huoltoa useammin kuin palojen paksuudesta voisi päätellä.",
    symptoms: [
      {
        title: "Jarrutus tuntuu epätasaiselta",
        body: "Poljin tärisee tai auto vetää sivulle, usein ruosteisten levyjen tai jumittuneen satulan vuoksi.",
      },
      {
        title: "Kirskuna tai hankaus",
        body: "Ääni ajossa tai pysähtyessä voi kertoa kiinni jääneestä palasta tai ruostereunasta levyssä.",
      },
      {
        title: "Yksi pyörä kuumenee",
        body: "Selvästi muita lämpimämpi vanne ajon jälkeen viittaa satulaan tai palaan, joka ei vapaudu.",
      },
      {
        title: "Jarru- tai pysäköintijarruvaroitus",
        body: "Sähköisen pysäköintijarrun ilmoitukset ja jarrunesteen varoitukset tarkistetaan aina.",
      },
      {
        title: "Huomautus katsastuksessa",
        body: "Jarrutehojen epätasaisuus tai syöpyneet levyt ovat sähköautoilla tavallinen huomautus.",
      },
    ],
    checks: [
      {
        title: "Satuloiden liukutapit ja männät",
        body: "Puhdistamme ja voitelemme liukupinnat ja varmistamme, että satulat liikkuvat vapaasti.",
      },
      {
        title: "Levyjen ja palojen kunto",
        body: "Mittaamme levyjen paksuuden ja palojen kulumisen sekä tarkistamme ruosteen ja urautumisen molemmilta puolilta.",
      },
      {
        title: "Jarruneste",
        body: "Mittaamme nesteen kosteuspitoisuuden. Kostea neste heikentää jarrutusta kovassa käytössä.",
      },
      {
        title: "Pysäköintijarru",
        body: "Tarkistamme sähköisen pysäköintijarrun toiminnan ja kulumisen.",
      },
    ],
    diagnosis: [
      {
        p: "Aloitamme koeajolla ja jatkamme nostimella, jossa jokainen pyörä irrotetaan. Näin näemme levyjen molemmat puolet ja satuloiden kunnon. Kerromme, mitkä osat voi puhdistaa ja mitkä on vaihdettava, ja näytämme vanhat osat ennen kuin uusia asennetaan.",
      },
      {
        p: "Teslan sähköinen pysäköintijarru vaatii palojen vaihdossa valmistajan ohjeen mukaisen menettelyn, ja ilmajousitetut autot nostetaan nostotilassa. Nämä ovat pieniä asioita, mutta niiden ohittaminen voi vaurioittaa autoa.",
      },
    ],
    whenToBook: [
      {
        p: "Teslan huolto-ohjelma suosittelee jarrusatuloiden puhdistusta ja voitelua vuosittain alueilla, joilla teitä suolataan talvella. Suomessa hyvä ajankohta on keväällä suolakauden jälkeen, esimerkiksi [rengasvaihdon](@svc-tyres) yhteydessä.",
      },
      {
        p: "Varaa aika heti, jos jarrutus muuttuu, auto vetää sivulle tai jarruvaroitus syttyy. Jos poljin tuntuu pehmeältä tai painuu pohjaan, älä aja.",
      },
    ],
    body: [
      { h2: "Miksi sähköauton jarrut ruostuvat" },
      {
        p: "Kun moottori hidastaa autoa ja lataa samalla akkua, kitkajarruja käytetään vain kovissa jarrutuksissa ja viimeisillä metreillä. Levyt eivät puhdistu käytössä, ja suola ja kosteus syövyttävät niitä. Satuloiden liukutapit kuivuvat ja jäävät jumiin. Tuloksena voi olla auto, jonka palat ovat lähes uudet mutta jarrut silti huonossa kunnossa.",
      },
      {
        p: "Voit auttaa jarruja itse. Jarruta silloin tällöin turvallisessa paikassa reippaasti, jotta levyt puhdistuvat. Pelkkä regeneratiivinen jarrutus ei pidä niitä kunnossa, varsinkaan talvella.",
      },
      { h3: "Mitä jarruhuolto sisältää" },
      {
        ul: [
          "Pyörien irrotus ja jarrujen tarkastus joka kulmasta",
          "Satuloiden liukutappien ja palojen kiinnikkeiden puhdistus ja voitelu",
          "Levyjen ja palojen mittaus ja tulosten kirjaus",
          "Jarrunesteen kosteusmittaus",
          "Koeajo työn jälkeen",
        ],
      },
      {
        p: "Jos osia on vaihdettava, saat siitä arvion ennen kuin jatkamme. Levyt ja palat vaihdetaan akselikohtaisesti, jotta jarrutus pysyy tasaisena.",
      },
      { note: "Lue lisää: [jarrujen huolto ja regeneratiivinen jarrutus](@post-brakes)." },
    ],
    faq: [
      {
        q: "Kuinka usein Teslan jarruneste vaihdetaan?",
        a: "Tarkistamme nesteen kosteuspitoisuuden ja vaihdamme sen tarvittaessa. Valmistajan huolto-ohjelmassa jarrunesteen kunto tarkistetaan säännöllisesti, ja kostea neste kannattaa vaihtaa ajomäärästä riippumatta.",
      },
      {
        q: "Kuluvatko Teslan jarrupalat koskaan?",
        a: "Hitaasti, koska regeneratiivinen jarrutus tekee suurimman osan työstä. Tavallisempi syy vaihtoon on ruoste tai jumittunut satula kuin kuluminen.",
      },
      {
        q: "Voinko ajaa, jos jarrut kirskuvat?",
        a: "Lyhyen matkan korjaamolle yleensä kyllä, jos jarrutus toimii muuten normaalisti. Jos auto vetää sivulle, poljin tuntuu pehmeältä tai jarruvaroitus palaa, älä aja vaan soita.",
      },
      {
        q: "Voiko jarruhuollon yhdistää rengasvaihtoon?",
        a: "Kyllä, ja se on järkevää, koska pyörät ovat jo irti. Mainitse siitä varausta tehdessäsi, niin varaamme työlle riittävästi aikaa.",
      },
      {
        q: "Miksi jarrulevyt ovat ruosteessa sateen jälkeen?",
        a: "Pintaruostetta syntyy levyyn jo yhden kostean yön aikana, ja se lähtee yleensä muutamalla jarrutuksella. Huolestuttavaa on vasta ruoste, joka ei lähde ja tekee levyn pinnasta epätasaisen.",
      },
    ],
    related: ["svc-tyres", "svc-suspension", "post-brakes", "model-y"],
  },

  "svc-suspension": {
    seo: {
      title: "Teslan alusta ja ilmajousituksen korjaus Helsingissä",
      description:
        "Teslan tukivarret, holkit, iskunvaimentimet ja ilmajousituksen vuodot. Model S ja X ilmajousitus, Model 3 ja Y etupään äänet. Tattarisuo, Helsinki.",
    },
    name: "Alusta ja ilmajousitus",
    h1: "Teslan alusta ja ilmajousitus",
    lead: "Painava auto, talvitiet ja kuopat kuluttavat alustaa. Model 3:ssa ja Model Y:ssä vika on tavallisesti tukivarren holkissa tai pallonivelessä, Model S:ssä ja Model X:ssä usein ilmajousituksessa. Paikannamme äänen ennen kuin vaihdamme mitään.",
    symptoms: [
      {
        title: "Kolahdus tai narina kuopissa",
        body: "Etupään ääni hidasteissa ja saumakohdissa on usein kuluneen tukivarren holkin tai pallonivelen merkki.",
      },
      {
        title: "Auto laskeutuu yön aikana",
        body: "Ilmajousitetun auton yksi kulma tai koko auto on aamulla matalammalla kuin illalla. Tavallisesti syy on ilmavuoto jousessa tai letkussa.",
      },
      {
        title: "Kompressori käy pitkään",
        body: "Ilmajousituksen kompressori käy usein tai pitkiä aikoja, mikä viittaa vuotoon.",
      },
      {
        title: "Jousituksen varoitus",
        body: "Auto ilmoittaa jousituksen viasta tai rajoittaa korkeuden säätöä.",
      },
      {
        title: "Renkaat kuluvat epätasaisesti",
        body: "Sisäreunasta kuluvat renkaat kertovat suuntauksesta tai kuluneista alustan osista.",
      },
    ],
    checks: [
      {
        title: "Tukivarret, holkit ja pallonivelet",
        body: "Tarkistamme välykset nostimella sekä kuormitettuna että kuormittamattomana.",
      },
      {
        title: "Iskunvaimentimet ja jouset",
        body: "Etsimme vuodot, vauriot ja äänen lähteen.",
      },
      {
        title: "Ilmajousituksen tiiviys",
        body: "Paikannamme vuodot jousista, letkuista ja venttiilikotelosta ja tarkistamme kompressorin toiminnan.",
      },
      {
        title: "Korkeusanturit",
        body: "Tarkistamme anturit ja tarvittaessa korkeuden kalibroinnin korjauksen jälkeen.",
      },
    ],
    diagnosis: [
      {
        p: "Alustan ääni on vaikea paikantaa ajaessa, joten teemme sen nostimella ja tarvittaessa koeajolla kahden hengen voimin. Ilmajousituksessa selvitämme, mihin kulmaan ilma häviää, ja etsimme vuodon. Kerromme, onko vika yhdessä osassa vai onko pari tai akseli järkevämpää korjata kerralla.",
      },
      {
        p: "Ilmajousitetut Teslat nostetaan aina nostotilassa (jack mode), jotta järjestelmä ei yritä säätää korkeutta auton ollessa nostimella. Näin vältetään jousien ja anturien vauriot.",
      },
    ],
    whenToBook: [
      {
        p: "Varaa aika, jos ääni voimistuu, auto laskeutuu tai jousituksen varoitus syttyy. Ilmavuoto kuormittaa kompressoria, ja pitkään jatkunut vuoto voi rikkoa sen, joten nopea korjaus on yleensä pienempi työ.",
      },
      {
        p: "Kerro varatessasi, mistä kulmasta ja missä tilanteessa ääni tuntuu tulevan. Alustakorjauksen jälkeen tarkistamme [pyöränsuuntauksen](@svc-tyres), jotta renkaat eivät kulu vinoon.",
      },
    ],
    body: [
      { h2: "Talvi ja ilmajousitus" },
      {
        p: "Pakkanen kovettaa kumiosia ja voi pahentaa pieniä vuotoja, joten moni ilmajousituksen vika tulee esiin ensimmäisillä kovilla pakkasilla. Jos auto on seissyt pitkään kylmässä, katso aamulla, että korkeus on ennallaan. Laskeutunut kulma on varhainen merkki vuodosta, ja silloin korjaus on vielä yksinkertainen.",
      },
      { h3: "Model 3 ja Model Y" },
      {
        p: "Näissä malleissa on teräsjouset. Tyypillinen kuluva osa on etuakselin tukivarsi tai sen holkki, joka aiheuttaa kolahdusta tai narinaa erityisesti kylmällä. Osat vaihdetaan yleensä pareittain, jotta auto käyttäytyy tasaisesti.",
      },
      { h3: "Korjauksen jälkeen" },
      {
        p: "Alustatyön jälkeen tarkistamme korkeuden, ilmajousitetuissa autoissa korkeusanturien kalibroinnin ja lopuksi pyöränsuuntauksen. Koeajolla varmistamme, että ääni on poissa. Jos löydämme työn aikana muuta korjattavaa, soitamme ennen kuin jatkamme.",
      },
      { note: "Lisää aiheesta: [ilmajousituksen viat](@post-air)." },
    ],
    faq: [
      {
        q: "Pitääkö koko ilmajousi vaihtaa, jos se vuotaa?",
        a: "Usein kyllä, koska palje ja iskunvaimennin vaihdetaan tavallisesti yhtenä yksikkönä. Joskus vuoto on letkussa tai liitoksessa, jolloin korjaus on pienempi. Selvitämme sen ennen arviota.",
      },
      {
        q: "Voiko laskeutunutta autoa ajaa?",
        a: "Lyhyt matka korjaamolle on yleensä mahdollinen, jos auto nousee ajokorkeuteen käynnistettäessä eikä varoitus kiellä ajamista. Jos auto ei nouse, älä aja vaan soita.",
      },
      {
        q: "Miksi Model 3:n etupää narisee?",
        a: "Yleisin syy on kulunut tukivarren holkki tai pallonivel. Paikannamme äänen ennen kuin vaihdamme osia.",
      },
      {
        q: "Voiko ilmajousituksen vaihtaa teräsjousiin?",
        a: "Muunnossarjoja on olemassa, mutta muutos vaikuttaa auton ominaisuuksiin ja voi vaatia muutoskatsastuksen. Suosittelemme yleensä alkuperäisen järjestelmän korjaamista.",
      },
      {
        q: "Mistä tiedän, onko autossani ilmajousitus?",
        a: "Model X:ssä on aina ilmajousitus, ja useimmissa Model S -autoissa myös. Model 3:ssa ja Model Y:ssä on teräsjouset. Jos ajokorkeutta voi säätää auton asetuksista, autossa on ilmajousitus.",
      },
    ],
    related: ["model-s", "model-x", "svc-tyres", "post-air"],
  },

  "svc-tyres": {
    seo: {
      title: "Teslan renkaat, kausivaihto ja pyöränsuuntaus Helsingissä",
      description:
        "Teslan rengasvaihto, nelipyöräsuuntaus, tasapainotus, rengaspaineanturit ja rengashotelli Tattarisuolla, Helsingissä. Myös viikonloppuisin.",
    },
    name: "Renkaat ja suuntaus",
    h1: "Teslan renkaat ja pyöränsuuntaus",
    lead: "Välitön vääntö ja raskas auto kuluttavat renkaita. Oikeat paineet, säännöllinen kierto ja tarkka suuntaus pitävät kulumisen tasaisena ja ajettavuuden ennallaan. Teemme myös kausivaihdot ja säilytämme renkaat.",
    symptoms: [
      {
        title: "Renkaat kuluvat sisäreunasta",
        body: "Tyypillinen suuntausvirheen tai kuluneiden alustan osien merkki.",
      },
      {
        title: "Auto vetää sivulle",
        body: "Syy voi olla suuntaus, rengaspaine tai jumittunut jarru.",
      },
      {
        title: "Tärinä maantienopeudessa",
        body: "Tasapainotus, vanteen vaurio tai rengas.",
      },
      {
        title: "Rengaspaineen varoitus",
        body: "Paineanturi, hidas vuoto tai anturin heikentynyt paristo.",
      },
      {
        title: "Kausivaihto edessä",
        body: "Talvirenkaat ovat Suomessa pakolliset joulukuusta helmikuun loppuun.",
      },
    ],
    checks: [
      {
        title: "Urasyvyys ja kulumiskuvio",
        body: "Kulumiskuvio kertoo suuntauksesta, paineista ja alustan kunnosta.",
      },
      {
        title: "Nelipyöräsuuntaus",
        body: "Mittaamme ja säädämme etu- ja takapään kulmat valmistajan arvoihin.",
      },
      {
        title: "Tasapainotus ja vanteet",
        body: "Tarkistamme vanteet vaurioiden varalta ja tasapainotamme renkaat.",
      },
      {
        title: "Rengaspaineanturit",
        body: "Tarkistamme anturit ja sen, että auto tunnistaa ne vaihdon jälkeen.",
      },
    ],
    diagnosis: [
      {
        p: "Rengasongelman syy on usein muualla kuin renkaassa. Siksi katsomme kulumiskuvion, alustan ja jarrut yhdessä. Jos suuntaus on pielessä kuluneen alustan osan takia, kerromme sen, koska pelkkä suuntaus ei silloin auta pitkään.",
      },
      {
        p: "Ilmajousitetut autot nostetaan nostotilassa, ja pyöränpultit kiristetään valmistajan momenttiin. Kerromme renkaiden kunnon ja jäljellä olevan urasyvyyden rehellisesti, myös silloin kun sarjassa on enää yksi kausi jäljellä.",
      },
    ],
    whenToBook: [
      {
        p: "Renkaat kannattaa kiertää säännöllisin välein valmistajan suosituksen mukaan. Suomessa luonteva hetki on kausivaihto keväällä ja syksyllä. Suuntaus kannattaa tarkistaa alustakorjausten jälkeen, kuoppakauden jälkeen ja aina kun renkaat kuluvat epätasaisesti. Kerro varatessasi auton malli ja vanteiden koko, niin työ on valmiina, kun tulet.",
      },
      {
        p: "Talvirenkaat ovat pakolliset joulukuusta helmikuun loppuun, ja niiden urasyvyyden on oltava vähintään 3 millimetriä. Nastarenkaita saa käyttää marraskuun alusta pääsiäisen jälkeiseen maanantaihin, ja keli niin vaatiessa myös muulloin. Kiireiselle sopii [viikonloppuhuolto](@weekend).",
      },
    ],
    body: [
      { h2: "Renkaan valinta sähköautoon" },
      {
        p: "Sähköauto on hiljainen, joten rengasmelu kuuluu selvemmin, ja rengas vaikuttaa toimintamatkaan. Monet valmistajat tekevät sähköautoille tarkoitettuja renkaita, joissa on matala vierintävastus ja riittävä kantavuus raskaalle autolle. Kantavuus- ja nopeusindeksin on vastattava auton vaatimuksia.",
      },
      { p: "Kerromme vaihtoehdot ja niiden erot, mutta rengasmerkin valinta on sinun." },
      { h3: "Nasta vai kitka" },
      {
        p: "Nastarengas pitää paremmin peilijäällä, kitkarengas on hiljaisempi ja kuluttaa tienpintaa vähemmän. Pääkaupunkiseudulla, jossa tiet aurataan ja suolataan, moni valitsee kitkarenkaat, mutta valinta riippuu omista ajoreiteistä ja siitä, ajatko usein maaseudulla tai mökkiteillä. Raskaassa sähköautossa renkaan kantavuus ja rakenne ovat yhtä tärkeitä kuin pito.",
      },
      { h3: "Rengashotelli" },
      {
        p: "Säilytämme kauden ulkopuoliset renkaat sisätiloissa ja tarkistamme ne ennen seuraavaa asennusta, jotta tiedät hyvissä ajoin, jos uusi sarja on tarpeen.",
      },
    ],
    faq: [
      {
        q: "Kuinka usein Teslan renkaat pitää kiertää?",
        a: "Säännöllisesti, jotta etu- ja takarenkaat kuluvat tasaisesti. Suomessa kierto on helppo tehdä kausivaihdon yhteydessä. Valmistajan suositus löytyy auton käyttöohjeesta.",
      },
      {
        q: "Tarvitseeko Tesla suuntauksen renkaanvaihdon jälkeen?",
        a: "Ei aina. Suuntaus tarkistetaan, jos renkaat kuluvat epätasaisesti, auto vetää sivulle tai alustaan on tehty töitä.",
      },
      {
        q: "Toimivatko rengaspaineanturit vaihdon jälkeen?",
        a: "Yleensä, kun anturit ovat ehjät ja auto tunnistaa ne. Tarkistamme tunnistuksen vaihdon yhteydessä.",
      },
      {
        q: "Mikä rengaspaine Teslaan kuuluu?",
        a: "Oikea paine on merkitty kuljettajan oven pilariin ja käyttöohjeeseen. Tarkista paineet kylmistä renkaista ja pakkasella tavallista useammin, koska paine laskee lämpötilan mukana.",
      },
      {
        q: "Voiko Teslaan asentaa minkä tahansa renkaan?",
        a: "Renkaan koon sekä kantavuus- ja nopeusindeksin on vastattava auton vaatimuksia. Niiden lisäksi kannattaa katsoa vierintävastusta ja melutasoa. Autokohtaiset tiedot löytyvät rekisteriotteesta ja käyttöohjeesta.",
      },
      {
        q: "Tarvitseeko sähköauto erikoisrenkaat?",
        a: "Ei välttämättä. Tärkeintä on oikea koko, riittävä kantavuus ja nopeusindeksi. Sähköautoille merkityt renkaat on suunniteltu hiljaisiksi ja pienen vierintävastuksen renkaiksi, mikä voi pidentää toimintamatkaa.",
      },
    ],
    related: ["svc-suspension", "svc-brakes", "weekend", "post-winter"],
  },

  "svc-electrical": {
    seo: {
      title: "Teslan 12 V:n akku ja sähköviat Helsingissä",
      description:
        "Teslan 12 V:n akun testaus ja vaihto sekä sähkövikojen vianhaku: varoitukset, näyttö, kamerat, anturit, ovet ja kosteusviat. Tattarisuo, Helsinki.",
    },
    name: "Sähköviat ja 12 V:n akku",
    h1: "Teslan sähköviat ja 12 V:n akku",
    lead: "Teslassa moni vika näkyy ensin näytöllä: varoitus, toimimaton toiminto tai uudelleen käynnistyvä näyttö. Moni niistä alkaa pienestä 12 V:n akusta, jonka testaamme ja vaihdamme. Erotamme ohjelmistovirheen sähkövikasta ja kerromme, mikä korjataan korjaamossa ja mikä vaatii valmistajan toimenpiteen.",
    symptoms: [
      {
        title: "Auto ei herää",
        body: "Puhelinavain ei toimi, kosketusnäyttö pysyy pimeänä tai kahvat eivät reagoi. Tavallisin syy on heikko 12 V:n akku.",
      },
      {
        title: "Varoitus 12 V:n akusta",
        body: "Auto ilmoittaa, että pienjänniteakku tarvitsee huoltoa. Ota varoitus vakavasti: akku voi pettää ilman toista varoitusta.",
      },
      {
        title: "Toistuvat varoitukset",
        body: "Sama varoitus palaa ilman näkyvää syytä, usein tietyssä säässä tai tilanteessa.",
      },
      {
        title: "Kamera tai anturi ei toimi",
        body: "Peruutuskamera, pysäköintianturit tai kuljettajaa avustavien järjestelmien kamera ilmoittaa viasta.",
      },
      {
        title: "Ovet, ikkunat tai kahvat oireilevat",
        body: "Kahva ei avaudu, ikkuna ei laske tai ovi ei tunnista avainta.",
      },
    ],
    checks: [
      {
        title: "12 V:n akun kunto ja tyyppi",
        body: "Mittaamme jännitteen ja kunnon ja tarkistamme, onko autossa lyijy- vai litiumioniakku. Tyyppi vaikuttaa siihen, miten akku testataan ja vaihdetaan.",
      },
      {
        title: "Vikakoodit",
        body: "Luemme ohjausyksiköiden vikakoodit ja katsomme, milloin vika on tallentunut.",
      },
      {
        title: "Johtosarjat ja liittimet",
        body: "Etsimme hapettuneet liittimet, kosteuden ja hankautuneet johdot erityisesti ovista ja takaluukusta.",
      },
      {
        title: "Anturit ja kamerat",
        body: "Tarkistamme kiinnityksen, puhtauden ja toiminnan.",
      },
    ],
    diagnosis: [
      {
        p: "Ensimmäinen kysymys on, onko vika ohjelmistossa vai laitteistossa. Auton uudelleenkäynnistys tai ohjelmistopäivitys poistaa usein ohimenevän vian. Jos vika palaa, mittaamme ensin 12 V:n akun ja etsimme sitten syyn vikakoodeista ja mittaamalla piiri kerrallaan.",
      },
      {
        p: "Ohjelmistopäivitykset tulevat Teslalta langattomasti. Emme muokkaa auton ohjelmistoa emmekä avaa maksullisia ominaisuuksia. Jos vika vaatii valmistajan toimenpidettä, kerromme sen suoraan.",
      },
    ],
    whenToBook: [
      {
        p: "Varaa aika heti, jos auto varoittaa 12 V:n akusta. Akku pitää lukot, näytön ja ohjausyksiköt toiminnassa, joten kun se pettää, auto voi jäädä pihaan. Vaihto on yleensä nopea työ, kun syy on varmistettu.",
      },
      {
        p: "Varaa aika myös, jos vika toistuu useamman uudelleenkäynnistyksen jälkeen tai jos turvallisuuteen liittyvä toiminto kuten kamera, valot tai lasinpyyhkimet ei toimi. Ota kuva varoituksesta ja kirjaa, milloin vika ilmenee; kuvan voi lähettää etukäteen WhatsAppilla.",
      },
    ],
    body: [
      { h2: "12 V:n akku" },
      {
        p: "Suuren ajoakun lisäksi jokaisessa Teslassa on pieni 12 V:n akku. Vanhemmissa autoissa se on lyijyakku, uudemmissa litiumioniakku, joka kestää yleensä pidempään. Vaihdamme akun valmistajan järjestyksessä, jotta auton järjestelmät eivät jää vikatilaan. Varmistamme ensin, että vika on akussa eikä sen latauspiirissä, ja tarkistamme lopuksi, ettei vikakoodeja jää.",
      },
      { h3: "Kosteus ja liittimet" },
      {
        p: "Suomen syksy ja talvi tuovat autoon kosteutta, joka voi hapettaa liittimiä takaluukussa, ovien johtosarjoissa ja valoissa. Ajoittainen vika, joka tulee esiin sateella tai pakkasella ja katoaa kuivalla säällä, viittaa usein kosteuteen, ja se löytyy järjestelmällisesti, ei arvaamalla.",
      },
      { h3: "Kun syy on ohjelmistossa" },
      {
        p: "Osa vioista korjaantuu valmistajan ohjelmistopäivityksellä. Tarkistamme auton ohjelmistoversion ja kerromme, jos vika näyttää liittyvän ohjelmistoon eikä osaan, jotta et maksa turhaan vaihdetusta osasta.",
      },
      { note: "Lue lisää: [12 V:n akun varoitusmerkit](@post-12v) ja [mitä vianhaku sisältää](@post-diagnosis)." },
    ],
    faq: [
      {
        q: "Kuinka usein Teslan 12 V:n akku vaihdetaan?",
        a: "Kiinteää väliä ei ole. Akku vaihdetaan, kun auto varoittaa siitä tai testi osoittaa sen heikentyneen. Uudempi litiumioniakku kestää yleensä lyijyakkua pidempään.",
      },
      {
        q: "Aiheuttaako 12 V:n akku sähkövikoja?",
        a: "Usein. Heikko 12 V:n akku voi aiheuttaa satunnaisia varoituksia ja toimintahäiriöitä, joten mittaamme sen ensimmäisenä.",
      },
      {
        q: "Voiko korjaamo päivittää Teslan ohjelmiston?",
        a: "Emme muokkaa auton ohjelmistoa. Päivitykset tulevat Teslalta langattomasti. Tarkistamme, mikä versio autossa on, ja neuvomme, jos päivitys jää jumiin.",
      },
      {
        q: "Miksi ovenkahva ei toimi pakkasella?",
        a: "Jää voi estää kahvan liikkeen. Esilämmitys sovelluksesta sulattaa sen yleensä. Jos kahva ei toimi sulana ja kuivana, syy voi olla kahvan moottorissa, kytkimessä tai johdotuksessa.",
      },
      {
        q: "Korjaatteko ajoakkua tai suurjännitejärjestelmää?",
        a: "Emme. Teemme töitä 12 V:n järjestelmään ja auton pienjännitesähköihin. Jos vika on suurjännitejärjestelmässä, kerromme sen ja ohjaamme sinut Teslan huoltoon.",
      },
    ],
    related: ["post-12v", "svc-climate", "battery-report", "post-diagnosis"],
  },

  "svc-climate": {
    seo: {
      title: "Teslan ilmastointi ja lämpöpumppu, huolto Helsingissä",
      description:
        "Teslan ilmastointi ja lämpöpumppu: ilmastointi ei viilennä, heikko lämpö, huurtuvat ikkunat ja raitisilmasuodattimet. Teslalle tarkoitetut ilmastoinnin huoltolaitteet. Tattarisuo, Helsinki.",
    },
    name: "Ilmastointi ja lämpöpumppu",
    h1: "Teslan ilmastointi ja lämpöpumppu",
    lead: "Teslassa ilmastointi ja lämpöpumppu ovat yksi järjestelmä: se viilentää matkustamon kesällä, lämmittää sen talvella ja pitää ikkunat kirkkaina. Kun ilmastointi ei viilennä, lämpö ei riitä tai ikkunat huurtuvat, selvitämme syyn anturista, venttiilistä, pumpusta, puhaltimesta tai ohjauksesta Tesla-autoille tarkoitetuilla ilmastoinnin huoltolaitteilla.",
    symptoms: [
      {
        title: "Ilmastointi ei viilennä",
        body: "Puhaltimista tuleva ilma pysyy lämpimänä tai viilenee vain vähän. Syy voi olla anturissa, ohjauksessa tai kylmäainepiirissä.",
      },
      {
        title: "Heikko lämpö pakkasella",
        body: "Matkustamo lämpenee hitaasti tai jää viileäksi, vaikka asetukset ovat kohdallaan.",
      },
      {
        title: "Ikkunat huurtuvat",
        body: "Usein syy on tukkeutunut raitisilmasuodatin, kiertoilma-asetus tai kosteus matkustamossa.",
      },
      {
        title: "Haju tai kosteus",
        body: "Ummehtunut haju puhaltimesta kertoo yleensä suodattimesta tai höyrystimen kosteudesta.",
      },
      {
        title: "Talven toimintamatka putoaa äkillisesti",
        body: "Tavallista talven laskua suurempi muutos samoissa olosuhteissa voi viitata lämpöpumpun vikaan.",
      },
    ],
    checks: [
      {
        title: "Ilmastoinnin teho",
        body: "Tarkistamme puhallusilman lämpötilat ja järjestelmän toiminnan Teslalle tarkoitetuilla huoltolaitteilla.",
      },
      {
        title: "Vikakoodit ja lämpötila-anturit",
        body: "Luemme lämmönhallinnan vikakoodit ja tarkistamme anturien lukemat.",
      },
      {
        title: "Puhaltimet ja ilmaläpät",
        body: "Tarkistamme, että ilma kulkee oikeaan paikkaan oikealla teholla.",
      },
      {
        title: "Raitisilmasuodattimet",
        body: "Vaihdetaan valmistajan aikataulun mukaan, tai aiemmin jos ilmavirta on heikentynyt.",
      },
    ],
    diagnosis: [
      {
        p: "Teslan lämmönhallinta yhdistää ilmastoinnin, lämpöpumpun ja lämmityksen yhdeksi järjestelmäksi. Vian syy voi olla anturissa, venttiilissä, pumpussa, ohjelmistossa tai kylmäainepiirissä. Luemme vikakoodit, tarkistamme anturit, ilmavirran ja viilennystehon ja rajaamme vian ennen arviota.",
      },
      {
        p: "Saat yhteenvedon löydöksistä ja arvion, ja työ alkaa vasta, kun olet hyväksynyt sen.",
      },
    ],
    whenToBook: [
      {
        p: "Varaa aika keväällä, jos ilmastointi tuntui heikolta viime kesänä, ja ennen kovia pakkasia, jos lämmitys tuntuu heikolta jo syksyllä. Raitisilmasuodattimet kannattaa vaihtaa ennen talvea, koska tukkeutunut suodatin heikentää sekä lämmitystä että huurteenpoistoa.",
      },
      {
        p: "Jos ikkunat eivät pysy kirkkaina, korjaa vika heti. Huono näkyvyys on turvallisuusasia, ei mukavuuskysymys. Varaa aika myös, jos lämmitys tai viilennys toimii vain osittain, esimerkiksi toinen puoli matkustamosta jää lämpimäksi tai viileäksi.",
      },
    ],
    body: [
      { h2: "Ilmastoinnin huolto" },
      {
        p: "Ilmastoinnin huoltolaitteemme on tarkoitettu Tesla-autoille. Ilmastoinnista häviää vuosien mittaan hieman kylmäainetta, ja heikentynyt viilennys on usein ensimmäinen merkki. Puhdas raitisilmasuodatin ja vapaa ilmanottoaukko vaikuttavat myös selvästi siihen, miten hyvin järjestelmä viilentää ja poistaa huurretta.",
      },
      { h3: "Lämpöpumppu ja talvi" },
      {
        p: "Model Y:ssä sekä uudemmissa Model 3-, Model S- ja Model X -autoissa on lämpöpumppu, joka siirtää lämpöä ympäristöstä matkustamoon. Vanhemmissa autoissa matkustamoa lämmittää vastuslämmitin, joka kuluttaa enemmän energiaa. Lämpöpumpun hyötysuhde laskee kovalla pakkasella, joten talven toimintamatkan lasku on normaalia, mutta äkillinen muutos samoissa olosuhteissa kannattaa tarkistaa.",
      },
      { h3: "Mitä voit tehdä itse" },
      {
        ul: [
          "Esilämmitä auto latauksessa ollessa ennen lähtöä.",
          "Pidä tuulilasin alla oleva ilmanottoaukko puhtaana lumesta ja lehdistä.",
          "Käytä raitisilmaa kiertoilman sijaan, kun ikkunat huurtuvat.",
          "Kuivaa märät matot, jotta kosteus ei jää autoon.",
          "Vaihda raitisilmasuodatin ennen talvea.",
        ],
      },
      { note: "Talven käytännön vinkit: [Tesla talvella Suomessa](@post-winter)." },
    ],
    faq: [
      {
        q: "Miksi Teslan ilmastointi ei viilennä kunnolla?",
        a: "Tavallisia syitä ovat tukkeutunut raitisilmasuodatin, anturivika tai vähentynyt kylmäaine. Tarkistamme ensin suodattimen, anturit ja viilennystehon ja kerromme, mitä löytyi.",
      },
      {
        q: "Kuinka usein raitisilmasuodatin vaihdetaan?",
        a: "Valmistajan aikataulun mukaan, ja aina kun ilmavirta heikkenee tai sisällä haisee. Ennen talvea tehty vaihto parantaa huurteenpoistoa.",
      },
      {
        q: "Miksi Tesla kuluttaa talvella enemmän?",
        a: "Matkustamon lämmitys vie energiaa, ja lämpöpumpun hyötysuhde laskee kovalla pakkasella. Esilämmitys latauksessa ollessa vähentää kulutusta ajon aikana.",
      },
      {
        q: "Miksi auton alle tippuu vettä?",
        a: "Ilmastoinnin höyrystimestä tippuu kondenssivettä, mikä on normaalia. Jos nestettä on lammikoksi asti, se on värillistä tai se haisee, varaa tarkastus.",
      },
      {
        q: "Miksi puhaltimesta kuuluu ääntä?",
        a: "Puhaltimeen voi päätyä lehtiä tai roskia ilmanottoaukosta, tai puhaltimen laakeri voi kulua. Usein korjaukseksi riittää puhdistus, ja vasta sitten harkitaan osan vaihtoa.",
      },
    ],
    related: ["svc-electrical", "post-winter", "model-y", "svc-tyres"],
  },
};

const EN: Record<ServiceId, ServiceContent> = {
  "svc-brakes": {
    seo: {
      title: "Tesla brakes and caliper service in Helsinki",
      description:
        "Tesla brake caliper cleaning and lubrication, discs, pads and brake fluid, with regenerative braking and Finnish salted roads in mind. Tattarisuo, Helsinki.",
    },
    name: "Brakes and regen",
    h1: "Tesla brakes and regenerative braking",
    lead: "Regenerative braking does most of the slowing down, so the friction brakes wear very little but corrode and seize instead. On salted Finnish roads they need attention more often than pad thickness would suggest.",
    symptoms: [
      {
        title: "Uneven braking",
        body: "The pedal pulses or the car pulls to one side, often because of corroded discs or a sticking caliper.",
      },
      {
        title: "Squeal or scraping",
        body: "A noise when driving or stopping can mean a stuck pad or a rust lip on the disc.",
      },
      {
        title: "One wheel runs hot",
        body: "A wheel clearly warmer than the others after a drive points to a caliper or pad that is not releasing.",
      },
      {
        title: "Brake or parking brake warning",
        body: "Electric parking brake messages and brake fluid warnings are always checked.",
      },
      {
        title: "An inspection remark",
        body: "Uneven braking force or corroded discs are a common remark on electric cars at the annual inspection.",
      },
    ],
    checks: [
      {
        title: "Caliper slide pins and pistons",
        body: "We clean and lubricate the sliding surfaces and make sure the calipers move freely.",
      },
      {
        title: "Disc and pad condition",
        body: "We measure disc thickness and pad wear and check both faces for corrosion and scoring.",
      },
      {
        title: "Brake fluid",
        body: "We measure moisture content. Wet fluid weakens braking under hard use.",
      },
      {
        title: "Parking brake",
        body: "We check the electric parking brake's operation and wear.",
      },
    ],
    diagnosis: [
      {
        p: "We start with a road test and continue on the lift with every wheel off. That way we see both faces of each disc and the condition of each caliper. We tell you which parts can be cleaned and which need replacing, and we show you the old parts before new ones go on.",
      },
      {
        p: "A Tesla's electric parking brake needs the manufacturer's procedure when pads are replaced, and cars with air suspension are lifted in jack mode. These are small things, but skipping them can damage the car.",
      },
    ],
    whenToBook: [
      {
        p: "Tesla's maintenance schedule recommends cleaning and lubricating the brake calipers every year in regions where roads are salted in winter. In Finland a good time is spring, after salt season, for example together with your [seasonal tyre change](@svc-tyres).",
      },
      {
        p: "Book straight away if braking changes, the car pulls to one side or a brake warning comes on. If the pedal feels soft or sinks, do not drive.",
      },
    ],
    body: [
      { h2: "Why EV brakes corrode" },
      {
        p: "When the motor slows the car and charges the battery, the friction brakes are used only in hard stops and the last few metres. The discs are never cleaned by use, and salt and moisture eat into them. Caliper slide pins dry out and stick. The result can be a car whose pads are almost new and whose brakes are still in poor shape.",
      },
      {
        p: "You can help them yourself. Now and then, somewhere safe, brake firmly so the discs get cleaned. Regenerative braking alone will not keep them in condition, least of all in winter.",
      },
      { h3: "What a brake service includes" },
      {
        ul: [
          "Wheels off and every corner inspected",
          "Caliper slide pins and pad carriers cleaned and lubricated",
          "Discs and pads measured and the results recorded",
          "Brake fluid moisture test",
          "Road test after the work",
        ],
      },
      {
        p: "If parts need replacing, you get an estimate before we continue. Discs and pads are replaced per axle so braking stays even.",
      },
      { note: "Read more: [brake care with regenerative braking](@post-brakes)." },
    ],
    faq: [
      {
        q: "How often should Tesla brake fluid be changed?",
        a: "We test the fluid's moisture content and replace it when needed. The manufacturer's schedule includes regular brake fluid checks, and fluid that has absorbed moisture should be replaced however few kilometres the car has done.",
      },
      {
        q: "Do Tesla brake pads ever wear out?",
        a: "Slowly, because regenerative braking does most of the work. Corrosion or a seized caliper is a more common reason for replacement than wear.",
      },
      {
        q: "Can I drive if the brakes squeal?",
        a: "Usually a short drive to the garage is fine if braking otherwise feels normal. If the car pulls to one side, the pedal feels soft or a brake warning is on, do not drive; call us.",
      },
      {
        q: "Can I combine a brake service with a tyre change?",
        a: "Yes, and it makes sense, because the wheels are already off. Mention it when you book so we set aside enough time.",
      },
      {
        q: "Why are the discs rusty after rain?",
        a: "Surface rust forms on a disc after a single damp night and usually comes off after a few stops. It is only a concern when the rust does not clear and leaves the disc surface uneven.",
      },
    ],
    related: ["svc-tyres", "svc-suspension", "post-brakes", "model-y"],
  },

  "svc-suspension": {
    seo: {
      title: "Tesla suspension and air suspension repair in Helsinki",
      description:
        "Tesla control arms, bushings, dampers and air suspension leaks. Model S and X air suspension, Model 3 and Y front end noises. Tattarisuo, Helsinki.",
    },
    name: "Suspension and air suspension",
    h1: "Tesla suspension and air suspension",
    lead: "A heavy car, winter roads and potholes wear suspension. On Model 3 and Model Y the fault is usually a control arm bushing or ball joint; on Model S and Model X it is often the air suspension. We locate the noise before we replace anything.",
    symptoms: [
      {
        title: "Knock or creak over bumps",
        body: "A front end noise over speed bumps and expansion joints is often a worn control arm bushing or ball joint.",
      },
      {
        title: "The car sits down overnight",
        body: "One corner, or the whole car, is lower in the morning than it was the night before. Usually an air leak in a spring or a line.",
      },
      {
        title: "The compressor runs a lot",
        body: "The air suspension compressor runs often or for long periods, which points to a leak.",
      },
      {
        title: "Suspension warning",
        body: "The car reports a suspension fault or restricts ride height adjustment.",
      },
      {
        title: "Uneven tyre wear",
        body: "Tyres wearing on the inner edge point to alignment or worn suspension parts.",
      },
    ],
    checks: [
      {
        title: "Control arms, bushings and ball joints",
        body: "We check for play on the lift, both loaded and unloaded.",
      },
      {
        title: "Dampers and springs",
        body: "We look for leaks, damage and the source of the noise.",
      },
      {
        title: "Air suspension integrity",
        body: "We locate leaks in the springs, lines and valve block and check the compressor.",
      },
      {
        title: "Height sensors",
        body: "We check the sensors and, where needed, the ride height calibration after a repair.",
      },
    ],
    diagnosis: [
      {
        p: "Suspension noises are hard to pin down from the driver's seat, so we do it on the lift and, where needed, on a road test with two of us listening. With air suspension we find out which corner is losing air and then find the leak. We tell you whether the fault is in one part or whether a pair or an axle makes more sense to do at once.",
      },
      {
        p: "Teslas with air suspension are always lifted in jack mode, so the system does not try to adjust ride height while the car is on the lift. That prevents damage to the springs and sensors.",
      },
    ],
    whenToBook: [
      {
        p: "Book if a noise is getting louder, the car sits down or a suspension warning comes on. A leak makes the compressor work harder, and a leak left for a long time can wear the compressor out, so an early repair is usually the smaller job.",
      },
      {
        p: "When you book, tell us which corner the noise seems to come from and when. After suspension work we check the [wheel alignment](@svc-tyres) so the tyres do not wear unevenly.",
      },
    ],
    body: [
      { h2: "Winter and air suspension" },
      {
        p: "Frost hardens rubber parts and can make small leaks worse, so many air suspension faults show up with the first hard freeze. If the car has stood in the cold for a long time, check in the morning that the ride height has not changed. A corner that has dropped is an early sign of a leak, and at that stage the repair is still simple.",
      },
      { h3: "Model 3 and Model Y" },
      {
        p: "These models use steel springs. The typical wear part is a front control arm or its bushing, which causes knocking or creaking, especially in the cold. The parts are usually replaced in pairs so the car behaves evenly.",
      },
      { h3: "After the repair" },
      {
        p: "After suspension work we check ride height, the height sensor calibration on air suspension cars, and finally the wheel alignment. A road test confirms the noise has gone. If we find anything else that needs fixing during the job, we call you before we continue.",
      },
      { note: "More on this: [air suspension faults](@post-air)." },
    ],
    faq: [
      {
        q: "Does a leaking air spring have to be replaced completely?",
        a: "Often yes, because the air bag and damper are usually replaced as one unit. Sometimes the leak is in a line or a fitting, and the repair is smaller. We find out before we give you an estimate.",
      },
      {
        q: "Can I drive a car that has sat down?",
        a: "A short drive to the garage is usually possible if the car rises to ride height when started and the warning does not tell you to stop. If it does not rise, do not drive; call us.",
      },
      {
        q: "Why does my Model 3's front end creak?",
        a: "The most common cause is a worn control arm bushing or ball joint. We locate the noise before replacing parts.",
      },
      {
        q: "Can air suspension be converted to steel springs?",
        a: "Conversion kits exist, but the change affects how the car behaves and can require a modification inspection. We usually recommend repairing the original system.",
      },
      {
        q: "How do I know whether my car has air suspension?",
        a: "Every Model X has air suspension, and so do most Model S cars. Model 3 and Model Y use steel springs. If you can adjust ride height in the car's settings, it has air suspension.",
      },
    ],
    related: ["model-s", "model-x", "svc-tyres", "post-air"],
  },

  "svc-tyres": {
    seo: {
      title: "Tesla tyres, seasonal changes and wheel alignment in Helsinki",
      description:
        "Tesla tyre changes, four-wheel alignment, balancing, TPMS sensors and tyre storage in Tattarisuo, Helsinki. Weekend appointments too.",
    },
    name: "Tyres and alignment",
    h1: "Tesla tyres and wheel alignment",
    lead: "Instant torque and a heavy car are hard on tyres. Correct pressures, regular rotation and accurate alignment keep wear even and the handling as it should be. We also do seasonal changes and store your off-season set.",
    symptoms: [
      {
        title: "Tyres wear on the inner edge",
        body: "A typical sign of an alignment fault or worn suspension parts.",
      },
      {
        title: "The car pulls to one side",
        body: "Alignment, tyre pressure or a sticking brake.",
      },
      {
        title: "Vibration at motorway speed",
        body: "Balancing, a damaged wheel or the tyre itself.",
      },
      {
        title: "Tyre pressure warning",
        body: "A pressure sensor, a slow puncture or a sensor battery running low.",
      },
      {
        title: "A seasonal change is due",
        body: "Winter tyres are compulsory in Finland from December to the end of February.",
      },
    ],
    checks: [
      {
        title: "Tread depth and wear pattern",
        body: "The wear pattern tells us about alignment, pressures and suspension condition.",
      },
      {
        title: "Four-wheel alignment",
        body: "We measure and set front and rear angles to the manufacturer's values.",
      },
      {
        title: "Balancing and wheels",
        body: "We check the wheels for damage and balance the tyres.",
      },
      {
        title: "Tyre pressure sensors",
        body: "We check the sensors and that the car recognises them after a change.",
      },
    ],
    diagnosis: [
      {
        p: "The cause of a tyre problem is often somewhere other than the tyre. So we look at the wear pattern, the suspension and the brakes together. If the alignment is out because a suspension part is worn, we tell you, because an alignment alone will not last in that case.",
      },
      {
        p: "Cars with air suspension are lifted in jack mode, and wheel bolts are torqued to the manufacturer's value. We tell you honestly how much tread is left, including when a set has one season left, not three.",
      },
    ],
    whenToBook: [
      {
        p: "Rotate the tyres at regular intervals following the manufacturer's recommendation. In Finland the natural moment is the seasonal change in spring and autumn. Check the alignment after suspension work, after pothole season and whenever tyres wear unevenly. Tell us the model and wheel size when you book and the job will be ready when you arrive.",
      },
      {
        p: "Winter tyres are compulsory from December to the end of February and need at least 3 millimetres of tread. Studded tyres are allowed from the start of November until the Monday after Easter, and at other times when conditions require. If your week is full, try [weekend service](@weekend).",
      },
    ],
    body: [
      { h2: "Choosing tyres for an EV" },
      {
        p: "An electric car is quiet, so tyre noise is more noticeable, and the tyre affects range. Many manufacturers make tyres intended for electric cars, with low rolling resistance and enough load capacity for a heavy vehicle. The load and speed index must meet the car's requirements.",
      },
      { p: "We explain the options and the differences between them, but the choice of brand is yours." },
      { h3: "Studded or non-studded" },
      {
        p: "A studded tyre grips better on glare ice; a non-studded friction tyre is quieter and wears the road surface less. In the capital region, where roads are ploughed and salted, many drivers choose friction tyres, but the right choice depends on your own routes and whether you often drive on rural or cottage roads. On a heavy EV, load capacity and construction matter as much as grip.",
      },
      { h3: "Tyre storage" },
      {
        p: "We store your off-season set indoors and check it before it goes back on, so you know in good time if a new set is needed.",
      },
    ],
    faq: [
      {
        q: "How often should Tesla tyres be rotated?",
        a: "Regularly, so the front and rear tyres wear evenly. In Finland it is easy to do with the seasonal change. The manufacturer's recommendation is in the owner's manual.",
      },
      {
        q: "Does a Tesla need an alignment after a tyre change?",
        a: "Not always. Alignment is checked if the tyres wear unevenly, the car pulls to one side or suspension work has been done.",
      },
      {
        q: "Will the tyre pressure sensors work after a change?",
        a: "Usually, as long as the sensors are intact and the car recognises them. We check recognition during the change.",
      },
      {
        q: "What tyre pressure should a Tesla run?",
        a: "The correct pressure is on the driver's door pillar and in the owner's manual. Check pressures with cold tyres, and more often in frost, because pressure drops with temperature.",
      },
      {
        q: "Can I fit any tyre to a Tesla?",
        a: "Size, load index and speed index must meet the car's requirements. Beyond that, look at rolling resistance and noise. The car's own figures are in the registration document and the owner's manual.",
      },
      {
        q: "Does an EV need special tyres?",
        a: "Not necessarily. What matters most is the right size, enough load capacity and the speed index. Tyres marked for EVs are designed to be quiet and to have low rolling resistance, which can extend range.",
      },
    ],
    related: ["svc-suspension", "svc-brakes", "weekend", "post-winter"],
  },

  "svc-electrical": {
    seo: {
      title: "Tesla 12 V battery and electrical faults in Helsinki",
      description:
        "Tesla 12 V battery testing and replacement, and electrical fault finding: warnings, screen, cameras, sensors, doors and moisture faults. Tattarisuo, Helsinki.",
    },
    name: "Electrical and 12 V battery",
    h1: "Tesla electrical faults and the 12 V battery",
    lead: "In a Tesla, most faults show up on the screen first: a warning, a feature that stops working, a display that reboots. Many of them start with the small 12 V battery, which we test and replace. We separate software glitches from electrical faults and tell you what can be fixed in the workshop and what needs action from the manufacturer.",
    symptoms: [
      {
        title: "The car will not wake",
        body: "The phone key does not work, the touchscreen stays dark or the handles do not respond. The usual cause is a weak 12 V battery.",
      },
      {
        title: "A 12 V battery warning",
        body: "The car says the low-voltage battery needs service. Take it seriously: the battery can fail without a second warning.",
      },
      {
        title: "Recurring warnings",
        body: "The same warning keeps coming back with no visible cause, often in particular weather or situations.",
      },
      {
        title: "A camera or sensor fails",
        body: "The reversing camera, parking sensors or a driver assistance camera reports a fault.",
      },
      {
        title: "Doors, windows or handles misbehave",
        body: "A handle will not present, a window will not drop or a door does not recognise the key.",
      },
    ],
    checks: [
      {
        title: "12 V battery condition and type",
        body: "We measure voltage and condition and check whether the car has a lead-acid or a lithium-ion battery. The type changes how it is tested and replaced.",
      },
      {
        title: "Fault codes",
        body: "We read the control units' fault codes and see when each fault was logged.",
      },
      {
        title: "Wiring and connectors",
        body: "We look for corroded connectors, moisture and chafed wires, especially in the doors and tailgate.",
      },
      {
        title: "Sensors and cameras",
        body: "We check mounting, cleanliness and operation.",
      },
    ],
    diagnosis: [
      {
        p: "The first question is whether the fault is in software or hardware. Restarting the car or a software update often clears a passing glitch. If the fault comes back, we measure the 12 V battery first, then find the cause from the fault codes and by measuring, one circuit at a time.",
      },
      {
        p: "Software updates come from Tesla over the air. We do not modify the car's software or unlock paid features. If a fault needs action from the manufacturer, we tell you plainly.",
      },
    ],
    whenToBook: [
      {
        p: "Book straight away if the car warns about the 12 V battery. It keeps the locks, the screen and the control units working, so when it fails the car can be left sitting on your drive. Replacement is usually a quick job once the cause is confirmed.",
      },
      {
        p: "Book as well if a fault keeps coming back after several restarts, or if a safety function such as a camera, lights or wipers is not working. Take a photo of the warning and note when it happens; you can send it ahead on WhatsApp.",
      },
    ],
    body: [
      { h2: "The 12 V battery" },
      {
        p: "Besides the large drive battery, every Tesla has a small 12 V battery. Older cars use lead-acid, newer ones lithium-ion, which usually lasts longer. We replace it in the manufacturer's sequence so the car's systems are not left in a fault state, first confirming that the fault is the battery and not its charging circuit, and afterwards checking that no fault codes remain.",
      },
      { h3: "Moisture and connectors" },
      {
        p: "Finnish autumns and winters bring moisture into the car, which can corrode connectors in the tailgate, the door wiring and the lights. An intermittent fault that appears in rain or frost and disappears in dry weather usually points to moisture, and it is found methodically, not by guessing.",
      },
      { h3: "When the cause is software" },
      {
        p: "Some faults are fixed by a manufacturer software update. We check which version the car has and tell you if a fault looks software related rather than a failed part, so you do not pay for a part that did not need replacing.",
      },
      { note: "Read more: [12 V battery warning signs](@post-12v) and [what a diagnosis involves](@post-diagnosis)." },
    ],
    faq: [
      {
        q: "How often does a Tesla 12 V battery need replacing?",
        a: "There is no fixed interval. It is replaced when the car warns about it or a test shows it has weakened. The newer lithium-ion type usually lasts longer than lead-acid.",
      },
      {
        q: "Can the 12 V battery cause electrical faults?",
        a: "Often. A weak 12 V battery can cause random warnings and glitches, so it is the first thing we measure.",
      },
      {
        q: "Can a garage update a Tesla's software?",
        a: "We do not modify the car's software. Updates come from Tesla over the air. We check which version the car has and help if an update gets stuck.",
      },
      {
        q: "Why does a door handle stop working in frost?",
        a: "Ice can block the handle. Preconditioning from the app usually thaws it. If the handle does not work when it is thawed and dry, the cause can be the handle motor, a switch or the wiring.",
      },
      {
        q: "Do you work on the high-voltage battery?",
        a: "No. We work on the 12 V system and the car's low-voltage electrics. If a fault is in the high-voltage system, we tell you and refer you to Tesla service.",
      },
    ],
    related: ["post-12v", "svc-climate", "battery-report", "post-diagnosis"],
  },

  "svc-climate": {
    seo: {
      title: "Tesla air conditioning and heat pump service in Helsinki",
      description:
        "Tesla air conditioning and heat pump: AC that does not cool, weak heating, fogged windows and cabin filters. AC service equipment made for Tesla. Tattarisuo, Helsinki.",
    },
    name: "Air conditioning and heat pump",
    h1: "Tesla air conditioning and heat pump",
    lead: "In a Tesla the air conditioning and the heat pump are one system: it cools the cabin in summer, heats it in winter and keeps the windows clear. When the AC stops cooling, the heating is weak or the windows fog up, we trace the cause to a sensor, valve, pump, blower or the control logic, with AC service equipment made for Tesla vehicles.",
    symptoms: [
      {
        title: "The air conditioning does not cool",
        body: "The air from the vents stays warm or only cools a little. The cause can be a sensor, the control logic or the refrigerant circuit.",
      },
      {
        title: "Weak heating in frost",
        body: "The cabin warms slowly or stays cool even though the settings are right.",
      },
      {
        title: "Windows fog up",
        body: "Often a clogged cabin filter, the recirculation setting or moisture in the cabin.",
      },
      {
        title: "Smell or damp",
        body: "A musty smell from the vents usually means the filter or moisture on the evaporator.",
      },
      {
        title: "A sudden drop in winter range",
        body: "A bigger change than the usual winter drop, in the same conditions, can point to a heat pump fault.",
      },
    ],
    checks: [
      {
        title: "AC performance",
        body: "We check outlet temperatures and how the system responds, with service equipment specified for Tesla.",
      },
      {
        title: "Fault codes and temperature sensors",
        body: "We read the thermal system's fault codes and check the sensor readings.",
      },
      {
        title: "Blowers and air flaps",
        body: "We check that air goes where it should, at the right flow.",
      },
      {
        title: "Cabin filters",
        body: "Replaced on the manufacturer's schedule, or sooner if the airflow has dropped.",
      },
    ],
    diagnosis: [
      {
        p: "Tesla's thermal system combines the air conditioning, the heat pump and the heating into one. The cause of a fault can be a sensor, a valve, a pump, software or the refrigerant circuit. We read the fault codes, check the sensors, the airflow and the cooling performance, and narrow the fault down before giving you an estimate.",
      },
      {
        p: "You get a summary of what we found and an estimate, and work starts only once you have approved it.",
      },
    ],
    whenToBook: [
      {
        p: "Book in spring if the AC felt weak last summer, and before the hard frosts if the heating already feels weak in autumn. Replace cabin filters before winter, because a clogged filter weakens both heating and demisting.",
      },
      {
        p: "If the windows will not stay clear, get it fixed straight away. Poor visibility is a safety issue, not a comfort one. Book as well if the heating or cooling only partly works, for example one side of the cabin stays warm or cool.",
      },
    ],
    body: [
      { h2: "Air conditioning service" },
      {
        p: "Our air conditioning service machines are specified for Tesla vehicles. The AC loses a little refrigerant over the years, and weak cooling is often the first sign. A clean cabin filter and a clear air intake also make a noticeable difference to how well the system cools and demists.",
      },
      { h3: "The heat pump in winter" },
      {
        p: "Model Y, and newer Model 3, Model S and Model X cars, use a heat pump that moves heat from the surroundings into the cabin. Older cars heat the cabin with a resistive heater, which uses more energy. A heat pump becomes less efficient in hard frost, so some loss of winter range is normal, but a sudden change in the same conditions is worth checking.",
      },
      { h3: "What you can do yourself" },
      {
        ul: [
          "Precondition the car while it is plugged in before you leave.",
          "Keep the air intake below the windscreen clear of snow and leaves.",
          "Use fresh air instead of recirculation when the windows fog.",
          "Dry wet floor mats so moisture does not stay in the car.",
          "Replace the cabin filter before winter.",
        ],
      },
      { note: "Practical winter advice: [Tesla winter care in Finland](@post-winter)." },
    ],
    faq: [
      {
        q: "Why does my Tesla's AC not cool properly?",
        a: "Common causes are a clogged cabin filter, a sensor fault or low refrigerant. We check the filter, the sensors and the cooling performance first, and tell you what we find.",
      },
      {
        q: "How often should the cabin filter be changed?",
        a: "On the manufacturer's schedule, and whenever airflow drops or the cabin smells. A change before winter improves demisting.",
      },
      {
        q: "Why does a Tesla use more energy in winter?",
        a: "Heating the cabin takes energy, and the heat pump is less efficient in hard frost. Preconditioning while plugged in reduces consumption on the road.",
      },
      {
        q: "Why is water dripping under the car?",
        a: "Condensation drips from the air conditioning evaporator, which is normal. If there is a pool of liquid, it is coloured or it smells, book an inspection.",
      },
      {
        q: "Why is the blower noisy?",
        a: "Leaves or debris can get into the blower through the air intake, or the blower bearing can wear. Often cleaning is enough, and only then is replacing the part considered.",
      },
    ],
    related: ["svc-electrical", "post-winter", "model-y", "svc-tyres"],
  },
};

export const SERVICES: Record<Lang, Record<ServiceId, ServiceContent>> = { fi: FI, en: EN };
