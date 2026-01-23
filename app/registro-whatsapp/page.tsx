'use client';

import { Suspense, useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { GlassCard } from '@/components/GlassCard';
import { Button } from '@/components/Button';
import { motion, AnimatePresence } from 'framer-motion';

function WaitlistFormContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [country, setCountry] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        phone: ''
    });

    useEffect(() => {
        const countryParam = searchParams.get('country');
        if (countryParam) {
            // Capitalize first letter
            setCountry(countryParam.charAt(0).toUpperCase() + countryParam.slice(1));
        }
    }, [searchParams]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { error } = await supabase
                .from('waitlist')
                .insert([
                    {
                        first_name: formData.first_name,
                        last_name: formData.last_name,
                        phone: formData.phone,
                        country: country || 'Unknown'
                    }
                ]);

            if (error) throw error;

            setSuccess(true);
            setTimeout(() => {
                router.push('/');
            }, 3000);
        } catch (error) {
            console.error('Error saving data:', error);
            alert('Hubo un error al guardar tus datos. Por favor intenta de nuevo.');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    if (success) {
        return (
            <div className="min-h-screen pt-32 pb-20 flex items-center justify-center px-4 bg-slate-50/50">
                <GlassCard className="max-w-md w-full text-center py-12">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
                    >
                        <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </motion.div>
                    <h2 className="text-2xl font-black text-slate-900 mb-2">¡Registro Exitoso!</h2>
                    <p className="text-slate-600">
                        Gracias por unirte a la lista de espera {country ? `de ${country}` : ''}.<br />
                        Te contactaremos pronto.
                    </p>
                </GlassCard>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-32 pb-20 px-4 bg-slate-50/50 flex flex-col items-center justify-center">

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-lg"
            >
                <div className="text-center mb-10">
                    <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 uppercase">
                        Lista de Espera <span className="text-primary">{country}</span>
                    </h1>
                    <p className="text-slate-600 text-lg">
                        El grupo de WhatsApp está lleno o en mantenimiento.
                        Déjanos tus datos para avisarte cuando se liberen cupos.
                    </p>
                </div>

                <GlassCard className="p-8 md:p-10 bg-white/80 backdrop-blur-xl border border-white/20 shadow-xl rounded-3xl">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="first_name" className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Nombre</label>
                            <input
                                type="text"
                                id="first_name"
                                name="first_name"
                                required
                                value={formData.first_name}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white/50 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                                placeholder="Tu nombre"
                            />
                        </div>

                        <div>
                            <label htmlFor="last_name" className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Apellido</label>
                            <input
                                type="text"
                                id="last_name"
                                name="last_name"
                                required
                                value={formData.last_name}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white/50 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                                placeholder="Tu apellido"
                            />
                        </div>

                        <div>
                            <label htmlFor="phone" className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Teléfono (con código país)</label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                required
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white/50 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                                placeholder="+51 999 999 999"
                            />
                        </div>

                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full py-4 text-lg font-black uppercase shadow-lg hover:shadow-xl transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Enviando...
                                </span>
                            ) : 'Enviar Solicitud'}
                        </Button>

                        <p className="text-xs text-center text-slate-400 mt-4">
                            Tus datos están seguros. Solo los usaremos para contactarte sobre entradas de BTS.
                        </p>
                    </form>
                </GlassCard>
            </motion.div>
        </div>
    );
}

export default function WaitlistPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div></div>}>
            <WaitlistFormContent />
        </Suspense>
    );
}
