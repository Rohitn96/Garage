import { Wordmark } from "./Wordmark";

const DETAILS = [
  { label: "Address", value: "[Address TBA]" },
  { label: "Phone", value: "[Phone TBA]" },
  { label: "Email", value: "[Email TBA]" },
];

export function Footer() {
  return (
    <footer className="rule-top bg-ink">
      <div className="mx-auto w-full max-w-page px-6 py-16">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-[1.2fr_1fr_1fr_1fr]">
          <div>
            <Wordmark className="text-base" />
            <p className="mt-3 max-w-[28ch] text-sm leading-relaxed text-fog">
              Honest work, fair price, back on the road.
            </p>
          </div>

          {DETAILS.map((detail) => (
            <div key={detail.label}>
              <p className="text-[0.7rem] uppercase tracking-[0.16em] text-fog/60">
                {detail.label}
              </p>
              <p className="mt-2 text-sm text-chalk">{detail.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-line pt-6 text-xs text-fog/70 sm:flex-row sm:items-center sm:justify-between">
          <p>
            Rudra Motors is currently in pre-launch. Business registration in
            progress.
          </p>
          <p>© {new Date().getFullYear()} Rudra Motors</p>
        </div>
      </div>
    </footer>
  );
}
