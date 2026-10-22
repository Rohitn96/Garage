import Link from "next/link";
import type { Lang } from "@/site.config";
import { pathOf } from "@/lib/routes";
import { UI } from "@/content/ui";
import { WhileOfferLive } from "./OfferSwitch";

/** One line above the nav while the launch offer runs. Gone afterwards. */
export function OfferBanner({ lang }: { lang: Lang }) {
  const t = UI[lang].offer;
  return (
    <WhileOfferLive>
      <div className="border-b border-rule bg-surface">
        <p className="wrap flex min-h-[2.5rem] flex-wrap items-center gap-x-3 gap-y-1 py-2 text-step--1">
          <span className="chip chip-accent">{t.tag}</span>
          <span className="text-ink">{t.banner}</span>
          <Link href={pathOf("offer", lang)} className="link text-muted">
            {t.more}
          </Link>
        </p>
      </div>
    </WhileOfferLive>
  );
}
