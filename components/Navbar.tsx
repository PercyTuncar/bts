"use client";

import Link from "next/link";
import { useState } from "react";
import { ShoppingCart, Menu, User, X, ArrowRight } from "lucide-react";
import { Logo } from "./Logo";
import { Button } from "./Button";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

import { useCart } from "@/context/CartContext";

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const { count } = useCart();
    const pathname = usePathname();
    const isBrazil = pathname?.startsWith('/brasil');

    const menuItems = isBrazil ? [
        { href: "/", label: "Início" },
        { href: "/eventos", label: "Eventos" },
        { href: "/comprar-membresia-bts", label: "Membros" },
        { href: "/blog", label: "Blog" },
        { href: "/tienda", label: "Loja" },
    ] : [
        { href: "/", label: "Inicio" },
        { href: "/eventos", label: "Eventos" },
        { href: "/comprar-membresia-bts", label: "Membresía" },
        { href: "/blog", label: "Blog" },
        { href: "/tienda", label: "Tienda" },
    ];

    return (
        <>
            <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 h-20 transition-all shadow-sm">
                <div className="container mx-auto px-4 h-full flex items-center justify-between">

                    {/* Logo */}
                    <Link href="/" className="hover:opacity-80 transition-opacity relative z-50">
                        <Logo />
                    </Link>

                    {/* Links (Desktop) */}
                    <div className="hidden md:flex items-center gap-8 font-bold text-sm uppercase tracking-widest text-slate-500">
                        {menuItems.map((item) => (
                            <Link key={item.href} href={item.href} className="hover:text-primary hover:underline decoration-2 underline-offset-8 decoration-primary transition-all">{item.label}</Link>
                        ))}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-6 relative z-50">
                        <Link href="/tienda/cart" className="relative text-slate-900 hover:text-primary transition-colors group">
                            <ShoppingCart className="w-6 h-6" />
                            {count > 0 && (
                                <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-white text-[10px] font-bold flex items-center justify-center rounded-full shadow-sm group-hover:scale-110 transition-transform">
                                    {count}
                                </span>
                            )}
                        </Link>

                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="md:hidden text-slate-900 border border-slate-200 p-2 rounded-lg active:bg-slate-50 transition-colors hover:border-primary/50"
                        >
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* MOBILE MENU OVERLAY */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: "-100%" }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: "-100%" }}
                        transition={{ duration: 0.4, ease: "circOut" }}
                        className="fixed inset-0 z-40 bg-white flex flex-col justify-center px-8 md:hidden"
                    >
                        {/* Background Decoration */}
                        {/* <div className="absolute inset-0 bg-noise opacity-20 pointer-events-none"></div> */}

                        <div className="space-y-8 relative z-10">
                            {menuItems.map((item, i) => {
                                const colors = ["text-slate-900", "text-slate-500", "text-primary", "text-slate-500", "text-slate-900"];
                                const color = colors[i % colors.length];

                                return (
                                    <motion.div
                                        key={item.href}
                                        initial={{ x: -50, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: 0.1 + (i * 0.1) }}
                                    >
                                        <Link
                                            href={item.href}
                                            onClick={() => setIsOpen(false)}
                                            className={`text-6xl font-black uppercase italic tracking-tighter hover:ml-4 transition-all flex items-center gap-4 group ${color}`}
                                        >
                                            {item.label}
                                            <ArrowRight className="opacity-0 group-hover:opacity-100 transition-opacity w-8 h-8" />
                                        </Link>
                                    </motion.div>
                                );
                            })}
                        </div>

                        {/* Footer Info */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="absolute bottom-12 left-8 text-gray-500 font-mono text-xs uppercase"
                        >
                            <p>BTS World Tour 2026</p>
                            <p>© Big Hit Music / Hybe</p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
