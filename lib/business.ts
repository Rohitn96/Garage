import { SITE, type Lang } from "@/site.config";
import { UI } from "@/content/ui";

/** Derived business facts. The facts themselves live in site.config.ts. */

/** "Halli 3, Kytkintie 38, 00770 Helsinki" */
export function addressLine(lang: Lang): string {
  const b = SITE.business;
  return `${b.unit[lang]}, ${b.street}, ${b.postalCode} ${b.city}`;
}

export function streetAddress(lang: Lang): string {
  return `${SITE.business.unit[lang]}, ${SITE.business.street}`;
}

export const TEL_HREF = `tel:${SITE.business.phone}`;

/** wa.me wants bare digits: the phone with the punctuation taken out. */
export const WHATSAPP_URL = `https://wa.me/${SITE.business.phone.replace(/\D/g, "")}`;

/** "9.00" from "09:00". */
function clock(value: string, lang: Lang): string {
  const [h, m] = value.split(":");
  return lang === "fi" ? `${Number(h)}.${m}` : `${Number(h)}:${m}`;
}

function span(range: { opens: string; closes: string }, lang: Lang): string {
  return lang === "fi"
    ? `klo ${clock(range.opens, lang)} alkaen, ${clock(range.closes, lang)} asti`
    : `${clock(range.opens, lang)} to ${clock(range.closes, lang)}`;
}

export type HoursRow = { label: string; value: string };

/**
 * Opening hours as display rows. Weekend times appear only once they are set
 * in site.config.ts; until then the weekend row says what is known.
 */
export function hoursRows(lang: Lang): { rows: HoursRow[]; note: string } {
  const t = UI[lang].hours;
  const { saturday, sunday } = SITE.hours.weekend;
  const rows: HoursRow[] = [{ label: t.weekdays, value: t.weekdaysValue }];

  if (saturday || sunday) {
    rows.push({ label: t.saturday, value: saturday ? span(saturday, lang) : "" });
    rows.push({ label: t.sunday, value: sunday ? span(sunday, lang) : "" });
  } else {
    rows.push({ label: t.weekend, value: `${t.weekendFullDays}. ${t.weekendTbc}.` });
  }

  const req = SITE.hours.weekendAppointmentRequired;
  const note = req === true ? t.appointmentRequired : req === false ? t.dropInOk : t.bookAhead;
  return { rows: rows.filter((row) => row.value), note };
}
