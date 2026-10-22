"use client";

import Link from "@/components/Link";
import { usePathname } from "next/navigation";
import { useLang } from "@/lib/i18n";
import { alternatePath } from "@/lib/routes";
import { UI } from "@/content/ui";
import type { Lang } from "@/site.config";

const OPTIONS: Lang[] = ["en", "fi"];

/**
 * FI / EN. Links, not buttons: each language is its own URL, and the registry
 * maps this page to its translation even though the slugs differ.
 */
export function LanguageToggle({ className = "" }: { className?: string }) {
  const lang = useLang();
  const pathname = usePathname() ?? "/";

  return (
    <div className={`flex items-center font-mono text-step--2 uppercase tracking-label ${className}`}>
      {OPTIONS.map((code, i) => {
        const current = code === lang;
        return (
          <span key={code} className="flex items-center">
            {i > 0 && (
              <span aria-hidden className="px-1 text-faint">
                /
              </span>
            )}
            <Link
              href={alternatePath(pathname, code)}
              hrefLang={code}
              lang={code}
              aria-label={UI[code].lang[code]}
              aria-current={current ? "page" : undefined}
              className={`inline-flex min-h-[44px] items-center px-1.5 transition-colors duration-1 ${
                current ? "text-accent" : "text-muted hover:text-ink"
              }`}
            >
              {code.toUpperCase()}
            </Link>
          </span>
        );
      })}
    </div>
  );
}
