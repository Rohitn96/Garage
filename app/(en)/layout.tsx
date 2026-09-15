import type { Metadata } from "next";
import type { Viewport } from "next";
import "../globals.css";
import { BASE_METADATA, RootShell } from "@/components/RootShell";

/**
 * Root layout for the ENGLISH tree, served at `/en/`.
 *
 * There are two root layouts, one per language (see app/(fi)). That is what
 * allows `<html lang>` and the metadata to be correct in the markup the server
 * sends, instead of being corrected by an effect after hydration.
 */
export const metadata: Metadata = BASE_METADATA;

export const viewport: Viewport = {
  themeColor: "#0B0B0C",
  colorScheme: "dark",
};

export default function EnglishLayout({ children }: { children: React.ReactNode }) {
  return <RootShell lang="en">{children}</RootShell>;
}
