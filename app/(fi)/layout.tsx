import type { Metadata } from "next";
import type { Viewport } from "next";
import "../globals.css";
import { BASE_METADATA, RootShell } from "@/components/RootShell";

/** Root layout for the FINNISH tree, served at `/`. See app/(en)/layout.tsx. */
export const metadata: Metadata = BASE_METADATA;

export const viewport: Viewport = {
  themeColor: "#0B0B0C",
  colorScheme: "dark",
};

export default function FinnishLayout({ children }: { children: React.ReactNode }) {
  return <RootShell lang="fi">{children}</RootShell>;
}
