import { Metadata } from 'next';
import { GlassCard } from "@/components/GlassCard";
import { Button } from "@/components/Button";
import Link from "next/link";
import { Calendar, MapPin, Ticket, Users, Globe, ArrowRight, Music, Clock } from "lucide-react";

export const metadata: Metadata = {
    title: 'BTS Gira Mundial 2026-2027 "Arirang": Fechas y Entradas',
    description: 'Todas las fechas confirmadas de la gira mundial de BTS 2026-2027: Lima, Santiago, Buenos Aires, Bogotá y más. Compra tus entradas oficiales aquí.',
    alternates: {
        canonical: 'https://entradasbts.com/gira-mundial',
    },
    openGraph: {
        title: 'BTS Gira Mundial 2026-2027 "Arirang": Fechas y Entradas',
        description: 'Todas las fechas confirmadas de la gira mundial de BTS 2026-2027: Lima, Santiago, Buenos Aires, Bogotá y más. Compra tus entradas oficiales aquí.',
        url: 'https://entradasbts.com/gira-mundial',
        siteName: 'EntradasBTS – RaveHub Latam',
        images: [{ url: 'https://entradasbts.com/images/bts-hero-bg.png', width: 1200, height: 630 }],
        locale: 'es_LA',
        type: 'article',
    },
};

const tourData = {
    name: 'BTS World Tour "Arirang" 2026-2027',
    announcementDate: '13 de enero de 2026',
    startDate: '9 de abril de 2026',
    endDate: 'Marzo de 2027',
    totalShows: 79,
    cities: 34,
    album: 'Nuevo disco de 14 canciones (lanzado el 20 de marzo de 2026)',
};

const latinAmericaDates = [
    {
        country: 'Colombia',
        city: 'Bogotá',
        flag: '🇨🇴',
        dates: '2 y 3 de octubre',
        venue: 'Estadio Nemesio Camacho El Campín',
        countryId: 'colombia',
        isoCode: 'CO',
    },
    {
        country: 'Perú',
        city: 'Lima',
        flag: '🇵🇪',
        dates: '9 y 10 de octubre',
        venue: 'Estadio San Marcos',
        countryId: 'peru',
        isoCode: 'PE',
    },
    {
        country: 'Chile',
        city: 'Santiago',
        flag: '🇨🇱',
        dates: '16 y 17 de octubre',
        venue: 'Estadio Nacional Julio Martínez Prádanos',
        countryId: 'chile',
        isoCode: 'CL',
    },
    {
        country: 'Argentina',
        city: 'Buenos Aires',
        flag: '🇦🇷',
        dates: '23 y 24 de octubre',
        venue: 'Estadio Único de La Plata',
        countryId: 'argentina',
        isoCode: 'AR',
    },
    {
        country: 'Brasil',
        city: 'São Paulo',
        flag: '🇧🇷',
        dates: '28, 30 y 31 de octubre',
        venue: 'Estádio do MorumBIS',
        countryId: 'brasil',
        isoCode: 'BR',
    },
];

const faqs = [
    {
        question: '¿Cuándo llega BTS a Perú, Chile, Argentina y Colombia?',
        answer: 'Colombia (Bogotá) el 2 y 3 de octubre, Perú (Lima) el 9 y 10 de octubre, Chile (Santiago) el 16 y 17 de octubre, y Argentina (Buenos Aires) el 23 y 24 de octubre de 2026.',
        isHtml: false,
    },
    {
        question: '¿Dónde comprar entradas oficiales?',
        answer: 'Para Chile: <a href="https://www.btschile.com" target="_blank" rel="noopener noreferrer" class="text-primary font-bold hover:underline">btschile.com</a> | Para Perú: <a href="https://entradasbts.com/peru" class="text-primary font-bold hover:underline">entradasbts.com/peru</a> | Para Argentina: <a href="https://entradasbts.com/argentina" class="text-primary font-bold hover:underline">entradasbts.com/argentina</a> | Para Colombia: <a href="https://entradasbts.com/colombia" class="text-primary font-bold hover:underline">entradasbts.com/colombia</a> | Para Brasil: <a href="https://entradasbts.com/brasil" class="text-primary font-bold hover:underline">entradasbts.com/brasil</a>',
        isHtml: true,
    },
    {
        question: '¿Habrá más fechas además de las 79 anunciadas?',
        answer: 'Sí. BIGHIT MUSIC ha anticipado fechas adicionales en Japón y Medio Oriente para 2027.',
        isHtml: false,
    },
    {
        question: '¿Cuál es el álbum que acompaña la gira?',
        answer: 'El nuevo disco del grupo, con 14 canciones inéditas, lanzado el 20 de marzo de 2026.',
        isHtml: false,
    },
];

export default function GiraMundialPage() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@graph': [
            ...latinAmericaDates.map((date) => {
                const dateMap: Record<string, { start: string; end: string }> = {
                    'Colombia': { start: '2026-10-02T20:00:00-05:00', end: '2026-10-02T23:00:00-05:00' },
                    'Perú': { start: '2026-10-09T20:00:00-05:00', end: '2026-10-09T23:00:00-05:00' },
                    'Chile': { start: '2026-10-16T20:00:00-03:00', end: '2026-10-16T23:00:00-03:00' },
                    'Argentina': { start: '2026-10-23T20:00:00-03:00', end: '2026-10-23T23:00:00-03:00' },
                    'Brasil': { start: '2026-10-28T20:00:00-03:00', end: '2026-10-28T23:00:00-03:00' },
                };

                const currencyMap: Record<string, string> = {
                    'Colombia': 'USD',
                    'Perú': 'PEN',
                    'Chile': 'USD',
                    'Argentina': 'USD',
                    'Brasil': 'USD',
                };

                return {
                    '@type': 'MusicEvent',
                    '@id': `https://entradasbts.com/gira-mundial#${date.countryId}`,
                    name: `BTS World Tour 2026-2027: Arirang - ${date.city}`,
                    description: `BTS regresa a ${date.city}, ${date.country}, como parte de su gira mundial Arirang 2026-2027. El grupo de K-pop más exitoso del mundo presenta su nuevo álbum en ${date.venue}.`,
                    startDate: dateMap[date.country].start,
                    endDate: dateMap[date.country].end,
                    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
                    eventStatus: 'https://schema.org/EventScheduled',
                    previousStartDate: date.country === 'Perú' ? '2026-10-07T20:00:00-05:00' : undefined,
                    image: [
                        'https://entradasbts.com/images/bts-hero-bg.png',
                        `https://entradasbts.com/images/og-${date.countryId}.jpg`,
                    ],
                    location: {
                        '@type': 'Place',
                        name: date.venue,
                        address: {
                            '@type': 'PostalAddress',
                            addressLocality: date.city,
                            addressCountry: date.isoCode,
                        },
                        geo: date.country === 'Perú' ? {
                            '@type': 'GeoCoordinates',
                            latitude: '-12.0679',
                            longitude: '-77.0820',
                        } : date.country === 'Chile' ? {
                            '@type': 'GeoCoordinates',
                            latitude: '-33.4649',
                            longitude: '-70.6097',
                        } : date.country === 'Argentina' ? {
                            '@type': 'GeoCoordinates',
                            latitude: '-34.9067',
                            longitude: '-57.9406',
                        } : date.country === 'Colombia' ? {
                            '@type': 'GeoCoordinates',
                            latitude: '4.6473',
                            longitude: '-74.0962',
                        } : date.country === 'Brasil' ? {
                            '@type': 'GeoCoordinates',
                            latitude: '-23.6001',
                            longitude: '-46.7208',
                        } : undefined,
                    },
                    performer: [
                        {
                            '@type': 'MusicGroup',
                            name: 'BTS',
                            alternateName: '방탄소년단',
                            genre: ['K-pop', 'Pop', 'Hip hop', 'R&B'],
                            member: [
                                { '@type': 'Person', name: 'RM', alternateName: 'Kim Namjoon' },
                                { '@type': 'Person', name: 'Jin', alternateName: 'Kim Seokjin' },
                                { '@type': 'Person', name: 'Suga', alternateName: 'Min Yoongi' },
                                { '@type': 'Person', name: 'J-Hope', alternateName: 'Jung Hoseok' },
                                { '@type': 'Person', name: 'Jimin', alternateName: 'Park Jimin' },
                                { '@type': 'Person', name: 'V', alternateName: 'Kim Taehyung' },
                                { '@type': 'Person', name: 'Jungkook', alternateName: 'Jeon Jungkook' },
                            ],
                            sameAs: [
                                'https://www.instagram.com/bts.bighitofficial/',
                                'https://twitter.com/bts_bighit',
                                'https://www.facebook.com/bangtan.official',
                                'https://www.youtube.com/c/BANGTANTV',
                                'https://www.tiktok.com/@bts_official_bighit',
                            ],
                        },
                    ],
                    organizer: {
                        '@type': 'Organization',
                        name: 'BIGHIT MUSIC',
                        url: 'https://ibighit.com',
                        sameAs: [
                            'https://twitter.com/BIGHIT_MUSIC',
                        ],
                    },
                    offers: {
                        '@type': 'Offer',
                        name: `Entradas BTS ${date.city}`,
                        url: `https://entradasbts.com/${date.countryId}`,
                        priceCurrency: currencyMap[date.country],
                        availability: 'https://schema.org/InStock',
                        validFrom: '2026-01-24T09:00:00-05:00',
                        price: date.country === 'Perú' ? '590' :
                               date.country === 'Chile' ? '299' :
                               date.country === 'Argentina' ? '399' :
                               date.country === 'Colombia' ? '249' : '472.81',
                        seller: {
                            '@type': 'Organization',
                            name: 'Entradas BTS',
                            url: 'https://entradasbts.com',
                        },
                    },
                    inLanguage: 'ko',
                    isAccessibleForFree: false,
                    typicalAgeRange: '13+',
                };
            }),
            {
                '@type': 'BreadcrumbList',
                itemListElement: [
                    {
                        '@type': 'ListItem',
                        position: 1,
                        name: 'Inicio',
                        item: 'https://entradasbts.com/',
                    },
                    {
                        '@type': 'ListItem',
                        position: 2,
                        name: 'Gira Mundial BTS',
                        item: 'https://entradasbts.com/gira-mundial',
                    },
                ],
            },
            {
                '@type': 'Organization',
                name: 'Entradas BTS',
                url: 'https://entradasbts.com',
                logo: {
                    '@type': 'ImageObject',
                    url: 'https://entradasbts.com/logo.png',
                    width: 250,
                    height: 60,
                },
                sameAs: [
                    'https://www.instagram.com/entradasbts',
                    'https://twitter.com/entradasbts',
                ],
            },
            {
                '@type': 'Article',
                headline: 'Gira Mundial de BTS 2026-2027 "Arirang": Fechas, Ciudades y Entradas',
                description: 'Guía completa de la gira mundial de BTS 2026-2027 con 79 conciertos en 34 ciudades. Fechas confirmadas para Lima, Santiago, Buenos Aires, Bogotá y más.',
                image: 'https://entradasbts.com/images/bts-hero-bg.png',
                datePublished: '2026-01-13T10:00:00-05:00',
                dateModified: '2026-08-07T14:30:00-05:00',
                author: {
                    '@type': 'Organization',
                    name: 'Entradas BTS',
                },
                publisher: {
                    '@type': 'Organization',
                    name: 'Entradas BTS',
                    logo: {
                        '@type': 'ImageObject',
                        url: 'https://entradasbts.com/logo.png',
                        width: 250,
                        height: 60,
                    },
                },
                mainEntityOfPage: {
                    '@type': 'WebPage',
                    '@id': 'https://entradasbts.com/gira-mundial',
                },
                inLanguage: 'es-419',
                about: {
                    '@type': 'MusicGroup',
                    name: 'BTS',
                },
            },
        ],
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <div className="min-h-screen pt-24 pb-20 container mx-auto px-4 text-slate-900 selection:bg-secondary selection:text-white">
                {/* Header */}
                <div className="flex flex-col items-center text-center mb-12 border-b-4 border-slate-200 pb-8">
                    <span className="bg-secondary text-white px-3 py-1.5 font-black uppercase text-xs tracking-widest mb-4 inline-block">
                        World Tour 2026-2027
                    </span>
                    <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-4">
                        Gira Mundial de BTS
                        <span className="block text-primary mt-2">"Arirang"</span>
                    </h1>
                    <p className="text-lg md:text-xl text-slate-600 max-w-3xl mb-2">
                        BTS confirma oficialmente su regreso a los escenarios con <strong>79 conciertos en 34 ciudades</strong> entre abril de 2026 y marzo de 2027.
                    </p>
                    <p className="text-sm text-slate-500 italic">
                        Última actualización: 7 de agosto de 2026
                    </p>
                </div>

                {/* Resumen Rápido */}
                <section className="mb-16">
                    <h2 className="text-4xl md:text-5xl font-black uppercase mb-8 tracking-tight">Resumen de la gira</h2>
                    <GlassCard className="overflow-hidden border border-slate-200">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <tbody className="divide-y divide-slate-200">
                                    <tr>
                                        <td className="px-6 py-4 text-sm font-bold uppercase text-slate-500">Nombre de la gira</td>
                                        <td className="px-6 py-4 text-base font-bold text-slate-900">{tourData.name}</td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 text-sm font-bold uppercase text-slate-500">Fecha de anuncio</td>
                                        <td className="px-6 py-4 text-base font-bold text-slate-900">{tourData.announcementDate}</td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 text-sm font-bold uppercase text-slate-500">Inicio</td>
                                        <td className="px-6 py-4 text-base font-bold text-slate-900">{tourData.startDate}, Goyang (Corea del Sur)</td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 text-sm font-bold uppercase text-slate-500">Cierre previsto</td>
                                        <td className="px-6 py-4 text-base font-bold text-slate-900">{tourData.endDate}, Manila (Filipinas)</td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 text-sm font-bold uppercase text-slate-500">Total de shows</td>
                                        <td className="px-6 py-4 text-base font-bold text-slate-900">{tourData.totalShows} (fechas adicionales en Japón y Medio Oriente)</td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 text-sm font-bold uppercase text-slate-500">Ciudades / regiones</td>
                                        <td className="px-6 py-4 text-base font-bold text-slate-900">{tourData.cities}</td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 text-sm font-bold uppercase text-slate-500">Álbum asociado</td>
                                        <td className="px-6 py-4 text-base font-bold text-slate-900">{tourData.album}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </GlassCard>
                </section>

                {/* Fechas ya realizadas */}
                <section className="mb-16">
                    <h2 className="text-4xl md:text-5xl font-black uppercase mb-8 tracking-tight">¿Qué fechas ya pasaron?</h2>
                    <GlassCard className="border border-slate-200">
                        <p className="text-slate-700 leading-relaxed mb-6">
                            Hasta el <strong>7 de agosto de 2026</strong>, estas etapas de la gira ya se realizaron:
                        </p>

                        <div className="space-y-6">
                            <div>
                                <h3 className="text-xl font-black uppercase mb-2 text-primary">Corea del Sur — Goyang</h3>
                                <p className="text-slate-700">
                                    <strong>9, 11 y 12 de abril de 2026</strong> — Arranque oficial del tour en Goyang Stadium.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-xl font-black uppercase mb-2 text-primary">Japón — Tokio</h3>
                                <p className="text-slate-700">
                                    Presentaciones en <strong>abril de 2026</strong>, previas al salto a Norteamérica.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-xl font-black uppercase mb-2 text-primary">Primer tramo de Norteamérica</h3>
                                <p className="text-slate-700">
                                    Inicio el <strong>25 de abril de 2026</strong> en el Raymond James Stadium de Tampa, Florida, seguido de fechas en Las Vegas, Chicago, Nueva York y Los Ángeles.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-xl font-black uppercase mb-2 text-primary">Corea del Sur — Busan</h3>
                                <p className="text-slate-700">
                                    <strong>12 y 13 de junio de 2026</strong> — Ciudad donde el grupo ofreció su último concierto como formación completa antes del hiato.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-xl font-black uppercase mb-2 text-primary">Europa</h3>
                                <p className="text-slate-700">
                                    Madrid (<strong>26-27 de junio</strong>), Bruselas (<strong>1-2 de julio</strong>), Londres (<strong>6-7 de julio</strong>), Múnich (<strong>11-12 de julio</strong>) y París (<strong>17-18 de julio</strong>), todas en 2026.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-xl font-black uppercase mb-2 text-primary">Reinicio del tramo norteamericano</h3>
                                <p className="text-slate-700">
                                    El <strong>1 de agosto de 2026</strong>, BTS reactivó esta etapa con un concierto en el MetLife Stadium de East Rutherford, Nueva Jersey.
                                </p>
                            </div>
                        </div>
                    </GlassCard>
                </section>

                {/* Próximas fechas confirmadas */}
                <section className="mb-16">
                    <h2 className="text-4xl md:text-5xl font-black uppercase mb-8 tracking-tight">Próximas fechas confirmadas</h2>

                    {/* Norteamérica */}
                    <div className="mb-12">
                        <h3 className="text-2xl md:text-3xl font-black uppercase mb-6 text-primary">Norteamérica (agosto-septiembre 2026)</h3>
                        <GlassCard className="border border-slate-200">
                            <ul className="space-y-4 text-slate-700">
                                <li><strong>Toronto, Canadá:</strong> 22 y 23 de agosto — Rogers Stadium</li>
                                <li><strong>Chicago, Illinois:</strong> 27 y 28 de agosto</li>
                                <li><strong>Los Ángeles, California:</strong> 1-2 y 5-6 de septiembre — SoFi Stadium (cuatro presentaciones)</li>
                            </ul>
                        </GlassCard>
                    </div>

                    {/* América Latina */}
                    <div id="america-latina">
                        <div className="flex items-center gap-4 mb-6">
                            <h3 className="text-2xl md:text-3xl font-black uppercase text-primary">América Latina (octubre 2026)</h3>
                            <span className="bg-secondary text-white px-2 py-1 text-xs font-black uppercase">La etapa más esperada</span>
                        </div>
                        <p className="text-slate-700 mb-8 text-lg">
                            BTS regresa a Latinoamérica tras siete años desde su última gira <em>Love Yourself: Speak Yourself</em> en 2019. Esta es la etapa más esperada por ARMY en la región.
                        </p>

                        <div className="grid md:grid-cols-2 gap-6 mb-8">
                            {latinAmericaDates.map((date) => (
                                <GlassCard key={date.countryId} variant="interactive" className="border border-slate-200">
                                    <div className="flex items-start gap-4 mb-4">
                                        <span className="text-4xl">{date.flag}</span>
                                        <div className="flex-1">
                                            <h4 id={date.city.toLowerCase()} className="text-2xl font-black uppercase text-slate-900 mb-1">
                                                {date.city}, {date.country}
                                            </h4>
                                            <p className="text-sm font-bold text-primary uppercase">{date.dates}</p>
                                        </div>
                                    </div>
                                    <div className="space-y-2 mb-4">
                                        <div className="flex items-center gap-2 text-slate-600 text-sm">
                                            <MapPin className="w-4 h-4" />
                                            <span>{date.venue}</span>
                                        </div>
                                    </div>
                                    <Link href={`/${date.countryId}`}>
                                        <Button variant="primary" className="w-full">
                                            Comprar entradas <ArrowRight className="w-4 h-4 ml-2" />
                                        </Button>
                                    </Link>
                                </GlassCard>
                            ))}
                        </div>

                        <GlassCard className="bg-slate-50 border border-slate-200">
                            <p className="text-sm text-slate-600">
                                <strong>Nota:</strong> México ya tuvo su fecha en mayo, con tres shows en el Estadio GNP Seguros de Ciudad de México los días 7, 9 y 10 de mayo de 2026.
                            </p>
                        </GlassCard>
                    </div>

                    {/* Asia-Pacífico y Oceanía */}
                    <div className="mt-12">
                        <h3 className="text-2xl md:text-3xl font-black uppercase mb-6 text-primary">Asia-Pacífico y Oceanía (fines de 2026 - marzo 2027)</h3>
                        <GlassCard className="border border-slate-200">
                            <p className="text-slate-700 leading-relaxed">
                                Tras Latinoamérica, la gira continuará con fechas en <strong>Tailandia (Bangkok), Singapur, Indonesia (Yakarta), Taiwán, Hong Kong, Filipinas (Manila) y Oceanía (Melbourne y Sídney)</strong>, cerrando el recorrido en <strong>marzo de 2027</strong>. BIGHIT MUSIC ha indicado que se anunciarán fechas adicionales en <strong>Japón y Medio Oriente</strong>, por lo que el número total de shows podría superar los 79 ya confirmados.
                            </p>
                        </GlassCard>
                    </div>
                </section>

                {/* Cómo comprar entradas */}
                <section className="mb-16">
                    <h2 className="text-4xl md:text-5xl font-black uppercase mb-8 tracking-tight">Cómo comprar entradas</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <GlassCard className="border border-primary">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                                    <Users className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-xl font-black uppercase">Preventa ARMY</h3>
                            </div>
                            <p className="text-slate-700 mb-4">
                                A través de la cuenta oficial en <strong>Weverse</strong>, con prioridad de compra antes que el público general.
                            </p>
                        </GlassCard>

                        <GlassCard className="border border-secondary">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center">
                                    <Ticket className="w-6 h-6 text-slate-900" />
                                </div>
                                <h3 className="text-xl font-black uppercase">Venta general</h3>
                            </div>
                            <p className="text-slate-700 mb-4">
                                Disponible en <strong>Ticketmaster</strong> en cada país/región.
                            </p>
                        </GlassCard>
                    </div>

                    <div className="mt-8 text-center">
                        <Link href="/eventos">
                            <Button variant="primary" size="lg">
                                Ver todos los eventos <ArrowRight className="w-5 h-5 ml-2" />
                            </Button>
                        </Link>
                    </div>
                </section>

                {/* Contexto histórico */}
                <section className="mb-16">
                    <h2 className="text-4xl md:text-5xl font-black uppercase mb-8 tracking-tight">Sobre BTS y esta gira</h2>
                    <GlassCard className="border border-slate-200">
                        <div className="prose prose-slate max-w-none">
                            <p className="text-slate-700 leading-relaxed mb-4">
                                <strong>BTS</strong> debutó en 2013 y se consolidó como uno de los actos más influyentes del K-pop a nivel global, liderando listas como el <em>Billboard Hot 100</em> con canciones como "Dynamite" y "Butter". Su gira anterior, <em>Love Yourself</em> (2018-2019), fue una de las más exitosas de la historia para un acto que interpreta principalmente en un idioma distinto al inglés, y sus shows en el SoFi Stadium en 2021 lograron una de las mayores recaudaciones de taquilla en años.
                            </p>
                            <p className="text-slate-700 leading-relaxed mb-4">
                                La pausa del grupo como formación completa se debió al cumplimiento del <strong>servicio militar obligatorio en Corea del Sur</strong> (obligatorio para todos los hombres entre 18 y 28 años), proceso que comenzó en 2022 y culminó en junio de 2025, cuando el último integrante, Suga, fue dado de baja.
                            </p>
                            <p className="text-slate-700 leading-relaxed">
                                La última gran escala del grupo en Sudamérica había sido en 2019, con dos conciertos en São Paulo como parte de <em>Love Yourself: Speak Yourself</em>, por lo que el regreso a la región en <strong>octubre de 2026</strong> representa la vuelta más esperada por ARMY latinoamericano en <strong>siete años</strong>.
                            </p>
                        </div>
                    </GlassCard>
                </section>

                {/* FAQ */}
                <section className="mb-16">
                    <h2 className="text-4xl md:text-5xl font-black uppercase mb-8 tracking-tight">Preguntas frecuentes</h2>
                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <GlassCard key={index} className="border border-slate-200">
                                <h3 className="text-lg font-black mb-3 text-slate-900">{faq.question}</h3>
                                {faq.isHtml ? (
                                    <p className="text-slate-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: faq.answer }} />
                                ) : (
                                    <p className="text-slate-700 leading-relaxed">{faq.answer}</p>
                                )}
                            </GlassCard>
                        ))}
                    </div>
                </section>

                {/* Fuentes */}
                <section>
                    <GlassCard className="bg-slate-50 border border-slate-200">
                        <div className="flex items-start gap-3">
                            <Clock className="w-5 h-5 text-slate-500 mt-1 flex-shrink-0" />
                            <div>
                                <p className="text-sm font-bold text-slate-900 mb-1">Última actualización</p>
                                <p className="text-sm text-slate-600">
                                    7 de agosto de 2026 — Esta página se actualiza constantemente con las últimas confirmaciones oficiales de BIGHIT MUSIC y HYBE.
                                </p>
                            </div>
                        </div>
                    </GlassCard>
                </section>
            </div>
        </>
    );
}
