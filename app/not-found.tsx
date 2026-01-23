
export const runtime = 'edge';

import Link from 'next/link'
import { Button } from "@/components/Button";

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 text-slate-900 text-center px-4">
            <h2 className="text-6xl font-black mb-4">404</h2>
            <p className="text-xl font-bold mb-8">Página no encontrada</p>
            <p className="text-slate-500 mb-8 max-w-md">Lo sentimos, no pudimos encontrar lo que buscabas. Es posible que la página haya sido eliminada o que la dirección sea incorrecta.</p>
            <Link href="/">
                <Button variant="primary">Volver al Inicio</Button>
            </Link>
        </div>
    )
}
