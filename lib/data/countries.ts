export interface Pricing {
    zone: string;
    price: number;
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
}

export const countries: CountryData[] = [
    {
        id: 'peru',
        name: 'Perú',
        flag: '🇵🇪',
        venue: 'Estadio Nacional',
        city: 'Lima',
        isoCode: 'PE',
        dates: ['2026-10-08', '2026-10-09'],
        ticketDate: '24 de Enero',
        currency: 'PEN',
        currencySymbol: 'S/',
        prices: [
            { zone: 'Ultimate VIP Soundcheck', price: 4639 },
            { zone: 'Purple Zone', price: 3728 },
            { zone: 'General', price: 2628 },
            { zone: 'Lado Este (tribunas)', price: 2396 },
            { zone: 'Zona Norte', price: 444 },
        ],
        description: 'Lima, prepárate para el océano púrpura. BTS regresa al Estadio Nacional para dos noches históricas.',
        openGraphImage: '/images/og-peru.jpg',
        whatsappLink: 'https://chat.whatsapp.com/BmKRtT4vnZcEB5rG4yhQVC'
    },
    {
        id: 'chile',
        name: 'Chile',
        flag: '🇨🇱',
        venue: 'Estadio Monumental',
        city: 'Santiago',
        isoCode: 'CL',
        dates: ['2026-10-15', '2026-10-16'],
        ticketDate: '24 de Enero',
        currency: 'CLP',
        currencySymbol: '$',
        prices: [
            { zone: 'Ultimate VIP Soundcheck', price: 1311000 },
            { zone: 'Purple Zone', price: 1054000 },
            { zone: 'General', price: 743000 },
            { zone: 'Lado Este (tribunas)', price: 677000 },
            { zone: 'Zona Norte', price: 125000 },
        ],
        description: 'Santiago, el momento ha llegado. Vive la magia de BTS en el Estadio Monumental.',
        openGraphImage: '/images/og-chile.jpg',
        whatsappLink: 'https://chat.whatsapp.com/HhoKIL0vQhpDsP9ThzOFwu'
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
            { zone: 'Ultimate VIP Soundcheck', price: 27600 },
            { zone: 'Purple Zone', price: 22200 },
            { zone: 'General', price: 15650 },
            { zone: 'Lado Este (tribunas)', price: 14300 },
            { zone: 'Zona Norte', price: 2650 },
        ],
        description: '¡Hola México! BTS llega al coloso de Santa Úrsula para tres fechas inolvidables.',
        openGraphImage: '/images/og-mexico.jpg',
        whatsappLink: 'https://chat.whatsapp.com/KnPOXVWj8IW2SoGzT4UGqo'
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
        whatsappLink: 'https://chat.whatsapp.com/JfNuVSxePCkKKugaawYsRa'
    },
    {
        id: 'argentina',
        name: 'Argentina',
        flag: '🇦🇷',
        venue: 'Estadio Mas Monumental',
        city: 'Buenos Aires',
        isoCode: 'AR',
        dates: ['2026-10-23', '2026-10-24'],
        ticketDate: 'Próximamente',
        currency: 'ARS',
        currencySymbol: '$',
        prices: [
            { zone: 'Ultimate VIP Soundcheck', price: 1500000 },
            { zone: 'Purple Zone', price: 1200000 },
            { zone: 'General', price: 850000 },
            { zone: 'Lado Este (tribunas)', price: 750000 },
            { zone: 'Zona Norte', price: 180000 },
        ],
        description: 'Aún no hay confirmación oficial del estadio, pero los rumores más fuertes y la capacidad necesaria apuntan al Estadio Monumental (River Plate).',
        openGraphImage: '/images/og-argentina.jpg',
        whatsappLink: 'https://chat.whatsapp.com/placeholder'
    }
];
