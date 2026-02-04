"use client";

import { motion, AnimatePresence } from "framer-motion";
import { countries } from "@/lib/data/countries";
import { X, ExternalLink, MessageCircle } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";

interface CommunityModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function CommunityModal({ isOpen, onClose }: CommunityModalProps) {
    const pathname = usePathname();
    const isBrazil = pathname?.startsWith('/brasil');

    const t = isBrazil ? {
        title: "Junte-se ao",
        highlight: "Grupo",
        group: "Grupo Oficial",
        members: "+50.000 Armys unidos",
        note: "Nota: Venda oficial ainda nao disponivel."
    } : {
        title: "Unete al",
        highlight: "Grupo",
        group: "Grupo Oficial",
        members: "+50,000 Armys unidos",
        note: "Nota: Venta oficial aun no disponible."
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
                        className="fixed inset-0 bg-black/95 backdrop-blur-xl"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 50 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 50 }}
                        className="relative w-full max-w-lg my-auto"
                    >
                        <div className="relative glass-card rounded-3xl overflow-hidden border-primary/20">

                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 z-20 w-8 h-8 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center transition-all"
                            >
                                <X className="w-4 h-4" />
                            </button>

                            {/* Cover Image */}
                            <div className="relative h-44 w-full">
                                <Image
                                    src="/images/home-hero.jpg"
                                    alt="BTS Army Purple Ocean"
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent" />

                                {/* Floating Badge */}
                                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 z-10">
                                    <div className="w-20 h-20 bg-green-500 rounded-2xl p-1 shadow-[0_0_40px_rgba(37,211,102,0.4)] flex items-center justify-center border-4 border-[#0a0a0a]">
                                        <MessageCircle className="w-10 h-10 text-white fill-current" />
                                    </div>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="pt-14 pb-8 px-6 md:px-8 text-center relative z-10">
                                <motion.div
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.1 }}
                                >
                                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/20 border border-primary/30 text-primary text-xs font-bold uppercase tracking-wider mb-4">
                                        World Tour 2026
                                    </div>
                                    <h2 className="text-3xl md:text-4xl font-black uppercase text-white mb-6 leading-[0.9]">
                                        {t.title} <span className="gradient-text">{t.highlight}</span>
                                    </h2>
                                </motion.div>

                                <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
                                    {countries
                                        .slice()
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
                                                transition={{ delay: 0.1 + (i * 0.05) }}
                                                className={`group flex items-center justify-between p-3 rounded-xl border transition-all duration-300 ${pathname?.includes(country.id)
                                                    ? 'bg-green-500/20 border-green-500/50'
                                                    : 'bg-white/5 border-white/10 hover:bg-green-500/10 hover:border-green-500/30'
                                                    }`}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <span className="text-xl">{country.flag}</span>
                                                    <div className="text-left">
                                                        <span className="block font-bold text-sm text-white">
                                                            Army {country.name}
                                                        </span>
                                                        <span className="text-[10px] text-white/40 flex items-center gap-1">
                                                            <MessageCircle className="w-3 h-3" /> {t.group}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${pathname?.includes(country.id)
                                                    ? 'bg-green-500 text-white'
                                                    : 'bg-white/5 text-white/30 group-hover:bg-green-500 group-hover:text-white'
                                                    }`}>
                                                    <ExternalLink className="w-4 h-4" />
                                                </div>
                                            </motion.a>
                                        ))}
                                </div>

                                <div className="mt-6 pt-4 border-t border-white/10 flex flex-col items-center justify-center gap-2">
                                    <div className="flex -space-x-2 overflow-hidden">
                                        {[1, 2, 3, 4].map(i => (
                                            <div key={i} className="inline-block h-6 w-6 rounded-full ring-2 ring-[#0a0a0a] bg-gradient-to-br from-primary to-secondary" />
                                        ))}
                                    </div>
                                    <p className="text-[10px] text-white/50 uppercase tracking-widest font-bold">
                                        {t.members}
                                    </p>
                                    <p className="text-[10px] text-white/30 mt-1 max-w-[200px] mx-auto leading-tight">
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

