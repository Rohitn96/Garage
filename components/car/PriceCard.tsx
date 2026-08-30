"use client";

import { priceLabel, type ServiceItem } from "@/data/services";

export function PriceCard({ item }: { item: ServiceItem }) {
  const quote = item.quoteOnly === true;

  return (
    <li className="rounded-xl border border-line bg-steel/80 p-4 backdrop-blur-sm transition-colors hover:border-fog/50">
      <div className="flex items-baseline justify-between gap-4">
        <h4 className="font-display text-[0.95rem] font-semibold leading-snug text-chalk">
          {item.name}
        </h4>
        <span
          className={`shrink-0 whitespace-nowrap text-sm font-semibold ${
            quote ? "text-fog" : "text-rust"
          }`}
        >
          {priceLabel(item)}
        </span>
      </div>
      <p className="mt-1.5 text-sm leading-relaxed text-fog">{item.blurb}</p>
    </li>
  );
}
