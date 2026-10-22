import { z } from "zod";
import type { Lang } from "@/site.config";

export const VEHICLES = ["model-3", "model-y", "model-s", "model-x", "other-ev", "other"] as const;
export const TESLA_VEHICLES: readonly string[] = ["model-3", "model-y", "model-s", "model-x"];
export const TIMINGS = ["asap", "weekday", "weekend", "flexible"] as const;

export type Vehicle = (typeof VEHICLES)[number];
export type Timing = (typeof TIMINGS)[number];

export const FORM_TEXT = {
  fi: {
    vehicle: "Auto",
    vehicles: {
      "model-3": "Tesla Model 3",
      "model-y": "Tesla Model Y",
      "model-s": "Tesla Model S",
      "model-x": "Tesla Model X",
      "other-ev": "Muu sähköauto",
      other: "Muu auto",
    },
    choose: "Valitse",
    year: "Vuosimalli",
    reg: "Rekisterinumero",
    optional: "vapaaehtoinen",
    message: "Mikä on vialla tai mitä tarvitset?",
    messageHint: "Oireet, varoitukset, milloin vika ilmenee. Kuvan voi lähettää WhatsAppilla.",
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
    submitDiagnosis: "Lähetä diagnostiikkapyyntö",
    submitQuote: "Lähetä tarjouspyyntö",
    sending: "Lähetetään…",
    successTitle: "Kiitos, pyyntösi on vastaanotettu.",
    successBody: "Vastaamme 12 tunnin kuluessa, usein jo 3 tunnissa. Aika vahvistetaan vastauksessamme.",
    errorTitle: "Lähetys ei onnistunut.",
    errorBody: "Yritä hetken kuluttua uudelleen, tai soita tai lähetä viesti WhatsAppilla.",
    fixErrors: "Tarkista merkityt kentät.",
    teslaOnly: "Ilmainen diagnostiikka koskee vain Tesla-autoja. Valitse Tesla-malli tai pyydä tarjous.",
    required: "pakollinen",
    errors: {
      vehicle: "Valitse auto.",
      year: "Anna vuosimalli neljällä numerolla, esimerkiksi 2021.",
      reg: "Tarkista rekisterinumero.",
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
    vehicle: "Vehicle",
    vehicles: {
      "model-3": "Tesla Model 3",
      "model-y": "Tesla Model Y",
      "model-s": "Tesla Model S",
      "model-x": "Tesla Model X",
      "other-ev": "Other EV",
      other: "Other vehicle",
    },
    choose: "Choose",
    year: "Model year",
    reg: "Registration number",
    optional: "optional",
    message: "What is wrong, or what do you need?",
    messageHint: "Symptoms, warnings, when it happens. You can send a photo on WhatsApp.",
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
    submitDiagnosis: "Send diagnosis request",
    submitQuote: "Send quote request",
    sending: "Sending…",
    successTitle: "Thank you, we have your request.",
    successBody: "We reply within 3 to 12 hours. Your slot is confirmed in our reply.",
    errorTitle: "That did not go through.",
    errorBody: "Please try again in a moment, or call or message us on WhatsApp.",
    fixErrors: "Please check the highlighted fields.",
    teslaOnly: "The free diagnosis is for Tesla vehicles only. Choose a Tesla model or request a quote.",
    required: "required",
    errors: {
      vehicle: "Please choose a vehicle.",
      year: "Enter the model year as four digits, for example 2021.",
      reg: "Please check the registration number.",
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

const THIS_YEAR = new Date().getFullYear();

/** Built per language so the messages match the page. */
export function makeBookingSchema(lang: Lang, path: "diagnosis" | "quote") {
  const e = FORM_TEXT[lang].errors;
  return z
    .object({
      vehicle: z.enum(VEHICLES, { message: e.vehicle }),
      year: z
        .string()
        .trim()
        .regex(/^(19|20)\d{2}$/, e.year)
        .refine((v) => Number(v) <= THIS_YEAR + 1, e.year),
      reg: z
        .string()
        .trim()
        .max(12, e.reg)
        .regex(/^[A-Za-zÅÄÖåäö0-9 -]*$/, e.reg),
      message: z.string().trim().min(10, e.message).max(2000, e.tooLong),
      timing: z.enum(TIMINGS, { message: e.timing }),
      name: z.string().trim().min(2, e.name).max(80, e.tooLong),
      phone: z
        .string()
        .trim()
        .min(6, e.phone)
        .max(28, e.tooLong)
        .regex(/^[+0-9][0-9\s().-]*$/, e.phoneFormat),
      email: z.email(e.email).max(120, e.tooLong),
      consent: z.literal(true, { message: e.consent }),
    })
    .refine((v) => path !== "diagnosis" || TESLA_VEHICLES.includes(v.vehicle), {
      path: ["vehicle"],
      message: FORM_TEXT[lang].teslaOnly,
    });
}

export type BookingRequest = z.infer<ReturnType<typeof makeBookingSchema>>;
