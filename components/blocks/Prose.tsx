import Link from "next/link";
import type { ReactNode } from "react";
import type { Lang } from "@/site.config";
import type { Block } from "@/content/types";
import { isRouteId, pathOf } from "@/lib/routes";

const LINK = /\[([^\]]+)\]\(([^)]+)\)/g;

/**
 * Turns `[text](@route-id)` and `[text](https://...)` into links. An unknown
 * route id throws, which fails the static build: a broken internal link can
 * never ship.
 */
export function inline(text: string, lang: Lang): ReactNode[] {
  const out: ReactNode[] = [];
  let last = 0;
  for (const match of text.matchAll(LINK)) {
    const [whole, label, target] = match;
    const at = match.index ?? 0;
    if (at > last) out.push(text.slice(last, at));
    if (target.startsWith("@")) {
      const id = target.slice(1);
      if (!isRouteId(id)) throw new Error(`Unknown route id in content link: ${id}`);
      out.push(
        <Link key={at} href={pathOf(id, lang)} className="link">
          {label}
        </Link>,
      );
    } else {
      const external = /^https?:/.test(target);
      out.push(
        <a key={at} href={target} className="link" {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
          {label}
        </a>,
      );
    }
    last = at + whole.length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

export function Prose({ blocks, lang, className = "" }: { blocks: Block[]; lang: Lang; className?: string }) {
  return (
    <div className={`prose-tech ${className}`}>
      {blocks.map((block, i) => {
        if ("h2" in block) return <h2 key={i}>{block.h2}</h2>;
        if ("h3" in block) return <h3 key={i}>{block.h3}</h3>;
        if ("ul" in block)
          return (
            <ul key={i}>
              {block.ul.map((item, j) => (
                <li key={j}>{inline(item, lang)}</li>
              ))}
            </ul>
          );
        if ("note" in block)
          return (
            <p key={i} className="note">
              {inline(block.note, lang)}
            </p>
          );
        return <p key={i}>{inline(block.p, lang)}</p>;
      })}
    </div>
  );
}
