import Link from "next/link";
import { ShoppingCart, Menu, User } from "lucide-react";
import { Logo } from "./Logo";
import { Button } from "./Button";

export function Navbar() {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-lg border-b border-white/5 h-20">
            <div className="container mx-auto px-4 h-full flex items-center justify-between">

                {/* Logo */}
                <Link href="/" className="hover:opacity-80 transition-opacity">
                    <Logo />
                </Link>

                {/* Links (Desktop) */}
                <div className="hidden md:flex items-center gap-8 font-medium text-sm text-gray-300">
                    <Link href="/" className="hover:text-white transition-colors">Inicio</Link>
                    <Link href="/eventos" className="hover:text-white transition-colors">Eventos</Link>
                    <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
                    <Link href="/tienda" className="hover:text-white transition-colors">Tienda</Link>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4">
                    <Link href="/tienda/cart" className="relative text-gray-300 hover:text-white transition-colors">
                        <ShoppingCart className="w-5 h-5" />
                        <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-[10px] font-bold flex items-center justify-center rounded-full text-white">0</span>
                    </Link>

                    <button className="md:hidden text-white">
                        <Menu className="w-6 h-6" />
                    </button>
                </div>
            </div>
        </nav>
    );
}
