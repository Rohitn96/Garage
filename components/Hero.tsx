"use client";

import Link from "next/link";
import { VideoBackdrop } from "./VideoBackdrop";
import { useHref, useLang, useT } from "@/lib/i18n";
import { openingNote } from "@/lib/business";
import { CONTENT } from "@/lib/content";

/**
 * The entrance is the CSS `.rise` animation (app/globals.css), not Framer Motion.
 * Framer serialised `opacity:0` into the server HTML, which held the page's
 * Largest Contentful Paint back until hydration. Reduced motion is handled in
 * the same stylesheet, so there is no hook and no post-mount flip.
 */
const delay = (ms: number) => ({ animationDelay: `${ms}ms` });

export function Hero() {
  const t = useT();
  const h = useHref();
  const { lang } = useLang();
  const c = CONTENT.hero;
  // Before opening day this leads with the date; after it, with what the shop is.
  const opening = openingNote(lang);

  return (
    <section className="relative min-h-[100svh] overflow-hidden px-6 pb-10 pt-16 md:px-10 md:pt-[4.5rem]">
      <VideoBackdrop src="/videos/hero.mp4" poster="/videos/hero-poster.jpg" eager />

      <div className="relative mx-auto flex min-h-[calc(100svh-6rem)] w-full max-w-page flex-col">
        <div className="flex flex-1 flex-col justify-center py-14 md:py-20">
          <p className="rise label mb-8">
            {opening ? `${opening} · ${t(CONTENT.nav.location)}` : t(c.eyebrow)}
          </p>

          {/* Two lines, not three. The old headline spent its whole width on a
              tagline that said nothing a hundred other garages do not say. */}
          <h1
            style={delay(80)}
            className="rise max-w-[16ch] font-display text-[clamp(2.6rem,7vw,5.5rem)] font-normal leading-[0.96] tracking-[-0.02em]"
          >
            {t(c.headlineA)}
            <br />
            <span className="text-accent">{t(c.headlineAccent)}</span>
          </h1>

          <div className="mt-12 grid gap-10 border-t border-rule pt-8 md:grid-cols-12">
            <p
              style={delay(160)}
              className="rise max-w-[44ch] text-[1.0625rem] leading-relaxed text-graphite md:col-span-6"
            >
              {t(c.standfirst)}
            </p>

            <div
              style={delay(240)}
              className="rise flex flex-wrap items-center gap-x-8 gap-y-4 md:col-span-5 md:col-start-8 md:justify-end"
            >
              <Link href="#contact" className="btn-accent">
                {t(c.ctaPrimary)}
              </Link>
              <Link href={h("/tesla/")} className="link-underline text-[0.95rem] font-medium">
                {t(c.ctaSecondary)}
              </Link>
            </div>
          </div>
        </div>

        {/* Credential strip: the three things a visitor needs to know before
            they decide whether this page is for them. */}
        <ul style={delay(320)} className="rise grid gap-y-3 border-t border-rule pt-5 sm:grid-cols-3">
          {c.credentials.map((item) => (
            <li key={item.en} className="flex items-center gap-3">
              <span aria-hidden className="h-px w-5 shrink-0 bg-accent" />
              <span className="font-mono text-[0.66rem] uppercase tracking-label text-graphite">
                {t(item)}
              </span>
            </li>
          ))}
        </ul>

        <a
          href="#services"
          className="label mt-5 flex items-center gap-3 border-t border-rule pt-5 transition-colors hover:text-ink"
        >
          <span>{t(c.scroll)}</span>
          <span aria-hidden className="h-px w-10 bg-rule" />
        </a>
      </div>
    </section>
  );
}
