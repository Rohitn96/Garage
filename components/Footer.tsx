import { Wordmark } from "./Wordmark";

const DETAILS = [
  { label: "Address", value: "Tattarisuo, Vantaa" },
  { label: "Phone", value: "[Phone TBA]" },
  { label: "Email", value: "revampmotors1@gmail.com", href: "mailto:revampmotors1@gmail.com" },
  // Verified against the PRH open-data register before publishing: 3651428-1
  // resolves to Revamp Motors, osakeyhtiö, registered 2026-08-31.
  { label: "Company ID", value: "3651428-1" },
];

export function Footer() {
  return (
    <footer className="rule-above">
      <div className="mx-auto w-full max-w-page px-6 py-16 md:px-10">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <Wordmark />
            <p className="mt-4 max-w-[26ch] font-display text-[1.5rem] leading-tight tracking-[-0.01em]">
              Honest work, fair price, back on the road.
            </p>
          </div>

          <dl className="grid gap-x-10 gap-y-8 sm:grid-cols-2 md:col-span-7 md:col-start-6">
            {DETAILS.map((detail) => (
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
          <p>Revamp Motors is in pre-launch. Not yet open for bookings.</p>
          <p className="font-mono">© {new Date().getFullYear()}</p>
        </div>
      </div>
    </footer>
  );
}
