import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  // Project page: https://lwglg.github.io/portfolio-spa/
  basePath: process.env.NODE_ENV === 'production' ? '/portfolio-spa' : '',
  images: { unoptimized: true },
  trailingSlash: true,
  reactStrictMode: true,
};

export default nextConfig;
