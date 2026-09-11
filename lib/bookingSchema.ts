import { z } from "zod";
import { CONTENT } from "./content";
import type { Lang } from "./i18n";

/**
 * Built per-language so validation messages match the page.
 *
 * The vehicle field takes a model OR a registration, deliberately. Asking a
 * pre-launch visitor to go and find their plate is a barrier at exactly the
 * wrong moment, and "Model 3, 2021" tells us as much as "ABC-123" does. The
 * phone rule is loose for the same reason — enough digits to be dialable.
 */
export function makeBookingSchema(lang: Lang) {
  const v = CONTENT.validation;
  return z.object({
    name: z.string().trim().min(2, v.name[lang]).max(80, v.tooLong[lang]),
    vehicle: z.string().trim().min(2, v.vehicle[lang]).max(60, v.tooLong[lang]),
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
