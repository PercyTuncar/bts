"use client";

import { useCart } from "@/context/CartContext";
import { GlassCard } from "@/components/GlassCard";
import { Button } from "@/components/Button";
import Link from "next/link";
import Image from "next/image";
import { Trash2, Plus, Minus, ArrowRight } from "lucide-react";

export default function CartPage() {
    const { items, addItem, removeItem, total, clearCart } = useCart();

    const handleCheckout = () => {
        const phone = "51944784488";
        const itemsList = items.map(i => `• ${i.quantity}x ${i.name} ($${i.price})`).join("\n");
        const message = `Hola, quiero realizar un pedido:\n\n${itemsList}\n\nTotal: $${total.toFixed(2)}\n\nPor favor indíquenme los pasos para el pago y envío.`;

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
                                <p className="text-primary font-mono">${item.price}</p>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-3 bg-slate-100 rounded-full px-3 py-1 border border-slate-200">
                                    <button
                                        className="w-6 h-6 flex items-center justify-center hover:text-secondary text-slate-600"
                                        onClick={() => removeItem(item.slug)} // Note: Simple remove for now, logical improvement could be decrement
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
                                <span>${total.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span>Envío</span>
                                <span>Por coordinar</span>
                            </div>
                        </div>

                        <div className="flex justify-between text-2xl font-black text-slate-900">
                            <span>Total</span>
                            <span>${total.toFixed(2)}</span>
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
