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
                primary: "#A855F7", // Purple 500 (More saturated Baby Purple/Lilac)
                secondary: "#F472B6", // Pink 400 (More saturated Pink)
                black: "#0f172a", // Slate 900
                white: "#ffffff",
                // Lively Pastels (Replacing Acid/Neon with saturated pastels)
                "acid-yellow": "#FACC15", // Yellow 400 (Sunny, not neon)
                "acid-pink": "#F472B6", // Pink 400 (Matches secondary)
                "neon-green": "#4ADE80", // Green 400 (Lively green)
                "off-white": "#F8FAFC", // Slate 50
                // New semantic names for clarity if needed, but keeping legacy names for compatibility
            },
            fontFamily: {
                serif: ['"Times New Roman"', "Times", "serif"],
            },
            backgroundImage: {
                // Removed noise for cleaner look or make it very subtle if needed. 
                // Using a very subtle noise for texture if desired, or just removing it.
                // For now, keeping a very subtle version or removing to ensure "clean" look.
                // Let's remove it for a pure clean light mode as requested.
            },
        },
    },
    plugins: [],
};
export default config;
