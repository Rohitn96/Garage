import type { Lang } from "@/site.config";
import type { QA } from "@/content/types";
import { faqSchema } from "@/lib/schema";
import { JsonLd } from "../JsonLd";
import { inline } from "./Prose";

/** Native details/summary, so every answer is readable without JavaScript. */
export function FaqList({ items, lang, schema = true }: { items: QA[]; lang: Lang; schema?: boolean }) {
  return (
    <>
      <div className="faq border-t border-rule">
        {items.map((item) => (
          <details key={item.q} className="border-b border-rule">
            <summary>{item.q}</summary>
            <p className="max-w-prose pb-6 text-muted">{inline(item.a, lang)}</p>
          </details>
        ))}
      </div>
      {schema ? <JsonLd data={faqSchema(items)} /> : null}
    </>
  );
}
