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
                        className="relative w-full max-w-md"
                    >
                        <GlassCard className="p-0 overflow-hidden border-2 border-slate-200 shadow-2xl bg-white">

                            {/* Header */}
                            <div className="bg-slate-50 p-6 flex justify-between items-center border-b border-slate-100">
                                <h3 className="text-xl font-black uppercase text-slate-900 flex items-center gap-2">
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
                                <div className="text-slate-600 font-medium leading-relaxed space-y-2">

                                    <div className="bg-green-50 text-green-800 p-3 rounded-md text-sm border border-green-200">
                                        <p className="font-bold mb-1">💡 ¿Prefieres pagar con Yape o Plin?</p>
                                        <p>Puedes hacerlo al PLIN: <strong> 944 784 488</strong>.</p>
                                        <p className="mt-1">Envía tu comprobante al WhatsApp <strong>+51 944 784 488</strong> y gestionaremos tu membresía más rápido.</p>
                                    </div>
                                </div>

                                <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                                    <label className="flex items-start gap-3 cursor-pointer group">
                                        <div className="relative flex items-center mt-1">
                                            <input
                                                type="checkbox"
                                                className="peer sr-only"
                                                checked={accepted}
                                                onChange={(e) => setAccepted(e.target.checked)}
                                            />
                                            <div className="w-5 h-5 border-2 border-slate-300 rounded peer-checked:bg-primary peer-checked:border-primary transition-all"></div>
                                            <Check className="absolute w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 left-0.5 top-0.5 transition-opacity" />
                                        </div>
                                        <div className="text-sm text-slate-600 select-none">
                                            He leído y acepto los <Link href="/legal/terminos" target="_blank" className="text-primary font-bold hover:underline">Términos y Condiciones</Link> y la <Link href="/legal/privacidad" target="_blank" className="text-primary font-bold hover:underline">Política de Privacidad</Link>. Entiendo que el pago es procesado de forma segura.
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
                                    Acepto y Continuar al Pago
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
