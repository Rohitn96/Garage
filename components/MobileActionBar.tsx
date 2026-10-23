import Link from "@/components/Link";
import type { Lang } from "@/site.config";
import { WHATSAPP_URL } from "@/lib/business";
import { contactHref } from "@/lib/links";
import { UI } from "@/content/ui";

/**
 * WhatsApp and booking, always in reach on a phone. The body carries matching
 * bottom padding (app/globals.css), so the bar never sits on top of content.
 */
export function MobileActionBar({ lang }: { lang: Lang }) {
  const t = UI[lang].cta;
  const item = "flex min-h-[48px] flex-1 items-center justify-center gap-2 rounded text-step--1 font-medium";
  return (
    <nav
      aria-label={lang === "fi" ? "Pikayhteys" : "Quick contact"}
      className="fixed inset-x-0 bottom-0 z-40 border-t border-rule bg-ground pb-[env(safe-area-inset-bottom)] md:hidden"
    >
      <div className="flex items-stretch gap-2 px-3 py-2">
        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className={`${item} bg-ink/[0.08] text-ink`}>
          <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M4 20l1.2-3.6A8.5 8.5 0 1 1 8 19.2L4 20Z" />
          </svg>
          {t.whatsapp}
        </a>
        <Link href={contactHref(lang, "quote")} className={`${item} bg-accent text-onAccent`}>
          {t.bookService}
        </Link>
      </div>
    </nav>
  );
}
