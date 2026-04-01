"use client";

import React, { useEffect, useState } from 'react';

type CountdownProps = {
  // optional ISO string or Date; if omitted defaults to 2026-04-02 13:00 local
  target?: string | Date;
};

function pad(n: number) {
  return String(n).padStart(2, '0');
}

export default function Countdown({ target }: CountdownProps) {
  const defaultTarget = new Date(2026, 3, 2, 13, 0, 0); // April is month 3 (0-indexed)
  const targetDate = target ? new Date(target) : defaultTarget;

  const getRemaining = () => Math.max(0, targetDate.getTime() - Date.now());

  const [remainingMs, setRemainingMs] = useState<number>(getRemaining());

  useEffect(() => {
    const id = setInterval(() => {
      setRemainingMs(getRemaining());
    }, 1000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetDate]);

  const expired = remainingMs <= 0;

  const seconds = Math.floor((remainingMs / 1000) % 60);
  const minutes = Math.floor((remainingMs / (1000 * 60)) % 60);
  const hours = Math.floor((remainingMs / (1000 * 60 * 60)) % 24);
  const days = Math.floor(remainingMs / (1000 * 60 * 60 * 24));

  return (
    <div className="w-full max-w-3xl mx-auto mt-6">
      {!expired ? (
        <div className="bg-gradient-to-r from-primary/10 to-white border border-slate-100 rounded-2xl p-4 md:p-6 shadow-lg">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex-1">
              <p className="text-sm md:text-base text-slate-600 mb-2">
                <strong className="text-slate-800">Compra antes del <span className="whitespace-nowrap">2/04/2026 13:00</span> (hora local) para acceder a la preventa.</strong>
              </p>
              <p className="text-xs text-slate-500">Sincronizado con tu hora local.</p>
            </div>

            <div className="flex items-center gap-3 md:gap-4">
              <div className="flex bg-white/90 px-3 py-2 md:px-4 md:py-3 rounded-lg shadow-inner border border-slate-100 items-center gap-3">
                <div className="text-center w-16 md:w-20">
                  <div className="text-2xl md:text-3xl font-extrabold text-slate-900">{String(days)}</div>
                  <div className="text-[10px] uppercase text-slate-500">Días</div>
                </div>
                <div className="text-center w-12 md:w-14">
                  <div className="text-2xl md:text-3xl font-extrabold text-slate-900">{pad(hours)}</div>
                  <div className="text-[10px] uppercase text-slate-500">Horas</div>
                </div>
                <div className="text-center w-12 md:w-14">
                  <div className="text-2xl md:text-3xl font-extrabold text-slate-900">{pad(minutes)}</div>
                  <div className="text-[10px] uppercase text-slate-500">Min</div>
                </div>
                <div className="text-center w-12 md:w-14">
                  <div className="text-2xl md:text-3xl font-extrabold text-slate-900">{pad(seconds)}</div>
                  <div className="text-[10px] uppercase text-slate-500">Seg</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-4 md:p-6 shadow-sm">
          <p className="text-sm md:text-base text-red-800 font-semibold">Plazo finalizado — ya no podrás acceder a la preventa si compras ahora.</p>
        </div>
      )}

      <div aria-live="polite" className="sr-only">
        {expired ? 'Plazo finalizado — ya no podrás acceder a la preventa.' : `Quedan ${days} días, ${pad(hours)} horas, ${pad(minutes)} minutos y ${pad(seconds)} segundos.`}
      </div>
    </div>
  );
}
