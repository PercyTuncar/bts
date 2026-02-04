import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface GlassCardProps {
    children: ReactNode;
    className?: string;
    variant?: 'default' | 'interactive' | 'sticky' | 'feature' | 'glow';
}

export const GlassCard = ({ children, className, variant = 'default' }: GlassCardProps) => {
    // Premium Dark Glassmorphism Base Styles
    const baseStyles = "relative transition-all duration-300 ease-out";

    const variants = {
        default: "p-6 rounded-2xl glass-card",
        interactive: "p-6 rounded-2xl glass-card hover:shadow-glow hover:-translate-y-1 cursor-pointer hover:border-primary/40",
        sticky: "p-4 sticky top-20 z-30 bg-surface-dark/95 backdrop-blur-xl border-b border-border",
        feature: "p-8 rounded-3xl glass-card hover:shadow-glow-lg",
        glow: "p-6 rounded-2xl glass-card border-primary/30 shadow-glow animate-glow-pulse"
    };

    return (
        <div className={cn(baseStyles, variants[variant], className)}>
            {children}
        </div>
    );
};
