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
    default: "BTS 2026 | Entradas Latinoamérica",
    template: "%s",
  },
  description: "Compra tus entradas para el BTS 2026 en Perú, Chile y Latinoamérica. Fechas confirmadas, precios y preventa ARMY. Distribuidor Autorizado.",
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
    title: 'Entradas BTS Perú 2026 - Estadio Nacional',
    description: '¡El Army llega a Lima! Revisa precios y zonas disponibles aquí.',
    url: 'https://entradasbts.com',
    siteName: 'BTS Tickets Perú',
    images: [
      {
        url: '/images/og-peru.jpg',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'es_PE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Entradas BTS Perú 2026',
    description: 'Venta verificada y segura de entradas con Garantía RaveHub.',
    images: ['/images/og-peru.jpg'],
  },
  alternates: {
    canonical: 'https://entradasbts.com',
  },
};

import { CartProvider } from "@/context/CartContext";
import { AutoPopup } from "@/components/AutoPopup";
import { OfficialStatementPopup } from "@/components/OfficialStatementPopup";

import { headers } from "next/headers";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const lang = headersList.get('x-lang') || 'es';

  return (
    <html lang={lang}>
      <body className={cn(inter.className, "antialiased min-h-screen relative")}>
        <CartProvider>
          <Navbar />
          <main className="relative">
            {children}
          </main>
          <Footer />
          <GoogleAnalytics />
          <AutoPopup />
          <OfficialStatementPopup />
        </CartProvider>
      </body>
    </html>
  );
}

