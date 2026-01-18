import { cn } from "@/lib/utils";
import Link from "next/link";
import { ReactNode } from "react";

interface GlassCardProps {
    children: ReactNode;
    className?: string;
    variant?: 'default' | 'interactive' | 'sticky' | 'feature';
}

export const GlassCard = ({ children, className, variant = 'default' }: GlassCardProps) => {
    const baseStyles = "relative overflow-hidden rounded-2xl border backdrop-blur-md transition-all duration-300";

    const variants = {
        default: "bg-slate-900/60 border-white/10 text-white shadow-xl",
        interactive: "bg-slate-800/40 border-white/10 text-white hover:bg-slate-800/60 hover:scale-[1.01] hover:border-purple-500/30 cursor-pointer shadow-lg hover:shadow-purple-500/10",
        sticky: "bg-slate-900/90 border-white/10 text-white shadow-2xl sticky top-24 z-10",
        feature: "bg-slate-900/40 border-white/5 text-gray-100 hover:bg-slate-900/60"
    };

    return (
        <div className={cn(baseStyles, variants[variant], className)}>
            <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none" />
            <div className="relative z-10">{children}</div>
        </div>
    );
};
