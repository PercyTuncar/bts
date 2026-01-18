import Link from "next/link";
import { GlassCard } from "@/components/GlassCard";
import { Button } from "@/components/Button";
import { Search } from "lucide-react";

export default function BlogIndex() {
    const posts = [
        {
            slug: "guide",
            title: "Guía de Supervivencia: BTS World Tour 2026",
            excerpt: "Todo lo que necesitas saber antes de comprar tu entrada: precios, zonas y consejos para la fila virtual.",
            category: "News",
            image: "/images/blog-1.jpg"
        },
        {
            slug: "setlist-predictions",
            title: "Predicciones del Setlist: ¿Qué canciones volverán?",
            excerpt: "Analizamos las pistas que han dejado los miembros en sus redes sociales.",
            category: "Music",
            image: "/images/blog-2.jpg"
        },
        {
            slug: "outfit-ideas",
            title: "Outfit Ideas: Purple Ocean Style",
            excerpt: "Inspiración para tu look del concierto basada en las últimas eras.",
            category: "Fashion",
            image: "/images/blog-3.jpg"
        }
    ];

    return (
        <div className="min-h-screen pt-24 pb-20 container mx-auto px-4 text-white selection:bg-neon-green selection:text-black">
            {/* Header */}
            <div className="text-left space-y-6 mb-16 border-b-4 border-white pb-8">
                <div className="bg-neon-green text-black inline-block px-4 py-1 font-black uppercase tracking-widest text-lg transform -rotate-1">
                    RaveHub Insight
                </div>
                <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-4 leading-none">
                    Noticias y <span className="text-transparent bg-clip-text bg-white mix-blend-difference italic font-serif">Cultura</span>
                </h1>

                {/* Search Bar */}
                <div className="max-w-xl mt-8 relative">
                    <div className="flex border-2 border-white bg-black focus-within:border-neon-green transition-colors">
                        <input
                            type="text"
                            placeholder="BUSCAR ARTÍCULOS..."
                            className="bg-transparent border-none outline-none text-white w-full px-6 py-4 font-bold uppercase placeholder:text-gray-600 focus:ring-0"
                        />
                        <button className="bg-white text-black px-6 font-black uppercase hover:bg-neon-green transition-colors border-l-2 border-white">
                            <Search className="w-6 h-6" />
                        </button>
                    </div>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap gap-2 mt-8">
                    {['Todos', 'Noticias', 'Entrevistas', 'Reseñas'].map((filter, i) => (
                        <button key={filter} className={`px-4 py-2 text-xs font-bold uppercase border-2 transition-all ${i === 0 ? 'bg-white text-black border-white' : 'border-white/20 text-gray-400 hover:border-neon-green hover:text-white'}`}>
                            {filter}
                        </button>
                    ))}
                </div>
            </div>

            {/* Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => (
                    <Link href={`/blog/${post.slug}`} key={post.slug} className="group block h-full">
                        <div className="h-full border-2 border-white bg-black hover:bg-[#111] transition-colors flex flex-col relative">
                            {/* Hover Shadow Effect */}
                            <div className="absolute inset-0 border-2 border-neon-green translate-x-2 translate-y-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                            <div className="aspect-[4/3] bg-gray-900 relative border-b-2 border-white overflow-hidden">
                                {/* Placeholder for actual image */}
                                <div className="absolute inset-0 bg-gray-800" />
                                <div className="absolute top-4 left-4 bg-neon-green text-black px-2 py-1 text-xs font-black uppercase border border-black z-10">
                                    {post.category}
                                </div>
                            </div>

                            <div className="p-6 flex-1 flex flex-col justify-between">
                                <div>
                                    <h2 className="text-2xl font-black uppercase leading-8 mb-4 group-hover:text-neon-green transition-colors">{post.title}</h2>
                                    <p className="text-gray-400 font-serif italic text-sm mb-6 line-clamp-3">{post.excerpt}</p>
                                </div>
                                <div className="flex items-center justify-between pt-4 border-t border-white/20">
                                    <span className="text-xs font-bold uppercase tracking-widest text-gray-500">Por Admin</span>
                                    <span className="text-xs font-bold text-white">2 min lectura</span>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
