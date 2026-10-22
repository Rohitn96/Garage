/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Static export to ./out, which Cloudflare Workers serves directly as assets.
  // This is why there is no /api route: a static host cannot run one, so the
  // booking form posts straight to Formspree from the browser.
  output: "export",

  // No Image Optimization server exists in an export.
  images: { unoptimized: true },

  // Emit /path/index.html so asset hosts resolve clean URLs without config.
  trailingSlash: true,

  // One timestamp for the whole build, inlined into server and client code
  // alike, so the offer's live or ended state in the HTML always matches what
  // hydration computes. Set OFFER_NOW (any ISO date) to mock it. See lib/offer.ts.
  env: {
    OFFER_BUILD_TIME: process.env.OFFER_NOW || new Date().toISOString(),
  },
};

export default nextConfig;
