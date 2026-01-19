"use client";

import { GlassCard } from "@/components/GlassCard";
import { countries } from "@/lib/data/countries";
import { ExternalLink, ShieldCheck, Lock, Users } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function JoinClient() {
    // Initial static values for SSR consistency (to avoid hydration mismatch, initially static)
    // Actually, to avoid hydration mismatch, we should render same thing or just use useEffect to start randomizing
    const [queueCounts, setQueueCounts] = useState([142, 98, 76, 54]);

    useEffect(() => {
        const intervals = queueCounts.map((_, index) => {
            const updateCount = () => {
                setQueueCounts(prev => {
                    const newCounts = [...prev];
                    // Randomly change count by -2 to +5 to simulate active queue
                    const change = Math.floor(Math.random() * 8) - 2;
                    newCounts[index] = Math.max(10, newCounts[index] + change);
                    return newCounts;
                });

                // Set next update for this specific item randomly between 2s and 5s
                const nextDelay = Math.random() * 3000 + 2000;
                timeouts[index] = setTimeout(updateCount, nextDelay);
            };

            // Initial trigger
            const firstDelay = Math.random() * 3000 + 2000;
            return setTimeout(updateCount, firstDelay);
        });

        const timeouts: NodeJS.Timeout[] = intervals;

        return () => {
            timeouts.forEach(t => clearTimeout(t));
        };
    }, []);

    return (
        <div className="min-h-screen bg-black text-white relative flex flex-col items-center justify-center p-4 overflow-hidden pt-20">
            {/* BACKGROUND ATMOSPHERE */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 bg-[url('/images/home-hero.jpg')] bg-cover bg-center opacity-20 blur-sm scale-110"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/40"></div>
                <div className="absolute inset-0 bg-noise opacity-30 mix-blend-overlay"></div>
            </div>

            <main className="relative z-10 w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">

                {/* LEFT COLUMN: PERSUASION & COPY */}
                <div className="space-y-8 text-center lg:text-left order-2 lg:order-1">
                    <div className="inline-flex items-center gap-2 bg-[#25D366]/10 border border-[#25D366]/20 px-4 py-2 rounded-full backdrop-blur-sm">
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#25D366]"></span>
                        </span>
                        <span className="text-[#25D366] text-xs font-bold uppercase tracking-widest">Paso 1 de 2: Verificación Requerida</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-black uppercase italic leading-[0.85] tracking-tighter">
                        <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400">Antes de</span>
                        <span className="block text-white">Finalizar <span className="text-[#25D366] inline-block border-b-4 border-[#25D366]">Tu Compra</span></span>
                    </h1>

                    <p className="text-lg md:text-xl text-gray-300 font-medium leading-relaxed max-w-xl mx-auto lg:mx-0">
                        Debes unirte al grupo de WhatsApp.
                    </p>



                    <div className="flex flex-col gap-4 text-sm text-gray-400 max-w-md mx-auto lg:mx-0 bg-white/5 p-6 rounded-2xl border border-white/10">
                        <div className="flex items-center gap-3">
                            <Lock className="w-5 h-5 text-[#25D366]" />
                            <span>Acceso a información exclusiva</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <ShieldCheck className="w-5 h-5 text-[#25D366]" />
                            <span>Confirmación de Identidad</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Users className="w-5 h-5 text-[#25D366]" />
                            <span>Prioridad en Fila Virtual</span>
                        </div>
                    </div>
                </div>

                {/* RIGHT COLUMN: ACTION CARDS */}
                <div className="order-1 lg:order-2 w-full max-w-md mx-auto relative mt-6">
                    {/* Glowing Effect behind cards */}
                    <div className="absolute inset-0 bg-[#25D366] blur-[100px] opacity-20 animate-pulse"></div>

                    <GlassCard className="p-6 md:p-8 border-t-4 border-t-[#25D366] relative z-10 flex flex-col gap-4 shadow-2xl shadow-black/50">
                        <h2 className="text-center font-black uppercase text-2xl italic mb-4">
                            Selecciona tu País <br />
                            <span className="text-sm font-bold not-italic text-gray-400 tracking-widest">Ingresa al Grupo de WhatsApp</span>
                        </h2>

                        <div className="space-y-3">
                            {countries.map((country, i) => (
                                <Link
                                    key={country.id}
                                    href={country.whatsappLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group relative block"
                                >
                                    <div className="absolute inset-0 bg-[#25D366] rounded-xl blur opacity-0 group-hover:opacity-75 transition-opacity duration-300"></div>
                                    <div className="relative flex items-center justify-between p-4 rounded-xl bg-[#111] border border-white/10 group-hover:border-[#25D366] group-hover:translate-x-[-2px] group-hover:translate-y-[-2px] transition-all duration-200">
                                        <div className="flex items-center gap-4">
                                            <span className="text-3xl">{country.flag}</span>
                                            <div>
                                                <span className="block font-black uppercase text-sm text-white group-hover:text-[#25D366] transition-colors">
                                                    Unirme al Grupo {country.name}
                                                </span>
                                                <span className="text-[10px] text-gray-500 font-bold uppercase flex items-center gap-1">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse"></div>
                                                    {queueCounts[i] || Math.floor(Math.random() * 50) + 40} personas en fila
                                                </span>
                                            </div>
                                        </div>
                                        <ExternalLink className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors" />
                                    </div>
                                </Link>
                            ))}
                        </div>

                        <div className="mt-6 pt-6 border-t border-white/10 text-center">
                            <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-2">
                                Nota Importante
                            </p>
                            <p className="text-xs text-gray-600 leading-tight">
                                Al unirte, serás notificado inmediatamente cuando se habiliten las entradas. Los precios y zonas mostrados anteriormente son referenciales para la preventa.
                            </p>
                        </div>
                    </GlassCard>
                </div>
            </main>
        </div>
    );
}
