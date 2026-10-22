/**
 * One JSON-LD block. `offer` marks blocks the head script disables once the
 * launch offer has ended (see lib/offer.ts). The payload is built from local
 * constants only, never from user input.
 */
export function JsonLd({ data, offer = false }: { data: object; offer?: boolean }) {
  return (
    <script
      type="application/ld+json"
      {...(offer ? { "data-offer-schema": "" } : {})}
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
