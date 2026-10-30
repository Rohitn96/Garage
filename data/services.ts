import { SITE, type Lang } from "@/site.config";
import type { ServiceId } from "@/content/services";

/**
 * The catalogue behind the home page's exploded car. Each system separates out
 * of the model in turn and names the work we do on it; each one links to its
 * service page. No prices live here or anywhere else.
 */

/** Which part group separates out of the car when this system is shown. */
export type CarRegionId = "battery" | "drive" | "brakes" | "suspension" | "climate" | "wheels" | "electrical";

export type ServiceGroup = {
  id: CarRegionId;
  page: ServiceId;
  title: string;
  standfirst: string;
  items: string[];
};

type Group = { id: CarRegionId; page: ServiceId; fi: Omit<ServiceGroup, "id" | "page">; en: Omit<ServiceGroup, "id" | "page"> };

/**
 * The "battery" and "drive" regions have no group: high-voltage battery and
 * powertrain work is not offered, so those parts stay in the car.
 */
const GROUPS: Group[] = [
  {
    id: "brakes",
    page: "svc-brakes",
    fi: {
      title: "Jarrut ja regenerointi",
      standfirst: "Regeneratiivinen jarrutus hoitaa hidastuksen, joten kitkajarrut ruostuvat kulumisen sijaan.",
      items: ["Satuloiden puhdistus ja voitelu", "Levyt ja palat", "Jarrunesteen vaihto"],
    },
    en: {
      title: "Brakes and regen",
      standfirst: "Regen does most of the stopping, so the friction brakes corrode instead of wearing out.",
      items: ["Caliper clean and lubricate", "Discs and pads", "Brake fluid change"],
    },
  },
  {
    id: "suspension",
    page: "svc-suspension",
    fi: {
      title: "Alusta ja ilmajousitus",
      standfirst: "Painavia autoja huonoilla talviteillä. Tukivarret, holkit ja ilmajouset.",
      items: ["Tukivarret ja holkit", "Ilmajousituksen vianhaku", "Pohjan ja ruosteen tarkastus"],
    },
    en: {
      title: "Suspension and air suspension",
      standfirst: "Heavy cars on bad winter roads. Control arms, bushings and air springs.",
      items: ["Control arms and bushings", "Air suspension diagnostics", "Underbody and corrosion check"],
    },
  },
  {
    id: "climate",
    page: "svc-climate",
    fi: {
      title: "Ilmastointi ja lämpöpumppu",
      standfirst: "Viileä kesällä, lämmin talvella ja kirkkaat ikkunat. Huoltolaitteet Teslalle.",
      items: SITE.acLicensed
        ? ["Ilmastoinnin huolto ja täyttö", "Lämpöpumpun vianhaku", "Raitisilmasuodattimet"]
        : ["Ilmastoinnin vianhaku ja tehon tarkastus", "Lämpöpumpun vianhaku", "Raitisilmasuodattimet"],
    },
    en: {
      title: "Air conditioning and heat pump",
      standfirst: "Cool in summer, warm in winter, clear windows. Service equipment made for Tesla.",
      items: SITE.acLicensed
        ? ["AC service and recharge", "Heat pump diagnostics", "Cabin filters"]
        : ["AC diagnosis and performance check", "Heat pump diagnostics", "Cabin filters"],
    },
  },
  {
    id: "wheels",
    page: "svc-tyres",
    fi: {
      title: "Renkaat ja suuntaus",
      standfirst: "Välitön vääntö ja raskas auto kuluttavat renkaita. Säännöllinen kierto pidentää niiden ikää.",
      items: ["Kausivaihto", "Nelipyöräsuuntaus", "Rengaskierto ja kulumatarkastus", "Rengashotelli"],
    },
    en: {
      title: "Tyres and alignment",
      standfirst: "Instant torque and a heavy car eat tyres. Rotation on schedule makes them last.",
      items: ["Seasonal changeover", "Four-wheel alignment", "Rotation and wear check", "Tyre storage"],
    },
  },
  {
    id: "electrical",
    page: "svc-electrical",
    fi: {
      title: "Sähköviat ja 12 V:n akku",
      standfirst: "Pieni 12 V:n akku pysäyttää useamman Teslan kuin mikään muu. Mittaamme sen ensin.",
      items: ["12 V:n akun testaus ja vaihto", "Vikakoodit ja varoitukset", "Kamerat, anturit ja ovet"],
    },
    en: {
      title: "Electrical and 12 V battery",
      standfirst: "The small 12 V battery strands more Teslas than anything else. We measure it first.",
      items: ["12 V battery test and replacement", "Fault codes and warnings", "Cameras, sensors and doors"],
    },
  },
];

export function serviceGroups(lang: Lang): ServiceGroup[] {
  return GROUPS.map((g) => ({ id: g.id, page: g.page, ...g[lang] }));
}
