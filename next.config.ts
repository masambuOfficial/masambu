import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "img.youtube.com", pathname: "/vi/**" },
    ],
  },
  // The quote form is a self-contained static page (its CSS targets bare
  // header/main/footer/button), so it is served as-is from /public.
  async rewrites() {
    return [{ source: "/website-quote", destination: "/website-quote.html" }];
  },
  cacheComponents: true,
  partialPrefetching: true,
  experimental: {
    agentUpgrade: "security",
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
