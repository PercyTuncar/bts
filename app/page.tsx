

import { GlassCard } from "@/components/GlassCard";
import { Button } from "@/components/Button";
import Link from "next/link";
import { countries } from "@/lib/data/countries";
import { ArrowRight, Ticket, Music, ShoppingBag } from "lucide-react";
import Image from "next/image";
import { HomeCommunityBanner } from "@/components/HomeCommunityBanner";

const countryImages: Record<string, string> = {
    peru: "https://cuscoperu.b-cdn.net/wp-content/uploads/2024/02/Atardece-Costa-verde-Lima.webp",
    chile: "https://images.adsttc.com/media/images/6375/4384/bd52/ae22/4b92/1646/large_jpg/guia-de-arquitectura-en-santiago-de-chile-41-edificios-complejos-y-parques-de-la-capital-chilena_43.jpg?1668629390",
    colombia: "https://cloudfront-us-east-1.images.arcpublishing.com/infobae/JAAYCWLOQRHOTKSLAZAH37REYM.jpeg",
    madrid: "https://spanish100.com/wp-content/uploads/2013/04/Madrid-820x410.png",
    mexico: "https://media.vogue.mx/photos/5f95dc072b8eeeefbed2b680/master/w_1600%2Cc_limit/Ciudad-de-Me%25CC%2581xico-Zo%25CC%2581calo.jpg",
    argentina: "https://media.admagazine.com/photos/618a6a585e45a526c6be8f63/master/w_1600,c_limit/61333.jpg",
    brasil: "https://humanidades.com/wp-content/uploads/2018/08/brasil-2-e1574647461361-800x415.jpg",
};

export const metadata = {
  title: 'Entradas BTS ARIRANG Tour 2026 | Latinoamérica y España',
  description: 'Entradas para el BTS World Tour ARIRANG 2026. Fechas en Chile, Perú, Colombia, Argentina y Brasil. Servicio de compra garantizada para el ARMY.',
  openGraph: {
    title: 'Entradas BTS ARIRANG Tour 2026 | Latinoamérica y España',
    description: 'Todas las fechas del BTS World Tour ARIRANG 2026 en Perú, Chile, Colombia, Argentina y Brasil. Compra garantizada para el ARMY.',
    url: 'https://entradasbts.com/',
    siteName: 'EntradasBTS – RaveHub Latam',
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
    canonical: 'https://entradasbts.com/',
    languages: {
      'es': 'https://entradasbts.com/',
      'es-PE': 'https://entradasbts.com/peru/',
      'es-CL': 'https://entradasbts.com/chile/',
      'es-MX': 'https://entradasbts.com/mexico/',
      'es-CO': 'https://entradasbts.com/colombia/',
      'es-AR': 'https://entradasbts.com/argentina/',
      'es-ES': 'https://entradasbts.com/madrid/',
      'pt-BR': 'https://entradasbts.com/brasil/',
      // x-default points to the country selector, the best signal of intent
      // for traffic where no country/language has been detected.
      'x-default': 'https://entradasbts.com/eventos/',
    },
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Entradas BTS ARIRANG Tour 2026 | Latinoamérica y España',
    description: 'Todas las fechas del BTS World Tour ARIRANG 2026 en Perú, Chile, Colombia, Argentina, Brasil y España. Compra garantizada para el ARMY.',
    site: '@ravehublatam',
    creator: '@ravehublatam',
    images: ['/images/home-hero.jpg'],
  },
};

// Order for the home ItemList (most-searched markets first).
const HOME_LIST_ORDER = ['mexico', 'colombia', 'peru', 'chile', 'argentina', 'brasil', 'madrid'];

export default function Home() {
  // Organization, WebSite/SearchAction and MusicGroup are declared once,
  // site-wide, in app/layout.tsx (referenced by @id) — not repeated here.
  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "BTS WORLD TOUR ARIRANG 2026 – Fechas en Latinoamérica y España",
    "description": "Todas las fechas confirmadas del BTS World Tour ARIRANG 2026 en América Latina y España.",
    "url": "https://entradasbts.com/",
    "numberOfItems": HOME_LIST_ORDER.length,
    "itemListElement": HOME_LIST_ORDER.map((id, i) => {
      const labels: Record<string, string> = {
        mexico: "Entradas BTS México 2026 – Estadio GNP Seguros (7, 9 y 10 mayo)",
        colombia: "Entradas BTS Colombia 2026 – Estadio El Campín (2-3 oct)",
        peru: "Entradas BTS Perú 2026 – Estadio San Marcos (7, 9, 10 oct)",
        chile: "Entradas BTS Chile 2026 – Estadio Nacional (14-17 oct)",
        argentina: "Entradas BTS Argentina 2026 – Estadio Único (21, 23, 24 oct)",
        brasil: "Entradas BTS Brasil 2026 – Estádio MorumBIS (28-31 oct)",
        madrid: "Entradas BTS España 2026 – Riyadh Air Metropolitano (26-27 jun)"
      };

      return {
        "@type": "ListItem",
        "position": i + 1,
        "name": labels[id],
        "url": `https://entradasbts.com/${id}/`
      };
    })
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Inicio – BTS ARIRANG Tour 2026",
        "item": "https://entradasbts.com/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Ver todos los eventos",
        "item": "https://entradasbts.com/eventos/"
      }
    ]
  };

  const structuredData = [itemListLd, breadcrumbLd];

  return (
    <div className="min-h-screen text-slate-900 selection:bg-secondary selection:text-white pb-20">
      {structuredData.map((node, idx) => (
        <script
          key={`ld-${idx}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(node) }}
        />
      ))}

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
            <div className="inline-block bg-slate-900 text-white px-6 py-2 text-sm md:text-base font-black uppercase tracking-widest -rotate-2 shadow-[4px_4px_0_#F01942] mb-6 transform hover:rotate-0 transition-transform duration-300">
              BTS World Tour ARIRANG 2026
            </div>
          </div>

          {/* Primary page heading (H1) */}
          <h1 className="flex flex-col items-center justify-center text-5xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85] drop-shadow-sm">
            <span className="block text-slate-900 relative">
              Entradas BTS 2026
            </span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-rose-600 italic font-serif pb-4 relative">
              ARIRANG Tour Latinoamérica
              <span className="absolute -bottom-1 left-0 right-0 h-2 bg-primary/20 -z-10 -rotate-1 rounded-full"></span>
            </span>
          </h1>

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

      {/* N1: SITELINKS GRID — above-the-fold country navigation for Google Sitelinks */}
      <section className="bg-white border-b border-slate-200 py-8">
        <div className="container mx-auto px-4">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4 text-center">
            Selecciona tu país / Selecione seu país
          </p>
          <nav aria-label="Navegación por país">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <a href="/peru/" className="internal-sitelink-card" title="Entradas BTS Perú 2026">
                <span aria-hidden="true">🇵🇪</span>
                <span className="font-bold">Entradas BTS Perú 2026</span>
              </a>
              <a href="/chile/" className="internal-sitelink-card" title="Entradas BTS Chile 2026">
                <span aria-hidden="true">🇨🇱</span>
                <span className="font-bold">Entradas BTS Chile 2026</span>
              </a>
              <a href="/mexico/" className="internal-sitelink-card" title="Boletos BTS México 2026">
                <span aria-hidden="true">🇲🇽</span>
                <span className="font-bold">Boletos BTS México 2026</span>
              </a>
              <a href="/colombia/" className="internal-sitelink-card" title="Boletas BTS Colombia 2026">
                <span aria-hidden="true">🇨🇴</span>
                <span className="font-bold">Boletas BTS Colombia 2026</span>
              </a>
              <a href="/argentina/" className="internal-sitelink-card" title="Entradas BTS Argentina 2026">
                <span aria-hidden="true">🇦🇷</span>
                <span className="font-bold">Entradas BTS Argentina 2026</span>
              </a>
              <a href="/brasil/" className="internal-sitelink-card" title="Ingressos BTS Brasil 2026">
                <span aria-hidden="true">🇧🇷</span>
                <span className="font-bold">Ingressos BTS Brasil 2026</span>
              </a>
              <a href="/madrid/" className="internal-sitelink-card" title="Entradas BTS Madrid 2026">
                <span aria-hidden="true">🇪🇸</span>
                <span className="font-bold">Entradas BTS Madrid 2026</span>
              </a>
            </div>
          </nav>
        </div>
      </section>

      {/* QUICK SELECT GRID */}
      <section id="tour-dates" className="container mx-auto px-4 py-24">
        <div className="flex items-end justify-between mb-12 border-b-4 border-slate-200 pb-4">
          <h2 className="text-5xl font-black uppercase italic">Fechas y Países del Tour de BTS 2026</h2>
          <div className="text-sm font-bold uppercase tracking-widest text-gray-500">Selecciona tu país</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {countries.map((country, i) => (
            <Link key={country.id} href={`/${country.id}`} className="group block h-full">
              <GlassCard variant="interactive" className="h-full flex flex-col p-0 overflow-hidden border border-slate-200 shadow-sm hover:shadow-md">
                <div className="relative h-40 overflow-hidden">
                  <Image
                    src={countryImages[country.id] || "/images/stadium-map.png"}
                    alt={`${country.name} - ${country.city}`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between bg-white">
                  <div>
                    <h3 className="text-2xl font-black uppercase leading-none mb-1 text-slate-900 group-hover:text-primary transition-colors">{country.city}</h3>
                    <p className="text-slate-500 font-serif italic text-sm">{country.venue}</p>
                  </div>

                  <div className="border-t border-slate-200 pt-3 mt-3 flex justify-between items-center">
                    <span className="text-xs font-bold uppercase tracking-widest text-slate-400">{country.isoCode}</span>
                    <ArrowRight className="w-4 h-4 -rotate-45 group-hover:rotate-0 transition-transform text-primary" />
                  </div>
                </div>
              </GlassCard>
            </Link>
          ))}
        </div>
      </section>



      <section className="container mx-auto px-4 pb-16">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm md:p-12">
          <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-slate-900">
            BTS WORLD TOUR ARIRANG 2026 en Latinoamérica y España
          </h2>
          <p className="mt-6 max-w-4xl text-lg leading-8 text-slate-700">
            El BTS WORLD TOUR &apos;ARIRANG&apos; marca el regreso más esperado del k-pop a los escenarios de Latinoamérica y España. Los siete miembros — RM, Jin, SUGA, j-hope, Jimin, V y Jung Kook — presentan su tour internacional con fechas en México, Colombia, Perú, Chile, Argentina, Brasil y Madrid entre mayo y octubre de 2026.
          </p>
          <p className="mt-4 max-w-4xl text-lg leading-8 text-slate-700">
            Nuestra plataforma reúne las fechas confirmadas por país, las ubicaciones de los estadios y la información necesaria para comprar entradas con respaldo y seguimiento especializado para el ARMY.
          </p>

          <h3 className="mt-8 text-2xl font-black uppercase text-slate-900">
            ¿Cómo funciona nuestro servicio?
          </h3>
          <p className="mt-4 max-w-4xl text-lg leading-8 text-slate-700">
            EntradasBTS opera como un servicio independiente de Personal Shopper para la adquisición de entradas a través de plataformas oficiales y canales verificados. Gestionamos la compra, la validación y la orientación para que cada usuario pueda reservar su lugar con mayor seguridad.
          </p>

          <h3 className="mt-8 text-2xl font-black uppercase text-slate-900">
            Fechas confirmadas por país
          </h3>
          <ul className="mt-4 grid gap-3 md:grid-cols-2 text-lg leading-8 text-slate-700">
            <li><strong>México:</strong> Estadio GNP Seguros — 7, 9 y 10 de mayo de 2026</li>
            <li><strong>Colombia:</strong> Estadio El Campín — 2 y 3 de octubre de 2026</li>
            <li><strong>Perú:</strong> Estadio San Marcos — 7, 9 y 10 de octubre de 2026</li>
            <li><strong>Chile:</strong> Estadio Nacional — 14, 16 y 17 de octubre de 2026</li>
            <li><strong>Argentina:</strong> Estadio Único — 21, 23 y 24 de octubre de 2026</li>
            <li><strong>Brasil:</strong> Estádio do MorumBIS — 28, 29 y 31 de octubre de 2026</li>
            <li><strong>España:</strong> Riyadh Air Metropolitano — 26 y 27 de junio de 2026</li>
          </ul>
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
                <Link href="/blog/setlist-predictions" className="block group">
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
