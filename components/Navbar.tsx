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
            <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-bts-purple-light/20 h-20 transition-all shadow-md backdrop-blur-sm">
                <div className="container mx-auto px-4 h-full flex items-center justify-between">

                    {/* Logo */}
                    <Link href="/" className="hover:opacity-75 transition-opacity relative z-50 flex-shrink-0">
                        <Logo />
                    </Link>

                    {/* Links (Desktop) - Center */}
                    <div className="hidden md:flex items-center gap-8 font-semibold text-sm uppercase tracking-wide text-neutral-900">
                        {menuItems.map((item) => (
                            <Link 
                                key={item.href} 
                                href={item.href} 
                                className="relative group text-neutral-700 hover:text-bts-purple transition-colors duration-300"
                            >
                                {item.label}
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-bts-purple group-hover:w-full transition-all duration-300"></span>
                            </Link>
                        ))}
                    </div>

                    {/* Actions - Right */}
                    <div className="flex items-center gap-4 md:gap-6 relative z-50">
                        {/* Search (Desktop) */}
                        <button className="hidden sm:flex items-center justify-center w-10 h-10 rounded-lg hover:bg-neutral-50 transition-colors text-neutral-700 hover:text-bts-purple">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>

                        {/* Cart */}
                        <Link href="/tienda/cart" className="relative text-neutral-700 hover:text-bts-purple transition-colors group flex items-center justify-center w-10 h-10 hover:bg-neutral-50 rounded-lg">
                            <ShoppingCart className="w-5 h-5" />
                            {count > 0 && (
                                <span className="absolute -top-1 -right-2 w-5 h-5 bg-bts-purple text-white text-[10px] font-bold flex items-center justify-center rounded-full shadow-md group-hover:scale-110 transition-transform">
                                    {count}
                                </span>
                            )}
                        </Link>

                        {/* User Profile */}
                        <button className="hidden sm:flex items-center justify-center w-10 h-10 rounded-lg hover:bg-neutral-50 transition-colors text-neutral-700 hover:text-bts-purple">
                            <User className="w-5 h-5" />
                        </button>

                        {/* Mobile Menu Toggle */}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="md:hidden text-neutral-700 border-2 border-neutral-200 p-2 rounded-lg active:bg-neutral-50 transition-all hover:border-bts-purple hover:text-bts-purple"
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
                        className="fixed inset-0 z-40 bg-gradient-to-b from-neutral-50 to-white flex flex-col justify-center px-6 md:hidden pt-20"
                    >
                        {/* Background Gradient Accent */}
                        <div className="absolute top-0 right-0 w-96 h-96 bg-bts-purple-light/10 rounded-full blur-3xl pointer-events-none"></div>

                        <div className="space-y-6 relative z-10">
                            {menuItems.map((item, i) => {
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
                                            className="text-4xl font-bold uppercase tracking-tight hover:text-bts-purple transition-all flex items-center gap-3 group text-neutral-900"
                                        >
                                            {item.label}
                                            <ArrowRight className="opacity-0 group-hover:opacity-100 transition-opacity w-6 h-6 text-bts-purple" />
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
                            className="absolute bottom-8 left-6 text-neutral-500 font-mono text-xs uppercase"
                        >
                            <p className="text-bts-purple font-semibold mb-1">BTS World Tour 2026</p>
                            <p>© Big Hit Music / Hybe</p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
