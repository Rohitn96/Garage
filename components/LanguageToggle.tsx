"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { swapLangHref, useLang, type Lang } from "@/lib/i18n";

const OPTIONS: Array<{ code: Lang; label: string; aria: string }> = [
  { code: "en", label: "EN", aria: "In English" },
  { code: "fi", label: "FI", aria: "Suomeksi" },
];

/**
 * EN / FI switch.
 *
 * Links, not buttons. Language is a route now, so switching it is navigation —
 * and that is the whole point: the Finnish page has an address, so it can be
 * linked, shared, bookmarked and indexed. A control that swapped state without
 * changing the URL would quietly undo all of that.
 *
 * Both options are always rendered rather than showing only the inactive one, so
 * the current language is stated rather than implied — a lone "FI" is ambiguous
 * about whether it is what you are reading or what you would switch to.
 *
 * `hrefLang` tells a crawler these point at translations of each other, which is
 * the same claim the `alternates.languages` metadata makes in the head.
 */
export function LanguageToggle({ className = "" }: { className?: string }) {
  const { lang } = useLang();
  const pathname = usePathname() ?? "/";

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {OPTIONS.map((option, i) => {
        const current = lang === option.code;
        return (
          <span key={option.code} className="flex items-center gap-2">
            {i > 0 && (
              <span aria-hidden className="text-graphite/50">
                /
              </span>
            )}
            <Link
              href={swapLangHref(pathname, option.code)}
              hrefLang={option.code}
              aria-label={option.aria}
              aria-current={current ? "true" : undefined}
              className={`font-mono text-[0.68rem] uppercase tracking-label transition-colors ${
                current ? "text-accent" : "text-graphite hover:text-ink"
              }`}
            >
              {option.label}
            </Link>
          </span>
        );
      })}
    </div>
  );
}
