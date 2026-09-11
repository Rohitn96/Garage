"use client";

import Link from "next/link";
import { Wordmark } from "./Wordmark";
import { useHref, useT } from "@/lib/i18n";
import { CONTENT } from "@/lib/content";
import { ADDRESS_LINE, BUSINESS } from "@/lib/business";

export function Footer() {
  const t = useT();
  const h = useHref();
  const c = CONTENT.footer;
  const n = CONTENT.nav;

  const details = [
    { label: t(c.address), value: ADDRESS_LINE },
    { label: t(c.phone), value: t(c.phoneTba) },
    {
      label: t(c.email),
      value: BUSINESS.email,
      href: `mailto:${BUSINESS.email}`,
    },
    { label: t(c.companyId), value: BUSINESS.companyId },
  ];

  const links = [
    { href: h("/tesla/"), label: t(n.tesla) },
    { href: h("/#services"), label: t(n.services) },
    { href: h("/#pricing"), label: t(n.pricing) },
    { href: h("/#contact"), label: t(n.contact) },
  ];

  return (
    <footer className="rule-above">
      <div className="mx-auto w-full max-w-page px-6 py-16 md:px-10">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <Wordmark />
            <p className="mt-4 max-w-[24ch] font-display text-[1.4rem] leading-tight tracking-[-0.01em]">
              {t(c.tagline)}
            </p>
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-mono text-[0.66rem] uppercase tracking-label text-graphite transition-colors hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <dl className="grid gap-x-10 gap-y-8 sm:grid-cols-2 md:col-span-7 md:col-start-6">
            {details.map((detail) => (
              <div key={detail.label} className="min-w-0 rule-above pt-4">
                <dt className="label">{detail.label}</dt>
                <dd className="mt-2 break-words text-[0.95rem]">
                  {detail.href ? (
                    <a href={detail.href} className="link-underline">
                      {detail.value}
                    </a>
                  ) : (
                    detail.value
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* An independent shop naming a marque has to say plainly that it is not
            that marque. This is the line that keeps "Tesla specialists" honest. */}
        <p className="mt-14 max-w-[80ch] border-t border-rule pt-5 text-[0.75rem] leading-relaxed text-graphite/80">
          {t(c.independent)}
        </p>

        <div className="mt-6 flex flex-col gap-2 text-[0.78rem] text-graphite sm:flex-row sm:items-center sm:justify-between">
          <p>{t(c.opening)}</p>
          <p className="font-mono">© {new Date().getFullYear()}</p>
        </div>
      </div>
    </footer>
  );
}
