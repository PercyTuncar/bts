import { MetadataRoute } from 'next';
import { countries } from '@/lib/data/countries';
import { products } from '@/lib/data/products';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://entradasbts.com';
    const currentDate = new Date();

    // Static Routes
    const staticRoutes = [
        { route: '', priority: 1, changeFreq: 'daily' as const },
        { route: 'eventos', priority: 0.95, changeFreq: 'daily' as const },
        { route: 'gira-mundial', priority: 0.95, changeFreq: 'weekly' as const },
        { route: 'proximos-conciertos', priority: 0.95, changeFreq: 'weekly' as const },
        { route: 'tienda', priority: 0.8, changeFreq: 'daily' as const },
        { route: 'blog', priority: 0.8, changeFreq: 'weekly' as const },
        { route: 'comprar-membresia-bts', priority: 0.7, changeFreq: 'weekly' as const },
        { route: 'unirse', priority: 0.7, changeFreq: 'monthly' as const },
        { route: 'tienda/cart', priority: 0.5, changeFreq: 'weekly' as const },
        { route: 'legal/contacto', priority: 0.6, changeFreq: 'monthly' as const },
        { route: 'legal/privacidad', priority: 0.5, changeFreq: 'monthly' as const },
        { route: 'legal/terminos', priority: 0.5, changeFreq: 'monthly' as const },
    ].map(({ route, priority, changeFreq }) => ({
        url: route ? `${baseUrl}/${route}/` : `${baseUrl}/`,
        lastModified: currentDate,
        changeFrequency: changeFreq,
        priority,
    }));

    // Dynamic Country Routes - ALTA PRIORIDAD para SEO internacional
    const countryRoutes = countries.map((country) => ({
        url: `${baseUrl}/${country.id}/`,
        lastModified: new Date('2026-08-23'), // Fecha real de optimización SEO
        changeFrequency: 'weekly' as const,
        priority: 0.95, // Alta prioridad - contenido principal optimizado
    }));

    // Dynamic Product Routes
    const productRoutes = products.map((product) => ({
        url: `${baseUrl}/tienda/${product.slug}/`,
        lastModified: currentDate,
        changeFrequency: 'weekly' as const,
        priority: 0.7,
    }));

    // Blog posts - mantener actualizados
    const blogRoutes = [
        {
            url: `${baseUrl}/blog/bts-en-netflix/`,
            lastModified: new Date('2026-02-02'),
            changeFrequency: 'monthly' as const,
            priority: 0.7,
        },
        {
            url: `${baseUrl}/blog/bts-en-dubai-2026-confirmado-viaje/`,
            lastModified: new Date('2026-02-02'),
            changeFrequency: 'monthly' as const,
            priority: 0.7,
        },
        {
            url: `${baseUrl}/blog/guide/`,
            lastModified: currentDate,
            changeFrequency: 'monthly' as const,
            priority: 0.6,
        },
        {
            url: `${baseUrl}/blog/setlist-predictions/`,
            lastModified: currentDate,
            changeFrequency: 'monthly' as const,
            priority: 0.6,
        }
    ];

    return [...staticRoutes, ...countryRoutes, ...productRoutes, ...blogRoutes];
}
