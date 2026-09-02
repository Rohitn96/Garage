"use client";

import type { ServiceGroup } from "@/data/services";
import { useT } from "@/lib/i18n";

/**
 * The service names for one region: a rule, the region title, and the list.
 *
 * Shared by the desktop label (projected from the part inside the canvas) and
 * the phone label (a plain block at the foot of the stage), so both read as the
 * same piece of typography.
 */
export function ServiceNames({
  group,
  align = "left",
}: {
  group: ServiceGroup;
  align?: "left" | "right" | "center";
}) {
  const t = useT();
  const rowAlign =
    align === "right" ? "flex-row-reverse" : align === "center" ? "justify-center" : "";
  const textAlign =
    align === "right" ? "text-right" : align === "center" ? "text-center" : "";

  return (
    <>
      <div className={"mb-2.5 flex items-center gap-2.5 " + rowAlign}>
        <span aria-hidden className="h-px w-6 bg-pine" />
        <span className="font-mono text-[0.66rem] uppercase tracking-label text-pine">
          {t(group.title)}
        </span>
      </div>
      <ul className={textAlign}>
        {group.items.map((item) => (
          <li
            key={item.id}
            className="font-display text-[1.4rem] leading-[1.3] tracking-[-0.01em] text-ink"
          >
            {t(item.name)}
          </li>
        ))}
      </ul>
    </>
  );
}
