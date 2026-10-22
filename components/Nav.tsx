"use client";

import { useEffect, useState } from "react";
import Link from "@/components/Link";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";
import { LanguageToggle } from "./LanguageToggle";
import { ThemeToggle } from "./ThemeToggle";
import { OfferSwitch } from "./OfferSwitch";
import { useLang } from "@/lib/i18n";
import { pathOf, routeByPath, trail, type RouteId } from "@/lib/routes";
import { contactHref } from "@/lib/links";
import { ROUTE_NAMES, UI } from "@/content/ui";

const LINKS: Array<{ id: RouteId; key: keyof (typeof UI)["fi"]["nav"] }> = [
  { id: "tesla", key: "tesla" },
  { id: "ev", key: "ev" },
  { id: "other", key: "other" },
  { id: "weekend", key: "weekend" },
  { id: "blog", key: "blog" },
  { id: "contact", key: "contact" },
];

/**
 * Sticky, solid bar. The persistent call to action reads "Free diagnosis"
 * while the launch offer runs and "Request a quote" after it, with no rebuild.
 */
export function Nav() {
  const lang = useLang();
  const t = UI[lang];
  const pathname = usePathname() ?? "/";
  const [open, setOpen] = useState(false);

  // Which top-level section the current page sits in, for aria-current.
  const here = routeByPath(pathname);
  const section = here ? trail(here.id)[1] ?? here.id : null;

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const cta = (
    <OfferSwitch
      as="span"
      live={
        <Link href={contactHref(lang, "diagnosis")} className="btn-primary">
          {t.cta.freeDiagnosis}
        </Link>
      }
      ended={
        <Link href={contactHref(lang, "quote")} className="btn-primary">
          {t.cta.requestQuote}
        </Link>
      }
    />
  );

  return (
    <header className="sticky top-0 z-50 border-b border-rule bg-ground/95 backdrop-blur supports-[backdrop-filter]:bg-ground/85">
      <nav aria-label={t.mainNav} className="wrap flex h-16 items-center justify-between gap-4 lg:h-[4.5rem]">
        <Link href={pathOf("home", lang)} aria-label={`Revamp Motors, ${ROUTE_NAMES[lang].home}`} className="shrink-0">
          <Logo alt="" className="h-7 sm:h-8 lg:h-9" />
        </Link>

        <ul className="hidden items-center gap-5 xl:gap-7 lg:flex">
          {LINKS.map((link) => {
            const current = section === link.id;
            return (
              <li key={link.id}>
                <Link
                  href={pathOf(link.id, lang)}
                  aria-current={current ? "page" : undefined}
                  className={`inline-flex min-h-[44px] items-center text-step--1 font-medium transition-colors duration-1 hover:text-accent ${
                    current ? "text-accent" : "text-ink"
                  }`}
                >
                  {t.nav[link.key]}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="hidden items-center gap-2 lg:flex">
          <LanguageToggle />
          <ThemeToggle />
          <span className="ml-2">{cta}</span>
        </div>

        <div className="flex items-center gap-1 lg:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="inline-flex min-h-[44px] items-center gap-2 rounded px-3 font-mono text-step--2 uppercase tracking-label text-ink"
          >
            <span aria-hidden className="grid gap-1">
              <span className={`block h-px w-4 bg-current transition-transform duration-2 ${open ? "translate-y-[2.5px] rotate-45" : ""}`} />
              <span className={`block h-px w-4 bg-current transition-transform duration-2 ${open ? "-translate-y-[2.5px] -rotate-45" : ""}`} />
            </span>
            {open ? t.close : t.menu}
          </button>
        </div>
      </nav>

      <div id="mobile-menu" hidden={!open} className="border-t border-rule bg-ground lg:hidden">
        <div className="wrap max-h-[calc(100svh-4rem)] overflow-y-auto pb-8 pt-2">
          <ul>
            {LINKS.map((link) => (
              <li key={link.id} className="border-b border-rule">
                <Link
                  href={pathOf(link.id, lang)}
                  aria-current={section === link.id ? "page" : undefined}
                  className="flex min-h-[56px] items-center justify-between font-display text-step-2 font-bold aria-[current=page]:text-accent"
                >
                  {t.nav[link.key]}
                  <span aria-hidden className="font-mono text-step--1 text-faint">
                    /
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex items-center justify-between gap-4">
            <LanguageToggle />
            {cta}
          </div>
        </div>
      </div>
    </header>
  );
}
