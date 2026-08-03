// Rich venue + event metadata per country, used to build accurate Event JSON-LD.
// Coordinates, addresses and timezone offsets are verified per real-world venue.

export interface VenueMeta {
    venueName: string;
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    latitude: number;
    longitude: number;
    sameAs: string; // Wikipedia URL of the actual venue
    tzOffset: string; // ISO offset valid for the concert month, e.g. "-05:00"
    // organizerName/organizerUrl are kept as reference data only (real venue
    // operators/promoters) but are intentionally NOT emitted as the
    // `organizer` field in MusicEvent JSON-LD: Google only requires
    // location/name/startDate, organizer is optional, and RaveHub Latam
    // (this site's operator) is not the real event organizer either — its
    // identity is correctly declared via `seller` on each Offer instead.
    organizerName: string;
    organizerUrl: string;
    saleStart: string; // YYYY-MM-DD when public sale opened (for validFrom)
    doorsHour: string; // local start time HH:mm
    endHour: string; // local end time HH:mm
}

// Spanish / Portuguese month names for building human-readable event names.
export const MONTHS_ES = [
    'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
    'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre',
];

export const MONTHS_PT = [
    'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
    'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro',
];

export const VENUE_META: Record<string, VenueMeta> = {
    peru: {
        venueName: 'Estadio San Marcos',
        streetAddress: 'Av. Venezuela cuadra 34, Ciudad Universitaria UNMSM',
        addressLocality: 'Lima',
        addressRegion: 'Lima',
        postalCode: '15081',
        latitude: -12.0577,
        longitude: -77.0851,
        sameAs: 'https://es.wikipedia.org/wiki/Estadio_Monumental_de_la_Universidad_Nacional_Mayor_de_San_Marcos',
        tzOffset: '-05:00',
        organizerName: 'Live Nation Latin America',
        organizerUrl: 'https://www.livenation.lat',
        saleStart: '2026-04-07',
        doorsHour: '20:00',
        endHour: '23:00',
    },
    chile: {
        venueName: 'Estadio Nacional Julio Martínez Prádanos',
        streetAddress: 'Av. Grecia 2001, Ñuñoa',
        addressLocality: 'Santiago',
        addressRegion: 'Región Metropolitana',
        postalCode: '7790715',
        latitude: -33.4644,
        longitude: -70.6109,
        sameAs: 'https://es.wikipedia.org/wiki/Estadio_Nacional_Julio_Mart%C3%ADnez_Pr%C3%A1danos',
        tzOffset: '-03:00',
        organizerName: 'Live Nation Chile',
        organizerUrl: 'https://www.livenation.lat',
        saleStart: '2026-04-10',
        doorsHour: '20:00',
        endHour: '23:00',
    },
    mexico: {
        venueName: 'Estadio GNP Seguros',
        streetAddress: 'Av. Viaducto Río de la Piedad s/n, Granjas México, Iztacalco',
        addressLocality: 'Ciudad de México',
        addressRegion: 'Ciudad de México',
        postalCode: '08400',
        latitude: 19.4045,
        longitude: -99.0907,
        sameAs: 'https://es.wikipedia.org/wiki/Foro_Sol',
        tzOffset: '-06:00',
        organizerName: 'OCESA / Live Nation',
        organizerUrl: 'https://www.ocesa.com.mx',
        saleStart: '2026-01-26',
        doorsHour: '20:30',
        endHour: '23:30',
    },
    colombia: {
        venueName: 'Estadio Nemesio Camacho El Campín',
        streetAddress: 'Carrera 30 No. 57-60',
        addressLocality: 'Bogotá',
        addressRegion: 'Bogotá D.C.',
        postalCode: '111321',
        latitude: 4.6459,
        longitude: -74.0778,
        sameAs: 'https://es.wikipedia.org/wiki/Estadio_Nemesio_Camacho_El_Camp%C3%ADn',
        tzOffset: '-05:00',
        organizerName: 'Live Nation Colombia',
        organizerUrl: 'https://www.livenation.lat',
        saleStart: '2026-01-28',
        doorsHour: '20:00',
        endHour: '23:00',
    },
    argentina: {
        venueName: 'Estadio Único Diego Armando Maradona de La Plata',
        streetAddress: 'Av. 25 y 32',
        addressLocality: 'La Plata',
        addressRegion: 'Buenos Aires',
        postalCode: 'B1900',
        latitude: -34.9127,
        longitude: -57.9527,
        sameAs: 'https://es.wikipedia.org/wiki/Estadio_%C3%9Anico_de_La_Plata',
        tzOffset: '-03:00',
        organizerName: 'DF Entertainment',
        organizerUrl: 'https://www.dfentertainment.com',
        saleStart: '2026-04-10',
        doorsHour: '20:00',
        endHour: '23:00',
    },
    brasil: {
        venueName: 'Estádio do MorumBIS',
        streetAddress: 'Praça Roberto Gomes Pedrosa, 1, Morumbi',
        addressLocality: 'São Paulo',
        addressRegion: 'São Paulo',
        postalCode: '05653-070',
        latitude: -23.6003,
        longitude: -46.7220,
        sameAs: 'https://pt.wikipedia.org/wiki/Est%C3%A1dio_do_Morumbi',
        tzOffset: '-03:00',
        organizerName: 'Live Nation Brasil',
        organizerUrl: 'https://www.livenation.com.br',
        saleStart: '2026-04-10',
        doorsHour: '20:00',
        endHour: '23:00',
    },
    madrid: {
        venueName: 'Riyadh Air Metropolitano',
        streetAddress: 'Av. de Luis Aragonés 4',
        addressLocality: 'Madrid',
        addressRegion: 'Comunidad de Madrid',
        postalCode: '28022',
        latitude: 40.4362,
        longitude: -3.5995,
        sameAs: 'https://es.wikipedia.org/wiki/Riyadh_Air_Metropolitano',
        tzOffset: '+02:00',
        organizerName: 'Live Nation España',
        organizerUrl: 'https://www.livenation.es',
        saleStart: '2026-03-01',
        doorsHour: '20:00',
        endHour: '23:00',
    },
};
