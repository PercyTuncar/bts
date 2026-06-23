import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/Button'

// --- CONSTANTES ---
const BASE_URL = 'https://entradasbts.com'
const PUBLISH_DATE = '2026-02-02T11:00:00-05:00'
const MODIFIED_DATE = '2026-02-02T11:30:00-05:00'

// 1. METADATA AVANZADA (Optimizada para "bts en netflix")
export const metadata: Metadata = {
  title: 'BTS en Netflix: Horario del Comeback en Vivo y Documental | Arirang 2026',
  description: '¡Confirmado! BTS regresa con "El Comeback en Vivo" desde Seúl y el documental "El Regreso". Descubre los horarios de transmisión en Netflix para México, Perú y Latam.',
  keywords: [
    'BTS en Netflix',
    'BTS Comeback 2026',
    'BTS Arirang',
    'BTS El Regreso Documental',
    'Horarios BTS Netflix',
    'Concierto BTS Plaza Gwanghwamun',
    'BTS streaming',
    'Ver BTS en vivo'
  ],
  authors: [{ name: 'Percy Tunccar', url: `${BASE_URL}/nosotros` }],
  creator: 'EntradasBTS Team',
  publisher: 'EntradasBTS',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: `${BASE_URL}/blog/bts-en-netflix/`,
  },
  openGraph: {
    type: 'article',
    locale: 'es_LA',
    url: `${BASE_URL}/blog/bts-en-netflix`,
    title: 'BTS en Netflix: Todo sobre el Comeback en Vivo y Documental',
    description: 'La guía definitiva para ver el histórico regreso de BTS en Netflix. Horarios, fechas y detalles del documental "El Regreso".',
    siteName: 'EntradasBTS - Noticias K-Pop',
    images: [
      {
        url: `${BASE_URL}/images/bts-en-netflix-portada.avif`,
        width: 1200,
        height: 630,
        alt: 'BTS x Netflix Logo y Miembros',
      },
    ],
    publishedTime: PUBLISH_DATE,
    modifiedTime: MODIFIED_DATE,
    section: 'Entretenimiento',
    tags: ['K-Pop', 'BTS', 'Netflix', 'Eventos', 'Streaming'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BTS en Netflix: ¡Horarios Confirmados!',
    description: 'Todo lo que necesitas saber sobre el concierto en vivo y el documental de BTS en Netflix.',
    images: [`${BASE_URL}/images/bts-en-netflix-portada.avif`],
    site: '@entradasbts',
    creator: '@percytunccar',
  },
}

export default function BtsNetflixPage() {
  
  // 2. JSON-LD ESTRUCTURADO (SCHEMA.ORG GRAPHS)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      // ENTIDAD 1: LA NOTICIA (NewsArticle)
      {
        '@type': 'NewsArticle',
        '@id': `${BASE_URL}/blog/bts-en-netflix#article`,
        'headline': 'BTS en Netflix: El Comeback en Vivo y Documental El Regreso',
        'alternativeHeadline': 'Horarios del concierto de BTS en Netflix y estreno del documental',
        'image': {
          '@type': 'ImageObject',
          'url': `${BASE_URL}/images/bts-en-netflix-portada.avif`,
          'width': 1200,
          'height': 675
        },
        'author': {
          '@type': 'Person',
          'name': 'Percy Tunccar',
          'url': `${BASE_URL}/nosotros`
        },
        'publisher': {
          '@type': 'Organization',
          'name': 'EntradasBTS',
          'logo': {
            '@type': 'ImageObject',
            'url': `${BASE_URL}/logo.png`,
            'width': 190,
            'height': 60
          }
        },
        'datePublished': PUBLISH_DATE,
        'dateModified': MODIFIED_DATE,
        'description': 'BTS se presentará en la histórica Plaza Gwanghwamun en Seúl EN VIVO a nivel mundial, exclusivamente en Netflix.',
        'mainEntityOfPage': {
          '@type': 'WebPage',
          '@id': `${BASE_URL}/blog/bts-en-netflix`
        },
        'articleSection': 'Noticias K-Pop',
        'keywords': 'BTS, Netflix, Comeback 2026, Arirang, Documental, Streaming',
        'about': [
          { '@id': `${BASE_URL}/blog/bts-en-netflix#event-live` },
          { '@id': `${BASE_URL}/blog/bts-en-netflix#documentary` }
        ]
      },

      // ENTIDAD 2: EL EVENTO EN VIVO (BroadcastEvent)
      {
        '@type': 'BroadcastEvent',
        '@id': `${BASE_URL}/blog/bts-en-netflix#event-live`,
        'name': 'BTS: El Comeback en Vivo | Arirang',
        'description': 'Transmisión mundial en vivo del concierto de BTS desde la Plaza Gwanghwamun.',
        'startDate': '2026-03-21T05:00:00-06:00',
        'eventStatus': 'https://schema.org/EventScheduled',
        'eventAttendanceMode': 'https://schema.org/OnlineEventAttendanceMode',
        'location': {
          '@type': 'VirtualLocation',
          'url': 'https://www.netflix.com'
        },
        'organizer': {
          '@type': 'Organization',
          'name': 'Netflix',
          'url': 'https://www.netflix.com'
        },
        'performer': {
          '@type': 'MusicGroup',
          'name': 'BTS',
          'sameAs': 'https://ibighit.com/bts'
        },
        'image': `${BASE_URL}/images/netflix-bts-logo.jpg`
      },

      // ENTIDAD 3: EL DOCUMENTAL (Movie)
      {
        '@type': 'Movie',
        '@id': `${BASE_URL}/blog/bts-en-netflix#documentary`,
        'name': 'BTS: El Regreso',
        'description': 'Documental que muestra el proceso de creación del nuevo álbum ARIRANG.',
        'datePublished': '2026-03-27',
        'productionCompany': {
          '@type': 'Organization',
          'name': 'HYBE'
        },
        'provider': {
          '@type': 'Organization',
          'name': 'Netflix',
          'sameAs': 'https://www.netflix.com'
        },
        'image': `${BASE_URL}/images/bts-fechas-netflix.jpg`
      },

      // ENTIDAD 4: BREADCRUMBS
      {
        '@type': 'BreadcrumbList',
        'itemListElement': [
          {
            '@type': 'ListItem',
            'position': 1,
            'name': 'Inicio',
            'item': BASE_URL
          },
          {
            '@type': 'ListItem',
            'position': 2,
            'name': 'Blog',
            'item': `${BASE_URL}/blog`
          },
          {
            '@type': 'ListItem',
            'position': 3,
            'name': 'BTS en Netflix',
            'item': `${BASE_URL}/blog/bts-en-netflix`
          }
        ]
      },

      // ENTIDAD 5: FAQ
      {
        '@type': 'FAQPage',
        'mainEntity': [
          {
            '@type': 'Question',
            'name': '¿A qué hora es el concierto de BTS en Netflix?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'El concierto en vivo será el 21 de marzo a las 5:00 AM (México), 6:00 AM (Perú/Colombia) y 8:00 AM (Argentina/Chile).'
            }
          },
          {
            '@type': 'Question',
            'name': '¿Cuándo se estrena el documental de BTS en Netflix?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'El documental "BTS: El Regreso" se estrenará el 27 de marzo de 2026 exclusivamente en Netflix.'
            }
          },
          {
            '@type': 'Question',
            'name': '¿Necesito pagar extra para ver BTS en Netflix?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'No, solo necesitas una suscripción activa de Netflix. El concierto en vivo y el documental están incluidos sin costo adicional.'
            }
          }
        ]
      }
    ]
  }

  return (
    <article className="min-h-screen pt-24 pb-20 container mx-auto px-4 max-w-4xl text-slate-900 selection:bg-purple-200 selection:text-purple-900">
      {/* Inyección del JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header Section */}
      <header className="mb-10 text-center md:text-left">
        <div className="text-sm font-bold text-red-600 uppercase tracking-wide mb-2">
          Noticias • Netflix 2026
        </div>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-none mb-6 text-slate-900 uppercase">
          BTS en Netflix: <span className="text-primary block md:inline">Comeback en Vivo</span>
        </h1>
        <div className="flex items-center justify-center md:justify-start text-slate-500 text-sm space-x-4 mb-4 md:mb-0 font-medium">
          <time dateTime={PUBLISH_DATE}>2 de Febrero, 2026</time>
          <span>•</span>
          <span>Por Percy Tunccar</span>
        </div>
      </header>

      {/* Main Image */}
      <div className="relative w-full aspect-video bg-slate-100 rounded-lg overflow-hidden mb-12 shadow-inner border border-slate-200">
        <Image 
          src="/images/bts-en-netflix-portada.avif"
          alt="BTS x Netflix: Anuncio oficial del Comeback en Vivo y Documental El Regreso"
          fill
          className="object-cover"
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 896px"
        />
      </div>

      {/* Article Content */}
      <div className="max-w-none text-lg text-slate-800 leading-relaxed font-sans">
        
        {/* Intro */}
        <p className="mb-6 first-letter:text-5xl first-letter:font-black first-letter:text-primary first-letter:mr-2 float-none">
          <strong className="text-slate-900">¡Atención ARMY!</strong> — La espera ha terminado y la noticia que rompe el internet está aquí. Prepárense porque el evento más grande del año llega a nuestras pantallas: <strong className="text-purple-700">BTS en Netflix</strong> es una realidad y traen consigo dos estrenos mundiales que marcarán historia.
        </p>
        
        <p className="mb-8">
          Por primera vez en la historia, Netflix transmitirá un evento de K-Pop en tiempo real a nivel global. Los siete integrantes tomarán uno de los lugares más emblemáticos de Corea del Sur para presentar su nueva era. <strong className="text-slate-900">Esta colaboración sin precedentes</strong> marca el regreso más esperado del grupo tras su servicio militar.
        </p>

        {/* Netflix x BTS Logo Image */}
        <figure className="my-10 w-full relative h-[350px] md:h-[450px] bg-black rounded-xl overflow-hidden shadow-lg">
          <Image 
            src="/images/netflix-bts-logo.jpg"
            alt="Logo oficial de la colaboración BTS x Netflix para el Comeback 2026"
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 896px"
          />
        </figure>

        {/* Section 1: El Concierto */}
        <h2 className="text-3xl font-black text-slate-900 mt-12 mb-6 uppercase tracking-tight">
          1. BTS: El Comeback en Vivo | Arirang
        </h2>
        
        <p className="mb-6">
          El grupo hará historia al ser los primeros artistas de K-Pop en transmitir un comeback stage globalmente a través de la plataforma de streaming. El evento, titulado <em className="text-purple-700">Arirang</em>, promete ser una producción masiva que conectará a ARMY de todo el mundo sin importar la distancia.
        </p>

        {/* Horarios Box */}
        <div className="bg-red-50 border-l-4 border-red-600 p-6 md:p-8 rounded-r-xl shadow-sm my-8">
          <h3 className="text-xl font-black text-red-700 mb-4 uppercase tracking-wide flex items-center gap-2">
            <span>📅</span> Horarios Confirmados del Concierto
          </h3>
          <ul className="space-y-3 text-slate-800">
            <li className="flex items-start gap-2">
              <span className="text-red-600 font-bold">•</span>
              <span><strong>Evento:</strong> Concierto en Plaza Gwanghwamun, Seúl.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-600 font-bold">•</span>
              <span><strong>Fecha:</strong> 21 de marzo de 2026.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-600 font-bold">•</span>
              <span><strong>Hora México (CDMX):</strong> 5:00 a.m.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-600 font-bold">•</span>
              <span><strong>Hora Perú / Colombia:</strong> 6:00 a.m.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-600 font-bold">•</span>
              <span><strong>Hora Argentina / Chile:</strong> 8:00 a.m.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-600 font-bold">•</span>
              <span><strong>Dónde ver:</strong> <span className="text-red-600 font-bold">Exclusivamente en Netflix</span>.</span>
            </li>
          </ul>
        </div>

        <blockquote className="border-l-4 border-primary pl-6 py-4 italic bg-purple-50 text-slate-900 rounded-r-lg my-10 shadow-sm">
          <strong className="text-primary block mb-1 uppercase text-xs tracking-wider">Dato Importante</strong>
          La transmisión será simultánea a nivel mundial. Asegúrate de configurar tu alarma y tener tu suscripción de Netflix activa antes del evento.
        </blockquote>

        {/* Section 2: El Documental */}
        <h2 className="text-3xl font-black text-slate-900 mt-16 mb-6 uppercase tracking-tight">
          2. BTS: El Regreso (Documental)
        </h2>

        <p className="mb-6">
          La experiencia de <strong className="text-purple-700">BTS en Netflix</strong> no termina con el concierto. Una semana después, la plataforma estrenará una pieza fundamental para entender esta nueva etapa del grupo.
        </p>

        <p className="mb-6">
          El documental titulado <strong className="text-slate-900">&quot;BTS: EL REGRESO&quot;</strong> nos llevará detrás de escena para mostrarnos el proceso íntimo y creativo de la creación de su nuevo álbum <em>ARIRANG</em>. Podremos ver los ensayos, las reuniones creativas y los momentos detrás de cámaras del histórico concierto en Gwanghwamun.
        </p>

        {/* Fechas Image */}
        <figure className="my-10 w-full relative h-[500px] md:h-[600px] bg-black rounded-xl overflow-hidden shadow-lg">
          <Image 
            src="/images/bts-fechas-netflix.jpg"
            alt="Calendario oficial: Fechas del Comeback en Vivo y Documental BTS en Netflix"
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 896px"
          />
          <figcaption className="absolute bottom-0 left-0 w-full bg-black/70 text-white text-center text-xs py-2">
            Cartel oficial del anuncio. Fuente: Netflix.
          </figcaption>
        </figure>

        {/* Documental Details */}
        <ul className="list-none mt-6 mb-8 space-y-3 bg-slate-50 p-8 rounded-xl border border-slate-100">
          <li className="flex items-center gap-3 text-lg">
            <span className="text-2xl">📅</span>
            <span><strong>Fecha de estreno:</strong> 27 de marzo de 2026</span>
          </li>
          <li className="flex items-center gap-3 text-lg">
            <span className="text-2xl">📺</span>
            <span><strong>Dónde ver:</strong> Solo en Netflix</span>
          </li>
          <li className="flex items-center gap-3 text-lg">
            <span className="text-2xl">🎬</span>
            <span><strong>Producción:</strong> HYBE Entertainment</span>
          </li>
        </ul>

        <h3 className="text-2xl font-bold text-slate-900 mt-10 mb-4">¿Cómo prepararse para el estreno?</h3>
        <p className="mb-6">
          Asegúrate de tener tu suscripción activa y la aplicación de Netflix actualizada. La demanda de ancho de banda para el 21 de marzo será histórica. Mantente atento a este blog para más actualizaciones sobre setlists y horarios por país.
        </p>

        {/* CTA Section */}
        <div className="bg-slate-900 text-white p-8 md:p-10 rounded-3xl shadow-2xl my-12 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary rounded-full filter blur-[80px] opacity-20 group-hover:opacity-30 transition-opacity"></div>
          
          <div className="relative z-10">
            <h3 className="text-2xl md:text-3xl font-black mb-4 text-white uppercase italic">¿También quieres verlos en vivo?</h3>
            <p className="mb-8 text-slate-300 text-lg leading-relaxed">
              Además del evento en Netflix, BTS está planeando una gira mundial. Si quieres asegurar tu lugar en los conciertos de <strong className="text-white">Perú, México, Chile, Colombia y Argentina</strong>, la Membresía te da acceso prioritario a la preventa exclusiva.
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
                  <Button className="w-full bg-primary hover:bg-red-600 text-white border-none shadow-lg shadow-primary/30 font-bold py-4 h-auto">
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
        <dl className="grid md:grid-cols-1 gap-6">
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
            <dt className="font-bold text-lg text-slate-900 mb-3 flex items-start">
              <span className="text-primary mr-2">Q:</span> 
              ¿A qué hora es el concierto de BTS en Netflix?
            </dt>
            <dd className="text-slate-600 leading-relaxed pl-6 border-l-2 border-slate-200">
              El concierto en vivo será el 21 de marzo a las 5:00 AM (México), 6:00 AM (Perú/Colombia) y 8:00 AM (Argentina/Chile).
            </dd>
          </div>
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
            <dt className="font-bold text-lg text-slate-900 mb-3 flex items-start">
              <span className="text-primary mr-2">Q:</span>
              ¿Cuándo se estrena el documental de BTS?
            </dt>
            <dd className="text-slate-600 leading-relaxed pl-6 border-l-2 border-slate-200">
              El documental &quot;BTS: El Regreso&quot; se estrenará el 27 de marzo de 2026 exclusivamente en Netflix.
            </dd>
          </div>
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
            <dt className="font-bold text-lg text-slate-900 mb-3 flex items-start">
              <span className="text-primary mr-2">Q:</span>
              ¿Necesito pagar extra para ver BTS en Netflix?
            </dt>
            <dd className="text-slate-600 leading-relaxed pl-6 border-l-2 border-slate-200">
              No, solo necesitas una suscripción activa de Netflix. El concierto en vivo y el documental están incluidos sin costo adicional.
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
