"use client";

import { motion, AnimatePresence } from "framer-motion";
import { getCountryIdFromPathname, countries } from "@/lib/data/countries";
import { X, ExternalLink, MessageCircle, ArrowRight, Check } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";

interface CommunityModalProps {
    isOpen: boolean;
    onClose: () => void;
    userCountryCode?: string;
}

export function CommunityModal({ isOpen, onClose, userCountryCode }: CommunityModalProps) {
    const pathname = usePathname();
    const currentCountryId = getCountryIdFromPathname(pathname);
    
    const allCountries = countries.filter(c => c.whatsappLink);
    const currentCountry = allCountries.find(c => c.id === currentCountryId);
    const otherCountries = allCountries.filter(c => c.id !== currentCountryId);

    const t = {
        title: "Grupo de WhatsApp",
        subtitle: "Chatea con otros Armys",
        description: "Coordina entradas y prepárate para el show.",
        cta: "Unirse al grupo",
        members: "+50,000 Armys",
        note: "Precios oficiales en cada zona.",
        close: "Cerrar",
        otherGroups: "Otros grupos"
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className="relative w-full max-w-sm"
                    >
                        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
                            
                            {/* Header - Compact */}
                            <div className="relative h-24 bg-gradient-to-br from-[#25D366] to-[#128C7E] p-4 text-center flex-shrink-0">
                                <button
                                    onClick={onClose}
                                    className="absolute top-2 right-2 w-7 h-7 bg-white/20 hover:bg-white/30 text-white rounded-full flex items-center justify-center"
                                    aria-label="Cerrar"
                                >
                                    <X className="w-4 h-4" />
                                </button>

                                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center mx-auto mb-2">
                                    <Image src="/images/whatsapp.svg" alt="WhatsApp" width={20} height={20} className="text-[#25D366]" />
                                </div>
                                
                                <h2 className="text-lg font-black text-white uppercase">{t.title}</h2>
                            </div>

                            {/* Content - Scrollable */}
                            <div className="p-4 overflow-y-auto flex-1">
                                {/* Current Country - Compact */}
                                {currentCountry && (
                                    <div className="bg-[#25D366]/10 border border-[#25D366] rounded-lg p-3 mb-3">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="text-xl">{currentCountry.flag}</span>
                                            <div className="flex-1">
                                                <p className="text-sm font-black text-slate-900">{currentCountry.name}</p>
                                            </div>
                                            <div className="w-7 h-7 bg-[#25D366] rounded-full flex items-center justify-center">
                                                <Check className="w-4 h-4 text-white" />
                                            </div>
                                        </div>
                                        <a
                                            href={currentCountry.whatsappLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-center gap-1 w-full bg-[#25D366] hover:bg-[#128C7E] text-white font-bold text-sm py-2 rounded-lg transition-colors"
                                        >
                                            {t.cta} <ArrowRight className="w-4 h-4" />
                                        </a>
                                    </div>
                                )}

                                <p className="text-slate-500 text-xs text-center mb-3">{t.description}</p>

                                {/* Other Countries - Compact Grid */}
                                {otherCountries.length > 0 && (
                                    <>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase mb-2">{t.otherGroups}</p>
                                        <div className="grid grid-cols-2 gap-1.5">
                                            {otherCountries.map((country) => (
                                                <a
                                                    key={country.id}
                                                    href={country.whatsappLink}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 px-2 py-1.5 rounded-lg transition-colors"
                                                >
                                                    <span className="text-base">{country.flag}</span>
                                                    <span className="text-xs font-medium text-slate-700 flex-1 truncate">{country.name}</span>
                                                    <ExternalLink className="w-3 h-3 text-slate-400 flex-shrink-0" />
                                                </a>
                                            ))}
                                        </div>
                                    </>
                                )}

                                {/* Footer */}
                                <div className="mt-4 pt-3 border-t border-slate-100 text-center">
                                    <p className="text-[10px] text-slate-400 flex items-center justify-center gap-1">
                                        <MessageCircle className="w-3 h-3" /> {t.members}
                                    </p>
                                </div>
                            </div>

                            {/* Bottom close button */}
                            <div className="px-4 pb-3 flex-shrink-0">
                                <button
                                    onClick={onClose}
                                    className="w-full py-1.5 text-slate-400 hover:text-slate-600 text-xs font-medium transition-colors"
                                >
                                    {t.close}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}