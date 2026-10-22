"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { Lang } from "@/site.config";

export type { Lang };

/**
 * Language comes from the URL: Finnish at the root, English under /en/. Each
 * tree has its own root layout, so <html lang> is right in the served HTML.
 *
 * Server components receive `lang` as a prop. This context exists only for the
 * few client components (nav, form, explorer) that need it.
 */
const LanguageContext = createContext<Lang>("fi");

export function LanguageProvider({ lang, children }: { lang: Lang; children: ReactNode }) {
  return <LanguageContext.Provider value={lang}>{children}</LanguageContext.Provider>;
}

export function useLang(): Lang {
  return useContext(LanguageContext);
}
