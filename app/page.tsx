

import { GlassCard } from "@/components/GlassCard";
import { Button } from "@/components/Button";
import Link from "next/link";
import { countries } from "@/lib/data/countries";
import { ArrowRight, Ticket, ShoppingBag, Sparkles, Calendar } from "lucide-react";
import Image from "next/image";
import { HomeCommunityBanner } from "@/components/HomeCommunityBanner";

export const metadata = {
  title: 'Entradas BTS 2026',
  description: 'Venta segura de entradas para la gira de BTS por Latinoamérica. Fechas confirmadas en Perú, Chile, México y Colombia. Compra segura en entradasbts.com.',
  openGraph: {
    title: 'BTS 2026 - Latinoamérica',
    description: 'Fechas confirmadas en Perú, Chile, México y Colombia. ¡El Army se une!',
    url: 'https://entradasbts.com',
    siteName: 'BTS 2026 Latam',
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
    languages: {
      'es-PE': 'https://entradasbts.com/peru',
      'es-CL': 'https://entradasbts.com/chile',
      'es-MX': 'https://entradasbts.com/mexico',
      'es-CO': 'https://entradasbts.com/colombia',
      'es-AR': 'https://entradasbts.com/argentina',
      'es-ES': 'https://entradasbts.com/madrid',
      'pt-BR': 'https://entradasbts.com/brasil',
      'x-default': 'https://entradasbts.com/',
    },
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BTS World Tour 2026 | Venta Segura Latam',
    description: 'Fechas confirmadas en Perú, Chile, México y Colombia. ¡El Army se une!',
    images: ['/images/home-hero.jpg'],
  },
};

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EventSeries",
    "name": "BTS World Tour 2026 - Latin America",
    "startDate": "2026-05-07", // First date of the tour (Mexico)
    "endDate": "2026-10-16", // Last date of the tour (Chile)
    "description": "Venta autorizada de entradas para la gira de BTS en Latinoamérica incluyendo Lima, Santiago, CDMX y Bogotá.",
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
        "sameAs": c.id === 'peru' ? "https://es.wikipedia.org/wiki/Estadio_Nacional_del_Per%C3%BA" :
          c.id === 'chile' ? "https://es.wikipedia.org/wiki/Estadio_Monumental_(Chile)" :
            c.id === 'mexico' ? "https://es.wikipedia.org/wiki/Estadio_Azteca" :
              "https://es.wikipedia.org/wiki/Estadio_Nemesio_Camacho_El_Camp%C3%ADn",
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
        "url": `https://entradasbts.com/${c.id}/`,
        "priceCurrency": c.currency,
        "lowPrice": Math.min(...c.prices.map(p => p.price)),
        "highPrice": Math.max(...c.prices.map(p => p.price)),
        "offerCount": c.prices.length,
        "availability": "https://schema.org/InStock",
        "validFrom": c.ticketDate.includes('24') ? "2026-01-24" :
          c.ticketDate.includes('26') ? "2026-01-26" :
            c.ticketDate.includes('28') ? "2026-01-28" : "2026-01-20",
        "seller": {
          "@type": "Organization",
          "name": "EntradasBTS (Ravehub)",
          "url": "https://entradasbts.com"
        }
      },
      "url": `https://entradasbts.com/${c.id}/`
    }))
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-primary/30 selection:text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section */}
      <section className="relative min-h-[100vh] flex flex-col items-center justify-center overflow-hidden">

        {/* HERO BACKGROUND IMAGE */}
        <div className="absolute inset-0 z-0 select-none overflow-hidden">
          <Image
            src="/images/home-hero.jpg"
            alt="Integrantes de BTS en concierto para el tour mundial 2026"
            fill
            className="object-cover"
            priority
          />
          {/* Dark Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60" />
          {/* Purple Glow */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[200%] h-1/2 bg-purple-glow opacity-40" />
        </div>

        {/* GIANT BACK TEXT - Decorative */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden z-0">
          <div className="text-[20vw] font-black text-white/[0.02] whitespace-nowrap leading-none" style={{ fontFamily: 'Arial Black' }}>
            BTS 2026
          </div>
        </div>

        <div className="relative z-10 container mx-auto px-4 flex flex-col items-center text-center gap-8">

          {/* Live Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/30 text-primary text-sm font-bold uppercase tracking-wider animate-fade-in-up">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            World Tour 2026
          </div>

          {/* Main Title */}
          <h1 className="flex flex-col items-center justify-center text-6xl md:text-9xl font-black tracking-tight uppercase leading-[0.85] animate-fade-in-up">
            <span className="block text-white">
              Entradas BTS
            </span>
            <span className="block gradient-text">
              World Tour
            </span>
          </h1>

          <p className="max-w-2xl text-white/60 text-lg md:text-xl font-medium leading-relaxed animate-fade-in-up">
            El evento mas grande de la historia.
            <span className="text-white"> 34 ciudades. 5 continentes.</span>
            <span className="gradient-text font-bold"> El oceano purpura te espera.</span>
          </p>

          <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto mt-4 animate-fade-in-up">
            <Link href="/eventos" className="w-full md:w-auto">
              <Button size="lg" variant="glow" className="w-full text-lg h-14 px-10">
                <Ticket className="w-5 h-5 mr-2" />
                Ver Entradas
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link href="#tour-dates" className="w-full md:w-auto">
              <Button size="lg" variant="secondary" className="w-full text-lg h-14 px-10">
                <Calendar className="w-5 h-5 mr-2" />
                Ver Fechas
              </Button>
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in-up">
          <span className="text-white/30 text-xs uppercase tracking-widest">Scroll</span>
          <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-1">
            <div className="w-1.5 h-3 bg-primary rounded-full animate-bounce" />
          </div>
        </div>
      </section>

      {/* QUICK SELECT GRID */}
      <section id="tour-dates" className="py-24 relative">
        {/* Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-purple-glow opacity-20 pointer-events-none" />
        
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-primary text-sm font-bold uppercase tracking-widest mb-2 block">Selecciona tu ciudad</span>
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight">Fechas del Tour</h2>
            </div>
            <p className="text-white/40 text-sm max-w-xs">Latinoamerica y Europa. Elige tu destino y asegura tu lugar.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {countries.map((country, i) => (
              <Link key={country.id} href={`/${country.id}`} className="group block">
                <div className="glass-card p-6 rounded-2xl h-full flex flex-col justify-between min-h-[280px] transition-all duration-300 hover:shadow-glow hover:-translate-y-1 hover:border-primary/40">
                  <div className="flex justify-between items-start">
                    <span className="text-5xl font-black text-white/5 group-hover:text-primary/20 transition-colors">0{i + 1}</span>
                    <div className="px-2 py-1 rounded-full bg-primary/20 text-primary text-[10px] font-bold uppercase">Disponible</div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h3 className="text-3xl font-black uppercase leading-none mb-1 text-white group-hover:gradient-text transition-colors">{country.city}</h3>
                      <p className="text-white/40 text-sm">{country.name}</p>
                    </div>

                    <div className="border-t border-white/10 pt-4 flex justify-between items-center">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-white/30 block">{country.venue}</span>
                        <span className="text-lg font-bold gradient-text">{country.currencySymbol}{Math.min(...country.prices.map(p => p.price)).toLocaleString()}</span>
                      </div>
                      <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/30 group-hover:border-primary group-hover:text-primary group-hover:bg-primary/10 transition-all">
                        <ArrowRight className="w-4 h-4 -rotate-45 group-hover:rotate-0 transition-transform" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>



      {/* COMMUNITY BANNER */}
      <HomeCommunityBanner />

      {/* BLOG & SHOP TEASERS */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Shop Teaser */}
          <div className="glass-card p-8 md:p-10 rounded-2xl relative overflow-hidden group hover:shadow-glow transition-all">
            {/* Hover Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />

            <div className="relative z-10">
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-6">
                <ShoppingBag className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-3xl font-black uppercase mb-3 text-white">Merch Oficial</h3>
              <p className="mb-6 text-white/50 max-w-sm">Army Bombs, Hoodies y ediciones limitadas disponibles.</p>
              <Link href="/tienda">
                <Button variant="outline" className="border-primary/50 text-primary hover:bg-primary hover:text-white">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Ir a la Tienda
                </Button>
              </Link>
            </div>
          </div>

          {/* Blog Teaser */}
          <div className="glass-card p-8 md:p-10 rounded-2xl flex flex-col justify-between">
            <div>
              <h3 className="text-3xl font-black uppercase mb-6 text-white">Ultimas Noticias</h3>
              <div className="space-y-4">
                <Link href="/blog/guide" className="block group">
                  <div className="flex items-start gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors -mx-3">
                    <span className="text-primary font-mono font-bold text-sm">01</span>
                    <div>
                      <h4 className="text-base font-bold text-white group-hover:text-primary transition-colors">Guia de Supervivencia</h4>
                      <p className="text-sm text-white/40">Tips esenciales para la fila virtual.</p>
                    </div>
                  </div>
                </Link>
                <Link href="/blog/setlist" className="block group">
                  <div className="flex items-start gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors -mx-3">
                    <span className="text-secondary font-mono font-bold text-sm">02</span>
                    <div>
                      <h4 className="text-base font-bold text-white group-hover:text-primary transition-colors">Rumores del Setlist</h4>
                      <p className="text-sm text-white/40">Que canciones esperamos escuchar?</p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
            <Link href="/blog" className="mt-6 flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-white/50 hover:text-primary transition-colors">
              Leer todo <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>

      {/* PARTNERS MARQUEE */}
      <section className="border-y border-white/5 bg-surface-dark py-4 overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="flex items-center gap-12 mx-8">
              <span className="text-lg font-black uppercase text-white/20">HYBE CORP</span>
              <span className="text-lg font-black uppercase text-white/20">BIGHIT MUSIC</span>
              <Link href="https://www.ravehublatam.com" target="_blank" rel="noopener" className="text-lg font-black uppercase text-primary/60 hover:text-primary transition-colors">RAVEHUB</Link>
              <span className="text-lg font-black uppercase text-white/20">LIVE NATION</span>
              <span className="text-lg font-black uppercase text-white/20">TICKETMASTER</span>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
