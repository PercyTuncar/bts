"use client";

import { motion, AnimatePresence } from "framer-motion";
import { countries } from "@/lib/data/countries";
import { X, ExternalLink, MessageCircle, Heart } from "lucide-react";
import { GlassCard } from "./GlassCard";
import Image from "next/image";

import { usePathname } from "next/navigation";

interface CommunityModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function CommunityModal({ isOpen, onClose }: CommunityModalProps) {
    const pathname = usePathname();
    const isBrazil = pathname?.startsWith('/brasil');

    // Translations
    const t = isBrazil ? {
        title: "Junte-se ao",
        highlight: "Grupo",
        description: "Entre no chat do seu país, coordene seus ingressos e prepare-se para o show.",
        group: "Grupo Oficial",
        members: "+50.000 Armys unidos",
        note: "Nota: Venda oficial ainda não disponível. Preços e setores são referenciais."
    } : {
        title: "Únete al",
        highlight: "Grupo",
        description: "Únete al chat de tu país, coordina tus entradas y prepárate para el show.",
        group: "Grupo Oficial",
        members: "+50,000 Armys unidos",
        note: "Nota: Venta oficial aún no lo tenemos disponible. Precios y zonas son referenciales."
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 overflow-y-auto">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/90 backdrop-blur-md"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 50 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 50 }}
                        className="relative w-full max-w-lg my-auto"
                    >
                        <div className="relative bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-2xl">

                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 z-20 w-8 h-8 bg-white/50 hover:bg-white text-slate-900 shadow-sm rounded-full flex items-center justify-center transition-all backdrop-blur-sm"
                            >
                                <X className="w-4 h-4" />
                            </button>

                            {/* Cover Image */}
                            <div className="relative h-52 w-full">
                                <Image
                                    src="/images/home-hero.jpg"
                                    alt="BTS Army Purple Ocean"
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent"></div>

                                {/* Floating Badge */}
                                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 z-10">
                                    <div className="w-24 h-24 bg-[#25D366] rounded-full p-1 shadow-[0_0_40px_rgba(37,211,102,0.4)] flex items-center justify-center border-[6px] border-[#0a0a0a]">
                                        <img src="/images/whatsapp.svg" alt="WhatsApp" className="w-12 h-12" />
                                    </div>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="pt-16 pb-12 px-8 md:px-12 text-center relative z-10">
                                <motion.div
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.1 }}
                                >
                                    <div className="inline-block bg-primary text-white px-4 py-1 text-sm font-black uppercase -rotate-2 mb-4 shadow-sm">
                                        World Tour 2026
                                    </div>
                                    <h2 className="text-4xl md:text-5xl font-black uppercase italic text-slate-900 mb-2 leading-[0.9]">
                                        {t.title} <span className="text-primary">{t.highlight}</span>
                                    </h2>
                                    <p className="text-slate-500 font-medium text-sm md:text-base leading-relaxed mb-8 max-w-xs mx-auto mt-4">
                                        <strong className="text-slate-900">{isBrazil ? "Entre no chat do seu país" : "Únete al chat de tu país"}</strong>, {isBrazil ? "coordene seus ingressos e prepare-se para o show." : "coordina tus entradas y prepárate para el show."}
                                    </p>
                                </motion.div>

                                <div className="space-y-3">
                                    {countries
                                        .slice() // Create a copy to avoid mutating the original array
                                        .sort((a, b) => {
                                            const currentCountryId = pathname?.split('/')[1];
                                            if (a.id === currentCountryId) return -1;
                                            if (b.id === currentCountryId) return 1;
                                            return 0;
                                        })
                                        .map((country, i) => (
                                            <motion.a
                                                key={country.id}
                                                href={country.whatsappLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                initial={{ x: -20, opacity: 0 }}
                                                animate={{ x: 0, opacity: 1 }}
                                                transition={{ delay: 0.2 + (i * 0.1) }}
                                                className={`group flex items-center justify-between p-4 rounded-xl border transition-all duration-300 ${pathname?.includes(country.id)
                                                    ? 'bg-[#25D366]/10 border-[#25D366] hover:bg-[#25D366]/20'
                                                    : 'bg-slate-50 border-slate-200 hover:bg-[#25D366] hover:border-[#25D366]'
                                                    }`}
                                            >
                                                <div className="flex items-center gap-4">
                                                    <span className="text-2xl">{country.flag}</span>
                                                    <div className="text-left">
                                                        <span className={`block font-black uppercase text-sm tracking-widest transition-colors ${pathname?.includes(country.id) ? 'text-[#166534]' : 'text-slate-900 group-hover:text-white'
                                                            }`}>
                                                            Army {country.name}
                                                        </span>
                                                        <span className={`text-[10px] font-bold uppercase transition-colors flex items-center gap-1 ${pathname?.includes(country.id) ? 'text-[#166534]' : 'text-slate-500 group-hover:text-white/90'
                                                            }`}>
                                                            <MessageCircle className="w-3 h-3" /> {t.group}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${pathname?.includes(country.id)
                                                    ? 'bg-[#25D366] text-white'
                                                    : 'bg-white border border-slate-200 text-slate-400 group-hover:bg-white/20 group-hover:text-black group-hover:border-transparent'
                                                    }`}>
                                                    <ExternalLink className="w-4 h-4" />
                                                </div>
                                            </motion.a>
                                        ))}
                                </div>

                                <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col items-center justify-center gap-2">
                                    <div className="flex -space-x-2 overflow-hidden">
                                        {[1, 2, 3, 4].map(i => (
                                            <div key={i} className="inline-block h-6 w-6 rounded-full ring-2 ring-white bg-slate-200"></div>
                                        ))}
                                    </div>
                                    <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">
                                        {t.members}
                                    </p>
                                    <p className="text-[10px] text-slate-400 mt-2 max-w-[200px] mx-auto leading-tight">
                                        {t.note}
                                    </p>
                                </div>
                            </div>

                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}

