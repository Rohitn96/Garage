/**
 * The Revamp Motors lockup, cropped from the supplied artwork and keyed to
 * transparency (public/logo/): white letters for the dark theme, grey for the
 * light one; the orange is identical in both.
 *
 * Drawn as a CSS background chosen by the theme (see .logo in globals.css), so
 * the browser downloads only the variant on screen. The box has the artwork's
 * aspect ratio, so switching theme moves nothing. Size it by height.
 */
export function Logo({
  className = "h-9",
  alt = "Revamp Motors",
}: {
  className?: string;
  /** Empty when a parent link already names the destination. */
  alt?: string;
}) {
  return alt ? (
    <span role="img" aria-label={alt} className={`logo inline-block aspect-[1200/282] ${className}`} />
  ) : (
    <span aria-hidden className={`logo inline-block aspect-[1200/282] ${className}`} />
  );
}
