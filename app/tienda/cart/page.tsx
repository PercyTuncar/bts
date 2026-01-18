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
            <div className="min-h-[60vh] flex flex-col items-center justify-center container mx-auto px-4 pt-24 text-white">
                <h1 className="text-4xl font-black uppercase mb-4">Tu carrito está vacío</h1>
                <p className="text-gray-400 mb-8">Parece que aún no has añadido nada.</p>
                <Link href="/tienda">
                    <Button variant="outline">Ir a la Tienda</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-24 pb-20 container mx-auto px-4 text-white">
            <h1 className="text-4xl md:text-6xl font-black uppercase mb-12">Carrito de Compras</h1>

            <div className="grid lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-6">
                    {items.map(item => (
                        <GlassCard key={item.slug} className="flex gap-6 items-center bg-white/5 border-white/10">
                            <div className="relative w-24 h-24 flex-shrink-0 bg-white/5 rounded-lg overflow-hidden border border-white/10">
                                <Image src={item.image} alt={item.name} fill className="object-cover" />
                            </div>

                            <div className="flex-1">
                                <h3 className="font-bold uppercase text-lg leading-tight mb-1">{item.name}</h3>
                                <p className="text-acid-yellow font-mono">${item.price}</p>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-3 bg-black/50 rounded-full px-3 py-1 border border-white/10">
                                    <button
                                        className="w-6 h-6 flex items-center justify-center hover:text-acid-pink"
                                        onClick={() => removeItem(item.slug)} // Note: Simple remove for now, logical improvement could be decrement
                                    >
                                        <Minus className="w-4 h-4" />
                                    </button>
                                    <span className="font-mono font-bold w-4 text-center">{item.quantity}</span>
                                    <button
                                        className="w-6 h-6 flex items-center justify-center hover:text-acid-green"
                                        onClick={() => addItem(item)}
                                    >
                                        <Plus className="w-4 h-4" />
                                    </button>
                                </div>
                                <button
                                    onClick={() => removeItem(item.slug)}
                                    className="text-gray-500 hover:text-red-500 transition-colors"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>
                        </GlassCard>
                    ))}
                </div>

                <div className="lg:col-span-1">
                    <GlassCard className="sticky top-24 space-y-6 bg-white/5 border-white/10">
                        <h3 className="text-2xl font-black uppercase">Resumen</h3>

                        <div className="space-y-2 text-gray-300 font-medium pb-6 border-b border-white/10">
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
                            className="w-full shadow-[0_0_20px_rgba(37,211,102,0.3)] hover:shadow-[0_0_30px_rgba(37,211,102,0.5)] bg-[#25D366] text-black border-transparent hover:bg-[#128C7E] hover:text-white"
                            onClick={handleCheckout}
                        >
                            Completar en WhatsApp <ArrowRight className="w-5 h-5 ml-2" />
                        </Button>

                        <p className="text-xs text-center text-gray-500 mt-4">
                            Serás redirigido a WhatsApp para coordinar el pago y envío con un asesor oficial.
                        </p>
                    </GlassCard>
                </div>
            </div>
        </div>
    );
}
