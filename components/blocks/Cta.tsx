import Link from "@/components/Link";
import type { Lang } from "@/site.config";
import { TEL_HREF, WHATSAPP_URL } from "@/lib/business";
import { contactHref } from "@/lib/links";
import { SITE } from "@/site.config";
import { UI } from "@/content/ui";
import { OfferSwitch } from "../OfferSwitch";

/**
 * The two actions pages end on. Primary: book a service. Secondary on Tesla
 * pages: the free diagnosis while the launch offer runs, "Book a diagnosis"
 * after it, with no mention of free.
 */
export function CtaButtons({ lang, tesla = true, onMedia = false }: { lang: Lang; tesla?: boolean; onMedia?: boolean }) {
  const t = UI[lang].cta;
  const secondary = onMedia ? "btn-on-media" : "btn-secondary";
  return (
    <>
      <Link href={contactHref(lang, "quote")} className="btn-primary">
        {t.bookService}
      </Link>
      {tesla ? (
        <OfferSwitch
          as="span"
          live={
            <Link href={contactHref(lang, "diagnosis")} className={secondary}>
              {t.freeDiagnosisLong}
            </Link>
          }
          ended={
            <Link href={contactHref(lang, "diagnosis")} className={secondary}>
              {t.bookDiagnosis}
            </Link>
          }
        />
      ) : null}
    </>
  );
}

export function CtaPanel({
  lang,
  title,
  body,
  tesla = true,
}: {
  lang: Lang;
  title: string;
  body?: string;
  tesla?: boolean;
}) {
  const t = UI[lang].cta;
  return (
    <section className="border-b border-rule">
      <div data-reveal className="wrap section">
        <div className="card glow grid gap-8 overflow-hidden p-6 sm:p-10 md:grid-cols-12 md:p-14">
          <div className="md:col-span-7">
            <h2 className="h2 max-w-[18ch]">{title}</h2>
            {body ? <p className="lead mt-5 max-w-[52ch]">{body}</p> : null}
            <p className="mt-5 flex items-center gap-3 text-step--1 text-muted">
              <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              {t.estimateLine}
            </p>
          </div>
          <div className="flex flex-col justify-end gap-4 md:col-span-5 md:items-end">
            <div className="flex flex-wrap gap-3 md:justify-end">
              <CtaButtons lang={lang} tesla={tesla} />
            </div>
            <p className="text-step--1 text-muted md:text-right">
              <a href={TEL_HREF} className="link">
                {SITE.business.phoneDisplay}
              </a>
              <span aria-hidden> · </span>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="link">
                WhatsApp
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
