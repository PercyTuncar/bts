export interface ProductData {
    slug: string;
    name: string;
    price: number;
    category: string;
    image: string;
    rating: number;
    reviewCount: number;
    description: string;
    details: string[];
    images: string[];
}

export const products: ProductData[] = [
    {
        slug: 'army-bomb',
        name: 'BTS Official Light Stick Ver. SE: Map of the Soul',
        price: 59.99,
        category: 'Light Stick',
        image: '/images/products/army-bomb.jpg',
        rating: 4.9,
        reviewCount: 1542,
        description: 'El lightstick oficial indispensable para el World Tour 2026. Se sincroniza automáticamente con tu asiento en el estadio para crear el océano púrpura. Incluye photocards exclusivas.',
        details: [
            'Conexión Bluetooth 5.0',
            'Modo Aurora Boreal',
            'Duración de batería: 5 horas',
            'Incluye 7 Photocards',
            'Strap oficial incluido'
        ],
        images: ['/images/products/army-bomb.jpg']
    },
    {
        slug: 'polo-bts-world-tour',
        name: 'Polo BTS World Tour 2026 Official Merch',
        price: 35.00,
        category: 'Apparel',
        image: '/images/products/polo-bts.jpg',
        rating: 4.8,
        reviewCount: 893,
        description: 'Viste la pasión del Army. Polo oficial del Tour Mundial 2026 con diseño exclusivo "Love Yourself: Eternity". Algodón peruano Pima 100% de alta calidad con estampado de alta densidad.',
        details: [
            '100% Algodón Pima Peruano',
            'Estampado High Definition (No se cuartea)',
            'Corte Oversize Unisex',
            'Disponible en tallas S, M, L, XL',
            'Etiqueta holográfica de autenticidad HYBE'
        ],
        images: ['/images/products/polo-bts.jpg', '/images/products/polo-back.jpg']
    },
    {
        slug: 'tour-hoodie',
        name: 'World Tour 2026 Official Hoodie (Black)',
        price: 85.00,
        category: 'Apparel',
        image: '/images/products/hoodie.jpg',
        rating: 4.9,
        reviewCount: 420,
        description: 'Hoodie premium con el logo del tour bordado en el pecho y fechas en la espalda. Interior de felpa suave para máxima comodidad.',
        details: [
            'Algodón Heavyweight 400gsm',
            'Bordado 3D de alta precisión',
            'Bolsillo canguro',
            'Capucha con forro doble'
        ],
        images: ['/images/products/hoodie.jpg']
    }
];
