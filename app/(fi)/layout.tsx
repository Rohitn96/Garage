import type { Metadata, Viewport } from "next";
import "../globals.css";
import { RootShell } from "@/components/RootShell";
import { BASE_METADATA } from "@/lib/seo";

/** Root layout for the FINNISH tree, served at `/`. See app/(en)/layout.tsx. */
export const metadata: Metadata = BASE_METADATA;

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0C0E10" },
    { media: "(prefers-color-scheme: light)", color: "#F3F4F5" },
  ],
};

export default function FinnishLayout({ children }: { children: React.ReactNode }) {
  return <RootShell lang="fi">{children}</RootShell>;
}
