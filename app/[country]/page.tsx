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
        { "@type": "Question", "name": "¿Cuáles son las fechas exactas del concierto en Lima?", "acceptedAnswer": { "@type": "Answer", "text": "Las fechas oficiales son el 9 y 10 de octubre de 2026. Due to high demand, se añadió una nueva fecha para el 7 de octubre." } },
        { "@type": "Question", "name": "¿Cuándo inicia la venta de entradas general?", "acceptedAnswer": { "@type": "Answer", "text": "La venta general inicia el viernes 10 de abril a las 10:00 a.m. (hora de Perú)." } },
        { "@type": "Question", "name": "¿Cuándo es la preventa para la nueva fecha del 7 de octubre?", "acceptedAnswer": { "@type": "Answer", "text": "La preventa ARMY para el stock de boletos de esta nueva fecha inicia hoy, 8 de abril, a las 10:00 a.m." } },
        { "@type": "Question", "name": "¿Qué requisitos necesito para entrar a la preventa?", "acceptedAnswer": { "@type": "Answer", "text": "Es indispensable contar con la ARMY Membership activa en Weverse Shop y haber realizado el pre-registro obligatorio entre el 27 de marzo y el 2 de abril." } },
        { "@type": "Question", "name": "¿Cuáles son los precios reales?", "acceptedAnswer": { "@type": "Answer", "text": "Los rangos varían por zona. Por ejemplo: Campo VIP S/2,299, Tribunas Occidente/Oriente S/1,999, y Tribunas Norte/Sur S/1,449." } },
        { "@type": "Question", "name": "¿Cuáles son las zonas numeradas?", "acceptedAnswer": { "@type": "Answer", "text": "Las tribunas Occidente, Oriente y Sur son sectores numerados. Campo y Tribuna Norte son por orden de llegada." } },
        { "@type": "Question", "name": "¿Cuántas entradas puedo comprar por persona?", "acceptedAnswer": { "@type": "Answer", "text": "El límite establecido es de un máximo de 4 entradas por usuario registrado y tarjeta." } },
        { "@type": "Question", "name": "¿Las entradas son nominativas?", "acceptedAnswer": { "@type": "Answer", "text": "Sí, para evitar la reventa, las entradas deben estar a nombre del asistente y se verificará el DNI al ingresar." } },
        { "@type": "Question", "name": "¿Desde qué edad se puede ingresar?", "acceptedAnswer": { "@type": "Answer", "text": "Se permite el ingreso a partir de los 7 años. Los menores de 14 años deben asistir acompañados de un adulto responsable." } },
        { "@type": "Question", "name": "¿Qué incluye el acceso VIP?", "acceptedAnswer": { "@type": "Answer", "text": "Los boletos de categoría VIP incluyen acceso anticipado al recinto y, en paquetes premium, acceso al Soundcheck." } }
    ];

    const chileFAQs = [
        { "@type": "Question", "name": "¿En qué fechas se presenta BTS en Santiago?", "acceptedAnswer": { "@type": "Answer", "text": "Los conciertos están programados para el 16 y 17 de octubre de 2026. Se añadió una fecha extra para el 14 de octubre." } },
        { "@type": "Question", "name": "¿A qué hora exacta comienza la venta general?", "acceptedAnswer": { "@type": "Answer", "text": "En Chile la venta general comenzará el 10 de abril a la 1:00 p.m. (hora de Chile)." } },
        { "@type": "Question", "name": "¿Cuándo se pueden comprar entradas para la nueva fecha (14 de octubre)?", "acceptedAnswer": { "@type": "Answer", "text": "La preventa Weverse para la fecha adicional empieza hoy, 8 de abril a la 1:00 p.m." } },
        { "@type": "Question", "name": "¿Cómo funcionará la fila virtual?", "acceptedAnswer": { "@type": "Answer", "text": "Se abrirá una sala de espera minutos antes. A la hora exacta, el sistema asignará un número aleatorio a cada usuario." } },
        { "@type": "Question", "name": "¿Cuáles son las localidades disponibles en el Nacional?", "acceptedAnswer": { "@type": "Answer", "text": "Se dividen principalmente en Cancha VIP, Pacífico (numerado), Andes (numerado), Cancha General y Galería." } },
        { "@type": "Question", "name": "¿Pueden ingresar menores de edad a Cancha VIP?", "acceptedAnswer": { "@type": "Answer", "text": "Por seguridad normativa, suele haber restricción de edad (+12 o +14 años) para zonas de cancha." } },
        { "@type": "Question", "name": "¿Se puede pagar con CuentaRUT o tarjetas de débito?", "acceptedAnswer": { "@type": "Answer", "text": "Sí, las plataformas oficiales permiten el pago con tarjetas de crédito y débito habilitadas para Webpay." } },
        { "@type": "Question", "name": "¿El estadio cuenta con accesibilidad para sillas de ruedas?", "acceptedAnswer": { "@type": "Answer", "text": "Sí, el Estadio Nacional cuenta con zonas designadas para sillas de ruedas." } },
        { "@type": "Question", "name": "¿Se puede transferir una entrada si no puedo asistir?", "acceptedAnswer": { "@type": "Answer", "text": "Las políticas permiten renombrar la entrada hasta semanas antes del evento." } },
        { "@type": "Question", "name": "¿Habrá descuentos con tarjetas bancarias chilenas?", "acceptedAnswer": { "@type": "Answer", "text": "Hasta el momento no se han anunciado alianzas para descuentos bancarios." } }
    ];

    const colombiaFAQs = [
        { "@type": "Question", "name": "¿Qué días estará BTS en Bogotá?", "acceptedAnswer": { "@type": "Answer", "text": "El inicio de la gira latinoamericana será en Colombia los días 2 y 3 de octubre de 2026." } },
        { "@type": "Question", "name": "¿Por qué no agregaron una tercera fecha en Bogotá?", "acceptedAnswer": { "@type": "Answer", "text": "La organización basó la apertura de nuevas fechas en el volumen de demanda. Colombia mantiene dos fechas confirmadas." } },
        { "@type": "Question", "name": "¿Cuál es la plataforma oficial de venta?", "acceptedAnswer": { "@type": "Answer", "text": "En Colombia, la boletería oficial está a cargo de Ticketmaster." } },
        { "@type": "Question", "name": "¿Cuándo comienza la venta al público general?", "acceptedAnswer": { "@type": "Answer", "text": "El 10 de abril a las 10:00 a.m. (hora de Colombia) hasta agotar existencias." } },
        { "@type": "Question", "name": "¿Cuántas boletas quedaron para la venta general?", "acceptedAnswer": { "@type": "Answer", "text": "Ticketmaster dispose del 90% del aforo en preventa. La venta general cuenta con el 10% restante." } },
        { "@type": "Question", "name": "¿Se puede pagar en cuotas?", "acceptedAnswer": { "@type": "Answer", "text": "Dependerá de las políticas de tu banco emisor en la pasarela de Ticketmaster." } },
        { "@type": "Question", "name": "¿Cuál es la edad mínima de ingreso permitida?", "acceptedAnswer": { "@type": "Answer", "text": "En El Campín, las localidades de Cancha/Pista exigen ser mayor de 14 años." } },
        { "@type": "Question", "name": "¿Las boletas son físicas o digitales?", "acceptedAnswer": { "@type": "Answer", "text": "Ticketmaster Colombia emite boletos digitales (Safetix) en la app móvil." } },
        { "@type": "Question", "name": "¿Hay localidades libres de alcohol?", "acceptedAnswer": { "@type": "Answer", "text": "Por normativa, ciertas tribunas familiares son zonas libres de alcohol." } },
        { "@type": "Question", "name": "¿Es válido comprar a revendedores fuera del estadio?", "acceptedAnswer": { "@type": "Answer", "text": "No. La tecnología de boletos digitales hace que los pantallazos no sirvan para ingresar." } }
    ];

    const argentinaFAQs = [
        { "@type": "Question", "name": "¿Cuándo tocará BTS en Buenos Aires?", "acceptedAnswer": { "@type": "Answer", "text": "Las fechas oficiales son el 23 y 24 de octubre de 2026. Se añadió el 21 de octubre." } },
        { "@type": "Question", "name": "¿A qué hora abre la preventa para la tercera fecha?", "acceptedAnswer": { "@type": "Answer", "text": "Empieza hoy, 8 de abril a las 10:00 a.m. (hora de Argentina) exclusivamente para miembros con registro previo." } },
        { "@type": "Question", "name": "¿Cuándo abre la venta general en Argentina?", "acceptedAnswer": { "@type": "Answer", "text": "El viernes 10 de abril a las 10:00 a.m. (hora de Argentina)." } },
        { "@type": "Question", "name": "¿El precio de la entrada se ajusta por inflación?", "acceptedAnswer": { "@type": "Answer", "text": "Los precios se fijan en pesos argentinos. Una vez efectuada la compra, el precio se congela." } },
        { "@type": "Question", "name": "¿Existen opciones de compra en cuotas sin interés?", "acceptedAnswer": { "@type": "Answer", "text": "Frecuentemente hay convenios con bancos para ofrecer 3 o 6 cuotas sin interés." } },
        { "@type": "Question", "name": "¿Debo retirar las entradas físicamente?", "acceptedAnswer": { "@type": "Answer", "text": "Se usan Smart Tickets digitales a través de apps como Quentro." } },
        { "@type": "Question", "name": "¿Cómo conviene llegar al Estadio Único?", "acceptedAnswer": { "@type": "Answer", "text": "Ubicado en La Plata (60km de CABA), se recomienda traslados especiales o Tren Roca." } },
        { "@type": "Question", "name": "¿Las entradas de Campo son numeradas?", "acceptedAnswer": { "@type": "Answer", "text": "El Campo es de pie y por orden de llegada. Solo las plateas laterales son numeradas." } },
        { "@type": "Question", "name": "¿Cuál es la restricción de compra por persona?", "acceptedAnswer": { "@type": "Answer", "text": "El límite es de 4 tickets por DNI/usuario." } },
        { "@type": "Question", "name": "¿Desde qué edad pagan entrada los niños?", "acceptedAnswer": { "@type": "Answer", "text": "Todo niño a partir de los 3 años abona entrada completa y debe ir con un mayor." } }
    ];

    const brasilFAQs = [
        { "@type": "Question", "name": "Quais são as datas de encerramento da turnê em São Paulo?", "acceptedAnswer": { "@type": "Answer", "text": "Os shows nos dias 28 e 30 de outubro. O dia 31 foi adicionado como data final." } },
        { "@type": "Question", "name": "Quando começam as vendas para a última data (31 de out)?", "acceptedAnswer": { "@type": "Answer", "text": "A pré-venda ARMY começa hoje, 8 de abril, às 10h00 (horário de Brasília)." } },
        { "@type": "Question", "name": "A que horas é a venda geral no Brasil?", "acceptedAnswer": { "@type": "Answer", "text": "No dia 10 de abril às 10h00 através da plataforma oficial." } },
        { "@type": "Question", "name": "O que é o benefício da 'Meia-entrada'?", "acceptedAnswer": { "@type": "Answer", "text": "Lei federal que garante 50% de desconto para estudantes, idosos e jovens de baixa renda." } },
        { "@type": "Question", "name": "Quantos ingressos de 'Meia-entrada' posso comprar?", "acceptedAnswer": { "@type": "Answer", "text": "Apenas 1 por CPF, pois o benefício é pessoal e intransferível." } },
        { "@type": "Question", "name": "Existe limite de capacidade para as meias-entradas?", "acceptedAnswer": { "@type": "Answer", "text": "Sim, 40% da capacidade de cada setor é destinada aos beneficiários." } },
        { "@type": "Question", "name": "É possível pagar com PIX?", "acceptedAnswer": { "@type": "Answer", "text": "Sim, além de cartões de crédito." } },
        { "@type": "Question", "name": "Como estão divididos os setores no MorumBIS?", "acceptedAnswer": { "@type": "Answer", "text": "Pista Premium, Pista Comum, Cadeira Inferior, Cadeira Superior e Arquibancada." } },
        { "@type": "Question", "name": "Estrangeiros podem comprar ingressos no Brasil?", "acceptedAnswer": { "@type": "Answer", "text": "Sim, usando número do Passaporte em vez do CPF." } },
        { "@type": "Question", "name": "Qual é a classificação etária?", "acceptedAnswer": { "@type": "Answer", "text": "Menores de 15/16 anos só podem entrar acompanhados por responsável legal." } }
    ];

    let countryFAQs = faqLd.mainEntity;
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
