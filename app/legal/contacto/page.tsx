import { GlassCard } from "@/components/GlassCard";
import { Button } from "@/components/Button";

export default function Contacto() {
    return (
        <div className="max-w-2xl mx-auto py-10 pt-24 px-4">
            <h1 className="text-4xl font-bold mb-8 text-center">Contacto</h1>
            <GlassCard className="space-y-6">
                <p>¿Tienes dudas sobre tu entrada o la preventa ARMY?</p>
                <form className="space-y-4">
                    <div>
                        <label className="block text-sm font-bold mb-2">Email</label>
                        <input type="email" className="w-full p-3 rounded-lg bg-white/10 border border-white/20 focus:border-primary outline-none" placeholder="army@bts.com" />
                    </div>
                    <div>
                        <label className="block text-sm font-bold mb-2">Mensaje</label>
                        <textarea className="w-full p-3 rounded-lg bg-white/10 border border-white/20 focus:border-primary outline-none h-32" placeholder="..." />
                    </div>
                    <Button className="w-full">Enviar Mensaje</Button>
                </form>
            </GlassCard>
        </div>
    );
}
