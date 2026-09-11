import type { Metadata } from "next";
import { TeslaPage } from "@/components/pages/TeslaPage";
import { teslaMetadata } from "@/components/RootShell";

export const metadata: Metadata = teslaMetadata("fi");

export default function Page() {
  return <TeslaPage />;
}
