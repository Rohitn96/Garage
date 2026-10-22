"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { Lang } from "@/site.config";

export type { Lang };

/**
 * Language comes from the URL: English at the root, Finnish under /fi/. Each
 * tree has its own root layout, so <html lang> is right in the served HTML.
 *
 * Server components receive `lang` as a prop. This context exists only for the
 * few client components (nav, form) that need it.
 */
const LanguageContext = createContext<Lang>("en");

export function LanguageProvider({ lang, children }: { lang: Lang; children: ReactNode }) {
  return <LanguageContext.Provider value={lang}>{children}</LanguageContext.Provider>;
}

export function useLang(): Lang {
  return useContext(LanguageContext);
}
