import { renderOgImage } from "@/lib/ogImage";

/** /og.png — the English share card, written to out/ at build. See lib/ogImage.tsx. */
export const dynamic = "force-static";

export function GET() {
  return renderOgImage("en");
}
