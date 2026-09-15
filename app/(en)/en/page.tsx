import type { Metadata } from "next";
import { HomePage } from "@/components/pages/HomePage";
import { homeMetadata } from "@/components/RootShell";

export const metadata: Metadata = homeMetadata("en");

export default function Page() {
  return <HomePage />;
}
