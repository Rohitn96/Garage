"use client";

import { useLang, type Lang } from "@/lib/i18n";

const OPTIONS: Array<{ code: Lang; label: string; aria: string }> = [
  { code: "en", label: "EN", aria: "Switch to English" },
  { code: "fi", label: "FI", aria: "Vaihda suomeksi" },
];

/**
 * EN / FI switch. Two buttons rather than one toggle, so the current language is
 * stated rather than implied — a lone "FI" is ambiguous about whether it shows
 * the current language or the one you would switch to.
 */
export function LanguageToggle({ className = "" }: { className?: string }) {
  const { lang, setLang } = useLang();

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {OPTIONS.map((option, i) => (
        <span key={option.code} className="flex items-center gap-2">
          {i > 0 && (
            <span aria-hidden className="text-graphite/50">
              /
            </span>
          )}
          <button
            type="button"
            onClick={() => setLang(option.code)}
            aria-label={option.aria}
            aria-current={lang === option.code ? "true" : undefined}
            className={`font-mono text-[0.68rem] uppercase tracking-label transition-colors ${
              lang === option.code
                ? "text-pine"
                : "text-graphite hover:text-ink"
            }`}
          >
            {option.label}
          </button>
        </span>
      ))}
    </div>
  );
}
