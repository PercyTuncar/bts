import { GlassCard } from "@/components/GlassCard";
import { Button } from "@/components/Button";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { LightBoxImage } from "@/components/LightBoxImage";

type Props = {
    params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;

    // Simple normalization for metadata check
    const normalized = decodeURIComponent(slug).toLowerCase().replace(/\/$/, "");

    if (normalized === 'boletos-bts-mexico') {
        return {
            title: "Boletos BTS México 2026: Precios Oficiales, Mapa y Preventa Estadio GNP",
            description: "¡Precios confirmados! Conoce cuánto cuestan los boletos para BTS en México 2026 (Estadio GNP). Mapa de asientos, paquetes VIP y guía de preventa Weverse aquí.",
            alternates: {
                canonical: "/blog/boletos-bts-mexico"
            }
        };
    }

    const title = normalized === 'guide'
        ? "Guía Definitiva: Cómo Sobrevivir a la Fila Virtual de BTS"
        : "Noticia BTS";

    return {
        title: `${title} | Blog BTS 2026`,
    };
}

export default async function BlogPost({ params }: Props) {
    const { slug } = await params;

    // Robust Normalization
    let normalizedSlug = decodeURIComponent(slug).toLowerCase();
    // Remove trailing slash if present (though Next.js usually redirects, this is safer)
    if (normalizedSlug.endsWith('/')) {
        normalizedSlug = normalizedSlug.slice(0, -1);
    }

    // Debug log to server terminal
    console.log(`[BlogPost] Rendering. Raw: '${slug}', Normalized: '${normalizedSlug}'`);

    if (normalizedSlug === 'boletos-bts-mexico') {
        const jsonLd = {
            "@context": "https://schema.org",
            "@graph": [
                {
                    "@type": "NewsArticle",
                    "headline": "Boletos BTS México 2026: Lista Oficial de Precios y Mapa Estadio GNP",
                    "image": [
                        "https://entradasbts.com/images/mapa-bts-mexico-2026.png"
                    ],
                    "datePublished": "2026-01-23T08:00:00-06:00",
                    "dateModified": "2026-01-23T09:00:00-06:00",
                    "author": {
                        "@type": "Organization",
                        "name": "EntradasBTS",
                        "url": "https://entradasbts.com"
                    },
                    "publisher": {
                        "@type": "Organization",
                        "name": "EntradasBTS",
                        "logo": {
                            "@type": "ImageObject",
                            "url": "https://entradasbts.com/logo.png"
                        }
                    },
                    "description": "Lista oficial de precios para el concierto de BTS en México 2026. Entérate de los costos de boletos VIP, Platino y Naranja en el Estadio GNP Seguros."
                },
                {
                    "@type": "Event",
                    "name": "BTS World Tour México 2026",
                    "startDate": "2026-05-07T20:00:00-06:00",
                    "endDate": "2026-05-10T23:00:00-06:00",
                    "eventStatus": "https://schema.org/EventScheduled",
                    "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
                    "location": {
                        "@type": "Place",
                        "name": "Estadio GNP Seguros",
                        "address": {
                            "@type": "PostalAddress",
                            "streetAddress": "Viad. Río de la Piedad S/N, Granjas México",
                            "addressLocality": "Iztacalco",
                            "postalCode": "08400",
                            "addressRegion": "CDMX",
                            "addressCountry": "MX"
                        }
                    },
                    "image": [
                        "https://entradasbts.com/images/mapa-bts-mexico-2026.png"
                    ],
                    "description": "Concierto de BTS en Ciudad de México como parte de su World Tour 2026.",
                    "offers": {
                        "@type": "AggregateOffer",
                        "url": "https://entradasbts.com/blog/boletos-bts-mexico",
                        "priceCurrency": "MXN",
                        "lowPrice": "1767",
                        "highPrice": "17782",
                        "offerCount": "9",
                        "availability": "https://schema.org/InStock",
                        "validFrom": "2026-01-23T09:00:00-06:00"
                    },
                    "performer": {
                        "@type": "MusicGroup",
                        "name": "BTS"
                    },
                    "organizer": {
                        "@type": "Organization",
                        "name": "Ticketmaster México",
                        "url": "https://www.ticketmaster.com.mx"
                    }
                },
                {
                    "@type": "FAQPage",
                    "mainEntity": [
                        {
                            "@type": "Question",
                            "name": "¿Cuánto cuestan los boletos para BTS en México 2026?",
                            "acceptedAnswer": {
                                "@type": "Answer",
                                "text": "Los precios van desde los $1,767 MXN en Naranja C hasta los $17,782 MXN para el Paquete VIP Soundcheck. La zona General no existe, todos los asientos son numerados."
                            }
                        },
                        {
                            "@type": "Question",
                            "name": "¿Cuándo es la preventa para BTS en México?",
                            "acceptedAnswer": {
                                "@type": "Answer",
                                "text": "La Preventa Weverse es el Viernes 23 de Enero a las 9:00 AM. La Venta General comienza el Sábado 24 de Enero a las 9:00 AM."
                            }
                        },
                        {
                            "@type": "Question",
                            "name": "¿Qué tarjetas acepta Ticketmaster para BTS?",
                            "acceptedAnswer": {
                                "@type": "Answer",
                                "text": "Se aceptan tarjetas de crédito y débito VISA, Mastercard y AMEX. Se recomienda usar NU, Hey Banco, Citibanamex o Santander y evitar Banco Azteca o Spin por problemas de procesamiento."
                            }
                        },
                        {
                            "@type": "Question",
                            "name": "¿Cómo comprar la Membresía BTS Army si mi tarjeta no pasa?",
                            "acceptedAnswer": {
                                "@type": "Answer",
                                "text": "Si tienes problemas con Weverse, en EntradasBTS.com ofrecemos un servicio de gestión para comprar tu membresía de forma segura y asegurar tu código de preventa."
                            }
                        }
                    ]
                }
            ]
        };

        return (
            <div className="pt-28 md:pt-32 pb-20 min-h-screen bg-slate-50/50">
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />

                {/* Article Wrapper */}
                <article className="max-w-4xl mx-auto px-4 sm:px-6">

                    {/* Header / Hero Section */}
                    <div className="mb-12 text-center max-w-3xl mx-auto">
                        <Link href="/blog" className="inline-flex items-center text-primary font-bold tracking-wide text-sm hover:underline mb-6">
                            &larr; VOLVER AL BLOG
                        </Link>

                        <div className="flex items-center justify-center gap-2 mb-4">
                            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest border border-primary/20">
                                Oficial
                            </span>
                            <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">
                                23 Enero 2026
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 uppercase leading-tight mb-6">
                            Boletos BTS <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">México 2026</span>
                        </h1>
                        <p className="text-xl text-slate-600 font-serif italic">
                            Precios oficiales, mapa del Estadio GNP Seguros y todo lo que necesitas saber para la preventa.
                        </p>
                    </div>

                    {/* Main Content Card */}
                    <GlassCard className="p-0 overflow-hidden shadow-2xl border-0 ring-1 ring-slate-900/5 bg-white/80 backdrop-blur-xl">

                        {/* Featured Image (Map) - Now Interactive with Lightbox */}
                        <LightBoxImage
                            src="/images/mapa-bts-mexico-2026.png"
                            alt="Mapa oficial Estadio GNP Seguros BTS - Distribución de Asientos"
                        />

                        <div className="px-6 py-8 md:px-12 md:py-12">

                            {/* Intro Text */}
                            <div className="prose prose-lg prose-slate max-w-none first-letter:text-5xl first-letter:font-black first-letter:text-primary first-letter:float-left first-letter:mr-3">
                                <p className="lead text-xl text-slate-700 font-medium">
                                    ¡ARMY, la espera ha terminado! El <strong>BTS World Tour</strong> aterriza en la Ciudad de México este <strong>mayo de 2026</strong>. A continuación, desglosamos la lista oficial de precios con cargos y te mostramos el mapa del renovado Estadio GNP Seguros.
                                </p>
                            </div>

                            {/* Quick Info Grid */}
                            <div className="grid md:grid-cols-2 gap-4 my-10 not-prose">
                                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 flex items-start gap-4">
                                    <div className="bg-primary/10 p-3 rounded-xl text-primary">
                                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                    </div>
                                    <div>
                                        <h3 className="font-black text-slate-900 uppercase text-sm mb-1">Fechas Confirmadas</h3>
                                        <div className="space-y-1 text-slate-600 font-medium text-sm">
                                            <p>Jueves 07 de Mayo</p>
                                            <p>Sábado 09 de Mayo</p>
                                            <p>Domingo 10 de Mayo</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 flex items-start gap-4">
                                    <div className="bg-secondary/10 p-3 rounded-xl text-secondary">
                                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                    </div>
                                    <div>
                                        <h3 className="font-black text-slate-900 uppercase text-sm mb-1">Recinto</h3>
                                        <p className="text-slate-600 font-medium text-sm">Estadio GNP Seguros<br />(Antes Foro Sol)</p>
                                        <p className="text-xs text-slate-400 mt-1">Ciudad de México</p>
                                    </div>
                                </div>
                            </div>

                            {/* Tables Section */}
                            <h2 className="text-2xl font-black uppercase text-slate-900 mb-6 flex items-center gap-3">
                                <span className="w-8 h-1 bg-primary rounded-full"></span>
                                Lista de Precios Oficial
                            </h2>

                            <div className="overflow-hidden rounded-xl border border-slate-200 shadow-sm mb-4">
                                <table className="min-w-full bg-white text-sm md:text-base">
                                    <thead className="bg-slate-900 text-white">
                                        <tr>
                                            <th className="py-4 px-6 text-left font-black uppercase tracking-wider">Zona</th>
                                            <th className="py-4 px-6 text-right font-black uppercase tracking-wider">Precio Final</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        <tr className="bg-purple-50/50 hover:bg-purple-50 transition-colors">
                                            <td className="py-4 px-6 font-bold text-primary flex items-center gap-2">
                                                <span>✨</span> PAQUETE VIP SOUNDCHECK
                                            </td>
                                            <td className="py-4 px-6 text-right font-bold text-slate-900">$17,782</td>
                                        </tr>
                                        <tr className="hover:bg-slate-50 transition-colors"><td className="py-4 px-6 font-medium">Platino A</td><td className="py-4 px-6 text-right font-medium text-slate-600">$13,330</td></tr>
                                        <tr className="hover:bg-slate-50 transition-colors"><td className="py-4 px-6 font-medium">Platino B</td><td className="py-4 px-6 text-right font-medium text-slate-600">$8,953</td></tr>
                                        <tr className="hover:bg-slate-50 transition-colors"><td className="py-4 px-6 font-bold text-green-600">Verde A</td><td className="py-4 px-6 text-right font-medium text-slate-600">$8,482</td></tr>
                                        <tr className="hover:bg-slate-50 transition-colors"><td className="py-4 px-6 font-bold text-orange-500">Naranja A</td><td className="py-4 px-6 text-right font-medium text-slate-600">$8,010</td></tr>
                                        <tr className="hover:bg-slate-50 transition-colors"><td className="py-4 px-6 font-bold text-orange-500">Naranja B</td><td className="py-4 px-6 text-right font-medium text-slate-600">$4,948</td></tr>
                                        <tr className="hover:bg-slate-50 transition-colors"><td className="py-4 px-6 font-medium">General B / Gradas</td><td className="py-4 px-6 text-right font-medium text-slate-600">$4,476</td></tr>
                                        <tr className="hover:bg-slate-50 transition-colors"><td className="py-4 px-6 font-medium text-slate-400">Discapacidad</td><td className="py-4 px-6 text-right font-medium text-slate-400">$2,840</td></tr>
                                        <tr className="hover:bg-slate-50 transition-colors"><td className="py-4 px-6 font-bold text-orange-500">Naranja C</td><td className="py-4 px-6 text-right font-medium text-slate-600">$1,767</td></tr>
                                    </tbody>
                                </table>
                            </div>
                            <p className="text-xs text-slate-400 text-center mb-12 italic">* Incluye cargos por servicio Ticketmaster.</p>

                            {/* WhatsApp CTA Styled */}
                            <div className="my-12 relative overflow-hidden rounded-2xl bg-[#00E676] text-white shadow-xl transform transition-transform hover:scale-[1.01]">
                                <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl"></div>
                                <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-black opacity-10 rounded-full blur-3xl"></div>

                                <div className="relative p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                                    <div className="text-center md:text-left">
                                        <h3 className="text-2xl font-black uppercase italic mb-2">Grupo de WhatsApp México <span className="opacity-80">🇲🇽</span></h3>
                                        <p className="font-medium opacity-90 text-sm md:text-base max-w-md">
                                            Recibe alertas de filas virtuales, links directos y ayuda en tiempo real. ¡Únete a los Army!
                                        </p>
                                    </div>
                                    <a
                                        href="https://chat.whatsapp.com/GImmxPFYqmpEYSRzaNW3Vt"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-white text-green-600 px-8 py-4 rounded-full font-black uppercase shadow-lg hover:bg-slate-50 transition-colors flex items-center gap-2"
                                    >
                                        Unirme Ahora
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                                    </a>
                                </div>
                            </div>

                            {/* Additional Content Styled */}
                            <div className="space-y-12">
                                <section>
                                    <h2 className="text-2xl font-black uppercase text-slate-900 mb-6 flex items-center gap-3">
                                        <span className="w-8 h-1 bg-secondary rounded-full"></span>
                                        Soundcheck VIP Package
                                    </h2>
                                    <GlassCard className="bg-gradient-to-br from-purple-50 to-white border-purple-100">
                                        <ul className="grid gap-4">
                                            {[
                                                "Entrada reservada en Zona Premium",
                                                "Acceso exclusivo al Soundcheck (Prueba de sonido)",
                                                "Regalo VIP conmemorativo edición limitada",
                                                "Laminado y lanyard oficial del tour",
                                                "Venta de Merch sin filas (Pre-show)",
                                                "Staff VIP dedicado en el acceso"
                                            ].map((item, i) => (
                                                <li key={i} className="flex items-start gap-4 p-3 bg-white rounded-lg shadow-sm border border-purple-50">
                                                    <div className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-xs font-bold">✓</div>
                                                    <span className="text-slate-700 font-medium">{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </GlassCard>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-black uppercase text-slate-900 mb-6 flex items-center gap-3">
                                        <span className="w-8 h-1 bg-slate-900 rounded-full"></span>
                                        Cronograma de Venta
                                    </h2>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="bg-slate-900 text-white p-6 rounded-2xl relative overflow-hidden group">
                                            <div className="absolute top-0 right-0 p-4 opacity-20">
                                                <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" /></svg>
                                            </div>
                                            <div className="relative z-10">
                                                <span className="inline-block bg-primary text-white text-xs font-black uppercase tracking-wider px-2 py-1 rounded mb-4">La Más Importante</span>
                                                <h3 className="text-2xl font-black mb-1">Preventa ARMY</h3>
                                                <p className="text-purple-300 font-bold text-lg mb-4">Viernes 23 Enero - 9:00 AM</p>
                                                <p className="text-slate-400 text-sm leading-relaxed">Solo para membresía oficial. Requiere registro previo en Weverse. Tu código es tu Membership Number.</p>
                                            </div>
                                        </div>

                                        <div className="bg-white border border-slate-200 p-6 rounded-2xl">
                                            <span className="inline-block bg-slate-200 text-slate-600 text-xs font-black uppercase tracking-wider px-2 py-1 rounded mb-4">Ticketmaster</span>
                                            <h3 className="text-2xl font-black text-slate-900 mb-1">Venta General</h3>
                                            <p className="text-slate-500 font-bold text-lg mb-4">Sábado 24 Enero - 9:00 AM</p>
                                            <p className="text-slate-500 text-sm leading-relaxed">Abierta a todo público. Todas las tarjetas aceptadas (Crédito y Débito). Se recomienda llegar 15 min antes a la sala de espera.</p>
                                        </div>
                                    </div>
                                </section>
                            </div>

                        </div>
                    </GlassCard>

                    {/* Final CTA / Footer of Article */}
                    <div className="mt-12 mb-20 p-8 rounded-3xl bg-secondary/10 border border-secondary/20 text-center">
                        <h3 className="text-xl font-bold text-slate-900 mb-4">¿Te falta la Membresía ARMY?</h3>
                        <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
                            Es el **único requisito obligatorio** para acceder a la preventa del día 23. Sin ella, tendrás que esperar a la venta general donde quedan menos boletos.
                        </p>
                        <Link href="/comprar-membresia-bts/">
                            <Button className="w-full md:w-auto px-10 py-4 text-lg bg-slate-900 hover:bg-slate-800 text-white shadow-xl">
                                Solicitar Membresía Ahora
                            </Button>
                        </Link>
                    </div>

                </article>
            </div>
        );
    }

    if (normalizedSlug === 'guide') {
        const jsonLd = {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": "Guía Definitiva: Cómo Sobrevivir a la Fila Virtual de BTS y Conseguir Entrada",
            "image": ["https://entradasbts.com/images/queue-guide.jpg"],
            "datePublished": "2026-01-15T08:00:00+08:00",
            "dateModified": "2026-01-15T09:20:00+08:00",
            "author": [{
                "@type": "Person",
                "name": "Admin Purple",
                "url": "https://entradasbts.com/team"
            }]
        };

        return (
            <article className="max-w-3xl mx-auto space-y-8 py-10 pt-32">
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />

                <header className="space-y-4 text-center">
                    <div className="inline-block px-3 py-1 rounded-full bg-secondary/20 text-secondary text-sm font-bold">
                        Guías
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-slate-900">
                        Guía Definitiva: Cómo Sobrevivir a la Fila Virtual de BTS y Conseguir Entrada
                    </h1>
                    <p className="text-slate-400">Publicado el 15 de Enero, 2026</p>
                </header>

                <GlassCard className="prose prose-lg max-w-none text-slate-700">
                    <p className="lead text-xl text-slate-900 font-medium">
                        Sabemos que el corazón se te sale del pecho. Ha pasado años, y por fin están aquí.
                        Pero hay un obstáculo final: la temida Fila Virtual.
                    </p>

                    <h2 className="text-primary font-black uppercase">Requisitos Previos</h2>
                    <ul>
                        <li><strong>Cuenta Verificada:</strong> No esperes al último día. Verifica tu email y teléfono en la ticketera.</li>
                        <li><strong>Tarjeta Habilitada:</strong> Llama a tu banco hoy mismo y autoriza compras online por montos altos.</li>
                    </ul>

                    <h2 className="text-primary font-black uppercase">El Mito del F5</h2>
                    <p>
                        <strong>NO REFRESQUES LA PÁGINA</strong> una vez que estés en la fila. Si lo haces, perderás tu ID de sesión y volverás al final.
                        La barra de progreso es lenta, pero avanza.
                    </p>

                    <h2 className="text-primary font-black uppercase">Mapa del Estadio Explicado</h2>
                    <p>
                        Las zonas VIP Soundcheck son las primeras en agotarse. Si tu presupuesto es ajustado, apunta a "Oriente" o "Occidente";
                        tienen mejor vista que "Norte" y menos caos que "Campo".
                    </p>

                    <h3 className="text-secondary font-black">¿Vale la pena el VIP Soundcheck?</h3>
                    <p>
                        Absolutamente. Verlos ensayar en ropa casual es una experiencia íntima que no se compara con el show principal.
                    </p>

                    <div className="not-prose mt-12 p-6 bg-slate-50 rounded-xl border border-slate-200 text-center">
                        <h3 className="text-2xl font-bold mb-4 text-slate-900">¡No te quedes fuera!</h3>
                        <p className="mb-6 text-slate-600">Revisa los precios y zonas oficiales para tu país ahora mismo.</p>
                        <div className="flex justify-center gap-4">
                            <Link href="/peru"><Button>Ver Perú</Button></Link>
                            <Link href="/chile"><Button variant="secondary">Ver Chile</Button></Link>
                        </div>
                    </div>
                </GlassCard>
            </article>
        );
    }

    // Default Fallback - Debug Friendly
    return (
        <div className="pt-32 pb-20 min-h-screen ambient-gradient">
            <GlassCard className="text-center py-20 max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold text-slate-900">Artículo no encontrado: {slug}</h1>
                <p className="mt-4 text-slate-500">
                    URL Normalizado: <code>{normalizedSlug}</code> <br />
                    URL Original: <code>{slug}</code>
                </p>
                <div className="mt-8 flex justify-center flex-col gap-2">
                    <p>Intenta con:</p>
                    <Link href="/blog/boletos-bts-mexico" className="text-secondary underline font-bold">/blog/boletos-bts-mexico</Link>
                </div>
            </GlassCard>
        </div>
    );
}

export async function generateStaticParams() {
    return [
        { slug: 'guide' },
        { slug: 'setlist-rumors' },
        { slug: 'boletos-bts-mexico' },
    ];
}
