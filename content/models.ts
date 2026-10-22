import type { Lang } from "@/site.config";
import type { ModelContent } from "./types";

/**
 * Model pages. General, verifiable knowledge about each model, framed as what
 * we check. No failure rates, no statistics. FINNISH NEEDS HUMAN REVIEW.
 */

export type ModelId = "model-3" | "model-y" | "model-s" | "model-x";
export const MODEL_IDS: ModelId[] = ["model-3", "model-y", "model-s", "model-x"];

/** Model selector copy: big letter plus one line. */
export const MODEL_CARDS: Record<ModelId, { letter: string; fi: string; en: string }> = {
  "model-3": { letter: "3", fi: "Teräsjouset, etupään holkit, jarrut", en: "Steel springs, front bushings, brakes" },
  "model-y": { letter: "Y", fi: "Renkaat, alusta, lämpöpumppu", en: "Tyres, suspension, heat pump" },
  "model-s": { letter: "S", fi: "Ilmajousitus, ikääntyvä elektroniikka", en: "Air suspension, ageing electronics" },
  "model-x": { letter: "X", fi: "Ilmajousitus, takaovet, tiivisteet", en: "Air suspension, rear doors, seals" },
};

const WARRANTY_FI =
  "EU:n kilpailusäännöt rajoittavat valmistajan oikeutta evätä takuu pelkästään siksi, että määräaikaishuolto on tehty riippumattomassa korjaamossa, kun työ tehdään valmistajan ohjeiden mukaan ja vaatimukset täyttävillä osilla. Takuukorjaukset tekee kuitenkin Tesla. Lue tarkemmin [usein kysytyistä](@faq).";
const WARRANTY_EN =
  "EU competition rules limit a manufacturer's right to refuse warranty just because routine maintenance was done by an independent garage, provided the work follows the manufacturer's specifications and uses parts of matching quality. Warranty repairs themselves are still done by Tesla. More in the [FAQ](@faq).";

const FI: Record<ModelId, ModelContent> = {
  "model-3": {
    seo: {
      title: "Tesla Model 3 huolto ja korjaus Helsingissä",
      description:
        "Tesla Model 3:n tyypilliset viat, mitä tarkistamme ja talven erityispiirteet. Riippumaton Tesla-korjaamo Tattarisuolla, Helsingissä. Arvio ennen töitä.",
    },
    name: "Model 3",
    h1: "Tesla Model 3:n huolto ja korjaus",
    lead: "Model 3 on Suomen teillä yleinen Tesla, ja sen tyypilliset huoltokohteet tunnetaan hyvin. Tällä sivulla kerromme, mitkä viat toistuvat, mitä tarkistamme ja mitä Suomen talvi tekee tälle autolle.",
    intro: [
      {
        p: "Model 3 tuli Eurooppaan vuonna 2019, ja siitä on sittemmin tullut uudistettu versio. Auto on teknisesti yksinkertaisempi kuin Model S ja Model X: siinä on teräsjouset, ja huoltokohteet liittyvät enemmän alustaan, jarruihin ja renkaisiin kuin voimalinjaan. Moni Model 3 on yritys- tai kyytipalvelukäytössä ja kerää kilometrejä nopeasti, joten kuluvat osat tulevat vastaan tavallista aiemmin.",
      },
      {
        p: "Teslalla ei ole perinteistä vuosihuoltoa, mutta valmistajan huolto-ohjelmassa on säännöllisiä kohteita. Kokoamme ne yhteen käyntiin, jotta auto ei seiso korjaamolla useaan kertaan.",
      },
      { p: WARRANTY_FI },
    ],
    issues: [
      {
        title: "Etupään narina ja kolahdus",
        body: "Etuakselin ylätukivarsien holkit ja pallonivelet kuluvat ja alkavat narista tai kolahdella, erityisesti pakkasella ja hidasteissa. Tavallinen korjaus on tukivarsien vaihto pareittain.",
      },
      {
        title: "12 V:n akun varoitus",
        body: "Vanhemmissa autoissa on lyijyakku, joka voi heikentyä muutamassa vuodessa, uudemmissa litiumioniakku. Molemmissa varoitus kannattaa hoitaa ennen kuin auto jää seisomaan.",
      },
      {
        title: "Ruostuneet ja jumittuneet takajarrut",
        body: "Regeneratiivinen jarrutus jättää kitkajarrut vähälle käytölle, ja suola syövyttää ne. Satuloiden huolto kerran vuodessa ehkäisee ongelman.",
      },
      {
        title: "Ovenkahvat ja ikkunat talvella",
        body: "Upotetut kahvat ja kehyksettömät ikkunat jäätyvät helposti. Esilämmitys auttaa, mutta toistuva vika sulana voi johtua kahvan mekanismista tai ikkunan säädöstä.",
      },
      {
        title: "Renkaiden epätasainen kuluminen",
        body: "Tehokas kiihdytys kuluttaa vetäviä renkaita, ja kulunut holkki tai suuntausvirhe syö sisäreunaa. Säännöllinen kierto ja oikeat paineet tasaavat kulumista.",
      },
    ],
    checks: [
      "12 V:n akun kunto ja tyyppi",
      "Ajoakun tiedot ja vikakoodit",
      "Etupään tukivarret, holkit ja pallonivelet",
      "Jarrusatulat, levyt, palat ja jarrunesteen kosteus",
      "Renkaiden kuluminen, paineet ja suuntaus",
      "Raitisilmasuodatin",
      "Latausportin salpa ja kansi",
      "Alustan ja akkukotelon suojat nostimella",
    ],
    winter: [
      { h2: "Model 3 Suomen talvessa" },
      {
        p: "Model 3:n upotetut ovenkahvat ja kehyksettömät ikkunat ovat talvella herkkiä jäälle. Ikkuna laskee hieman, kun ovi avataan, ja jäätyneenä se voi jäädä kiinni. Esilämmitys sovelluksesta ennen lähtöä sulattaa kahvat ja ikkunat ja lämmittää samalla akun.",
      },
      {
        p: "Kylmä akku rajoittaa regeneratiivista jarrutusta ja latausnopeutta. Tämä on normaalia, ja tilanne paranee akun lämmetessä. Kun ajat pikalaturille, käytä auton omaa navigaattoria, jotta akku esilämmitetään ennen latausta.",
      },
      {
        p: "Suola ja hiekoitussepeli kuluttavat alustaa ja jarruja. Pese auto talvella myös alta ja tarkistuta jarrut keväällä. Talvirenkaiden on oltava kunnossa, koska raskas auto ja välitön vääntö kuluttavat niitä nopeammin kuin moni odottaa.",
      },
      { h2: "Jos ostat käytetyn Model 3:n" },
      {
        p: "Käytetyssä Model 3:ssa kannattaa tarkistaa ajoakun kunto, etupään alusta, jarrujen ruoste ja renkaiden kuluminen. Kysy myös, onko autoa käytetty kyytipalveluissa, koska suuret kilometrit kuluttavat alustaa. Teemme ostajalle tarkastuksen ja kirjallisen yhteenvedon. Katso myös [käytetyn Teslan tarkistuslista](@post-used).",
      },
    ],
    faq: [
      {
        q: "Kuinka usein Model 3 pitää huoltaa?",
        a: "Teslalla ei ole kiinteää vuosihuoltoa kuten polttomoottoriautoilla. Valmistajan huolto-ohjelmassa on kuitenkin säännöllisiä kohteita, kuten jarrujen huolto suolatiellä, jarrunesteen tarkistus, raitisilmasuodattimet ja renkaiden kierto.",
      },
      {
        q: "Sopiiko Model 3 viikonloppuhuoltoon?",
        a: "Usein kyllä. Monet jarru-, alusta- ja rengastyöt voi tehdä viikonlopun aikana, kun osat ovat saatavilla. Lue lisää [viikonloppuhuollosta](@weekend).",
      },
      {
        q: "Miksi Model 3:n etupää narisee pakkasella?",
        a: "Kylmä kovettaa tukivarsien kumiholkit, ja kuluneet holkit narisevat silloin herkemmin. Paikannamme äänen ennen kuin vaihdamme osia.",
      },
    ],
    related: ["svc-suspension", "svc-brakes", "svc-battery", "post-used"],
  },

  "model-y": {
    seo: {
      title: "Tesla Model Y huolto ja korjaus Helsingissä",
      description:
        "Tesla Model Y:n renkaat, alusta, jarrut ja lämpöpumppu. Tyypilliset viat ja talven huomiot. Riippumaton Tesla-korjaamo Tattarisuolla, Helsingissä.",
    },
    name: "Model Y",
    h1: "Tesla Model Y:n huolto ja korjaus",
    lead: "Model Y on Model 3:n tilavampi ja painavampi sisarmalli, ja suuri osa tekniikasta on yhteistä. Paino ja korkeampi kori näkyvät kuitenkin renkaissa, alustassa ja jarruissa. Kerromme, mitä tarkistamme ja mihin kannattaa varautua.",
    intro: [
      {
        p: "Model Y tuli Eurooppaan vuonna 2021, ja sitä valmistetaan myös Euroopassa. Siinä on alusta asti ollut lämpöpumppu ja teräsjouset, ei ilmajousitusta. Perheauton käytössä se ajaa usein lyhyitä matkoja, mikä on akulle helppoa mutta jarruille vaikeaa: kitkajarrut jäävät vähälle käytölle ja ruostuvat.",
      },
      {
        p: "Monet Model Y:n huoltokohteet ovat samoja kuin Model 3:ssa, joten kokemus toisesta mallista auttaa toisen kanssa. Kokoamme valmistajan huolto-ohjelman kohteet yhteen käyntiin.",
      },
      { p: WARRANTY_FI },
    ],
    issues: [
      {
        title: "Renkaiden nopea kuluminen",
        body: "Paino ja vääntö kuluttavat renkaita nopeammin kuin moni odottaa, erityisesti jos paineet ovat alhaiset tai suuntaus on pielessä. Kulumiskuvio kertoo syyn.",
      },
      {
        title: "Etupään äänet",
        body: "Tukivarsien holkit ja pallonivelet kuluvat samaan tapaan kuin Model 3:ssa. Ääni kuuluu hidasteissa ja huonolla tiellä.",
      },
      {
        title: "Jarrujen ruostuminen",
        body: "Lyhyillä matkoilla regeneratiivinen jarrutus hoitaa lähes kaiken, ja levyt ruostuvat. Satuloiden vuosihuolto ehkäisee jumittumista.",
      },
      {
        title: "12 V:n akku",
        body: "Heikkenevä pienjänniteakku näkyy satunnaisina varoituksina ennen kuin auto jää seisomaan. Varoitus kannattaa hoitaa heti.",
      },
      {
        title: "Korin narinat ja kolinat",
        body: "Suuren takaluukun, istuinten ja lasikaton liitoskohdat voivat narista. Paikannamme äänen ennen kuin mitään säädetään tai vaihdetaan.",
      },
    ],
    checks: [
      "Renkaiden kuluminen, paineet ja suuntaus",
      "Etupään tukivarret, holkit ja pallonivelet",
      "Jarrusatulat, levyt, palat ja jarrunesteen kosteus",
      "12 V:n akun kunto",
      "Ajoakun tiedot ja vikakoodit",
      "Lämpöpumpun vikakoodit ja raitisilmasuodatin",
      "Takaluukun toiminta ja tiivisteet",
      "Alustan suojat nostimella",
    ],
    winter: [
      { h2: "Model Y Suomen talvessa" },
      {
        p: "Lämpöpumppu tekee Model Y:stä talvella tehokkaan, mutta kovalla pakkasella sekin kuluttaa enemmän. Esilämmitä auto latauksessa ollessa, niin ajoon jää enemmän energiaa. Jos lämmitys heikkenee tai talven toimintamatka putoaa äkillisesti, katso [lämpöpumpun vianhaku](@svc-climate).",
      },
      {
        p: "Korkeampi kori kerää lunta ja suolaa, ja takakamera ja anturit peittyvät helposti. Puhdista ne ennen ajoa. Sähköinen takaluukku kannattaa avata vasta, kun lumet on harjattu pois, jotta mekanismi ei kuormitu.",
      },
      {
        p: "Talvirenkaissa kantavuus on Model Y:lle tärkeä: rengas on valittava auton painon mukaan. Kerromme vaihtoehdot [rengassivulla](@svc-tyres).",
      },
      { h2: "Jos ostat käytetyn Model Y:n" },
      {
        p: "Käytetyssä Model Y:ssä katso renkaiden kulumiskuvio, kuuntele alusta ja tarkista jarrujen kunto. Perheauton käytössä sisätilat ja takaluukku kuluvat, ja lyhyet ajot ruostuttavat jarruja. [Akun kuntoraportti](@battery-report) kertoo ajoakun tilanteen, ja [käytetyn Teslan tarkistuslista](@post-used) auttaa koeajolla. Teemme ostajalle tarkastuksen ja kirjallisen yhteenvedon.",
      },
    ],
    faq: [
      {
        q: "Onko Model Y:ssä ilmajousitus?",
        a: "Ei. Model Y:ssä on teräsjouset. Alustan äänet johtuvat yleensä holkeista, pallonivelistä tai iskunvaimentimista.",
      },
      {
        q: "Kuinka usein Model Y:n renkaat pitää kiertää?",
        a: "Säännöllisesti valmistajan suosituksen mukaan. Suomessa kierto on helppo tehdä kausivaihdon yhteydessä, ja se pidentää renkaiden ikää selvästi.",
      },
      {
        q: "Voiko Model Y:n tuoda viikonlopuksi?",
        a: "Kyllä. Jätä auto meille viikonlopuksi ja hae se valmiina. Lue lisää [viikonloppuhuollosta](@weekend).",
      },
      {
        q: "Tarvitseeko Model Y:n lämpöpumppu huoltoa?",
        a: "Lämpöpumpulla ei ole omaa huoltoväliä. Raitisilmasuodattimet vaihdetaan aikataulun mukaan, ja vikakoodit luetaan, jos lämmitys tai talven toimintamatka muuttuu selvästi.",
      },
      {
        q: "Miksi Model Y:n vetävät renkaat kuluvat nopeammin?",
        a: "Paino ja vääntö kuormittavat vetäviä renkaita eniten, ja alhaiset paineet tai suuntausvirhe nopeuttavat kulumista. Säännöllinen kierto tasaa kulumista akselien välillä.",
      },
    ],
    related: ["svc-tyres", "svc-brakes", "svc-climate", "post-winter"],
  },

  "model-s": {
    seo: {
      title: "Tesla Model S huolto ja ilmajousitus Helsingissä",
      description:
        "Tesla Model S:n ilmajousitus, alusta, 12 V ja elektroniikka. Myös vanhemmat Model S -autot. Riippumaton Tesla-korjaamo Tattarisuolla, Helsingissä.",
    },
    name: "Model S",
    h1: "Tesla Model S:n huolto ja korjaus",
    lead: "Model S on Teslan pitkäikäisin malli, ja Suomessa ajetaan yhä yli kymmenen vuotta vanhoja yksilöitä. Iän myötä huoltokohteet siirtyvät ilmajousitukseen, alustan osiin ja sähköjärjestelmiin. Teemme vianhaun järjestelmällisesti ja kerromme rehellisesti, mikä kannattaa korjata.",
    intro: [
      {
        p: "Model S:n tekniikka on muuttunut vuosien varrella paljon: takavetoisista nelivetoisiin, alkuperäisestä keskusyksiköstä uudempiin ja aina vuoden 2021 uudistukseen asti. Siksi vianhaku alkaa auton tarkasta versiosta ja varustelusta. Saman nimen alla on käytännössä useita erilaisia autoja.",
      },
      {
        p: "Vanhemman Model S:n omistajalle riippumaton korjaamo on usein järkevä vaihtoehto, kun takuu on päättynyt. Kerromme jokaisesta löydöksestä, kuinka kiireellinen se on, jotta voit suunnitella korjaukset.",
      },
      { p: WARRANTY_FI },
    ],
    issues: [
      {
        title: "Ilmajousituksen vuodot",
        body: "Laskeutuva kulma, pitkään käyvä kompressori tai jousituksen varoitus. Vuoto on yleensä jousessa, letkussa tai venttiilikotelossa.",
      },
      {
        title: "Tukivarret ja holkit",
        body: "Raskas auto kuluttaa etu- ja taka-alustan holkkeja. Ääni kuuluu kolahduksena tai tuntuu epätarkkuutena ohjauksessa.",
      },
      {
        title: "Keskusyksikkö ja näyttö",
        body: "Vanhemmissa autoissa keskusyksikön muistin kuluminen voi aiheuttaa hitautta ja näytön uudelleenkäynnistyksiä. Tarkistamme, onko yksikkö päivitetty tai korjattu.",
      },
      {
        title: "Esiin nousevat ovenkahvat",
        body: "Vanhemman Model S:n moottoroidut kahvat ovat tunnettu kulumiskohde. Vika voi olla mekanismissa, kytkimessä tai johdotuksessa.",
      },
      {
        title: "12 V:n akku",
        body: "Vanhemmissa autoissa lyijyakku, vuoden 2021 uudistuksesta alkaen litiumioniakku. Heikkenevä akku aiheuttaa satunnaisia vikoja.",
      },
    ],
    checks: [
      "Ilmajousituksen tiiviys, kompressori ja korkeusanturit",
      "Tukivarret, holkit, pallonivelet ja iskunvaimentimet",
      "12 V:n akun kunto ja tyyppi",
      "Ajoakun tiedot ja vikakoodit",
      "Keskusyksikön versio ja toiminta",
      "Ovenkahvojen toiminta",
      "Jarrut ja jarrunesteen kosteus",
      "Alustan ja akkukotelon suojat nostimella",
    ],
    winter: [
      { h2: "Model S Suomen talvessa" },
      {
        p: "Ilmajousituksen kumiosat kovettuvat pakkasella, ja pienet vuodot pahenevat. Jos auto on seissyt kylmässä, katso aamulla, että korkeus on ennallaan. Laskeutunut kulma kertoo vuodosta ajoissa.",
      },
      {
        p: "Vanhemmissa Model S -autoissa ei ole lämpöpumppua, joten matkustamon ja akun lämmitys vie talvella enemmän energiaa. Esilämmitys latauksessa ollessa on tässä mallissa erityisen hyödyllinen.",
      },
      {
        p: "Esiin nousevat kahvat voivat jäätyä paikoilleen. Älä väännä jäätynyttä kahvaa, vaan sulata se esilämmityksellä. Toistuva vika kannattaa korjata ennen kovia pakkasia.",
      },
      { h2: "Jos ostat vanhemman Model S:n" },
      {
        p: "Vanhaa Model S:ää ostaessa tärkeimmät kysymykset ovat ajoakun kunto, ilmajousituksen tiiviys, keskusyksikön versio ja ovenkahvojen toiminta. Pyydä myyjältä huoltohistoria ja tieto tehdyistä päivityksistä ja korjauksista. Teemme ostajalle tarkastuksen, jossa käymme nämä kohdat läpi ja kirjaamme löydökset, jotta tiedät ennen kauppaa, mitä autoon on lähivuosina tulossa.",
      },
    ],
    faq: [
      {
        q: "Kannattaako vanhaa Model S:ää korjata?",
        a: "Usein kyllä, mutta ratkaisu riippuu ajoakun kunnosta ja korjauksen laajuudesta. Kerromme rehellisesti, mitkä korjaukset ovat järkeviä auton kuntoon nähden. [Akun kuntoraportti](@battery-report) auttaa päätöksessä.",
      },
      {
        q: "Saako vanhaan Model S:ään vielä osia?",
        a: "Useimpiin kulutusosiin saa osia, mutta joidenkin osien saatavuus vaihtelee. Selvitämme saatavuuden ennen kuin annamme arvion.",
      },
      {
        q: "Nostetaanko Model S nostimelle jollain erityisellä tavalla?",
        a: "Ilmajousitettu Model S nostetaan nostotilassa (jack mode), jotta jousitus ei yritä säätää korkeutta. Teemme tämän aina.",
      },
      {
        q: "Mistä tiedän, onko keskusyksikkö päivitetty?",
        a: "Laitteistotieto näkyy auton ohjelmistotiedoissa, ja huoltohistoria kertoo tehdyt työt. Tarkistamme asian käynnin yhteydessä ja kerromme, mitä se tarkoittaa autosi kannalta.",
      },
      {
        q: "Voiko Model S:n ajoakun kunnon tarkistaa ennen ostoa?",
        a: "Kyllä. [Akun kuntoraportti](@battery-report) kertoo ajoakun kunnon järjestelmän tiedoista ja mittauksista, ja se on hyödyllinen erityisesti vanhemman auton kaupassa.",
      },
    ],
    related: ["svc-suspension", "svc-electrical", "battery-report", "post-air"],
  },

  "model-x": {
    seo: {
      title: "Tesla Model X huolto ja korjaus Helsingissä",
      description:
        "Tesla Model X:n ilmajousitus, takaovet, tiivisteet ja alusta. Tyypilliset viat ja talven huomiot. Riippumaton Tesla-korjaamo Tattarisuolla, Helsingissä.",
    },
    name: "Model X",
    h1: "Tesla Model X:n huolto ja korjaus",
    lead: "Model X on Teslan raskain ja monimutkaisin malli: ilmajousitus vakiona, ylöspäin aukeavat takaovet ja suuri tuulilasi. Monimutkaisuus näkyy huoltokohteissa, ja niiden kanssa auttaa järjestelmällinen vianhaku.",
    intro: [
      {
        p: "Model X tuli markkinoille vuonna 2015, ja se uudistettiin vuonna 2021. Siinä on aina ilmajousitus. Takaovissa on omat anturinsa, moottorinsa ja tiivisteensä, joten ovien viat ovat tässä mallissa oma lukunsa. Paino kuormittaa myös renkaita, jarruja ja alustan holkkeja.",
      },
      {
        p: "Kerromme jokaisesta löydöksestä, kuinka kiireellinen se on. Jos vika vaatii osan, jota vain valmistaja toimittaa, kerromme sen suoraan ennen kuin sitoudut mihinkään.",
      },
      { p: WARRANTY_FI },
    ],
    issues: [
      {
        title: "Ilmajousitus",
        body: "Laskeutuva kulma, pitkään käyvä kompressori tai jousituksen varoitus. Model X:n paino kuormittaa järjestelmää, ja vuodot kannattaa korjata ajoissa.",
      },
      {
        title: "Takaovien anturit ja mekanismi",
        body: "Ovi voi pysähtyä kesken liikkeen, ilmoittaa esteestä tai jäädä auki. Syy voi olla anturissa, saranassa, säädössä tai johdotuksessa.",
      },
      {
        title: "Tiivisteet ja vesivuodot",
        body: "Ovien ja korin tiivisteet voivat päästää vettä sisään, jos ne ovat vaurioituneet, likaiset tai väärin säädetyt.",
      },
      {
        title: "Alustan holkit ja tukivarret",
        body: "Raskas auto kuluttaa holkkeja, ja ääni kuuluu kolahduksena tai narinana.",
      },
      {
        title: "Renkaiden ja jarrujen kuluminen",
        body: "Paino kuluttaa renkaita, ja jarrut ruostuvat samalla tavalla kuin muissakin sähköautoissa.",
      },
    ],
    checks: [
      "Ilmajousituksen tiiviys, kompressori ja korkeusanturit",
      "Takaovien anturit, saranat ja tiivisteet",
      "Ovien ja korin vesitiiviys",
      "Tukivarret, holkit ja iskunvaimentimet",
      "Renkaiden kuluminen ja suuntaus",
      "Jarrut ja jarrunesteen kosteus",
      "12 V:n akun kunto",
      "Ajoakun tiedot ja vikakoodit",
    ],
    winter: [
      { h2: "Model X Suomen talvessa" },
      {
        p: "Harjaa lumi takaovien päältä ennen niiden avaamista. Ovet tunnistavat esteitä, mutta jää ja raskas lumikuorma kuormittavat mekanismia ja tiivisteitä. Jos ovi alkaa toimia epävarmasti pakkasella, varaa tarkastus ennen kuin vika pahenee.",
      },
      {
        p: "Ilmajousituksen kumiosat kovettuvat pakkasella, ja pienet vuodot tulevat esiin. Seuraa korkeutta aamuisin, kun auto on seissyt yön kylmässä.",
      },
      {
        p: "Raskas auto tarvitsee talvirenkaan, jonka kantavuus vastaa auton vaatimuksia. Lue lisää [renkaista ja suuntauksesta](@svc-tyres).",
      },
      { h2: "Jos ostat käytetyn Model X:n" },
      {
        p: "Käytettyä Model X:ää ostaessa kokeile jokaista ovea useaan kertaan, katso tiivisteet ja mahdolliset kosteusjäljet sisällä, kuuntele alusta koeajolla ja seuraa korkeutta yön yli. Ajoakun kunto ja jousituksen tiiviys ovat suurimmat mahdolliset yllätykset, joten ne kannattaa selvittää ennen kauppaa. Teemme ostajalle tarkastuksen ja kirjallisen yhteenvedon löydöksistä.",
      },
      {
        p: "Pyydä myyjältä myös huoltohistoria ja tieto siitä, onko ovien mekanismeja tai jousitusta korjattu. Tehdyt korjaukset eivät ole huono merkki, kun ne on dokumentoitu.",
      },
    ],
    faq: [
      {
        q: "Korjaatteko Model X:n takaovia?",
        a: "Teemme vianhaun sekä anturien, säätöjen ja tiivisteiden työt. Jos vika vaatii osan, jota vain valmistaja toimittaa, kerromme sen.",
      },
      {
        q: "Miksi Model X kuluttaa renkaita?",
        a: "Paino ja vääntö kuormittavat renkaita, ja kulunut alusta tai suuntausvirhe nopeuttaa kulumista. Kulumiskuvio kertoo syyn.",
      },
      {
        q: "Onko kaikissa Model X -autoissa ilmajousitus?",
        a: "Kyllä. Siksi auto nostetaan aina nostotilassa, ja jousitus tarkistetaan jokaisella käynnillä.",
      },
      {
        q: "Miksi Model X:n sisälle tulee vettä?",
        a: "Yleensä syy on vaurioitunut tai likainen tiiviste tai ovien säätö. Paikannamme vuodon vedellä ja korjaamme tiivisteen tai säädön. Kosteus kannattaa hoitaa nopeasti, koska se voi vaurioittaa johdotusta.",
      },
      {
        q: "Voinko jättää Model X:n viikonlopuksi?",
        a: "Kyllä. Monet alusta-, rengas- ja jarrutyöt voi tehdä viikonlopun aikana, kun osat ovat saatavilla. Lue lisää [viikonloppuhuollosta](@weekend).",
      },
    ],
    related: ["svc-suspension", "svc-electrical", "svc-tyres", "post-air"],
  },
};

const EN: Record<ModelId, ModelContent> = {
  "model-3": {
    seo: {
      title: "Tesla Model 3 service and repair in Helsinki",
      description:
        "Common Tesla Model 3 faults, what we check and what Finnish winters do to the car. Independent Tesla garage in Tattarisuo, Helsinki. Estimate before work.",
    },
    name: "Model 3",
    h1: "Tesla Model 3 service and repair",
    lead: "The Model 3 is a common Tesla on Finnish roads, and its typical service items are well known. This page covers the faults that come up again and again, what we check and what a Finnish winter does to this car.",
    intro: [
      {
        p: "The Model 3 arrived in Europe in 2019 and has since been updated. Technically it is simpler than the Model S and Model X: it uses steel springs, and the service items have more to do with the suspension, brakes and tyres than with the powertrain. Many Model 3s are used as company or ride-hailing cars and cover distance quickly, so wear parts come up earlier than you might expect.",
      },
      {
        p: "Tesla has no traditional annual service, but the manufacturer's maintenance schedule does list recurring items. We combine them into one visit so the car is not off the road more often than it needs to be.",
      },
      { p: WARRANTY_EN },
    ],
    issues: [
      {
        title: "Front end creaks and knocks",
        body: "The bushings and ball joints of the front upper control arms wear and start to creak or knock, especially in frost and over speed bumps. The usual repair is replacing the arms in pairs.",
      },
      {
        title: "12 V battery warning",
        body: "Older cars have a lead-acid battery that can weaken within a few years; newer ones have a lithium-ion battery. Either way, deal with the warning before the car is left stranded.",
      },
      {
        title: "Corroded, sticking rear brakes",
        body: "Regenerative braking leaves the friction brakes little to do, and salt corrodes them. A caliper service once a year prevents the problem.",
      },
      {
        title: "Door handles and windows in winter",
        body: "The flush handles and frameless windows freeze easily. Preconditioning helps, but a fault that persists once thawed can be the handle mechanism or window adjustment.",
      },
      {
        title: "Uneven tyre wear",
        body: "Strong acceleration wears the driven tyres, and a worn bushing or alignment error eats the inner edge. Regular rotation and correct pressures even out the wear.",
      },
    ],
    checks: [
      "12 V battery condition and type",
      "High-voltage battery data and fault codes",
      "Front control arms, bushings and ball joints",
      "Calipers, discs, pads and brake fluid moisture",
      "Tyre wear, pressures and alignment",
      "Cabin air filter",
      "Charge port latch and flap",
      "Underbody and battery shields, on the lift",
    ],
    winter: [
      { h2: "The Model 3 in a Finnish winter" },
      {
        p: "The Model 3's flush door handles and frameless windows are sensitive to ice. The window drops slightly when the door opens, and when frozen it can stick. Preconditioning from the app before you leave thaws the handles and windows and warms the battery at the same time.",
      },
      {
        p: "A cold battery limits regenerative braking and charging speed. That is normal, and it improves as the battery warms. When driving to a fast charger, use the car's own navigation so the battery is preconditioned before charging.",
      },
      {
        p: "Salt and grit wear the underbody and the brakes. Wash the car underneath in winter too, and have the brakes checked in spring. Winter tyres need to be in good condition, because a heavy car with instant torque wears them faster than many people expect.",
      },
      { h2: "Buying a used Model 3" },
      {
        p: "On a used Model 3, check the battery's condition, the front suspension, brake corrosion and tyre wear. Ask whether the car has been used for ride-hailing, because high mileage wears the suspension. We do pre-purchase inspections with a written summary. See also the [used Tesla buying checklist](@post-used).",
      },
    ],
    faq: [
      {
        q: "How often does a Model 3 need servicing?",
        a: "Tesla has no fixed annual service like a combustion car. The manufacturer's schedule still has recurring items, such as brake service on salted roads, brake fluid checks, cabin filters and tyre rotation.",
      },
      {
        q: "Is a Model 3 a good fit for weekend service?",
        a: "Often, yes. Many brake, suspension and tyre jobs can be done over a weekend when the parts are available. Read more about [weekend service](@weekend).",
      },
      {
        q: "Why does my Model 3's front end creak in frost?",
        a: "Cold hardens the control arm rubber bushings, and worn bushings creak more easily then. We locate the noise before replacing parts.",
      },
    ],
    related: ["svc-suspension", "svc-brakes", "svc-battery", "post-used"],
  },

  "model-y": {
    seo: {
      title: "Tesla Model Y service and repair in Helsinki",
      description:
        "Tesla Model Y tyres, suspension, brakes and heat pump. Common faults and winter notes. Independent Tesla garage in Tattarisuo, Helsinki.",
    },
    name: "Model Y",
    h1: "Tesla Model Y service and repair",
    lead: "The Model Y is the roomier, heavier sibling of the Model 3, and much of the technology is shared. The weight and the taller body do show, though, in the tyres, suspension and brakes. Here is what we check and what to expect.",
    intro: [
      {
        p: "The Model Y arrived in Europe in 2021 and is also built in Europe. It has had a heat pump from the start and uses steel springs, not air suspension. As a family car it often does short trips, which is easy on the battery and hard on the brakes: the friction brakes see little use and corrode.",
      },
      {
        p: "Many Model Y service items are the same as on the Model 3, so experience with one helps with the other. We combine the manufacturer's maintenance items into one visit.",
      },
      { p: WARRANTY_EN },
    ],
    issues: [
      {
        title: "Fast tyre wear",
        body: "Weight and torque wear tyres faster than many owners expect, especially with low pressures or an alignment error. The wear pattern tells us the cause.",
      },
      {
        title: "Front end noises",
        body: "Control arm bushings and ball joints wear in the same way as on the Model 3. The noise shows up over speed bumps and rough roads.",
      },
      {
        title: "Corroded brakes",
        body: "On short trips regenerative braking does almost everything and the discs corrode. A yearly caliper service prevents sticking.",
      },
      {
        title: "12 V battery",
        body: "A weakening low-voltage battery shows up as random warnings before the car is stranded. Deal with the warning straight away.",
      },
      {
        title: "Body creaks and rattles",
        body: "The joints around the large tailgate, the seats and the glass roof can creak. We locate the noise before anything is adjusted or replaced.",
      },
    ],
    checks: [
      "Tyre wear, pressures and alignment",
      "Front control arms, bushings and ball joints",
      "Calipers, discs, pads and brake fluid moisture",
      "12 V battery condition",
      "High-voltage battery data and fault codes",
      "Heat pump fault codes and cabin air filter",
      "Tailgate operation and seals",
      "Underbody shields, on the lift",
    ],
    winter: [
      { h2: "The Model Y in a Finnish winter" },
      {
        p: "The heat pump makes the Model Y efficient in winter, but in hard frost it still uses more energy. Precondition the car while it is plugged in and more energy is left for driving. If the heating weakens or winter range drops suddenly, see [heat pump diagnosis](@svc-climate).",
      },
      {
        p: "The taller body collects snow and salt, and the rear camera and sensors are easily covered. Clean them before you drive. Open the powered tailgate only after brushing the snow off, so the mechanism is not overloaded.",
      },
      {
        p: "Load capacity matters in winter tyres for the Model Y: the tyre must match the car's weight. We explain the options on the [tyres page](@svc-tyres).",
      },
      { h2: "Buying a used Model Y" },
      {
        p: "On a used Model Y, look at the tyre wear pattern, listen to the suspension and check the brakes. Family use wears the interior and the tailgate, and short trips corrode the brakes. A [battery health report](@battery-report) shows the condition of the pack, and the [used Tesla buying checklist](@post-used) helps on the test drive. We do pre-purchase inspections with a written summary.",
      },
    ],
    faq: [
      {
        q: "Does the Model Y have air suspension?",
        a: "No. The Model Y uses steel springs. Suspension noises usually come from bushings, ball joints or dampers.",
      },
      {
        q: "How often should Model Y tyres be rotated?",
        a: "Regularly, following the manufacturer's recommendation. In Finland it is easy to rotate them at the seasonal change, and it noticeably extends tyre life.",
      },
      {
        q: "Can I leave my Model Y over the weekend?",
        a: "Yes. Leave it with us for the weekend and collect it finished. Read more about [weekend service](@weekend).",
      },
      {
        q: "Does the Model Y heat pump need servicing?",
        a: "The heat pump has no service interval of its own. Cabin filters are replaced on schedule, and fault codes are read if heating or winter range changes noticeably.",
      },
      {
        q: "Why do the driven tyres on a Model Y wear faster?",
        a: "Weight and torque load the driven tyres most, and low pressures or an alignment error speed up wear. Regular rotation evens out wear between the axles.",
      },
    ],
    related: ["svc-tyres", "svc-brakes", "svc-climate", "post-winter"],
  },

  "model-s": {
    seo: {
      title: "Tesla Model S service and air suspension in Helsinki",
      description:
        "Tesla Model S air suspension, chassis, 12 V and electronics, including older cars. Independent Tesla garage in Tattarisuo, Helsinki.",
    },
    name: "Model S",
    h1: "Tesla Model S service and repair",
    lead: "The Model S is Tesla's longest-running model, and cars more than ten years old are still on Finnish roads. With age the service items shift towards the air suspension, chassis parts and electrical systems. We diagnose methodically and tell you honestly what is worth repairing.",
    intro: [
      {
        p: "The Model S has changed a great deal over the years: from rear-wheel drive to all-wheel drive, from the original media control unit to newer ones, and on to the 2021 update. So diagnosis starts with the exact version and specification of the car. In practice, several quite different cars share the same name.",
      },
      {
        p: "For the owner of an older Model S, an independent garage is often the sensible choice once the warranty has ended. For every finding we tell you how urgent it is, so you can plan the repairs.",
      },
      { p: WARRANTY_EN },
    ],
    issues: [
      {
        title: "Air suspension leaks",
        body: "A corner that drops, a compressor that runs for long periods, or a suspension warning. The leak is usually in a spring, a line or the valve block.",
      },
      {
        title: "Control arms and bushings",
        body: "A heavy car wears front and rear suspension bushings. You hear a knock or feel vagueness in the steering.",
      },
      {
        title: "Media control unit and screen",
        body: "On older cars, wear in the media control unit's memory can cause slowness and screen reboots. We check whether the unit has been upgraded or repaired.",
      },
      {
        title: "Presenting door handles",
        body: "The motorised handles on older Model S cars are a known wear item. The fault can be the mechanism, a switch or the wiring.",
      },
      {
        title: "12 V battery",
        body: "Older cars use lead-acid, and cars from the 2021 update onwards use lithium-ion. A weakening battery causes random faults.",
      },
    ],
    checks: [
      "Air suspension integrity, compressor and height sensors",
      "Control arms, bushings, ball joints and dampers",
      "12 V battery condition and type",
      "High-voltage battery data and fault codes",
      "Media control unit version and operation",
      "Door handle operation",
      "Brakes and brake fluid moisture",
      "Underbody and battery shields, on the lift",
    ],
    winter: [
      { h2: "The Model S in a Finnish winter" },
      {
        p: "Air suspension rubber hardens in frost and small leaks get worse. If the car has stood in the cold, check in the morning that the ride height has not changed. A dropped corner is an early warning of a leak.",
      },
      {
        p: "Older Model S cars have no heat pump, so heating the cabin and the battery uses more energy in winter. Preconditioning while plugged in is especially useful on this model.",
      },
      {
        p: "Presenting handles can freeze in place. Do not force a frozen handle; thaw it with preconditioning. A fault that keeps returning is worth fixing before the hard frosts.",
      },
      { h2: "Buying an older Model S" },
      {
        p: "When buying an older Model S, the key questions are the battery's condition, the air suspension's integrity, the media control unit version and the door handles. Ask the seller for the service history and details of updates and repairs. We do pre-purchase inspections that cover these points and record the findings, so you know before you buy what the car is likely to need in the next few years.",
      },
    ],
    faq: [
      {
        q: "Is an older Model S worth repairing?",
        a: "Often, yes, but it depends on the battery's condition and the size of the repair. We tell you honestly which repairs make sense for the car's condition. A [battery health report](@battery-report) helps with the decision.",
      },
      {
        q: "Are parts still available for older Model S cars?",
        a: "Most wear parts are available, but availability of some parts varies. We check availability before we give you an estimate.",
      },
      {
        q: "Does a Model S need lifting in a particular way?",
        a: "A Model S with air suspension is lifted in jack mode so the suspension does not try to adjust ride height. We always do this.",
      },
      {
        q: "How do I know whether the media control unit has been upgraded?",
        a: "The hardware details are shown in the car's software information, and the service history records the work done. We check it during a visit and explain what it means for your car.",
      },
      {
        q: "Can I check a Model S battery before buying?",
        a: "Yes. A [battery health report](@battery-report) shows the pack's condition from system data and measurements, and it is especially useful when buying an older car.",
      },
    ],
    related: ["svc-suspension", "svc-electrical", "battery-report", "post-air"],
  },

  "model-x": {
    seo: {
      title: "Tesla Model X service and repair in Helsinki",
      description:
        "Tesla Model X air suspension, rear doors, seals and chassis. Common faults and winter notes. Independent Tesla garage in Tattarisuo, Helsinki.",
    },
    name: "Model X",
    h1: "Tesla Model X service and repair",
    lead: "The Model X is Tesla's heaviest and most complex model: air suspension as standard, upward-opening rear doors and a large windscreen. The complexity shows in the service items, and a methodical diagnosis is what helps.",
    intro: [
      {
        p: "The Model X was launched in 2015 and updated in 2021. It always has air suspension. The rear doors have their own sensors, motors and seals, so door faults are a chapter of their own on this model. The weight also loads the tyres, brakes and suspension bushings.",
      },
      {
        p: "For every finding we tell you how urgent it is. If a fault needs a part that only the manufacturer supplies, we say so before you commit to anything.",
      },
      { p: WARRANTY_EN },
    ],
    issues: [
      {
        title: "Air suspension",
        body: "A dropped corner, a compressor that runs for long periods, or a suspension warning. The Model X's weight loads the system, and leaks are worth fixing early.",
      },
      {
        title: "Rear door sensors and mechanism",
        body: "A door can stop mid-travel, report an obstacle or stay open. The cause can be a sensor, a hinge, adjustment or wiring.",
      },
      {
        title: "Seals and water leaks",
        body: "Door and body seals can let water in if they are damaged, dirty or out of adjustment.",
      },
      {
        title: "Suspension bushings and control arms",
        body: "A heavy car wears bushings, and you hear it as a knock or a creak.",
      },
      {
        title: "Tyre and brake wear",
        body: "The weight wears tyres, and the brakes corrode just as on any other EV.",
      },
    ],
    checks: [
      "Air suspension integrity, compressor and height sensors",
      "Rear door sensors, hinges and seals",
      "Door and body water tightness",
      "Control arms, bushings and dampers",
      "Tyre wear and alignment",
      "Brakes and brake fluid moisture",
      "12 V battery condition",
      "High-voltage battery data and fault codes",
    ],
    winter: [
      { h2: "The Model X in a Finnish winter" },
      {
        p: "Brush the snow off the rear doors before opening them. The doors detect obstacles, but ice and a heavy load of snow strain the mechanism and the seals. If a door starts behaving unreliably in frost, book a check before the fault gets worse.",
      },
      {
        p: "Air suspension rubber hardens in frost and small leaks show up. Keep an eye on the ride height in the morning after the car has stood out overnight.",
      },
      {
        p: "A heavy car needs a winter tyre whose load capacity meets the car's requirements. Read more on [tyres and alignment](@svc-tyres).",
      },
      { h2: "Buying a used Model X" },
      {
        p: "When buying a used Model X, operate every door several times, look at the seals and for any signs of damp inside, listen to the suspension on a test drive and watch the ride height overnight. The battery's condition and the suspension's integrity are the biggest potential surprises, so find out about them before you buy. We do pre-purchase inspections with a written summary of the findings.",
      },
      {
        p: "Ask the seller for the service history too, and whether the door mechanisms or suspension have been repaired. Past repairs are not a bad sign when they are documented.",
      },
    ],
    faq: [
      {
        q: "Do you repair Model X rear doors?",
        a: "We diagnose them and do sensor, adjustment and seal work. If the fault needs a part that only the manufacturer supplies, we tell you.",
      },
      {
        q: "Why does a Model X wear tyres quickly?",
        a: "Weight and torque load the tyres, and worn suspension or an alignment error speeds up wear. The wear pattern shows the cause.",
      },
      {
        q: "Does every Model X have air suspension?",
        a: "Yes. That is why the car is always lifted in jack mode, and the suspension is checked on every visit.",
      },
      {
        q: "Why is water getting into my Model X?",
        a: "Usually a damaged or dirty seal, or door adjustment. We find the leak with water and repair the seal or the adjustment. Deal with damp quickly, because it can damage wiring.",
      },
      {
        q: "Can I leave my Model X over a weekend?",
        a: "Yes. Many suspension, tyre and brake jobs can be done over a weekend when the parts are available. Read more about [weekend service](@weekend).",
      },
    ],
    related: ["svc-suspension", "svc-electrical", "svc-tyres", "post-air"],
  },
};

export const MODELS: Record<Lang, Record<ModelId, ModelContent>> = { fi: FI, en: EN };
