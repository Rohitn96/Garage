import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import type { Lang } from "@/site.config";
import { HOME } from "@/content/home";
import { OG_SIZE } from "./og";

/**
 * The social share card, rendered to a PNG once at build time. Strings come
 * from content/home.ts and the logo from public/logo, so the card cannot drift
 * from the site. IBM Plex Mono only: the renderer cannot read the variable
 * display font, and a mono face suits the diagnostic look.
 */
const GROUND = "#0C0E10";
const INK = "#ECEEF0";
const MUTED = "#9AA1A8";
const RULE = "#272C31";
const ACCENT = "#FF5A1F";

const asset = (...parts: string[]) => readFile(join(process.cwd(), ...parts));

export async function renderOgImage(lang: Lang): Promise<ImageResponse> {
  const [mono, logo] = await Promise.all([
    asset("assets/og", "IBMPlexMono-Medium.woff"),
    asset("public/logo", "revamp-motors-dark.png"),
  ]);
  const h = HOME[lang].hero;
  const grid = `linear-gradient(${RULE} 1px, transparent 1px), linear-gradient(90deg, ${RULE} 1px, transparent 1px)`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: GROUND,
          backgroundImage: grid,
          backgroundSize: "48px 48px",
          color: INK,
          fontFamily: "Plex Mono",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`data:image/png;base64,${logo.toString("base64")}`} width={340} height={80} alt="" />
          <div style={{ fontSize: 20, letterSpacing: "0.12em", textTransform: "uppercase", color: MUTED }}>Tattarisuo, Helsinki</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", fontSize: 22, letterSpacing: "0.12em", textTransform: "uppercase", color: ACCENT }}>
            SYS 01 / 07
          </div>
          <div style={{ display: "flex", fontSize: 68, lineHeight: 1.05, letterSpacing: "-0.02em", maxWidth: 980 }}>{h.h1.replace(/­/g, "")}</div>
        </div>

        <div style={{ display: "flex", gap: 32, borderTop: `1px solid ${RULE}`, paddingTop: 24 }}>
          {h.facts.map((fact) => (
            <div key={fact} style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 18, letterSpacing: "0.08em", textTransform: "uppercase", color: MUTED }}>
              <div style={{ width: 10, height: 10, borderRadius: 10, background: ACCENT }} />
              {fact}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...OG_SIZE, fonts: [{ name: "Plex Mono", data: mono, style: "normal", weight: 500 }] },
  );
}
