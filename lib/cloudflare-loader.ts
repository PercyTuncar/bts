'use client';

type ImageLoaderProps = {
    src: string;
    width: number;
    quality?: number;
};

export default function cloudflareLoader({ src, width, quality }: ImageLoaderProps) {
    // Evitar doble slash si src viene con slash inicial
    const cleanSrc = src.startsWith('/') ? src.slice(1) : src;

    // Parámetros para Cloudflare Image Resizing
    const params = [
        `width=${width}`,
        `quality=${quality || 75}`,
        'format=auto',
        'fit=scale-down'
    ].join(',');

    // En producción usa el path de Cloudflare, en dev devuelve local si es necesario
    if (process.env.NODE_ENV === 'development') {
        return src;
    }

    return `/cdn-cgi/image/${params}/${cleanSrc}`;
}
