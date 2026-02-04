
export const runtime = 'edge';

import Link from 'next/link'
import { Button } from "@/components/Button";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white text-center px-4 relative">
            {/* Background Glow */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-purple-glow opacity-30 pointer-events-none" />
            
            <div className="relative z-10">
                <span className="gradient-text text-[150px] md:text-[200px] font-black leading-none">404</span>
                <p className="text-2xl md:text-3xl font-black uppercase mb-4 text-white">Pagina no encontrada</p>
                <p className="text-white/50 mb-10 max-w-md mx-auto leading-relaxed">
                    Lo sentimos, no pudimos encontrar lo que buscabas. Es posible que la pagina haya sido eliminada.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/">
                        <Button variant="glow" size="lg">
                            <Home className="w-5 h-5 mr-2" />
                            Volver al Inicio
                        </Button>
                    </Link>
                    <Link href="/eventos">
                        <Button variant="secondary" size="lg">
                            <ArrowLeft className="w-5 h-5 mr-2" />
                            Ver Eventos
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
