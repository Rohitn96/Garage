/**
 * site.config.ts: every business fact the site states, in one file.
 *
 * Rules for this file:
 *   - Only real, verified data goes here. Never a guess, never a sample.
 *   - Anything still missing is marked `TODO(owner)` and is null or an empty
 *     array. Components that depend on it render nothing until it is filled.
 *   - `npm run open-items` lists every unresolved item; docs/open-items.md
 *     explains each one.
 *
 * This file has no imports on purpose, so scripts can load it with plain Node.
 */

export type Lang = "fi" | "en";
export type Localized = { fi: string; en: string };
export type LocalizedList = { fi: string[]; en: string[] };

export type Review = {
  author: string;
  /** 1 to 5. */
  rating: number;
  text: string;
  /** ISO date. */
  date: string;
  /** Where the review was published, for example "Google". */
  source: string;
};

export type Certificate = {
  name: Localized;
  issuer: string;
  /** Who holds it. */
  holder?: string;
  /** ISO date or year. */
  validUntil?: string;
};

export type TeamMember = {
  name: string;
  role: Localized;
  bio?: Localized;
  /** Path under public/, for example "/team/name.webp". */
  photo?: string;
};

export type Photo = {
  /** Path under public/. Use WebP, at least 1600 px wide. */
  src: string;
  width: number;
  height: number;
  alt: Localized;
};

export const SITE = {
  url: "https://revampmotors.fi",

  business: {
    name: "Revamp Motors",
    /** Company form per the PRH register. */
    companyForm: "osakeyhtiö",
    companyId: "3651428-1",
    /** Registration date per PRH. Not the opening date. */
    founded: "2026-08-31",
    street: "Kytkintie 38",
    /** Kytkintie 38 is a yard of several halls; the hall number leads the address. */
    unit: { fi: "Halli 3", en: "Hall 3" } as Localized,
    postalCode: "00770",
    city: "Helsinki",
    district: "Tattarisuo",
    country: "FI",
    email: "revampmotors1@gmail.com",
    /** E.164 for tel: links and schema. */
    phone: "+358458656683",
    phoneDisplay: "+358 45 865 6683",
    mapsUrl: "https://maps.app.goo.gl/ymn8vnducX7tqAai7",
    /**
     * TODO(owner): exact coordinates of the hall door, from the Google Maps pin
     * (right click on the pin, the first line is "lat, lng"). Geo is left out of
     * the structured data until this is set, because a wrong pin is worse than none.
     */
    geo: null as { lat: number; lng: number } | null,
    /**
     * TODO(owner): public profile URLs: Google Business Profile, Facebook,
     * Instagram and similar. Used as schema.org sameAs. Empty means none are published.
     */
    sameAs: [] as string[],
  },

  hours: {
    /** Weekdays are by appointment only. This is a fact, not a placeholder. */
    weekdaysByAppointment: true,
    /**
     * TODO(owner): weekend opening hours, 24 h "HH:MM". Weekends are full
     * working days; until the times are set the site says "full days, times
     * confirmed when you book" and leaves weekend hours out of the schema.
     */
    weekend: {
      saturday: null as { opens: string; closes: string } | null,
      sunday: null as { opens: string; closes: string } | null,
    },
    /**
     * TODO(owner): is an appointment required at weekends? true, false, or null
     * while undecided (the site then asks people to book ahead).
     */
    weekendAppointmentRequired: null as boolean | null,
  },

  /** Already published on the current site. */
  replyTime: { fi: "12 tunnin kuluessa, usein jo 3 tunnissa", en: "within 3 to 12 hours" } as Localized,

  /**
   * Launch offer: free diagnosis for Tesla vehicles.
   *
   * `endsAt` is the first instant AFTER the offer, in Helsinki time. The offer
   * is valid through 31.12.2026, so it ends at midnight going into 1.1.2027,
   * which is 2027-01-01T00:00 EET (UTC+2). Every banner, badge, CTA and schema
   * entry reads lib/offer.ts, which reads this.
   */
  offer: {
    validThrough: "2026-12-31",
    endsAt: "2027-01-01T00:00:00+02:00",
    validThroughDisplay: { fi: "31.12.2026", en: "31 December 2026" } as Localized,
  },

  /**
   * What the free diagnosis includes, as confirmed by the owner. Tesla
   * vehicles only. `excludes` is optional: the "not included" list renders
   * only when it has entries. Set `confirmed: false` to hide both lists.
   */
  diagnosis: {
    confirmed: true,
    includes: {
      fi: ["Digitaalinen analyysiraportti", "Silmämääräinen tarkastus", "Koeajo"],
      en: ["Digital analysis report", "Visual inspection", "Test drive"],
    } as LocalizedList,
    excludes: { fi: [], en: [] } as LocalizedList,
  },

  /**
   * Refrigerant work (AC recharge, opening the heat pump circuit) needs an
   * F-gas qualification (Tukes kylmäainepätevyys).
   * TODO(owner): set to true once the certificate is in hand. The climate
   * page then offers refrigerant work as well as diagnosis.
   */
  acLicensed: false,

  /** Formspree endpoint. NEXT_PUBLIC_FORMSPREE_ENDPOINT overrides it for previews. */
  formEndpoint: "https://formspree.io/f/maeyoeeq",

  /** Cloudflare Web Analytics token. Set NEXT_PUBLIC_CF_BEACON_TOKEN at build time. */
  analyticsToken: "",

  /**
   * TODO(owner): real customer reviews only, copied word for word with the
   * customer's permission. The reviews section renders nothing while empty.
   */
  reviews: [] as Review[],

  /**
   * TODO(owner): certificates actually held (high-voltage safety training,
   * F-gas, manufacturer-independent EV training). Hidden while empty.
   */
  certificates: [] as Certificate[],

  /** TODO(owner): team members who agree to be shown. Hidden while empty. */
  team: [] as TeamMember[],

  /** TODO(owner): real photos of the workshop. Hidden while empty. */
  garagePhotos: [] as Photo[],

  /**
   * TODO(owner): an anonymised sample battery health report (PDF or image
   * under public/). The sample block on the battery report page stays hidden
   * until this is set.
   */
  batteryReportSample: null as { href: string; preview: Photo } | null,
} as const;
