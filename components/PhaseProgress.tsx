"use client";

import React, { useEffect, useState } from "react";

type Props = {
  startPercent?: number; // starting percent (default 50)
  targetDate?: string; // ISO date when it reaches 100%
  offsetHours?: number; // additional offset from target date
  soldOut?: boolean; // if true, show 100% with sold out styling
  className?: string;
};

export default function PhaseProgress({
  startPercent = 50,
  targetDate = "2026-04-12T23:59:59Z",
  offsetHours = 0,
  soldOut = false,
  className = "",
}: Props) {
  const [percent, setPercent] = useState<number>(startPercent);

  useEffect(() => {
    let mounted = true;

    const update = () => {
      const now = new Date();
      
      // If sold out, always show 100%
      if (soldOut) {
        if (mounted) setPercent(100);
        return;
      }

      // Start date - April 10, 2026 at 00:00
      const startDate = new Date("2026-04-10T00:00:00-05:00");
      
      // Target date - April 12, 2026 (adjusted by offsetHours)
      const baseTarget = new Date(targetDate);
      const endDate = new Date(baseTarget.getTime() + (offsetHours || 0) * 60 * 60 * 1000);

      // Before start date - show start percent
      if (now <= startDate) {
        if (mounted) setPercent(startPercent);
        return;
      }

      // After end date - show 100%
      if (now >= endDate) {
        if (mounted) setPercent(100);
        return;
      }

      // Between start and end - calculate progress
      const totalRange = 100 - startPercent;
      const elapsed = now.getTime() - startDate.getTime();
      const totalDuration = endDate.getTime() - startDate.getTime();
      const ratio = Math.min(elapsed / totalDuration, 1);
      const value = startPercent + (ratio * totalRange);
      
      if (mounted) setPercent(value);
    };

    update();
    const id = setInterval(update, 1000);
    return () => {
      mounted = false;
      clearInterval(id);
    };
  }, [startPercent, targetDate, offsetHours, soldOut]);

  const display = percent.toFixed(1);
  const isComplete = percent >= 100 || soldOut;

  return (
    <div className={`mt-4 w-full max-w-xs ${className}`} aria-hidden={false}>
      <div className="flex justify-between items-end mb-1">
        <span className={`text-[10px] font-bold uppercase ${isComplete ? 'text-red-500' : 'text-slate-400'}`}>
          {isComplete ? 'Completado' : 'Avance'}
        </span>
        <span className={`text-[12px] font-black ${isComplete ? 'text-red-600' : 'text-rose-500'}`}>
          {display}%
        </span>
      </div>

      <div className={`h-2 w-full rounded-full overflow-hidden ${isComplete ? 'bg-red-100' : 'bg-slate-100'}`}>
        <div
          className={`h-full transition-all duration-1000 ease-out ${isComplete ? 'bg-red-500' : 'bg-gradient-to-r from-rose-500 to-primary'}`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}