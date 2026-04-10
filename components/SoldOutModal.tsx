"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, AlertCircle, Phone } from "lucide-react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export function SoldOutModal({ isOpen, onClose }: Props) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative w-full max-w-md bg-white rounded-3xl p-8 text-center shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="w-10 h-10 text-red-500" />
            </div>

            <h2 className="text-2xl font-black text-slate-900 mb-2 uppercase">
              Entradas Agotadas
            </h2>
            
            <p className="text-slate-600 mb-6 leading-relaxed">
              Lo sentimos, todas las entradas para esta zona ya se han agotado. 
              Te recomendamos intentar con otras zonas disponibles.
            </p>

            <div className="bg-slate-50 rounded-2xl p-6 mb-6">
              <p className="text-sm text-slate-500 mb-3 font-medium">
                ¿Aún necesitas ayuda para conseguir una entrada?
              </p>
              <a
                href="https://wa.me/51944784488"
                className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold px-6 py-3 rounded-xl transition-colors"
              >
                <Phone className="w-5 h-5" />
                Contáctanos por WhatsApp
              </a>
              <p className="text-xs text-slate-400 mt-3">
                Horario: Lun-Sáb 9am-8pm
              </p>
            </div>

            <button
              onClick={onClose}
              className="w-full py-3 text-slate-500 font-bold uppercase text-sm hover:text-slate-700 transition-colors"
            >
              Cerrar
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}