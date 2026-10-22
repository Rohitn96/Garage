import type { ReactNode } from "react";
import { isOfferLiveAtBuild } from "@/lib/offer";

/**
 * Renders the live and the ended version of anything that depends on the
 * launch offer. Before first paint the head script marks <html> with
 * data-offer="live" or "ended" and CSS hides the other variant, so the offer
 * expires on 31.12.2026 by itself. A build made after that date ships only the
 * ended variant.
 *
 * Safe in client components: the build time it reads is inlined identically
 * into server and client code.
 */
export function OfferSwitch({
  live,
  ended,
  as: Tag = "div",
}: {
  live: ReactNode;
  ended: ReactNode;
  as?: "div" | "span";
}) {
  if (!isOfferLiveAtBuild()) return <>{ended}</>;
  return (
    <>
      <Tag data-offer-variant="live" className="contents">
        {live}
      </Tag>
      {ended ? (
        <Tag data-offer-variant="ended" className="contents">
          {ended}
        </Tag>
      ) : null}
    </>
  );
}

/** Only while the offer is live; nothing at all afterwards. */
export function WhileOfferLive({ children, as = "div" }: { children: ReactNode; as?: "div" | "span" }) {
  return <OfferSwitch as={as} live={children} ended={null} />;
}
