import { GlassCard } from "@/components/GlassCard";
import { Button } from "@/components/Button";
import Link from "next/link";
import { countries } from "@/lib/data/countries";
import { ArrowRight, MapPin, Calendar } from "lucide-react";

export default function EventsPage() {
    return (
        <div className="min-h-screen pt-24 pb-20 container mx-auto px-4 text-white selection:bg-acid-pink selection:text-black">
            {/* Header */}
            <div className="flex flex-col md:flex-row items-end justify-between mb-12 border-b-4 border-white pb-6">
                <div>
                    <span className="bg-acid-pink text-black px-2 py-1 font-black uppercase text-xs tracking-widest mb-2 inline-block">Gira Mundial</span>
                    <h1 className="text-6xl md:text-9xl font-black uppercase tracking-tighter leading-none">
                        Eventos
                    </h1>
                </div>
                <div className="text-right">
                    <p className="font-serif italic text-xl text-gray-400">Selecciona tu destino</p>
                </div>
            </div>

            {/* Countries Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {countries.map((country, i) => (
                    <Link key={country.id} href={`/${country.id}`} className="group block h-full">
                        <GlassCard variant="interactive" className="h-full flex flex-col p-0 overflow-hidden min-h-[400px]">

                            {/* Map/Flag Section */}
                            <div className="bg-[#111] h-1/2 relative p-8 flex items-center justify-center group-hover:bg-[#1a1a1a] transition-colors border-b-2 border-white">
                                <span className="text-9xl opacity-20 grayscale filter group-hover:grayscale-0 group-hover:opacity-40 transition-all duration-500">{country.flag}</span>
                                <div className="absolute top-4 left-4 bg-white text-black px-2 py-1 text-xs font-black uppercase">
                                    0{i + 1}
                                </div>
                                <div className="absolute bottom-4 right-4 bg-black border border-white px-3 py-1 text-xs font-bold uppercase tracking-widest">
                                    {country.isoCode}
                                </div>
                            </div>

                            <div className="p-8 flex-1 flex flex-col justify-between bg-black">
                                <div>
                                    <h2 className="text-4xl font-black uppercase leading-8 mb-2 group-hover:text-acid-pink transition-colors">{country.city}</h2>
                                    <p className="text-xl font-serif italic text-gray-400">{country.venue}</p>
                                </div>

                                <div className="pt-8 border-t border-white/20 mt-8 space-y-2">
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs font-bold uppercase text-gray-500">Fecha</span>
                                        <span className="text-sm font-bold">{new Date(country.dates[0]).toLocaleDateString('es-ES', { month: 'short', day: 'numeric' })}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs font-bold uppercase text-gray-500">Desde</span>
                                        <span className="text-lg font-mono font-bold text-acid-yellow">{country.currencySymbol}{Math.min(...country.prices.map(p => p.price)).toLocaleString()}</span>
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
