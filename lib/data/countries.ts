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
        whatsappLink: 'https://chat.whatsapp.com/EVEzMF2telL21ZoFzRVUva',
        phoneCode: '+51'
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
        whatsappLink: 'https://chat.whatsapp.com/DRTdR8zpzu3AhmcfErvaw4',
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
        whatsappLink: 'https://chat.whatsapp.com/Fdfq8agXEQM50SVU2ZuFNb',
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
        whatsappLink: 'https://chat.whatsapp.com/GfxjwahDQCF3UtkzRPPWKD',
        phoneCode: '+57'
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
        whatsappLink: 'https://chat.whatsapp.com/I1hggvtoAvA4rhHZIYtS8d',
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
        whatsappLink: 'https://chat.whatsapp.com/D20dvxoUaRi7nYPd5n3ySW',
        phoneCode: '+55'
    }
];
