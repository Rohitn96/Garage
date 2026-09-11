"use client";

import { useState } from "react";
import { PRICE_TABLES, type PriceTable } from "@/data/pricing";
import { useT } from "@/lib/i18n";
import { CONTENT } from "@/lib/content";
import { Reveal } from "./Reveal";

/**
 * The site's one price list.
 *
 * Prices used to be in two places with two shapes — unrendered fields on the
 * service catalogue, and a hardcoded five-row array inside the trust section —
 * so the page quoted a Tesla package in one breath and listed twenty unpriced
 * services in the next. Everything is now in data/pricing.ts and rendered here,
 * and the 3D explorer names services without pricing any of them.
 *
 * `only` renders a single table without the tabs, for the Tesla page.
 */
export function Pricing({ only }: { only?: PriceTable["id"] }) {
  const t = useT();
  const c = CONTENT.pricing;
  const [tab, setTab] = useState<PriceTable["id"]>(only ?? "tesla");

  const tables = only ? PRICE_TABLES.filter((table) => table.id === only) : PRICE_TABLES;
  const visible = tables.find((table) => table.id === tab) ?? tables[0];

  return (
    <section id="pricing" className="rule-above">
      <div className="section">
        <div className="grid gap-x-12 gap-y-8 md:grid-cols-12">
          <Reveal className="md:col-span-5">
            <p className="label">{t(c.eyebrow)}</p>
            <h2 className="mt-7 max-w-[12ch] h-section">
              {t(c.headingA)} <em className="italic text-accent">{t(c.headingAccent)}</em>
            </h2>
          </Reveal>

          <Reveal delay={0.06} className="md:col-span-6 md:col-start-7">
            <p className="max-w-[46ch] text-[1.02rem] leading-relaxed text-graphite">
              {t(c.standfirst)}
            </p>
            <p className="mt-6 flex items-baseline gap-4 border-t border-rule pt-4">
              <span className="label">{t(c.labour)}</span>
              <span className="font-mono text-[0.95rem] text-accent">{t(c.labourRate)}</span>
            </p>
          </Reveal>
        </div>

        {!only && (
          <div
            role="tablist"
            aria-label={t(c.eyebrow)}
            className="mt-14 flex gap-2 border-b border-rule"
          >
            {PRICE_TABLES.map((table) => {
              const selected = table.id === visible.id;
              return (
                <button
                  key={table.id}
                  role="tab"
                  type="button"
                  aria-selected={selected}
                  aria-controls={`prices-${table.id}`}
                  id={`tab-${table.id}`}
                  onClick={() => setTab(table.id)}
                  className={`-mb-px border-b px-1 pb-3.5 pr-7 font-mono text-[0.7rem] uppercase tracking-label transition-colors ${
                    selected
                      ? "border-accent text-accent"
                      : "border-transparent text-graphite hover:text-ink"
                  }`}
                >
                  {t(c.tabs[table.id])}
                </button>
              );
            })}
          </div>
        )}

        <div
          key={visible.id}
          id={`prices-${visible.id}`}
          role={only ? undefined : "tabpanel"}
          aria-labelledby={only ? undefined : `tab-${visible.id}`}
          className={only ? "mt-14" : "mt-12"}
        >
          <div className="grid gap-x-12 gap-y-12 md:grid-cols-3">
            {visible.groups.map((group) => (
              <section key={group.title.en}>
                <h3 className="label border-b border-rule pb-3">{t(group.title)}</h3>
                <dl>
                  {group.rows.map((row) => (
                    <div
                      key={row.id}
                      className="flex items-baseline justify-between gap-5 border-b border-rule/60 py-3"
                    >
                      <dt className="text-[0.95rem] leading-snug">{t(row.service)}</dt>
                      <dd
                        className={`shrink-0 whitespace-nowrap font-mono text-[0.82rem] ${
                          row.price ? "text-accent" : "text-graphite/70"
                        }`}
                      >
                        {row.price ? t(row.price) : t(row.note ?? c.quoteOnly)}
                      </dd>
                    </div>
                  ))}
                </dl>
              </section>
            ))}
          </div>
        </div>

        {/* The caveat sits with the figures, not in a footer. Anything that puts
            a number on screen keeps its qualifier beside it. */}
        <p className="mt-10 max-w-[64ch] border-t border-rule pt-5 text-[0.82rem] leading-relaxed text-graphite">
          {t(c.disclaimer)}
        </p>
      </div>
    </section>
  );
}
