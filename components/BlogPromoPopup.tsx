"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CalendarClock, Ticket, ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "./Button";
import Link from "next/link";

// Mapping of country codes to display names
const COUNTRY_NAMES: Record<string, string> = {
    PE: "Perú",
    MX: "México",
    CO: "Colombia",
    CL: "Chile",
    BR: "Brasil",
    AR: "Argentina",
    US: "Estados Unidos",
    ES: "España",
    EC: "Ecuador",
    BO: "Bolivia",
    UY: "Uruguay",
    PY: "Paraguay",
    VE: "Venezuela",
    CR: "Costa Rica",
    PA: "Panamá",
    DO: "República Dominicana",
    GT: "Guatemala",
    SV: "El Salvador",
    HN: "Honduras",
    NI: "Nicaragua"
};

const PRICING: Record<string, { symbol: string, price: string }> = {
    PE: { symbol: 'S/.', price: '99.50' },
    MX: { symbol: 'MXN', price: '490.00' },
    CO: { symbol: 'COP', price: '115,000' },
    CL: { symbol: 'CLP', price: '26,000' },
    BR: { symbol: 'R$', price: '180,00' },
    AR: { symbol: 'ARS', price: '30,000' },
    DEFAULT: { symbol: 'USD', price: '29.50' }
};

export function BlogPromoPopup() {
    const [isOpen, setIsOpen] = useState(false);
    const [hasOpened, setHasOpened] = useState(false);
    const [detectedCountryName, setDetectedCountryName] = useState<string>("");
    const [pricing, setPricing] = useState(PRICING.DEFAULT);

    useEffect(() => {
        // Detect country using the same API as MembershipClient
        const detectCountry = async () => {
            try {
                const response = await fetch('https://ipinfo.io/json?token=083e31e242486c');
                const data = await response.json();
                if (data && data.country) {
                    const code = data.country;
                    if (COUNTRY_NAMES[code]) {
                        setDetectedCountryName(COUNTRY_NAMES[code]);
                    }
                    if (PRICING[code]) {
                        setPricing(PRICING[code]);
                    }
                }
            } catch (error) {
                console.error("Error detecting country in popup", error);
            }
        };

        detectCountry();
    }, []);

    useEffect(() => {
        // Show popup after 3 seconds of reading
        const timer = setTimeout(() => {
            if (!hasOpened) {
                setIsOpen(true);
                setHasOpened(true);
            }
        }, 3000);

        return () => clearTimeout(timer);
    }, [hasOpened]);

    const handleClose = () => setIsOpen(false);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 sm:px-0">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClose}
                        className="absolute inset-0 bg-slate-900/90 backdrop-blur-sm"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden border-2 border-primary/20"
                    >
                        {/* Close Button */}
                        <button 
                            onClick={handleClose}
                            className="absolute top-4 right-4 z-20 p-2 bg-black/10 hover:bg-black/20 rounded-full transition-colors"
                        >
                            <X className="w-5 h-5 text-slate-900" />
                        </button>

                        {/* Hero Image / Gradient */}
                        <div className="relative h-40 bg-slate-900 overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-slate-900 to-primary/80 opacity-90"></div>
                            {/* Decorative Circles */}
                            <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary rounded-full filter blur-3xl opacity-40"></div>
                            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-500 rounded-full filter blur-3xl opacity-40"></div>
                            
                            <div className="relative h-full flex items-center justify-center p-6 text-center">
                                <div>
                                    <h3 className="text-3xl font-black text-white uppercase italic tracking-tighter mb-1 relative leading-tight">
                                        ¿Quieres ir al concierto{detectedCountryName ? ` en ${detectedCountryName}` : ''}?
                                    </h3>
                                
                                </div>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-8 bg-white">
                            <div className="flex gap-4 mb-6">
                                <div className="flex-shrink-0">
                                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                                        <Ticket className="w-6 h-6 text-primary dashed" />
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <h4 className="font-bold text-slate-900 text-lg">Asegura tu Acceso a Preventa</h4>
                                    <p className="text-slate-600 text-sm leading-relaxed">
                                        La Membresía es el <span className="font-bold text-primary">único requisito</span> para acceder a la Preventa ARMY y comprar tus entradas antes que el público general.
                                    </p>
                                </div>
                            </div>

                            {/* Pricing / Product Card */}
                            <div className="mb-6 bg-gradient-to-br from-slate-50 to-white rounded-xl p-1.5 border border-slate-100 shadow-sm relative overflow-hidden group">
                                {/* Decorative colorful accent line */}
                                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary to-purple-500 opacity-80 rounded-l-md"></div>
                                
                                <div className="bg-white/50 rounded-lg p-3 sm:p-4 flex items-center justify-between backdrop-blur-sm">
                                    {/* Left: Info */}
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center shrink-0 shadow-inner">
                                            <ShieldCheck className="w-5 h-5 text-green-600" />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-1.5 mb-0.5">
                                                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                                                <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Requisito</p>
                                            </div>
                                            <p className="font-bold text-slate-900 text-sm leading-tight">Membresía Oficial</p>
                                        </div>
                                    </div>
                                    
                                    {/* Right: Price */}
                                    <div className="text-right pl-3 border-l border-slate-200/60 ml-1">
                                        <p className="font-black text-xl text-slate-900 tracking-tighter leading-none group-hover:text-primary transition-colors">
                                            <span className="text-xs font-bold text-slate-500 mr-1 relative -top-1">{pricing.symbol}</span>
                                            {pricing.price}
                                        </p>
                                        <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-wide">Pago Único</p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <Link href="/comprar-membresia-bts" onClick={handleClose}>
                                    <Button className="w-full h-14 text-base bg-primary hover:bg-primary/90 shadow-xl shadow-primary/20">
                                        COMPRAR MEMBRESÍA
                                        <ArrowRight className="ml-2 w-5 h-5" />
                                    </Button>
                                </Link>
                                <button 
                                    onClick={handleClose}
                                    className="w-full text-slate-400 text-xs font-bold hover:text-slate-600 transition-colors py-2 uppercase tracking-wide"
                                >
                                    Arriesgarme sin membresía
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
