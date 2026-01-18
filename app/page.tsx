

import { GlassCard } from "@/components/GlassCard";
import { Button } from "@/components/Button";
import Link from "next/link";
import { countries } from "@/lib/data/countries";
import { ArrowRight, Ticket, Music, ShoppingBag } from "lucide-react";
import Image from "next/image";
import { HomeCommunityBanner } from "@/components/HomeCommunityBanner";

export const metadata = {
  title: 'Entradas BTS World Tour 2026 | Latinoamérica',
  description: 'Gira oficial de BTS por Latinoamérica. Fechas confirmadas en Perú, Chile, México y Colombia. Venta de entradas y paquetes VIP en entradasbts.com.',
  openGraph: {
    title: 'BTS World Tour 2026 - Latinoamérica',
    description: 'Fechas confirmadas en Perú, Chile, México y Colombia. ¡El Army se une!',
    url: 'https://entradasbts.com',
    siteName: 'BTS Tour 2026 Latam',
    images: [
      {
        url: '/images/home-hero.jpg',
        width: 1600,
        height: 900,
        alt: 'BTS World Tour 2026 Latinoamérica',
      },
    ],
    locale: 'es_LA',
    type: 'website',
  },
  alternates: {
    canonical: 'https://entradasbts.com',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BTS World Tour 2026 | Latinoamérica Oficial',
    description: 'Fechas confirmadas en Perú, Chile, México y Colombia. ¡El Army se une!',
    images: ['/images/home-hero.jpg'],
  },
};

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EventSeries",
    "name": "BTS World Tour 2026 - Latin America",
    "startDate": "2026-10-02", // First date of the tour (Colombia)
    "endDate": "2026-10-24", // Last date of the tour (Mexico)
    "description": "Gira oficial de BTS por Latinoamérica incluyendo Lima, Santiago, CDMX y Bogotá.",
    "organizer": {
      "@type": "Organization",
      "name": "Hybe Corporation",
      "url": "https://ibighit.com"
    },
    "subEvent": countries.map(c => ({
      "@type": "Event",
      "name": `Concierto BTS ${c.name}`,
      "startDate": c.dates[0],
      "endDate": c.dates.length > 1 ? c.dates[c.dates.length - 1] : c.dates[0],
      "eventStatus": "https://schema.org/EventScheduled",
      "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
      "location": {
        "@type": "Place",
        "name": c.venue,
        "address": {
          "@type": "PostalAddress",
          "addressLocality": c.city,
          "addressCountry": c.isoCode
        }
      },
      "image": [
        `https://entradasbts.com${c.openGraphImage}`,
        "https://entradasbts.com/images/home-hero.jpg"
      ],
      "description": c.description,
      "performer": {
        "@type": "MusicGroup",
        "name": "BTS",
        "url": "https://ibighit.com/bts"
      },
      "organizer": {
        "@type": "Organization",
        "name": "Hybe Corporation",
        "url": "https://ibighit.com"
      },
      "offers": {
        "@type": "AggregateOffer",
        "url": `https://entradasbts.com/${c.id}`,
        "priceCurrency": c.currency,
        "lowPrice": Math.min(...c.prices.map(p => p.price)),
        "highPrice": Math.max(...c.prices.map(p => p.price)),
        "offerCount": c.prices.length,
        "availability": "https://schema.org/InStock",
        "validFrom": c.ticketDate.includes('24') ? "2026-01-24" :
          c.ticketDate.includes('26') ? "2026-01-26" :
            c.ticketDate.includes('28') ? "2026-01-28" : "2026-01-20"
      },
      "url": `https://entradasbts.com/${c.id}`
    }))
  };

  return (
    <div className="min-h-screen text-white selection:bg-acid-yellow selection:text-black pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* BACKGROUND NOISE */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-20 bg-noise mix-blend-overlay"></div>

      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex flex-col items-center justify-center overflow-hidden pt-32 pb-32 border-b-2 border-white/20">

        {/* HERO BACKGROUND IMAGE */}
        <div className="absolute inset-0 z-0 select-none">
          <Image
            src="/images/home-hero.jpg"
            alt="Integrantes de BTS en concierto para el tour mundial 2026"
            fill
            className="object-cover opacity-60"
            priority
          />
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/80"></div>
        </div>

        {/* GIANT BACK TEXT - Main H1 for SEO */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden z-0 mix-blend-overlay">
          <h1 className="text-[20vw] font-black text-white/10 whitespace-nowrap leading-none" style={{ fontFamily: 'Arial Black' }}>
            <span className="sr-only">Entradas BTS World Tour Latinoamérica 2026 </span>BTS<span className="sr-only"> LIVE</span> LIVE
          </h1>
        </div>

        <div className="relative z-10 container mx-auto px-4 flex flex-col items-center text-center gap-4">
          <div className="inline-block bg-acid-pink text-black px-4 py-1 text-lg font-black uppercase -rotate-2 shadow-[4px_4px_0_white] mb-4">
            Gira Mundial 2026
          </div>

          {/* Visual Title - Semantically H2 */}
          <h2 className="text-6xl md:text-9xl font-black tracking-tighter uppercase leading-[0.9]">
            <span className="block text-transparent bg-clip-text bg-white mix-blend-difference">La Espera</span>
            <span className="block text-acid-yellow italic font-serif">Terminó</span>
          </h2>

          <p className="max-w-xl text-gray-400 text-lg md:text-xl font-medium">
            El evento más grande de la historia. 34 ciudades. 5 continentes.
            <span className="text-white font-bold"> ¿Estás listo?</span>
          </p>

          <div className="flex flex-col md:flex-row gap-4 md:gap-6 w-full md:w-auto">
            <Button size="lg" variant="primary" className="w-full md:w-auto">
              Ver Entradas
            </Button>
            <Button size="lg" variant="outline" className="w-full md:w-auto">
              Ver Fechas
            </Button>
          </div>
        </div>
      </section>

      {/* QUICK SELECT GRID */}
      <section className="container mx-auto px-4 py-24">
        <div className="flex items-end justify-between mb-12 border-b-4 border-white pb-4">
          <h2 className="text-5xl font-black uppercase italic">Fechas del Tour</h2>
          <div className="text-sm font-bold uppercase tracking-widest text-gray-500">Selecciona tu ciudad</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {countries.map((country, i) => (
            <Link key={country.id} href={`/${country.id}`} className="group block">
              <GlassCard variant="interactive" className="h-full flex flex-col justify-between min-h-[300px] hover:bg-[#111] transition-colors">
                <div className="flex justify-between items-start">
                  <span className="text-6xl font-black text-white/10 group-hover:text-acid-pink/20 transition-colors">0{i + 1}</span>
                  <div className="bg-white text-black text-xs font-bold px-2 py-1 uppercase">Oficial</div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-4xl font-black uppercase leading-none mb-1 group-hover:text-acid-yellow transition-colors">{country.city}</h3>
                    <p className="text-gray-500 font-serif italic text-lg">{country.name}</p>
                  </div>

                  <div className="border-t border-white/20 pt-4 flex justify-between items-center">
                    <span className="text-xs font-bold uppercase tracking-widest text-gray-400">{country.venue}</span>
                    <ArrowRight className="w-5 h-5 -rotate-45 group-hover:rotate-0 transition-transform text-acid-pink" />
                  </div>
                </div>
              </GlassCard>
            </Link>
          ))}
        </div>
      </section>



      {/* COMMUNITY BANNER */}
      <HomeCommunityBanner />

      {/* BLOG & SHOP TEASERS */}
      <section className="container mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Shop Teaser */}
          <div className="bg-acid-yellow p-1">
            <div className="bg-black border-2 border-black h-full p-8 md:p-12 flex flex-col items-start justify-center relative overflow-hidden group">
              {/* Hover Effect */}
              <div className="absolute inset-0 bg-acid-yellow translate-y-full group-hover:translate-y-0 transition-transform duration-500 z-0"></div>

              <div className="relative z-10 group-hover:text-black transition-colors">
                <div className="bg-acid-pink w-12 h-12 flex items-center justify-center border-2 border-white group-hover:border-black mb-6">
                  <ShoppingBag className="w-6 h-6 text-black" />
                </div>
                <h3 className="text-4xl font-black uppercase mb-4">Merch Oficial</h3>
                <p className="mb-8 font-serif italic text-xl max-w-sm">Army Bombs, Hoodies y ediciones limitadas disponibles ahora.</p>
                <Link href="/tienda">
                  <Button variant="outline" className="group-hover:border-black group-hover:text-black group-hover:hover:bg-black group-hover:hover:text-white border-white text-white">
                    Ir a la Tienda
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Blog Teaser */}
          <div className="border-2 border-white p-8 md:p-12 flex flex-col justify-between hover:bg-white/5 transition-colors">
            <div>
              <h3 className="text-4xl font-black uppercase mb-8">Últimas Noticias</h3>
              <div className="space-y-6">
                <Link href="/blog/guide" className="block group">
                  <div className="flex items-start gap-4">
                    <span className="text-acid-pink font-mono">01</span>
                    <div>
                      <h4 className="text-xl font-bold uppercase group-hover:text-acid-yellow transition-colors">Guía de Supervivencia</h4>
                      <p className="text-sm text-gray-500">Tips esenciales para la fila virtual.</p>
                    </div>
                  </div>
                </Link>
                <Link href="/blog/setlist" className="block group">
                  <div className="flex items-start gap-4">
                    <span className="text-neon-green font-mono">02</span>
                    <div>
                      <h4 className="text-xl font-bold uppercase group-hover:text-acid-yellow transition-colors">Rumores del Setlist</h4>
                      <p className="text-sm text-gray-500">¿Qué canciones esperamos escuchar?</p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
            <Link href="/blog" className="mt-8 flex items-center gap-2 text-sm font-bold uppercase tracking-widest hover:text-acid-pink transition-colors">
              Leer todo <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>

      {/* PARTNERS MARQUEE */}
      <section className="border-y-2 border-white/20 bg-black py-4 overflow-hidden mb-20">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="flex items-center gap-12 mx-8 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300">
              <span className="text-xl font-black uppercase text-white">HYBE CORP</span>
              <span className="text-xl font-black uppercase text-white">BIGHIT MUSIC</span>
              <Link href="https://www.ravehublatam.com" target="_blank" className="text-xl font-black uppercase text-acid-yellow hover:underline decoration-2">RAVEHUB</Link>
              <span className="text-xl font-black uppercase text-white">LIVE NATION</span>
              <span className="text-xl font-black uppercase text-white">TICKETMASTER</span>
            </div>
          ))}
        </div>
      </section>

    </div >
  );
}
