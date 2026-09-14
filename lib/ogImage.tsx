import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { CONTENT } from "@/lib/content";
import type { Lang } from "@/lib/i18n";
import { OG_SIZE } from "@/lib/og";

/**
 * The social share card, rendered to a PNG once at build time.
 *
 * The site had no `og:image`, so a link pasted into Facebook, WhatsApp or
 * LinkedIn — which is how a local garage actually gets passed around — showed
 * a bare title with no picture. Every string here is read from lib/content.ts,
 * so the card cannot drift from the page it describes.
 *
 * Fonts are the site's own (Instrument Serif, IBM Plex Mono, both OFL), as
 * .woff latin subsets in assets/og: the renderer cannot read woff2, and the
 * latin subset is the one that carries ä and ö.
 *
 * Served by the route handlers at app/(en)/og.png and app/(fi)/fi/og.png; the
 * paths, size and alt text live in lib/og.ts.
 */
const PAPER = "#0B0B0C";
const INK = "#EFEDE8";
const GRAPHITE = "#94948E";
const RULE = "#26262A";
const ACCENT = "#35D68A";

const font = (file: string) => readFile(join(process.cwd(), "assets/og", file));

export async function renderOgImage(lang: Lang): Promise<ImageResponse> {
  const [serif, serifItalic, mono] = await Promise.all([
    font("InstrumentSerif-Regular.woff"),
    font("InstrumentSerif-Italic.woff"),
    font("IBMPlexMono-Medium.woff"),
  ]);
  const h = CONTENT.hero;
  const label = {
    fontFamily: "Plex Mono",
    fontSize: 20,
    letterSpacing: "0.14em",
    textTransform: "uppercase" as const,
    color: GRAPHITE,
  };

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 80px",
          background: PAPER,
          color: INK,
          fontFamily: "Instrument Serif",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", fontSize: 52, letterSpacing: "-0.015em" }}>
            Revamp&nbsp;<span style={{ fontStyle: "italic", color: ACCENT }}>Motors</span>
          </div>
          <div style={label}>{CONTENT.nav.location[lang]}</div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 96,
            lineHeight: 0.98,
            letterSpacing: "-0.02em",
          }}
        >
          <span>{h.headlineA[lang]}</span>
          <span style={{ fontStyle: "italic", color: ACCENT }}>{h.headlineAccent[lang]}</span>
        </div>

        <div
          style={{
            display: "flex",
            gap: 36,
            borderTop: `1px solid ${RULE}`,
            paddingTop: 26,
          }}
        >
          {/* Smaller than the top label: the Finnish credentials run ~30% longer. */}
          {h.credentials.map((item) => (
            <div
              key={item.en}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                flexShrink: 0,
                ...label,
                fontSize: 17,
                letterSpacing: "0.12em",
              }}
            >
              <div style={{ width: 22, height: 2, background: ACCENT }} />
              {item[lang]}
            </div>
          ))}
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        { name: "Instrument Serif", data: serif, style: "normal", weight: 400 },
        { name: "Instrument Serif", data: serifItalic, style: "italic", weight: 400 },
        { name: "Plex Mono", data: mono, style: "normal", weight: 500 },
      ],
    },
  );
}
