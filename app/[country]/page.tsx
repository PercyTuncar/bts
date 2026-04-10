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
        title = `Entradas BTS Perú 2026: en Estadio San Marcos`;
        description = `Compra tus entradas para BTS en Perú 2026 con precios desde ${formattedPrice} en el Estadio San Marcos. Selecciona zonas oficiales y completa tu pedido seguro por WhatsApp.`;
        ogTitle = `Entradas BTS Perú 2026 |`;
        ogDescription = `El Army de Perú ya tiene precios por zona. Completa tu pedido de forma segura para BTS en Lima.`;
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
                ? `Comprar entradas BTS Perú 2026. Informacion oficial con precios por zona para el concierto en ${country.venue}.`
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
            "@type": "MusicGroup",
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

    const orgLd = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "RaveHub Latam",
        "url": "https://www.ravehublatam.com",
        "logo": "https://www.ravehublatam.com/logo.png",
        "description": "Servicio de Personal Shopper especializado en entradas para conciertos internacionales en Latinoamérica.",
        "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "customer service",
            "availableLanguage": ["Spanish", "Portuguese", "English"]
        }
    };

    const peruFAQs = [
        { "@type": "Question", "name": "¿Cuál es el nombre oficial de la gira de BTS en 2026 y dónde se presentarán en Lima?", "acceptedAnswer": { "@type": "Answer", "text": "El evento es parte del ARIRANG World Tour y los conciertos en Perú se llevarán a cabo en el Estadio San Marcos (Av. German Amezaga)." } },
        { "@type": "Question", "name": "¿Cuál es la plataforma oficial autorizada para la venta en Perú?", "acceptedAnswer": { "@type": "Answer", "text": "La única ticketera oficial y autorizada es Ticketmaster Perú." } },
        { "@type": "Question", "name": "¿Cuáles son los precios reales de los boletos generales?", "acceptedAnswer": { "@type": "Answer", "text": "Los precios de las entradas generales varían entre S/ 483 y S/ 851, dependiendo de la zona elegida." } },
        { "@type": "Question", "name": "¿Cuánto cuesta y qué beneficios incluye el paquete VIP?", "acceptedAnswer": { "@type": "Answer", "text": "El paquete VIP Soundcheck cuesta S/ 2591 e incluye acceso a la prueba de sonido, beneficios exclusivos y ubicación preferencial en Campo A." } },
        { "@type": "Question", "name": "¿Qué días tocará BTS en Lima?", "acceptedAnswer": { "@type": "Answer", "text": "Las fechas oficiales son el 9 y 10 de octubre, además de la nueva fecha del 7 de octubre de 2026 que se sumaron por alta demanda." } },
        { "@type": "Question", "name": "¿Cómo pueden adquirir entradas las personas con discapacidad (CONADIS)?", "acceptedAnswer": { "@type": "Answer", "text": "Deben enviar una solicitud acreditada al Centro de Soporte al Fan de Ticketmaster a partir de las 3:00 p.m. en las fechas estipuladas según el día del concerto." } },
        { "@type": "Question", "name": "¿El acompañante de una persona con discapacidad tiene algún descuento?", "acceptedAnswer": { "@type": "Answer", "text": "No, la persona acreditada puede adquirir solo una (1) entrada adicional para su acompañante, pero esta debe pagarse a precio regular." } },
        { "@type": "Question", "name": "¿BTS tendrá artistas invitados o teloneros en Lima?", "acceptedAnswer": { "@type": "Answer", "text": "No, BIGHIT MUSIC confirmó que la gira no cuenta con teloneros; los 7 miembros se presentarán en solitario." } },
        { "@type": "Question", "name": "¿A partir de qué fecha estuvo habilitado el pre-registro para la preventa en Perú?", "acceptedAnswer": { "@type": "Answer", "text": "El pre-registro obligatorio en Weverse se llevó a cabo del 27 de marzo al 2 de abril de 2026." } },
        { "@type": "Question", "name": "¿Quién organiza el evento a nivel regional?", "acceptedAnswer": { "@type": "Answer", "text": "La producción de la etapa sudamericana está a cargo de Live Nation Latin America." } }
    ];

    const chileFAQs = [
        { "@type": "Question", "name": "¿En qué estadio chileno se presentará el grupo?", "acceptedAnswer": { "@type": "Answer", "text": "Los tres conciertos de BTS se realizarán en el Estadio Nacional de Santiago." } },
        { "@type": "Question", "name": "¿Cuáles son los días exactos de los shows en Santiago?", "acceptedAnswer": { "@type": "Answer", "text": "BTS actuará los días 14, 16 y 17 de octubre de 2026." } },
        { "@type": "Question", "name": "¿Cuál es el rango de precios de los tickets en Chile?", "acceptedAnswer": { "@type": "Answer", "text": "Las entradas regulares oscilan entre USD $112 y USD $595." } },
        { "@type": "Question", "name": "¿Cuál es el valor del paquete VIP Soundcheck?", "acceptedAnswer": { "@type": "Answer", "text": "El codiciado paquete VIP en Chile tiene un precio de USD $760." } },
        { "@type": "Question", "name": "¿Qué empresa emite y gestiona las entradas en Santiago?", "acceptedAnswer": { "@type": "Answer", "text": "La venta es operada exclusivamente por Ticketmaster Chile." } },
        { "@type": "Question", "name": "¿A qué hora inició la venta general en el país?", "acceptedAnswer": { "@type": "Answer", "text": "La venta general y sin necesidad de membresía comenzó hoy, 10 de abril, a la 1:00 p.m. hora de Chile." } },
        { "@type": "Question", "name": "¿Se pudo elegir a Chile junto a otros países en el pre-registro?", "acceptedAnswer": { "@type": "Answer", "text": "Sí, el sistema de Weverse permitía a los fans seleccionar hasta tres ciudades de la gira durante su pre-registro." } },
        { "@type": "Question", "name": "¿El código de preventa aseguraba una entrada en el Estadio Nacional?", "acceptedAnswer": { "@type": "Answer", "text": "No. Recibir el código para la preventa ARMY garantizaba acceso a la fila virtual, pero las compras estaban sujetas al stock disponible." } },
        { "@type": "Question", "name": "¿Qué canciones de la nueva era se podrán escuchar?", "acceptedAnswer": { "@type": "Answer", "text": "Se espera que incluyan temas de su 5to álbum ARIRANG, que incluye canciones como 'Body to Body' y 'NORMAL'." } },
        { "@type": "Question", "name": "¿Recomiendan las agencias usar intermediarios para asegurar el boleto?", "acceptedAnswer": { "@type": "Answer", "text": "Absolutamente no. Se insta a usar solo plataformas autorizadas (Ticketmaster) para evitar los fraudes y estafas de reventa." } }
    ];

    const colombiaFAQs = [
        { "@type": "Question", "name": "¿Cuál es la importancia de las fechas de Bogotá en el tour?", "acceptedAnswer": { "@type": "Answer", "text": "Bogotá marca el inicio oficial del tramo sudamericano del ARIRANG World Tour." } },
        { "@type": "Question", "name": "¿Cuáles son las fechas confirmadas para Colombia?", "acceptedAnswer": { "@type": "Answer", "text": "La banda se presentará el 2 y 3 de octubre de 2026." } },
        { "@type": "Question", "name": "¿Se anunció una tercera fecha para Bogotá?", "acceptedAnswer": { "@type": "Answer", "text": "No, a diferencia de otros países, Colombia mantiene solo sus dos fechas originales." } },
        { "@type": "Question", "name": "¿En qué recinto se llevarán a cabo los shows?", "acceptedAnswer": { "@type": "Answer", "text": "Ambos conciertos se realizarán en el Estadio El Campín." } },
        { "@type": "Question", "name": "¿Cuál es el precio base y máximo de la boletería estándar?", "acceptedAnswer": { "@type": "Answer", "text": "Los boletos van desde los $300.000 hasta $1.081.000 pesos colombianos." } },
        { "@type": "Question", "name": "¿Qué costo tiene el pase más exclusivo (VIP)?", "acceptedAnswer": { "@type": "Answer", "text": "El paquete VIP para Bogotá alcanza los $2.953.000 pesos colombianos." } },
        { "@type": "Question", "name": "¿Dónde se deben comprar las entradas de manera oficial?", "acceptedAnswer": { "@type": "Answer", "text": "La única plataforma aprobada es Ticketmaster Colombia." } },
        { "@type": "Question", "name": "¿A qué hora se abrió la venta de entradas para el público general?", "acceptedAnswer": { "@type": "Answer", "text": "Arrancó hoy, 10 de abril de 2026, a las 10:00 a.m. hora local." } },
        { "@type": "Question", "name": "¿Están los 7 integrantes confirmados para el show en El Campín?", "acceptedAnswer": { "@type": "Answer", "text": "Sí, BIGHIT MUSIC confirmó que la gira marca el retorno oficial de los siete miembros juntos post-servicio militar." } },
        { "@type": "Question", "name": "¿Es obligatoria la ARMY Membership para la venta de hoy, 10 de abril?", "acceptedAnswer": { "@type": "Answer", "text": "No, la venta general está abierta para cualquier persona con tarjeta de crédito/débito habilitada hasta agotar existencias." } }
    ];

    const argentinaFAQs = [
        { "@type": "Question", "name": "¿Qué empresa está a cargo de la venta de entradas en Argentina?", "acceptedAnswer": { "@type": "Answer", "text": "En Argentina, la ticketera oficial es All Access, a diferencia del resto de la región que usa Ticketmaster." } },
        { "@type": "Question", "name": "¿En qué estadio tocará BTS?", "acceptedAnswer": { "@type": "Answer", "text": "Los shows se llevarán a cabo en el Estadio Único de La Plata (Provincia de Buenos Aires)." } },
        { "@type": "Question", "name": "¿Qué días se realizarán los conciertos en suelo argentino?", "acceptedAnswer": { "@type": "Answer", "text": "Las fechas oficiales son el 21, 23 y 24 de octubre de 2026." } },
        { "@type": "Question", "name": "¿Cuándo se sarana la fecha del 21 de octubre?", "acceptedAnswer": { "@type": "Answer", "text": "Fue anunciada el 8 de abril tras el masivo 'sold out' de la preventa inicial." } },
        { "@type": "Question", "name": "¿Cuánto cuestan las entradas generales en All Access?", "acceptedAnswer": { "@type": "Answer", "text": "Los valores oscilan entre USD $163 y USD $308 (sin sumar el costo por servicio)." } },
        { "@type": "Question", "name": "¿Ya se conoce el precio del paquete VIP en Argentina?", "acceptedAnswer": { "@type": "Answer", "text": "Hasta el momento del inicio de ventas, el costo exacto del paquete VIP no había sido revelado públicamente en los comunicados de prensa." } },
        { "@type": "Question", "name": "¿A qué hora arranca la venta general en All Access?", "acceptedAnswer": { "@type": "Answer", "text": "La venta al público en general inicia el viernes 10 de abril a las 10:00 a.m. hora argentina." } },
        { "@type": "Question", "name": "¿BTS tendrá actos de apertura nacionales en La Plata?", "acceptedAnswer": { "@type": "Answer", "text": "No, la gira internacional ARIRANG es un show exclusivo del grupo sin artistas de soporte." } },
        { "@type": "Question", "name": "¿Qué temática aborda la gira ARIRANG?", "acceptedAnswer": { "@type": "Answer", "text": "Promociona el disco homónimo que encapsula la identidad coreana, la nostalgia por los escenarios y el amor incondicional a ARMY." } },
        { "@type": "Question", "name": "¿Cómo se avisaba del acceso a la preventa para los fans argentinos?", "acceptedAnswer": { "@type": "Answer", "text": "Los códigos únicos eran enviados por Weverse unas 48 horas antes del inicio de la preventa a los seleccionados." } }
    ];

    const brasilFAQs = [
        { "@type": "Question", "name": "¿Qué lugar ocupa São Paulo en el calendario del tour?", "acceptedAnswer": { "@type": "Answer", "text": "São Paulo es la gran clausura de la etapa latinoamericana del ARIRANG World Tour." } },
        { "@type": "Question", "name": "¿Cuáles son las fechas de cierre en Brasil?", "acceptedAnswer": { "@type": "Answer", "text": "Las presentaciones serán los días 28, 30 y 31 de octubre de 2026." } },
        { "@type": "Question", "name": "¿En qué estadio brasileño actuará el septeto?", "acceptedAnswer": { "@type": "Answer", "text": "En el icónico Estádio do MorumBIS." } },
        { "@type": "Question", "name": "¿Quién administra las ventas de boletos en Brasil?", "acceptedAnswer": { "@type": "Answer", "text": "Las entradas se venden exclusivamente a través de Ticketmaster Brasil." } },
        { "@type": "Question", "name": "¿A qué hora comenzó la venta general para los shows paulistas?", "acceptedAnswer": { "@type": "Answer", "text": "A las 10:00 a.m. (horario de Brasilia) del 10 de abril." } },
        { "@type": "Question", "name": "¿Cuándo se abrió la preventa para la última fecha agregada (31 de octubre)?", "acceptedAnswer": { "@type": "Answer", "text": "Inició el 8 de abril a las 10:00 a.m. para aquellos con código de pre-registro." } },
        { "@type": "Question", "name": "¿Cuántos conciertos dará BTS en Latinoamérica en total?", "acceptedAnswer": { "@type": "Answer", "text": "La gira incluye un total de 14 impresionantes shows repartidos en cinco países sudamericanos." } },
        { "@type": "Question", "name": "¿Es válido presentar boletos de revendedores no oficiales en el MorumBIS?", "acceptedAnswer": { "@type": "Answer", "text": "No, los organizadores enfatizan que los boletos digitales tienen sistemas antifraude y podrían ser denegados si se compran por fuera de Ticketmaster." } },
        { "@type": "Question", "name": "¿Podrán escucharse las sub-unidades en esta gira?", "acceptedAnswer": { "@type": "Answer", "text": "Si bien el setlist es sorpresa, miembros como Jimin y Jung Kook han participado ampliamente en temas como 'Into the Sun' y 'Hooligan', que se perfilan para sonar en vivo." } },
        { "@type": "Question", "name": "¿Continúa el tour luego de Brasil?", "acceptedAnswer": { "@type": "Answer", "text": "Sí, en noviembre de 2026 la gira cruza hacia Asia Oriental y el Sudeste Asiático antes de pasar a Oceanía en 2027." } }
    ];

    let countryFAQs = [{
        "@type": "Question",
        "name": isBrazil ? "Como funciona o processo de compra segura com a RaveHub?" : "¿Cómo es el proceso de compra segura con RaveHub?",
        "acceptedAnswer": {
            "@type": "Answer",
            "text": isBrazil
                ? "Nosso processo de Compra Segura utiliza tecnologia antifraude e verificação de três etapas para garantir que cada fã tenha acesso legítimo aos seus ingressos, eliminando a incerteza do mercado secundário."
                : "Nuestro proceso de Compra Segura utiliza tecnología anti-fraude y verificación de tres pasos para asegurar que cada fan tenga acceso legítimo a sus entradas, eliminando la incertidumbre del mercado secundario."
        }
    }];
    if (country.id === 'peru') countryFAQs = peruFAQs;
    else if (country.id === 'chile') countryFAQs = chileFAQs;
    else if (country.id === 'colombia') countryFAQs = colombiaFAQs;
    else if (country.id === 'argentina') countryFAQs = argentinaFAQs;
    else if (country.id === 'brasil') countryFAQs = brasilFAQs;

    const faqLdFinal = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": countryFAQs
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLdFinal) }}
            />
            <CountryClient country={country} />
        </>
    );
}
