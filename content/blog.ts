import type { Lang } from "@/site.config";
import type { BlogPostId } from "@/lib/routes";
import type { BlogContent } from "./types";

/**
 * Starter articles. Practical and general: no statistics, no failure rates,
 * no claims about the shop beyond what the rest of the site states.
 * FINNISH NEEDS HUMAN REVIEW.
 */

const PUBLISHED = "2026-10-22";

const FI: Record<BlogPostId, BlogContent> = {
  "post-winter": {
    seo: {
      title: "Tesla talvella Suomessa: esilämmitys, lataus, renkaat ja jarrut",
      description:
        "Käytännön ohjeet Teslan omistajalle Suomen talveen: esilämmitys, lataus pakkasella, talvirenkaat, jarrujen ruoste, jäätyvät kahvat ja pitkä pysäköinti.",
    },
    title: "Tesla talvella Suomessa: näin pidät auton kunnossa pakkasella",
    dek: "Esilämmitys, lataus, renkaat, jarrut ja jäätyvät kahvat. Käytännön ohjeet, jotka säästävät akkua, hermoja ja korjauksia.",
    published: PUBLISHED,
    readMinutes: 5,
    body: [
      {
        p: "Tesla toimii hyvin Suomen talvessa, kun sitä käyttää talven ehdoilla. Suurin osa talven harmeista johtuu kylmästä akusta, jäästä ja suolasta, ja niihin kaikkiin on yksinkertainen vastalääke.",
      },
      { h2: "Esilämmitä, kun auto on latauksessa" },
      {
        p: "Esilämmitys sovelluksesta lämmittää matkustamon, sulattaa ikkunat ja kahvat ja lämmittää akkua. Kun auto on samalla kiinni latauksessa, energia tulee verkosta eikä akusta. Ajasta lähtöaika auton asetuksiin, niin auto hoitaa esilämmityksen ja latauksen valmiiksi lähtöhetkeen.",
      },
      { h2: "Lataus pakkasella" },
      {
        p: "Kylmä akku ottaa latausta vastaan hitaammin, ja regeneratiivinen jarrutus on rajoitettu, kunnes akku lämpenee. Ajotietokone näyttää rajoituksen, ja se on normaalia. Kun ajat pikalaturille, valitse laturi auton omasta navigaattorista. Auto lämmittää silloin akun valmiiksi ja lataus on nopeampaa.",
      },
      {
        p: "Jos auto seisoo pitkään pakkasessa, jätä se mieluummin lataukseen kuin lähes tyhjäksi. Tarkista latausrajan suositus käyttöohjeesta.",
      },
      { h2: "Renkaat ja rengaspaineet" },
      {
        p: "Talvirenkaat ovat pakolliset joulukuusta helmikuun loppuun, ja niiden urasyvyyden on oltava vähintään 3 millimetriä. Paine laskee lämpötilan mukana, joten tarkista paineet aina, kun pakkanen kiristyy. Oikea paine löytyy kuljettajan oven pilarista. Raskas auto ja välitön vääntö kuluttavat renkaita, joten kiertäminen kausivaihdon yhteydessä kannattaa.",
      },
      { h2: "Jarrut ja suola" },
      {
        p: "Regeneratiivinen jarrutus tekee suurimman osan hidastuksista, joten kitkajarruja käytetään vähän. Suola ja kosteus ruostuttavat levyt ja jumittavat satulat. Jarruta silloin tällöin turvallisessa paikassa reippaasti, ja teetä [jarrusatuloiden huolto](@svc-brakes) keväällä suolakauden jälkeen.",
      },
      { h2: "Kahvat, ikkunat ja latausportti" },
      {
        p: "Älä väännä jäätynyttä kahvaa tai ovea. Esilämmitys sulattaa jään yleensä muutamassa minuutissa. Latausportin salvan voi sulattaa sovelluksen sulatustoiminnolla. Jos kahva tai salpa jumittuu toistuvasti myös sulana, vika on mekanismissa ja se kannattaa korjata ennen kovia pakkasia.",
      },
      { h2: "Pitkä pysäköinti" },
      {
        p: "Valvontatila kuluttaa energiaa, joten kytke se pois, jos auto seisoo pitkään eikä se ole tarpeen. Jätä auto lataukseen, jos mahdollista. Pitkän seisonnan jälkeen 12 V:n akun heikkous näkyy usein ensimmäisenä, joten varoitukset kannattaa ottaa vakavasti. Lue lisää [12 V:n akun varoitusmerkeistä](@post-12v).",
      },
      { h2: "Kevään tarkistuslista" },
      {
        ul: [
          "Pese auto myös alta suolan jäljiltä.",
          "Teetä jarrusatuloiden puhdistus ja voitelu.",
          "Vaihda renkaat ja kierrä ne samalla.",
          "Tarkistuta suuntaus kuoppakauden jälkeen, jos auto vetää sivulle.",
          "Vaihda raitisilmasuodatin, jos ilmavirta on heikentynyt.",
        ],
      },
      { note: "Kaikki nämä työt voi yhdistää yhteen käyntiin. Kiireiselle sopii [viikonloppuhuolto](@weekend)." },
    ],
    related: ["svc-brakes", "svc-tyres", "svc-battery", "weekend"],
  },

  "post-12v": {
    seo: {
      title: "Teslan 12 V:n akun varoitusmerkit ja vaihto",
      description:
        "Mistä tunnistaa heikkenevän 12 V:n akun Teslassa, mitä varoitus tarkoittaa, mitä tehdä jos auto ei herää ja miten akku vaihdetaan.",
    },
    title: "Teslan 12 V:n akku: varoitusmerkit ja mitä tehdä",
    dek: "Pieni akku, iso vaikutus. Heikko 12 V:n akku on yleisin syy siihen, ettei Tesla herää. Näin tunnistat merkit ajoissa.",
    published: PUBLISHED,
    readMinutes: 4,
    body: [
      {
        p: "Teslassa on suuren ajoakun lisäksi pieni pienjänniteakku. Se pitää yllä lukitukset, näytön, ohjausyksiköt ja ajoakun kytkennän silloin, kun ajoakku on irti järjestelmästä. Kun pieni akku heikkenee, auto ei välttämättä herää, vaikka ajoakussa on energiaa jäljellä.",
      },
      { h2: "Lyijyakku vai litiumioniakku" },
      {
        p: "Vanhemmissa Teslaissa on lyijyakku, uudemmissa litiumioniakku. Litiumioniakku kestää yleensä pidempään, mutta sekin voi heiketä. Akun tyyppi vaikuttaa siihen, miten se testataan ja vaihdetaan, joten tarkistamme sen aina ensin.",
      },
      { h2: "Varoitusmerkit" },
      {
        ul: [
          "Auto ilmoittaa, että pienjänniteakku pitää huoltaa tai vaihtaa.",
          "Auto herää hitaasti tai puhelinavain ei toimi.",
          "Näyttö käynnistyy uudelleen tai satunnaisia varoituksia ilmestyy ilman syytä.",
          "Ovet eivät aukea tai kahvat eivät reagoi.",
          "Auto ei kytke ajovalmiutta, vaikka näyttö toimii.",
        ],
      },
      {
        p: "Varoitus kannattaa ottaa vakavasti, vaikka auto toimisi vielä normaalisti. Akku voi pettää ilman uutta ilmoitusta, ja silloin auto jää seisomaan siihen, missä se on.",
      },
      { h2: "Jos auto ei herää" },
      {
        p: "Käyttöohjeessa on ohje siihen, miten auto avataan ja miten 12 V:n järjestelmään voi syöttää virtaa, jos akku on tyhjä. Noudata ohjetta tarkasti, koska väärin kytketty apukäynnistys voi vaurioittaa elektroniikkaa. Jos et ole varma, soita meille ennen kuin yrität.",
      },
      { h2: "Miten vaihto tehdään" },
      {
        p: "Varmistamme ensin, että vika on akussa eikä sen latauspiirissä. Jos akku on heikko, vaihdamme sen valmistajan ohjeen mukaisessa järjestyksessä, jotta auton järjestelmät eivät jää virhetilaan. Vaihdon jälkeen luemme vikakoodit ja varmistamme, ettei mitään jäänyt päälle. Vaihto on yleensä nopea työ, kun syy on varmistettu.",
      },
      { h2: "Talvi pahentaa tilannetta" },
      {
        p: "Kylmä heikentää akun kykyä antaa virtaa, joten heikko akku paljastuu usein ensimmäisillä pakkasilla. Jos auto on varoittanut akusta syksyllä, vaihto kannattaa tehdä ennen talvea.",
      },
      { note: "Katso myös [akku ja lataus](@svc-battery) ja [sähköviat](@svc-electrical)." },
    ],
    related: ["svc-battery", "svc-electrical", "post-winter", "offer"],
  },

  "post-brakes": {
    seo: {
      title: "Jarrujen huolto sähköautossa: miksi regenerointi ruostuttaa jarruja",
      description:
        "Regeneratiivinen jarrutus säästää jarrupaloja mutta ruostuttaa levyjä ja jumittaa satuloita. Näin huollat sähköauton jarrut Suomen oloissa.",
    },
    title: "Jarrujen huolto, kun auto jarruttaa enimmäkseen moottorilla",
    dek: "Regeneratiivinen jarrutus säästää paloja, mutta suolatiellä jarrut ruostuvat ja jumittuvat. Näin pidät ne kunnossa.",
    published: PUBLISHED,
    readMinutes: 4,
    body: [
      {
        p: "Sähköauto hidastaa suurimman osan ajasta moottorilla, joka samalla lataa akkua. Kitkajarruja tarvitaan vain kovissa jarrutuksissa ja aivan pysähtymisen lopussa. Se kuulostaa hyvältä, ja paloille se onkin. Jarrujärjestelmälle kokonaisuutena vähäinen käyttö on kuitenkin ongelma.",
      },
      { h2: "Mitä käyttämättömille jarruille tapahtuu" },
      {
        p: "Levy puhdistuu, kun pala hankaa sitä. Jos jarruja ei käytetä, suola ja kosteus syövyttävät levyn pintaa, ja ruoste muodostaa reunan levyn ulkokehälle. Satulan liukutapit kuivuvat ja jäävät jumiin, jolloin pala ei vapaudu kunnolla tai ei liiku ollenkaan. Seurauksena voi olla epätasainen jarrutus, kirskuna, kuumeneva pyörä ja huomautus katsastuksessa, vaikka palat ovat lähes uudet.",
      },
      { h2: "Merkit, joihin kannattaa reagoida" },
      {
        ul: [
          "Jarrupoljin tärisee tai auto vetää jarrutettaessa sivulle.",
          "Kirskuna tai hankaava ääni, joka ei häviä muutamalla jarrutuksella.",
          "Yksi vanne on ajon jälkeen selvästi muita lämpimämpi.",
          "Levyissä on syvää ruostetta tai urautumista.",
        ],
      },
      {
        p: "Pintaruoste sateisen yön jälkeen on normaalia ja lähtee muutamalla jarrutuksella. Huolestuttavaa on ruoste, joka ei lähde.",
      },
      { h2: "Vuosittainen satulahuolto" },
      {
        p: "Teslan huolto-ohjelma suosittelee jarrusatuloiden puhdistusta ja voitelua vuosittain alueilla, joilla teitä suolataan talvella. Työssä pyörät irrotetaan, satulat ja palojen kiinnikkeet puhdistetaan ja liukupinnat voidellaan. Samalla mitataan levyjen ja palojen kunto ja jarrunesteen kosteus. Keväällä suolakauden jälkeen työ on luontevaa yhdistää rengasvaihtoon.",
      },
      { h2: "Mitä voit tehdä itse" },
      {
        p: "Jarruta silloin tällöin turvallisessa paikassa reippaasti, jotta palat puhdistavat levyt. Pese auto talvella myös alta. Jos autossa voi valita kevyemmän regeneratiivisen jarrutuksen, se ei yleensä ole tarpeen, mutta kitkajarrujen satunnainen käyttö on hyväksi.",
      },
      { h2: "Jarruneste" },
      {
        p: "Jarruneste imee kosteutta ajan myötä, eikä ajomäärä vaikuta siihen. Kostea neste voi kiehua kovassa käytössä, ja jarrupoljin pehmenee. Mittaamme nesteen kosteuspitoisuuden ja vaihdamme sen tarvittaessa.",
      },
      { note: "Lue lisää [Teslan jarruista](@svc-brakes) tai varaa aika [viikonloppuhuoltoon](@weekend)." },
    ],
    related: ["svc-brakes", "svc-tyres", "post-winter", "model-3"],
  },

  "post-used": {
    seo: {
      title: "Käytetyn Teslan ostajan tarkistuslista",
      description:
        "Mitä tarkistaa ennen käytetyn Teslan ostoa: paperit, akun kunto, takuu, ohjelmisto-ominaisuudet, alusta, jarrut, renkaat ja koeajo.",
    },
    title: "Käytetyn Teslan ostajan tarkistuslista",
    dek: "Paperit, akku, takuu, alusta ja koeajo. Käy nämä läpi ennen kauppaa, niin tiedät mitä ostat.",
    published: PUBLISHED,
    readMinutes: 6,
    body: [
      {
        p: "Käytetty Tesla voi olla hyvä ostos, mutta sen tärkeimmät asiat eivät näy päältä. Akun kunto, ohjelmisto-ominaisuudet ja takuun tila ratkaisevat paljon. Tämä lista auttaa kysymään oikeat kysymykset.",
      },
      { h2: "Paperit ja historia" },
      {
        ul: [
          "Tarkista auton omistaja ja haltija Traficomin rekisteristä. Rahoitusyhtiö voi olla omistaja.",
          "Pyydä huoltohistoria ja tieto tehdyistä korjauksista.",
          "Katso katsastushistoria ja mahdolliset huomautukset.",
          "Kysy, onko autoa käytetty taksi- tai kyytipalveluissa.",
        ],
      },
      { h2: "Akku" },
      {
        p: "Ajoakku on auton kallein osa. Täyteen ladatun akun arvioitu toimintamatka antaa suuntaa, mutta se ei kerro kaikkea. [Akun kuntoraportti](@battery-report) arvioi kapasiteetin ja kennoryhmien tasapainon auton omista tiedoista ja mittauksista.",
      },
      { h2: "Takuu" },
      {
        p: "Teslalla on uuden auton perustakuu sekä erillinen akun ja voimayksikön takuu, jonka kesto ja kilometriraja riippuvat mallista. Selvitä auton käyttöönottopäivä ja kilometrit, jotta tiedät, paljonko takuuta on jäljellä.",
      },
      { h2: "Ohjelmisto ja tili" },
      {
        ul: [
          "Tarkista auton ohjelmistotiedoista, mitkä ominaisuudet autoon on asennettu.",
          "Kysy, mitkä edut siirtyvät uudelle omistajalle. Kaikki eivät välttämättä siirry.",
          "Varmista, että myyjä poistaa auton omalta Tesla-tililtään, jotta voit lisätä sen omaasi.",
          "Pyydä kaikki avainkortit ja avaimet.",
        ],
      },
      { h2: "Alusta, jarrut ja renkaat" },
      {
        ul: [
          "Katso auton alta akkukotelon suojat ja mahdolliset kolhut.",
          "Kuuntele etupäätä hidasteissa. Narina tai kolahdus viittaa kuluneisiin holkkeihin.",
          "Ilmajousitetussa autossa seuraa korkeutta yön yli.",
          "Katso levyjen ruoste ja renkaiden kulumiskuvio.",
        ],
      },
      { h2: "Koeajo" },
      {
        ul: [
          "Kiihdytä ja kuuntele vinkunaa tai ulinaa.",
          "Kokeile regeneratiivista jarrutusta ja tavallista jarrutusta.",
          "Tarkista, että kamerat ja anturit eivät näytä varoituksia.",
          "Testaa ovet, kahvat, ikkunat ja näyttö.",
          "Kokeile latausta sekä tavallisella että pikalaturilla, jos mahdollista.",
        ],
      },
      { h2: "Ostajan tarkastus" },
      {
        p: "Teemme ostajalle tarkastuksen, jossa käymme nämä kohdat läpi nostimella ja vikakoodien kanssa. Saat kirjallisen yhteenvedon ja tiedät ennen kauppaa, mitä autoon on lähivuosina tulossa. Mallikohtaiset huomiot löydät sivuilta [Model 3](@model-3), [Model Y](@model-y), [Model S](@model-s) ja [Model X](@model-x).",
      },
    ],
    related: ["battery-report", "model-3", "model-s", "post-diagnosis"],
  },

  "post-air": {
    seo: {
      title: "Teslan ilmajousituksen viat: oireet, syyt ja korjaus",
      description:
        "Model S:n ja Model X:n ilmajousituksen yleiset viat: laskeutuva auto, pitkään käyvä kompressori ja jousituksen varoitus. Mitä tehdä ja milloin korjata.",
    },
    title: "Ilmajousituksen viat Model S:ssä ja Model X:ssä",
    dek: "Laskeutuva kulma, kompressorin ääni tai jousituksen varoitus. Näin ilmajousitus toimii, miksi se vikaantuu ja milloin kannattaa toimia.",
    published: PUBLISHED,
    readMinutes: 5,
    body: [
      {
        p: "Model X:ssä on aina ilmajousitus, ja useimmissa Model S -autoissa myös. Ilmajousitus säätää ajokorkeutta nopeuden ja tilanteen mukaan ja tekee ajosta pehmeän. Se on kuitenkin järjestelmä, jossa on useita kuluvia osia, ja painavassa autossa ne kuormittuvat.",
      },
      { h2: "Miten järjestelmä toimii" },
      {
        p: "Jokaisessa kulmassa on ilmajousi, jossa kumipalje kantaa auton painon. Kompressori tuottaa paineilmaa, säiliö varastoi sitä ja venttiilikotelo ohjaa ilmaa kuhunkin kulmaan. Korkeusanturit kertovat ohjausyksikölle, missä asennossa auto on.",
      },
      { h2: "Tavallisimmat oireet" },
      {
        ul: [
          "Auton kulma tai koko auto on aamulla matalammalla kuin illalla.",
          "Kompressori käy usein tai pitkään.",
          "Auto ilmoittaa jousituksen viasta tai rajoittaa korkeuden säätöä.",
          "Auto nojaa tai tuntuu epätasaiselta.",
        ],
      },
      { h2: "Miksi vika syntyy" },
      {
        p: "Kumipalje kuluu ja halkeilee ajan myötä, erityisesti pakkasella, jolloin kumi kovettuu. Letkut ja liitokset voivat vuotaa. Pitkään jatkunut vuoto kuormittaa kompressoria, joka joutuu käymään jatkuvasti, ja lopulta kompressori voi rikkoutua. Siksi pieni vuoto kannattaa korjata ennen kuin se kasvaa.",
      },
      { h2: "Mitä tehdä, kun auto laskeutuu" },
      {
        p: "Jos auto nousee ajokorkeuteen käynnistettäessä eikä varoitus kiellä ajamista, lyhyt matka korjaamolle on yleensä mahdollinen. Jos auto ei nouse tai renkaat koskettavat koria, älä aja. Soita meille, niin mietitään kuljetus.",
      },
      { h2: "Näin vika paikannetaan" },
      {
        p: "Selvitämme ensin, mihin kulmaan ilma häviää ja kuinka nopeasti. Sen jälkeen etsimme vuodon jousesta, letkuista ja venttiilikotelosta. Auto nostetaan nostotilassa (jack mode), jotta järjestelmä ei yritä säätää korkeutta. Korjauksen jälkeen tarkistetaan korkeusanturit ja pyöränsuuntaus.",
      },
      { h2: "Kannattaako vaihtaa teräsjousiin" },
      {
        p: "Muunnossarjoja on olemassa, mutta muutos vaikuttaa auton ominaisuuksiin ja voi vaatia muutoskatsastuksen. Yleensä alkuperäisen järjestelmän korjaaminen on parempi ratkaisu.",
      },
      { note: "Lue lisää: [alusta ja ilmajousitus](@svc-suspension), [Model S](@model-s) ja [Model X](@model-x)." },
    ],
    related: ["svc-suspension", "model-s", "model-x", "svc-tyres"],
  },

  "post-diagnosis": {
    seo: {
      title: "Mitä vianhaku oikeasti sisältää? Auton diagnostiikka selitettynä",
      description:
        "Vikakoodi ei ole sama asia kuin vian syy. Näin auton vianhaku etenee: oireet, vikakoodit, mittaukset, tarkastus, varmistus ja kirjallinen arvio.",
    },
    title: "Mitä vianhaku oikeasti sisältää",
    dek: "Vikakoodi kertoo, mistä etsiä, ei mikä on rikki. Näin hyvä vianhaku etenee ja miksi se säästää rahaa.",
    published: PUBLISHED,
    readMinutes: 5,
    body: [
      {
        p: "Moni ajattelee, että vianhaku tarkoittaa koneen kytkemistä autoon ja vikakoodin lukemista. Koodi on kuitenkin vasta alku. Se kertoo, minkä järjestelmän ohjausyksikkö huomasi jotain poikkeavaa, mutta ei sitä, mikä osa on rikki tai miksi.",
      },
      { h2: "1. Oireet" },
      {
        p: "Hyvä vianhaku alkaa kysymyksillä. Milloin vika ilmenee? Kylmällä vai lämpimällä, ajossa vai seisoessa, aina vai joskus? Onko autoon tehty viime aikoina töitä? Kuva varoituksesta ja tieto tilanteesta säästävät usein tunteja.",
      },
      { h2: "2. Vian toistaminen" },
      {
        p: "Jos mahdollista, vika toistetaan koeajolla tai korjaamolla. Vika, jota ei saada esiin, on vaikea korjata varmasti, joten kirjaamme tarkasti, missä tilanteessa se ilmenee.",
      },
      { h2: "3. Vikakoodit ja tiedot" },
      {
        p: "Luemme ohjausyksiköiden vikakoodit ja niiden tallentaman tiedon: milloin vika syntyi, missä olosuhteissa ja kuinka usein. Sähköautossa myös akunhallintajärjestelmän ja lämmönhallinnan tiedot kertovat paljon.",
      },
      { h2: "4. Mittaukset ja tarkastus" },
      {
        p: "Koodi osoittaa suunnan, mittaus vahvistaa syyn. Mittaamme jännitteet, vastukset ja anturien lukemat, tarkistamme liittimet ja johdotukset ja katsomme mekaaniset osat nostimella. Esimerkiksi anturivikakoodi voi johtua anturista, sen johdosta, liittimen hapettumisesta tai heikosta 12 V:n akusta.",
      },
      { h2: "5. Varmistus" },
      {
        p: "Ennen kuin ehdotamme osan vaihtoa, varmistamme, että juuri se osa aiheuttaa vian. Näin vältetään tilanne, jossa vaihdetaan osa toisensa perään toivoen, että vika katoaa.",
      },
      { h2: "6. Löydökset ja arvio" },
      {
        p: "Saat kirjallisen yhteenvedon: mikä on vialla, miten varmistimme sen, mitä korjaus sisältää ja kuinka kiireellinen se on. Saat arvion, ja päätät itse, mitä tehdään. Jos vika kuuluu todennäköisesti takuuseen, kerromme sen.",
      },
      { h2: "Miksi tämä säästää rahaa" },
      {
        p: "Arvaamalla vaihdettu osa on kallein osa, koska se ei korjaa vikaa. Huolellinen vianhaku vie aikaa, mutta se tekee korjauksesta kertaluonteisen.",
      },
      { note: "Teslan omistajille: katso [Tesla-tarkastus](@offer) ja [sähköviat ja ohjelmisto](@svc-electrical)." },
    ],
    related: ["offer", "svc-electrical", "svc-powertrain", "post-12v"],
  },
};

const EN: Record<BlogPostId, BlogContent> = {
  "post-winter": {
    seo: {
      title: "Tesla winter care in Finland: preconditioning, charging, tyres, brakes",
      description:
        "Practical advice for Tesla owners facing a Finnish winter: preconditioning, charging in frost, winter tyres, brake corrosion, frozen handles and long parking.",
    },
    title: "Tesla winter care in Finland: keeping the car right in the cold",
    dek: "Preconditioning, charging, tyres, brakes and frozen handles. Practical advice that saves battery, nerves and repairs.",
    published: PUBLISHED,
    readMinutes: 5,
    body: [
      {
        p: "A Tesla copes well with a Finnish winter when you use it on winter's terms. Most winter trouble comes from a cold battery, ice and salt, and each of them has a simple answer.",
      },
      { h2: "Precondition while plugged in" },
      {
        p: "Preconditioning from the app warms the cabin, clears the windows and handles and warms the battery. With the car plugged in at the same time, the energy comes from the grid rather than the battery. Set a departure time in the car's settings and it will have the cabin and battery ready when you leave.",
      },
      { h2: "Charging in frost" },
      {
        p: "A cold battery accepts charge more slowly, and regenerative braking is limited until the battery warms up. The car shows the limit, and it is normal. When driving to a fast charger, choose it in the car's own navigation. The car then warms the battery on the way and charging is faster.",
      },
      {
        p: "If the car will stand in frost for a long time, leave it plugged in rather than nearly empty. Check the recommended charge limit in the owner's manual.",
      },
      { h2: "Tyres and pressures" },
      {
        p: "Winter tyres are compulsory from December to the end of February and need at least 3 millimetres of tread. Pressure falls with temperature, so check it whenever a hard frost arrives. The correct pressure is on the driver's door pillar. A heavy car with instant torque wears tyres, so rotating them at the seasonal change pays off.",
      },
      { h2: "Brakes and salt" },
      {
        p: "Regenerative braking does most of the slowing, so the friction brakes see little use. Salt and moisture corrode the discs and seize the calipers. Now and then, somewhere safe, brake firmly, and have the [brake calipers serviced](@svc-brakes) in spring after the salt season.",
      },
      { h2: "Handles, windows and the charge port" },
      {
        p: "Do not force a frozen handle or door. Preconditioning usually melts the ice within a few minutes. The charge port latch can be thawed with the app's defrost function. If a handle or latch sticks repeatedly even when thawed, the mechanism is at fault and is worth fixing before the hard frosts.",
      },
      { h2: "Long parking" },
      {
        p: "Sentry Mode uses energy, so turn it off if the car will stand for a long time and you do not need it. Leave the car plugged in if you can. After a long stand, a weak 12 V battery is often the first thing to show, so take its warnings seriously. Read more about [12 V battery warning signs](@post-12v).",
      },
      { h2: "Spring checklist" },
      {
        ul: [
          "Wash the underside of the car to get the salt off.",
          "Have the brake calipers cleaned and lubricated.",
          "Change the tyres and rotate them at the same time.",
          "Check the alignment after pothole season if the car pulls to one side.",
          "Replace the cabin filter if airflow has dropped.",
        ],
      },
      { note: "All of this can be combined into one visit. If your week is full, try [weekend service](@weekend)." },
    ],
    related: ["svc-brakes", "svc-tyres", "svc-battery", "weekend"],
  },

  "post-12v": {
    seo: {
      title: "Tesla 12 V battery warning signs and replacement",
      description:
        "How to spot a weakening 12 V battery in a Tesla, what the warning means, what to do if the car will not wake and how the battery is replaced.",
    },
    title: "The Tesla 12 V battery: warning signs and what to do",
    dek: "A small battery with a big effect. A weak 12 V battery is the most common reason a Tesla will not wake. Here is how to spot the signs early.",
    published: PUBLISHED,
    readMinutes: 4,
    body: [
      {
        p: "Besides the large high-voltage battery, a Tesla has a small low-voltage battery. It keeps the locks, the screen, the control units and the high-voltage contactors working when the main battery is disconnected. When the small battery weakens, the car may not wake up, even with plenty of energy left in the main pack.",
      },
      { h2: "Lead-acid or lithium-ion" },
      {
        p: "Older Teslas use a lead-acid battery, newer ones a lithium-ion battery. The lithium-ion type usually lasts longer, but it can weaken too. The type affects how the battery is tested and replaced, so it is the first thing we check.",
      },
      { h2: "Warning signs" },
      {
        ul: [
          "The car says the low-voltage battery needs service or replacement.",
          "The car is slow to wake, or the phone key does not work.",
          "The screen reboots or random warnings appear for no reason.",
          "The doors will not open or the handles do not respond.",
          "The car will not go into drive even though the screen works.",
        ],
      },
      {
        p: "Take the warning seriously even if the car still seems normal. The battery can fail without another alert, and the car then stays wherever it is.",
      },
      { h2: "If the car will not wake" },
      {
        p: "The owner's manual explains how to open the car and how to supply power to the 12 V system if the battery is flat. Follow it exactly, because a wrongly connected jump can damage the electronics. If you are unsure, call us before you try.",
      },
      { h2: "How it is replaced" },
      {
        p: "We first confirm that the fault is the battery and not its charging circuit. If the battery is weak, we replace it in the manufacturer's sequence so the car's systems are not left in a fault state. Afterwards we read the fault codes and make sure nothing is left active. Replacement is usually a quick job once the cause is confirmed.",
      },
      { h2: "Winter makes it worse" },
      {
        p: "Cold reduces a battery's ability to deliver current, so a weak battery often gives itself away in the first frosts. If the car warned about the battery in autumn, replace it before winter.",
      },
      { note: "See also [battery and charging](@svc-battery) and [electrical faults](@svc-electrical)." },
    ],
    related: ["svc-battery", "svc-electrical", "post-winter", "offer"],
  },

  "post-brakes": {
    seo: {
      title: "EV brake care: why regenerative braking makes brakes corrode",
      description:
        "Regenerative braking saves brake pads but corrodes discs and seizes calipers. How to look after an electric car's brakes in Finnish conditions.",
    },
    title: "Brake care when the car brakes mostly with its motor",
    dek: "Regenerative braking saves the pads, but on salted roads the brakes corrode and seize. Here is how to keep them right.",
    published: PUBLISHED,
    readMinutes: 4,
    body: [
      {
        p: "An electric car slows down with its motor most of the time, charging the battery as it does. The friction brakes are needed only in hard stops and at the very end of a stop. That sounds good, and for the pads it is. For the braking system as a whole, so little use is a problem.",
      },
      { h2: "What happens to brakes that are not used" },
      {
        p: "A disc is cleaned when the pad rubs against it. If the brakes are not used, salt and moisture corrode the disc surface and rust builds a lip on its outer edge. Caliper slide pins dry out and stick, so a pad does not release properly or does not move at all. The result can be uneven braking, squealing, a hot wheel and an inspection remark, even with nearly new pads.",
      },
      { h2: "Signs worth acting on" },
      {
        ul: [
          "The pedal pulses or the car pulls to one side under braking.",
          "A squeal or scraping noise that does not clear after a few stops.",
          "One wheel is clearly warmer than the others after a drive.",
          "Deep rust or scoring on the discs.",
        ],
      },
      {
        p: "Surface rust after a damp night is normal and clears after a few stops. Rust that does not clear is the concern.",
      },
      { h2: "A yearly caliper service" },
      {
        p: "Tesla's maintenance schedule recommends cleaning and lubricating the brake calipers every year in regions where roads are salted in winter. The wheels come off, the calipers and pad carriers are cleaned and the sliding surfaces lubricated. Disc and pad condition and brake fluid moisture are measured at the same time. In spring, after salt season, it fits naturally with a tyre change.",
      },
      { h2: "What you can do yourself" },
      {
        p: "Now and then, somewhere safe, brake firmly so the pads clean the discs. Wash the car underneath in winter too. Occasional use of the friction brakes is good for them.",
      },
      { h2: "Brake fluid" },
      {
        p: "Brake fluid absorbs moisture over time, however far the car is driven. Wet fluid can boil under hard use, and the pedal goes soft. We measure the fluid's moisture content and replace it when needed.",
      },
      { note: "More on [Tesla brakes](@svc-brakes), or book a [weekend service](@weekend)." },
    ],
    related: ["svc-brakes", "svc-tyres", "post-winter", "model-3"],
  },

  "post-used": {
    seo: {
      title: "Used Tesla buying checklist",
      description:
        "What to check before buying a used Tesla: paperwork, battery condition, warranty, software features, suspension, brakes, tyres and the test drive.",
    },
    title: "Used Tesla buying checklist",
    dek: "Paperwork, battery, warranty, suspension and the test drive. Go through these before you buy and you will know what you are getting.",
    published: PUBLISHED,
    readMinutes: 6,
    body: [
      {
        p: "A used Tesla can be a good buy, but its most important qualities do not show on the outside. The battery's condition, the software features and the warranty status decide a lot. This list helps you ask the right questions.",
      },
      { h2: "Paperwork and history" },
      {
        ul: [
          "Check the owner and keeper in the Traficom register. A finance company may be the owner.",
          "Ask for the service history and details of any repairs.",
          "Look at the inspection history and any remarks.",
          "Ask whether the car has been used as a taxi or for ride-hailing.",
        ],
      },
      { h2: "Battery" },
      {
        p: "The high-voltage battery is the most expensive part of the car. The estimated range at full charge gives an indication, but it does not tell the whole story. A [battery health report](@battery-report) assesses capacity and cell group balance from the car's own data and measurements.",
      },
      { h2: "Warranty" },
      {
        p: "Tesla has a basic new vehicle warranty and a separate battery and drive unit warranty whose length and distance limit depend on the model. Find out the car's first registration date and mileage so you know how much warranty is left.",
      },
      { h2: "Software and account" },
      {
        ul: [
          "Check in the car's software information which features are installed.",
          "Ask which benefits transfer to a new owner. Not all of them necessarily do.",
          "Make sure the seller removes the car from their Tesla account so you can add it to yours.",
          "Ask for all key cards and keys.",
        ],
      },
      { h2: "Suspension, brakes and tyres" },
      {
        ul: [
          "Look under the car at the battery shields and for any impact damage.",
          "Listen to the front end over speed bumps. A creak or knock points to worn bushings.",
          "On a car with air suspension, watch the ride height overnight.",
          "Look at disc corrosion and the tyre wear pattern.",
        ],
      },
      { h2: "Test drive" },
      {
        ul: [
          "Accelerate and listen for whine or howl.",
          "Try regenerative braking and normal braking.",
          "Check that the cameras and sensors show no warnings.",
          "Test the doors, handles, windows and screen.",
          "Try charging on both a normal charger and a fast charger if you can.",
        ],
      },
      { h2: "Pre-purchase inspection" },
      {
        p: "We do pre-purchase inspections that go through these points on the lift and with the fault codes. You get a written summary and know before you buy what the car is likely to need in the next few years. Model notes are on the [Model 3](@model-3), [Model Y](@model-y), [Model S](@model-s) and [Model X](@model-x) pages.",
      },
    ],
    related: ["battery-report", "model-3", "model-s", "post-diagnosis"],
  },

  "post-air": {
    seo: {
      title: "Tesla air suspension faults: symptoms, causes and repair",
      description:
        "Common Model S and Model X air suspension faults: a car that sits down, a compressor that runs a lot, suspension warnings. What to do and when to repair.",
    },
    title: "Air suspension faults on the Model S and Model X",
    dek: "A dropped corner, compressor noise or a suspension warning. How air suspension works, why it fails and when to act.",
    published: PUBLISHED,
    readMinutes: 5,
    body: [
      {
        p: "Every Model X has air suspension, and so do most Model S cars. It adjusts ride height to speed and situation and gives a soft ride. It is, however, a system with several wear parts, and on a heavy car they work hard.",
      },
      { h2: "How the system works" },
      {
        p: "Each corner has an air spring in which a rubber bellows carries the car's weight. A compressor makes compressed air, a reservoir stores it and a valve block directs it to each corner. Height sensors tell the control unit where the car sits.",
      },
      { h2: "The usual symptoms" },
      {
        ul: [
          "A corner, or the whole car, is lower in the morning than it was the night before.",
          "The compressor runs often or for a long time.",
          "The car reports a suspension fault or restricts height adjustment.",
          "The car leans or feels uneven.",
        ],
      },
      { h2: "Why faults happen" },
      {
        p: "The rubber bellows wears and cracks over time, especially in frost when the rubber hardens. Lines and fittings can leak. A leak left for a long time makes the compressor run constantly, and eventually the compressor can fail. That is why a small leak is worth fixing before it grows.",
      },
      { h2: "What to do when the car sits down" },
      {
        p: "If the car rises to ride height when started and the warning does not tell you to stop, a short drive to the garage is usually fine. If it does not rise, or the tyres touch the bodywork, do not drive. Call us and we will work out transport.",
      },
      { h2: "How the fault is found" },
      {
        p: "We first find out which corner is losing air and how quickly. Then we look for the leak in the spring, the lines and the valve block. The car is lifted in jack mode so the system does not try to adjust its height. After the repair, the height sensors and wheel alignment are checked.",
      },
      { h2: "Is a steel spring conversion worth it" },
      {
        p: "Conversion kits exist, but the change affects how the car behaves and can require a modification inspection. Repairing the original system is usually the better choice.",
      },
      { note: "Read more: [suspension and air suspension](@svc-suspension), [Model S](@model-s) and [Model X](@model-x)." },
    ],
    related: ["svc-suspension", "model-s", "model-x", "svc-tyres"],
  },

  "post-diagnosis": {
    seo: {
      title: "What a car diagnosis actually involves",
      description:
        "A fault code is not the same as the cause. How a proper diagnosis works: symptoms, fault codes, measurements, inspection, confirmation and a written estimate.",
    },
    title: "What a diagnosis actually involves",
    dek: "A fault code tells you where to look, not what is broken. How a good diagnosis works, and why it saves money.",
    published: PUBLISHED,
    readMinutes: 5,
    body: [
      {
        p: "Many people think a diagnosis means plugging a tool into the car and reading a fault code. The code is only the beginning. It tells you which system's control unit noticed something abnormal, not which part is broken or why.",
      },
      { h2: "1. Symptoms" },
      {
        p: "A good diagnosis starts with questions. When does the fault appear? Cold or warm, driving or parked, always or sometimes? Has any work been done on the car recently? A photo of the warning and a note of the situation often save hours.",
      },
      { h2: "2. Reproducing the fault" },
      {
        p: "Where possible, the fault is reproduced on a road test or in the workshop. A fault that cannot be made to appear is hard to fix with certainty, so we record exactly when it happens.",
      },
      { h2: "3. Fault codes and data" },
      {
        p: "We read the control units' fault codes and the data they store: when the fault occurred, in what conditions and how often. In an electric car, battery management and thermal management data tell us a lot too.",
      },
      { h2: "4. Measurement and inspection" },
      {
        p: "The code points the way; measurement confirms the cause. We measure voltages, resistances and sensor readings, check connectors and wiring, and look at the mechanical parts on the lift. A sensor fault code, for example, can come from the sensor, its wiring, a corroded connector or a weak 12 V battery.",
      },
      { h2: "5. Confirmation" },
      {
        p: "Before we suggest replacing a part, we confirm that this part is what causes the fault. That avoids replacing one part after another in the hope the fault goes away.",
      },
      { h2: "6. Findings and estimate" },
      {
        p: "You get a written summary: what is wrong, how we confirmed it, what the repair involves and how urgent it is. You get an estimate, and you decide what is done. If the fault is likely covered by warranty, we tell you.",
      },
      { h2: "Why this saves money" },
      {
        p: "A part replaced on a guess is the most expensive part, because it does not fix the fault. A careful diagnosis takes time, but it makes the repair a one-off.",
      },
      { note: "For Tesla owners: see [Tesla inspection](@offer) and [electrical faults and software](@svc-electrical)." },
    ],
    related: ["offer", "svc-electrical", "svc-powertrain", "post-12v"],
  },
};

export const BLOG: Record<Lang, Record<BlogPostId, BlogContent>> = { fi: FI, en: EN };
