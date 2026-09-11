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

/** One-line postal address, as it should read on screen. */
export const ADDRESS_LINE = `${BUSINESS.street}, ${BUSINESS.postalCode} ${BUSINESS.city}`;
