import { Wordmark } from "./Wordmark";

const DETAILS = [
  { label: "Address", value: "[Address TBA]" },
  { label: "Phone", value: "[Phone TBA]" },
  { label: "Email", value: "[Email TBA]" },
];

export function Footer() {
  return (
    <footer className="rule-above">
      <div className="mx-auto w-full max-w-page px-6 py-16 md:px-10">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <Wordmark />
            <p className="mt-4 max-w-[26ch] font-display text-[1.5rem] leading-tight tracking-[-0.01em]">
              Honest work, fair price, back on the road.
            </p>
          </div>

          <dl className="grid gap-8 sm:grid-cols-3 md:col-span-6 md:col-start-7">
            {DETAILS.map((detail) => (
              <div key={detail.label} className="rule-above pt-4">
                <dt className="label">{detail.label}</dt>
                <dd className="mt-2 text-[0.95rem]">{detail.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="mt-16 flex flex-col gap-2 border-t border-rule pt-5 text-[0.8rem] text-graphite sm:flex-row sm:items-center sm:justify-between">
          <p>Revamp Motors is in pre-launch. Business registration in progress.</p>
          <p className="font-mono">© {new Date().getFullYear()}</p>
        </div>
      </div>
    </footer>
  );
}
