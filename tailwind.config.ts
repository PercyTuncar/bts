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
                // BTS Purple Palette - Primary Brand Colors
                "bts-purple": "#9B59B6",        // Main BTS Purple
                "bts-purple-dark": "#6C3A7C",  // Dark Purple for accents
                "bts-purple-light": "#D4A5D4", // Light Purple for backgrounds
                
                // Legacy mappings for transition
                primary: "#9B59B6",             // BTS Purple
                secondary: "#111827",           // Slate 900
                black: "#0f172a",              // Slate 900
                white: "#ffffff",
                
                // Functional Colors
                "success": "#4CAF50",          // Green for confirmations
                "warning": "#FFD700",          // Gold for highlights
                "error": "#E74C3C",            // Red for alerts
                "neutral-50": "#F5F5F5",       // Light gray backgrounds
                "neutral-900": "#1A1A1A",      // Dark text
                
                // Accent colors
                "accent-gold": "#FFD700",
                "accent-green": "#4CAF50",
                "accent-red": "#E74C3C",
                
                // Surface colors
                surface: "#F8FAFC",
                "surface-highlight": "#F1F5F9",
                "off-white": "#F8FAFC",
            },
            fontFamily: {
                serif: ['"Times New Roman"', "Times", "serif"],
            },
            boxShadow: {
                'card': '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
                'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.025)',
                'button': '0 4px 14px 0 rgba(155, 89, 182, 0.39)', // Purple glow for primary buttons
                'purple-glow': '0 0 20px rgba(155, 89, 182, 0.3)',
            },
            backgroundImage: {
                'bts-gradient': 'linear-gradient(135deg, #9B59B6 0%, #6C3A7C 100%)',
                'bts-gradient-light': 'linear-gradient(135deg, #D4A5D4 0%, #9B59B6 100%)',
            }
        },
    },
    plugins: [],
};
export default config;
