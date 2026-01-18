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
        <div className="min-h-screen pt-24 pb-20 container mx-auto px-4">
            {/* Header */}
            <div className="text-center space-y-6 mb-16 relative">
                <div className="inline-block px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-400 text-xs font-bold tracking-widest uppercase mb-4">
                    RaveHub Insight
                </div>
                <h1 className="text-5xl md:text-7xl font-black text-white">
                    Explora la <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Escena</span>
                </h1>
                <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                    Noticias, entrevistas, guías y todo lo que necesitas saber sobre el mundo de BTS y el K-pop en Latinoamérica.
                </p>

                {/* Search Bar */}
                <div className="max-w-2xl mx-auto mt-8 relative group">
                    <div className="absolute inset-0 bg-purple-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <GlassCard className="rounded-full p-2 flex items-center pl-6 border-white/10 bg-slate-900/60">
                        <Search className="w-5 h-5 text-gray-400 mr-3" />
                        <input
                            type="text"
                            placeholder="Buscar en el blog..."
                            className="bg-transparent border-none outline-none text-white w-full placeholder:text-gray-500 focus:ring-0"
                        />
                        <Button className="rounded-full px-6 bg-purple-600 hover:bg-purple-500 text-white font-bold">Buscar</Button>
                    </GlassCard>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap justify-center gap-3 mt-8">
                    {['Todos', 'News', 'Interviews', 'Reviews', 'Tutorials'].map((filter, i) => (
                        <button key={filter} className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${i === 0 ? 'bg-white text-slate-900 border border-white' : 'text-gray-400 border border-white/10 hover:border-white/30 hover:text-white'}`}>
                            {filter}
                        </button>
                    ))}
                </div>
            </div>

            {/* Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => (
                    <Link href={`/blog/${post.slug}`} key={post.slug} className="group">
                        <GlassCard variant="interactive" className="h-full p-0 flex flex-col border-white/5 bg-slate-900/40">
                            <div className="aspect-[4/3] bg-slate-800 relative overflow-hidden group-hover:opacity-90 transition-opacity">
                                {/* Image Placeholder */}
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-60" />
                                <div className="absolute top-4 left-4 px-3 py-1 rounded bg-orange-500 text-xs font-bold text-white uppercase shadow-lg z-10">
                                    Destacado
                                </div>
                                <div className="absolute bottom-4 left-4 px-3 py-1 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-xs font-medium text-white shadow-sm z-10">
                                    {post.category}
                                </div>
                            </div>
                            <div className="p-6 flex-1 flex flex-col">
                                <h2 className="text-2xl font-bold mb-3 group-hover:text-purple-400 transition-colors line-clamp-2 leading-tight">{post.title}</h2>
                                <p className="text-gray-400 text-sm mb-6 flex-1 line-clamp-3 leading-relaxed">{post.excerpt}</p>
                                <div className="flex items-center gap-3 text-sm text-gray-500 border-t border-white/5 pt-4 mt-auto">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500" />
                                    <span className="font-medium text-gray-300">Admin</span>
                                    <span className="text-gray-600">•</span>
                                    <span>2 min lectura</span>
                                </div>
                            </div>
                        </GlassCard>
                    </Link>
                ))}
            </div>
        </div>
    );
}
