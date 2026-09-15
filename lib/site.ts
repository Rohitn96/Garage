/** Canonical origin. Used by metadata, robots.txt and the sitemap. */
export const SITE_URL = "https://revampmotors.fi";

/**
 * Cloudflare Web Analytics site token.
 *
 * Why this exists: the Cloudflare dashboard was showing no visits from Finland
 * — or anywhere — because nothing on the site ever reported one. Cloudflare's
 * "Web Analytics" is a real-user beacon: no beacon on the page, no visits in
 * the dashboard, however many people open the site. (The server-side view,
 * which needs no beacon, is a different screen: Analytics & Logs → Traffic.)
 *
 * Get the token from Cloudflare → Analytics & Logs → Web Analytics → add
 * revampmotors.fi → "Manage site" → the `token` in the snippet. Paste it here,
 * or set NEXT_PUBLIC_CF_BEACON_TOKEN in the Cloudflare build settings — a
 * static export inlines env vars at BUILD time, so it has to be set there and
 * not at runtime. The token is public by design; it ships in the HTML.
 *
 * Cookieless and no personal data, so it needs no consent banner under the
 * Finnish tietosuoja/ePrivacy rules — which a Google Analytics tag would.
 */
export const CF_BEACON_TOKEN = process.env.NEXT_PUBLIC_CF_BEACON_TOKEN ?? "";
