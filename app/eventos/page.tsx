import { GlassCard } from "@/components/GlassCard";
import { Button } from "@/components/Button";
import Link from "next/link";
import { countries } from "@/lib/data/countries";
import { ArrowRight, MapPin, Calendar } from "lucide-react";
import Image from "next/image";

const countryImages: Record<string, string> = {
    peru: "https://cuscoperu.b-cdn.net/wp-content/uploads/2024/02/Atardece-Costa-verde-Lima.webp",
    chile: "https://images.adsttc.com/media/images/6375/4384/bd52/ae22/4b92/1646/large_jpg/guia-de-arquitectura-en-santiago-de-chile-41-edificios-complejos-y-parques-de-la-capital-chilena_43.jpg?1668629390",
    colombia: "https://cloudfront-us-east-1.images.arcpublishing.com/infobae/JAAYCWLOQRHOTKSLAZAH37REYM.jpeg",
    madrid: "https://spanish100.com/wp-content/uploads/2013/04/Madrid-820x410.png",
    mexico: "https://media.vogue.mx/photos/5f95dc072b8eeeefbed2b680/master/w_1600%2Cc_limit/Ciudad-de-Me%25CC%2581xico-Zo%25CC%2581calo.jpg",
    argentina: "https://media.admagazine.com/photos/618a6a585e45a526c6be8f63/master/w_1600,c_limit/61333.jpg",
    brasil: "https://humanidades.com/wp-content/uploads/2018/08/brasil-2-e1574647461361-800x415.jpg",
};

export default function EventsPage() {
    return (
        <div className="min-h-screen pt-24 pb-20 container mx-auto px-4 text-slate-900 selection:bg-secondary selection:text-white">
            {/* Header */}
            <div className="flex flex-col md:flex-row items-end justify-between mb-12 border-b-4 border-slate-200 pb-6">
                <div>
                    <span className="bg-secondary text-slate-900 px-2 py-1 font-black uppercase text-xs tracking-widest mb-2 inline-block">Gira Mundial</span>
                    <h1 className="text-6xl md:text-9xl font-black uppercase tracking-tighter leading-none">
                        Eventos
                    </h1>
                </div>
                <div className="text-right">
                    <p className="font-serif italic text-xl text-slate-400">Selecciona tu destino</p>
                </div>
            </div>

            {/* Countries Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {countries.map((country, i) => (
                    <Link key={country.id} href={`/${country.id}`} className="group block h-full">
                        <GlassCard variant="interactive" className="h-full flex flex-col p-0 overflow-hidden min-h-[400px] border border-slate-200">

                            {/* Image Section */}
                            <div className="h-1/2 relative overflow-hidden">
                                <Image
                                    src={countryImages[country.id] || "/images/stadium-map.png"}
                                    alt={`${country.name} - ${country.city}`}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                <div className="absolute top-4 left-4 bg-white/90 text-slate-900 px-2 py-1 text-xs font-black uppercase">
                                    0{i + 1}
                                </div>
                                <div className="absolute bottom-4 right-4 bg-white border border-slate-200 px-3 py-1 text-xs font-bold uppercase tracking-widest text-slate-900">
                                    {country.isoCode}
                                </div>
                            </div>

                            <div className="p-8 flex-1 flex flex-col justify-between bg-white">
                                <div>
                                    <h2 className="text-4xl font-black uppercase leading-8 mb-2 text-slate-900 group-hover:text-primary transition-colors">{country.city}</h2>
                                    <p className="text-xl font-serif italic text-slate-500">{country.venue}</p>
                                </div>

                                <div className="pt-8 border-t border-slate-200 mt-8 space-y-2">
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs font-bold uppercase text-slate-400">Fecha</span>
                                        <span className="text-sm font-bold text-slate-900">{new Date(country.dates[0]).toLocaleDateString('es-ES', { month: 'short', day: 'numeric' })}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs font-bold uppercase text-slate-400">Desde</span>
                                        <span className="text-lg font-mono font-bold text-primary">{country.currencySymbol}{Math.min(...country.prices.map(p => p.price)).toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>
                        </GlassCard>
                    </Link>
                ))}
            </div>
        </div>
    );
}
