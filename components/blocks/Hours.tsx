import type { Lang } from "@/site.config";
import { hoursRows } from "@/lib/business";
import { UI } from "@/content/ui";

export function Hours({ lang, className = "" }: { lang: Lang; className?: string }) {
  const { rows, note } = hoursRows(lang);
  return (
    <div className={className}>
      <p className="label">{UI[lang].hours.title}</p>
      <dl className="mt-4 grid gap-3">
        {rows.map((row) => (
          <div key={row.label} className="grid grid-cols-[8rem_1fr] gap-4 border-t border-rule pt-3 text-step--1">
            <dt className="text-muted">{row.label}</dt>
            <dd>{row.value}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-4 text-step--1 text-muted">{note}</p>
    </div>
  );
}
