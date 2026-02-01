

import { GlassCard } from "@/components/GlassCard";
import { Button } from "@/components/Button";
import Link from "next/link";
import { countries } from "@/lib/data/countries";
import { ArrowRight, Ticket, Music, ShoppingBag } from "lucide-react";
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
    <div className="min-h-screen text-slate-900 selection:bg-secondary selection:text-white pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* BACKGROUND NOISE */}
      {/* BACKGROUND NOISE - REMOVED FOR CLEAN LIGHT MODE */}
      { /* <div className="fixed inset-0 z-0 pointer-events-none opacity-20 bg-noise mix-blend-overlay"></div> */}

      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex flex-col items-center justify-center overflow-hidden pt-24 pb-24 border-b border-slate-200 bg-white">

        {/* HERO BACKGROUND IMAGE */}
        <div className="absolute inset-0 z-0 select-none overflow-hidden">
          <Image
            src="/images/home-hero.jpg"
            alt="Integrantes de BTS en concierto para el tour mundial 2026"
            fill
            className="object-cover opacity-90" // Increased opacity for better image visibility
            priority
          />
          {/* Light Mode Overlay System */}
          <div className="absolute inset-0 bg-white/50 backdrop-blur-[1px]"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent"></div>
        </div>

        {/* GIANT BACK TEXT - Decorative */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden z-0">
          <div className="text-[15vw] font-black text-slate-900/5 whitespace-nowrap leading-none mix-blend-multiply" style={{ fontFamily: 'Arial Black' }}>
            BTS LIVE
          </div>
        </div>

        <div className="relative z-10 container mx-auto px-4 flex flex-col items-center text-center gap-6">

          <div className="inline-block animate-fade-in-up">
            <h1 className="inline-block bg-slate-900 text-white px-6 py-2 text-sm md:text-base font-black uppercase tracking-widest -rotate-2 shadow-[4px_4px_0_#F01942] mb-6 transform hover:rotate-0 transition-transform duration-300">
              Entradas BTS World Tour 2026
            </h1>
          </div>

          {/* Visual Title - Semantically H2 */}
          <h2 className="flex flex-col items-center justify-center text-5xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85] drop-shadow-sm">
            <span className="block text-slate-900 relative">
              La Espera
            </span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-rose-600 italic font-serif pb-4 relative">
              Terminó
              <span className="absolute -bottom-1 left-0 right-0 h-2 bg-primary/20 -z-10 -rotate-1 rounded-full"></span>
            </span>
          </h2>

          <p className="max-w-xl text-slate-600 text-lg md:text-2xl font-medium leading-relaxed animate-fade-in-up delay-100">
            El evento más grande de la historia. <br className="hidden md:block" />
            <span className="bg-white/80 px-2 py-1 rounded-lg box-decoration-clone backdrop-blur-sm">
              34 ciudades. 5 continentes.
              <span className="text-primary font-black"> ¿Estás listo?</span>
            </span>
          </p>

          <div className="flex flex-col md:flex-row gap-4 md:gap-6 w-full md:w-auto mt-4 animate-fade-in-up delay-200">
            <Link href="/eventos" className="w-full md:w-auto group">
              <Button size="lg" variant="primary" className="w-full text-lg h-14 px-8 shadow-[6px_6px_0_#0f172a] group-hover:shadow-[2px_2px_0_#0f172a] group-hover:translate-x-1 group-hover:translate-y-1 transition-all border-2 border-slate-900 bg-primary text-white hover:bg-red-600">
                Ver Entradas
              </Button>
            </Link>
            <Link href="#tour-dates" className="w-full md:w-auto group">
              <Button size="lg" variant="outline" className="w-full text-lg h-14 px-8 border-2 border-slate-900 text-slate-900 bg-white hover:bg-slate-50 shadow-[6px_6px_0_#cbd5e1] group-hover:shadow-[2px_2px_0_#cbd5e1] group-hover:translate-x-1 group-hover:translate-y-1 transition-all">
                Ver Fechas
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* QUICK SELECT GRID */}
      <section id="tour-dates" className="container mx-auto px-4 py-24">
        <div className="flex items-end justify-between mb-12 border-b-4 border-slate-200 pb-4">
          <h2 className="text-5xl font-black uppercase italic">Fechas del Tour</h2>
          <div className="text-sm font-bold uppercase tracking-widest text-gray-500">Selecciona tu ciudad</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {countries.map((country, i) => (
            <Link key={country.id} href={`/${country.id}`} className="group block">
              <GlassCard variant="interactive" className="h-full flex flex-col justify-between min-h-[300px] hover:bg-white/80 transition-colors border border-slate-200 shadow-sm hover:shadow-md">
                <div className="flex justify-between items-start">
                  <span className="text-6xl font-black text-slate-100 group-hover:text-primary/20 transition-colors">0{i + 1}</span>
                  <div className="bg-slate-900 text-white text-xs font-bold px-2 py-1 uppercase">Disponible</div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-4xl font-black uppercase leading-none mb-1 text-slate-900 group-hover:text-primary transition-colors">{country.city}</h3>
                    <p className="text-slate-500 font-serif italic text-lg">{country.name}</p>
                  </div>

                  <div className="border-t border-slate-200 pt-4 flex justify-between items-center">
                    <span className="text-xs font-bold uppercase tracking-widest text-slate-400">{country.venue}</span>
                    <ArrowRight className="w-5 h-5 -rotate-45 group-hover:rotate-0 transition-transform text-primary" />
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
          <div className="bg-orange-50 p-1 border border-orange-100">
            <div className="bg-white border-2 border-white h-full p-8 md:p-12 flex flex-col items-start justify-center relative overflow-hidden group">
              {/* Hover Effect */}
              <div className="absolute inset-0 bg-primary/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500 z-0"></div>

              <div className="relative z-10 group-hover:text-slate-900 transition-colors">
                <div className="bg-secondary w-12 h-12 flex items-center justify-center border-2 border-slate-100 group-hover:border-slate-200 mb-6 rounded-full">
                  <ShoppingBag className="w-6 h-6 text-slate-900" />
                </div>
                <h3 className="text-4xl font-black uppercase mb-4 text-slate-900">Merch Oficial</h3>
                <p className="mb-8 font-serif italic text-xl max-w-sm text-slate-600">Army Bombs, Hoodies y ediciones limitadas disponibles ahora.</p>
                <Link href="/tienda">
                  <Button variant="outline" className="border-slate-300 text-slate-900 hover:bg-slate-900 hover:text-white">
                    Ir a la Tienda
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Blog Teaser */}
          <div className="border-2 border-slate-200 p-8 md:p-12 flex flex-col justify-between hover:bg-slate-50 transition-colors bg-white">
            <div>
              <h3 className="text-4xl font-black uppercase mb-8">Últimas Noticias</h3>
              <div className="space-y-6">
                <Link href="/blog/guide" className="block group">
                  <div className="flex items-start gap-4">
                    <span className="text-primary font-mono font-bold">01</span>
                    <div>
                      <h4 className="text-xl font-bold uppercase text-slate-900 group-hover:text-primary transition-colors">Guía de Supervivencia</h4>
                      <p className="text-sm text-slate-500">Tips esenciales para la fila virtual.</p>
                    </div>
                  </div>
                </Link>
                <Link href="/blog/setlist" className="block group">
                  <div className="flex items-start gap-4">
                    <span className="text-secondary font-mono font-bold">02</span>
                    <div>
                      <h4 className="text-xl font-bold uppercase text-slate-900 group-hover:text-primary transition-colors">Rumores del Setlist</h4>
                      <p className="text-sm text-slate-500">¿Qué canciones esperamos escuchar?</p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
            <Link href="/blog" className="mt-8 flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-slate-900 hover:text-primary transition-colors">
              Leer todo <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>

      {/* PARTNERS MARQUEE */}
      <section className="border-y border-slate-200 bg-slate-50 py-4 overflow-hidden mb-20">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="flex items-center gap-12 mx-8 opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300">
              <span className="text-xl font-black uppercase text-slate-800">HYBE CORP</span>
              <span className="text-xl font-black uppercase text-slate-800">BIGHIT MUSIC</span>
              <Link href="https://www.ravehublatam.com" target="_blank" rel="noopener" className="text-xl font-black uppercase text-primary hover:underline decoration-2">RAVEHUB</Link>
              <span className="text-xl font-black uppercase text-slate-800">LIVE NATION</span>
              <span className="text-xl font-black uppercase text-slate-800">TICKETMASTER</span>
            </div>
          ))}
        </div>
      </section>

    </div >
  );
}
