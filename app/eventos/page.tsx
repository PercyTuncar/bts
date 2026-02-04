import Link from "next/link";
import { countries } from "@/lib/data/countries";
import { ArrowRight, MapPin, Calendar, Ticket } from "lucide-react";

export default function EventsPage() {
    return (
        <div className="min-h-screen bg-black text-white pt-24 pb-20 selection:bg-primary/30 selection:text-white">
            {/* Background Glow */}
            <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-purple-glow opacity-20 pointer-events-none" />
            
            <div className="container mx-auto px-4 relative">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
                    <div>
                        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/20 border border-primary/30 text-primary text-xs font-bold uppercase tracking-wider mb-4">
                            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                            Gira Mundial 2026
                        </span>
                        <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tight leading-none">
                            <span className="text-white">Todos los</span><br />
                            <span className="gradient-text">Eventos</span>
                        </h1>
                    </div>
                    <p className="text-white/40 max-w-xs text-right hidden md:block">
                        Selecciona tu destino y asegura tu lugar en el oceano purpura.
                    </p>
                </div>

                {/* Countries Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {countries.map((country, i) => (
                        <Link key={country.id} href={`/${country.id}`} className="group block h-full">
                            <div className="glass-card h-full flex flex-col p-0 overflow-hidden min-h-[380px] rounded-2xl transition-all duration-300 hover:shadow-glow hover:-translate-y-1 hover:border-primary/40">

                                {/* Flag Section */}
                                <div className="h-1/2 relative p-6 flex items-center justify-center bg-gradient-to-br from-white/5 to-transparent border-b border-white/5">
                                    <span className="text-8xl opacity-30 grayscale group-hover:grayscale-0 group-hover:opacity-60 transition-all duration-500">{country.flag}</span>
                                    <div className="absolute top-4 left-4 px-2 py-1 rounded-lg bg-white/10 text-white/60 text-xs font-bold">
                                        0{i + 1}
                                    </div>
                                    <div className="absolute top-4 right-4 px-2 py-1 rounded-full bg-primary/20 text-primary text-[10px] font-bold uppercase">
                                        {country.isoCode}
                                    </div>
                                </div>

                                <div className="p-6 flex-1 flex flex-col justify-between">
                                    <div>
                                        <h2 className="text-2xl font-black uppercase leading-tight mb-1 text-white group-hover:gradient-text transition-colors">{country.city}</h2>
                                        <p className="text-sm text-white/40">{country.venue}</p>
                                    </div>

                                    <div className="pt-4 border-t border-white/10 mt-4 space-y-3">
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center gap-2 text-white/40 text-xs">
                                                <Calendar className="w-3.5 h-3.5" />
                                                <span>{new Date(country.dates[0]).toLocaleDateString('es-ES', { month: 'short', day: 'numeric' })}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-white/40 text-xs">
                                                <MapPin className="w-3.5 h-3.5" />
                                                <span>{country.city}</span>
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <span className="text-[10px] uppercase tracking-wider text-white/30">Desde</span>
                                                <span className="text-xl font-black gradient-text ml-2">{country.currencySymbol}{Math.min(...country.prices.map(p => p.price)).toLocaleString()}</span>
                                            </div>
                                            <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/30 group-hover:border-primary group-hover:text-primary group-hover:bg-primary/10 transition-all">
                                                <ArrowRight className="w-4 h-4" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
