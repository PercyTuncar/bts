import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

export const runtime = 'edge';

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { cn } from "@/lib/utils";

const inter = Inter({ 
    subsets: ["latin", "latin-ext"],
    display: 'swap',
    preload: true,
});

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

// Site-wide JSON-LD entities (Organization, WebSite, MusicGroup) declared once
// here and referenced by @id from every page, instead of being re-emitted with
// slightly different data on the home page and on each country page.
const organizationLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://entradasbts.com/#organization",
  "name": "RaveHub Latam",
  "alternateName": "EntradasBTS",
  "url": "https://entradasbts.com/",
  "logo": {
    "@type": "ImageObject",
    "@id": "https://entradasbts.com/#logo",
    "url": "https://entradasbts.com/favicon-32x32.png",
    "width": 32,
    "height": 32,
    "caption": "EntradasBTS / RaveHub Latam"
  },
  "description": "Servicio independiente de gestión de compra de entradas y membresías para conciertos en Latinoamérica y España. No afiliado a artistas, sellos discográficos, ticketeras oficiales ni organizadores de eventos.",
  "areaServed": ["PE", "AR", "CL", "MX", "CO", "BR", "ES"],
  "knowsLanguage": ["es", "pt"],
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer support",
    "availableLanguage": ["Spanish", "Portuguese"],
    "url": "https://entradasbts.com/legal/contacto"
  },
  "foundingDate": "2024",
  "sameAs": [
    "https://www.ravehublatam.com"
  ]
};

const websiteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://entradasbts.com/#website",
  "url": "https://entradasbts.com/",
  "name": "EntradasBTS – BTS World Tour ARIRANG 2026",
  "description": "Entradas para el BTS World Tour ARIRANG 2026 en Latinoamérica y España.",
  "inLanguage": ["es", "pt-BR"],
  "publisher": {
    "@id": "https://entradasbts.com/#organization"
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://entradasbts.com/eventos/?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  },
  "hasPart": [
    { "@type": "WebPage", "name": "Entradas BTS Perú 2026", "url": "https://entradasbts.com/peru/" },
    { "@type": "WebPage", "name": "Entradas BTS Chile 2026", "url": "https://entradasbts.com/chile/" },
    { "@type": "WebPage", "name": "Boletos BTS México 2026", "url": "https://entradasbts.com/mexico/" },
    { "@type": "WebPage", "name": "Boletas BTS Colombia 2026", "url": "https://entradasbts.com/colombia/" },
    { "@type": "WebPage", "name": "Entradas BTS Argentina 2026", "url": "https://entradasbts.com/argentina/" },
    { "@type": "WebPage", "name": "Ingressos BTS Brasil 2026", "url": "https://entradasbts.com/brasil/" },
    { "@type": "WebPage", "name": "Entradas BTS Madrid 2026", "url": "https://entradasbts.com/madrid/" }
  ]
};

const musicGroupLd = {
  "@context": "https://schema.org",
  "@type": "MusicGroup",
  "@id": "https://entradasbts.com/#bts-musicgroup",
  "name": "BTS",
  "url": "https://ibighit.com/bts",
  "sameAs": [
    "https://en.wikipedia.org/wiki/BTS_(band)",
    "https://www.wikidata.org/wiki/Q494703",
    "https://open.spotify.com/artist/3Nrfpe0tUJi4K4DXYWgMUX",
    "https://www.instagram.com/bts.bighitofficial/",
    "https://twitter.com/bts_bighit",
    "https://www.youtube.com/@bts_bighit",
    "https://www.tiktok.com/@bts_official_bighit"
  ]
};

const globalStructuredData = [organizationLd, websiteLd, musicGroupLd];

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
        {/* F2: Preconnects for universal resources only (L1: country-specific moved to country page) */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://humanidades.com" />
        <link rel="dns-prefetch" href="https://media.vogue.mx" />
        {/* F2: Add Firebase and Cloudinary for maps */}
        <link rel="preconnect" href="https://firebasestorage.googleapis.com" />
        <link rel="preconnect" href="https://res.cloudinary.com" />
        {/* Site-wide entities: declared once here, referenced by @id from every page
            (Organization, WebSite/SearchAction, MusicGroup) instead of being
            repeated with slightly different data on each page. */}
        {globalStructuredData.map((node, idx) => (
          <script
            key={`global-ld-${idx}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(node) }}
          />
        ))}
        {/* I2: PayPal moved to lazyOnload below */}
        <Script
          src="https://www.paypal.com/sdk/js?client-id=BAAa3-7GvLFL-Yj8lVIRkzve8wz_NyvMLwwiP0luzM_GUrmZujpbK2ikByE62VasK54tguRkwDOKZdTTfg&components=hosted-buttons&disable-funding=venmo&currency=USD"
          crossOrigin="anonymous"
          strategy="lazyOnload"
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

