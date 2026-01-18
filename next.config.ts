import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export', // OBLIGATORIO para Cloudflare Pages
  trailingSlash: true, // Evita redirecciones 301 en rutas estáticas
  images: {
    loader: 'custom',
    loaderFile: './lib/cloudflare-loader.ts', // Loader personalizado
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
