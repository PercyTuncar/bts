import { Metadata } from 'next';
import ProximosConciertoClient from './ProximosConciertoClient';

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

// Todas las fechas de la gira (incluyendo pasadas para referencia)
export const allConcerts = [
    // Fechas pasadas
    { city: 'Goyang', country: 'Corea del Sur', date: '2026-04-09', venue: 'Goyang Stadium', flag: '🇰🇷', past: true },
    { city: 'Goyang', country: 'Corea del Sur', date: '2026-04-11', venue: 'Goyang Stadium', flag: '🇰🇷', past: true },
    { city: 'Goyang', country: 'Corea del Sur', date: '2026-04-12', venue: 'Goyang Stadium', flag: '🇰🇷', past: true },
    { city: 'Tampa', country: 'Estados Unidos', date: '2026-04-25', venue: 'Raymond James Stadium', flag: '🇺🇸', past: true },
    { city: 'Ciudad de México', country: 'México', date: '2026-05-07', venue: 'Estadio GNP Seguros', flag: '🇲🇽', past: true, countryId: 'mexico' },
    { city: 'Ciudad de México', country: 'México', date: '2026-05-09', venue: 'Estadio GNP Seguros', flag: '🇲🇽', past: true, countryId: 'mexico' },
    { city: 'Ciudad de México', country: 'México', date: '2026-05-10', venue: 'Estadio GNP Seguros', flag: '🇲🇽', past: true, countryId: 'mexico' },
    { city: 'Busan', country: 'Corea del Sur', date: '2026-06-12', venue: 'Busan Asiad Stadium', flag: '🇰🇷', past: true },
    { city: 'Busan', country: 'Corea del Sur', date: '2026-06-13', venue: 'Busan Asiad Stadium', flag: '🇰🇷', past: true },
    { city: 'Madrid', country: 'España', date: '2026-06-26', venue: 'Riyadh Air Metropolitano', flag: '🇪🇸', past: true, countryId: 'madrid' },
    { city: 'Madrid', country: 'España', date: '2026-06-27', venue: 'Riyadh Air Metropolitano', flag: '🇪🇸', past: true, countryId: 'madrid' },
    { city: 'Bruselas', country: 'Bélgica', date: '2026-07-01', venue: 'King Baudouin Stadium', flag: '🇧🇪', past: true },
    { city: 'Bruselas', country: 'Bélgica', date: '2026-07-02', venue: 'King Baudouin Stadium', flag: '🇧🇪', past: true },
    { city: 'Londres', country: 'Reino Unido', date: '2026-07-06', venue: 'Wembley Stadium', flag: '🇬🇧', past: true },
    { city: 'Londres', country: 'Reino Unido', date: '2026-07-07', venue: 'Wembley Stadium', flag: '🇬🇧', past: true },
    { city: 'Múnich', country: 'Alemania', date: '2026-07-11', venue: 'Allianz Arena', flag: '🇩🇪', past: true },
    { city: 'Múnich', country: 'Alemania', date: '2026-07-12', venue: 'Allianz Arena', flag: '🇩🇪', past: true },
    { city: 'París', country: 'Francia', date: '2026-07-17', venue: 'Stade de France', flag: '🇫🇷', past: true },
    { city: 'París', country: 'Francia', date: '2026-07-18', venue: 'Stade de France', flag: '🇫🇷', past: true },
    { city: 'East Rutherford', country: 'Estados Unidos', date: '2026-08-01', venue: 'MetLife Stadium', flag: '🇺🇸', past: true },

    // Próximas fechas
    { city: 'Toronto', country: 'Canadá', date: '2026-08-22', venue: 'Rogers Stadium', flag: '🇨🇦', region: 'Norteamérica' },
    { city: 'Toronto', country: 'Canadá', date: '2026-08-23', venue: 'Rogers Stadium', flag: '🇨🇦', region: 'Norteamérica' },
    { city: 'Chicago', country: 'Estados Unidos', date: '2026-08-27', venue: 'Soldier Field', flag: '🇺🇸', region: 'Norteamérica' },
    { city: 'Chicago', country: 'Estados Unidos', date: '2026-08-28', venue: 'Soldier Field', flag: '🇺🇸', region: 'Norteamérica' },
    { city: 'Los Ángeles', country: 'Estados Unidos', date: '2026-09-01', venue: 'SoFi Stadium', flag: '🇺🇸', region: 'Norteamérica' },
    { city: 'Los Ángeles', country: 'Estados Unidos', date: '2026-09-02', venue: 'SoFi Stadium', flag: '🇺🇸', region: 'Norteamérica' },
    { city: 'Los Ángeles', country: 'Estados Unidos', date: '2026-09-05', venue: 'SoFi Stadium', flag: '🇺🇸', region: 'Norteamérica' },
    { city: 'Los Ángeles', country: 'Estados Unidos', date: '2026-09-06', venue: 'SoFi Stadium', flag: '🇺🇸', region: 'Norteamérica' },

    // América Latina
    { city: 'Bogotá', country: 'Colombia', date: '2026-10-02', venue: 'Estadio Nemesio Camacho El Campín', flag: '🇨🇴', region: 'América Latina', countryId: 'colombia' },
    { city: 'Bogotá', country: 'Colombia', date: '2026-10-03', venue: 'Estadio Nemesio Camacho El Campín', flag: '🇨🇴', region: 'América Latina', countryId: 'colombia' },
    { city: 'Lima', country: 'Perú', date: '2026-10-09', venue: 'Estadio San Marcos', flag: '🇵🇪', region: 'América Latina', countryId: 'peru' },
    { city: 'Lima', country: 'Perú', date: '2026-10-10', venue: 'Estadio San Marcos', flag: '🇵🇪', region: 'América Latina', countryId: 'peru' },
    { city: 'Santiago', country: 'Chile', date: '2026-10-16', venue: 'Estadio Nacional Julio Martínez Prádanos', flag: '🇨🇱', region: 'América Latina', countryId: 'chile' },
    { city: 'Santiago', country: 'Chile', date: '2026-10-17', venue: 'Estadio Nacional Julio Martínez Prádanos', flag: '🇨🇱', region: 'América Latina', countryId: 'chile' },
    { city: 'Buenos Aires', country: 'Argentina', date: '2026-10-23', venue: 'Estadio Único de La Plata', flag: '🇦🇷', region: 'América Latina', countryId: 'argentina' },
    { city: 'Buenos Aires', country: 'Argentina', date: '2026-10-24', venue: 'Estadio Único de La Plata', flag: '🇦🇷', region: 'América Latina', countryId: 'argentina' },
    { city: 'São Paulo', country: 'Brasil', date: '2026-10-28', venue: 'Estádio do MorumBIS', flag: '🇧🇷', region: 'América Latina', countryId: 'brasil' },
    { city: 'São Paulo', country: 'Brasil', date: '2026-10-30', venue: 'Estádio do MorumBIS', flag: '🇧🇷', region: 'América Latina', countryId: 'brasil' },
    { city: 'São Paulo', country: 'Brasil', date: '2026-10-31', venue: 'Estádio do MorumBIS', flag: '🇧🇷', region: 'América Latina', countryId: 'brasil' },

    // Asia-Pacífico y Oceanía
    { city: 'Bangkok', country: 'Tailandia', date: '2026-11-15', venue: 'Rajamangala Stadium', flag: '🇹🇭', region: 'Asia-Pacífico' },
    { city: 'Singapur', country: 'Singapur', date: '2026-11-22', venue: 'National Stadium', flag: '🇸🇬', region: 'Asia-Pacífico' },
    { city: 'Yakarta', country: 'Indonesia', date: '2026-12-01', venue: 'Gelora Bung Karno Stadium', flag: '🇮🇩', region: 'Asia-Pacífico' },
    { city: 'Manila', country: 'Filipinas', date: '2027-03-15', venue: 'Philippine Arena', flag: '🇵🇭', region: 'Asia-Pacífico' },
];

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
