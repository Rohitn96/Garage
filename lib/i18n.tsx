"use client";

import { createContext, useCallback, useContext, type ReactNode } from "react";

export type Lang = "en" | "fi";

/** A string that exists in both languages. */
export type Localized = { en: string; fi: string };

export const LANGS: readonly Lang[] = ["en", "fi"] as const;

export function pick(value: Localized, lang: Lang): string {
  return value[lang];
}

/**
 * Language comes from the URL, not from storage.
 *
 * It used to be a localStorage flag: English was always what the server
 * rendered, and a returning Finnish visitor got a one-frame swap after mount.
 * That had three consequences worth stating plainly, because they are the
 * reason this was rewritten:
 *
 *   - a Finnish page could not be linked, shared or bookmarked as Finnish
 *   - search engines only ever saw the English copy, so a Finnish customer
 *     searching "Tesla huolto Helsinki" could not find the site at all
 *   - <html lang> was corrected by an effect, after the markup had already
 *     claimed the wrong language
 *
 * For a garage in Helsinki the Finnish copy is the more commercially important
 * of the two, so it now has real routes: English at `/`, Finnish under `/fi/`.
 * Each tree has its own root layout, its own `<html lang>` and its own metadata,
 * and the two are cross-declared with hreflang.
 *
 * There is deliberately no `setLang`. Switching language is navigation.
 */
const LanguageContext = createContext<Lang>("en");

export function LanguageProvider({
  lang,
  children,
}: {
  lang: Lang;
  children: ReactNode;
}) {
  return <LanguageContext.Provider value={lang}>{children}</LanguageContext.Provider>;
}

export function useLang(): { lang: Lang } {
  return { lang: useContext(LanguageContext) };
}

/** Resolve a Localized value in the active language. */
export function useT(): (value: Localized) => string {
  const lang = useContext(LanguageContext);
  return useCallback((value: Localized) => value[lang], [lang]);
}

/**
 * Prefix an internal path for the active language.
 *
 * Pass the bare path ("/", "/tesla/", "/#pricing"); hash-only links
 * ("#contact") are returned untouched, because they resolve within whichever
 * page is already open and are therefore language-correct by construction.
 *
 * FINNISH IS THE UNPREFIXED LANGUAGE. The shop is in Helsinki and its customers
 * search in Finnish, so Finnish holds `/` and English sits under `/en/`. Every
 * link anyone shares, and every bit of ranking authority that follows, lands on
 * the Finnish page rather than on a translation of it.
 */
export function useHref(): (path: string) => string {
  const lang = useContext(LanguageContext);
  return useCallback((path: string) => localeHref(lang, path), [lang]);
}

export function localeHref(lang: Lang, path: string): string {
  if (!path.startsWith("/")) return path;
  return lang === "en" ? `/en${path}` : path;
}

/**
 * The same page in the other language.
 *
 * Used by the language switch, which has to be a link rather than a button: the
 * whole point of routed languages is that the Finnish page has an address, and a
 * control that changed state without changing the URL would throw that away.
 */
export function swapLangHref(pathname: string, to: Lang): string {
  const stripped = pathname.replace(/^\/en(?=\/|$)/, "") || "/";
  const normalised = stripped.endsWith("/") ? stripped : `${stripped}/`;
  return to === "en" ? `/en${normalised}` : normalised;
}
