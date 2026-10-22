import type { Metadata } from "next";
import { idFromSlug, renderRoute, routeMetadata, staticParams } from "@/components/pages/render";

/** Every Finnish page except the home page. Paths come from lib/routes.ts. */
export const dynamicParams = false;

export function generateStaticParams() {
  return staticParams("fi");
}

type Props = { params: Promise<{ slug: string[] }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return routeMetadata(idFromSlug(slug, "fi"), "fi");
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  return renderRoute(idFromSlug(slug, "fi"), "fi");
}
