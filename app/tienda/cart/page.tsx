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
            <div className="min-h-[60vh] flex flex-col items-center justify-center container mx-auto px-4 pt-24 bg-black text-white">
                <h1 className="text-4xl font-black uppercase mb-4 text-white">Tu carrito esta vacio</h1>
                <p className="text-white/50 mb-8">Parece que aun no has anadido nada.</p>
                <Link href="/tienda">
                    <Button variant="outline">Ir a la Tienda</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-24 pb-20 container mx-auto px-4 bg-black text-white">
            <h1 className="text-4xl md:text-6xl font-black uppercase mb-12 text-white">Carrito de Compras</h1>

            <div className="grid lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-6">
                    {items.map(item => (
                        <GlassCard key={item.slug} className="flex gap-6 items-center">
                            <div className="relative w-24 h-24 flex-shrink-0 bg-white/5 rounded-lg overflow-hidden border border-white/10">
                                <Image src={item.image} alt={item.name} fill className="object-cover" />
                            </div>

                            <div className="flex-1">
                                <h3 className="font-bold uppercase text-lg leading-tight mb-1 text-white">{item.name}</h3>
                                <p className="text-primary font-mono">${item.price}</p>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-3 bg-white/5 rounded-full px-3 py-1 border border-white/10">
                                    <button
                                        className="w-6 h-6 flex items-center justify-center hover:text-primary text-white/60"
                                        onClick={() => removeItem(item.slug)}
                                    >
                                        <Minus className="w-4 h-4" />
                                    </button>
                                    <span className="font-mono font-bold w-4 text-center text-white">{item.quantity}</span>
                                    <button
                                        className="w-6 h-6 flex items-center justify-center hover:text-primary text-white/60"
                                        onClick={() => addItem(item)}
                                    >
                                        <Plus className="w-4 h-4" />
                                    </button>
                                </div>
                                <button
                                    onClick={() => removeItem(item.slug)}
                                    className="text-white/30 hover:text-primary transition-colors"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>
                        </GlassCard>
                    ))}
                </div>

                <div className="lg:col-span-1">
                    <GlassCard className="sticky top-24 space-y-6">
                        <h3 className="text-2xl font-black uppercase text-white">Resumen</h3>

                        <div className="space-y-2 text-white/50 font-medium pb-6 border-b border-white/10">
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span>Envío</span>
                                <span>Por coordinar</span>
                            </div>
                        </div>

                        <div className="flex justify-between text-2xl font-black text-white">
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

                        <p className="text-xs text-center text-white/40 mt-4">
                            Serás redirigido a WhatsApp para coordinar el pago y envío con un asesor oficial.
                        </p>
                    </GlassCard>
                </div>
            </div>
        </div>
    );
}
