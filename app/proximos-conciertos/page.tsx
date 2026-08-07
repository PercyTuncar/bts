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

    const jsonLd = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'WebPage',
                '@id': 'https://entradasbts.com/proximos-conciertos',
                name: 'Próximo Concierto de BTS: Calendario en Vivo y Cuenta Regresiva',
                url: 'https://entradasbts.com/proximos-conciertos',
                about: { '@id': 'https://entradasbts.com/gira-mundial' },
                isPartOf: {
                    '@type': 'WebSite',
                    name: 'Entradas BTS',
                    url: 'https://entradasbts.com',
                },
                dateModified: '2026-08-07',
            },
            {
                '@type': 'SoftwareApplication',
                name: 'Contador de próximo concierto BTS',
                applicationCategory: 'UtilitiesApplication',
                operatingSystem: 'Web',
                url: 'https://entradasbts.com/proximos-conciertos',
                offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
            },
            ...futureConcerts.slice(0, 10).map((concert) => ({
                '@type': 'MusicEvent',
                name: `BTS World Tour 2026: Arirang - ${concert.city}`,
                startDate: `${concert.date}T20:00:00`,
                eventStatus: 'https://schema.org/EventScheduled',
                location: {
                    '@type': 'Place',
                    name: concert.venue,
                    address: {
                        '@type': 'PostalAddress',
                        addressLocality: concert.city,
                        addressCountry: concert.country,
                    },
                },
                performer: {
                    '@type': 'MusicGroup',
                    name: 'BTS',
                },
                offers: {
                    '@type': 'Offer',
                    url: concert.countryId
                        ? `https://entradasbts.com/${concert.countryId}`
                        : `https://entradasbts.com/proximos-conciertos#${concert.city.toLowerCase()}`,
                    availability: 'https://schema.org/InStock',
                },
            })),
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
