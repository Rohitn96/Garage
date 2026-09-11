"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Wordmark } from "./Wordmark";
import { LanguageToggle } from "./LanguageToggle";
import { useHref, useT } from "@/lib/i18n";
import { CONTENT } from "@/lib/content";

/**
 * The site had no navigation at all. On a page fifteen viewport-heights tall
 * that left two hero links and a scroll hint as the entire wayfinding system —
 * once a visitor was past the fold there was no route to the prices or the
 * phone number except scrolling and hoping.
 *
 * Links are absolute (`/#pricing`, not `#pricing`) so the same bar works from
 * the Tesla page, where those sections do not exist.
 *
 * It is transparent over the hero and takes a ground and a hairline once the
 * page has moved, so it never competes with the headline but is always there.
 */
const LINKS = [
  { href: "/tesla/", key: "tesla" as const },
  { href: "/#services", key: "services" as const },
  { href: "/#pricing", key: "pricing" as const },
  { href: "/#contact", key: "contact" as const },
];

export function Nav() {
  const t = useT();
  const h = useHref();
  const c = CONTENT.nav;
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Route changes close the sheet; so does Escape, which is the only way out
  // for a keyboard user once it is open.
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open
          ? "border-b border-rule bg-paper/90 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <nav
        aria-label={t(c.menu)}
        className="mx-auto flex h-16 w-full max-w-page items-center justify-between gap-6 px-6 md:h-[4.5rem] md:px-10"
      >
        <Link href={h("/")} aria-label={t(c.backHome)} className="shrink-0">
          <Wordmark className="text-[1.5rem] md:text-[1.7rem]" />
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {LINKS.map((link) => {
            // Matches /tesla/ and /fi/tesla/ alike.
            const current =
              link.href.startsWith("/tesla") && /^\/(fi\/)?tesla(\/|$)/.test(pathname ?? "");
            return (
              <Link
                key={link.key}
                href={h(link.href)}
                aria-current={current ? "page" : undefined}
                className={`font-mono text-[0.7rem] uppercase tracking-label transition-colors hover:text-accent ${
                  current ? "text-accent" : "text-graphite"
                }`}
              >
                {t(c[link.key])}
              </Link>
            );
          })}
          <LanguageToggle />
          <Link href={h("/#contact")} className="btn-accent">
            {t(c.book)}
          </Link>
        </div>

        <div className="flex items-center gap-5 md:hidden">
          <LanguageToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="font-mono text-[0.7rem] uppercase tracking-label text-ink"
          >
            {open ? t(c.close) : t(c.menu)}
          </button>
        </div>
      </nav>

      <div
        id="mobile-nav"
        hidden={!open}
        className="border-t border-rule bg-paper px-6 pb-7 pt-2 md:hidden"
      >
        <ul>
          {LINKS.map((link) => (
            <li key={link.key} className="border-b border-rule/70">
              <Link
                href={h(link.href)}
                onClick={() => setOpen(false)}
                className="block py-4 font-display text-[1.5rem] tracking-[-0.01em]"
              >
                {t(c[link.key])}
              </Link>
            </li>
          ))}
        </ul>
        <Link href={h("/#contact")} onClick={() => setOpen(false)} className="btn-accent mt-6">
          {t(c.book)}
        </Link>
      </div>
    </header>
  );
}
