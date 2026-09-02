import { z } from "zod";
import { CONTENT } from "./content";
import type { Lang } from "./i18n";

/**
 * Built per-language so validation messages match the page.
 *
 * Registration numbers stay deliberately loose: Finnish plates come in several
 * formats, plus imports and foreign plates, and rejecting a customer's real
 * plate is worse than accepting a typo we can query when we call back. The
 * phone rule is loose for the same reason — enough digits to be dialable.
 */
export function makeBookingSchema(lang: Lang) {
  const v = CONTENT.validation;
  return z.object({
    name: z.string().trim().min(2, v.name[lang]).max(80, v.tooLong[lang]),
    registration: z
      .string()
      .trim()
      .min(2, v.registration[lang])
      .max(20, v.tooLong[lang]),
    email: z.email(v.email[lang]).max(120),
    phone: z
      .string()
      .trim()
      .min(6, v.phone[lang])
      .max(28, v.tooLong[lang])
      .regex(/^[+0-9][0-9\s().-]*$/, v.phoneFormat[lang]),
    message: z.string().trim().min(10, v.message[lang]).max(2000, v.tooLong[lang]),
  });
}

export type BookingRequest = z.infer<ReturnType<typeof makeBookingSchema>>;
