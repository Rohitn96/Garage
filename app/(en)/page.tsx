import type { Metadata } from "next";
import { renderRoute, routeMetadata } from "@/components/pages/render";

export const metadata: Metadata = routeMetadata("home", "en");

export default function Page() {
  return renderRoute("home", "en");
}
