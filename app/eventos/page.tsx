import { GlassCard } from "@/components/GlassCard";
import { Button } from "@/components/Button";
import Link from "next/link";
import { countries } from "@/lib/data/countries";
import { ArrowRight, MapPin, Calendar } from "lucide-react";

export default function EventsPage() {
    return (
        <div className="min-h-screen pt-24 pb-20 container mx-auto px-4">
            {/* Header */}
            <div className="text-center space-y-6 mb-16 animate-fade-in-up">
                <span className="text-purple-400 font-bold tracking-widest text-sm uppercase">World Tour 2026</span>
                <h1 className="text-5xl md:text-7xl font-black text-white">
                    Próximos <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Eventos</span>
                </h1>
                <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                    Selecciona tu país para ver información detallada sobre precios, preventas y paquetes VIP.
                </p>
            </div>

            {/* Countries Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {countries.map((country) => (
                    <Link key={country.id} href={`/${country.id}`} className="group">
                        <GlassCard variant="default" className="h-full flex flex-col p-0 overflow-hidden hover:border-purple-500/50 transition-all duration-300 group-hover:bg-slate-900/40">

                            {/* Flag/Map Placeholder - Could be a dynamic map image ideally */}
                            <div className="h-40 bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center relative overflow-hidden">
                                <span className="text-8xl opacity-20 select-none grayscale group-hover:grayscale-0 transition-all duration-500">{country.flag}</span>
                                <div className="absolute bottom-4 left-4 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 flex items-center gap-2">
                                    <MapPin className="w-3 h-3 text-purple-400" />
                                    <span className="text-xs font-bold text-white uppercase tracking-wider">{country.isoCode}</span>
                                </div>
                            </div>

                            <div className="p-8 flex-1 flex flex-col">
                                <div className="mb-6">
                                    <h2 className="text-3xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">{country.city}</h2>
                                    <p className="text-gray-400 font-medium flex items-center gap-2">
                                        <Calendar className="w-4 h-4 text-gray-500" />
                                        {new Date(country.dates[0]).toLocaleDateString('es-ES', { month: 'long', day: 'numeric', year: 'numeric' })}
                                    </p>
                                </div>

                                <div className="space-y-3 mb-8 flex-1">
                                    <div className="flex justify-between items-center text-sm border-b border-white/5 pb-2">
                                        <span className="text-gray-500">Recinto</span>
                                        <span className="text-gray-300 text-right">{country.venue}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm border-b border-white/5 pb-2">
                                        <span className="text-gray-500">Precios desde</span>
                                        <span className="text-purple-400 font-bold text-right">{country.currencySymbol} {Math.min(...country.prices.map(p => p.price)).toLocaleString()}</span>
                                    </div>
                                </div>

                                <Button className="w-full justify-between group-hover:bg-purple-600 group-hover:text-white transition-all">
                                    Ver Información <ArrowRight className="w-4 h-4" />
                                </Button>
                            </div>
                        </GlassCard>
                    </Link>
                ))}
            </div>
        </div>
    );
}
