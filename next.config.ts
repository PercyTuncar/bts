import type { NextConfig } from 'next';

const nextConfig: NextConfig = {

  eslint: {
    ignoreDuringBuilds: true,
  },

  trailingSlash: true, // Evita redirecciones 301 en rutas estáticas
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
