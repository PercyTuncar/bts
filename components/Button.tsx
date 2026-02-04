import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'glow';
    size?: 'sm' | 'md' | 'lg';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={cn(
                    "inline-flex items-center justify-center font-bold tracking-tight transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:pointer-events-none rounded-xl",
                    {
                        // Primary: Purple gradient with glow
                        'bg-gradient-to-r from-primary to-primary-light text-white shadow-glow hover:shadow-glow-lg hover:scale-[1.02]': variant === 'primary',
                        // Secondary: Dark surface with subtle border
                        'bg-surface-elevated text-white border border-border hover:border-primary/50 hover:bg-surface-hover': variant === 'secondary',
                        // Outline: Transparent with purple border
                        'bg-transparent border-2 border-primary text-primary hover:bg-primary/10': variant === 'outline',
                        // Ghost: Minimal style
                        'bg-transparent text-muted-foreground hover:text-white hover:bg-white/5': variant === 'ghost',
                        // Glow: Animated purple glow effect
                        'bg-gradient-to-r from-primary to-secondary text-white shadow-glow animate-glow-pulse hover:scale-[1.02]': variant === 'glow',
                        'px-4 py-2 text-sm': size === 'sm',
                        'px-6 py-3 text-base': size === 'md',
                        'px-8 py-4 text-lg': size === 'lg',
                    },
                    className
                )}
                {...props}
            />
        );
    }
);

Button.displayName = 'Button';
