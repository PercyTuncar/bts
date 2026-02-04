import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    unoptimized: true, // Fix for Cloudflare Pages Free Tier (No Image Resizing Add-on)
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'elcomercio.pe',
      },
      {
        protocol: 'https',
        hostname: 'images.prestigeonline.com',
      },
    ],
  },
};

export default nextConfig;
