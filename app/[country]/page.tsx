import { Metadata } from "next";
import { countries } from "@/lib/data/countries";
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
    let ogTitle = `Entradas BTS ${country.name} 2026`;
    let ogDescription = `¡El Army llega a ${country.name}! Compra segura y verificada para el concierto en ${country.venue}.`;
    let ogSiteName = `Entradas BTS Tour 2026`;
    let ogLocale = 'es_LA';
    let ogUrl = `https://entradasbts.com/${country.id}`;

    // Localization overrides
    if (country.id === 'peru') {
        title = `Entradas BTS Perú 2026: Precios Reales en Estadio San Marcos`;
        description = `Compra tus entradas para BTS en Perú 2026 con precios reales desde ${formattedPrice} en el Estadio San Marcos. Selecciona zonas oficiales y completa tu pedido seguro por WhatsApp.`;
        ogTitle = `Entradas BTS Perú 2026 | Precios Reales`;
        ogDescription = `El Army de Perú ya tiene precios reales por zona. Completa tu pedido de forma segura para BTS en Lima.`;
        ogSiteName = `Entradas BTS Perú`;
    } else if (country.id === 'brasil') {
        title = `Ingressos BTS Brasil 2026: Compre Agora no Estádio do MorumBIS`;
        description = `Compre seus ingressos para o show do BTS no Brasil em 2026! Preços a partir de ${formattedPrice} no Estádio do MorumBIS. Compra segura, zonas VIP e mapa de assentos aqui.`;
        ogTitle = `Ingressos BTS Brasil 2026 | Estádio do MorumBIS`;
        ogDescription = `O Army chega ao Brasil! Garanta seus ingressos para o show do BTS no Estádio do MorumBIS. Compra segura e verificada.`;
        ogSiteName = `Ingressos BTS Brasil`;
        ogLocale = 'pt_BR';
    } else if (country.id === 'mexico') {
        title = `Boletos BTS México 2026: Precios y Fechas | Estadio GNP`;
        description = `¡Compra tus boletos para BTS en México 2026! Precios desde ${formattedPrice} en el Estadio GNP Seguros. Compra segura, zonas VIP y mapa del escenario aquí.`;
        ogTitle = `Boletos BTS México 2026 | Estadio GNP Seguros`;
        ogDescription = `¡BTS en CDMX! No te quedes fuera. Compra segura y verificada para el concierto en el Estadio GNP Seguros.`;
        ogSiteName = `Boletos BTS México`;
    } else if (country.id === 'madrid') {
        title = `Entradas BTS Madrid 2026: Estadio Metropolitano | Compra Oficial`;
        description = `¡Consigue tus ENTRADAS para BTS en MADRID 2026! Concierto oficial en el ${country.venue}. Precios desde ${formattedPrice}. Compra segura y verificada.`;
        ogTitle = `ENTRADAS BTS MADRID 2026 | Estadio Metropolitano`;
        ogDescription = `BTS llega a España. Compra tus ENTRADAS para BTS en MADRID 2026 de forma segura para el Metropolitano.`;
        ogSiteName = `Entradas BTS Madrid`;
        ogLocale = 'es_ES';
    } else if (country.id === 'colombia') {
        title = `Boletas BTS Colombia 2026: Precios en El Campín`;
        description = `¡Asegura tus boletas para BTS en Colombia 2026! Precios desde ${formattedPrice} en el Estadio El Campín. Compra segura, zonas VIP y mapa del escenario.`;
        ogTitle = `Boletas BTS Colombia 2026 | Estadio El Campín`;
        ogDescription = `¡El Army de Colombia se reporta! Compra segura y verificada para el concierto de BTS en Bogotá.`;
        ogSiteName = `Boletas BTS Colombia`;
    } else {
        // Default title structure for other countries (Peru, Chile, Argentina)
        title = `Entradas BTS ${country.name} 2026: Precios y Fechas en ${country.venue}`;
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
    const minPrice = Math.min(...country.prices.map(p => p.price));
    const maxPrice = Math.max(...country.prices.map(p => p.price));
    const isBrazil = country.id === 'brasil';
    const isMadrid = country.id === 'madrid';

    const countryDisplayName = country.id === 'madrid' ? 'Madrid' : country.name;
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Event",
        "name": isBrazil
            ? `Ingressos BTS Brasil 2026 - Show em ${country.city}`
            : `Entradas BTS ${countryDisplayName} 2026 - Concierto en ${country.city}`,
        "description": isBrazil
            ? `Comprar ingressos BTS Brasil 2026. Informacoes oficiais sobre precos, preventa e setores para o show em ${country.venue}.`
            : country.id === 'peru'
                ? `Comprar entradas BTS Perú 2026. Informacion oficial con precios reales por zona para el concierto en ${country.venue}.`
                : `Comprar entradas BTS ${countryDisplayName} 2026. Informacion oficial sobre precios, preventa y zonas para el concierto en ${country.venue}.`,
        "image": [
            `https://entradasbts.com${country.openGraphImage}`,
            "https://entradasbts.com/images/concert-bg.png"
        ],
        "startDate": `${country.dates[0]}T20:00:00-05:00`,
        "endDate": `${country.dates[country.dates.length - 1]}T23:00:00-05:00`,
        "eventStatus": "https://schema.org/EventScheduled",
        "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
        "location": {
            "@type": "Place",
            "name": country.venue,
            "address": {
                "@type": "PostalAddress",
                "streetAddress": country.id === 'peru' ? 'C. José Díaz s/n' :
                    country.id === 'chile' ? 'Av. Marathon 5300' :
                        country.id === 'mexico' ? 'Viad. Río de la Piedad S/N, Granjas México, Iztacalco' : 
                            (isMadrid ? 'Av. de Luis Aragonés, 4' : 
                                (isBrazil ? 'Av. Francisco Matarazzo, 1705' : 
                                    (country.id === 'argentina' ? 'Av. Pres. Figueroa Alcorta 7597' : 'Cra. 57a #30-97'))),
                "addressLocality": country.city,
                "postalCode": country.id === 'peru' ? '15046' :
                    country.id === 'chile' ? '7820919' :
                        country.id === 'mexico' ? '08400' : 
                            (isMadrid ? '28022' : 
                                (isBrazil ? '05001-200' : 
                                    (country.id === 'argentina' ? 'C1428' : '111311'))),
                "addressCountry": country.isoCode
            },
            "geo": {
                "@type": "GeoCoordinates",
                "latitude": country.id === 'peru' ? -12.0673 :
                    country.id === 'chile' ? -33.5131 :
                        country.id === 'mexico' ? 19.4053 : 
                             (isMadrid ? 40.4361 : 
                                (isBrazil ? -23.5274 : 
                                    (country.id === 'argentina' ? -34.5453 : 4.6459))),
                "longitude": country.id === 'peru' ? -77.0337 :
                    country.id === 'chile' ? -70.6112 :
                        country.id === 'mexico' ? -99.0921 : 
                            (isMadrid ? -3.5995 : 
                                (isBrazil ? -46.6784 : 
                                    (country.id === 'argentina' ? -58.4497 : -74.0775)))
            }
        },
        "organizer": {
            "@type": "Organization",
            "name": "Hybe Corporation",
            "url": "https://ibighit.com"
        },
        "performer": {
            "@type": "PerformingGroup",
            "name": "BTS",
            "sameAs": [
                "https://ibighit.com/bts",
                "https://en.wikipedia.org/wiki/BTS",
                "https://open.spotify.com/artist/3Nrfpe0tUJi4K4DXYWgMUX",
                "https://www.instagram.com/bts.bighitofficial/",
                "https://twitter.com/bts_bighit"
            ]
        },
        "offers": {
            "@type": "AggregateOffer",
            "url": `https://entradasbts.com/${country.id}/`,
            "priceCurrency": country.currency,
            "lowPrice": minPrice.toString(),
            "highPrice": maxPrice.toString(),
            "offerCount": country.prices.length.toString(),
            "availability": "https://schema.org/InStock",
            "priceValidUntil": country.dates[0],
            "validFrom": "2025-01-01",
            "seller": {
                "@type": "Organization",
                "name": "RaveHub Latam",
                "url": "https://www.ravehublatam.com",
                "image": "https://www.ravehublatam.com/logo.png"
            },
            "offers": country.prices.map(p => ({
                "@type": "Offer",
                "name": p.zone,
                "category": p.price >= 1000 ? "VIP" : "Seating",
                "price": p.price.toString(),
                "priceCurrency": country.currency,
                "availability": "https://schema.org/InStock",
                "priceValidUntil": country.dates[0],
                "url": `https://entradasbts.com/${country.id}/`
            }))
        }
    };


    const faqLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [{
            "@type": "Question",
            "name": isBrazil ? "Como funciona o processo de compra segura com a RaveHub?" : "¿Cómo es el proceso de compra segura con RaveHub?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": isBrazil
                    ? "Nosso processo de Compra Segura utiliza tecnologia antifraude e verificação de três etapas para garantir que cada fã tenha acesso legítimo aos seus ingressos, eliminando a incerteza do mercado secundário."
                    : "Nuestro proceso de Compra Segura utiliza tecnología anti-fraude y verificación de tres pasos para asegurar que cada fan tenga acceso legítimo a sus entradas, eliminando la incertidumbre del mercado secundario."
            }
        }, {
            "@type": "Question",
            "name": isBrazil ? "É seguro comprar ingressos de revenda para o BTS?" : "¿Es seguro comprar entradas de reventa para BTS?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": isBrazil
                    ? "Sim, com a Garantia RaveHub. Eliminamos os riscos porque verificamos os vendedores e protegemos seu dinheiro até que você entre no evento."
                    : "Sí, con la Garantía RaveHub. Eliminamos los riesgos porque verificamos a los vendedores y protegemos tu dinero hasta que ingresas al evento."
            }
        }]
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
            />
            <CountryClient country={country} />
        </>
    );
}
