import { cn } from "@/lib/utils";
import Link from "next/link";
import { ReactNode } from "react";

interface GlassCardProps {
    children: ReactNode;
    className?: string;
    variant?: 'default' | 'interactive' | 'sticky' | 'feature';
}

export const GlassCard = ({ children, className, variant = 'default' }: GlassCardProps) => {
    // Clean Modern Base Styles
    const baseStyles = "relative bg-white transition-all duration-300 ease-out border border-transparent";

    const variants = {
        default: "p-6 rounded-2xl shadow-sm border-slate-100",
        interactive: "p-6 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 cursor-pointer border-slate-100 ring-1 ring-slate-100 hover:ring-primary/20",
        sticky: "p-4 sticky top-20 z-30 bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100",
        feature: "p-8 rounded-3xl bg-slate-50 hover:bg-white hover:shadow-lg transition-colors border-slate-100"
    };

    return (
        <div className={cn(baseStyles, variants[variant], className)}>
            {/* Clean content container */}
            <div className="relative z-10">{children}</div>
        </div>
    );
};
