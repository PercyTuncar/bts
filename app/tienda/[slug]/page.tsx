import { GlassCard } from "@/components/GlassCard";
import { Button } from "@/components/Button";
import Link from "next/link";
import { Metadata } from "next";

type Props = {
    params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const name = slug === 'army-bomb' ? 'ARMY BOMB Ver. 4' : 'Producto BTS';
    return {
        title: `${name} | Tienda BTS`,
    };
}

export default async function ProductPage({ params }: Props) {
    const { slug } = await params;

    if (slug !== 'army-bomb') {
        return (
            <GlassCard className="text-center py-20">
                <h1 className="text-3xl font-bold">Producto no encontrado</h1>
                <p className="mt-4">Mira el <Link href="/tienda/army-bomb" className="text-secondary underline">ARMY BOMB</Link></p>
            </GlassCard>
        );
    }

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": "BTS Official Lightstick Map of the Soul Special Edition",
        "image": "https://entradasbts.com/images/army-bomb-se.jpg",
        "description": "Lightstick oficial con conexión Bluetooth para sincronización en conciertos.",
        "brand": { "@type": "Brand", "name": "Big Hit Entertainment" },
        "offers": {
            "@type": "Offer",
            "price": "65.00",
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock",
            "url": "https://entradasbts.com/tienda/army-bomb"
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "1542"
        }
    };

    return (
        <div className="py-10">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <div className="grid md:grid-cols-2 gap-12">
                {/* Product Images */}
                <div className="space-y-4">
                    <div className="aspect-square bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 relative overflow-hidden group">
                        <div className="text-9xl group-hover:scale-110 transition-transform duration-500">💣</div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        <div className="aspect-square bg-white/5 rounded-xl border border-white/10"></div>
                        <div className="aspect-square bg-white/5 rounded-xl border border-white/10"></div>
                        <div className="aspect-square bg-white/5 rounded-xl border border-white/10"></div>
                    </div>
                </div>

                {/* Product Info */}
                <div className="space-y-8">
                    <div>
                        <h1 className="text-4xl font-bold mb-2">ARMY BOMB Ver. 4</h1>
                        <p className="text-xl text-gray-400">Map of the Soul Special Edition</p>
                        <div className="flex items-center gap-2 mt-4 text-yellow-400">
                            ★★★★★ <span className="text-gray-400 text-sm">(1542 Reviews)</span>
                        </div>
                    </div>

                    <div className="text-3xl font-bold text-white">$65.00</div>

                    <GlassCard className="space-y-4 bg-white/5">
                        <p className="text-gray-300 leading-relaxed">
                            El lightstick oficial indispensable para el World Tour 2026.
                            Se sincroniza automáticamente con tu asiento en el estadio para crear el océano púrpura.
                            Incluye photocards exclusivas.
                        </p>
                        <ul className="list-disc list-inside text-gray-300 space-y-1">
                            <li>Conexión Bluetooth 5.0</li>
                            <li>Modo Aurora Boreal</li>
                            <li>Duración de batería: 5 horas</li>
                        </ul>
                    </GlassCard>

                    <div className="flex gap-4 sticky bottom-4 z-50 md:static">
                        <Button size="lg" className="flex-1 shadow-xl shadow-primary/20">
                            Añadir al Carrito
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export async function generateStaticParams() {
    return [
        { slug: 'army-bomb' },
        { slug: 'hoodie' },
    ];
}
