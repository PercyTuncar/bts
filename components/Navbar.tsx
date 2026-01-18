"use client";

import Link from "next/link";
import { useState } from "react";
import { ShoppingCart, Menu, User, X, ArrowRight } from "lucide-react";
import { Logo } from "./Logo";
import { Button } from "./Button";
import { motion, AnimatePresence } from "framer-motion";

import { useCart } from "@/context/CartContext";

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const { count } = useCart();

    return (
        <>
            <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-md border-b-2 border-white/20 h-20 transition-all">
                <div className="container mx-auto px-4 h-full flex items-center justify-between">

                    {/* Logo */}
                    <Link href="/" className="hover:opacity-80 transition-opacity relative z-50">
                        <Logo />
                    </Link>

                    {/* Links (Desktop) */}
                    <div className="hidden md:flex items-center gap-8 font-bold text-sm uppercase tracking-widest text-gray-400">
                        <Link href="/" className="hover:text-acid-yellow hover:underline decoration-2 underline-offset-4 transition-all">Inicio</Link>
                        <Link href="/eventos" className="hover:text-acid-pink hover:underline decoration-2 underline-offset-4 transition-all">Eventos</Link>
                        <Link href="/blog" className="hover:text-neon-green hover:underline decoration-2 underline-offset-4 transition-all">Blog</Link>
                        <Link href="/tienda" className="hover:text-white hover:underline decoration-2 underline-offset-4 transition-all">Tienda</Link>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-6 relative z-50">
                        <Link href="/tienda/cart" className="relative text-white hover:text-acid-yellow transition-colors group">
                            <ShoppingCart className="w-6 h-6" />
                            {count > 0 && (
                                <span className="absolute -top-2 -right-2 w-5 h-5 bg-acid-pink text-black text-[10px] font-black flex items-center justify-center rounded-none border border-black group-hover:scale-110 transition-transform">
                                    {count}
                                </span>
                            )}
                        </Link>

                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="md:hidden text-white border-2 border-white p-1 active:bg-white active:text-black transition-colors"
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
                        className="fixed inset-0 z-40 bg-black flex flex-col justify-center px-8 md:hidden"
                    >
                        {/* Background Decoration */}
                        <div className="absolute inset-0 bg-noise opacity-20 pointer-events-none"></div>

                        <div className="space-y-8 relative z-10">
                            {[
                                { href: "/", label: "Inicio", color: "text-white" },
                                { href: "/eventos", label: "Eventos", color: "text-acid-pink" },
                                { href: "/blog", label: "Blog", color: "text-neon-green" },
                                { href: "/tienda", label: "Tienda", color: "text-acid-yellow" }
                            ].map((item, i) => (
                                <motion.div
                                    key={item.href}
                                    initial={{ x: -50, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.1 + (i * 0.1) }}
                                >
                                    <Link
                                        href={item.href}
                                        onClick={() => setIsOpen(false)}
                                        className={`text-6xl font-black uppercase italic tracking-tighter hover:ml-4 transition-all flex items-center gap-4 group ${item.color}`}
                                    >
                                        {item.label}
                                        <ArrowRight className="opacity-0 group-hover:opacity-100 transition-opacity w-8 h-8" />
                                    </Link>
                                </motion.div>
                            ))}
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
