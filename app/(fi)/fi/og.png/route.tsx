import { renderOgImage } from "@/lib/ogImage";

/** /fi/og.png — the Finnish share card, written to out/ at build. See lib/ogImage.tsx. */
export const dynamic = "force-static";

export function GET() {
  return renderOgImage("fi");
}
