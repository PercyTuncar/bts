**ROL:**
Actúa como **Principal Software Architect & Global SEO Strategist** para "PROJECT PURPLE OCEAN". Tu misión es construir **entradasbts.com**, la plataforma definitiva de venta de entradas para el World Tour de BTS en Latinoamérica. No es un MVP; es una aplicación de **Clase Mundial** diseñada para soportar millones de visitas (High Concurrency), con un SEO agresivo para dominar los rankings de Google y una UX basada en "Glassmorphism" de alto impacto visual.

**OBJETIVO TÉCNICO:**
Crear una aplicación **Next.js 15 (App Router)** en modo **Static Export (`output: 'export'`)** para ser desplegada en **Cloudflare Pages**. El código debe ser **TypeScript estricto**, modular, y optimizado para **Core Web Vitals perfectos (100/100)**.

---

### **1. 🏗️ STACK TECNOLÓGICO Y REGLAS DE ORO**

1. **Framework:** Next.js 15 (App Router). **PROHIBIDO** usar `getServerSideProps` o APIs de servidor en tiempo de ejecución (Node.js). Todo debe generarse en *Build Time*.
2. **Estilos:** Tailwind CSS v3.4+ (o v4 si estable). Sistema de diseño **Glassmorphism** obligatorio (fondos translúcidos, blur, bordes sutiles).
3. **Imágenes:** Uso exclusivo de `next/image` con un **Custom Loader** para la API de **Cloudflare Image Resizing**. No usar el optimizador por defecto de Vercel/Next.
4. **SEO:** JSON-LD Schema.org nativo en cada página. Metaetiquetas dinámicas. Slugs semánticos.
5. **Infraestructura:** Cloudflare Pages. Configuración de caché agresiva mediante archivo `_headers`.

---

### **2. 📂 ARQUITECTURA DE ARCHIVOS Y RUTAS**

Genera la siguiente estructura de carpetas exacta. No cambies los nombres.

/app
├── layout.tsx                 # Root Layout (Fuentes, Analytics, Navbar Global)
├── page.tsx                   # Homepage Internacional (Landing)
├── manifest.ts                # PWA Manifest
├── sitemap.ts                 # Sitemap XML dinámico
├── robots.ts                  # Robots.txt
├── /[country]                 # RUTAS PAÍSES (Dynamic Segment)
│   └── page.tsx               # Landing Específica (ej: /peru, /chile)
├── /blog
│   ├── page.tsx               # Grid de Artículos
│   └── /[slug]
│       └── page.tsx           # Artículo Individual (SEO Viral)
├── /tienda
│   ├── page.tsx               # Catálogo
│   └── /[slug]
│       └── page.tsx           # Ficha de Producto (Ecommerce)
├── /legal
│   ├── contacto/page.tsx
│   └── privacidad/page.tsx
├── /lib
│   ├── cloudflare-loader.ts   # Loader de imágenes CRÍTICO
│   └── utils.ts               # Helpers (clsx, formatters)
└── /components                # UI Kit (GlassCard, Buttons, etc.)

---

### **3. ⚙️ CONFIGURACIÓN TÉCNICA CRÍTICA (COPIAR CÓDIGO EXACTO)**

#### **A. Archivo `next.config.ts**`

*Instrucción:* Configura la exportación estática y el loader de imágenes personalizado.

```typescript
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export', // OBLIGATORIO para Cloudflare Pages
  trailingSlash: true, // Evita redirecciones 301 en rutas estáticas
  images: {
    loader: 'custom',
    loaderFile: './lib/cloudflare-loader.ts', // Loader personalizado
    remotePatterns:,
  },
  // Desactiva optimizaciones de servidor que rompen el export
  eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;

```

#### **B. Archivo `lib/cloudflare-loader.ts**`

*Instrucción:* Normaliza las URLs para que Cloudflare redimensione las imágenes al vuelo.

```typescript
'use client';

type ImageLoaderProps = {
  src: string;
  width: number;
  quality?: number;
};

export default function cloudflareLoader({ src, width, quality }: ImageLoaderProps) {
  // Evitar doble slash si src viene con slash inicial
  const cleanSrc = src.startsWith('/')? src.slice(1) : src;
  
  // Parámetros para Cloudflare Image Resizing
  const params = [
    `width=${width}`,
    `quality=${quality |

| 75}`,
    'format=auto',
    'fit=scale-down'
  ].join(',');

  // En producción usa el path de Cloudflare, en dev devuelve local si es necesario
  if (process.env.NODE_ENV === 'development') {
    return src;
  }

  return `/cdn-cgi/image/${params}/${cleanSrc}`;
}

```

#### **C. Archivo `public/_headers**`

*Instrucción:* Define la estrategia de caché para Cloudflare.

# Caché inmutable para JS/CSS generados (hash en nombre)

/_next/static/*
Cache-Control: public, max-age=31536000, immutable

# Imágenes: 1 mes de caché, revalida en background

/images/*
Cache-Control: public, max-age=2592000, stale-while-revalidate=86400

# HTML (Páginas): Revalidar SIEMPRE para mostrar stock real (InStock/SoldOut)

/*.html
Cache-Control: public, max-age=0, must-revalidate
X-Frame-Options: DENY
X-Content-Type-Options: nosniff

# Rutas raíz de países

/peru/
Cache-Control: public, max-age=0, must-revalidate
/chile/
Cache-Control: public, max-age=0, must-revalidate

---

### **4. 🎨 SISTEMA DE DISEÑO: "PURPLE OCEAN EXPERIENCE" (REDISEÑO TOTAL)**

#### **Estética General (2026 Trend)**
*   **Mood:** Dark Premium, Cinematic, "RaveHub" Style.
*   **Colores:** Fondos oscuros profundos (Slate 950), Acentos Neón (Cyan para acciones, Naranja para urgencia/fases, Violeta para branding).
*   **Glassmorphism:** Uso refinado en tarjetas, *pero* con mayor opacidad para legibilidad.
*   **Tipografía:** Grande, Bold, Sans-serif (Inter/Outfit).

#### **Nuevos Componentes Obligatorios:**
1.  **CountDown Timer:** Contador regresivo prominente con días, horas, minutos, segundos (estilo "RaveHub").
2.  **Sticky Purchase Summary:** En Desktop, el resumen de compra siempre visible a la derecha.
3.  **Phase Cards:** Tarjetas de "Fases de Venta" con estado (Activa, Próximamente, Agotada) y barra de progreso de tiempo.
4.  **Feature Grid:** Tarjetas oscuras con iconos para "Experiencia", "Lineup", "Compra Segura".
5.  **Search & Explore:** Barra de búsqueda central en Blog/Tienda con filtros tipo "Pills".

#### **Componente `GlassCard.tsx` (Actualizado)**
Debe soportar variantes: `default`, `interactive` (hover glow), `feature` (icon top), `sticky`.

#### **Variables de Color (Tailwind Config Expandido):**
*   **Primary:** `#7C3AED` (Violeta BTS)
*   **Accent:** `#06b6d4` (Cyan - Botones de acción)
*   **Warning:** `#f97316` (Naranja - Fases/Alertas)
*   **DarkBg:** `#020617` (Slate 950 - Fondo real)
*   **CardBg:** `rgba(15, 23, 42, 0.6)` (Glass tintado)


---

### **5. 📝 ESTRATEGIA DE CONTENIDO Y ARQUITECTURA DE DATOS (SCALABLE & DATA-DRIVEN)**
  
  #### **A. Arquitectura Multi-País (Scalability First)**
  
  *Contexto:* Para escalar a más países (México, Colombia, Argentina, etc.) sin "spaghetti code", **DEBES** desacoplar los datos de la vista.
  
  **Requisito:** Crea un archivo maestro de configuración en `lib/data/countries.ts` que exporte un array tipado con toda la info específica por país.
  
  ```typescript
  export const countries = [
    {
      id: 'peru',
      name: 'Perú',
      flag: '🇵🇪',
      venue: 'Estadio Nacional',
      city: 'Lima',
      dates: ['2026-10-09', '2026-10-10'],
      ticketDate: '24 de Enero',
      currency: 'PEN',
      currencySymbol: 'S/',
      prices: [
        { zone: 'Ultimate VIP', price: 1600 },
        { zone: 'Campo A', price: 850 },
        { zone: 'Campo B', price: 450 },
        // ...
      ],
      description: 'El regreso más esperado al Estadio Nacional...'
    },
    // Agrega Chile, México, Colombia aquí...
  ]
  ```
  
  #### **B. Página: `/[country]/page.tsx` (Refactorizado)**
  
  *Instrucción:* Esta página debe ser **100% agnóstica**. No uses `if (country === 'peru')`.
  
  1.  Usa `generateStaticParams` recorriendo el array `countries`.
  2.  Busca los datos del país actual con `countries.find()`.
  3.  Si no existe, devuelve 404.
  4.  Genera el JSON-LD dinámicamente usando los datos del objeto país (Moneda correcta, Venue correcto).
  
  **JSON-LD Dinámico (Critical SEO):**
  
  ```typescript
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MusicEvent",
    "name": `BTS World Tour 2026 - ${country.city}`,
    "startDate": `${country.dates[0]}T20:00`,
    "location": {
      "@type": "StadiumOrArena",
      "name": country.venue,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": country.city,
        "addressCountry": country.id.toUpperCase()
      }
    },
    "offers": country.prices.map(p => ({
      "@type": "Offer",
      "name": p.zone,
      "price": p.price,
      "priceCurrency": country.currency
    }))
    // ...
  }
  ```

**Contenido HTML (Estructura Semántica):**

1. `<h1>`: Entradas BTS Perú 2026 - Estadio Nacional
2. `<GlassCard>` (Zona de Compra): Botones grandes "Comprar en Preventa" (CTA Principal).
3. `<h2>`: Precios y Zonas (Tabla responsiva dentro de GlassCard).
4. `<h2>`: Fecha y Hora del Concierto.
5. `<h3>`: Preguntas Frecuentes (FAQ) - *Importante para snippets de voz*.

#### **B. Página: `/blog/[slug]/page.tsx**`

*Título Viral:* "Guía Definitiva: Cómo Sobrevivir a la Fila Virtual de BTS y Conseguir Entrada"

**Estructura del Artículo:**

* **Intro:** Gancho emocional ("Sabemos que el corazón se te sale...").
* **H2:** Requisitos Previos (Cuenta verificada, tarjeta habilitada).
* **H2:** El Truco del "Refresh" (Mito vs Realidad).
* **H2:** Mapa del Estadio Explicado.
* **H3:** ¿Vale la pena el VIP Soundcheck?
* **CTA Final:** "Revisa la disponibilidad en tu país ahora" -> Link a `/peru` o `/chile`.

**JSON-LD (BlogPosting):**
Incluir `headline`, `image`, `author` (Autoridad E-E-A-T), y `datePublished`.

#### **C. Página: `/tienda/[slug]/page.tsx**`

*Producto:* "ARMY BOMB Ver. 4 - Lightstick Oficial"

**Características UX:**

* Galería de imágenes con zoom.
* Botón "Añadir al Carrito" flotante en móvil (`sticky bottom`).
* Reseñas "Hardcodeadas" para Rich Snippets (Estrellas en Google).

**JSON-LD (Product & MerchantListing):**

```javascript
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "BTS Official Lightstick Map of the Soul Special Edition",
  "image": "https://entradasbts.com/images/army-bomb-se.jpg",
  "description": "Lightstick oficial con conexión Bluetooth...",
  "brand": { "@type": "Brand", "name": "Big Hit Entertainment" },
  "offers": {
    "@type": "Offer",
    "price": "65.00",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock",
    "shippingDetails": { /* Datos de envío gratis para Merchant Center */ }
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "1542"
  }
}

```

---

### **6. ⚡ ESTRATEGIA DE RENDIMIENTO (CORE WEB VITALS)**

1. **LCP (Largest Contentful Paint):** La imagen del Hero (Banner principal) en `page.tsx` debe tener la propiedad `priority` y `sizes="100vw"`. NO usar `lazy` en la primera imagen.
2. **CLS (Cumulative Layout Shift):** Reservar espacio para todos los componentes asíncronos (como el widget de precios) usando **Skeletons** del mismo tamaño exacto.
3. **Fuentes:** Usar `next/font/google` con la fuente 'Inter' o 'Poppins', configurando `display: swap` y precarga.

---

### **7. 📱 PWA & MOBILE FIRST**

**Archivo `app/manifest.ts`:**

```typescript
import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'BTS App',
    short_name: 'BTS',
    description: 'Compra rápida de entradas para el tour.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0F172A',
    theme_color: '#7C3AED',
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
  };
}

```

---

### **INSTRUCCIONES FINALES PARA LA IA:**

1. **NO** generes explicaciones genéricas ("Aquí tienes el código"). Genera los **archivos completos** listos para producción.
2. **NO** olvides el `trailingSlash: true` en la config, o Cloudflare fallará al recargar páginas anidadas.
3. Asegúrate de que el **Diseño** sea impactante: usa gradientes oscuros de fondo (`bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900`) y texto blanco con alta legibilidad.
4. Crea un componente `Navbar` con efecto "frosted glass" (`backdrop-blur-md sticky top-0`) que contenga enlaces a Países, Blog y Tienda.

---

**FIN**