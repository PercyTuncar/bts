import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/Button'
import { AutoPlayVideo } from '@/components/AutoPlayVideo'

export const metadata: Metadata = {
  title: 'BTS en Dubai 2026: Confirman Viaje de los 7 Miembros y Rumores de Gira Mundial',
  description: '¡ÚLTIMA HORA! Confirmado: Jin, RM, J-Hope, Suga, Jimin, V y Jungkook viajan juntos a Dubai. Todo sobre su agenda en Emiratos Árabes y posible venta de entradas.',
  keywords: ['BTS Dubai', 'BTS 2026', 'BTS Aeropuerto', 'Kpop Conciertos 2026', 'Entradas BTS'],
  alternates: {
    canonical: '/blog/bts-en-dubai-2026-confirmado-viaje',
  },
  openGraph: {
    title: '¡BTS RUMBO A DUBAI! 🇦🇪 Los 7 miembros confirman viaje juntos',
    description: 'El fandom ARMY en alerta máxima. Fotos exclusivas del aeropuerto y teorías sobre su regreso a los escenarios en Emiratos Árabes.',
    type: 'article',
    publishedTime: '2026-02-02T20:00:00.000Z',
    modifiedTime: '2026-02-02T21:30:00.000Z',
    authors: ['Percy Tunccar'],
    images: [{
      url: '/images/bts-incheon-airport-feb-2026.jpeg',
      width: 1200,
      height: 630,
      alt: 'BTS en el Aeropuerto de Incheon rumbo a Dubai'
    }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@ravehub',
    creator: '@percytunccar',
    images: ['/images/bts-incheon-airport-feb-2026.jpeg'],
  }
}

export default function BTSDubaiNewsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://entradasbts.com/blog/bts-en-dubai-2026-confirmado-viaje"
    },
    "headline": "BTS en Dubai 2026: Confirman Viaje de los 7 Miembros",
    "image": [
      "https://entradasbts.com/images/bts-incheon-airport-feb-2026.jpeg"
    ],
    "datePublished": "2026-02-02T20:00:00+00:00",
    "dateModified": "2026-02-02T20:45:00+00:00",
    "author": {
      "@type": "Person",
      "name": "Percy Tunccar",
      "url": "https://entradasbts.com/nosotros"
    },
    "publisher": {
      "@type": "Organization",
      "name": "EntradasBTS",
      "logo": {
        "@type": "ImageObject",
        "url": "https://entradasbts.com/logo.png",
        "width": 190,
        "height": 60
      }
    },
    "description": "¡ÚLTIMA HORA! Los 7 miembros de BTS (OT7) han sido vistos en el Aeropuerto de Incheon viajando a Dubai. Confirmamos agenda oficial y analizamos rumores de concierto.",
    "articleSection": "Noticias K-Pop",
    "keywords": "BTS, Dubai, Concierto 2026, Kpop, Entradas BTS, Incheon Airport"
  };

  const videoSchema = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": "BTS en Aeropuerto Incheon - Salida a Dubai 2026",
    "description": "Video exclusivo de los 7 integrantes de BTS en el aeropuerto de Incheon partiendo hacia Dubai para su agenda oficial.",
    "thumbnailUrl": "https://entradasbts.com/images/bts-incheon-airport-feb-2026.jpeg",
    "uploadDate": "2026-02-02T20:00:00+00:00",
    "duration": "PT0M45S",
    "contentUrl": "https://entradasbts.com/images/video-bts-en-el-aeropuerto.mp4",
    "embedUrl": "https://entradasbts.com/images/video-bts-en-el-aeropuerto.mp4",
    "publisher": {
      "@type": "Organization",
      "name": "EntradasBTS",
      "logo": {
        "@type": "ImageObject",
        "url": "https://entradasbts.com/logo.png",
        "width": 190,
        "height": 60
      }
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "¿Cuándo llega BTS a Dubai?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Se espera que aterricen en la madrugada del 3 de febrero de 2026 (hora local)."
        }
      },
      {
        "@type": "Question",
        "name": "¿Van a vender entradas para BTS en Dubai?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Aún no hay anuncio oficial de venta, pero se recomienda estar atentos a las plataformas oficiales y a EntradasBTS.com para alertas inmediatas."
        }
      }
    ]
  };

  return (
    <article className="min-h-screen pt-24 pb-20 container mx-auto px-4 max-w-4xl text-slate-900 selection:bg-purple-200 selection:text-purple-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Header Section */}
      <header className="mb-10 text-center md:text-left">
        <div className="text-sm font-bold text-purple-600 uppercase tracking-wide mb-2">
          Noticias • Dubái 2026
        </div>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-none mb-6 text-slate-900 uppercase">
          BTS en Dubai 2026: <span className="text-primary block md:inline">Confirman Viaje</span>
        </h1>
        <div className="flex items-center text-slate-500 text-sm space-x-4 mb-4 md:mb-0 font-medium">
          <time dateTime="2026-02-02">2 de Febrero, 2026</time>
          <span>•</span>
          <span>Por Percy Tunccar</span>
        </div>
      </header>

      {/* Main Image Placeholder */}
      <div className="relative w-full aspect-video bg-slate-100 rounded-lg overflow-hidden mb-12 shadow-inner border border-slate-200">
        <Image 
          src="/images/bts-incheon-airport-feb-2026.jpeg"
          alt="Integrantes de BTS (OT7) juntos en el Aeropuerto de Incheon saliendo hacia Dubai en febrero 2026."
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Article Content - Manual Styling since @tailwindcss/typography is missing */}
      <div className="max-w-none text-lg text-slate-800 leading-relaxed font-sans">
        
        {/* Intro */}
        <p className="mb-6 first-letter:text-5xl first-letter:font-black first-letter:text-primary first-letter:mr-2 float-none">
          <strong className="text-slate-900">Dubai, Emiratos Árabes Unidos.</strong> — La espera ha terminado. Medios internacionales como <em>Gulf News</em> y despachos desde Corea del Sur han confirmado lo que todo el <strong className="text-purple-700">ARMY</strong> esperaba: <strong className="text-slate-900">BTS está oficialmente en camino a Dubai</strong>.
        </p>
        
        <p className="mb-8">
          Este 2 de febrero de 2026 marca un hito histórico: es la primera vez que vemos a los siete integrantes (<strong className="text-slate-900">OT7</strong>) viajando juntos al extranjero tras finalizar sus servicios militares obligatorios.
        </p>

        <h2 className="text-3xl font-black text-slate-900 mt-12 mb-6 uppercase tracking-tight">Lo que sabemos sobre el viaje</h2>
        
        <p className="mb-6">
          Las alarmas saltaron alrededor de las 6:30 PM (hora local de EAU) cuando <strong className="text-slate-900">Jin, Namjoon, Taehyung, J-Hope, Suga, Jimin y Jungkook</strong> fueron vistos ingresando a la terminal de salidas internacionales del <strong>Aeropuerto de Incheon</strong>.
        </p>

        <ul className="list-disc pl-6 space-y-4 my-8 bg-slate-50 p-8 rounded-xl border border-slate-100 text-base">
          <li>
            <strong className="text-purple-700">Evidencia Visual:</strong> Los miembros portaban equipaje ligero y estaban rodeados por su equipo de seguridad y managers de HYBE.
          </li>
          <li>
            <strong className="text-purple-700">Fuente Confiable:</strong> El reporte inicial proviene de Areeba Hashmi para <em>Gulf News</em>, validado posteriormente por medios coreanos como <em>Dispatch</em>.
          </li>
        </ul>

        <blockquote className="border-l-4 border-primary pl-6 py-4 italic bg-primary/10 text-slate-900 rounded-r-lg my-10 shadow-sm">
          <strong className="text-primary block mb-1 uppercase text-xs tracking-wider">Dato Importante</strong>
          No se trata de vacaciones. La agencia ha confirmado brevemente que se trata de una &quot;agenda oficial en el extranjero&quot;.
        </blockquote>

        <h2 className="text-3xl font-black text-slate-900 mt-16 mb-6 uppercase tracking-tight">¿Habrá Concierto este 2026?</h2>
        
        <p className="mb-6">
          Esta es la pregunta que está rompiendo el internet. Aunque HYBE no ha lanzado el comunicado oficial sobre un show en el <strong>Coca-Cola Arena</strong> o el <strong>Expo City Dubai</strong>, los rumores son fuertes. Dubai ha invertido millones en atraer actos de K-pop, y un concierto de &quot;re-debut&quot; global de BTS encajaría perfectamente con la estrategia de turismo de la ciudad.
        </p>

        {/* Secondary Video */}
        <div className="relative w-full aspect-video bg-black rounded-xl overflow-hidden my-10 shadow-sm border border-slate-900">
           <AutoPlayVideo 
             src="/images/video-bts-en-el-aeropuerto.mp4"
             className="w-full h-full object-cover"
             poster="/images/video-poster-placeholder.jpg"
           />
        </div>

        <h3 className="text-2xl font-bold text-slate-900 mt-10 mb-4">Historial de BTS en Emiratos Árabes</h3>
        <p className="mb-6">
          No es la primera vez que el grupo pisa suelo árabe, pero sí la más significativa debido a su reciente reunión. La infraestructura de Dubai permite espectáculos masivos, ideales para la magnitud del fandom actual. 
          Recordemos su paso por el KCON en Abu Dhabi en años anteriores y las múltiples visitas de los miembros individualmente. Esta vez, la sinergia de los siete promete un evento de proporciones épicas que podría marcar el inicio de una gira mundial muy esperada.
        </p>

        <h2 className="text-3xl font-black text-slate-900 mt-16 mb-6 uppercase tracking-tight">Latinoamérica:</h2>
        
        <div className="bg-slate-900 text-white p-8 md:p-10 rounded-3xl shadow-2xl my-10 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary rounded-full filter blur-[80px] opacity-20 group-hover:opacity-30 transition-opacity"></div>
          
          <div className="relative z-10">
            <h3 className="text-2xl md:text-3xl font-black mb-4 text-white uppercase italic">¡Asegura tu lugar en la preventa!</h3>
            <p className="mb-8 text-slate-300 text-lg leading-relaxed">
                Cuando se confirmen las fechas para <strong className="text-white">Perú, Chile, Colombia y Argentina</strong>, las entradas volarán en segundos. Solo los portadores de la Membresía tendrán acceso garantizado a la preventa exclusiva.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                    <div className="font-bold text-primary uppercase text-xs mb-2 tracking-widest">Beneficio Exclusivo</div>
                    <div className="font-bold text-xl mb-2">Acceso a Preventa</div>
                    <p className="text-sm text-slate-400 mb-4">Compra tus boletos 48 horas antes que el resto y asegura tu lugar en el estadio.</p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors flex flex-col justify-center">
                    <div className="font-bold text-primary uppercase text-xs mb-2 tracking-widest">Única Oportunidad</div>
                    <Link href="/comprar-membresia-bts">
                      <Button className="w-full bg-gradient-to-r from-primary to-secondary hover:shadow-glow text-white border-none font-bold py-4 h-auto">
                          Adquirir Membresía Ahora
                      </Button>
                    </Link>
                </div>
            </div>
          </div>
        </div>

      </div>

      {/* FAQ Section */}
      <section className="mt-20 pt-10 border-t border-slate-200">
        <h3 className="text-2xl font-black text-slate-900 mb-8 uppercase">Preguntas Frecuentes</h3>
        <dl className="grid md:grid-cols-2 gap-6">
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                <dt className="font-bold text-lg text-slate-900 mb-3 flex items-start">
                    <span className="text-primary mr-2">Q:</span> 
                    ¿Cuándo llega BTS a Dubai?
                </dt>
                <dd className="text-slate-600 leading-relaxed pl-6 border-l-2 border-slate-200">
                    Se espera que aterricen en la madrugada del 3 de febrero de 2026 (hora local).
                </dd>
            </div>
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                <dt className="font-bold text-lg text-slate-900 mb-3 flex items-start">
                    <span className="text-primary mr-2">Q:</span>
                    ¿Van a vender entradas?
                </dt>
                <dd className="text-slate-600 leading-relaxed pl-6 border-l-2 border-slate-200">
                    Aún no hay anuncio oficial de venta, pero se recomienda estar atentos a las plataformas oficiales y a EntradasBTS.com.
                </dd>
            </div>
        </dl>
      </section>

      <div className="mt-16 text-center">
          <Link href="/blog">
            <Button variant="outline" className="gap-2 px-8 py-4 text-sm font-black uppercase tracking-widest hover:bg-slate-50">
                ← Volver a Noticias
            </Button>
          </Link>
      </div>
    </article>
  )
}
