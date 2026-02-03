import Link from "next/link";
import { GlassCard } from "@/components/GlassCard";
import { Button } from "@/components/Button";
import { Search } from "lucide-react";

export default function BlogIndex() {
    const posts = [
        {
            slug: "bts-en-netflix",
            title: "BTS en Netflix: Comeback en Vivo y Documental",
            excerpt: "¡Confirmado! BTS llega a Netflix con un concierto en vivo desde Seúl y el documental 'El Regreso'. Horarios para Latinoamérica.",
            category: "News",
            image: "/images/bts-en-netflix-portada.avif"
        },
        {
            slug: "bts-en-dubai-2026-confirmado-viaje",
            title: "BTS en Dubai 2026: Confirman Viaje",
            excerpt: "¡ÚLTIMA HORA! Confirmado: OT7 viajan juntos a Dubai. Todo sobre su agenda y posible concierto.",
            category: "News",
            image: "/images/bts-incheon-airport-feb-2026.jpeg"
        },
        {
            slug: "boletos-bts-mexico",
            title: "Boletos BTS México 2026: Precios Oficiales y Mapa",
            excerpt: "Lista confirmada de precios, zonas y guía de preventa Weverse para el Estadio GNP Seguros.",
            category: "News",
            image: "/images/mapa-bts-mexico-2026.png"
        },
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
        <div className="min-h-screen pt-24 pb-20 container mx-auto px-4 text-slate-900 selection:bg-secondary selection:text-white">
            {/* Header */}
            <div className="text-left space-y-6 mb-16 border-b-4 border-slate-200 pb-8">
                <div className="bg-secondary text-slate-900 inline-block px-4 py-1 font-black uppercase tracking-widest text-lg transform -rotate-1">
                    RaveHub Insight
                </div>
                <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-4 leading-none">
                    Noticias y <span className="text-primary italic font-serif">Cultura</span>
                </h1>

                {/* Search Bar */}
                <div className="max-w-xl mt-8 relative">
                    <div className="flex border border-slate-200 bg-white focus-within:border-primary transition-colors shadow-sm">
                        <input
                            type="text"
                            placeholder="BUSCAR ARTÍCULOS..."
                            className="bg-transparent border-none outline-none text-slate-900 w-full px-6 py-4 font-bold uppercase placeholder:text-slate-400 focus:ring-0"
                        />
                        <button className="bg-slate-50 text-slate-900 px-6 font-black uppercase hover:bg-secondary hover:text-white transition-colors border-l border-slate-200">
                            <Search className="w-6 h-6" />
                        </button>
                    </div>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap gap-2 mt-8">
                    {['Todos', 'Noticias', 'Entrevistas', 'Reseñas'].map((filter, i) => (
                        <button key={filter} className={`px-4 py-2 text-xs font-bold uppercase border transition-all ${i === 0 ? 'bg-slate-900 text-white border-slate-900' : 'border-slate-200 text-slate-500 hover:border-primary hover:text-primary'}`}>
                            {filter}
                        </button>
                    ))}
                </div>
            </div>

            {/* Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => (
                    <Link href={`/blog/${post.slug}`} key={post.slug} className="group block h-full">
                        <div className="h-full border border-slate-200 bg-white hover:shadow-lg transition-all flex flex-col relative">
                            {/* Hover Shadow Effect */}
                            <div className="absolute inset-0 border-2 border-primary translate-x-2 translate-y-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                            <div className="aspect-[4/3] bg-slate-100 relative border-b border-slate-200 overflow-hidden">
                                {/* Placeholder for actual image */}
                                {/* Post Image */}
                                {post.image && (
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                )}
                                {!post.image && <div className="absolute inset-0 bg-slate-200" />}
                                <div className="absolute top-4 left-4 bg-secondary text-slate-900 px-2 py-1 text-xs font-black uppercase shadow-sm z-10">
                                    {post.category}
                                </div>
                            </div>

                            <div className="p-6 flex-1 flex flex-col justify-between">
                                <div>
                                    <h2 className="text-2xl font-black uppercase leading-8 mb-4 text-slate-900 group-hover:text-primary transition-colors">{post.title}</h2>
                                    <p className="text-slate-500 font-serif italic text-sm mb-6 line-clamp-3">{post.excerpt}</p>
                                </div>
                                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                                    <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Por Admin</span>
                                    <span className="text-xs font-bold text-slate-900">2 min lectura</span>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
