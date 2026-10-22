import { SITE, type Lang } from "@/site.config";
import type { ServiceId } from "@/content/services";

/**
 * The catalogue behind the home page's exploded car. Each system separates out
 * of the model in turn and names the work we do on it; each one links to its
 * service page. No prices live here or anywhere else.
 */

/** Which part group separates out of the car when this system is shown. */
export type CarRegionId = "battery" | "drive" | "brakes" | "suspension" | "climate" | "wheels";

export type ServiceGroup = {
  id: CarRegionId;
  page: ServiceId;
  title: string;
  standfirst: string;
  items: string[];
};

type Group = { id: CarRegionId; page: ServiceId; fi: Omit<ServiceGroup, "id" | "page">; en: Omit<ServiceGroup, "id" | "page"> };

const GROUPS: Group[] = [
  {
    id: "battery",
    page: "svc-battery",
    fi: {
      title: "Akku ja lataus",
      standfirst: "Lattian alla oleva ajoakku ja pieni 12 V:n akku, joka pysäyttää auton useammin.",
      items: ["Akun kuntoraportti", "12 V:n akun vaihto", "Latausportti ja laturi", "Akun jäähdytys"],
    },
    en: {
      title: "Battery and charging",
      standfirst: "The high-voltage pack under the floor, and the small 12 V battery that strands more cars.",
      items: ["Battery health report", "12 V battery replacement", "Charge port and onboard charger", "Battery cooling"],
    },
  },
  {
    id: "drive",
    page: "svc-powertrain",
    fi: {
      title: "Voimalinja",
      standfirst: "Moottorit, alennusvaihteet ja invertterit. Edessä, takana tai molemmissa.",
      items: ["Voimalinjan vianhaku", "Alennusvaihde ja vetoakselit", "Suurjännitekaapelit ja liittimet"],
    },
    en: {
      title: "Powertrain",
      standfirst: "Motors, reduction gears and inverters. Front, rear or both.",
      items: ["Drive unit diagnostics", "Reduction gear and driveshafts", "HV cabling and connectors"],
    },
  },
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
      title: "Lämpöpumppu ja ilmastointi",
      standfirst: "Suomessa lämpöpumppu on osa toimintamatkaa, ei mukavuusvaruste.",
      items: SITE.acLicensed
        ? ["Lämpöpumpun vianhaku", "Ilmastoinnin huolto ja täyttö", "Raitisilmasuodattimet"]
        : ["Lämpöpumpun vianhaku", "Anturit ja nestepiiri", "Raitisilmasuodattimet"],
    },
    en: {
      title: "Heat pump and climate",
      standfirst: "In this climate the heat pump is part of your range, not a comfort feature.",
      items: SITE.acLicensed
        ? ["Heat pump diagnostics", "AC service and recharge", "Cabin filters"]
        : ["Heat pump diagnostics", "Sensors and coolant circuit", "Cabin filters"],
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
];

export function serviceGroups(lang: Lang): ServiceGroup[] {
  return GROUPS.map((g) => ({ id: g.id, page: g.page, ...g[lang] }));
}
