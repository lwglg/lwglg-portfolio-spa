import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  // Project page: https://lwglg.github.io/portfolio-spa/
  // Set to '' if publishing as user site (lwglg.github.io)
  basePath: process.env.NODE_ENV === 'production' ? '/portfolio-spa' : '',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  reactStrictMode: true,
};

export default nextConfig;
