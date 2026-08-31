"use client";

import { priceLabel, type ServiceGroup } from "@/data/services";

/**
 * The compact price callout anchored to a part.
 *
 * Deliberately has no max-height and no overflow: the page scroll is the only
 * scroll in this section. That constraint is why it shows job name + price
 * only — the one-line blurbs live in the sr-only catalogue, so dropping them
 * here costs nothing that a screen reader or a crawler can see.
 *
 * Shared by the WebGL and SVG renderings so both read as the same UI.
 */
export function Callout({
  group,
  index,
  total,
  className = "",
}: {
  group: ServiceGroup;
  index: number;
  total: number;
  className?: string;
}) {
  return (
    <div
      className={`w-[248px] rounded-lg border border-line/90 bg-graphite/90 px-3.5 py-3 shadow-[0_8px_28px_rgba(0,0,0,0.55)] backdrop-blur-sm ${className}`}
    >
      <p className="text-[0.62rem] uppercase tracking-[0.16em] text-rust">
        {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </p>
      <h3 className="mt-1 font-display text-[0.95rem] font-bold uppercase leading-tight tracking-tight text-chalk">
        {group.title}
      </h3>
      <ul className="mt-2.5 grid gap-1.5">
        {group.items.map((item) => (
          <li
            key={item.id}
            className="flex items-baseline justify-between gap-3 border-t border-line/60 pt-1.5 first:border-t-0 first:pt-0"
          >
            <span className="text-[0.78rem] leading-snug text-chalk">{item.name}</span>
            <span
              className={`shrink-0 whitespace-nowrap text-[0.72rem] font-semibold ${
                item.quoteOnly ? "text-fog" : "text-rust"
              }`}
            >
              {priceLabel(item)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Short pointer line from the anchor point out to the callout, with a dot on
 * the part itself. Purely decorative — the connection is also implicit in the
 * highlight on the part.
 */
export function Connector({
  orientation,
  length = 56,
  /** For "up": horizontal position of the line, e.g. "62%". Lets the connector
   *  track the part while the card itself stays centred and inside the viewport. */
  offsetLeft = "50%",
}: {
  orientation: "left" | "right" | "up";
  length?: number;
  offsetLeft?: string;
}) {
  if (orientation === "up") {
    return (
      <span
        aria-hidden
        className="pointer-events-none absolute top-0 flex -translate-x-1/2 flex-col items-center"
        style={{ height: length, left: offsetLeft }}
      >
        <span className="h-2 w-2 rounded-full bg-rust ring-2 ring-rust/25" />
        <span className="w-px flex-1 bg-gradient-to-b from-rust to-rust/40" />
      </span>
    );
  }

  // `orientation` is where the CARD sits relative to the part, so the connector
  // hangs off the card's opposite edge and the dot always lands on the part.
  const cardOnRight = orientation === "right";
  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute top-1/2 flex -translate-y-1/2 items-center ${
        cardOnRight ? "right-full" : "left-full flex-row-reverse"
      }`}
      style={{ width: length }}
    >
      <span className="h-2 w-2 shrink-0 rounded-full bg-rust ring-2 ring-rust/25" />
      <span
        className={`h-[1.5px] flex-1 ${
          cardOnRight ? "bg-gradient-to-r from-rust to-rust/40" : "bg-gradient-to-l from-rust to-rust/40"
        }`}
      />
    </span>
  );
}
