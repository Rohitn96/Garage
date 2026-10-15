import Image from "next/image";

/**
 * The logo, as artwork rather than type.
 *
 * It used to be the brand name set in Instrument Serif with "Motors" in the
 * accent — a stand-in while there was no logo. There is one now: the stacked
 * lockup, cream and orange on transparency, drawn so the A carries the arrow.
 *
 * `public/logo/revamp-motors.png` is the supplied artwork trimmed to its own
 * bounding box and resized to 1000px wide, which is about double the largest
 * place it appears. It is transparent, and its cream (#F3F2EE) and orange
 * (#FF5A20) are within a shade of the site's own, so it sits on the charcoal
 * ground without a plate behind it.
 *
 * Callers size it by HEIGHT — `className="h-12"` — and the width follows the
 * aspect ratio. `next/image` with `unoptimized` because this is a static
 * export with no image server; the asset is already the right size.
 */

/** Intrinsic size of the artwork, for the aspect ratio. */
const W = 1000;
const H = 451;

export function Wordmark({
  className = "h-10",
  /** Empty when an ancestor link already names the destination. */
  alt = "Revamp Motors",
  priority = false,
}: {
  className?: string;
  alt?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src="/logo/revamp-motors.png"
      alt={alt}
      width={W}
      height={H}
      priority={priority}
      unoptimized
      className={`w-auto ${className}`}
    />
  );
}
