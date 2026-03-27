export interface Pricing {
    zone: string;
    price: number;
    color?: string;
    description?: string;
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
    allowInstallments?: boolean; // Optional flag to disable installments
}

export const COLOMBIA_WHATSAPP_LINK = 'https://chat.whatsapp.com/JMBC23LBFJd30QDsAP3ZUV';

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
            { zone: 'Sección 225 - Nivel 200', price: 375, description: 'Vista privilegiada del escenario principal' },
            { zone: 'Sección 226 - Nivel 200', price: 375, description: 'Vista privilegiada del escenario principal' },
        ],
        description: 'Madrid, prepárate. BTS llega al Metropolitano para dos noches inolvidables en España.',
        openGraphImage: '/images/bts-madrid-mapa.png', // Using the map as OG image for now, or specific one
        whatsappLink: 'https://chat.whatsapp.com/KyQVvLwltJQCu3sId3ndJl',
        phoneCode: '+34',
        allowInstallments: false
    },
    {
        id: 'peru',
        name: 'Perú',
        flag: '🇵🇪',
        venue: 'Estadio San Marcos',
        city: 'Lima',
        isoCode: 'PE',
        dates: ['2026-10-08', '2026-10-09'],
        ticketDate: '07 de Abril, 10:00 AM',
        currency: 'PEN',
        currencySymbol: 'S/',
        prices: [
            { zone: 'CAMPO', price: 851 },
            { zone: 'TRIBUNA OCCIDENTE', price: 667, description: 'Numerado' },
            { zone: 'TRIBUNA ORIENTE', price: 667, description: 'Numerado' },
            { zone: 'TRIBUNA NORTE', price: 483, description: 'Numerado' },
            { zone: 'TRIBUNA SUR', price: 483, description: 'Numerado' },
        ],
        description: 'Lima, prepárate para el océano púrpura. BTS regresa al Estadio Nacional para dos noches históricas.',
        openGraphImage: '/images/og-peru.jpg',
        whatsappLink: 'https://chat.whatsapp.com/JY5rMMGp2n3HEHqxJZTam9',
        phoneCode: '+51'
    },
    {
        id: 'chile',
        name: 'Chile',
        flag: '🇨🇱',
        venue: 'Estadio Nacional',
        city: 'Santiago',
        isoCode: 'CL',
        dates: ['2026-10-15', '2026-10-16'],
        ticketDate: '24 de Enero',
        currency: 'CLP',
        currencySymbol: '$',
        prices: [
            { zone: 'Pacífico Medio', price: 528750 },
            { zone: 'Cancha Pacífico', price: 293750 },
            { zone: 'Cancha Andes', price: 293750 },
            { zone: 'Pacífico Alto', price: 264375 },
            { zone: 'Pacífico Bajo', price: 217375 },
            { zone: 'Movilidad Reducida', price: 217375 },
            { zone: 'Andes Bajo Centro', price: 182125 },
            { zone: 'Andes Bajo Norte', price: 164500 },
            { zone: 'Andes Bajo Sur', price: 164500 },
            { zone: 'Andes Alto Centro', price: 158625 },
            { zone: 'Andes Alto Norte', price: 146875 },
            { zone: 'Andes Alto Sur', price: 146875 },
            { zone: 'Galería Norte', price: 111625 },
            { zone: 'Galería Sur', price: 111625 },
            { zone: 'Pacífico Lateral Norte', price: 99875 },
            { zone: 'Pacífico Lateral Sur', price: 99875 },
        ],
        description: 'Santiago, el momento ha llegado. Vive la magia de BTS en el Estadio Nacional.',
        openGraphImage: '/images/og-chile.jpg',
        whatsappLink: 'https://chat.whatsapp.com/BBfax0QM0fWKCX36u0Y1sw',
        phoneCode: '+56'
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
                price: 17782,
                color: 'N/A',
                description: 'Paquete más exclusivo (detalles por confirmar).'
            },
            {
                zone: 'Platino',
                price: 13330,
                color: '🟦 Azul / ⬜ Gris',
                description: 'Asientos a nivel de cancha, lo más cerca al escenario (Secciones A y B).'
            },
            {
                zone: 'Verde A',
                price: 8953,
                color: '🟩 Verde',
                description: 'Grada baja, mejor vista frontal/lateral.'
            },
            {
                zone: 'Naranja A',
                price: 8482,
                color: '🟧 Naranja Oscuro',
                description: 'Grada baja, vista lateral.'
            },
            {
                zone: 'Verde B',
                price: 8010,
                color: '🟩 Verde',
                description: 'Grada nivel medio (arriba de Verde A).'
            },
            {
                zone: 'Naranja B',
                price: 4948,
                color: '🔸 Naranja Claro',
                description: 'Grada nivel medio, vista lateral.'
            },
            {
                zone: 'Verde C',
                price: 4476,
                color: '🟩 Verde',
                description: 'Grada nivel alto (arriba de Verde B).'
            },
            {
                zone: 'Naranja C',
                price: 2840,
                color: '🍑 Salmón / Naranja',
                description: 'Grada nivel alto, vista lateral (parte superior del mapa).'
            },
            {
                zone: 'Morado / General',
                price: 1767,
                color: '🟪 Morado',
                description: 'Grada de fondo o entrada general (sección 100s frente al escenario).'
            },
        ],
        description: '¡Hola México! BTS llega al coloso de Santa Úrsula para tres fechas inolvidables.',
        openGraphImage: '/images/og-mexico.jpg',
        whatsappLink: 'https://chat.whatsapp.com/H64CZMFTCVDLaFg3Wnvuvr',
        phoneCode: '+52'
    },
    {
        id: 'colombia',
        name: 'Colombia',
        flag: '🇨🇴',
        venue: 'Estadio El Campín',
        city: 'Bogotá',
        isoCode: 'CO',
        dates: ['2026-10-01', '2026-10-02'],
        ticketDate: '28 de Enero',
        currency: 'COP',
        currencySymbol: '$',
        prices: [
            { zone: 'Ultimate VIP Soundcheck', price: 5660000 },
            { zone: 'Purple Zone', price: 4550000 },
            { zone: 'General', price: 3210000 },
            { zone: 'Lado Este (tribunas)', price: 2930000 },
            { zone: 'Zona Norte', price: 542000 },
        ],
        description: 'Bogotá se viste de morado. No te pierdas el regreso de BTS a Colombia.',
        openGraphImage: '/images/og-colombia.jpg',
        whatsappLink: COLOMBIA_WHATSAPP_LINK,
        phoneCode: '+57'
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
        currency: 'ARS',
        currencySymbol: '$',
        prices: [
            { zone: 'CABECERA NORTE y SUR', price: 225000 },
            { zone: 'CAMPO', price: 350000 },
            { zone: 'PLATEA A y B', price: 390000 },
            { zone: 'PLATEA PREFERENCIAL A y B', price: 425000 },
        ],
        description: 'Argentina recibe a BTS en el Estadio Único de La Plata con preventa y zonas oficiales para el Army.',
        openGraphImage: '/images/og-argentina.jpg',
        whatsappLink: 'https://chat.whatsapp.com/LUtWQUnpj3t0hj7ZlGvQ5W',
        phoneCode: '+54'
    },
    {
        id: 'brasil',
        name: 'Brasil',
        flag: '🇧🇷',
        venue: 'Allianz Parque',
        city: 'São Paulo',
        isoCode: 'BR',
        dates: ['2026-10-28', '2026-10-30', '2026-10-31'],
        ticketDate: 'Em Breve',
        currency: 'BRL',
        currencySymbol: 'R$',
        prices: [
            { zone: 'Ultimate VIP Soundcheck', price: 3500 },
            { zone: 'Purple Zone', price: 2800 },
            { zone: 'Pista Premium', price: 1900 },
            { zone: 'Cadeira Inferior', price: 1200 },
            { zone: 'Cadeira Superior', price: 650 },
        ],
        description: 'A Live Nation é a produtora oficial. Rumores fortes apontam para o Allianz Parque ou Estádio MorumBIS. BTS WORLD TOUR "ARIRANG".',
        openGraphImage: '/images/og-brasil.jpg',
        whatsappLink: 'https://chat.whatsapp.com/JdQMGagSdkaI2165o4WVFQ',
        phoneCode: '+55'
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
