/**
 * The canonical business facts, in one place.
 *
 * The footer used to hardcode the address as a literal and nothing else knew it.
 * Now the footer, the structured data and anything added later read the same
 * object, so there is exactly one line to change when the phone number lands.
 *
 * Everything here is VERIFIED, not placeholder: the company ID resolves against
 * the PRH open-data register to Revamp Motors, osakeyhtiö, registered
 * 2026-08-31. `phone` is deliberately null rather than a fake number — an
 * invented phone number in structured data is worse than no phone number,
 * because Google will publish it.
 */
export const BUSINESS = {
  name: "Revamp Motors",
  street: "Kytkintie 38",
  postalCode: "00770",
  city: "Helsinki",
  /** The industrial district; the local name people actually navigate by. */
  district: "Tattarisuo",
  country: "FI",
  email: "revampmotors1@gmail.com",
  companyId: "3651428-1",
  /** Registration date, per PRH. Not the opening date. */
  founded: "2026-08-31",
  phone: null as string | null,
} as const;

/**
 * The day the shop opens, as an ISO date — or null once it is simply trading.
 *
 * ONE LINE CHANGES THE WHOLE SITE. Set it and the hero eyebrow and the footer
 * both announce the date, in Finnish and in English; set it back to null on
 * opening day and every one of those lines quietly becomes the plain
 * "we are here, book a slot" version. Nothing else has to be edited, which is
 * the point: the old copy said "the first week of October" in five places and
 * in two languages.
 */
export const OPENING_DATE: string | null = null;

/**
 * "Avaamme 6. lokakuuta" / "Opening 6 October", or null when there is no date.
 *
 * Formatted in UTC on purpose: a date-only string parsed in a local timezone
 * behind UTC lands on the previous day, which would advertise the wrong one.
 */
export function openingNote(lang: "en" | "fi"): string | null {
  if (!OPENING_DATE) return null;
  const when = new Date(`${OPENING_DATE}T12:00:00Z`);
  if (Number.isNaN(when.getTime())) return null;
  const day = new Intl.DateTimeFormat(lang === "fi" ? "fi-FI" : "en-GB", {
    day: "numeric",
    month: "long",
    timeZone: "UTC",
  }).format(when);
  return lang === "fi" ? `Avaamme ${day}` : `Opening ${day}`;
}

/** One-line postal address, as it should read on screen. */
export const ADDRESS_LINE = `${BUSINESS.street}, ${BUSINESS.postalCode} ${BUSINESS.city}`;
