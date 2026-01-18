import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BTS World Tour 2026 | Entradas Oficiales Latinoamérica",
  description: "Compra tus entradas para el BTS World Tour 2026 en Perú, Chile y Latinoamérica. Fechas oficiales, precios y preventa ARMY.",
  metadataBase: new URL('https://entradasbts.com'),
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={cn(inter.className, "antialiased min-h-screen pb-20")}>
        <Navbar />
        <main className="relative">
          {children}
        </main>
      </body>
    </html>
  );
}

