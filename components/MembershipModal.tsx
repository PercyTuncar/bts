"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, ShieldCheck, Star } from "lucide-react";
import Link from "next/link";
import { GlassCard } from "./GlassCard";

type Props = {
    isOpen: boolean;
    onClose: () => void;
};

export function MembershipModal({ isOpen, onClose }: Props) {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-lg"
                    >
                        <GlassCard className="p-0 overflow-hidden border-2 border-acid-yellow shadow-[0_0_50px_rgba(234,255,0,0.2)]">

                            {/* Header */}
                            <div className="bg-acid-yellow p-6 relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-4 opacity-10">
                                    <Star className="w-32 h-32 text-black rotate-12" />
                                </div>
                                <button
                                    onClick={onClose}
                                    className="absolute top-4 right-4 p-2 bg-black/10 hover:bg-black/20 rounded-full transition-colors"
                                >
                                    <X className="w-5 h-5 text-black" />
                                </button>
                                <h3 className="text-3xl font-black uppercase text-black leading-none mb-2 relative z-10">
                                    ¡Espera Army!
                                </h3>
                                <p className="font-bold text-black/80 uppercase tracking-widest text-sm relative z-10">
                                    Requisito Obligatorio de Preventa
                                </p>
                            </div>

                            {/* Content */}
                            <div className="flex-1 w-full bg-white flex flex-col justify-center relative overflow-hidden">

                                {/* Content */}
                                <div className="p-8 space-y-6 bg-white/95">
                                    <div className="space-y-4">
                                        <p className="text-xl text-slate-700 font-medium leading-relaxed">
                                            Para poder comprar entradas en esta fase de preventa, es <span className="text-primary font-bold">indispensable contar con tu Membresía</span> Oficial activa.
                                        </p>

                                        <div className="bg-slate-50 border border-slate-200 p-4 rounded-lg flex gap-4 items-start">
                                            <div className="bg-neon-green/20 p-2 rounded-full mt-1">
                                                <ShieldCheck className="w-5 h-5 text-neon-green" />
                                            </div>
                                            <div>
                                                <h4 className="text-slate-900 font-bold uppercase text-sm mb-1">Nota Importante</h4>
                                                <p className="text-slate-500 text-sm leading-snug">
                                                    Venta oficial aún no disponible. Precios y zonas son referenciales y sujetos a cambio por la productora.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <Link
                                            href="/comprar-membresia-bts"
                                            className="group block w-full bg-primary hover:bg-slate-900 hover:text-primary transition-all duration-300 text-slate-900 font-black uppercase text-xl py-4 text-center shadow-md hover:shadow-lg hover:-translate-y-1"
                                        >
                                            <span className="flex items-center justify-center gap-2">
                                                Tramitar Membresía Aquí <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                                            </span>
                                        </Link>
                                        <p className="text-center text-gray-500 text-xs mt-3 uppercase tracking-widest font-bold">
                                            S/. 99.50 • Pago Único / 1 Año
                                        </p>
                                    </div>

                                    {/* Disclaimer Note requested by user */}
                                    <div className="border-t border-dashed border-white/20 pt-4 mt-2">
                                        <p className="text-[10px] md:text-xs text-gray-500 text-center leading-relaxed">
                                            <span className="font-bold text-acid-yellow">NOTA:</span> La compra de la membresía es obligatoria para acceder a la preventa. Los precios y zonas de las entradas solo son referenciales por el momento.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </GlassCard>
                    </motion.div>
                </div>
            )
            }
        </AnimatePresence >
    );
}
