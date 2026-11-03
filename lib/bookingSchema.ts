import type { RegisterOptions } from "react-hook-form";
import type { Lang } from "@/site.config";

export const TIMINGS = ["asap", "weekday", "weekend", "flexible"] as const;

export type Timing = (typeof TIMINGS)[number];

/** Formspree: 25 MB per file, and the lower of the two counts it publishes. */
export const MAX_FILES = 5;
export const MAX_FILE_BYTES = 25 * 1024 * 1024;

export const FORM_TEXT = {
  fi: {
    reg: "Rekisterinumero",
    regHint: "Riittää, että tiedämme auton. Vuosimalli tulee rekisterinumerolla.",
    vin: "VIN eli valmistenumero",
    vinHint: "17 merkkiä. Löytyy rekisteriotteesta ja tuulilasin alareunasta.",
    optional: "vapaaehtoinen",
    message: "Mikä on vialla tai mitä tarvitset?",
    messageHint: "Oireet, varoitukset ja se, milloin vika ilmenee.",
    messageHintWhatsApp: "Oireet, varoitukset ja se, milloin vika ilmenee. Kuvan voi lähettää WhatsAppilla.",
    files: "Liitteet",
    filesHint: "Kuvat, video tai rekisteriote. Enintään 5 tiedostoa, kukin alle 25 Mt.",
    filesChosen: "tiedostoa valittu",
    timing: "Toivottu ajankohta",
    timings: {
      asap: "Mahdollisimman pian",
      weekday: "Arkipäivä, ajanvarauksella",
      weekend: "Viikonloppu: jätän auton viikonlopuksi",
      flexible: "Joustava",
    },
    name: "Nimi",
    phone: "Puhelin",
    email: "Sähköposti",
    consent:
      "Hyväksyn, että tietojani käytetään tähän yhteydenottoon vastaamiseen ja ajan varaamiseen.",
    privacy: "Tietosuojaseloste",
    submitDiagnosis: "Lähetä tarkastuspyyntö",
    submitQuote: "Lähetä tarjouspyyntö",
    sending: "Lähetetään…",
    successTitle: "Kiitos, pyyntösi on vastaanotettu.",
    successBody: "Vastaamme 12 tunnin kuluessa, usein jo 3 tunnissa. Aika vahvistetaan vastauksessamme.",
    errorTitle: "Lähetys ei onnistunut.",
    errorBody: "Yritä hetken kuluttua uudelleen, tai soita tai lähetä viesti WhatsAppilla.",
    fixErrors: "Tarkista merkityt kentät.",
    teslaOnly: "Tarkastustarjous koskee vain Tesla-autoja. Valitse Tesla-malli tai pyydä tarjous.",
    required: "pakollinen",
    errors: {
      reg: "Anna rekisterinumero, esimerkiksi ABC-123.",
      vin: "VIN on 17 merkkiä, eikä siinä käytetä kirjaimia I, O tai Q.",
      files: "Liitteitä voi olla enintään 5, ja kunkin on oltava alle 25 Mt.",
      message: "Kerro pari lausetta autosta, niin voimme vastata hyödyllisesti.",
      timing: "Valitse ajankohta.",
      name: "Kerro nimesi.",
      phone: "Lisää puhelinnumero, josta sinut tavoittaa.",
      phoneFormat: "Vain numerot, välilyönnit sekä merkit + ( ) - ja .",
      email: "Tarkista sähköpostiosoite.",
      consent: "Tarvitsemme suostumuksesi voidaksemme vastata.",
      tooLong: "Teksti on liian pitkä.",
    },
  },
  en: {
    reg: "Registration number",
    regHint: "Enough for us to identify the car. The year comes with the registration.",
    vin: "VIN",
    vinHint: "17 characters. On the registration certificate and at the base of the windscreen.",
    optional: "optional",
    message: "What is wrong, or what do you need?",
    messageHint: "Symptoms, warnings, and when it happens.",
    messageHintWhatsApp: "Symptoms, warnings, and when it happens. You can send a photo on WhatsApp.",
    files: "Attachments",
    filesHint: "Photos, a video or the registration certificate. Up to 5 files, each under 25 MB.",
    filesChosen: "files selected",
    timing: "Preferred timing",
    timings: {
      asap: "As soon as possible",
      weekday: "A weekday, by appointment",
      weekend: "Weekend: I will leave the car for the weekend",
      flexible: "Flexible",
    },
    name: "Name",
    phone: "Phone",
    email: "Email",
    consent: "I agree that my details are used to answer this enquiry and book a slot.",
    privacy: "Privacy notice",
    submitDiagnosis: "Send inspection request",
    submitQuote: "Send quote request",
    sending: "Sending…",
    successTitle: "Thank you, we have your request.",
    successBody: "We reply within 3 to 12 hours. Your slot is confirmed in our reply.",
    errorTitle: "That did not go through.",
    errorBody: "Please try again in a moment, or call or message us on WhatsApp.",
    fixErrors: "Please check the highlighted fields.",
    teslaOnly: "The inspection offer is for Tesla vehicles only. Choose a Tesla model or request a quote.",
    required: "required",
    errors: {
      reg: "Please enter the registration number, for example ABC-123.",
      vin: "A VIN is 17 characters and never uses the letters I, O or Q.",
      files: "Up to 5 files, each under 25 MB.",
      message: "A sentence or two about the car helps us give a useful answer.",
      timing: "Please choose a timing.",
      name: "Please tell us your name.",
      phone: "Please add a phone number we can reach you on.",
      phoneFormat: "Digits, spaces, + ( ) - and . only.",
      email: "Please check your email address.",
      consent: "We need your consent to reply.",
      tooLong: "That is longer than we can store.",
    },
  },
} as const;

export type BookingRequest = {
  reg: string;
  vin: string;
  message: string;
  timing: Timing;
  name: string;
  phone: string;
  email: string;
  consent: boolean;
};

type Rules = { [K in keyof BookingRequest]: RegisterOptions<BookingRequest, K> };

/** Length check on the trimmed value, so spaces alone never pass. */
const length = (min: number, max: number, short: string, long: string) => (value: string) => {
  const v = (value ?? "").trim();
  if (v.length < min) return short;
  if (v.length > max) return long;
  return true;
};

/**
 * react-hook-form's own validation rules, built per language so the messages
 * match the page. Kept free of a schema library: this is the only form on
 * the site.
 *
 * The vehicle select used to enforce Teslas on the inspection path. It is
 * gone, so that condition is now stated in the form instead of validated;
 * a registration number cannot tell us the make.
 */
export function bookingRules(lang: Lang): Rules {
  const e = FORM_TEXT[lang].errors;
  return {
    // The one thing we must have about the car. Everything else about it,
    // the year included, follows from the registration in Finland.
    reg: {
      validate: (v: string) => {
        const t = (v ?? "").trim();
        return (t.length >= 2 && t.length <= 12 && /^[A-Za-zÅÄÖåäö0-9 -]+$/.test(t)) || e.reg;
      },
    },
    // Optional, but checked when given: a mistyped VIN is worse than none.
    // 17 characters, and I, O and Q are never used in a VIN.
    vin: {
      validate: (v: string) => {
        const t = (v ?? "").trim();
        return t === "" || /^[A-HJ-NPR-Za-hj-npr-z0-9]{17}$/.test(t) || e.vin;
      },
    },
    message: { validate: length(10, 2000, e.message, e.tooLong) },
    timing: { validate: (v: string) => (TIMINGS as readonly string[]).includes(v) || e.timing },
    name: { validate: length(2, 80, e.name, e.tooLong) },
    phone: {
      validate: (v: string) => {
        const ok = length(6, 28, e.phone, e.tooLong)(v);
        if (ok !== true) return ok;
        return /^[+0-9][0-9\s().-]*$/.test(v.trim()) || e.phoneFormat;
      },
    },
    email: {
      validate: (v: string) => (v.trim().length <= 120 && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim())) || e.email,
    },
    consent: { validate: (v: boolean) => v === true || e.consent },
  };
}
