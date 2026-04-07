"use client";

import React, { useEffect, useState } from "react";

type Props = {
  start?: string; // ISO string
  end?: string; // ISO string
  offsetHours?: number; // hours to add to end date (can be negative)
  maxPercent?: number; // final percent value (default 10)
  className?: string;
};

export default function PhaseProgress({
  start = "2026-04-07T00:00:00Z",
  end = "2026-04-09T23:59:59Z",
  offsetHours = 0,
  maxPercent = 10,
  className = "",
}: Props) {
  const [percent, setPercent] = useState<number>(0);

  useEffect(() => {
    let mounted = true;

    const update = () => {
      const now = new Date();
      const s = new Date(start);
      const baseEnd = new Date(end);
      const endDate = new Date(baseEnd.getTime() + (offsetHours || 0) * 60 * 60 * 1000);

      if (now <= s) {
        if (mounted) setPercent(0);
        return;
      }

      if (now >= endDate) {
        if (mounted) setPercent(maxPercent);
        return;
      }

      const ratio = (now.getTime() - s.getTime()) / (endDate.getTime() - s.getTime());
      const value = Math.min(Math.max(0, ratio * maxPercent), maxPercent);
      if (mounted) setPercent(value);
    };

    update();
    const id = setInterval(update, 1000);
    return () => {
      mounted = false;
      clearInterval(id);
    };
  }, [start, end, offsetHours, maxPercent]);

  const display = percent.toFixed(1);

  return (
    <div className={`mt-4 w-full max-w-xs ${className}`} aria-hidden={false}>
      <div className="flex justify-between items-end mb-1">
        <span className="text-[10px] font-bold uppercase text-slate-400">Avance</span>
        <span className="text-[12px] font-black text-rose-500">{display}%</span>
      </div>

      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-rose-500 to-primary transition-all duration-1000 ease-out"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
