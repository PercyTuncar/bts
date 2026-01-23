"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Check, ShieldCheck, FileText } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { GlassCard } from "./GlassCard";

type Props = {
    isOpen: boolean;
    onClose: () => void;
    onAccept: () => void;
};

export function TermsModal({ isOpen, onClose, onAccept }: Props) {
    const [accepted, setAccepted] = useState(true);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
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
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-sm md:max-w-md"
                    >
                        <GlassCard className="p-0 overflow-hidden border-2 border-slate-200 shadow-2xl bg-white">

                            {/* Header */}
                            <div className="bg-slate-50 p-6 flex justify-between items-center border-b border-slate-100">
                                <h3 className="text-lg font-black uppercase text-slate-900 flex items-center gap-2">
                                    <ShieldCheck className="w-6 h-6 text-primary" />
                                    Términos y Condiciones
                                </h3>
                                <button
                                    onClick={onClose}
                                    className="p-2 hover:bg-slate-200 rounded-full transition-colors"
                                >
                                    <X className="w-5 h-5 text-slate-500" />
                                </button>
                            </div>

                            {/* Content */}
                            <div className="p-8 space-y-6">
                                <div className="text-slate-600 font-medium leading-relaxed space-y-4">

                                    {/* Designed Payment Option Card */}
                                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-5 rounded-xl border border-purple-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
                                        <div className="absolute top-0 right-0 p-3 opacity-10">
                                            <ShieldCheck className="w-24 h-24 text-primary rotate-12" />
                                        </div>

                                        <div className="relative z-10 space-y-3">
                                            <div className="flex items-center justify-between border-b border-purple-200/60 pb-2">
                                                <h4 className="font-black uppercase text-xs text-purple-900 flex items-center gap-2">
                                                    <span className="bg-purple-200 p-1 rounded-md">🇵🇪</span> Pago Rápido (Perú)
                                                </h4>
                                                <span className="bg-acid-yellow text-slate-900 text-[10px] font-bold px-2 py-1 rounded">
                                                    INCLUYE FEE
                                                </span>
                                            </div>

                                            <div className="flex flex-col gap-1">
                                                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Monto a Pagar</span>
                                                <span className="text-3xl font-black text-slate-900">S/. 99.50</span>
                                            </div>

                                            <div className="bg-white/60 p-3 rounded-lg border border-white/50 space-y-2 backdrop-blur-sm">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                                                        <span className="font-bold text-green-600 text-[10px]">PLIN</span>
                                                    </div>
                                                    <div>

                                                        <p className="text-lg font-black text-slate-900 tracking-wide">944 784 488</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="text-xs text-slate-600 leading-relaxed pl-1 pt-1 opacity-80">
                                                *Envía tu comprobante al WhatsApp <strong className="text-green-600">+51 944 784 488</strong>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                                    <label className="flex items-start gap-3 cursor-pointer group">
                                        <div className="relative flex items-center mt-0.5">
                                            <input
                                                type="checkbox"
                                                className="peer sr-only"
                                                checked={accepted}
                                                onChange={(e) => setAccepted(e.target.checked)}
                                            />
                                            <div className="w-5 h-5 border-2 border-slate-300 rounded peer-checked:bg-primary peer-checked:border-primary transition-all"></div>
                                            <Check className="absolute w-4 h-4 text-white opacity-0 peer-checked:opacity-100 left-0.5 top-0.5 transition-opacity" />
                                        </div>
                                        <div className="text-xs text-slate-600 select-none leading-snug">
                                            He leído y acepto los <Link href="/legal/terminos" target="_blank" className="text-primary font-bold hover:underline">Términos y Condiciones</Link> y la <Link href="/legal/privacidad" target="_blank" className="text-primary font-bold hover:underline">Política de Privacidad</Link>.
                                        </div>
                                    </label>
                                </div>

                                <button
                                    onClick={onAccept}
                                    disabled={!accepted}
                                    className={`w-full font-black uppercase text-lg py-4 rounded-lg transition-all flex items-center justify-center gap-2
                                        ${accepted
                                            ? 'bg-primary text-slate-900 hover:bg-primary/90 hover:scale-[1.02] shadow-lg'
                                            : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                                        }`}
                                >
                                    PAGAR CON TARJETA AQUÍ
                                </button>

                                <p className="text-center text-[10px] text-slate-400 uppercase tracking-widest font-bold">
                                    AL REALIZAR EL PAGO, ACEPTAS LOS TÉRMINOS Y CONDICIONES
                                </p>
                            </div>
                        </GlassCard>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
