/**
 * The Revamp Motors lockup, cropped from the supplied artwork and keyed to
 * transparency (public/logo/). White letters for the dark theme, grey for the
 * light one; the orange is identical in both. CSS shows the one that matches
 * the theme, and both share one box, so swapping themes moves nothing.
 *
 * Size it by height (`className="h-9"`); the width follows the 1200 x 282 artwork.
 */
export function Logo({
  className = "h-9",
  alt = "Revamp Motors",
  priority = false,
}: {
  className?: string;
  /** Empty when a parent link already names the destination. */
  alt?: string;
  priority?: boolean;
}) {
  const common = {
    width: 1200,
    height: 282,
    decoding: "async" as const,
    fetchPriority: priority ? ("high" as const) : undefined,
    className: "h-full w-auto",
  };
  return (
    <span className={`inline-block aspect-[1200/282] ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img {...common} src="/logo/revamp-motors-dark.webp" alt={alt} className={`logo-for-dark ${common.className}`} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img {...common} src="/logo/revamp-motors-light.webp" alt={alt} className={`logo-for-light ${common.className}`} />
    </span>
  );
}
