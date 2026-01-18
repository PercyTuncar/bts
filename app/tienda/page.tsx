import Link from "next/link";
import { GlassCard } from "@/components/GlassCard";
import { Button } from "@/components/Button";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Tienda Oficial BTS World Tour 2026",
    description: "Merch oficial del tour. Army Bombs, Hoodies y accesorios exclusivos."
};

const products = [
    {
        slug: 'army-bomb',
        name: 'BTS Official Light Stick Ver. SE: Map of the Soul',
        price: 59.99,
        category: 'Light Stick',
        image: '/images/products/army-bomb.jpg'
    },
    {
        slug: 'tour-hoodie',
        name: 'World Tour 2026 Official Hoodie (Black)',
        price: 85.00,
        category: 'Apparel',
        image: '/images/products/hoodie.jpg'
    },
    {
        slug: 'tour-tshirt',
        name: 'Vintage Tour Tee 2026',
        price: 45.00,
        category: 'Apparel',
        image: '/images/products/tshirt.jpg'
    }
];

export default function StoreIndex() {
    return (
        <div className="min-h-screen pt-24 pb-20 container mx-auto px-4">
            {/* Header */}
            <div className="text-center space-y-4 mb-16">
                <span className="text-cyan-400 font-bold tracking-widest text-sm uppercase">Official Merch</span>
                <h1 className="text-5xl md:text-6xl font-black text-white">
                    Tienda <span className="text-primary">Oficial</span>
                </h1>
                <p className="text-xl text-gray-400">Colección exclusiva del tour. Envíos a todo Latinoamérica.</p>
            </div>

            {/* Product Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {products.map((product) => (
                    <Link key={product.slug} href={`/tienda/${product.slug}`} className="group">
                        <GlassCard className="h-full p-0 flex flex-col hover:border-primary/50 transition-colors bg-slate-900/40">
                            <div className="aspect-square bg-slate-800 p-8 flex items-center justify-center relative overflow-hidden group-hover:bg-slate-800/80 transition-colors">
                                {/* Image Placeholder */}
                                <div className="w-full h-full bg-slate-700/30 rounded-full blur-3xl absolute" />
                                <div className="w-32 h-32 bg-gray-600 rounded-lg shadow-2xl z-10 group-hover:scale-110 transition-transform duration-500" />

                                <div className="absolute top-4 right-4 bg-slate-900/80 backdrop-blur px-2 py-1 rounded text-xs font-bold text-white border border-white/10">
                                    NEW
                                </div>
                            </div>
                            <div className="p-6 flex-1 flex flex-col text-center">
                                <p className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-2">{product.category}</p>
                                <h3 className="font-bold text-lg mb-2 group-hover:text-cyan-400 transition-colors line-clamp-2">{product.name}</h3>
                                <p className="text-2xl font-bold text-white mt-auto">${product.price.toFixed(2)}</p>
                                <Button size="sm" className="w-full mt-4 bg-white/10 hover:bg-white/20 border-none group-hover:bg-cyan-500 group-hover:text-slate-900">
                                    Ver producto
                                </Button>
                            </div>
                        </GlassCard>
                    </Link>
                ))}
            </div>
        </div>
    );
}
