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
        dates: ['2026-10-09', '2026-10-10'],
        ticketDate: '24 de Enero',
        currency: 'PEN',
        currencySymbol: 'S/',
        prices: [
            { zone: 'Ultimate VIP Soundcheck', price: 1650 },
            { zone: 'Army Pit (Cancha)', price: 950 },
            { zone: 'Occidente Central', price: 780 },
            { zone: 'Oriente Central', price: 780 },
            { zone: 'Norte (Tribuna)', price: 399 },
        ],
        description: 'Lima, prepárate para el océano púrpura. BTS regresa al Estadio Nacional para dos noches históricas.',
        openGraphImage: '/images/og-peru.jpg',
        whatsappLink: 'https://chat.whatsapp.com/peru-army'
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
            { zone: 'Ultimate VIP Soundcheck', price: 420000 },
            { zone: 'Cancha VIP', price: 230000 },
            { zone: 'Océano', price: 160000 },
            { zone: 'Cordillera', price: 160000 },
            { zone: 'Galería', price: 99000 },
        ],
        description: 'Santiago, el momento ha llegado. Vive la magia de BTS en el Estadio Monumental.',
        openGraphImage: '/images/og-chile.jpg',
        whatsappLink: 'https://chat.whatsapp.com/chile-army'
    },
    {
        id: 'mexico',
        name: 'México',
        flag: '🇲🇽',
        venue: 'Estadio Azteca',
        city: 'Ciudad de México',
        isoCode: 'MX',
        dates: ['2026-10-22', '2026-10-23', '2026-10-24'],
        ticketDate: '26 de Enero',
        currency: 'MXN',
        currencySymbol: '$',
        prices: [
            { zone: 'VIP Soundcheck A', price: 9500 },
            { zone: 'General A', price: 4800 },
            { zone: 'General B', price: 2200 },
            { zone: 'Naranja A', price: 3500 },
            { zone: 'Verde A', price: 2800 },
        ],
        description: '¡Hola México! BTS llega al coloso de Santa Úrsula para tres fechas inolvidables.',
        openGraphImage: '/images/og-mexico.jpg',
        whatsappLink: 'https://chat.whatsapp.com/mexico-army'
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
            { zone: 'VIP Universe', price: 1800000 },
            { zone: 'Platino', price: 800000 },
            { zone: 'Occidental Alta', price: 650000 },
            { zone: 'Oriental Alta', price: 650000 },
            { zone: 'Norte Alta', price: 450000 },
        ],
        description: 'Bogotá se viste de morado. No te pierdas el regreso de BTS a Colombia.',
        openGraphImage: '/images/og-colombia.jpg',
        whatsappLink: 'https://chat.whatsapp.com/colombia-army'
    }
];
