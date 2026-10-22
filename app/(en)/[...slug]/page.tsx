import type { Metadata } from "next";
import { idFromSlug, renderRoute, routeMetadata, staticParams } from "@/components/pages/render";

/** Every English page except the home page. Paths come from lib/routes.ts. */
export const dynamicParams = false;

export function generateStaticParams() {
  return staticParams("en");
}

type Props = { params: Promise<{ slug: string[] }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return routeMetadata(idFromSlug(slug, "en"), "en");
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  return renderRoute(idFromSlug(slug, "en"), "en");
}
