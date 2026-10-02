export interface Pricing {
    zone: string;
    price: number;
    color?: string;
    description?: string;
    soldOut?: boolean;
    stock?: number; // max available quantity (undefined = unlimited)
    progressOffsetHours?: number; // offset en horas para llegar al 100%
    needsVerification?: boolean; // muestra botón "Verificar Disponibilidad" en lugar de +/-
}

export interface CountryData {
    id: string; // URL param (slug)
    name: string;
    flag: string;
    venue: string;
    city: string;
    isoCode: string; // for JSON-LD addressCountry
    dates: string[]; // ISO format YYYY-MM-DD
    unavailableDates?: string[]; // Fechas agotadas/no disponibles
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

export const COLOMBIA_WHATSAPP_LINK = 'https://chat.whatsapp.com/JhQL3v5fVP3IwAu5L1jT0M';

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
        city: 'España',
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
        whatsappLink: 'https://chat.whatsapp.com/EeN6RBDEpJi0vOsZCPo8yu',
        phoneCode: '+34',
        progressOffsetHours: 0,
        allowInstallments: false
    },
    {
        id: 'peru',
        name: 'Perú',
        flag: '🇵🇪',
        venue: 'Estadio San Marcos',
        city: 'Perú',
        isoCode: 'PE',
        dates: ['2026-10-07', '2026-10-09', '2026-10-10'],
        ticketDate: '07 de Abril, 10:00 AM',
        currency: 'PEN',
        currencySymbol: 'S/',
        prices: [
            { zone: 'CAMPO', price: 2899, progressOffsetHours: 0 }, // +500 soles total
            { zone: 'TRIBUNA OCCIDENTE', price: 2499, description: '', progressOffsetHours: 4 }, // +500 soles total
            { zone: 'TRIBUNA ORIENTE', price: 2499, description: '', progressOffsetHours: 8 }, // +500 soles total
            { zone: 'TRIBUNA NORTE', price: 1949, description: '', progressOffsetHours: 12 }, // +500 soles total
            { zone: 'TRIBUNA SUR', price: 1090, description: '', soldOut: true, progressOffsetHours: 16 }, // +500 soles total
        ],
        description: 'Lima, prepárate para el océano púrpura. BTS regresa al Estadio San Marcos para dos noches históricas.',
        openGraphImage: '/images/og-peru.jpg',
        whatsappLink: 'https://chat.whatsapp.com/KDw6W1P81dI2UFTiYyNC87',
        phoneCode: '+51'
        ,progressOffsetHours: -25
    },
    {
        id: 'chile',
        name: 'Chile',
        flag: '🇨🇱',
        venue: 'Estadio Nacional Julio Martínez Prádanos',
        city: 'Chile',
        isoCode: 'CL',
        dates: ['2026-10-14', '2026-10-16', '2026-10-17'],
        ticketDate: '24 de Enero',
        currency: 'USD',
        currencySymbol: '$',
        prices: [
            // Zonas con botones +/- (disponibles)
            { zone: 'Pacífico Medio', price: 1784, stock: 5 },
            { zone: 'Cancha Pacífico', price: 991, stock: 8 },
            { zone: 'Cancha Andes', price: 949, stock: 1 },
            // Zonas con botón "Verificar Disponibilidad" (ordenadas de más barata a más cara)
            { zone: 'Pacífico Lateral Sur', price: 299, needsVerification: true },
            { zone: 'Pacífico Lateral Norte', price: 299, needsVerification: true },
            { zone: 'Galería Sur', price: 377, needsVerification: true },
            { zone: 'Galería Norte', price: 377, needsVerification: true },
            { zone: 'Andes Alto Sur', price: 496, needsVerification: true },
            { zone: 'Andes Alto Norte', price: 496, needsVerification: true },
            { zone: 'Andes Alto Centro', price: 535, needsVerification: true },
            { zone: 'Andes Bajo Sur', price: 555, needsVerification: true },
            { zone: 'Andes Bajo Norte', price: 555, needsVerification: true },
            { zone: 'Andes Bajo Centro', price: 615, needsVerification: true },
            { zone: 'Movilidad Reducida', price: 734, needsVerification: true },
            { zone: 'Pacífico Bajo', price: 734, needsVerification: true },
            { zone: 'Pacífico Alto', price: 892, needsVerification: true },
        ],
        description: 'Santiago, el momento ha llegado. Vive la magia de BTS en el Estadio Nacional.',
        openGraphImage: '/images/og-chile.jpg',
        whatsappLink: 'https://chat.whatsapp.com/CWjRdwsDxMHFo3c4CrGwjv',
        phoneCode: '+56'
        ,progressOffsetHours: 1
    },
    {
        id: 'mexico',
        name: 'México',
        flag: '🇲🇽',
        venue: 'Estadio GNP Seguros',
        city: 'México',
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
        whatsappLink: 'https://chat.whatsapp.com/Jyunn9lyjhcHXeeimRTzYm',
        phoneCode: '+52'
        ,progressOffsetHours: 0
    },
    {
        id: 'colombia',
        name: 'Colombia',
        flag: '🇨🇴',
        venue: 'Estadio Nemesio Camacho El Campín',
        city: 'Colombia',
        isoCode: 'CO',
        dates: ['2026-10-02', '2026-10-03'],
        unavailableDates: ['2026-10-02'], // 2 de octubre agotado
        ticketDate: '28 de Enero',
        currency: 'USD',
        currencySymbol: '$',
        prices: [
            { zone: 'Sur Baja', price: 747 }, // $747 USD (≈ $3,290,700 COP)
            { zone: 'Oriental Norte Baja', price: 747 }, // $747 USD (≈ $3,290,700 COP)
            { zone: 'Norte Baja', price: 747 }, // $747 USD (≈ $3,290,700 COP)
            { zone: 'Oriental Sur Alta', price: 984 }, // $984 USD (≈ $4,334,400 COP)
            { zone: 'Sur Alta', price: 984 }, // $984 USD (≈ $4,334,400 COP)
            { zone: 'Oriental Norte Alta', price: 984 }, // $984 USD (≈ $4,334,400 COP)
            { zone: 'Norte Alta', price: 984 }, // $984 USD (≈ $4,334,400 COP)
            { zone: 'Oriental Alta', price: 1461 }, // $1,461 USD (≈ $6,436,800 COP)
            { zone: 'Occidental Alta', price: 1644 }, // $1,644 USD (≈ $7,241,600 COP)
            { zone: 'Oriental Baja', price: 2391 }, // $2,391 USD (≈ $10,536,800 COP)
            { zone: 'Occidental Baja', price: 2508 }, // $2,508 USD (≈ $11,055,200 COP)
            { zone: 'VIP', price: 2688 }, // $2,688 USD (≈ $11,847,680 COP)
            { zone: 'Paquete VIP | Sound Check', price: 7344 }, // $7,344 USD (≈ $32,357,120 COP)
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
        city: 'Argentina',
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
        whatsappLink: 'https://chat.whatsapp.com/CO5Zr9eUYmVG54UtQA3Bv1',
        phoneCode: '+54'
        ,progressOffsetHours: 2
    },
    {
        id: 'brasil',
        name: 'Brasil',
        flag: '🇧🇷',
        venue: 'Estádio do MorumBIS',
        city: 'Brasil',
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
        whatsappLink: 'https://chat.whatsapp.com/HIOAAuVGMQ51ad21kAXDzL',
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
