// A3: Sitemap with hreflang annotations for all country routes
// Registered in robots.txt as Sitemap: https://entradasbts.com/sitemap-i18n.xml

export const runtime = 'edge';

const BASE = 'https://entradasbts.com';

const COUNTRY_ROUTES = [
    { url: `${BASE}/peru/`,      hreflang: 'es-PE' },
    { url: `${BASE}/chile/`,     hreflang: 'es-CL' },
    { url: `${BASE}/mexico/`,    hreflang: 'es-MX' },
    { url: `${BASE}/colombia/`,  hreflang: 'es-CO' },
    { url: `${BASE}/argentina/`, hreflang: 'es-AR' },
    { url: `${BASE}/brasil/`,    hreflang: 'pt-BR' },
    { url: `${BASE}/madrid/`,    hreflang: 'es-ES' },
];

const ALL_ALTERNATES = [
    { lang: 'es',       url: `${BASE}/` },
    { lang: 'es-PE',    url: `${BASE}/peru/` },
    { lang: 'es-CL',    url: `${BASE}/chile/` },
    { lang: 'es-MX',    url: `${BASE}/mexico/` },
    { lang: 'es-CO',    url: `${BASE}/colombia/` },
    { lang: 'es-AR',    url: `${BASE}/argentina/` },
    { lang: 'es-ES',    url: `${BASE}/madrid/` },
    { lang: 'pt-BR',    url: `${BASE}/brasil/` },
    // x-default points to the country selector, matching the alternates in
    // app/[country]/page.tsx and app/page.tsx (best signal of intent for
    // traffic without a detected country/language).
    { lang: 'x-default', url: `${BASE}/eventos/` },
];

function buildXhtmlLinks(alternates: typeof ALL_ALTERNATES): string {
    return alternates
        .map(a => `    <xhtml:link rel="alternate" hreflang="${a.lang}" href="${a.url}"/>`)
        .join('\n');
}

export function GET() {
    const urlEntries = COUNTRY_ROUTES.map(route => {
        return `  <url>
    <loc>${route.url}</loc>
${buildXhtmlLinks(ALL_ALTERNATES)}
  </url>`;
    }).join('\n');

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urlEntries}
</urlset>`;

    return new Response(xml, {
        headers: {
            'Content-Type': 'application/xml; charset=utf-8',
            'Cache-Control': 'public, max-age=86400, stale-while-revalidate=3600',
        },
    });
}
