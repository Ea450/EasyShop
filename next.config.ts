import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { hostname: '*' }
    ]
  }, reactStrictMode: true,
};

export default nextConfig;
