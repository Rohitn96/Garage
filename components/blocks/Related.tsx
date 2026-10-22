import Link from "@/components/Link";
import type { Lang } from "@/site.config";
import { pathOf, type RouteId } from "@/lib/routes";
import { ROUTE_NAMES, UI } from "@/content/ui";

export function RelatedLinks({ ids, lang, title }: { ids: RouteId[]; lang: Lang; title?: string }) {
  if (!ids.length) return null;
  return (
    <nav aria-label={title ?? UI[lang].related}>
      <p className="label">{title ?? UI[lang].related}</p>
      <ul className="mt-4 grid gap-2 sm:grid-cols-2">
        {ids.map((id) => (
          <li key={id}>
            <Link
              href={pathOf(id, lang)}
              className="card card-link group flex min-h-[56px] items-center justify-between gap-4 px-4 py-3"
            >
              <span className="font-medium">{ROUTE_NAMES[lang][id]}</span>
              <span aria-hidden className="font-mono text-accent transition-transform duration-2 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
