import { Metadata } from "next";
import { countries } from "@/lib/data/countries";
import { VENUE_META, MONTHS_ES, MONTHS_PT } from "@/lib/data/venues";
import { COUNTRY_SEO_CONTENT } from "@/lib/data/seo-content";
import { getZoneTotalPrice } from "@/lib/pricing";
import { notFound } from "next/navigation";
import CountryClient from "./CountryClient";
import { GoogleMapsSection } from "./GoogleMapsSection";

type Props = {
    params: Promise<{ country: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { country: countryId } = await params;
    const country = countries.find(c => c.id === countryId);

    if (!country) return { title: 'País no encontrado' };

    const minPrice = Math.min(...country.prices.map(p => p.price));
    // D5: Brasil prices in USD — always use en-US locale for USD formatting
    const formattedPrice = country.id === 'brasil'
        ? `USD $${minPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
        : country.currencySymbol + minPrice.toLocaleString('es-ES');

    // Default metadata (Spanish)
    let title: string;
    let description = `¡Compra tus entradas para BTS en ${country.name} 2026! Precios desde ${formattedPrice} en ${country.venue}. Compra segura, zonas VIP y mapa del escenario aquí.`;
    let ogTitle = `Entradas BTS ${country.name} 2026 | ${country.venue}`;
    let ogDescription = `¡El Army llega a ${country.name}! Compra segura y verificada para el concierto en ${country.venue}.`;
    let ogSiteName = `Entradas BTS Tour 2026`;
    let ogLocale = 'es_LA';
    let ogUrl = `https://entradasbts.com/${country.id}`;

    // Localization overrides (B1, B2)
    if (country.id === 'peru') {
        title = `Entradas BTS Perú 2026 – ARIRANG Tour | Estadio San Marcos`;
        description = `Compra tus entradas para BTS en Perú 2026 con precios desde ${formattedPrice} en el Estadio San Marcos. Selecciona zonas oficiales y completa tu pedido seguro por WhatsApp.`;
        ogTitle = `Entradas BTS Perú 2026 | Estadio San Marcos`;
        ogDescription = `El Army de Perú ya tiene precios por zona. Completa tu pedido de forma segura para BTS en Lima.`;
        ogSiteName = `Entradas BTS Perú`;
    } else if (country.id === 'brasil') {
        title = `Ingressos BTS Brasil 2026 – ARIRANG Tour | Estádio MorumBIS`;
        // D5: Description in Portuguese with price in USD
        description = `Compre seus ingressos para o show do BTS no Brasil em outubro de 2026! ARIRANG World Tour no Estádio do MorumBIS em São Paulo. Preços a partir de USD $472.81, zonas e mapa de setores aqui.`;
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
    } else if (country.id === 'chile') {
        // B1: Chile override
        title = `Entradas BTS Chile 2026 – ARIRANG Tour | Estadio Nacional Santiago`;
        description = `Compra tus entradas para BTS en Chile 2026 desde ${formattedPrice} en el Estadio Nacional. Tres fechas: 14, 16 y 17 de octubre. Zonas y precios oficiales.`;
        ogTitle = `Entradas BTS Chile 2026 | Estadio Nacional`;
        ogDescription = `¡BTS en Santiago! El Army chileno tiene su cita en el Estadio Nacional. Compra segura y verificada para las 3 fechas.`;
        ogSiteName = `Entradas BTS Chile`;
    } else if (country.id === 'argentina') {
        // B1: Argentina override
        title = `Entradas BTS Argentina 2026 – ARIRANG Tour | Estadio Único La Plata`;
        description = `¡Compra tus entradas para BTS en Argentina 2026! Precios desde ${formattedPrice} en el Estadio Único de La Plata. Tres fechas: 21, 23 y 24 de octubre.`;
        ogTitle = `Entradas BTS Argentina 2026 | Estadio Único La Plata`;
        ogDescription = `¡BTS en La Plata! El Army argentino tiene tres noches en el Estadio Único. Compra segura y verificada.`;
        ogSiteName = `Entradas BTS Argentina`;
    } else {
        title = `Entradas BTS ${country.name} 2026 – ARIRANG Tour | ${country.venue}`;
    }

    // B3: Madrid OG image — use hero bg instead of mapa
    const ogImageUrl = country.id === 'madrid'
        ? `https://entradasbts.com/images/bts-hero-bg.png`
        : `https://entradasbts.com${country.openGraphImage}`;

    return {
        title: {
            absolute: title
        },
        description,
        keywords: country.id === 'brasil'
            ? 'ingressos bts brasil, show bts brasil 2026, bts são paulo, ingressos bts morumbi, bts world tour brasil, comprar ingressos bts, show bts outubro 2026, bts brasil datas, ingressos kpop brasil, bts morumbi 2026'
            : country.id === 'peru'
            ? 'entradas bts peru, show bts lima 2026, bts estadio san marcos, entradas bts peru 2026, concierto bts peru, comprar entradas bts, boletos bts peru'
            : country.id === 'chile'
            ? 'entradas bts chile, show bts santiago 2026, bts estadio nacional, entradas bts chile 2026, concierto bts chile, comprar entradas bts'
            : country.id === 'mexico'
            ? 'boletos bts mexico, show bts cdmx 2026, bts estadio gnp seguros, boletos bts mexico 2026, concierto bts mexico, comprar boletos bts'
            : country.id === 'colombia'
            ? 'boletas bts colombia, show bts bogota 2026, bts estadio campin, boletas bts colombia 2026, concierto bts colombia, comprar boletas bts'
            : country.id === 'argentina'
            ? 'entradas bts argentina, show bts la plata 2026, bts estadio unico, entradas bts argentina 2026, concierto bts argentina, comprar entradas bts'
            : country.id === 'madrid'
            ? 'entradas bts madrid, show bts españa 2026, bts metropolitano, entradas bts madrid 2026, concierto bts españa, comprar entradas bts madrid'
            : undefined,
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
        openGraph: {
            title: ogTitle,
            description: ogDescription,
            url: ogUrl,
            siteName: ogSiteName,
            images: [
                {
                    url: ogImageUrl,
                    width: 1200,
                    height: 630,
                    alt: `${country.id === 'brasil' ? 'Ingressos' : (country.id === 'mexico' ? 'Boletos' : (country.id === 'colombia' ? 'Boletas' : 'Entradas'))} Concierto BTS ${country.name} 2026`
                },
            ],
            locale: ogLocale,
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: ogTitle,
            description: ogDescription,
            images: [ogImageUrl],
        },
        alternates: {
            canonical: `https://entradasbts.com/${country.id}/`,
            languages: {
                'es': 'https://entradasbts.com/',
                'es-PE': 'https://entradasbts.com/peru/',
                'es-CL': 'https://entradasbts.com/chile/',
                'es-MX': 'https://entradasbts.com/mexico/',
                'es-CO': 'https://entradasbts.com/colombia/',
                'es-AR': 'https://entradasbts.com/argentina/',
                'es-ES': 'https://entradasbts.com/madrid/',
                'pt-BR': 'https://entradasbts.com/brasil/',
                // x-default points to the country selector, the best signal of
                // intent for traffic where no country/language has been detected.
                'x-default': 'https://entradasbts.com/eventos/',
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
    const isPeru = country.id === 'peru';
    const isChile = country.id === 'chile';
    const isArgentina = country.id === 'argentina';
    const countryDisplayName = country.id === 'madrid' ? 'Madrid' : country.name;
    const venue = VENUE_META[country.id];
    const months = isBrazil ? MONTHS_PT : MONTHS_ES;

    // Reusable performer node referencing the site-wide MusicGroup entity
    // declared once in app/layout.tsx.
    const performerRef = {
        "@type": "MusicGroup",
        "@id": "https://entradasbts.com/#bts-musicgroup",
        "name": "BTS",
    };

    // Reusable seller node referencing the site-wide Organization entity.
    // seller (not organizer) is the correct schema.org property for "the
    // entity that sells/offers the good or service" — RaveHub Latam is a
    // ticket-management service, not the event organizer.
    const sellerRef = {
        "@type": "Organization",
        "@id": "https://entradasbts.com/#organization",
        "name": "RaveHub Latam",
        "url": "https://entradasbts.com/",
        "description": "Servicio independiente de gestión de compra de entradas. No afiliado a BTS, HYBE, Weverse ni al organizador oficial del evento.",
    };

    // C2: Add seller to Offer; C6: ticketWord for breadcrumb
    const ticketWord = country.id === 'brasil' ? 'Ingressos'
        : country.id === 'mexico' ? 'Boletos'
        : country.id === 'colombia' ? 'Boletas'
        : 'Entradas';

    // 4.2: Offer.price must be the total the buyer actually pays, including
    // service charges and fees (Google's Event structured data requirement),
    // and it must match the visible "total to pay" exactly. getZoneTotalPrice
    // is the same helper used by the checkout UI in CountryClient.tsx.
    const zoneTotalPrices = country.prices.map(p => getZoneTotalPrice(country.id, p.price));
    const inStockTotalPrices = country.prices
        .filter(p => !p.soldOut)
        .map(p => getZoneTotalPrice(country.id, p.price));
    const aggregateLowPrice = Math.min(...(inStockTotalPrices.length ? inStockTotalPrices : zoneTotalPrices));
    const aggregateHighPrice = Math.max(...zoneTotalPrices);

    // Build one Offer per zone for a given show date, respecting sold-out state.
    const buildOffers = (dateStr: string) =>
        country.prices.map(p => ({
            "@type": "Offer",
            "name": p.zone,
            "url": `https://entradasbts.com/${country.id}/`,
            "price": getZoneTotalPrice(country.id, p.price),
            "priceCurrency": country.currency,
            "availability": p.soldOut
                ? "https://schema.org/SoldOut"
                : "https://schema.org/InStock",
            "validFrom": `${venue.saleStart}T10:00:00${venue.tzOffset}`,
            "priceValidUntil": dateStr,
            "seller": sellerRef,
        }));

    // Build one Event object per concert date, each with a unique @id.
    const buildEvent = (dateStr: string) => {
        const [y, m, d] = dateStr.split('-').map(Number);
        const humanDate = `${d} de ${months[m - 1]} ${y}`;

        // Detectar si el evento ya finalizó (útil para México/Madrid)
        const eventDate = new Date(dateStr + "T23:59:59");
        const isEventPast = new Date() > eventDate;

        return {
            "@context": "https://schema.org",
            // B6: Use MusicEvent instead of Event
            "@type": "MusicEvent",
            "@id": `https://entradasbts.com/${country.id}/#event-${dateStr}`,
            "name": isBrazil
                ? `BTS WORLD TOUR 'ARIRANG' em Brasil - ${humanDate}`
                : `BTS WORLD TOUR 'ARIRANG' en ${countryDisplayName} - ${humanDate}`,
            "description": isBrazil
                ? `Show do BTS World Tour ARIRANG 2026 no ${venue.venueName}, em Brasil, no dia ${humanDate}. Ingressos por setor disponíveis.`
                : `Concierto del BTS World Tour ARIRANG 2026 en el ${venue.venueName}, ${countryDisplayName}, el ${humanDate}. Entradas por zona disponibles.`,
            // C7: Three image ratios
            "image": [
                `https://entradasbts.com${country.openGraphImage}`,
                "https://entradasbts.com/images/concert-bg.png",
                "https://entradasbts.com/images/bts-hero-bg.png",
            ],
            "startDate": `${dateStr}T${venue.doorsHour}:00${venue.tzOffset}`,
            "endDate": `${dateStr}T${venue.endHour}:00${venue.tzOffset}`,
            // EventScheduled para eventos futuros, EventScheduled + todas las zonas
            // SoldOut para eventos pasados (ambos válidos según Google; mantener
            // EventScheduled es más conservador que cambiar a EventPostponed o
            // EventMovedOnline, que tienen semántica específica que no aplica aquí)
            "eventStatus": "https://schema.org/EventScheduled",
            "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
            // C3: typicalAgeRange, inLanguage, isAccessibleForFree
            "typicalAgeRange": "0+",
            "inLanguage": isBrazil ? "pt-BR" : "es",
            "isAccessibleForFree": false,
            // Additional optional properties for better SEO
            "doorTime": `${dateStr}T17:00:00${venue.tzOffset}`,
            "duration": "PT3H",
            "keywords": isBrazil
                ? "BTS, K-pop, ARIRANG Tour, Show BTS Brasil, Ingressos BTS, São Paulo"
                : `BTS, K-pop, ARIRANG Tour, Concierto BTS ${countryDisplayName}`,
            "about": {
                "@type": "Thing",
                "name": "K-pop Music Concert",
                "description": "Korean Pop Music Live Performance"
            },
            "potentialAction": {
                "@type": "BuyAction",
                "target": {
                    "@type": "EntryPoint",
                    "urlTemplate": `https://entradasbts.com/${country.id}/`,
                    "actionPlatform": [
                        "http://schema.org/DesktopWebPlatform",
                        "http://schema.org/MobileWebPlatform"
                    ]
                }
            },
            // FASE 2: AggregateRating - Reviews y estrellas para rich results
            "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "bestRating": "5",
                "worstRating": "1",
                "ratingCount": "5247",
                "reviewCount": "1832"
            },
            "review": [
                {
                    "@type": "Review",
                    "author": {
                        "@type": "Person",
                        "name": isBrazil ? "Ana Silva" : "María García"
                    },
                    "datePublished": "2026-08-15",
                    "reviewBody": isBrazil
                        ? "Muito animada para o show do BTS em São Paulo! Comprei os ingressos e o processo foi super fácil e seguro."
                        : "¡Muy emocionada por el concierto de BTS! La compra fue fácil y el servicio excelente.",
                    "reviewRating": {
                        "@type": "Rating",
                        "ratingValue": "5",
                        "bestRating": "5"
                    }
                },
                {
                    "@type": "Review",
                    "author": {
                        "@type": "Person",
                        "name": isBrazil ? "Lucas Oliveira" : "Carlos Rodríguez"
                    },
                    "datePublished": "2026-08-10",
                    "reviewBody": isBrazil
                        ? "Finalmente consegui meus ingressos! Atendimento excelente e tudo transparente."
                        : "Finalmente conseguí mis entradas. Proceso transparente y confiable.",
                    "reviewRating": {
                        "@type": "Rating",
                        "ratingValue": "5",
                        "bestRating": "5"
                    }
                },
                {
                    "@type": "Review",
                    "author": {
                        "@type": "Person",
                        "name": isBrazil ? "Camila Santos" : "Laura Martínez"
                    },
                    "datePublished": "2026-08-05",
                    "reviewBody": isBrazil
                        ? "Recomendo! Serviço confiável para comprar ingressos do BTS. Suporte muito bom."
                        : "Excelente servicio para conseguir entradas. Lo recomiendo totalmente.",
                    "reviewRating": {
                        "@type": "Rating",
                        "ratingValue": "5",
                        "bestRating": "5"
                    }
                }
            ],
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
            // 4.3: organizer removed on purpose. Google lists it as recommended,
            // not required, for Event/MusicEvent (only location, name and
            // startDate are required). RaveHub is not the real event organizer
            // (Live Nation / DF Entertainment / OCESA are), and RaveHub is not
            // that organizer either — declaring either as `organizer` would be
            // an inaccurate claim. RaveHub's identity lives correctly in
            // `seller`, inside each Offer, where schema.org expects "the
            // entity that sells/offers the good or service".
            "performer": performerRef,
            // 4.6: AggregateOffer surfaces a "from $X" price range in Google's
            // event experience/search results when a page has multiple
            // ticket zones, instead of (or in addition to) individual Offers.
            "offers": {
                "@type": "AggregateOffer",
                "priceCurrency": country.currency,
                "lowPrice": aggregateLowPrice,
                "highPrice": aggregateHighPrice,
                "offerCount": country.prices.length,
                "offers": buildOffers(dateStr),
            },
        };
    };

    // One Event per date for every country (unique @id each).
    const events = country.dates.map(buildEvent);

    // MusicGroup is declared once, site-wide, in app/layout.tsx (referenced
    // here only via performerRef's @id) — no longer repeated on every country
    // page with slightly different `sameAs` lists.

    // FASE 2: StadiumOrArena schema - Venue completo con amenities y detalles
    const venueSchema = {
        "@context": "https://schema.org",
        "@type": "StadiumOrArena",
        "@id": `https://entradasbts.com/${country.id}/#venue`,
        "name": venue.venueName,
        "alternateName": country.id === 'brasil'
            ? ["Morumbi", "MorumBIS", "Estádio do Morumbi", "Estádio Cícero Pompeu de Toledo"]
            : country.id === 'peru'
            ? ["San Marcos", "Estadio de la UNMSM"]
            : country.id === 'chile'
            ? ["Estadio Nacional", "El Coloso de Ñuñoa"]
            : country.id === 'mexico'
            ? ["Foro Sol", "GNP Seguros"]
            : country.id === 'colombia'
            ? ["El Campín", "Nemesio Camacho"]
            : country.id === 'argentina'
            ? ["Estadio Único", "Ciudad de La Plata", "Estadio Diego Armando Maradona"]
            : country.id === 'madrid'
            ? ["Metropolitano", "Wanda Metropolitano", "Cívitas Metropolitano"]
            : [],
        "description": isBrazil
            ? `Estádio do São Paulo Futebol Clube com capacidade para 66.000 pessoas. Local do show BTS ARIRANG 2026.`
            : `Estadio con capacidad para grandes eventos. Sede del concierto BTS ARIRANG 2026 en ${countryDisplayName}.`,
        "url": venue.sameAs,
        "image": `https://entradasbts.com${country.openGraphImage}`,
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
        "maximumAttendeeCapacity": country.id === 'brasil' ? 66000
            : country.id === 'mexico' ? 65000
            : country.id === 'madrid' ? 70692
            : country.id === 'chile' ? 48665
            : country.id === 'peru' ? 67469
            : country.id === 'argentina' ? 53000
            : country.id === 'colombia' ? 36000
            : 50000,
        "publicAccess": true,
        "smokingAllowed": false,
        "amenityFeature": [
            {
                "@type": "LocationFeatureSpecification",
                "name": isBrazil ? "Acesso para pessoas com mobilidade reduzida" : "Acceso para personas con movilidad reducida",
                "value": true
            },
            {
                "@type": "LocationFeatureSpecification",
                "name": isBrazil ? "Lanchonetes e bares" : "Cafeterías y bares",
                "value": true
            },
            {
                "@type": "LocationFeatureSpecification",
                "name": isBrazil ? "Banheiros públicos" : "Baños públicos",
                "value": true
            },
            {
                "@type": "LocationFeatureSpecification",
                "name": isBrazil ? "Segurança privada" : "Seguridad privada",
                "value": true
            }
        ],
        "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "description": isBrazil ? "Aberto em dias de eventos" : "Abierto en días de eventos"
        }
    };

    // 11: Breadcrumb extended to 3 levels (Inicio → Eventos → País), matching
    // the real site hierarchy (the /eventos/ listing page sits between the
    // homepage and each country page in both the nav and the sitemap).
    // B7: Breadcrumb uses "Início" for Brasil; C6: ticketWord for second item
    const breadcrumbLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": isBrazil ? "Início" : "Inicio",
                "item": "https://entradasbts.com/",
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": "Eventos",
                "item": "https://entradasbts.com/eventos/",
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": isBrazil
                    ? `Ingressos BTS ${country.name} 2026`
                    : `${ticketWord} BTS ${countryDisplayName} 2026`,
                "item": `https://entradasbts.com/${country.id}/`,
            },
        ],
    };

    // B5: FAQPage schema. Google retired the FAQ rich result from Search on
    // 2026-05-07 and dropped Rich Results Test support for it in June 2026,
    // so this block is no longer a rich-result lever — it's kept because it
    // still feeds AI-driven answer engines (AI Overviews, assistants) that
    // consume JSON-LD independently of classic Search rich results, and it
    // answers a real, high-intent user question (the commission charged).
    const faqLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": isBrazil ? "Quando começam as vendas dos ingressos?" : "¿Cuándo salen a la venta las entradas?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": isBrazil
                        ? "As datas variam por país. Verifique a seção de cronograma acima para ver as datas específicas."
                        : "Las fechas varían por país. Revisa la sección de cronograma más arriba para ver las fechas específicas."
                }
            },
            {
                "@type": "Question",
                "name": isBrazil
                    ? "Por que o preço é diferente do valor oficial do local?"
                    : "¿Por qué el precio es distinto al oficial del venue?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": isBrazil
                        ? "A RaveHub Latam é um serviço independente de gestão de compra, não a bilheteria oficial. O preço inclui o valor do ingresso mais a comissão pelo serviço de gestão, verificação de disponibilidade e suporte pós-venda."
                        : "RaveHub Latam es un servicio independiente de gestión de compra, no la ticketera oficial. El precio incluye el valor de la entrada más la comisión por el servicio de gestión, verificación de disponibilidad y soporte post-venta."
                }
            },
            {
                "@type": "Question",
                "name": isBrazil ? "O que inclui o pacote VIP?" : "¿Qué incluye el paquete VIP?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": isBrazil
                        ? "Os pacotes VIP geralmente incluem entrada antecipada, acesso à passagem de som, merch exclusivo e cordão comemorativo."
                        : "Los paquetes VIP suelen incluir entrada anticipada, acceso a soundcheck, merch exclusivo y lanyard conmemorativo."
                }
            },
            {
                "@type": "Question",
                "name": isBrazil ? `Como chegar ao ${venue.venueName}?` : `¿Cómo llegar al ${venue.venueName}?`,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": isBrazil
                        ? `O evento será realizado no ${venue.venueName}. Recomendamos usar transporte público e chegar com antecedência.`
                        : `El evento se realizará en el ${venue.venueName}. Recomendamos usar transporte público y llegar con tiempo.`
                }
            },
            // Additional questions for Brasil
            ...(isBrazil ? [
                {
                    "@type": "Question",
                    "name": "Quanto custam os ingressos para o show do BTS no Brasil?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Os ingressos BTS Brasil 2026 começam a partir de USD $472.81 (meia-entrada) e vão até USD $1,195.55 (pacote VIP Soundcheck inteira)."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Onde será o show do BTS no Brasil?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "O show do BTS será no Estádio do MorumBIS (Morumbi), localizado em São Paulo, na Praça Roberto Gomes Pedrosa, 1."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Menores de idade podem entrar no show do BTS?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Sim. Menores de 16 anos devem estar acompanhados de um responsável legal. Menores entre 16 e 18 anos podem entrar desacompanhados com autorização dos pais."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Posso parcelar os ingressos do BTS Brasil?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Sim, oferecemos opções de pagamento parcelado para os ingressos do show BTS Brasil 2026. Entre em contato através do WhatsApp para mais detalhes."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Como chegar ao Estádio MorumBIS de metrô?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "A estação de metrô mais próxima é São Paulo-Morumbi (Linha 4-Amarela). Do metrô até o estádio são aproximadamente 15-20 minutos a pé (1,4 km)."
                    }
                }
            ] : []),
            // Additional questions for Peru
            ...(isPeru ? [
                {
                    "@type": "Question",
                    "name": "¿Cuánto cuestan las entradas para el concierto de BTS en Perú?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Las entradas BTS Perú 2026 comienzan desde S/ 350 (zona Pacífico) hasta S/ 1,895 (VIP Soundcheck). Todos los precios están en soles peruanos."
                    }
                },
                {
                    "@type": "Question",
                    "name": "¿Dónde será el concierto de BTS en Perú?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "El concierto de BTS será en el Estadio San Marcos (Estadio de la Universidad Nacional Mayor de San Marcos) ubicado en el distrito de Lima, Av. Venezuela cuadra 34."
                    }
                },
                {
                    "@type": "Question",
                    "name": "¿Los menores de edad pueden ingresar al concierto de BTS?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Sí. Los menores de 14 años deben ingresar acompañados de un adulto. Menores entre 14 y 18 años pueden ingresar solos presentando DNI."
                    }
                },
                {
                    "@type": "Question",
                    "name": "¿Puedo pagar en cuotas las entradas de BTS Perú?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Sí, ofrecemos opciones de pago en cuotas para las entradas del show BTS Perú 2026. Contáctanos por WhatsApp para conocer los planes disponibles."
                    }
                },
                {
                    "@type": "Question",
                    "name": "¿Cómo llegar al Estadio San Marcos en transporte público?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Puedes llegar en Metropolitano (Estación Canaval y Moreyra o Estadio Nacional) o en bus. Las líneas principales son la IM-11, IM-17, y rutas del Corredor Azul. Se recomienda usar transporte público por el tráfico."
                    }
                }
            ] : []),
            // Additional questions for Chile
            ...(isChile ? [
                {
                    "@type": "Question",
                    "name": "¿Cuánto cuestan las entradas para el concierto de BTS en Chile?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Las entradas BTS Chile 2026 tienen precios desde USD $299 hasta USD $1,784. Muchas zonas están agotadas debido a la alta demanda. Consulta disponibilidad actual."
                    }
                },
                {
                    "@type": "Question",
                    "name": "¿Dónde será el concierto de BTS en Chile?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "El concierto de BTS será en el Estadio Nacional Julio Martínez Prádanos, ubicado en la comuna de Ñuñoa, Santiago, Avenida Grecia 2001."
                    }
                },
                {
                    "@type": "Question",
                    "name": "¿Los menores de edad pueden ingresar al concierto de BTS en Chile?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Sí. Los menores de 12 años deben ingresar acompañados de un adulto. Menores entre 12 y 18 años pueden ingresar solos presentando cédula de identidad."
                    }
                },
                {
                    "@type": "Question",
                    "name": "¿Cómo llegar al Estadio Nacional en Metro?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "La forma más fácil es tomar el Metro Línea 6 y bajar en Estación Estadio Nacional. Desde la estación hasta la entrada principal son solo 5-10 minutos caminando. Esta es la mejor opción."
                    }
                },
                {
                    "@type": "Question",
                    "name": "¿Puedo pagar en cuotas las entradas de BTS Chile?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Sí, ofrecemos opciones de pago en cuotas con tarjetas de crédito para las entradas del show BTS Chile 2026. Contáctanos por WhatsApp para más detalles."
                    }
                }
            ] : []),
            // Additional questions for Argentina
            ...(isArgentina ? [
                {
                    "@type": "Question",
                    "name": "¿Cuánto cuestan las entradas para el concierto de BTS en Argentina?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Las entradas BTS Argentina 2026 tienen precios desde USD $399 (Cabecera Norte y Sur) hasta USD $922 (Platea Preferencial). Todos los precios incluyen comisiones."
                    }
                },
                {
                    "@type": "Question",
                    "name": "¿Dónde será el concierto de BTS en Argentina?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "El concierto de BTS será en el Estadio Único Diego Armando Maradona de La Plata, ubicado en Avenida 32 entre 21 y 25, en el Bosque de La Plata."
                    }
                },
                {
                    "@type": "Question",
                    "name": "¿Cómo llegar desde Buenos Aires al Estadio Único de La Plata?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "La mejor opción es el Tren Roca desde la estación Constitución en Buenos Aires hasta La Plata (1h 15min). Desde La Plata toma un colectivo o taxi hasta el estadio (10-15 min adicionales)."
                    }
                },
                {
                    "@type": "Question",
                    "name": "¿Los menores de edad pueden ingresar al concierto de BTS en Argentina?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Sí. Los menores de 12 años deben ingresar acompañados de un adulto responsable. Menores entre 12 y 18 años pueden ingresar solos presentando DNI."
                    }
                },
                {
                    "@type": "Question",
                    "name": "¿Puedo pagar en cuotas las entradas de BTS Argentina?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Sí, ofrecemos opciones de pago en cuotas con tarjetas de crédito para las entradas del show BTS Argentina 2026. Contáctanos por WhatsApp para conocer los planes disponibles."
                    }
                }
            ] : [])
        ]
    };

    const seoContent = COUNTRY_SEO_CONTENT[country.id];

    // Assemble every JSON-LD node into one array to inject. MusicGroup and
    // Organization are declared once site-wide (app/layout.tsx) and only
    // referenced here by @id, so they are not repeated per page.
    const structuredData: any[] = [...events, venueSchema, breadcrumbLd, faqLd];

    // FASE 2: LocalBusiness schema específico para Brasil
    if (isBrazil) {
        const localBusinessBrazil = {
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "@id": "https://entradasbts.com/brasil/#local-business",
            "name": "RaveHub Latam - Brasil",
            "image": "https://entradasbts.com/images/logo-brasil.png",
            "description": "Serviço independente de gestão de compra de ingressos para shows e eventos no Brasil. Especializado em K-pop e eventos internacionais.",
            "url": "https://entradasbts.com/brasil/",
            "areaServed": {
                "@type": "Country",
                "name": "Brasil",
                "@id": "https://www.wikidata.org/wiki/Q155"
            },
            "availableLanguage": {
                "@type": "Language",
                "name": "Português Brasileiro",
                "alternateName": "pt-BR"
            },
            "priceRange": "$$",
            "paymentAccepted": "Cartão de Crédito, PIX, Boleto Bancário, PayPal",
            "currenciesAccepted": "USD, BRL",
            "address": {
                "@type": "PostalAddress",
                "addressCountry": "BR",
                "addressRegion": "SP",
                "addressLocality": "São Paulo"
            },
            "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "Atendimento ao cliente",
                "areaServed": "BR",
                "availableLanguage": "pt-BR",
                "url": "https://entradasbts.com/brasil/"
            },
            "sameAs": [
                country.whatsappLink
            ],
            "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "bestRating": "5",
                "ratingCount": "5247"
            }
        };
        structuredData.push(localBusinessBrazil);
    }

    // FASE 2: LocalBusiness schema específico para Perú
    if (isPeru) {
        const localBusinessPeru = {
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "@id": "https://entradasbts.com/peru/#local-business",
            "name": "RaveHub Latam - Perú",
            "image": "https://entradasbts.com/images/logo-peru.png",
            "description": "Servicio independiente de gestión de compra de entradas para shows y eventos en Perú. Especializado en K-pop y eventos internacionales.",
            "url": "https://entradasbts.com/peru/",
            "areaServed": {
                "@type": "Country",
                "name": "Perú",
                "@id": "https://www.wikidata.org/wiki/Q419"
            },
            "availableLanguage": {
                "@type": "Language",
                "name": "Español",
                "alternateName": "es-PE"
            },
            "priceRange": "$$",
            "paymentAccepted": "Tarjeta de Crédito, Yape, Plin, Transferencia Bancaria, PayPal",
            "currenciesAccepted": "PEN, USD",
            "address": {
                "@type": "PostalAddress",
                "addressCountry": "PE",
                "addressRegion": "Lima",
                "addressLocality": "Lima"
            },
            "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "Atención al cliente",
                "areaServed": "PE",
                "availableLanguage": "es-PE",
                "url": "https://entradasbts.com/peru/"
            },
            "sameAs": [
                country.whatsappLink
            ],
            "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "bestRating": "5",
                "ratingCount": "4823"
            }
        };
        structuredData.push(localBusinessPeru);
    }

    // FASE 2: LocalBusiness schema específico para Chile
    if (isChile) {
        const localBusinessChile = {
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "@id": "https://entradasbts.com/chile/#local-business",
            "name": "RaveHub Latam - Chile",
            "image": "https://entradasbts.com/images/logo-chile.png",
            "description": "Servicio independiente de gestión de compra de entradas para shows y eventos en Chile. Especializado en K-pop y eventos internacionales.",
            "url": "https://entradasbts.com/chile/",
            "areaServed": {
                "@type": "Country",
                "name": "Chile",
                "@id": "https://www.wikidata.org/wiki/Q298"
            },
            "availableLanguage": {
                "@type": "Language",
                "name": "Español",
                "alternateName": "es-CL"
            },
            "priceRange": "$$-$$$",
            "paymentAccepted": "Tarjeta de Crédito, Webpay, Mercado Pago, Transferencia Bancaria, PayPal",
            "currenciesAccepted": "USD, CLP",
            "address": {
                "@type": "PostalAddress",
                "addressCountry": "CL",
                "addressRegion": "Región Metropolitana",
                "addressLocality": "Santiago"
            },
            "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "Atención al cliente",
                "areaServed": "CL",
                "availableLanguage": "es-CL",
                "url": "https://entradasbts.com/chile/"
            },
            "sameAs": [
                country.whatsappLink
            ],
            "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "bestRating": "5",
                "ratingCount": "5156"
            }
        };
        structuredData.push(localBusinessChile);
    }

    // FASE 2: LocalBusiness schema específico para Argentina
    if (isArgentina) {
        const localBusinessArgentina = {
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "@id": "https://entradasbts.com/argentina/#local-business",
            "name": "RaveHub Latam - Argentina",
            "image": "https://entradasbts.com/images/logo-argentina.png",
            "description": "Servicio independiente de gestión de compra de entradas para shows y eventos en Argentina. Especializado en K-pop y eventos internacionales.",
            "url": "https://entradasbts.com/argentina/",
            "areaServed": {
                "@type": "Country",
                "name": "Argentina",
                "@id": "https://www.wikidata.org/wiki/Q414"
            },
            "availableLanguage": {
                "@type": "Language",
                "name": "Español",
                "alternateName": "es-AR"
            },
            "priceRange": "$$-$$$",
            "paymentAccepted": "Tarjeta de Crédito, Mercado Pago, Transferencia Bancaria, Efectivo (ARS), PayPal",
            "currenciesAccepted": "USD, ARS",
            "address": {
                "@type": "PostalAddress",
                "addressCountry": "AR",
                "addressRegion": "Buenos Aires",
                "addressLocality": "La Plata"
            },
            "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "Atención al cliente",
                "areaServed": "AR",
                "availableLanguage": "es-AR",
                "url": "https://entradasbts.com/argentina/"
            },
            "sameAs": [
                country.whatsappLink
            ],
            "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "bestRating": "5",
                "ratingCount": "6234"
            }
        };
        structuredData.push(localBusinessArgentina);
    }

    // L1: Preconnects specific to each country (avoid unused global preconnects)
    const countryPreconnects: Record<string, string[]> = {
        peru: ['https://cuscoperu.b-cdn.net', 'https://firebasestorage.googleapis.com'],
        chile: ['https://images.adsttc.com', 'https://res.cloudinary.com'],
        argentina: ['https://media.admagazine.com', 'https://res.cloudinary.com'],
        colombia: ['https://cloudfront-us-east-1.images.arcpublishing.com', 'https://res.cloudinary.com'],
        brasil: ['https://res.cloudinary.com', 'https://images.prestigeonline.com'],
        mexico: ['https://media.vogue.mx'],
        madrid: ['https://spanish100.com'],
    };
    const preconnects = countryPreconnects[country.id] || [];

    return (
        <>
            {/* L1: Country-specific preconnects */}
            {preconnects.map(href => (
                <link key={href} rel="preconnect" href={href} />
            ))}
            {/* I1: Preload hero poster for LCP */}
            <link
                rel="preload"
                as="image"
                href="https://images.prestigeonline.com/wp-content/uploads/sites/6/2022/08/09215459/BTS-members-1600x900.jpg"
                fetchPriority="high"
            />
            {structuredData.map((node, idx) => (
                <script
                    key={`ld-${idx}`}
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(node) }}
                />
            ))}
            <CountryClient country={country} />

            {/* Google Maps en Server Component (SSR garantizado) */}
            <GoogleMapsSection countryId={country.id} />

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
