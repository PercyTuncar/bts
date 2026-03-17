import type { Metadata } from 'next';
import { headers } from 'next/headers';
import MembershipClient from './MembershipClient';

const IPINFO_TOKEN = process.env.IPINFO_TOKEN || 'c06aff7891c73b';
export const dynamic = 'force-dynamic';

const UNKNOWN_COUNTRY_CODES = new Set(['', 'ZZ', 'XX', 'T1', 'A1']);

function normalizeCountryCode(value?: string | null): string | undefined {
  const normalized = value?.trim().toUpperCase();
  if (!normalized || UNKNOWN_COUNTRY_CODES.has(normalized)) {
    return undefined;
  }
  return normalized;
}

function getClientIp(headersList: Headers): string | undefined {
  const cfConnectingIp = headersList.get('cf-connecting-ip');
  if (cfConnectingIp) return cfConnectingIp;

  const xForwardedFor = headersList.get('x-forwarded-for');
  if (xForwardedFor) {
    return xForwardedFor.split(',')[0]?.trim();
  }

  const xRealIp = headersList.get('x-real-ip');
  if (xRealIp) return xRealIp;

  return undefined;
}

async function detectCountryWithIpInfo(headersList: Headers): Promise<string> {
  const middlewareCountry = normalizeCountryCode(headersList.get('x-user-country'));
  const acceptLanguage = headersList.get('accept-language')?.toLowerCase() || '';

  // If Cloudflare already identified Peru, trust it immediately.
  if (middlewareCountry === 'PE') {
    return 'PE';
  }

  const clientIp = getClientIp(headersList);

  if (!clientIp || !IPINFO_TOKEN) {
    if (acceptLanguage.includes('es-pe')) return 'PE';
    return middlewareCountry || 'PE';
  }

  try {
    const response = await fetch(`https://api.ipinfo.io/lite/${clientIp}?token=${IPINFO_TOKEN}`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      if (acceptLanguage.includes('es-pe')) return 'PE';
      return middlewareCountry || 'PE';
    }

    const data = await response.json() as { country_code?: string; country?: string };
    const ipInfoCountry = normalizeCountryCode(
      data.country_code ||
      (data.country && data.country.length === 2 ? data.country : undefined)
    );

    const finalCountry = (() => {
      if (ipInfoCountry === 'PE') return 'PE';
      if (acceptLanguage.includes('es-pe')) return 'PE';
      return ipInfoCountry || middlewareCountry || 'PE';
    })();

    console.log('[MembershipGeo][server]', {
      middlewareCountry: middlewareCountry || 'unknown',
      ipInfoCountry: ipInfoCountry || 'unknown',
      acceptLanguage,
      finalCountry,
    });

    return finalCountry;
  } catch {
    if (acceptLanguage.includes('es-pe')) return 'PE';
    console.log('[MembershipGeo][server]', {
      middlewareCountry: middlewareCountry || 'unknown',
      ipInfoCountry: 'error',
      acceptLanguage,
      finalCountry: middlewareCountry || 'PE',
    });
    return middlewareCountry || 'PE';
  }
}

export const metadata: Metadata = {
    title: 'Comprar Membresía BTS Oficial',
    description: 'Únete al ARMY oficial y asegura tu preventa para el Tour 2026. Compra tu Membresía BTS Global hoy. Precios en tu moneda local. Acceso inmediato a Weverse.',
    keywords: ['comprar membresía bts', 'army membership precio', 'bts fanclub oficial latinoamerica', 'cuanto cuesta la membresia de bts', 'weverse shop bts español'],
    alternates: {
        canonical: 'https://entradasbts.com/comprar-membresia-bts',
    },
    openGraph: {
        title: 'Membresía BTS Oficial 2026',
        description: 'Asegura tu acceso a preventas de entradas y contenido exclusivo de BTS. Únete al Fanclub oficial hoy mismo.',
        images: [
            {
                url: '/images/bts-tour-2026-latinoamerica-preventa.jpg',
                width: 1200,
                height: 630,
                alt: 'Membresía BTS Global Official Fanclub ARMY',
            }
        ],
        type: 'website',
        locale: 'es_LA',
    }
};

const jsonLd = {
  "@context": "https://schema.org/",
  "@type": "Product",
  "name": "Membresía BTS Global Official Fanclub ARMY",
  "image": [
    "https://entradasbts.com/images/membership-card.png",
    "https://entradasbts.com/images/bts-tour-2026-latinoamerica-preventa.jpg"
  ],
  "description": "Acceso oficial al Fanclub ARMY. Incluye prioridad en preventa de entradas para el Tour 2026, contenido exclusivo en Weverse y Kit Digital.",
  "brand": {
    "@type": "Brand",
    "name": "HYBE / Big Hit Music"
  },
  "sku": "BTS-MEM-GL-2026",
  "offers": {
    "@type": "Offer",
    "url": "https://entradasbts.com/comprar-membresia-bts",
    "priceCurrency": "USD", 
    "price": "29.50",
    "priceValidUntil": "2026-12-31",
    "availability": "https://schema.org/InStock",
    "itemCondition": "https://schema.org/NewCondition"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "2843",
    "bestRating": "5",
    "worstRating": "1"
  },
  "review": [
    {
      "@type": "Review",
      "author": { "@type": "Person", "name": "Camila R." },
      "datePublished": "2026-01-28",
      "reviewRating": { "@type": "Rating", "ratingValue": "5" },
      "reviewBody": "¡Súper fácil y seguro! Tenía miedo de no poder comprarla desde mi país sin tarjeta internacional, pero aquí pude pagar rápido. Ya tengo mi código activo en Weverse para la preventa. 💜 Borahae!"
    },
    {
      "@type": "Review",
      "author": { "@type": "Person", "name": "Sofia M." },
      "datePublished": "2026-01-30",
      "reviewRating": { "@type": "Rating", "ratingValue": "5" },
      "reviewBody": "La atención fue excelente. Me llegó el correo de confirmación al instante y pude vincular mi cuenta sin problemas. Justo a tiempo para el comeback, vale totalmente la pena por el contenido exclusivo."
    },
    {
      "@type": "Review",
      "author": { "@type": "Person", "name": "Andrea V." },
      "datePublished": "2026-01-15",
      "reviewRating": { "@type": "Rating", "ratingValue": "5" },
      "reviewBody": "Intenté comprar en Weverse Shop directo y me rechazaba la tarjeta siempre. Aquí pasó a la primera y el precio es justo. ¡Lista para conseguir entradas para el concierto! 100% recomendado para L-ARMY."
    },
    {
      "@type": "Review",
      "author": { "@type": "Person", "name": "Valentina G." },
      "datePublished": "2026-01-20",
      "reviewRating": { "@type": "Rating", "ratingValue": "4" },
      "reviewBody": "Todo bien, el proceso es rápido. Solo me gustaría que avisaran que el Kit físico se paga envío aparte en la app oficial, pero la membresía digital funciona perfecto para las preventas."
    }
  ]
};

export default async function MembershipPage() {
    const headersList = await headers();
  const country = await detectCountryWithIpInfo(headersList);

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <MembershipClient country={country} />
        </>
    );
}
