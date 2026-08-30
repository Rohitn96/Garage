import { z } from "zod";

/**
 * Shared by the form and the route handler, so the browser and the server agree
 * on what a valid booking request is.
 *
 * Registration numbers are deliberately loose: Finnish plates come in several
 * formats (ABC-123, new-style, personalised, and imports on foreign plates), and
 * rejecting a customer's real plate is worse than accepting a typo we can query
 * when we call them back.
 */
export const bookingSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please tell us your name.")
    .max(80, "That name is longer than we can store."),
  registration: z
    .string()
    .trim()
    .min(2, "Please add your registration number.")
    .max(20, "That does not look like a registration number."),
  email: z.email("Please check your email address.").max(120),
  message: z
    .string()
    .trim()
    .min(10, "A sentence or two about the car helps us come back with a useful answer.")
    .max(2000, "Please keep it under 2000 characters."),
});

export type BookingRequest = z.infer<typeof bookingSchema>;
