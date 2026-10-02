"use client";

import { motion, AnimatePresence } from "framer-motion";
import { getCountryIdFromPathname, countries, getOrderedWhatsappCountries } from "@/lib/data/countries";
import { X } from "lucide-react";
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

    const isBrasilPage = pathname?.startsWith('/brasil');
    const isColombiaPage = pathname?.startsWith('/colombia');

    const t = isColombiaPage ? {
        title: "🎫 Consigue Boletas a Mejor Precio",
        subtitle: (countryName: string) => `Únete al grupo de WhatsApp y consigue <span class="underline decoration-2 decoration-[#25D366] underline-offset-2 font-bold">precios más bajos</span> con las ofertas disponibles.`,
        cta: "Unirme al Grupo de WhatsApp",
        redirect: "⚠️ Importante: Lee las reglas del grupo al unirte",
        extraMessage: "✅ Preventas exclusivas\n💵 Descuentos especiales\n🎫 Ofertas diarias",
    } : isBrasilPage ? {
        title: "Junte-se ao nosso grupo de WhatsApp",
        subtitle: (countryName: string) => `Receba atualizações exclusivas sobre o show de BTS no ${countryName}`,
        cta: "Entrar no Grupo",
        redirect: "Você será redirecionado ao WhatsApp",
    } : {
        title: "Únete a nuestro grupo de WhatsApp",
        subtitle: (countryName: string) => `Recibe actualizaciones exclusivas sobre el show de BTS en ${countryName}`,
        cta: "Unirme al Grupo",
        redirect: "Serás redirigido a WhatsApp",
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
                        className="relative w-full max-w-md"
                    >
                        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">

                            {/* Header compacto */}
                            <div className={`relative px-6 pt-6 pb-4 text-center ${isColombiaPage ? 'bg-gradient-to-br from-green-50 via-emerald-50 to-white' : 'bg-gradient-to-br from-green-50 to-white'}`}>
                                <button
                                    onClick={onClose}
                                    className="absolute top-4 right-4 w-8 h-8 bg-white/80 hover:bg-white text-slate-600 rounded-full flex items-center justify-center transition-colors shadow-sm"
                                    aria-label={isBrasilPage ? "Fechar" : "Cerrar"}
                                >
                                    <X className="w-4 h-4" />
                                </button>

                                {/* Icono de WhatsApp más compacto */}
                                <div className={`relative mx-auto mb-3 w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg ${isColombiaPage ? 'bg-[#25D366]' : 'bg-[#25D366]'}`}>
                                    <svg viewBox="0 0 24 24" width="28" height="28" fill="white">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                                    </svg>
                                </div>

                                <h2 className={`text-xl font-bold mb-1 ${isColombiaPage ? 'text-slate-900' : 'text-slate-900'}`}>
                                    {isColombiaPage ? (
                                        <>
                                            🎫 Consigue Boletas a <span className="text-[#25D366] animate-pulse">Mejor Precio</span>
                                        </>
                                    ) : (
                                        t.title
                                    )}
                                </h2>
                                <p
                                    className={`text-sm ${isColombiaPage ? 'text-slate-700' : 'text-slate-600'}`}
                                    dangerouslySetInnerHTML={{
                                        __html: currentCountry ? t.subtitle(currentCountry.name) : t.subtitle("tu país")
                                    }}
                                />
                            </div>

                            {/* Contenido simplificado */}
                            <div className="px-6 pb-6">
                                {/* Beneficios exclusivos para Colombia */}
                                {isColombiaPage && 'extraMessage' in t && t.extraMessage && (
                                    <div className="mb-4 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-4 shadow-sm">
                                        <div className="space-y-2">
                                            {t.extraMessage.split('\n').map((line, idx) => (
                                                <div key={idx} className="flex items-center gap-3 group">
                                                    <div className="flex-shrink-0 w-6 h-6 bg-[#25D366] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                                                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                        </svg>
                                                    </div>
                                                    <span className="text-slate-700 font-semibold text-sm">{line}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Botón CTA principal */}
                                <motion.button
                                    onClick={() => {
                                        if (currentCountry?.whatsappLink) {
                                            window.open(currentCountry.whatsappLink, '_blank', 'noopener,noreferrer');
                                            onClose();
                                        }
                                    }}
                                    disabled={!currentCountry?.whatsappLink}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className={clsx(
                                        "w-full py-3.5 text-white font-bold text-base rounded-xl",
                                        "flex items-center justify-center gap-2",
                                        "shadow-lg hover:shadow-xl",
                                        "transition-all duration-200",
                                        "focus:outline-none focus:ring-2 focus:ring-offset-2",
                                        isColombiaPage
                                            ? "bg-[#25D366] hover:bg-[#20BA5A] shadow-green-500/30 hover:shadow-green-500/50 focus:ring-green-500"
                                            : "bg-[#25D366] shadow-[#25D366]/20 hover:shadow-[#25D366]/30 focus:ring-[#25D366]",
                                        !currentCountry?.whatsappLink && "opacity-50 cursor-not-allowed"
                                    )}
                                >
                                    <svg viewBox="0 0 24 24" width="20" height="20" fill="white">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                                    </svg>
                                    {t.cta}
                                </motion.button>

                                {/* Texto de redirección */}
                                <p className={`mt-3 text-center text-xs ${isColombiaPage ? 'text-amber-700 font-semibold' : 'text-slate-500'}`}>
                                    {t.redirect}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}