import { GlassCard } from "@/components/GlassCard";
import { Button } from "@/components/Button";
import Link from "next/link";
import Image from "next/image";
import { countries } from "@/lib/data/countries";

export default function Home() {
  return (
    <div className="flex flex-col gap-12 text-center py-10 pt-24 px-4 container mx-auto">

      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center gap-6 animate-in fade-in zoom-in duration-1000">
        <div className="relative w-full h-[400px] md:h-[600px] rounded-3xl overflow-hidden glass shadow-2xl shadow-primary/30">
          {/* Placeholder Image - In production use real assets */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
          <div className="absolute inset-0 flex items-center justify-center text-white/10 font-bold text-9xl tracking-widest uppercase ml-5">Purple Ocean</div>
          {/* Using a solid color fallback until real image is loaded */}
          <div className="absolute inset-0 bg-slate-900/50" />
          <div className="absolute bottom-10 left-0 right-0 z-20 p-6">
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-purple-400 animate-pulse">
              BTS IS BACK
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mt-4 font-light">
              WORLD TOUR 2026
            </p>
          </div>
        </div>
      </section>

      {/* Quick Select */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto w-full px-4">
        {countries.map((country) => (
          <Link key={country.id} href={`/${country.id}`} className="group">
            <GlassCard className={`h-full flex flex-col items-center justify-center py-10 gap-4 group-hover:bg-white/15 transition-all outline outline-transparent group-hover:outline-primary/50`}>
              <span className="text-4xl">{country.flag}</span>
              <h2 className="text-2xl font-bold uppercase">{country.city}</h2>
              <p className="text-gray-400 text-sm">{country.venue}</p>
              <Button variant="outline" className="mt-4 group-hover:bg-primary group-hover:border-primary">Ver Entradas</Button>
            </GlassCard>
          </Link>
        ))}
      </section>

      {/* Teaser Blog */}
      <section className="mt-12">
        <h2 className="text-3xl font-bold mb-8 text-left">Últimas Novedades</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/blog/guide" className="group">
            <GlassCard variant="interactive" className="text-left cursor-pointer h-full">
              <div className="h-40 bg-purple-900/30 rounded-lg mb-4 flex items-center justify-center text-4xl">🎟️</div>
              <h3 className="text-xl font-bold mb-2">Guía de Supervivencia: Venta de Entradas</h3>
              <p className="text-sm text-gray-400">Todo lo que necesitas saber para la fila virtual de Teleticket.</p>
            </GlassCard>
          </Link>
          <Link href="/tienda/army-bomb" className="group">
            <GlassCard variant="interactive" className="text-left cursor-pointer h-full">
              <div className="h-40 bg-pink-900/30 rounded-lg mb-4 flex items-center justify-center text-4xl">💡</div>
              <h3 className="text-xl font-bold mb-2">Nuevo ARMY BOMB Ver. 4</h3>
              <p className="text-sm text-gray-400">Prepárate para el océano púrpura. Stock limitado.</p>
            </GlassCard>
          </Link>
          <Link href="/blog/setlist-rumors" className="group">
            <GlassCard variant="interactive" className="text-left cursor-pointer h-full">
              <div className="h-40 bg-blue-900/30 rounded-lg mb-4 flex items-center justify-center text-4xl">🎵</div>
              <h3 className="text-xl font-bold mb-2">Posible Setlist 2026</h3>
              <p className="text-sm text-gray-400">¿Qué canciones cantarán? Aquí nuestras predicciones.</p>
            </GlassCard>
          </Link>
        </div>
      </section>

    </div>
  );
}
