"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ShieldCheck, MessageCircle, ChevronDown, QrCode } from "lucide-react";
import Image from "next/image";
import { GlassCard } from "./GlassCard";
import { useState } from "react";

type Props = {
    isOpen: boolean;
    onClose: () => void;
    isPeruVisitor?: boolean;
};

export function TermsModal({ isOpen, onClose, isPeruVisitor = false }: Props) {
    const [isLocalPaymentOpen, setIsLocalPaymentOpen] = useState(false);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] p-4 overflow-y-auto">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                        aria-hidden="true"
                    />

                    <div className="flex items-center justify-center min-h-full">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative w-full max-w-sm lg:max-w-2xl"
                        >
                            <GlassCard className="p-0 border-2 border-slate-200 shadow-2xl bg-white rounded-2xl">

                                <div className="bg-slate-50 p-3 flex justify-between items-center border-b border-slate-100">
                                    <h3 className="text-sm font-black uppercase text-slate-900 flex items-center gap-2">
                                        <ShieldCheck className="w-5 h-5 text-primary" />
                                        Elige tu método de pago
                                    </h3>
                                    <button
                                        onClick={onClose}
                                        className="p-1.5 hover:bg-slate-200 rounded-full transition-colors"
                                    >
                                        <X className="w-4 h-4 text-slate-500" />
                                    </button>
                                </div>

                                <div className="p-4 lg:p-6">
                                    <div className={`grid grid-cols-1 ${isPeruVisitor ? 'lg:grid-cols-2 lg:gap-6' : ''}`}>
                                        {isPeruVisitor && (
                                            <>
                                                {/* Opción 1: Pago Manual (Desktop) */}
                                                <div className="hidden lg:block text-center bg-purple-50 p-4 rounded-xl border-2 border-purple-200 space-y-3">
                                                    <p className="font-bold text-purple-900 text-base">Paga con Yape o Plin</p>
                                                    <p className="text-sm font-bold text-slate-700">Monto a yapear/plinear</p>
                                                    <p className="text-3xl font-black text-purple-800">S/. 99.50</p>
                                                    <div className="flex justify-center items-center gap-4">
                                                        <Image src="https://startupeable.com/directorio/wp-content/uploads/2021/03/yape.png" alt="Yape" width={60} height={24} />
                                                        <Image src="/images/logo-plin.jpeg" alt="Plin" width={60} height={24} />
                                                    </div>
                                                    <div className="flex flex-col items-center gap-3">
                                                        <div className="bg-white p-1 rounded-lg border border-slate-200 shadow-sm">
                                                            <Image src="/images/qr-plin.jpeg" alt="QR Plin" width={120} height={120} className="w-32 h-32 object-contain rounded-md" />
                                                        </div>
                                                        <div className="text-center">
                                                            <p className="text-xs text-slate-600">o al número:</p>
                                                            <p className="text-2xl font-black text-slate-900 tracking-wide">944 784 488</p>
                                                            <p className="text-[10px] text-slate-600 mt-1">A nombre de: <span className="font-bold">PERCY TUNCAR</span></p>
                                                        </div>
                                                    </div>
                                                    <div className="pt-2">
                                                        <a
                                                            href="https://wa.me/51944784488"
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="w-full font-bold uppercase text-sm py-3 rounded-lg transition-all flex items-center justify-center gap-2 bg-green-500 text-white hover:bg-green-600 shadow-md hover:shadow-lg"
                                                        >
                                                            <MessageCircle className="w-5 h-5" />
                                                            Enviar Comprobante
                                                        </a>
                                                    </div>
                                                </div>

                                                {/* Opción 1: Pago Manual (Mobile Accordion) */}
                                                <div className="lg:hidden mb-4 rounded-xl border-2 border-purple-300 bg-gradient-to-b from-purple-50 to-white overflow-hidden shadow-sm">
                                                    <button
                                                        type="button"
                                                        onClick={() => setIsLocalPaymentOpen((prev) => !prev)}
                                                        className="w-full flex items-center justify-between px-4 py-3 text-left"
                                                        aria-expanded={isLocalPaymentOpen}
                                                    >
                                                        <div className="flex items-start gap-3">
                                                            <div className="mt-0.5 p-1.5 rounded-lg bg-purple-100 border border-purple-200">
                                                                <QrCode className="w-4 h-4 text-purple-800" />
                                                            </div>
                                                            <div className="flex flex-col">
                                                                <span className="font-extrabold text-purple-900 text-sm">Pagar con Yape o Plin</span>
                                                                <span className="text-[11px] text-purple-700 font-semibold">Toca aqui para ver el QR y datos de pago</span>
                                                            </div>
                                                        </div>
                                                        <div className="flex flex-col items-end gap-1">
                                                            <span className="text-[10px] font-black uppercase tracking-wide text-purple-700 bg-purple-100 px-2 py-0.5 rounded-full">
                                                                {isLocalPaymentOpen ? 'Ocultar' : 'Tocar'}
                                                            </span>
                                                            <ChevronDown className={`w-5 h-5 text-purple-900 transition-transform ${isLocalPaymentOpen ? 'rotate-180' : ''}`} />
                                                        </div>
                                                    </button>

                                                    {!isLocalPaymentOpen && (
                                                        <div className="px-4 pb-3">
                                                            <div className="rounded-lg border border-dashed border-purple-300 bg-white px-3 py-2 text-center">
                                                                <p className="text-[11px] text-slate-600">Monto a pagar por Yape/Plin</p>
                                                                <p className="text-lg font-black text-purple-800">S/. 99.50</p>
                                                            </div>
                                                        </div>
                                                    )}

                                                    <AnimatePresence initial={false}>
                                                    {isLocalPaymentOpen && (
                                                        <motion.div
                                                            initial={{ opacity: 0, height: 0 }}
                                                            animate={{ opacity: 1, height: 'auto' }}
                                                            exit={{ opacity: 0, height: 0 }}
                                                            transition={{ duration: 0.2 }}
                                                            className="px-4 pb-4 space-y-3 border-t border-purple-200 overflow-hidden"
                                                        >
                                                            <p className="text-sm font-bold text-slate-700 mt-3">Monto a yapear/plinear</p>
                                                            <p className="text-2xl font-black text-purple-800">S/. 99.50</p>
                                                            <div className="flex justify-center items-center gap-4">
                                                                <Image src="https://startupeable.com/directorio/wp-content/uploads/2021/03/yape.png" alt="Yape" width={56} height={22} />
                                                                <Image src="/images/logo-plin.jpeg" alt="Plin" width={56} height={22} />
                                                            </div>
                                                            <div className="bg-white p-1 rounded-lg border border-slate-200 shadow-sm mx-auto w-fit">
                                                                <Image src="/images/qr-plin.jpeg" alt="QR Plin" width={120} height={120} className="w-28 h-28 object-contain rounded-md" />
                                                            </div>
                                                            <div className="text-center">
                                                                <p className="text-xs text-slate-600">o al número:</p>
                                                                <p className="text-xl font-black text-slate-900 tracking-wide">944 784 488</p>
                                                                <p className="text-[10px] text-slate-600 mt-1">A nombre de: <span className="font-bold">PERCY TUNCAR</span></p>
                                                            </div>
                                                            <a
                                                                href="https://wa.me/51944784488"
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="w-full font-bold uppercase text-xs py-3 rounded-lg transition-all flex items-center justify-center gap-2 bg-green-500 text-white hover:bg-green-600 shadow-md"
                                                            >
                                                                <MessageCircle className="w-4 h-4" />
                                                                Enviar Comprobante
                                                            </a>
                                                        </motion.div>
                                                    )}
                                                    </AnimatePresence>
                                                </div>

                                                {/* Separador */}
                                                <div className="flex items-center lg:hidden my-4">
                                                    <hr className="flex-grow border-slate-200" />
                                                    <span className="px-2 text-xs font-bold text-slate-400 uppercase">O</span>
                                                    <hr className="flex-grow border-slate-200" />
                                                </div>
                                            </>
                                        )}

                                        {/* Opción 2: Tarjeta/PayPal */}
                                        <div className="space-y-4 text-center bg-blue-50 p-6 rounded-xl border-2 border-blue-200 flex flex-col items-center justify-center">
                                            <Image src="https://w7.pngwing.com/pngs/32/363/png-transparent-visa-master-card-and-american-express-mastercard-payment-visa-credit-card-emv-credit-card-visa-and-master-card-background-text-display-advertising-logo.png" alt="Visa, Mastercard, American Express" width={120} height={40} className="object-contain"/>
                                            <p className="text-base text-blue-900 font-bold pt-2">
                                                Paga con Tarjeta de Débito/Crédito
                                            </p>
                                            <div className="flex items-center w-full max-w-[200px]">
                                                <hr className="flex-grow border-slate-300" />
                                                <span className="px-2 text-xs font-bold text-slate-400 uppercase">O</span>
                                                <hr className="flex-grow border-slate-300" />
                                            </div>
                                            <Image src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/960px-PayPal.svg.png" alt="PayPal" width={80} height={25} className="object-contain"/>
                                            
                                            <p className="text-xs text-slate-500 max-w-xs mx-auto pt-2">
                                                Serás redirigido a una pasarela de pago segura para completar tu compra.
                                            </p>
                                            <div className="pt-3 w-full">
                                                <a
                                                    href="https://www.paypal.com/ncp/payment/8XABRYNE7AXY4"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="w-full font-bold uppercase text-sm py-3 rounded-lg transition-all flex items-center justify-center gap-2 bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg"
                                                >
                                                    Pagar con Tarjeta o PayPal
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </GlassCard>
                        </motion.div>
                    </div>
                </div>
            )}
        </AnimatePresence>
    );
}
