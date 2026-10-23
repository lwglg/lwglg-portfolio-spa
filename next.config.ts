import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  // Project page: https://lwglg.github.io/lwglg-portfolio-spa/
  // Set to '' if publishing as user site (lwglg.github.io)
  basePath: process.env.NODE_ENV === 'production' ? '/lwglg-portfolio-spa' : '',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  reactStrictMode: true,
};

export default nextConfig;
