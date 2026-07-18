import { Metadata } from "next";
import { countries } from "@/lib/data/countries";
import { VENUE_META, MONTHS_ES, MONTHS_PT } from "@/lib/data/venues";
import { COUNTRY_SEO_CONTENT } from "@/lib/data/seo-content";
import { notFound } from "next/navigation";
import CountryClient from "./CountryClient";

type Props = {
    params: Promise<{ country: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { country: countryId } = await params;
    const country = countries.find(c => c.id === countryId);

    if (!country) return { title: 'País no encontrado' };

    const minPrice = Math.min(...country.prices.map(p => p.price));
    const formattedPrice = country.currencySymbol + minPrice;

    // Default metadata (Spanish)
    let title: string; // Declare title here
    let description = `¡Compra tus entradas para BTS en ${country.name} 2026! Precios desde ${formattedPrice} en ${country.venue}. Compra segura, zonas VIP y mapa del escenario aquí.`;
    let ogTitle = `Entradas BTS ${country.name} 2026 | ${country.venue}`;
    let ogDescription = `¡El Army llega a ${country.name}! Compra segura y verificada para el concierto en ${country.venue}.`;
    let ogSiteName = `Entradas BTS Tour 2026`;
    let ogLocale = 'es_LA';
    let ogUrl = `https://entradasbts.com/${country.id}`;

    // Localization overrides
    if (country.id === 'peru') {
        title = `Entradas BTS Perú 2026 – ARIRANG Tour | Estadio San Marcos`;
        description = `Compra tus entradas para BTS en Perú 2026 con precios desde ${formattedPrice} en el Estadio San Marcos. Selecciona zonas oficiales y completa tu pedido seguro por WhatsApp.`;
        ogTitle = `Entradas BTS Perú 2026 | Estadio San Marcos`;
        ogDescription = `El Army de Perú ya tiene precios por zona. Completa tu pedido de forma segura para BTS en Lima.`;
        ogSiteName = `Entradas BTS Perú`;
    } else if (country.id === 'brasil') {
        title = `Ingressos BTS Brasil 2026 – ARIRANG Tour | Estádio MorumBIS`;
        description = `Compre seus ingressos para o show do BTS no Brasil em outubro de 2026! ARIRANG World Tour no Estádio do MorumBIS em São Paulo. Preços a partir de ${formattedPrice}, zonas e mapa de assentos aqui.`;
        ogTitle = `Ingressos BTS Brasil 2026 | Estádio do MorumBIS`;
        ogDescription = `O Army chega ao Brasil! Garanta seus ingressos para o show do BTS no Estádio do MorumBIS. Compra segura e verificada.`;
        ogSiteName = `Ingressos BTS Brasil`;
        ogLocale = 'pt_BR';
    } else if (country.id === 'mexico') {
        title = `Boletos BTS México 2026 – ARIRANG Tour | Estadio GNP Seguros`;
        description = `¡Compra tus boletos para BTS en México 2026! Precios desde ${formattedPrice} en el Estadio GNP Seguros. Compra segura, zonas VIP y mapa del escenario aquí.`;
        ogTitle = `Boletos BTS México 2026 | Estadio GNP Seguros`;
        ogDescription = `¡BTS en CDMX! No te quedes fuera. Compra segura y verificada para el concierto en el Estadio GNP Seguros.`;
        ogSiteName = `Boletos BTS México`;
    } else if (country.id === 'madrid') {
        title = `Entradas BTS Madrid 2026 – ARIRANG Tour | Metropolitano`;
        description = `¡Consigue tus ENTRADAS para BTS en MADRID 2026! Concierto oficial en el ${country.venue}. Precios desde ${formattedPrice}. Compra segura y verificada.`;
        ogTitle = `ENTRADAS BTS Madrid 2026 | Estadio Metropolitano`;
        ogDescription = `BTS llega a España. Compra tus ENTRADAS para BTS en MADRID 2026 de forma segura para el Metropolitano.`;
        ogSiteName = `Entradas BTS Madrid`;
        ogLocale = 'es_ES';
    } else if (country.id === 'colombia') {
        title = `Boletas BTS Colombia 2026 – ARIRANG Tour | Estadio El Campín`;
        description = `¡Asegura tus boletas para BTS en Colombia 2026! Precios desde ${formattedPrice} en el Estadio El Campín. Compra segura, zonas VIP y mapa del escenario.`;
        ogTitle = `Boletas BTS Colombia 2026 | Estadio El Campín`;
        ogDescription = `¡El Army de Colombia se reporta! Compra segura y verificada para el concierto de BTS en Bogotá.`;
        ogSiteName = `Boletas BTS Colombia`;
    } else {
        // Default title structure for other countries (Chile, Argentina)
        title = `Entradas BTS ${country.name} 2026 – ARIRANG Tour | ${country.venue}`;
    }


    return {
        title: {
            absolute: title
        },
        description,
        openGraph: {
            title: ogTitle,
            description: ogDescription,
            url: ogUrl,
            siteName: ogSiteName,
            images: [
                {
                    url: `https://entradasbts.com${country.openGraphImage}`,
                    width: 1200,
                    height: 630,
                    alt: `${country.id === 'brasil' ? 'Ingressos' : (country.id === 'mexico' ? 'Boletos' : 'Entradas')} Concierto BTS ${country.name} 2026`
                },
            ],
            locale: ogLocale,
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: ogTitle,
            description: ogDescription,
            images: [`https://entradasbts.com${country.openGraphImage}`],
        },
        alternates: {
            canonical: `https://entradasbts.com/${country.id}/`,
            languages: {
                'es': 'https://entradasbts.com/',
                'es-PE': 'https://entradasbts.com/peru',
                'es-CL': 'https://entradasbts.com/chile',
                'es-MX': 'https://entradasbts.com/mexico',
                'es-CO': 'https://entradasbts.com/colombia',
                'es-AR': 'https://entradasbts.com/argentina',
                'es-ES': 'https://entradasbts.com/madrid',
                'pt-BR': 'https://entradasbts.com/brasil',
                'x-default': 'https://entradasbts.com/',
            },
        }
    };
}

export default async function CountryPage({ params }: Props) {
    const { country: countryId } = await params;
    const country = countries.find(c => c.id === countryId);

    if (!country) {
        return notFound();
    }

    // SERVER-SIDE STRUCTURED DATA GENERATION
    const isBrazil = country.id === 'brasil';
    const countryDisplayName = country.id === 'madrid' ? 'Madrid' : country.name;
    const venue = VENUE_META[country.id];
    const months = isBrazil ? MONTHS_PT : MONTHS_ES;

    // Reusable performer node referencing the site-wide MusicGroup entity.
    const performerRef = {
        "@type": "MusicGroup",
        "@id": "https://entradasbts.com/#bts-musicgroup",
        "name": "BTS",
    };

    // Build one Offer per zone for a given show date, respecting sold-out state.
    const buildOffers = (dateStr: string) =>
        country.prices.map(p => ({
            "@type": "Offer",
            "name": p.zone,
            "url": `https://entradasbts.com/${country.id}/`,
            "price": p.price,
            "priceCurrency": country.currency,
            "availability": p.soldOut
                ? "https://schema.org/SoldOut"
                : "https://schema.org/InStock",
            "validFrom": `${venue.saleStart}T10:00:00${venue.tzOffset}`,
            "priceValidUntil": dateStr,
        }));

    // Build one Event object per concert date, each with a unique @id.
    const buildEvent = (dateStr: string) => {
        const [y, m, d] = dateStr.split('-').map(Number);
        const humanDate = `${d} de ${months[m - 1]} ${y}`;
        return {
            "@context": "https://schema.org",
            "@type": "Event",
            "@id": `https://entradasbts.com/${country.id}/#event-${dateStr}`,
            "name": isBrazil
                ? `BTS WORLD TOUR 'ARIRANG' em ${country.city} - ${humanDate}`
                : `BTS WORLD TOUR 'ARIRANG' en ${countryDisplayName} - ${humanDate}`,
            "description": isBrazil
                ? `Show do BTS World Tour ARIRANG 2026 no ${venue.venueName}, em ${country.city}, no dia ${humanDate}. Ingressos por setor disponíveis.`
                : `Concierto del BTS World Tour ARIRANG 2026 en el ${venue.venueName}, ${country.city}, el ${humanDate}. Entradas por zona disponibles.`,
            "image": [
                `https://entradasbts.com${country.openGraphImage}`,
                "https://entradasbts.com/images/concert-bg.png",
            ],
            "startDate": `${dateStr}T${venue.doorsHour}:00${venue.tzOffset}`,
            "endDate": `${dateStr}T${venue.endHour}:00${venue.tzOffset}`,
            "eventStatus": "https://schema.org/EventScheduled",
            "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
            "location": {
                "@type": "Place",
                "name": venue.venueName,
                "sameAs": venue.sameAs,
                "address": {
                    "@type": "PostalAddress",
                    "streetAddress": venue.streetAddress,
                    "addressLocality": venue.addressLocality,
                    "addressRegion": venue.addressRegion,
                    "postalCode": venue.postalCode,
                    "addressCountry": country.isoCode,
                },
                "geo": {
                    "@type": "GeoCoordinates",
                    "latitude": venue.latitude,
                    "longitude": venue.longitude,
                },
            },
            "organizer": {
                "@type": "Organization",
                "name": venue.organizerName,
                "url": venue.organizerUrl,
            },
            "performer": performerRef,
            "offers": buildOffers(dateStr),
        };
    };

    // One Event per date for every country (unique @id each).
    const events = country.dates.map(buildEvent);

    // Site-wide artist entity (referenced by each event's performer @id).
    const musicGroupLd = {
        "@context": "https://schema.org",
        "@type": "MusicGroup",
        "@id": "https://entradasbts.com/#bts-musicgroup",
        "name": "BTS",
        "url": "https://ibighit.com/bts",
        "sameAs": [
            "https://en.wikipedia.org/wiki/BTS_(band)",
            "https://open.spotify.com/artist/3Nrfpe0tUJi4K4DXYWgMUX",
            "https://www.instagram.com/bts.bighitofficial/",
            "https://twitter.com/bts_bighit",
            "https://www.youtube.com/@BTS",
        ],
    };

    const breadcrumbLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Inicio",
                "item": "https://entradasbts.com/",
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": isBrazil
                    ? `Ingressos BTS ${country.name} 2026`
                    : `Entradas BTS ${countryDisplayName} 2026`,
                "item": `https://entradasbts.com/${country.id}/`,
            },
        ],
    };

    const seoContent = COUNTRY_SEO_CONTENT[country.id];

    // Assemble every JSON-LD node into one array to inject.
    const structuredData = [musicGroupLd, ...events, breadcrumbLd];


    return (
        <>
            {structuredData.map((node, idx) => (
                <script
                    key={`ld-${idx}`}
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(node) }}
                />
            ))}
            <CountryClient country={country} />
            {seoContent && (
                <section
                    className="seo-article container mx-auto px-4 py-16 max-w-4xl"
                    aria-label={`Información del concierto BTS en ${countryDisplayName}`}
                    dangerouslySetInnerHTML={{ __html: seoContent }}
                />
            )}
        </>
    );
}
