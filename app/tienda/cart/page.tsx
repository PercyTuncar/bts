"use client";

import { useCart } from "@/context/CartContext";
import { GlassCard } from "@/components/GlassCard";
import { Button } from "@/components/Button";
import Link from "next/link";
import Image from "next/image";
import { Trash2, Plus, Minus, ArrowRight, Info } from "lucide-react";

export default function CartPage() {
    const { items, addItem, removeItem, updateItemQuantity, total } = useCart();

    const getUnitTotal = (item: (typeof items)[number]) => {
        const serviceFee = item.serviceFeePerTicket || 0;
        const installmentInterest = item.installmentInterestPerTicket || 0;
        return item.price + serviceFee + installmentInterest;
    };

    const formatAmount = (amount: number, symbol = "$", locale = "es-PE") => `${symbol}${amount.toLocaleString(locale)}`;

    const handleCheckout = () => {
        const phone = "51944784488";
        const detailLines = items.map((item) => {
            const symbol = item.currencySymbol || "$";
            const locale = symbol === "S/" ? "es-PE" : "es-ES";
            const serviceFee = item.serviceFeePerTicket || 0;
            const installmentInterest = item.installmentInterestPerTicket || 0;
            const unitTotal = getUnitTotal(item);
            const lineTotal = unitTotal * item.quantity;
            const installmentText = item.isInstallment && item.installmentMonths
                ? ` | ${item.installmentMonths} cuotas de ${formatAmount(Math.ceil(lineTotal / item.installmentMonths), symbol, locale)}`
                : "";

            return [
                `• ${item.quantity}x ${item.name}`,
                `  - Base: ${formatAmount(item.price, symbol, locale)}`,
                `  - Comisión servicio: ${formatAmount(serviceFee, symbol, locale)}`,
                `  - Interés cuotas: ${formatAmount(installmentInterest, symbol, locale)}`,
                `  - Subtotal línea: ${formatAmount(lineTotal, symbol, locale)}${installmentText}`,
            ].join("\n");
        }).join("\n\n");

        const totalPeru = items
            .filter((item) => item.currencySymbol === "S/")
            .reduce((acc, item) => acc + (getUnitTotal(item) * item.quantity), 0);

        const message = [
            "Hola, quiero realizar mi pedido de entradas BTS Perú:",
            "",
            detailLines,
            "",
            `TOTAL DEL PEDIDO: ${formatAmount(totalPeru || total, totalPeru ? "S/" : "$", totalPeru ? "es-PE" : "es-ES")}`,
            "",
            "Confirmo que deseo continuar con el proceso de compra segura.",
        ].join("\n");

        const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    };

    if (items.length === 0) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center container mx-auto px-4 pt-24 text-slate-900">
                <h1 className="text-4xl font-black uppercase mb-4 text-slate-900">Tu carrito está vacío</h1>
                <p className="text-slate-500 mb-8">Parece que aún no has añadido nada.</p>
                <Link href="/tienda">
                    <Button variant="outline">Ir a la Tienda</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-24 pb-20 container mx-auto px-4 text-slate-900">
            <h1 className="text-4xl md:text-6xl font-black uppercase mb-12 text-slate-900">Carrito de Compras</h1>

            <div className="grid lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-6">
                    {items.map(item => (
                        <GlassCard key={item.slug} className="flex gap-6 items-center bg-white border-slate-200">
                            <div className="relative w-24 h-24 flex-shrink-0 bg-slate-50 rounded-lg overflow-hidden border border-slate-200">
                                <Image src={item.image} alt={item.name} fill className="object-cover" />
                            </div>

                            <div className="flex-1">
                                <h3 className="font-bold uppercase text-lg leading-tight mb-1 text-slate-900">{item.name}</h3>
                                <p className="text-primary font-mono">
                                    {formatAmount(item.price, item.currencySymbol || "$", item.currencySymbol === "S/" ? "es-PE" : "es-ES")}
                                </p>
                                {(item.serviceFeePerTicket || item.installmentInterestPerTicket) && (
                                    <div className="text-xs text-slate-500 mt-1 space-y-1">
                                        <p>Comisión: {formatAmount(item.serviceFeePerTicket || 0, item.currencySymbol || "$", item.currencySymbol === "S/" ? "es-PE" : "es-ES")}</p>
                                        <p>Interés cuotas: {formatAmount(item.installmentInterestPerTicket || 0, item.currencySymbol || "$", item.currencySymbol === "S/" ? "es-PE" : "es-ES")}</p>
                                    </div>
                                )}
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-3 bg-slate-100 rounded-full px-3 py-1 border border-slate-200">
                                    <button
                                        className="w-6 h-6 flex items-center justify-center hover:text-secondary text-slate-600"
                                        onClick={() => updateItemQuantity(item.slug, item.quantity - 1)}
                                    >
                                        <Minus className="w-4 h-4" />
                                    </button>
                                    <span className="font-mono font-bold w-4 text-center text-slate-900">{item.quantity}</span>
                                    <button
                                        className="w-6 h-6 flex items-center justify-center hover:text-secondary text-slate-600"
                                        onClick={() => addItem(item)}
                                    >
                                        <Plus className="w-4 h-4" />
                                    </button>
                                </div>
                                <button
                                    onClick={() => removeItem(item.slug)}
                                    className="text-slate-400 hover:text-red-500 transition-colors"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>
                        </GlassCard>
                    ))}
                </div>

                <div className="lg:col-span-1">
                    <GlassCard className="sticky top-24 space-y-6 bg-slate-50 border-slate-200">
                        <h3 className="text-2xl font-black uppercase text-slate-900">Resumen</h3>

                        <div className="space-y-2 text-slate-500 font-medium pb-6 border-b border-slate-200">
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span>{formatAmount(total, items.some((item) => item.currencySymbol === "S/") ? "S/" : "$", items.some((item) => item.currencySymbol === "S/") ? "es-PE" : "es-ES")}</span>
                            </div>
                            <div className="flex justify-between text-sm items-center gap-2">
                                <span className="inline-flex items-center gap-1">
                                    Comisión de servicio
                                    <span className="relative group inline-flex items-center">
                                        <Info className="w-3.5 h-3.5 text-slate-400" />
                                        <span className="pointer-events-none absolute left-1/2 top-5 z-20 hidden w-64 -translate-x-1/2 rounded-lg bg-slate-900 px-3 py-2 text-[11px] font-medium leading-snug text-white shadow-lg group-hover:block">
                                            Este precio es por la comisión de servicio; te aseguramos que tendrás el acceso, de otro modo se te hará la devolución del total.
                                        </span>
                                    </span>
                                </span>
                                <span>
                                    {formatAmount(
                                        items.reduce((acc, item) => acc + ((item.serviceFeePerTicket || 0) * item.quantity), 0),
                                        items.some((item) => item.currencySymbol === "S/") ? "S/" : "$",
                                        items.some((item) => item.currencySymbol === "S/") ? "es-PE" : "es-ES"
                                    )}
                                </span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span>Envío</span>
                                <span>Por coordinar</span>
                            </div>
                        </div>

                        <div className="flex justify-between text-2xl font-black text-slate-900">
                            <span>Total</span>
                            <span>{formatAmount(total, items.some((item) => item.currencySymbol === "S/") ? "S/" : "$", items.some((item) => item.currencySymbol === "S/") ? "es-PE" : "es-ES")}</span>
                        </div>

                        <Button
                            size="lg"
                            className="w-full shadow-lg hover:shadow-xl bg-[#25D366] text-white border-transparent hover:bg-[#128C7E]"
                            onClick={handleCheckout}
                        >
                            Completar en WhatsApp <ArrowRight className="w-5 h-5 ml-2" />
                        </Button>

                        <p className="text-xs text-center text-slate-400 mt-4">
                            Serás redirigido a WhatsApp para coordinar el pago y envío con un asesor oficial.
                        </p>
                    </GlassCard>
                </div>
            </div>
        </div>
    );
}
