export interface Pricing {
    zone: string;
    price: number;
    color?: string;
    description?: string;
    soldOut?: boolean;
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

export const COLOMBIA_WHATSAPP_LINK = 'https://chat.whatsapp.com/HPqZ2Jnnp9HFcCyecNFktD?mode=gi_t';

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
        venue: 'Riyadh Air Metropolitano (Metropolitano Stadium)',
        city: 'Madrid',
        isoCode: 'ES',
        dates: ['2026-06-26', '2026-06-27'],
        ticketDate: '1 de Marzo', // Placeholder or as needed
        currency: 'EUR',
        currencySymbol: '€',
        prices: [
            { zone: 'Sección 225 - Nivel 200', price: 499, description: 'Vista privilegiada del escenario principal' },
            { zone: 'Sección 226 - Nivel 200', price: 499, description: 'Vista privilegiada del escenario principal' },
        ],
        description: 'Madrid, prepárate. BTS llega al Metropolitano para dos noches inolvidables en España.',
        openGraphImage: '/images/bts-madrid-mapa.png', // Using the map as OG image for now, or specific one
        whatsappLink: 'https://chat.whatsapp.com/KNrgh0kSWnVDTXdB5p62MA?mode=gi_t',
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
            { zone: 'CAMPO', price: 2299, progressOffsetHours: 0 },
            { zone: 'TRIBUNA OCCIDENTE', price: 1999, description: '', progressOffsetHours: 4 },
            { zone: 'TRIBUNA ORIENTE', price: 1999, description: '', progressOffsetHours: 8 },
            { zone: 'TRIBUNA NORTE', price: 1449, description: '', progressOffsetHours: 12 },
            { zone: 'TRIBUNA SUR', price: 1449, description: '', soldOut: true, progressOffsetHours: 16 },
        ],
        description: 'Lima, prepárate para el océano púrpura. BTS regresa al Estadio San Marcos para dos noches históricas.',
        openGraphImage: '/images/og-peru.jpg',
        whatsappLink: 'https://chat.whatsapp.com/B5ddTQKVTACAUu4WuIr2Jo?mode=gi_t',
        phoneCode: '+51'
        ,progressOffsetHours: -25
    },
    {
        id: 'chile',
        name: 'Chile',
        flag: '🇨🇱',
        venue: 'Estadio Nacional',
        city: 'Santiago',
        isoCode: 'CL',
        dates: ['2026-10-16', '2026-10-17'],
        ticketDate: '24 de Enero',
        currency: 'USD',
        currencySymbol: 'USD $',
        prices: [
            { zone: 'Pacífico Medio', price: 1784 },
            { zone: 'Cancha Pacífico', price: 991 },
            { zone: 'Cancha Andes', price: 991 },
            { zone: 'Pacífico Alto', price: 892 },
            { zone: 'Pacífico Bajo', price: 734 },
            { zone: 'Movilidad Reducida', price: 734 },
            { zone: 'Andes Bajo Centro', price: 615 },
            { zone: 'Andes Bajo Norte', price: 555 },
            { zone: 'Andes Bajo Sur', price: 555 },
            { zone: 'Andes Alto Centro', price: 535 },
            { zone: 'Andes Alto Norte', price: 496 },
            { zone: 'Andes Alto Sur', price: 496 },
            { zone: 'Galería Norte', price: 377 },
            { zone: 'Galería Sur', price: 377 },
            { zone: 'Pacífico Lateral Norte', price: 337 },
            { zone: 'Pacífico Lateral Sur', price: 337 },
        ],
        description: 'Santiago, el momento ha llegado. Vive la magia de BTS en el Estadio Nacional.',
        openGraphImage: '/images/og-chile.jpg',
        whatsappLink: 'https://chat.whatsapp.com/InhwK0frGNJAKEeotmR90n?mode=gi_t',
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
        prices: [
            {
                zone: 'VIP',
                price: 53346,
                color: 'N/A',
                description: 'Paquete más exclusivo (detalles por confirmar).'
            },
            {
                zone: 'Platino',
                price: 39990,
                color: '🟦 Azul / ⬜ Gris',
                description: 'Asientos a nivel de cancha, lo más cerca al escenario (Secciones A y B).'
            },
            {
                zone: 'Verde A',
                price: 26859,
                color: '🟩 Verde',
                description: 'Grada baja, mejor vista frontal/lateral.'
            },
            {
                zone: 'Naranja A',
                price: 25446,
                color: '🟧 Naranja Oscuro',
                description: 'Grada baja, vista lateral.'
            },
            {
                zone: 'Verde B',
                price: 24030,
                color: '🟩 Verde',
                description: 'Grada nivel medio (arriba de Verde A).'
            },
            {
                zone: 'Naranja B',
                price: 14844,
                color: '🔸 Naranja Claro',
                description: 'Grada nivel medio, vista lateral.'
            },
            {
                zone: 'Verde C',
                price: 13428,
                color: '🟩 Verde',
                description: 'Grada nivel alto (arriba de Verde B).'
            },
            {
                zone: 'Naranja C',
                price: 8520,
                color: '🍑 Salmón / Naranja',
                description: 'Grada nivel alto, vista lateral (parte superior del mapa).'
            },
            {
                zone: 'Morado / General',
                price: 5301,
                color: '🟪 Morado',
                description: 'Grada de fondo o entrada general (sección 100s frente al escenario).'
            },
        ],
        description: '¡Hola México! BTS llega al coloso de Santa Úrsula para tres fechas inolvidables.',
        openGraphImage: '/images/og-mexico.jpg',
        whatsappLink: 'https://chat.whatsapp.com/HjIVamgy79S31YF7X32SGc?mode=gi_t',
        phoneCode: '+52'
        ,progressOffsetHours: 0
    },
    {
        id: 'colombia',
        name: 'Colombia',
        flag: '🇨🇴',
        venue: 'Estadio El Campín',
        city: 'Bogotá',
        isoCode: 'CO',
        dates: ['2026-10-02', '2026-10-03'],
        ticketDate: '28 de Enero',
        currency: 'COP',
        currencySymbol: '$',
        prices: [
            { zone: 'Ultimate VIP Soundcheck', price: 16980000 },
            { zone: 'Purple Zone', price: 13650000 },
            { zone: 'General', price: 9630000 },
            { zone: 'Lado Este (tribunas)', price: 8790000 },
            { zone: 'Zona Norte', price: 1626000 },
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
        dates: ['2026-10-23', '2026-10-24'],
        ticketDate: 'Próximamente',
        currency: 'USD',
        currencySymbol: 'USD $',
        prices: [
            { zone: 'CABECERA NORTE y SUR', price: 488 },
            { zone: 'CAMPO', price: 760 },
            { zone: 'PLATEA A y B', price: 847 },
            { zone: 'PLATEA PREFERENCIAL A y B', price: 922 },
        ],
        description: 'Argentina recibe a BTS en el Estadio Único de La Plata con preventa y zonas oficiales para el Army.',
        openGraphImage: '/images/og-argentina.jpg',
        whatsappLink: 'https://chat.whatsapp.com/IjzV0YrnVsT2npZNy6ZAZF?mode=gi_t',
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
        currency: 'BRL',
        currencySymbol: 'R$',
        prices: [
            { zone: 'Ultimate VIP Soundcheck', price: 10500 },
            { zone: 'Purple Zone', price: 8400 },
            { zone: 'Pista Premium', price: 5700 },
            { zone: 'Cadeira Inferior', price: 3600 },
            { zone: 'Cadeira Superior', price: 1950 },
        ],
        description: 'A Live Nation é a produtora oficial. O show será no Estádio do MorumBIS. BTS WORLD TOUR "ARIRANG".',
        openGraphImage: '/images/og-brasil.jpg',
        whatsappLink: 'https://chat.whatsapp.com/JCxdITUSCea4lrRVAlUy9m?mode=gi_t',
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
