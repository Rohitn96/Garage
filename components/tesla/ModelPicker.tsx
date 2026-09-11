"use client";

import { TESLA_COPY, TESLA_MODELS, type TeslaModel } from "@/data/tesla";
import { useT } from "@/lib/i18n";

/**
 * S · 3 · X · Y.
 *
 * The joke is why it is memorable; the reason it is HERE is that Tesla owners
 * genuinely identify by letter, so four letters make a better filter control
 * than a dropdown labelled "select your model" ever would. Picking one narrows
 * the service list below to the work that car actually needs — Model 3 and Y
 * get control arms, S and X get air suspension.
 *
 * Four equal columns spanning the full measure, each with its model name set
 * under the letter. Set as a tight left-hugged row it read as decoration and the
 * letters looked disabled; at full width with a name under each one it reads as
 * what it is — the page's primary control — and the gag still lands first.
 */
export function ModelPicker({
  selected,
  onSelect,
}: {
  selected: TeslaModel | null;
  onSelect: (model: TeslaModel | null) => void;
}) {
  const t = useT();

  return (
    <div>
      <div role="group" aria-label={t(TESLA_COPY.allModels)} className="grid grid-cols-4">
        {TESLA_MODELS.map((model) => {
          const on = model.code === selected;
          return (
            <button
              key={model.code}
              type="button"
              onClick={() => onSelect(on ? null : model.code)}
              aria-pressed={on}
              className={`group flex flex-col items-center border-t-2 pb-4 pt-5 transition-colors duration-300 ${
                on ? "border-accent" : "border-rule hover:border-ruleStrong"
              }`}
            >
              <span
                className={`font-display text-[clamp(3rem,11vw,7.5rem)] leading-[0.85] tracking-[-0.03em] transition-colors duration-300 ${
                  on ? "text-accent" : "text-ink/75 group-hover:text-ink"
                }`}
              >
                {model.code}
              </span>
              <span
                className={`mt-4 text-center font-mono text-[0.62rem] uppercase leading-relaxed tracking-label transition-colors duration-300 ${
                  on ? "text-accent" : "text-graphite group-hover:text-ink"
                }`}
              >
                {t(model.name)}
              </span>
              {/* The per-model note only earns its space on the chosen car. */}
              <span
                className={`mt-1 hidden text-center text-[0.78rem] leading-snug transition-colors duration-300 sm:block ${
                  on ? "text-graphite" : "text-graphite/0"
                }`}
              >
                {t(model.note)}
              </span>
            </button>
          );
        })}
      </div>

      {/* A live region: on a filter with no visible label a sighted user sees the
          list shrink, and a screen reader user gets nothing unless it is announced. */}
      <div
        aria-live="polite"
        className="mt-6 flex flex-wrap items-baseline gap-x-5 gap-y-2 border-t border-rule pt-4"
      >
        {selected ? (
          <>
            <p className="font-mono text-[0.68rem] uppercase tracking-label text-accent">
              {t(TESLA_COPY.showingFor)}{" "}
              {t(TESLA_MODELS.find((m) => m.code === selected)!.name)}
            </p>
            <button
              type="button"
              onClick={() => onSelect(null)}
              className="font-mono text-[0.66rem] uppercase tracking-label text-graphite underline underline-offset-4 transition-colors hover:text-ink"
            >
              {t(TESLA_COPY.allModels)}
            </button>
          </>
        ) : (
          <p className="font-mono text-[0.68rem] uppercase tracking-label text-graphite">
            {t(TESLA_COPY.allModels)}
          </p>
        )}
      </div>
    </div>
  );
}
