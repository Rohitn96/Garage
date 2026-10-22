import type { TitledItem } from "@/content/types";

/** Numbered sequence drawn as a process line, not as cards. */
export function Steps({ items }: { items: TitledItem[] }) {
  return (
    <ol className="grid gap-px overflow-hidden rounded border border-rule bg-rule md:grid-cols-2 lg:grid-cols-4">
      {items.map((step, i) => (
        <li key={step.title} className="flex flex-col bg-ground p-6">
          <span className="font-mono text-step--1 text-accent">
            {String(i + 1).padStart(2, "0")}
            <span className="text-faint"> / {String(items.length).padStart(2, "0")}</span>
          </span>
          <h3 className="mt-6 text-step-1 font-bold">{step.title}</h3>
          <p className="mt-3 text-step--1 leading-relaxed text-muted">{step.body}</p>
        </li>
      ))}
    </ol>
  );
}

/** Two column titled list, for symptoms and checks. */
export function ItemGrid({ items, marker = "line" }: { items: TitledItem[]; marker?: "line" | "check" }) {
  return (
    <ul className="grid gap-x-10 gap-y-7 md:grid-cols-2">
      {items.map((item) => (
        <li key={item.title} className="border-t border-rule pt-5">
          <h3 className="flex items-start gap-3 text-step-1 font-bold">
            {marker === "check" ? (
              <span aria-hidden className="mt-[0.35em] font-mono text-step--1 text-ok">
                ✓
              </span>
            ) : (
              <span aria-hidden className="mt-[0.7em] h-px w-4 shrink-0 bg-accent" />
            )}
            {item.title}
          </h3>
          <p className="mt-2 text-step--1 leading-relaxed text-muted md:pl-7">{item.body}</p>
        </li>
      ))}
    </ul>
  );
}
