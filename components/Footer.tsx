"use client";

import { Wordmark } from "./Wordmark";
import { useT } from "@/lib/i18n";
import { CONTENT } from "@/lib/content";

export function Footer() {
  const t = useT();
  const c = CONTENT.footer;

  const details = [
    { label: t(c.address), value: "Tattarisuo, Vantaa" },
    { label: t(c.phone), value: t(c.phoneTba) },
    { label: t(c.email), value: "revampmotors1@gmail.com", href: "mailto:revampmotors1@gmail.com" },
    // Verified against the PRH open-data register before publishing: 3651428-1
    // resolves to Revamp Motors, osakeyhtiö, registered 2026-08-31.
    { label: t(c.companyId), value: "3651428-1" },
  ];

  return (
    <footer className="rule-above">
      <div className="mx-auto w-full max-w-page px-6 py-16 md:px-10">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <Wordmark />
            <p className="mt-4 max-w-[26ch] font-display text-[1.5rem] leading-tight tracking-[-0.01em]">
              {t(c.tagline)}
            </p>
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

        <div className="mt-16 flex flex-col gap-2 border-t border-rule pt-5 text-[0.8rem] text-graphite sm:flex-row sm:items-center sm:justify-between">
          <p>{t(c.prelaunch)}</p>
          <p className="font-mono">© {new Date().getFullYear()}</p>
        </div>
      </div>
    </footer>
  );
}
