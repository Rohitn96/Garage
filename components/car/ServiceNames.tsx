import type { ServiceGroup } from "@/data/services";
import { pick, type Lang } from "@/lib/i18n";

/**
 * The service names for one region: a rule, the region title, and the list.
 *
 * Takes `lang` as a prop rather than reading context, because one of its two
 * callers renders INSIDE the R3F <Canvas>. Canvas runs its own React reconciler
 * root, so context from the DOM tree does not reach it — the labels silently
 * fell back to the provider's default and stayed English while the rest of the
 * page switched. Passing the value down is the fix that cannot regress.
 */
export function ServiceNames({
  group,
  lang,
  align = "left",
}: {
  group: ServiceGroup;
  lang: Lang;
  align?: "left" | "right" | "center";
}) {
  const rowAlign =
    align === "right" ? "flex-row-reverse" : align === "center" ? "justify-center" : "";
  const textAlign =
    align === "right" ? "text-right" : align === "center" ? "text-center" : "";

  return (
    <>
      <div className={"mb-2.5 flex items-center gap-2.5 " + rowAlign}>
        <span aria-hidden className="h-px w-6 bg-pine" />
        <span className="font-mono text-[0.66rem] uppercase tracking-label text-pine">
          {pick(group.title, lang)}
        </span>
      </div>
      <ul className={textAlign}>
        {group.items.map((item) => (
          <li
            key={item.id}
            className="font-display text-[1.4rem] leading-[1.3] tracking-[-0.01em] text-ink"
          >
            {pick(item.name, lang)}
          </li>
        ))}
      </ul>
    </>
  );
}
