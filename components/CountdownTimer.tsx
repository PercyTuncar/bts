'use client';
import { useEffect, useState } from 'react';

export function CountdownTimer({ targetDate, className = "" }: { targetDate: string, className?: string }) {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        const target = new Date(targetDate).getTime();

        const interval = setInterval(() => {
            const now = new Date().getTime();
            const difference = target - now;

            if (difference <= 0) {
                clearInterval(interval);
                return;
            }

            setTimeLeft({
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((difference % (1000 * 60)) / 1000),
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [targetDate]);

    return (
        <div className={`flex items-center justify-between w-full ${className} py-4`}>
            <div className="flex flex-col items-center flex-1">
                <span className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400 tabular-nums leading-none">
                    {String(timeLeft.days).padStart(2, '0')}
                </span>
                <span className="text-[10px] sm:text-xs uppercase tracking-widest text-gray-500 font-semibold mt-1">Días</span>
            </div>
            
            <div className="text-2xl sm:text-3xl lg:text-4xl font-thin text-gray-700 pb-4">:</div>
            
            <div className="flex flex-col items-center flex-1">
                <span className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400 tabular-nums leading-none">
                    {String(timeLeft.hours).padStart(2, '0')}
                </span>
                <span className="text-[10px] sm:text-xs uppercase tracking-widest text-gray-500 font-semibold mt-1">Hrs</span>
            </div>
            
            <div className="text-2xl sm:text-3xl lg:text-4xl font-thin text-gray-700 pb-4">:</div>
            
            <div className="flex flex-col items-center flex-1">
                <span className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400 tabular-nums leading-none">
                    {String(timeLeft.minutes).padStart(2, '0')}
                </span>
                <span className="text-[10px] sm:text-xs uppercase tracking-widest text-gray-500 font-semibold mt-1">Min</span>
            </div>
            
            <div className="text-2xl sm:text-3xl lg:text-4xl font-thin text-gray-700 pb-4">:</div>
            
            <div className="flex flex-col items-center flex-1">
                <span className="text-3xl sm:text-4xl lg:text-5xl font-bold text-purple-400 animate-pulse tabular-nums leading-none">
                    {String(timeLeft.seconds).padStart(2, '0')}
                </span>
                <span className="text-[10px] sm:text-xs uppercase tracking-widest text-purple-400/80 font-semibold mt-1">Seg</span>
            </div>
        </div>
    );
}
