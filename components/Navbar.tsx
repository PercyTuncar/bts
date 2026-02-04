"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { ShoppingCart, Menu, X, ArrowRight, Ticket } from "lucide-react";
import { Logo } from "./Logo";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

import { useCart } from "@/context/CartContext";

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { count } = useCart();
    const pathname = usePathname();
    const isBrazil = pathname?.startsWith('/brasil');

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const menuItems = isBrazil ? [
        { href: "/", label: "Inicio" },
        { href: "/eventos", label: "Eventos" },
        { href: "/comprar-membresia-bts", label: "Membros" },
        { href: "/blog", label: "Blog" },
        { href: "/tienda", label: "Loja" },
    ] : [
        { href: "/", label: "Inicio" },
        { href: "/eventos", label: "Eventos" },
        { href: "/comprar-membresia-bts", label: "Membresia" },
        { href: "/blog", label: "Blog" },
        { href: "/tienda", label: "Tienda" },
    ];

    return (
        <>
            <nav className={`fixed top-0 left-0 right-0 z-50 h-20 transition-all duration-300 ${
                scrolled 
                    ? 'bg-black/80 backdrop-blur-xl border-b border-white/5' 
                    : 'bg-transparent'
            }`}>
                <div className="container mx-auto px-4 h-full flex items-center justify-between">

                    {/* Logo */}
                    <Link href="/" className="hover:opacity-80 transition-opacity relative z-50 group">
                        <Logo />
                    </Link>

                    {/* Links (Desktop) */}
                    <div className="hidden md:flex items-center gap-1">
                        {menuItems.map((item) => (
                            <Link 
                                key={item.href} 
                                href={item.href} 
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                                    pathname === item.href 
                                        ? 'text-white bg-white/10' 
                                        : 'text-white/60 hover:text-white hover:bg-white/5'
                                }`}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3 relative z-50">
                        {/* Get Tickets CTA */}
                        <Link 
                            href="/eventos" 
                            className="hidden md:flex items-center gap-2 bg-gradient-to-r from-primary to-primary-light text-white px-4 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 hover:shadow-glow hover:scale-[1.02]"
                        >
                            <Ticket className="w-4 h-4" />
                            Entradas
                        </Link>

                        {/* Cart */}
                        <Link href="/tienda/cart" className="relative text-white/70 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/5">
                            <ShoppingCart className="w-5 h-5" />
                            {count > 0 && (
                                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-gradient-to-r from-primary to-secondary text-white text-[10px] font-bold flex items-center justify-center rounded-full shadow-glow">
                                    {count}
                                </span>
                            )}
                        </Link>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="md:hidden text-white p-2 rounded-lg hover:bg-white/5 transition-colors"
                        >
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* MOBILE MENU OVERLAY - Premium Dark */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl flex flex-col justify-center px-8 md:hidden"
                    >
                        {/* Decorative gradient */}
                        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-primary/10 to-transparent pointer-events-none" />
                        
                        <div className="space-y-6 relative z-10">
                            {menuItems.map((item, i) => (
                                <motion.div
                                    key={item.href}
                                    initial={{ x: -30, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.05 + (i * 0.05) }}
                                >
                                    <Link
                                        href={item.href}
                                        onClick={() => setIsOpen(false)}
                                        className="text-5xl font-black uppercase tracking-tight hover:pl-4 transition-all flex items-center gap-4 group text-white/80 hover:text-white"
                                    >
                                        <span className="text-primary/40 text-lg font-mono">0{i + 1}</span>
                                        {item.label}
                                        <ArrowRight className="opacity-0 group-hover:opacity-100 transition-all w-8 h-8 text-primary -translate-x-2 group-hover:translate-x-0" />
                                    </Link>
                                </motion.div>
                            ))}
                        </div>

                        {/* CTA Button */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="mt-12"
                        >
                            <Link 
                                href="/eventos"
                                onClick={() => setIsOpen(false)}
                                className="inline-flex items-center gap-3 bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-glow hover:shadow-glow-lg transition-all"
                            >
                                <Ticket className="w-5 h-5" />
                                Comprar Entradas
                            </Link>
                        </motion.div>

                        {/* Footer Info */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="absolute bottom-12 left-8 text-white/30 font-mono text-xs uppercase"
                        >
                            <p className="text-primary/60">BTS World Tour 2026</p>
                            <p>Big Hit Music / Hybe</p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
