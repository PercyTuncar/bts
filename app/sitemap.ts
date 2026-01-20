import { MetadataRoute } from 'next';
import { countries } from '@/lib/data/countries';
import { products } from '@/lib/data/products';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://entradasbts.com';

    // Static Routes
    const staticRoutes = [
        '',
        '/tienda',
        '/blog',
        '/eventos',
        '/legal/contacto',
        '/legal/privacidad',
        '/tienda/cart',
        '/comprar-membresia-bts',
        '/unirse',
        '/legal/terminos',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: route === '' ? 1 : 0.8,
    }));

    // Dynamic Country Routes
    const countryRoutes = countries.map((country) => ({
        url: `${baseUrl}/${country.id}`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 0.9,
    }));

    // Dynamic Product Routes
    const productRoutes = products.map((product) => ({
        url: `${baseUrl}/tienda/${product.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
    }));

    // Add explicit blog posts here if/when you have a data source for them
    const blogRoutes = [
        {
            url: `${baseUrl}/blog/guide`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.6,
        },
        {
            url: `${baseUrl}/blog/setlist`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.6,
        }
    ];

    return [...staticRoutes, ...countryRoutes, ...productRoutes, ...blogRoutes];
}
