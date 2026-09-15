import { renderOgImage } from "@/lib/ogImage";

/** /en/og.png — the English share card, written to out/ at build. See lib/ogImage.tsx. */
export const dynamic = "force-static";

export function GET() {
  return renderOgImage("en");
}
