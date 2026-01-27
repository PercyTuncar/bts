"use client";

import { useEffect, useState } from "react";
import { X, AlertTriangle, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { countries } from "@/lib/data/countries";

export const OfficialStatementPopup = () => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            // Check if already seen if requested, but for now strict 2s delay as requested
            setIsOpen(true);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    const handleClose = () => {
        setIsOpen(false);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 sm:px-0">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClose}
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-xl shadow-2xl"
                    >
                        {/* Header */}
                        <div className="sticky top-0 z-10 flex items-center justify-between p-4 bg-red-600 text-white shadow-md">
                            <div className="flex items-center gap-2">
                                <AlertTriangle className="h-6 w-6 text-white" />
                                <h2 className="text-lg font-bold tracking-tight uppercase">
                                    Comunicado Oficial
                                </h2>
                            </div>
                            <button
                                onClick={handleClose}
                                className="p-1 hover:bg-white/20 rounded-full transition-colors"
                            >
                                <X className="h-6 w-6" />
                            </button>
                        </div>

                        {/* Body */}
                        <div className="p-6 space-y-6 text-slate-800">
                            <div className="space-y-4">
                                <h3 className="text-xl font-bold text-slate-900 border-b pb-2">
                                    Aclaración sobre Difamación y Transparencia del Servicio
                                </h3>

                                <p className="text-sm text-slate-600 italic">
                                    Estimada comunidad y visitantes,
                                </p>

                                <p className="text-sm leading-relaxed">
                                    Me veo en la obligación de emitir este comunicado ante la circulación de publicaciones malintencionadas en redes sociales que están difundiendo mis datos personales y lanzando acusaciones falsas sin fundamento.
                                </p>

                                <div className="bg-red-50 border-l-4 border-red-500 p-4 my-4">
                                    <p className="font-bold text-red-700">POR FAVOR, LEAN ANTES DE ACUSAR.</p>
                                    <p className="text-sm mt-1 text-red-800">
                                        Invoco a todos los usuarios a LEER DETALLADAMENTE la información de mi sitio web. Las acusaciones provienen de personas que no se han tomado el tiempo de leer los términos del servicio o que buscan dañar mi imagen deliberadamente.
                                    </p>
                                </div>

                                <div className="space-y-4">
                                    <section>
                                        <h4 className="flex items-center gap-2 font-bold text-slate-900 text-base mb-2">
                                            <ShieldCheck className="w-5 h-5 text-blue-600" />
                                            1. ¿QUÉ HACEMOS? SOMOS UN SERVICIO DE ASISTENCIA (PERSONAL SHOPPER)
                                        </h4>
                                        <p className="text-sm text-slate-700 ml-7">
                                            Yo no me escondo detrás de una pantalla. Mis datos son públicos porque mi trabajo es honesto. Mi servicio está claramente descrito en la web:
                                            <br /><br />
                                            Ofrecemos <span className="font-bold text-blue-700">ASISTENCIA PARA LA COMPRA</span> de membresías y gestión de entradas.
                                            <br /><br />
                                            Este servicio es para personas que no saben cómo realizar el proceso técnico, les da error la plataforma oficial, o simplemente desean contratar a un Gestor (Personal Shopper) que asegure el trámite por ellos.
                                            <br /><br />
                                            El precio incluye un <span className="font-bold">FEE (Comisión)</span> por nuestro tiempo, conocimiento técnico y gestión. Es un cobro por servicio, totalmente legítimo y especificado.
                                        </p>
                                    </section>

                                    <section>
                                        <h4 className="font-bold text-slate-900 text-base mb-2">
                                            2. SOBRE PRECIOS Y ENTRADAS
                                        </h4>
                                        <p className="text-sm text-slate-700">
                                            Como se aclara en la web de múltiples formas: <span className="font-bold">Los precios y zonas mostrados actualmente son REFERENCIALES, ya que la venta oficial de entradas aún no ha iniciado.</span> Nuestro trabajo actual se centra en la correcta gestión de las MEMBRESÍAS para que los fans estén listos cuando llegue el momento.
                                        </p>
                                    </section>

                                    <section>
                                        <h4 className="font-bold text-slate-900 text-base mb-2">
                                            3. TRANSPARENCIA TOTAL
                                        </h4>
                                        <p className="text-sm text-slate-700">
                                            Agradezco profundamente a los clientes que siguen confiando en mi gestión y que ya cuentan con sus membresías activas.
                                        </p>
                                        <div className="mt-3 p-3 bg-blue-50 rounded-lg text-center">
                                            <p className="text-blue-900 font-medium">¿Tienes dudas? No te dejes llevar por rumores.</p>
                                            <p className="text-xs text-slate-600 mt-1 mb-3">Únete a nuestra comunidad oficial:</p>

                                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
                                                {countries.map((country) => (
                                                    <a
                                                        key={country.id}
                                                        href={country.whatsappLink}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex items-center justify-center gap-2 px-3 py-2 bg-green-500 hover:bg-green-600 text-white text-xs font-bold rounded-lg transition-colors text-center"
                                                    >
                                                        <span className="text-base">{country.flag}</span>
                                                        <span>{country.name}</span>
                                                    </a>
                                                ))}
                                            </div>

                                            <p className="text-xs text-blue-700 mt-3">
                                                y comprueba tú mismo la satisfacción y transparencia con la que trabajamos.
                                            </p>
                                        </div>
                                    </section>

                                    <section className="border-t pt-4 mt-6">
                                        <h4 className="font-bold text-red-600 flex items-center gap-2 mb-2">
                                            <AlertTriangle className="w-4 h-4" />
                                            ADVERTENCIA LEGAL
                                        </h4>
                                        <p className="text-xs text-slate-600 leading-relaxed text-justify">
                                            Ante la difusión no autorizada de mi DNI, número de celular y fotografías, informo que <span className="font-bold">PROCEDERÉ LEGALMENTE</span> contra los responsables y quienes repliquen dicha información, amparándome en las leyes peruanas vigentes:
                                        </p>
                                        <ul className="list-disc pl-5 mt-2 space-y-1 text-xs text-slate-600">
                                            <li>
                                                <span className="font-bold">Violación a la Ley de Protección de Datos Personales (Ley N° 29733):</span> Por la publicación de mis datos sensibles sin consentimiento.
                                            </li>
                                            <li>
                                                <span className="font-bold">Delito de Difamación Agravada (Art. 132 del Código Penal):</span> Al atribuirme hechos falsos y delitos ("estafa") a través de un medio de comunicación social, lo cual conlleva penas privativas de libertad y reparación civil.
                                            </li>
                                        </ul>
                                        <p className="text-xs text-slate-600 mt-2 font-medium">
                                            No permitiré que se manche mi reputación profesional con mentiras. Agradezco a quienes sí se toman el tiempo de leer e informarse.
                                        </p>
                                    </section>
                                </div>

                                <div className="mt-8 pt-4 border-t text-right">
                                    <p className="font-bold text-slate-900">Percy Tuncar</p>
                                    <p className="text-sm text-slate-600">Programador Web & Fundador</p>
                                </div>
                            </div>
                        </div>

                        {/* Footer Action */}
                        <div className="sticky bottom-0 bg-gray-50 p-4 border-t flex justify-end">
                            <button
                                onClick={handleClose}
                                className="px-6 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors font-medium text-sm"
                            >
                                Entendido, cerrar comunicado
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
