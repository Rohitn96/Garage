import type { Lang } from "@/site.config";
import type { ServiceContent } from "./types";

/**
 * The seven Tesla service pages, Finnish and English.
 *
 * Every claim here is either general, verifiable vehicle knowledge or a claim
 * the shop already made on the previous site. No prices, no statistics.
 * FINNISH NEEDS HUMAN REVIEW.
 */

export type ServiceId =
  | "svc-battery"
  | "svc-powertrain"
  | "svc-brakes"
  | "svc-suspension"
  | "svc-tyres"
  | "svc-electrical"
  | "svc-climate";

export const SERVICE_IDS: ServiceId[] = [
  "svc-battery",
  "svc-powertrain",
  "svc-brakes",
  "svc-suspension",
  "svc-tyres",
  "svc-electrical",
  "svc-climate",
];

/** Card copy for grids: system code and one line. */
export const SERVICE_CARDS: Record<ServiceId, { code: string; fi: string; en: string }> = {
  "svc-battery": {
    code: "SYS 01",
    fi: "Ajoakun kunto, latausviat ja 12 V:n akun vaihto.",
    en: "Battery health, charging faults and 12 V battery replacement.",
  },
  "svc-powertrain": {
    code: "SYS 02",
    fi: "Äänet, tärinä ja tehonrajoitus jäljitettynä oikeaan osaan.",
    en: "Noise, vibration and power limits traced to the right part.",
  },
  "svc-brakes": {
    code: "SYS 03",
    fi: "Satuloiden huolto, levyt, palat ja jarruneste.",
    en: "Caliper service, discs, pads and brake fluid.",
  },
  "svc-suspension": {
    code: "SYS 04",
    fi: "Tukivarret, holkit ja ilmajousituksen vuodot.",
    en: "Control arms, bushings and air suspension leaks.",
  },
  "svc-tyres": {
    code: "SYS 05",
    fi: "Kausivaihto, suuntaus, tasapainotus ja rengashotelli.",
    en: "Seasonal changes, alignment, balancing and tyre storage.",
  },
  "svc-electrical": {
    code: "SYS 06",
    fi: "Varoitukset, anturit, kamerat ja kosteusviat.",
    en: "Warnings, sensors, cameras and moisture faults.",
  },
  "svc-climate": {
    code: "SYS 07",
    fi: "Lämpöpumpun vianhaku, huurtuminen ja suodattimet.",
    en: "Heat pump diagnosis, fogging and cabin filters.",
  },
};

/** Climate page only: what refrigerant work is offered, per SITE.acLicensed. */
export const CLIMATE_SCOPE: Record<Lang, { limited: string; full: string }> = {
  fi: {
    limited:
      "Kylmäainepiirin avaaminen, kuten ilmastoinnin täyttö tai lämpöpumpun kylmäainepuolen korjaus, vaatii F-kaasupätevyyden. Teemme tällä hetkellä vianhaun, anturi- ja nestepiirityöt sekä suodattimet. Jos vika on kylmäainepiirissä, kerromme sen suoraan ja ohjaamme sinut pätevälle tekijälle.",
    full: "Teemme myös kylmäainepiirin työt, kuten ilmastoinnin tyhjennyksen, täytön ja painekokeen.",
  },
  en: {
    limited:
      "Opening the refrigerant circuit, for example recharging the air conditioning or repairing the refrigerant side of the heat pump, requires an F-gas qualification. At the moment we do the diagnosis, sensor and coolant circuit work, and filters. If the fault is in the refrigerant circuit, we tell you plainly and refer you to a qualified technician.",
    full: "We also carry out refrigerant circuit work, including evacuating, recharging and pressure testing the air conditioning.",
  },
};

const FI: Record<ServiceId, ServiceContent> = {
  "svc-battery": {
    seo: {
      title: "Teslan akku, lataus ja 12 V:n akun vaihto Helsingissä",
      description:
        "Teslan ajoakun kuntotesti, latausviat ja 12 V:n akun vaihto Tattarisuolla, Helsingissä. Vianhaku ensin, kirjallinen arvio ennen töitä.",
    },
    name: "Akku ja lataus",
    system: "SYS 01",
    h1: "Teslan akku, lataus ja 12 V:n akku",
    lead: "Teslassa on kaksi akkua ja kaksi erilaista vikaa. Ajoakku kertoo auton kunnosta ja arvosta, kun taas pieni 12 V:n akku pysäyttää auton useammin kuin mikään muu. Selvitämme ensin, kumpi oireilee ja miksi, ja vasta sitten puhumme vaihtamisesta.",
    symptoms: [
      {
        title: "Auto ei herää tai ovet eivät aukea",
        body: "Puhelinavain ei toimi, kosketusnäyttö pysyy pimeänä tai kahvat eivät reagoi. Tavallisin syy on heikko 12 V:n akku, ei ajoakku.",
      },
      {
        title: "Varoitus 12 V:n akusta",
        body: "Auto ilmoittaa, että pienjänniteakku pitää huoltaa tai vaihtaa. Varoitus kannattaa ottaa vakavasti, koska akku voi pettää ilman uutta ilmoitusta.",
      },
      {
        title: "Toimintamatka on laskenut",
        body: "Täyteen ladatun akun arvioitu toimintamatka on selvästi pienempi kuin ennen, myös lämpimällä säällä ja samalla ajotavalla.",
      },
      {
        title: "Lataus katkeaa tai jää hitaaksi",
        body: "Lataus keskeytyy, teho jää alhaiseksi tai auto ilmoittaa latausvirheestä usealla eri laturilla.",
      },
      {
        title: "Latauskaapeli jää kiinni",
        body: "Latausportin salpa ei vapauta kaapelia, erityisesti pakkasella tai märän sään jälkeen.",
      },
    ],
    checks: [
      {
        title: "12 V:n akun kunto",
        body: "Mittaamme akun jännitteen ja kunnon ja tarkistamme, onko autossa lyijy- vai litiumioniakku. Tyyppi vaikuttaa siihen, miten akku testataan ja vaihdetaan.",
      },
      {
        title: "Ajoakun tiedot",
        body: "Luemme akunhallintajärjestelmän tallentamat tiedot ja vikakoodit ja arvioimme kapasiteetin sekä kennoryhmien tasapainon.",
      },
      {
        title: "Latausjärjestelmä",
        body: "Tarkistamme latausportin, salvan, liittimet ja auton oman laturin toiminnan sekä latausvirheiden historian.",
      },
      {
        title: "Akun jäähdytys ja lämmitys",
        body: "Lämpötilanhallinta vaikuttaa sekä lataustehoon että akun ikään. Tarkistamme jäähdytysnesteen ja piirin toiminnan.",
      },
    ],
    diagnosis: [
      {
        p: "Aloitamme kuuntelemalla: milloin vika ilmenee, millä laturilla ja missä lämpötilassa. Sen jälkeen luemme auton omat vikakoodit ja akkujärjestelmän tiedot ja mittaamme 12 V:n järjestelmän. Moni latausvika johtuu muusta kuin autosta, esimerkiksi kotilaturin asetuksista, sähköliittymästä tai kaapelista, joten kysymme myös latausolosuhteista.",
      },
      {
        p: "Ajoakkua ei avata vianhaun aikana. Kunto arvioidaan järjestelmän tiedoista ja mittauksista. Saat kirjallisen yhteenvedon löydöksistä ja kustannusarvion, ja työ alkaa vasta, kun olet hyväksynyt sen.",
      },
    ],
    whenToBook: [
      {
        p: "Varaa aika heti, jos auto varoittaa 12 V:n akusta. Teslassa pienjänniteakku pitää yllä lukituksia, näyttöä ja ajoakun kytkentää, joten sen pettäminen voi jättää auton seisomaan kotipihaan. Vaihto on yleensä nopea työ, kun syy on varmistettu.",
      },
      {
        p: "Toimintamatkan hidas lasku vuosien mittaan on normaalia akun vanhenemista. Jos lasku on äkillinen tai suuri, tai jos harkitset auton ostoa tai myyntiä, [akun kuntoraportti](@battery-report) kertoo tilanteen paperilla.",
      },
    ],
    body: [
      { h2: "Suomen talvi ja akku" },
      {
        p: "Kylmä akku ei ota latausta vastaan yhtä nopeasti kuin lämmin, ja regeneratiivinen jarrutus on rajoitettu, kunnes akku lämpenee. Tämä on normaalia eikä vika. Esilämmitys sovelluksesta ennen lähtöä ja latauksen ajastus lähtöaikaan pitävät akun toiminta-alueellaan. Jos auto seisoo pakkasessa pitkään, jätä se mieluummin lataukseen kuin lähes tyhjäksi.",
      },
      {
        p: "Latausportin salpa ja kansi voivat jäätyä. Sovelluksen latausportin sulatustoiminto auttaa usein. Toistuva jumittuminen kertoo yleensä kuluneesta salvasta tai lämmittimestä, ja se korjataan vaihtamalla osa.",
      },
      { note: "Lue myös: [12 V:n akun varoitusmerkit](@post-12v) ja [Tesla talvella Suomessa](@post-winter)." },
    ],
    faq: [
      {
        q: "Kuinka usein Teslan 12 V:n akku pitää vaihtaa?",
        a: "Kiinteää väliä ei ole. Akku vaihdetaan, kun auto varoittaa siitä tai mittaus osoittaa sen heikentyneen. Uudemmissa autoissa on litiumioniakku, joka kestää yleensä pidempään kuin vanhempi lyijyakku.",
      },
      {
        q: "Voiko ajoakun kunnon mitata ilman purkamista?",
        a: "Kyllä. Kunto arvioidaan auton akunhallintajärjestelmän tiedoista ja mittauksista. Akkua ei avata.",
      },
      {
        q: "Kuuluuko ajoakun vika takuuseen?",
        a: "Ajoakulla on valmistajan oma takuu, jonka kesto ja kilometriraja riippuvat mallista. Jos löydämme vian, joka todennäköisesti kuuluu takuuseen, kerromme sen ja ohjaamme sinut Teslan huoltoon.",
      },
      {
        q: "Mitä 12 V:n akun vaihto vaatii Teslassa?",
        a: "Vaihdossa noudatetaan valmistajan järjestystä, jotta auton järjestelmät eivät jää virhetilaan. Varmistamme ensin, että vika on akussa eikä latauspiirissä, ja tarkistamme vaihdon jälkeen, ettei vikakoodeja jää.",
      },
    ],
    related: ["battery-report", "svc-electrical", "model-3", "post-12v"],
  },

  "svc-powertrain": {
    seo: {
      title: "Teslan voimalinjan ja suurjännitejärjestelmän vianhaku",
      description:
        "Teslan voimalinjan äänet, tärinä, tehonrajoitus ja suurjännitejärjestelmän viat. Vianhaku Tattarisuolla, Helsingissä. Arvio ennen töitä.",
    },
    name: "Voimalinja ja suurjännite",
    system: "SYS 02",
    h1: "Teslan voimalinja ja suurjännitejärjestelmän vianhaku",
    lead: "Ääni, tärinä tai tehonrajoitus voi tulla moottorista, alennusvaihteesta, vetoakselista, invertteristä tai aivan muualta alustasta. Jäljitämme oireen siihen osaan, joka sen aiheuttaa, ennen kuin puhumme korjauksesta.",
    symptoms: [
      {
        title: "Vinkuna tai ulina kiihdytyksessä",
        body: "Ääni, joka muuttuu nopeuden tai kuormituksen mukaan, voi tulla alennusvaihteen laakereista tai vetoakselista.",
      },
      {
        title: "Kolahdus lähdössä tai suunnanvaihdossa",
        body: "Usein syy on vetoakselin nivel, moottorin kiinnike tai alustan holkki, harvemmin itse voimayksikkö.",
      },
      {
        title: "Tehonrajoitus tai voimalinjan varoitus",
        body: "Auto rajoittaa tehoa ja näyttää varoituksen. Syy voi olla lämpötila, anturi tai suurjännitejärjestelmän vika.",
      },
      {
        title: "Auto ei kytke ajovalmiutta",
        body: "Näyttö toimii, mutta auto ei lähde liikkeelle. Syy voi olla 12 V:n järjestelmässä, eristysvian hälytyksessä tai suurjännitekytkennässä.",
      },
      {
        title: "Tärinä tietyllä nopeudella",
        body: "Usein vanne, rengas tai vetoakseli, joten tarkistamme ne ennen kuin epäilemme voimayksikköä.",
      },
    ],
    checks: [
      {
        title: "Vikakoodit ja tapahtumahistoria",
        body: "Luemme voimalinjan ja suurjännitejärjestelmän vikakoodit ja katsomme, milloin ja missä olosuhteissa ne ovat syntyneet.",
      },
      {
        title: "Koeajo ja äänen paikannus",
        body: "Toistamme oireen koeajolla ja paikannamme äänen tai tärinän nostimella.",
      },
      {
        title: "Vetoakselit, kiinnikkeet ja tiivisteet",
        body: "Tarkistamme nivelsuojat, välykset, moottorin kiinnikkeet ja mahdolliset öljyvuodot.",
      },
      {
        title: "Suurjännitekaapelit ja liittimet",
        body: "Silmämääräinen tarkastus ja eristysvikojen selvitys turvallisesti, jännitteettömäksi tehdyllä järjestelmällä.",
      },
    ],
    diagnosis: [
      {
        p: "Voimalinjan äänet ovat harhaanjohtavia. Sähköauto on hiljainen, joten pieni laakeriääni kuulostaa suurelta, ja alustan kolahdus voi tuntua tulevan moottorista. Siksi aloitamme aina koeajolla ja vikakoodeilla ja etenemme purkamiseen vasta, kun tiedämme mitä etsimme.",
      },
      {
        p: "Suurjännitejärjestelmää käsitellään vain jännitteettömäksi tehtynä ja turvallisuusohjeiden mukaan. Jos vika vaatii osan, jota vain valmistaja toimittaa tai korjaa, kerromme sen suoraan ennen kuin sitoudut mihinkään.",
      },
    ],
    whenToBook: [
      {
        p: "Varaa aika, jos auto rajoittaa tehoa, näyttää voimalinjaan liittyvän varoituksen tai jos ääni voimistuu viikkojen aikana. Älä jatka ajamista, jos auto ilmoittaa eristysviasta tai kehottaa pysähtymään, vaan soita meille.",
      },
      {
        p: "Jos autolla on voimassa oleva akku- ja voimayksikkötakuu ja vika näyttää takuuasialta, kerromme sen ja ohjaamme sinut Teslalle. Vianhaku auttaa silloinkin, koska tiedät, mistä on kyse, kun asioit huollossa.",
      },
    ],
    body: [
      { h2: "Mitä suurjännitetyö tarkoittaa käytännössä" },
      {
        p: "Teslan ajoakku, invertterit ja oranssit kaapelit toimivat satojen volttien jännitteellä. Työ aloitetaan tekemällä järjestelmä jännitteettömäksi valmistajan ohjeen mukaan, ja jännitteettömyys varmistetaan mittaamalla ennen kuin mihinkään kosketaan. Tämä vie aikaa, mutta se on ainoa oikea tapa.",
      },
      {
        p: "Suurin osa voimalinjan korjauksista on kuitenkin mekaanisia: vetoakselit, nivelsuojat, kiinnikkeet, tiivisteet ja alennusvaihteen öljy. Ne eivät vaadi suurjännitejärjestelmän avaamista lainkaan, ja ne ovat yleensä selvästi pienempiä töitä kuin voimayksikön vaihto.",
      },
      { h3: "Mitä kerromme ennen korjausta" },
      {
        p: "Saat tietää, mikä osa on vioittunut, miten varmistimme sen, mitä korjaus sisältää ja mitä vaihtoehtoja on. Jos osa on saatavilla vain valmistajalta, kerromme sen. Jos vika on pieni ja autolla voi ajaa turvallisesti, kerromme senkin, jotta voit suunnitella korjauksen omaan aikatauluusi.",
      },
      {
        note: "Mallikohtaiset huomiot: [Model S](@model-s), [Model 3](@model-3), [Model X](@model-x) ja [Model Y](@model-y).",
      },
    ],
    faq: [
      {
        q: "Vaihdatteko Teslan sähkömoottorin?",
        a: "Arvioimme vian ja kerromme vaihtoehdot. Koko voimayksikön vaihto on harvinainen ja suuri työ, ja usein vika on pienemmässä osassa, kuten vetoakselissa tai laakerissa. Jos korjaus vaatii valmistajan osan tai työn, kerromme sen ennen kuin sitoudut mihinkään.",
      },
      {
        q: "Onko suurjännitetyö turvallista riippumattomassa korjaamossa?",
        a: "Kun järjestelmä tehdään jännitteettömäksi ja työn tekee siihen koulutettu henkilö, se on turvallista. Teemme suurjännitetyöt aina näin.",
      },
      {
        q: "Kuuluuko voimalinjan vika takuuseen?",
        a: "Akulla ja voimayksiköllä on valmistajan takuu, jonka kesto ja kilometriraja riippuvat mallista. Jos vika näyttää takuuasialta, ohjaamme sinut Teslan huoltoon.",
      },
    ],
    related: ["svc-electrical", "svc-battery", "svc-suspension", "post-diagnosis"],
  },

  "svc-brakes": {
    seo: {
      title: "Teslan jarrut ja jarrusatuloiden huolto Helsingissä",
      description:
        "Teslan jarrusatuloiden puhdistus ja voitelu, levyt, palat ja jarruneste. Regeneratiivinen jarrutus ja Suomen suolatiet huomioiden. Tattarisuo, Helsinki.",
    },
    name: "Jarrut ja regenerointi",
    system: "SYS 03",
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
    system: "SYS 04",
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
    system: "SYS 05",
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
      title: "Teslan sähköviat, varoitukset ja ohjelmisto Helsingissä",
      description:
        "Teslan sähkövikojen vianhaku: varoitukset, näyttö, kamerat, anturit, ovet ja kosteusviat. Erotamme ohjelmistovirheen laitevikasta. Tattarisuo, Helsinki.",
    },
    name: "Sähköviat ja ohjelmisto",
    system: "SYS 06",
    h1: "Teslan sähköviat ja ohjelmisto",
    lead: "Teslassa moni vika näkyy ensin näytöllä: varoitus, toimimaton toiminto tai uudelleen käynnistyvä näyttö. Erotamme ohjelmistovirheen sähkövikasta ja kerromme, mikä korjataan korjaamossa ja mikä vaatii valmistajan toimenpiteen.",
    symptoms: [
      {
        title: "Näyttö käynnistyy uudelleen tai jäätyy",
        body: "Kosketusnäyttö pimenee kesken ajon tai reagoi hitaasti.",
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
      {
        title: "Valot ja lisälaitteet",
        body: "Valojen, istuinlämmittimien tai pistorasioiden viat.",
      },
    ],
    checks: [
      {
        title: "Vikakoodit",
        body: "Luemme ohjausyksiköiden vikakoodit ja katsomme, milloin vika on tallentunut.",
      },
      {
        title: "12 V:n järjestelmä",
        body: "Moni sähkövika johtuu heikosta 12 V:n akusta, joten se mitataan aina ensin.",
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
        p: "Ensimmäinen kysymys on, onko vika ohjelmistossa vai laitteistossa. Auton uudelleenkäynnistys tai ohjelmistopäivitys poistaa usein ohimenevän vian. Jos vika palaa, etsimme sen syyn vikakoodeista ja mittaamalla piiri kerrallaan.",
      },
      {
        p: "Ohjelmistopäivitykset tulevat Teslalta langattomasti. Emme muokkaa auton ohjelmistoa emmekä avaa maksullisia ominaisuuksia. Jos vika vaatii valmistajan toimenpidettä, kerromme sen suoraan.",
      },
    ],
    whenToBook: [
      {
        p: "Varaa aika, jos vika toistuu useamman uudelleenkäynnistyksen jälkeen, jos turvallisuuteen liittyvä toiminto kuten kamera, valot tai lasinpyyhkimet ei toimi, tai jos auto varoittaa 12 V:n akusta.",
      },
      {
        p: "Kirjaa vian ajankohta, sää ja tilanne ylös, ja ota kuva varoituksesta. Mitä tarkemmin vika on kuvattu, sitä nopeammin se löytyy. Kuvan voi lähettää etukäteen WhatsAppilla.",
      },
    ],
    body: [
      { h2: "Kosteus ja liittimet" },
      {
        p: "Suomen syksy ja talvi tuovat autoon kosteutta, joka voi hapettaa liittimiä esimerkiksi takaluukussa, ovien johtosarjoissa ja valoissa. Ajoittainen vika, joka tulee esiin sateella tai pakkasella ja katoaa kuivalla säällä, viittaa usein kosteuteen. Tällainen vika löytyy järjestelmällisesti, ei arvaamalla.",
      },
      { h3: "Kun syy on ohjelmistossa" },
      {
        p: "Osa vioista korjaantuu valmistajan ohjelmistopäivityksellä. Tarkistamme auton ohjelmistoversion ja kerromme, jos vika näyttää liittyvän ohjelmistoon eikä osaan. Silloin et maksa turhaan vaihdetusta osasta.",
      },
      { h3: "Kamerat ja anturit talvella" },
      {
        p: "Lumi, jää ja suolaliuos peittävät kameroita ja antureita, ja auto ilmoittaa silloin toiminnon olevan rajoitettu. Tämä on normaalia ja korjaantuu puhdistamalla. Jos varoitus jää päälle puhtaallakin kameralla, syy voi olla kosteudessa, kiinnityksessä tai johdotuksessa, ja se kannattaa tarkistaa.",
      },
      {
        p: "Jos auto on täysin pimeänä, käyttöohjeessa on ohje 12 V:n järjestelmän apukäynnistykseen. Jos et ole varma, soita meille ennen kuin yrität, niin neuvomme.",
      },
      { note: "Katso myös [akku ja lataus](@svc-battery) ja [mitä vianhaku sisältää](@post-diagnosis)." },
    ],
    faq: [
      {
        q: "Voiko korjaamo päivittää Teslan ohjelmiston?",
        a: "Emme muokkaa auton ohjelmistoa. Päivitykset tulevat Teslalta langattomasti. Tarkistamme, mikä versio autossa on, ja neuvomme, jos päivitys jää jumiin.",
      },
      {
        q: "Onko näytön uudelleenkäynnistys turvallista?",
        a: "Kyllä, kun auto on pysäköity. Ohjeet löytyvät auton käyttöohjeesta. Jos vika palaa usein, varaa vianhaku.",
      },
      {
        q: "Aiheuttaako 12 V:n akku sähkövikoja?",
        a: "Usein. Heikko 12 V:n akku voi aiheuttaa satunnaisia varoituksia ja toimintahäiriöitä, joten mittaamme sen ensimmäisenä.",
      },
      {
        q: "Miksi ovenkahva ei toimi pakkasella?",
        a: "Jää voi estää kahvan liikkeen. Esilämmitys sovelluksesta sulattaa sen yleensä. Jos kahva ei toimi sulana ja kuivana, syy voi olla kahvan moottorissa, kytkimessä tai johdotuksessa.",
      },
      {
        q: "Mitä tietoja vianhakuun kannattaa tuoda?",
        a: "Kuva varoituksesta, tieto siitä milloin vika ilmenee, ja onko autoon tehty viime aikoina töitä tai asennettu lisälaitteita. Jälkiasennetut laitteet ovat yllättävän yleinen sähkövikojen syy.",
      },
    ],
    related: ["svc-battery", "svc-powertrain", "post-12v", "post-diagnosis"],
  },

  "svc-climate": {
    seo: {
      title: "Teslan lämpöpumppu ja ilmastointi, vianhaku Helsingissä",
      description:
        "Teslan lämpöpumpun ja ilmastoinnin vianhaku: heikko lämpö, huurtuvat ikkunat, talven toimintamatka ja raitisilmasuodattimet. Tattarisuo, Helsinki.",
    },
    name: "Ilmastointi ja lämpöpumppu",
    system: "SYS 07",
    h1: "Teslan ilmastointi ja lämpöpumppu",
    lead: "Suomessa lämpöpumppu on osa toimintamatkaa, ei pelkkä mukavuusvaruste. Kun lämpö ei riitä, ikkunat huurtuvat tai talven toimintamatka putoaa äkillisesti, selvitämme syyn anturista, venttiilistä, pumpusta, puhaltimesta tai ohjauksesta.",
    symptoms: [
      {
        title: "Heikko lämpö pakkasella",
        body: "Matkustamo lämpenee hitaasti tai jää viileäksi, vaikka asetukset ovat kohdallaan.",
      },
      {
        title: "Ikkunat huurtuvat",
        body: "Usein syy on tukkeutunut raitisilmasuodatin, kiertoilma-asetus tai kosteus matkustamossa.",
      },
      {
        title: "Äkillinen toimintamatkan lasku",
        body: "Tavallista talven laskua suurempi muutos samoissa olosuhteissa voi viitata lämmönhallinnan vikaan.",
      },
      {
        title: "Haju tai kosteus",
        body: "Ummehtunut haju puhaltimesta kertoo yleensä suodattimesta tai höyrystimen kosteudesta.",
      },
      {
        title: "Ilmastointi ei viilennä",
        body: "Syy voi olla anturissa, ohjauksessa tai kylmäainepiirissä.",
      },
    ],
    checks: [
      {
        title: "Vikakoodit ja lämpötila-anturit",
        body: "Luemme lämmönhallinnan vikakoodit ja tarkistamme anturien lukemat.",
      },
      {
        title: "Venttiilit, pumput ja nestepiiri",
        body: "Lämmönhallinnan nestepuoli, joka lämmittää ja jäähdyttää akkua ja voimalinjaa.",
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
        p: "Teslan lämmönhallinta yhdistää matkustamon, akun ja voimalinjan lämmityksen ja jäähdytyksen yhdeksi järjestelmäksi. Vian syy voi olla anturissa, venttiilissä, pumpussa, ohjelmistossa tai kylmäainepiirissä. Luemme vikakoodit, tarkistamme anturit ja nestepiirin ja rajaamme vian ennen arviota.",
      },
      {
        p: "Saat kirjallisen yhteenvedon löydöksistä ja arvion, ja työ alkaa vasta, kun olet hyväksynyt sen. Jos vika on kylmäainepiirissä, sanomme sen suoraan.",
      },
    ],
    whenToBook: [
      {
        p: "Varaa aika ennen kovia pakkasia, jos lämmitys tuntuu heikolta jo syksyllä. Raitisilmasuodattimet kannattaa vaihtaa ennen talvea, koska tukkeutunut suodatin heikentää sekä lämmitystä että huurteenpoistoa.",
      },
      {
        p: "Jos ikkunat eivät pysy kirkkaina, korjaa vika heti. Huono näkyvyys on turvallisuusasia, ei mukavuuskysymys. Varaa aika myös, jos lämmitys toimii vain osittain, esimerkiksi toinen puoli matkustamosta jää viileäksi.",
      },
    ],
    body: [
      { h2: "Lämpöpumppu ja talvi" },
      {
        p: "Model Y:ssä sekä uudemmissa Model 3-, Model S- ja Model X -autoissa on lämpöpumppu, joka siirtää lämpöä ympäristöstä ja voimalinjasta matkustamoon ja akkuun. Vanhemmissa autoissa matkustamoa lämmittää vastuslämmitin, joka kuluttaa enemmän energiaa.",
      },
      {
        p: "Lämpöpumpun hyötysuhde laskee kovalla pakkasella, ja auto käyttää silloin enemmän energiaa lämmitykseen. Talven toimintamatkan lasku on siksi normaalia, mutta äkillinen muutos samoissa olosuhteissa kannattaa tarkistaa. Esilämmitys auton ollessa latauksessa säästää akkua ajoa varten.",
      },
      { h3: "Akun lämmitys ennen pikalatausta" },
      {
        p: "Lämmönhallinta lämmittää myös ajoakkua ennen pikalatausta, kun navigoit auton omalla navigaattorilla pikalaturille. Jos auto lataa pakkasella hitaasti, vaikka akku on ehtinyt lämmetä, syy voi olla lämmönhallinnassa ja se kannattaa tarkistaa.",
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
        q: "Kuinka usein raitisilmasuodatin vaihdetaan?",
        a: "Valmistajan aikataulun mukaan, ja aina kun ilmavirta heikkenee tai sisällä haisee. Ennen talvea tehty vaihto parantaa huurteenpoistoa.",
      },
      {
        q: "Miksi Tesla kuluttaa talvella enemmän?",
        a: "Akun ja matkustamon lämmitys vie energiaa, ja kylmä akku toimii heikommin. Esilämmitys latauksessa ollessa vähentää kulutusta ajon aikana.",
      },
      {
        q: "Onko lämpöpumpun vika vaarallinen?",
        a: "Ei yleensä, mutta heikko lämmitys ja huurtuvat ikkunat heikentävät näkyvyyttä. Korjaa vika ennen pakkasia.",
      },
      {
        q: "Miksi auton alle tippuu vettä?",
        a: "Ilmastoinnin höyrystimestä tippuu kondenssivettä, mikä on normaalia. Jos nestettä on lammikoksi asti, se on värillistä tai se haisee, varaa tarkastus.",
      },
      {
        q: "Miksi puhaltimesta kuuluu ääntä?",
        a: "Puhaltimeen voi päätyä lehtiä tai roskia ilmanottoaukosta, tai puhaltimen laakeri voi kulua. Tarkistamme puhaltimen ja ilmakanavat. Usein korjaukseksi riittää puhdistus, ja vasta sitten harkitaan osan vaihtoa.",
      },
    ],
    related: ["svc-battery", "svc-electrical", "post-winter", "model-y"],
  },
};

const EN: Record<ServiceId, ServiceContent> = {
  "svc-battery": {
    seo: {
      title: "Tesla battery, charging and 12 V battery replacement in Helsinki",
      description:
        "Tesla battery health checks, charging faults and 12 V battery replacement in Tattarisuo, Helsinki. Diagnosis first, a written estimate before any work.",
    },
    name: "Battery and charging",
    system: "SYS 01",
    h1: "Tesla battery, charging and the 12 V battery",
    lead: "A Tesla has two batteries and two very different kinds of fault. The high-voltage pack tells you about the car's condition and value; the small 12 V battery strands more cars than anything else. We find out which one is causing the problem, and why, before anyone talks about replacing anything.",
    symptoms: [
      {
        title: "The car will not wake or the doors will not open",
        body: "The phone key does not work, the touchscreen stays dark or the handles do not respond. The usual cause is a weak 12 V battery, not the main pack.",
      },
      {
        title: "A 12 V battery warning",
        body: "The car says the low-voltage battery needs service or replacement. Take it seriously: the battery can fail without a second warning.",
      },
      {
        title: "Range has dropped",
        body: "The estimated range at full charge is clearly lower than it used to be, in mild weather and with the same driving.",
      },
      {
        title: "Charging stops or stays slow",
        body: "Charging stops, the rate stays low or the car reports a charging fault on more than one charger.",
      },
      {
        title: "The cable is stuck in the port",
        body: "The charge port latch will not release the cable, especially in frost or after wet weather.",
      },
    ],
    checks: [
      {
        title: "12 V battery condition",
        body: "We measure voltage and condition and check whether the car has a lead-acid or a lithium-ion low-voltage battery. The type changes how it is tested and replaced.",
      },
      {
        title: "High-voltage battery data",
        body: "We read the data and fault codes stored by the battery management system and assess capacity and the balance between cell groups.",
      },
      {
        title: "Charging system",
        body: "We check the charge port, latch, contacts and the onboard charger, and the car's history of charging faults.",
      },
      {
        title: "Battery heating and cooling",
        body: "Thermal management affects both charging speed and battery life. We check the coolant and the circuit.",
      },
    ],
    diagnosis: [
      {
        p: "We start by listening: when the fault appears, on which charger and at what temperature. Then we read the car's own fault codes and battery data and measure the 12 V system. Many charging faults have nothing to do with the car, for example the settings of a home charger, the electrical supply or a cable, so we ask about where and how you charge as well.",
      },
      {
        p: "The high-voltage battery is not opened during diagnosis. Its condition is assessed from system data and measurements. You get a written summary of what we found and an estimate, and work starts only once you have approved it.",
      },
    ],
    whenToBook: [
      {
        p: "Book straight away if the car warns about the 12 V battery. In a Tesla the low-voltage battery keeps the locks, the screen and the high-voltage contactors working, so when it fails the car can be left sitting on your drive. Replacement is usually a quick job once the cause is confirmed.",
      },
      {
        p: "A slow loss of range over the years is normal ageing. If the drop is sudden or large, or you are buying or selling the car, a [battery health report](@battery-report) puts the condition on paper.",
      },
    ],
    body: [
      { h2: "Finnish winters and the battery" },
      {
        p: "A cold battery accepts charge more slowly than a warm one, and regenerative braking is limited until the pack warms up. That is normal behaviour, not a fault. Preconditioning from the app before you leave, and scheduling charging to finish near departure, keep the battery in its working window. If the car will stand in frost for a long time, leave it plugged in rather than nearly empty.",
      },
      {
        p: "The charge port latch and flap can freeze. The app's charge port defrost function often helps. If it sticks again and again, the latch or its heater is usually worn, and the fix is replacing the part.",
      },
      { note: "Read more: [12 V battery warning signs](@post-12v) and [Tesla winter care in Finland](@post-winter)." },
    ],
    faq: [
      {
        q: "How often does a Tesla 12 V battery need replacing?",
        a: "There is no fixed interval. It is replaced when the car warns about it or a test shows it has weakened. Newer cars use a lithium-ion low-voltage battery, which usually lasts longer than the older lead-acid type.",
      },
      {
        q: "Can battery health be measured without taking the pack apart?",
        a: "Yes. Condition is assessed from the battery management system's data and from measurements. The pack is not opened.",
      },
      {
        q: "Is a high-voltage battery fault covered by warranty?",
        a: "The high-voltage battery has its own manufacturer warranty, with a length and distance limit that depend on the model. If we find a fault that is likely to be covered, we tell you and send you to Tesla service.",
      },
      {
        q: "What does a 12 V battery replacement involve on a Tesla?",
        a: "We follow the manufacturer's sequence so the car's systems are not left in a fault state. We first confirm the fault is the battery and not its charging circuit, and afterwards check that no fault codes remain.",
      },
    ],
    related: ["battery-report", "svc-electrical", "model-3", "post-12v"],
  },

  "svc-powertrain": {
    seo: {
      title: "Tesla powertrain and high-voltage diagnostics in Helsinki",
      description:
        "Tesla drive unit noise, vibration, power limits and high-voltage system faults, diagnosed in Tattarisuo, Helsinki. Estimate before any work.",
    },
    name: "Powertrain and high voltage",
    system: "SYS 02",
    h1: "Tesla powertrain and high-voltage diagnostics",
    lead: "A noise, a vibration or a power limit can come from the motor, the reduction gear, a driveshaft, the inverter or somewhere else in the chassis entirely. We trace the symptom to the part that is causing it before we talk about a repair.",
    symptoms: [
      {
        title: "Whine or howl under acceleration",
        body: "A noise that changes with speed or load can come from reduction gear bearings or a driveshaft.",
      },
      {
        title: "A clunk when pulling away or changing direction",
        body: "Often a driveshaft joint, a motor mount or a chassis bushing, less often the drive unit itself.",
      },
      {
        title: "Reduced power or a powertrain warning",
        body: "The car limits power and shows a warning. The cause can be temperature, a sensor or a high-voltage system fault.",
      },
      {
        title: "The car will not go into drive",
        body: "The screen works but the car will not move. The cause can be in the 12 V system, an isolation fault alert or the high-voltage contactors.",
      },
      {
        title: "Vibration at a particular speed",
        body: "Often a wheel, a tyre or a driveshaft, so we check those before suspecting the drive unit.",
      },
    ],
    checks: [
      {
        title: "Fault codes and event history",
        body: "We read the powertrain and high-voltage fault codes and look at when, and in what conditions, they were logged.",
      },
      {
        title: "Road test and noise location",
        body: "We reproduce the symptom on a road test and locate the noise or vibration on the lift.",
      },
      {
        title: "Driveshafts, mounts and seals",
        body: "We check boots, play, motor mounts and any oil leaks.",
      },
      {
        title: "High-voltage cables and connectors",
        body: "Visual inspection and isolation fault finding, carried out safely on a de-energised system.",
      },
    ],
    diagnosis: [
      {
        p: "Powertrain noises are misleading. An electric car is quiet, so a small bearing noise sounds big, and a chassis knock can feel as if it comes from the motor. That is why we always start with a road test and the fault codes, and only take things apart once we know what we are looking for.",
      },
      {
        p: "The high-voltage system is only worked on once it has been de-energised, following safety procedures. If the fault needs a part that only the manufacturer supplies or repairs, we say so plainly before you commit to anything.",
      },
    ],
    whenToBook: [
      {
        p: "Book if the car limits power, shows a powertrain warning or a noise is getting louder over weeks. Do not keep driving if the car reports an isolation fault or tells you to pull over; call us instead.",
      },
      {
        p: "If the car is still under its battery and drive unit warranty and the fault looks like a warranty matter, we tell you and send you to Tesla. The diagnosis still helps, because you know what the problem is when you get there.",
      },
    ],
    body: [
      { h2: "What high-voltage work means in practice" },
      {
        p: "A Tesla's battery, inverters and orange cables run at several hundred volts. Work begins by de-energising the system to the manufacturer's procedure and confirming by measurement that it is dead before anything is touched. It takes time, and it is the only correct way to do it.",
      },
      {
        p: "Most powertrain repairs are mechanical, though: driveshafts, boots, mounts, seals and reduction gear oil. None of them need the high-voltage system opened at all, and they are usually far smaller jobs than replacing a drive unit.",
      },
      { h3: "What we tell you before a repair" },
      {
        p: "You find out which part has failed, how we confirmed it, what the repair involves and what the options are. If a part is only available from the manufacturer, we say so. If the fault is minor and the car is safe to drive, we tell you that too, so you can plan the repair around your own schedule.",
      },
      {
        note: "Model notes: [Model S](@model-s), [Model 3](@model-3), [Model X](@model-x) and [Model Y](@model-y).",
      },
    ],
    faq: [
      {
        q: "Do you replace Tesla drive units?",
        a: "We diagnose the fault and explain the options. Replacing a whole drive unit is a rare and large job, and the fault is often in a smaller part such as a driveshaft or a bearing. If the repair needs a manufacturer part or manufacturer work, we tell you before you commit to anything.",
      },
      {
        q: "Is high-voltage work safe at an independent garage?",
        a: "When the system is de-energised and the work is done by someone trained for it, yes. That is how we always do it.",
      },
      {
        q: "Is a powertrain fault covered by warranty?",
        a: "The battery and drive unit have a manufacturer warranty whose length and distance limit depend on the model. If the fault looks like a warranty matter, we send you to Tesla service.",
      },
    ],
    related: ["svc-electrical", "svc-battery", "svc-suspension", "post-diagnosis"],
  },

  "svc-brakes": {
    seo: {
      title: "Tesla brakes and caliper service in Helsinki",
      description:
        "Tesla brake caliper cleaning and lubrication, discs, pads and brake fluid, with regenerative braking and Finnish salted roads in mind. Tattarisuo, Helsinki.",
    },
    name: "Brakes and regen",
    system: "SYS 03",
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
    system: "SYS 04",
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
    system: "SYS 05",
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
      title: "Tesla electrical faults, warnings and software in Helsinki",
      description:
        "Tesla electrical fault finding: warnings, screen, cameras, sensors, doors and moisture faults. We tell software issues from hardware faults. Tattarisuo, Helsinki.",
    },
    name: "Electrical faults and software",
    system: "SYS 06",
    h1: "Tesla electrical faults and software",
    lead: "In a Tesla, most faults show up on the screen first: a warning, a feature that stops working, a display that reboots. We separate software glitches from electrical faults and tell you what can be fixed in the workshop and what needs action from the manufacturer.",
    symptoms: [
      {
        title: "The screen reboots or freezes",
        body: "The touchscreen goes dark while driving or responds slowly.",
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
      {
        title: "Lights and accessories",
        body: "Faults in lights, seat heaters or power outlets.",
      },
    ],
    checks: [
      {
        title: "Fault codes",
        body: "We read the control units' fault codes and see when each fault was logged.",
      },
      {
        title: "12 V system",
        body: "Many electrical faults come from a weak 12 V battery, so we always measure it first.",
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
        p: "The first question is whether the fault is in software or hardware. Restarting the car or a software update often clears a passing glitch. If the fault comes back, we find its cause from the fault codes and by measuring, one circuit at a time.",
      },
      {
        p: "Software updates come from Tesla over the air. We do not modify the car's software or unlock paid features. If a fault needs action from the manufacturer, we tell you plainly.",
      },
    ],
    whenToBook: [
      {
        p: "Book if a fault keeps coming back after several restarts, if a safety function such as a camera, lights or wipers is not working, or if the car warns about the 12 V battery.",
      },
      {
        p: "Write down when the fault happens, the weather and the situation, and take a photo of the warning. The better the description, the faster the fault is found. You can send the photo ahead on WhatsApp.",
      },
    ],
    body: [
      { h2: "Moisture and connectors" },
      {
        p: "Finnish autumns and winters bring moisture into the car, which can corrode connectors in places such as the tailgate, the door wiring and the lights. An intermittent fault that appears in rain or frost and disappears in dry weather usually points to moisture. A fault like that is found methodically, not by guessing.",
      },
      { h3: "When the cause is software" },
      {
        p: "Some faults are fixed by a manufacturer software update. We check which software version the car has and tell you if a fault looks software related rather than a failed part. That way you do not pay for a part that did not need replacing.",
      },
      { h3: "Cameras and sensors in winter" },
      {
        p: "Snow, ice and road salt cover cameras and sensors, and the car then reports that a feature is limited. That is normal and clears with cleaning. If the warning stays on with a clean camera, the cause can be moisture, mounting or wiring, and it is worth checking.",
      },
      {
        p: "If the car is completely dark, the owner's manual explains how to jump-start the 12 V system. If you are not sure, call us before you try and we will talk you through it.",
      },
      { note: "See also [battery and charging](@svc-battery) and [what a diagnosis involves](@post-diagnosis)." },
    ],
    faq: [
      {
        q: "Can a garage update a Tesla's software?",
        a: "We do not modify the car's software. Updates come from Tesla over the air. We check which version the car has and help if an update gets stuck.",
      },
      {
        q: "Is it safe to restart the screen?",
        a: "Yes, with the car parked. The steps are in the owner's manual. If the fault keeps returning, book a diagnosis.",
      },
      {
        q: "Can the 12 V battery cause electrical faults?",
        a: "Often. A weak 12 V battery can cause random warnings and glitches, so it is the first thing we measure.",
      },
      {
        q: "Why does a door handle stop working in frost?",
        a: "Ice can block the handle. Preconditioning from the app usually thaws it. If the handle does not work when it is thawed and dry, the cause can be the handle motor, a switch or the wiring.",
      },
      {
        q: "What should I bring to a diagnosis?",
        a: "A photo of the warning, when the fault happens, and whether any work has been done recently or accessories fitted. Aftermarket accessories are a surprisingly common cause of electrical faults.",
      },
    ],
    related: ["svc-battery", "svc-powertrain", "post-12v", "post-diagnosis"],
  },

  "svc-climate": {
    seo: {
      title: "Tesla heat pump and climate diagnosis in Helsinki",
      description:
        "Tesla heat pump and climate fault diagnosis: weak heating, fogged windows, winter range and cabin filters. Tattarisuo, Helsinki.",
    },
    name: "Climate and heat pump",
    system: "SYS 07",
    h1: "Tesla climate control and heat pump",
    lead: "In Finland the heat pump is part of your range, not just a comfort feature. When the heating is weak, the windows fog up or winter range suddenly drops, we trace the cause to a sensor, valve, pump, blower or the control logic.",
    symptoms: [
      {
        title: "Weak heating in frost",
        body: "The cabin warms slowly or stays cool even though the settings are right.",
      },
      {
        title: "Windows fog up",
        body: "Often a clogged cabin filter, the recirculation setting or moisture in the cabin.",
      },
      {
        title: "A sudden drop in range",
        body: "A bigger change than the usual winter drop, in the same conditions, can point to a thermal management fault.",
      },
      {
        title: "Smell or damp",
        body: "A musty smell from the vents usually means the filter or moisture on the evaporator.",
      },
      {
        title: "The air conditioning does not cool",
        body: "The cause can be a sensor, the control logic or the refrigerant circuit.",
      },
    ],
    checks: [
      {
        title: "Fault codes and temperature sensors",
        body: "We read the thermal management fault codes and check the sensor readings.",
      },
      {
        title: "Valves, pumps and coolant circuit",
        body: "The coolant side of thermal management, which heats and cools the battery and powertrain.",
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
        p: "Tesla's thermal management combines heating and cooling for the cabin, the battery and the powertrain into one system. The cause of a fault can be a sensor, a valve, a pump, software or the refrigerant circuit. We read the fault codes, check the sensors and the coolant circuit, and narrow the fault down before giving you an estimate.",
      },
      {
        p: "You get a written summary of what we found and an estimate, and work starts only once you have approved it. If the fault is in the refrigerant circuit, we tell you plainly.",
      },
    ],
    whenToBook: [
      {
        p: "Book before the hard frosts if the heating already feels weak in autumn. Replace cabin filters before winter, because a clogged filter weakens both heating and demisting.",
      },
      {
        p: "If the windows will not stay clear, get it fixed straight away. Poor visibility is a safety issue, not a comfort one. Book as well if the heating only partly works, for example one side of the cabin stays cool.",
      },
    ],
    body: [
      { h2: "The heat pump in winter" },
      {
        p: "Model Y, and newer Model 3, Model S and Model X cars, use a heat pump that moves heat from the surroundings and the powertrain into the cabin and the battery. Older cars heat the cabin with a resistive heater, which uses more energy.",
      },
      {
        p: "A heat pump becomes less efficient in hard frost, and the car then uses more energy for heating. Some loss of winter range is therefore normal, but a sudden change in the same conditions is worth checking. Preconditioning while plugged in saves battery for the drive.",
      },
      { h3: "Warming the battery before fast charging" },
      {
        p: "Thermal management also warms the high-voltage battery before fast charging when you navigate to a fast charger with the car's own navigation. If the car charges slowly in frost even though the battery has had time to warm, the cause can be in thermal management and is worth checking.",
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
        q: "How often should the cabin filter be changed?",
        a: "On the manufacturer's schedule, and whenever airflow drops or the cabin smells. A change before winter improves demisting.",
      },
      {
        q: "Why does a Tesla use more energy in winter?",
        a: "Heating the battery and the cabin takes energy, and a cold battery works less efficiently. Preconditioning while plugged in reduces consumption on the road.",
      },
      {
        q: "Is a heat pump fault dangerous?",
        a: "Not usually, but weak heating and fogged windows reduce visibility. Get it fixed before the frosts.",
      },
      {
        q: "Why is water dripping under the car?",
        a: "Condensation drips from the air conditioning evaporator, which is normal. If there is a pool of liquid, it is coloured or it smells, book an inspection.",
      },
      {
        q: "Why is the blower noisy?",
        a: "Leaves or debris can get into the blower through the air intake, or the blower bearing can wear. We check the blower and the ducts. Often cleaning is enough, and only then is replacing the part considered.",
      },
    ],
    related: ["svc-battery", "svc-electrical", "post-winter", "model-y"],
  },
};

export const SERVICES: Record<Lang, Record<ServiceId, ServiceContent>> = { fi: FI, en: EN };
