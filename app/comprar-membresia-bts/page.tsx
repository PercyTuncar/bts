import type { Metadata } from 'next';
import MembershipClient from './MembershipClient';

export const metadata: Metadata = {
    title: 'Comprar Membresía BTS Peru',
    description: '¡Únete al ARMY oficial! Compra tu Membresía BTS Global por S/. 99.50. Accede a preventas de conciertos, sorteos y contenido exclusivo en Weverse. Pago seguro con Mercado Pago.',
    keywords: ['membresía bts precio perú', 'comprar army membership', 'bts fanclub oficial', 'beneficios membresía bts', 'weverse shop bts'],
    alternates: {
        canonical: 'https://entradasbts.com/comprar-membresia-bts',
    },
    openGraph: {
        title: 'Compra tu Membresía BTS ARMY Oficial - S/. 99.50',
        description: 'Asegura tu acceso a preventas de entradas y contenido exclusivo de BTS. Únete al Fanclub oficial hoy mismo.',
        images: [
            {
                url: '/images/bts-group-hero.jpg',
                width: 1200,
                height: 630,
                alt: 'Membresía BTS Global Official Fanclub ARMY',
            }
        ],
        type: 'website',
        locale: 'es_PE',
    }
};

export default function MembershipPage() {
    return <MembershipClient />;
}
