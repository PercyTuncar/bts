import type { NextConfig } from 'next';

const nextConfig: NextConfig = {

  eslint: {
    ignoreDuringBuilds: true,
  },

  trailingSlash: true, // Evita redirecciones 301 en rutas estáticas
  images: {
    unoptimized: true, // Fix for Cloudflare Pages Free Tier (No Image Resizing Add-on)
    remotePatterns: [
      { protocol: 'https', hostname: 'elcomercio.pe' },
      { protocol: 'https', hostname: 'images.prestigeonline.com' },
      // A10: Additional domains used in the codebase
      { protocol: 'https', hostname: 'cuscoperu.b-cdn.net' },
      { protocol: 'https', hostname: 'images.adsttc.com' },
      { protocol: 'https', hostname: 'media.admagazine.com' },
      { protocol: 'https', hostname: 'cloudfront-us-east-1.images.arcpublishing.com' },
      { protocol: 'https', hostname: 'humanidades.com' },
      { protocol: 'https', hostname: 'media.vogue.mx' },
      { protocol: 'https', hostname: 'spanish100.com' },
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      { protocol: 'https', hostname: 'firebasestorage.googleapis.com' },
      { protocol: 'https', hostname: 'upload.wikimedia.org' },
    ],
  },
};

export default nextConfig;
