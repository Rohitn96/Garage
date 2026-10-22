import NextLink from "next/link";
import type { ComponentProps } from "react";

/**
 * next/link without automatic prefetching. Every page links to dozens of
 * others, and prefetching each visible link's payload competed with the page's
 * own resources on a phone connection. Pages are static and small, so a click
 * fetches the next one fast enough.
 */
export default function Link(props: ComponentProps<typeof NextLink>) {
  return <NextLink prefetch={false} {...props} />;
}
