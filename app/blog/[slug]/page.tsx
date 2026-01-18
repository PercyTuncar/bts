import { GlassCard } from "@/components/GlassCard";
import { Button } from "@/components/Button";
import Link from "next/link";
import { Metadata } from "next";

type Props = {
    params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    // In a real app, fetch data. specific mapping for demo:
    const title = slug === 'guide'
        ? "Guía Definitiva: Cómo Sobrevivir a la Fila Virtual de BTS"
        : "Noticia BTS";

    return {
        title: `${title} | Blog BTS 2026`,
    };
}

export default async function BlogPost({ params }: Props) {
    const { slug } = await params;

    // Disclaimer: Content hardcoded for the requested "viral" example.
    if (slug !== 'guide') {
        return (
            <GlassCard className="text-center py-20">
                <h1 className="text-3xl font-bold">Artículo no encontrado (Demo)</h1>
                <p className="mt-4">Prueba con <Link href="/blog/guide" className="text-secondary underline">/blog/guide</Link></p>
            </GlassCard>
        );
    }

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": "Guía Definitiva: Cómo Sobrevivir a la Fila Virtual de BTS y Conseguir Entrada",
        "image": ["https://entradasbts.com/images/queue-guide.jpg"],
        "datePublished": "2026-01-15T08:00:00+08:00",
        "dateModified": "2026-01-15T09:20:00+08:00",
        "author": [{
            "@type": "Person",
            "name": "Admin Purple",
            "url": "https://entradasbts.com/team"
        }]
    };

    return (
        <article className="max-w-3xl mx-auto space-y-8 py-10">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <header className="space-y-4 text-center">
                <div className="inline-block px-3 py-1 rounded-full bg-secondary/20 text-secondary text-sm font-bold">
                    Guías
                </div>
                <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
                    Guía Definitiva: Cómo Sobrevivir a la Fila Virtual de BTS y Conseguir Entrada
                </h1>
                <p className="text-gray-400">Publicado el 15 de Enero, 2026</p>
            </header>

            <GlassCard className="prose prose-invert prose-lg max-w-none bg-black/40">
                <p className="lead text-xl text-gray-200">
                    Sabemos que el corazón se te sale del pecho. Ha pasado años, y por fin están aquí.
                    Pero hay un obstáculo final: la temida Fila Virtual.
                </p>

                <h2 className="text-purple-400">Requisitos Previos</h2>
                <ul>
                    <li><strong>Cuenta Verificada:</strong> No esperes al último día. Verifica tu email y teléfono en la ticketera.</li>
                    <li><strong>Tarjeta Habilitada:</strong> Llama a tu banco hoy mismo y autoriza compras online por montos altos.</li>
                </ul>

                <h2 className="text-purple-400">El Mito del F5</h2>
                <p>
                    <strong>NO REFRESQUES LA PÁGINA</strong> una vez que estés en la fila. Si lo haces, perderás tu ID de sesión y volverás al final.
                    La barra de progreso es lenta, pero avanza.
                </p>

                <h2 className="text-purple-400">Mapa del Estadio Explicado</h2>
                <p>
                    Las zonas VIP Soundcheck son las primeras en agotarse. Si tu presupuesto es ajustado, apunta a "Oriente" o "Occidente";
                    tienen mejor vista que "Norte" y menos caos que "Campo".
                </p>

                <h3 className="text-pink-400">¿Vale la pena el VIP Soundcheck?</h3>
                <p>
                    Absolutamente. Verlos ensayar en ropa casual es una experiencia íntima que no se compara con el show principal.
                </p>

                <div className="not-prose mt-12 p-6 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-xl border border-white/10 text-center">
                    <h3 className="text-2xl font-bold mb-4">¡No te quedes fuera!</h3>
                    <p className="mb-6">Revisa los precios y zonas oficiales para tu país ahora mismo.</p>
                    <div className="flex justify-center gap-4">
                        <Link href="/peru"><Button>Ver Perú</Button></Link>
                        <Link href="/chile"><Button variant="secondary">Ver Chile</Button></Link>
                    </div>
                </div>
            </GlassCard>
        </article>
    );
}

export async function generateStaticParams() {
    return [
        { slug: 'guide' },
        { slug: 'setlist-rumors' },
    ];
}
