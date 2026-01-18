import Link from "next/link";
import { GlassCard } from "@/components/GlassCard";
import { Button } from "@/components/Button";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Tienda Oficial BTS World Tour 2026",
    description: "Merch oficial del tour. Army Bombs, Hoodies y accesorios exclusivos."
};

import { products } from "@/lib/data/products";

export default function StoreIndex() {
    return (
        <div className="min-h-screen pt-24 pb-20 container mx-auto px-4 text-white selection:bg-cyan-400 selection:text-black">
            {/* Header */}
            <div className="flex flex-col md:flex-row items-end justify-between mb-16 border-b-4 border-white pb-8 gap-6">
                <div>
                    <span className="bg-cyan-400 text-black px-2 py-1 font-black uppercase text-xs tracking-widest mb-2 inline-block">Merch Oficial</span>
                    <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none">
                        Tour <span className="text-outline-white text-transparent">Shop</span>
                    </h1>
                </div>
                <div className="text-right">
                    <p className="font-serif italic text-xl text-gray-400">Colección Exclusiva</p>
                    <p className="text-xs font-bold uppercase tracking-widest text-cyan-400">Envíos a todo el mundo</p>
                </div>
            </div>

            {/* Product Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {products.map((product) => (
                    <Link key={product.slug} href={`/tienda/${product.slug}`} className="group block h-full">
                        <div className="h-full border-2 border-white bg-black hover:bg-[#111] transition-colors flex flex-col relative group hover:-translate-y-2 transition-transform duration-300">
                            {/* Tag */}
                            <div className="absolute top-0 right-0 bg-white text-black text-xs font-black uppercase px-2 py-1 z-10">
                                Nuevo
                            </div>

                            <div className="aspect-square bg-[#1a1a1a] border-b-2 border-white flex items-center justify-center p-8 overflow-hidden">
                                <div className="w-32 h-32 bg-gray-800 shadow-[10px_10px_0_#000] rotate-3 group-hover:rotate-6 transition-transform duration-500" />
                            </div>

                            <div className="p-6 flex-1 flex flex-col">
                                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">{product.category}</p>
                                <h3 className="text-xl font-black uppercase leading-none mb-4 group-hover:text-cyan-400 transition-colors">{product.name}</h3>

                                <div className="mt-auto flex items-center justify-between">
                                    <p className="text-2xl font-mono font-bold">${product.price}</p>
                                    <div className="w-8 h-8 bg-white text-black flex items-center justify-center font-bold text-lg group-hover:bg-cyan-400 transition-colors">
                                        +
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
