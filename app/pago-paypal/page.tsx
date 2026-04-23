"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import { ArrowRight, Ticket, ShieldCheck, CreditCard, CheckCircle, ExternalLink } from "lucide-react";
import Link from "next/link";

export default function PayPalPage() {
  const { items, total, clearCart } = useCart();
  const router = useRouter();
  const [isRedirecting, setIsRedirecting] = useState(false);

  const primaryTicket = items.find((item) => item.type === "ticket");
  const isChileOrder = primaryTicket?.countryId === "chile";
  const isCashPayment = items.some(item => item.slug.includes('contado'));

  // PayPal link directo proporcionado
  const PAYPAL_LINK = "https://www.paypal.com/ncp/payment/NNBWSP6KD3TJN";

  // Verificar que sea Chile y pago al contado
  useEffect(() => {
    if (!isChileOrder || !isCashPayment) {
      router.push('/tienda/cart');
    }
  }, [isChileOrder, isCashPayment, router]);

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  const handlePayPalRedirect = () => {
    setIsRedirecting(true);
    clearCart();
    // Redirigir directamente al link de PayPal
    window.location.href = PAYPAL_LINK;
  };

  const totalWithFee = total * 1.035; // 3.5% comisión PayPal

  if (!isChileOrder || !isCashPayment) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-slate-600">Verificando pago...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20 bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-bold uppercase mb-6">
            <CreditCard className="w-4 h-4" />
            Pago Seguro con PayPal
          </div>
          <h1 className="text-4xl md:text-5xl font-black uppercase text-slate-900 mb-4">
            Completar Pago
          </h1>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Serás redirigido a PayPal para completar el pago de la última entrada disponible para BTS Chile 2026.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6 md:p-8">
            <h2 className="text-xl font-black uppercase text-slate-900 mb-6 pb-4 border-b-2 border-slate-100">
              Resumen del Pedido
            </h2>
            
            <div className="space-y-4 mb-6">
              {items.map((item, index) => (
                <div key={index} className="flex justify-between items-start pb-4 border-b border-slate-100">
                  <div className="flex-1">
                    <p className="font-bold text-slate-900">{item.name}</p>
                    <p className="text-sm text-slate-500">
                      {item.quantity} entrada{item.quantity > 1 ? 's' : ''}
                    </p>
                    {item.isInstallment && (
                      <p className="text-xs text-primary font-medium">
                        {item.installmentMonths} cuotas
                      </p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-slate-900">
                      ${formatAmount(item.price * item.quantity)}
                    </p>
                    <p className="text-xs text-slate-400">USD</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-slate-50 rounded-xl p-4 mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-slate-600">Subtotal</span>
                <span className="font-semibold">${formatAmount(total)}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-slate-600">Comisión PayPal (3.5%)</span>
                <span className="font-semibold">${formatAmount(total * 0.035)}</span>
              </div>
              <div className="flex justify-between items-center pt-3 border-t-2 border-slate-200">
                <span className="font-bold text-lg">Total a Pagar</span>
                <span className="font-black text-2xl text-primary">
                  ${formatAmount(totalWithFee)}
                </span>
              </div>
            </div>

            <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-sm text-blue-900">Pago Seguro Garantizado</p>
                  <p className="text-xs text-blue-800">
                    Serás redirigido a PayPal para completar tu compra de forma segura.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* PayPal Payment */}
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6 md:p-8">
            <h2 className="text-xl font-black uppercase text-slate-900 mb-6 pb-4 border-b-2 border-slate-100">
              Pago con PayPal
            </h2>

            <div className="text-center py-6">
              <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M7.163 21.073H0V7.529h7.163v13.544zm1.758-15.062c-.555-.596-1.365-.93-2.261-.93H2.505c-.896 0-1.706.334-2.261.93-.555.596-.863 1.42-.863 2.418v9.23c0 .999.308 1.822.863 2.418.555.596 1.365.93 2.261.93h6.409c.896 0 1.706-.334 2.261-.93.555-.596.863-1.42.863-2.418V9.33c0-.998-.308-1.821-.863-2.418zm9.035 5.26c-.457-.63-1.123-.98-2.058-.98-1.025 0-1.856.43-2.492 1.29V7.529h-2.442v13.544h2.442V14.035c0-.471.088-.836.263-1.094.175-.258.414-.387.716-.387.298 0 .53.122.693.364.164.243.245.605.245 1.085v6.726h2.442v-7.238c0-.934-.232-1.65-.694-2.148z"/>
                </svg>
              </div>
              <p className="text-lg font-bold text-slate-800 mb-2">Pago Seguro con PayPal</p>
              <p className="text-slate-600 mb-6">
                Tu transacción será procesada de forma segura a través de PayPal
              </p>

              <button
                onClick={handlePayPalRedirect}
                disabled={isRedirecting}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-3 disabled:opacity-75 disabled:cursor-not-allowed"
              >
                {isRedirecting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Redirigiendo a PayPal...</span>
                  </>
                ) : (
                  <>
                    <CreditCard className="w-5 h-5" />
                    <span>Ir a PayPal a Pagar ${formatAmount(totalWithFee)} USD</span>
                    <ExternalLink className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="mt-6 p-4 bg-slate-50 rounded-xl">
                <p className="text-xs text-slate-600 text-center">
                  Al hacer clic en "Ir a PayPal", serás redirigido al sitio seguro de PayPal
                  <br />
                  Link: {PAYPAL_LINK}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="text-center p-6">
            <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShieldCheck className="w-7 h-7 text-primary" />
            </div>
            <h3 className="font-bold text-slate-900 mb-2">Protección Total</h3>
            <p className="text-sm text-slate-600">PayPal protege tu compra con garantía.</p>
          </div>
          <div className="text-center p-6">
            <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="font-bold text-slate-900 mb-2">Pago Seguro</h3>
            <p className="text-sm text-slate-600">Transacción encriptada y segura.</p>
          </div>
          <div className="text-center p-6">
            <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-bold text-slate-900 mb-2">Entrega Rápida</h3>
            <p className="text-sm text-slate-600">Entrada digital inmediata.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
