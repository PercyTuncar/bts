"use client";

import { motion, AnimatePresence } from "framer-motion";
import { getCountryIdFromPathname, countries, getOrderedWhatsappCountries } from "@/lib/data/countries";
import { X, ChevronDown, Users, ShieldCheck, MessageCircle, Check } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { clsx } from "clsx";

interface CommunityModalProps {
    isOpen: boolean;
    onClose: () => void;
    userCountryCode?: string;
}

export function CommunityModal({ isOpen, onClose, userCountryCode }: CommunityModalProps) {
    const pathname = usePathname();
    const currentCountryId = getCountryIdFromPathname(pathname);
    const [isShaking, setIsShaking] = useState(false);
    
    const orderedCountries = getOrderedWhatsappCountries({ pathname, userCountryCode });
    const isHomeRoute = !currentCountryId;
    const currentCountry = isHomeRoute
        ? undefined
        : orderedCountries.find((country) => country.id === currentCountryId);
    const otherCountries = isHomeRoute
        ? []
        : orderedCountries.filter((country) => country.id !== currentCountry?.id);
    const shouldShowAllCountries = isHomeRoute;

    const t = {
        title: (countryName: string) => `¡Únete a ARMY en ${countryName}!`,
        homeTitle: "Elige tu grupo oficial",
        socialProof: "+5.000 ARMYs conectadas ahora mismo",
        cta: "Unirme al grupo oficial →",
        members: "+5.000 Armys",
        close: "Cerrar",
        otherCountries: "¿Buscas el grupo de otro país?",
        secure: "Consigue tus Entradas seguras y verificadas",
        chooseCountry: "Selecciona el país de tu preferencia y entra al grupo oficial",
    };

    useEffect(() => {
        if (!isShaking) {
            return;
        }

        const timeoutId = window.setTimeout(() => {
            setIsShaking(false);
        }, 350);

        return () => window.clearTimeout(timeoutId);
    }, [isShaking]);

    const handleOverlayClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            setIsShaking(true);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleOverlayClick}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={isShaking ? { opacity: 1, scale: 1, y: 0, x: [0, -6, 6, -6, 6, 0] } : { opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={isShaking ? { duration: 0.35, ease: "easeInOut" } : { type: "spring", damping: 25, stiffness: 300 }}
                        className="relative w-full max-w-sm"
                    >
                        <div className="bg-white rounded-3xl shadow-2xl ring-1 ring-black/5 overflow-hidden max-h-[90vh] flex flex-col">
                            
                            {/* A. Trust Header */}
                            <div className="relative px-6 py-8 text-center bg-white">
                                <button
                                    onClick={onClose}
                                    className="absolute top-4 right-4 w-8 h-8 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full flex items-center justify-center transition-colors"
                                    aria-label="Cerrar"
                                >
                                    <X className="w-4 h-4" />
                                </button>

                                <div className="relative mx-auto mb-4">
                                    <div className="absolute inset-0 bg-[#25D366]/20 rounded-full blur-2xl animate-pulse" style={{ width: '80px', height: '80px', top: '-10px', left: '-10px' }} />
                                    <div className="relative w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto shadow-lg ring-1 ring-black/5">
                                        <Image src="/images/whatsapp.svg" alt="WhatsApp" width={28} height={28} className="text-[#25D366]" />
                                    </div>
                                </div>
                                
                                <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                                    {currentCountry ? t.title(currentCountry.name) : t.homeTitle}
                                </h2>
                            </div>

                            {/* Content - Scrollable */}
                            <div className="px-6 pb-6 overflow-y-auto flex-1">
                                {/* B. Social Proof Module */}
                                <div className="mb-6">
                                    <div className="flex items-center justify-center gap-2 mb-2">
                                        <motion.span
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ delay: 0.3, type: "spring", stiffness: 300, damping: 20 }}
                                            className="relative flex items-center justify-center"
                                        >
                                            <motion.div
                                                animate={{ scale: [1, 1.3, 1], opacity: [1, 0.5, 1] }}
                                                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                                                className="w-2.5 h-2.5 bg-[#25D366] rounded-full"
                                            />
                                        </motion.span>
                                        <span className="text-sm font-medium text-slate-700">{t.socialProof}</span>
                                    </div>
                                    <div className="flex items-center justify-center gap-1.5 text-slate-500 text-xs">
                                        <ShieldCheck className="w-3.5 h-3.5 text-[#25D366]" />
                                        <span className="font-medium text-slate-600">{t.secure}</span>
                                    </div>
                                </div>

                                {/* Current Country Card */}
                                {currentCountry && (
                                    <div className="bg-[#25D366]/5 border border-[#25D366]/30 rounded-2xl p-4 mb-6">
                                        <div className="flex items-center gap-3 mb-3">
                                            <span className="text-2xl">{currentCountry.flag}</span>
                                            <div className="flex-1 text-left">
                                                <p className="text-base font-black text-slate-900">{currentCountry.name}</p>
                                                <p className="text-xs text-slate-500">{currentCountry.venue} · {currentCountry.city}</p>
                                            </div>
                                            <div className="w-8 h-8 bg-[#25D366] rounded-full flex items-center justify-center flex-shrink-0">
                                                <Check className="w-4 h-4 text-white" />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {!isHomeRoute && (
                                    <>
                                        {/* C. Primary CTA - Pulse Animation */}
                                        <motion.button
                                            onClick={() => {
                                                if (currentCountry?.whatsappLink) {
                                                    window.open(currentCountry.whatsappLink, '_blank', 'noopener,noreferrer');
                                                    onClose();
                                                }
                                            }}
                                            disabled={!currentCountry?.whatsappLink}
                                            animate={{
                                                scale: [1, 1.03, 1],
                                                boxShadow: [
                                                    "0px 0px 0px rgba(37,211,102,0)",
                                                    "0px 0px 20px rgba(37,211,102,0.5)",
                                                    "0px 0px 0px rgba(37,211,102,0)"
                                                ]
                                            }}
                                            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className={clsx(
                                                "w-full py-4 bg-[#25D366] text-white font-black text-base rounded-xl",
                                                "flex items-center justify-center gap-2",
                                                "shadow-lg shadow-[#25D366]/30",
                                                "transition-all duration-200",
                                                "focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2",
                                                !currentCountry?.whatsappLink && "opacity-50 cursor-not-allowed"
                                            )}
                                            style={{ boxShadow: "0px 0px 0px rgba(37,211,102,0)" }}
                                        >
                                            <MessageCircle className="w-5 h-5" />
                                            {t.cta}
                                        </motion.button>

                                        {/* Members count */}
                                        <div className="mt-4 text-center">
                                            <p className="text-xs text-slate-400 flex items-center justify-center gap-1">
                                                <Users className="w-3 h-3" /> {t.members}
                                            </p>
                                        </div>
                                    </>
                                )}

                                {/* D. Toggle Other Countries */}
                                {shouldShowAllCountries && (
                                    <div className="mb-6 rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
                                        <p className="text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500 mb-3">
                                            Países disponibles
                                        </p>
                                        <p className="text-center text-sm text-slate-600 mb-4">
                                            {t.chooseCountry}
                                        </p>
                                        <div className="grid grid-cols-2 gap-2">
                                            {orderedCountries.map((country) => (
                                                <a
                                                    key={country.id}
                                                    href={country.whatsappLink}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-left transition-colors hover:border-[#25D366] hover:bg-[#25D366]/5"
                                                >
                                                    <span className="text-base">{country.flag}</span>
                                                    <span className="truncate text-sm font-medium text-slate-700">{country.name}</span>
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <AnimatePresence>
                                    {otherCountries.length > 0 && !shouldShowAllCountries && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                        >
                                            <CountriesAccordion otherCountries={otherCountries} />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Bottom close button */}
                            <div className="px-6 pb-6 flex-shrink-0 border-t border-slate-100">
                                <button
                                    onClick={onClose}
                                    className="w-full py-2.5 text-slate-400 hover:text-slate-600 text-sm font-medium transition-colors"
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

interface CountriesAccordionProps {
    otherCountries: typeof countries;
}

function CountriesAccordion({ otherCountries }: CountriesAccordionProps) {
    const [isOpen, setIsOpen] = useState(false);
    const t = {
        otherCountries: "¿Buscas el grupo de otro país?",
    };

    return (
        <div className="mt-6 pt-6 border-t border-slate-100">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-center gap-2 text-slate-500 hover:text-slate-700 text-sm font-medium transition-colors py-2"
                aria-expanded={isOpen}
            >
                <span>{t.otherCountries}</span>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                >
                    <ChevronDown className="w-4 h-4 text-slate-400 flex-shrink-0" />
                </motion.div>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="mt-4 overflow-hidden"
                    >
                        <div className="grid grid-cols-2 gap-2">
                            {otherCountries.map((country) => (
                                <a
                                    key={country.id}
                                    href={country.whatsappLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 bg-slate-50 hover:bg-slate-100 px-3 py-2.5 rounded-xl transition-colors group"
                                >
                                    <span className="text-lg">{country.flag}</span>
                                    <span className="text-sm font-medium text-slate-700 flex-1 truncate group-hover:text-[#25D366] transition-colors">{country.name}</span>
                                    <MessageCircle className="w-4 h-4 text-slate-300 group-hover:text-[#25D366] transition-colors flex-shrink-0" />
                                </a>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}