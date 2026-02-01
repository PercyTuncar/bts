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
                primary: "#F01942", // The new BTS Red Accent
                secondary: "#111827", // Using Slate 900 as secondary for deep contrast
                black: "#0f172a", // Slate 900
                white: "#ffffff",
                // Keeping some legacy names to avoid immediate breaks, but remapping them
                "acid-yellow": "#F01942", // Remapped to primary for now to catch old buttons
                "acid-pink": "#F01942",   // Remapped to primary
                "neon-green": "#22c55e",  // Standard green for success states
                "off-white": "#F8FAFC",   // Slate 50

                // Functional palette
                surface: "#F8FAFC",
                "surface-highlight": "#F1F5F9",
            },
            fontFamily: {
                serif: ['"Times New Roman"', "Times", "serif"],
                // Sans is already default, typically Inter from next/font
            },
            boxShadow: {
                'card': '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
                'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.025)',
                'button': '0 4px 14px 0 rgba(240, 25, 66, 0.39)', // Red glow for primary buttons
            }
        },
    },
    plugins: [],
};
export default config;
