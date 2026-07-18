import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

export const runtime = 'edge';

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Entradas BTS ARIRANG Tour 2026 | Latinoamérica y España",
    template: "%s",
  },
  description: "Compra tus entradas para el BTS World Tour ARIRANG 2026 en Latinoamérica y España. Fechas confirmadas, precios y servicio de compra garantizada para el ARMY.",
  metadataBase: new URL('https://entradasbts.com'),
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/icon.png', sizes: 'any' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'apple-touch-icon-precomposed',
        url: '/apple-touch-icon.png',
      },
    ],
  },

  openGraph: {
    title: 'Entradas BTS ARIRANG Tour 2026 | Latinoamérica y España',
    description: 'Compra tus entradas para el BTS World Tour ARIRANG 2026. Fechas confirmadas en Latinoamérica y España para el ARMY.',
    url: 'https://entradasbts.com/',
    siteName: 'EntradasBTS – RaveHub Latam',
    images: [
      {
        url: '/images/bts-hero-bg.png', // Generic image
        width: 1200,
        height: 630,
      },
    ],
    locale: 'es_LA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Entradas BTS ARIRANG Tour 2026 | Latinoamérica y España',
    description: 'Todas las fechas del BTS World Tour ARIRANG 2026 en Lima, CDMX, Bogotá, Santiago, La Plata, São Paulo y Madrid. Compra garantizada para el ARMY.',
    site: '@ravehublatam',
    creator: '@ravehublatam',
    images: ['/images/bts-hero-bg.png'],
  },
  alternates: {
    canonical: 'https://entradasbts.com/',
  },
};

import { CartProvider } from "@/context/CartContext";
import { PopupManager } from "@/components/PopupManager";

import { headers } from "next/headers";
import Script from "next/script";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const lang = headersList.get('x-lang') || 'es';
  const userCountry = headersList.get('x-user-country') || undefined;

  return (
    <html lang={lang}>
      <head>
        <link rel="preconnect" href="https://cuscoperu.b-cdn.net" />
        <link rel="preconnect" href="https://images.adsttc.com" />
        <link rel="preconnect" href="https://media.admagazine.com" />
        <link rel="dns-prefetch" href="https://cloudfront-us-east-1.images.arcpublishing.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <Script
          src="https://www.paypal.com/sdk/js?client-id=BAAa3-7GvLFL-Yj8lVIRkzve8wz_NyvMLwwiP0luzM_GUrmZujpbK2ikByE62VasK54tguRkwDOKZdTTfg&components=hosted-buttons&disable-funding=venmo&currency=USD"
          crossOrigin="anonymous"
          async
        />
      </head>
      <body className={cn(inter.className, "antialiased min-h-screen relative")}>
        <CartProvider>
          <Navbar />
          <main className="relative">
            {children}
          </main>
          <Footer userCountryCode={userCountry} />
          <GoogleAnalytics />
          <PopupManager userCountryCode={userCountry} />
        </CartProvider>
      </body>
    </html>
  );
}

