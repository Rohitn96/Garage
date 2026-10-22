import Link from "@/components/Link";
import type { Lang } from "@/site.config";
import { pathOf, type RouteId } from "@/lib/routes";
import { ROUTE_NAMES } from "@/content/ui";
import { MODEL_CARDS, MODEL_IDS } from "@/content/models";
import { SERVICE_CARDS, SERVICE_IDS } from "@/content/services";
import { Icon, SERVICE_ICON } from "@/components/Icons";

/** S, 3, X, Y as four large links, each to its model page. */
export function ModelSelector({ lang, current }: { lang: Lang; current?: RouteId }) {
  return (
    <ul className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
      {MODEL_IDS.map((id) => {
        const card = MODEL_CARDS[id];
        const on = id === current;
        return (
          <li key={id}>
            <Link
              href={pathOf(id, lang)}
              aria-current={on ? "page" : undefined}
              className={`card card-link group relative flex h-full min-h-[11rem] flex-col justify-between overflow-hidden p-5 sm:p-6 ${on ? "shadow-[inset_0_0_0_2px_rgb(var(--accent))]" : ""}`}
            >
              <span
                aria-hidden
                className="pointer-events-none absolute -right-3 -top-6 font-display text-[9rem] font-extrabold leading-none text-ink/[0.04] transition-transform duration-3 group-hover:scale-105"
              >
                {card.letter}
              </span>
              <span
                className={`relative font-display text-[clamp(3rem,8vw,4.5rem)] font-extrabold leading-none transition-colors duration-2 ${
                  on ? "text-accent" : "text-ink group-hover:text-accent"
                }`}
              >
                {card.letter}
              </span>
              <span className="relative mt-6">
                <span className="flex items-center justify-between font-semibold">
                  {ROUTE_NAMES[lang][id]}
                  <span aria-hidden className="text-accent transition-transform duration-2 group-hover:translate-x-1">
                    →
                  </span>
                </span>
                <span className="mt-1 block text-step--1 text-muted">{card[lang]}</span>
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

/** Tesla services as linked cards with an icon each. */
export function ServiceGrid({ lang, ids = SERVICE_IDS }: { lang: Lang; ids?: typeof SERVICE_IDS }) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4">
      {ids.map((id) => (
        <li key={id}>
          <Link href={pathOf(id, lang)} className="card card-link group flex h-full flex-col gap-4 p-6">
            <span className="flex items-center justify-between">
              <span className="icon-tile">
                <Icon name={SERVICE_ICON[id]} className="h-6 w-6" />
              </span>
              <span aria-hidden className="text-muted transition-transform duration-2 group-hover:translate-x-1 group-hover:text-accent">
                →
              </span>
            </span>
            <span className="text-step-1 font-bold">{ROUTE_NAMES[lang][id]}</span>
            <span className="text-step--1 text-muted">{SERVICE_CARDS[id][lang]}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
