import Link from "@/components/Link";
import type { Lang } from "@/site.config";
import { TEL_HREF, WHATSAPP_URL } from "@/lib/business";
import { contactHref } from "@/lib/links";
import { UI } from "@/content/ui";

/**
 * Call, WhatsApp and the primary action, always in reach on a phone. The body
 * carries matching bottom padding (app/globals.css), so the bar never sits on
 * top of content.
 */
export function MobileActionBar({ lang }: { lang: Lang }) {
  const t = UI[lang].cta;
  const item =
    "flex min-h-[48px] flex-1 flex-col items-center justify-center gap-0.5 text-[0.75rem] font-semibold";
  return (
    <nav
      aria-label={lang === "fi" ? "Pikayhteys" : "Quick contact"}
      className="fixed inset-x-0 bottom-0 z-40 border-t border-rule bg-ground/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden"
    >
      <div className="flex items-stretch gap-1 px-2 py-2">
        <a href={TEL_HREF} className={`${item} rounded text-ink`}>
          <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M5 3.5h3.2l1.6 4.2-2.1 1.3a11 11 0 0 0 5.3 5.3l1.3-2.1 4.2 1.6V17a2 2 0 0 1-2 2A15 15 0 0 1 3 5.5a2 2 0 0 1 2-2Z" />
          </svg>
          {t.call}
        </a>
        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className={`${item} rounded text-ink`}>
          <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M4 20l1.2-3.6A8.5 8.5 0 1 1 8 19.2L4 20Z" />
          </svg>
          {t.whatsapp}
        </a>
        <Link href={contactHref(lang, "quote")} className={`${item} flex-[1.6] cut-sm bg-accent uppercase tracking-[0.06em] px-2 text-center text-onAccent`}>
          {t.bookService}
        </Link>
      </div>
    </nav>
  );
}
