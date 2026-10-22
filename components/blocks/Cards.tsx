import Link from "next/link";
import type { CSSProperties } from "react";
import type { Lang } from "@/site.config";
import { pathOf, type RouteId } from "@/lib/routes";
import { ROUTE_NAMES } from "@/content/ui";
import { MODEL_CARDS, MODEL_IDS } from "@/content/models";
import { SERVICE_CARDS, SERVICE_IDS } from "@/content/services";

/** S, 3, X, Y as four large links, each to its model page. */
export function ModelSelector({ lang, current }: { lang: Lang; current?: RouteId }) {
  return (
    <ul className="grid grid-cols-2 gap-px overflow-hidden rounded border border-rule bg-rule md:grid-cols-4">
      {MODEL_IDS.map((id) => {
        const card = MODEL_CARDS[id];
        const on = id === current;
        return (
          <li key={id} className="bg-ground">
            <Link
              href={pathOf(id, lang)}
              aria-current={on ? "page" : undefined}
              className={`group relative flex h-full min-h-[10rem] flex-col justify-between p-5 transition-colors duration-2 hover:bg-surface sm:p-6 ${on ? "bg-surface" : ""}`}
            >
              <span className="font-mono text-step--2 uppercase tracking-label text-muted">Tesla</span>
              <span
                className={`font-display text-[clamp(3.5rem,9vw,6rem)] font-black leading-none transition-colors duration-2 [font-variation-settings:'wdth'_125] ${
                  on ? "text-accent" : "text-ink group-hover:text-accent"
                }`}
              >
                {card.letter}
              </span>
              <span>
                <span className="block font-semibold">{ROUTE_NAMES[lang][id]}</span>
                <span className="mt-1 block text-step--1 text-muted">{card[lang]}</span>
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

/** The seven Tesla systems as linked cards with their system code. */
export function ServiceGrid({ lang, ids = SERVICE_IDS }: { lang: Lang; ids?: typeof SERVICE_IDS }) {
  return (
    <ul className="grid gap-px overflow-hidden rounded border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-3">
      {ids.map((id) => {
        const card = SERVICE_CARDS[id];
        return (
          <li key={id} className="bg-ground">
            <Link href={pathOf(id, lang)} className="group flex h-full flex-col gap-4 p-6 transition-colors duration-2 hover:bg-surface">
              <span className="flex items-center justify-between font-mono text-step--2 uppercase tracking-label">
                <span className="text-accent">{card.code}</span>
                <span aria-hidden className="text-faint transition-transform duration-2 group-hover:translate-x-1 group-hover:text-accent">
                  →
                </span>
              </span>
              <span className="text-step-1 font-bold">{ROUTE_NAMES[lang][id]}</span>
              <span className="text-step--1 text-muted">{card[lang]}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

/**
 * Hero panel: the order a diagnosis works through the car. An illustration of
 * the process, labelled as such; it shows no data and no fake readings. The
 * scan line moves; under reduced motion it is not drawn at all.
 */
export function ScanPanel({
  lang,
  title,
  caption,
  states,
}: {
  lang: Lang;
  title: string;
  caption: string;
  states: { scan: string; ok: string; queued: string };
}) {
  const rows = SERVICE_IDS.map((id, i) => ({
    id,
    code: SERVICE_CARDS[id].code,
    name: ROUTE_NAMES[lang][id],
    state: i < 3 ? "ok" : i === 3 ? "scan" : "queued",
  }));
  return (
    <figure className="corners card relative overflow-hidden">
      <div className="flex items-center justify-between border-b border-rule px-5 py-3">
        <span className="label">{title}</span>
        <span className="chip chip-accent">{states.scan}</span>
      </div>
      <ol className="relative">
        {rows.map((row) => (
          <li key={row.id} className="flex items-center justify-between gap-4 border-b border-rule px-5 py-3 last:border-b-0">
            <span className="flex min-w-0 items-center gap-3">
              <span className="whitespace-nowrap font-mono text-step--2 text-faint">{row.code}</span>
              <span className="truncate text-step--1">{row.name}</span>
            </span>
            <span
              className={`chip shrink-0 ${row.state === "ok" ? "chip-ok" : row.state === "scan" ? "chip-accent" : ""}`}
            >
              {row.state === "ok" ? states.ok : row.state === "scan" ? states.scan : states.queued}
            </span>
          </li>
        ))}
        <span
          aria-hidden
          style={{ "--scan-distance": "700%" } as CSSProperties}
          className="pointer-events-none absolute inset-x-0 top-0 h-[calc(100%/7)] bg-gradient-to-b from-transparent via-accent/10 to-transparent motion-safe:animate-[scan_6s_linear_infinite] motion-reduce:hidden"
        />
      </ol>
      <figcaption className="border-t border-rule px-5 py-3 text-step--2 text-muted">{caption}</figcaption>
    </figure>
  );
}
