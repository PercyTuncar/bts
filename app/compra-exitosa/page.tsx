"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Ticket, CheckCircle, ArrowRight, Phone } from "lucide-react";

const POSTER_IMAGE = "https://cdn.getcrowder.com/images/e7dbc2b8-7233-4b7c-944d-41e1a800a7c5-1920x720bannertm.png";

export default function CompraExitosaPage() {
  // Leer la fecha seleccionada desde localStorage
  const [fechaSeleccionada, setFechaSeleccionada] = useState<string | null>(null);

  useEffect(() => {
    const fechaGuardada = localStorage.getItem("bts-fecha-seleccionada");
    if (fechaGuardada) {
      setFechaSeleccionada(fechaGuardada);
    }
  }, []);

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr + "T12:00:00");
    const day = d.getDate();
    const month = d.toLocaleDateString('es-ES', { month: 'long' });
    return `${day} de ${month} de 2026`;
  };
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white font-sans selection:bg-primary/20 selection:text-primary">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-slate-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-black uppercase tracking-tight">
              <span className="text-slate-900">Entradas</span>
              <span className="text-primary">BTS</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-32 pb-20 px-4">
        <div className="container max-w-4xl mx-auto">
          {/* Success Banner */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-4xl md:text-5xl font-black uppercase text-slate-900 mb-4">
              ¡Compra Exitosa!
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Gracias por adquirir la <strong>última entrada disponible</strong> para el concierto de BTS en Chile 2026
            </p>
          </div>

          {/* Invoice Card - Boleta Design */}
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden mb-8">
            {/* Poster Header with actual BTS poster image */}
            <div className="relative h-64 md:h-80 overflow-hidden">
              <Image
                src={POSTER_IMAGE}
                alt="BTS World Tour 2026 Poster"
                fill
                className="object-cover object-[50%_70%]"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <div className="relative z-10 h-full flex items-center justify-center p-8">
                <div className="text-center">
                  <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-widest mb-2 drop-shadow-lg">
                    BTS World Tour 2026
                  </h2>
                  <p className="text-lg text-white/90 font-medium drop-shadow-md">
                    Live in Santiago, Chile
                  </p>
                  <div className="w-20 h-1 bg-primary mx-auto mt-4"></div>
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute top-4 right-4">
                <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase border-2 border-white shadow-lg">
                  Última Entrada
                </span>
              </div>
              <div className="absolute bottom-4 left-4 text-white/90">
                <p className="text-sm font-mono">
                  {fechaSeleccionada ? formatDate(fechaSeleccionada) : "Fecha por confirmar"}
                </p>
                <p className="text-sm font-mono">Estadio Nacional</p>
              </div>
            </div>

            {/* Ticket Details */}
            <div className="p-6 md:p-8">
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Ticket className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase text-slate-500">Evento</p>
                      <p className="font-bold text-slate-900">BTS World Tour 2026</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase text-slate-500">Lugar</p>
                      <p className="font-bold text-slate-900">Estadio Nacional</p>
                      <p className="text-sm text-slate-500">Santiago, Chile</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase text-slate-500">Fecha</p>
                      <p className="font-bold text-slate-900">
                        {fechaSeleccionada ? formatDate(fechaSeleccionada) : "Fecha por confirmar"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-slate-50 rounded-xl p-4">
                    <p className="text-xs font-bold uppercase text-slate-500 mb-1">Zona</p>
                    <p className="font-bold text-slate-900 text-lg">Cancha Andes</p>
                    <p className="text-sm text-slate-500">Sector: Frente al escenario</p>
                  </div>

                  <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl p-4 border border-primary/20">
                    <p className="text-xs font-bold uppercase text-primary mb-1">Precio</p>
                    <p className="text-3xl font-black text-slate-900">$949 USD</p>
                    <p className="text-xs text-slate-500">Impuestos incluidos</p>
                  </div>

                  <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <p className="text-sm font-bold text-green-800">Pago confirmado</p>
                    </div>
                    <p className="text-xs text-green-700 mt-1">PayPal Transaction ID: NNBWSP6KD3TJN</p>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t-2 border-dashed border-slate-200 my-6"></div>

              {/* WhatsApp Instructions */}
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border-2 border-green-200">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-black text-green-900 uppercase mb-2">
                      Por favor, envía captura de pantalla
                    </h3>
                    <p className="text-green-800 mb-4">
                      Para poder darte acceso a tu entrada digital, por favor envía una captura de pantalla de esta página al siguiente número de WhatsApp:
                    </p>

                    <div className="bg-white rounded-xl p-4 shadow-sm border border-green-200 mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                          <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                          </svg>
                        </div>
                        <div>
                          <p className="font-bold text-slate-900">+56 9 5194 4784</p>
                          <p className="text-xs text-slate-500">Haz clic para abrir WhatsApp</p>
                        </div>
                      </div>
                    </div>

                    <a
                      href="https://wa.me/56951944784"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl w-full"
                    >
                      <Phone className="w-4 h-4" />
                      Enviar Captura por WhatsApp
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <CheckCircle className="w-6 h-6 text-primary" />
              </div>
              <h4 className="font-bold text-slate-900 mb-2">Pago Seguro</h4>
              <p className="text-sm text-slate-600">Transacción procesada mediante PayPal con total seguridad y respaldo.</p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h4 className="font-bold text-slate-900 mb-2">Entrada Garantizada</h4>
              <p className="text-sm text-slate-600">Tu acceso al concierto está 100% asegurado. ¡No te lo pierdas!</p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h4 className="font-bold text-slate-900 mb-2">Soporte VIP</h4>
              <p className="text-sm text-slate-600">Nuestro equipo está disponible para ayudarte en todo momento.</p>
            </div>
          </div>

          {/* Back to Home */}
          <div className="text-center mt-12">
            <Link href="/" className="inline-flex items-center gap-2 text-primary hover:text-primary-dark font-bold transition-colors">
              <ArrowRight className="w-4 h-4 transform rotate-180" />
              Volver al inicio
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-8">
        <div className="container mx-auto px-4 text-center text-sm text-slate-500">
          <p>BTS World Tour 2026 - Entrada Oficial</p>
        </div>
      </footer>
    </div>
  );
}
