"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type Lang = "en" | "fi";

/** A string that exists in both languages. */
export type Localized = { en: string; fi: string };

export function pick(value: Localized, lang: Lang): string {
  return value[lang];
}

const STORAGE_KEY = "revamp-lang";

type LanguageContextValue = {
  lang: Lang;
  setLang: (next: Lang) => void;
};

const LanguageContext = createContext<LanguageContextValue>({
  lang: "en",
  setLang: () => {},
});

/**
 * Language state for the whole page.
 *
 * English is the default and is what the server renders — a static export has no
 * request headers to negotiate against, so guessing from the client and swapping
 * during hydration would mismatch the markup. The stored preference is applied
 * in an effect after mount instead, which is a one-frame swap for returning
 * Finnish visitors and nothing at all for everyone else.
 *
 * The choice is per-browser (localStorage), not per-URL. That means a Finnish
 * page cannot be linked or shared as Finnish, and search engines only ever see
 * the English copy. If either matters later, this needs to become real routing
 * (/fi/…) with a translated <link rel="alternate" hreflang>.
 */
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored === "fi" || stored === "en") setLangState(stored);
    } catch {
      // Private mode or blocked storage: English is a fine place to land.
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Preference just will not persist; the switch still works this visit.
    }
  }, []);

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang(): LanguageContextValue {
  return useContext(LanguageContext);
}

/** Convenience: resolve a Localized value in the active language. */
export function useT(): (value: Localized) => string {
  const { lang } = useLang();
  return useCallback((value: Localized) => value[lang], [lang]);
}
