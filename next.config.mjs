/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Static export -> ./out, which Cloudflare Workers serves directly as assets.
  // Note: this is why there is no /api route. A static host cannot run one; the
  // booking form posts to NEXT_PUBLIC_BOOKING_ENDPOINT if you set one, and
  // otherwise just logs. See components/ContactForm.tsx.
  output: "export",

  // No Image Optimization server exists in an export.
  images: { unoptimized: true },

  // Emit /path/index.html so asset hosts resolve clean URLs without config.
  trailingSlash: true,
};

export default nextConfig;
