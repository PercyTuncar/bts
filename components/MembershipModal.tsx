"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, ShieldCheck, Star, Sparkles } from "lucide-react";
import Link from "next/link";

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
                        className="absolute inset-0 bg-black/95 backdrop-blur-xl"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-lg"
                    >
                        <div className="glass-card rounded-3xl overflow-hidden border-primary/30 shadow-glow">

                            {/* Header */}
                            <div className="bg-gradient-to-r from-primary to-primary-light p-6 relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-4 opacity-10">
                                    <Star className="w-32 h-32 text-white rotate-12" />
                                </div>
                                <button
                                    onClick={onClose}
                                    className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                                >
                                    <X className="w-5 h-5 text-white" />
                                </button>
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-wider mb-3">
                                    <Sparkles className="w-3 h-3" />
                                    Preventa Exclusiva
                                </div>
                                <h3 className="text-3xl font-black uppercase text-white leading-none mb-2 relative z-10">
                                    Espera Army!
                                </h3>
                                <p className="font-bold text-white/80 uppercase tracking-widest text-sm relative z-10">
                                    Requisito Obligatorio de Preventa
                                </p>
                            </div>

                            {/* Content */}
                            <div className="p-8 space-y-6">
                                <div className="space-y-4">
                                    <p className="text-lg text-white/80 font-medium leading-relaxed">
                                        Para comprar entradas en esta fase de preventa, es <span className="gradient-text font-bold">indispensable contar con tu Membresia</span> Oficial activa.
                                    </p>

                                    <div className="bg-white/5 border border-white/10 p-4 rounded-xl flex gap-4 items-start">
                                        <div className="bg-success/20 p-2 rounded-lg mt-1">
                                            <ShieldCheck className="w-5 h-5 text-success" />
                                        </div>
                                        <div>
                                            <h4 className="text-white font-bold uppercase text-sm mb-1">Nota Importante</h4>
                                            <p className="text-white/50 text-sm leading-snug">
                                                Venta oficial aun no disponible. Precios y zonas son referenciales.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <Link
                                        href="/comprar-membresia-bts"
                                        className="group block w-full bg-gradient-to-r from-primary to-secondary text-white font-black uppercase text-lg py-4 text-center rounded-xl shadow-glow hover:shadow-glow-lg hover:scale-[1.02] transition-all duration-300"
                                    >
                                        <span className="flex items-center justify-center gap-2">
                                            Tramitar Membresia <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                        </span>
                                    </Link>
                                    <p className="text-center text-white/40 text-xs mt-3 uppercase tracking-widest font-bold">
                                        S/. 99.50 - Pago Unico / 1 Ano
                                    </p>
                                </div>

                                <div className="border-t border-white/10 pt-4">
                                    <p className="text-[10px] md:text-xs text-white/30 text-center leading-relaxed">
                                        <span className="font-bold text-primary">NOTA:</span> La compra de la membresia es obligatoria para acceder a la preventa.
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
