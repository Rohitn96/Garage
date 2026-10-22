import Link from "@/components/Link";
import type { Lang } from "@/site.config";
import { pathOf, trail, type RouteId } from "@/lib/routes";
import { ROUTE_NAMES, UI } from "@/content/ui";
import { breadcrumbSchema } from "@/lib/schema";
import { JsonLd } from "./JsonLd";

/** Visible trail plus the matching BreadcrumbList. Not shown on the home page. */
export function Breadcrumbs({ id, lang }: { id: RouteId; lang: Lang }) {
  const ids = trail(id);
  if (ids.length < 2) return null;
  const names = ROUTE_NAMES[lang];
  return (
    <>
      <nav aria-label={UI[lang].breadcrumb} className="wrap pt-6">
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-step--2 uppercase tracking-label text-muted">
          {ids.map((crumb, i) => {
            const last = i === ids.length - 1;
            return (
              <li key={crumb} className="flex items-center gap-2">
                {i > 0 && <span aria-hidden className="text-faint">/</span>}
                {last ? (
                  <span aria-current="page" className="text-ink">
                    {names[crumb]}
                  </span>
                ) : (
                  <Link href={pathOf(crumb, lang)} className="inline-flex min-h-[32px] items-center hover:text-ink">
                    {names[crumb]}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd data={breadcrumbSchema(ids, lang)} />
    </>
  );
}
