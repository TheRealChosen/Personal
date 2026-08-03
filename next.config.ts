import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Generate a plain static site so the `out` folder can be uploaded directly
  // to Netlify or served from Netlify's CDN without a Next.js server.
  output: "export",
  // Emit directory-style routes so static hosts can resolve each route through
  // its generated index.html instead of relying on server-side rewrites.
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
