"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Check, ShieldCheck } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { GlassCard } from "./GlassCard";

type Props = {
    isOpen: boolean;
    onClose: () => void;
    currency?: { symbol: string, price: string };
    content?: Record<string, string>;
};

const MP_SCRIPT_SRC = "https://www.mercadopago.com.pe/integrations/v1/web-payment-checkout.js";
const MP_PREFERENCE_ID = "261475954-d56003f9-3b9c-4b00-9645-c09be392d344";

export function TermsModal({ isOpen, onClose, currency, content }: Props) {
    const [accepted, setAccepted] = useState(true);
    const mpButtonRef = useRef<HTMLDivElement | null>(null);
    
    // Default fallback if content isn't passed (handled gracefully or assume Spanish defaults)
    const t = content || {
        modal_total_amount: "Monto Total a Pagar",
        modal_select_card_instruct: "Selecciona \"Pagar con Tarjeta\" para completar tu compra de forma segura.",
        modal_terms_read_accept: "He leído y acepto los",
        modal_terms_conditions: "Términos y Condiciones",
        modal_terms_and: "y la",
        modal_terms_privacy: "Política de Privacidad",
        modal_other_countries_pay: "Otros países pueden pagar con tarjeta",
        modal_debit_credit_here: "de débito o crédito VISA / Mastercard aquí",
        modal_pay_card_btn: "PAGAR CON TARJETA AQUÍ",
        modal_pay_accepts_terms: "AL REALIZAR EL PAGO, ACEPTAS LOS TÉRMINOS Y CONDICIONES"
    };
    
    // Default to PE if not provided (though it should be)
    const currentCurrency = currency || { symbol: 'S/.', price: '99.50' };
    const isPeru = currentCurrency.symbol === 'S/.';

    useEffect(() => {
        if (isOpen) {
            setAccepted(true);
        }
    }, [isOpen]);

    useEffect(() => {
        if (!isOpen || !accepted || !mpButtonRef.current) {
            return;
        }

        const container = mpButtonRef.current;
        container.innerHTML = "";

        const script = document.createElement("script");
        script.src = MP_SCRIPT_SRC;
        script.async = true;
        script.setAttribute("data-preference-id", MP_PREFERENCE_ID);
        script.setAttribute("data-source", "button");

        container.appendChild(script);

        return () => {
            container.innerHTML = "";
        };
    }, [accepted, isOpen]);

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
                            <div className="bg-slate-50 p-4 flex justify-between items-center border-b border-slate-100">
                                <h3 className="text-base font-black uppercase text-slate-900 flex items-center gap-2">
                                    <ShieldCheck className="w-5 h-5 text-primary" />
                                    {t.modal_terms_conditions}
                                </h3>
                                <button
                                    onClick={onClose}
                                    className="p-1.5 hover:bg-slate-200 rounded-full transition-colors"
                                >
                                    <X className="w-4 h-4 text-slate-500" />
                                </button>
                            </div>

                            {/* Content */}
                            <div className="p-6 space-y-4">
                                <div className="text-slate-600 font-medium leading-relaxed space-y-3">

                                    {/* Designed Payment Option Card */}
                                    {isPeru ? (
                                        <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-xl border border-purple-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
                                            <div className="absolute top-0 right-0 p-2 opacity-10">
                                                <ShieldCheck className="w-20 h-20 text-primary rotate-12" />
                                            </div>

                                            <div className="relative z-10 space-y-2">
                                                <div className="flex items-center justify-between border-b border-purple-200/60 pb-2">
                                                    <h4 className="font-black uppercase text-[10px] text-purple-900 flex items-center gap-2">
                                                        <span className="bg-purple-200 p-0.5 rounded text-[10px]">🇵🇪</span> Pago Rápido (Perú) YAPE / PLIN
                                                    </h4>
                                                    <span className="bg-acid-yellow text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                                                        INCLUYE FEE
                                                    </span>
                                                </div>

                                                <div className="flex gap-4 items-center">
                                                    <div className="flex-1 space-y-2">
                                                        <div className="flex flex-col gap-0.5">
                                                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Monto a Pagar</span>
                                                            <span className="text-2xl font-black text-slate-900">{currentCurrency.symbol} {currentCurrency.price}</span>
                                                        </div>

                                                        <div className="bg-white/60 p-2 rounded-lg border border-white/50 space-y-1.5 backdrop-blur-sm">
                                                            <div className="flex items-center gap-2">
                                                                <div className="w-6 h-6 rounded-full overflow-hidden flex items-center justify-center shrink-0 border border-slate-100 bg-white">
                                                                    <Image
                                                                        src="/images/logo-plin.jpeg"
                                                                        alt="Plin"
                                                                        width={24}
                                                                        height={24}
                                                                        className="w-full h-full object-cover"
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <p className="text-base font-black text-slate-900 tracking-wide">944 784 488</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="shrink-0 bg-white p-1 rounded-lg border border-slate-200 shadow-sm self-start mt-2">
                                                        <Image
                                                            src="/images/qr-plin.jpeg"
                                                            alt="QR Plin"
                                                            width={80}
                                                            height={80}
                                                            className="w-20 h-20 object-contain rounded-md"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="text-[10px] text-slate-600 leading-relaxed pl-1 pt-0.5 opacity-80">
                                                    *Envía tu comprobante al WhatsApp <strong className="text-green-600">+51 944 784 488</strong>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-6 rounded-xl border border-slate-200 shadow-sm text-center">
                                            <div className="flex flex-col gap-1 mb-4">
                                                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">{t.modal_total_amount}</span>
                                                <span className="text-4xl font-black text-slate-900">{currentCurrency.symbol} {currentCurrency.price}</span>
                                            </div>
                                            <p className="text-sm text-slate-600">
                                                {t.modal_select_card_instruct}
                                            </p>
                                        </div>
                                    )}
                                </div>

                                <div className="bg-purple-50 p-3 rounded-lg border border-purple-100">
                                    <label className="flex items-start gap-2 cursor-pointer group">
                                        <div className="relative flex items-center mt-0.5">
                                            <input
                                                type="checkbox"
                                                className="peer sr-only"
                                                checked={accepted}
                                                onChange={(e) => setAccepted(e.target.checked)}
                                            />
                                            <div className="w-4 h-4 border-2 border-slate-300 rounded peer-checked:bg-primary peer-checked:border-primary transition-all"></div>
                                            <Check className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 left-0.5 top-0.5 transition-opacity" />
                                        </div>
                                        <div className="text-[10px] text-slate-600 select-none leading-snug">
                                            {t.modal_terms_read_accept} <Link href="/legal/terminos" target="_blank" className="text-primary font-bold hover:underline">{t.modal_terms_conditions}</Link> {t.modal_terms_and} <Link href="/legal/privacidad" target="_blank" className="text-primary font-bold hover:underline">{t.modal_terms_privacy}</Link>.
                                        </div>
                                    </label>
                                </div>

                                <div className="space-y-2">
                                    <p className="text-center text-[10px] text-slate-500 font-bold uppercase leading-tight max-w-[95%] mx-auto">
                                        <span className="text-primary font-black">{t.modal_other_countries_pay}</span> {t.modal_debit_credit_here}
                                    </p>
                                    {accepted ? (
                                        <div
                                            ref={mpButtonRef}
                                            className="flex justify-center"
                                            aria-label={t.modal_pay_card_btn}
                                        />
                                    ) : (
                                        <button
                                            disabled
                                            className="w-full font-black uppercase text-base py-3 rounded-lg transition-all flex items-center justify-center gap-2 bg-slate-200 text-slate-400 cursor-not-allowed"
                                        >
                                            {t.modal_pay_card_btn}
                                        </button>
                                    )}
                                </div>

                                <p className="text-center text-[9px] text-slate-400 uppercase tracking-widest font-bold">
                                    {t.modal_pay_accepts_terms}
                                </p>
                            </div>
                        </GlassCard>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
