import { Metadata } from 'next';
import ProximosConciertoClient from './ProximosConciertoClient';
import { allConcerts } from '@/lib/data/concerts';

export const metadata: Metadata = {
    title: 'Próximo Concierto de BTS: ¿Hay Show Hoy? + Cuenta Regresiva',
    description: '¿Hay concierto de BTS hoy? Consulta el próximo concierto, cuenta regresiva en vivo y calendario actualizado para Lima, Santiago, Bogotá y Buenos Aires.',
    alternates: {
        canonical: 'https://entradasbts.com/proximos-conciertos',
    },
    openGraph: {
        title: 'Próximo Concierto de BTS: ¿Hay Show Hoy? + Cuenta Regresiva',
        description: '¿Hay concierto de BTS hoy? Consulta el próximo concierto, cuenta regresiva en vivo y calendario actualizado para Lima, Santiago, Bogotá y Buenos Aires.',
        url: 'https://entradasbts.com/proximos-conciertos',
        siteName: 'EntradasBTS – RaveHub Latam',
        images: [{ url: 'https://entradasbts.com/images/bts-hero-bg.png', width: 1200, height: 630 }],
        locale: 'es_LA',
        type: 'website',
    },
};

export default function ProximosConciertoPage() {
    // Calcular el estado actual en el servidor para SEO
    const today = new Date().toISOString().split('T')[0];
    const todayConcert = allConcerts.find(c => c.date === today && !c.past);
    const futureConcerts = allConcerts.filter(c => !c.past && c.date >= today);
    const nextConcert = futureConcerts[0];

    // Datos de precios por país
    const priceData: Record<string, { price: string; currency: string; validFrom: string; description: string }> = {
        'toronto': {
            price: '300',
            currency: 'CAD',
            validFrom: '2026-01-20T10:00:00-05:00',
            description: 'BTS returns to Rogers Stadium in Toronto for two nights, giving fans another opportunity to experience one of the world\'s most celebrated music groups live.'
        },
        'chicago': {
            price: '285',
            currency: 'USD',
            validFrom: '2026-01-22T10:00:00-06:00',
            description: 'BTS World Tour Arirang comes to Soldier Field in Chicago for two unforgettable nights of K-pop history.'
        },
        'los angeles': {
            price: '197',
            currency: 'USD',
            validFrom: '2026-01-25T10:00:00-08:00',
            description: 'BTS World Tour Arirang at SoFi Stadium in Los Angeles. Four spectacular shows at one of the world\'s most advanced venues.'
        },
        'colombia': {
            price: '249',
            currency: 'USD',
            validFrom: '2026-01-28T09:00:00-05:00',
            description: 'Bogotá se viste de morado. No te pierdas el regreso de BTS a Colombia en el Estadio Nemesio Camacho El Campín.'
        },
        'peru': {
            price: '590',
            currency: 'PEN',
            validFrom: '2026-04-07T10:00:00-05:00',
            description: 'Lima, prepárate para el océano púrpura. BTS regresa al Estadio San Marcos para dos noches históricas.'
        },
        'chile': {
            price: '299',
            currency: 'USD',
            validFrom: '2026-01-24T09:00:00-03:00',
            description: 'Santiago, el momento ha llegado. Vive la magia de BTS en el Estadio Nacional.'
        },
        'argentina': {
            price: '399',
            currency: 'USD',
            validFrom: '2026-02-01T09:00:00-03:00',
            description: 'Argentina recibe a BTS en el Estadio Único de La Plata con preventa y zonas oficiales para el Army.'
        },
        'brasil': {
            price: '472.81',
            currency: 'USD',
            validFrom: '2026-02-15T09:00:00-03:00',
            description: 'O show será no Estádio do MorumBIS, em São Paulo. BTS WORLD TOUR "ARIRANG" 2026.'
        },
    };

    // Coordenadas geográficas
    const geoMap: Record<string, { lat: string; lon: string }> = {
        'toronto': { lat: '43.6426', lon: '-79.3871' },
        'chicago': { lat: '41.8623', lon: '-87.6167' },
        'los angeles': { lat: '33.9533', lon: '-118.3389' },
        'bogotá': { lat: '4.6473', lon: '-74.0962' },
        'lima': { lat: '-12.0679', lon: '-77.0820' },
        'santiago': { lat: '-33.4649', lon: '-70.6097' },
        'buenos aires': { lat: '-34.9067', lon: '-57.9406' },
        'são paulo': { lat: '-23.6001', lon: '-46.7208' },
        'bangkok': { lat: '13.7279', lon: '100.5241' },
        'singapur': { lat: '1.3039', lon: '103.8632' },
    };

    const jsonLd = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'WebPage',
                '@id': 'https://entradasbts.com/proximos-conciertos',
                name: 'Próximo Concierto de BTS: Calendario en Vivo y Cuenta Regresiva',
                description: '¿Hay concierto de BTS hoy? Consulta el próximo concierto, cuenta regresiva en vivo y calendario actualizado para Lima, Santiago, Bogotá y Buenos Aires.',
                url: 'https://entradasbts.com/proximos-conciertos',
                about: { '@id': 'https://entradasbts.com/gira-mundial' },
                isPartOf: {
                    '@type': 'WebSite',
                    name: 'Entradas BTS',
                    url: 'https://entradasbts.com',
                },
                inLanguage: 'es-419',
                datePublished: '2026-01-13T10:00:00-05:00',
                dateModified: '2026-08-07T14:30:00-05:00',
                breadcrumb: {
                    '@id': 'https://entradasbts.com/proximos-conciertos#breadcrumb',
                },
            },
            {
                '@type': 'BreadcrumbList',
                '@id': 'https://entradasbts.com/proximos-conciertos#breadcrumb',
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
                        name: 'Próximos Conciertos BTS',
                        item: 'https://entradasbts.com/proximos-conciertos',
                    },
                ],
            },
            {
                '@type': 'SoftwareApplication',
                name: 'Contador de próximo concierto BTS en vivo',
                description: 'Herramienta interactiva con cuenta regresiva en tiempo real y detección automática de conciertos de BTS hoy. Actualización cada segundo.',
                applicationCategory: 'UtilitiesApplication',
                operatingSystem: 'Web',
                url: 'https://entradasbts.com/proximos-conciertos',
                browserRequirements: 'Requires JavaScript. Optimized for modern browsers.',
                offers: {
                    '@type': 'Offer',
                    price: '0',
                    priceCurrency: 'USD',
                },
                featureList: [
                    'Cuenta regresiva en tiempo real',
                    'Detección automática de concierto hoy',
                    'Calendario filtrable por país',
                    'Conversión horaria a KST (Corea)',
                    'Actualización automática cada segundo',
                ],
                author: {
                    '@type': 'Organization',
                    name: 'Entradas BTS',
                },
            },
            ...futureConcerts.slice(0, 15).map((concert) => {
                const concertDateTime = `${concert.date}T20:00:00`;
                const concertEndTime = `${concert.date}T23:00:00`;
                const geo = geoMap[concert.city.toLowerCase()];

                // Buscar pricing por countryId o por nombre de ciudad
                const pricingKey = concert.countryId || concert.city.toLowerCase();
                const pricing = priceData[pricingKey] || null;

                return {
                    '@type': 'MusicEvent',
                    '@id': `https://entradasbts.com/proximos-conciertos#${concert.city.toLowerCase().replace(/\s+/g, '-')}`,
                    name: `BTS World Tour 2026-2027: Arirang - ${concert.city}`,
                    description: pricing?.description || `BTS en vivo en ${concert.city}, ${concert.country} como parte de su gira mundial Arirang 2026-2027.`,
                    startDate: concertDateTime,
                    endDate: concertEndTime,
                    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
                    eventStatus: 'https://schema.org/EventScheduled',
                    image: [
                        'https://entradasbts.com/images/bts-hero-bg.png',
                        concert.countryId ? `https://entradasbts.com/images/og-${concert.countryId}.jpg` : 'https://entradasbts.com/images/bts-hero-bg.png',
                    ],
                    location: {
                        '@type': 'Place',
                        name: concert.venue,
                        address: {
                            '@type': 'PostalAddress',
                            addressLocality: concert.city,
                            addressCountry: concert.country,
                        },
                        geo: geo ? {
                            '@type': 'GeoCoordinates',
                            latitude: geo.lat,
                            longitude: geo.lon,
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
                    offers: pricing ? {
                        '@type': 'Offer',
                        name: `Entradas BTS ${concert.city}`,
                        url: `https://entradasbts.com/${concert.countryId}`,
                        price: pricing.price,
                        priceCurrency: pricing.currency,
                        availability: 'https://schema.org/InStock',
                        validFrom: pricing.validFrom,
                        seller: {
                            '@type': 'Organization',
                            name: 'Entradas BTS',
                            url: 'https://entradasbts.com',
                        },
                    } : {
                        '@type': 'Offer',
                        url: concert.countryId ? `https://entradasbts.com/${concert.countryId}` : `https://entradasbts.com/proximos-conciertos#${concert.city.toLowerCase()}`,
                        availability: 'https://schema.org/InStock',
                    },
                    inLanguage: 'ko',
                    isAccessibleForFree: false,
                    typicalAgeRange: '13+',
                };
            }),
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
                contactPoint: {
                    '@type': 'ContactPoint',
                    contactType: 'customer support',
                    url: 'https://entradasbts.com/legal/contacto',
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

            {/* Fallback SSR para SEO */}
            <noscript>
                <div className="container mx-auto px-4 pt-24">
                    <h1>Próximo Concierto de BTS</h1>
                    {todayConcert ? (
                        <p><strong>¡Sí! Hay concierto de BTS hoy:</strong> {todayConcert.city}, {todayConcert.country} en {todayConcert.venue}</p>
                    ) : nextConcert ? (
                        <p><strong>No hay concierto hoy.</strong> El próximo concierto es el {new Date(nextConcert.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })} en {nextConcert.city}, {nextConcert.country}.</p>
                    ) : (
                        <p>No hay próximos conciertos programados en este momento.</p>
                    )}
                </div>
            </noscript>

            <ProximosConciertoClient
                concerts={allConcerts}
                todayConcert={todayConcert}
                nextConcert={nextConcert}
            />
        </>
    );
}
