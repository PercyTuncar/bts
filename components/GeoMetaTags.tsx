// components/GeoMetaTags.tsx
// Meta tags geográficos para mejorar el targeting por país en Google
// Basado en: https://www.quora.com/What-are-Geo-meta-tags-and-how-do-you-use-them-for-SEO

interface GeoMetaTagsProps {
  country: string; // ISO code: PE, CL, BR, etc.
  region?: string; // Region/State: Lima, Santiago, São Paulo
  placename?: string; // City name
}

export function GeoMetaTags({ country, region, placename }: GeoMetaTagsProps) {
  return (
    <>
      <meta name="geo.region" content={country} />
      {region && <meta name="geo.placename" content={region} />}
      {placename && <meta name="geo.placename" content={placename} />}
      <meta name="geo.position" content="auto" />
      <meta name="ICBM" content="auto" />
    </>
  );
}

// Configuración por país
export const GEO_CONFIG = {
  peru: { country: 'PE', region: 'Lima', placename: 'Lima' },
  chile: { country: 'CL', region: 'Región Metropolitana', placename: 'Santiago' },
  brasil: { country: 'BR', region: 'São Paulo', placename: 'São Paulo' },
  mexico: { country: 'MX', region: 'Ciudad de México', placename: 'Ciudad de México' },
  colombia: { country: 'CO', region: 'Bogotá D.C.', placename: 'Bogotá' },
  argentina: { country: 'AR', region: 'Buenos Aires', placename: 'La Plata' },
  madrid: { country: 'ES', region: 'Comunidad de Madrid', placename: 'Madrid' },
} as const;
