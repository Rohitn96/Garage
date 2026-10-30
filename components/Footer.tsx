import Link from "@/components/Link";
import { SITE, type Lang } from "@/site.config";
import { addressLine, hoursRows, TEL_HREF, WHATSAPP_URL } from "@/lib/business";
import { pathOf, type RouteId } from "@/lib/routes";
import { ROUTE_NAMES, UI } from "@/content/ui";
import { Logo } from "./Logo";

const SERVICES: RouteId[] = [
  "svc-brakes",
  "svc-suspension",
  "svc-tyres",
  "svc-climate",
  "svc-electrical",
  "battery-report",
  "offer",
];

const PAGES: RouteId[] = ["tesla", "ev", "other", "weekend", "faq", "blog", "about", "contact", "privacy"];

export function Footer({ lang }: { lang: Lang }) {
  const t = UI[lang];
  const names = ROUTE_NAMES[lang];
  const b = SITE.business;
  const hours = hoursRows(lang);
  const heading = "label mb-4 block";
  const linkClass = "inline-flex min-h-[32px] items-center text-step--1 text-muted transition-colors duration-1 hover:text-ink";

  return (
    <footer className="border-t border-rule bg-surface">
      <div className="wrap py-14 md:py-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <Logo className="h-9" />
            <p className="mt-5 max-w-[34ch] text-step--1 text-muted">{t.footer.tagline}</p>
            <dl className="mt-8 grid gap-1 text-step--1">
              <dt className="label">{t.hours.title}</dt>
              {hours.rows.map((row) => (
                <dd key={row.label} className="text-ink">
                  <span className="text-muted">{row.label}: </span>
                  {row.value}
                </dd>
              ))}
            </dl>
          </div>

          <nav aria-label={t.footer.services} className="md:col-span-3">
            <span className={heading}>{t.footer.services}</span>
            <ul>
              {SERVICES.map((id) => (
                <li key={id}>
                  <Link href={pathOf(id, lang)} className={linkClass}>
                    {names[id]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label={t.footer.pages} className="md:col-span-2">
            <span className={heading}>{t.footer.pages}</span>
            <ul>
              {PAGES.map((id) => (
                <li key={id}>
                  <Link href={pathOf(id, lang)} className={linkClass}>
                    {names[id]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-3">
            <span className={heading}>{t.footer.contact}</span>
            <address className="grid gap-4 text-step--1 not-italic">
              <p>
                <span className="block text-muted">{t.footer.address}</span>
                <a href={b.mapsUrl} target="_blank" rel="noopener noreferrer" className="link">
                  {addressLine(lang)}
                </a>
                <span className="block text-muted">{b.district}</span>
              </p>
              <p>
                <span className="block text-muted">{t.footer.phone}</span>
                <a href={TEL_HREF} className="link">
                  {b.phoneDisplay}
                </a>
                <span className="text-muted"> · </span>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="link">
                  WhatsApp
                </a>
              </p>
              <p>
                <span className="block text-muted">{t.footer.email}</span>
                <a href={`mailto:${b.email}`} className="link break-all">
                  {b.email}
                </a>
              </p>
              <p>
                <span className="block text-muted">{t.footer.companyId}</span>
                {b.companyId}
              </p>
            </address>
          </div>
        </div>

        <p className="mt-14 max-w-[90ch] border-t border-rule pt-6 text-step--2 leading-relaxed text-muted">
          {t.footer.independent}
        </p>
        <p className="mt-3 font-mono text-step--2 text-muted">
          © {new Date().getFullYear()} {b.name} · {t.footer.companyId} {b.companyId}
        </p>
      </div>
    </footer>
  );
}
