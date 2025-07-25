import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: '/intentdemo',
  assetPrefix: '/intentdemo/',
  images: {
    unoptimized: true
  }
};

export default nextConfig;
