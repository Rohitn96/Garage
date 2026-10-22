"use client";

import { useEffect, useState } from "react";
import { UI } from "@/content/ui";
import { useLang } from "@/lib/i18n";

type Theme = "light" | "dark";

/**
 * Light and dark. The first visit follows the operating system (decided by the
 * head script before paint); pressing this stores an explicit choice.
 */
export function ThemeToggle({ className = "" }: { className?: string }) {
  const lang = useLang();
  const t = UI[lang].theme;
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    setTheme(document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark");
  }, []);

  const toggle = () => {
    const next: Theme = theme === "light" ? "dark" : "light";
    const root = document.documentElement;
    // Colours ease across only for the switch itself, never during normal use.
    root.classList.add("theme-anim");
    window.setTimeout(() => root.classList.remove("theme-anim"), 450);
    root.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Private mode: the choice lasts for this page view only.
    }
    setTheme(next);
  };

  const label = theme === "light" ? t.toDark : t.toLight;

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className={`inline-flex h-11 w-11 items-center justify-center rounded text-muted transition-colors duration-1 hover:text-ink ${className}`}
    >
      {/* Both icons render; CSS shows the one for the current theme, so the
          server markup is right before hydration. */}
      <svg aria-hidden viewBox="0 0 24 24" className="logo-for-dark h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
        <circle cx="12" cy="12" r="4.2" />
        <path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M5.3 18.7l1.6-1.6M17.1 6.9l1.6-1.6" />
      </svg>
      <svg aria-hidden viewBox="0 0 24 24" className="logo-for-light h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" />
      </svg>
    </button>
  );
}
