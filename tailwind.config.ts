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
                primary: "#7C3AED",
                secondary: "#DB2777",
                black: "#000000",
                white: "#ffffff",
                // Dice.fm Aesthetic Colors
                "acid-yellow": "#F4F800",
                "acid-pink": "#FF1C5E",
                "neon-green": "#00D8AF",
                "off-white": "#F3F3F3",
            },
            fontFamily: {
                serif: ['"Times New Roman"', "Times", "serif"],
            },
            backgroundImage: {
                noise:
                    "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
            },
        },
    },
    plugins: [],
};
export default config;
