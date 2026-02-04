import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./lib/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                // BTS Purple Palette - Premium Dark Theme inspired by DICE.fm
                primary: "#9333EA", // Rich purple (violet-600)
                "primary-light": "#A855F7", // Lighter purple for hover states
                "primary-dark": "#7C3AED", // Deeper purple
                secondary: "#EC4899", // Pink accent for highlights
                
                // Dark backgrounds like DICE.fm
                background: "#000000", // Pure black
                "surface-dark": "#0A0A0A", // Near black for cards
                "surface-elevated": "#121212", // Elevated surfaces
                "surface-hover": "#1A1A1A", // Hover state for surfaces
                
                // Text colors
                foreground: "#FFFFFF",
                "muted-foreground": "#A1A1AA", // zinc-400
                "subtle": "#71717A", // zinc-500
                
                // Functional colors
                success: "#22C55E",
                warning: "#F59E0B",
                error: "#EF4444",
                
                // Border colors
                border: "rgba(255, 255, 255, 0.1)",
                "border-hover": "rgba(147, 51, 234, 0.5)",
                
                // Legacy compatibility
                "acid-yellow": "#9333EA",
                "acid-pink": "#EC4899",
                "neon-green": "#22C55E",
                white: "#ffffff",
                black: "#000000",
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                serif: ['"Times New Roman"', "Times", "serif"],
            },
            boxShadow: {
                'glow': '0 0 20px rgba(147, 51, 234, 0.3)',
                'glow-lg': '0 0 40px rgba(147, 51, 234, 0.4)',
                'glow-pink': '0 0 20px rgba(236, 72, 153, 0.3)',
                'card': '0 4px 20px rgba(0, 0, 0, 0.3)',
                'card-hover': '0 8px 30px rgba(147, 51, 234, 0.2)',
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'purple-glow': 'radial-gradient(ellipse at center, rgba(147, 51, 234, 0.15) 0%, transparent 70%)',
                'purple-gradient': 'linear-gradient(135deg, #7C3AED 0%, #9333EA 50%, #A855F7 100%)',
            },
            animation: {
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
            },
            keyframes: {
                'glow-pulse': {
                    '0%, 100%': { boxShadow: '0 0 20px rgba(147, 51, 234, 0.3)' },
                    '50%': { boxShadow: '0 0 40px rgba(147, 51, 234, 0.6)' },
                }
            }
        },
    },
    plugins: [],
};
export default config;
