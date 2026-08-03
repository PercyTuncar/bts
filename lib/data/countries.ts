export interface Pricing {
    zone: string;
    price: number;
    color?: string;
    description?: string;
    soldOut?: boolean;
    stock?: number; // max available quantity (undefined = unlimited)
    progressOffsetHours?: number; // offset en horas para llegar al 100%
}

export interface CountryData {
    id: string; // URL param (slug)
    name: string;
    flag: string;
    venue: string;
    city: string;
    isoCode: string; // for JSON-LD addressCountry
    dates: string[]; // ISO format YYYY-MM-DD
    ticketDate: string;
    currency: string;
    currencySymbol: string;
    prices: Pricing[];
    description: string;
    openGraphImage: string;
    whatsappLink: string;
    phoneCode: string;
    progressOffsetHours?: number; // offset to stagger progress end time (hours)
    allowInstallments?: boolean; // Optional flag to disable installments
}

export const COLOMBIA_WHATSAPP_LINK = 'https://chat.whatsapp.com/Fv8xuLI01pSGKmeEPf61X4';

export const WHATSAPP_COUNTRY_FALLBACK_ORDER = [
    'peru',
    'chile',
    'argentina',
    'colombia',
    'brasil',
    'madrid',
    'mexico',
] as const;

export const countries: CountryData[] = [
    {
        id: 'madrid',
        name: 'España',
        flag: '🇪🇸',
        venue: 'Riyadh Air Metropolitano',
        city: 'Madrid',
        isoCode: 'ES',
        dates: ['2026-06-26', '2026-06-27'],
        ticketDate: '1 de Marzo',
        currency: 'EUR',
        currencySymbol: '€',
        // Evento finalizado (26 jun 2026, hoy es 2 ago 2026)
        prices: [
            { zone: 'Sección 225 - Nivel 200', price: 499, description: 'Vista privilegiada del escenario principal', soldOut: true },
            { zone: 'Sección 226 - Nivel 200', price: 499, description: 'Vista privilegiada del escenario principal', soldOut: true },
        ],
        description: 'Madrid, prepárate. BTS llega al Metropolitano para dos noches inolvidables en España.',
        openGraphImage: '/images/bts-madrid-mapa.png', // Using the map as OG image for now, or specific one
        whatsappLink: 'https://chat.whatsapp.com/IMdV6Zi6xLkH457GgJ5VO6',
        phoneCode: '+34',
        progressOffsetHours: 0,
        allowInstallments: false
    },
    {
        id: 'peru',
        name: 'Perú',
        flag: '🇵🇪',
        venue: 'Estadio San Marcos',
        city: 'Lima',
        isoCode: 'PE',
        dates: ['2026-10-07', '2026-10-09', '2026-10-10'],
        ticketDate: '07 de Abril, 10:00 AM',
        currency: 'PEN',
        currencySymbol: 'S/',
        prices: [
            { zone: 'CAMPO', price: 2399, progressOffsetHours: 0 },
            { zone: 'TRIBUNA OCCIDENTE', price: 1999, description: '', progressOffsetHours: 4 },
            { zone: 'TRIBUNA ORIENTE', price: 1999, description: '', progressOffsetHours: 8 },
            { zone: 'TRIBUNA NORTE', price: 1449, description: '', progressOffsetHours: 12 },
            { zone: 'TRIBUNA SUR', price: 590, description: '', soldOut: true, progressOffsetHours: 16 },
        ],
        description: 'Lima, prepárate para el océano púrpura. BTS regresa al Estadio San Marcos para dos noches históricas.',
        openGraphImage: '/images/og-peru.jpg',
        whatsappLink: 'https://chat.whatsapp.com/HXqzQToJt3O0TmjaNTOq3K',
        phoneCode: '+51'
        ,progressOffsetHours: -25
    },
    {
        id: 'chile',
        name: 'Chile',
        flag: '🇨🇱',
        venue: 'Estadio Nacional Julio Martínez Prádanos',
        city: 'Santiago',
        isoCode: 'CL',
        dates: ['2026-10-14', '2026-10-16', '2026-10-17'],
        ticketDate: '24 de Enero',
        currency: 'USD',
        currencySymbol: '$',
        prices: [
            { zone: 'Pacífico Medio', price: 1784, stock: 5 },
            { zone: 'Cancha Pacífico', price: 991, stock: 8 },
            { zone: 'Cancha Andes', price: 949, stock: 1 },
            { zone: 'Pacífico Alto', price: 892, soldOut: true },
            { zone: 'Pacífico Bajo', price: 734, soldOut: true },
            { zone: 'Movilidad Reducida', price: 734, soldOut: true },
            { zone: 'Andes Bajo Centro', price: 615, soldOut: true },
            { zone: 'Andes Bajo Norte', price: 555, soldOut: true },
            { zone: 'Andes Bajo Sur', price: 555, soldOut: true },
            { zone: 'Andes Alto Centro', price: 535, soldOut: true },
            { zone: 'Andes Alto Norte', price: 496, soldOut: true },
            { zone: 'Andes Alto Sur', price: 496, soldOut: true },
            { zone: 'Galería Norte', price: 377, soldOut: true },
            { zone: 'Galería Sur', price: 377, soldOut: true },
            { zone: 'Pacífico Lateral Norte', price: 299, soldOut: true },
            { zone: 'Pacífico Lateral Sur', price: 299, soldOut: true },
        ],
        description: 'Santiago, el momento ha llegado. Vive la magia de BTS en el Estadio Nacional.',
        openGraphImage: '/images/og-chile.jpg',
        whatsappLink: 'https://chat.whatsapp.com/K6U3hon8yCK3b5ZiC4Phlp',
        phoneCode: '+56'
        ,progressOffsetHours: 1
    },
    {
        id: 'mexico',
        name: 'México',
        flag: '🇲🇽',
        venue: 'Estadio GNP Seguros',
        city: 'Ciudad de México',
        isoCode: 'MX',
        dates: ['2026-05-07', '2026-05-09', '2026-05-10'],
        ticketDate: '26 de Enero',
        currency: 'MXN',
        currencySymbol: '$',
        // Evento finalizado (7 may 2026, hoy es 2 ago 2026)
        prices: [
            {
                zone: 'VIP',
                price: 53346,
                color: 'N/A',
                description: 'Paquete más exclusivo (detalles por confirmar).',
                soldOut: true
            },
            {
                zone: 'Platino',
                price: 39990,
                color: '🟦 Azul / ⬜ Gris',
                description: 'Asientos a nivel de cancha, lo más cerca al escenario (Secciones A y B).',
                soldOut: true
            },
            {
                zone: 'Verde A',
                price: 26859,
                color: '🟩 Verde',
                description: 'Grada baja, mejor vista frontal/lateral.',
                soldOut: true
            },
            {
                zone: 'Naranja A',
                price: 25446,
                color: '🟧 Naranja Oscuro',
                description: 'Grada baja, vista lateral.',
                soldOut: true
            },
            {
                zone: 'Verde B',
                price: 24030,
                color: '🟩 Verde',
                description: 'Grada nivel medio (arriba de Verde A).',
                soldOut: true
            },
            {
                zone: 'Naranja B',
                price: 14844,
                color: '🔸 Naranja Claro',
                description: 'Grada nivel medio, vista lateral.',
                soldOut: true
            },
            {
                zone: 'Verde C',
                price: 13428,
                color: '🟩 Verde',
                description: 'Grada nivel alto (arriba de Verde B).',
                soldOut: true
            },
            {
                zone: 'Naranja C',
                price: 8520,
                color: '🍑 Salmón / Naranja',
                description: 'Grada nivel alto, vista lateral (parte superior del mapa).',
                soldOut: true
            },
            {
                zone: 'Rosa',
                price: 5301,
                color: '🩷 Rosa',
                description: 'Grada más alta, más económica, vista panorámica del estadio.',
                soldOut: true
            }
        ],
        description: '¡Hola México! BTS llega al coloso de Santa Úrsula para tres fechas inolvidables.',
        openGraphImage: '/images/og-mexico.jpg',
        whatsappLink: 'https://chat.whatsapp.com/EFrLmodESBhDBkwx2BH9lb',
        phoneCode: '+52'
        ,progressOffsetHours: 0
    },
    {
        id: 'colombia',
        name: 'Colombia',
        flag: '🇨🇴',
        venue: 'Estadio Nemesio Camacho El Campín',
        city: 'Bogotá',
        isoCode: 'CO',
        dates: ['2026-10-02', '2026-10-03'],
        ticketDate: '28 de Enero',
        currency: 'USD',
        currencySymbol: '$',
        prices: [
            { zone: 'Sur Baja', price: 249 },
            { zone: 'Oriental Norte Baja', price: 249 },
            { zone: 'Norte Baja', price: 249 },
            { zone: 'Oriental Sur Alta', price: 328 },
            { zone: 'Sur Alta', price: 328 },
            { zone: 'Oriental Norte Alta', price: 328 },
            { zone: 'Norte Alta', price: 328 },
            { zone: 'Oriental Alta', price: 487 },
            { zone: 'Occidental Alta', price: 548 },
            { zone: 'Oriental Baja', price: 797 },
            { zone: 'Occidental Baja', price: 836 },
            { zone: 'VIP', price: 896 },
            { zone: 'Paquete VIP | Sound Check', price: 2448 },
        ],
        description: 'Bogotá se viste de morado. No te pierdas el regreso de BTS a Colombia.',
        openGraphImage: '/images/og-colombia.jpg',
        whatsappLink: COLOMBIA_WHATSAPP_LINK,
        phoneCode: '+57'
        ,progressOffsetHours: -2
    },
    {
        id: 'argentina',
        name: 'Argentina',
        flag: '🇦🇷',
        venue: 'Estadio Único de La Plata',
        city: 'La Plata',
        isoCode: 'AR',
        dates: ['2026-10-21', '2026-10-23', '2026-10-24'],
        ticketDate: 'Próximamente',
        currency: 'USD',
        currencySymbol: '$',
        prices: [
            { zone: 'CABECERA NORTE y SUR', price: 399 },
            { zone: 'CAMPO', price: 760 },
            { zone: 'PLATEA A y B', price: 847 },
            { zone: 'PLATEA PREFERENCIAL A y B', price: 922 },
        ],
        description: 'Argentina recibe a BTS en el Estadio Único de La Plata con preventa y zonas oficiales para el Army.',
        openGraphImage: '/images/og-argentina.jpg',
        whatsappLink: 'https://chat.whatsapp.com/JLfc5fTo6PIIF1Sq0P2cz1',
        phoneCode: '+54'
        ,progressOffsetHours: 2
    },
    {
        id: 'brasil',
        name: 'Brasil',
        flag: '🇧🇷',
        venue: 'Estádio do MorumBIS',
        city: 'São Paulo',
        isoCode: 'BR',
        dates: ['2026-10-28', '2026-10-30', '2026-10-31'],
        ticketDate: 'Em Breve',
        currency: 'USD',
        currencySymbol: '$',
        prices: [
            { zone: 'Paquete VIP Soundcheck (Inteira)', price: 1195.55 },
            { zone: 'Paquete VIP Soundcheck (Meia)', price: 1072.74 },
            { zone: 'Pista (Inteira)', price: 595.63 },
            { zone: 'Pista (Meia-Entrada)', price: 472.81 },
        ],
        description: 'O show será no Estádio do MorumBIS, em São Paulo. BTS WORLD TOUR "ARIRANG" 2026.',
        openGraphImage: '/images/og-brasil.jpg',
        whatsappLink: 'https://chat.whatsapp.com/GhPZqrMrZ70BPy8mO2MQ05',
        phoneCode: '+55'
        ,progressOffsetHours: 3
    }
];

export function getCountryByIsoCode(countryCode?: string) {
    if (!countryCode) {
        return undefined;
    }

    const normalizedCountryCode = countryCode.trim().toUpperCase();
    return countries.find((country) => country.isoCode === normalizedCountryCode);
}

export function getCountryIdFromPathname(pathname?: string | null) {
    const routeCountryId = pathname?.split('/').filter(Boolean)[0];

    if (!routeCountryId) {
        return undefined;
    }

    return countries.some((country) => country.id === routeCountryId)
        ? routeCountryId
        : undefined;
}

export function getOrderedWhatsappCountries({
    pathname,
    userCountryCode,
}: {
    pathname?: string | null;
    userCountryCode?: string;
}) {
    const detectedCountryId = getCountryByIsoCode(userCountryCode)?.id;
    const routeCountryId = getCountryIdFromPathname(pathname);
    const orderedIds = Array.from(
        new Set([
            detectedCountryId,
            routeCountryId,
            ...WHATSAPP_COUNTRY_FALLBACK_ORDER,
        ].filter((countryId): countryId is string => Boolean(countryId)))
    );
    const countryPriority = new Map(orderedIds.map((countryId, index) => [countryId, index]));

    return countries.slice().sort((firstCountry, secondCountry) => {
        const firstPriority = countryPriority.get(firstCountry.id) ?? Number.MAX_SAFE_INTEGER;
        const secondPriority = countryPriority.get(secondCountry.id) ?? Number.MAX_SAFE_INTEGER;

        if (firstPriority !== secondPriority) {
            return firstPriority - secondPriority;
        }

        return firstCountry.name.localeCompare(secondCountry.name, 'es');
    });
}
