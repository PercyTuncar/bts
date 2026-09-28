// components/HreflangTags.tsx
// Componente para renderizar hreflang tags en el <head> de cada página
// Google prefiere hreflang en HTML sobre sitemap XML para mejor indexación

interface HreflangTag {
  hreflang: string;
  href: string;
}

interface HreflangTagsProps {
  tags: HreflangTag[];
}

export function HreflangTags({ tags }: HreflangTagsProps) {
  return (
    <>
      {tags.map((tag) => (
        <link
          key={tag.hreflang}
          rel="alternate"
          hrefLang={tag.hreflang}
          href={tag.href}
        />
      ))}
    </>
  );
}

// Default hreflang structure para todas las páginas del sitio
export const DEFAULT_HREFLANG_TAGS: HreflangTag[] = [
  { hreflang: 'es', href: 'https://entradasbts.com/' },
  { hreflang: 'es-PE', href: 'https://entradasbts.com/peru/' },
  { hreflang: 'es-CL', href: 'https://entradasbts.com/chile/' },
  { hreflang: 'es-MX', href: 'https://entradasbts.com/mexico/' },
  { hreflang: 'es-CO', href: 'https://entradasbts.com/colombia/' },
  { hreflang: 'es-AR', href: 'https://entradasbts.com/argentina/' },
  { hreflang: 'es-ES', href: 'https://entradasbts.com/madrid/' },
  { hreflang: 'pt-BR', href: 'https://entradasbts.com/brasil/' },
  // x-default apunta al selector de país para tráfico sin país/idioma detectado
  { hreflang: 'x-default', href: 'https://entradasbts.com/eventos/' },
];
